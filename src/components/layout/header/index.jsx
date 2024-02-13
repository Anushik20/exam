import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";

const api_key = "8eef5e7695b13b80e65992352495e848";

export default function Header() {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== "") {
            navigate(`/search/${searchInput}`);
            setSearchInput("");
        } else {
            alert("Enter movie name");
        }
    };

    const handleAutocompleteSelection = (selectedTitle) => {
        setSearchInput(selectedTitle);
        setSearchResults([]);
    };

    useEffect(() => {
        const fetchAutocomplete = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(searchInput)}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.results.map(movie => movie.title));
                } else {
                    console.error("Failed to fetch autocomplete data");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (searchInput.trim() !== "") {
            fetchAutocomplete();
        } else {
            setSearchResults([]);
        }
    }, [searchInput]);

    const isSearchPage = location.pathname.startsWith("/search");

    return (
        <header className=" sm:w-[1650px] sm:h-[500px] bg-gradient-to-r from-[#383838] to-[#8A8A8A] w-full h-[300px]">
            <div className={`sm:flex-col sm:gap-[2px] flex justify-around items-center w-auto ${isSearchPage ? 'gap-[700px]' : 'gap-[1150px]'}`}>
                <a href='/' className={`text-white font-bold text-4xl pt-[100px]`}>Movie <span className="font-bold text-4xl text-yellow-300">X</span></a>
                <form onSubmit={handleSearch}>
                    <GoSearch className={`sm:left-[250px] text-white text-3xl relative left-[250px] top-[117px] ${isSearchPage ? 'left-[650px]' : 'left-[250px]'}`} />
                    <input
                        type="text"
                        className={`text-white border border-yellow-300 p-5 mt-[70px] relative rounded-[50px] bg-inherit ${isSearchPage ? 'left-[-180px] w-[900px]' : 'w-[300px]'}`}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute mt-12 bg-white border border-gray-200 rounded-md shadow-md">
                            {searchResults.map((title, index) => (
                                <div key={index} className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={() => handleAutocompleteSelection(title)}>
                                    {title}
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </header>
    )
}

