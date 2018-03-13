import {combineReducers} from 'redux'
import {flags} from './flags'
import {
    JusticeSystemActions, RoomActions
    
} from './actionTypes'
import {
    Area, JusticeSystem, Room, Exit, ExtraDescription, ItemApply, Item, 
    SimpleMob, UniqueMob, TrainSkill, TrainWeaponSkill, TrainSpell, TrainLevel,
    TrainStatistic, TrainFeat, Shop, RepairRecharge, MobReset, EquipmentReset,
    ItemReset, DoorReset, RandomDoorReset, RoomReset, TrapReset, CoinReset,
    MobSpecial, QuestLog, Program
}
from './model_templates'

const initialState = {
    area:               new Area(),
    justice_system:     null,
    quest_log:              [],
    // Rooms
    rooms:                  [],
    exits:                  [], // Contains reference to a Room UUID
    door_resets:            [], // Contains reference to a Room UUID
    room_resets:            [], // Contains reference to a Room UUID
    // Items
    items:                  [],
    special_applies:        [], // Contains reference to an Item UUID
    item_resets:            [], // Contains reference to an Item UUID and Room UUID // TODO: How to spawn generic mobs? UUID reference to Library?
    trap_resets:            [], // Contains reference to an Item Reset, Door Reset, or Equipment Reset UUID
    // Mobs
    mobs:                   [],
    can_train_skill:        [], // Contains reference to a Mob UUID
    can_train_weapon_skill: [], // Contains reference to a Mob UUID
    can_train_spell:        [], // Contains reference to a Mob UUID
    can_train_level:        [], // Contains reference to a Mob UUID
    can_train_statistic:    [], // Contains reference to a Mob UUID
    can_train_feat:         [], // Contains reference to a Mob UUID
    mob_resets:             [], // Contains reference to a Mob UUID // TODO: How to spawn generic mobs? UUID reference to Library?
    equipment_resets:       [], // Contains reference to a Mob Reset UUID and Item UUID // TODO: What about generic stock items? UUID reference to Library?
    coin_resets:            [], // Contains reference to a Mob Reset UUID
    mob_specials:           [], // Contains reference to a Mob UUID
    shops:                  [], // Contains reference to a Mob UUID
    repairs:                [], // Contains reference to a Mob UUID
    // Generic
    extra_descriptions:     [], // Contains reference to a Mob, Item, or Room UUID
    programs:               [], // Contains reference to a Mob, Item, or Room UUID
}

/*
 * Action definition:
 *  - type: see actionTypes.js for valid flags.
 *  - index: Unique object identifier for objects with multiple instances.
 *
 */

function justice_system(state=new JusticeSystem(), action) {
    switch (action.type) {
        case JusticeSystemActions.SET_PROP:
            return { ...state, [action.key]: action.value }
        case JusticeSystemActions.ADD:
            if (state === null) {
                return new JusticeSystem()
            }
            else {
                return state // ADD should have no effect if a justice system already exists
            }
        case JusticeSystemActions.REMOVE:
            return null
        default:
            return state;
    }
}

function rooms(state=[], action) {
    switch (action.type) {
        case RoomActions.SET_PROP:
            return state.map((room)=>{
                if (room.uuid === action.uuid) {
                    return { ...room, [action.key]: action.value }
                }
            })
        case RoomActions.ADD:
            if (state === null) {
                return [
                    ...state,
                    new Room()
                ]
            }
            else {
                return state
            }
        case RoomActions.REMOVE:
            return null
        default:
            return state;
    }
}

function area(state=new Area(), action) {
    switch (action.type) {
        case Area.SET_PROP:
            return { ...state, [action.key]: action.value }
        case Area.NEW:
            return new Area()
        default: // Pass action down to children
            return combineReducers({
                justice_system,
                rooms,
                items,
                mobs,
                mob_specials,
                quest_log
            })(state, action)
    }
}