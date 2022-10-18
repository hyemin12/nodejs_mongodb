import Header from "./Header";
import auth from "../hoc/auth";

function LandingPage() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default auth(LandingPage, null);
