import React from 'react';
import { connect } from 'react-redux';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Table, {TableBody, TableHead, TableCell, TableRow} from 'material-ui/Table';
import Dialog, {DialogContent, DialogActions, DialogTitle, DialogContentText} from 'material-ui/Dialog';
import { FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import withTheme from 'material-ui/styles/withTheme';
import ListSubheader from 'material-ui/List/ListSubheader';
import Checkbox from 'material-ui/Checkbox';
import { ColorCodeEditor } from '../UIComponents/QuillEditor';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { 
    ItemActions, UiStateActions, ItemResetActions, ItemApplyActions
} from '../Models/actionTypes';
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
    vnum_sort
}
from '../Models/model_templates'
import {
    ItemValidator,
    ItemApplyValidator,
    ItemResetValidator
}
from '../Models/model_validator'
import {
    FlagSelector,
    MultiFlagSelector,
    VnumAutoComplete,
    ValidatedTextField
}
from '../UIComponents/FlagSelectors'
import {Validate, TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor, EditorDialog} from '../UIComponents/GenericEditors'

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
        return items.sort(vnum_sort).map((item, index) => (
            <TableRow key={index} hover onClick={() => (this.props.openEditor(item.uuid))}>
                <TableCell padding="dense" width={"100px"}>
                    <IconButton tooltip="Delete" onClick={(e)=>{e.stopPropagation(); this.props.openConfirmDelete(item.uuid)}} style={icon_button_style}>
                        <Icon color="error">delete_forever</Icon>
                    </IconButton>
                    {item_validator.validate_state(this.props.state, item).length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={(e)=>{e.stopPropagation(); this.props.openErrors(item.uuid)}} style={icon_button_style}>
                        <Icon color="error">error</Icon>
                    </IconButton>
                    )}
                </TableCell>
                <TableCell padding="dense" width={"150px"}>
                    {item.vnum}
                </TableCell>
                <TableCell padding="dense">
                    {item.sdesc}
                </TableCell>
                <TableCell padding="dense">{item.item_type ? item.item_type.code : ""}</TableCell>
                <TableCell padding="dense">{item.material ? item.material.code : ""}</TableCell>
                <TableCell padding="dense">{item.size ? item.size.code : ""}</TableCell>
            </TableRow>
            ))
    }

    render() {
        let item = this.get_mob_by_uuid(this.props.ui_state.item_current_item);
        return (
            <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="dense" width={"120px"}></TableCell>
                        <TableCell padding="dense" width={"150px"}>vnum</TableCell>
                        <TableCell padding="dense">Short description</TableCell>
                        <TableCell padding="dense">Item type</TableCell>
                        <TableCell padding="dense">Material</TableCell>
                        <TableCell padding="dense">Size</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.generateItems(this.props.items)}
                    <TableRow>
                        <TableCell padding="dense" width={"150px"}>
                            <IconButton tooltip="Add" onClick={this.props.newItem}>
                                <Icon>add_box</Icon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {item !== undefined && 
            <React.Fragment>
                <ItemEditor />
                <Dialog open={this.props.ui_state.item_confirm_delete_open}>
                    <DialogTitle>{`Delete ${item.sdesc}?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{`Are you sure you want to delete item ${item.vnum} (${item.sdesc})? You cannot undo this action!`}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.props.cancelDelete}>
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={()=>(this.props.confirmDelete(this.props.ui_state.item_current_item))}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.props.ui_state.item_errors_open} >
                    <DialogTitle>{`Errors for item ${item.vnum}`}</DialogTitle>
                    <DialogContent>
                        <List>
                            {item_validator.validate_state(this.props.state, item).map((error, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon><Icon color="error">error</Icon></ListItemIcon>
                                    <ListItemText primary={error} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            label="Done"
                            color="primary"
                            onClick={this.props.closeErrors} >
                            Done
                        </Button>
                    </DialogActions>
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
            dispatch({ type:UiStateActions.SET_CURRENT_ITEM, value:item_id });
            dispatch({ type:UiStateActions.OPEN_ITEM_EDITOR });
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
        confirmDelete: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ITEM, value:null });
            dispatch({ type:ItemActions.REMOVE, index:uuid });
            dispatch({ type:UiStateActions.CLOSE_ITEM_CONFIRM_DELETE });
        },
        cancelDelete: () => {dispatch({ type:UiStateActions.CLOSE_ITEM_CONFIRM_DELETE })},
    })
)(ItemPanel)

const paper_style = theme => ({
    paper: {
        padding: "5px",
        margin: "5px",
        backgroundColor: theme.palette.secondary.main
    }
})

class ItemEditor extends React.Component {
    generateItemValue(item_type, value_index) {
        let field;
        if (this.props.model.item_type["value"+value_index].type === META_VALUE_TYPES.FLAG) {
            field = (
                <FlagSelector 
                    id={"value"+value_index}
                    label={`Value ${value_index} (${item_type["value"+value_index].ldesc})`}
                    flags={this.props.model.item_type["value"+value_index].type_enum} 
                    value={this.props.model["value"+value_index]} 
                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
            )
        }
        else if (this.props.model.item_type["value"+value_index].type === META_VALUE_TYPES.MULTI_FLAGS) {
            field = (
                <MultiFlagSelector 
                    id={"value"+value_index}
                    label={`Value ${value_index} (${item_type["value"+value_index].ldesc})`}
                    flags={this.props.model.item_type["value"+value_index].type_enum} 
                    value={this.props.model["value"+value_index]} 
                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
            )
        }
        else if (this.props.model.item_type["value"+value_index].type === META_VALUE_TYPES.VNUM && this.props.model.item_type["value"+value_index].type_enum !== null) {
            let data_source;
            if (this.props.model.item_type["value"+value_index].type_enum === META_VNUM_TYPES.OBJECT) {
                data_source = this.props.items;
            }
            else if (this.props.model.item_type["value"+value_index].type_enum === META_VNUM_TYPES.ROOM) {
                data_source = this.props.rooms;
            }
            else if (this.props.model.item_type["value"+value_index].type_enum === META_VNUM_TYPES.MOB) {
                data_source = this.props.mobs;
            }
            field = (
                <VnumAutoComplete 
                    id={"value"+value_index}
                    label={`Value ${value_index} (${item_type["value"+value_index].ldesc})`}
                    value={this.props.model["value"+value_index]} 
                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} dataSource={data_source} />
            )
        }
        else {
            field = (
                <ValidatedTextField 
                    id={"value"+value_index}
                    label={`Value ${value_index} (${item_type["value"+value_index].ldesc})`}
                    value={this.props.model["value"+value_index]} 
                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                
            )
        }
        
        return field
    }
    render() {
        return (
            <EditorDialog 
                open={this.props.ui_state.item_editor_open} 
                onClose={this.props.handleClose}
                title={`Edit Item`}
                selected_tab={this.props.ui_state.item_current_tab}
                setTab={this.props.setTab}
                tabs={["Descriptions","Item Type","Details","Extra Descs","Programs"]}>
                <Validate validator={item_validator}>
                    {this.props.ui_state.item_current_tab === 0 && // Descriptions
                    <Grid container spacing={8}>
                        <Grid item xs={3}>
                            <ValidatedTextField 
                                label="vnum" 
                                id="vnum" 
                                value={this.props.model.vnum} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={9}>
                            <ColorCodeEditor 
                                label="Short description" 
                                id="sdesc" 
                                value={this.props.model.sdesc} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <ColorCodeEditor 
                                label="Long description" 
                                id="ldesc" 
                                value={this.props.model.ldesc} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedTextField 
                                label="Keywords" 
                                id="keywords" 
                                fullWidth={true} 
                                value={this.props.model.keywords} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.item_current_tab === 1 && // Item Type
                    <Grid container spacing={8}>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="item_type" 
                                label="Item Type" 
                                flags={ITEM_TYPES} 
                                value={this.props.model.item_type} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={9}>{/*Padding*/}</Grid>
                        {this.props.model.item_type ? (
                        <React.Fragment>
                            <Grid item xs={4}>
                                {this.generateItemValue(this.props.model.item_type, 0)}
                            </Grid>
                            <Grid item xs={4}>
                                {this.generateItemValue(this.props.model.item_type, 1)}
                            </Grid>
                            <Grid item xs={4}>
                                {this.generateItemValue(this.props.model.item_type, 2)}
                            </Grid>
                            <Grid item xs={4}>
                                {this.generateItemValue(this.props.model.item_type, 3)}
                            </Grid>
                            <Grid item xs={4}>
                                {this.generateItemValue(this.props.model.item_type, 4)}
                            </Grid>
                            <Grid item xs={4}>
                                <ValidatedTextField 
                                    id="value5" 
                                    label="Value 5 (Object data (optional))"
                                    value={this.props.model.value5} 
                                    onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                            </Grid>
                        </React.Fragment>
                        ) : ""}
                    </Grid>}
                    {this.props.ui_state.item_current_tab === 2 && // Details
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <MultiFlagSelector 
                                id="attributes" 
                                label="Attributes" 
                                flags={ITEM_ATTRIBUTES} 
                                value={this.props.model.attributes} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiFlagSelector 
                                id="wear_flags" 
                                label="Wear Locations" 
                                flags={WEAR_LOCATIONS} 
                                value={this.props.model.wear_flags} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="quality" 
                                label="Quality" 
                                flags={ITEM_QUALITY} 
                                value={this.props.model.quality} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="material" 
                                label="Materials" 
                                flags={ITEM_MATERIALS} 
                                value={this.props.model.material} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="condition" 
                                label="Condition" 
                                flags={ITEM_CONDITION} 
                                value={this.props.model.condition} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="size" 
                                label="Sizes" 
                                flags={ITEM_SIZES} 
                                value={this.props.model.size} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedTextField 
                                label="Identify text" 
                                id="identify_message" 
                                value={this.props.model.identify_message} 
                                onChange={(e,v)=>(this.props.setProp(this.props.model.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <ApplyEditor 
                                id="special_applies" 
                                pointer={this.props.model.pointer} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.item_current_tab === 3 && // Extra Descs
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ExtraDescriptionsEditor 
                                id="extra_descriptions" 
                                pointer={this.props.model.uuid} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.item_current_tab === 4 && // Programs
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ProgramsEditor 
                                id="programs" 
                                triggers={ITEM_PROGRAM_TRIGGERS}
                                pointer={this.props.model.uuid} />
                        </Grid>
                    </Grid>}
                </Validate>
            </EditorDialog>  
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
        setTab: (e, index) => {
            dispatch({type:UiStateActions.SET_ITEM_CURRENT_TAB, value:index})
        }
    })
)(ItemEditor)

class ApplyEditor extends React.Component {
    generate() {
        return this.props.model.filter((r)=>(r.pointer===this.props.pointer)).map((apply, index) => (
            <TableRow key={index}>
                <TableCell padding="dense" width={50}>
                    <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(apply.uuid))}>
                        <Icon color="error">remove_circle</Icon>
                    </IconButton>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={item_apply_validator}>
                    <FlagSelector 
                        id="apply_flag"
                        label="Apply Flag" 
                        flags={ITEM_APPLIES} 
                        value={apply.apply_flag} 
                        onChange={(e,v)=>(this.props.setProp(apply.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={item_apply_validator}>
                    <ValidatedTextField 
                        id="parameter" 
                        value={apply.parameter} 
                        onChange={(e,v)=>(this.props.setProp(apply.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
                <TableCell padding="dense">
                    
                </TableCell>
            </TableRow>
        ));
    }
    
    render() {
        return (
            <React.Fragment>
                <ListSubheader>Apply Flags</ListSubheader>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="dense" width={50}></TableCell>
                            <TableCell padding="dense">Apply Flag</TableCell>
                            <TableCell padding="dense">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.generate()}
                        <TableRow>
                            <TableCell padding="dense">
                                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                                    <Icon>add_box</Icon>
                                </IconButton>
                            </TableCell>
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
            <Paper classes={{root:this.props.classes.paper}} key={index}>
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={item_reset_validator}>
                    <Grid item xs={4}>
                        <VnumAutoComplete 
                            label="Room" 
                            id="room_container" 
                            value={reset.room_container} 
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} dataSource={this.props.rooms} />
                    </Grid>
                    <Grid item xs={2}>
                        <ValidatedTextField 
                            label="Item Limit" 
                            id="item_limit" 
                            value={reset.item_limit} 
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                    <Grid item xs={2}>
                        <Grid container align="center"><Grid item xs={12}>
                            <FormControlLabel control={
                                <Checkbox 
                                    id="hidden" 
                                    checked={reset.hidden} 
                                    onCheck={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                            } label="Hidden" />
                        </Grid></Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container align="center"><Grid item xs={12}>
                            <FormControlLabel control={
                                <Checkbox 
                                    id="buried" 
                                    checked={reset.buried} 
                                    onCheck={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                            } label="Buried" />
                        </Grid></Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TrapResetEditor 
                            id="trap_reset" 
                            pointer={reset.uuid}  />
                    </Grid>
                    <Grid item xs={12}>
                        <ItemResetsContentsEditor 
                            id="contents" 
                            vnum={this.props.vnum}
                            pointer={reset.uuid}  />
                    </Grid>
                </Grid>
            </Paper>
        ));
    }
    render() {
        return (
            <React.Fragment>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                    <Icon>add_box</Icon>
                </IconButton>
            </React.Fragment>
        )
    }
}
ItemResetsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
ItemResetsEditor = withStyles(paper_style)(connect(
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
)(ItemResetsEditor))

class ItemResetsContentsEditor extends React.Component {
    generate() {
        return this.props.model.filter((r)=>(r.item_pointer===this.props.pointer)).map((reset, index) => (
            <Paper classes={{root:this.props.classes.paper}} key={index}>
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={item_reset_validator}>
                    <Grid item xs={4}>
                        <VnumAutoComplete 
                            label="Item" 
                            id="item"
                            value={reset.item} 
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} 
                            dataSource={this.props.items} />
                    </Grid>
                    <Grid item xs={4}>
                        <ValidatedTextField 
                            label="Item Limit" 
                            id="item_limit"
                            value={reset.item_limit} 
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container align="center"><Grid item xs={12}>
                            <FormControlLabel control={
                                <Checkbox 
                                    id="hidden"
                                    checked={reset.hidden} 
                                    onCheck={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                            } label="Hidden" />
                        </Grid></Grid>
                    </Grid>
                    </Validate>
                </Grid>
            </Paper>
        ));
    }
    
    render() {
        return (
            <Paper classes={{root:this.props.classes.paper}}>
                <ListSubheader>Contents</ListSubheader>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer, this.props.vnum))}>
                    <Icon>add_box</Icon>
                </IconButton>
            </Paper>
        )
    }
}
ItemResetsContentsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
ItemResetsContentsEditor = withStyles(paper_style)(connect(
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
)(ItemResetsContentsEditor))

export default withTheme()(ItemPanel);