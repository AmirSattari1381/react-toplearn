import jwt from "jsonwebtoken";

export const decodeToken = (token) => {
    return jwt.decode(token, { complete: true });//completeیعنی صبرکن تاtokenما decode بشه چون ما به شکل کامل میخاهیمش
};
