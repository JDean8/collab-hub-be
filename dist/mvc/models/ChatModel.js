"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const db = require("../../../dist/db/pool");
exports.fetchAllChats = () => {
    return db.query("SELECT * FROM chat").then(({ rows }) => {
        return rows;
    });
};
exports.postSingleChat = (chat_id) => {
    return db
        .query("INSERT INTO chat (chat_id) VALUES ($1) RETURNING *;", [chat_id])
        .then(({ rows }) => {
        return rows[0];
    });
};
exports.fetchChatMembers = () => {
    return db.query("SELECT * FROM chat_members").then(({ rows }) => {
        return rows;
    });
};
exports.fetchSingleChatMembers = (chat_id) => {
    return db
        .query("SELECT * FROM chat_members WHERE chat_id = $1", [chat_id])
        .then(({ rows }) => {
        return rows;
    });
};
exports.fetchChatMessages = (chat_id) => {
    return db
        .query("SELECT * FROM chat_messages WHERE chat_id = $1 ORDER BY chat_messages.created_at ASC", [chat_id])
        .then(({ rows }) => {
        return rows;
    });
};
exports.postSingleChatMessage = (chat_id, message, user_id, avatar_url) => {
    const currentDate = new Date();
    if (!chat_id || !message || !user_id || !avatar_url)
        return Promise.reject({ status: 400, msg: "Bad request" });
    return bcrypt
        .genSalt(10)
        .then((response) => {
        const hashedMessage = bcrypt.hash(message, response);
        return hashedMessage;
    })
        .then((hashedMessage) => {
        return db
            .query("INSERT INTO chat_messages (chat_id, message, user_id, avatar_url, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [chat_id, hashedMessage, user_id, avatar_url, currentDate])
            .then(({ rows }) => {
            return rows[0];
        });
    });
};
exports.postMember = (chat_id, user_id) => {
    if (!chat_id || !user_id)
        return Promise.reject({ status: 400, msg: "Bad request" });
    return db
        .query("INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2) RETURNING *;", [chat_id, user_id])
        .then(({ rows }) => {
        return rows[0];
    });
};
