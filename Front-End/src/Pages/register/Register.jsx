import React, { useRef, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { setAuthUser } from "../../localStorage/storage";
// import Skills from "../../components/skills/Skills";
// import Languages from "../../components/languages/Languages";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
// import "./Skills.scss";
import $ from "jquery";

function Register() {
  var [selectedSkillsOptions, setSelectedSkillsOptions] = useState();

  var [selectedLanguagesOptions, setSelectedLanguagesOptions] = useState();

  const [user, setUser] = useState({
    err: null,
    loading: false,
    name: "",
    email: "",
    password: "",
    image: "",
    country: "",
    role: "client",
    skills: "",
    languages: "",
    desc: "",
    phoneNumber: "",
  });

  // const processData = (data) => {
  //   // console.log(user.skills);
  //   // const data = user.skills;
  //   // const processedData = data[0].split(",");
  //   console.log(data);
  //   // console.log(processedData);
  //   // return processedData;
  //   // console.log(skills.slice(0,1));
  // }

  const navigate = useNavigate();

  const image = useRef(null);

  // var skillsData;

  const processData = (data) => {
    // console.log(user.skills);

    // const data = skillsData;
    console.log(data);
    const processedData = data[0].split(",");
    console.log(processedData);
    setSelectedSkillsOptions(processedData);
    return processedData;
    // console.error("skillsData is undefined");
    //     const data = user.skills;
    //     console.log(data);
    //     const processedData = data[0].split(",");
    //     console.log(processedData);
    //     // selectedSkillsOptions = processedData;
    // setSelectedSkillsOptions(processedData);
    //     // console.log(skills.slice(0,1));
  }

  const addUserData = async (e) => {
    e.preventDefault();

    setUser({ ...user, loading: true, err: null });
    // const url = await upload(file);

    // console.log(getAuthUser().id);

    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("country", user.country);
    formData.append("image", image.current.files[0]);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("desc", user.desc);
    formData.append("skills", selectedSkillsOptions);
    formData.append("languages", selectedLanguagesOptions);

    axios
      .post("http://localhost:3000/api/auth/signup/" + user.role, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        swal(
          "Congratulations you have Joined WorkHub Successfully",
          "",
          "success"
        );
        console.log(resp.data.message);
        console.log(resp.data.userData);
        if(user?.role == "freelancer") {
          resp.data.userData.skills = processData(resp.data.userData.skills);
          resp.data.userData.languages = processData(resp.data.userData.languages);
        }
        // const processedSkills = resp.data.userData.skills;
        // const processedLanguages = resp.data.userData.languages;
        // setUser({ skills: processedSkills, languages: processedLanguages});
        setAuthUser(resp.data.userData);
        navigate("/gigs");
      })
      .catch((errors) => {
        swal(errors.response.data.message, "", "error");
        console.log(errors);
        console.log(errors.response.data.message);
      });
  };

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setUser((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };
  // console.log(user);

  const handleRole = (e) => {
    console.log(e.target.checked);
    if (e.target.checked == true) {
      setUser((prev) => {
        return { ...prev, role: "freelancer" };
      });
    } else {
      setUser((prev) => {
        return { ...prev, role: "client" };
      });
    }
  };


  const handleSkillsChange = (event, newValue) => {
    // setSelectedSkillsOptions(newValue);
    selectedSkillsOptions = newValue;
    console.log(newValue);
    console.log(selectedSkillsOptions);
  };

  const handleLanguagesChange = (event, newValue) => {
    // setSelectedLanguagesOptions(newValue);
    selectedLanguagesOptions = newValue;
    console.log(newValue);
    console.log(selectedLanguagesOptions);
  };

  const submit = () => {
    $(".MuiIconButton-sizeMedium").click();
  }

  return (
    <div className="registerContainer">
      <div className="register">
        <form onSubmit={addUserData}>
          <div className="left">
            <h1 className="createAccount">Create a new account</h1>
            <label className="singupDesc" htmlFor="">
              Name
            </label>
            <input
              className="Input"
              name="name"
              type="text"
              placeholder="Fawzy"
              required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label className="singupDesc" htmlFor="">
              Email
            </label>
            <input
              className="Input"
              name="email"
              type="email"
              placeholder="email"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label className="singupDesc" htmlFor="">
              Password
            </label>
            <input
              className="Input"
              name="password"
              type="password"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <label className="singupDesc" htmlFor="">
              Profile Picture
            </label>
            <input className="Input" type="file" ref={image} />
            <label className="singupDesc" htmlFor="">
              Country
            </label>
            <select
              name="country"
              type="text"
              required
              onChange={(e) => setUser({ ...user, country: e.target.value })}
            >
              <option value={""} disabled selected>
                Select Country
              </option>
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="England">England</option>
              <option value="France">France</option>
            </select>

            <button className="registerButton" type="submit">
              Register
            </button>
          </div>
          <div className="right">
            <h1 className="becomeSeller">I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="">Activate the seller account</label>
              <label className="switch">
                <input type="checkbox" onChange={handleRole} />
                <span className="slider round"></span>
              </label>
            </div>

            {user?.role == "freelancer" && (
              <>
                <label className="phoneNo" htmlFor="">
                  Phone Number
                </label>
                <input
                  className="phoneNoInput"
                  name="phoneNumber"
                  type="text"
                  placeholder="+20 1090559824"
                  required
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                />
                <label className="singupDesc" htmlFor="">
                  Description
                </label>
                <textarea
                  placeholder="A short desc of yourself"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                  required
                  onChange={(e) => setUser({ ...user, desc: e.target.value })}
                ></textarea>
                <label className="singupDesc" htmlFor="">
                  Skills
                </label>
                <Stack spacing={3} sx={{ width: 500 }}>
                  <Autocomplete
                    className="skillsInput"
                    multiple
                    id="tags-outlined"
                    options={top100Skills}
                    getOptionLabel={(option) => option}
                    value={selectedSkillsOptions}
                    onChange={handleSkillsChange}
                    // onInputChange={handleInputChange}
                    // onClose={handleCloseAutocomplete}
                    // filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} label="" placeholder="Add Skill" />
                    )}
                  />
                </Stack>
                <label className="singupDesc" htmlFor="">
                  Languages
                </label>
                <Stack spacing={3} sx={{ width: 500 }}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={top100Languages}
                    getOptionLabel={(option) => option}
                    value={selectedLanguagesOptions}
                    onChange={handleLanguagesChange}
                    // onInputChange={handleInputChange}
                    // onClose={handleCloseAutocomplete}
                    // filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Add Language"
                      />
                    )}
                  />
                </Stack>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const top100Languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Arabic",
  "Chinese",
  "Japanese",
  "Russian",
  "Italian",
  "Portuguese",
  "Hindi",
  "Bengali",
  "Punjabi",
  "Urdu",
  "Indonesian",
  "Turkish",
  "Dutch",
  "Polish",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Greek",
  "Korean",
  "Thai",
  "Vietnamese",
  "Hebrew",
  "Czech",
  "Hungarian",
  "Romanian",
  "Slovak",
  "Malay",
  "Ukrainian",
  "Bulgarian",
  "Serbian",
  "Croatian",
  "Slovenian",
  "Lithuanian",
  "Estonian",
  "Latvian",
  "Maltese",
  "Albanian",
  "Macedonian",
  "Montenegrin",
  "Luxembourgish",
  "Icelandic",
  "Gaelic",
  "Welsh",
  "Basque",
  "Catalan",
  "Galician",
  "Esperanto",
  "Klingon",
  "Esperanto",
  "Latin",
];


const top100Skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "Python",
  "Java",
  "C#",
  "C++",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Flutter",
  "Docker",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "Git",
  "Jenkins",
  "Kubernetes",
  "HTML5",
  "CSS3",
  "Sass",
  "Less",
  "Bootstrap",
  "Tailwind CSS",
  "Redux",
  "GraphQL",
  "RESTful API",
  "GraphQL API",
  "TypeScript",
  "Next.js",
  "Gatsby",
  "Spring Framework",
  "Hibernate",
  "ASP.NET",
  "Entity Framework",
  "Ruby on Rails",
  "Django",
  "Flask",
  "TensorFlow",
  "PyTorch",
  "Numpy",
  "Pandas",
  "Matplotlib",
  "Scikit-learn",
  "JUnit",
  "Mockito",
  "Cypress",
  "Jest",
  "Mocha",
  "Enzyme",
  "Chai",
  "Selenium",
  "JIRA",
  "Confluence",
  "Trello",
  "Slack",
  'Logo Design',
  'Illustration',
  'Branding',
  'Packaging Design',
  'Photoshop Editing',
  'Business Cards & Stationery',
  'Poster Design',
  'Flyer Design',
  'Brochure Design',
  'Label & Package Design',
  'Video Editing',
  'Animation',
  'Motion Graphics',
  'Explainer Videos',
  'Whiteboard Animation',
  'Intro & Outro Videos',
  'Short Video Ads',
  'Lyric & Music Videos',
  'Subtitles & Captions',
  'Visual Effects',
  'Copywriting',
  'Content Writing',
  'Blog Writing',
  'Article Writing',
  'Editing & Proofreading',
  'Translation',
  'Creative Writing',
  'Technical Writing',
  'Resume Writing',
  'Scriptwriting',
  'Machine Learning',
  'Natural Language Processing (NLP)',
  'Chatbot Development',
  'AI Model Deployment',
  'Image Recognition',
  'Speech Recognition',
  'Sentiment Analysis',
  'Predictive Analytics',
  'Recommendation Systems',
  'AI Consulting',
  'Social Media Marketing',
  'Search Engine Optimization (SEO)',
  'Pay-Per-Click Advertising (PPC)',
  'Content Marketing',
  'Email Marketing',
  'Influencer Marketing',
  'Affiliate Marketing',
  'Marketing Strategy',
  'Web Analytics',
  'Conversion Rate Optimization (CRO)',
  'Music Production',
  'Audio Editing',
  'Mixing & Mastering',
  'Sound Design',
  'Voice Over',
  'Jingles & Intros',
  'Foley Artist',
  'Podcast Editing',
  'Audio Restoration',
  'Music Transcription',
  'Web Development',
  'Mobile App Development',
  'Software Development',
  'Database Development',
  'DevOps',
  'Cloud Computing',
  'Cybersecurity',
  'Blockchain Development',
  'Game Development',
  'UI/UX Design',
  'Business Strategy',
  'Business Development',
  'Market Research',
  'Financial Consulting',
  'Project Management',
  'Accounting',
  'Legal Consulting',
  'Business Plan Writing',
  'Virtual Assistance',
  'HR Consulting',
];



export default Register;
