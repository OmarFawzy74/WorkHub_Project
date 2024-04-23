import React, { useEffect, useState } from 'react'
import "./Course.scss"
import Slider from '../../Pages/gig/Slider';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import { getAuthUser } from "../../localStorage/storage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';



function Course() {
    const user = getAuthUser();
    const { pathname } = useLocation()


    const [courseContainer, setCourseContainer] = useState({
        loading: false,
    });

    const [freelancer, setFreelancer] = useState({
        err: null,
        loading: false,
        id: "65fa0541cb3af93721ac2647"
    });

    // const [conversation, setConversation] = useState({
    //   err: null,
    //   loading: false,
    //   id: "123456"
    // });

    const navigate = useNavigate();

    const message = (e) => {
        // console.log(e.target.value);
        const freelancerId = e.target.value;

        axios
            .post("http://localhost:3000/api/conversations/addConversation", {
                freelancer: freelancerId,
                client: user._id
            })
            .then((resp) => {
                const conversationId = resp.data.newConversationData[0]._id;
                // console.log(resp.data.newConversationData[0]._id);
                navigate("/message/" + conversationId);
            })
            .catch((errors) => {
                console.log(errors);
                navigate("/messages");
            });
    }


    const [course, setCourse] = useState({
        loading: true,
        results: null,
        err: null,
        reload: 0,
    });

    let { id } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/courses/getCourseById/" + id)
            .then((resp) => {
                setCourse({ results: resp.data.courseData, loading: false, err: null });
                console.log(resp);
                console.log(resp.data.courseData);
            })
            .catch((err) => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [course.reload]);

    return (
        <div className="course">
            <div className="courseContainer">
                <div className="left">
                    {course.loading == false &&
                        <>
                            <div className='breadcrumbsCourse'>
                                <span className='breadcrumbsCourseFirst'>Courses {'>'}</span> <span className="breadcrumbsCourseSecond">{course.results.categoryId.categoryName}</span>
                            </div>
                            <h1 className='courseName'>{course.results.courseTitle}</h1>
                            <p className='courseDesc'>{course.results.courseDesc}</p>
                            <div className="courseInfo">
                                <img
                                    className="youtubeIcon"
                                    src="/img/youtube.png"
                                />
                                <span>1 video</span>
                                <img
                                    className="hourIcon"
                                    src="/img/hour.png"
                                />
                                <span>{course.results.courseDuration} Minutes</span>
                            </div>
                            {courseContainer?.loading == true &&
                                <Container>
                                    <div className="ratio ratio-16x9">
                                        <iframe src={course.results.courseLink} title="YouTube video" allowFullScreen></iframe>
                                    </div>
                                </Container>
                            }
                            <div className="professor">
                                <div className="user">
                                    <img
                                        src={course.results.proffImage_url}
                                    />
                                    <div className="info">
                                        <span className='professorName'>{course.results.proffName}</span>
                                        <span className='professorDesc'>{course.results.ProffDesc}</span>
                                        {/* {user?.role == "client" && (<button value={freelancer.id} onClick={message}>Contact Me</button>)} */}
                                    </div>
                                </div>
                            </div>

                            <div className='aboutCourse'>
                                <h2 className='aboutCourseHeader'>About This Course</h2>
                                <p className='aboutCourseDesc'>
                                    {course.results.courseDesc}
                                </p>
                            </div>
                        </>
                    }
                    <div className='requirement'>
                        <h3 className='requirementHeader'>Requirements</h3>
                        <ul className='requirementDesc'>
                            <li><span>Access to Internet</span> </li>
                            <li><span>Computer / Laptop / Mobile Device</span></li>
                        </ul>
                    </div>

                    <div className='thirdPart'>
                        <h4 className='thirdPartHeader'>What Is Included?</h4>
                        <div className="thirdPartDesc">
                            <img className='greenCheckImg' src="/img/greenCheckImg.png" />
                            <span>Immediate unlimited access to course materials</span>
                        </div>
                        <div className="thirdPartDesc">
                            <img className='greenCheckImg' src="/img/greenCheckImg.png" />
                            <span>30-day money-back guarantee</span>
                        </div>
                        <div className="thirdPartDesc">
                            <img className='greenCheckImg' src="/img/greenCheckImg.png" />
                            <span>Exercises and quizzes to help you put theory into practice to course materials</span>
                        </div>
                        <div className="thirdPartDesc">
                            <img className='greenCheckImg' src="/img/greenCheckImg.png" />
                            <span>English Closed Captions</span>
                        </div>
                        <div className="thirdPartDesc">
                            <img className='greenCheckImg' src="/img/greenCheckImg.png" />
                            <span>Suitable for mobile or desktop</span>
                        </div>
                    </div>
                    {/* <div className="reviews">
                        <h2>Reviews</h2>
                        <div className="item">
                            <div className="user">
                                <img
                                    className="pp"
                                    src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                    alt=""
                                />
                                <div className="info">
                                    <span>Garner David</span>
                                    <div className="country">
                                        <img
                                            src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                                            alt=""
                                        />
                                        <span>United States</span>
                                    </div>
                                </div>
                            </div>
                            <div className="stars">
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <span>5</span>
                            </div>
                            <p>
                                I just want to say that art_with_ai was the first, and after
                                this, the only artist Ill be using on Fiverr. Communication was
                                amazing, each and every day he sent me images that I was free to
                                request changes to. They listened, understood, and delivered
                                above and beyond my expectations. I absolutely recommend this
                                course, and know already that Ill be using it again very very soon
                            </p>
                            <div className="helpful">
                                <span>Helpful?</span>
                                <img src="/img/like.png" alt="" />
                                <span>Yes</span>
                                <img src="/img/dislike.png" alt="" />
                                <span>No</span>
                            </div>
                        </div>
                        <hr />
                        <div className="item">
                            <div className="user">
                                <img
                                    className="pp"
                                    src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                    alt=""
                                />
                                <div className="info">
                                    <span>Sidney Owen</span>
                                    <div className="country">
                                        <img
                                            src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
                                            alt=""
                                        />
                                        <span>Germany</span>
                                    </div>
                                </div>
                            </div>
                            <div className="stars">
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <span>5</span>
                            </div>
                            <p>
                                The designer took my photo for my book cover to the next level!
                                Professionalism and ease of working with designer along with
                                punctuality is above industry standards!! Whatever your project
                                is, you need this designer!
                            </p>
                            <div className="helpful">
                                <span>Helpful?</span>
                                <img src="/img/like.png" alt="" />
                                <span>Yes</span>
                                <img src="/img/dislike.png" alt="" />
                                <span>No</span>
                            </div>
                        </div>
                        <hr />
                        <div className="item">
                            <div className="user">
                                <img
                                    className="pp"
                                    src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                    alt=""
                                />
                                <div className="info">
                                    <span>Lyle Giles </span>
                                    <div className="country">
                                        <img
                                            src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                                            alt=""
                                        />
                                        <span>United States</span>
                                    </div>
                                </div>
                            </div>
                            <div className="stars">
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <img src="/img/star.png" alt="" />
                                <span>5</span>
                            </div>
                            <p>
                                Amazing work! Communication was
                                amazing, each and every day he sent me images that I was free to
                                request changes to. They listened, understood, and delivered
                                above and beyond my expectations. I absolutely recommend this
                                course, and know already that Ill be using it again very very soon
                            </p>
                            <div className="helpful">
                                <span>Helpful?</span>
                                <img src="/img/like.png" alt="" />
                                <span>Yes</span>
                                <img src="/img/dislike.png" alt="" />
                                <span>No</span>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="right">
                    <div className="features">
                        <div className="item">
                            <img src="/img/free.png" alt="" />
                            <span>Free courses forever</span>
                        </div>
                        <div className="item">
                            <img src="/img/infinity.png" alt="" />
                            <span>Unlimited access, anywhere, anytime</span>
                        </div>
                        <div className="item">
                            <img src="https://cdn-themes.thinkific.com/114242/358329/hand-vetted-1616701090.svg" alt="" />
                            <span>Learn from hand-vetted instructors, experts in their field</span>
                        </div>
                    </div>
                    {/* {user && user.role!== "admin" ? <button onClick={() => setCourseContainer({ ...courseContainer, loading: true })}>Enroll</button> 
                    :
                    <div className='adminBtnsContainer'>
                        <button className='updateBtn' onClick={() => setCourseContainer({ ...courseContainer, loading: true })}>Update</button>
                        <button className='deleteBtn' onClick={() => setCourseContainer({ ...courseContainer, loading: true })}>Delete</button>
                    </div>
                    } */}
                    {user && user?.role !== "admin" && <button onClick={() => setCourseContainer({ ...courseContainer, loading: true })}>Enroll</button>}
                    {!user && <button onClick={() => setCourseContainer({ ...courseContainer, loading: true })}>Enroll</button>}
                    {user && user?.role == "admin" &&
                        <div className='adminBtnsContainer'>
                            <button className='updateBtn'>Update</button>
                            <button className='deleteBtn'>Delete</button>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default Course;
