import './AddCourse.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { sidebarStatus } from "../../App";
import React, { useEffect, useRef, useState } from "react";

const AddCourse = () => {

    const [categories, setCategories] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });

    const [service, setService] = useState({
        err: null,
        loading: false,
        serviceTitle: "",
        serviceDesc: "",
        serviceCategoryId: "",
        serviceShortTitle: "",
        serviceShortDesc: "",
        servicePrice: "",
        revisionNumber: "",
        deliveryTime: "",
        coverImage: "",
        features: [],
        images: [],
    });

    useEffect(() => {
        setCategories({ ...categories, loading: true })
        axios.get("http://localhost:3000/api/categories/getAllCategories")
            .then(
                resp => {
                    console.log(resp.data);
                    setCategories({ results: resp.data, loading: false, err: null });
                    console.log(resp);
                }
            ).catch(err => {
                setCategories({ ...categories, loading: false, err: err.response.data.msg });
                console.log(err);
            })
    }, [categories.reload]);

    const [category, setCategory] = useState({
        categoryName: "",
        categoryDesc: "",
        loading: false,
        err: null
    });

    const addCategory = (e) => {
        e.preventDefault();
        setCategory({ ...category, loading: true, err: null });
        axios.post("http://localhost:3000/api/categories/addCategory", {
            categoryName: category.categoryName,
            categoryDesc: category.categoryDesc
        })
            .then((resp) => {
                setCategory({ ...category, loading: false, err: null });
                swal(resp.data.msg, "", "success");
                document.querySelector("#addCategoryForm").reset();
                // document.getElementById("categoryName").value = "";
                // document.getElementById("categoryDesc").value = "";
                console.log(resp);
            })
            .catch((errors) => {
                console.log(errors);
                swal(errors.response.data, "", "error");
                setCategory({ ...category, loading: false, err: errors.response.data.errors });
            })
    }

    return (
        <div className={sidebarStatus() ? 'addCourseContainer' : 'addCourseContainer sidebar-close-addCourse'}>
            <section className='AddCoursePage'>
                <div>
                    <h1>Add Course</h1>
                </div>
            </section>
            <section className='AddCourse'>
                <form id='addCourseForm' onSubmit={addCategory}>
                    <div className='form-control'>
                        <h2>Professor Name</h2>
                        <input
                            id='courseName'
                            required
                            placeholder='Enter Name'
                            value={category.categoryName}
                            onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Professor Description</h2>
                        <input
                            id='courseDesc'
                            required
                            placeholder='Enter Description'
                            value={category.categoryDesc}
                            onChange={(e) => setCategory({ ...category, categoryDesc: e.target.value })}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Professor Image</h2>
                        <input id='courseDesc' className='professorImg' required type="file" />
                    </div>
                    <div className='form-control'>
                        <h2>Category</h2>
                        <select
                            name="serviceCategoryId"
                            required
                            onChange={(e) =>
                                setService({ ...service, serviceCategoryId: e.target.value })
                            }
                            id="selectCategory"
                        >
                            <option value={""} disabled selected>
                                Select Category
                            </option>
                            {categories.loading == false &&
                                categories.err == null &&
                                categories.results &&
                                categories.results.length > 0 &&
                                categories.results.map((category) => (
                                    <>
                                        <option value={category._id}>
                                            {category.categoryName}
                                        </option>
                                    </>
                                ))}
                        </select>
                    </div>
                    <div className='form-control'>
                        <h2>Course Title</h2>
                        <input
                            id='categoryDesc'
                            required
                            placeholder='Enter Description'
                            value={category.categoryDesc}
                            onChange={(e) => setCategory({ ...category, categoryDesc: e.target.value })}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Course Description</h2>
                        <input
                            id='categoryDesc'
                            required
                            placeholder='Enter Description'
                            value={category.categoryDesc}
                            onChange={(e) => setCategory({ ...category, categoryDesc: e.target.value })}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Course Image</h2>
                        <input id='courseDesc' className='professorImg' required type="file" />
                    </div>
                    <div className='form-control'>
                        <h2>Course Duration</h2>
                        <input
                            id='categoryDesc'
                            required
                            placeholder='Enter Description'
                            value={category.categoryDesc}
                            onChange={(e) => setCategory({ ...category, categoryDesc: e.target.value })}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Course Link</h2>
                        <input
                            id='categoryDesc'
                            required
                            placeholder='Enter Description'
                            value={category.categoryDesc}
                            onChange={(e) => setCategory({ ...category, categoryDesc: e.target.value })}
                        />
                    </div>
                    <div className='btn-container'>
                        <button type="submit" className='add-button'>Add</button>

                        <Link to={"/category"}>
                            <button className='cancel-button'>Cancel</button>
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default AddCourse
