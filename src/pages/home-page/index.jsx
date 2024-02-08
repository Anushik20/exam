import React, { useState, useEffect } from "react";
import { IoIosTime, IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { Header, Footer } from "../../components/layout";

const api_key = "8eef5e7695b13b80e65992352495e848";
const popularFilmsApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
const ratedFilmsApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`;

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [popularMovies, setPopularMovies] = useState([]);
    const [ratedMovies, setRatedMovies] = useState([]);


    const printFilms = async (url, setStateFunction) => {
        setLoading(true)
        try {
            const response = await fetch(url);
            const movieData = await response.json();

            if (movieData.results.length === 0) {
                alert("0 films with this caption");
                setStateFunction([]);
            } else {
                setStateFunction(movieData.results.slice(0, 8));
            }
        } catch (error) {
            setLoading(false)
            alert('Your error is -', error);
        }
    };

    useEffect(() => {
        printFilms(popularFilmsApiUrl, setPopularMovies);
        printFilms(ratedFilmsApiUrl, setRatedMovies);
    }, []);

    return <>
        {!loading ? (
            <div className='flex justify-center items-center'>
                <img className='mt-60 w-[500px] h-[500px]' src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Nmb2tuNmN2aXRoYm03OHN4cTlpbDVqZTd0MjBiODRwbHo3ajZoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif' alt='loading' />
            </div>
        ) : (
            <>
                <Header />
                <div className="bg-gradient-to-r from-[#383838] to-[#8A8A8A] w-full h-[1000px]">
                    <div className="flex gap-20 justify-center">
                        <div>
                            <img className="w-[700px] h-[500px] shadow-2xl rounded-[30px]" src="https://s3-alpha-sig.figma.com/img/140d/fd6f/d289cf1280148e031106db38fb3c6001?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iE7DrP-wr38TNj~0f5U8EY-QWR86Jmmztk8lgmn2dWQOdJ54zaiFf3g~OQkHNG0T9nYCT8m2h47BIyBLRfpjOlEQ0ggVlBbMz9N~YUqMtKVNrZPlUi9g~tv4gkH~aqPaoqRAkiUmbELTKgznsj00JS0iwTQFqCmkL6NuO~R9i8lAJgV0T5weErh0EyCVQu7ukNRTWxDjTmTlQfyHZOh8ac8Yh22IzwpHLI1L8nPG2wCWlQP04fMhBpmXyN0P4HbCPvqWmfMkbkK9xM7hWIvCXcqTwGNNzxFpNTvr3SyUno2uEOcCCRqJx-FMSkCzW9LcmhHFIlW5zlaUARmkSNEjHA__" alt="Marvel Film Poster" />
                            <button className="relative left-[550px] top-[-100px] bg-yellow-300 rounded-[40px] p-6 font-bold">Watch Now</button>
                        </div>
                        <img className="w-[450px] shadow-2xl h-[500px] rounded-2xl" src="https://s3-alpha-sig.figma.com/img/d97c/104a/f133486f49834126471729ea082009ef?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XTI7WrDB8Yjot7EGrqbzyx901cJPtFcTefJt~ptOAKfSDIsZVOLUczdRoZ2nHMxKhU3aW1QLWAJFK1RuCF5~4PsePcutJ6ERAhol9KYL~NdbykNpzF312eE~6U9M1tCEKj3N9vEJ4hRNliUICnI7~vu1o-ZExB-stA7GiGyO6f9Nos6aSPbMmXiea1m4DAv2X7el3CfVqxOZoBnx3PN44vr8GOgFbvkaZlSJkqEeIGaUqNuabcb~3qU1yXyc9qND5PsjD1FqItSYQIWcOjswf1LbUR6LbvNXWjSD--EHG75D0LRuTOoeCV9hhp-rmGyoFhaW3sBRm4RZebzfGaRJAA__" alt="Film Poster" />
                        <img className="w-[450px] shadow-2xl h-[500px] rounded-2xl" src="https://s3-alpha-sig.figma.com/img/f368/a951/b122f979ac847d4b5621a342f5d7e0ba?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Oj-HGdk3i9TNPzyHjSwVOktV4FRsFO6-D67OxSwYnHiQDh5C2eudwWyAxiveB09IzkSVFjBPy1-0Rg0qlCGZ0jpiFyWD~SOARMU9qxF08fLm-BastAPqFAS-QhBenDbzhOlbsrRSdbx6PVTj4gO0oIdjregDb7X8MDffc8z7ysj5GsDyxBt5cVnDFACCRwWhELUt5pFZmY5RTjM1-VeJpJpGNOpcB4YgZm8BYflmF5zOOoLISMUoQH6RukxLHPQQEMlg7YQjBMtBsNZOdCzoRM5AE18O2PYPcEIYiMnJUcIRSYbjjiggFdwK2LOPFu-jXO9wWVtkUnIO6wrjqWAeBA__" alt="Venom Film Poster" />
                    </div>
                    <div className="flex flex-col gap-[100px]">
                        <h1 className="font-bold text-yellow-300 text-4xl mt-[100px] pl-[150px]">Watch everywhere.</h1>
                        <h1 className="text-white text-3xl pl-[150px]">Stream unlimited popularMovies and TV shows on your phone, tablet, laptop, and TV without paying more.</h1>
                    </div>
                </div>
                <div>
                    <h1 className="text-center font-bold text-4xl mt-40 mb-20">Most popular films</h1>
                    <div className="flex justify-center items-center flex-wrap gap-20">
                        {popularMovies.map((movie) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id}>
                                <div className="shadow-2xl w-[400px] border-4 border-yellow-300 p-10 rounded-[40px] flex flex-col gap-5" key={movie.id}>
                                    <img className="rounded-[20px] w-full " src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width="160" alt={movie.original_title} />
                                    <h3 className="font-bold  text-2xl">{movie.original_title}</h3>
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 font-bold">
                                            <h3 className="text-yellow-300 text-2xl"><IoIosTime /></h3>
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
                    <h1 className="text-center font-bold text-4xl mt-40 mb-20">Most rated films</h1>
                    <div className="flex justify-center items-center flex-wrap gap-20">
                        {ratedMovies.map((movie) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id}>
                                <div className="shadow-2xl w-[400px] border-4 border-yellow-300 p-10 rounded-[40px] flex flex-col gap-5" key={movie.id}>
                                    <img className="rounded-[20px] w-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width="160" alt={movie.original_title} />
                                    <h3 className="font-bold  text-2xl">{movie.original_title}</h3>
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 font-bold">
                                            <h3 className="text-yellow-300 text-2xl"><IoIosTime /></h3>
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
                </div >
                <Footer />
            </>
        )}
    </>
}