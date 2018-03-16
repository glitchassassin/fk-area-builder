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
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import {equal_recursively} from '../Models/model'
import { connect } from 'react-redux';
import { 
    ItemActions, UiStateActions, ItemResetActions, ItemApplyActions
} from '../Models/actionTypes';

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
    ITEM_TYPES,
    ITEM_APPLIES,
    ITEM_PROGRAM_TRIGGERS,
    ITEM_MATERIALS,
    ITEM_ATTRIBUTES,
    WEAR_LOCATIONS,
    ITEM_QUALITY,
    ITEM_CONDITION,
    ITEM_SIZES,
    META_VALUE_TYPES,
    META_VNUM_TYPES
}
from '../Models/flags';
import {
    Item,
    ItemApply,
    ItemReset
}
from '../Models/area_model'
import {
    FlagSelector,
    MultiFlagSelector,
    VnumAutoComplete
}
from '../UIComponents/FlagSelectors'
import {
    Validate
}
from '../UIComponents/GenericEditors'
import {
    ItemValidator,
    ItemApplyValidator,
    ItemResetValidator
}
from '../Models/model_validator'
import {TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor} from '../UIComponents/GenericEditors'

const uuid = require('uuid/v4');

const item_validator = new ItemValidator()
const item_apply_validator = new ItemApplyValidator()
const item_reset_validator = new ItemResetValidator()
const icon_button_style = {
    padding: "5px",
    width: "auto",
    height: "auto",
}

class ItemPanel extends React.Component {
    get_mob_by_uuid = (uuid) => {
        let matches = this.props.items.filter((item)=>(item.uuid===uuid))
        if (matches.length) {
            return matches[0]
        }
    }
    generateItems(items) {
        return items.map((item, index) => (
            <TableRow key={index}>
                <TableRowColumn width={100}>
                    <IconButton tooltip="Edit" onClick={() => (this.props.openEditor(item.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons">mode_edit</FontIcon>
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={()=>(this.props.openConfirmDelete(item.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={red900}>delete_forever</FontIcon>
                    </IconButton>
                    {item_validator.validate_state(this.props.state, item).length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={()=>(this.props.openErrors(item.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>
                    </IconButton>
                    )}
                </TableRowColumn>
                <TableRowColumn width={100}>
                    {item.vnum}
                </TableRowColumn>
                <TableRowColumn>
                    {item.sdesc}
                </TableRowColumn>
                <TableRowColumn>{item.item_type ? item.item_type.code : ""}</TableRowColumn>
                <TableRowColumn>{item.material ? item.material.code : ""}</TableRowColumn>
                <TableRowColumn>{item.size ? item.size.code : ""}</TableRowColumn>
            </TableRow>
            ))
    }

    render() {
        const confirmActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.cancelDelete}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                id={this.props.ui_state.item_current_item} // So confirmDelete can pull the correct uuid
                onClick={this.props.confirmDelete}
            />,
            ]
        const errorsActions = [
            <FlatButton
                label="Done"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.closeErrors}
            />
            ]
        let item = this.get_mob_by_uuid(this.props.ui_state.item_current_item);
        return (
            <div>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn width={100}>Edit</TableHeaderColumn>
                        <TableHeaderColumn width={100}>vnum</TableHeaderColumn>
                        <TableHeaderColumn>Short description</TableHeaderColumn>
                        <TableHeaderColumn>Item type</TableHeaderColumn>
                        <TableHeaderColumn>Material</TableHeaderColumn>
                        <TableHeaderColumn>Size</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.generateItems(this.props.items)}
                    <TableRow>
                        <TableRowColumn width={100}>
                            <IconButton tooltip="Add" onClick={this.props.newItem}>
                                <FontIcon className="material-icons">add_box</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
            {item !== undefined && 
            <React.Fragment>
                <ItemEditor open={this.props.ui_state.item_editor_open} id="items" />
                <Dialog open={this.props.ui_state.item_confirm_delete_open} actions={confirmActions} modal={false} title={`Delete ${item.sdesc}?`}>{`Are you sure you want to delete item ${item.vnum} (${item.sdesc})? You cannot undo this action!`}</Dialog>
                <Dialog open={this.props.ui_state.item_errors_open} actions={errorsActions} modal={false} title={`Errors for item ${item.vnum}`}>
                    <List>
                        {item_validator.validate_state(this.props.state, item).map((error, index) => (
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
ItemPanel = connect(
    (state) => ({state: state, items: state.items, ui_state: state.ui_state}),
    (dispatch) => ({
        newItem: () => {
            let item_id = uuid();
            dispatch({ type:ItemActions.ADD, value:item_id });
        },
        openEditor: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ITEM, value:uuid });
            dispatch({ type:UiStateActions.OPEN_ITEM_EDITOR });
        },
        closeEditor: () => {dispatch({ type:UiStateActions.CLOSE_ITEM_EDITOR })},
        openErrors: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ITEM, value:uuid });
            dispatch({ type:UiStateActions.OPEN_ITEM_ERRORS });
        },
        closeErrors: () => {dispatch({ type:UiStateActions.CLOSE_ITEM_ERRORS })},
        openConfirmDelete: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ITEM, value:uuid });
            dispatch({ type:UiStateActions.OPEN_ITEM_CONFIRM_DELETE });
        },
        confirmDelete: (e, v) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ITEM, value:null });
            dispatch({ type:ItemActions.REMOVE, index:e.target.id });
            dispatch({ type:UiStateActions.CLOSE_ITEM_CONFIRM_DELETE });
        },
        cancelDelete: () => {dispatch({ type:UiStateActions.CLOSE_ITEM_CONFIRM_DELETE })},
    })
)(ItemPanel)

const paper_style = {
    padding: "5px",
    margin: "5px"
}

const item_type_ldesc_style = {
    color: "rgba(180,180,180,1)",
    //lineHeight: "15px",
    //fontStyle: "italic",
    marginLeft: "10px",
    whiteSpace: "normal"
}

class ItemEditor extends React.Component {
    generateItemValue(item_type, value_index) {
        let field;
        if (this.props.model.item_type["value"+value_index].type == META_VALUE_TYPES.FLAG) {
            field = (
                <FlagSelector 
                    id={"value"+value_index}
                    label={"Value " + value_index}
                    flags={this.props.model.item_type["value"+value_index].type_enum} 
                    value={this.props.model["value"+value_index]} 
                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
            )
        }
        else if (this.props.model.item_type["value"+value_index].type == META_VALUE_TYPES.MULTI_FLAGS) {
            field = (
                <MultiFlagSelector 
                    id={"value"+value_index}
                    label={"Value " + value_index}
                    flags={this.props.model.item_type["value"+value_index].type_enum} 
                    value={this.props.model["value"+value_index]} 
                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
            )
        }
        else if (this.props.model.item_type["value"+value_index].type == META_VALUE_TYPES.VNUM && this.props.model.item_type["value"+value_index].type_enum !== null) {
            let data_source;
            if (this.props.model.item_type["value"+value_index].type_enum == META_VNUM_TYPES.OBJECT) {
                data_source = this.props.items;
            }
            else if (this.props.model.item_type["value"+value_index].type_enum == META_VNUM_TYPES.ROOM) {
                data_source = this.props.rooms;
            }
            else if (this.props.model.item_type["value"+value_index].type_enum == META_VNUM_TYPES.MOB) {
                data_source = this.props.mobs;
            }
            field = (
                <VnumAutoComplete 
                    id={"value"+value_index}
                        floatingLabelText={"Value " + value_index}
                    value={this.props.model["value"+value_index]} 
                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} dataSource={data_source} />
            )
        }
        else {
            field = (
                <TextField 
                    id={"value"+value_index}
                    floatingLabelText={"Value " + value_index}
                    value={this.props.model["value"+value_index]} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                
            )
        }
        
        return (
            <div>
                {field}
                <span style={item_type_ldesc_style}>{item_type["value"+value_index].ldesc}</span>
            </div>
        )
    }
    render() {
        const actions = [
        <FlatButton label="Done" primary={true} onClick={this.props.handleClose} />,
        ];
        return (
            <Dialog title={`Edit Item`} modal={false} open={this.props.open} actions={actions} onRequestClose={this.props.handleClose} autoScrollBodyContent={true}>
                <Tabs>
                    <Tab label="Descriptions">
                        <Validate validator={item_validator}>
                        <TextField 
                            floatingLabelText="vnum" 
                            id="vnum" 
                            value={this.props.model.vnum} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Short description" 
                            id="sdesc" 
                            value={this.props.model.sdesc} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Long description" 
                            id="ldesc" 
                            fullWidth={true} 
                            value={this.props.model.ldesc} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Keywords" 
                            id="keywords" 
                            fullWidth={true} 
                            value={this.props.model.keywords} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Validate>
                    </Tab>
                    <Tab label="Item Type">
                        <Validate validator={item_validator}>
                        <FlagSelector 
                            id="item_type" 
                            label="Item Type" 
                            flags={ITEM_TYPES} 
                            value={this.props.model.item_type} 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Validate>
                        {this.props.model.item_type ? (
                        <React.Fragment>
                            {this.generateItemValue(this.props.model.item_type, 0)}
                            {this.generateItemValue(this.props.model.item_type, 1)}
                            {this.generateItemValue(this.props.model.item_type, 2)}
                            {this.generateItemValue(this.props.model.item_type, 3)}
                            {this.generateItemValue(this.props.model.item_type, 4)}
                            <div>
                                <TextField 
                                    id="value5" 
                                    floatingLabelText="Value 5" 
                                    value={this.props.model.value5} 
                                    autoComplete="off" 
                                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                                <span style={item_type_ldesc_style}>Object data (optional)</span>
                            </div>
                        </React.Fragment>
                        ) : ""}
                    </Tab>
                    <Tab label="Details">
                        <Validate validator={item_validator}>
                        <MultiFlagSelector 
                            id="attributes" 
                            label="Attributes" 
                            flags={ITEM_ATTRIBUTES} 
                            value={this.props.model.attributes} 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <MultiFlagSelector 
                            id="wear_flags" 
                            label="Wear Locations" 
                            flags={WEAR_LOCATIONS} 
                            value={this.props.model.wear_flags} 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="quality" 
                            label="Quality" 
                            flags={ITEM_QUALITY} 
                            value={this.props.model.quality} 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="material" 
                            label="Materials" 
                            flags={ITEM_MATERIALS} 
                            value={this.props.model.material} 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="condition" 
                            label="Condition" 
                            flags={ITEM_CONDITION} 
                            value={this.props.model.condition} 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="size" 
                            label="Sizes" 
                            flags={ITEM_SIZES} 
                            value={this.props.model.size} 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Identify text" 
                            id="identify_message" 
                            fullWidth={true} 
                            value={this.props.model.identify_message} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Validate>
                        <ApplyEditor 
                            id="special_applies" 
                            pointer={this.props.model.pointer} />
                    </Tab>
                    <Tab label="Extra Descs">
                        <ExtraDescriptionsEditor 
                            id="extra_descriptions" 
                            pointer={this.props.model.uuid} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor 
                            id="programs" 
                            triggers={ITEM_PROGRAM_TRIGGERS}
                            pointer={this.props.model.uuid} />
                    </Tab>
                    <Tab label="Resets">
                        <ItemResetsEditor 
                            id="item_resets" 
                            vnum={this.props.model.vnum}  />
                    </Tab>
                </Tabs>
            </Dialog>  
        )
    }
}
ItemEditor = connect(
    (state)=>({
        model: (state.items.filter((item)=>(item.uuid===state.ui_state.item_current_item)))[0],
        items: state.items,
        rooms: state.rooms,
        mobs: state.mobs,
        ui_state: state.ui_state
    }),
    (dispatch)=>({
        handleClose: () => {dispatch({ type:UiStateActions.CLOSE_ITEM_EDITOR })},
        setProp: (index, key, value) => {dispatch({ type:ItemActions.SET_PROP, index, key, value })},
    })
)(ItemEditor)

class ApplyEditor extends React.Component {
    generate() {
        return this.props.model.filter((r)=>(r.pointer===this.props.pointer)).map((apply, index) => (
            <TableRow key={index}>
                <TableRowColumn width={50}>
                    <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(apply.uuid))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={item_apply_validator}>
                    <FlagSelector 
                        id="apply_flag"
                        label="Apply Flag" 
                        flags={ITEM_APPLIES} 
                        value={apply.apply_flag} 
                        onChange={(e,v)=>(this.props.setProp(apply.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={item_apply_validator}>
                    <TextField 
                        id="parameter" 
                        value={apply.parameter} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(apply.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    
                </TableRowColumn>
            </TableRow>
        ));
    }
    
    render() {
        return (
            <React.Fragment>
                <Subheader>Apply Flags</Subheader>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn width={50}></TableHeaderColumn>
                            <TableHeaderColumn>Apply Flag</TableHeaderColumn>
                            <TableHeaderColumn>Value</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.generate()}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                                    <FontIcon className="material-icons">add_box</FontIcon>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}
ApplyEditor = connect(
    (state)=>({
        model: state.item_applies
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:ItemApplyActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:ItemApplyActions.REMOVE, index })},
        handleNew: (pointer) => {
            dispatch({ type:ItemApplyActions.ADD })
            dispatch({ type:ItemApplyActions.SET_PROP, key:"pointer", value:pointer })
        }
    })
)(ApplyEditor)

class ItemResetsEditor extends React.Component {
    generate() {
        return this.props.model.filter((r)=>(r.item===this.props.vnum)).map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={item_reset_validator}>
                <VnumAutoComplete 
                    floatingLabelText="Room" 
                    id="room_container" 
                    value={reset.room_container} 
                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} dataSource={this.props.rooms} />
                <TextField 
                    floatingLabelText="Item Limit" 
                    id="item_limit" 
                    value={reset.item_limit} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                </Validate>
                <Checkbox 
                    label="Hidden" 
                    id="hidden" 
                    checked={reset.hidden} 
                    onCheck={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                <Checkbox 
                    label="Buried" 
                    id="buried" 
                    checked={reset.buried} 
                    onCheck={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                <TrapResetEditor 
                    id="trap_reset" 
                    pointer={reset.uuid}  />
                <ItemResetsContentsEditor 
                    id="contents" 
                    vnum={this.props.vnum}
                    pointer={reset.uuid}  />
            </Paper>
        ));
    }
    render() {
        return (
            <React.Fragment>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </React.Fragment>
        )
    }
}
ItemResetsEditor = connect(
    (state)=>({
        model: state.item_resets,
        rooms: state.rooms
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:ItemResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:ItemResetActions.REMOVE, index })},
        handleNew: (vnum) => {
            dispatch({ type:ItemResetActions.ADD })
            dispatch({ type:ItemResetActions.SET_PROP, key:"item", value:vnum })
        }
    })
)(ItemResetsEditor)

class ItemResetsContentsEditor extends React.Component {
    generate() {
        return this.props.model.filter((r)=>(r.item_pointer===this.props.pointer)).map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <VnumAutoComplete 
                    floatingLabelText="Item" 
                    id="item"
                    value={reset.item} 
                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} 
                    dataSource={this.props.items} />
                <TextField 
                    floatingLabelText="Item Limit" 
                    id="item_limit"
                    value={reset.item_limit} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                <Checkbox 
                    label="Hidden" 
                    id="hidden"
                    checked={reset.hidden} 
                    onCheck={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
            </Paper>
        ));
    }
    
    render() {
        return (
            <React.Fragment>
                <Subheader>Contents</Subheader>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer, this.props.vnum))}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </React.Fragment>
        )
    }
}
ItemResetsContentsEditor = connect(
    (state)=>({
        model: state.item_resets,
        items: state.items
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:ItemResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:ItemResetActions.REMOVE, index })},
        handleNew: (uuid, vnum) => {
            dispatch({ type:ItemResetActions.ADD })
            dispatch({ type:ItemResetActions.SET_PROP, key:"room_container", value:vnum })
            dispatch({ type:ItemResetActions.SET_PROP, key:"item_pointer", value:uuid })
        }
    })
)(ItemResetsContentsEditor)

export default muiThemeable()(ItemPanel);