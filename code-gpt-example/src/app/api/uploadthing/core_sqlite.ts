import { ratelimit } from "@/core/ratelimit"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { db, images } from "@/core/db"

import { UploadThingError, createUploadthing } from "uploadthing/server"

type Image = {
  id: string
  name: string
  url: string
  user_id: string
}

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    .middleware(async ({ req }): Promise<{ userId: string }> => {
      const user = auth()
      if (!user.userId) throw new UploadThingError("Unauthorized")

      const fullUserData = await clerkClient.users.getUser(user.userId)

      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User Does Not Have Upload Permissions")

      const { success } = await ratelimit.limit(user.userId)

      return { userId: user.userId }
    })

    .onUploadComplete(
      async ({ metadata, file }: { metadata: any; file: any }) => {
        try {
          await db.insert(images).values({
            id: file.id || uuidv4(), // Use file.id if it's defined, otherwise generate a new UUID
            name: file.name,
            url: file.url,
            user_id: metadata.userId,
          } as Image)
        } catch (e) {
          console.error(e)
        }

        return { uploadedBy: metadata.userId }
      },
    ),
}

export type OurFileRouter = typeof ourFileRouter
