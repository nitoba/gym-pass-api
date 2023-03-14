import { prisma } from '@/lib/prisma'
import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Starting')
    await Promise.all([
      prisma.user.deleteMany(),
      prisma.checkIn.deleteMany(),
      prisma.gym.deleteMany(),
    ])
    return {
      async teardown() {},
    }
  },
}
