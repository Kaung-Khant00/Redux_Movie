import { Button, Navbar } from "flowbite-react";
import { api } from "../api/api";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../Redux/action/movies/actions";
import { NavLink, useLocation, useNavigate } from "react-router";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch();
  const inputRef = useRef('');
  async function hundleSearch(e) {
    e.preventDefault();
    try{
      const res = await api.get(`/search/movie`,{
        params:{
          query:inputRef.current.value}
      });
      console.log(res.data.results)
      dispatch(fetchMovies(res.data.results))
      navigate("/")
    }catch(err){
      console.log(err)
    }
    inputRef.current.value=''
  }
  return (
<div className="navBar">
<Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Movie Core
        </span>
      </Navbar.Brand>

      <Navbar.Collapse>
        <Navbar.Link active={location.pathname === "/"}>
            <NavLink to="/">
              <div>Home</div>
            </NavLink>
        </Navbar.Link>
        <Navbar.Link active={location.pathname === "/saved"}>
            <NavLink to="/saved">
              <div>Saved Movies</div>
            </NavLink>
        </Navbar.Link>
      </Navbar.Collapse>

      <form onSubmit={hundleSearch}>
        <div className="flex md:order-2">
          <input ref={inputRef} placeholder="Search Movie . . ." />
          <Button type="submit">Search</Button>
        </div>
      </form>
      <Navbar.Toggle />
    </Navbar>
</div>
  );
}
