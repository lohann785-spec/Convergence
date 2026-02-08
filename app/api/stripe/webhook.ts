import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'stream'
import { stripe, PLANS } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

// Stripe event handler
async function buffer(readable: Readable) {
  const chunks: Uint8Array[] = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export async function POST(req: NextRequest) {
  const buf = await buffer(req.body as any)
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        const userId = session.metadata?.userId
        const plan = session.metadata?.plan

        if (userId && plan) {
          const planConfig = PLANS[plan as keyof typeof PLANS]

          // Update subscription
          await prisma.subscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeCustomerId: session.customer,
              stripeSubscriptionId: session.subscription,
              plan: plan as any,
              status: 'active',
              currentPeriodStart: new Date(session.current_period_start * 1000),
              currentPeriodEnd: new Date(session.current_period_end * 1000),
              creditsMonthly: planConfig.credits || 0,
            },
            update: {
              stripeSubscriptionId: session.subscription,
              plan: plan as any,
              status: 'active',
              currentPeriodStart: new Date(session.current_period_start * 1000),
              currentPeriodEnd: new Date(session.current_period_end * 1000),
              creditsMonthly: planConfig.credits || 0,
            },
          })

          // Update user plan and credits
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: plan as any,
              creditsTotal: planConfig.credits || 0,
              creditsUsed: 0,
            },
          })

          // Log payment
          await prisma.paymentHistory.create({
            data: {
              userId,
              stripePaymentId: session.payment_intent,
              amount: session.amount_total / 100,
              currency: session.currency,
              status: 'succeeded',
              description: `Subscription to ${plan}`,
              planId: plan,
            },
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any
        const userId = subscription.metadata?.userId

        if (userId) {
          await prisma.subscription.update({
            where: { userId },
            data: {
              status: 'cancelled',
              cancelledAt: new Date(),
              plan: 'FREE',
              creditsMonthly: 5,
            },
          })

          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: 'FREE',
              creditsTotal: 5,
            },
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any
        const userId = subscription.metadata?.userId

        if (userId) {
          await prisma.subscription.update({
            where: { userId },
            data: {
              status: subscription.status,
              currentPeriodStart: new Date(
                subscription.current_period_start * 1000
              ),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          })
        }
        break
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
