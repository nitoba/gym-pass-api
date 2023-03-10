import { prisma } from '@/lib/prisma'
import { Prisma, CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create({ user_id, gym_id }: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({
      data: {
        user_id,
        gym_id,
      },
    })
  }

  async save(data: CheckIn) {
    return await prisma.checkIn.update({
      where: { id: data.id },
      data,
    })
  }

  async findById(id: string) {
    return await prisma.checkIn.findUnique({ where: { id } })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async countByUserId(userId: string) {
    return await prisma.checkIn.count({ where: { user_id: userId } })
  }
}
