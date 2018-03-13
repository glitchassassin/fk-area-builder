function createActions(prefix, actions) {
    let group = {}
    for (let action of actions) {
        group[action] = prefix + action
    }
    return group
}

export const Area = createActions(
    "AREA", 
    ["ADD", "SET_PROP"]
)
export const JusticeSystemActions = createActions(
    "JUSTICE_SYSTEM", 
    ["ADD", "REMOVE", "SET_PROP"]
)
export const RoomActions = createActions(
    "ROOM", 
    ["ADD", "REMOVE", "SET_PROP"]
)
export const ExitActions = {
    ADD_EXIT: "ADD_EXIT",
    REMOVE_EXIT: "REMOVE_EXIT"
}
export const ExtraDescriptionActions = {
    
}
export const ItemApplyActions = {
    
}
export const ItemActions = {
    
}
export const SimpleMobActions = {
    
}
export const UniqueMobActions = {
    
}
export const TrainSkillActions = {
    
}
export const TrainWeaponSkillActions = {
    
}
export const TrainSpellActions = {
    
}
export const TrainLevelActions = {
    
}
export const TrainStatisticActions = {
    
}
export const TrainFeatActions = {
    
}
export const ShopActions = {
    
}
export const RepairRechargeActions = {
    
}
export const MobResetActions = {
    
}
export const EquipmentResetActions = {
    
}
export const ItemResetActions = {
    
}
export const DoorResetActions = {
    
}
export const RandomDoorResetActions = {
    
}
export const RoomResetActions = {
    
}
export const TrapResetActions = {
    
}
export const CoinResetActions = {
    
}
export const MobSpecialActions = {
    
}
export const QuestLogActions = {
    
}
export const ProgramActions = {
    
}