import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import GeneralPanel from './tab_panels/general_panel';
import MobPanel from './tab_panels/mob_panel';
import RoomPanel from './tab_panels/room_panel';
import ItemPanel from './tab_panels/item_panel';
import QuestsPanel from './tab_panels/quests_panel';
import AreaExporter from './Models/are_export';
import {RoomValidator, MobValidator, ItemValidator} from './Models/model_validator'
import { connect } from 'react-redux';
var room_validator = new RoomValidator()
var mob_validator = new MobValidator()
var item_validator = new ItemValidator()

class MainFrame extends React.Component {
    render() {
        return (
        <div>
            <Tabs>
                <Tab label="General">
                    <GeneralPanel />
                </Tab>
                <Tab label={this.props.room_label}>
                    <RoomPanel />
                </Tab>
                <Tab label={this.props.mob_label}>
                    <MobPanel />
                </Tab>
                <Tab label={this.props.item_label}>
                    <ItemPanel />
                </Tab>
                {/*
                <Tab label="Quests">
                    <QuestsPanel />
                </Tab>
                <Tab label="Area Code">
                    <AreaRenderer />
                </Tab>
                */}
            </Tabs>
        </div>
        )
    }
}
MainFrame = connect(
    (state) => {
        let room_errors = state.rooms.length ? state.rooms.map((room)=>(room_validator.validate(room).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let room_label = room_errors > 0 ? (<Badge badgeContent={room_errors} secondary={true}>"Rooms"</Badge>) : "Rooms";
        let mob_errors = state.mobs.length ? state.mobs.map((mob)=>(mob_validator.validate(mob).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let mob_label = mob_errors > 0 ? (<Badge badgeContent={mob_errors} secondary={true}>"Mobs"</Badge>) : "Mobs";
        let item_errors = state.items.length ? state.items.map((item)=>(item_validator.validate(item).length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let item_label = item_errors > 0 ? (<Badge badgeContent={item_errors} secondary={true}>"Items"</Badge>) : "Items";
        
        return {room_label, mob_label, item_label}
    }
)(MainFrame)

class AreaRenderer extends React.Component {
    render() {
        return (
            <pre>
            {new AreaExporter().renderArea(this.props.state)}
            </pre>
        )
    }
}
AreaRenderer = connect(
    (state) => (state)
)(AreaRenderer)

export default MainFrame;