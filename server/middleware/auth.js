const {User} = require('../models/User');

const auth = (req, res, next) => {
    // 인증 처리를 한다

    // 클라이언트 쿠키에서 토큰을 가져온다
    const token = req.cookies.x_auth;
    // 토큰을 복호화한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next();
    })
    // 유저가 있는 경우, OK

    // 유저가 없는 경우, NO
};

module.exports = {auth};