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

exports.fetchSingleChatMembers = (chat_id: string) => {
    return db.query("SELECT * FROM chat_members WHERE chat_id = $1", [chat_id])
    .then(({rows}: ChatsProps) => {
        if(!rows.length) return Promise.reject({status: 404, msg: "Chat not found"})
        return rows;
    })
}

exports.fetchChatMessages = (chat_id: string) => {
    return db.query("SELECT * FROM chat_messages WHERE chat_id = $1 ORDER BY chat_messages.created_at ASC", [chat_id])
    .then(({rows}: ChatsProps) => {
        return rows;
    })
}