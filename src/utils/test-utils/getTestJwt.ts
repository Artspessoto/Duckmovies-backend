import authConfig from "../../configs/auth.js";
import {sign} from 'jsonwebtoken';

export const getTestJwt = (user): string => {
    const {secret, expiresIn} = authConfig.jwt;

    return sign({}, secret, {
        subject: String(user.id),
        expiresIn,
    })
}
