import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
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
    DOOR_RESET_FLAGS,
    RESET_BIT_CODES
}
from '../Models/flags';
import {
    Room,
    Exit,
    ExtraDescription,
    Program,
    DoorReset,
    RoomReset
}
from '../Models/are_model'
import {
    FlagSelector,
    MultiFlagSelector,
    VnumAutoComplete
}
from '../UIComponents/FlagSelectors'
import {TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor} from '../UIComponents/GenericEditors'
import {ModelComponent, ModelArrayComponent} from '../UIComponents/ModelComponents'

const icon_button_style = {
    padding: "5px",
    width: "auto",
    height: "auto",
}

class RoomPanel extends React.Component {
    state = {
        open: false,
        current_room: 0,
        confirm_delete_open: false,
        confirm_text: "",
        confirm_title: "",
        errors_open: false
    }
    
    handleEdit = (index) => {
        this.setState({current_room: index});
        this.setState({open: true});
    };
    
    handleDelete = (index) => {
        this.setState({
            current_room: index,
            confirm_text: `Are you sure you want to delete room ${this.props.area.rooms[index].vnum} (${this.props.area.rooms[index].sdesc})? You cannot undo this action!`,
            confirm_title: `Delete ${this.props.area.rooms[index].sdesc}?`,
            confirm_delete_open: true
        });
    };
    
    confirmDelete = () => {
        let area = this.props.area.clone();
        area.rooms.splice(this.state.current_room, 1);
        this.setState({current_room: 0});
        this.updateArea(area);
        this.setState({confirm_delete_open: false});
    }
    
    cancelDelete = () => {
        this.setState({confirm_delete_open: false});
    }
    
    handleNew = () => {
        let new_room = new Room();
        let area = this.props.area.clone();
        area.rooms.push(new_room);
        this.updateArea(area);
        this.setState({open: true, current_room: area.rooms.length-1});
    };
    handleChange(event, value) {
        console.log("RoomPanel", this.state.current_room, value);
        let area = this.props.area.clone()
        area.rooms[parseInt(this.state.current_room)] = value;
        this.updateArea(area);
    }
    
    handleClose = () => {
        this.setState({open: false});
    };
    
    updateArea(area) {
        this.props.updateArea(area);
    }
    
    showErrors = (index) => {
        this.setState({
            current_room: index,
            errors_open: true
        });
    }
    
    closeErrors = (index) => {
        this.setState({
            current_room: 0,
            errors_open: false
        });
    }
    
    generateItems(rooms) {
        return rooms.map((room, index) => (
            <TableRow key={index}>
                <TableRowColumn width={100}>
                    <IconButton tooltip="Edit" onClick={() => (this.handleEdit(index))} style={icon_button_style}>
                        <FontIcon className="material-icons">mode_edit</FontIcon>
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={()=>(this.handleDelete(index))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={red900}>delete_forever</FontIcon>
                    </IconButton>
                    {room.validate().length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={()=>(this.showErrors(index))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>
                    </IconButton>
                    )}
                </TableRowColumn>
                <TableRowColumn width={100}>{room.vnum}</TableRowColumn>
                <TableRowColumn>{room.sdesc}</TableRowColumn>
                <TableRowColumn>{room.sector ? room.sector.code : ""}</TableRowColumn>
                <TableRowColumn>{room.room_flags ? room.room_flags.map((flag)=>(flag.code)).join("|") : ""}</TableRowColumn>
            </TableRow>
            ))
    }

    render() {
        const confirmActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.cancelDelete}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.confirmDelete}
            />,
            ]
        const errorsActions = [
            <FlatButton
                label="Done"
                primary={true}
                keyboardFocused={true}
                onClick={this.closeErrors}
            />
            ]
        return (
            <div>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn width={100}>Edit</TableHeaderColumn>
                        <TableHeaderColumn width={100}>vnum</TableHeaderColumn>
                        <TableHeaderColumn>Short description</TableHeaderColumn>
                        <TableHeaderColumn>Sector</TableHeaderColumn>
                        <TableHeaderColumn>Room Flags</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.generateItems(this.props.area.rooms)}
                    <TableRow>
                        <TableRowColumn width={100}>
                            <IconButton tooltip="Add" onClick={this.handleNew}>
                                <FontIcon className="material-icons">add_box</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
            { this.props.area.rooms[this.state.current_room] !== undefined && // Don't bother creating these while we have no rooms.
            <React.Fragment>
                <RoomEditor open={this.state.open} handleClose={this.handleClose} onChange={this.handleChange.bind(this)} model={this.props.area.rooms[this.state.current_room]} items={this.props.area.items} rooms={this.props.area.rooms} />
                <Dialog open={this.state.confirm_delete_open} actions={confirmActions} modal={false} title={this.state.confirm_title}>{this.state.confirm_text}</Dialog>
                <Dialog open={this.state.errors_open} actions={errorsActions} modal={false} title={`Room Errors for room ${this.props.area.rooms[this.state.current_room].vnum}`}>
                    <List>
                        {this.props.area.rooms[this.state.current_room].validate().map((error, index) => (
                            <ListItem key={index} primaryText={error} leftIcon={<FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>} />
                        ))}
                    </List>
                </Dialog>
            </React.Fragment>
            }
        </div>
        )
    }
}

const paper_style = {
    padding: "5px",
    margin: "5px"
}

class RoomEditor extends ModelComponent {
    modelClass = Room;
    render() {
        const actions = [
        <FlatButton label="Done" primary={true} onClick={this.props.handleClose} />,
        ];
        return (
            <Dialog title="Edit Room" modal={false} open={this.props.open} actions={actions} onRequestClose={this.props.handleClose} autoScrollBodyContent={true}>
                <Tabs>
                    <Tab label="Descriptions">
                        <TextField 
                            floatingLabelText="vnum" 
                            id="vnum" 
                            errorText={this.props.model.validate("vnum")} 
                            value={this.props.model.vnum} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                        <TextField 
                            floatingLabelText="Short description" 
                            id="sdesc" 
                            errorText={this.props.model.validate("sdesc")} 
                            fullWidth={true} 
                            value={this.props.model.sdesc} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                        <TextField 
                            floatingLabelText="Long description" 
                            id="ldesc" 
                            errorText={this.props.model.validate("ldesc")} 
                            multiLine={true} 
                            rows={5} 
                            fullWidth={true} 
                            value={this.props.model.ldesc} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Details">
                        <MultiFlagSelector 
                            id="room_flags" 
                            errorText={this.props.model.validate("room_flags")} 
                            label="Room Flags" 
                            flags={ROOM_FLAGS} 
                            value={this.props.model.room_flags} 
                            onChange={this.handleChange.bind(this)} />
                        <FlagSelector 
                            id="sector" 
                            errorText={this.props.model.validate("sector")} 
                            label="Sector" 
                            flags={ROOM_SECTOR_FLAGS} 
                            value={this.props.model.sector} 
                            onChange={this.handleChange.bind(this)} />
                        <TextField 
                            floatingLabelText="Teleport Delay" 
                            id="teleport_delay" 
                            errorText={this.props.model.validate("teleport_delay")} 
                            value={this.props.model.teleport_delay} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                        <VnumAutoComplete 
                            floatingLabelText="Teleport Target" 
                            id="teleport_target" 
                            errorText={this.props.model.validate("teleport_target")} 
                            value={this.props.model.teleport_target} 
                            onChange={this.handleChange.bind(this)} 
                            dataSource={this.props.rooms} />
                        <TextField 
                            floatingLabelText="Room Capacity [Tunnel]" 
                            id="tunnel" 
                            errorText={this.props.model.validate("tunnel")} 
                            value={this.props.model.tunnel} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Extra Descs">
                        <ExtraDescriptionsEditor 
                            id="extra_descriptions" 
                            model={this.props.model.extra_descriptions} 
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Exits">
                        <ExitsEditor 
                            id="exits" 
                            model={this.props.model.exits} 
                            rooms={this.props.rooms} 
                            items={this.props.items} 
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor 
                            id="programs" 
                            model={this.props.model.programs} 
                            triggers={ROOM_PROGRAM_TRIGGERS}
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Resets">
                        <Subheader>Room Resets</Subheader>
                        <RoomResetsEditor 
                            id="room_resets" 
                            model={this.props.model.room_resets} 
                            room={this.props.model} 
                            onChange={this.handleChange.bind(this)} />
                        <Subheader>Door Resets</Subheader>
                        <DoorResetsEditor 
                            id="door_resets" 
                            model={this.props.model.door_resets} 
                            room={this.props.model} 
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                </Tabs>
            </Dialog>  
        )
    }
}

class ExitsEditor extends ModelArrayComponent {
    modelClass = Exit;
    generate() {
        return this.props.model.map((exit, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.handleDelete(index))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <FlagSelector 
                    id="direction" 
                    errorText={exit.validate("direction")} 
                    label="Direction" 
                    flags={EXIT_DIRECTIONS} 
                    value={exit.direction} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TextField 
                    floatingLabelText="Comment" 
                    id="comment"
                    errorText={exit.validate("comment")} 
                    fullWidth={true} 
                    value={exit.comment} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TextField 
                    floatingLabelText={exit.direction == EXIT_DIRECTIONS.DDIR_SOMEWHERE ? "Somewhere exit keywords" : "Door keywords"} 
                    id="somewhere_door_keyword" 
                    errorText={exit.validate("somewhere_door_keyword")} 
                    fullWidth={true} 
                    value={exit.somewhere_door_keyword} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <MultiFlagSelector 
                    id="door_flags" 
                    errorText={exit.validate("door_flags")} 
                    label="Door Flags" 
                    flags={EXIT_DOOR_FLAGS} 
                    value={exit.door_flags} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <VnumAutoComplete 
                    floatingLabelText="Door Key" 
                    id="door_key" 
                    errorText={exit.validate("door_key")} 
                    value={exit.door_key} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} 
                    dataSource={this.props.items} />
                <VnumAutoComplete 
                    floatingLabelText="Exit Target" 
                    id="target_vnum" 
                    errorText={exit.validate("target_vnum")} 
                    value={exit.target_vnum} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} 
                    dataSource={this.props.rooms} />
                <FlagSelector 
                    id="exit_size" 
                    errorText={exit.validate("exit_size")} 
                    label="Exit Size" 
                    flags={EXIT_SIZES} 
                    value={exit.exit_size} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
            </Paper>
        ));
    }
}

class DoorResetsEditor extends ModelArrayComponent {
    modelClass = DoorReset;
    generate() {
        return this.props.model.map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                {/*<VnumAutoComplete floatingLabelText="Room" id="room" value={reset.room} onChange={(e,v)=>(this.handleChange(e,v,index))} dataSource={this.props.rooms} />*/}
                <FlagSelector 
                    id="exit" 
                    errorText={reset.validate("exit")} 
                    label="Exit" 
                    flags={DOOR_RESET_DIRECTIONS} 
                    value={reset.exit} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <FlagSelector 
                    id="exit_state" 
                    errorText={reset.validate("exit_state")} 
                    label="Exit State" 
                    flags={DOOR_RESET_FLAGS} 
                    value={reset.exit_state} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TrapResetEditor 
                    id="trap_reset" 
                    model={reset.trap_reset} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
            </Paper>
        ));
    }
    
    handleNew() {
        let new_dr = new DoorReset();
        let door_resets = this.props.model.map((item)=>(item.clone())); // Create working copy of state object
        new_dr.room = this.props.room;
        door_resets.push(new_dr);
        this.props.onChange({target:this.props}, door_resets);
    }
}

class RoomResetsEditor extends ModelArrayComponent {
    modelClass = RoomReset;
    generate() {
        return this.props.model.map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.handleDelete(index))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <FlagSelector 
                    id="bit_type" 
                    errorText={reset.validate("bit_type")} 
                    label="Reset Bit" 
                    flags={RESET_BIT_CODES} 
                    value={reset.bit_type} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <FlagSelector 
                    id="flag" 
                    errorText={reset.validate("flag")} 
                    label="Room Flag" 
                    flags={ROOM_FLAGS} 
                    value={reset.flag} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
            </Paper>
        ));
    }
    
    handleNew() {
        let new_dr = new RoomReset();
        let room_resets = this.props.model.map((item)=>(item.clone())); // Create working copy of state object
        new_dr.room = this.props.room;
        room_resets.push(new_dr);
        this.props.onChange({target:this.props}, room_resets);
    }
}

export default muiThemeable()(RoomPanel);