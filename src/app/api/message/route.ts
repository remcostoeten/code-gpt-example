import { db } from "@/core/db"
import { chats } from "@/core/db/schema/chats"
import { messages } from "@/core/db/schema/messages"
import { eq } from "drizzle-orm"

export const runtime = "edge"

export async function POST(req: Request) {
  const { content, chatId } = await req.json()

  // check if the user is logged in
  // make sure that chat belongs to them
  if (!chatId) {
    return new Response("chatId is required", { status: 400 })
  }

  const chat = await db.select().from(chats).where(eq(chats.id, chatId)).get()

  if (!chat) {
    return new Response("chat is not found", { status: 400 })
  }

  try {
    await db.insert(messages).values([
      {
        chatId,
        role: "user",
        content,
      },
    ])
  } catch (e) {
    console.error(e)
  }

  return new Response("Message sent", { status: 200 })
}
