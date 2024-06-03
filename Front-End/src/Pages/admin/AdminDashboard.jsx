import "./AdminDashboard.scss";
import React, { useEffect, useRef, useState } from 'react'
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { sidebarStatus } from "../../App";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

function AdminDashboard() {
    const [freelancers, setfreelancers] = useState({
      loading: true,
      results: [],
      err: null,
      reload: 0,
    });

    useEffect(() => {
      setfreelancers({ ...freelancers, loading: true });
      axios
        .get("http://localhost:3000/api/freelancers/getAllFreelancers")
        .then((resp) => {
          console.log(resp.data);
          setfreelancers({
            results: resp.data.freelancers,
            loading: false,
            err: null,
          });
          console.log(resp);
        })
        .catch((err) => {
          setfreelancers({
            ...freelancers,
            loading: false,
            err: err.response.data.msg,
          });
          console.log(err);
        });
    }, [freelancers.reload]);


    const [clients, setClients] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
      });
    
      useEffect(() => {
        setClients({ ...clients, loading: true })
        axios.get("http://localhost:3000/api/clients/getAllClients")
          .then(
            resp => {
              console.log(resp.data);
              setClients({ results: resp.data, loading: false, err: null });
              console.log(resp);
            }
          ).catch(err => {
            setClients({ ...clients, loading: false, err: err.response.data.msg });
            console.log(err);
          })
      }, [clients.reload]);


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
                    console.log(resp.data);
                    setCategories({ results: resp.data, loading: false, err: null });
                    console.log(resp);
                }
            ).catch(err => {
                setCategories({ ...categories, loading: false, err: err.response.data.msg });
                console.log(err);
            })
    }, [categories.reload]);
    

    const [courses, setCourses] = useState({
        loading: false,
        results: null,
        err: null,
        reload: 0,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/courses/getAllCourses")
            .then((resp) => {
                setCourses({ results: resp.data.modifiedCourses, loading: false, err: null });
                console.log(resp.data.modifiedCourses);
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
                // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
            });
    }, [courses.reload]);


  const data = [
    { value: 5, label: "A" },
    { value: 10, label: "B" },
    { value: 15, label: "C" },
    { value: 20, label: "D" },
  ];

  const size = {
    width: 700,
    height: 700,
  };

  function PieArcLabel() {
    return (
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 30,
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
            fontSize: "10px",
          },
        }}
        {...size}
      />
    );
  }


  function GridDemo() {
    return (
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={900}
        height={400}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
      />
    );
  }

  return (
    <main
      className={
        sidebarStatus()
          ? "main-container sidebar-open-dashboard"
          : "main-container sidebar-close-dashboard"
      }
    >
      <div>
        <h3 className="dashboardTitle">DASHBOARD</h3>
      </div>

      <div className="chartsContainer">
        <div className="pieChart">
            <PieArcLabel></PieArcLabel>
        </div>

        <div className="lineChart">
            <GridDemo></GridDemo>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
