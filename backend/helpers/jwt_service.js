const JWT = require("jsonwebtoken");
const createError = require("http-errors");

// Sign a new access token
const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,
        };

        // Create secret
        const secret = process.env.SECRET_ACCESS_TOKEN;

        // Create options
        const options = {
            expiresIn: "30m",
        };

        // Sign a new token
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve({ token, expired: Date.now() + 30 * 60 * 1000 });
        });
    });
};

// Handle verify access token
const verifyAccessToken = (req, res, next) => {
    try {
        // Check authorization field in header is exists
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            throw createError.Unauthorized();
        }

        // Get token in authoriztion field
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];

        // Verify token is correct
        JWT.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, payload) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    throw createError.Unauthorized();
                }
                throw createError.Unauthorized(err.message);
            }

            req.payload = payload;
            next();
        });
    } catch (error) {
        next(error);
    }
};

// Sign a new refresh token
const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,
        };

        // Create secret
        const secret = process.env.SECRET_REFRESH_TOKEN;

        // Create options
        const options = {
            expiresIn: "1y",
        };

        // Sign a new token
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve({ token, expired: options.expiresIn });
        });
    });
};

// Handle verify refresh token
const vefiryRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        // Check refresh token is exists
        if (!refreshToken) {
            throw createError.BadRequest();
        }

        // Verify refresh token
        JWT.verify(
            refreshToken,
            process.env.SECRET_REFRESH_TOKEN,
            (err, payload) => {
                if (err) {
                    if (err.name === "JsonWebTokenError") {
                        throw createError.Unauthorized();
                    }
                    throw createError.Unauthorized(err.message);
                }

                req.payload = payload;
                next();
            }
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    vefiryRefreshToken,
};
