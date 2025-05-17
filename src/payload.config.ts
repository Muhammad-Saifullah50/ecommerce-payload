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
import { searchPlugin } from '@payloadcms/plugin-search'
import { extractPlainText } from './lib/extract'

export default buildConfig({
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
    searchPlugin({

      collections: ['products'],
    
      searchOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            admin: {
              readOnly: true,
            },
          },
        ],
    
        // Map content from your original documents into the shape expected in the search index
        beforeSync: ({ originalDoc, searchDoc }) => {
          const collection = searchDoc.doc.relationTo;
    
          // If the document is from the blog-articles collection...
          if (collection === 'products') {
            return {
              ...searchDoc,
              // Map the 'heading' field from the article as the search result title
              title: originalDoc.heading,
    
              // Extract and flatten the rich text content to make it searchable
              description: extractPlainText(originalDoc.content),
            };
          }
    
          // For any other collections not explicitly handled, fall back to the default
          return searchDoc;
        },
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
