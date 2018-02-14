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
    ITEM_TYPES,
    MOB_REPAIR_MATERIAL,
    MOB_REPAIR_RECHARGE,
    MOB_WEAR_POSITIONS
}
from '../Models/flags';
import {
    SimpleMob,
    UniqueMob,
    Program,
    TrainSkill,
    TrainWeaponSkill,
    TrainSpell,
    TrainLevel,
    TrainStatistic,
    TrainFeat,
    Shop,
    RepairRecharge,
    MobReset,
    EquipmentReset
}
from '../Models/are_model'
import {
    FlagWithCategorySelector,
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

class MobPanel extends React.Component {
    state = {
        open: false,
        current_mob: 0,
        confirm_delete_open: false,
        confirm_text: "",
        confirm_title: "",
        errors_open: false
    }
    
    handleEdit = (index) => {
        this.setState({current_mob: index});
        this.setState({open: true});
    };
    handleChange(event, value) {
        console.log("MobPanel", this.state.current_mob, value);
        let area = this.props.area.clone()
        area.mobs[this.state.current_mob] = value;
        this.updateArea(area);
    }
    
    handleDelete = (index) => {
        this.setState({
            current_mob: index,
            confirm_text: `Are you sure you want to delete mob ${this.props.area.mobs[index].vnum} (${this.props.area.mobs[index].sdesc})? You cannot undo this action!`,
            confirm_title: `Delete ${this.props.area.mobs[index].sdesc}?`,
            confirm_delete_open: true
        });
    };
    
    confirmDelete = () => {
        let area = this.props.area.clone();
        area.mobs.splice(this.state.current_mob, 1);
        this.setState({current_mob: 0});
        this.updateArea(area);
        this.setState({confirm_delete_open: false});
    }
    
    cancelDelete = () => {
        this.setState({confirm_delete_open: false});
    }
    
    handleNew = () => {
        let new_mob = new SimpleMob();
        let area = this.props.area.clone();
        area.mobs.push(new_mob);
        this.updateArea(area);
        this.setState({open: true, current_mob: area.mobs.length-1});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };
    
    updateArea(area) {
        this.props.updateArea(area);
    }
    
    showErrors = (index) => {
        this.setState({
            current_mob: index,
            errors_open: true
        });
    }
    
    closeErrors = (index) => {
        this.setState({
            current_mob: 0,
            errors_open: false
        });
    }
    
    generateItems(mobs) {
        return mobs.map((mob, index) => (
            <TableRow key={index}>
                <TableRowColumn width={100}>
                    <IconButton tooltip="Edit" onClick={() => (this.handleEdit(index))} style={icon_button_style}>
                        <FontIcon className="material-icons">mode_edit</FontIcon>
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={()=>(this.handleDelete(index))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={red900}>delete_forever</FontIcon>
                    </IconButton>
                    {mob.validate().length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={()=>(this.showErrors(index))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>
                    </IconButton>
                    )}
                </TableRowColumn>
                <TableRowColumn width={100}>
                    
                    {mob.vnum}
                </TableRowColumn>
                <TableRowColumn>
                    <Paper style={{width:"1em", height:"1em", marginRight:"0.5em", textAlign:"center", display:"inline-block", color:this.props.muiTheme.palette.disabledColor}} zDepth={1} circle={true}>{mob instanceof UniqueMob ? "U": "S"}</Paper>
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
                        <TableHeaderColumn>Level</TableHeaderColumn>
                        <TableHeaderColumn>Sex</TableHeaderColumn>
                        <TableHeaderColumn>Race</TableHeaderColumn>
                        <TableHeaderColumn>Class</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.generateItems(this.props.area.mobs)}
                    <TableRow>
                        <TableRowColumn width={100}>
                            <IconButton tooltip="Add" onClick={this.handleNew}>
                                <FontIcon className="material-icons">add_box</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
            <MobEditor open={this.state.open} handleClose={this.handleClose} model={this.props.area.mobs[this.state.current_mob]} rooms={this.props.area.rooms} onChange={this.handleChange.bind(this)} />
            <Dialog open={this.state.confirm_delete_open} actions={confirmActions} modal={false} title={this.state.confirm_title}>{this.state.confirm_text}</Dialog>
            <Dialog open={this.state.errors_open} actions={errorsActions} modal={false} title={`Errors for mob ${this.props.area.mobs[this.state.current_mob].vnum}`}>
                <List>
                    {this.props.area.mobs[this.state.current_mob].validate().map((error, index) => (
                        <ListItem key={index} primaryText={error} leftIcon={<FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>} />
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

class MobEditor extends ModelComponent {
    modelClass = SimpleMob;
    
    handleRepairsToggle() {
        let model = this.props.model.clone();
        if (model.repairs === null) {
            model.repairs = new RepairRecharge();
            model.repairs.shopkeeper = model;
        }
        else {
            model.repairs = null;
        }
        this.props.onChange({target:this.props}, model);
    }
    
    convertToSimple() {
        let old_mob = this.props.model.clone()
        for (let field of ["affect_flags", "virtual_armor_type", "virtual_armor_material", "alignment", "str", "int", "wis", "dex", "con", "cha", "lck", "ris_resistant", "ris_immune", "ris_susceptible"]) {
            delete old_mob._fields[field];
            delete old_mob[field];
        }
        let model = new SimpleMob(old_mob);
        this.props.onChange({target:this.props}, model);
    }
    
    convertToUnique() {
        let model = new UniqueMob(this.props.model.clone());
        this.props.onChange({target:this.props}, model);
    }
    
    render() {
        const actions = [
        <FlatButton label="Done" primary={true} onClick={this.props.handleClose} />,
        ];
        var uniqueTab = (this.props.model instanceof UniqueMob ? (
            <React.Fragment>
                <MultiFlagSelector id="affect_flags" label="Act Flags" flags={MOB_AFFECTS} value={this.props.model.affect_flags} onChange={this.handleChange.bind(this)} />
                <FlagSelector id="virtual_armor_type" label="Virtual Armor Type" flags={ITEM_ARMOR_TYPES} value={this.props.model.virtual_armor_type} onChange={this.handleChange.bind(this)} />
                <FlagSelector id="virtual_armor_material" label="Virtual Armor Material" flags={ITEM_MATERIALS} value={this.props.model.virtual_armor_material} onChange={this.handleChange.bind(this)} />
                <FlagSelector id="alignment" label="Alignment" flags={MOB_ALIGNMENTS} value={this.props.model.alignment} onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="STR" id="str" value={this.props.model.str} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="INT" id="int" value={this.props.model.int} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="WIS" id="wis" value={this.props.model.wis} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="DEX" id="dex" value={this.props.model.dex} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="CON" id="con" value={this.props.model.con} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="CHA" id="cha" value={this.props.model.cha} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="LCK" id="lck" value={this.props.model.lck} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <MultiFlagSelector id="ris_resistant" label="Resistant" flags={MOB_RIS} value={this.props.model.ris_resistant} onChange={this.handleChange.bind(this)} />
                <MultiFlagSelector id="ris_immune" label="Immune" flags={MOB_RIS} value={this.props.model.ris_immune} onChange={this.handleChange.bind(this)} />
                <MultiFlagSelector id="ris_susceptible" label="Susceptible" flags={MOB_RIS} value={this.props.model.ris_susceptible} onChange={this.handleChange.bind(this)} />
                <RaisedButton id="makeSimpleMob" label="Convert to Simple Mob?" primary={true} keyboardFocused={true} onClick={this.convertToSimple.bind(this)}/>
            </React.Fragment>
            ) : (
            <RaisedButton id="makeUniqueMob" label="Convert to Unique Mob?" primary={true} keyboardFocused={true} onClick={this.convertToUnique.bind(this)}/>
        ))
        return (
            <Dialog title={`Edit ${this.props.model instanceof UniqueMob ? "Unique": "Simple"} Mob`} modal={false} open={this.props.open} actions={actions} onRequestClose={this.props.handleClose} autoScrollBodyContent={true}>
                <Tabs>
                    <Tab label="Descriptions">
                        <TextField floatingLabelText="vnum" id="vnum" value={this.props.model.vnum} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Short description" id="sdesc" value={this.props.model.sdesc} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Long description" id="ldesc" fullWidth={true} value={this.props.model.ldesc} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Keywords" id="keywords" fullWidth={true} value={this.props.model.keywords} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Full description" id="fulldesc" multiLine={true} rows={5} fullWidth={true} value={this.props.model.fulldesc} autoComplete="off" onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Details">
                        <TextField floatingLabelText="Level" id="level" value={this.props.model.level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <FlagWithCategorySelector id="mob_class" label="Class" flags={MOB_CLASSES} value={this.props.model.mob_class} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="race" label="Race" flags={MOB_RACES} value={this.props.model.race} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="sex" label="Sex" flags={MOB_SEXES} value={this.props.model.sex} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="position" label="Position" flags={MOB_POSITIONS} value={this.props.model.position} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="deity" label="Deity" flags={MOB_DEITIES} value={this.props.model.deity} onChange={this.handleChange.bind(this)} />
                        <MultiFlagSelector id="act_flags" label="Act Flags" flags={MOB_ACT_FLAGS} value={this.props.model.act_flags} onChange={this.handleChange.bind(this)} />
                        <MultiFlagSelector id="understood_languages" label="Act Flags" flags={MOB_LANGUAGES} value={this.props.model.understood_languages} onChange={this.handleChange.bind(this)} />
                        <MultiFlagSelector id="spoken_languages" label="Act Flags" flags={MOB_LANGUAGES} value={this.props.model.spoken_languages} onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Unique">
                        {uniqueTab}
                    </Tab>
                    <Tab label="Training">
                        <Subheader>Skills</Subheader>
                        <CanTrainSkillEditor id="can_train_skill" model={this.props.model.can_train_skill} onChange={this.handleChange.bind(this)} />
                        <Subheader>Weapon Skills</Subheader>
                        <CanTrainWeaponSkillEditor id="can_train_weapon_skill" model={this.props.model.can_train_weapon_skill} onChange={this.handleChange.bind(this)} />
                        <Subheader>Spells</Subheader>
                        <CanTrainSpellEditor id="can_train_spell" model={this.props.model.can_train_spell} onChange={this.handleChange.bind(this)} />
                        <Subheader>Levels</Subheader>
                        <CanTrainLevelEditor id="can_train_level" model={this.props.model.can_train_level} onChange={this.handleChange.bind(this)} />
                        <Subheader>Statistics</Subheader>
                        <CanTrainStatisticEditor id="can_train_statistic" model={this.props.model.can_train_statistic} onChange={this.handleChange.bind(this)} />
                        <Subheader>Feats</Subheader>
                        <CanTrainFeatEditor id="can_train_feat" model={this.props.model.can_train_feat} onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor id="programs" model={this.props.model.programs} onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Shops">
                        <ShopsEditor id="shop" model={this.props.model.shop} mob={this.props.model} onChange={this.handleChange.bind(this)} />
                        <RepairsEditor id="repairs" model={this.props.model.repairs} mob={this.props.model} onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Resets">
                        <MobResetsEditor model={this.props.model.mob_resets} mob={this.props.model} rooms={this.props.rooms} onChange={this.handleChange.bind(this)} />
                    </Tab>
                </Tabs>
            </Dialog>
        )
    }
}

class ShopsEditor extends ModelComponent {
    handleShopToggle() {
        var model;
        if (this.props.model === null) {
            model = new Shop();
            model.shopkeeper = this.props.mob;
        }
        else {
            model = null;
        }
        this.props.onChange({target:this.props}, model);
    }
    render() {
        return (
            <Card   expanded={this.props.model!==null}
                    title="Shopkeeper">
                <CardText>
                    <Toggle toggled={this.props.model!==null}
                        onToggle={this.handleShopToggle.bind(this)}
                        labelPosition="right"
                        label="Shopkeeper"
                    />
                </CardText>
                <CardText expandable={true}>
                    {this.props.model && (
                        <React.Fragment>
                        <FlagSelector id="will_buy_1" label="Will Buy 1" flags={ITEM_TYPES} value={this.props.model.will_buy_1} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="will_buy_2" label="Will Buy 2" flags={ITEM_TYPES} value={this.props.model.will_buy_2} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="will_buy_3" label="Will Buy 3" flags={ITEM_TYPES} value={this.props.model.will_buy_3} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="will_buy_4" label="Will Buy 4" flags={ITEM_TYPES} value={this.props.model.will_buy_4} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="will_buy_5" label="Will Buy 5" flags={ITEM_TYPES} value={this.props.model.will_buy_5} onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Profit (Buy)" id="profit_buy" value={this.props.model.profit_buy} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Profit (Sell)" id="profit_sell" value={this.props.model.profit_sell} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Open Hour" id="open_hour" value={this.props.model.open_hour} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Close Hour" id="close_hour" value={this.props.model.close_hour} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        </React.Fragment>
                    )}
                </CardText>
            </Card>
        )
    }
}

class RepairsEditor extends ModelComponent {
    handleRepairsToggle() {
        var model;
        if (this.props.model === null) {
            model = new RepairRecharge();
            model.shopkeeper = this.props.mob;
        }
        else {
            model = null;
        }
        this.props.onChange({target:this.props}, model);
    }
    render() {
        return (
            <Card   expanded={this.props.model!==null}
                    title="Repairer">
                <CardText>
                    <Toggle toggled={this.props.model!==null}
                        onToggle={this.handleRepairsToggle.bind(this)}
                        labelPosition="right"
                        label="Repairs"
                    />
                </CardText>
                <CardText expandable={true}>
                    {this.props.model && (
                        <React.Fragment>
                        <FlagSelector id="will_repair_1" label="Will Repair 1" flags={ITEM_TYPES} value={this.props.model.will_repair_1} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="will_repair_2" label="Will Repair 2" flags={ITEM_TYPES} value={this.props.model.will_repair_2} onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="repair_material" label="Repair Material" flags={MOB_REPAIR_MATERIAL} value={this.props.model.repair_material} onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Profit Modifier" id="profit_modifier" value={this.props.model.profit_modifier} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <FlagSelector id="repair" label="Repair/Recharge" flags={MOB_REPAIR_RECHARGE} value={this.props.model.repair} onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Open Hour" id="open_hour" value={this.props.model.open_hour} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        <TextField floatingLabelText="Close Hour" id="close_hour" value={this.props.model.close_hour} autoComplete="off" onChange={this.handleChange.bind(this)} />
                        </React.Fragment>
                    )}
                </CardText>
            </Card>
        )
    }
}

class MobResetsEditor extends ModelArrayComponent {
    modelClass = MobReset;
    generate() {
        return this.props.model.map((resets, index) => (
            <Paper key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.handleDelete(index))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <TextField floatingLabelText="Limit" id="mob_limit" value={resets.mob_limit} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <VnumAutoComplete floatingLabelText="Starting Room" id="target_vnum" value={resets.room} onChange={(e,v)=>(this.handleChange(e,v,index))} dataSource={this.props.rooms} />
                <EquipmentResetsEditor id="equipment" model={this.props.model[index].equipment} mob_reset={this.props.model} onChange={(e,v)=>(this.handleChange(e,v,index))} />
            </Paper>
        ));
    }
    
    handleNew() {
        let mob_reset = new MobReset()
        let model = this.props.model.map((item)=>(item.clone())); // Create working copy of state object
        mob_reset.mob = this.props.mob;
        model.push(mob_reset);
        this.props.onChange({target:this.props}, model);
    }
}

class EquipmentResetsEditor extends ModelArrayComponent {
    modelClass = EquipmentReset;
    generate() {
        return this.props.model.map((resets, index) => (
            <Paper key={index}>
                <IconButton tooltip="Add" onClick={()=>(this.handleDelete(index))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <VnumAutoComplete floatingLabelText="Item" id="item" value={resets.item} onChange={(e,v)=>(this.handleChange(e,v,index))} dataSource={this.props.area.items} />
                <TextField floatingLabelText="Equip Limit" id="equip_limit" value={resets.equip_limit} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <FlagSelector id="wear_loc" label="Wear Location" flags={MOB_WEAR_POSITIONS} value={resets.wear_loc} onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <TrapResetEditor id="trap_reset" item={resets} onChange={(e,v)=>(this.handleChange(e,v,index))} />
            </Paper>
        ));
    }
    
    render() {
        return (
            <React.Fragment>
                <Paper style={paper_style}>
                    <Subheader>Equipment</Subheader>
                    {super.render()}
                </Paper>
            </React.Fragment>
        )
    }
}



class CanTrainRenderer extends ModelArrayComponent {
    render() {
        return (
            <React.Fragment>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            {this.headers.map((h)=>(<TableHeaderColumn key={h}>{h}</TableHeaderColumn>))}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.generate()}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
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

class CanTrainSkillEditor extends CanTrainRenderer {
    modelClass=TrainSkill;
    headers=["Max Level", "Price Multiplier", "Skill"]
    generate() {
        return this.props.model.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.handleDelete(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id="level" value={skill.level} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id="price_multiplier" value={skill.price_multiplier} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id="skill" label="Skill" flags={MOB_SKILLS} value={skill.skill} onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
            </TableRow>
        ));
    }
}
class CanTrainWeaponSkillEditor extends CanTrainRenderer {
    modelClass=TrainWeaponSkill;
    headers=["Max Level", "Price Multiplier", "Weapon Skill"]
    generate() {
        return this.props.model.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.remove(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id="level" value={skill.level} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id="price_multiplier" value={skill.price_multiplier} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id="weapon_skill" label="Weapon Skill" flags={MOB_WEAPON_SKILLS} value={skill.weapon_skill} onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
            </TableRow>
        ));
    }
}
class CanTrainSpellEditor extends CanTrainRenderer {
    modelClass=TrainSpell;
    headers=["Max Level", "Price Multiplier", "Spell"]
    generate() {
        return this.props.model.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.handleDelete(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id="level" value={skill.level} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id="price_multiplier" value={skill.price_multiplier} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id="spell" label="Spell" flags={MOB_SPELLS} value={skill.spell} onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
            </TableRow>
        ));
    }
}
class CanTrainLevelEditor extends CanTrainRenderer {
    modelClass=TrainLevel;
    headers=["Max Level", "Price Multiplier"]
    generate() {
        return this.props.model.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.handleDelete(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id="level" value={skill.level} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id="price_multiplier" value={skill.price_multiplier} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
            </TableRow>
        ));
    }
}
class CanTrainStatisticEditor extends CanTrainRenderer {
    modelClass=TrainStatistic;
    headers=["Max Level", "Price Multiplier", "Statistic"]
    generate() {
        return this.props.model.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.handleDelete(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id="level" value={skill.level} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id="price_multiplier" value={skill.price_multiplier} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id="statistic" label="Statistic" flags={MOB_STATISTICS} value={skill.statistic} onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
            </TableRow>
        ));
    }
}
class CanTrainFeatEditor extends CanTrainRenderer {
    modelClass=TrainFeat;
    headers=["Max Level", "Price Multiplier", "Feat"]
    generate() {
        return this.props.model.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.removeSkill(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id="level" value={skill.level} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id="price_multiplier" value={skill.price_multiplier} autoComplete="off" onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id="feat" label="Feat" flags={MOB_FEATS} value={skill.feat} onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </TableRowColumn>
            </TableRow>
        ));
    }
}

export default muiThemeable()(MobPanel);