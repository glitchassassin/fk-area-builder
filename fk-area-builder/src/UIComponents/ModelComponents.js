import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Model} from '../Models/model'


class ModelComponent extends React.Component {
    shouldComponentUpdate(newProps) {
        // Return true if model has changed, false otherwise
        for (let p in this.props) {
            if (this.props[p] instanceof Model) {
                if (!this.props[p].equals(newProps[p])) {
                    console.log(this, "should update");
                    return true;
                }
            }
            else if (this.props[p] != newProps[p]) {
                console.log(this, "should update");
                return true;
            }
        }
        console.log(this, "should not update");
        return false;
    }
    handleChange(event, value) {
        console.log("ModelComponent handleChange", this, event.target.id, value);
        let model = this.props.model.clone();
        model[event.target.id] = value;
        this.props.onChange({target:this.props}, model);
    }
}

class ModelArrayComponent extends React.Component {
    shouldComponentUpdate(newProps) {
        // If the array length changed, then update.
        if (this.props.model.length != newProps.model.length) {
            console.log(this, "should update");
            return true;
        }
        // Otherwise, update if one of the models in the array has changed.
        for (let i = 0; i < this.props.model.length; i++) {
            if (!this.props.model[i].equals(newProps.model[i])) {
                console.log(this, "should update");
                return true;
            }
        }
        console.log(this, "should not update");
        return false;
    }
    handleChange(event, value, index) {
        console.log("ModelArrayComponent handleChange", this, index, event.target.id, value);
        let model = this.props.model.map((e)=>(e.clone()));
        let item = model[parseInt(index)]
        item[event.target.id] = value;
        this.props.onChange({target:this.props}, model);
    }
    handleNew() {
        console.log("ModelArrayComponent handleNew", this);
        // Clone array elements, and add model to the new array.
        let model = this.props.model.map((e)=>(e.clone()));
        model.push(new this.modelClass());
        this.props.onChange({target:this.props}, model);
    }
    handleDelete(index) {
        console.log("ModelArrayComponent handleDelete", this);
        // Clone array elements, and remove the target element.
        let model = this.props.model.map((e)=>(e.clone()));
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