import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Layout
import { Header } from '../../components/layout';
// React icon
import { PiBracketsSquareBold } from "react-icons/pi"

const api_key = "8eef5e7695b13b80e65992352495e848";

export default function TrailerPage() {
    const { id } = useParams();
    const [videoKey, setVideoKey] = useState('');
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        fetchVideoKey();
    }, [id, api_key]);

    const handleFullScreen = () => {
        const videoElement = document.querySelector('iframe');
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) {
            videoElement.msRequestFullscreen();
        }
    };

    return (
        <>
            <Header />
            <div className='sm:w-[1900px] sm:h-[2150px] bg-gradient-to-r from-[#383838] to-[#8A8A8A] w-full h-[800px] flex flex-col gap-40 justify-center items-center'>
                <h1 className='text-white text-5xl text-center font-bold'>Movie Trailer</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Nmb2tuNmN2aXRoYm03OHN4cTlpbDVqZTd0MjBiODRwbHo3ajZoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading" />
                    </div>
                ) : (
                    <div>
                        <div className='rounded-[30px] border-[4px] border-yellow-300 relative w-[800px] h-[400px]'>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${videoKey}`}
                                className='rounded-[30px] w-[790px] h-[390px]'
                            ></iframe>
                            <PiBracketsSquareBold className='absolute bottom-[12px] right-[23px] text-white text-xl cursor-pointer' onClick={handleFullScreen} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

