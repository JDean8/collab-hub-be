export interface ChatMessage {
    message_id: number;
    chat_id: string;
    sender_id: string | number;
    message: string;
    avatar_url: string;
    created_at: Date;
}

export const chatMessages: ChatMessage[] = [
    {
        message_id: 1,
        chat_id: "1",
        sender_id: 1,
        message: "Hello",
        avatar_url: "https://i.imgur.com/1C22Hym.png",
        created_at: new Date("2024-01-30 12:30:42")
    },
    {
        message_id: 2,
        chat_id: "1",
        sender_id: 3,
        message: "Hi",
        avatar_url: "https://i.imgur.com/1C22Hym.png",
        created_at: new Date("2024-01-30 12:32:42")
    }
]