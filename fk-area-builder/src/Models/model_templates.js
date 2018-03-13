var flags = require("./flags.js");
var uuid = require('uuid/v4');

class Area {
    constructor(fields) {
        super(Object.assign({
            uuid:                   uuid(),
            name:                   "",
            category:               flags.AREA_CATEGORIES.INCOMPLETE,
            authors:                "",
            vnum:                   "QQ00",
            justice_system:         null,
            min_recommended_level:  1,
            max_recommended_level:  65,
            min_enforced_level:     0,
            max_enforced_level:     65,
            reset_msg:              "",
            wilderness_flag:        0,
            reset_duration:         0,
            economy_min:            5000,
            economy_max:            5000,
            weather_humidity:       5,
            weather_temperature:    5,
            mining_material:        null,
            logging_material:       null,
        }, fields))
    }
}

class JusticeSystem {
    constructor(fields) {
        super(Object.assign({
            courtroom:  null,
            dungeon:    null,
            judge:      null,
            guard:      null,
            CRIME_HIGH_MURDER: flags.JUSTICE_PUNISHMENTS.PUNISHMENT_NOT_ENFORCED,
            CRIME_LOW_MURDER: flags.JUSTICE_PUNISHMENTS.PUNISHMENT_NOT_ENFORCED,
            CRIME_ASSAULT: flags.JUSTICE_PUNISHMENTS.PUNISHMENT_NOT_ENFORCED,
            CRIME_MUGGING: flags.JUSTICE_PUNISHMENTS.PUNISHMENT_NOT_ENFORCED,
        }, fields))
    }
}

class Room {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            vnum:               "",
            sdesc:              "",
            ldesc:              "",
            defunct:            "0",
            sector:             null,
            room_flags:         [],
            teleport_delay:     "0",
            teleport_target:    "0",
            tunnel:             "0",
        }, fields));
    }
    
}

class Exit {
    constructor(fields) {
        super(Object.assign({
            uuid:                   uuid(),
            room:                   null,   // Room UUID pointer
            direction:              null,
            comment:                "",
            somewhere_door_keyword: "",
            // Flags                    
            door_flags:             [],
            door_key:               null,
            target_vnum:            null,
            exit_size:              flags.EXIT_SIZES.EXIT_SIZE_ANY,
        }, fields))
    }
    
}

class ExtraDescription {
    constructor(fields) {
        super(Object.assign({
            uuid:       uuid(),
            pointer:    null,   // Room, Item, or Mob UUID pointer
            keywords:   "",
            ldesc:      "",
        }, fields))
    }
    
}

class ItemApply {
    constructor(fields) {
        super(Object.assign({
            uuid:       uuid(),
            pointer:    null,   // Item UUID pointer
            apply_flag: null,
            parameter:  "",
        }, fields))
    }
    
}

class Item {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            vnum:               "",
            sdesc:              "",
            ldesc:              "",
            keywords:           "",
            action_description: "",
            item_type:          flags.ITEM_TYPES.ITEM_TYPE_NONE,
            quality:            null,
            material:           null,
            condition:          null,
            size:               null,
            attributes:         [],
            wear_flags:         [],
            value0:             0,
            value1:             0,
            value2:             0,
            value3:             0,
            value4:             0,
            value5:             0,
            identify_message:   "",
        }, fields));
    }
    
    
}

class SimpleMob {
    constructor(fields, values) {
        super(Object.assign({
            uuid:                   uuid(),
            vnum:                   "",
            sdesc:                  "",
            ldesc:                  "",
            fulldesc:               "",
            keywords:               "",
            level:                  "",
            mob_class:              null,
            race:                   null,
            sex:                    null,
            position:               null,
            act_flags:              [],
            deity:                  flags.MOB_DEITIES.DEITY_NONE,
            understood_languages:   [flags.LANGUAGE_FLAGS.LANG_COMMON],
            spoken_languages:       [flags.LANGUAGE_FLAGS.LANG_COMMON],
            shop:                   null,
            repairs:                null,
        }, fields));
    }
    
    
    
}

class UniqueMob extends SimpleMob {
    constructor(fields) {
        super(Object.assign({
            affect_flags:           [flags.MOB_AFFECTS.AFF_NONE],
            virtual_armor_type:     null,
            virtual_armor_material: null,
            alignment:              null,
            str:                    13,
            int:                    13,
            wis:                    13,
            dex:                    13,
            con:                    13,
            cha:                    13,
            lck:                    13,
            ris_resistant:          [flags.MOB_RIS.RIS_NONE],
            ris_immune:             [flags.MOB_RIS.RIS_NONE],
            ris_susceptible:        [flags.MOB_RIS.RIS_NONE],
        }, fields));
    }
    
    
}

class TrainSkill {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            mob:                null,   // Mob UUID pointer
            level:              10,
            price_multiplier:   1,
            skill:              null,
        }, fields))
    }
    
}

class TrainWeaponSkill {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            mob:                null,   // Mob UUID pointer
            level:              10,
            price_multiplier:   1,
            weapon_skill:       null,
        }, fields))
    }
    
}

class TrainSpell {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            mob:                null,   // Mob UUID pointer
            level:              10,
            price_multiplier:   1,
            spell:              null,
        }, fields))
    }
    
}

class TrainLevel {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            mob:                null,   // Mob UUID pointer
            level:              10,
            price_multiplier:   1,
        }, fields))
    }
    
}

class TrainStatistic {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            mob:                null,   // Mob UUID pointer
            level:              10,
            price_multiplier:   1,
            statistic:          null,
        }, fields))
    }
    
}

class TrainFeat {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            mob:                null,   // Mob UUID pointer
            level:              1,
            price_multiplier:   1,
            feat:               null,
        }, fields))
    }
    
}

class Shop {
    constructor(fields) {
        super(Object.assign({
            uuid:           uuid(),
            shopkeeper:     null,   // Mob UUID pointer
            will_buy_1:     flags.ITEM_TYPES.ITEM_TYPE_NONE,
            will_buy_2:     flags.ITEM_TYPES.ITEM_TYPE_NONE,
            will_buy_3:     flags.ITEM_TYPES.ITEM_TYPE_NONE,
            will_buy_4:     flags.ITEM_TYPES.ITEM_TYPE_NONE,
            will_buy_5:     flags.ITEM_TYPES.ITEM_TYPE_NONE,
            profit_buy:     150,
            profit_sell:    50,
            open_hour:      7,
            close_hour:     19,
        }, fields))        }
    
}

class RepairRecharge {
    constructor(fields) {
        super(Object.assign({
            uuid:               uuid(),
            shopkeeper:         null,   // Mob UUID pointer
            will_repair_1:      flags.ITEM_TYPES.ITEM_TYPE_NONE,
            will_repair_2:      flags.ITEM_TYPES.ITEM_TYPE_NONE,
            repair_material:    null,
            profit_modifier:    100,
            repair:             null,
            open_hour:          7,
            close_hour:         19,
        }, fields))
    }
    
}

class MobReset {
    constructor(fields) {
        super(Object.assign({
            uuid:       uuid(),
            defunct:    0,
            mob:        null,   // Mob UUID pointer
            mob_limit:  1,
            room:       null,
            equipment:  [],
            coins:      [],
            
        }, fields))
    }
    
}

class EquipmentReset {
    constructor(fields) {
        super(Object.assign({
            uuid:           uuid(),
            defunct:        "0",
            mob_reset:      null,   // Mob Reset UUID pointer
            item:           null,   // Item UUID pointer
            equip_limit:    "1",
            wear_loc:       null,
            trap_reset:     null,
        }, fields))
    }
    
}

class ItemReset {
    constructor(fields) {
        super(Object.assign({
            uuid:           uuid(),
            defunct:        "0",
            item:           null,   // Item UUID pointer
            item_limit:     "1",
            room_container: null,
            hidden:         false,
            buried:         false,
            trap_reset:     null,
            contents:       [],
        }, fields))
    }
    
}

class DoorReset {
    constructor(fields) {
        super(Object.assign({
            uuid:           uuid(),
            defunct:        "0",
            room:           null, // Room UUID pointer
            exit:           null,
            exit_state:     null,
            trap_reset:     null,
        }, fields))
    }
    
}

class RandomDoorReset {
    constructor(fields) {
        super(Object.assign({
            uuid:           uuid(),
            defunct:        0,
            room:           null, // Room UUID pointer
            last_door:      "",
        }, fields))
    }
    
}

class RoomReset {
    constructor(fields) {
        super(Object.assign({
            uuid:           uuid(),
            defunct:        0,
            room:           null, // Room UUID pointer
            bit_type:       null,
            flag:           null,
        }, fields))
    }
    
}

// TrapResets can be attached to DoorRests, ItemResets, or EquipmentResets
class TrapReset {
    constructor(fields) {
        super(Object.assign({
            uuid:           uuid(),
            reset_interval: 0,
            pointer:        null, // Door Reset, Equipment Reset, or Item Reset UUID pointer
            trap_type:      flags.TRAP_TYPES.TTYPE_NONE,
            trap_charges:   "",
            trigger_1:      flags.TRAP_TRIGGERS.TRIGGER_NONE,
            trigger_2:      flags.TRAP_TRIGGERS.TRIGGER_NONE,
        }, fields))
    }
    
}

// CoinResets go in mob's equipment_resets list
class CoinReset {
    constructor(fields) {
        super(Object.assign({
            uuid:           uuid(),
            mob:            null, // Mob UUID pointer
            defunct:        1,
            coin_type:      null,
            dice_count:     "",
            dice_sides:     "",
        }, fields))
    }
    
}

class MobSpecial {
    constructor(fields) {
        super(Object.assign({
            uuid:       uuid(),
            mob:        null, // Mob UUID pointer
            special:    null,
        }, fields))
    }
    
}

class QuestLog {
    constructor(fields) {
        super(Object.assign({
            uuid:       uuid(),
            qbit_start: "",
            qbit_stop:  "",
            min_qbit:   "",
            max_qbit:   "",
            event_code: null,
            qlog_text:  "",
        }, fields))
    }
    
}

class Program {
    constructor(fields) {
        super(Object.assign({
            uuid:       uuid(),
            pointer:    null, // Mob, Item, or Room UUID pointer
            trigger:    null,
            argument:   "",
            program:    "",
        }, fields))
    }
    
}
//export default Loader;

module.exports = {
    Area: Area,
    JusticeSystem: JusticeSystem,
    Room: Room,
    Exit: Exit,
    ExtraDescription: ExtraDescription,
    ItemApply: ItemApply,
    Item: Item,
    SimpleMob: SimpleMob,
    UniqueMob: UniqueMob,
    TrainSkill: TrainSkill,
    TrainWeaponSkill: TrainWeaponSkill,
    TrainSpell: TrainSpell,
    TrainLevel: TrainLevel,
    TrainStatistic: TrainStatistic,
    TrainFeat: TrainFeat,
    Shop: Shop,
    RepairRecharge: RepairRecharge,
    MobReset: MobReset,
    EquipmentReset: EquipmentReset,
    ItemReset: ItemReset,
    DoorReset: DoorReset,
    RandomDoorReset: RandomDoorReset,
    RoomReset: RoomReset,
    TrapReset: TrapReset,
    CoinReset: CoinReset,
    MobSpecial: MobSpecial,
    QuestLog: QuestLog,
    Program: Program,
}