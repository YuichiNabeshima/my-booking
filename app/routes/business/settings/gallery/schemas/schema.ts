import { z } from "zod"

export const schema = z.object({
  images: z.array(
    z.object({
      id: z.number().optional(),
      url: z.string().optional(),
      caption: z.string().optional(),
      file: z.instanceof(File).optional(),
    })
    .refine(img => {
      return img.id || img.file;
    }, {
      message: 'Empty image.',
      path: ['file'],
    })
    ,
  ).default([])
  ,
});