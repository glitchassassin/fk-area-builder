import React from 'react';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import ListSubheader from 'material-ui/List/ListSubheader';
import { AreaActions, JusticeSystemActions } from '../Models/actionTypes';
import { connect } from 'react-redux';
import { ColorCodeEditor } from '../UIComponents/QuillEditor';

import Table, {
    TableBody,
    TableHead,
    TableCell,
    TableRow,
}
from 'material-ui/Table';
import {
    ITEM_MATERIALS,
    AREA_CATEGORIES,
    JUSTICE_PUNISHMENTS
}
from '../Models/flags';
import {
    AreaValidator, JusticeSystemValidator
}
from '../Models/model_validator'
import {
    FlagSelector,
    VnumAutoComplete,
    ValidatedTextField
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
const justice_system_validator = new JusticeSystemValidator()

class GeneralPanel extends React.Component {
    render() {
        return (
            <Paper style={paper_style}>
                <Validate validator={area_validator}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={4}>
                            <FlagSelector 
                                id="category" 
                                label="Category" 
                                fullWidth={true}
                                flags={AREA_CATEGORIES} 
                                value={this.props.area.category} 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ValidatedTextField 
                                label="Area Name" 
                                id="name"
                                fullWidth={true}
                                value={this.props.area.name} 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <ValidatedTextField 
                                label="Base Vnum" 
                                id="vnum" 
                                fullWidth={true}
                                value={this.props.area.vnum} 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ValidatedTextField 
                                label="Authors" 
                                id="authors" 
                                fullWidth={true} 
                                value={this.props.area.authors} 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ListSubheader>Levels</ListSubheader>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <ValidatedTextField 
                                label="Min recommended level" 
                                id="min_recommended_level" 
                                fullWidth={true} 
                                value={this.props.area.min_recommended_level} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <ValidatedTextField 
                                label="Max recommended level" 
                                id="max_recommended_level" 
                                fullWidth={true} 
                                value={this.props.area.max_recommended_level} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <ValidatedTextField 
                                label="Min enforced level" 
                                id="min_enforced_level" 
                                fullWidth={true} 
                                value={this.props.area.min_enforced_level} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <ValidatedTextField 
                                label="Max enforced level" 
                                id="max_enforced_level" 
                                fullWidth={true} 
                                value={this.props.area.max_enforced_level} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ListSubheader>Area Reset</ListSubheader>
                        </Grid>
                        <Grid item xs={10} sm={10}>
                            <ColorCodeEditor
                                label="Area reset echo" 
                                id="reset_msg" 
                                value={this.props.area.reset_msg} 
                                onChange={this.props.setProp}
                            />
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <ValidatedTextField 
                                label="Area reset duration" 
                                id="reset_duration" 
                                fullWidth={true} 
                                value={this.props.area.reset_duration} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ListSubheader>Economy</ListSubheader>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <ValidatedTextField 
                                label="Economy min" 
                                id="economy_min" 
                                fullWidth={true} 
                                value={this.props.area.economy_min} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <ValidatedTextField 
                                label="Economy max" 
                                id="economy_max" 
                                fullWidth={true} 
                                value={this.props.area.economy_max} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ListSubheader>Weather</ListSubheader>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <ValidatedTextField 
                                label="Humidity" 
                                id="weather_humidity" 
                                fullWidth={true} 
                                value={this.props.area.weather_humidity} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <ValidatedTextField 
                                label="Temperature" 
                                id="weather_temperature" 
                                fullWidth={true} 
                                value={this.props.area.weather_temperature} 
                                autoComplete="off" 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ListSubheader>Environmental Materials</ListSubheader>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <FlagSelector 
                                id="mining_material" 
                                label="Mining material" 
                                fullWidth={true} 
                                flags={ITEM_MATERIALS} 
                                value={this.props.area.mining_material} 
                                onChange={this.props.setProp} />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <FlagSelector 
                                id="logging_material" 
                                label="Logging material" 
                                fullWidth={true} 
                                flags={ITEM_MATERIALS} 
                                value={this.props.area.logging_material} 
                                onChange={this.props.setProp} />
                        </Grid>
                    </Grid>
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
        // eslint-disable-next-line
        if (this.props.justice_system!=undefined) {
            return (
                <Paper id={this.props.id} style={paper_style}>
                    <Validate validator={justice_system_validator}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={12}>
                                <ListSubheader>Justice System</ListSubheader>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <VnumAutoComplete 
                                    label="Courtroom" 
                                    id="courtroom" 
                                    fullWidth={true} 
                                    value={this.props.justice_system.courtroom} 
                                    onChange={this.props.setProp} 
                                    dataSource={this.props.rooms} />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <VnumAutoComplete 
                                    label="Dungeon" 
                                    id="dungeon" 
                                    fullWidth={true} 
                                    value={this.props.justice_system.dungeon} 
                                    onChange={this.props.setProp} 
                                    dataSource={this.props.rooms} />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <VnumAutoComplete 
                                    label="Judge" 
                                    id="judge" 
                                    fullWidth={true} 
                                    value={this.props.justice_system.judge} 
                                    onChange={this.props.setProp} 
                                    dataSource={this.props.mobs} />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <VnumAutoComplete 
                                    label="Guard" 
                                    id="guard" 
                                    fullWidth={true} 
                                    value={this.props.justice_system.guard} 
                                    onChange={this.props.setProp} 
                                    dataSource={this.props.mobs} />
                            </Grid>
                            <Grid item xs={12}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Crime</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Punishment</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>CRIME_HIGH_MURDER</TableCell>
                                            <TableCell>Murdering another PC</TableCell>
                                            <TableCell>
                                                <FlagSelector 
                                                    id="CRIME_HIGH_MURDER"
                                                    flags={JUSTICE_PUNISHMENTS} 
                                                    value={this.props.justice_system.CRIME_HIGH_MURDER} 
                                                    onChange={this.props.setProp} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>CRIME_LOW_MURDER</TableCell>
                                            <TableCell>Killing a mob</TableCell>
                                            <TableCell>
                                                <FlagSelector 
                                                    id="CRIME_LOW_MURDER"
                                                    flags={JUSTICE_PUNISHMENTS} 
                                                    value={this.props.justice_system.CRIME_LOW_MURDER} 
                                                    onChange={this.props.setProp} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>CRIME_ASSAULT</TableCell>
                                            <TableCell>Attacking (but not killing) a PC/mob</TableCell>
                                            <TableCell>
                                                <FlagSelector 
                                                    id="CRIME_ASSAULT"
                                                    flags={JUSTICE_PUNISHMENTS} 
                                                    value={this.props.justice_system.CRIME_ASSAULT} 
                                                    onChange={this.props.setProp} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>CRIME_MUGGING</TableCell>
                                            <TableCell>A failed pickpocket/steal attempt</TableCell>
                                            <TableCell>
                                                <FlagSelector 
                                                    id="CRIME_MUGGING"
                                                    flags={JUSTICE_PUNISHMENTS} 
                                                    value={this.props.justice_system.CRIME_MUGGING} 
                                                    onChange={this.props.setProp} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid container justify={"center"}>
                                <Grid item xs={6}>
                                    <Button variant="raised" onClick={this.props.remove}><Icon>remove_circle</Icon> Remove Justice System</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Validate>
                </Paper>
            );
        }
        else {
            return (
                <Grid container justify={"center"}>
                    <Grid item xs={6}>
                        <Button variant="raised" onClick={this.props.handleNew}><Icon>add_box</Icon> Add Justice System</Button>
                    </Grid>
                </Grid>
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