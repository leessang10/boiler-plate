const express = require('express');
const {User} = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');
const app = express();
const port = 3000;

// Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// Content-Type: application/json
app.use(express.json());


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

    // DB에 넣어준다
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})