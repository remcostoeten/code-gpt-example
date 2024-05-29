"use server";

import { db } from "@/core/db";
import { chats } from "@/core/db/schema/chats";

import { generateRandomString } from "@/core/lib/utils";

import { revalidateTag } from "next/cache";

export async function createChat() {
  // user auth
  const id = generateRandomString(16);

  await db.insert(chats).values({
    id: id,
    name: id,
    user_id: id, // Add this line
  });

  revalidateTag("get-chats-for-chat-list");

  return {
    id,
  };
}
