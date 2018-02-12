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
    EXIT_DIRECTIONS,
    EXIT_DOOR_FLAGS,
    EXIT_SIZES,
    ROOM_FLAGS,
    ROOM_SECTOR_FLAGS,
    TRAP_TYPES,
    TRAP_TRIGGERS,
    ROOM_PROGRAM_TRIGGERS,
    DOOR_RESET_DIRECTIONS,
    DOOR_RESET_FLAGS
}
from '../Models/flags';
import {
    DoorReset,
    TrapReset
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

class ResetsPanel extends React.Component {
    render() {
        return (
            <Paper style={paper_style}>
                <Tabs>
                    <Tab label="Room Resets">
                        <DoorResetsEditor area={this.props.area} updateArea={this.props.updateArea.bind(this)} />
                    </Tab>
                    <Tab label="Door Resets">
                        <DoorResetsEditor area={this.props.area} updateArea={this.props.updateArea.bind(this)} />
                    </Tab>
                    <Tab label="Mob Resets">
                        <DoorResetsEditor area={this.props.area} updateArea={this.props.updateArea.bind(this)} />
                    </Tab>
                    <Tab label="Item Resets">
                        <DoorResetsEditor area={this.props.area} updateArea={this.props.updateArea.bind(this)} />
                    </Tab>
                </Tabs>
            </Paper>
        )
    }
}

class DoorResetsEditor extends React.Component {
    generateDoorResets() {
        return this.props.area.door_resets.map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <VnumAutoComplete floatingLabelText="Room" id={"room "+index} value={reset.room} onChange={this.handleChange.bind(this)} dataSource={this.props.area.rooms} />
                <FlagSelector id={"exit "+index} label="Exit" flags={DOOR_RESET_DIRECTIONS} value={reset.exit} onChange={this.handleChange.bind(this)} />
                <FlagSelector id={"exit_state "+index} label="Exit State" flags={DOOR_RESET_FLAGS} value={reset.exit_state} onChange={this.handleChange.bind(this)} />
                <TrapResetEditor id={"trap_reset "+index} item={reset} onChange={this.handleChange.bind(this)} />
            </Paper>
        ));
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        if (event.target.id.split(" ")[0] == "room") {
            
        }
        area.rooms.door_resets[parseInt(event.target.id.split(" ")[1])][event.target.id.split(" ")[0]] = value;
        this.props.updateArea(area);
    }
    
    handleNew() {
        let new_dr = new DoorReset();
        new_dr.room = this.props.room;
        let area = this.props.area.clone();
        area.rooms.door_resets.push([new_dr]);
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <div>
                {this.generateDoorResets()}
                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </div>
        )
    }
}

class RoomResetsEditor extends React.Component {
    generateRoomResets() {
        return this.props.area.room_resets.map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <FlagSelector id={"exit "+index} label="Exit" flags={DOOR_RESET_DIRECTIONS} value={reset.exit} onChange={this.handleChange.bind(this)} />
                <FlagSelector id={"exit_state "+index} label="Exit State" flags={DOOR_RESET_FLAGS} value={reset.exit_state} onChange={this.handleChange.bind(this)} />
                <TrapResetEditor id={"trap_reset "+index} item={reset} onChange={this.handleChange.bind(this)} />
            </Paper>
        ));
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.rooms.door_resets[parseInt(event.target.id.split(" ")[1])][event.target.id.split(" ")[0]] = value;
        this.props.updateArea(area);
    }
    
    handleNew() {
        let new_dr = new DoorReset();
        new_dr.room = this.props.room;
        let area = this.props.area.clone();
        area.rooms.door_resets.push([new_dr]);
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <div>
                {this.generateDoorResets()}
                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </div>
        )
    }
}

class TrapResetEditor extends React.Component {
    handleChange(event, value, index) {
        console.log("Trap Reset Changed", event.target.id, value);
        let trap_reset = this.props.item.trap_reset.clone()
        trap_reset[event.target.id] = value;
        this.props.onChange({target:{id:this.props.id}}, trap_reset);
    }
    
    handleNew() {
        this.props.onChange({target:{id:this.props.id}}, new TrapReset());
    }
    
    remove() {
        this.props.onChange({target:{id:this.props.id}}, null);
    }
    
    render() {
        if (this.props.item.trap_reset) {
            return (
                <Paper id={this.props.id} style={paper_style} zDepth={1}>
                    <Subheader>Trap Reset</Subheader>
                    <TextField floatingLabelText="Reset interval" id="reset_interval" value={this.props.item.trap_reset.reset_interval} autoComplete="off" onChange={this.handleChange.bind(this)} />
                    <FlagSelector label="Trap type" id="trap_type" flags={TRAP_TYPES} value={this.props.item.trap_reset.trap_type} onChange={this.handleChange.bind(this)} />
                    <TextField floatingLabelText="Trap charges" id="trap_charges" value={this.props.item.trap_reset.trap_charges} autoComplete="off" onChange={this.handleChange.bind(this)} />
                    <FlagSelector label="Trap trigger 1" id="trigger_1" flags={TRAP_TRIGGERS} value={this.props.item.trap_reset.trigger_1} onChange={this.handleChange.bind(this)} />
                    <FlagSelector label="Trap trigger 2" id="trigger_2" flags={TRAP_TRIGGERS} value={this.props.item.trap_reset.trigger_2} onChange={this.handleChange.bind(this)} />
                    <RaisedButton label="Remove Trap Reset" onClick={this.remove.bind(this)} icon={<FontIcon className="material-icons">remove_circle</FontIcon>}/>
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

export default ResetsPanel;