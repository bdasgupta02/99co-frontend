import { UPDATE_LISTINGS } from '../actions/listings';

export default function listings(state = [], action) {
  switch (action.type) {
    case UPDATE_LISTINGS:
      
      // Removed the oldListings code below due to the concat of several
      // listings continuously into the listings array. This is an issue
      // when new data is automatically fetched at the end of the Carousel
      // making the listings array grow significantly unnecessarily.
      //
      // the code:
      // const oldListings = typeof state.listings === 'undefined' ? [] : state.listings;
      return {
        ...state,
        listings: action.listings,
        firstRender: false,
      };
    default:
      return state;
  }
}
