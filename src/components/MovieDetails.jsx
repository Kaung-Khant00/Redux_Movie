/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Spinner } from "flowbite-react";
import { Toaster, toast } from 'alert';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../api/api";
import { removeSelectedMovie, savedMovies, selectedMovie } from "../Redux/action/movies/actions";
export default function MovieDetails() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState({ status: false, err: false });
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movies.selectedMovie);
  const [voteCount, setVoteCount] = useState(undefined);
  const savedMoviesData = useSelector(state => state.movies.savedMovies);
  let languages = movieData.spoken_languages?.map((item) => {
    return item.english_name;
  });
  async function fetchMovieData() {
    try{
      setLoading({...loading,status:true})
      const res = await api.get(`/movie/${id}`);
      console.log(res.data);
      dispatch(selectedMovie(res.data));
      setLoading({...loading,status:false})
    }catch(err){
      setLoading({status:false,err:true})
      console.log(err)
    }
  }
  function calculateVote() {
    if (movieData.vote_average) {
      setVoteCount(0.5 * movieData?.vote_average);
    }
  }
  function hundleSaveMovies(){
    if(savedMoviesData.some(data=>data.id===movieData.id))  return toast("Movie already saved");
    dispatch(savedMovies(movieData));
  }
  useEffect(() => {
    if(savedMoviesData[savedMoviesData.length-1]==movieData){
      console.log(savedMovies)
      toast("Movie saved successfully"); 
    }
  },[savedMoviesData])
  useEffect(() => {
    console.log("hello");
    id && fetchMovieData();
    return () => {
      dispatch(removeSelectedMovie(movieData));
    };
  }, [id]);
  useEffect(() => {
    calculateVote();
  }, [movieData]);
    if (loading.err)
      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="mb-5 font-bold fa-lg">Something went wrong</h1>
          <Button
            onClick={() => {
              navigate("/")
            }}
            type="button"
          >
            Go back to home page
          </Button>
        </div>
      );
    if (loading.status)
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      );
  return (
    <>
      <div className="detail_container flex flex-col justify-start">
        <Link to={"/"}>
          <div className="goBack my-5 btn bg-dark">
            <i className="fa-solid fa-arrow-left-long"></i>
            Go back
          </div>
        </Link>
        <div className=" bg-white container">
          <div className="detail-container">
            <div className="firstChild">
              <img
                src={`https://image.tmdb.org/t/p/w300/${movieData?.poster_path}`}
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              />
            </div>
            <div className="secondChild">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Movie name
              </h2>
              <h1 className="text-gray-900 text-4xl title-font font-medium mb-1">
                {movieData.original_title}
              </h1>
              <span className="flex items-center">
                <svg
                  fill={voteCount && voteCount >= 1 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill={voteCount && voteCount >= 2 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill={voteCount && voteCount >= 3 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill={voteCount && voteCount >= 4 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill={voteCount && voteCount >= 4.8 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3 text-lg">
                  {movieData.vote_count} Voters
                </span>
              </span>
              <p className="leading-relaxed text-lg">{movieData.overview}</p>
              <div className="flex items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
              <div className="detail_infomation">
                <div className="detailinfo text-white text-lg">
                  <i className=" fa-solid fa-calendar-days me-2"></i>
                  <span>{movieData.release_date}</span>
                </div>
                <div className="detailinfo text-white text-lg">
                  <i className="fa-solid fa-heart me-2"></i>
                  <span>{movieData.popularity}</span>
                </div>
                <div className="detailinfo text-white text-lg">
                  <i className="fa-solid fa-sack-dollar me-2"></i>
                  <span>
                    {movieData && movieData?.budget > 1000
                      ? `${movieData.budget / 1000}k`
                      : movieData?.budget}
                    $
                  </span>
                </div>
                <div className="detailinfo text-white text-lg">
                  <i className="fa-solid fa-earth-americas me-2"></i>
                  <span>{languages?.join(", ")}</span>
                </div>
              </div>
              <div className="flex items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {movieData.status}
                </span>
                <button onClick={hundleSaveMovies} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-800 rounded">
                  {savedMoviesData.some(data=>data.id===movieData.id)?"Saved":"Save"}
                </button>
              </div>
            </div>
          </div>
          {movieData?.production_companies?.length>0 && (
            <>
              <div className="flex items-center pb-5 border-b-2 border-gray-400 mb-10 mx-5"></div>
              <div className="text-center text-3xl mb-5">
                Production companies
              </div>
              <div className="companies_logo">
                {movieData?.production_companies?.map((item, index) => (
                  <div key={index}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${item?.logo_path}`}
                    />
                    <div className="text-lg mt-3 bg-gray-800 text-white p-2 rounded">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <Toaster />
        </div>
      </div>
    </>
  );
}
