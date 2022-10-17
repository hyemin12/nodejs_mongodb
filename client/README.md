## #Cors

- 두개의 다른 포트를 가지고 있는 서버는 아무 설정 없이 request를 보낼 수 없음!
- cors 이슈 때문, cross-origin resource sharing (CORS)
- 보안을 위해서
- 해결방법 : 여러가지 방법 (proxy)

```
npm i http-proxy-middleware --save
```

```js
// setUpProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
```

### #Proxy?

- 아이피를 proxy 서버에서 임의로 바꿀 수 있다. 그래서 인터넷에서는 접근 하는 IP를 모르게 된다.
- 보내는 데이터도 임의로 바꿀 수 있다.

#### 기능

1. 방화벽 기능
2. 웹 필터 기능
3. 캐시 데이터, 겅유 데이터 제공 기능

#### 사용하는 이유?

1. 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
2. 캐쉬를 이용해 더 바른 인터넷 이용 제공
3. 더 나은 보안 제공
4. 이용 제한된 사이트 접근 가능

## #서버 여러개 키기

```
npm i concurrently --save
```
