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
                    setSearchResults(data.results.map(movie => movie.title).slice(0, 8));
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
        <header className=" sm:w-[1890px] sm:h-[500px] bg-[#032541] w-full flex items-center justify-center">
            <div className={`sm:flex-col sm:gap-[2px] flex justify-center items-center  ${isSearchPage ? 'gap-[400px]' : 'gap-[200px]'}`}>
                <div className="flex justify-center items-center gap-40">
                    <a href='/' className={`text-white font-bold text-4xl`}>Movie <span className="font-bold text-4xl text-yellow-300">X</span></a>

                    <div className="flex gap-10">
                        <div className="text-white text-xl">About Us</div>
                        <div className="text-white text-xl">Terms Of Use</div>
                        <div className="text-white text-xl">Contact Us</div>
                    </div>
                </div>
                <form onSubmit={handleSearch}>
                    <GoSearch className={`sm:left-[250px] text-gray-400 text-3xl relative left-[250px] top-[35px] ${isSearchPage ? 'sm:left-[350px] left-[450px]' : 'left-[250px]'}`} />
                    <input
                        type="text"
                        className={`p-2 rounded-[10px] mb-10 ${isSearchPage ? 'sm:w-[400px] left-[10px] w-[500px]' : 'w-[300px]'}`}
                        value={searchInput}
                        placeholder="Search movies..."
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute mt-12 bg-white border border-gray-200 rounded-md shadow-md">
                            {searchResults.map((title, index) => (
                                <div key={index} className={`py-2 px-4 cursor-pointer hover:bg-gray-100`} onClick={() => handleAutocompleteSelection(title)}>
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

