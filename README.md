# Instagram Widget

## About SlickGram

View the working demo online at: http://maburdenjr.github.io

### Current Functionality

* __Responsive Design__: uses SASS mixins to control grid layout on different devices
* __Search Feature__: Click on the search icon to bring down the search bar.  Type something in the search bar and hit enter to kick off a search.  Hit `esc` to close the search bar.
* __Vanilla Javascript Ajax Call__: Simulates fetching data from an external source (not fully implemented - see gotchas section)
* __React Goodness__: Entire app is built using ReactJs with nested components and uiTools being passed down as props where needed
* __Image Overlay__:  Click on a thumbnail to see the full size for the image.  Click on the X to close the overlay

### Some 'Gotchas'

Instagram made some breaking API changes on June 1st, 2016.  Without an approved Instagram app and client ID there's no way to search and get images from the Instagram API.  To workaround within the time permitted, I pulled down some JSON from the Instagram explore page `https://www.instagram.com/explore/tags/squarespace/?__a=1` and put it into a static file `public/data/instagram.js`.  

### Planned Enhancements

There are quite a few features that I would have liked to include if time permmitted.

* __Favorites__: The ability to click on a image in the grid and save it as a favorite.  Clicking on the heart icon in the header would display a sliding panel from the right that contained the thumbnails of all images that were marked as favorite. 
* __Load More__: The ability to load more images from a search using Instagram's pagination feature.
* __Image Details__: Display captions and tags for images.
* __Loading Screen__: Display loading spinners while waiting for a response from the api and waiting for images to download

## Developer Setup

Download and install the node packages
```bash
$ npm i
```
Build
```
$ npm run dev
```

## Screenshots

![Grid view and photo view](https://github.com/maburdenjr/maburdenjr.github.io/blob/master/src/images/screenshot.jpg)