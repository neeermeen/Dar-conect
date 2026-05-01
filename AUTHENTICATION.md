# Authentication Setup Guide

## Overview
Your application now has a complete role-based authentication system with:
- **Login page** with Supabase integration
- **Middleware** for route protection  
- **Admin dashboard** - restricted to admin role only
- **User account page** - for regular users
- **Automatic redirects** based on user role

## How It Works

### 1. **Login Flow**
- All protected pages redirect unauthenticated users to `/login`
- Users enter email and password
- System checks Supabase auth
- Based on user role (`admin` or `user`), redirects to:
  - `/admin` → Admin dashboard
  - `/account` → User account page

### 2. **Protected Routes**
These routes require authentication:
- `/admin` - Admin dashboard (admin role only)
- `/account` - User account (user role only)
- `/map` - Map page
- `/properties` - Properties listing
- `/property/[id]` - Property details
- `/contact` - Contact page

### 3. **User Roles**
Set in Supabase user metadata during signup:
```typescript
// Admin user
role: "admin"

// Regular user (default)
role: "user"
```

## Files Created/Modified

### New Files:
- `middleware.ts` - Route protection and redirects
- `lib/auth.ts` - Authentication utilities
- `components/auth-provider.tsx` - Auth state provider

### Updated Files:
- `app/layout.tsx` - Wrapped with AuthProvider
- `app/login/page.tsx` - Real Supabase authentication
- `app/admin/page.tsx` - Admin role check + logout
- `app/account/page.tsx` - User role check + logout

## Key Functions

### Authentication (`lib/auth.ts`)
```typescript
signInWithEmail(email, password)    // Login user
signUpWithEmail(email, password)    // Create new account
signOut()                            // Logout user
getCurrentUser()                     // Get logged-in user
getUserRole()                        // Get user's role
```

### Usage Example
```typescript
import { signInWithEmail, signOut } from "@/lib/auth"

// Login
const { data, error } = await signInWithEmail(email, password)
if (!error) {
  // User logged in successfully
}

// Logout
await signOut()
```

## Logout Buttons
- **Admin Dashboard**: Top right "Logout" button
- **User Account**: Top right "Logout" button

Both redirect to login page after logout.

## Next Steps

### 1. **Set Up Supabase Admin User**
In Supabase console, create admin user with:
```json
{
  "role": "admin"
}
```
in the user metadata.

### 2. **Test the Flow**
1. Try accessing `/admin` without login → redirects to login
2. Login as regular user → goes to `/account`
3. Try accessing `/admin` as regular user → redirects to `/account`
4. Login as admin → goes to `/admin`
5. Click logout → redirects to login

### 3. **Customize**
- Modify protected routes in `middleware.ts`
- Add more user roles in `lib/auth.ts`
- Customize login page styling in `app/login/page.tsx`
- Update redirect logic in `components/auth-provider.tsx`

## Security Notes
- ✅ Routes protected on middleware level
- ✅ Role checked server-side  
- ✅ Session persisted via Supabase cookies
- ✅ Automatic logout redirect
- ⚠️ Ensure Supabase environment variables are set in `.env.local`

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
