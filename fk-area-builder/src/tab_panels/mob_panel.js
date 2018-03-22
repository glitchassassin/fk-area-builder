import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Dialog, {DialogContent, DialogActions, DialogTitle, DialogContentText} from 'material-ui/Dialog';
import Card, {CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';
import withTheme from 'material-ui/styles/withTheme';
import ListSubheader from 'material-ui/List/ListSubheader';
import {FormControlLabel} from 'material-ui/Form'
import { connect } from 'react-redux';
import { 
    MobActions, UiStateActions, ShopActions, RepairRechargeActions, 
    MobResetActions, EquipmentResetActions, CoinResetActions, TrainSkillActions,
    TrainWeaponSkillActions, TrainSpellActions, TrainLevelActions, 
    TrainStatisticActions, TrainFeatActions, TrainLangActions, MobSpecialActions
} from '../Models/actionTypes';

import Table, {
    TableBody,
    TableHead,
    TableCell,
    TableRow,
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
    LANGUAGE_FLAGS,
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
    ITEM_TYPES,
    MOB_REPAIR_MATERIAL,
    MOB_REPAIR_RECHARGE,
    MOB_WEAR_POSITIONS,
    ITEM_COIN_TYPES,
    MOB_SPECIALS
}
from '../Models/flags';
import {
    EquipmentReset,
    CoinReset,
    vnum_sort
}
from '../Models/model_templates'
import {FlagWithCategorySelector,FlagSelector,MultiFlagSelector,VnumAutoComplete,ValidatedTextField} from '../UIComponents/FlagSelectors'
import {Validate} from '../UIComponents/GenericEditors'
import {
    MobValidator,
    ShopValidator,
    RepairRechargeValidator,
    MobResetValidator,
    EquipmentResetValidator,
    CoinResetValidator,
    TrainSkillValidator,
    TrainWeaponSkillValidator,
    TrainSpellValidator,
    TrainLevelValidator,
    TrainStatisticValidator,
    TrainFeatValidator,
    TrainLangValidator,
    MobSpecialValidator
} from '../Models/model_validator'
import {TrapResetEditor, ProgramsEditor, EditorDialog} from '../UIComponents/GenericEditors'

const uuid = require('uuid/v4');

const mob_validator = new MobValidator()
const shop_validator = new ShopValidator()
const repair_recharge_validator = new RepairRechargeValidator()
const mob_reset_validator = new MobResetValidator()
const equipment_reset_validator = new EquipmentResetValidator()
const coin_reset_validator = new CoinResetValidator()
const can_train_skill_validator = new TrainSkillValidator()
const can_train_weapon_skill_validator = new TrainWeaponSkillValidator()
const can_train_spell_validator = new TrainSpellValidator()
const can_train_level_validator = new TrainLevelValidator()
const can_train_statistic_validator = new TrainStatisticValidator()
const can_train_feat_validator = new TrainFeatValidator()
const can_train_lang_validator = new TrainLangValidator()
const mob_special_validator = new MobSpecialValidator()

const icon_button_style = {
    padding: "5px",
    width: "auto",
    height: "auto",
}

class MobPanel extends React.Component {
    get_mob_by_uuid = (uuid) => {
        let matches = this.props.mobs.filter((mob)=>(mob.uuid===uuid))
        if (matches.length) {
            return matches[0]
        }
    }
    generateItems() {
        return this.props.mobs.sort(vnum_sort).map((mob, index) => (
            <TableRow key={index}>
                <TableCell padding="dense" width={"150px"}>
                    <IconButton tooltip="Edit" onClick={() => (this.props.openEditor(mob.uuid))} style={icon_button_style}>
                        <Icon>mode_edit</Icon>
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={()=>(this.props.openConfirmDelete(mob.uuid))} style={icon_button_style}>
                        <Icon color="error">delete_forever</Icon>
                    </IconButton>
                    {mob_validator.validate_state(this.props.state, mob).length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={()=>(this.props.openErrors(mob.uuid))} style={icon_button_style}>
                        <Icon color="error">error</Icon>
                    </IconButton>
                    )}
                </TableCell>
                <TableCell padding="dense" width={"150px"}>
                    
                    {mob.vnum}
                </TableCell>
                <TableCell padding="dense">
                    <Paper 
                        style={{
                            width:"1.5em", 
                            height:"1.5em", 
                            borderRadius:"50%", 
                            marginRight:"0.5em", 
                            textAlign:"center", 
                            display:"inline-block", 
                            color:this.props.theme.palette.grey["800"], 
                            backgroundColor:this.props.theme.palette.grey["200"]
                        }} 
                        square={false}>
                        {mob.unique ? "U": "S"}
                    </Paper>
                    {mob.sdesc}
                </TableCell>
                <TableCell padding="dense">{mob.level}</TableCell>
                <TableCell padding="dense">{mob.sex ? mob.sex.code : ""}</TableCell>
                <TableCell padding="dense">{mob.race ? mob.race.code : ""}</TableCell>
                <TableCell padding="dense">{mob.mob_class ? mob.mob_class.code : ""}</TableCell>
            </TableRow>
            ))
    }

    render() {
        let mob = this.get_mob_by_uuid(this.props.ui_state.mob_current_mob)
        return (
            <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="dense" width={"150px"}>Edit</TableCell>
                        <TableCell padding="dense" width={"150px"}>vnum</TableCell>
                        <TableCell padding="dense">Short description</TableCell>
                        <TableCell padding="dense">Level</TableCell>
                        <TableCell padding="dense">Sex</TableCell>
                        <TableCell padding="dense">Race</TableCell>
                        <TableCell padding="dense">Class</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.generateItems()}
                    <TableRow>
                        <TableCell padding="dense" width={"150px"}>
                            <IconButton tooltip="Add" onClick={this.handleNew}>
                                <Icon>add_box</Icon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {mob !== undefined &&
            <React.Fragment>
                <MobEditor />
                <Dialog 
                    open={this.props.ui_state.mob_confirm_delete_open} 
                    modal={false} >
                    <DialogTitle>{`Delete ${mob.sdesc}?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{`Are you sure you want to delete mob ${mob.vnum} (${mob.sdesc})? You cannot undo this action!`}</DialogContentText>
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
                            onClick={()=>(this.props.confirmDelete(this.props.ui_state.mob_current_mob))}>
                        Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog 
                    open={this.props.ui_state.mob_errors_open} >
                    <DialogTitle>{`Errors for mob ${mob.vnum}`}</DialogTitle>
                    <DialogContent>
                        <List>
                            {mob_validator.validate_state(this.props.state, mob).map((error, index) => (
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
        </div>
        )
    }
}
MobPanel = connect(
    (state) => ({state: state, mobs: state.mobs, ui_state: state.ui_state}),
    (dispatch) => ({
        newMob: () => {
            let mob_id = uuid();
            dispatch({ type:MobActions.ADD, value:mob_id });
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
        confirmDelete: (e, v) => {
            dispatch({ type:UiStateActions.SET_CURRENT_MOB, value:null });
            dispatch({ type:MobActions.REMOVE, index:e.target.id });
            dispatch({ type:UiStateActions.CLOSE_MOB_CONFIRM_DELETE });
        },
        cancelDelete: () => {dispatch({ type:UiStateActions.CLOSE_MOB_CONFIRM_DELETE })},
    })
)(MobPanel)

const paper_style = {
    padding: "5px",
    margin: "5px"
}

class MobEditor extends React.Component {
    render() {
        return (
            <EditorDialog
                open={this.props.ui_state.mob_editor_open} 
                onClose={this.props.handleClose} 
                title={`Edit ${this.props.mob.unique ? "Unique": "Simple"} Mob`}
                selected_tab={this.props.ui_state.mob_current_tab}
                setTab={this.props.setTab}
                tabs={["Descriptions","Details","Unique","Training","Programs","Shops","Resets"]}>
                <Validate validator={mob_validator}>
                    {this.props.ui_state.mob_current_tab === 0 && // Descriptions
                    <Grid container spacing={8}>
                        <Grid item xs={3}>
                            <ValidatedTextField 
                                label="vnum" 
                                id="vnum" 
                                value={this.props.mob.vnum} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={9}>
                            <ValidatedTextField 
                                label="Short description" 
                                id="sdesc" 
                                value={this.props.mob.sdesc} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedTextField 
                                label="Long description" 
                                id="ldesc" 
                                value={this.props.mob.ldesc} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedTextField 
                                label="Keywords" 
                                id="keywords" 
                                value={this.props.mob.keywords} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedTextField 
                                label="Full description" 
                                id="fulldesc" 
                                multiline={true} 
                                rows={5} 
                                value={this.props.mob.fulldesc} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.mob_current_tab === 1 && // Details
                    <Grid container spacing={8}>
                        <Grid item xs={3}>
                            <ValidatedTextField 
                                label="Level" 
                                id="level" 
                                value={this.props.mob.level} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagWithCategorySelector 
                                id="mob_class" 
                                label="Class" 
                                flags={MOB_CLASSES} 
                                value={this.props.mob.mob_class} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="race" 
                                label="Race" 
                                flags={MOB_RACES} 
                                value={this.props.mob.race} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="sex" 
                                label="Sex" 
                                flags={MOB_SEXES} 
                                value={this.props.mob.sex} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <FlagSelector 
                                id="position" 
                                label="Position" 
                                flags={MOB_POSITIONS} 
                                value={this.props.mob.position} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <FlagSelector 
                                id="deity" 
                                label="Deity" 
                                flags={MOB_DEITIES} 
                                value={this.props.mob.deity} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiFlagSelector 
                                id="act_flags" 
                                label="Act Flags" 
                                flags={MOB_ACT_FLAGS} 
                                value={this.props.mob.act_flags} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiFlagSelector 
                                id="understood_languages" 
                                label="Understood Languages" 
                                flags={LANGUAGE_FLAGS} 
                                value={this.props.mob.understood_languages} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiFlagSelector 
                                id="spoken_languages" 
                                label="Spoken Languages" 
                                flags={LANGUAGE_FLAGS} 
                                value={this.props.mob.spoken_languages} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <MobSpecialEditor
                                id="mob_specials"
                                vnum={this.props.mob.vnum} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.mob_current_tab === 2 && // Unique
                    (this.props.mob.unique ? (
                    <Grid container spacing={8} justify="center">
                        <Grid item xs={3}>
                            <MultiFlagSelector 
                                id="affect_flags" 
                                label="Affect Flags" 
                                flags={MOB_AFFECTS} 
                                value={this.props.mob.affect_flags} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="alignment" 
                                label="Alignment" 
                                flags={MOB_ALIGNMENTS} 
                                value={this.props.mob.alignment} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="virtual_armor_type" 
                                label="Virtual Armor Type" 
                                flags={ITEM_ARMOR_TYPES} 
                                value={this.props.mob.virtual_armor_type} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="virtual_armor_material" 
                                label="Virtual Armor Material" 
                                flags={ITEM_MATERIALS} 
                                value={this.props.mob.virtual_armor_material} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}><Grid container spacing={24} justify="center">
                            <Grid item xs={1}>
                                <ValidatedTextField 
                                    label="STR" 
                                    id="str" 
                                    value={this.props.mob.str} 
                                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                            </Grid>
                            <Grid item xs={1}>
                                <ValidatedTextField 
                                    label="INT" 
                                    id="int" 
                                    value={this.props.mob.int} 
                                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                            </Grid>
                            <Grid item xs={1}>
                                <ValidatedTextField 
                                    label="WIS" 
                                    id="wis" 
                                    value={this.props.mob.wis} 
                                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                            </Grid>
                            <Grid item xs={1}>
                                <ValidatedTextField 
                                    label="DEX" 
                                    id="dex" 
                                    value={this.props.mob.dex} 
                                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                            </Grid>
                            <Grid item xs={1}>
                                <ValidatedTextField 
                                    label="CON" 
                                    id="con" 
                                    value={this.props.mob.con} 
                                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                            </Grid>
                            <Grid item xs={1}>
                                <ValidatedTextField 
                                    label="CHA" 
                                    id="cha" 
                                    value={this.props.mob.cha} 
                                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                            </Grid>
                            <Grid item xs={1}>
                                <ValidatedTextField 
                                    label="LCK" 
                                    id="lck" 
                                    value={this.props.mob.lck} 
                                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                            </Grid>
                        </Grid></Grid>
                        <Grid item xs={4}>
                            <MultiFlagSelector 
                                id="ris_resistant" 
                                label="Resistant" 
                                flags={MOB_RIS} 
                                value={this.props.mob.ris_resistant} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiFlagSelector 
                                id="ris_immune" 
                                label="Immune" 
                                flags={MOB_RIS} 
                                value={this.props.mob.ris_immune} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiFlagSelector 
                                id="ris_susceptible" 
                                label="Susceptible" 
                                flags={MOB_RIS} 
                                value={this.props.mob.ris_susceptible} 
                                onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="raised"
                                id="makeSimpleMob" 
                                color="primary"
                                onClick={()=>(this.props.convertToSimple(this.props.mob.uuid))}>
                                Convert to Simple Mob?
                            </Button>
                        </Grid>
                    </Grid>
                    ) : (
                    <Grid container spacing={8} justify="center">
                        <Grid item xs={12}>
                            <Button
                                variant="raised" 
                                id="makeUniqueMob" 
                                color="primary"
                                onClick={()=>(this.props.convertToUnique(this.props.mob.uuid))}>
                                Convert to Unique Mob?
                            </Button>
                        </Grid>
                    </Grid>))}
                    {this.props.ui_state.mob_current_tab === 3 && // Training
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ListSubheader>Skills</ListSubheader>
                        </Grid>
                        <Grid item xs={12}>
                            <CanTrainSkillEditor id="can_train_skill" pointer={this.props.mob.uuid} />
                        </Grid>
                        <Grid item xs={12}>
                            <ListSubheader>Weapon Skills</ListSubheader>
                        </Grid>
                        <Grid item xs={12}>
                            <CanTrainWeaponSkillEditor id="can_train_weapon_skill" pointer={this.props.mob.uuid} />
                        </Grid>
                        <Grid item xs={12}>
                            <ListSubheader>Spells</ListSubheader>
                        </Grid>
                        <Grid item xs={12}>
                            <CanTrainSpellEditor id="can_train_spell" pointer={this.props.mob.uuid} />
                        </Grid>
                        <Grid item xs={12}>
                            <ListSubheader>Levels</ListSubheader>
                        </Grid>
                        <Grid item xs={12}>
                            <CanTrainLevelEditor id="can_train_level" pointer={this.props.mob.uuid} />
                        </Grid>
                        <Grid item xs={12}>
                            <ListSubheader>Statistics</ListSubheader>
                        </Grid>
                        <Grid item xs={12}>
                            <CanTrainStatisticEditor id="can_train_statistic" pointer={this.props.mob.uuid} />
                        </Grid>
                        <Grid item xs={12}>
                            <ListSubheader>Feats</ListSubheader>
                        </Grid>
                        <Grid item xs={12}>
                            <CanTrainFeatEditor id="can_train_feat" pointer={this.props.mob.uuid} />
                        </Grid>
                        <Grid item xs={12}>
                            <ListSubheader>Languages</ListSubheader>
                        </Grid>
                        <Grid item xs={12}>
                            <CanTrainLangEditor id="can_train_lang" pointer={this.props.mob.uuid} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.mob_current_tab === 4 && // Descriptions
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ProgramsEditor 
                                id="programs" 
                                pointer={this.props.mob.uuid}
                                triggers={MOB_PROGRAM_TRIGGERS} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.mob_current_tab === 5 && // Shops
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ShopsEditor id="shop" vnum={this.props.mob.vnum} />
                        </Grid>
                        <Grid item xs={12}>
                            <RepairsEditor id="repairs" vnum={this.props.mob.vnum} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.mob_current_tab === 6 && // Resets
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <MobResetsEditor id="mob_resets" vnum={this.props.mob.vnum} />
                        </Grid>
                    </Grid>}
                </Validate>
            </EditorDialog>
        )
    }
}
MobEditor = connect(
    (state)=>({
        mob: (state.mobs.filter((mob)=>(mob.uuid===state.ui_state.mob_current_mob)))[0],
        mobs: state.mobs,
        ui_state: state.ui_state
    }),
    (dispatch)=>({
        handleClose: () => {dispatch({ type:UiStateActions.CLOSE_MOB_EDITOR })},
        convertToSimple: (uuid) => {dispatch({ type:MobActions.CONVERT_TO_SIMPLE, index:uuid })},
        convertToUnique: (uuid) => {dispatch({ type:MobActions.CONVERT_TO_UNIQUE, index:uuid })},
        setProp: (index, key, value) => {dispatch({ type:MobActions.SET_PROP, index, key, value })},
        setTab: (e, index) => {
            dispatch({type:UiStateActions.SET_MOB_CURRENT_TAB, value:index})
        }
    })
)(MobEditor)

class ShopsEditor extends React.Component {
    render() {
        let model = this.props.shops.filter(s=>(s.shopkeeper===this.props.vnum))[0]
        return (
            <Card expanded={model!==undefined} title="Shopkeeper">
                <CardText>
                    <FormControlLabel
                        control = {
                            <Switch 
                                checked={model!==undefined}
                                onChange={()=>(this.props.handleToggle(model, this.props.vnum))}
                            />
                        }
                        label="Shopkeeper"
                    />
                </CardText>
                <CardText expandable={true}>
                    {model && (
                        <React.Fragment>
                        <Validate validator={shop_validator}>
                        <FlagSelector 
                            id="will_buy_1" 
                            label="Will Buy 1" 
                            flags={ITEM_TYPES} 
                            value={model.will_buy_1} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="will_buy_2" 
                            label="Will Buy 2" 
                            flags={ITEM_TYPES} 
                            value={model.will_buy_2} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="will_buy_3" 
                            label="Will Buy 3" 
                            flags={ITEM_TYPES} 
                            value={model.will_buy_3} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="will_buy_4" 
                            label="Will Buy 4" 
                            flags={ITEM_TYPES} 
                            value={model.will_buy_4} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="will_buy_5" 
                            label="Will Buy 5" 
                            flags={ITEM_TYPES} 
                            value={model.will_buy_5} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <ValidatedTextField 
                            label="Profit (Buy)" 
                            id="profit_buy" 
                            value={model.profit_buy} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <ValidatedTextField 
                            label="Profit (Sell)" 
                            id="profit_sell" 
                            value={model.profit_sell} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <ValidatedTextField 
                            label="Open Hour" 
                            id="open_hour" 
                            value={model.open_hour} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <ValidatedTextField 
                            label="Close Hour" 
                            id="close_hour" 
                            value={model.close_hour} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        </Validate>
                        </React.Fragment>
                    )}
                </CardText>
            </Card>
        )
    }
}
ShopsEditor = connect(
    (state)=>({
        shops: state.shops,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:ShopActions.SET_PROP, index, key, value})},
        handleToggle: (model, vnum) => {
            if (model === undefined) {
                dispatch({ type:ShopActions.ADD });
                dispatch({ type:ShopActions.SET_PROP, key:"shopkeeper", value:vnum })
            } else {
                dispatch({ type:ShopActions.REMOVE, index:model.uuid })
            }
        }
    })
)(ShopsEditor)

class RepairsEditor extends React.Component {
    render() {
        let model = this.props.repairs.filter(r=>(r.shopkeeper===this.props.vnum))[0]
        return (
            <Card expanded={model!==undefined} title="Repairer">
                <CardText>
                    <FormControlLabel
                        control = {
                            <Switch 
                                checked={model!==undefined}
                                onChange={()=>(this.props.handleToggle(model, this.props.vnum))}
                            />
                        }
                        label="Repairs"
                    />
                </CardText>
                <CardText expandable={true}>
                    {model && (
                        <React.Fragment>
                        <Validate validator={repair_recharge_validator}>
                        <FlagSelector 
                            id="will_repair_1" 
                            label="Will Repair 1" 
                            flags={ITEM_TYPES} 
                            value={model.will_repair_1} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="will_repair_2" 
                            label="Will Repair 2" 
                            flags={ITEM_TYPES} 
                            value={model.will_repair_2} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="repair_material" 
                            label="Repair Material" 
                            flags={MOB_REPAIR_MATERIAL} 
                            value={model.repair_material} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <ValidatedTextField 
                            label="Profit Modifier" 
                            id="profit_modifier" 
                            value={model.profit_modifier} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="repair" 
                            label="Repair/Recharge" 
                            flags={MOB_REPAIR_RECHARGE} 
                            value={model.repair} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <ValidatedTextField 
                            label="Open Hour" 
                            id="open_hour" 
                            value={model.open_hour} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <ValidatedTextField 
                            label="Close Hour" 
                            id="close_hour" 
                            value={model.close_hour} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        </Validate>
                        </React.Fragment>
                    )}
                </CardText>
            </Card>
        )
    }
}
RepairsEditor = connect(
    (state)=>({
        repairs: state.repairs,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:RepairRechargeActions.SET_PROP, index, key, value})},
        handleToggle: (model, vnum) => {
            if (model === undefined) {
                dispatch({ type:RepairRechargeActions.ADD });
                dispatch({ type:RepairRechargeActions.SET_PROP, key:"shopkeeper", value:vnum })
            } else {
                dispatch({ type:RepairRechargeActions.REMOVE, index:model.uuid })
            }
        }
    })
)(RepairsEditor)

class MobResetsEditor extends React.Component {
    generate() {
        return this.props.model.filter((r)=>(r.mob===this.props.vnum)).map((resets, index) => (
            <Paper key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(resets.uuid))}>
                    <Icon color="error">remove_circle</Icon>
                </IconButton>
                <Validate validator={mob_reset_validator}>
                <ValidatedTextField 
                    label="Limit" 
                    id="mob_limit" 
                    value={resets.mob_limit} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                <VnumAutoComplete 
                    label="Starting Room"
                    id="room"  
                    value={resets.room}  
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))}
                    dataSource={this.props.rooms} />
                </Validate>
                <EquipmentResetsEditor 
                    id="equipment" 
                    pointer={resets.uuid} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                <CoinResetsEditor 
                    id="coins" 
                    pointer={resets.uuid} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
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
MobResetsEditor = connect(
    (state)=>({
        model: state.mob_resets,
        rooms: state.rooms
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:MobResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:MobResetActions.REMOVE, index })},
        handleNew: (vnum) => {
            dispatch({ type:MobResetActions.ADD })
            dispatch({ type:MobResetActions.SET_PROP, key:"mob", value:vnum })
        }
    })
)(MobResetsEditor)

class EquipmentResetsEditor extends React.Component {
    modelClass = EquipmentReset;
    generate() {
        return this.props.model.filter((resets)=>(resets.mob_reset===this.props.pointer)).map((resets, index) => (
            <Paper key={index}>
                <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(resets.uuid))}>
                    <Icon color="error">remove_circle</Icon>
                </IconButton>
                <Validate validator={equipment_reset_validator}>
                <VnumAutoComplete 
                    label="Item" 
                    id="item" 
                    value={resets.item} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} 
                    dataSource={this.props.items} />
                <ValidatedTextField 
                    label="Equip Limit" 
                    id="equip_limit" 
                    value={resets.equip_limit} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                <FlagSelector 
                    id="wear_loc" 
                    label="Wear Location" 
                    flags={MOB_WEAR_POSITIONS} 
                    value={resets.wear_loc} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                </Validate>
                <TrapResetEditor 
                    id="trap_reset" 
                    model={resets.trap_reset} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
            </Paper>
        ));
    }
    
    render() {
        return (
            <React.Fragment>
                <Paper style={paper_style}>
                    <ListSubheader>Equipment</ListSubheader>
                    {this.generate()}
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                        <Icon>add_box</Icon>
                    </IconButton>
                </Paper>
            </React.Fragment>
        )
    }
}
EquipmentResetsEditor = connect(
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
)(EquipmentResetsEditor)

class CoinResetsEditor extends React.Component {
    modelClass = CoinReset;
    generate() {
        return this.props.model.filter((r)=>(r.mob_reset===this.props.pointer)).map((resets, index) => (
            <Paper key={index}>
                <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(resets.uuid))}>
                    <Icon color="error">remove_circle</Icon>
                </IconButton>
                <Validate validator={coin_reset_validator}>
                <FlagSelector 
                    id="coin_type" 
                    label="Coin Type" 
                    flags={ITEM_COIN_TYPES} 
                    value={resets.coin_type} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                <ValidatedTextField 
                    label="Dice Count" 
                    id="dice_count" 
                    value={resets.dice_count} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                <ValidatedTextField 
                    label="Dice Sides" 
                    id="dice_sides" 
                    value={resets.dice_sides} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                </Validate>
            </Paper>
        ));
    }
    
    render() {
        return (
            <React.Fragment>
                <Paper style={paper_style}>
                    <ListSubheader>Coins</ListSubheader>
                    {this.generate()}
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                        <Icon>add_box</Icon>
                    </IconButton>
                </Paper>
            </React.Fragment>
        )
    }
}
CoinResetsEditor = connect(
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
)(CoinResetsEditor)

class CanTrainWrapper extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.props.headers.map((h)=>(<TableCell padding="dense" key={h}>{h}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.children}
                        <TableRow>
                            <TableCell padding="dense">
                                <IconButton tooltip="Add" onClick={this.props.handleNew}>
                                    <Icon>add_box</Icon>
                                </IconButton>
                            </TableCell>
                            {this.props.headers.slice(1).map((h)=>(<TableCell padding="dense" key={h}></TableCell>))}
                        </TableRow>
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

class CanTrainSkillEditor extends React.Component {
    render() {
        return (
            <CanTrainWrapper headers={["Max Level", "Price Multiplier", "Skill"]} handleNew={()=>(this.props.handleNew(this.props.pointer))}>
                {this.generate()}
            </CanTrainWrapper>
        )
    }
    generate() {
        return this.props.model.filter((s)=>(s.mob===this.props.pointer)).map((skill, index) => (
            <TableRow key={index}>
                <TableCell padding="dense">
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={can_train_skill_validator}>
                    <Grid item xs={10}>
                        <ValidatedTextField 
                            id="level" 
                            value={skill.level} 
                            onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_skill_validator}>
                    <ValidatedTextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_skill_validator}>
                    <FlagSelector 
                        id="skill" 
                        label="Skill" 
                        flags={MOB_SKILLS} 
                        value={skill.skill} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
            </TableRow>
        ));
    }
}
CanTrainSkillEditor = connect(
    (state)=>({
        model: state.can_train_skill,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:TrainSkillActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:TrainSkillActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:TrainSkillActions.ADD })
            dispatch({ type:TrainSkillActions.SET_PROP, key:"mob", value:uuid })
        }
    })
)(CanTrainSkillEditor)

class CanTrainWeaponSkillEditor extends React.Component {
    render() {
        return (
            <CanTrainWrapper headers={["Max Level", "Price Multiplier", "Weapon Skill"]} handleNew={()=>(this.props.handleNew(this.props.pointer))}>
                {this.generate()}
            </CanTrainWrapper>
        )
    }
    generate() {
        return this.props.model.filter((s)=>(s.mob===this.props.pointer)).map((skill, index) => (
            <TableRow key={index}>
                <TableCell padding="dense">
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={can_train_weapon_skill_validator}>
                    <Grid item xs={10}>
                        <ValidatedTextField 
                            id="level" 
                            value={skill.level} 
                            onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_weapon_skill_validator}>
                    <ValidatedTextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_weapon_skill_validator}>
                    <FlagSelector 
                        id="weapon_skill" 
                        label="Weapon Skill" 
                        flags={MOB_WEAPON_SKILLS} 
                        value={skill.weapon_skill} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
            </TableRow>
        ));
    }
}
CanTrainWeaponSkillEditor = connect(
    (state)=>({
        model: state.can_train_weapon_skill,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:TrainWeaponSkillActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:TrainWeaponSkillActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:TrainWeaponSkillActions.ADD })
            dispatch({ type:TrainWeaponSkillActions.SET_PROP, key:"mob", value:uuid })
        }
    })
)(CanTrainWeaponSkillEditor)

class CanTrainSpellEditor extends React.Component {
    render() {
        return (
            <CanTrainWrapper headers={["Max Level", "Price Multiplier", "Spell"]} handleNew={()=>(this.props.handleNew(this.props.pointer))}>
                {this.generate()}
            </CanTrainWrapper>
        )
    }
    generate() {
        return this.props.model.filter((s)=>(s.mob===this.props.pointer)).map((skill, index) => (
            <TableRow key={index}>
                <TableCell padding="dense">
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={can_train_spell_validator}>
                    <Grid item xs={10}>
                        <ValidatedTextField 
                            id="level" 
                            value={skill.level} 
                            onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_spell_validator}>
                    <ValidatedTextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_spell_validator}>
                    <FlagSelector 
                        id="spell" 
                        label="Spell" 
                        flags={MOB_SPELLS} 
                        value={skill.spell} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
            </TableRow>
        ));
    }
}
CanTrainSpellEditor = connect(
    (state)=>({
        model: state.can_train_spell,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:TrainSpellActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:TrainSpellActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:TrainSpellActions.ADD })
            dispatch({ type:TrainSpellActions.SET_PROP, key:"mob", value:uuid })
        }
    })
)(CanTrainSpellEditor)

class CanTrainLevelEditor extends React.Component {
    render() {
        return (
            <CanTrainWrapper headers={["Max Level", "Price Multiplier"]} handleNew={()=>(this.props.handleNew(this.props.pointer))}>
                {this.generate()}
            </CanTrainWrapper>
        )
    }
    generate() {
        return this.props.model.filter((s)=>(s.mob===this.props.pointer)).map((skill, index) => (
            <TableRow key={index}>
                <TableCell padding="dense">
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={can_train_level_validator}>
                    <Grid item xs={10}>
                        <ValidatedTextField 
                            id="level" 
                            value={skill.level} 
                            onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_level_validator}>
                    <ValidatedTextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
            </TableRow>
        ));
    }
}
CanTrainLevelEditor = connect(
    (state)=>({
        model: state.can_train_level,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:TrainLevelActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:TrainLevelActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:TrainLevelActions.ADD })
            dispatch({ type:TrainLevelActions.SET_PROP, key:"mob", value:uuid })
        }
    })
)(CanTrainLevelEditor)

class CanTrainStatisticEditor extends React.Component {
    render() {
        return (
            <CanTrainWrapper headers={["Max Level", "Price Multiplier", "Statistic"]} handleNew={()=>(this.props.handleNew(this.props.pointer))}>
                {this.generate()}
            </CanTrainWrapper>
        )
    }
    generate() {
        return this.props.model.filter((s)=>(s.mob===this.props.pointer)).map((skill, index) => (
            <TableRow key={index}>
                <TableCell padding="dense">
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={can_train_statistic_validator}>
                    <Grid item xs={10}>
                        <ValidatedTextField 
                            id="level" 
                            value={skill.level} 
                            onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_statistic_validator}>
                    <ValidatedTextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_statistic_validator}>
                    <FlagSelector 
                        id="statistic" 
                        label="Statistic" 
                        flags={MOB_STATISTICS} 
                        value={skill.statistic} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
            </TableRow>
        ));
    }
}
CanTrainStatisticEditor = connect(
    (state)=>({
        model: state.can_train_statistic,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:TrainStatisticActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:TrainStatisticActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:TrainStatisticActions.ADD })
            dispatch({ type:TrainStatisticActions.SET_PROP, key:"mob", value:uuid })
        }
    })
)(CanTrainStatisticEditor)

class CanTrainFeatEditor extends React.Component {
    render() {
        return (
            <CanTrainWrapper headers={["Max Level", "Price Multiplier", "Feat"]} handleNew={()=>(this.props.handleNew(this.props.pointer))}>
                {this.generate()}
            </CanTrainWrapper>
        )
    }
    generate() {
        return this.props.model.filter((s)=>(s.mob===this.props.pointer)).map((skill, index) => (
            <TableRow key={index}>
                <TableCell padding="dense">
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={can_train_feat_validator}>
                    <Grid item xs={10}>
                        <ValidatedTextField 
                            id="level" 
                            value={skill.level} 
                            onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_feat_validator}>
                    <ValidatedTextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_feat_validator}>
                    <FlagSelector 
                        id="feat" 
                        label="Feat" 
                        flags={MOB_FEATS} 
                        value={skill.feat} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
            </TableRow>
        ));
    }
}
CanTrainFeatEditor = connect(
    (state)=>({
        model: state.can_train_feat,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:TrainFeatActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:TrainFeatActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:TrainFeatActions.ADD })
            dispatch({ type:TrainFeatActions.SET_PROP, key:"mob", value:uuid })
        }
    })
)(CanTrainFeatEditor)

class CanTrainLangEditor extends React.Component {
    render() {
        return (
            <CanTrainWrapper headers={["Max Level", "Price Multiplier", "Languages"]} handleNew={()=>(this.props.handleNew(this.props.pointer))}>
                {this.generate()}
            </CanTrainWrapper>
        )
    }
    generate() {
        return this.props.model.filter((s)=>(s.mob===this.props.pointer)).map((skill, index) => (
            <TableRow key={index}>
                <TableCell padding="dense">
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                        <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={can_train_lang_validator}>
                    <Grid item xs={10}>
                        <ValidatedTextField 
                            id="level" 
                            value={skill.level} 
                            onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_lang_validator}>
                    <ValidatedTextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
                <TableCell padding="dense">
                    <Validate validator={can_train_lang_validator}>
                    <FlagSelector 
                        id="lang" 
                        label="Language" 
                        flags={MOB_LANGUAGES} 
                        value={skill.lang} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableCell>
            </TableRow>
        ));
    }
}
CanTrainLangEditor = connect(
    (state)=>({
        model: state.can_train_lang,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:TrainLangActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:TrainLangActions.REMOVE, index })},
        handleNew: (uuid) => {
            dispatch({ type:TrainLangActions.ADD })
            dispatch({ type:TrainLangActions.SET_PROP, key:"mob", value:uuid })
        }
    })
)(CanTrainLangEditor)

class MobSpecialEditor extends React.Component {
    render() {
        return (
            <CanTrainWrapper headers={["Special", "Description"]} handleNew={()=>(this.props.handleNew(this.props.vnum))}>
                {this.generate()}
            </CanTrainWrapper>
        )
    }
    generate() {
        return this.props.model.filter((s)=>(s.mob===this.props.vnum)).map((spec, index) => (
            <TableRow key={index}>
                <TableCell padding="dense">
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={2}>
                            <IconButton tooltip="Delete" onClick={()=>(this.props.handleDelete(spec.uuid))}>
                                <Icon color="error">remove_circle</Icon>
                            </IconButton>
                        </Grid>
                        <Validate validator={mob_special_validator}>
                        <Grid item xs={10}>
                            <FlagSelector 
                                id="special" 
                                label="Special"
                                value={spec.special} 
                                flags={MOB_SPECIALS}
                                onChange={(e,v)=>(this.props.setProp(spec.uuid, e.target.id, v))} />
                        </Grid>
                        </Validate>
                    </Grid>
                </TableCell>
                <TableCell padding="dense">
                    {spec.special ? spec.special.ldesc : ""}
                </TableCell>
            </TableRow>
        ));
    }
}
MobSpecialEditor = connect(
    (state)=>({
        model: state.mob_specials,
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:MobSpecialActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:MobSpecialActions.REMOVE, index })},
        handleNew: (vnum) => {
            dispatch({ type:MobSpecialActions.ADD })
            dispatch({ type:MobSpecialActions.SET_PROP, key:"mob", value:vnum })
        }
    })
)(MobSpecialEditor)

export default withTheme()(MobPanel);