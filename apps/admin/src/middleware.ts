// Next.js middleware for apps/admin (F-062)
// Checks every request for a valid Auth.js session.
// Redirects unauthenticated requests to /login.
// The public site (apps/web) has NO middleware — only admin is protected.
