import { TutorChatView } from "@/features/chats";

interface ChatPageProps {
    params: Promise<{ chatId: string }>;
    searchParams: Promise<{ message?: string }>;
}

export default async function ChatPage({
    params,
    searchParams,
}: ChatPageProps) {
    const { chatId } = await params;
    const { message } = await searchParams;
    return <TutorChatView chatId={chatId} initialMessage={message} />;
}
