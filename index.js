const express = require('express');
const {User} = require('./models/User');
const cookieParser = require('cookie-parser')
const config = require('./config/key');
const app = express();
const port = 3000;

// Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// Content-Type: application/json
app.use(express.json());

app.use(cookieParser());


// mongoDB 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("mongoDB Connected"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', (req, res) => {
    // 회원가입할 때 필요한 정보를 Client에서 가져와서
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) throw res.json({success: false, err});
        return res.status(200).json({
            success: true,
        });
    });
});

app.post('/login', (req, res) => {
    // 요청된 이메일을 DB에서 조회
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다."
            });
        }
        // 이메일이 DB에 존재하는 경우, 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({loginSuccess: false, message: "비밀번호가 틀립니다."})
            }
            // 비밀번호가 맞는 경우, Token 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                
                // token을 쿠키에 저장한다.
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id});
            });
        });
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})