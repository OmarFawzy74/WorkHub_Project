import React, { useEffect, useState } from 'react'
import "./LearnFeatured.scss"
import axios from 'axios';
import { Link } from 'react-router-dom';


const LearnFeatured = () => {

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
        <div className='learnFeatured'>
            <div className='topLearn'>
                <img src="../img/learnFeatured.jpg" />
            </div>
            <div className='firstText'>
                <h1>
                    In-Demand Skills,
                    <br />
                    On-Demand Courses
                    <span>.</span>
                </h1>
                <h2>Online professional courses, led by the world’s top experts.</h2>
            </div>
            <div className="learnSearchContainer">
                <div className="searchLearn">
                    <div className="searchInputLearn">
                        <img src="../img/search.png" alt="" />
                        <input type="text" placeholder='Search for any service...' />
                    </div>
                    <button>Search</button>
                </div>
                <div className="popularLearn">
                        <span>Popular:</span>
                        {categories.loading == false && categories.err == null && (
                            categories.results.slice(0, 4).map((category => (
                                <>
                                    <button><Link className='popularCategoryLink' reloadDocument to={"/filterLearn/" + category._id}><span>{category.categoryName}</span></Link></button>
                                </>
                            )))
                        )
                        }
                </div>
            </div>
        </div>
    )
}

export default LearnFeatured