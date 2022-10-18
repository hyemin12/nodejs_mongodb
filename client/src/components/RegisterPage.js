import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../_actions/userAction";

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      name: userName,
      email,
      password,
    };
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        alert("회원가입 성공!");
        navigate("/login");
      } else {
        alert("회원가입을 실패했습니다.");
      }
    });
  };

  return (
    <div className="container">
      <div className="form_container">
        <div className="form_wrapper">
          <h2 className="form_title">회원가입</h2>
          <form className="form" onSubmit={onSubmit}>
            <label>이름</label>
            <input
              name="userName"
              type="text"
              value={userName}
              onChange={onChange}
            />
            <label>이메일</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={onChange}
            />

            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={onChange}
            />
            <label>비밀번호 확인</label>
            <input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={onChange}
            />
            <button type="submit">회원가입</button>
          </form>
          <Link to="/login" className="btn_link">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
