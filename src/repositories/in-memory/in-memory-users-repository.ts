import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = []

  async findById(userId: string): Promise<User | null> {
    return this.users.find((user) => user.id === userId) ?? null
  }

  async create(input: Prisma.UserCreateInput): Promise<User> {
    const userToPush: User = {
      id: randomUUID(),
      email: input.email,
      name: input.name,
      password_hash: input.password_hash,
      created_at: new Date(),
    }
    this.users.push(userToPush)

    return userToPush
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null
  }
}
