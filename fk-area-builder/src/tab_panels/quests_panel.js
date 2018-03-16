import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { red900 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux';
import { QuestLogActions } from '../Models/actionTypes';

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
    QUEST_EVENT_CODES
}
from '../Models/flags';
import {
    QuestLog,
}
from '../Models/area_model'
import {
    FlagSelector,
}
from '../UIComponents/FlagSelectors'
import {
    Validate
}
from '../UIComponents/GenericEditors'
import {
    AreaValidator,
    QuestLogValidator
}
from '../Models/model_validator'

const icon_button_style = {
    padding: "5px",
    width: "auto",
    height: "auto",
}

const quest_log_validator = new QuestLogValidator();

class QuestsPanel extends React.Component {
    generateItems(qlogs) {
        return qlogs.map((qlog, index) => (
            <TableRow key={index}>
                <TableRowColumn width={50}>
                    <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(qlog.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={red900}>delete_forever</FontIcon>
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn width={50}>
                    {this.props.vnum}
                </TableRowColumn>
                <TableRowColumn width={50}>
                    <Validate validator={quest_log_validator}>
                    <TextField 
                        id="qbit_start" 
                        value={qlog.qbit_start} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn width={50}>
                    <Validate validator={quest_log_validator}>
                    <TextField 
                        id="qbit_stop" 
                        value={qlog.qbit_stop} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn width={50}>
                    <Validate validator={quest_log_validator}>
                    <TextField 
                        id="min_qbit" 
                        value={qlog.min_qbit} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn width={50}>
                    <Validate validator={quest_log_validator}>
                    <TextField 
                        id="max_qbit" 
                        value={qlog.max_qbit} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn width={130}>
                    <Validate validator={quest_log_validator}>
                    <FlagSelector 
                        id="event_code" 
                        flags={QUEST_EVENT_CODES} 
                        value={qlog.event_code} 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={quest_log_validator}>
                    <TextField 
                        id="qlog_text" 
                        fullWidth={true} 
                        value={qlog.qlog_text} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                    </Validate>
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
                    {this.generateItems(this.props.model)}
                    <TableRow>
                        <TableRowColumn width={100}>
                            <IconButton tooltip="Add" onClick={this.props.handleNew}>
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
QuestsPanel = connect(
    (state)=>({
        model: state.quest_log,
        vnum: state.area.vnum
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:QuestLogActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:QuestLogActions.REMOVE, index })},
        handleNew: (pointer) => {
            dispatch({ type:QuestLogActions.ADD })
            dispatch({ type:QuestLogActions.SET_PROP, key:"pointer", value:pointer })
        }
    })
)(QuestsPanel)

export default muiThemeable()(QuestsPanel);