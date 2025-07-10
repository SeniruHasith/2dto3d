import type { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"

// Define custom types
type CustomUser = {
  id: string
  email: string
  name: string
  image?: string
}

// Simple in-memory user store (replace with your database)
const users: Array<{
  id: string
  email: string
  password: string
  name: string
  image?: string
}> = [
  {
    id: "admin@gmail.com",
    email: "admin@gmail.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LHZzqugQOwQiEO3Uy", // 'admin'
    name: "Administrator",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const { email, password } = credentials

          // Find user
          const user = users.find((user) => user.email === email)
          if (!user) {
            return null
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password)
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Handle Google OAuth users
      if (account?.provider === "google" && profile?.email) {
        const existingUser = users.find((u) => u.email === profile.email)
        if (!existingUser) {
          const newUser = {
            id: Date.now().toString(),
            email: profile.email,
            password: "", // No password for OAuth users
            name: profile.name || profile.email.split("@")[0],
            image: (profile as any).picture,
          }
          users.push(newUser)
        }
      }
      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  debug: process.env.NODE_ENV === "development",
}
