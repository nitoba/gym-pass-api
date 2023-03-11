import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Starting')
    return {
      async teardown() {
        console.log('Teardown completed')
      },
    }
  },
}
