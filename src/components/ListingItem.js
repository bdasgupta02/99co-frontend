import React, { PureComponent } from "react";
import ListingItemPhotos from "./ListingItemPhotos"
import "./ListingItem.css";


class ListingItem extends PureComponent {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);

  }

  onClick() {
    this.props.onClick(this.props.listing.id);
  }

  render() {
    const formatPrice = (price) => {
      if (price >= 1000000) {
        return '$' + Math.round((price * 100) / 1000000) / 100 + ' M';
      } else {
        return this.props.listing.attributes.price_formatted.substring(1);
      }
    }

    // extracting all data before formatting
    const price = formatPrice(this.props.listing.attributes.price);
    const address = this.props.listing.address_line_1;
    const beds = this.props.listing.attributes.bedrooms_formatted;
    const baths = this.props.listing.attributes.bathrooms_formatted;
    const sqft = this.props.listing.attributes.area_size_formatted;
    const photos = this.props.listing.photos;
    let type = this.props.listing.main_category.toUpperCase();
    type = type === 'LANDED' ? 'FOR SALE' : type + ' FOR SALE';

    // formatted render
    return <div className="ListingItem">
      <div className="ListingItem-photos">
        <ListingItemPhotos photos={photos} />
      </div>
      <div className="ListingItem-type">{type}</div>
      <div className="ListingItem-price">{price}</div>
      <div className="ListingItem-sub">{address}</div>
      <div className="ListingItem-sub">{beds}&nbsp;&nbsp; {baths}&nbsp;&nbsp; {sqft}</div>
    </div>
  }
}

export default ListingItem;
