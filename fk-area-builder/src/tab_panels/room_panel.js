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
    ROOM_PROGRAM_TRIGGERS
}
from '../Models/flags';
import {
    Room,
    Exit,
    ExtraDescription,
    Program
}
from '../Models/are_model'
import {
    FlagSelector,
    MultiFlagSelector,
    VnumAutoComplete
}
from '../UIComponents/FlagSelectors'

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
    
    handleClose = () => {
        this.setState({open: false});
    };
    
    updateArea(area) {
        this.props.onChange(area);
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
            <RoomEditor open={this.state.open} handleClose={this.handleClose} updateArea={this.updateArea.bind(this)} current_room={this.state.current_room} area={this.props.area} />
            <Dialog open={this.state.confirm_delete_open} actions={confirmActions} modal={false} title={this.state.confirm_title}>{this.state.confirm_text}</Dialog>
            <Dialog open={this.state.errors_open} actions={errorsActions} modal={false} title={`Errors for room ${this.props.area.rooms[this.state.current_room].vnum}`}>
                <List>
                    {this.props.area.rooms[this.state.current_room].validate().map((error, index) => (
                        <ListItem id={index} primaryText={error} leftIcon={<FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>} />
                    ))}
                </List>
            </Dialog>
        </div>
        )
    }
}

const paper_style = {
    padding: "5px",
    margin: "5px"
}

class RoomEditor extends React.Component {
    handleChanges(event, value, index) {
        let area = this.props.area.clone();
        let room = area.rooms[this.props.current_room];
        try {
            room[event.target.id] = value;
        } catch(e) {
            throw(e);
        }
        this.props.updateArea(area);
    }
    
    render() {
        const actions = [
        <FlatButton label="Done" primary={true} onClick={this.props.handleClose} />,
        ];
        return (
            <Dialog title="Edit Room" modal={false} open={this.props.open} actions={actions} onRequestClose={this.props.handleClose} autoScrollBodyContent={true}>
                <Tabs>
                    <Tab label="Descriptions">
                        <TextField floatingLabelText="vnum" id="vnum" value={this.props.area.rooms[this.props.current_room].vnum} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Short description" id="sdesc" fullWidth={true} value={this.props.area.rooms[this.props.current_room].sdesc} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Long description" id="ldesc" multiLine={true} rows={5} fullWidth={true} value={this.props.area.rooms[this.props.current_room].ldesc} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    </Tab>
                    <Tab label="Details">
                        <MultiFlagSelector id="room_flags" label="Room Flags" flags={ROOM_FLAGS} value={this.props.area.rooms[this.props.current_room].room_flags} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="sector" label="Sector" flags={ROOM_SECTOR_FLAGS} value={this.props.area.rooms[this.props.current_room].sector} onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Teleport Delay" id="teleport_delay" value={this.props.area.rooms[this.props.current_room].teleport_delay} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <VnumAutoComplete floatingLabelText="Teleport Target" id="teleport_target" value={this.props.area.rooms[this.props.current_room].teleport_target} onChange={this.handleChanges.bind(this)} dataSource={this.props.area.rooms} />
                        <TextField floatingLabelText="Room Capacity [Tunnel]" id="tunnel" value={this.props.area.rooms[this.props.current_room].tunnel} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    </Tab>
                    <Tab label="Extra Descs">
                        <ExtraDescriptionsEditor area={this.props.area} current_room={this.props.current_room} updateArea={this.props.updateArea} />
                    </Tab>
                    <Tab label="Exits">
                        <ExitsEditor area={this.props.area} current_room={this.props.current_room} updateArea={this.props.updateArea} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor area={this.props.area} current_room={this.props.current_room} updateArea={this.props.updateArea} />
                    </Tab>
                </Tabs>
            </Dialog>  
        )
    }
}

class ExtraDescriptionsEditor extends React.Component {
    generateExtraDescriptions(ed) {
        return this.props.area.rooms[this.props.current_room].extra_descriptions.map((ed, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <TextField floatingLabelText="Keywords (space separated)" id={"keywords_"+index} fullWidth={true} value={ed.keywords} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Long description" id={"ldesc_"+index} multiLine={true} rows={5} fullWidth={true} value={ed.ldesc} autoComplete="off" onChange={this.handleChange.bind(this)} />
            </Paper>
        ));
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.rooms[this.props.current_room].extra_descriptions[parseInt(event.target.id.split("_")[1])][event.target.id.split("_")[0]] = value;
        this.props.updateArea(area);
    }
    
    handleNew() {
        let area = this.props.area.clone();
        area.rooms[this.props.current_room].extra_descriptions.push(new ExtraDescription())
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <div>
                {this.generateExtraDescriptions(this.props.area.rooms[this.props.current_room].extra_descriptions)}
                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </div>
        )
    }
}

class ExitsEditor extends React.Component {
    generateExits(exits) {
        return this.props.area.rooms[this.props.current_room].exits.map((exit, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <FlagSelector id={"direction "+index} label="Direction" flags={EXIT_DIRECTIONS} value={exit.direction} onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Comment" id={"comment_"+index} fullWidth={true} value={exit.comment} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText={exit.direction == EXIT_DIRECTIONS.DDIR_SOMEWHERE ? "Somewhere exit keywords" : "Door keywords"} id={"somewhere_door_keyword "+index} fullWidth={true} value={exit.somewhere_door_keyword} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <MultiFlagSelector id={"door_flags "+index} label="Door Flags" flags={EXIT_DOOR_FLAGS} value={exit.door_flags} onChange={this.handleChange.bind(this)} />
                <VnumAutoComplete floatingLabelText="Door Key" id={"door_key "+index} value={exit.door_key} onChange={this.handleChange.bind(this)} dataSource={this.props.area.items} />
                <VnumAutoComplete floatingLabelText="Exit Target" id={"target_vnum "+index} value={exit.target_vnum} onChange={this.handleChange.bind(this)} dataSource={this.props.area.rooms} />
                <FlagSelector id={"exit_size "+index} label="Exit Size" flags={EXIT_SIZES} value={exit.exit_size} onChange={this.handleChange.bind(this)} />
            </Paper>
        ));
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.rooms[this.props.current_room].exits[parseInt(event.target.id.split(" ")[1])][event.target.id.split(" ")[0]] = value;
        this.props.updateArea(area);
    }
    
    handleNew() {
        let area = this.props.area.clone();
        area.rooms[this.props.current_room].exits.push(new Exit())
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <div>
                {this.generateExits(this.props.area.rooms[this.props.current_room].exits)}
                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </div>
        )
    }
}

class ProgramsEditor extends React.Component {
    generatePrograms() {
        return this.props.area.rooms[this.props.current_room].programs.map((program, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <FlagSelector id={"trigger "+index} label="Trigger" flags={ROOM_PROGRAM_TRIGGERS} value={program.trigger} onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Variable" id={"argument "+index} value={program.argument} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Program" id={"program "+index} multiLine={true} rows={5} fullWidth={true} value={program.program} autoComplete="off" onChange={this.handleChange.bind(this)} />
            </Paper>
        ));
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.rooms[this.props.current_room].programs[parseInt(event.target.id.split(" ")[1])][event.target.id.split(" ")[0]] = value;
        this.props.updateArea(area);
    }
    
    handleNew() {
        let area = this.props.area.clone();
        area.rooms[this.props.current_room].programs.push(new Program())
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <div>
                {this.generatePrograms()}
                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </div>
        )
    }
}

export default muiThemeable()(RoomPanel);