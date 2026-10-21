import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./pages/home";
import Detail from "./pages/detail";
import Login from "./pages/login";
import Create from "./pages/create";

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem("login") === "true"
  );

  function logout() {
    localStorage.removeItem("login");
    setLogin(false);
  }

  return (
    <>
      <nav>
        <Link to="/">Trang chủ</Link>

        {login ? (
          <>
            <Link to="/create">Viết bài</Link>
            <button onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/posts/:id" element={<Detail />} />

        <Route
          path="/login"
          element={<Login setLogin={setLogin} />}
        />

        <Route
          path="/create"
          element={
            login ? <Create /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="*"
          element={
            <div className="container">
              <h1>404 - Không tìm thấy trang</h1>
              <Link to="/">Quay lại trang chủ</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;