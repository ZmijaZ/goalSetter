import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/authSlice";
import Spinner from "./Spinner";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/"); //redirect
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

    if (!(username && password && confirmPassword)) {
      toast.error("Pleast enter all fields");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      };

      console.log("pre");
      dispatch(register(userData));
      console.log("posle");
    }

    console.log("Register button pressed");
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

        <input
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password: "
          value={confirmPassword}
          onChange={onChange}
        />
        <button onClick={onClick}>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
