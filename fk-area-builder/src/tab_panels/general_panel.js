import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import { red900 } from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
    DOOR_RESET_DIRECTIONS,
    DOOR_RESET_FLAGS,
    ITEM_MATERIALS,
    AREA_CATEGORIES,
    JUSTICE_PUNISHMENTS
}
from '../Models/flags';
import {
    JusticeSystem
}
from '../Models/are_model'
import {
    FlagSelector,
    MultiFlagSelector,
    VnumAutoComplete
}
from '../UIComponents/FlagSelectors'

const paper_style = {
    padding: "5px",
    margin: "5px auto",
    maxWidth: "900px"
}

class GeneralPanel extends React.Component {
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area[event.target.id] = value;
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <Paper style={paper_style}>
                <FlagSelector id="category" label="Category" flags={AREA_CATEGORIES} value={this.props.area.category} onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Area Name" id="name" value={this.props.area.name} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Base Vnum" id="vnum" value={this.props.area.vnum} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Authors" id="authors" fullWidth={true} value={this.props.area.authors} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <Subheader>Levels</Subheader>
                <div>
                    <TextField floatingLabelText="Min recommended level" id="min_recommended_level" value={this.props.area.min_recommended_level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                    <TextField floatingLabelText="Max recommended level" id="max_recommended_level" value={this.props.area.max_recommended_level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </div>
                <div>
                    <TextField floatingLabelText="Min enforced level" id="min_enforced_level" value={this.props.area.min_enforced_level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                    <TextField floatingLabelText="Max enforced level" id="max_enforced_level" value={this.props.area.max_enforced_level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </div>
                <Subheader>Area Reset</Subheader>
                <TextField floatingLabelText="Area reset echo" fullWidth={true} id="reset_msg" value={this.props.area.reset_msg} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Area reset duration" id="reset_duration" value={this.props.area.reset_duration} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <Subheader>Economy</Subheader>
                <TextField floatingLabelText="Economy min" id="economy_min" value={this.props.area.economy_min} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Economy max" id="economy_max" value={this.props.area.economy_max} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <Subheader>Weather</Subheader>
                <TextField floatingLabelText="Humidity" id="weather_humidity" value={this.props.area.weather_humidity} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Temperature" id="weather_temperature" value={this.props.area.weather_temperature} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <Subheader>Environmental Materials</Subheader>
                <FlagSelector id="mining_material" label="Mining material" flags={ITEM_MATERIALS} value={this.props.area.mining_material} onChange={this.handleChange.bind(this)} />
                <FlagSelector id="logging_material" label="Logging material" flags={ITEM_MATERIALS} value={this.props.area.logging_material} onChange={this.handleChange.bind(this)} />
                <JusticeSystemEditor area={this.props.area} updateArea={this.props.updateArea.bind(this)} />
            </Paper>
        )
    }
}

class JusticeSystemEditor extends React.Component {
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        if (event.target.id.indexOf(" ") != -1) {
            area.justice_system[event.target.id.split(" ")[0]][event.target.id.split(" ")[1]] = value;
        }
        else {
            area.justice_system[event.target.id] = value;
        }
        this.props.updateArea(area);
    }
    
    handleNew() {
        let area = this.props.area.clone();
        area.justice_system = new JusticeSystem();
        this.props.updateArea(area);
    }
    
    remove() {
        let area = this.props.area.clone();
        area.justice_system = undefined;
        this.props.updateArea(area);
    }
    
    render() {
        if (this.props.area.justice_system!=undefined) {
            return (
                <Paper id={this.props.id} style={paper_style} zDepth={1}>
                    <Subheader>Justice System</Subheader>
                    <div>
                        <VnumAutoComplete floatingLabelText="Courtroom" id="courtroom" value={this.props.area.justice_system.courtroom} onChange={this.handleChange.bind(this)} dataSource={this.props.area.rooms} />
                        <VnumAutoComplete floatingLabelText="Dungeon" id="dungeon" value={this.props.area.justice_system.dungeon} onChange={this.handleChange.bind(this)} dataSource={this.props.area.rooms} />
                    </div>
                    <div>
                        <VnumAutoComplete floatingLabelText="Judge" id="judge" value={this.props.area.justice_system.judge} onChange={this.handleChange.bind(this)} dataSource={this.props.area.mobs} />
                        <VnumAutoComplete floatingLabelText="Guard" id="guard" value={this.props.area.justice_system.guard} onChange={this.handleChange.bind(this)} dataSource={this.props.area.mobs} />
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
                                <TableRowColumn>{this.props.area.justice_system.CRIME_HIGH_MURDER.sdesc}</TableRowColumn>
                                <TableRowColumn>{this.props.area.justice_system.CRIME_HIGH_MURDER.ldesc}</TableRowColumn>
                                <TableRowColumn><FlagSelector id="CRIME_HIGH_MURDER punishment" flags={JUSTICE_PUNISHMENTS} value={this.props.area.justice_system.CRIME_HIGH_MURDER.punishment} onChange={this.handleChange.bind(this)} /></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{this.props.area.justice_system.CRIME_LOW_MURDER.sdesc}</TableRowColumn>
                                <TableRowColumn>{this.props.area.justice_system.CRIME_LOW_MURDER.ldesc}</TableRowColumn>
                                <TableRowColumn><FlagSelector id="CRIME_LOW_MURDER punishment" flags={JUSTICE_PUNISHMENTS} value={this.props.area.justice_system.CRIME_LOW_MURDER.punishment} onChange={this.handleChange.bind(this)} /></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{this.props.area.justice_system.CRIME_ASSAULT.sdesc}</TableRowColumn>
                                <TableRowColumn>{this.props.area.justice_system.CRIME_ASSAULT.ldesc}</TableRowColumn>
                                <TableRowColumn><FlagSelector id="CRIME_ASSAULT punishment" flags={JUSTICE_PUNISHMENTS} value={this.props.area.justice_system.CRIME_ASSAULT.punishment} onChange={this.handleChange.bind(this)} /></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{this.props.area.justice_system.CRIME_MUGGING.sdesc}</TableRowColumn>
                                <TableRowColumn>{this.props.area.justice_system.CRIME_MUGGING.ldesc}</TableRowColumn>
                                <TableRowColumn><FlagSelector id="CRIME_MUGGING punishment" flags={JUSTICE_PUNISHMENTS} value={this.props.area.justice_system.CRIME_MUGGING.punishment} onChange={this.handleChange.bind(this)} /></TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <RaisedButton label="Remove Justice System" onClick={this.remove.bind(this)} icon={<FontIcon className="material-icons">remove_circle</FontIcon>}/>
                </Paper>
            );
        }
        else {
            return (
                <div>
                    <RaisedButton label="Add Justice System" onClick={this.handleNew.bind(this)} icon={<FontIcon className="material-icons">add_box</FontIcon>}/>
                </div>
            );
        }
    }
}

export default GeneralPanel;