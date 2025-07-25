import React from "react";
import { useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  console.log(API_KEY);
  
  const fetchMovieDetails = async (imdbID) => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
      const data = await res.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
        setShowModal(true);
      } else {
        setError("Could not fetch movie details....");
      }
    } catch (err) {
      console.error("Failed to fetch movie details: ", err);
      setError("Failed to fetch movie details...  ");
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Movie Search App</h1>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value.trimStart())}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            } else if (e.key === "Escape") {
              setQuery("");
              setMovies([]);
              setError(null);
              setHasSearched(false);
            }
          }}
          disabled={loading}
          style={{ padding: "8px", maxwidth: "300px", width: "80%", marginBottom: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 12px", backgroundColor:"#007BFF", color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setMovies([]);
              setError(null);
              setHasSearched(false);
            }}
            style={{padding:'8px 12px', backgroundColor:"#eee", border:"1px solid #ccc"}}
          >Clear</button>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading movies....</p>}

        {!loading && movies.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} onClick={() => fetchMovieDetails(movie.imdbID)} />
            ))}
          </div>
        )}

        {hasSearched && !loading && !error && query.trim() !== "" && movies.length === 0 && <p>No movies found for "{query}". Try a different title</p>}

        {!loading && !error && query.trim() === "" && <p>Start by searching for a movie above...</p>}
      </div>
      {showModal && <MovieModal movie={selectedMovie} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
