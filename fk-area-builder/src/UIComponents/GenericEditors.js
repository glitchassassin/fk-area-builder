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
    TRAP_TRIGGERS,
    MOB_PROGRAM_TRIGGERS
}
from '../Models/flags';
import {
    TrapReset,
    ExtraDescription,
    Program
}
from '../Models/are_model'
import {
    FlagSelector,
}
from '../UIComponents/FlagSelectors'
import {ModelComponent, ModelArrayComponent} from '../UIComponents/ModelComponents'

const paper_style = {
    padding: "5px",
    margin: "5px auto",
    maxWidth: "900px"
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
                    <TextField 
                        floatingLabelText="Reset interval" 
                        id="reset_interval" 
                        errorText={this.props.model.validate("reset_interval")} 
                        value={this.props.model.reset_interval} 
                        autoComplete="off" 
                        onChange={this.handleChange.bind(this)} />
                    <FlagSelector 
                        label="Trap type" 
                        id="trap_type" 
                        errorText={this.props.model.validate("trap_type")} 
                        flags={TRAP_TYPES} 
                        value={this.props.model.trap_type} 
                        onChange={this.handleChange.bind(this)} />
                    <TextField 
                        floatingLabelText="Trap charges" 
                        id="trap_charges" 
                        errorText={this.props.model.validate("trap_charges")} 
                        value={this.props.model.trap_charges} 
                        autoComplete="off" 
                        onChange={this.handleChange.bind(this)} />
                    <FlagSelector 
                        label="Trap trigger 1" 
                        id="trigger_1" 
                        errorText={this.props.model.validate("trigger_1")} 
                        flags={TRAP_TRIGGERS} 
                        value={this.props.model.trigger_1} 
                        onChange={this.handleChange.bind(this)} />
                    <FlagSelector 
                        label="Trap trigger 2" 
                        id="trigger_2" 
                        errorText={this.props.model.validate("trigger_2")} 
                        flags={TRAP_TRIGGERS} 
                        value={this.props.model.trigger_2} 
                        onChange={this.handleChange.bind(this)} />
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
                <TextField 
                    floatingLabelText="Keywords (space separated)" 
                    id="keywords" 
                    errorText={ed.validate("keywords")} 
                    index={index} 
                    fullWidth={true} 
                    value={ed.keywords} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TextField 
                    floatingLabelText="Long description" 
                    id="ldesc" 
                    errorText={ed.validate("ldesc")} 
                    index={index} 
                    multiLine={true} 
                    rows={5} 
                    fullWidth={true} 
                    value={ed.ldesc} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
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
                <FlagSelector 
                    label="Trigger" 
                    id="trigger" 
                    errorText={program.validate("trigger")} 
                    flags={this.props.triggers} 
                    value={program.trigger} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TextField 
                    floatingLabelText="Variable" 
                    id="argument" 
                    errorText={program.validate("argument")} 
                    value={program.argument} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TextField 
                    floatingLabelText="Program" 
                    id="program" 
                    errorText={program.validate("program")} 
                    multiLine={true} 
                    rows={5} 
                    fullWidth={true} 
                    value={program.program} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
            </Paper>
        ));
    }
}

export {TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor};