import { AnyCnameRecord } from 'dns';
import db from '../configs/db';
var createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
var updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

export let authentificationModel = {
    finduser: (userData: any) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE name= ?', [userData.name], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    },
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
    createuserprofile: (userData: any) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user (name,password,created_at,updated_at) VALUES(?,?,?,?)', [userData.name, userData.password, createdAt, updatedAt], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    },
    updateuserpassword: (userData: any, newPassword: string) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET password= ?,updated_at = ? WHERE id = ?', [newPassword, updatedAt, userData.id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
};
