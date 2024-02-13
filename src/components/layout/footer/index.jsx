import React from "react";
import { FaTelegram, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className="sm:w-[1630px] sm:flex-col sm:justify-center sm: items-center sm:gap-20 bg-yellow-300 flex justify-between mt-40 p-40 w-full">
            <div className="flex gap-5 text-7xl">
                <AiFillInstagram />
                <FaTelegram />
                <FaFacebook />
            </div>
            <div className="text-white text-7xl font-bold">Movie <span className="font-bold text-black">X</span></div>
        </footer>
    )
}

