// services/authService.ts
import bcrypt from 'bcryptjs'
import { prisma } from '../utils/prisma'
import { CreateUserDto, SafeUser } from '../../shared/types/authTypes'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword)
}

const sanitizeUser = (user: any): SafeUser => {
  const { password, tokenVersion, ...safeUser } = user
  return safeUser
}

// ─── Service Functions ────────────────────────────────────────────────────────

export const createUserService = async (data: CreateUserDto): Promise<SafeUser> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase().trim() }
  })

  if (existingUser) {
    throw new Error('EMAIL_TAKEN')
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await prisma.user.create({
    data: {
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
      firstName: data.firstName?.trim(),
      lastName: data.lastName?.trim(),
      businessName: data.businessName?.trim(),
      phoneNumber: data.phoneNumber.trim(),
      userType: data.userType,
    }
  })

  return sanitizeUser(user)
}

export const findUserByEmailService = async (email: string) => {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() }
  })
}

export const verifyUserPasswordService = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return verifyPassword(plainPassword, hashedPassword)
}

export const findUserByIdService = async (id: string) => {
  return prisma.user.findUnique({
    where: { id }
  })
}

// increments tokenVersion — call this on password change, 
// account suspension, or any security event
export const incrementTokenVersionService = async (id: string): Promise<void> => {
  await prisma.user.update({
    where: { id },
    data: { tokenVersion: { increment: 1 } }
  })
}