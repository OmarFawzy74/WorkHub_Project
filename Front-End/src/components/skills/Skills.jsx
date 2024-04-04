// import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import "./Skills.scss";
import React, { useEffect, useState } from "react";

export default function Skills() {

  const [skillsList, setSkillsList] = useState([]);

  
  // const handleSkillsChange = (e) => {
  //   const { name, value } = e.target;
  //   const updatedSkillsList = skillsList.map((item, index) => {
  //     if (index === skillsList.length - 1) {
  //       // If it's the last item in the array, update its value
  //       return { ...item, [name]: value };
  //     }
  //     return item;
  //   });
  //   // Update the state with the modified array
  //   setSkillsList(updatedSkillsList);
  // };

  const handleSkillsChange = (e) => {
    const value = e.target.innerText;
    
    // Create a new object with the value and push it to the skillsList
    setSkillsList([...skillsList, { skills: value }]);
    console.log(e);
  };

  useEffect(() => {
    // Function to remove deleted values from the skills list
    const removeDeletedValues = () => {
      const previousSkills = new Set(skillsList.map(item => item.skills));
      const currentSkills = new Set(top100Skills.filter(skill => skillsList.some(item => item.skills === skill)));
      const deletedSkills = Array.from(previousSkills).filter(skill => !currentSkills.has(skill));
      const updatedSkillsList = skillsList.filter(item => !deletedSkills.includes(item.skills));
      setSkillsList(updatedSkillsList);
    };

    removeDeletedValues();
  }, [skillsList]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && e.target.innerText === "") {
      // If Backspace key is pressed and input field is empty, remove last skill
      setSkillsList(skillsList.slice(0, -1));
      console.log(skillsList);
    }
  };

  // const handleSkillsChange = (e) => {
  //   let index = skillsList.length + 1
  //   const { name, value } = e.target;
  //   var list = [...skillsList];
  //   list[index][name] = value;
  //   setSkillsList(list);
  // };

  // console.log(skillsList);


  // let test = document.querySelector("path");

  // console.log(test);


  const handleSkillsArray = () => {

    var array = [];

    skillsList.forEach((item) => {
      array.push(item.skills);
    });

    return array;

  };
  // console.log(handleSkillsArray());

  // const handleSkillsRemove = (index) => {
  //   const list = [...skillsList];
  //   list.splice(index, 1);
  //   setSkillsList(list);
  // };

  // const handleSkillsAdd = () => {
  //   setSkillsList([...skillsList, { skills: "" }]);
  // };

  return (
    <Stack spacing={5} sx={{ width: 500 }}
    >
      <Autocomplete
            onChange={(e) => handleSkillsChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
        multiple
        id="skills-standard"
        options={top100Skills}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            className="no-underline"
            // label="Skills"
            placeholder="Add skills"
          />
        )}
      />
    </Stack>
  );
}
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
