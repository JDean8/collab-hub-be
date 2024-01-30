export const chatRouter = require("express").Router();
const { getAllChats, getChatMembers, postChat } = require("../controllers/ChatController");


chatRouter.route("/").get(getAllChats).post(postChat)
chatRouter.route("/members").get(getChatMembers)