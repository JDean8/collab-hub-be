"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAllChats, fetchChatMembers, postSingleChat } = require("../models/ChatModel");
exports.getAllChats = (req, res, next) => {
    fetchAllChats()
        .then((chats) => {
        res.status(200).send({ chats });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postChat = (req, res, next) => {
    const { chat_id } = req.body;
    postSingleChat(chat_id)
        .then((chat) => {
        res.status(201).send({ chat });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getChatMembers = (req, res, next) => {
    fetchChatMembers()
        .then((members) => {
        res.status(200).send({ members });
    });
};
