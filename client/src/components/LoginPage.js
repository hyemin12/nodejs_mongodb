import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/userAction";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Error˝");
      }
    });
  };

  return (
    <div className="form_container">
      <form className="form" onSubmit={onSubmit}>
        <label>이메일</label>
        <input name="email" type="email" value={email} onChange={onChange} />

        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
