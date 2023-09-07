import { FaSignInAlt, FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="login">
        <FaSignInAlt></FaSignInAlt>Login
      </Link>
      <Link to="register">
        <FaUser></FaUser>Register
      </Link>
    </header>
  );
};

export default Header;
