"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleTestUser = (req, res, next) => {
    return res.status(200).json('USER');
};
exports.default = { sampleTestUser };
