import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export type JWTUser = {
  id: string
  username: string
}
export const createJWT = (user: JWTUser) => {
  const token = jwt.sign({
    id: user.id,
    username: user.username
  }, process.env.JWT_SECRET as string)

  return token
}

export const getUser = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JWTUser
    return payload
  } catch {
    return null
  }
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5)
}

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}