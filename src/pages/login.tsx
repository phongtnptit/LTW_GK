import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

interface Props {
  setLogin: (value: boolean) => void;
}

function Login({ setLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username === "admin" && password === "123456") {
      localStorage.setItem("login", "true");
      setLogin(true);
      navigate("/create");
    } else {
      if (username !== "admin"){
        setError("Sai tài khoản")
      } else {
        setError("Sai mât khẩu")
      }
    }
  }

  return (
    <div className="container">
      <h1>Đăng nhập</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Đăng nhập</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;