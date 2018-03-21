import React, { Component } from 'react';
import './App.css';
import MainFrame from './main_frame';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import populateArea from './Models/loader';
import GoogleDriveMenu from './tab_panels/GoogleDriveMenu';
import { withStyles, withTheme } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { connect } from 'react-redux';
import { GlobalActions } from './Models/actionTypes';
import CssBaseline from 'material-ui/CssBaseline';

const theme = createMuiTheme();
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
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
    status: <IconButton id="unsaved" tooltip="Unsaved Changes"><Icon style={{color:this.props.theme.palette.primary.contrastText}}>warning</Icon></IconButton>
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.props.state) {
      this.setState({ status: <IconButton id="unsaved" tooltip="Unsaved Changes"><Icon style={{color:this.props.theme.palette.primary.contrastText}}>warning</Icon></IconButton> });
    }
  }
  componentDidMount() {
    window.onbeforeunload = (e) => {
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
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.openMenu} color="inherit" aria-label="Menu" className={this.props.classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <GoogleDriveMenu 
              open={this.state.menuOpen}
              setStatus={this.setStatus}
              onFileLoad={this.props.loadArea} 
              closeMenu={this.closeMenu}
              onNew={this.props.newArea}
              anchor={this.state.menuAnchor} />
            <Typography variant="title" color="inherit" align="center" className={this.props.classes.flex}>
              {"Forgotten Kingdoms Area Builder" + (this.props.title ? " | " + this.props.title : "")}
            </Typography>
            {this.state.status}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
AppHeader = connect(
  (state) => {
    return {
      state: state,
      title: state.area.name
    };
  },
  (dispatch) => {
    return {
      newArea: ()=>{
        dispatch({ type: GlobalActions.NEW })
      },
      loadArea: (area)=>{
        if (area) {
          populateArea(area, dispatch);
        }
      }
    }
  }
)(AppHeader);

var ThemedAppHeader = withStyles(styles)(withTheme()(AppHeader));

export default App;

// eslint-disable-next-line
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
// eslint-disable-next-line
var testArea2 = `
                                                                     
                                                                     
                                                                     
                                             
#AREA {40}Sample Area~



#AUTHOR Bobthebuilder~

#JUSTICE
CourtRoom 0
Dungeon 0
Judge 0
Guard 0
Crime CRIME_HIGH_MURDER PUNISHMENT_NOT_ENFORCED
Crime CRIME_LOW_MURDER PUNISHMENT_NOT_ENFORCED
Crime CRIME_ASSAULT PUNISHMENT_NOT_ENFORCED
Crime CRIME_MUGGING PUNISHMENT_NOT_ENFORCED
$

#RANGES
0 65 0 65
$

#RESETMSG {80}You hear the reset echo of builders looking at samples!~

#FLAGS
0 15

#PROGRAMS
#END

#ECONOMY 0 0

#WEATHER 5 5

#QUESTS
QQ00 0 1 1 1 {F0}This is a QBIT with one switch: on, 1, and off,0.
QQ00 1 2 1 1 {E0}This is a QBIT with four stages: 0, 1, 2, and 3.
QQ00 1 2 2 2 {E0}The steps should be this color blue.
QQ00 1 2 3 3 {A0}The end should be colored green. You completed the quest.
QQ00 3 2 1 1 {E0}Ranges of bits always begin at the sum of the first two numbers
QQ00 3 2 1 3 {E0}This bit will appear during the entire range of these bits.
QQ00 3 2 2 2 {E0}of the range before them. So in this case 1 + 2 = 3. Just like
QQ00 3 2 3 3 {A0}how 0 + 1 = 1 to begin the second range at 1.
QQ00 5 3 1 1 {E0}Will you learn about programs from Bob?
QQ00 5 3 2 6 {E0}You are learning about programs from Bob and Steve.
QQ00 5 3 2 2 {E0}Speech programs are handy!
QQ00 5 3 3 3 {E0}Intercept programs are handy, but you need to be careful.
QQ00 5 3 4 4 {E0}Speech programs with P look for exact phrases.
QQ00 5 3 5 5 {E0}Bob taught you about give progams.
QQ00 5 3 5 5 {E0}Bob told you to talk to Steve next.
QQ00 5 3 6 6 {E0}Steve told you about basic program structure.
QQ00 5 3 7 7 {A0}Steve told you about some ways to show mobile actions.
QQ00 5 3 7 7 {A0}Steve finished up the brief lesson. Look at the Builder Lessons.
-1

#MOBILES
#QQ00
human man male bob simple~
{90}Bob~
{90}Bob the simple mobile stands here.~
{80}1234567890123456789012345678901234567890123456789012345678901234567890
Bob looks awfully simple. Here is where you can describe how simple he
looks. You should keep the lines of that description within 70 invidu-
al characters so that all clients can see them correctly.  They do not
have to be justified on both sides, but I think that looks nice.
(Color codes do not count against the seventy characters.)~
S 15 CLASS_WARRIOR RACE_HUMAN SEX_MALE POS_STANDING DEITY_NONE
ACT_SENTINEL|ACT_CITIZEN
LANG_COMMON
LANG_COMMON
>greet_prog 100~
if questr(QQ00, 5, 3, $n) == 0
  sayto $n Let me tell you a little bit about different kinds of programs.
  sayto $n This is a greet program that triggers when you walk into the room
  sayto $n with me. It triggers based on the percent above. This one triggers
  sayto $n 100% of the time.
  sayto $n Do you want to learn about programs?
  mpmset $n questr QQ00 5 3 1
endif
~
>speech_prog yes yea ay aye~
if questr(QQ00, 5, 3, $n) == 1
  mpmset $n questr QQ00 5 3 2
  sayto $n Great. I just set a QBIT on you and made two entries appear in your QLOG.
  smote points up to the QUESTS section above.
  pause 1
  sayto $n One tells you that I am teaching you, it will stick throughout the lesson,
  sayto $n and the other tells you that right now I am talking about speech programs.
  pause 1
  sayto $n Speech programs trigger when someone says a word or words. They are very handy.
  sayto $n Read the lesson about them for more info. This is a great opportunity for you to
  sayto $n Breathe life into your mobiles.
  sayto $n Now sit down.
endif
~
>intercept_prog sit~
if questr(QQ00, 5, 3, $n) == 2
  mpmset $n questr QQ00 5 3 3
  mpunintercept
  sayto $n Great! These programs trigger when someone uses a specific command.
  sayto $n It can be a real one or one that you made up.
  sayto $n Remember to add the MPUNINTERCEPT command so that it does not stop
  sayto $n them completely (unless you want it to), otherwise they will not be
  sayto $n able to successfully execute the command.
  pause 1 Now repeat after me: I like bunny rabbits
else
  mpunintercept
endif
~
>speech_prog p I like bunny rabbits~
if questr(QQ00, 5, 3, $n) == 3
  mpmset $n questr QQ00 5 3 4
  sayto $n This kind of speech prog (with a P added in) looks for
  sayto $n a specific arrangement of words instead of just the words
  sayto $n themselves.
  mpoload QQ00
  mpgive iQQ00 $n
  sayto $n Now give that back to me.
endif
~
>give_prog iQQ00~
if questr(QQ00, 5, 3, $n) == 4
  mpmset $n questr QQ00 5 3 5
  mpjunk iQQ00
  sayto $n See that? I gave you an object and then you gave it back to me, triggering
  sayto $n a GIVE_PROG. I created the object with the mpoload command, gave it to you
  sayto $n with MPGIVE and then destroyed it with MPJUNK. (You can MPOLOAD with just the
  sayto $n item's VNUM, but the best keyword to use with the item after that is the
  sayto $n letter i + the VNUM, so iVNUM or iQQ00.) 
  pause 1
  sayto $n This is the basic lesson on useful programs. Go see unique mobile Steve for more info.
endif
~
|
#QQ01
human man male Steve unique~
{D0}Steve~
{D0}Steve the unique mobile stands here.~
{D0}1234567890123456789012345678901234567890123456789012345678901234567890
Steve is a unique mobile. He is different from Bob because you can set
his specific skills and he will not load anything that you do not tell
him to load (whereas Steve will start with a low amount of cash, Steve
will have nothing in his inventory).~
U 15 CLASS_WARRIOR RACE_HUMAN SEX_MALE POS_STANDING DEITY_NONE
ACT_SENTINEL|ACT_CITIZEN|ACT_NOSHOVE
AFF_NONE
ARMOR_TYPE_LEATHER MATERIAL_LEATHER
ALIGN_TRUE_NEUTRAL
16 13 13 16 18 13 13 
LANG_COMMON
LANG_COMMON
RIS_NONE RIS_NONE RIS_NONE
>greet_prog 100~
if questr(QQ00, 5, 3, $n) == 5
  mpmset $n questr QQ00 5 3 6
  sayto $n Hi there. Bob must have sent you.
  sayto $n Let's talk about components of a program.
  sayto $n Every program has a title, then any if checks, the the results.
  sayto $n IFs must have an ENDIF.
  sayto $n Some IFs also have an ELSE in between. See this one and then sit down.
else
  sayto $n Go see Bob first!
endif
~
>intercept_prog rest~
if questr(QQ00, 5, 3, $n) == 6
  mpmset $n questr QQ00 5 3 7
  sayto $n You have a whole bunch of echo commands available to show what I am doing, but
  sayto $n but sometimes it is easier to just use smote. See below.
  smote waves at @$N.
  sayto $n Smote uses @ before its targets. So when I do @$N it means that you will see 'you' and everyone else will see your name
  sayto $n (if they have greeted you) or your adjective (if they have not).
  mpechoat $n $I waves at you.
  sayto $n Here, with mpechoat, you just see that ($I means my full short description - so Steve in this case).
  mpechoaround $n $I waves at @N.
  sayto $n With mpechoaround it shows to everyone else in the room, so I used @N to just show them your adjective if you are not greeted.
  sayto $n mpechoat and mpechoaround should be paired up to make sense.
  pause 1
  sayto $n Here is one for use when you want to show the same thing to everyone.
  mpecho {F0}A bright light shines around the room!
  sayto $n And that pause thing that I keep doing makes the program pause for as many seconds as I tell it to.
  pause 1
  sayto $n That's one second.
  pause 10
  sayto $n That's ten seconds.
  wave $n
  sayto $n Go read the lessons!
endif
~
|
#QQ02
horse female mare~
{30}a mare~
{30}A mare is here.~
{30}I am an example horse with a random prog to make me poop.~
S 12 CLASS_MONSTER RACE_HORSE SEX_FEMALE POS_STANDING DEITY_NONE
ACT_SENTINEL|ACT_MOUNTABLE
LANG_ANIMAL
LANG_ANIMAL
>rand_prog 1~
if sector($i) == 1
  if rand(20)
    mpecho $I cocks her tail and poops!
    mpoload 8580
    mpquiet on
    drop i8580
    mpquiet off
  endif
endif
~
|
#QQ03
human man male igor hunchback~
{90}Igor~
{90}Igor the hunchback "stands" here.~
{80}
1234567890123456789012345678901234567890123456789012345678901234567890
Igor is just here to tell you some more things about programs. None of
his dialog is run by a quest.~
S 15 CLASS_WARRIOR RACE_HUMAN SEX_MALE POS_STANDING DEITY_NONE
ACT_SENTINEL|ACT_CITIZEN
LANG_COMMON
LANG_COMMON
>greet_prog 100~
if race($n) != orc
  smote looks up at @$N and waves.
  sayto $n Glad that you are not an orc. I don't talk to them.
  smote nudges @mQQ01
  sayto mQQ01 Right, Steve?
  mpforce mQQ01 nod
  pause 1
  sayto $n I will tell you something about programs and show you how to use random functions.
  pause 1
  sayto $n Which do you want to hear about?
else
  smote furiously rings in invisible bell.
  yell Orc! Orc!
endif
~
>speech_prog programs something~
if race($n) != orc
  smote claps his big hands together.
  sayto $n Still glad that you are not an orc.
  pause 1
  sayto $n The math for calculating QBITs confuses many people so here is an easy list.
  sayto $n If second number is '1', then the the highest value is 1
  sayto $n If second number is '2', then the the highest value is 3
  sayto $n If second number is '3', then the the highest value is 7
  sayto $n If second number is '4', then the the highest value is 15
  sayto $n If second number is '5', then the the highest value is 31
  sayto $n If second number is '6', then the the highest value is 63
  smote gives @$N some time to digest the information.
  pause 5
  sayto $n Okay. Watch this now. I will check if you asked me something already
  sayto $n and respond accordingly.
  if questr(QQ00, 0, 1, $i) == 0
    mpmset $n questr QQ00 0 1 1
    sayto $n Okay. Remember to ask me about random functions.
  else
    if questr(QQ00, 0, 1, $i) == 1
      wave
      sayto $n Thanks for asking me about programs and random programs!
    endif
  endif
else
  sayto $n Nasty orc.
endif
~
>speech_prog random rand functions~
if race($n) != orc
  smote smiles stupidly.
  sayto $n Random programs are simple to use, but remember that your target in a random
  sayto $n program is $r, not $n.
  pause 2
  sayto $n There is also an if check for random results. It goes if rand(%). So it would
  sayto $n look like if rand(50) for fifty percent.
  pause 1
  sayto $n If you use if rand then remember that subsequent rand checks are checking against
  sayto $n the remaining percent, not the total.
  sayto $n So to have three results with equal chances then you would check first for 33 percent
  sayto $n and then for 50 percent (50% of the remaining 66%, ergo 33%).
  pause 1
  sayto $n You can wait a minute to see a random program work or you can try to sleep to see how
  sayto $n if rand checks work.
  sayto $n Okay. Watch this now. I will check if you asked me something already
  sayto $n and respond accordingly.
  if questr(QQ00, 0, 1, $i) == 0
    mpmset $n questr QQ00 0 1 1
    sayto $n Okay. Remember to ask me about programs.
  else
    if questr(QQ00, 0, 1, $i) == 1
      wave
      sayto $n Thanks for asking me about programs and random programs!
    endif
  endif
else
  sayto $n Nasty orc.
endif
~
>rand_prog 10~
yell There is a ten percent chance each round that I will yell like this and point at someone!
point $r
~
>intercept_prog sleep~
yell If you try to sleep then there are all kinds of things that I do!
pause 1
sayto $n There are three sets of results with even chances that each, within them, have results
sayto $n also with even chances.
if rand(33)
  say First of three results with even chances of occuring.
  if rand(50)
    say First of two results with even chances of occuring.
  else
    say Second of two results with even chances of occuring.
  endif
else
  if rand(50)
    say Second of three results with even chances of occuring.
    if rand(25)
      say First of four results with even chances of occuring.
    else
      if rand(33)
        say Second of four results with even chances of occuring.
      else
        if rand(50)
          say Third of four results with even chances of occuring.
        else
          say Fourth of four results with even chances of occuring.
        endif
      endif
    endif
  else
    say Third of three results with even chances of occuring.
    if rand(20)
      say First of five results with even chances of occuring.
    else
      if rand(25)
        say Second of five results with even chances of occuring.
      else
        if rand(33)
          say Third of five results with even chances of occuring.
        else
          if rand(50)
            say Fourth of five results with even chances of occuring.
          else
            say Fifth of five results with even chances of occuring.
          endif
        endif
      endif
    endif 
  endif
endif
~
>intercept_prog north~
if questr(QQ00, 0, 1, $i) == 1
  mpmset $i QQ00 0 1 0
  say I reset myself when you leave!
  mpunintercept
else
  mpunintercept
endif
~
|

#0


#OBJECTS
#QQ00
token plain generic~
{B0}a plain, generic token~
{B0}A plain, generic token is lying here.~
~
ITEM_TYPE_TREASURE
0
CAN_WEAR_TAKE|CAN_WEAR_HOLD
QUALITY_AVERAGE MATERIAL_WOOD COND_PERFECT SIZE_TINY
0 0 0 0 LAYER_ALL 0
E
token plain generic~
A PC can just use the keywords token, plain, and generic for me, but
ol' Bob can use my VNUM + i so I become iQQ01 to him!
~

#0


#ROOMS
#QQ00
Bob's Room~
{30}1234567890123456789012345678901234567890123456789012345678901234567890
This is Bob's room. It connects to Steve's. It also has a sign hanging
to show that it belongs to Bob. Remember to put in exits that you want
and to put in any extra keywords to look at.  This room is grassy, but
it is inside so that weather does not affect it.
~
0 ROOM_INDOORS SECT_FIELD 0 0 0
DDIR_SOUTH
~
{30}wooden door~
EX_ISDOOR|EX_CLOSED -1 QQ01 0
E
sign~
The sign below has really ugly colors.
{B0}XXXXXXXXXXXX
{B0}XX{D0}..{F0}Bob's{D0}.{B0}XX
{B0}XX{D0}.{F0}Room{D0}...{B0}XX
{B0}XXXXXXXXXXXX

But it looks like this (with colors) to players.

XXXXXXXXXXXX
XX..Bob's.XX
XX.Room...XX
XXXXXXXXXXXX
~
S
#QQ01
Steve's Room~
{30}1234567890123456789012345678901234567890123456789012345678901234567890
Steve's room looks a lot like Bob's room, it has the same door, but it
has a program instead of a sign (but it could have both).  Notice that
once there is a program here then it needs a pipe above the S and just
below the last tilde.
~
0 ROOM_INDOORS SECT_FIELD 0 0 0
DDIR_NORTH
~
{30}wooden door~
EX_ISDOOR|EX_CLOSED -1 QQ00 0
>greet_prog 100~
ifmobinroom(QQ01)
  if sex($n) == 2
    mpforce mQQ01 say Woooo! A girl entered the room.
  else
    mpforce mQQ01 say A guy entered the room! (Steve wishes that it was a girl.)
  endif
else
  mpecho {60}The supermob says, "{70}If Steve were here in the room then I would make him say something{60}."
endif
~
|
S
#0


#RESETS
M 0 QQ00   1 QQ00 ;          One Bob mobile in Bob's room
M 0 QQ01   1 QQ01 ;          One Steve mobile in Steve's room
M 0 QQ03   1 QQ01 ;          One Igor mobile in Steve's room
D 0 QQ00 DIR_SOUTH DOOR_CLOSED_UNLOCKED ; the door from Bob's room to Steve's will close on reset if no one is around
S


#SHOPS
0


#REPAIRS
0


#SPECIALS
S


#$
`