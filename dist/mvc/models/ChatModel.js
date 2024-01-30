"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool");
exports.fetchAllChats = () => {
    return db.query("SELECT * FROM chat")
        .then(({ rows }) => {
        return rows;
    });
};
exports.postSingleChat = (chat_id) => {
    return db.query("INSERT INTO chat (chat_id) VALUES ($1) RETURNING *;", [chat_id])
        .then(({ rows }) => {
        return rows[0];
    });
};
exports.fetchChatMembers = () => {
    return db.query("SELECT * FROM chat_members")
        .then(({ rows }) => {
        return rows;
    });
};
