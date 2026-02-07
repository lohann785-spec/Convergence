// LLM Providers abstraction - Support multiple AI models
// Simple: just add a new provider class and it works!

export type Provider = 'ollama' | 'openrouter' | 'groq' | 'openai' | 'anthropic'

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

// ============ OLLAMA (LOCAL - GRATUIT) ============
export class OllamaProvider extends LLMProvider {
  name = 'Ollama (Local)'
  private url: string
  private model: string

  constructor(url: string = 'http://localhost:11434', model: string = 'mistral') {
    super()
    this.url = url
    this.model = model
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.url}/api/tags`)
      return response.ok
    } catch {
      return false
    }
  }

  async generateCode(
    prompt: string,
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<CodeGenerationResult> {
    const response = await fetch(`${this.url}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: options?.temperature || 0.7,
          num_predict: options?.maxTokens || 2000,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(
        `Ollama error: ${response.statusText}. Make sure Ollama is running on ${this.url}`
      )
    }

    const result = await response.json()
    return {
      code: result.response || '',
      model: this.model,
      provider: 'ollama',
    }
  }
}

// ============ OPENROUTER (TOUT EN 1!) ============
export class OpenRouterProvider extends LLMProvider {
  name = 'OpenRouter (ChatGPT, Claude, Gemini...)'
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

// ============ GROQ (CLOUD GRATUIT RAPIDE!) ============
export class GroqProvider extends LLMProvider {
  name = 'Groq (Cloud Gratuit - Très Rapide!)'
  private apiKey: string
  private model: string

  constructor(apiKey: string, model: string = 'mixtral-8x7b-32768') {
    super()
    this.apiKey = apiKey
    this.model = model
  }

  async isAvailable(): Promise<boolean> {
    if (!this.apiKey) return false
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
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
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
      throw new Error(`Groq error: ${error.error?.message || response.statusText}`)
    }

    const result = await response.json()
    return {
      code: result.choices[0]?.message?.content || '',
      model: this.model,
      provider: 'groq',
      tokensUsed: result.usage?.total_tokens,
    }
  }
}

// ============ FACTORY - Créer le bon provider ============
export function getProvider(
  provider: Provider = 'ollama',
  model?: string
): LLMProvider {
  const env = process.env

  switch (provider) {
    case 'openrouter':
      if (!env.OPENROUTER_API_KEY) {
        throw new Error('OPENROUTER_API_KEY non configurée')
      }
      return new OpenRouterProvider(env.OPENROUTER_API_KEY, model)

    case 'groq':
      if (!env.GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY non configurée')
      }
      return new GroqProvider(env.GROQ_API_KEY, model)

    case 'ollama':
    default:
      return new OllamaProvider(env.OLLAMA_URL, env.OLLAMA_MODEL || 'mistral')
  }
}

// ============ MODÈLES DISPONIBLES ============
export const AVAILABLE_MODELS = {
  ollama: [
    { id: 'mistral', name: 'Mistral (Recommandé)', size: '4.1 GB' },
    { id: 'llama2', name: 'Llama 2', size: '3.8 GB' },
    { id: 'neural-chat', name: 'Neural Chat', size: '4.1 GB' },
    { id: 'orca-mini', name: 'Orca Mini (Rapide)', size: '1.3 GB' },
  ],
  openrouter: [
    { id: 'openai/gpt-4-turbo-preview', name: 'ChatGPT 4 Turbo ($0.03/1K)', cost: 'premium' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus ($0.015/1K)', cost: 'premium' },
    { id: 'google/gemini-pro', name: 'Gemini Pro ($0.0025/1K)', cost: 'budget' },
    { id: 'mistralai/mistral-7b-instruct-v0.1', name: 'Mistral ($0.00014/1K)', cost: 'cheap' },
  ],
  groq: [
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B (GRATUIT)', cost: 'free' },
    { id: 'llama2-70b-4096', name: 'Llama 2 70B (GRATUIT)', cost: 'free' },
    { id: 'gemma-7b-it', name: 'Gemma 7B (GRATUIT)', cost: 'free' },
  ],
}
