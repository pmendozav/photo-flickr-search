import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";

import {updateFormContent} from '../../actions/search-form.action'

import './SearchForm.css';
import "react-datepicker/dist/react-datepicker.css";

const mapStateToProps = state => ({
    formContent: state.searchReducer.formContent
});
  
const mapDispatchToProps = {
    updateFormContent,
};

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarIsOpen: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === "tags") {
            this.props.updateFormContent({name:name, "value":value.split(',').map(tag => tag.trim())});
        } else {
            this.props.updateFormContent({name:name, value:value});
        }
    }

    handleDateChange(date, name) {
        this.props.updateFormContent({name:name, value:date});
        this.toggleCalendar();
    }

    toggleCalendar(e) {
        e && e.preventDefault()
        this.setState({ calendarIsOpen: !this.state.calendarIsOpen })
    }

    render() {
        const tagsInput = this.props.formContent.tags.join(', ');

        return (
            <div className="search-form">
                <form>
                    <div className="form-group">
                        <label className="title">Photo Search Tags</label>
                        <input
                            name="tags"
                            className="form-control" 
                            placeholder="tags" 
                            value={tagsInput}
                            onChange={this.handleInputChange} />
                    </div>
                    <small className="form-text text-muted">Filters</small>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="knownCopyright" 
                            checked={this.props.formContent.copyright}
                            onChange={this.handleInputChange}
                            name="copyright" />
                        <label className="form-check-label" htmlFor="knownCopyright">
                            No Known Copyright Restrictions
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="license" 
                            checked={this.props.formContent.license}
                            onChange={this.handleInputChange}
                            name="license" />
                        <label className="form-check-label" htmlFor="license">
                            Attribution License
                        </label>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            Min Upload Date
                            <div className="date-input">
                                <DatePicker 
                                    selected={this.props.formContent.dateFrom}
                                    onChange={(date) => this.handleDateChange(date, "dateFrom")} />
                            </div>
                        </div>

                        <div className="col">
                            Max Upload Date
                            <div className="date-input">
                                <DatePicker 
                                    selected={this.props.formContent.dateTo}
                                    onChange={(date) => this.handleDateChange(date, "dateTo")} />
                            </div>
                        </div>
                    </div>

                    <br />

                    <button type="button" className="btn btn-primary" onClick={this.props.onClick}>Search</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);