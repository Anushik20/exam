import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Layout
import { Header, Footer } from "../../components/layout";
// React icon
import { MdErrorOutline } from "react-icons/md";
import MovieCard from "../../components/movie-card";

const api_key = "8eef5e7695b13b80e65992352495e848";

export default function SearchResultPage() {
    const { query } = useParams();
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}`);
                if (response.ok) {
                    setLoading(false)
                    const data = await response.json();
                    setSearchResults(data.results);
                } else {
                    setLoading(true)
                    alert("Something went wrong, please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (query.trim() !== "") {
            fetchMovies();
        }
    }, [query]);


    return (
        <>
            <Header />
            <div>
                <h1 className='text-white text-5xl text-center font-bold'>Movie Trailer</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Nmb2tuNmN2aXRoYm03OHN4cTlpbDVqZTd0MjBiODRwbHo3ajZoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading" />
                    </div>
                ) : (
                    <>
                        {searchResults.length > 0 ? (
                            <div className="sm:flex sm:w-[1910px] flex flex-wrap gap-20 justify-center items-center mt-20">
                                {searchResults.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <div className="sm:w-[1890px] sm:pb-[700px] flex justify-center items-center gap-5 mt-20">
                                <p className="sm:text-center text-6xl text-yellow-300"><MdErrorOutline /></p>
                                <p className="sm:text-center font-bold text-4xl">No movies found with the name "{query}"</p>
                            </div>
                        )
                        }
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};
