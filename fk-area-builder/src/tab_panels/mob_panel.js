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
    MOB_FEATS
}
from '../Models/flags';
import {
    SimpleMob,
    UniqueMob,
    Exit,
    ExtraDescription,
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
        this.props.onChange(area);
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
                <TableRowColumn width={100}>{mob.vnum}</TableRowColumn>
                <TableRowColumn>{mob.sdesc}</TableRowColumn>
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
            <MobEditor open={this.state.open} handleClose={this.handleClose} updateArea={this.updateArea.bind(this)} current_mob={this.state.current_mob} area={this.props.area} />
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

class MobEditor extends React.Component {
    handleChanges(event, value, index) {
        let area = this.props.area.clone();
        let room = area.mobs[this.props.current_mob];
        try {
            room[event.target.id] = value;
        } catch(e) {
            throw(e);
        }
        this.props.updateArea(area);
    }
    
    render() {
        const actions = [
        <FlatButton label="Done" primary={true} onClick={this.props.handleClose} />,
        ];
        return (
            <Dialog title="Edit Mob" modal={false} open={this.props.open} actions={actions} onRequestClose={this.props.handleClose} autoScrollBodyContent={true}>
                <Tabs>
                    <Tab label="Descriptions">
                        <TextField floatingLabelText="vnum" id="vnum" value={this.props.area.mobs[this.props.current_mob].vnum} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Short description" id="sdesc" value={this.props.area.mobs[this.props.current_mob].sdesc} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Long description" id="ldesc" fullWidth={true} value={this.props.area.mobs[this.props.current_mob].sdesc} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Keywords" id="keywords" fullWidth={true} value={this.props.area.mobs[this.props.current_mob].sdesc} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <TextField floatingLabelText="Full description" id="fulldesc" multiLine={true} rows={5} fullWidth={true} value={this.props.area.mobs[this.props.current_mob].ldesc} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                    </Tab>
                    <Tab label="Details">
                        <TextField floatingLabelText="Level" id="level" value={this.props.area.mobs[this.props.current_mob].level} autoComplete="off" onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="mob_class" label="Class" flags={MOB_CLASSES} value={this.props.area.mobs[this.props.current_mob].mob_class} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="race" label="Race" flags={MOB_RACES} value={this.props.area.mobs[this.props.current_mob].race} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="sex" label="Sex" flags={MOB_SEXES} value={this.props.area.mobs[this.props.current_mob].sex} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="position" label="Position" flags={MOB_POSITIONS} value={this.props.area.mobs[this.props.current_mob].position} onChange={this.handleChanges.bind(this)} />
                        <FlagSelector id="deity" label="Deity" flags={MOB_DEITIES} value={this.props.area.mobs[this.props.current_mob].deity} onChange={this.handleChanges.bind(this)} />
                        <MultiFlagSelector id="act_flags" label="Act Flags" flags={MOB_ACT_FLAGS} value={this.props.area.mobs[this.props.current_mob].act_flags} onChange={this.handleChanges.bind(this)} />
                        <MultiFlagSelector id="understood_languages" label="Act Flags" flags={MOB_LANGUAGES} value={this.props.area.mobs[this.props.current_mob].understood_languages} onChange={this.handleChanges.bind(this)} />
                        <MultiFlagSelector id="spoken_languages" label="Act Flags" flags={MOB_LANGUAGES} value={this.props.area.mobs[this.props.current_mob].spoken_languages} onChange={this.handleChanges.bind(this)} />
                    </Tab>
                    <Tab label="Training">
                        <CanTrainEditor area={this.props.area} current_mob={this.props.current_mob} updateArea={this.props.updateArea} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor area={this.props.area} current_mob={this.props.current_mob} updateArea={this.props.updateArea} />
                    </Tab>
                </Tabs>
            </Dialog>  
        )
    }
}

class ProgramsEditor extends React.Component {
    generatePrograms() {
        return this.props.area.mobs[this.props.current_mob].programs.map((program, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <FlagSelector id={"trigger "+index} label="Trigger" flags={MOB_PROGRAM_TRIGGERS} value={program.trigger} onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Variable" id={"argument "+index} value={program.argument} autoComplete="off" onChange={this.handleChange.bind(this)} />
                <TextField floatingLabelText="Program" id={"program "+index} multiLine={true} rows={5} fullWidth={true} value={program.program} autoComplete="off" onChange={this.handleChange.bind(this)} />
            </Paper>
        ));
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob].programs[parseInt(event.target.id.split(" ")[1])][event.target.id.split(" ")[0]] = value;
        this.props.updateArea(area);
    }
    
    handleNew() {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob].programs.push(new Program())
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
        return this.props.area.mobs[this.props.current_mob].can_train_skill.map((skill, index) => (
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
        area.mobs[this.props.current_mob].can_train_skill.push(new TrainSkill())
        this.props.updateArea(area);
    }
    removeSkill(index) {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob].can_train_skill.splice(index, 1)
        this.props.updateArea(area);
    }
    
    generateWeaponSkills() {
        return this.props.area.mobs[this.props.current_mob].can_train_weapon_skill.map((skill, index) => (
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
        area.mobs[this.props.current_mob].can_train_weapon_skill.push(new TrainWeaponSkill())
        this.props.updateArea(area);
    }
    removeWeaponSkill(index) {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob].can_train_weapon_skill.slice(index, 1)
        this.props.updateArea(area);
    }
    
    generateSpells() {
        return this.props.area.mobs[this.props.current_mob].can_train_spell.map((skill, index) => (
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
        area.mobs[this.props.current_mob].can_train_spell.push(new TrainSpell())
        this.props.updateArea(area);
    }
    removeSpell(index) {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob].can_train_spell.slice(index, 1)
        this.props.updateArea(area);
    }
    
    generateLevels() {
        return this.props.area.mobs[this.props.current_mob].can_train_level.map((skill, index) => (
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
        area.mobs[this.props.current_mob].can_train_level.push(new TrainLevel())
        this.props.updateArea(area);
    }
    removeLevel(index) {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob].can_train_level.slice(index, 1)
        this.props.updateArea(area);
    }
    
    generateStatistics() {
        return this.props.area.mobs[this.props.current_mob].can_train_statistic.map((skill, index) => (
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
        area.mobs[this.props.current_mob].can_train_statistic.push(new TrainStatistic())
        this.props.updateArea(area);
    }
    removeStatistic(index) {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob].can_train_statistic.slice(index, 1)
        this.props.updateArea(area);
    }
    
    generateFeats() {
        return this.props.area.mobs[this.props.current_mob].can_train_feat.map((skill, index) => (
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
        area.mobs[this.props.current_mob].can_train_feat.push(new TrainFeat())
        this.props.updateArea(area);
    }
    removeFeat(index) {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob].can_train_feat.slice(index, 1)
        this.props.updateArea(area);
    }
    
    handleChange(event, value, index) {
        let area = this.props.area.clone();
        area.mobs[this.props.current_mob][event.target.id.split(" ")[0]][parseInt(event.target.id.split(" ")[2])][event.target.id.split(" ")[1]] = value;
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

export default muiThemeable()(MobPanel);