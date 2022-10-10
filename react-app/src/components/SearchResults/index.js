import {React, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { searchThunk } from "../../store/search";
import { defaultImage } from '../../util';
import './SearchResults.css';


const SearchResults = () => {
    const { query } = useParams();
    const dispatch = useDispatch();
    const results = Object.values(useSelector(state => state.search));

    useEffect(() => {
        dispatch(searchThunk(query)); // get search results from db and store in redux state
        console.log(query)
    }, [dispatch, query]);

    return (
        <div className='search-page-container'>
            {results.length === 0 &&
                <div className='no-results'>
                    <h1 className="title">No results for "{query}"</h1>
                    <NavLink to='/'>Go Home</NavLink>
                </div>
            }
            {results.length > 0 && <h1 className="title">Search results for "{query}"</h1>}
            <div className='cards-container'>
                <div className='cards'>
                    {results && results.map(result => (
                        <div key={result.id} className='card'>
                            <NavLink to={`/recipes/${result.id}`}>
                                <div className='image-container'>
                                    <img className='card-image' src={result.image_url} onError={e => e.currentTarget.src=defaultImage}/>
                                </div>
                                <div className='card-bottom'>
                                    <div id='title-author'>
                                        <h3 id='card-recipe-title'>{result.title}</h3>
                                        <p id='card-recipe-author'>{result.user.first_name}&nbsp;{result.user.last_name}</p>
                                    </div>
                                    <div id='card-recipe-preptime' className='prep-time'>
                                        <p id='5'>{result.time}</p>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default SearchResults;
