import React, { useEffect, useState } from 'react';
import './Featured.scss';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const Featured = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState({
    loading: false,
    results: null,
    err: null,
    reload: 0,
  });

  const search = () => {
    if (!searchValue.trim()) return; // Prevent searching for empty queries
    console.log(searchValue);

    axios
      .get('http://localhost:3000/api/services/searchforService/' + searchValue)
      .then((resp) => {
        console.log(resp);
        window.location = 'http://localhost:3001/gigsSearch/' + searchValue;
      })
      .catch((err) => {
        console.log(err);
        setSearchData({ ...searchData, err: err.response.data.msg });
      });
  };

  const [categories, setCategories] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });

  useEffect(() => {
    setCategories({ ...categories, loading: true })
    axios.get("http://localhost:3000/api/categories/getAllCategories")
      .then(
        resp => {
          // console.log(resp.data);
          setCategories({ results: resp.data, loading: false, err: null });
          console.log(resp);
        }
      ).catch(err => {
        setCategories({ ...categories, loading: false, err: err.response.data.msg });
        console.log(err);
      })
  }, [categories.reload]);

  return (
    <div className='featured'>
      <div className='featuredContainer'>
        <div className='left'>
          <h1>
            Find the right <i>freelance</i> service, right away
          </h1>
          <div className='search'>
            <div className='searchInput'>
              <img src='./img/search.png' alt='' />
              <input
                id='homeSearchInput'
                type='text'
                placeholder='Search for any service...'
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setSearchData({ ...searchData, err: null });
                }}
              />
            </div>
            <button onClick={search}>Search</button>
          </div>
          {searchData.err !== null && (
            <div className='communityFilterAlert'>
              <Alert severity='error'>{searchData.err}</Alert>
            </div>
          )}
          <div className='popular'>
            <span>Popular:</span>
            {categories.loading == false && categories.err == null && (
              categories.results.slice(0, 4).map((category => (
                <>
                  <button><Link className='popularCategoryLink' reloadDocument to={"/gigsFilter/" + category._id}><span>{category.categoryName}</span></Link></button>
                </>
              )))
            )
            }
          </div>
        </div>
        <div className='right'>
          <img src='./img/home.webp' alt='' />
        </div>
      </div>
    </div>
  );
};

export default Featured;
