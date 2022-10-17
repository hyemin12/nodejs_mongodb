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

- 만들어진 클라이언트가 없으면 postman을 이용
