// import chalk from "chalk";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const verifyToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).send({ err });
            }
            console.log("decoded", decoded) // bar
            return res.status(200).send({ status: 200, message: ("User Authenticated") });
            return next();
        });
    } catch (error) {
        return res.status(401).send({ error });
    }
}


export default verifyToken;