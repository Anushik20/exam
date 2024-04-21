import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopularMovies, setRatedMovies } from "../../redux/actions/index";
import { Header, Footer } from "../../components/layout";
import MovieCard from "../../components/movie-card";

const api_key = "8eef5e7695b13b80e65992352495e848";
const popularFilmsApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
const ratedFilmsApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`;

export default function Home() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const popularMovies = useSelector((state) => state.movies.popularMovies);
    const ratedMovies = useSelector((state) => state.movies.ratedMovies);

    const printFilms = async (url, setMovies) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const movieData = await response.json();

            if (movieData.results.length === 0) {
                alert("0 films with this caption");
                setMovies([]);
            } else {
                setMovies(movieData.results.slice(0, 10));
            }
        } catch (error) {
            setLoading(false);
            alert("Something went wrong please try again later!");
        }
    };

    useEffect(() => {
        printFilms(popularFilmsApiUrl, (movies) =>
            dispatch(setPopularMovies(movies))
        );
        printFilms(ratedFilmsApiUrl, (movies) =>
            dispatch(setRatedMovies(movies))
        );
    }, [dispatch]);

    const memoizedPopularMovies = useMemo(() => popularMovies, [popularMovies]);
    const memoizedRatedMovies = useMemo(() => ratedMovies, [ratedMovies]);

    return (
        <>
            {!loading ? (
                <div className="flex justify-center items-center">
                    <img
                        className="mt-60 w-[500px] h-[500px]"
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Nmb2tuNmN2aXRoYm03OHN4cTlpbDVqZTd0MjBiODRwbHo3ajZoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif"
                        alt="loading"
                    />
                </div>
            ) : (
                <>
                    <Header />
                    <div className="xl:w-[1890px] bg-white w-3/4">
                        <div className="flex justify-center items-center m-20">
                            <div className="flex justify-center items-center flex-col">
                                <div className="flex">
                                    {memoizedPopularMovies.map((movie) => (
                                        <div key={movie.id}>
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-[300px]" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex">
                                    {memoizedRatedMovies.map((movie) => (
                                        <div key={movie.id}>
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-[300px]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-20 sm:items-center items-start pl-28">
                            <h1 className="sm:text-6xl sm:text-start sm:w-[800px] font-bold text-yellow-300 text-2xl">
                                Watch everywhere.
                            </h1>
                            <h1 className="sm:text-4xl sm:text-start sm:w-[800px] text-xl">
                                Stream unlimited popularMovies and TV shows on your phone, tablet,
                                laptop, and TV without paying more.
                            </h1>
                        </div>
                    </div>
                    <div className="sm:w-[1890px] w-3/4 bg-white">
                        <h1 className="sm:text-center text-center font-bold text-4xl mt-20 mb-20">Most popular films</h1>
                        <div className="flex justify-center items-center flex-wrap gap-20">
                            {memoizedPopularMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                        <h1 className="text-center font-bold text-4xl mt-40 mb-20">Most rated films</h1>
                        <div className="flex justify-center items-center flex-wrap gap-20 mb-20">
                            {memoizedRatedMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}
