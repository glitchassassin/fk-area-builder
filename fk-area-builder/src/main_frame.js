import React from 'react';
import Tabs, {Tab} from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import GeneralPanel from './tab_panels/general_panel';
import MobPanel from './tab_panels/mob_panel';
import RoomPanel from './tab_panels/room_panel';
import ItemPanel from './tab_panels/item_panel';
import QuestsPanel from './tab_panels/quests_panel';
import ResetsPanel from './tab_panels/resets_panel';
import AreaExporter from './Models/are_export';
import {
    AreaValidator, 
    RoomValidator, 
    MobValidator, 
    ItemValidator, 
    QuestLogValidator,
    ItemResetValidator,
    MobResetValidator,
    EquipmentResetValidator,
    CoinResetValidator
} 
from './Models/model_validator'
import {UiStateActions} from './Models/actionTypes';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
var area_validator = new AreaValidator()
var room_validator = new RoomValidator()
var mob_validator = new MobValidator()
var item_validator = new ItemValidator()
var qlog_validator = new QuestLogValidator()
var item_reset_validator = new ItemResetValidator()
var mob_reset_validator = new MobResetValidator()
var equipment_reset_validator = new EquipmentResetValidator()
var coin_reset_validator = new CoinResetValidator()

const styles = theme => ({
  root: {
    flexGrow: 1,
    //marginTop: theme.spacing.unit * 3,,
    paddingTop: "48px",
    //backgroundColor: theme.palette.background.paper,
  },
  tabs: {
      backgroundColor: theme.palette.primary.dark,
      marginTop: "64px",
      zIndex: "1099"
  },
  tab_contents: {
      backgroundColor: theme.palette.background.paper,
  },
  badge: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  }
});

class MainFrame extends React.Component {
    render() {
        let general_label = this.props.area_errors > 0 ? (<Badge className={this.props.classes.badge} badgeContent={this.props.area_errors} color="error">General</Badge>) : "General";
        let room_label = this.props.room_errors > 0 ? (<Badge className={this.props.classes.badge} badgeContent={this.props.room_errors} color="error">Rooms</Badge>) : "Rooms";
        let mob_label = this.props.mob_errors > 0 ? (<Badge className={this.props.classes.badge} badgeContent={this.props.mob_errors} color="error">Mobs</Badge>) : "Mobs";
        let item_label = this.props.item_errors > 0 ? (<Badge className={this.props.classes.badge} badgeContent={this.props.item_errors} color="error">Items</Badge>) : "Items";
        let qlog_label = this.props.qlog_errors > 0 ? (<Badge className={this.props.classes.badge} badgeContent={this.props.qlog_errors} color="error">Quests</Badge>) : "Quests";
        let reset_label = this.props.reset_errors > 0 ? (<Badge className={this.props.classes.badge} badgeContent={this.props.reset_errors} color="error">Resets</Badge>) : "Resets";
        return (
        <div className={this.props.classes.root}>
            <AppBar className={this.props.classes.tabs} position="fixed">
                <Tabs value={this.props.current_tab} onChange={this.props.setTab} fullWidth>
                    <Tab label={general_label} />
                    <Tab label={room_label} />
                    <Tab label={mob_label} />
                    <Tab label={item_label} />
                    <Tab label={qlog_label} />
                    <Tab label={reset_label} />
                    <Tab label="Area Code" />
                </Tabs>
            </AppBar>
            {this.props.current_tab === 0 && <Typography className={this.props.classes.tab_contents} component="div" style={{ padding: 8 * 3 }}><GeneralPanel /></Typography>}
            {this.props.current_tab === 1 && <Typography className={this.props.classes.tab_contents} component="div" style={{ padding: 8 * 3 }}><RoomPanel /></Typography>}
            {this.props.current_tab === 2 && <Typography className={this.props.classes.tab_contents} component="div" style={{ padding: 8 * 3 }}><MobPanel /></Typography>}
            {this.props.current_tab === 3 && <Typography className={this.props.classes.tab_contents} component="div" style={{ padding: 8 * 3 }}><ItemPanel /></Typography>}
            {this.props.current_tab === 4 && <Typography className={this.props.classes.tab_contents} component="div" style={{ padding: 8 * 3 }}><QuestsPanel /></Typography>}
            {this.props.current_tab === 5 && <Typography className={this.props.classes.tab_contents} component="div" style={{ padding: 8 * 3 }}><ResetsPanel /></Typography>}
            {this.props.current_tab === 6 && <Typography className={this.props.classes.tab_contents} component="div" style={{ padding: 8 * 3 }}><AreaRenderer /></Typography>}
        </div>
        )
    }
}
MainFrame = withStyles(styles)(connect(
    (state) => {
        let area_errors = area_validator.validate(state.area).length;
        let room_errors = state.rooms.length ? state.rooms.map((room)=>(room_validator.validate_state(state, room).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let mob_errors = state.mobs.length ? state.mobs.map((mob)=>(mob_validator.validate_state(state, mob).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let item_errors = state.items.length ? state.items.map((item)=>(item_validator.validate_state(state, item).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let quest_errors = state.quest_log.length ? state.quest_log.map((qlog)=>(qlog_validator.validate(qlog).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let reset_errors = (state.item_resets.length ? state.item_resets.map((reset)=>(item_reset_validator.validate(reset).length?1:0)).reduce((a, b)=>(a+b)) : 0) + 
                           (state.coin_resets.length ? state.coin_resets.map((reset)=>(coin_reset_validator.validate(reset).length?1:0)).reduce((a, b)=>(a+b)) : 0) +
                           (state.mob_resets.length ? state.mob_resets.map((reset)=>(mob_reset_validator.validate(reset).length?1:0)).reduce((a, b)=>(a+b)) : 0) +
                           (state.equipment_resets.length ? state.equipment_resets.map((reset)=>(equipment_reset_validator.validate(reset).length?1:0)).reduce((a, b)=>(a+b)) : 0)
        let current_tab = state.ui_state.main_current_tab
        return {area_errors, room_errors, mob_errors, item_errors, quest_errors, reset_errors, current_tab}
    },
    (dispatch) => ({
        setTab: (e, index) => {
            dispatch({type:UiStateActions.SET_MAIN_CURRENT_TAB, value:index})
        }
    })
)(MainFrame))

const areaStyles = theme => ({
    areafile: {
        textAlign:"left",
        lineHeight:"1rem",
        fontSize:"1rem"
    }
})
class AreaRenderer extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <pre className={classes.areafile}>
                    {(new AreaExporter()).renderArea(this.props.state)}
                    </pre>
                </Grid>
            </Grid>
        )
    }
}
AreaRenderer = withStyles(areaStyles)(connect(
    (state) => ({state})
)(AreaRenderer))

export default MainFrame;