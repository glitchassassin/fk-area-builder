import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import MobPanel from './tab_panels/mob_panel';
import RoomPanel from './tab_panels/room_panel';
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
        let shops_errors = this.state.area.shops.length ? this.state.area.shops.map((shop)=>(shop.validate().length?1:0)).reduce((a, b)=>(a+b)) : 0;
        shops_errors += this.state.area.shops.length ? this.state.area.repairs.map((repair)=>(repair.validate().length?1:0)).reduce((a, b)=>(a+b)) : 0;
        let shops_label = shops_errors > 0 ? (<Badge badgeContent={shops_errors} secondary={true}>"Shops"</Badge>) : "Shops";
        return (
        <div>
            <Tabs>
                <Tab label="General">
                    
                </Tab>
                <Tab label={room_label}>
                    <RoomPanel area={this.state.area} onChange={this.updateAreaState.bind(this)} />
                </Tab>
                <Tab label={mob_label}>
                    <MobPanel area={this.state.area} onChange={this.updateAreaState.bind(this)} />
                </Tab>
                <Tab label={item_label}>
                    
                </Tab>
                <Tab label={shops_label}>
                    
                </Tab>
                <Tab label="Resets">
                    
                </Tab>
                <Tab label="Quests">
                    
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