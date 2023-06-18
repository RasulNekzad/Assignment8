import React, {useState, useEffect} from "react";
import axios from "axios";


const SearchField = ({setQuery, fetchGifs}) => {

    return (
        <div>
            <input type="text" onChange={e => setQuery(e.target.value)}/>
            <button onClick={fetchGifs}>Search</button>
        </div>
    )
}

export default SearchField;