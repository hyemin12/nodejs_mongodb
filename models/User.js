const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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

/** 비밀번호 암호화
 * 정보를 저장하기 전에 기능 실행 */
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
  } else {
    next();
  }
});

/** 비밀번호 일치 여부 method */
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plain Password 와 암호화된 Password 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/** token 생성 method */
userSchema.methods.generateToken = function (cb) {
  var user = this;

  // jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  // userSchema.token에 생성된 token 할당
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// 스키마 모델로 감싸기
const User = mongoose.model("User", userSchema);

module.exports = { User };
