import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem'; 
import ListItemIcon from '@material-ui/core/ListItemIcon'; 
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import withTheme from '@material-ui/core/styles/withTheme';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { items_library, mobs_library } from '../Models/vnum_library';
import PropTypes from 'prop-types';
import { 
    MobActions, UiStateActions, ItemResetActions,
    MobResetActions, EquipmentResetActions, CoinResetActions,
} from '../Models/actionTypes';

import {
    MOB_WEAR_POSITIONS,
    ITEM_COIN_TYPES
}
from '../Models/flags';
import {
    EquipmentReset,
    CoinReset
}
from '../Models/model_templates'
import {FlagSelector,VnumAutoComplete,ValidatedTextField} from '../UIComponents/FlagSelectors'
import {Validate} from '../UIComponents/GenericEditors'
import {
    MobValidator,
    MobResetValidator,
    EquipmentResetValidator,
    CoinResetValidator,
    ItemResetValidator,
} from '../Models/model_validator'
import {TrapResetEditor} from '../UIComponents/GenericEditors'

const uuid = require('uuid/v4');

const mob_validator = new MobValidator()
const item_reset_validator = new ItemResetValidator()
const mob_reset_validator = new MobResetValidator()
const equipment_reset_validator = new EquipmentResetValidator()
const coin_reset_validator = new CoinResetValidator()

/* Lookup Functions */

function strip_color_codes(desc) {
    return desc.replace(/\{..\}/g, "");
}

function get_sdesc(list, vnum) {
    // Not in file; Return empty description as reference
    let sdesc = "[MISSING]";
    
    if (vnum !== null) {
        let flat_list = list;
        console.log(flat_list);
        if (flat_list[0].title && flat_list[0].list) { // Merge library lists
            flat_list = flat_list[0].list.concat(flat_list[1].list, flat_list[2].list);
        }
        let matches = flat_list.filter((m)=>(m.vnum===vnum))
        if (matches.length) {
            sdesc = strip_color_codes(matches[0].sdesc)
        }
    }
    
    return (<span style={{fontWeight:"bold"}}>{sdesc}</span>);
}


class ResetsPanel extends React.Component {
    render() {
        let reset;
        return (
            <Grid container spacing={8} justify="flex-start">
                <Grid item xs={12} lg={6}>
                    <MobResetsEditor />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <ItemResetsEditor />
                </Grid>
            {reset !== undefined &&
            <React.Fragment>
                <Dialog open={this.props.ui_state.reset_confirm_delete_open} >
                    <DialogTitle>{`Delete reset for ${reset.sdesc}?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{`Are you sure you want to delete reset for ${reset.vnum} (${reset.sdesc})? You cannot undo this action!`}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            keyboardFocused={true}
                            onClick={this.props.cancelDelete}>
                        Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={()=>(this.props.confirmDelete(this.props.ui_state.reset_current_reset))}>
                        Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.props.ui_state.reset_errors_open} >
                    <DialogTitle>{`Errors in reset for ${reset.vnum}`}</DialogTitle>
                    <DialogContent>
                        <List>
                            {mob_validator.validate_state(this.props.state, reset).map((error, index) => (
                                <ListItem key={index} >
                                    <ListItemIcon><Icon color="error">error</Icon></ListItemIcon>
                                    <ListItemText primary={error} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            keyboardFocused={true}
                            onClick={this.props.closeErrors}>
                        Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            }
            </Grid>
        )
    }
}
ResetsPanel = connect(
    (state) => ({state: state, mobs: state.mobs, ui_state: state.ui_state}),
    (dispatch) => ({
        newMob: () => {
            let mob_id = uuid();
            dispatch({ type:MobActions.ADD, value:mob_id });
            dispatch({ type:UiStateActions.SET_CURRENT_MOB, value:mob_id });
            dispatch({ type:UiStateActions.OPEN_MOB_EDITOR });
        },
        openEditor: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_MOB, value:uuid });
            dispatch({ type:UiStateActions.OPEN_MOB_EDITOR });
        },
        closeEditor: () => {dispatch({ type:UiStateActions.CLOSE_MOB_EDITOR })},
        openErrors: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_MOB, value:uuid });
            dispatch({ type:UiStateActions.OPEN_MOB_ERRORS });
        },
        closeErrors: () => {dispatch({ type:UiStateActions.CLOSE_MOB_ERRORS })},
        openConfirmDelete: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_MOB, value:uuid });
            dispatch({ type:UiStateActions.OPEN_MOB_CONFIRM_DELETE });
        },
        confirmDelete: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_MOB, value:null });
            dispatch({ type:MobActions.REMOVE, index:uuid });
            dispatch({ type:UiStateActions.CLOSE_MOB_CONFIRM_DELETE });
        },
        cancelDelete: () => {dispatch({ type:UiStateActions.CLOSE_MOB_CONFIRM_DELETE })},
    })
)(ResetsPanel)

const style = theme => ({
    paper: {
        padding: "5px",
        margin: "5px",
        backgroundColor: theme.palette.secondary.main
    },
    tooltip: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
    }
})

class MobResetsEditor extends React.Component {
    generate() {
        return this.props.model.map((resets, index) => (
            <Grid item xs={12} key={index}>
                <Paper classes={{root:this.props.classes.paper}}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Typography variant="subheading">{get_sdesc(mobs_library(this.props.mobs), resets.mob)} in {get_sdesc(this.props.rooms, resets.room)}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(resets.uuid))}>
                                <Icon color="error">remove_circle</Icon>
                            </IconButton>
                        </Grid>
                        <Validate validator={mob_reset_validator}>
                        <Grid item xs={4}>
                            <VnumAutoComplete 
                                label="Mob" 
                                id="mob" 
                                value={resets.mob} 
                                multiSection
                                onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))}
                                dataSource={mobs_library(this.props.mobs)} />
                        </Grid>
                        <Grid item xs={3}>
                            <ValidatedTextField 
                                label="Limit" 
                                id="mob_limit" 
                                value={resets.mob_limit} 
                                onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <VnumAutoComplete 
                                label="Starting Room"
                                id="room"  
                                value={resets.room}  
                                onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))}
                                dataSource={this.props.rooms} />
                        </Grid>
                        </Validate>
                        <Grid item xs={12}>
                            <EquipmentResetsEditor 
                                id="equipment" 
                                pointer={resets.uuid} 
                                onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <CoinResetsEditor 
                                id="coins" 
                                pointer={resets.uuid} 
                                onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        ));
    }
    render() {
        return (
            <Grid container spacing={8} justify="flex-start">
                <Grid item xs={12}>
                    <ListSubheader>Mob Resets</ListSubheader>
                </Grid>
                {this.generate()}
                <Grid item xs={2}>
                    <Tooltip title="Add Mob Reset" classes={{tooltip:this.props.classes.tooltip}}>
                        <IconButton onClick={()=>(this.props.handleNew(this.props.vnum))}>
                            <Icon>add_box</Icon>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        )
    }
}
MobResetsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
MobResetsEditor = withStyles(style)(connect(
    (state)=>({
        model: state.mob_resets,
        rooms: state.rooms,
        mobs: state.mobs
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:MobResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:MobResetActions.REMOVE, index })},
        handleNew: (vnum) => {
            dispatch({ type:MobResetActions.ADD })
            dispatch({ type:MobResetActions.SET_PROP, key:"mob", value:vnum })
        }
    })
)(MobResetsEditor))

class EquipmentResetsEditor extends React.Component {
    modelClass = EquipmentReset;
    generate() {
        return this.props.model.filter((resets)=>(resets.mob_reset===this.props.pointer)).map((resets, index) => (
            <Grid item xs={12} key={index}>
            <Paper classes={{root:this.props.classes.paper}}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Typography variant="subheading">{resets.wear_loc? "Equips": "Holds"} {get_sdesc(items_library(this.props.items), resets.item)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(resets.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={equipment_reset_validator}>
                    <Grid item xs={3}>
                        <VnumAutoComplete 
                            label="Item" 
                            id="item" 
                            value={resets.item} 
                            multiSection
                            onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} 
                            dataSource={items_library(this.props.items)} />
                    </Grid>
                    <Grid item xs={2}>
                        <ValidatedTextField 
                            label="Equip Limit" 
                            id="equip_limit" 
                            value={resets.equip_limit} 
                            onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={4}>
                        <FlagSelector 
                            id="wear_loc" 
                            label="Wear Location" 
                            flags={MOB_WEAR_POSITIONS} 
                            value={resets.wear_loc} 
                            onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                    <TrapResetEditor 
                        id="trap_reset" 
                        pointer={resets.uuid} 
                        onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                </Grid>
            </Paper>
            </Grid>
        ));
    }
    
    render() {
        return (
            <Paper classes={{root:this.props.classes.paper}}>
                <Grid container spacing={8} justify="flex-start">
                    <Grid item xs={12}>
                        <ListSubheader>Equipment</ListSubheader>
                    </Grid>
                    {this.generate()}
                    <Grid item xs={2}>
                        <Tooltip title="Add Equipment Reset" classes={{tooltip:this.props.classes.tooltip}}>
                            <IconButton onClick={()=>(this.props.handleNew(this.props.pointer))}>
                                <Icon>add_box</Icon>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
EquipmentResetsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
EquipmentResetsEditor = withStyles(style)(connect(
    (state)=>({
        model: state.equipment_resets,
        items: state.items
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:EquipmentResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:EquipmentResetActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:EquipmentResetActions.ADD })
            dispatch({ type:EquipmentResetActions.SET_PROP, key:"mob_reset", value:uuid })
        }
    })
)(EquipmentResetsEditor))

class CoinResetsEditor extends React.Component {
    modelClass = CoinReset;
    generate() {
        return this.props.model.filter((r)=>(r.mob_reset===this.props.pointer)).map((resets, index) => (
            <Grid item xs={12}>
            <Paper classes={{root:this.props.classes.paper}} key={index}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Typography variant="subheading">
                            {resets.dice_count?
                                (<span style={{fontWeight:"bold"}}>{resets.dice_count}</span>):
                                (<span style={{fontStyle:"italic"}}>n</span>)
                            }
                            {"d"}
                            {resets.dice_sides?
                                (<span style={{fontWeight:"bold"}}>{resets.dice_sides}</span>):
                                (<span style={{fontStyle:"italic"}}>n</span>)
                            }
                            {" "}
                            {resets.coin_type?
                                (<span style={{fontWeight:"bold"}}>{resets.coin_type.code}</span>):
                                (<span style={{fontStyle:"italic"}}>coin type</span>)
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(resets.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={coin_reset_validator}>
                    <Grid item xs={3}>
                        <ValidatedTextField 
                            label="Dice Count" 
                            id="dice_count" 
                            value={resets.dice_count} 
                            onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={3}>
                        <ValidatedTextField 
                            label="Dice Sides" 
                            id="dice_sides" 
                            value={resets.dice_sides} 
                            onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={4}>
                        <FlagSelector 
                            id="coin_type" 
                            label="Coin Type" 
                            flags={ITEM_COIN_TYPES} 
                            value={resets.coin_type} 
                            onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
            </Paper>
            </Grid>
        ));
    }
    
    render() {
        return (
            <Paper classes={{root:this.props.classes.paper}}>
                <Grid container spacing={8} justify="flex-start">
                    <Grid item xs={12}>
                        <ListSubheader>Coins</ListSubheader>
                    </Grid>
                    {this.generate()}
                    <Grid item xs={2}>
                        <Tooltip title="Add Coin Reset" classes={{tooltip:this.props.classes.tooltip}}>
                            <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                                <Icon>add_box</Icon>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
CoinResetsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
CoinResetsEditor = withStyles(style)(connect(
    (state)=>({
        model: state.coin_resets,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:CoinResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:CoinResetActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:CoinResetActions.ADD })
            dispatch({ type:CoinResetActions.SET_PROP, key:"mob_reset", value:uuid })
        }
    })
)(CoinResetsEditor))


class ItemResetsEditor extends React.Component {
    generate() {
        return this.props.model.filter(r=>r.item_pointer===null).map((reset, index) => (
            <Grid item xs={12}>
            <Paper classes={{root:this.props.classes.paper}} key={index}>
                <Grid container spacing={8} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="subheading">{get_sdesc(items_library(this.props.items), reset.item)} in {get_sdesc(this.props.rooms, reset.room_container)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={item_reset_validator}>
                    <Grid item xs={5}>
                        <VnumAutoComplete 
                            label="Item" 
                            id="item" 
                            value={reset.item} 
                            multiSection
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} 
                            dataSource={items_library(this.props.items)} />
                    </Grid>
                    <Grid item xs={5}>
                        <VnumAutoComplete 
                            label="Room" 
                            id="room_container" 
                            value={reset.room_container} 
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} 
                            dataSource={this.props.rooms} />
                    </Grid>
                    <Grid item xs={3}>
                        <ValidatedTextField 
                            label="Item Limit" 
                            id="item_limit" 
                            value={reset.item_limit} 
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                    <Grid item xs={3}>
                        <Grid container align="center"><Grid item xs={12}>
                            <FormControlLabel control={
                                <Checkbox 
                                    id="hidden" 
                                    checked={reset.hidden} 
                                    color="primary"
                                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                            } label="Hidden" />
                        </Grid></Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container align="center"><Grid item xs={12}>
                            <FormControlLabel control={
                                <Checkbox 
                                    id="buried" 
                                    checked={reset.buried} 
                                    color="primary"
                                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                            } label="Buried" />
                        </Grid></Grid>
                    </Grid>
                    <TrapResetEditor 
                        id="trap_reset" 
                        pointer={reset.uuid}  />
                    <Grid item xs={12}>
                        <ItemResetsContentsEditor 
                            id="contents" 
                            vnum={reset.item}
                            pointer={reset.uuid}  />
                    </Grid>
                </Grid>
            </Paper>
            </Grid>
        ));
    }
    render() {
        return (
            <Grid container spacing={8} justify="flex-start">
                <Grid item xs={12}>
                    <ListSubheader>Items</ListSubheader>
                </Grid>
                {this.generate()}
                <Grid item xs={2}>
                    <Tooltip title="Add Item Reset" classes={{tooltip:this.props.classes.tooltip}}>
                        <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                            <Icon>add_box</Icon>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        )
    }
}
ItemResetsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
ItemResetsEditor = withStyles(style)(connect(
    (state)=>({
        model: state.item_resets,
        rooms: state.rooms,
        items: state.items
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
            <Grid item xs={12}>
            <Paper classes={{root:this.props.classes.paper}} key={index}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Typography variant="subheading">{get_sdesc(items_library(this.props.items), reset.item)} in {get_sdesc(this.props.items, reset.room_container)}</Typography>
                    </Grid>
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
                            multiSection
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} 
                            dataSource={items_library(this.props.items)} />
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
                                    color="primary"
                                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                            } label="Hidden" />
                        </Grid></Grid>
                    </Grid>
                    </Validate>
                </Grid>
            </Paper>
            </Grid>
        ));
    }
    
    render() {
        return (
            <Paper classes={{root:this.props.classes.paper}}>
            <Grid container spacing={8} justify="flex-start">
                <Grid item xs={12}>
                    <ListSubheader>Contents</ListSubheader>
                </Grid>
                {this.generate()}
                <Grid item xs={2}>
                    <Tooltip title="Add Contained Item" classes={{tooltip:this.props.classes.tooltip}}>
                        <IconButton onClick={()=>(this.props.handleNew(this.props.pointer, this.props.vnum))}>
                            <Icon>add_box</Icon>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            </Paper>
        )
    }
}
ItemResetsContentsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
ItemResetsContentsEditor = withStyles(style)(connect(
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

export default withTheme()(ResetsPanel);