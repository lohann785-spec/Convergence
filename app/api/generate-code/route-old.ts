import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Configuration for Ollama (local LLM - gratuit!)
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral'

const systemPrompts = {
  mobile: `You are an expert mobile app developer. Generate React Native code for mobile applications.
The code should be:
- Production-ready and optimized
- Include proper styling with StyleSheet
- Have proper error handling
- Follow React best practices
Format: Return only the code, no explanations.`,

  fullstack: `You are an expert full-stack developer. Generate Next.js full-stack application code.
The code should be:
- Include API routes and components
- Use TypeScript
- Include proper error handling
- Follow Next.js best practices
Format: Return only the code, no explanations.`,
}

export async function POST(request: NextRequest) {
  try {
    const { description, type = 'mobile', userId } = await request.json()

    if (!description || !userId) {
      return NextResponse.json(
        { error: 'Description et userId requis' },
        { status: 400 }
      )
    }

    // Vérifier l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les crédits
    const creditsNeeded = type === 'mobile' ? 1.0 : 2.0
    const creditsAvailable = user.creditsTotal - user.creditsUsed

    if (creditsAvailable < creditsNeeded) {
      return NextResponse.json(
        { error: 'Crédits insuffisants' },
        { status: 402 }
      )
    }

    // Appeler Ollama (local gratuit)
    const prompt = `${systemPrompts[type as keyof typeof systemPrompts] || systemPrompts.mobile}

User request: "${description}"

Generate a complete, working ${type === 'mobile' ? 'React Native' : 'Next.js'} application.`

    // Appel à Ollama via API REST
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 2000,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}. Make sure Ollama is running on ${OLLAMA_URL}`)
    }

    const result = await response.json()
    const code = result.response || ''

    if (!code || code.trim().length === 0) {
      throw new Error('Pas de réponse du modèle Ollama')
    }

    // Sauvegarder l'app générée
    const generatedApp = await prisma.generatedApp.create({
      data: {
        userId,
        name: `${description.slice(0, 30)}...`,
        code,
        type,
        description,
      },
    })

    // Mettre à jour les crédits
    await prisma.user.update({
      where: { id: userId },
      data: {
        creditsUsed: {
          increment: creditsNeeded,
        },
      },
    })

    return NextResponse.json(
      {
        app: {
          id: generatedApp.id,
          name: generatedApp.name,
          code,
          type,
        },
        creditsRemaining: creditsAvailable - creditsNeeded,
        message: `Code généré avec succès par ${OLLAMA_MODEL} (Ollama local)`,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Generate code error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('Ollama')) {
        return NextResponse.json(
          { error: `Erreur Ollama: ${error.message}. Assurez-vous que Ollama est en cours d'exécution sur ${OLLAMA_URL}` },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la génération du code' },
      { status: 500 }
    )
  }
}
