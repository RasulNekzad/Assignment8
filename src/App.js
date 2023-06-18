import logo from './logo.svg';
import SearchField from './components/SearchField';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GifCard from './components/GifCard';

function App() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [isTrending, setIsTrending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "zRmo0WISqbqw0IDhMqgvFrENdCXhuXfk";

  async function fetchGifs() {
    setIsLoading(true);
    console.log("fetching...")
    const result = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}`);
    setGifs(result.data.data);
    setIsTrending(false);
    setIsLoading(false);
  }

  function fetchTrendingGifs() {
    setIsLoading(true);
    const result = axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
    .then((result) => {
      setGifs(result.data.data)
      setIsLoading(false);
    })
  }

  useEffect(() => fetchTrendingGifs(), []);
  useEffect(()=>{
    console.log(gifs)
  }, [gifs])

  return (
    <div className="App">
      <SearchField setQuery ={setQuery} fetchGifs={fetchGifs}/>
      {isTrending ? <h1 id="trending">Trending Gifs</h1> : <h1 id="search">Your Search Results: </h1>}
      {!isLoading ? gifs.map((gif, index) => {
        return (
        <div className='container'>
          <GifCard gif={gif.images.original.url} key={index} />
        </div>
         )
      }) : (<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921%22%20decoding=%22async" />) }
    </div>
  );
}

export default App;
