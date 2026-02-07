import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

function generateCode(description: string, type: 'mobile' | 'fullstack'): string {
  if (type === 'mobile') {
    return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// ${description}

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mon Application</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>${description}</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>Compteur: {count}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ccc',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});`
  }

  // Fullstack
  return `'use client'

import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

// ${description}

export default function Page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data')
        if (!response.ok) throw new Error('Erreur du serveur')
        const json = await response.json()
        setData(json.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mon Application Full-Stack</h1>
          <p className="text-gray-400">${description}</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-4">
            {data.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
                <p className="text-gray-400">Aucune donnée disponible</p>
              </div>
            ) : (
              data.map((item: any, idx: number) => (
                <div 
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
                >
                  <p className="text-white">{JSON.stringify(item)}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  )
}`
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

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les crédits (1 crédit par génération)
    const creditsNeeded = 1.5
    const creditsAvailable = user.creditsTotal - user.creditsUsed

    if (creditsAvailable < creditsNeeded) {
      return NextResponse.json(
        { error: 'Crédits insuffisants' },
        { status: 402 }
      )
    }

    // Générer le code
    const code = generateCode(description, type)

    // Sauvegarder l'app générée
    const generatedApp = await prisma.generatedApp.create({
      data: {
        userId,
        name: `App - ${new Date().toLocaleDateString()}`,
        code,
        type,
        description,
      },
    })

    // Mettre à jour les crédits utilisateur
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
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Generate code error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération' },
      { status: 500 }
    )
  }
}
