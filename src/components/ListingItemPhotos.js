import React, { useState } from "react";
import leftArrow from "../assets/images/left-arrow.png";
import rightArrow from "../assets/images/right-arrow.png";
import ListingPhotosDot from "./ListingPhotosDot";
import "./ListingItemPhotos.css";

// photo carousel for card listings
const ListingItemPhotos = (props) => {
    const [state, changeState] = useState({
        index: 0,
        dotsIndex: 0
    });

    // extracting data from props
    const pics = props.photos.map((pic) => pic.url);
    const chosenPic = pics[state.index];
    const maxDots = pics.length >= 5 ? 5 : pics.length;

    // function to change the photo in the sub-carousel slideshow browser
    // towards left
    const changeIndexLeft = () => {
        const newIndex = state.index - 1 >= 0 ? 
            state.index - 1 : (state.index - 1) + pics.length;
        changeState({
            index: newIndex,
            dotsIndex: newIndex === 0 ? 0 : 
                newIndex === pics.length - 1 ? pics.length - maxDots : 
                newIndex <= state.dotsIndex ? state.dotsIndex - 1 : 
                state.dotsIndex
        });
    }

    // function to change the photo in the sub-carousel slideshow browser
    // towards right
    const changeIndexRight = () => {
        const newIndex = state.index + 1 >= pics.length ? 
            (state.index + 1) - pics.length : state.index + 1;
        changeState({
            index: newIndex,
            dotsIndex: newIndex === pics.length - 1 ? state.dotsIndex : 
                newIndex === 0 ? 0 : 
                newIndex >= state.dotsIndex + maxDots - 1 ? state.dotsIndex + 1 : 
                state.dotsIndex
        });
    }

    // creating an array of the dot indicators below the photos
    let dotsArr = [];
    for (let i = state.dotsIndex; i < state.dotsIndex + maxDots; i++) {
        dotsArr.push(<ListingPhotosDot key={i} selected={state.index === i} edges={(i === state.dotsIndex && i > 0) || 
            (i === state.dotsIndex + maxDots - 1 && pics.length !== i + 1)} />);
    }

    // final formatting with the photo, arrows and dot indicators
    return <div className="ListingItemPhotos">
        <img className="ListingItemPhotos-photos" alt="Property" src={chosenPic} />
        <div className="ListingItemPhotos-arrows">
            <div className="ListingItemPhotos-arrows-left" onClick={changeIndexLeft}>
                <img className="ListingItemPhotos-arrows-left-img" src={leftArrow} alt="Previous"/>
            </div>
            <div className="ListingItemPhotos-arrows-right" onClick={changeIndexRight}> 
                <img className="ListingItemPhotos-arrows-right-img" src={rightArrow} alt="Next"/>
            </div>
        </div>
        <div className="ListingItemPhotos-dots">
            {dotsArr}
        </div>
    </div>;
}

export default ListingItemPhotos;