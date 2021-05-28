import { Request, Response, NextFunction } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import config from '../configs/config';
import user from './user';
import { authentificationModel } from '../models/authentification';

const authorizationUserToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization != undefined) {
        jwt.verify(req.headers.authorization, config.TOKEN, (err, data: any) => {
            if (err) {
                res.status(404).json({ status: false, message: err.message });
            } else {
                // req.body.userData = data.id;
                // next();
                authentificationModel
                    .finduserbyid(data.id)
                    .then((result: any) => {
                        req.body.userData = result[0];
                        next();
                    })
                    .catch((err) => {
                        return res.status(400).json({
                            status: false,
                            message: 'User Not Found!'
                        });
                    });
            }
        });
    } else {
        res.status(404).json({ status: false, message: 'Token Is Missing On Header!' });
    }
};

export default { authorizationUserToken };
