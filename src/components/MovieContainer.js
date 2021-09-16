import React,{useState, useEffect} from "react"
import MovieList from "./page1/MovieList"
import Header from "./Header"
import Search from "./Search"
import WatchList from "./WatchList"
import Cast from "./page2/Cast"
function MovieContainer(){
    const [movie, setMovie]= useState([])
    const [moviesData, setMoviesData] = useState([])
    const [totalPagesCount, setTotalPagesCount]= useState(100)
    const [isLoadMoreMovies, setIsLoadMoreMovies] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [watchListArray, setWatchListArray] = useState([])
    const [togglePage2, setTogglePage2] =useState(false)
    const [toggleHeaderInfo, setToggleHeaderInfo] = useState(false)
    const broken_path = `https://www.movie-trailer.co.uk/static/images/site/blank-poster.jpg`

    const apiKey = '9b9db796275919f97fb742c582ab0008'
    const apiUrl = "https://api.themoviedb.org/3/"    // "https://api.themoviedb.org/3/movie/" original
    const poster_prefixURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"
    //const youtubeTrailer_prefixURL = "https://www.youtube.com/watch?v="
    const [movieCateogry, setmovieCateogry] = useState("movie/popular")
    const [suffix, setSuffix]= useState("") // rename the state
    
    // api for search bar = https://api.themoviedb.org/3/search/multi?api_key=9b9db796275919f97fb742c582ab0008&query=dragon%20ball&page=1
    
    const [searchSuffix, setSearchSuffix] = useState("")

    const searchUrl = (movieCateogry === 'Genres' || movieCateogry === 'Year Release')  ?
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}${suffix}` : 
    
    `${apiUrl}${movieCateogry}?api_key=${apiKey}${searchSuffix}&page=${pageNumber}`
    //console.log(`${apiUrl}${movieCateogry}?api_key=${apiKey}${searchSuffix}&page=${pageNumber}`)
    // `${apiUrl}${movieCateogry}?api_key=${apiKey}&page=${pageNumber}` original general fetch
    useEffect(() => {
        fetch(searchUrl)
        .then(res=> res.json())
        .then(moviesListData => {
            //console.log("1",moviesListData)
            setTotalPagesCount(moviesListData.total_pages)
           // console.log("2",moviesListData)
            setMoviesData(moviesListData.results)
        
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoadMoreMovies, movieCateogry, suffix, searchSuffix])

    


    
    return (
        <div id="movieContainer">
            <Header apiKey={apiKey} apiUrl={apiUrl} 
            totalPagesCount={totalPagesCount} 
            moviesDataLength={moviesData.length} 
            poster_prefixURL={poster_prefixURL}
            setSuffix={setSuffix}
            setmovieCateogry={setmovieCateogry}
            broken_path={broken_path}
            setMovie={setMovie}
            movie={movie}
            setToggleHeaderInfo={setToggleHeaderInfo}
            toggleHeaderInfo={toggleHeaderInfo}
            />

            <Cast movie={movie} togglePage2={togglePage2} poster_prefixURL={poster_prefixURL} broken_path={broken_path}/>



            <MovieList 
            moviesData={moviesData} 
            poster_prefixURL={poster_prefixURL} 
            totalPagesCount={totalPagesCount}
            setPageNumber = {setPageNumber}
            pageNumber={pageNumber}
            setIsLoadMoreMovies ={setIsLoadMoreMovies}
            isLoadMoreMovies={isLoadMoreMovies}
            broken_path={broken_path}
            setWatchListArray={setWatchListArray}
            watchListArray={watchListArray}
            setMovie={setMovie}
            togglePage2 = {togglePage2}
            setTogglePage2={setTogglePage2}
            />

            <Search 
            setmovieCateogry={setmovieCateogry} 
            apiKey={apiKey} 
            setMoviesData={setMoviesData} 
            setTotalPagesCount={setTotalPagesCount}
            setSuffix={setSuffix}
            setSearchSuffix={setSearchSuffix}
            />

            <WatchList 
            watchListArray={watchListArray} 
            setWatchListArray={setWatchListArray} 
            poster_prefixURL={poster_prefixURL}
            broken_path={broken_path}
            />
        </div>
    )
}

export default MovieContainer