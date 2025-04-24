import { CollectionConfig } from "payload";

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
    ],
  }