import { useState } from "react";

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "text") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      email,
      password,
      userName,
    };
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <lable>이름</lable>
        <input type="text" value={userName} onChange={onChange} />
        <lable>이메일</lable>
        <input type="email" value={email} onChange={onChange} />

        <lable>비밀번호</lable>
        <input type="password" value={password} onChange={onChange} />
        <lable>비밀번호 확인</lable>
        <input />
      </form>
    </div>
  );
}

export default RegisterPage;
