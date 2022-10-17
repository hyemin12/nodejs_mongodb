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
