import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import SearchForm from './components/SearchForm/SearchForm';
import SearchResult from './components/SearchResult/SearchResult';

import { searchImages, clearResults } from './actions/search-form.action'

const mapStateToProps = state => ({
    formContent: state.searchReducer.formContent
});

const mapDispatchToProps = {
    searchImages,
    clearResults,
};

class App extends Component {
    state = {
        showResults: false
    };

    onClickSearchBtn = () => {
        this.props.clearResults();
        this.props.searchImages(this.props.formContent);
        this.setState({ showResults: true });
    };

    render() {
        return (
            <div>
                <NavBar />
                <div className="container justify-content-between app">
                    <div className="row">
                        <div className="col">
                            <SearchForm
                                onClick={this.onClickSearchBtn} />
                        </div>
                        <div className="col">
                            {this.state.showResults && <SearchResult />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
