import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div class="sticky-sm-top">
      <nav class="navbar  navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand mx-4 text-white" to="/">
            BlogPost
          </Link>
        </div>
      </nav>
    </div>
  );
}
