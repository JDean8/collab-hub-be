"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
exports.chatRouter = require("express").Router();
const { getAllChats, getChatMembers, postChat, getSingleChatMembers, getChatMessages, postChatMessage, postChatMember } = require("../controllers/ChatController");
exports.chatRouter.route("/").get(getAllChats).post(postChat);
exports.chatRouter.route("/members").get(getChatMembers);
exports.chatRouter.route("/members/:chat_id").get(getSingleChatMembers).post(postChatMember);
exports.chatRouter.route("/messages/:chat_id").get(getChatMessages).post(postChatMessage);
