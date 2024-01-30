export const chatRouter = require("express").Router();
const { getAllChats, getChatMembers, postChat, getSingleChatMembers, getChatMessages, postChatMessage } = require("../controllers/ChatController");


chatRouter.route("/").get(getAllChats).post(postChat)
chatRouter.route("/members").get(getChatMembers)
chatRouter.route("/members/:chat_id").get(getSingleChatMembers)
chatRouter.route("/messages/:chat_id").get(getChatMessages).post(postChatMessage)