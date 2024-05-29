import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/core/db";
export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany<{ user_id: any }>({
    // Add the missing schema generic
    where: (model: { user_id: any }, { eq }: any) =>
      eq(model.user_id, user.userId), // Ensure you're using the correct field name as per your schema
    orderBy: (model: { id: any }, { desc }: any) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  // @ts-ignore
  const image = await db.query.images.findFirst({
    where: (model: { id: any }, { eq }: any) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.user_id !== user.userId) throw new Error("Unauthorized"); // Ensure you're using the correct field name as per your schema

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db.query.images.delete({
    where: (model: { id: any; user_id: any }, { and, eq }: any) =>
      and(
        eq(model.id, id),
        eq(model.user_id, user.userId), // Ensure you're using the correct field name as per your schema
      ),
  });
  redirect("/");
}
