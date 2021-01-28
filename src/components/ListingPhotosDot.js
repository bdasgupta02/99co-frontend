import React from "react";
import "./ListingPhotosDot.css";

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