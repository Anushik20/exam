import React from "react";
import { FaTelegram, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className="sm:w-[1890px] sm:flex-col sm:justify-center sm:items-center bg-[#032541] flex justify-between p-10 w-full">
            <div className="flex gap-5 text-white text-4xl">
                <AiFillInstagram />
                <FaTelegram />
                <FaFacebook />
            </div>
            <div className="text-white text-4xl font-bold">Movie <span className="font-bold text-yellow-300">X</span></div>
        </footer>
    )
}
