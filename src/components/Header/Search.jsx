import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        switch(event.keyCode) {
            case 13:
                let query = event.target.value;
                this.props.instagramApi.searchApi(query);
            case 27:
                this.props.uiTools.fadeOut('searchContainer');
            default:
                return true;
        }
    }

    render () {
        return (
           <div id="searchContainer">
               <div className="searchField">
                   <input className="formInput" type="text" placeholder="Search" onKeyUp={this.handleKeyPress} />
               </div>
           </div>
        )
    }
}