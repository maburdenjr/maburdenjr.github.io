import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Thumbnail extends Component {

    constructor(props) {
        super(props);
    }

    showFullSizeImage(imgSrc) {
       let imageElement = document.getElementById('fullImage');
       imageElement.src = imgSrc;
        this.props.uiTools.fadeIn('imgOverlay');
    }

    render () {
        console.log(this.props);
        return (
            <div className="thumbnail">
                <img src={this.props.imageData.thumbnail_src} onClick={this.showFullSizeImage.bind(this, this.props.imageData.display_src)} />
            </div>
        )
    }
}