"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAllChats, fetchChatMembers, postSingleChat, fetchSingleChatMembers, fetchChatMessages, postSingleChatMessage, postMember } = require("../models/ChatModel");
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
exports.postChatMessage = (req, res, next) => {
    postSingleChatMessage(req.params.chat_id, req.body.message, req.body.user_id, req.body.avatar_url)
        .then((message) => {
        res.status(201).send({ message });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postChatMember = (req, res, next) => {
    fetchAllChats()
        .then((chats) => {
        const chat = chats.find((c) => c.chat_id === req.params.chat_id);
        if (!chat) {
            throw { status: 404, msg: "Chat not found" };
        }
    })
        .then(() => {
        return fetchSingleChatMembers(req.params.chat_id);
    })
        .then((members) => {
        const member = members.find((m) => m.user_id === req.body.user_id);
        if (member) {
            throw { status: 400, msg: "User already in chat" };
        }
    })
        .then(() => {
        return postMember(req.params.chat_id, req.body.user_id);
    })
        .then((member) => {
        res.status(201).send({ member });
    })
        .catch((err) => {
        next(err);
    });
};
