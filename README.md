node js : 자바스크립트를 브라우저가 아닌 서버 사이드에서도 사용할 수 있는 언어
express js : 웹사이트나 어플리케이션을 쉽게 만들 수 있게 도와주는 도구(프레임워크)

목차
[프로젝트 시작하기](#1-npm-package-만들기)
[몽고DB 연결 및 모델 생성](#3-mongodb-연결하기)
[회원가입기능만들기](#회원가입-기능-만들기)
[환경변수로 비밀 정보 보호](#비밀-정보-보호)
[Bcrypt\_비밀번호 암호화하기](#bcrypt로-비밀번호-암호화하기)

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
  }
});
```

> 오류가 나서 회원가입이 안되었는데, 화살표 함수를 function으로 바꾸니 실행됨.

<img src="https://github.com/hyemin12/nodejs_mongodb/blob/master/markdownImg/bcrypt.JPG?raw=true />
