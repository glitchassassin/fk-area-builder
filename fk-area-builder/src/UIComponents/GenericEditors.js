import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import { red900 } from 'material-ui/styles/colors';

import {
    TRAP_TYPES,
    TRAP_TRIGGERS
}
from '../Models/flags';
import {
    TrapReset,
    ExtraDescription,
    Program
}
from '../Models/area_model'
import {
    FlagSelector,
}
from '../UIComponents/FlagSelectors'
import {TrapResetValidator, ExtraDescriptionValidator, ProgramValidator} from '../Models/model_validator'
import {ModelComponent, ModelArrayComponent} from '../UIComponents/ModelComponents'

const trap_reset_validator = new TrapResetValidator();
const extra_description_validator = new ExtraDescriptionValidator();
const program_validator = new ProgramValidator();

const paper_style = {
    padding: "5px",
    margin: "5px auto",
    maxWidth: "900px"
}

class Validate extends React.Component {
    render() {
        var children = React.Children.map(this.props.children, (item, i) => {
            if (item.props.id) {
                try {
                    return React.cloneElement(item, {
                        errorText: this.props.validator[item.props.id].validate(item.props.value).join(""),
                    });
                } catch(e) {
                    console.log(this.props.validator);
                    console.log(item.props);
                    throw(e);
                }
            }
            else {
                return item;
            }
        });
        
        return (children)
    }
}

class TrapResetEditor extends ModelComponent {
    handleNew() {
        this.props.onChange({target:{id:this.props.id}}, new TrapReset());
    }
    
    remove() {
        this.props.onChange({target:{id:this.props.id}}, null);
    }
    
    render() {
        if (this.props.model !== null) {
            return (
                <Paper id={this.props.id} style={paper_style} zDepth={1}>
                    <Subheader>Trap Reset</Subheader>
                    <Validate validator={trap_reset_validator}>
                    <TextField 
                        floatingLabelText="Reset interval" 
                        id="reset_interval" 
                        value={this.props.model.reset_interval} 
                        autoComplete="off" 
                        onChange={this.handleChange.bind(this)} />
                    <FlagSelector 
                        label="Trap type" 
                        id="trap_type" 
                        flags={TRAP_TYPES} 
                        value={this.props.model.trap_type} 
                        onChange={this.handleChange.bind(this)} />
                    <TextField 
                        floatingLabelText="Trap charges" 
                        id="trap_charges" 
                        value={this.props.model.trap_charges} 
                        autoComplete="off" 
                        onChange={this.handleChange.bind(this)} />
                    <FlagSelector 
                        label="Trap trigger 1" 
                        id="trigger_1" 
                        flags={TRAP_TRIGGERS} 
                        value={this.props.model.trigger_1} 
                        onChange={this.handleChange.bind(this)} />
                    <FlagSelector 
                        label="Trap trigger 2" 
                        id="trigger_2" 
                        flags={TRAP_TRIGGERS} 
                        value={this.props.model.trigger_2} 
                        onChange={this.handleChange.bind(this)} />
                    </Validate>
                    <RaisedButton 
                        label="Remove Trap Reset" 
                        onClick={this.remove.bind(this)} 
                        icon={<FontIcon className="material-icons">remove_circle</FontIcon>}/>
                </Paper>
            );
        }
        else {
            return (
                <div>
                    <RaisedButton label="Add Trap Reset" onClick={this.handleNew.bind(this)} icon={<FontIcon className="material-icons">add_box</FontIcon>}/>
                </div>
            );
        }
    }
}

class ExtraDescriptionsEditor extends ModelArrayComponent {
    modelClass = ExtraDescription;
    
    generate(ed) {
        return this.props.model.map((ed, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.handleDelete(index))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={extra_description_validator}>
                <TextField 
                    floatingLabelText="Keywords (space separated)" 
                    id="keywords" 
                    index={index} 
                    fullWidth={true} 
                    value={ed.keywords} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TextField 
                    floatingLabelText="Long description" 
                    id="ldesc" 
                    index={index} 
                    multiLine={true} 
                    rows={5} 
                    fullWidth={true} 
                    value={ed.ldesc} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </Validate>
            </Paper>
        ));
    }
}

class ProgramsEditor extends ModelArrayComponent {
    modelClass = Program;
    
    generate() {
        return this.props.model.map((program, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.handleDelete(index))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={program_validator}>
                <FlagSelector 
                    label="Trigger" 
                    id="trigger" 
                    flags={this.props.triggers} 
                    value={program.trigger} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TextField 
                    floatingLabelText="Variable" 
                    id="argument" 
                    value={program.argument} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TextField 
                    floatingLabelText="Program" 
                    id="program" 
                    multiLine={true} 
                    rows={5} 
                    fullWidth={true} 
                    value={program.program} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </Validate>
            </Paper>
        ));
    }
}

export {TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor, Validate};