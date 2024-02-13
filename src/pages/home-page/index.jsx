import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// Movies
import { setPopularMovies, setRatedMovies } from '../../redux/actions/index'
// React icon
import { FaAngleRight } from "react-icons/fa6";
// Layout
import { Header, Footer } from "../../components/layout";
// Movie Cars
import MovieCard from "../../components/movie-card";

const api_key = "8eef5e7695b13b80e65992352495e848";
const popularFilmsApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
const ratedFilmsApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`;

export default function Home() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const popularMovies = useSelector(state => state.movies.popularMovies);
    const ratedMovies = useSelector(state => state.movies.ratedMovies);

    const printFilms = async (url, setMovies) => {
        setLoading(true)
        try {
            const response = await fetch(url);
            const movieData = await response.json();

            if (movieData.results.length === 0) {
                alert("0 films with this caption");
                setMovies([]);
            } else {
                setMovies(movieData.results.slice(0, 8));
            }
        } catch (error) {
            setLoading(false)
            alert('Something went wrong please try again later!');
        }
    };

    useEffect(() => {
        printFilms(popularFilmsApiUrl, (movies) => dispatch(setPopularMovies(movies)));
        printFilms(ratedFilmsApiUrl, (movies) => dispatch(setRatedMovies(movies)));
    }, [dispatch]);

    const memoizedPopularMovies = useMemo(() => popularMovies, [popularMovies]);
    const memoizedRatedMovies = useMemo(() => ratedMovies, [ratedMovies]);


    return (
        <>
            {!loading ? (
                <div className='flex justify-center items-center'>
                    <img className='mt-60 w-[500px] h-[500px]' src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Nmb2tuNmN2aXRoYm03OHN4cTlpbDVqZTd0MjBiODRwbHo3ajZoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif' alt='loading' />
                </div>
            ) : (
                <>
                    <Header />
                    <div className="sm:w-[1650px] bg-gradient-to-r from-[#383838] to-[#8A8A8A] w-full">
                        <div className="flex gap-10 justify-center items-center">
                            <div className="sm:flex-col flex justify-center items-center gap-10 pb-40">
                                <img className="sm:w-[900px] sm:h-[600px] w-[700px] h-[500px] shadow-2xl rounded-2xl" src="https://s3-alpha-sig.figma.com/img/140d/fd6f/d289cf1280148e031106db38fb3c6001?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iE7DrP-wr38TNj~0f5U8EY-QWR86Jmmztk8lgmn2dWQOdJ54zaiFf3g~OQkHNG0T9nYCT8m2h47BIyBLRfpjOlEQ0ggVlBbMz9N~YUqMtKVNrZPlUi9g~tv4gkH~aqPaoqRAkiUmbELTKgznsj00JS0iwTQFqCmkL6NuO~R9i8lAJgV0T5weErh0EyCVQu7ukNRTWxDjTmTlQfyHZOh8ac8Yh22IzwpHLI1L8nPG2wCWlQP04fMhBpmXyN0P4HbCPvqWmfMkbkK9xM7hWIvCXcqTwGNNzxFpNTvr3SyUno2uEOcCCRqJx-FMSkCzW9LcmhHFIlW5zlaUARmkSNEjHA__" alt="Marvel Film Poster" />
                                <img className="sm:w-[900px] sm:h-[600px] w-[500px] h-[500px] shadow-2xl rounded-2xl" src="https://s3-alpha-sig.figma.com/img/d97c/104a/f133486f49834126471729ea082009ef?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XTI7WrDB8Yjot7EGrqbzyx901cJPtFcTefJt~ptOAKfSDIsZVOLUczdRoZ2nHMxKhU3aW1QLWAJFK1RuCF5~4PsePcutJ6ERAhol9KYL~NdbykNpzF312eE~6U9M1tCEKj3N9vEJ4hRNliUICnI7~vu1o-ZExB-stA7GiGyO6f9Nos6aSPbMmXiea1m4DAv2X7el3CfVqxOZoBnx3PN44vr8GOgFbvkaZlSJkqEeIGaUqNuabcb~3qU1yXyc9qND5PsjD1FqItSYQIWcOjswf1LbUR6LbvNXWjSD--EHG75D0LRuTOoeCV9hhp-rmGyoFhaW3sBRm4RZebzfGaRJAA__" alt="Film Poster" />
                                <img className="sm:w-[900px] sm:h-[600px] w-[500px] h-[500px] shadow-2xl rounded-2xl" src="https://s3-alpha-sig.figma.com/img/f368/a951/b122f979ac847d4b5621a342f5d7e0ba?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Oj-HGdk3i9TNPzyHjSwVOktV4FRsFO6-D67OxSwYnHiQDh5C2eudwWyAxiveB09IzkSVFjBPy1-0Rg0qlCGZ0jpiFyWD~SOARMU9qxF08fLm-BastAPqFAS-QhBenDbzhOlbsrRSdbx6PVTj4gO0oIdjregDb7X8MDffc8z7ysj5GsDyxBt5cVnDFACCRwWhELUt5pFZmY5RTjM1-VeJpJpGNOpcB4YgZm8BYflmF5zOOoLISMUoQH6RukxLHPQQEMlg7YQjBMtBsNZOdCzoRM5AE18O2PYPcEIYiMnJUcIRSYbjjiggFdwK2LOPFu-jXO9wWVtkUnIO6wrjqWAeBA__" alt="Venom Film Poster" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-20 sm:items-center items-start pl-28">
                            <h1 className="sm:text-6xl sm:text-start sm:w-[800px] font-bold text-yellow-300 text-4xl">Watch everywhere.</h1>
                            <h1 className="text-white sm:text-4xl sm:text-start sm:w-[800px] text-3xl pb-20">Stream unlimited popularMovies and TV shows on your phone, tablet, laptop, and TV without paying more.</h1>
                        </div>
                    </div>
                    <div className="sm:w-[1630px]">
                        <h1 className="sm:text-center text-center font-bold text-4xl mt-40 mb-20">Most popular films</h1>
                        <div className="flex justify-center items-center flex-wrap gap-20">
                            {memoizedPopularMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                        <h1 className="text-center font-bold text-4xl mt-40 mb-20">Most rated films</h1>
                        <div className="flex justify-center items-center flex-wrap gap-20">
                            {memoizedRatedMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div >
                    <Footer />
                </>
            )}
        </>
    );
}