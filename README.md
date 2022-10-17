node js : 자바스크립트를 브라우저가 아닌 서버 사이드에서도 사용할 수 있는 언어
express js : 웹사이트나 어플리케이션을 쉽게 만들 수 있게 도와주는 도구(프레임워크)

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
  <img src="./markdownImg/register.jpg" />

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
