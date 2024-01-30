import { Request, Response, NextFunction } from "express";
import { Chat } from "../../db/data/test-data/chat";
import { ChatMembers } from "../../db/data/test-data/chat-members";
const { fetchAllChats, fetchChatMembers, postSingleChat } = require("../models/ChatModel")

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
}