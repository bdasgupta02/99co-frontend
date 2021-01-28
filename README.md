This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and modified to provide a nice little challenge for 99.co frontend candidates.

# Goals
- Create a carousel component that matches the design in `/public/carousel_demo.png` or on our [home page](https://www.99.co) - **DONE**
- Able to browse photos on listing card - **DONE**
- Able to fetch additional listings once reach the end of the carousel (Additional listing data can be fetched through the same listing API) - **DONE**
- Bonus points for:
  - Hosting the project on a remote server/service so we can visit later - **DONE**
  - Performance optimization/Architectural suggestion to the project that you deem worthy - **DONE**

# Some details about the implementation:
- The styling from the original website was mimicked very closely in terms of colours, fonts, positioning and aspect ratios.
- Montserrat was used to replace Avenir Next seen in the original website due to easier availability and high similarity.
- React components were used with the principle of composition (eg. listing items, photo dots).
- Buttons were added which are not present in the original 99.co site to navigate across listings in the entire Carousel.
- Actions were edited to optimize the automatic fetching of new listing data to overwrite the old listing data.
- Modularity was used for all .css files to encourage easier hypothetical replication to other places/projects.

# Improvements for the future:
- Animations for a smoother user experience.
- Pagination may be introduced to load new listing data in the Carousel to favour speed and low space.
- Listing tiles can be made more responsive to smaller resolutions, to prevent extensive scrolling.

# Project Architecture
`/src` provides all the source code you need to start working in this Redux project.
Inside `/src`, files are categorized into:
- `App.* files`: the high level app component, house to all other small component
- `/actions/*`: store all redux actions
- `/reducers/*`: store all redux reducers
- `/components/*`: where the actual UI & data components live
- `/assets/*`: where images and other assets live

# Existing features
## v1.1.1
- Finished creating the Carousel test

## v1.1.0
- An app shell that provides Redux infra & HMR support
- Prefetched listings API data
