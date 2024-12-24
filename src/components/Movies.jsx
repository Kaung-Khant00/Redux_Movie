import { Card, Spinner } from "flowbite-react";
import { useState } from "react";
import {Link} from "react-router"
export default function Movies(movieData) {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  console.log(movieData);
  return (
    <>
      <Link to={`/movie/${movieData?.id}`}>
      <div className="card-container">
        <Card className="card">
          {
            <img
              src={`https://image.tmdb.org/t/p/w300/${movieData?.poster_path}`}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          }
          {isLoading && (
            <div className="flex justify-center">
              <Spinner aria-label="Extra large spinner example" size="xl" />
              <span>Image Loading ...</span>
            </div>
          )}
          <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movieData?.original_title}
          </h5>
          <p className=" description font-normal text-gray-700 dark:text-gray-400">
            {movieData?.overview}
          </p>
          <div className="flex justify-center gap-5">
            <div className="detailinfo text-white p-3">
              <i className="fa-solid fa-calendar-days me-2"></i>
              {movieData?.release_date}
            </div>
            <div className="detailinfo text-white p-3">
              <i className="fa-solid fa-heart me-2"></i>
              {movieData?.popularity}
            </div>
          </div>
        </Card>
      </div>
      </Link>
    </>
  );
}
