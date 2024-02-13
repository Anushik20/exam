import React from 'react';
import { IoIosTime, IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => (
    <Link to={`/movie/${movie.id}`} key={movie.id}>
        <div className="shadow-2xl w-[400px] border-4 border-yellow-300 p-10 rounded-[40px] flex flex-col gap-5" key={movie.id}>
            <img className="rounded-[20px] w-full " src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width="160" alt={movie.original_title} />
            <h3 className="font-bold  text-2xl">{movie.original_title}</h3>
            <div className="flex justify-between">
                <div className="flex gap-2 font-bold">
                    <h3 className="text-yellow-300 text-2xl"><IoIosTime /></h3>
                    <span className="text-black">{movie.release_date.substring(0, 4)}</span>
                </div>
                <div className="flex gap-2 font-bold">
                    <h1 className="text-yellow-300 text-2xl"><IoIosStar /></h1>
                    <span className="text-black">{movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </div>
    </Link>
);

export default MovieCard;
