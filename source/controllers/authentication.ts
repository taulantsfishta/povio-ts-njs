import { Request, Response, NextFunction } from 'express';
import { authentificationModel } from '../models/authentification';
import jwt from 'jsonwebtoken';
import config from '../configs/config';
const bcrypt = require('bcrypt');

const signUp = (req: Request, res: Response, next: NextFunction) => {
    authentificationModel
        .finduser(req.body)
        .then((userExist: any) => {
            if (Object.keys(userExist).length > 0) {
                return res.status(404).json({ status: false, message: 'User Exist!' });
            } else {
                var salt = bcrypt.genSaltSync(10);
                var hashpassword = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hashpassword;
                authentificationModel
                    .createuserprofile(req.body)
                    .then((userCreated: any) => {
                        return res.status(200).json({ status: true, message: 'User Is Created!' });
                    })
                    .catch((err) => {
                        return res.status(400).json({ status: false, message: err });
                    });
            }
        })
        .catch((err) => {
            return res.status(400).json({
                status: false,
                message: err
            });
        });
    // return res.status(200).json('AUTH');
};

const login = (req: Request, res: Response, next: NextFunction) => {
    authentificationModel
        .finduser(req.body)
        .then((userExist: any) => {
            if (!(Object.keys(userExist).length > 0)) {
                return res.status(404).json({ status: false, message: 'Username Not Found!' });
            } else {
                bcrypt.compare(req.body.password, userExist[0].password, function (err: string, isMatch: boolean) {
                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: err
                        });
                    } else if (!isMatch) {
                        return res.status(404).json({
                            status: false,
                            message: 'Password Is Incorrect!'
                        });
                    } else {
                        const userToken = jwt.sign({ id: userExist[0].id }, config.TOKEN);
                        return res.status(200).json({
                            token: userToken
                        });
                    }
                });
            }
        })
        .catch((err) => {
            return res.status(400).json({
                status: false,
                message: err
            });
        });
};

const me = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        status: true,
        message: req.body.userData
    });
};

const updatePassword = (req: Request, res: Response, next: NextFunction) => {
    authentificationModel
        .finduserbyid(req.body.userData.id)
        .then((userExist: any) => {
            if (!(Object.keys(userExist).length > 0)) {
                return res.status(404).json({ status: false, message: 'User Not Found!' });
            } else {
                bcrypt.compare(req.body.old_password, userExist[0].password, function (err: string, isMatch: boolean) {
                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: err
                        });
                    } else if (!isMatch) {
                        return res.status(404).json({
                            status: false,
                            message: 'old_password is incorrect'
                        });
                    } else {
                        var salt = bcrypt.genSaltSync(10);
                        var hashpassword = bcrypt.hashSync(req.body.new_password, salt);
                        req.body.password = hashpassword;
                        authentificationModel
                            .updateuserpassword(req.body.userData, req.body.password)
                            .then((result: any) => {
                                return res.status(200).json({
                                    status: true,
                                    message: 'User Password Has Been Updated!'
                                });
                            })
                            .catch((err) => {
                                return res.status(400).json({
                                    status: false,
                                    message: err
                                });
                            });
                    }
                });
            }
        })
        .catch((err) => {
            return res.status(400).json({
                status: false,
                message: err
            });
        });
};

export default { signUp, login, me, updatePassword };
