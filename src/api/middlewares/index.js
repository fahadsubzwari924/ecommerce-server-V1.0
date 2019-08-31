'use strict';


import { verify } from "jsonwebtoken";
import config from "../../conf";




export function log(req, res, next) {
    console.log(req.originalUrl);
    next();
}

export function loggedIn(req, res, next) {
    decodeToken(req).then(data => {
        if(data.user){
            req.user = data.user;
            next();
        } else {
            res.status(403).json({ success: 405, error: ["Unauthenticated request"] });
        }        
    }).catch(ex => {
        console.error(ex);
        res.status(405).json({ success: 405, error: ["Unauthenticated request"] });
    });
}

export function decodeToken(req) {
    return new Promise((resolve, reject) => {
        let { token } = req.headers;
        verify(token, `${config.app['jwtsecret']}`, (err, decoded) => {
            if (err === null) {
                resolve(decoded);
            } else {
                reject(err);
            }
        });
    });
}


export function decodeTokenForPassword(token){
    return new Promise((resolve,reject)=>{
        verify(token, `${config.app['jwtsecret']}`, (err, decoded) => {
            if (err === null) {
                resolve(decoded);
            } else {
                resolve(null);
            }
        });
    })
}
