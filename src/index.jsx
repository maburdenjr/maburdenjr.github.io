import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../src/components/Header/Header.jsx';
import Grid from '../src/components/ImageGrid/Grid.jsx';
import Loading from '../src/components/Common/Loading.jsx';
import Overlay from '../src/components/ImageGrid/Overlay.jsx';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let that = this;
        this.instagramApi().searchApi('squarespace');
        window.jsonpCallback = function(data) {
            let instagramData = JSON.parse(data);
            that.setState({instagramData: instagramData});
        };
    }

    displayComponent() {
        if(this.state) {
            return Grid;
        } else {
            return Loading;
        }
    }

    userInterfaceTools() {
        return {
            fadeIn: function(elementId) {
                let element = document.getElementById(elementId);
                let op = 0.1;  // initial opacity
                element.style.display = 'block';
                let timer = setInterval(function () {
                    if (op >= 1){
                        clearInterval(timer);
                    }
                    element.style.opacity = op;
                    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op += op * 0.1;
                }, 10);
            },
            fadeOut: function(elementId) {
                // ToDo: Make this fade out instead of just disappearing
                var element = document.getElementById(elementId);
                element.style.display = 'none';
                element.style.opacity = 0;
                element.style.filter = 'alpha(opacity=0)';
            }
        }
    };

    instagramApi() {
        return {
            searchApi: function(query) {
                if(query) {
                    let apiUrl = './public/data/instagram.js';
                    let instagramData = this.jsonP(apiUrl);

                }
            },
            jsonP(apiUrl) {
                /* Instagram changed their API on June 1, 2016 so this code simulates a jsonp request with callback.
                   public/data/instagram.js simulates an Instagram api response wrapped in a callback
                 */
                let head = document.head;
                let script = document.createElement("script");

                script.setAttribute("src", apiUrl);
                head.appendChild(script);
                head.removeChild(script);
                return true;
            }
        }
    }

    render () {
        let GridWrapper = this.displayComponent();
        return (
            <div id="appContainer">
                <Header uiTools={this.userInterfaceTools()} instagramApi={this.instagramApi()} />
                <GridWrapper uiTools={this.userInterfaceTools()} data={this.state} />
                <Overlay uiTools={this.userInterfaceTools()} />
            </div>

        )
    }
}

render(<App/>, document.getElementById('app'));