import { createStore } from 'redux'
import { reduxBatch } from '@manaflair/redux-batch'
import reducers from './reducers'
import {
    AreaActions, JusticeSystemActions, RoomActions, ExitActions, 
    ExtraDescriptionActions, ItemApplyActions, ItemActions, MobActions,
    TrainSkillActions, TrainWeaponSkillActions, 
    TrainSpellActions, TrainLevelActions, TrainStatisticActions, 
    TrainFeatActions, ShopActions, RepairRechargeActions, MobResetActions,
    EquipmentResetActions, ItemResetActions, DoorResetActions, 
    RandomDoorResetActions, RoomResetActions, TrapResetActions, 
    CoinResetActions, MobSpecialActions, QuestLogActions, ProgramActions
} from './actionTypes'

let store = createStore(reducers, reduxBatch)

export default store;