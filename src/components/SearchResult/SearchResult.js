import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";

import { updateFormContent, searchImages, clearResults } from '../../actions/search-form.action';

import { MONTH_NAMES } from '../../constants/common';

import './SearchResult.css';

const SimpleMessage = ({msg}) => (
    <h4 className="simple-message">{msg}</h4>
);

const mapStateToProps = state => ({
    items: state.resultReducer.photoInfo.payload,
    isLoading: state.resultReducer.photoInfo.isLoading,
    hasMoreItems: state.resultReducer.scroll.hasMoreItems,
    hasError: state.resultReducer.photoInfo.hasError,
    currentPage: state.resultReducer.scroll.currentPage,

    formContent: state.searchReducer.formContent
});

const mapDispatchToProps = {
    updateFormContent,
    searchImages,
    clearResults,
};

const PhotoTags = ({ tags, onClick }) => tags.map(
    (tag, index) => <div className="tag" key={index} onClick={() => onClick(tag)}>{tag}</div>
);

const Photo = ({ urlPhoto, date, author, profile, tags, onClickTag }) => {
    return (
        <div className="row result">
            <div className="col">
                <img
                    className="image"
                    src={urlPhoto}
                    alt="new"
                />
            </div>
            <div className="col">
                <div className="row">
                    Taken on {date}
                </div>
                <div className="row">
                    by <a href={profile} target="_blank" rel="noopener noreferrer" className="author">{author}</a>
                </div>
                <div className="row" >
                    <ul className="tags">
                        <PhotoTags tags={(tags.length > 3) ? tags.slice(0, 3) : tags} onClick={onClickTag} />
                    </ul>
                </div>
            </div>
        </div>
    )
}

class SearchResult extends Component {
    onClickTag = (tag) => {
        this.props.clearResults();

        this.props.updateFormContent({
            name: "tags",
            value: [tag]
        });

        this.props.searchImages({
            ...this.props.formContent,
            tags: [tag]
        });
    }

    formatDate = (date) => {
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();

        if (day.length < 2) day = '0' + day;
        return `${MONTH_NAMES[month]} ${(day < 10) ? ("0" + day) : day}, ${year}`;
    }

    fetchMoreData = () => {
        this.props.searchImages({
            ...this.props.formContent,
            page: this.props.currentPage
        });
    }

    render() {
        const { items, hasMoreItems } = this.props;
        const pictures = items.map(
            (item, index) => {
                return (
                    <Photo
                        key={index}
                        urlPhoto={item.urlPhoto}
                        date={this.formatDate(item.date)}
                        author={item.author}
                        profile={item.profile}
                        tags={item.tags}
                        onClickTag={this.onClickTag}
                    />
                );
            }
        );

        // https://github.com/CassetteRocks/react-infinite-scroller/issues/163

        if (this.props.hasError) {
            return <SimpleMessage msg="Error loading. Try Again"/>
        } else if (!this.props.isLoading && pictures.length === 0) {
            return <SimpleMessage msg="Nothing to show..."/>
        }

        return (
            <div>
                <div className="title">Results</div>
                <div id="scrollableDiv" style={{ height: 600, overflow: "auto" }}>
                    <InfiniteScroll
                        dataLength={pictures.length}
                        next={this.fetchMoreData}
                        hasMore={hasMoreItems}
                        loader={<SimpleMessage msg="Loading..."/>}
                        scrollableTarget="scrollableDiv"
                    >
                        {pictures}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);