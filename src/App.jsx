import "./App.css"
import { Route, Routes } from "react-router";
import NotFound from "./components/NotFound";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<MovieList/>}/>
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/saved" element={<MovieList/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </>
  );
};

export default App;