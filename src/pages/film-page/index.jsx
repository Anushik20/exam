import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdTime } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { TbChairDirector } from "react-icons/tb";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaRegPlayCircle } from "react-icons/fa";
import { CiTimer } from 'react-icons/ci';
import { Header, Footer } from "../../components/layout";


const api_key = "8eef5e7695b13b80e65992352495e848";

export default function Film() {
    const { id } = useParams();
    const [movieData, setFilmData] = useState(null);
    const [videoKey, setVideoKey] = useState('');
    const [similarFilms, setSimilarFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilmData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
                const data = await response.json();
                setFilmData(data);
            } catch (error) {
                console.error('Error fetching movie data:', error);
                setLoading(false)
            }
        };

        fetchFilmData();
    }, [id, api_key]);

    useEffect(() => {
        const fetchVideoKey = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`);
                const data = await response.json();
                if (data.results.length > 0) {
                    setVideoKey(data.results[0].key);
                }
            } catch (error) {
                console.error('Error fetching video key:', error);
            }
        };

        fetchVideoKey();
    }, [id, api_key]);

    useEffect(() => {
        const fetchSimilarFilms = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}`);
                const data = await response.json();
                setSimilarFilms(data.results.slice(0, 4));
            } catch (error) {
                console.error('Error fetching similar films:', error);
            }
        };

        fetchSimilarFilms();
    }, [id, api_key]);


    return (
        <>
            {!loading ? (
                <div className='flex justify-center items-center'>
                    <img className='mt-60 w-[500px] h-[500px]' src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Nmb2tuNmN2aXRoYm03OHN4cTlpbDVqZTd0MjBiODRwbHo3ajZoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif' alt='loading' />
                </div>
            ) : (
                <>
                    <Header/>
                    <main className='bg-gradient-to-r from-[#383838] to-[#8A8A8A] w-full'>
                        <div className='flex gap-[300px] w-[1600px]'>
                            {movieData ? (
                                <>
                                    <div>
                                        <img className='rounded-[30px] w-[500px] h-[700px] ml-40' src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.original_title} />
                                    </div>
                                    <div>
                                        <h1 className='text-yellow-300 font-bold text-6xl'>{movieData.original_title}</h1>
                                        <div className='flex mt-16 flex-col gap-10'>
                                            <h1 className='text-yellow-300 text-5xl flex gap-5 items-center'><IoMdTime /><span className='text-white text-2xl font-bold'>{movieData.release_date}</span></h1>
                                            <h1 className='text-yellow-300 text-5xl flex gap-5 items-center'><FaStar /><span className='text-white text-2xl font-bold'>{movieData.vote_average}</span></h1>
                                            <h1 className='text-yellow-300 text-5xl flex gap-5 items-center'><TbChairDirector /><span className='text-white text-2xl font-bold'> Movie Director </span></h1>
                                        </div>
                                        <div className='flex text-yellow-300 text-5xl items-center mt-40 gap-[20px]'>
                                            <FaRegArrowAltCircleLeft />
                                            <div className='flex gap-20'>
                                                <div>
                                                    <img className='border border-yellow-300 rounded-[50px] w-[100px]' src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-jaunes.png" alt="" />
                                                </div>
                                                <div>
                                                    <img className='border border-yellow-300 rounded-[50px] w-[100px]' src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-jaunes.png" alt="" />
                                                </div>
                                                <div>
                                                    <img className='border border-yellow-300 rounded-[50px] w-[100px]' src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-jaunes.png" alt="" />
                                                </div>
                                                <div>
                                                    <img className='border border-yellow-300 rounded-[50px] w-[100px]' src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-jaunes.png" alt="" />
                                                </div>
                                            </div>
                                            <FaRegArrowAltCircleRight />
                                        </div>
                                        <h1 className='text-white font-bold text-4xl pl-2 p-20 mt-60'>Tralier</h1>
                                        {videoKey && (
                                            <>
                                                <div className='rounded-[30px] border-4 border-yellow-300 relative right-60'>
                                                    <iframe
                                                        width="560"
                                                        height="315"
                                                        src={`https://www.youtube.com/embed/${videoKey}`}
                                                        className='rounded-[30px] w-[700px]'
                                                    ></iframe>
                                                </div>
                                                <Link to={`/trailer-page/${id}`}>
                                                    <FaRegPlayCircle className='w-[100px] text-[140px] text-white relative bottom-[230px] left-[70px]' />
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <img className='p-[700px]' src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGIwMnowbDEzOHBrd3hnMHdsMGd0ZWJ2d3d0MXBrNTRyOXRkZm42aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6036p0cTnjUrNFpAlr/giphy.gif" alt="loading" />
                            )}
                        </div>
                    </main>
                    <h1 className='text-5xl text-center font-bold m-20'>Similar Films</h1>

                    <main className='flex flex-wrap gap-20 justify-center'>

                        {similarFilms.map((movie) => (
                            <Link to={`/movie/${movie.id}`}>
                                <div key={movie.id} className="shadow-2xl w-[400px] border-4 border-yellow-300 p-10 rounded-[40px] flex flex-col gap-5">
                                    <img className="rounded-[20px] w-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width="160" alt={movie.original_title} />
                                    <h3 className="font-bold  text-2xl">{movie.original_title}</h3>
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 font-bold">
                                            <h3 className="text-yellow-300 text-2xl"><CiTimer /></h3>
                                            <span className="text-black">{movie.release_date}</span>
                                        </div>
                                        <div className="flex gap-2 font-bold">
                                            <h1 className="text-yellow-300 text-2xl"><FaStar /></h1>
                                            <span className="text-black">{movie.vote_average}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </main>
                    <Footer />
                </>
            )}
        </>
    );
}
