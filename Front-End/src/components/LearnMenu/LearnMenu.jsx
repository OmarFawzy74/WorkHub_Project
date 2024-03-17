import React from 'react'
import "./LearnMenu.scss"
import { Link } from 'react-router-dom'
import { gigs } from "../../data";
import LearnCard from '../LearnCard/LearnCard';


const LearnMenu = () => {
    return (
        <div className='learnMenuContainer'>
            <div className='learnMenu'>
                <Link className='learnMenuLink' to="/">
                    Graphics & Design
                </Link>
                <Link className='learnMenuLink' to="/">
                    Video & Animation
                </Link>
                <Link className='learnMenuLink' to="/">
                    Writing & Translation
                </Link>
                <Link className='learnMenuLink' to="/">
                    AI Services
                </Link>
                <Link className='learnMenuLink' to="/">
                    Digital Marketing
                </Link>
                <Link className='learnMenuLink' to="/">
                    Programming & Tech
                </Link>
                <Link className='learnMenuLink' to="/">
                    Business
                </Link>
            </div>

            <div className="learnCards">
                {gigs.map((gig) => (
                    <LearnCard key={gig.id} item={gig} />
                ))}
            </div>

        </div>
    )
}

export default LearnMenu