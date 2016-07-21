# Instagram Widget

## About SlickGram

### Current Functionality

* Responsive Design - uses SASS mixins to control grid layout on different devices
* Search Feature - 

### Some 'Gotchas'

Instagram made some breaking API changes on June 1st, 2016.  Without an approved Instagram app and client ID there's no way to search and get images from the Instagram API.  To workaround within the timeline I pulled down some JSON from the Instagram explore page `https://www.instagram.com/explore/tags/squarespace/?__a=1` and dumped them into a static file `public/data/instagram.js`/

### Planned Enhancements

## Developer Setup

1. Download and install the node packages
```bash
$ npm i
```
2. Build
```
$ npm run dev
```