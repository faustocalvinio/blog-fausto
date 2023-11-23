import { z } from "zod";

const baseSchema = z.object({
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string",
  }),
  date: z.date({
    required_error: "Required frontmatter missing: date",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),  
  readingMinutes: z.string().default('undefined')
});

/*
  Blog posts two types —
  1. The posts you write in markdown files in content/blog/*.md
  2. External posts in other websites
*/
export const blog = z.discriminatedUnion("external", [
  // markdown
  baseSchema.extend({
    external: z.literal(false),
    description: z.optional(z.string()),
    ogImagePath: z.optional(z.string()),
    canonicalUrl: z.optional(z.string()),
  }),
  // external link
  baseSchema.extend({
    external: z.literal(true),
    url: z.string({
      required_error:
        "external is true but url is missing. url must be set for posts marked as external.",
      invalid_type_error: "external should be string.",
    }),
  }),
]);

export const project = baseSchema.extend({
  url: z.string(),
});
