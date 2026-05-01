import { supabase } from './supabase'

export async function getCurrentUser() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return session?.user || null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getUserRole() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return session?.user?.user_metadata?.role || 'user'
  } catch (error) {
    console.error('Error getting user role:', error)
    return 'user'
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Sign in error:', error)
    return { data: null, error }
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  metadata?: Record<string, any>
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'user',
          ...metadata,
        },
      },
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Sign up error:', error)
    return { data: null, error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return { error: null }
  } catch (error) {
    console.error('Sign out error:', error)
    return { error }
  }
}

export async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Reset password error:', error)
    return { data: null, error }
  }
}
