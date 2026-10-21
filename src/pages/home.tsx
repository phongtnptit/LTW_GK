import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);

        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!res.ok) {
          throw new Error("Lỗi tải dữ liệu");
        }

        const data: Post[] = await res.json();

        const saved: Post[] = JSON.parse(
          localStorage.getItem("posts") || "[]"
        );

        setPosts([...saved, ...data]);
      } catch {
        setError("Không thể lấy dữ liệu từ API");

        const saved: Post[] = JSON.parse(
          localStorage.getItem("posts") || "[]"
        );

        setPosts(saved);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  const result = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Danh sách bài viết</h1>

      <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Đang tải dữ liệu...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && result.length === 0 && (
        <p>Không tìm thấy bài viết.</p>
      )}

      {result.map((post) => (
        <div className="card" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body.slice(0, 100)}...</p>
          <Link to={`/posts/${post.id}`}>Xem chi tiết</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;