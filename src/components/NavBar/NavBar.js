import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container justify-content-between">
                    <div className="navbar-brand d-flex align-items-center">
                        <span className="logo-left">PHOTO</span>
                        <span className="logo-right">SEARCH</span>
                        <span className="logo-complement">powered by Flickr</span>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;