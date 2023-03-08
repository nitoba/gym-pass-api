import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(input: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
