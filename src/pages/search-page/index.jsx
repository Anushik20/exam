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
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.results);
                } else {
                    console.error("Failed to fetch data");
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
                {searchResults.length > 0 ? (
                    <div className="flex flex-wrap gap-20 justify-center items-center mt-20">
                        {searchResults.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-5 mt-20">
                        <p className="text-6xl text-yellow-300"><MdErrorOutline /></p>
                        <p className="font-bold text-4xl">No movies found with the name "{query}"</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};
