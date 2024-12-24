/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { api } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../Redux/action/movies/actions";
import Movies from "./Movies";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function MovieList() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movies.movies);
  const savedMovies = useSelector((state) => state.movies.savedMovies);
  console.log(savedMovies)
  const [loading, setLoading] = useState({ status: false, err: false });

  const fetchMovie = async () => {
    setLoading({ ...loading, status: true });
    try {
      const res = await api.get(`/movie/now_playing`);
      dispatch(fetchMovies(res.data.results));
    } catch (err) {
      console.log(err);
      return setLoading({ status: false, err: true });
    }
    setLoading({ ...loading, status: false });
  };
  useEffect(() => {
    if (movieData.length === 0) {
      fetchMovie();
    }
  }, []);
  if (loading.err)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-5 font-bold fa-lg">Something went wrong</h1>
        <Button
          onClick={() => {
            location.reload();
          }}
          type="button"
        >
          Refresh the page
        </Button>
      </div>
    );
  if (loading.status)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
    console.log(savedMovies?.length)
  if (location.pathname === "/saved") {
    return (
      <div>
          <div className="fa-xl text-center mt-8">
            Saved Movies
          </div>
        <div className="card_container">
          { savedMovies?.length > 0 ? (
            savedMovies?.map((movieData) => (
              <Movies key={movieData.id} {...movieData} />
            ))
          ) : (
            <div>
              <h1 className="text-2xl font-bold">No saved movies</h1>
              <Button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to home Page
        </Button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="card_container">
          {movieData &&
            movieData?.map((movieData) => (
              <Movies key={movieData.id} {...movieData} />
            ))}
        </div>
      </div>
    );
  }
}
