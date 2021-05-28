"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = __importStar(require("express"));
const authentication_1 = __importDefault(require("../controllers/authentication"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express.Router();
// // @desc         Welcome
// // @route        GET  /
router.get('/', (req, res) => {
    res.status(200).send('WELCOME ');
});
// // @desc         Auth
// // @route        POST  /signup
router.post('/signup', authentication_1.default.sampleTestAuth);
// // @route        POST  /login
router.post('/login', authentication_1.default.sampleTestAuth);
// // @route        GET  /me
router.get('/me', authentication_1.default.sampleTestAuth);
// // @route        POST  /me/update-password
router.post('/me/update-password', authentication_1.default.sampleTestAuth);
// // @desc         USER
// // @route        GET  /user/:id/
router.get('/user/:id/', user_1.default.sampleTestUser);
// // @route        GET  /user/:id/like
router.get('/user/:id/like', user_1.default.sampleTestUser);
// // @route        GET  /user/:id/unlike
router.get('/user/:id/unlike', user_1.default.sampleTestUser);
// // @route        GET  /most-liked
router.get('/most-liked', user_1.default.sampleTestUser);
// @desc         404
router.use('*', (req, res) => {
    res.status(404).send({ status: false, message: 'endpoint not found!' });
});
module.exports = router;
