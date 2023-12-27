"use client"
import styling from './SearchBar.module.css';
import React, { useState, useEffect,useRef } from 'react';
import { SearchImage } from '@/public/assets/svgs';
const SearchBar = () =>{
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.location.href = `https://www.google.com/search?q=${searchTerm}`;
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === '/') {
                event.preventDefault();
                inputRef.current?.focus();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return(
        <div className = {styling['searchbar-main']} >
            <div>
                <form onSubmit={handleSubmit} id={styling['searchbar-form']}>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="Search Google"
                        ref={inputRef}
                    />
                    <button type="submit" className={styling['search-submit-btn']}>
                        <SearchImage/>
                    </button>
                </form>
            </div>

        </div>
    )
}

export default SearchBar;