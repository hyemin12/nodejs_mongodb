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

## #인증 체크

- 들어갈 수 있는 페이지들에 대한 통제 HOC

```
const EnhancedComponent = higherOrderComponent(WrappedComponent)
```

> 컴포넌트를 받은 다음에 새로운 컴포넌트를 리턴

HOC(Auth) -> 백엔드에 request 보내기 -> 백엔드에서 상태를 보내줌 -> HOC에서 구분(Auth)

```js
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
```

#### SpecificComponent

- 승인 받아야하는 컴포넌트

#### option

- null => 아무나 출입이 가능한 페이지
- true => 로그인한 유저만 출입이 가능한 페이지
- false => 로그인한 유저는 출입 불가능한 페이지

#### adminRoute

- 관리자 경로

```js
// hoc/auth.js
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(authUser()).then((response) => {
        if (!response.payload.isAuth) {
          // 로그인 하지 않은 상태
          if (option) {
            navigate("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
```
