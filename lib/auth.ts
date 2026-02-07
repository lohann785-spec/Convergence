import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateCreditsForPlan(plan: string): number {
  const credits: Record<string, number> = {
    FREE: 5,
    STARTER: 50,
    PRO: 500,
    ENTERPRISE: 5000,
  }
  return credits[plan] || 5
}
