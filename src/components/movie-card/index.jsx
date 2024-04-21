import React, { useState } from 'react';
import { IoIosTime } from "react-icons/io";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const wrapTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return `${title.substring(0, maxLength)}...`;
        }
        return title;
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div
                className={`sm:w-[600px] relative shadow-lg w-[200px] rounded-b-[20px]`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="w-full relative"
                    style={{
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <img
                        className="w-full"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        width="160"
                        alt={movie.original_title}
                        style={{ filter: isHovered ? 'brightness(50%)' : 'brightness(100%)', transition: 'filter 0.3s' }}
                    />
                    {isHovered && (<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />)}
                </div>
                <div className={`absolute top-[10px] h-[25px] w-[60px] text-center bg-[#141517]`}>
                    <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="p-5">
                    <h3 className="font-medium text-xl pb-5 truncate">{wrapTitle(movie.original_title, 20)}</h3>
                    <div className='flex gap-2 items-center'>
                        <IoIosTime className='text-black text-xl' />
                        <h3 className="text-black text-center">{movie.release_date.slice(0, 4)}</h3>
                    </div>
                </div>
            </div>
        </Link >
    );
}

export default MovieCard;
