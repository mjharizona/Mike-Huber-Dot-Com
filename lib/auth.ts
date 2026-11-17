import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? (process.env.NODE_ENV === 'production' ? '' : 'dev-secret-change-in-production-min-32-chars')
)

const COOKIE_NAME = 'mh_admin_token'
const EXPIRY      = '8h'

export async function signAdminToken(): Promise<string> {
  if (secret.length < 32) throw new Error('Admin authentication is not configured')
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(secret)
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    if (secret.length < 32) return false
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

export { COOKIE_NAME }
