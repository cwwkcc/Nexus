# Nexus — Google OAuth Setup

**Configuring Google Cloud Console for Authentication**

---

## Overview

Nexus uses Google OAuth via Auth.js (NextAuth) for admin authentication. This document covers the complete setup process in Google Cloud Console.

---

## Prerequisites

- A Google Cloud Console account with billing enabled
- The school's Google Workspace domain (`@cwwkcc.lk`)
- Admin access to the school's Google Workspace (optional, for testing)

---

## Step 1: Create a Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Create Project** or select an existing project
3. Enter a project name: `Nexus - CWWKCC`
4. Click **Create**

---

## Step 2: Configure OAuth Consent Screen

1. Navigate to **APIs & Services → OAuth consent screen**
2. Select **External** (since the school's domain is not in Google's verified list)
3. Click **Create**

### App Information

| Field                             | Value                                      |
| --------------------------------- | ------------------------------------------ |
| App name                          | `Nexus - CWWKCC`                           |
| User support email                | Your email address                         |
| Application logo                  | School crest (optional)                    |
| Application home page             | `https://cwwkcc.lk`                        |
| Application privacy policy link   | `https://cwwkcc.lk/privacy` (create later) |
| Application terms of service link | `https://cwwkcc.lk/terms` (create later)   |

### Authorized Domains

```
cwwkcc.lk
admin.cwwkcc.lk
```

### Scopes

Add the following scopes:

- `openid`
- `profile`
- `email`

### Test Users

Add the initial admin users who will test the login:

- `principal@cwwkcc.lk`
- `teacher@cwwkcc.lk`
- `kits-lead@cwwkcc.lk`

---

## Step 3: Create OAuth Credentials

1. Navigate to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth client ID**
3. Select **Web application** as the application type

### Authorized JavaScript Origins

```
https://cwwkcc.lk
https://admin.cwwkcc.lk
http://localhost:3000 (development)
http://localhost:3001 (development)
```

### Authorized Redirect URIs

```
https://cwwkcc.lk/api/auth/callback/google
https://admin.cwwkcc.lk/api/auth/callback/google
http://localhost:3000/api/auth/callback/google (development)
http://localhost:3001/api/auth/callback/google (development)
```

### Save Credentials

- **Client ID:** `xxx.apps.googleusercontent.com`
- **Client Secret:** `GOCSPX-xxx`

Store these securely — they will be used as environment variables.

---

## Step 4: Configure Domain Restriction

1. Navigate to **APIs & Services → OAuth consent screen**
2. Under **Authorized domains**, ensure `cwwkcc.lk` is listed
3. Save changes

Note: OAuth consent screen verification is not required if your app is only used by users in your domain. However, since the school may invite external editors, external status is acceptable.

---

## Step 5: Test Authentication

1. Set the environment variables:

```bash
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
```

2. Start the development server:

```bash
pnpm dev
```

3. Navigate to `http://localhost:3000/login`
4. Click **Sign in with Google**
5. Use a `@cwwkcc.lk` account to sign in
6. Verify the user is redirected to the admin panel

---

## Step 6: Production Setup

1. Ensure the production environment variables are set on the Hetzner server:

```bash
# On the Hetzner server
cat /opt/nexus/.env | grep GOOGLE
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
```

2. Verify the production redirect URIs are correct:

```
https://cwwkcc.lk/api/auth/callback/google
https://admin.cwwkcc.lk/api/auth/callback/google
```

3. Test the production login flow

---

## Troubleshooting

### Issue: "Error: OAuth callback failed"

**Symptom:** The user is redirected to `/login` with an error

**Solution:**

1. Check the redirect URI matches exactly in Google Console and environment variables
2. Ensure the domain is in the "Authorized Domains" list
3. Check the client ID and secret are correct

### Issue: "The domain suffix is not allowed"

**Symptom:** Users cannot sign in with their `@cwwkcc.lk` email

**Solution:**

1. Check the domain restriction in the `signIn` callback
2. Ensure the `email` ends with `@cwwkcc.lk`
3. Check the user's email is in the `User` table (invite-based access)

### Issue: "Could not find user"

**Symptom:** Users can sign in with Google but cannot access the admin panel

**Solution:**

1. Check the user's email is in the `User` table
2. Add the user via the admin panel (Settings → Users → Add User)
3. Wait a few minutes for the database to sync

---

## Security Notes

1. **Never share the client secret**
2. **Rotate the client secret annually**
3. **Use different credentials for development and production**
4. **Limit the number of OAuth users**
5. **Monitor the OAuth consent screen for unauthorised access**

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---
