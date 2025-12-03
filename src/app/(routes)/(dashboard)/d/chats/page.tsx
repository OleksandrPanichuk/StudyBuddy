import { HydrateClient } from "@/components/trpc/HydrateClient";
import { TutorChatsView } from "@/features/chats";
import { prefetch } from "@/trpc/prefetch";
import { trpc } from "@/trpc/server";

export default async function ChatsPage() {
    void prefetch(trpc.chats.getAll.infiniteQueryOptions({}));

    return (
        <HydrateClient>
            <TutorChatsView />
        </HydrateClient>
    );
}
