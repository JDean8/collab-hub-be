import { Chat, chat } from "../../db/data/test-data/chat"
const db = require("../../../dist/db/pool")

type ChatsProps = {
    rows: Chat[]
}

exports.fetchAllChats = () => {
    return db.query("SELECT * FROM chat")
    .then(({rows}: ChatsProps) => {
        return rows;
    })
}

exports.postSingleChat = (chat_id: string) => {
   return db.query("INSERT INTO chat (chat_id) VALUES ($1) RETURNING *;", [chat_id])
   .then(({rows}: ChatsProps) => {
       return rows[0];
   })
}

exports.fetchChatMembers = () => {
    return db.query("SELECT * FROM chat_members")
    .then(({rows}: ChatsProps) => {
        return rows;
    })
}