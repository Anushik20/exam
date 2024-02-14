import React from 'react';
import { IoIosTime } from "react-icons/io";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const ratingPercentage = Math.floor(movie.vote_average * 10);

    return (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="sm:w-[600px] relative shadow-xl w-[400px] border-4 p-5 border-yellow-300 rounded-[20px]">
                <img className="rounded-[10px] w-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width="160" alt={movie.original_title} />
                <div className={`absolute bottom-28 left-80 border-4 m-2 w-[60x] h-[60x] border-yellow-300 p-3 rounded-[50%] bg-black`}>
                    <span className="text-white">{ratingPercentage}%</span>
                </div>
                <div className="p-5">
                    <h3 className="font-medium text-2xl pb-5">{movie.original_title}</h3>
                    <div className='flex gap-2 items-center'>
                        <IoIosTime className='text-yellow-300 text-xl' />
                        <h3 className="text-black text-center">{movie.release_date}</h3>
                    </div>
                </div>
            </div>
        </Link >
    );
}

export default MovieCard;
