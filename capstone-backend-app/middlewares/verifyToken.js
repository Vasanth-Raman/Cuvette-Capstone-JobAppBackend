const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_JWT_CODE;

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not found or valid",
      });
    }

    const decode = jwt.verify(token, secret);
    //console.log(decode);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token not found or valid",
    });
  }
};

module.exports = verifyToken;
