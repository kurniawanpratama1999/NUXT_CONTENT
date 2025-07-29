import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: "**",
      schema: z.object({
        tags: z.array(z.string()),
        category: z.string(),
        date: z.date(),
        icon: z.string()
      })
    }),
  }
})
