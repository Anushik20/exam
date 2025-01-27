import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
// React icons
import { IoMdTime } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { TbChairDirector } from "react-icons/tb";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaRegPlayCircle } from "react-icons/fa";
// Layout
import { Header, Footer } from "../../components/layout";
// Movie Card
import MovieCard from '../../components/movie-card';

const api_key = "8eef5e7695b13b80e65992352495e848";

export default function Film() {
    const { id } = useParams();
    const [movieData, setFilmData] = useState(null);
    const [videoKeys, setVideoKeys] = useState([]);
    const [similarFilms, setSimilarFilms] = useState([]);
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const iconsDesign = 'text-yellow-300 text-3xl flex gap-5 items-center'

    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setter(data);
            } catch (error) {
                console.error('Something went wrong, please try again later!');
            }
        };

        const fetchMovieData = () => fetchData(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`, setFilmData);
        const fetchVideos = () => fetchData(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`, data => setVideoKeys(data.results.slice(0, 4).map(result => result.key)));
        const fetchSimilar = () => fetchData(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}`, data => setSimilarFilms(data.results.slice(0, 4)));
        const fetchCredits = () => fetchData(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`, data => setActors(data.cast.slice(0, 4)));

        Promise.all([fetchMovieData(), fetchVideos(), fetchSimilar(), fetchCredits()])
            .then(() => setLoading(false))
            .catch(error => console.error('Your error is:', error));

    }, [id]);

    const memoizedMovieData = useMemo(() => movieData, [movieData]);
    const memoizedVideoKeys = useMemo(() => videoKeys, [videoKeys]);
    const memoizedSimilarFilms = useMemo(() => similarFilms, [similarFilms]);
    const memoizedActors = useMemo(() => actors, [actors]);

    return (
        <>
            {loading ? (
                <div className='flex justify-center items-center'>
                    <img className='mt-60 w-[800px] h-[800px]' src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Nmb2tuNmN2aXRoYm03OHN4cTlpbDVqZTd0MjBiODRwbHo3ajZoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif' alt='loading' />
                </div>
            ) : (
                <>
                    <Header />
                    <main className='sm:w-[1890px] bg-white w-3/4 pt-20'>
                        <div className='w-full h-[1400px] flex gap-[200px] flex-col'>
                            {memoizedMovieData && (
                                <>
                                    <div className='flex gap-[100px] pl-[50px]'>
                                        <img className='w-[600px] h-[800px]' src={`https://image.tmdb.org/t/p/w500${memoizedMovieData.poster_path}`} alt={memoizedMovieData.original_title} />
                                        <div>
                                            <h1 className='font-bold text-5xl drop-shadow-md'>{memoizedMovieData.original_title}</h1>
                                            <div className='flex mt-16 flex-col gap-10'>
                                                <div>
                                                    <p className='text-2xl font-medium'>About movie: <span className='text-[15px] italic font-normal'>{memoizedMovieData.overview}</span></p>
                                                </div>
                                                <h1 className={iconsDesign}><IoMdTime /><span className='text-black text-2xl font-medium'>{memoizedMovieData.release_date}</span></h1>
                                                <h1 className={iconsDesign}><FaStar /><span className='text-black text-2xl font-medium'>{memoizedMovieData.vote_average.toFixed(1)}</span></h1>
                                                <h1 className={iconsDesign}><TbChairDirector /><span className='text-black text-2xl font-medium'>{memoizedActors[0]?.name}</span></h1>
                                            </div>
                                            <div className='mt-32'>
                                                <h1 className='text-3xl font-medium pb-10'>Actors</h1>
                                                <div className='flex items-center gap-20'>
                                                    {memoizedActors.map(actor => (
                                                        <div key={actor.id}>
                                                            <img className='w-[100px] h-[150px]' src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='text-black font-bold text-center text-4xl pb-20'>Trailers</h1>
                                        <div className='flex justify-center gap-20'>
                                            {memoizedVideoKeys.map((key, index) => (
                                                <div key={index} className='relative'>
                                                    <Link to={`/trailer-page/${id}`} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                                        <FaRegPlayCircle className='w-[100px] text-[140px] text-white' />
                                                    </Link>
                                                    <div className='rounded-[30px] border-4 border-yellow-300'>
                                                        <iframe
                                                            src={`https://www.youtube.com/embed/${key}`}
                                                            className='rounded-[30px] w-[250px] h-[200px]'
                                                        ></iframe>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </main>
                    <h1 className='sm:text-center sm:w-[1870px] bg-white w-3/4 p-20 text-5xl text-center font-bold'>Similar Films</h1>
                    <div className='sm:w-[1870px] w-3/4 bg-white flex flex-wrap gap-20 justify-center pb-20'>
                        {memoizedSimilarFilms.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}


