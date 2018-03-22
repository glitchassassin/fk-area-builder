import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import ListSubheader from 'material-ui/List/ListSubheader';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import Dialog, {DialogContent, DialogActions, DialogTitle} from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { ExtraDescriptionActions, ProgramActions, TrapResetActions } from '../Models/actionTypes';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import {
    TRAP_TYPES,
    TRAP_TRIGGERS
}
from '../Models/flags';
import {
    ExtraDescription,
    Program
}
from '../Models/model_templates'
import {
    FlagSelector,
    ValidatedTextField
}
from '../UIComponents/FlagSelectors'
import {TrapResetValidator, ExtraDescriptionValidator, ProgramValidator} from '../Models/model_validator'

const trap_reset_validator = new TrapResetValidator();
const extra_description_validator = new ExtraDescriptionValidator();
const program_validator = new ProgramValidator();

const paper_style = {
    padding: "5px",
    margin: "5px auto",
    width: "100%"
}

class Validate extends React.Component {
    getChildContext() {
        return {validator: this.props.validator}
    }
    render() {
        return (this.props.children)
    }
}
Validate.childContextTypes = {
  validator: PropTypes.object
};

class TrapResetEditor extends React.Component {
    render() {
        let model = this.props.resets.filter((r)=>(r.pointer===this.props.pointer))[0]
        if (model !== undefined) {
            return (
                <Paper id={this.props.id} style={paper_style} zDepth={1}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ListSubheader>Trap Reset</ListSubheader>
                        </Grid>
                        <Validate validator={trap_reset_validator}>
                        <Grid item xs={4}>
                            <ValidatedTextField 
                                label="Reset interval" 
                                id="reset_interval" 
                                value={model.reset_interval} 
                                autoComplete="off" 
                                onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <FlagSelector 
                                label="Trap type" 
                                id="trap_type" 
                                flags={TRAP_TYPES} 
                                value={model.trap_type} 
                                onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <ValidatedTextField 
                                label="Trap charges" 
                                id="trap_charges" 
                                value={model.trap_charges} 
                                autoComplete="off" 
                                onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <FlagSelector 
                                label="Trap trigger 1" 
                                id="trigger_1" 
                                flags={TRAP_TRIGGERS} 
                                value={model.trigger_1} 
                                onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <FlagSelector 
                                label="Trap trigger 2" 
                                id="trigger_2" 
                                flags={TRAP_TRIGGERS} 
                                value={model.trigger_2} 
                                onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        </Grid>
                        </Validate>
                        <Grid item xs={4}>
                            <Button
                                variant="raised"
                                onClick={()=>(this.props.handleDelete(model.uuid))} >
                                <Icon>remove_circle</Icon>
                                Remove Trap Reset
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            );
        }
        else {
            return (
                <Grid container spacing={8} justify="center">
                    <Grid item style={{textAlign:"center"}} xs={12}>
                        <Button variant="raised" onClick={()=>(this.props.handleNew(this.props.pointer))}><Icon>add_box</Icon> Add Trap Reset</Button>
                    </Grid>
                </Grid>
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
            <Grid item xs={12} key={index}>
            <Paper style={paper_style}>
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(ed.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={extra_description_validator}>
                    <Grid item xs={10}>
                        <ValidatedTextField 
                            label="Keywords (space separated)" 
                            id="keywords" 
                            fullWidth={true} 
                            value={ed.keywords} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(ed.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={12}>
                        <ValidatedTextField 
                            label="Long description" 
                            id="ldesc" 
                            multiline={true} 
                            rows={5} 
                            fullWidth={true} 
                            value={ed.ldesc} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(ed.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
            </Paper>
            </Grid>
        ));
    }
    render() {
        return (
            <Grid container spacing={16}>
                {this.generate()}
                <Grid item xs={1}>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                        <Icon>add_box</Icon>
                    </IconButton>
                </Grid>
            </Grid>
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
            <Grid item xs={12}>
                <Paper style={paper_style} key={index}>
                    <Grid container spacing={8}>
                        <Grid item xs={2}>
                            <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(program.uuid))}>
                                <Icon color="error">remove_circle</Icon>
                            </IconButton>
                        </Grid>
                        <Validate validator={program_validator}>
                        <Grid item xs={5}>
                            <FlagSelector 
                                label="Trigger" 
                                id="trigger" 
                                flags={this.props.triggers} 
                                value={program.trigger} 
                                onChange={(e,v)=>(this.props.setProp(program.uuid,e.target.id,v))} />
                        </Grid>
                        <Grid item xs={5}>
                            <ValidatedTextField 
                                label="Variable" 
                                id="argument" 
                                value={program.argument} 
                                autoComplete="off" 
                                onChange={(e,v)=>(this.props.setProp(program.uuid,e.target.id,v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedTextField 
                                label="Program" 
                                id="program" 
                                multiline={true} 
                                rows={5} 
                                fullWidth={true} 
                                value={program.program} 
                                autoComplete="off" 
                                onChange={(e,v)=>(this.props.setProp(program.uuid,e.target.id,v))} />
                        </Grid>
                        </Validate>
                    </Grid>
                </Paper>
            </Grid>
        ));
    }
    render() {
        return (
            <Grid container spacing={16}>
                {this.generate()}
                <Grid item xs={1}>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                        <Icon>add_box</Icon>
                    </IconButton>
                </Grid>
            </Grid>
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

const editorDialogStyles = theme => ({
    title: {
        padding: 0
    },
    content: {
        paddingTop: "20px"
    }
})
class EditorDialog extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Dialog
                maxWidth={false}
                open={this.props.open} 
                onClose={this.props.onClose} 
                PaperProps={{style:{width:"80%"}}}>
                <DialogTitle className={classes.title}>
                    {/*this.props.title*/}
                    <AppBar position="static">
                        <Tabs value={this.props.selected_tab} onChange={this.props.setTab} fullWidth>
                            {this.props.tabs.map((t)=>(<Tab key={t} label={t} />))}
                        </Tabs>
                    </AppBar>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    {this.props.children}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.props.onClose}>Done</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
EditorDialog = withStyles(editorDialogStyles)(EditorDialog)

export {TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor, Validate, EditorDialog};