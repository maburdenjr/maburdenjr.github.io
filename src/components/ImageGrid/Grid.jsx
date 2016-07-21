import React, { Component } from 'react';
import { render } from 'react-dom';
import Thumbnail from './Thumbnail.jsx';



export default class Grid extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        let instagramImages = this.props.data.instagramData.tag.media.nodes;
        let uiTools = this.props.uiTools;
        return (
            <div id="imageGrid">
                {
                    instagramImages.map(function (result) {
                        return (
                            <Thumbnail imageData={result} key={result.id} uiTools={uiTools} />
                        )

                    })
                }
            </div>
        )
    }
}