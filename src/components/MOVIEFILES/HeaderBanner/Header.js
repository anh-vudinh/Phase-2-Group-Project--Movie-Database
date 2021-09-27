import React, {useEffect} from "react";
import Trailer from "./Trailer";
import informationIcon from "../../../assets/informationIcon.png"
import languageBubble from "../../../assets/languageBubble.png"
import wwwLinkIcon from "../../../assets/wwwLinkIcon.png"

function Header({apiKey, apiPrefixURL, moviesData, totalPagesCount, poster_prefixURL, setYearOrGenreSuffix, setmovieCateogry, broken_path, setMovie, movie, toggleHeaderInfo, setToggleHeaderInfo, togglePage2, genresList, setGenresList, movieID, setMovieID, movieArray, setMovieArray, setIsLoadMoreMovies, isLoadMoreMovies, setPageNumber}){
    const randomMovieIndex = Math.floor(Math.random() * moviesData.length)
    const randomMoviePageNumber =`&page=${Math.floor(Math.random() * totalPagesCount)}`
    const randomOrSpecificMovieURL = typeof movieID === "string"? 
        `${apiPrefixURL}${movieID}?api_key=${apiKey}${randomMoviePageNumber}`:          // used to load random movie on first page load
        `${apiPrefixURL}movie/${movieID}?api_key=${apiKey}`                             // used for everytime after first load to fetch specific movie full info 
                                                                                        // movie data linked by movie cards/watchlist cards do not contain full data || example: release_year

    useEffect(()=>{
        fetch(randomOrSpecificMovieURL)
        .then(res => res.json())
        .then(randomMovieObj => {
            handlePageLoad(randomMovieObj)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[movieID])

    const genreLI = genresList.map(listItem => 
        <li key={listItem.name} 
            className="headerGenresLI" 
            onClick={()=> {
                setYearOrGenreSuffix(`&with_genres=${listItem.id}`)
                setmovieCateogry("Genres")
                setPageNumber(1)
                setIsLoadMoreMovies(!isLoadMoreMovies)
                }
            }
        >  
            {listItem.name} 
        </li>
    )

    function handlePageLoad(randomMovieArray){
        if(((movieID === "popular" || movieID ==="movie/popular") && randomMovieArray.results !== undefined)){
            setMovie(randomMovieArray.results[randomMovieIndex])     
            setMovieID(randomMovieArray.results[randomMovieIndex].id) 
        }else if (typeof movieID === "number" ){
            setMovie(randomMovieArray)
            setGenresList([...randomMovieArray.genres])
        }
    }

    return(
        <>
            <div className="headerBannerContainer">
                <img className={toggleHeaderInfo? "headerDisplayInfoSmall" : "headerDisplayInfoBig"} src= {informationIcon}alt="headerDisplayInfoIcon" onClick={()=> setToggleHeaderInfo(toggleHeaderInfo => !toggleHeaderInfo)}/>
                <img className="headerBannerBackground" src={(movie.backdrop_path === null || movie.backdrop_path === undefined) ? broken_path : `https://www.themoviedb.org/t/p/w640_and_h360_multi_faces/${movie.backdrop_path}`} alt={movie.title}></img>
            </div>
            
            <div className={toggleHeaderInfo? "headerImageContainer" : "hidden"}>
                <div className="movie-details">
                <img className="headerImage" src={(movie.backdrop_path === null || movie.backdrop_path === undefined) ? broken_path : `${poster_prefixURL}${movie.poster_path}`} alt={movie.title}></img>
                    <h1>{movie.title} 
                        <span style={{fontSize:"22px"}}> ({movie.length !== 0 && movie !== undefined && movie !== null? movie.release_date.slice(0,4) : null })</span>
                        <div className="languageContainer">
                            <img className="languageBox" src={languageBubble} alt={movie.original_language}/>
                            <p className="languageText">{movie.original_language !== undefined? movie.original_language.toUpperCase() : ""}</p>
                        </div>
                    </h1>
                    <em>{movie.vote_average} / 10⭐ </em>
                    <span> ({Math.floor(movie.runtime/60)}h {movie.runtime % 60}mins)</span>
                    <p className="headerMovieOverview">{movie.overview}</p>
                    <div className="headerGenresDiv">Genres: <span><ul className="headerGenresUL">{genreLI}</ul></span></div>
                    <div className="headerStatus"><p>{`${movie.status}`}</p></div>
                    {movie.homepage !== ""? <a href={`${movie.homepage}`} target="_blank" rel="noreferrer"><img className="headerLinkIcon" src={wwwLinkIcon} alt="Homepage Link"/></a> : null}
                </div>
            </div>

            <Trailer movie={movie} togglePage2={togglePage2} apiKey={apiKey} apiPrefixURL={apiPrefixURL} movieArray={movieArray} setMovieArray={setMovieArray}/>  
        </>

    )

}

export default Header