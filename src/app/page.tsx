import { Suspense } from "react";
import { createChat } from "@/app/[[...chatId]]/actions";
import ChatContent from "@/app/[[...chatId]]/chat-content";
import ChatContentWrapper from "@/app/[[...chatId]]/chat-content-wrapper";
import ChatList, { ChatListSkeleton } from "@/app/[[...chatId]]/chat-list";
export default function Page({ params }: { params: { chatId?: string[] } }) {
  const chatId = params.chatId?.[0];
  console.log({ chatId });
  return (
    <div className="w-full h-full flex">
      <div className="w-80 h-full max-h-full border-r-2 border-neutral-300 dark:border-neutral-700 overflow-auto">
        <Suspense fallback={<ChatListSkeleton />}>
          <ChatList />
        </Suspense>
      </div>
      <div className="h-full flex-1 flex flex-col">
        {chatId ? (
          <Suspense fallback={<div className="flex-1" />}>
            <ChatContentWrapper chatId={chatId} />
          </Suspense>
        ) : (
          <ChatContent createChat={createChat} />
        )}
      </div>
    </div>
  );
}
