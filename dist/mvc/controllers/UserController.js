"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllUsers, removeUser, selectUserByID, editUser, insertUser, selectUserByEmail, getUserProjectsById, fetchUserProjectsByMember, fetchUserRequests, signInWithEmail, } = require("../models/UserModel");
exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
        .then((data) => {
        res.status(200).send({ users: data });
    })
        .catch((err) => next(err));
};
exports.getUserByID = (req, res, next) => {
    const { user_id } = req.params;
    selectUserByID(user_id)
        .then((data) => {
        res.status(200).send({ user: data });
    })
        .catch((err) => next(err));
};
exports.getUserByEmail = (req, res, next) => {
    const { user_email } = req.params;
    selectUserByEmail(user_email)
        .then((data) => {
        res.status(200).send({ user: data });
    })
        .catch((err) => next(err));
};
exports.deleteUser = (req, res, next) => {
    const { user_id } = req.params;
    selectUserByID(user_id)
        .then(() => {
        return removeUser(user_id);
    })
        .then((data) => {
        res.sendStatus(204);
    })
        .catch((err) => next(err));
};
exports.patchUser = (req, res, next) => {
    const { user_id } = req.params;
    const { user } = req.body;
    if (!user) {
        res.status(400).send({ msg: "Bad request" });
    }
    editUser(user, user_id)
        .then((user) => {
        res.status(200).send({ user: user });
    })
        .catch((err) => {
        return next(err);
    });
};
exports.postUser = (req, res, next) => {
    const { user } = req.body;
    insertUser(user)
        .then((user) => {
        res.status(201).send({ user: user });
    })
        .catch((err) => next(err));
};
exports.getUserProjects = (req, res, next) => {
    selectUserByID(req.params.user_id)
        .then(() => {
        return getUserProjectsById(req.params.user_id);
    })
        .then((data) => {
        res.status(200).send({ projects: data });
    })
        .catch((err) => next(err));
};
exports.getUserProjectsByMember = (req, res, next) => {
    selectUserByID(req.params.user_id)
        .then(() => {
        return fetchUserProjectsByMember(req.params.user_id);
    })
        .then((data) => {
        res.status(200).send({ projects: data });
    })
        .catch((err) => next(err));
};
exports.getUserRequests = (req, res, next) => {
    selectUserByID(req.params.user_id)
        .then(() => {
        return fetchUserRequests(req.params.user_id);
    })
        .then((data) => {
        res.status(200).send({ projects: data });
    })
        .catch((err) => next(err));
};
exports.loginWithEmailAndPassword = (req, res, next) => {
    const { password, email } = req.body;
    signInWithEmail(password, email)
        .then((data) => {
        const { password } = data, copyOfTheUser = __rest(data, ["password"]);
        res.status(201).send({ user: copyOfTheUser });
    })
        .catch((err) => next(err));
};
