import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  // const AuthenticPage = Auth({ 컴포넌트 이름 }, option, adminRoute)
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthLandingPage />}></Route>
        <Route path="/login" element={<AuthLoginPage />}></Route>
        <Route path="/register" element={<AuthRegisterPage />}></Route>
        <Route path="/*" element={<h2>알 수 없는 페이지</h2>} />
      </Routes>
    </div>
  );
}

export default App;
