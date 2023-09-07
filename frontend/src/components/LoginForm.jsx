import { useState } from "react";

const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const onChange = (e) => {
    const { name, value } = e.target;

    console.log(name + ": " + value);

    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onClick = (e) => {
    e.preventDefault();

    console.log("Login button pressed");
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

        <button onClick={onClick}>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
