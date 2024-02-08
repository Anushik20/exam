import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosStar, IoIosTime } from "react-icons/io";
import { Header, Footer } from "../../components/layout";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const api_key = "8eef5e7695b13b80e65992352495e848";

const SearchResultPage = () => {
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
                            <Link to={`/movie/${movie.id}`}>
                                <div key={movie.id} className="shadow-2xl w-[400px] border-4 border-yellow-300 p-10 rounded-[40px] flex flex-col gap-5">
                                    <img className="rounded-[20px] w-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width="160" alt={movie.original_title} />
                                    <h3 className="font-bold  text-2xl">{movie.original_title}</h3>
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 font-bold">
                                            <h3 className="text-yellow-300 text-2xl"><IoIosStar /></h3>
                                            <span className="text-black">{movie.release_date}</span>
                                        </div>
                                        <div className="flex gap-2 font-bold">
                                            <h1 className="text-yellow-300 text-2xl"><IoIosStar /></h1>
                                            <span className="text-black">{movie.vote_average}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
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

export default SearchResultPage;