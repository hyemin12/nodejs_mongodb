import axios from "axios";
import { useNavigate } from "react-router-dom";

function BtnLogout() {
  const navigate = useNavigate();
  const onClickLogout = () => {
    axios.get("/api/users/logout").then((res) => {
      console.log(res);
      if (res.data.success) {
        navigate("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };
  return <button onClick={onClickLogout}>로그아웃</button>;
}

export default BtnLogout;
