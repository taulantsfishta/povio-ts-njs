import { Request, Response, NextFunction } from 'express';
import { userModel } from '../models/user';
import userSchema from '../schema/user';

const userLikesAndUsername = (req: Request, res: Response, next: NextFunction) => {
    userModel
        .finduserbyid(req.params.id)
        .then((userExist: any) => {
            if (!(Object.keys(userExist).length > 0)) {
                return res.status(404).json({ status: false, message: 'User Not Found!' });
            } else {
                userModel
                    .likesofuser(req.params.id)
                    .then((likes: any) => {
                        if (!(Object.keys(likes).length > 0)) {
                            return res.status(404).json({ status: false, message: 'Like Not Found!' });
                        } else {
                            let userLikesSchema = userSchema.userLikes(userExist[0], likes.length);
                            return res.status(200).json({ status: true, message: userLikesSchema });
                        }
                    })
                    .catch((err) => {
                        return res.status(400).json({
                            status: false,
                            message: err
                        });
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

const likeAUser = (req: Request, res: Response, next: NextFunction) => {
    userModel
        .finduserbyid(req.params.id)
        .then((userExist: any) => {
            if (!(Object.keys(userExist).length > 0)) {
                return res.status(404).json({ status: false, message: 'User Not Found!' });
            } else {
                userModel
                    .checkiflikeExist(req.body.userData.id, req.params.id)
                    .then((likeExist: any) => {
                        if (Object.keys(likeExist).length > 0) {
                            return res.status(404).json({ status: false, message: 'Like Exist!' });
                        } else {
                            userModel
                                .likeauser(req.body.userData.id, req.params.id)
                                .then((result: any) => {
                                    return res.status(200).json({
                                        status: true,
                                        message: 'Like Is Registred'
                                    });
                                })
                                .catch((err) => {
                                    return res.status(400).json({
                                        status: false,
                                        message: err
                                    });
                                });
                        }
                    })
                    .catch((err) => {
                        return res.status(400).json({
                            status: false,
                            message: err
                        });
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

const unLikeAUser = (req: Request, res: Response, next: NextFunction) => {
    userModel
        .finduserbyid(req.params.id)
        .then((userExist: any) => {
            if (!(Object.keys(userExist).length > 0)) {
                return res.status(404).json({ status: false, message: 'User Not Found!' });
            } else {
                userModel
                    .checkiflikeExist(req.body.userData.id, req.params.id)
                    .then((likeExist: any) => {
                        if (!(Object.keys(likeExist).length > 0)) {
                            return res.status(404).json({ status: false, message: "Like Doesn't Exist!" });
                        } else {
                            userModel
                                .unlikeauser(req.body.userData.id, req.params.id)
                                .then((result: any) => {
                                    return res.status(200).json({
                                        status: true,
                                        message: 'Unlike Is Registred'
                                    });
                                })
                                .catch((err) => {
                                    return res.status(400).json({
                                        status: false,
                                        message: err
                                    });
                                });
                        }
                    })
                    .catch((err) => {
                        return res.status(400).json({
                            status: false,
                            message: err
                        });
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

const getMostLikedUsers = (req: Request, res: Response, next: NextFunction) => {
    userModel
        .finduserlike()
        .then((userLike: any) => {
            if (!(Object.keys(userLike).length > 0)) {
                return res.status(404).json({ status: false, message: 'No Like Found' });
            } else {
                let userNumberLikesSchema = new Array();
                userLike.forEach((element: any) => {
                    userNumberLikesSchema.push(userSchema.userNumberOfLikes(element));
                });
                return res.json({ status: true, message: userNumberLikesSchema });
            }
        })
        .catch((err) => {
            return res.status(400).json({
                status: false,
                message: err
            });
        });
};

export default { userLikesAndUsername, likeAUser, unLikeAUser, getMostLikedUsers };
