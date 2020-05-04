import './index.css';
import React from "react";

const Search = ({ onSearch, onSubmit, children }) =>
    <div className="Search">
        <form onSubmit={onSubmit}>
            <div class="container input-field">
                <input type="text" onChange={onSearch} placeholder="   Search a title">
                </input>
                <button type="submit" className="button-search">
                    {children}
                </button>
            </div>
        </form>
    </div>

export default Search;