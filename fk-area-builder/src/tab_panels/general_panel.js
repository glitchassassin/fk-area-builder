import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import { AreaActions, JusticeSystemActions } from '../Models/actionTypes';
import { connect } from 'react-redux';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
}
from 'material-ui/Table';
import {
    ITEM_MATERIALS,
    AREA_CATEGORIES,
    JUSTICE_PUNISHMENTS
}
from '../Models/flags';
import {
    JusticeSystem
}
from '../Models/area_model'
import {
    AreaValidator
}
from '../Models/model_validator'
import {
    FlagSelector,
    VnumAutoComplete
}
from '../UIComponents/FlagSelectors'
import {
    Validate
}
from '../UIComponents/GenericEditors'

const paper_style = {
    padding: "5px",
    margin: "5px auto",
    maxWidth: "900px"
}

const area_validator = new AreaValidator()

class GeneralPanel extends React.Component {
    render() {
        return (
            <Paper style={paper_style}>
                <FlagSelector id="category" label="Category" flags={AREA_CATEGORIES} value={this.props.area.category} onChange={this.props.setProp} />
                <Validate validator={area_validator}>
                    <TextField 
                        floatingLabelText="Area Name" 
                        id="name"
                        value={this.props.area.name} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <TextField 
                        floatingLabelText="Base Vnum" 
                        id="vnum" 
                        value={this.props.area.vnum} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <TextField 
                        floatingLabelText="Authors" 
                        id="authors" 
                        fullWidth={true} 
                        value={this.props.area.authors} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <Subheader>Levels</Subheader>
                    <div>
                        <Validate validator={area_validator}>
                            <TextField 
                                floatingLabelText="Min recommended level" 
                                id="min_recommended_level" 
                                value={this.props.area.min_recommended_level} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                            <TextField 
                                floatingLabelText="Max recommended level" 
                                id="max_recommended_level" 
                                value={this.props.area.max_recommended_level} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Validate>
                    </div>
                    <div>
                        <Validate validator={area_validator}>
                        <TextField 
                            floatingLabelText="Min enforced level" 
                            id="min_enforced_level" 
                            value={this.props.area.min_enforced_level} 
                            autoComplete="off" 
                            onChange={this.props.setProp} />
                        <TextField 
                            floatingLabelText="Max enforced level" 
                            id="max_enforced_level" 
                            value={this.props.area.max_enforced_level} 
                            autoComplete="off" 
                            onChange={this.props.setProp} />
                        </Validate>
                    </div>
                    <Subheader>Area Reset</Subheader>
                    <TextField 
                        floatingLabelText="Area reset echo" 
                        fullWidth={true} 
                        id="reset_msg" 
                        value={this.props.area.reset_msg} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <TextField 
                        floatingLabelText="Area reset duration" 
                        id="reset_duration" 
                        value={this.props.area.reset_duration} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <Subheader>Economy</Subheader>
                    <TextField 
                        floatingLabelText="Economy min" 
                        id="economy_min" 
                        value={this.props.area.economy_min} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <TextField 
                        floatingLabelText="Economy max" 
                        id="economy_max" 
                        value={this.props.area.economy_max} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <Subheader>Weather</Subheader>
                    <TextField 
                        floatingLabelText="Humidity" 
                        id="weather_humidity" 
                        value={this.props.area.weather_humidity} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <TextField 
                        floatingLabelText="Temperature" 
                        id="weather_temperature" 
                        value={this.props.area.weather_temperature} 
                        autoComplete="off" 
                        onChange={this.props.setProp} />
                    <Subheader>Environmental Materials</Subheader>
                    <FlagSelector 
                        id="mining_material" 
                        label="Mining material" 
                        flags={ITEM_MATERIALS} 
                        value={this.props.area.mining_material} 
                        onChange={this.props.setProp} />
                    <FlagSelector 
                        id="logging_material" 
                        label="Logging material" 
                        flags={ITEM_MATERIALS} 
                        value={this.props.area.logging_material} 
                        onChange={this.props.setProp} />
                </Validate>
                <JusticeSystemEditor />
            </Paper>
        )
    }
}
GeneralPanel = connect(
    (state) => ({area:state.area}),
    (dispatch) => ({
        setProp: (e,v) => (dispatch({ type:AreaActions.SET_PROP, key:e.target.id, value:v }))
    })
)(GeneralPanel)

class JusticeSystemEditor extends React.Component {
    render() {
        console.log(this.props.justice_system)
        if (this.props.justice_system!=undefined) {
            return (
                <Paper id={this.props.id} style={paper_style} zDepth={1}>
                    <Subheader>Justice System</Subheader>
                    <div>
                        <Validate validator={area_validator.justice_system}>
                        <VnumAutoComplete 
                            floatingLabelText="Courtroom" 
                            id="courtroom" 
                            value={this.props.justice_system.courtroom} 
                            onChange={this.props.setProp} 
                            dataSource={this.props.rooms} />
                        <VnumAutoComplete 
                            floatingLabelText="Dungeon" 
                            id="dungeon" 
                            value={this.props.justice_system.dungeon} 
                            onChange={this.props.setProp} 
                            dataSource={this.props.rooms} />
                        </Validate>
                    </div>
                    <div>
                        <Validate validator={area_validator.justice_system}>
                        <VnumAutoComplete 
                            floatingLabelText="Judge" 
                            id="judge" 
                            value={this.props.justice_system.judge} 
                            onChange={this.props.setProp} 
                            dataSource={this.props.mobs} />
                        <VnumAutoComplete 
                            floatingLabelText="Guard" 
                            id="guard" 
                            value={this.props.justice_system.guard} 
                            onChange={this.props.setProp} 
                            dataSource={this.props.mobs} />
                        </Validate>
                    </div>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Crime</TableHeaderColumn>
                                <TableHeaderColumn>Description</TableHeaderColumn>
                                <TableHeaderColumn>Punishment</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>CRIME_HIGH_MURDER</TableRowColumn>
                                <TableRowColumn>Murdering another PC</TableRowColumn>
                                <TableRowColumn>
                                    <Validate validator={area_validator.justice_system}>
                                    <FlagSelector 
                                        id="CRIME_HIGH_MURDER"
                                        flags={JUSTICE_PUNISHMENTS} 
                                        value={this.props.justice_system.CRIME_HIGH_MURDER} 
                                        onChange={this.props.setProp} />
                                    </Validate>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>CRIME_LOW_MURDER</TableRowColumn>
                                <TableRowColumn>Killing a mob</TableRowColumn>
                                <TableRowColumn>
                                    <Validate validator={area_validator.justice_system}>
                                    <FlagSelector 
                                        id="CRIME_LOW_MURDER"
                                        flags={JUSTICE_PUNISHMENTS} 
                                        value={this.props.justice_system.CRIME_LOW_MURDER} 
                                        onChange={this.props.setProp} />
                                    </Validate>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>CRIME_ASSAULT</TableRowColumn>
                                <TableRowColumn>Attacking (but not killing) a PC/mob</TableRowColumn>
                                <TableRowColumn>
                                    <Validate validator={area_validator.justice_system}>
                                    <FlagSelector 
                                        id="CRIME_ASSAULT"
                                        flags={JUSTICE_PUNISHMENTS} 
                                        value={this.props.justice_system.CRIME_ASSAULT} 
                                        onChange={this.props.setProp} />
                                    </Validate>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>CRIME_MUGGING</TableRowColumn>
                                <TableRowColumn>A failed pickpocket/steal attempt</TableRowColumn>
                                <TableRowColumn>
                                    <Validate validator={area_validator.justice_system}>
                                    <FlagSelector 
                                        id="CRIME_MUGGING"
                                        flags={JUSTICE_PUNISHMENTS} 
                                        value={this.props.justice_system.CRIME_MUGGING} 
                                        onChange={this.props.setProp} />
                                    </Validate>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <RaisedButton label="Remove Justice System" onClick={this.props.remove} icon={<FontIcon className="material-icons">remove_circle</FontIcon>}/>
                </Paper>
            );
        }
        else {
            return (
                <div>
                    <RaisedButton label="Add Justice System" onClick={this.props.handleNew} icon={<FontIcon className="material-icons">add_box</FontIcon>}/>
                </div>
            );
        }
    }
}
JusticeSystemEditor = connect(
    (state) => ({justice_system:state.justice_system, rooms:state.rooms, mobs:state.mobs}),
    (dispatch) => ({
        setProp: (e,v) => (dispatch({ type:JusticeSystemActions.SET_PROP, key:e.target.id, value:v })),
        handleNew: (e,v) => (dispatch({ type:JusticeSystemActions.ADD })),
        remove: (e,v) => (dispatch({ type:JusticeSystemActions.REMOVE }))
    })
)(JusticeSystemEditor)

export default GeneralPanel;