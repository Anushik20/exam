import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const location = useLocation()

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== "") {
            navigate(`/search/${searchInput}`);
            setSearchInput("");
        } else (
            alert("Enter movie name")
        )
    };

    const isSearchPage = location.pathname.startsWith("/search");

    return (
        <header className="bg-gradient-to-r from-[#383838] to-[#8A8A8A] w-full h-[300px]">
            <div className="flex justify-center gap-[800px]">
                <a href='/' className="text-white font-bold text-4xl pt-[100px] pl-[100px]">Movie <span className="font-bold text-4xl text-yellow-300">X</span></a>
                <form onSubmit={handleSearch}>
                    <GoSearch className={`text-white text-3xl relative top-[117px] ${isSearchPage ? 'left-[850px]' : ' left-[650px]'}`} />
                    <input
                        type="text"
                        className={`text-white border border-yellow-300 p-5 mt-[70px] rounded-[50px] bg-inherit ${isSearchPage ? 'w-[900px]' : 'w-[300px] ml-[400px]'}`}
                        placeholder="Search movies..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </form>
            </div>
        </header>
    )
}