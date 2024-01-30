"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
exports.chatRouter = require("express").Router();
const { getAllChats, getChatMembers, postChat } = require("../controllers/ChatController");
exports.chatRouter.route("/").get(getAllChats).post(postChat);
exports.chatRouter.route("/members").get(getChatMembers);
