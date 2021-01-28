import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListingItem from "./ListingItem";
import { fetchData } from "../actions/listings";
import "./ListingCarousel.css";

function mapStateToProps(state) {
  return {
    listings: state.listings.listings,
    firstRender: state.listings.firstRender,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch(fetchData);
    },
  };
}

class ListingCarousel extends Component {
  static propTypes = {
    listings: PropTypes.object,
    firstRender: PropTypes.bool,
  };

  constructor(props) {
    super();
    this.state = {
      index: 0,
      listings: props.listings,
      isTest: [],
      firstRender:
        typeof props.firstRender !== "undefined" ? props.firstRender : true,
    };
    this.updateListing = this.updateListing.bind(this);
    this.changeCarouselLeft = this.changeCarouselLeft.bind(this);
    this.changeCarouselRight = this.changeCarouselRight.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.listings !== this.props.listings) {
      this.setState((state) => {
        return {
          ...this.state,
          listings: nextProps.listings,
          firstRender: nextProps.firstRender,
        };
      });
    }
  }

  updateListing(id) {
    this.setState({
      ...this.state,
      listings: this.state.listings.map((listing) => {
        const isTest = listing.id === id;
        if (!isTest) return listing;
        return {
          ...listing,
          isTest,
        };
      }),
    });
  }

  // changes the Carousel display to show new listings
  // automatically fetches new listing data once the limit is reached
  changeCarouselRight() {

    // fetches more data from actions
    if(this.state.index >= this.state.listings.length - 4) {
      this.props.fetchData();
    }
    
    // used to change the index where the display starts from
    this.setState({
      ...this.state,
      index: this.state.index + 4 >= this.state.listings.length ?
        (this.state.index + 4) - this.state.listings.length : this.state.index + 4
    });
  }

  // changes the Carousel display to show previous listings
  changeCarouselLeft() {
    this.setState({
      ...this.state,
      index: this.state.index - 4 >= 0 ? this.state.index - 4 :
        (this.state.index - 4) + this.state.listings.length
    });
  }

  render() {
    const { listings } = this.state;

    if (this.state.firstRender) {
      this.props.fetchData();
    }

    if (!listings) return null;
    console.log("LISTINGS", listings);
    
    const items = listings.map((listing, index) => {
      return (
        <ListingItem
          key={index}
          listing={listing}
          onClick={this.updateListing}
        />
      );
    });
    
    // buffer array with 4 slots to display 4 listings on the page
    // items get replaced once state is changed to show new listings
    let bufferItems = [];
    for (let i = 0; i < 4; i++) {
      if (this.state.index < items.length) {
        bufferItems.push(items[this.state.index + i]);
      } else {
        bufferItems.push(items[(this.state.index + i) % items.length]);
      }
    }

    // carousel formatting with a grid (similar to what i noticed in 99.co)
    return <div>
      <div className="ListingCarousel-holder">
        <div className="ListingCarousel-holder-subgrid">
          <div className="ListingCarousel-heading-text">Listings with videos</div>
          <a href="https://bit.ly/3cn32Lo" className="ListingCarousel-heading-button">See all</a>
        </div>
      </div>
      <div className="ListingCarousel-column">
        <div className="ListingCarousel-column-subgrid">
          <div className="ListingCarousel-item">{bufferItems[0]}</div>
          <div className="ListingCarousel-item">{bufferItems[1]}</div>
          <div className="ListingCarousel-item">{bufferItems[2]}</div>
          <div className="ListingCarousel-item">{bufferItems[3]}</div>
        </div>
      </div>
      <div className="ListingCarousel-holder">
        <div className="ListingCarousel-holder-subgrid-bottom">
          <div className="ListingCarousel-footer-left">
            <div onClick={this.changeCarouselLeft}>Previous</div>
          </div>
          <div className="ListingCarousel-footer-right">
            <div onClick={this.changeCarouselRight}>Next</div>
          </div>
        </div>
      </div>
    </div >
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingCarousel);
