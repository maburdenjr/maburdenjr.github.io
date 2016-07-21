import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Overlay extends Component {

    constructor(props) {
        super(props);
        this.closeOverlay = this.closeOverlay.bind(this);
    }

    closeOverlay() {
        this.props.uiTools.fadeOut('imgOverlay');
    }

    render () {
        return (
            <div id="imgOverlay">
                <div className="fullImgContainer">
                    <img id="fullImage"></img>
                    <i className="closeBtn fa fa-close fa-2x fa-border" onClick={this.closeOverlay}></i>
                </div>
            </div>
        )
    }
}