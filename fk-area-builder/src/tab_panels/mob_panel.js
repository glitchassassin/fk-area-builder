import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { red900 } from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Subheader from 'material-ui/Subheader';
import {equal_recursively} from '../Models/model'
import { connect } from 'react-redux';
import { 
    MobActions, UiStateActions, ShopActions, RepairRechargeActions, 
    MobResetActions, EquipmentResetActions, CoinResetActions, TrainSkillActions,
    TrainWeaponSkillActions, TrainSpellActions, TrainLevelActions, 
    TrainStatisticActions, TrainFeatActions,
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
    MOB_PROGRAM_TRIGGERS,
    MOB_SKILLS,
    MOB_CLASSES,
    MOB_RACES,
    MOB_SEXES,
    MOB_POSITIONS,
    MOB_DEITIES,
    MOB_ACT_FLAGS,
    LANGUAGE_FLAGS,
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
    ITEM_COIN_TYPES
}
from '../Models/flags';
import {
    SimpleMob,
    UniqueMob,
    TrainSkill,
    TrainWeaponSkill,
    TrainSpell,
    TrainLevel,
    TrainStatistic,
    TrainFeat,
    Shop,
    RepairRecharge,
    MobReset,
    EquipmentReset,
    CoinReset
}
from '../Models/area_model'
import {FlagWithCategorySelector,FlagSelector,MultiFlagSelector,VnumAutoComplete} from '../UIComponents/FlagSelectors'
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
    TrainFeatValidator
} from '../Models/model_validator'
import {TrapResetEditor, ProgramsEditor} from '../UIComponents/GenericEditors'
//import {ModelComponent, ModelArrayComponent} from '../UIComponents/ModelComponents'

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
        return this.props.mobs.map((mob, index) => (
            <TableRow key={index}>
                <TableRowColumn width={100}>
                    <IconButton tooltip="Edit" onClick={() => (this.props.openEditor(mob.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons">mode_edit</FontIcon>
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={()=>(this.props.openConfirmDelete(mob.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={red900}>delete_forever</FontIcon>
                    </IconButton>
                    {mob_validator.validate_state(this.props.state, mob).length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={()=>(this.props.openErrors(mob.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>
                    </IconButton>
                    )}
                </TableRowColumn>
                <TableRowColumn width={100}>
                    
                    {mob.vnum}
                </TableRowColumn>
                <TableRowColumn>
                    <Paper style={{width:"1em", height:"1em", marginRight:"0.5em", textAlign:"center", display:"inline-block", color:this.props.muiTheme.palette.disabledColor}} zDepth={1} circle={true}>{mob.unique ? "U": "S"}</Paper>
                    {mob.sdesc}
                </TableRowColumn>
                <TableRowColumn>{mob.level}</TableRowColumn>
                <TableRowColumn>{mob.sex ? mob.sex.code : ""}</TableRowColumn>
                <TableRowColumn>{mob.race ? mob.race.code : ""}</TableRowColumn>
                <TableRowColumn>{mob.mob_class ? mob.mob_class.code : ""}</TableRowColumn>
            </TableRow>
            ))
    }

    render() {
        let mob = this.get_mob_by_uuid(this.props.ui_state.mob_current_mob)
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
                id={this.props.ui_state.mob_current_mob} // So confirmDelete can pull the correct uuid
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
        return (
            <div>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn width={100}>Edit</TableHeaderColumn>
                        <TableHeaderColumn width={100}>vnum</TableHeaderColumn>
                        <TableHeaderColumn>Short description</TableHeaderColumn>
                        <TableHeaderColumn>Level</TableHeaderColumn>
                        <TableHeaderColumn>Sex</TableHeaderColumn>
                        <TableHeaderColumn>Race</TableHeaderColumn>
                        <TableHeaderColumn>Class</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.generateItems()}
                    <TableRow>
                        <TableRowColumn width={100}>
                            <IconButton tooltip="Add" onClick={this.handleNew}>
                                <FontIcon className="material-icons">add_box</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
            {mob !== undefined &&
            <React.Fragment>
                <MobEditor open={this.props.ui_state.mob_editor_open} />
                <Dialog open={this.props.ui_state.mob_confirm_delete_open} actions={confirmActions} modal={false} title={`Delete ${mob.sdesc}?`}>{`Are you sure you want to delete mob ${mob.vnum} (${mob.sdesc})? You cannot undo this action!`}</Dialog>
                <Dialog open={this.props.ui_state.mob_errors_open} actions={errorsActions} modal={false} title={`Errors for mob ${mob.vnum}`}>
                    <List>
                        {mob_validator.validate_state(this.props.state, mob).map((error, index) => (
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
        const actions = [
        <FlatButton label="Done" primary={true} onClick={this.props.handleClose} />,
        ];
        var uniqueTab = (this.props.mob.unique ? (
            <React.Fragment>
                <Validate validator={mob_validator}>
                <MultiFlagSelector 
                    id="affect_flags" 
                    label="Act Flags" 
                    flags={MOB_AFFECTS} 
                    value={this.props.mob.affect_flags} 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <FlagSelector 
                    id="virtual_armor_type" 
                    label="Virtual Armor Type" 
                    flags={ITEM_ARMOR_TYPES} 
                    value={this.props.mob.virtual_armor_type} 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <FlagSelector 
                    id="virtual_armor_material" 
                    label="Virtual Armor Material" 
                    flags={ITEM_MATERIALS} 
                    value={this.props.mob.virtual_armor_material} 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <FlagSelector 
                    id="alignment" 
                    label="Alignment" 
                    flags={MOB_ALIGNMENTS} 
                    value={this.props.mob.alignment} 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="STR" 
                    id="str" 
                    value={this.props.mob.str} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="INT" 
                    id="int" 
                    value={this.props.mob.int} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="WIS" 
                    id="wis" 
                    value={this.props.mob.wis} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="DEX" 
                    id="dex" 
                    value={this.props.mob.dex} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="CON" 
                    id="con" 
                    value={this.props.mob.con} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="CHA" 
                    id="cha" 
                    value={this.props.mob.cha} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="LCK" 
                    id="lck" 
                    value={this.props.mob.lck} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <MultiFlagSelector 
                    id="ris_resistant" 
                    label="Resistant" 
                    flags={MOB_RIS} 
                    value={this.props.mob.ris_resistant} 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <MultiFlagSelector 
                    id="ris_immune" 
                    label="Immune" 
                    flags={MOB_RIS} 
                    value={this.props.mob.ris_immune} 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                <MultiFlagSelector 
                    id="ris_susceptible" 
                    label="Susceptible" 
                    flags={MOB_RIS} 
                    value={this.props.mob.ris_susceptible} 
                    onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                </Validate>
                <RaisedButton 
                    id="makeSimpleMob" 
                    label="Convert to Simple Mob?" 
                    primary={true} 
                    keyboardFocused={true} 
                    onClick={()=>(this.props.convertToSimple(this.props.mob.uuid))}/>
            </React.Fragment>
            ) : (
            <RaisedButton 
                id="makeUniqueMob" 
                label="Convert to Unique Mob?" 
                primary={true} 
                keyboardFocused={true} 
                onClick={()=>(this.props.convertToUnique(this.props.mob.uuid))}/>
        ))
        return (
            <Dialog title={`Edit ${this.props.mob.unique ? "Unique": "Simple"} Mob`} modal={false} open={this.props.open} actions={actions} onRequestClose={this.props.handleClose} autoScrollBodyContent={true}>
                <Tabs>
                    <Tab label="Descriptions">
                        <Validate validator={mob_validator}>
                        <TextField 
                            floatingLabelText="vnum" 
                            id="vnum" 
                            value={this.props.mob.vnum} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Short description" 
                            id="sdesc" 
                            value={this.props.mob.sdesc} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Long description" 
                            id="ldesc" 
                            fullWidth={true} 
                            value={this.props.mob.ldesc} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Keywords" 
                            id="keywords" 
                            fullWidth={true} 
                            value={this.props.mob.keywords} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Full description" 
                            id="fulldesc" 
                            multiLine={true} 
                            rows={5} 
                            fullWidth={true} 
                            value={this.props.mob.fulldesc} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Validate>
                    </Tab>
                    <Tab label="Details">
                        <Validate validator={mob_validator}>
                        <TextField 
                            floatingLabelText="Level" 
                            id="level" 
                            value={this.props.mob.level} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <FlagWithCategorySelector 
                            id="mob_class" 
                            label="Class" 
                            flags={MOB_CLASSES} 
                            value={this.props.mob.mob_class} 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="race" 
                            label="Race" 
                            flags={MOB_RACES} 
                            value={this.props.mob.race} 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="sex" 
                            label="Sex" 
                            flags={MOB_SEXES} 
                            value={this.props.mob.sex} 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="position" 
                            label="Position" 
                            flags={MOB_POSITIONS} 
                            value={this.props.mob.position} 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="deity" 
                            label="Deity" 
                            flags={MOB_DEITIES} 
                            value={this.props.mob.deity} 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <MultiFlagSelector 
                            id="act_flags" 
                            label="Act Flags" 
                            flags={MOB_ACT_FLAGS} 
                            value={this.props.mob.act_flags} 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <MultiFlagSelector 
                            id="understood_languages" 
                            label="Understood Languages" 
                            flags={LANGUAGE_FLAGS} 
                            value={this.props.mob.understood_languages} 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        <MultiFlagSelector 
                            id="spoken_languages" 
                            label="Spoken Languages" 
                            flags={LANGUAGE_FLAGS} 
                            value={this.props.mob.spoken_languages} 
                            onChange={(e,v)=>(this.props.setProp(this.props.mob.uuid, e.target.id, v))} />
                        </Validate>
                    </Tab>
                    <Tab label="Unique">
                        {uniqueTab}
                    </Tab>
                    <Tab label="Training">
                        <Subheader>Skills</Subheader>
                        <CanTrainSkillEditor id="can_train_skill" pointer={this.props.mob.uuid} />
                        <Subheader>Weapon Skills</Subheader>
                        <CanTrainWeaponSkillEditor id="can_train_weapon_skill" pointer={this.props.mob.uuid} />
                        <Subheader>Spells</Subheader>
                        <CanTrainSpellEditor id="can_train_spell" pointer={this.props.mob.uuid} />
                        <Subheader>Levels</Subheader>
                        <CanTrainLevelEditor id="can_train_level" pointer={this.props.mob.uuid} />
                        <Subheader>Statistics</Subheader>
                        <CanTrainStatisticEditor id="can_train_statistic" pointer={this.props.mob.uuid} />
                        <Subheader>Feats</Subheader>
                        <CanTrainFeatEditor id="can_train_feat" pointer={this.props.mob.uuid} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor 
                            id="programs" 
                            pointer={this.props.mob.uuid}
                            triggers={MOB_PROGRAM_TRIGGERS} />
                    </Tab>
                    <Tab label="Shops">
                        <ShopsEditor id="shop" vnum={this.props.mob.vnum} />
                        <RepairsEditor id="repairs" vnum={this.props.mob.vnum} />
                    </Tab>
                    <Tab label="Resets">
                        <MobResetsEditor id="mob_resets" vnum={this.props.mob.vnum} />
                    </Tab>
                </Tabs>
            </Dialog>
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
        convertToSimple: (uuid) => {dispatch({ type:MobActions.CONVERT_TO_SIMPLE })},
        convertToUnique: (uuid) => {dispatch({ type:MobActions.CONVERT_TO_UNIQUE })},
        setProp: (index, key, value) => {dispatch({ type:MobActions.SET_PROP, index, key, value })},
    })
)(MobEditor)

class ShopsEditor extends React.Component {
    render() {
        let model = this.props.shops.filter(s=>(s.shopkeeper===this.props.vnum))[0]
        return (
            <Card expanded={model!==undefined} title="Shopkeeper">
                <CardText>
                    <Toggle 
                        toggled={model!==undefined}
                        onToggle={()=>(this.props.handleToggle(model, this.props.vnum))}
                        labelPosition="right"
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
                        <TextField 
                            floatingLabelText="Profit (Buy)" 
                            id="profit_buy" 
                            value={model.profit_buy} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Profit (Sell)" 
                            id="profit_sell" 
                            value={model.profit_sell} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Open Hour" 
                            id="open_hour" 
                            value={model.open_hour} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Close Hour" 
                            id="close_hour" 
                            value={model.close_hour} 
                            autoComplete="off" 
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
                    <Toggle 
                        toggled={model!==undefined}
                        onToggle={()=>(this.props.handleToggle(model, this.props.vnum))}
                        labelPosition="right"
                        label="Repairs" />
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
                        <TextField 
                            floatingLabelText="Profit Modifier" 
                            id="profit_modifier" 
                            value={model.profit_modifier} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <FlagSelector 
                            id="repair" 
                            label="Repair/Recharge" 
                            flags={MOB_REPAIR_RECHARGE} 
                            value={model.repair} 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Open Hour" 
                            id="open_hour" 
                            value={model.open_hour} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(model.uuid, e.target.id, v))} />
                        <TextField 
                            floatingLabelText="Close Hour" 
                            id="close_hour" 
                            value={model.close_hour} 
                            autoComplete="off" 
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
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={mob_reset_validator}>
                <TextField 
                    floatingLabelText="Limit" 
                    id="mob_limit" 
                    value={resets.mob_limit} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                <VnumAutoComplete 
                    floatingLabelText="Starting Room"
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
                    <FontIcon className="material-icons">add_box</FontIcon>
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
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={equipment_reset_validator}>
                <VnumAutoComplete 
                    floatingLabelText="Item" 
                    id="item" 
                    value={resets.item} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} 
                    dataSource={this.props.items} />
                <TextField 
                    floatingLabelText="Equip Limit" 
                    id="equip_limit" 
                    value={resets.equip_limit} 
                    autoComplete="off" 
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
                    <Subheader>Equipment</Subheader>
                    {this.generate()}
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                        <FontIcon className="material-icons">add_box</FontIcon>
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
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={coin_reset_validator}>
                <FlagSelector 
                    id="coin_type" 
                    label="Coin Type" 
                    flags={ITEM_COIN_TYPES} 
                    value={resets.coin_type} 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="Dice Count" 
                    id="dice_count" 
                    value={resets.dice_count} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="Dice Sides" 
                    id="dice_sides" 
                    value={resets.dice_sides} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(resets.uuid, e.target.id, v))} />
                </Validate>
            </Paper>
        ));
    }
    
    render() {
        return (
            <React.Fragment>
                <Paper style={paper_style}>
                    <Subheader>Coins</Subheader>
                    {this.generate()}
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                        <FontIcon className="material-icons">add_box</FontIcon>
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
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            {this.props.headers.map((h)=>(<TableHeaderColumn key={h}>{h}</TableHeaderColumn>))}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.props.children}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={this.props.handleNew}>
                                    <FontIcon className="material-icons">add_box</FontIcon>
                                </IconButton>
                            </TableRowColumn>
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
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <Validate validator={can_train_skill_validator}>
                    <TextField 
                        id="level" 
                        value={skill.level} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_skill_validator}>
                    <TextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_skill_validator}>
                    <FlagSelector 
                        id="skill" 
                        label="Skill" 
                        flags={MOB_SKILLS} 
                        value={skill.skill} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
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
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <Validate validator={can_train_weapon_skill_validator}>
                    <TextField 
                        id="level" 
                        value={skill.level} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_weapon_skill_validator}>
                    <TextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_weapon_skill_validator}>
                    <FlagSelector 
                        id="weapon_skill" 
                        label="Weapon Skill" 
                        flags={MOB_WEAPON_SKILLS} 
                        value={skill.weapon_skill} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
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
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <Validate validator={can_train_spell_validator}>
                    <TextField 
                        id="level" 
                        value={skill.level} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_spell_validator}>
                    <TextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_spell_validator}>
                    <FlagSelector 
                        id="spell" 
                        label="Spell" 
                        flags={MOB_SPELLS} 
                        value={skill.spell} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
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
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <Validate validator={can_train_level_validator}>
                    <TextField 
                        id="level" 
                        value={skill.level} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_level_validator}>
                    <TextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
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
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleDelete(skill.uuid))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <Validate validator={can_train_statistic_validator}>
                    <TextField 
                        id="level" 
                        value={skill.level} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_statistic_validator}>
                    <TextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_statistic_validator}>
                    <FlagSelector 
                        id="statistic" 
                        label="Statistic" 
                        flags={MOB_STATISTICS} 
                        value={skill.statistic} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
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
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.removeSkill(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <Validate validator={can_train_feat_validator}>
                    <TextField 
                        id="level" 
                        value={skill.level} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_feat_validator}>
                    <TextField 
                        id="price_multiplier" 
                        value={skill.price_multiplier} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={can_train_feat_validator}>
                    <FlagSelector 
                        id="feat" 
                        label="Feat" 
                        flags={MOB_FEATS} 
                        value={skill.feat} 
                        onChange={(e,v)=>(this.props.setProp(skill.uuid, e.target.id, v))} />
                    </Validate>
                </TableRowColumn>
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

export default muiThemeable()(MobPanel);