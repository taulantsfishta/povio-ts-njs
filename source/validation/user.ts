import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userValidation = {
    signup: () => {
        return [
            body('name').not().isEmpty().withMessage('is empty').isString().withMessage('is not a string'),
            body('password').not().isEmpty().withMessage('is empty').isLength({ min: 6 }).withMessage('minimum length 6 char')
        ];
    },
    userId: () => {
        return [param('id').not().isEmpty().withMessage('is empty').isNumeric().withMessage('should be numeric')];
    },

    validate: (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        let extractedErrors = new Array();
        errors.array().map((err) => extractedErrors.push([err.param, err.msg]));
        return res.json({
            status: 'false',
            message: extractedErrors[0][0] + ' ' + extractedErrors[0][1]
        });
    }
};
