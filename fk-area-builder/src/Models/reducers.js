import {combineReducers} from 'redux'
import {flags} from './flags'
import {
    AreaActions, JusticeSystemActions, RoomActions, ExitActions, 
    ExtraDescriptionActions, ItemApplyActions, ItemActions, MobActions,
    TrainSkillActions, TrainWeaponSkillActions, GlobalActions,
    TrainSpellActions, TrainLevelActions, TrainStatisticActions, 
    TrainFeatActions, ShopActions, RepairRechargeActions, MobResetActions,
    EquipmentResetActions, ItemResetActions, DoorResetActions, 
    RandomDoorResetActions, RoomResetActions, TrapResetActions, 
    CoinResetActions, MobSpecialActions, QuestLogActions, ProgramActions,
    UiStateActions
} from './actionTypes'
import {
    Area, JusticeSystem, Room, Exit, ExtraDescription, ItemApply, Item, 
    SimpleMob, UniqueMob, TrainSkill, TrainWeaponSkill, TrainSpell, TrainLevel,
    TrainStatistic, TrainFeat, Shop, RepairRecharge, MobReset, EquipmentReset,
    ItemReset, DoorReset, RandomDoorReset, RoomReset, TrapReset, CoinReset,
    MobSpecial, QuestLog, Program, UiState
}
from './model_templates'

/*
 * Action definition:
 *  - type: see actionTypes.js for valid action type flags.
 *  - index: Unique object identifier for objects with multiple instances. If blank, references last item in the list
 *  - key: Property being updated on the target object
 *  - value: New value for target property
 */
 
function generateDefaultReducer(actionTypeGroup, defaultValueClass) {
    return (state=new defaultValueClass(), action)=>{
        switch (action.type) {
            case actionTypeGroup.SET_PROP:
                return { ...state, [action.key]: action.value };
            case actionTypeGroup.ADD:
                if (state === null) {
                    return new defaultValueClass();
                }
                else {
                    return state; // ADD should have no effect if an object already exists
                }
            case actionTypeGroup.REMOVE:
                return null;
            default:
                return state;
        }
    }
}
function generateDefaultListReducer(actionTypeGroup, defaultValueClass) {
    return (state=[], action) => {
        switch (action.type) {
            case actionTypeGroup.SET_PROP:
                if (state.length <= 0) {
                    return state; // No items to change
                }
                let index;
                if (action.index === undefined) {
                    index = state[state.length-1].uuid;
                } else {
                    index = action.index;
                }
                return state.map((target)=>{
                    if (target.uuid === index) {
                        return { ...target, [action.key]: action.value };
                    }
                    return target;
                });
            case actionTypeGroup.ADD:
                if (action.value) {
                    // UUID provided
                    let add = new defaultValueClass();
                    add.uuid = action.value;
                    return [
                        ...state,
                        add
                    ];
                }
                return [
                    ...state,
                    new defaultValueClass()
                ];
            case actionTypeGroup.REMOVE:
                return state.filter((target)=>(target.uuid !== action.index));
            default:
                return state;
        }
    };
}

const area = generateDefaultReducer(AreaActions, Area);
const justice_system = generateDefaultReducer(JusticeSystemActions, JusticeSystem);
const rooms = generateDefaultListReducer(RoomActions, Room);
const quest_log = generateDefaultListReducer(QuestLogActions, QuestLog);
const exits = generateDefaultListReducer(ExitActions, Exit);
const door_resets = generateDefaultListReducer(DoorResetActions, DoorReset);
const room_resets = generateDefaultListReducer(RoomResetActions, RoomReset);
const items = generateDefaultListReducer(ItemActions, Item);
const item_applies = generateDefaultListReducer(ItemApplyActions, ItemApply);
const item_resets = generateDefaultListReducer(ItemResetActions, ItemReset);
const trap_resets = generateDefaultListReducer(TrapResetActions, TrapReset);
const can_train_skill = generateDefaultListReducer(TrainSkillActions, TrainSkill);
const can_train_weapon_skill = generateDefaultListReducer(TrainWeaponSkillActions, TrainWeaponSkill);
const can_train_spell = generateDefaultListReducer(TrainSpellActions, TrainSpell);
const can_train_level = generateDefaultListReducer(TrainLevelActions, TrainLevel);
const can_train_statistic = generateDefaultListReducer(TrainStatisticActions, TrainStatistic);
const can_train_feat = generateDefaultListReducer(TrainFeatActions, TrainFeat);
const mob_resets = generateDefaultListReducer(MobResetActions, MobReset);
const equipment_resets = generateDefaultListReducer(EquipmentResetActions, EquipmentReset);
const coin_resets = generateDefaultListReducer(CoinResetActions, CoinReset);
const mob_specials = generateDefaultListReducer(MobSpecialActions, MobSpecial);
const shops = generateDefaultListReducer(ShopActions, Shop);
const repairs = generateDefaultListReducer(RepairRechargeActions, RepairRecharge);
const extra_descriptions = generateDefaultListReducer(ExtraDescriptionActions, ExtraDescription);
const programs = generateDefaultListReducer(ProgramActions, Program);

function ui_state(state=new UiState(), action) {
    switch(action.type) {
        case UiStateActions.OPEN_ROOM_EDITOR:
            return { ...state, room_editor_open:true }
        case UiStateActions.CLOSE_ROOM_EDITOR:
            return { ...state, room_editor_open:false }
        case UiStateActions.OPEN_ROOM_ERRORS:
            return { ...state, room_errors_open:true }
        case UiStateActions.CLOSE_ROOM_ERRORS:
            return { ...state, room_errors_open:false }
        case UiStateActions.OPEN_ROOM_CONFIRM_DELETE:
            return { ...state, room_confirm_delete_open:true }
        case UiStateActions.CLOSE_ROOM_CONFIRM_DELETE:
            return { ...state, room_confirm_delete_open:false }
        case UiStateActions.SET_CURRENT_ROOM:
            return { ...state, room_current_room:action.value }
        case RoomActions.ADD:
            return { ...state, room_current_room:action.value }
        case UiStateActions.OPEN_MOB_EDITOR:
            return { ...state, mob_editor_open:true }
        case UiStateActions.CLOSE_MOB_EDITOR:
            return { ...state, mob_editor_open:false }
        case UiStateActions.OPEN_MOB_ERRORS:
            return { ...state, mob_errors_open:true }
        case UiStateActions.CLOSE_MOB_ERRORS:
            return { ...state, mob_errors_open:false }
        case UiStateActions.OPEN_MOB_CONFIRM_DELETE:
            return { ...state, mob_confirm_delete_open:true }
        case UiStateActions.CLOSE_MOB_CONFIRM_DELETE:
            return { ...state, mob_confirm_delete_open:false }
        case UiStateActions.SET_CURRENT_MOB:
            return { ...state, mob_current_mob:action.value }
        case MobActions.ADD:
            return { ...state, mob_current_mob:action.value }
        case UiStateActions.OPEN_ITEM_EDITOR:
            return { ...state, item_editor_open:true }
        case UiStateActions.CLOSE_ITEM_EDITOR:
            return { ...state, item_editor_open:false }
        case UiStateActions.OPEN_ITEM_ERRORS:
            return { ...state, item_errors_open:true }
        case UiStateActions.CLOSE_ITEM_ERRORS:
            return { ...state, item_errors_open:false }
        case UiStateActions.OPEN_ITEM_CONFIRM_DELETE:
            return { ...state, item_confirm_delete_open:true }
        case UiStateActions.CLOSE_ITEM_CONFIRM_DELETE:
            return { ...state, item_confirm_delete_open:false }
        case UiStateActions.SET_CURRENT_ITEM:
            return { ...state, item_current_item:action.value }
        case ItemActions.ADD:
            return { ...state, item_current_item:action.value }
        default:
            return state
    }
}


function mobs(state=[], action) {
    let index;
    if (action.index === undefined && state.length > 0) {
        index = state[state.length-1].uuid;
    } else {
        index = action.index;
    }
    switch (action.type) {
        case MobActions.SET_PROP:
            if (state.length <= 0) {
                return state; // No items to change
            }
            return state.map((target)=>{
                if (target.uuid === index) {
                    return { ...target, [action.key]: action.value }
                }
                return target
            })
        case MobActions.ADD:
            return [
                ...state,
                new SimpleMob()
            ]
        case MobActions.REMOVE:
            if (state.length <= 0) {
                return state; // No items to change
            }
            return state.filter((target)=>(target.uuid !== index));
        case MobActions.CONVERT_TO_SIMPLE:
            if (state.length <= 0) {
                return state; // No items to change
            }
            return state.map((target)=>{
                if (target.uuid === index) {
                    let simple = {...target, unique:false}
                    for (let field of ["affect_flags", "virtual_armor_type", "virtual_armor_material", "alignment", "str", "int", "wis", "dex", "con", "cha", "lck", "ris_resistant", "ris_immune", "ris_susceptible"]) {
                        delete simple[field];
                    }
                    return simple;
                }
                return target
            })
        case MobActions.CONVERT_TO_UNIQUE:
            if (state.length <= 0) {
                return state; // No items to change
            }
            return state.map((target)=>{
                if (target.uuid === index) {
                    return new UniqueMob({...target, unique:true})
                }
                return target
            })
        default:
            return state;
    }
}


const subReducers = combineReducers({
    area,                   // Default: Area
    justice_system,         // Default: JusticeSystem
    quest_log,              // Default: Array
    // Rooms
    rooms,                  // Default: Array
    exits,                  // Default: Array // Contains reference to a Room UUID
    door_resets,            // Default: Array // Contains reference to a Room UUID
    room_resets,            // Default: Array // Contains reference to a Room UUID
    // Items
    items,                  // Default: Array
    item_applies,           // Default: Array // Contains reference to an Item UUID
    item_resets,            // Default: Array // Contains reference to an Item UUID and Room UUID // TODO: How to spawn generic mobs? UUID reference to Library?
    trap_resets,            // Default: Array // Contains reference to an Item Reset, Door Reset, or Equipment Reset UUID
    // Mobs
    mobs,                   // Default: Array
    can_train_skill,        // Default: Array // Contains reference to a Mob UUID
    can_train_weapon_skill, // Default: Array // Contains reference to a Mob UUID
    can_train_spell,        // Default: Array // Contains reference to a Mob UUID
    can_train_level,        // Default: Array // Contains reference to a Mob UUID
    can_train_statistic,    // Default: Array // Contains reference to a Mob UUID
    can_train_feat,         // Default: Array // Contains reference to a Mob UUID
    mob_resets,             // Default: Array // Contains reference to a Mob UUID // TODO: How to spawn generic mobs? UUID reference to Library?
    equipment_resets,       // Default: Array // Contains reference to a Mob Reset UUID and Item UUID // TODO: What about generic stock items? UUID reference to Library?
    coin_resets,            // Default: Array // Contains reference to a Mob Reset UUID
    mob_specials,           // Default: Array // Contains reference to a Mob UUID
    shops,                  // Default: Array // Contains reference to a Mob UUID
    repairs,                // Default: Array // Contains reference to a Mob UUID
    // Generic
    extra_descriptions,     // Default: Array // Contains reference to a Mob, Item, or Room UUID
    programs,               // Default: Array // Contains reference to a Mob, Item, or Room UUID
    // UI
    ui_state
})

const reducers = (state, action) => {
    if (action.type === GlobalActions.NEW) {
        state = undefined;
    }
    
    return subReducers(state, action);
}

export default reducers;