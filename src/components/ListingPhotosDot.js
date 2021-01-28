import React from "react";
import "./ListingPhotosDot.css";

// simple dot indicator with 3 types of dots 
// (selected, edge, unselected non-edge)

// what i noticed (and mimicked) from 99.co's page was that edge dots
// were smaller if and only if there were more images
// than the last dot indicated
const ListingPhotosDot = (props) => {
    if (props.selected) {
        return <div className="ListingPhotosDot-selected"></div>; 
    } else if (props.edges) {
        return <div className="ListingPhotosDot-edges"></div>;
    } else {
        return <div className="ListingPhotosDot"></div>;
    }
}

export default ListingPhotosDot;