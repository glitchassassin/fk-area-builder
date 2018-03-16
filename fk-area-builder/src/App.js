import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainFrame from './main_frame';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import {Area} from './Models/area_model';
import populateArea from './Models/loader';
import {AreaValidator} from './Models/model_validator';
import GoogleDriveMenu from './tab_panels/GoogleDriveMenu';
import Warning from 'material-ui/svg-icons/alert/warning';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux';
import { GlobalActions } from './Models/actionTypes';

//console.log(Storage);

var area_validator = new AreaValidator()

class App extends Component {
  state = {
    error_open: false,
    error_text: ""
  }
  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
            <ThemedAppHeader />
            <div className="App-intro">
                <MainFrame />
            </div>
          </div>
      </MuiThemeProvider>
    );
  }
}

class AppHeader extends Component {
  state = {
    loaded: false,
    menuOpen: false,
    menuAnchor: null,
    status: <IconButton id="unsaved" tooltip="Unsaved Changes"><Warning color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.area !== this.state.area) {
      this.setState({ status: <IconButton id="unsaved" tooltip="Unsaved Changes"><Warning color={this.props.muiTheme.palette.alternateTextColor} /></IconButton> });
    }
  }
  componentDidMount() {
    window.onbeforeunload = (e) => {
      console.log(this.state.status);
      if (this.state.status.props.id !== "saved") {
        let warning = "You have unsaved changes. Discard?"; // Browser isn't actually required to show this - 
        e.returnValue = warning;                            // may just give a generic warning
        return warning;
      }
    }
    this.props.loadArea(testArea)
  }
  
  setStatus = (icon) => (this.setState({status: icon}));
  openMenu = (event) => (this.setState({menuOpen: true, menuAnchor: event.currentTarget}))
  closeMenu = () => (this.setState({menuOpen: false}))
  
  render() {
    return (
      <AppBar
        title={"Forgotten Kingdoms Area Builder" + (this.props.title ? " | " + this.props.title : "")}
        onLeftIconButtonClick={this.openMenu} 
        iconElementRight={<span>{this.state.status}</span>}>
        <GoogleDriveMenu 
          validator={area_validator}
          open={this.state.menuOpen}
          setStatus={this.setStatus}
          onFileLoad={this.props.loadArea} 
          closeMenu={this.closeMenu}
          onNew={this.props.newArea}
          anchor={this.state.menuAnchor} />
      </AppBar>
    );
  }
}
AppHeader = connect(
  (state) => {
    console.log(state);
    return {
      title: state.area.name
    };
  },
  (dispatch) => {
    return {
      newArea: ()=>{
        dispatch({ type: GlobalActions.NEW })
      },
      loadArea: (area)=>{
        populateArea(area, dispatch);
      }
    }
  }
)(AppHeader);

var ThemedAppHeader = muiThemeable()(AppHeader);

export default App;

var testArea = `
#AREA Roseportal House~

#AUTHOR Dalvyn~

#JUSTICE
CourtRoom 4081
Dungeon 4085
Judge 4070
Crime CRIME_HIGH_MURDER PUNISHMENT_DEATH
Crime CRIME_LOW_MURDER PUNISHMENT_SEVER
Crime CRIME_ASSAULT PUNISHMENT_JAIL
Crime CRIME_MUGGING PUNISHMENT_RANDOM_ITEM
$

#RANGES
0 65 0 65
$

#RESETMSG {D0}You hear priests chanting prayers of hope for the next morning.~

#FLAGS
0 0

#ECONOMY 0 80000

#WEATHER 5 5

#QUESTS
-1

#MOBILES
#16201
cleric guard~
{70}a cleric guard~
{70}A cleric guard of the temple stands here.~
This tall and strong human wears a steel breastplate decorated
with the symbol of Lathander. It is one of the warrior-priests
who have sworn to defend the temple and its inhabitants.
~
U 45 CLASS_LATHANDER RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
0
ARMOR_TYPE_FULL_PLATE MATERIAL_STEEL
ALIGN_NEUTRAL_GOOD
13 13 13 13 13 13 13
LANG_COMMON
LANG_COMMON
0 0 0
>death_prog 100~
mpjunk all
~
|
#16202
fighter guard~
{70}a figher guard~
{70}A fighter guard of the temple stands here.~
This tall and strong human wears a steel breastplate decorated
with the symbol of Lathander. It is one of the warrior-priests
who have sworn to defend the temple and its inhabitants.
~
U 45 CLASS_FIGHTERS RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
0
ARMOR_TYPE_FULL_PLATE MATERIAL_STEEL
ALIGN_NEUTRAL_GOOD
13 13 13 13 13 13 13
LANG_COMMON
LANG_COMMON
0 0 0
>death_prog 100~
mpjunk all
~
|
#16203
paladin guard~
{70}a paladin guard~
{70}A paladin guard of the temple stands here.~
This tall and strong human wears a steel breastplate decorated
with the symbol of Lathander. It is one of the warrior-priests
who have sworn to defend the temple and its inhabitants.
~
U 45 CLASS_PALADINS RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
0
ARMOR_TYPE_FULL_PLATE MATERIAL_STEEL
ALIGN_LAWFUL_GOOD
13 13 13 13 13 13 13
LANG_COMMON
LANG_COMMON
0 0 0
>death_prog 100~
mpjunk all
~
|
#16204
gardener~
{30}the gardener~
{30}The temple gardener stands here, seeing that nobody walks on the flowers.~
This rather old man wear a simple brown robe. He is wandering the
gardens of the temple, making sure that nobody walks on the flowers
or on the herbs.
~
S 30 CLASS_FIGHTERS RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
LANG_COMMON
LANG_COMMON
%14 1 dig~
>fight_prog 20~
yell Help! I am being attacked by $N on $b in the temple of Lathander!
mpat 4000 yell Help! I am being attacked by $N on $b in the temple of Lathander!
if quest(0,2,self) == 0
  mpecho A guard comes to help $I
  mpmload 16201
  mpforce m16201 mpoload 16239
  mpforce m16201 wield i16239
  mpforce m16201 mpkill $n
  mpmadd self quest 0 2 1
else
  if quest(0,2,self) == 1
    mpecho A guard comes to help $I
    mpmload 16202
    mpforce m16202 mpoload 16235
    mpforce m16202 wield i16235
    mpforce m16202 mpkill $n
    mpmadd self quest 0 2 1
  else
    if quest(0,2,self) == 0
      mpecho A guard comes to help $I
      mpmload 16203
      mpforce m16202 mpoload 16240
      mpforce m16202 wield i16240
      mpforce m16202 mpkill $n
      mpmadd self quest 0 2 1
    endif
  endif
endif
~
>death_prog 100~
mpmset self quest 0 2 0
mplog WITNESS: $n has killed $I on $b in the temple of Lathander (Berdusk).
mpjunk all
~
|
#16208
tailor temple~
{B0}the temple tailor~
{B0}The temple tailor is weaving some clothes here.~
This old human is clad in a wonderfully woven yellow silk robe. He
seems to be very good at his art, managing to weave perfect clothes
very quickly.
~
S 35 CLASS_FIGHTERS RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
LANG_COMMON
LANG_COMMON
%15 1 staves~
>fight_prog 20~
yell Help! I am being attacked by $N on $b in the temple of Lathander!
mpat 4000 yell Help! I am being attacked by $N on $b in the temple of Lathander!
if quest(0,2,self) == 0
  mpecho A guard comes to help $I
  mpmload 16201
  mpforce m16201 mpoload 16239
  mpforce m16201 wield i16239
  mpforce m16201 mpkill $n
  mpmadd self quest 0 2 1
else
  if quest(0,2,self) == 1
    mpecho A guard comes to help $I
    mpmload 16202
    mpforce m16202 mpoload 16235
    mpforce m16202 wield i16235
    mpforce m16202 mpkill $n
    mpmadd self quest 0 2 1
  else
    if quest(0,2,self) == 0
      mpecho A guard comes to help $I
      mpmload 16202
      mpforce m16202 mpoload 16240
      mpforce m16202 wield i16240
      mpforce m16202 mpkill $n
      mpmadd self quest 0 2 1
    endif
  endif
endif
~
>intercept_prog buy~
if deity($n) == Lathander
  mpunintercept
else
  sayto $n I only trade with followers of Lathander.
endif
~
>death_prog 100~
mpmset self quest 0 2 0
mplog WITNESS: $n has killed $I on $b in the temple of Lathander (Berdusk).
mpjunk all
~
|
#0

#OBJECTS
#16200
long yellow robe pink trim~
{B0}a long yellow robe with {D0}pink trim~
{B0}A long yellow robe with {D0}pink trim lies on the ground.~
~
ITEM_TYPE_ARMOR
0
CAN_WEAR_TAKE|CAN_WEAR_BODY
QUALITY_SUPERIOR MATERIAL_SILK COND_PERFECT SIZE_MEDIUM
0 0 LAYER_ARMOR ARMOR_TYPE_CLOTH 0 0
E
robe yellow pink trim lathander long~
This brightly coloured cloth is made of fine quality silk.
~
>give_prog 100~
mplog GIVEAWAY: $n has given i16200 (robe of Lathander) to $t.
~
|
#16201
yellow silk cap pink trim~
{B0}a yellow silk cap with {D0}pink trim~
{B0}A yellow silk cap with {D0}pink trim lies on the ground.~
~
ITEM_TYPE_ARMOR
0
CAN_WEAR_TAKE|CAN_WEAR_HEAD
QUALITY_SUPERIOR MATERIAL_SILK COND_PERFECT SIZE_MEDIUM
0 0 LAYER_ARMOR ARMOR_TYPE_CLOTH 0 0
E
yellow silk cap pink trim~
This brightly coloured cloth is made of fine quality silk.
~
#16235
broadsword sword pink handled steel~
{D0}a pink handled {70}broad sword~
{D0}A pink handled {70}broad sword lies on the ground here.~
~
ITEM_TYPE_WEAPON
0
CAN_WEAR_TAKE|CAN_WEAR_HOLD
QUALITY_HIGH MATERIAL_STEEL COND_PERFECT SIZE_MEDIUM
0 0 0 WEAPON_TYPE_BROAD_SWORD 0 0
E
broadsword sword pink handled steel~
The blade of this weapon is made of steel. Its handle is
covered with pink paint.
~
#16239
flail pink handled steel~
{D0}a pink handled {70}steel flail~
{D0}A pink handled {70}steel flail lies on the ground here.~
~
ITEM_TYPE_WEAPON
0
CAN_WEAR_TAKE|CAN_WEAR_HOLD
QUALITY_HIGH MATERIAL_STEEL COND_PERFECT SIZE_MEDIUM
0 0 0 WEAPON_TYPE_FLAIL 0 0
E
flail pink handled steel~
This weapon is made of steel. Its handle is
covered with pink paint.
~
#16240
morningstar star pink handled steel~
{D0}a pink handled {70}steel morningstar~
{D0}A pink handled {70}steel morningstar lies on the ground here.~
~
ITEM_TYPE_WEAPON
0
CAN_WEAR_TAKE|CAN_WEAR_HOLD
QUALITY_HIGH MATERIAL_STEEL COND_PERFECT SIZE_MEDIUM
0 0 0 WEAPON_TYPE_MORNING_STAR 0 0
E
morningstar star pink handled steel~
This weapon is made of steel. Its handle is
covered with pink paint.
~
#0

#ROOMS
#16201
Stone corridor~
{B0}An arched hallway circles around the small garden in the center
of this temple. Brightly coloured paintings decorate the walls. There
are many circular holes in the ceiling, to allow the rays of the sun
to light this place.
~
0 ROOM_INDOORS SECT_INSIDE 0 0 0
DDIR_EAST
~
~
0 -1 16200 1
DDIR_NORTH
~
~
0 -1 16202 1
DDIR_SOUTH
~
~
0 -1 16214 1
DDIR_WEST
~
~
0 -1 16241 1
E
paintings brightly coloured~
{90}These paintings depict the Morninglord, Lathander.
~
S
#16202
Stone corridor~
{B0}This arched hallway circles around the large garden in the center
of the temple. The floor is made of small white and yellow marble
squares that reflect the light of the sun coming in through the many
circular holes in the ceiling.
~
0 ROOM_INDOORS SECT_INSIDE 0 0 0
DDIR_NORTH
~
~
0 -1 16203 1
DDIR_SOUTH
~
~
0 -1 16201 1
S
#16203
Stone corridor~
{B0}The floor of this arched hallway is made of small yellow and white
marble squares. At dawn, when the rays of the sun comes through the
many circular holes in the ceiling, these marble squares reflect the
light and light the place.
~
0 ROOM_INDOORS SECT_INSIDE 0 0 0
DDIR_SOUTH
~
~
0 -1 16202 1
DDIR_NORTH
~
~
0 -1 16223 1
DDIR_WEST
~
~
0 -1 16204 1
S
#16219
Rose Garden~
{A0}Several roses grow in this part of the gardens. Yellow, pink,
red, and white roses move slightly with each breath of the wind,
emitting a very nice perfume. A gravel path circles around the
patches of flowers, to allow visitors and worshippers to wander
around without walking on the flowers.
~
0 0 SECT_FIELD 0 0 0
DDIR_SOUTH
~
~
0 -1 16242 1
DDIR_EAST
~
~
0 -1 16220 1
S
#16220
Garden~
{A0}In this part of the gardens, the healers of Lathander grow special
herbs that are used to brew healing potions. You can see herbs of
every colours and every sizes here. A gravel path circles around the
patches of herbs, to allow visitors and worshippers to wander
around without walking on the herbs.
~
0 0 SECT_FIELD 0 0 0
DDIR_WEST
~
~
0 -1 16219 1
DDIR_SOUTH
~
~
0 -1 16241 1
S
#16223
Temple Tailor~
{70}This small room is barely decorated. Several clothes hanging
on the wall are displayed for those who would like to buy them.
Most of them have been dyed yellow, pink, or red, the colours of
Lathander.
~
0 ROOM_INDOORS SECT_INSIDE 0 0 0
DDIR_SOUTH
~
~
0 -1 16203 1
S
#16241
Gravel Path~
{70}This small gravel path leads to the main church of Lathander to
the west and to the entrance of the temple to the east. It circles
around several patches of brightly coloured flowers and bushes. The
ground is coverd with several tiny yellow and black stones.
~
0 0 SECT_ROAD 0 0 0
DDIR_EAST
~
~
0 -1 16201 1
DDIR_NORTH
~
~
0 -1 16220 1
DDIR_SOUTH
~
~
0 -1 16222 1
DDIR_WEST
~
~
0 -1 16242 1
S
#0

#RESETS
M 0 16204 1 16219; gardener in gardens
 G 0 8512 50; sells carrot
 G 0 8521 50; sells red apple
 G 0 8030 100; sells shovel
M 0 16208 1 16223; tailor in tailor shop
 G 0 16200 30; sells yellow robe with pink trim
 G 0 16201 30; sells yellow silk cap with pink trim
S

#SHOPS
16204 ITEM_TYPE_NONE ITEM_TYPE_NONE ITEM_TYPE_NONE ITEM_TYPE_NONE
ITEM_TYPE_NONE 120 70 5 22 ; gardener buys nothing
16208 ITEM_TYPE_ARMOR ITEM_TYPE_NONE ITEM_TYPE_NONE ITEM_TYPE_NONE
ITEM_TYPE_NONE 120 70 5 22 ; tailor buys armor
0

#REPAIRS
16208 ITEM_TYPE_ARMOR ITEM_TYPE_CONTAINER SUBSTANCE_LEATHER
100 1 5 22 ; Tailor repairs armours and containers made of silk/leather
0

#SPECIALS
M 16201 spec_guard
S
#$

`