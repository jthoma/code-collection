const Memcached = require('memcached-elasticache');
const crypto = require('crypto');
const memcached = new Memcached(process.env.ELASTICACHE_ENDPOINT);
const SessionTtl = 1440; // 24 minutes

async function sessionStart(event) {
   let sessionId = getSessionIdFromCookie(event.headers.Cookie);

    if (!sessionId) {
        sessionId = generateSessionId();
    }

    return sessionId;
}

async function sessionSetValue(sessionId, key, value) {
    return new Promise((resolve, reject) => {
        if (sessionId) {
            memcached.set(`${sessionId}:${key}`, value, SessionTtl, (err, status) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(status);
                }
            });
        } else {
            reject(new Error('Session ID is missing'));
        }
    });
}

async function sessionGetValue(sessionId, key) {
    return new Promise((resolve, reject) => {
        if (sessionId) {
            memcached.get(`${sessionId}:${key}`, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        } else {
            reject(new Error('Session ID is missing'));
        }
    });
}

function generateSessionId() {
    return crypto.randomBytes(32).toString('hex');
}

function getSessionIdFromCookie(cookieHeader) {
    if (!cookieHeader) {
        return null;
    }
    const cookies = cookieHeader.split(';');
    for (let cookie of cookies) {
        const parts = cookie.trim().split('=');
        if (parts[0] === 'sessionId') {
            return parts[1];
        }
    }
    return null;
}

/*
 this goes into Set-Cookie property of multiValueHeaders property of lambda response object 
*/

function headerToSetCookie(sessionId) {
   return `sessionId=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SessionTtl}` ;
}

module.exports = {
    start: sessionStart,
    set: sessionSetValue,
    get: sessionGetValue,
    hdr: headerToSetCookie
};
