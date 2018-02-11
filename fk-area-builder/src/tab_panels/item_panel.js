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
    ITEM_TYPES,
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
    ITEM_ATTRIBUTES,
    WEAR_LOCATIONS,
    ITEM_QUALITY,
    ITEM_CONDITION,
    ITEM_SIZES
}
from '../Models/flags';
import {
    Item,
    ExtraDescription,
    UniqueMob,
    Program,
    TrainSkill,
    TrainWeaponSkill,
    TrainSpell,
    TrainLevel,
    TrainStatistic,
    TrainFeat
}
from '../Models/are_model'
import {
    FlagWithCategorySelector,
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

class ItemPanel extends React.Component {
    state = {
        open: false,
        current_item: 0,
        confirm_delete_open: false,
        confirm_text: "",
        confirm_title: "",
        errors_open: false
    }
    
    handleEdit = (index) => {
        this.setState({current_item: index});
        this.setState({open: true});
    };
    
    handleDelete = (index) => {
        this.setState({
            current_item: index,
            confirm_text: `Are you sure you want to delete item ${this.props.area.items[index].vnum} (${this.props.area.items[index].sdesc})? You cannot undo this action!`,
            confirm_title: `Delete ${this.props.area.items[index].sdesc}?`,
            confirm_delete_open: true
        });
    };
    
    confirmDelete = () => {
        let area = this.props.area.clone();
        area.items.splice(this.state.current_item, 1);
        this.setState({current_item: 0});
        this.updateArea(area);
        this.setState({confirm_delete_open: false});
    }
    
    cancelDelete = () => {
        this.setState({confirm_delete_open: false});
    }
    
    handleNew = () => {
        let new_item = new Item();
        let area = this.props.area.clone();
        area.items.push(new_item);
        this.updateArea(area);
        this.setState({open: true, current_item: area.items.length-1});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };
    
    updateArea(area) {
        this.props.onChange(area);
    }
    
    showErrors = (index) => {
        this.setState({
            current_item: index,
            errors_open: true
        });
    }
    
    closeErrors = (index) => {
        this.setState({
            current_item: 0,
            errors_open: false
        });
    }
    
    generateItems(items) {
        return items.map((item, index) => (
            <TableRow key={index}>
                <TableRowColumn width={100}>
                    <IconButton tooltip="Edit" onClick={() => (this.handleEdit(index))} style={icon_button_style}>
                        <FontIcon className="material-icons">mode_edit</FontIcon>
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={()=>(this.handleDelete(index))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={red900}>delete_forever</FontIcon>
                    </IconButton>
                    {item.validate().length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={()=>(this.showErrors(index))} style={icon_button_style}>
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
                        <TableHeaderColumn>Item type</TableHeaderColumn>
                        <TableHeaderColumn>Material</TableHeaderColumn>
                        <TableHeaderColumn>Size</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.generateItems(this.props.area.items)}
                    <TableRow>
                        <TableRowColumn width={100}>
                            <IconButton tooltip="Add" onClick={this.handleNew}>
                                <FontIcon className="material-icons">add_box</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
            <ItemEditor open={this.state.open} handleClose={this.handleClose} updateArea={this.updateArea.bind(this)} current_item={this.state.current_item} area={this.props.area} />
            <Dialog open={this.state.confirm_delete_open} actions={confirmActions} modal={false} title={this.state.confirm_title}>{this.state.confirm_text}</Dialog>
            <Dialog open={this.state.errors_open} actions={errorsActions} modal={false} title={`Errors for item ${this.props.area.items[this.state.current_item].vnum}`}>
                <List>
                    {this.props.area.items[this.state.current_item].validate().map((error, index) => (
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

const item_type_ldesc_style = {
    color: "rgba(180,180,180,1)",
    //lineHeight: "15px",
    //fontStyle: "italic",
    marginLeft: "10px",
    whiteSpace: "normal"
}

class ItemEditor extends React.Component {
    handleChanges(event, value, index) {
        let area = this.props.area.clone();
        let item = area.items[this.props.current_item];
        try {
            item[event.target.id] = value;
        } catch(e) {
            throw(e);
        }
        this.props.updateArea(area);
    }
    
    render() {
        let item = this.props.area.items[this.props.current_item]
        const actions = [
        <FlatButton label="Done" primary={true} onClick={this.props.handleClose} />,
        ];
        let item_type_fields = (
            <React.Fragment>
                <div>
                    {item.item_type.value0.type_enum ? (
                        <FlagSelector id="value0" label="Value 0" flags={item.item_type.value0.type_enum} value={item.value0} onChange={this.handleChanges.bind(this)} />
                    ) : (
                        <TextField id="value0" floatingLabelText="Value 0" value={item.value0} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    )}
                    <span style={item_type_ldesc_style}>{item.item_type.value0.ldesc}</span>
                </div>
                <div>
                    {item.item_type.value1.type_enum ? (
                        <FlagSelector id="value1" label="Value 1" flags={item.item_type.value1.type_enum} value={item.value1} onChange={this.handleChanges.bind(this)} />
                    ) : (
                        <TextField id="value1" floatingLabelText="Value 1" value={item.value1} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    )}
                    <span style={item_type_ldesc_style}>{item.item_type.value1.ldesc}</span>
                </div>
                <div>
                    {item.item_type.value2.type_enum ? (
                        <FlagSelector id="value2" label="Value 2" flags={item.item_type.value2.type_enum} value={item.value2} onChange={this.handleChanges.bind(this)} />
                    ) : (
                        <TextField id="value2" floatingLabelText="Value 2" value={item.value2} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    )}
                    <span style={item_type_ldesc_style}>{item.item_type.value2.ldesc}</span>
                </div>
                <div>
                    {item.item_type.value3.type_enum ? (
                        <FlagSelector id="value3" label="Value 3" flags={item.item_type.value3.type_enum} value={item.value3} onChange={this.handleChanges.bind(this)} />
                    ) : (
                        <TextField id="value3" floatingLabelText="Value 3" value={item.value3} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    )}
                    <span style={item_type_ldesc_style}>{item.item_type.value3.ldesc}</span>
                </div>
                <div>
                    {item.item_type.value4.type_enum ? (
                        <FlagSelector id="value4" label="Value 4" flags={item.item_type.value4.type_enum} value={item.value4} onChange={this.handleChanges.bind(this)} />
                    ) : (
                        <TextField id="value4" floatingLabelText="Value 4" value={item.value4} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    )}
                    <span style={item_type_ldesc_style}>{item.item_type.value4.ldesc}</span>
                </div>
            </React.Fragment>
        )
        console.log(item.validate("vnum"))
        return (
            <Dialog title={`Edit Item`} modal={false} open={this.props.open} actions={actions} onRequestClose={this.props.handleClose} autoScrollBodyContent={true}>
                <Tabs>
                    <Tab label="Descriptions">
                        <TextField floatingLabelText="vnum" id="vnum" errorText={item.validate("vnum")} value={item.vnum} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Short description" id="sdesc" errorText={item.validate("sdesc")} value={item.sdesc} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Long description" id="ldesc" errorText={item.validate("ldesc")} fullWidth={true} value={item.ldesc} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Keywords" id="keywords" errorText={item.validate("keywords")} fullWidth={true} value={item.keywords} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    </Tab>
                    <Tab label="Item Type">
                        <FlagSelector id="item_type" label="Item Type" errorText={item.validate("item_type")} flags={ITEM_TYPES} value={item.item_type} onChange={this.handleChanges.bind(this)} />
                        {item_type_fields}
                    </Tab>
                    <Tab label="Details">
                        <MultiFlagSelector id="attributes" errorText={item.validate("attributes")} label="Attributes" flags={ITEM_ATTRIBUTES} value={this.props.area.items[this.props.current_item].attributes} onChange={this.handleChanges.bind(this)} />
                        <MultiFlagSelector id="wear_flags" errorText={item.validate("wear_flags")} label="Wear Locations" flags={WEAR_LOCATIONS} value={this.props.area.items[this.props.current_item].wear_flags} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="quality" errorText={item.validate("quality")} label="Quality" flags={ITEM_QUALITY} value={item.quality} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="material" errorText={item.validate("material")} label="Materials" flags={ITEM_MATERIALS} value={item.material} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="condition" errorText={item.validate("condition")} label="Condition" flags={ITEM_CONDITION} value={item.condition} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="size" errorText={item.validate("size")} label="Sizes" flags={ITEM_SIZES} value={item.size} onChange={this.handleChanges.bind(this)} />
                    </Tab>
                    <Tab label="Extra Descs">
                        <ExtraDescriptionsEditor area={this.props.area} current_item={this.props.current_item} updateArea={this.props.updateArea} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor area={this.props.area} current_item={this.props.current_item} updateArea={this.props.updateArea} />
                    </Tab>
                </Tabs>
            </Dialog>  
        )
    }
}

class ExtraDescriptionsEditor extends React.Component {
    generateExtraDescriptions(ed) {
        return this.props.area.items[this.props.current_item].extra_descriptions.map((ed, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <TextField floatingLabelText="Keywords (space separated)" id={"keywords_"+index} fullWidth={true} value={ed.keywords} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Long description" id={"ldesc_"+index} multiLine={true} rows={5} fullWidth={true} value={ed.ldesc} autoComplete="off" onChange={this.handleChange.bind(this)} />
            </Paper>
        ));
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item].extra_descriptions[parseInt(event.target.id.split("_")[1])][event.target.id.split("_")[0]] = value;
        this.props.updateArea(area);
    }
    
    handleNew() {
        let area = this.props.area.clone();
        area.items[this.props.current_item].extra_descriptions.push(new ExtraDescription())
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <div>
                {this.generateExtraDescriptions(this.props.area.items[this.props.current_item].extra_descriptions)}
                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </div>
        )
    }
}

class ProgramsEditor extends React.Component {
    generatePrograms() {
        return this.props.area.items[this.props.current_item].programs.map((program, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <FlagSelector id={"trigger "+index} label="Trigger" flags={MOB_PROGRAM_TRIGGERS} value={program.trigger} onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Variable" id={"argument "+index} value={program.argument} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Program" id={"program "+index} multiLine={true} rows={5} fullWidth={true} value={program.program} autoComplete="off" onChange={this.handleChange.bind(this)} />
            </Paper>
        ));
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item].programs[parseInt(event.target.id.split(" ")[1])][event.target.id.split(" ")[0]] = value;
        this.props.updateArea(area);
    }
    
    handleNew() {
        let area = this.props.area.clone();
        area.items[this.props.current_item].programs.push(new Program())
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <React.Fragment>
                {this.generatePrograms()}
                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </React.Fragment>
        )
    }
}

class CanTrainEditor extends React.Component {
    generateSkills() {
        return this.props.area.items[this.props.current_item].can_train_skill.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.removeSkill(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id={"can_train_skill level "+index} value={skill.level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id={"can_train_skill price_multiplier "+index} value={skill.price_multiplier} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id={"can_train_skill skill "+index} label="Skill" flags={MOB_SKILLS} value={skill.skill} onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
            </TableRow>
        ));
    }
    handleNewSkill() {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_skill.push(new TrainSkill())
        this.props.updateArea(area);
    }
    removeSkill(index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_skill.splice(index, 1)
        this.props.updateArea(area);
    }
    
    generateWeaponSkills() {
        return this.props.area.items[this.props.current_item].can_train_weapon_skill.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.removeSkill(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id={"can_train_weapon_skill level "+index} value={skill.level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id={"can_train_weapon_skill price_multiplier "+index} value={skill.price_multiplier} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id={"can_train_weapon_skill weapon_skill "+index} label="Weapon Skill" flags={MOB_WEAPON_SKILLS} value={skill.weapon_skill} onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
            </TableRow>
        ));
    }
    handleNewWeaponSkill() {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_weapon_skill.push(new TrainWeaponSkill())
        this.props.updateArea(area);
    }
    removeWeaponSkill(index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_weapon_skill.slice(index, 1)
        this.props.updateArea(area);
    }
    
    generateSpells() {
        return this.props.area.items[this.props.current_item].can_train_spell.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.removeSkill(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id={"can_train_spell level "+index} value={skill.level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id={"can_train_spell price_multiplier "+index} value={skill.price_multiplier} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id={"can_train_spell spell "+index} label="Spell" flags={MOB_SPELLS} value={skill.spell} onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
            </TableRow>
        ));
    }
    handleNewSpell() {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_spell.push(new TrainSpell())
        this.props.updateArea(area);
    }
    removeSpell(index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_spell.slice(index, 1)
        this.props.updateArea(area);
    }
    
    generateLevels() {
        return this.props.area.items[this.props.current_item].can_train_level.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.removeSkill(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id={"can_train_level level "+index} value={skill.level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id={"can_train_level price_multiplier "+index} value={skill.price_multiplier} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
            </TableRow>
        ));
    }
    handleNewLevel() {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_level.push(new TrainLevel())
        this.props.updateArea(area);
    }
    removeLevel(index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_level.slice(index, 1)
        this.props.updateArea(area);
    }
    
    generateStatistics() {
        return this.props.area.items[this.props.current_item].can_train_statistic.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.removeSkill(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id={"can_train_statistic level "+index} value={skill.level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id={"can_train_statistic price_multiplier "+index} value={skill.price_multiplier} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id={"can_train_statistic statistic "+index} label="Statistic" flags={MOB_STATISTICS} value={skill.statistic} onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
            </TableRow>
        ));
    }
    handleNewStatistic() {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_statistic.push(new TrainStatistic())
        this.props.updateArea(area);
    }
    removeStatistic(index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_statistic.slice(index, 1)
        this.props.updateArea(area);
    }
    
    generateFeats() {
        return this.props.area.items[this.props.current_item].can_train_feat.map((skill, index) => (
            <TableRow key={index}>
                <TableRowColumn>
                    <IconButton tooltip="Add" onClick={()=>(this.removeSkill(index))}>
                        <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                    </IconButton>
                    <TextField id={"can_train_feat level "+index} value={skill.level} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField id={"can_train_feat price_multiplier "+index} value={skill.price_multiplier} autoComplete="off" onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
                <TableRowColumn>
                    <FlagSelector id={"can_train_feat feat "+index} label="Feat" flags={MOB_FEATS} value={skill.feat} onChange={this.handleChange.bind(this)} />
                </TableRowColumn>
            </TableRow>
        ));
    }
    handleNewFeat() {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_feat.push(new TrainFeat())
        this.props.updateArea(area);
    }
    removeFeat(index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item].can_train_feat.slice(index, 1)
        this.props.updateArea(area);
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.items[this.props.current_item][event.target.id.split(" ")[0]][parseInt(event.target.id.split(" ")[2])][event.target.id.split(" ")[1]] = value;
        this.props.updateArea(area);
    }
    
    render() {
        return (
            <React.Fragment>
                <Subheader>Skills</Subheader>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Max Level</TableHeaderColumn>
                            <TableHeaderColumn>Price Multiplier</TableHeaderColumn>
                            <TableHeaderColumn>Skill</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.generateSkills()}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={this.handleNewSkill.bind(this)}>
                                    <FontIcon className="material-icons">add_box</FontIcon>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <Subheader>Weapon Skills</Subheader>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Max Level</TableHeaderColumn>
                            <TableHeaderColumn>Price Multiplier</TableHeaderColumn>
                            <TableHeaderColumn>Weapon Skill</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.generateWeaponSkills()}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={this.handleNewWeaponSkill.bind(this)}>
                                    <FontIcon className="material-icons">add_box</FontIcon>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <Subheader>Spells</Subheader>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Max Level</TableHeaderColumn>
                            <TableHeaderColumn>Price Multiplier</TableHeaderColumn>
                            <TableHeaderColumn>Spell</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.generateSpells()}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={this.handleNewSpell.bind(this)}>
                                    <FontIcon className="material-icons">add_box</FontIcon>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <Subheader>Levels</Subheader>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Max Level</TableHeaderColumn>
                            <TableHeaderColumn>Price Multiplier</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.generateLevels()}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={this.handleNewLevel.bind(this)}>
                                    <FontIcon className="material-icons">add_box</FontIcon>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <Subheader>Statistics</Subheader>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Max Level</TableHeaderColumn>
                            <TableHeaderColumn>Price Multiplier</TableHeaderColumn>
                            <TableHeaderColumn>Statistic</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.generateStatistics()}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={this.handleNewStatistic.bind(this)}>
                                    <FontIcon className="material-icons">add_box</FontIcon>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <Subheader>Feats</Subheader>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Max Level</TableHeaderColumn>
                            <TableHeaderColumn>Price Multiplier</TableHeaderColumn>
                            <TableHeaderColumn>Feat</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.generateFeats()}
                        <TableRow>
                            <TableRowColumn>
                                <IconButton tooltip="Add" onClick={this.handleNewFeat.bind(this)}>
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

export default muiThemeable()(ItemPanel);