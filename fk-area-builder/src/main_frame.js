import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import GeneralPanel from './tab_panels/general_panel';
import MobPanel from './tab_panels/mob_panel';
import RoomPanel from './tab_panels/room_panel';
import ItemPanel from './tab_panels/item_panel';
import QuestsPanel from './tab_panels/quests_panel';
import testLoader from './Models/loader';

class MainFrame extends React.Component {
    state = {
        area: testLoader().area
    }
    updateAreaState(area) {
        this.setState({area});
    }
    render() {
        let room_errors = this.state.area.rooms.length ? this.state.area.rooms.map((room)=>(room.validate().length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let room_label = room_errors > 0 ? (<Badge badgeContent={room_errors} secondary={true}>"Rooms"</Badge>) : "Rooms";
        let mob_errors = this.state.area.mobs.length ? this.state.area.mobs.map((mob)=>(mob.validate().length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let mob_label = mob_errors > 0 ? (<Badge badgeContent={mob_errors} secondary={true}>"Mobs"</Badge>) : "Mobs";
        let item_errors = this.state.area.items.length ? this.state.area.items.map((item)=>(item.validate().length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let item_label = item_errors > 0 ? (<Badge badgeContent={item_errors} secondary={true}>"Items"</Badge>) : "Items";
        return (
        <div>
            <Tabs>
                <Tab label="General">
                    <GeneralPanel area={this.state.area} updateArea={this.updateAreaState.bind(this)} />
                </Tab>
                <Tab label={room_label}>
                    <RoomPanel area={this.state.area} updateArea={this.updateAreaState.bind(this)} />
                </Tab>
                <Tab label={mob_label}>
                    <MobPanel area={this.state.area} updateArea={this.updateAreaState.bind(this)} />
                </Tab>
                <Tab label={item_label}>
                    <ItemPanel area={this.state.area} updateArea={this.updateAreaState.bind(this)} />
                </Tab>
                <Tab label="Quests">
                    <QuestsPanel area={this.state.area} updateArea={this.updateAreaState.bind(this)} />
                </Tab>
                <Tab label="Area Code">
                    <pre>
                    {this.state.area.toString()}
                    </pre>
                </Tab>
            </Tabs>
        </div>
        )
    }
}

export default MainFrame;