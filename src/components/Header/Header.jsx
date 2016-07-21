import React, { Component } from 'react';
import { render } from 'react-dom';
import Search from './Search.jsx';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.showSearch = this.showSearch.bind(this);
    }

    showSearch() {
        this.props.uiTools.fadeIn('searchContainer');
    }

    render () {
        return (
            <div id="appHeader">
                <div className="headerBlock">
                    <h1 className="appTitle">Slick<span>Gram</span></h1>
                    <h4>Instagram Viewer</h4>
                </div>
                <div className="headerBlock">
                    <ul id="headerMenu">
                        <li><a id="favoritesBtn" className="headerBtn"><i className="fa fa-heart-o fa-2x fa-border"></i></a></li>
                        <li><a id="searchBtn" className="headerBtn" onClick={this.showSearch}><i className="fa fa-search fa-2x fa-border"></i></a></li>
                    </ul>
                </div>
                <Search uiTools={this.props.uiTools} instagramApi={this.props.instagramApi} />
            </div>
        )
    }
}