import e, { Request, Response, NextFunction } from "express";
import { Chat } from "../../db/data/test-data/chat";
import { ChatMembers } from "../../db/data/test-data/chat-members";
const { fetchAllChats, fetchChatMembers, postSingleChat, fetchSingleChatMembers, fetchChatMessages, postSingleChatMessage, postMember } = require("../models/ChatModel")

exports.getAllChats = (req: Request, res: Response, next: NextFunction) => {
    fetchAllChats()
    .then((chats: Chat[]) => {
        res.status(200).send({chats})
    })
    .catch((err: Error) => {
        next(err)
    })
};

exports.postChat = (req: Request, res: Response, next: NextFunction) => {
    const { chat_id } = req.body
    postSingleChat(chat_id)
    .then((chat: Chat[]) => {
        res.status(201).send({chat})
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.getChatMembers = (req: Request, res: Response, next: NextFunction) => {
    fetchChatMembers()
    .then((members: ChatMembers[]) => {
        res.status(200).send({members})
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.getSingleChatMembers = (req: Request, res: Response, next: NextFunction) => {
    fetchSingleChatMembers(req.params.chat_id)
    .then((members: ChatMembers[]) => {
        res.status(200).send({members})
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.getChatMessages = (req: Request, res: Response, next: NextFunction) => {
    return fetchAllChats()
    .then((chats: Chat[]) => {
        const chat = chats.find((c: Chat) => c.chat_id === req.params.chat_id);

        if (chat) {
            return fetchChatMessages(req.params.chat_id);
        } else {
            throw { status: 404, msg: "Chat not found" };
        }
    })
    .then((messages: ChatMembers[]) => {
        res.status(200).send({messages})
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.postChatMessage = (req: Request, res: Response, next: NextFunction) => {
    postSingleChatMessage(req.params.chat_id, req.body.message, req.body.user_id, req.body.avatar_url)
    .then((message: ChatMembers[]) => {
        res.status(201).send({message})
    })
    .catch((err: Error) => {
        next(err)
    })
}

exports.postChatMember = (req: Request, res: Response, next: NextFunction) => {
    postMember(req.params.chat_id, req.body.user_id)
    .then((member: ChatMembers[]) => {
        res.status(201).send({member})
    })
    .catch((err: Error) => {
        next(err)
    })
}