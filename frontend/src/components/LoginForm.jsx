import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/authSlice";
import Spinner from "./Spinner";

const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;

    console.log(name + ": " + value);

    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onClick = (e) => {
    e.preventDefault();

    if (!(username && password)) {
      toast.error("Fill out the forms");
    } else {
      const userData = {
        username: username,
        password: password,
      };
      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <form>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username: "
          value={username}
          onChange={onChange}
        />

        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password: "
          value={password}
          onChange={onChange}
        />

        <button onClick={onClick}>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
