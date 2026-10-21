import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  body: string;
}

function Detail() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDetail() {
      try {
        setLoading(true);
        setError("");
        setPost(null);
        setComments([]);

        const saved: Post[] = JSON.parse(
          localStorage.getItem("posts") || "[]"
        );

        const localPost = saved.find(
          (p) => p.id === Number(id)
        );

        if (localPost) {
          setPost(localPost);
          return;
        }

        const res1 = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        const res2 = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );

        if (!res1.ok || !res2.ok) {
          throw new Error("Lỗi tải dữ liệu");
        }

        const postData: Post = await res1.json();
        const commentData: Comment[] = await res2.json();

        if (!postData.id) {
          throw new Error("Không tìm thấy bài viết");
        }

        setPost(postData);
        setComments(commentData);
      } catch {
        setError("Không thể tải chi tiết bài viết");
      } finally {
        setLoading(false);
      }
    }

    getDetail();
  }, [id]);

  if (loading) return <p className="container">Đang tải...</p>;

  if (error) return <p className="container error">{error}</p>;

  if (!post) return <p className="container">Không tìm thấy bài viết.</p>;

  return (
    <div className="container">
      <Link to="/">Quay lại</Link>

      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h2>Bình luận ({comments.length})</h2>

      {comments.length === 0 && <p>Chưa có bình luận.</p>}

      {comments.map((c) => (
        <div className="card" key={c.id}>
          <h4>{c.name}</h4>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Detail;