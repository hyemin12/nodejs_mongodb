import { Link } from "react-router-dom";
import BtnLogout from "./BtnLogout";

function Header() {
  return (
    <div>
      <h1>Nodejs + React</h1>
      <Link to="/login">로그인</Link>
      <Link to="/register">회원가입</Link>
      <BtnLogout />
    </div>
  );
}

export default Header;
