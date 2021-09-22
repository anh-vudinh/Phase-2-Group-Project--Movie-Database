import React from "react";
import MovieCard from "./MovieCard";
import arrowIcon from "../../../assets/arrowIcon.png"
function MovieList({apiKey, moviesData, poster_prefixURL, totalPagesCount, setPageNumber,setIsLoadMoreMovies, isLoadMoreMovies, broken_path, setWatchListArray, watchListArray, setMovie, togglePage2, setTogglePage2, setGenresList}){
    const displayMovies = moviesData.map((movie, index) => 
        <MovieCard key={`${movie.id}${index}`} 
            movie={movie} 
            poster_prefixURL={poster_prefixURL} 
            broken_path={broken_path}
            setWatchListArray={setWatchListArray}
            watchListArray={watchListArray}
            setMovie={setMovie}
            setTogglePage2={setTogglePage2}
            setGenresList={setGenresList}
            apiKey={apiKey}
        />
    )

    function handleLoadMoreMovies(){
        setPageNumber(pageNumber => pageNumber < totalPagesCount ? pageNumber + 1 : 1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    
    function preivousPageLoad(){
        setPageNumber(pageNumber => pageNumber > 2 ? pageNumber - 3 : totalPagesCount-1)
        setIsLoadMoreMovies(!isLoadMoreMovies)
    }
    
    return (
        <div className={togglePage2? "hidden" : "cardContainer"}>
            <div className="arrowsContainer">
            {togglePage2? null : <img className="leftArrow"src={arrowIcon} alt="left arrow" onClick={preivousPageLoad}/>}
            {togglePage2? null : <img className="rightArrow"src={arrowIcon} alt="right arrow" onClick={handleLoadMoreMovies}/>}
            </div>
            <div className="movieCardsContainer">
                {togglePage2? null : displayMovies}
            </div>
        </div>
    )
}
export default MovieList