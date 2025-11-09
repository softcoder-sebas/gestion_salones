import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

const PASSWORD_SCHEME = 'scrypt'
const KEY_LENGTH = 64

function normalize(input: string) {
  return input.normalize('NFKC').trim()
}

export function isPasswordHash(password: string) {
  return password.startsWith(`${PASSWORD_SCHEME}$`) && password.split('$').length === 3
}

export function hashPassword(password: string) {
  const normalized = normalize(password)
  const salt = randomBytes(16).toString('hex')
  const derivedKey = scryptSync(normalized, salt, KEY_LENGTH)
  return `${PASSWORD_SCHEME}$${salt}$${derivedKey.toString('hex')}`
}

export function verifyPassword(password: string, stored: string | null) {
  if (!stored) {
    return false
  }

  const normalized = normalize(password)

  if (!isPasswordHash(stored)) {
    return normalized === stored
  }

  const [, salt, hash] = stored.split('$')
  const hashBuffer = Buffer.from(hash, 'hex')
  if (hashBuffer.length === 0) {
    return false
  }

  try {
    const derived = scryptSync(normalized, salt, hashBuffer.length)
    if (derived.length !== hashBuffer.length) {
      return false
    }
    return timingSafeEqual(derived, hashBuffer)
  } catch {
    return false
  }
}
