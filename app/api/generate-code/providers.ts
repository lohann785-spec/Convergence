// Simple: Une clé pour les 3 IA (ChatGPT, Claude, Gemini)

export type Provider = 'openrouter'

export interface GenerateCodeRequest {
  description: string
  type: 'mobile' | 'fullstack'
  userId: string
  provider?: Provider
  model?: string
}

export interface CodeGenerationResult {
  code: string
  model: string
  provider: Provider
  tokensUsed?: number
}

export abstract class LLMProvider {
  abstract name: string
  abstract isAvailable(): Promise<boolean>
  abstract generateCode(
    prompt: string,
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<CodeGenerationResult>
}

// ============ OPENROUTER (1 CLÉ = ChatGPT + Claude + Gemini) ============
export class OpenRouterProvider extends LLMProvider {
  name = 'OpenRouter (ChatGPT, Claude, Gemini)'
  private apiKey: string
  private model: string

  constructor(apiKey: string, model: string = 'openai/gpt-4-turbo-preview') {
    super()
    this.apiKey = apiKey
    this.model = model
  }

  async isAvailable(): Promise<boolean> {
    if (!this.apiKey) return false
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      })
      return response.ok
    } catch {
      return false
    }
  }

  async generateCode(
    prompt: string,
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<CodeGenerationResult> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || 2000,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenRouter error: ${error.error?.message || response.statusText}`)
    }

    const result = await response.json()
    return {
      code: result.choices[0]?.message?.content || '',
      model: this.model,
      provider: 'openrouter',
      tokensUsed: result.usage?.total_tokens,
    }
  }
}

// ============ FACTORY ============
export function getProvider(provider: Provider = 'openrouter', model?: string): LLMProvider {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY non configurée. Ajouter dans .env.local')
  }

  return new OpenRouterProvider(apiKey, model)
}

// ============ MODÈLES DISPONIBLES ============
export const AVAILABLE_MODELS = {
  openrouter: [
    { id: 'openai/gpt-4-turbo-preview', name: 'ChatGPT-4 ($0.03/1K tokens)' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus ($0.015/1K tokens)' },
    { id: 'google/gemini-pro', name: 'Gemini Pro ($0.0025/1K tokens)' },
  ],
}
