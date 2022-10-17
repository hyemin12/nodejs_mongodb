import { useState } from "react";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    if (name === "text") {
      setName(value);
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
      name,
    };
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <lable>이름</lable>
        <input type="text" value={name} onChange={onChange} />
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
