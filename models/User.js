const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // bcrypt
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minLength: 5,
    },
    lastname: {
        type: String,
        maxLength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {  // 비밀번호를 변경할때만
        // 비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword: test1234
    // encryptPassword: $2b$10$9UDKJ9ltWNgqFrpbs7PBwOD6SCzxxCv5lvZZ7YIlMVxsvbX0LImJS
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);

        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function (cb) {
    var user = this;
    // jsonwebtoken 를 이용해서 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};
const User = mongoose.model('User', userSchema);

module.exports = {User};