import axios from './axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";
import YouTube from "react-youtube";


const base_url="https://image.tmdb.org/t/p/original/";
function Row({title, fetchUrl, isLargeRow}) {
    const[movies,setMovies]=useState([]);
    const [trailerUrl, setTrailerUrl]=useState("");

    useEffect(()=>{
        async function fetchData(){
            const request= await axios.get(fetchUrl);     
            setMovies(request.data.results)
            return request
        }
        fetchData();
    },[fetchUrl]);

    const opts ={
        height:"390",
        width:"100%",
        playerVars:{

            autoplay:1,
        }
    }

    const handleClick = async (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=3954e8e496f77284ab2edfc540363a2c`
          );
          setTrailerUrl(trailerurl.data.results[0]?.key);
        }
      };
    
  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className={"row-posters"}>
        {movies.map((movie)=> 
        (
           <img key={movie.id} onClick={()=>handleClick(movie)} className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} alt={movie.name}></img>
         ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
