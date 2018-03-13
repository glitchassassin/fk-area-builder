import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Model, equal_recursively} from '../Models/model'


class ModelComponent extends React.Component {
    shouldComponentUpdate(newProps) {
        // Return true if model has changed, false otherwise
        for (let p in this.props) {
            if (!equal_recursively(this.props[p], newProps[p])) {
                return true;
            }
        }
        return false;
    }
    handleChange(event, value) {
        let model = this.props.model.clone();
        model[event.target.id] = value;
        this.props.onChange({target:this.props}, model);
    }
}

class ModelArrayComponent extends React.Component {
    shouldComponentUpdate(newProps) {
        // If the array length changed, then update.
        if (this.props.model.length !== newProps.model.length) {
            return true;
        }
        // Otherwise, update if one of the models in the array has changed.
        for (let i = 0; i < this.props.model.length; i++) {
            if (!equal_recursively(this.props.model[i], newProps.model[i])) {
                return true;
            }
        }
        return false;
    }
    handleChange(event, value, index) {
        let model = this.props.model.slice(0);
        let item = model[parseInt(index, 10)].clone();
        item[event.target.id] = value;
        model[parseInt(index, 10)] = item;
        this.props.onChange({target:this.props}, model);
    }
    handleNew() {
        // Clone array elements, and add model to the new array.
        let model = this.props.model.slice(0);
        model.push(new this.modelClass());
        this.props.onChange({target:this.props}, model);
    }
    handleDelete(index) {
        // Clone array elements, and remove the target element.
        let model = this.props.model.slice(0);
        model.splice(index,1);
        this.props.onChange({target:this.props}, model);
    }
    
    render() {
        return (
            <React.Fragment>
                {this.generate()}
                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </React.Fragment>
        )
    }
}

export {ModelComponent, ModelArrayComponent}