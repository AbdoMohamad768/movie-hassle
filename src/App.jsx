import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  useDebounce(
    function () {
      setDebounceSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  function fetchMovies() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log("Fetched");
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setSearchTerm("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {}, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-[20px]">All Movies</h2>

          {isLoading ? (
            <p className="text-white">
              <Spinner />
            </p>
          ) : errorMessage ? (
            <p className="text-red-50">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
