import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: '用户',
    plural: '用户',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}
