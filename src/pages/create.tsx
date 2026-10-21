
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      setError("Không được để trống");
      return;
    }

    if (title.trim().length < 5) {
      setError("Tiêu đề phải có ít nhất 5 ký tự");
      return;
    }

    if (body.trim().length < 10) {
      setError("Nội dung phải có ít nhất 10 ký tự");
      return;
    }

    const saved: Post[] = JSON.parse(
      localStorage.getItem("posts") || "[]"
    );

    const newPost: Post = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim()
    };

    try {
      localStorage.setItem(
        "posts",
        JSON.stringify([newPost, ...saved])
      );

      navigate("/");
    } catch {
      setError("Không thể lưu bài viết");
    }
  }

  return (
    <div className="container">
      <h1>Viết bài mới</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Nội dung"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Đăng bài</button>
      </form>
    </div>
  );
}

export default Create;
