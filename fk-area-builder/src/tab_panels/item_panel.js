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
    ITEM_SIZES
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
import {ModelComponent, ModelArrayComponent} from '../UIComponents/ModelComponents'

const item_validator = new ItemValidator()
const item_apply_validator = new ItemApplyValidator()
const item_reset_validator = new ItemResetValidator()
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
    shouldComponentUpdate(newProps) {
        // Return true if model has changed, false otherwise
        return (!equal_recursively(this.props.area.items, newProps.area.items))
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
    handleChange(event, value) {
        console.log("ItemPanel", this.state.current_item, value);
        let area = this.props.area.clone()
        area.items[parseInt(this.state.current_item, 10)] = value;
        this.updateArea(area);
    }
    
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
        this.props.updateArea(area);
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
                    {item_validator.validate(item).length > 0 && (
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
            {this.props.area.items[this.state.current_item] !== undefined && 
            <React.Fragment>
                <ItemEditor open={this.state.open} id="items" handleClose={this.handleClose} onChange={this.handleChange.bind(this)} model={this.props.area.items[this.state.current_item]} rooms={this.props.area.rooms} index={this.state.current_item} />
                <Dialog open={this.state.confirm_delete_open} actions={confirmActions} modal={false} title={this.state.confirm_title}>{this.state.confirm_text}</Dialog>
                <Dialog open={this.state.errors_open} actions={errorsActions} modal={false} title={`Errors for item ${this.props.area.items[this.state.current_item].vnum}`}>
                    <List>
                        {item_validator.validate([this.props.area.items[this.state.current_item]]).map((error, index) => (
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

class ItemEditor extends ModelComponent {
    
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
                            onChange={this.handleChange.bind(this)} />
                        <TextField 
                            floatingLabelText="Short description" 
                            id="sdesc" 
                            value={this.props.model.sdesc} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                        <TextField 
                            floatingLabelText="Long description" 
                            id="ldesc" 
                            fullWidth={true} 
                            value={this.props.model.ldesc} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                        <TextField 
                            floatingLabelText="Keywords" 
                            id="keywords" 
                            fullWidth={true} 
                            value={this.props.model.keywords} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                        </Validate>
                    </Tab>
                    <Tab label="Item Type">
                        <Validate validator={item_validator}>
                        <FlagSelector 
                            id="item_type" 
                            label="Item Type" 
                            flags={ITEM_TYPES} 
                            value={this.props.model.item_type} 
                            onChange={this.handleChange.bind(this)} />
                        </Validate>
                        {this.props.model.item_type ? (
                        <React.Fragment>
                            <div>
                                {this.props.model.item_type.value0.type_enum ? (
                                    <FlagSelector 
                                        id="value0" 
                                        label="Value 0" 
                                        flags={this.props.model.item_type.value0.type_enum} 
                                        value={this.props.model.value0} 
                                        onChange={this.handleChange.bind(this)} />
                                ) : (
                                    <TextField 
                                        id="value0" 
                                        floatingLabelText="Value 0" 
                                        value={this.props.model.value0} 
                                        autoComplete="off" 
                                        onChange={this.handleChange.bind(this)} />
                                )}
                                <span 
                                    style={item_type_ldesc_style}>{this.props.model.item_type.value0.ldesc}</span>
                            </div>
                            <div>
                                {this.props.model.item_type.value1.type_enum ? (
                                    <FlagSelector 
                                        id="value1" 
                                        label="Value 1" 
                                        flags={this.props.model.item_type.value1.type_enum} 
                                        value={this.props.model.value1} 
                                        onChange={this.handleChange.bind(this)} />
                                ) : (
                                    <TextField 
                                        id="value1" 
                                        floatingLabelText="Value 1" 
                                        value={this.props.model.value1} 
                                        autoComplete="off" 
                                        onChange={this.handleChange.bind(this)} />
                                )}
                                <span 
                                    style={item_type_ldesc_style}>{this.props.model.item_type.value1.ldesc}</span>
                            </div>
                            <div>
                                {this.props.model.item_type.value2.type_enum ? (
                                    <FlagSelector 
                                        id="value2" 
                                        label="Value 2" 
                                        flags={this.props.model.item_type.value2.type_enum} 
                                        value={this.props.model.value2} 
                                        onChange={this.handleChange.bind(this)} />
                                ) : (
                                    <TextField 
                                        id="value2" 
                                        floatingLabelText="Value 2" 
                                        value={this.props.model.value2} 
                                        autoComplete="off" 
                                        onChange={this.handleChange.bind(this)} />
                                )}
                                <span 
                                    style={item_type_ldesc_style}>{this.props.model.item_type.value2.ldesc}</span>
                            </div>
                            <div>
                                {this.props.model.item_type.value3.type_enum ? (
                                    <FlagSelector 
                                        id="value3" 
                                        label="Value 3" 
                                        flags={this.props.model.item_type.value3.type_enum} 
                                        value={this.props.model.value3} 
                                        onChange={this.handleChange.bind(this)} />
                                ) : (
                                    <TextField 
                                        id="value3" 
                                        floatingLabelText="Value 3" 
                                        value={this.props.model.value3} 
                                        autoComplete="off" 
                                        onChange={this.handleChange.bind(this)} />
                                )}
                                <span 
                                    style={item_type_ldesc_style}>{this.props.model.item_type.value3.ldesc}</span>
                            </div>
                            <div>
                                {this.props.model.item_type.value4.type_enum ? (
                                    <FlagSelector 
                                        id="value4" 
                                        label="Value 4" 
                                        flags={this.props.model.item_type.value4.type_enum} 
                                        value={this.props.model.value4} 
                                        onChange={this.handleChange.bind(this)} />
                                ) : (
                                    <TextField 
                                        id="value4" 
                                        floatingLabelText="Value 4" 
                                        value={this.props.model.value4} 
                                        autoComplete="off" 
                                        onChange={this.handleChange.bind(this)} />
                                )}
                                <span style={item_type_ldesc_style}>{this.props.model.item_type.value4.ldesc}</span>
                            </div>
                            <div>
                                <TextField 
                                    id="value5" 
                                    floatingLabelText="Value 5" 
                                    value={this.props.model.value5} 
                                    autoComplete="off" 
                                    onChange={this.handleChange.bind(this)} />
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
                            onChange={this.handleChange.bind(this)} />
                        <MultiFlagSelector 
                            id="wear_flags" 
                            label="Wear Locations" 
                            flags={WEAR_LOCATIONS} 
                            value={this.props.model.wear_flags} 
                            onChange={this.handleChange.bind(this)} />
                        <FlagSelector 
                            id="quality" 
                            label="Quality" 
                            flags={ITEM_QUALITY} 
                            value={this.props.model.quality} 
                            onChange={this.handleChange.bind(this)} />
                        <FlagSelector 
                            id="material" 
                            label="Materials" 
                            flags={ITEM_MATERIALS} 
                            value={this.props.model.material} 
                            onChange={this.handleChange.bind(this)} />
                        <FlagSelector 
                            id="condition" 
                            label="Condition" 
                            flags={ITEM_CONDITION} 
                            value={this.props.model.condition} 
                            onChange={this.handleChange.bind(this)} />
                        <FlagSelector 
                            id="size" 
                            label="Sizes" 
                            flags={ITEM_SIZES} 
                            value={this.props.model.size} 
                            onChange={this.handleChange.bind(this)} />
                        <TextField 
                            floatingLabelText="Identify text" 
                            id="identify_message" 
                            fullWidth={true} 
                            value={this.props.model.identify_message} 
                            autoComplete="off" 
                            onChange={this.handleChange.bind(this)} />
                        </Validate>
                        <ApplyEditor 
                            id="special_applies" 
                            model={this.props.model.special_applies} 
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Extra Descs">
                        <ExtraDescriptionsEditor 
                            id="extra_descriptions" 
                            model={this.props.model.extra_descriptions} 
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor 
                            id="programs" 
                            model={this.props.model.programs} 
                            triggers={ITEM_PROGRAM_TRIGGERS}
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                    <Tab label="Resets">
                        <ItemResetsEditor 
                            id="item_resets" 
                            model={this.props.model.item_resets} 
                            item={this.props.model} 
                            rooms={this.props.rooms} 
                            onChange={this.handleChange.bind(this)} />
                    </Tab>
                </Tabs>
            </Dialog>  
        )
    }
}

class ApplyEditor extends ModelArrayComponent {
    modelClass = ItemApply;
    
    generate() {
        return this.props.model.map((apply, index) => (
            <TableRow key={index}>
                <TableRowColumn width={50}>
                    <IconButton tooltip="Delete" onClick={()=>(this.handleDelete(index))}>
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
                        onChange={(e,v)=>(this.handleChange(e,v,index))} />
                    </Validate>
                </TableRowColumn>
                <TableRowColumn>
                    <Validate validator={item_apply_validator}>
                    <TextField 
                        id="parameter" 
                        value={apply.parameter} 
                        autoComplete="off" 
                        onChange={(e,v)=>(this.handleChange(e,v,index))} />
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
                                <IconButton tooltip="Add" onClick={this.handleNew.bind(this)}>
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

class ItemResetsEditor extends ModelArrayComponent {
    modelClass = ItemReset;
    generate() {
        return this.props.model.map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.handleDelete(index))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={item_reset_validator}>
                <VnumAutoComplete 
                    floatingLabelText="Room" 
                    id="room_container" 
                    value={reset.room_container} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} dataSource={this.props.rooms} />
                <TextField 
                    floatingLabelText="Item Limit" 
                    id="item_limit" 
                    value={reset.item_limit} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                </Validate>
                <Checkbox 
                    label="Hidden" 
                    id="hidden" 
                    checked={reset.hidden} 
                    onCheck={(e,v)=>(this.handleChange(e,v,index))} />
                <Checkbox 
                    label="Buried" 
                    id="buried" 
                    checked={reset.buried} 
                    onCheck={(e,v)=>(this.handleChange(e,v,index))} />
                <TrapResetEditor 
                    id="trap_reset" 
                    model={reset.trap_reset} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <ItemResetsContentsEditor 
                    id="contents" 
                    model={reset.contents} 
                    item={reset} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
            </Paper>
        ));
    }
    
    handleNew() {
        let new_dr = new ItemReset();
        let item_resets = this.props.model.map((item)=>(item.clone())); // Create working copy of state object
        new_dr.item = this.props.item;
        item_resets.push(new_dr);
        this.props.onChange({target:this.props}, item_resets);
    }
}

class ItemResetsContentsEditor extends ModelArrayComponent {
    generate() {
        return this.props.model.map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.handleDelete(index))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <VnumAutoComplete 
                    floatingLabelText="Item" 
                    id="item"
                    value={reset.item} 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} 
                    dataSource={this.props.area.items} />
                <TextField 
                    floatingLabelText="Item Limit" 
                    id="item_limit"
                    value={reset.item_limit} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.handleChange(e,v,index))} />
                <Checkbox 
                    label="Hidden" 
                    id="hidden"
                    checked={reset.hidden} 
                    onCheck={(e,v)=>(this.handleChange(e,v,index))} />
            </Paper>
        ));
    }
    
    handleNew() {
        let new_dr = new ItemReset();
        let contents = this.props.model.map((item)=>(item.clone())); // Create working copy of state object
        new_dr.room_container = this.props.item.item;
        contents.push(new_dr);
        this.props.onChange({target:this.props}, contents);
    }
    
    render() {
        return (
            <React.Fragment>
                <Subheader>Contents</Subheader>
                {super.render()}
            </React.Fragment>
        )
    }
}

export default muiThemeable()(ItemPanel);