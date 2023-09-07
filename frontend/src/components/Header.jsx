import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      {user ? (
        <>
          <h2>Welcome {user.username}</h2>
          <button onClick={onLogout}>
            <FaSignOutAlt></FaSignOutAlt>Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="login">
            <FaSignInAlt></FaSignInAlt>Login
          </Link>
          <Link to="register">
            <FaUser></FaUser>Register
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
