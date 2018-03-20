import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ListSubheader from 'material-ui/List/ListSubheader';
import red from 'material-ui/colors/red';
import { connect } from 'react-redux';
import { ExtraDescriptionActions, ProgramActions, TrapResetActions } from '../Models/actionTypes';
import PropTypes from 'prop-types';

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
from '../Models/model_templates'
import {
    FlagSelector,
}
from '../UIComponents/FlagSelectors'
import {TrapResetValidator, ExtraDescriptionValidator, ProgramValidator} from '../Models/model_validator'

const trap_reset_validator = new TrapResetValidator();
const extra_description_validator = new ExtraDescriptionValidator();
const program_validator = new ProgramValidator();

const paper_style = {
    padding: "5px",
    margin: "5px auto",
    maxWidth: "900px"
}

class Validate extends React.Component {
    getChildContext() {
        return {validator: this.props.validator}
    }
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
        
        return (this.props.children)
    }
}
Validate.childContextTypes = {
  validator: PropTypes.function
};

class TrapResetEditor extends React.Component {
    render() {
        let model = this.props.resets.filter((r)=>(r.pointer===this.props.pointer))[0]
        if (model !== undefined) {
            return (
                <Paper id={this.props.id} style={paper_style} zDepth={1}>
                    <ListSubheader>Trap Reset</ListSubheader>
                    <Validate validator={trap_reset_validator}>
                    <TextField 
                        floatingLabelText="Reset interval" 
                        id="reset_interval" 
                        value={model.reset_interval} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                    <FlagSelector 
                        label="Trap type" 
                        id="trap_type" 
                        flags={TRAP_TYPES} 
                        value={model.trap_type} 
                        onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                    <TextField 
                        floatingLabelText="Trap charges" 
                        id="trap_charges" 
                        value={model.trap_charges} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                    <FlagSelector 
                        label="Trap trigger 1" 
                        id="trigger_1" 
                        flags={TRAP_TRIGGERS} 
                        value={model.trigger_1} 
                        onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                    <FlagSelector 
                        label="Trap trigger 2" 
                        id="trigger_2" 
                        flags={TRAP_TRIGGERS} 
                        value={model.trigger_2} 
                        onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                    </Validate>
                    <Button
                        variant="raised"
                        label="Remove Trap Reset" 
                        onClick={()=>(this.props.handleDelete(model.uuid))} 
                        icon={<Icon>remove_circle</Icon>}/>
                </Paper>
            );
        }
        else {
            return (
                <div>
                    <Button variant="raised" label="Add Trap Reset" onClick={()=>(this.props.handleNew(this.props.pointer))} icon={<Icon>add_box</Icon>}/>
                </div>
            );
        }
    }
}
TrapResetEditor = connect(
    (state) => ({
        resets: state.trap_resets
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:TrapResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:TrapResetActions.REMOVE, index })},
        handleNew: (pointer) => {
            dispatch({ type:TrapResetActions.ADD })
            dispatch({ type:TrapResetActions.SET_PROP, key:"pointer", value:pointer })
        }
    })
)(TrapResetEditor)

class ExtraDescriptionsEditor extends React.Component {
    modelClass = ExtraDescription;
    
    generate() {
        return this.props.eds.filter((ed)=>(ed.pointer === this.props.pointer)).map((ed, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(ed.uuid))}>
                    <Icon color={red[900]}>remove_circle</Icon>
                </IconButton>
                <Validate validator={extra_description_validator}>
                <TextField 
                    floatingLabelText="Keywords (space separated)" 
                    id="keywords" 
                    fullWidth={true} 
                    value={ed.keywords} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(ed.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="Long description" 
                    id="ldesc" 
                    multiLine={true} 
                    rows={5} 
                    fullWidth={true} 
                    value={ed.ldesc} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(ed.uuid, e.target.id, v))} />
                </Validate>
            </Paper>
        ));
    }
    render() {
        return (
            <React.Fragment>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                    <Icon>add_box</Icon>
                </IconButton>
            </React.Fragment>
        )
    }
}
ExtraDescriptionsEditor = connect(
    (state) => ({
        eds: state.extra_descriptions
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:ExtraDescriptionActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:ExtraDescriptionActions.REMOVE, index })},
        handleNew: (pointer) => {
            dispatch({ type:ExtraDescriptionActions.ADD })
            dispatch({ type:ExtraDescriptionActions.SET_PROP, key:"pointer", value:pointer })
        }
    })
)(ExtraDescriptionsEditor)

class ProgramsEditor extends React.Component {
    modelClass = Program;
    
    generate() {
        return this.props.programs.filter((p)=>(p.pointer===this.props.pointer)).map((program, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(program.uuid))}>
                    <Icon color={red[900]}>remove_circle</Icon>
                </IconButton>
                <Validate validator={program_validator}>
                <FlagSelector 
                    label="Trigger" 
                    id="trigger" 
                    flags={this.props.triggers} 
                    value={program.trigger} 
                    onChange={(e,v)=>(this.props.setProp(program.uuid,e.target.id,v))} />
                <TextField 
                    floatingLabelText="Variable" 
                    id="argument" 
                    value={program.argument} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(program.uuid,e.target.id,v))} />
                <TextField 
                    floatingLabelText="Program" 
                    id="program" 
                    multiLine={true} 
                    rows={5} 
                    fullWidth={true} 
                    value={program.program} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(program.uuid,e.target.id,v))} />
                </Validate>
            </Paper>
        ));
    }
    render() {
        return (
            <React.Fragment>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                    <Icon>add_box</Icon>
                </IconButton>
            </React.Fragment>
        )
    }
}
ProgramsEditor = connect(
    (state) => ({
        programs: state.programs
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:ProgramActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:ProgramActions.REMOVE, index })},
        handleNew: (pointer) => {
            dispatch({ type:ProgramActions.ADD })
            dispatch({ type:ProgramActions.SET_PROP, key:"pointer", value:pointer })
        }
    })
)(ProgramsEditor)
export {TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor, Validate};