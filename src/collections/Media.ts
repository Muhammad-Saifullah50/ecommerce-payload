import { generateBlurHash } from '@/lib/generateBlurHash'
import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: {
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
  ],
  hooks: {
    beforeValidate: [generateBlurHash],
  },
}
