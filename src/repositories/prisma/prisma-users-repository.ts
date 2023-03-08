import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create({ email, name, password_hash }: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }
}
