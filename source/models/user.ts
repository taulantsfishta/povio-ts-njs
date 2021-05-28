import { create } from 'ts-node';
import db from '../configs/db';

var createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
var updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

export let userModel = {
    finduserbyid: (id: any) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE id= ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    },
    checkiflikeExist: (sourceUserId: string, targetUserId: string) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM interaction WHERE source_user_id= ? AND target_user_id= ? AND type= ?', [sourceUserId, targetUserId, 1], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    },
    likeauser: (sourceUserId: string, targetUserId: string) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO interaction (source_user_id,target_user_id,type,created_at,updated_at) VALUES (?,?,?,?,?)',
                [sourceUserId, targetUserId, 1, createdAt, updatedAt],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                }
            );
        });
    },
    unlikeauser: (sourceUserId: string, targetUserId: string) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM interaction WHERE source_user_id = ? AND target_user_id = ? AND type= ?', [sourceUserId, targetUserId, 1], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    },
    likesofuser: (sourceUserId: string) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM interaction WHERE source_user_id= ?', [sourceUserId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    },
    finduserlike: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(source_user_id) as numberoflikes, source_user_id FROM interaction WHERE type=1 GROUP BY source_user_id ORDER BY count(source_user_id) DESC', (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
};
