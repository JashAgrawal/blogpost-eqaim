import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
function BlogDetail() {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        alert("error fetching blog " + err);
      });
  }, []);
  function createMarkup() {
    return { __html: blog.content };
  }
  return (
    <div>
      <Link to="/">
        <div class="position-fixed top-5 start-0">
          <button className="btn btn-primary m-3 px-4 p-3">
            <FaHome />
          </button>
        </div>
      </Link>
      <div className="m-3">
        <h1>{blog.title}</h1>
        <div
          style={{ whiteSpace: "pre-wrap" }}
          className="container text-center"
          dangerouslySetInnerHTML={createMarkup()}
        ></div>
      </div>
    </div>
  );
}

export default BlogDetail;
