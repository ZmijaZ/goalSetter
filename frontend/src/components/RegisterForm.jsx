import { useState } from "react";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = form;

  const onChange = (e) => {
    const { name, value } = e.target;

    console.log(name + ": " + value);

    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onClick = (e) => {
    e.preventDefault();

    console.log("Register button pressed");
  };

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
