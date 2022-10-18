node js : 자바스크립트를 브라우저가 아닌 서버 사이드에서도 사용할 수 있는 언어
express js : 웹사이트나 어플리케이션을 쉽게 만들 수 있게 도와주는 도구(프레임워크)

목차
[프로젝트 시작하기](#1-npm-package-만들기)
[몽고DB 연결 및 모델 생성](#3-mongodb-연결하기)
[회원가입기능만들기](#회원가입-기능-만들기)
[환경변수로 비밀 정보 보호](#비밀-정보-보호)
[Bcrypt\_비밀번호 암호화하기](#bcrypt로-비밀번호-암호화하기)
[로그인기능만들기](#로그인-기능-만들기)
[Auth 기능만들기](#auth기능만들기)

## 1. npm package 만들기

```
npm init
```

#### package.json 생성<br>

#### index.js 생성<br>

## 2. express js 다운받기

```
npm i express --save
```

## 3. mongoDB 연결하기<br>

#### 3-1. 클러스터 만들기<br>

#### 3-2. mongoose 다운로드<br>

mongoose : 몽고DB를 편하게 쓸 수 있는 object Modeling tool

```
npm i mongoose --save
```

## 3. 몽고DB Model & Schema

#### 모델: 스키마를 감싸주는 역할<br>

#### 스키마: 하나하나의 정보를 지정해줄 수 있는 것

```js
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
```

## 회원가입 기능 만들기

- Body-parser<br>
  Body 데이터를 분석(parse)해서 req.body로 출력해주는 것

```
npm i body-parser --save
```

index.js에서 bodyParser를 사용하기 위해서는 아래 코드를 추가해야함

```js
// index.js

const bodyParser = require("body-parser");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());
```

- 만들어진 클라이언트가 없으면 postman을 이용

### #회원가입 하기

```js
// index.js

app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  // 몽고DB method
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
```

- 성공한다면 success: true가 반환됨
  <img src="https://github.com/hyemin12/nodejs_mongodb/blob/master/markdownImg/register.JPG?raw=true" />

## 비밀 정보 보호

- 환경변수 process.env.NODE_ENV
- local 환경 : development
- deploy 환경: production

| config 폴더<br>
-| key.js <br>
-| prod.js <br>
-| dev.js <br>

```js
// key.js

if (process.env.NODE_ENV === "production") {
  // local
  module.exports = require("./prod");
} else {
  // deploy
  module.exports = require("./dev");
}
```

```js
// dev.js

module.exports = {
  mongoURI:
    "mongodb+srv://hyemiiin:<비밀번호>@cluster0.wifofb1.mongodb.net/?retryWrites=true&w=majority",
};
```

```js
// prod.js

module.exports = {
  mongoURI: process.env.MONGO_URI,
};
```

- 사용하려면 index.js에서 가져와서 사용

```js
// index.js

const config = require("./config/key");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("몽고DB 연결!"))
  .catch((err) => console.log(err));
```

## #Bcrypt로 비밀번호 암호화하기

https://www.npmjs.com/package/bcrypt

```
npm i bcrypt --save
```

암호화 하는 순서

1. Redister Route로 가기
2. 유저 정보들 (Account, Password 등)을 데이터 베이스에 저장하기 전에 암호화 시키기
3. Salt를 생성 genSalt()

- saltRounds : salt가 몇글자인지 나타내는

4. bcrypt.hash() : Salt를 이용해서 비밀번호를 암호화 해야함

```js
// Models/User.js

const bcrypt = require("bcrypt");
const saltRounds = 10;

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
  } else {
    next();
  }
});
```

> 오류가 나서 회원가입이 안되었는데, 화살표 함수를 function으로 바꾸니 실행됨.

<img src="https://github.com/hyemin12/nodejs_mongodb/blob/master/markdownImg/bcrypt.JPG?raw=true" />

## #로그인 기능 만들기

1. 데이터 베이스에서 요청한 이메일 찾기 User.findOne()
2. 데이터 베이스에 요청한 E-mail이 있다면 비밀번호가 같은지 확인

- Bcrypt를 이용하여 plain password와 암호화된 비밀번호가 같은지 확인

3. 비밀번호까지 같다면 token 생성 (토큰 생성을 위해 JSONWEBTOKEN 라이브러리 다운)

- npm i jsonwebtoken --save
- https://www.npmjs.com/package/jsonwebtoken

---

1. 데이터 베이스에서 요청한 이메일 찾기 User.findOne()

```js
// index.js

// login Route
app.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        messgae:
          "올바른 이메일 주소가 아니거나, 가입되어있지 않은 이메일입니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 올바른 비밀번호인지 확인

    // 비밀번호까지 맞다면 토큰을 생성하기
});
```

2. 데이터 베이스에 요청한 E-mail이 있다면 비밀번호가 같은지 확인

```js
// index.js

// login Route
app.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        messgae:
          "올바른 이메일 주소가 아니거나, 가입되어있지 않은 이메일입니다.",
      });
    }
    // *** 이부분 ***
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 올바른 비밀번호인지 확인
    user.comparePassWord(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      // 비밀번호까지 맞다면 토큰을 생성하기
    });
  });
});
```

- User.js 파일 가서 method 생성하기 (comparePassWord)

```js
// models/User.js

// 비밀번호 일치 여부 method
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plain Password 와 암호화된 Password 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
```

3. 비밀번호까지 같다면 token 생성 (토큰 생성을 위해 JSONWEBTOKEN 라이브러리 다운)

```js
// index.js

// login Route
app.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message:
          "올바른 이메일 주소가 아니거나, 가입되어있지 않은 이메일입니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 올바른 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // *** 이부분 ***
      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. ("쿠키" or 로컬스토리지 등등)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
```

- User.js 파일에 generateToken method 생성

```js
// models/User.js

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
```

<img src="https://github.com/hyemin12/nodejs_mongodb/blob/master/markdownImg/login.JPG?raw=true" />

## #Auth기능만들기

#### Auth 기능 사용하는 이유

1. 페이지 이동때마다 로그인 되어있는지 안되어있는지, 관리자 유저인지 등을 확인
2. 글을 쓸 때나 지울 때 권한이 있는지 확인

클라이언트 -> 서버에 쿠키에 담겨있는 token을 전달 <br>
-> 서버에 쿠키를 전달 할 때 token이 디코드 되면서 user ID 를 전달함

#### Auth 기능 만들기

1. cookie에서 저장된 token을 server에서 가져와서 복호화한다.
2. 복호화를 하면 user ID가 나오는데 그 user id를 이용해서 데이터베이스 User Collection에서
3.

```js
// index.js

// Auth Route
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});
```

```js
// middleware/Auth.js

const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;

    // middleware에서 다음 단계로 넘어가도록
    next();
  });
};

module.exports = { auth };
```

## #로그아웃 기능

1. 로그아웃하려는 유저를 찾아서 token 지우기

```js
// index.js

// Logout Route
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});
```

## #로그인페이지

## React Hooks

| 클래스 컴포넌트        | 함수형 컴포넌트     |
| ---------------------- | ------------------- |
| 더 많은 기능 사용 가능 | 한정된 기능         |
| 코드가 길어짐          | 코드 간단           |
| 복잡해짐               | 코드 간단           |
| 성능이 조금 더 느림    | 성능이 조금 더 빠름 |
