import { Chat } from "../../db/data/test-data/chat";
import { ChatMembers } from "../../db/data/test-data/chat-members";
import { ChatMessage } from "../../db/data/test-data/chat-messages";
const bcrypt = require("bcrypt");
const db = require("../../../dist/db/pool");

type ChatsProps = {
  rows: Chat[];
};

type ChatMembersProps = {
  rows: ChatMembers[];
};

type ChatMessageProps = {
  rows: ChatMessage[];
};

exports.fetchAllChats = () => {
  return db.query("SELECT * FROM chat").then(({ rows }: ChatsProps) => {
    return rows;
  });
};

exports.postSingleChat = (chat_id: string) => {
  return db
    .query("INSERT INTO chat (chat_id) VALUES ($1) RETURNING *;", [chat_id])
    .then(({ rows }: ChatsProps) => {
      return rows[0];
    });
};

exports.fetchChatMembers = () => {
  return db.query("SELECT * FROM chat_members").then(({ rows }: ChatsProps) => {
    return rows;
  });
};

exports.fetchSingleChatMembers = (chat_id: string) => {
  return db
    .query("SELECT * FROM chat_members WHERE chat_id = $1", [chat_id])
    .then(({ rows }: ChatsProps) => {
      return rows;
    });
};

exports.fetchChatMessages = (chat_id: string) => {
  return db
    .query(
      "SELECT * FROM chat_messages WHERE chat_id = $1 ORDER BY chat_messages.created_at ASC",
      [chat_id]
    )
    .then(({ rows }: ChatsProps) => {
      return rows;
    });
};

exports.postSingleChatMessage = (
  chat_id: string,
  message: string,
  user_id: string,
  avatar_url: string
) => {
  const currentDate = new Date();
  if (!chat_id || !message || !user_id || !avatar_url)
    return Promise.reject({ status: 400, msg: "Bad request" });

  return db
    .query(
      "INSERT INTO chat_messages (chat_id, message, user_id, avatar_url, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [chat_id, message, user_id, avatar_url, currentDate]
    )
    .then(({ rows }: ChatMessageProps) => {
      return rows[0];
    });
};

exports.postMember = (chat_id: string, user_id: string) => {
  if (!chat_id || !user_id)
    return Promise.reject({ status: 400, msg: "Bad request" });
  return db
    .query(
      "INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2) RETURNING *;",
      [chat_id, user_id]
    )
    .then(({ rows }: ChatMembersProps) => {
      return rows[0];
    });
};
