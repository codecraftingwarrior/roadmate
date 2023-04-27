const jwt = require('jsonwebtoken')


const jwtTokenVerifier = (req, res, next) => {

    const jwtTokenPrefix = process.env.JWT_TOKEN_PREFIX + " "

    let token = req.headers.authorization || req.query.accessToken

    if (req.originalUrl.endsWith('/find-cities') || req.originalUrl.endsWith('/search')) {
        return next();
    }


    if (!token || token === "") {
        return res
            .status(401)
            .json({message: 'JWT Token not found'})
    }

    if (!token.startsWith(jwtTokenPrefix)) {
        return res
            .status(401)
            .json({message: 'JWT Token is not valid'})
    }

    token = token.replace(jwtTokenPrefix, "")

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({message: 'JWT Token validity checking failed.'})
        } else {
            return next()
        }
    })
}

module.exports = jwtTokenVerifier;