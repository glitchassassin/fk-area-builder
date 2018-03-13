var m = require("./model.js");
var Field = m.Field;
var Model = m.Model;
var flags = require("./flags.js");

// Model classes

function vnum_sort(obj1, obj2) {
    if (obj1.vnum > obj2.vnum) {
        return 1;
    }
    else if (obj1.vnum < obj2.vnum) {
        return -1;
    }
    return 0;
}



class Area extends Model {
    constructor(fields) {
        super(Object.assign({
            name:                   new Field({field_name:"name",                   default_value: "",                                in_flags:null,                  optional:false}),
            category:               new Field({field_name:"category",               default_value: flags.AREA_CATEGORIES.INCOMPLETE,    in_flags:flags.AREA_CATEGORIES, optional:false}),
            authors:                new Field({field_name:"authors",                default_value: "",                           in_flags:null,                  optional:false}),
            vnum:                   new Field({field_name:"vnum",                   default_value: "QQ00",                              in_flags:null,                  optional:false}),
            justice_system:         new Field({field_name:"justice_system",         default_value: null,                                in_flags:null,                  optional:true}),
            min_recommended_level:  new Field({field_name:"min_recommended_level",  default_value: 1,                                   in_flags:null,                  optional:false}),
            max_recommended_level:  new Field({field_name:"max_recommended_level",  default_value: 65,                                  in_flags:null,                  optional:false}),
            min_enforced_level:     new Field({field_name:"min_enforced_level",     default_value: 0,                                   in_flags:null,                  optional:false}),
            max_enforced_level:     new Field({field_name:"max_enforced_level",     default_value: 65,                                  in_flags:null,                  optional:false}),
            reset_msg:              new Field({field_name:"reset_msg",              default_value: "",                                in_flags:null,                  optional:false}),
            wilderness_flag:        new Field({field_name:"wilderness_flag",        default_value: 0,                                   in_flags:null,                  optional:false}),
            reset_duration:         new Field({field_name:"reset_duration",         default_value: 0,                                   in_flags:null,                  optional:false}),
            economy_min:            new Field({field_name:"economy_min",            default_value: 5000,                                in_flags:null,                  optional:false}),
            economy_max:            new Field({field_name:"economy_max",            default_value: 5000,                                in_flags:null,                  optional:false}),
            weather_humidity:       new Field({field_name:"weather_humidity",       default_value: 5,                                   in_flags:null,                  optional:false}),
            weather_temperature:    new Field({field_name:"weather_temperature",    default_value: 5,                                   in_flags:null,                  optional:false}),
            mining_material:        new Field({field_name:"mining_material",        default_value: null,                                in_flags:flags.ITEM_MATERIALS,  optional:true}),
            logging_material:       new Field({field_name:"logging_material",       default_value: null,                                in_flags:flags.ITEM_MATERIALS,  optional:true}),
            rooms:                  new Field({field_name:"rooms",                  default_value: [],                                  in_flags:null,                  optional:true}),
            room_resets:            new Field({field_name:"room_resets",            default_value: [],                                  in_flags:null,                  optional:true}),
            door_resets:            new Field({field_name:"door_resets",            default_value: [],                                  in_flags:null,                  optional:true}),
            items:                  new Field({field_name:"items",                  default_value: [],                                  in_flags:null,                  optional:true}),
            item_resets:            new Field({field_name:"item_resets",            default_value: [],                                  in_flags:null,                  optional:true}),
            mobs:                   new Field({field_name:"mobs",                   default_value: [],                                  in_flags:null,                  optional:true}),
            mob_resets:             new Field({field_name:"mob_resets",             default_value: [],                                  in_flags:null,                  optional:true}),
            mob_specials:           new Field({field_name:"mob_specials",           default_value: [],                                  in_flags:null,                  optional:true}),
            shops:                  new Field({field_name:"shops",                  default_value: [],                                  in_flags:null,                  optional:true}),
            repairs:                new Field({field_name:"repairs",                default_value: [],                                  in_flags:null,                  optional:true}),
            quest_log:              new Field({field_name:"quest_log",              default_value: [],                                  in_flags:null,                  optional:true}),
        }, fields))
    }
}

class JusticeSystem extends Model {
    constructor(fields) {
        super(Object.assign({
            courtroom:  new Field({field_name:"courtroom",  default_value: null,    in_flags:null,  optional:true}),
            dungeon:    new Field({field_name:"dungeon",    default_value: null,    in_flags:null,  optional:true}),
            judge:      new Field({field_name:"judge",      default_value: null,    in_flags:null,  optional:true}),
            guard:      new Field({field_name:"guard",      default_value: null,    in_flags:null,  optional:true}),
            CRIME_HIGH_MURDER: new Field({field_name:"CRIME_HIGH_MURDER", default_value: flags.JUSTICE_PUNISHMENTS.PUNISHMENT_NOT_ENFORCED, in_flags:flags.JUSTICE_PUNISHMENTS, optional:false}),
            CRIME_LOW_MURDER: new Field({field_name:"CRIME_LOW_MURDER", default_value: flags.JUSTICE_PUNISHMENTS.PUNISHMENT_NOT_ENFORCED, in_flags:flags.JUSTICE_PUNISHMENTS, optional:false}),
            CRIME_ASSAULT: new Field({field_name:"CRIME_ASSAULT", default_value: flags.JUSTICE_PUNISHMENTS.PUNISHMENT_NOT_ENFORCED, in_flags:flags.JUSTICE_PUNISHMENTS, optional:false}),
            CRIME_MUGGING: new Field({field_name:"CRIME_MUGGING", default_value: flags.JUSTICE_PUNISHMENTS.PUNISHMENT_NOT_ENFORCED, in_flags:flags.JUSTICE_PUNISHMENTS, optional:false}),
        }, fields))
    }
}

class Room extends Model {
    constructor(fields) {
        super(Object.assign({
            vnum:               new Field({field_name:"vnum",               default_value: "",    in_flags:null,                      optional:false}),
            sdesc:              new Field({field_name:"sdesc",              default_value: "",    in_flags:null,                      optional:false}),
            ldesc:              new Field({field_name:"ldesc",              default_value: "",    in_flags:null,                      optional:false}),
            defunct:            new Field({field_name:"defunct",            default_value: "0",       in_flags:null,                      optional:false}),
            room_flags:         new Field({field_name:"room_flags",         default_value: [],      in_flags:flags.ROOM_FLAGS,          optional:true}),
            sector:             new Field({field_name:"sector",             default_value: null,    in_flags:flags.ROOM_SECTOR_FLAGS,   optional:false}),
            teleport_delay:     new Field({field_name:"teleport_delay",     default_value: "0",       in_flags:null,                      optional:true}),
            teleport_target:    new Field({field_name:"teleport_target",    default_value: "0",       in_flags:null,                      optional:true}),
            tunnel:             new Field({field_name:"tunnel",             default_value: "0",       in_flags:null,                      optional:true}),
            exits:              new Field({field_name:"exits",              default_value: [],      in_flags:null,                      optional:true}),
            door_resets:        new Field({field_name:"door_resets",        default_value: [],      in_flags:null,                      optional:true}),
            room_resets:        new Field({field_name:"room_resets",        default_value: [],      in_flags:null,                      optional:true}),
            extra_descriptions: new Field({field_name:"extra_descriptions", default_value: [],      in_flags:null,                      optional:true}),
            programs:           new Field({field_name:"programs",           default_value: [],      in_flags:null,                      optional:true}),
        }, fields));
    }
    
}

class Exit extends Model {
    constructor(fields) {
        super(Object.assign({
            direction:              new Field({field_name:"direction",              default_value: null,                            in_flags:flags.EXIT_DIRECTIONS, optional:false}),
            comment:                new Field({field_name:"comment",                default_value: "",                              in_flags:null,                  optional:true}),
            somewhere_door_keyword: new Field({field_name:"somewhere_door_keyword", default_value: "",                              in_flags:null,                  optional:true}),
            // Flags                    
            door_flags:             new Field({field_name:"door_flags",             default_value: [],                              in_flags:flags.EXIT_DOOR_FLAGS, optional:true}),
            door_key:               new Field({field_name:"door_key",               default_value: null,                       in_flags:null,                  optional:false, ignore_validation:true}),
            target_vnum:            new Field({field_name:"target_vnum",            default_value: null,                       in_flags:null,                  optional:false, ignore_validation:true}),
            exit_size:              new Field({field_name:"exit_size",              default_value: flags.EXIT_SIZES.EXIT_SIZE_ANY,  in_flags:flags.EXIT_SIZES,      optional:false}),
        }, fields))
    }
    
}

class ExtraDescription extends Model {
    constructor(fields) {
        super(Object.assign({
            keywords: new Field({field_name:"keywords", default_value: "",    in_flags:null,  optional:false}),
            ldesc:    new Field({field_name:"ldesc",    default_value: "",    in_flags:null,  optional:false}),
        }, fields))
    }
    
}

class ItemApply extends Model {
    constructor(fields) {
        super(Object.assign({
            apply_flag: new Field({field_name:"apply_flag", default_value: null,    in_flags:flags.ITEM_APPLIES,    optional:false}),
            parameter:  new Field({field_name:"parameter",  default_value: "",    in_flags:null,                  optional:false}),
        }, fields))
    }
    
}

class Item extends Model {
    constructor(fields) {
        super(Object.assign({
            vnum:               new Field({field_name:"vnum",               default_value: "",   in_flags:null,                  optional:false}),
            sdesc:              new Field({field_name:"sdesc",              default_value: "",   in_flags:null,                  optional:false}),
            ldesc:              new Field({field_name:"ldesc",              default_value: "",   in_flags:null,                  optional:false}),
            keywords:           new Field({field_name:"keywords",           default_value: "",   in_flags:null,                  optional:false}),
            action_description: new Field({field_name:"action_description", default_value: "",          in_flags:null,                  optional:true}), // Not used
            item_type:          new Field({field_name:"item_type",          default_value: flags.ITEM_TYPES.ITEM_TYPE_NONE,   in_flags:flags.ITEM_TYPES,      optional:false}),
            attributes:         new Field({field_name:"attributes",         default_value: [],          in_flags:flags.ITEM_ATTRIBUTES, optional:true}),
            wear_flags:         new Field({field_name:"wear_flags",         default_value: [],          in_flags:flags.WEAR_LOCATIONS,  optional:true}),
            extra_descriptions: new Field({field_name:"extra_descriptions", default_value: [],          in_flags:null,                  optional:true}),
            quality:            new Field({field_name:"quality",            default_value: null,   in_flags:flags.ITEM_QUALITY,    optional:false}),
            material:           new Field({field_name:"material",           default_value: null,   in_flags:flags.ITEM_MATERIALS,  optional:false}),
            condition:          new Field({field_name:"condition",          default_value: null,   in_flags:flags.ITEM_CONDITION,  optional:false}),
            size:               new Field({field_name:"size",               default_value: null,   in_flags:flags.ITEM_SIZES,      optional:false}),
            value0:             new Field({field_name:"value0",             default_value: 0,           in_flags:null,                  optional:true}),
            value1:             new Field({field_name:"value1",             default_value: 0,           in_flags:null,                  optional:true}),
            value2:             new Field({field_name:"value2",             default_value: 0,           in_flags:null,                  optional:true}),
            value3:             new Field({field_name:"value3",             default_value: 0,           in_flags:null,                  optional:true}),
            value4:             new Field({field_name:"value4",             default_value: 0,           in_flags:null,                  optional:true}),
            value5:             new Field({field_name:"value5",             default_value: 0,           in_flags:null,                  optional:true}),
            special_applies:    new Field({field_name:"special_applies",    default_value: [],          in_flags:null,                  optional:true}),
            programs:           new Field({field_name:"programs",           default_value: [],          in_flags:null,                  optional:true}),
            item_resets:        new Field({field_name:"item_resets",        default_value: [],          in_flags:null,                  optional:true}),
            identify_message:   new Field({field_name:"identify_message",   default_value: "",   in_flags:null,     optional:true}),
        }, fields));
    }
    
    
}

class SimpleMob extends Model {
    constructor(fields, values) {
        let model_fields = {
            vnum:                   new Field({field_name:"vnum",                   default_value: "",                            in_flags:null,                  optional:false}),
            sdesc:                  new Field({field_name:"sdesc",                  default_value: "",                            in_flags:null,                  optional:false}),
            ldesc:                  new Field({field_name:"ldesc",                  default_value: "",                            in_flags:null,                  optional:false}),
            fulldesc:               new Field({field_name:"fulldesc",               default_value: "",                            in_flags:null,                  optional:false}),
            keywords:               new Field({field_name:"keywords",               default_value: "",                            in_flags:null,                  optional:false}),
            level:                  new Field({field_name:"level",                  default_value: "",                            in_flags:null,                  optional:false}),
            mob_class:              new Field({field_name:"mob_class",              default_value: null,                            in_flags:flags.MOB_CLASSES,     optional:false}),
            race:                   new Field({field_name:"race",                   default_value: null,                            in_flags:flags.MOB_RACES,       optional:false}),
            sex:                    new Field({field_name:"sex",                    default_value: null,                            in_flags:flags.MOB_SEXES,       optional:false}),
            position:               new Field({field_name:"position",               default_value: null,                            in_flags:flags.MOB_POSITIONS,   optional:false}),
            deity:                  new Field({field_name:"deity",                  default_value:flags.MOB_DEITIES.DEITY_NONE,         in_flags:flags.MOB_DEITIES,     optional:true}),
            act_flags:              new Field({field_name:"act_flags",              default_value:[],                                   in_flags:flags.MOB_ACT_FLAGS,   optional:true}),
            understood_languages:   new Field({field_name:"understood_languages",   default_value:[flags.LANGUAGE_FLAGS.LANG_COMMON],   in_flags:flags.LANGUAGE_FLAGS,  optional:false}),
            spoken_languages:       new Field({field_name:"spoken_languages",       default_value:[flags.LANGUAGE_FLAGS.LANG_COMMON],   in_flags:flags.LANGUAGE_FLAGS,  optional:false}),
            can_train_skill:        new Field({field_name:"can_train_skill",        default_value:[],                                   in_flags:null,                  optional:true}),
            can_train_weapon_skill: new Field({field_name:"can_train_weapon_skill", default_value:[],                                   in_flags:null,                  optional:true}),
            can_train_spell:        new Field({field_name:"can_train_spell",        default_value:[],                                   in_flags:null,                  optional:true}),
            can_train_level:        new Field({field_name:"can_train_level",        default_value:[],                                   in_flags:null,                  optional:true}),
            can_train_statistic:    new Field({field_name:"can_train_statistic",    default_value:[],                                   in_flags:null,                  optional:true}),
            can_train_feat:         new Field({field_name:"can_train_feat",         default_value:[],                                   in_flags:null,                  optional:true}),
            programs:               new Field({field_name:"programs",               default_value:[],                                   in_flags:null,                  optional:true}),
            mob_resets:             new Field({field_name:"mob_resets",             default_value:[],                                   in_flags:null,                  optional:true}),
            shop:                   new Field({field_name:"shop",                   default_value: null,                            in_flags:null,                  optional:true}),
            repairs:                new Field({field_name:"repairs",                default_value: null,                            in_flags:null,                  optional:true}),
        }
        
        if (fields instanceof SimpleMob) {
            let f = fields.clone()
            super(Object.assign(model_fields, f._fields), f);
        }
        else { // "fields" is just a list of fields
            super(Object.assign(model_fields, fields), values);
        }
        
    }
    
    
    
}

class UniqueMob extends SimpleMob {
    constructor(fields) {
        var model_fields = {
            affect_flags:           new Field({field_name:"affect_flags",           default_value:[flags.MOB_AFFECTS.AFF_NONE], in_flags:flags.MOB_AFFECTS,     optional:true}),
            virtual_armor_type:     new Field({field_name:"virtual_armor_type",     default_value: null,                    in_flags:flags.ITEM_ARMOR_TYPES,optional:false}),
            virtual_armor_material: new Field({field_name:"virtual_armor_material", default_value: null,                    in_flags:flags.ITEM_MATERIALS,  optional:false}),
            alignment:              new Field({field_name:"alignment",              default_value: null,                    in_flags:flags.MOB_ALIGNMENTS,  optional:false}),
            str:                    new Field({field_name:"str",                    default_value:13,                           in_flags:null,                  optional:false}),
            int:                    new Field({field_name:"int",                    default_value:13,                           in_flags:null,                  optional:false}),
            wis:                    new Field({field_name:"wis",                    default_value:13,                           in_flags:null,                  optional:false}),
            dex:                    new Field({field_name:"dex",                    default_value:13,                           in_flags:null,                  optional:false}),
            con:                    new Field({field_name:"con",                    default_value:13,                           in_flags:null,                  optional:false}),
            cha:                    new Field({field_name:"cha",                    default_value:13,                           in_flags:null,                  optional:false}),
            lck:                    new Field({field_name:"lck",                    default_value:13,                           in_flags:null,                  optional:false}),
            ris_resistant:          new Field({field_name:"ris_resistant",          default_value:[flags.MOB_RIS.RIS_NONE],     in_flags:flags.MOB_RIS,         optional:false}),
            ris_immune:             new Field({field_name:"ris_immune",             default_value:[flags.MOB_RIS.RIS_NONE],     in_flags:flags.MOB_RIS,         optional:false}),
            ris_susceptible:        new Field({field_name:"ris_susceptible",        default_value:[flags.MOB_RIS.RIS_NONE],     in_flags:flags.MOB_RIS,         optional:false}),
        }
        
        if (fields instanceof SimpleMob) { // "fields" is another Model object
            let f = fields.clone()
            super(Object.assign(model_fields, f._fields), f);
        }
        else { // "fields" is just a list of fields
            super(Object.assign(model_fields, fields));
        }
    }
    
    
}

class TrainSkill extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,      in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,              optional:false}),
            skill:              new Field({field_name:"skill",              default_value: null,    in_flags:flags.MOB_SKILLS,  optional:false}),
        }, fields))
    }
    
}

class TrainWeaponSkill extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,      in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,              optional:false}),
            weapon_skill:       new Field({field_name:"weapon_skill",       default_value: null,    in_flags:flags.MOB_WEAPON_SKILLS,  optional:false}),
        }, fields))
    }
    
}

class TrainSpell extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,      in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,              optional:false}),
            spell:              new Field({field_name:"spell",              default_value: null,    in_flags:flags.MOB_SPELLS,  optional:false}),
        }, fields))
    }
    
}

class TrainLevel extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,  in_flags:null,  optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,   in_flags:null,  optional:false}),
        }, fields))
    }
    
}

class TrainStatistic extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,      in_flags:null,                  optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,                  optional:false}),
            statistic:          new Field({field_name:"statistic",          default_value: null,    in_flags:flags.MOB_STATISTICS,  optional:false}),
        }, fields))
    }
    
}

class TrainFeat extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 1,       in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,              optional:false}),
            feat:               new Field({field_name:"feat",               default_value: null,    in_flags:flags.MOB_FEATS,   optional:false}),
        }, fields))
    }
    
}

class Shop extends Model {
    constructor(fields) {
        super(Object.assign({
            shopkeeper:     new Field({field_name:"shopkeeper",     default_value: null,                        in_flags:null,              optional:false, ignore_validation:true}),
            will_buy_1:     new Field({field_name:"will_buy_1",     default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,  optional:false}),
            will_buy_2:     new Field({field_name:"will_buy_2",     default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,  optional:true}),
            will_buy_3:     new Field({field_name:"will_buy_3",     default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,  optional:true}),
            will_buy_4:     new Field({field_name:"will_buy_4",     default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,  optional:true}),
            will_buy_5:     new Field({field_name:"will_buy_5",     default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,  optional:true}),
            profit_buy:     new Field({field_name:"profit_buy",     default_value:150,                              in_flags:null,              optional:false}),
            profit_sell:    new Field({field_name:"profit_sell",    default_value:50,                               in_flags:null,              optional:false}),
            open_hour:      new Field({field_name:"open_hour",      default_value:7,                                in_flags:null,              optional:false}),
            close_hour:     new Field({field_name:"close_hour",     default_value:19,                               in_flags:null,              optional:false}),
        }, fields))        }
    
}

class RepairRecharge extends Model {
    constructor(fields) {
        super(Object.assign({
            shopkeeper:         new Field({field_name:"shopkeeper",         default_value: null,                        in_flags:null,                      optional:false, ignore_validation:true}),
            will_repair_1:      new Field({field_name:"will_repair_1",      default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,          optional:false}),
            will_repair_2:      new Field({field_name:"will_repair_2",      default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,          optional:true}),
            repair_material:    new Field({field_name:"repair_material",    default_value: null,                        in_flags:flags.MOB_REPAIR_MATERIAL, optional:false}),
            profit_modifier:    new Field({field_name:"profit_modifier",    default_value:100,                              in_flags:null,                      optional:false}),
            repair:             new Field({field_name:"repair",             default_value: null,                        in_flags:flags.MOB_REPAIR_RECHARGE, optional:false}),
            open_hour:          new Field({field_name:"open_hour",          default_value:7,                                in_flags:null,                      optional:false}),
            close_hour:         new Field({field_name:"close_hour",         default_value:19,                               in_flags:null,                      optional:false}),
        }, fields))
    }
    
}

class MobReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:    new Field({field_name:"defunct",    default_value: 0,       in_flags:null,  optional:false}),
            mob:        new Field({field_name:"mob",        default_value: null,    in_flags:null,  optional:false, ignore_validation:true}),
            mob_limit:  new Field({field_name:"mob_limit",  default_value: 1,       in_flags:null,  optional:false}),
            room:       new Field({field_name:"room",       default_value: null,    in_flags:null,  optional:false, ignore_validation:true}),
            equipment:  new Field({field_name:"equipment",  default_value: [],          in_flags:null,  optional:true}),
            coins:      new Field({field_name:"coins",      default_value: [],          in_flags:null,  optional:true}),
            
        }, fields))
    }
    
}

class EquipmentReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,                  optional:false}),
            item:           new Field({field_name:"item",           default_value: null,       in_flags:null,                  optional:false, ignore_validation:true}),
            equip_limit:    new Field({field_name:"equip_limit",    default_value: 1,       in_flags:null,                  optional:false}),
            wear_loc:       new Field({field_name:"wear_loc",       default_value: null,    in_flags:flags.MOB_WEAR_POSITIONS, optional:true}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,                  optional:true}),
        }, fields))
    }
    
}

class ItemReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,  optional:false}),
            item:           new Field({field_name:"item",           default_value: null,    in_flags:null,  optional:false, ignore_validation:true}),
            item_limit:     new Field({field_name:"item_limit",     default_value: "1",     in_flags:null,  optional:false}),
            room_container: new Field({field_name:"room_container", default_value: null,    in_flags:null,  optional:false, ignore_validation:true}),
            hidden:         new Field({field_name:"hidden",         default_value: false,   in_flags:null,  optional:false}),
            buried:         new Field({field_name:"buried",         default_value: false,   in_flags:null,  optional:false}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,  optional:true}),
            contents:       new Field({field_name:"contents",       default_value: [],      in_flags:null,  optional:true}),
        }, fields))
    }
    
}

class DoorReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,              optional:false}),
            room:           new Field({field_name:"room",           default_value: null,    in_flags:null,              optional:false, ignore_validation:true}),
            exit:           new Field({field_name:"exit",           default_value: null,    in_flags:flags.DOOR_RESET_DIRECTIONS,              optional:false}),
            exit_state:     new Field({field_name:"exit_state",     default_value: null,    in_flags:flags.DOOR_RESET_FLAGS, optional:false}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,              optional:true}),
        }, fields))
    }
    
}

class RandomDoorReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",    default_value: 0,       in_flags:null,  optional:false}),
            room:           new Field({field_name:"room",       default_value: null,    in_flags:null,  optional:false}),
            last_door:      new Field({field_name:"last_door",  default_value: "",    in_flags:null,  optional:false}),
        }, fields))
    }
    
}

class RoomReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,                  optional:false}),
            room:           new Field({field_name:"room",           default_value: null,    in_flags:null,                  optional:false}),
            bit_type:       new Field({field_name:"bit_type",       default_value: null,    in_flags:flags.RESET_BIT_CODES, optional:false}),
            flag:           new Field({field_name:"flag",           default_value: null,    in_flags:flags.ROOM_FLAGS,      optional:false}),
        }, fields))
    }
    
}

// TrapResets can be attached to DoorRests, ItemResets, or EquipmentResets
class TrapReset extends Model {
    constructor(fields) {
        super(Object.assign({
            reset_interval: new Field({field_name:"reset_interval", default_value:0,                                in_flags:null,                  optional:false}),
            trap_type:      new Field({field_name:"trap_type",      default_value:flags.TRAP_TYPES.TTYPE_NONE,      in_flags:flags.TRAP_TYPES,      optional:false}),
            trap_charges:   new Field({field_name:"trap_charges",   default_value:"",                               in_flags:null,                  optional:false}),
            trigger_1:      new Field({field_name:"trigger_1",      default_value:flags.TRAP_TRIGGERS.TRIGGER_NONE, in_flags:flags.TRAP_TRIGGERS,   optional:false}),
            trigger_2:      new Field({field_name:"trigger_2",      default_value:flags.TRAP_TRIGGERS.TRIGGER_NONE, in_flags:flags.TRAP_TRIGGERS,   optional:false}),
        }, fields))
    }
    
}

// CoinResets go in mob's equipment_resets list
class CoinReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 1,       in_flags:null,              optional:false}),
            coin_type:      new Field({field_name:"coin_type",      default_value: null,    in_flags:flags.ITEM_COIN_TYPES,  optional:false}),
            dice_count:     new Field({field_name:"dice_count",     default_value: "",    in_flags:null,              optional:false}),
            dice_sides:     new Field({field_name:"dice_sides",     default_value: "",    in_flags:null,              optional:false}),
        }, fields))
    }
    
}

class MobSpecial extends Model {
    constructor(fields) {
        super(Object.assign({
            mob:        new Field({field_name:"mob",        default_value: null,    in_flags:null,                  optional:false}),
            special:    new Field({field_name:"special",    default_value: null,    in_flags:flags.MOB_SPECIALS,    optional:false}),
        }, fields))
    }
    
}

class QuestLog extends Model {
    constructor(fields) {
        super(Object.assign({
            qbit_start: new Field({field_name:"qbit_start", default_value: "",   in_flags:null,                      optional:false}),
            qbit_stop:  new Field({field_name:"qbit_stop",  default_value: "",   in_flags:null,                      optional:false}),
            min_qbit:   new Field({field_name:"min_qbit",   default_value: "",   in_flags:null,                      optional:false}),
            max_qbit:   new Field({field_name:"max_qbit",   default_value: "",   in_flags:null,                      optional:false}),
            event_code: new Field({field_name:"event_code", default_value: null,   in_flags:flags.QUEST_EVENT_CODES,   optional:false}),
            qlog_text:  new Field({field_name:"qlog_text",  default_value: "",   in_flags:null,                      optional:false}),
        }, fields))
    }
    
}

class Program extends Model {
    constructor(fields) {
        super(Object.assign({
            trigger:    new Field({field_name:"trigger",    default_value: null,    in_flags:null,  optional:false}), // Comes from one of three sets of flags, depending on room/item/mob
            argument:   new Field({field_name:"argument",   default_value: "",    in_flags:null,  optional:true}),
            program:    new Field({field_name:"program",    default_value: "",    in_flags:null,  optional:false}),
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