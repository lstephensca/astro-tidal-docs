import { z, defineCollection } from "astro:content";

const DefaultCategories = z.enum(["Category One", "Category Two", "Category Three", "Category Four"]);

const categoryCollection = defineCollection({
  schema: z.object({
    title: DefaultCategories,
    description: z.string(),
    sidebarOrder: z.number(),
    featured: z.boolean().default(false),
    featuredOrder: z.number(),
  }),
});

const docCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sidebarCategoryOrder: z.number(),
    category: DefaultCategories,
    datePublished: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    dateUpdated: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
  }),
});

export const collections = {
  categories: categoryCollection,
  docs: docCollection,
};
