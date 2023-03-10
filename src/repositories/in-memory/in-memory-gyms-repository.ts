import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  gyms: Gym[] = []

  async findManyNearby(data: FindManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create({
    id,
    title,
    description,
    latitude,
    longitude,
    phone,
  }: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: id ?? randomUUID(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Decimal(latitude.toString()),
      longitude: new Decimal(longitude.toString()),
    }
    this.gyms.push(gym)

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)
    return gym ?? null
  }
}
