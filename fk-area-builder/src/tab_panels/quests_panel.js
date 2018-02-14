import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { red900 } from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Subheader from 'material-ui/Subheader';

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
    MOB_PROGRAM_TRIGGERS,
    MOB_SKILLS,
    MOB_CLASSES,
    MOB_RACES,
    MOB_SEXES,
    MOB_POSITIONS,
    MOB_DEITIES,
    MOB_ACT_FLAGS,
    MOB_LANGUAGES,
    MOB_SPELLS,
    MOB_WEAPON_SKILLS,
    MOB_STATISTICS,
    MOB_FEATS,
    MOB_RIS,
    MOB_AFFECTS,
    ITEM_ARMOR_TYPES,
    ITEM_MATERIALS,
    MOB_ALIGNMENTS,
    QUEST_EVENT_CODES
}
from '../Models/flags';
import {
    QuestLog,
}
from '../Models/are_model'
import {
    FlagSelector,
}
from '../UIComponents/FlagSelectors'

const icon_button_style = {
    padding: "5px",
    width: "auto",
    height: "auto",
}

class QuestsPanel extends React.Component {
    shouldComponentUpdate(newProps) {
        // If the array length changed, then update.
        if (this.props.area.quest_log.length != newProps.area.quest_log.length) {
            return true;
        }
        // Otherwise, update if one of the quest_logs in the array has changed.
        for (let i = 0; i < this.props.area.quest_log.length; i++) {
            if (!this.props.area.quest_log[i].equals(newProps.area.quest_log[i])) {
                return true;
            }
        }
        return false;
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.quest_log[index][event.target.id] = value;
        this.props.updateArea(area);
    }
    
    handleDelete = (index) => {
        let area = this.props.area.clone();
        area.quest_log.splice(index, 1);
        this.updateArea(area);
    }
    
    handleNew = () => {
        let new_qlog = new QuestLog();
        let area = this.props.area.clone();
        new_qlog.area = area;
        area.quest_log.push(new_qlog);
        this.updateArea(area);
    };
    
    updateArea(area) {
        this.props.updateArea(area);
    }
    
    generateItems(qlogs) {
        return qlogs.map((qlog, index) => (
            <TableRow key={index}>
                <TableRowColumn width={50}>
                    <IconButton tooltip="Delete" onClick={()=>(this.handleDelete(index))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={red900}>delete_forever</FontIcon>
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn width={50}>
                    {qlog.area.vnum}
                </TableRowColumn>
                <TableRowColumn width={50}>
                    <TextField 
                        id="qbit_start" 
                        errorText={qlog.validate("qbit_start")} 
                        value={qlog.qbit_start} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn width={50}>
                    <TextField 
                        id="qbit_stop" 
                        errorText={qlog.validate("qbit_stop")} 
                        value={qlog.qbit_stop} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn width={50}>
                    <TextField 
                        id="min_qbit" 
                        errorText={qlog.validate("min_qbit")} 
                        value={qlog.min_qbit} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn width={50}>
                    <TextField 
                        id="max_qbit" 
                        errorText={qlog.validate("max_qbit")} 
                        value={qlog.max_qbit} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn width={130}>
                    <FlagSelector 
                        id="event_code" 
                        errorText={qlog.validate("event_code")} 
                        flags={QUEST_EVENT_CODES} 
                        value={qlog.event_code} 
                        onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField 
                        id="qlog_text" 
                        errorText={qlog.validate("qlog_text")} 
                        fullWidth={true} 
                        value={qlog.qlog_text} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
            </TableRow>
            ))
    }

    render() {
        return (
            <div>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn width={50}></TableHeaderColumn>
                        <TableHeaderColumn width={50}>Area Vnum</TableHeaderColumn>
                        <TableHeaderColumn width={50}>Qbit Start</TableHeaderColumn>
                        <TableHeaderColumn width={50}>Qbit Count</TableHeaderColumn>
                        <TableHeaderColumn width={50}>Min Qbit</TableHeaderColumn>
                        <TableHeaderColumn width={50}>Max Qbit</TableHeaderColumn>
                        <TableHeaderColumn width={130}>Event Type</TableHeaderColumn>
                        <TableHeaderColumn>Qlog Text</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.generateItems(this.props.area.quest_log)}
                    <TableRow>
                        <TableRowColumn width={100}>
                            <IconButton tooltip="Add" onClick={this.handleNew}>
                                <FontIcon className="material-icons">add_box</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        )
    }
}

export default muiThemeable()(QuestsPanel);