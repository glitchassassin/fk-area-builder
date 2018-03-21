import React from 'react';
import Tabs, {Tab} from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import GeneralPanel from './tab_panels/general_panel';
import MobPanel from './tab_panels/mob_panel';
import RoomPanel from './tab_panels/room_panel';
import ItemPanel from './tab_panels/item_panel';
import QuestsPanel from './tab_panels/quests_panel';
import AreaExporter from './Models/are_export';
import {RoomValidator, MobValidator, ItemValidator} from './Models/model_validator'
import {UiStateActions} from './Models/actionTypes';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
var room_validator = new RoomValidator()
var mob_validator = new MobValidator()
var item_validator = new ItemValidator()

const styles = theme => ({
  root: {
    flexGrow: 1,
    //marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class MainFrame extends React.Component {
    render() {
        return (
        <div className={this.props.classes.root}>
            <AppBar position="static">
                <Tabs value={this.props.current_tab} onChange={this.props.setTab}>
                    <Tab label="General" />
                    <Tab label={this.props.room_label} />
                    {/*<Tab label={this.props.mob_label} />
                    <Tab label={this.props.item_label} />
                    <Tab label="Quests" />
                    <Tab label="Area Code" />
                    */}
                </Tabs>
            </AppBar>
            {this.props.current_tab === 0 && <Typography component="div" style={{ padding: 8 * 3 }}><GeneralPanel /></Typography>}
            {this.props.current_tab === 1 && <Typography component="div" style={{ padding: 8 * 3 }}><RoomPanel /></Typography>}
            {this.props.current_tab === 2 && <Typography component="div" style={{ padding: 8 * 3 }}><MobPanel /></Typography>}
            {this.props.current_tab === 3 && <Typography component="div" style={{ padding: 8 * 3 }}><ItemPanel /></Typography>}
            {this.props.current_tab === 4 && <Typography component="div" style={{ padding: 8 * 3 }}><QuestsPanel /></Typography>}
            {this.props.current_tab === 5 && <Typography component="div" style={{ padding: 8 * 3 }}><AreaRenderer /></Typography>}
        </div>
        )
    }
}
MainFrame = withStyles(styles)(connect(
    (state) => {
        let room_errors = state.rooms.length ? state.rooms.map((room)=>(room_validator.validate(room).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let room_label = room_errors > 0 ? (<Badge badgeContent={room_errors} secondary={true}>"Rooms"</Badge>) : "Rooms";
        let mob_errors = state.mobs.length ? state.mobs.map((mob)=>(mob_validator.validate(mob).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let mob_label = mob_errors > 0 ? (<Badge badgeContent={mob_errors} secondary={true}>"Mobs"</Badge>) : "Mobs";
        let item_errors = state.items.length ? state.items.map((item)=>(item_validator.validate(item).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let item_label = item_errors > 0 ? (<Badge badgeContent={item_errors} secondary={true}>"Items"</Badge>) : "Items";
        let current_tab = state.ui_state.main_current_tab
        return {room_label, mob_label, item_label, current_tab}
    },
    (dispatch) => ({
        setTab: (e, index) => {
            dispatch({type:UiStateActions.SET_MAIN_CURRENT_TAB, value:index})
        }
    })
)(MainFrame))

class AreaRenderer extends React.Component {
    render() {
        return (
            <pre>
            {(new AreaExporter()).renderArea(this.props.state)}
            </pre>
        )
    }
}
AreaRenderer = connect(
    (state) => ({state})
)(AreaRenderer)

export default MainFrame;