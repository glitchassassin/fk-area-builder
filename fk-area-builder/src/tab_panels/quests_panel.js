import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import withTheme from 'material-ui/styles/withTheme';
import { connect } from 'react-redux';
import { QuestLogActions } from '../Models/actionTypes';

import Table, {
    TableBody,
    TableHead,
    TableCell,
    TableRow,
}
from 'material-ui/Table';
import {
    QUEST_EVENT_CODES
}
from '../Models/flags';
import {
    FlagSelector, ValidatedTextField
}
from '../UIComponents/FlagSelectors'
import {
    Validate
}
from '../UIComponents/GenericEditors'
import {
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
        let cellpadding = "10px";
        return qlogs.map((qlog, index) => (
            <TableRow key={index}>
                <TableCell padding="none">
                    <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(qlog.uuid))} style={icon_button_style}>
                        <Icon color="error">delete_forever</Icon>
                    </IconButton>
                </TableCell>
                <TableCell padding="none">
                    {this.props.vnum}
                </TableCell>
                <TableCell padding="none">
                    <ValidatedTextField 
                        id="qbit_start" 
                        style={{paddingLeft:cellpadding,width:"60px"}}
                        value={qlog.qbit_start} 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                </TableCell>
                <TableCell padding="none">
                    <ValidatedTextField 
                        id="qbit_stop" 
                        style={{paddingLeft:cellpadding,width:"60px"}}
                        value={qlog.qbit_stop} 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                </TableCell>
                <TableCell padding="none">
                    <ValidatedTextField 
                        id="min_qbit" 
                        style={{paddingLeft:cellpadding,width:"60px"}}
                        value={qlog.min_qbit} 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                </TableCell>
                <TableCell padding="none">
                    <ValidatedTextField 
                        id="max_qbit" 
                        style={{paddingLeft:cellpadding,width:"60px"}}
                        value={qlog.max_qbit} 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                </TableCell>
                <TableCell padding="none">
                    <FlagSelector 
                        id="event_code" 
                        style={{paddingLeft:cellpadding,width:"60px"}}
                        flags={QUEST_EVENT_CODES} 
                        value={qlog.event_code} 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                </TableCell>
                <TableCell padding="none">
                    <ValidatedTextField 
                        id="qlog_text" 
                        style={{paddingLeft:cellpadding,width:"400px"}}
                        value={qlog.qlog_text} 
                        onChange={(e,v)=>(this.props.setProp(qlog.uuid, e.target.id, v))} />
                </TableCell>
            </TableRow>
        ))
    }

    render() {
        let cellpadding = "10px";
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="none"></TableCell>
                        <TableCell padding="none">Area Vnum</TableCell>
                        <TableCell style={{paddingLeft:cellpadding}} padding="none">Qbit Start</TableCell>
                        <TableCell style={{paddingLeft:cellpadding}} padding="none">Qbit Count</TableCell>
                        <TableCell style={{paddingLeft:cellpadding}} padding="none">Min Qbit</TableCell>
                        <TableCell style={{paddingLeft:cellpadding}} padding="none">Max Qbit</TableCell>
                        <TableCell style={{paddingLeft:cellpadding}} padding="none">Event Type</TableCell>
                        <TableCell style={{paddingLeft:cellpadding}} padding="none">Qlog Text</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Validate validator={quest_log_validator}>
                    {this.generateItems(this.props.model)}
                    </Validate>
                    <TableRow>
                        <TableCell padding="none">
                            <IconButton tooltip="Add" onClick={this.props.handleNew}>
                                <Icon>add_box</Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell padding="none"></TableCell>
                        <TableCell padding="none"></TableCell>
                        <TableCell padding="none"></TableCell>
                        <TableCell padding="none"></TableCell>
                        <TableCell padding="none"></TableCell>
                        <TableCell padding="none"></TableCell>
                        <TableCell padding="none"></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
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

export default withTheme()(QuestsPanel);