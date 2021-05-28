import * as express from 'express';
import authenticationController from '../controllers/authentication';
import userController from '../controllers/user';
import jwttoken from '../controllers/jwttoken';
import { userValidation } from '../validation/user';
import { authValidation } from '../validation/authentification';

const router = express.Router();

// // @desc         Welcome
// // @route        GET  /
router.get('/', (req, res) => {
    res.status(200).json('WELCOME ');
});

// // @desc         Auth
// // @route        POST  /signup
router.post('/signup', authValidation.signup(), authValidation.validate, authenticationController.signUp);
// @route        POST  /login
router.post('/login', authenticationController.login);
// // @route        GET  /me
router.get('/me', jwttoken.authorizationUserToken, authenticationController.me);
// // @route        POST  /me/update-password
router.put('/me/update-password', jwttoken.authorizationUserToken, authValidation.updatePassword(), authValidation.validate, authenticationController.updatePassword);

// // @desc         USER
// // @route        GET  /user/:id/
router.get('/user/:id/', userValidation.userId(), userValidation.validate, userController.userLikesAndUsername);
// // @route        GET  /user/:id/like
router.get('/user/:id/like', jwttoken.authorizationUserToken, userValidation.userId(), userValidation.validate, userController.likeAUser);
// // @route        GET  /user/:id/unlike
router.get('/user/:id/unlike', jwttoken.authorizationUserToken, userValidation.userId(), userValidation.validate, userController.unLikeAUser);
// // @route        GET  /most-liked
router.get('/most-liked', userController.getMostLikedUsers);

// @desc         404
router.use('*', (req, res) => {
    res.status(404).send({ status: false, message: 'endpoint not found!' });
});

export = router;
