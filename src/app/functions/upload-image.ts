import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Readable } from "node:stream";
import { z } from "zod";


const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadImageInput = z.input<typeof uploadImageInput>

const allowedMimeType = ['iamge/jpeg', 'image/jpeg', 'image/png', 'image/webp']

export async function uploadImage(input: UploadImageInput) {
  const { fileName, contentType, contentStream } = uploadImageInput.parse(input)

  if (!allowedMimeType.includes(contentType)) {
    throw new Error('Invalid file type')
  }

  // TODO: carregar imagem p/ o cloudflare R2

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: fileName,
    remoteUrl: fileName
  })
}