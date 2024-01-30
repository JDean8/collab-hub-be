"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAllChats, fetchChatMembers, postSingleChat, fetchSingleChatMembers, fetchChatMessages } = require("../models/ChatModel");
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
    })
        .catch((err) => {
        next(err);
    });
};
exports.getSingleChatMembers = (req, res, next) => {
    fetchSingleChatMembers(req.params.chat_id)
        .then((members) => {
        res.status(200).send({ members });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getChatMessages = (req, res, next) => {
    return fetchAllChats()
        .then((chats) => {
        const chat = chats.find((c) => c.chat_id === req.params.chat_id);
        if (chat) {
            return fetchChatMessages(req.params.chat_id);
        }
        else {
            throw { status: 404, msg: "Chat not found" };
        }
    })
        .then((messages) => {
        res.status(200).send({ messages });
    })
        .catch((err) => {
        next(err);
    });
};
