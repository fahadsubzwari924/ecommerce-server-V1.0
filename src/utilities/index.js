export const STATUS_CODE = {
    NOT_FOUND: 404,
    OK: 200,
    BAD_GATEWAY: 502
}

export function parseBody(req) {
    let obj;
    if (typeof req.body === 'object') {
        obj = req.body;
    } else {
        obj = JSON.parse(req.body);
    }

    return obj;
}

export function isAllStatusResolved(itemArray, element) {
    let flag = false;
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i][element] == false) {
            flag = false;
            break;
        } else {
            flag = true;
        }
    }
    return flag;
}

export function generateResponse(success, message, data, res) {
    res.json({ success, message, data });
}

export function getCurrentTimestamp() {
    let date = new Date();
    return date.getTime();
}

export async function generateApiKey() {
    var result = '';
    var characters = 'A!@#$^|^%$#BCDEFGHIJKLMNOPQ#$%^":><RSTUVWXYZabcdefghi&^%$#jklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 24; i++) {
        result += characters.charAt(Math.floor(Math.random() * 24));
    }
    return result;
}

