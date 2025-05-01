import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { Banners } from './collections/Banners'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Orders } from './collections/Orders'
import { Subcategories } from './collections/Subcategories'
import { Products } from './collections/Products'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

import oneLinkEndpoints  from '@/payments/1link/payloadIntegration';


export default buildConfig({
  endpoints: [
    ...oneLinkEndpoints,
  ],
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor({}),
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,    
        },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
      },
    }),
  ],
  // Define and configure your collections in this array
  collections: [Media, Banners, Categories, Subcategories, Products, Orders],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  
})

// have to install uploadthing