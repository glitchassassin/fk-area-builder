function createActions(prefix, actions=["ADD", "REMOVE", "SET_PROP"]) {
    let group = {}
    for (let action of actions) {
        group[action] = prefix + action
    }
    return group
}
export const GlobalActions = createActions("GLOBAL",
    ["NEW"]
)
export const UiStateActions = createActions("UI",
    [
        // Room Panel
        "OPEN_ROOM_EDITOR", "CLOSE_ROOM_EDITOR", "OPEN_ROOM_ERRORS", "CLOSE_ROOM_ERRORS",
        "OPEN_ROOM_CONFIRM_DELETE", "CLOSE_ROOM_CONFIRM_DELETE", "SET_CURRENT_ROOM",
        // Mob Panel
        "OPEN_MOB_EDITOR", "CLOSE_MOB_EDITOR", "OPEN_MOB_ERRORS", "CLOSE_MOB_ERRORS",
        "OPEN_MOB_CONFIRM_DELETE", "CLOSE_MOB_CONFIRM_DELETE", "SET_CURRENT_MOB",
        // Item Panel
        "OPEN_ITEM_EDITOR", "CLOSE_ITEM_EDITOR", "OPEN_ITEM_ERRORS", "CLOSE_ITEM_ERRORS",
        "OPEN_ITEM_CONFIRM_DELETE", "CLOSE_ITEM_CONFIRM_DELETE", "SET_CURRENT_ITEM",
    ]
)
export const AreaActions = createActions("AREA")
export const JusticeSystemActions = createActions("JUSTICE_SYSTEM")
export const RoomActions = createActions("ROOM")
export const ExitActions = createActions("EXIT")
export const ExtraDescriptionActions = createActions("EXTRA_DESCRIPTIONS")
export const ItemApplyActions = createActions("ITEM_APPLY")
export const ItemActions = createActions("ITEM_ACTIONS")
export const MobActions = createActions("MOB", 
    ["ADD", "REMOVE", "CONVERT_TO_UNIQUE", "CONVERT_TO_SIMPLE", "SET_PROP"]
)
export const TrainSkillActions = createActions("TRAIN_SKILL")
export const TrainWeaponSkillActions = createActions("TRAIN_WEAPON_SKILL")
export const TrainSpellActions = createActions("TRAIN_SPELL")
export const TrainLevelActions = createActions("TRAIN_LEVEL")
export const TrainStatisticActions = createActions("TRAIN_STATISTIC")
export const TrainFeatActions = createActions("TRAIN_FEAT")
export const ShopActions = createActions("SHOP")
export const RepairRechargeActions = createActions("REPAIR")
export const MobResetActions = createActions("MOB_RESET")
export const EquipmentResetActions = createActions("EQUIPMENT_RESET")
export const ItemResetActions = createActions("ITEM_RESET")
export const DoorResetActions = createActions("DOOR_RESET")
export const RandomDoorResetActions = createActions("RANDOM_DOOR_RESET")
export const RoomResetActions = createActions("ROOM_RESET")
export const TrapResetActions = createActions("TRAP_RESET")
export const CoinResetActions = createActions("COIN_RESET")
export const MobSpecialActions = createActions("MOB_SPECIAL")
export const QuestLogActions = createActions("QUEST_LOG")
export const ProgramActions = createActions("PROGRAM")