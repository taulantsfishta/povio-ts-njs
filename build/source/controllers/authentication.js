"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleTestAuth = (req, res, next) => {
    return res.status(200).json('AUTH');
};
exports.default = { sampleTestAuth };
