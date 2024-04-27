import "../add/Add.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { getAuthUser } from "../../localStorage/storage";

const UpdateService = () => {

    let { id } = useParams();

    const freelancer = getAuthUser();

    const [service, setService] = useState({
        loading: true,
        results: null,
        err: null,
        reload: 0,
        serviceTitle: "",
        serviceDesc: "",
        serviceCategoryId: "",
        serviceShortTitle: "",
        serviceShortDesc: "",
        servicePrice: "",
        // freelancerId: freelancer._id,
        revisionNumber: "",
        deliveryTime: "",
        coverImage: "",
        features: [],
        images: [],
    });

    const navigate = useNavigate();

    const [categories, setCategories] = useState({
        loading: true,
        results: null,
        err: null,
        status: null,
        name: "",
        desc: "",
        reload: 0,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/categories/getAllCategories")
            .then((resp) => {
                setCategories({ results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [categories.reload]);

    const images = useRef(null);

    const coverImage = useRef(null);

    const uploadImages = (id) => {

        const formData = new FormData();
        // formData.append("images", images.current.files[0]);

        for (let i = 0; i < images.current.files.length; i++) {
            formData.append("images", images.current.files[i]);
        }

        axios
            .put("http://localhost:3000/api/services/uploadImages/" + id, formData)
            .then((resp) => {
                // image.current.value = null;
                // swal(resp.data.message, "", "success");
                console.log(resp);
            })
            .catch((errors) => {
                // swal(errors.response.data.message, "", "error");
                console.log(errors);
                // console.log(errors.response.data.message);
            });
    }

    const uploadCoverImage = (id) => {

        const formData = new FormData();
        formData.append("coverImage", coverImage.current.files[0]);

        // for (let i = 0; i < coverImage.current.files.length; i++) {
        //   formData.append("images", coverImage.current.files[i]);
        // }

        axios
            .put("http://localhost:3000/api/services/uploadCoverImage/" + id, formData)
            .then((resp) => {
                // image.current.value = null;
                // swal(resp.data.message, "", "success");
                console.log(resp);
            })
            .catch((errors) => {
                // swal(errors.response.data.message, "", "error");
                console.log(errors);
                // console.log(errors.response.data.message);
            });
    }

    var [featureList, setFeatureList] = useState([{ feature: "" }]);
    //   console.log(featureList);

    const handleFeaturesChange = (e, index) => {
        const { name, value } = e.target;
        var list = [...featureList];
        list[index][name] = value;
        setFeatureList(list);
    };

    const handleFeaturesArray = () => {

        var array = [];

        featureList.forEach((item) => {
            array.push(item.feature);
        });
        return array;
    };

    const handleFeaturesRemove = (index) => {
        const list = [...featureList];
        list.splice(index, 1);
        setFeatureList(list);
    };

    const handleFeaturesAdd = () => {
        setFeatureList([...featureList, { feature: "" }]);
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/services/getServiceById/" + id)
            .then((resp) => {
                // resp.data.freelancerId.skills = processData(resp.data.freelancerId.skills);
                // resp.data.freelancerId.languages = processData(resp.data.freelancerId.languages);
                setService({ results: resp.data, loading: false, err: null });
                // console.log(resp);
                // console.log(resp.data);
            })
            .catch((err) => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [service.reload]);

    const updateServiceData = async (e) => {
        e.preventDefault();
    
        handleFeaturesArray();
    
        setService({ ...service, loading: true, err: null });
        // const formData = new FormData();
        // formData.append("images", images.current.files[0]);
        // formData.append("cover_image", cover_image.current.files[0]);
        axios
          .put("http://localhost:3000/api/services/updateService/" + id , {
            serviceTitle: service.serviceTitle,
            serviceShortTitle: service.serviceShortTitle,
            serviceShortDesc: service.serviceShortDesc,
            serviceDesc: service.serviceDesc,
            serviceCategoryId: service.serviceCategoryId,
            servicePrice: service.servicePrice,
            freelancerId: service.freelancerId,
            deliveryTime: service.deliveryTime,
            revisionNumber: service.revisionNumber,
            features: handleFeaturesArray()
          })
          .then((resp) => {
            const serviceId = resp.data.newService._id;
            uploadCoverImage(serviceId);
            uploadImages(serviceId);
            document.getElementById("serviceFrom").reset();
            document.getElementById("service").value = "";
            let list = document.querySelectorAll('#service')
            for (let i = 0; i < list.length; i++) {
              list[i].value = "";
              handleFeaturesRemove(i);
            }
            // console.log(list);
            // window.location.reload();
            // for (let i = 0; i < featureList.length; i++) {
            //   handleFeaturesRemove(i);
            // }
    
            // document.getElementById("selectCategory").selectedIndex = 0;
            // swal(resp.data.message, "", "success");
            console.log(resp);
            console.log(service);
            navigate("/gig/" + service?.results._id);
          })
          .catch((errors) => {
            // swal(errors.response.data.message, "", "error");
            console.log(errors);
          });
      };

      const navigation = () => {
        window.location = "http://localhost:3001/gig/" + service?.results._id;
      }

    return (
        <div className="add">
            {service.loading == false && (
                <>
                    <div className="addContainer">
                        <h1>Update Service</h1>
                        <form onSubmit={updateServiceData} id="serviceFrom">
                            <div className="sections">
                                <div className="info">
                                    <label htmlFor="">Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. I will do something I'm really good at"
                                        name="serviceTitle"
                                        value={service?.results.serviceTitle}
                                        onChange={(e) =>
                                            setService({ ...service, serviceTitle: e.target.value })
                                        }
                                    />
                                    <label htmlFor="">Category</label>

                                    <select
                                        name="serviceCategoryId"
                                        value={service?.results.serviceCategoryId._id}
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
                                    <label htmlFor="">Cover Image</label>
                                    <input type="file" ref={coverImage} />
                                    <label htmlFor="">Upload Images</label>
                                    <input type="file" multiple ref={images} />
                                    <label htmlFor="">Description</label>
                                    <textarea
                                        name="serviceDesc"
                                        value={service?.results.serviceDesc}
                                        onChange={(e) =>
                                            setService({ ...service, serviceDesc: e.target.value })
                                        }
                                        placeholder="Brief descriptions to introduce your service to customers"
                                        cols="0"
                                        rows="16"
                                    ></textarea>
                                    <button type="submit">Update</button>
                                  <button onClick={navigation} className="cancelBtnUpdateService">Cancel</button>
                                </div>
                                <div className="details">
                                    <label htmlFor="">Service Title</label>
                                    <input
                                        type="text"
                                        name="serviceShortTitle"
                                        value={service?.results.serviceShortTitle}
                                        onChange={(e) =>
                                            setService({ ...service, serviceShortTitle: e.target.value })
                                        }
                                        placeholder="e.g. One-page web design"
                                    />
                                    <label htmlFor="">Short Description</label>
                                    <textarea
                                        name="serviceShortDesc"
                                        value={service?.results.serviceShortDesc}
                                        onChange={(e) =>
                                            setService({ ...service, serviceShortDesc: e.target.value })
                                        }
                                        placeholder="Short description of your service"
                                        cols="30"
                                        rows="10"
                                    ></textarea>
                                    <label htmlFor="">Delivery Time (e.g. 3 days)</label>
                                    <input
                                        type="number"
                                        name="deliveryTime"
                                        value={service?.results.deliveryTime}
                                        onChange={(e) =>
                                            setService({ ...service, deliveryTime: e.target.value })
                                        }
                                    />
                                    <label htmlFor="">Revision Number</label>
                                    <input
                                        type="number"
                                        name="revisionNumber"
                                        value={service?.results.revisionNumber}
                                        onChange={(e) =>
                                            setService({ ...service, revisionNumber: e.target.value })
                                        }
                                    />
                                    <div className="form-field">
                                        <label htmlFor="service">Add Feature(s)</label>
                                        {featureList.map((singleFeature, index) => (
                                            <div key={index} className="features">
                                                <div className="first-division">
                                                    <input
                                                        className="featureInput"
                                                        name="feature"
                                                        type="text"
                                                        id="service"
                                                        value={service?.results.features}
                                                        onChange={(e) => handleFeaturesChange(e, index)}
                                                    />
                                                    {featureList.length - 1 === index && (
                                                        <img
                                                            onClick={handleFeaturesAdd} // Corrected event handler
                                                            className="add-img"
                                                            src="/img/add-image.png"
                                                        />
                                                    )}
                                                </div>
                                                <div className="second-division">
                                                    {featureList.length !== 1 && (
                                                        <img
                                                            onClick={() => handleFeaturesRemove(index)}
                                                            className="remove-img"
                                                            src="/img/remove-image.png"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <label htmlFor="">Price($)</label>
                                    <input
                                        name="servicePrice"
                                        value={service?.results.servicePrice}
                                        onChange={(e) =>
                                            setService({ ...service, servicePrice: e.target.value })
                                        }
                                        type="number"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default UpdateService;
