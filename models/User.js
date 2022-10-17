const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // 공백제거
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    // 기본값
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  // token 유효기간
  tokenExp: {
    type: Number,
  },
});

// 정보를 저장하기 전에 기능 실행
userSchema.pre("save", function (next) {
  var user = this;

  // 패스워드가 변경될 때마다
  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        // 성공했을 경우 password를 hash로 변경
        user.password = hash;
        next();
      });
    });
  }
});

// 스키마 모델로 감싸기
const User = mongoose.model("User", userSchema);

module.exports = { User };
