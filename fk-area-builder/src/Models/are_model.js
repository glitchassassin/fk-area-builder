var m = require("./model.js");
var Field = m.Field;
var Model = m.Model;
var flags = require("./flags.js");

// Model classes

class Loader {
    constructor(are_string="") {
        // Accepts a string containing a .are file
        // Validates the file, then loads the contents into a new model
        this.area = new Area();
    }
    
    toString() {
        return this.area.toString();
    }
}

class Area extends Model {
    constructor(fields) {
        super(Object.assign({
            name:                   new Field({field_name:"name",                   default_value: null,    in_flags:null,                  optional:false}),
            category:               new Field({field_name:"category",               default_value: null,    in_flags:flags.AREA_CATEGORIES, optional:false}),
            authors:                new Field({field_name:"authors",                default_value: [],      in_flags:null,                  optional:false}),
            justice_system:         new Field({field_name:"justice_system",         default_value: null,    in_flags:null,                  optional:true}),
            min_recommended_level:  new Field({field_name:"min_recommended_level",  default_value: 1,       in_flags:null,                  optional:false}),
            max_recommended_level:  new Field({field_name:"max_recommended_level",  default_value: 65,      in_flags:null,                  optional:false}),
            min_enforced_level:     new Field({field_name:"min_enforced_level",     default_value: 0,       in_flags:null,                  optional:false}),
            max_enforced_level:     new Field({field_name:"max_enforced_level",     default_value: 65,      in_flags:null,                  optional:false}),
            reset_msg:              new Field({field_name:"reset_msg",              default_value: null,    in_flags:null,                  optional:false}),
            wilderness_flag:        new Field({field_name:"wilderness_flag",        default_value: 0,       in_flags:null,                  optional:false}),
            reset_duration:         new Field({field_name:"reset_duration",         default_value: 0,       in_flags:null,                  optional:false}),
            economy_min:            new Field({field_name:"economy_min",            default_value: 5000,    in_flags:null,                  optional:false}),
            economy_max:            new Field({field_name:"economy_max",            default_value: 5000,    in_flags:null,                  optional:false}),
            weather_humidity:       new Field({field_name:"weather_humidity",       default_value: 5,       in_flags:null,                  optional:false}),
            weather_temperature:    new Field({field_name:"weather_temperature",    default_value: 5,       in_flags:null,                  optional:false}),
            mining_material:        new Field({field_name:"mining_material",        default_value: null,    in_flags:flags.ITEM_MATERIALS,  optional:true}),
            logging_material:       new Field({field_name:"logging_material",       default_value: null,    in_flags:flags.ITEM_MATERIALS,  optional:true}),
            rooms:                  new Field({field_name:"rooms",                  default_value: [],      in_flags:null,                  optional:true}),
            room_resets:            new Field({field_name:"room_resets",            default_value: [],      in_flags:null,                  optional:true}),
            door_resets:            new Field({field_name:"door_resets",            default_value: [],      in_flags:null,                  optional:true}),
            objects:                new Field({field_name:"objects",                default_value: [],      in_flags:null,                  optional:true}),
            item_resets:            new Field({field_name:"item_resets",            default_value: [],      in_flags:null,                  optional:true}),
            mobs:                   new Field({field_name:"mobs",                   default_value: [],      in_flags:null,                  optional:true}),
            mob_resets:             new Field({field_name:"mob_resets",             default_value: [],      in_flags:null,                  optional:true}),
            mob_specials:           new Field({field_name:"mob_specials",           default_value: [],      in_flags:null,                  optional:true}),
            shops:                  new Field({field_name:"shops",                  default_value: [],      in_flags:null,                  optional:true}),
            repairs:                new Field({field_name:"repairs",                default_value: [],      in_flags:null,                  optional:true}),
            quest_log:              new Field({field_name:"quest_log",              default_value: [],      in_flags:null,                  optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[Area:${this.name}]`;
    }
    validate() {
        let errors = super.validate()
        if (this.authors.join(" ").length >= 36) {
            errors.push(`${this._error_prefix}.authors List too long (max 36 characters)`);
        }
        for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i].indexOf(" ") != -1) {
                errors.push(`${this._error_prefix}.authors Spaces are not permitted in author names ("${this.authors[i]}")`);
            }
        }
        // Level range
        if (!(0 < this.min_recommended_level <= 65)) {
            errors.push(`${this._error_prefix}.min_recommended_level must be between 0 and 65`);
        }
        if (!(0 < this.max_recommended_level <= 65)) {
            errors.push(`${this._error_prefix}.max_recommended_level must be between 0 and 65`);
        }
        if (!(0 < this.min_enforced_level <= 65)) {
            errors.push(`${this._error_prefix}.min_enforced_level must be between 0 and 65`);
        }
        if (!(0 < this.max_enforced_level <= 65)) {
            errors.push(`${this._error_prefix}.max_enforced_level must be between 0 and 65`);
        }
        // Reset duration
        if (this.reset_duration < -1) {
            errors.push(`${this._error_prefix}.reset_duration Invalid reset duration`);
        }
        // Flags
        if (this.wilderness_flag != 0) {
            errors.push(`${this._error_prefix}.wilderness_flag should be 0 for most areas`);
        }
        // Economy
        if (this.economy_min < 0) {
            errors.push(`${this._error_prefix}.economy_min should be a positive number`);
        }
        if (this.economy_max < 0) {
            errors.push(`${this._error_prefix}.economy_max should be a positive number`);
        }
        // Weather
        if (!(1 <= this.weather_humidity <= 10)) {
            errors.push(`${this._error_prefix}.weather_humidity must be between 1 and 10`);
        }
        if (!(1 <= this.weather_temperature <= 10)) {
            errors.push(`${this._error_prefix}.weather_temperature must be between 1 and 10`);
        }
        return errors
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return "Invalid Area\n" + errors.join("\n");
        }
        
        return `#AREA ${this.category.color_code}${this.name}~
#AUTHOR ${this.authors.join(" ")}~
#RANGES
${this.min_recommended_level} ${this.max_recommended_level} ${this.min_enforced_level} ${this.max_enforced_level}
$
#RESETMSG ${this.reset_msg}~
#FLAGS
${this.wilderness_flag} ${this.reset_duration}
#ECONOMY ${this.economy_min} ${this.economy_max}
#WEATHER ${this.weather_humidity} ${this.weather_temperature}
${this.justice_system != null ? this.justice_system.toString() : ""}
${this.mining_material != null ? "#MINING " + this.mining_material.code : ""}
${this.logging_material != null ? "#LOGGING " + this.logging_material.code : ""}
${this.rooms.length ? `#ROOMS
${this.rooms.map((room)=>(room.toString())).join("\n")}
S` : ""}
${this.objects.length ? `#OBJECTS
${this.objects.map((obj)=>(obj.toString())).join("\n")}
#0`: ""}
${this.quest_log.length ? `#QUESTS
${this.quest_log.map((quest)=>(quest.toString())).join("\n")}
#0`: ""}
${this.mobs.length ? `#MOBILES
${this.mobs.map((mob)=>(mob.toString())).join("\n")}
#0` : ""}
#RESETS
${this.mob_resets.map((res)=>(res.toString())).join("\n") /* Includes equipment resets */}
${this.item_resets.map((res)=>(res.toString())).join("\n")}
${this.room_resets.map((res)=>(res.toString())).join("\n")}
${this.door_resets.map((res)=>(res.toString())).join("\n")}
S
${this.shops.length ? `#SHOPS
${this.shops.map((obj)=>(obj.toString())).join("\n")}
0` : ""}
${this.repairs.length ? `#REPAIRS
${this.repairs.map((obj)=>(obj.toString())).join("\n")}
0` : ""}
#SPECIALS
${this.mob_specials.map((res)=>(res.toString())).join("\n")}
S
#$
`.replace(/\n[\n]+/g, "\n");
    }
}

class JusticeSystem extends Model {
    constructor(fields) {
        super(Object.assign({
            courtroom:  new Field({field_name:"courtroom",  default_value: null,    in_flags:null,  optional:false}),
            dungeon:    new Field({field_name:"dungeon",    default_value: null,    in_flags:null,  optional:false}),
            judge:      new Field({field_name:"judge",      default_value: null,    in_flags:null,  optional:false}),
            guard:      new Field({field_name:"guard",      default_value: null,    in_flags:null,  optional:false}),
            CRIME_HIGH_MURDER: new Field({field_name:"CRIME_HIGH_MURDER", default_value: {
                code: "CRIME_HIGH_MURDER",
                sdesc: "High Murder",
                ldesc: "Murdering another PC",
                punishment: null
            }, in_flags:null, optional:false}),
            CRIME_LOW_MURDER: new Field({field_name:"CRIME_LOW_MURDER", default_value: {
                code: "CRIME_LOW_MURDER",
                sdesc: "Low Murder",
                ldesc: "Killing a mob",
                punishment: null
            }, in_flags:null, optional:false}),
            CRIME_ASSAULT: new Field({field_name:"CRIME_ASSAULT", default_value: {
                code: "CRIME_ASSAULT",
                sdesc: "Assault",
                ldesc: "Attacking (but not killing) a PC/mob",
                punishment: null
            }, in_flags:null, optional:false}),
            CRIME_MUGGING: new Field({field_name:"CRIME_MUGGING", default_value: {
                code: "CRIME_MUGGING",
                sdesc: "Mugging",
                ldesc: "A failed pickpocket/steal attempt",
                punishment: null
            }, in_flags:null, optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return "[JusticeSystem]"
    }
    
    validate() {
        let errors = super.validate()
        
        // Check crimes
        let crimes = ["CRIME_HIGH_MURDER","CRIME_LOW_MURDER","CRIME_ASSAULT","CRIME_MUGGING"];
        for (let c in crimes) {
            let crime = this[crimes[c]]
            if (crime.punishment == null) {
                errors.push(`${this._error_prefix}.${crime.code} has no punishment defined`);
            }
            else if (crime.punishment.do_not_use) {
                errors.push(`${this._error_prefix}.${crime.code} has punishment "${crime.punishment.code}" which should not be used`);
            }
        }
        
        return errors
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return "Invalid JusticeSystem: \n" + errors.join("\n")
        }
        return `#JUSTICE
CourtRoom ${this.courtroom.vnum}
Dungeon ${this.dungeon.vnum}
Judge ${this.judge.vnum}
Guard ${this.guard.vnum}
Crime CRIME_HIGH_MURDER ${this.CRIME_HIGH_MURDER.punishment.code}
Crime CRIME_LOW_MURDER ${this.CRIME_LOW_MURDER.punishment.code}
Crime CRIME_ASSAULT ${this.CRIME_ASSAULT.punishment.code}
Crime CRIME_MUGGING ${this.CRIME_MUGGING.punishment.code}
$`
    }
}

class Room extends Model {
    constructor(fields) {
        super(Object.assign({
            vnum:               new Field({field_name:"vnum",               default_value: null,    in_flags:null,                      optional:false}),
            sdesc:              new Field({field_name:"sdesc",              default_value: null,    in_flags:null,                      optional:false}),
            ldesc:              new Field({field_name:"ldesc",              default_value: null,    in_flags:null,                      optional:false}),
            defunct:            new Field({field_name:"defunct",            default_value: 0,       in_flags:null,                      optional:false}),
            room_flags:         new Field({field_name:"room_flags",         default_value: [],      in_flags:flags.ROOM_FLAGS,          optional:true}),
            sector:             new Field({field_name:"sector",             default_value: null,    in_flags:flags.ROOM_SECTOR_FLAGS,   optional:false}),
            teleport_delay:     new Field({field_name:"teleport_delay",     default_value: 0,       in_flags:null,                      optional:false}),
            teleport_target:    new Field({field_name:"teleport_target",    default_value: 0,       in_flags:null,                      optional:false}),
            tunnel:             new Field({field_name:"tunnel",             default_value: 0,       in_flags:null,                      optional:false}),
            exits:              new Field({field_name:"exits",              default_value: [],      in_flags:null,                      optional:true}),
            door_resets:        new Field({field_name:"door_resets",        default_value: [],      in_flags:null,                      optional:true}),
            extra_descriptions: new Field({field_name:"extra_descriptions", default_value: [],      in_flags:null,                      optional:true}),
            programs:           new Field({field_name:"programs",           default_value: [],      in_flags:null,                      optional:true}),
        }, fields));
    }
    get _error_prefix() {
        return `[Room:(${this.vnum}) ${this.sdesc}]`;
    }
    validate() {
        let errors = super.validate();
        if (this.defunct != 0) {
            errors.push(`${this._error_prefix}.defunct must be 0`);
        }
        return errors;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `#${this.vnum}
${this.sdesc}~
${this.ldesc}
~
${this.defunct} ${this.room_flags.join("|")||"0"} ${this.sector.code} ${this.teleport_delay} ${this.teleport_target} ${this.tunnel}
${this.exits.map((exit) => (exit.toString())).join("\n")}
${this.extra_descriptions.map((desc) => (desc.toString())).join("\n")}
${this.programs.map((program) => (program.toString())).join("\n")}
S
`;
    }
}

class Exit extends Model {
    constructor(fields) {
        super(Object.assign({
            direction:          new Field({field_name:"direction",          default_value: null,                            in_flags:null,                  optional:false}),
            comment:            new Field({field_name:"comment",            default_value: "",                              in_flags:null,                  optional:false}),
            somewhere_keyword:  new Field({field_name:"somewhere_keyword",  default_value: null,                            in_flags:null,                  optional:true}),
            door_keyword:       new Field({field_name:"door_keyword",       default_value: "",                              in_flags:null,                  optional:false}),
            // Flags                    
            door_flags:         new Field({field_name:"door_flags",         default_value: [],                              in_flags:flags.EXIT_DOOR_FLAGS, optional:false}),
            door_key:           new Field({field_name:"door_key",           default_value: -1,                              in_flags:null,                  optional:false}),
            target_vnum:        new Field({field_name:"target_vnum",        default_value: null,                            in_flags:null,                  optional:false}),
            exit_size:          new Field({field_name:"exit_size",          default_value: flags.EXIT_SIZES.EXIT_SIZE_ANY,  in_flags:flags.EXIT_SIZES,      optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[Exit:${this.target_vnum}]`
    }
    validate() {
        let errors = super.validate();
        if (this.direction == flags.EXIT_DIRECTIONS.DDIR_SOMEWHERE && this.somewhere_keyword == null) {
            errors.push(`${this._error_prefix}.somewhere_keyword Somewhere exit defined, but no exit keyword specified`);
        }
        if (this.direction == flags.EXIT_DIRECTIONS.DDIR_SOMEWHERE && this.door_flags.indexOf(flags.EXIT_DOOR_FLAGS.EX_XAUTO) != -1) {
            errors.push(`${this._error_prefix}.door_flags Somewhere exit defined, but EX_XAUTO flag not set`);
        }
        if (this.door_keyword != "" && this.door_flags.indexOf(flags.EXIT_DOOR_FLAGS.EX_ISDOOR) == -1) {
            errors.push(`${this._error_prefix}.door_flags Door keywords defined, but EX_ISDOOR flag not set`);
        }
        return errors
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `${this.direction.code}
${this.comment}~
${this.direction == flags.EXIT_DIRECTIONS.DDIR_SOMEWHERE ? this.somewhere_keyword : this.door_keyword}~
${this.door_flags.map((flag)=>(flag.code)).join("|")||"0"} ${this.door_key} ${this.target_vnum} ${this.exit_size}`;
    }
}

class ExtraDescription extends Model {
    constructor(fields) {
        super(Object.assign({
            keywords: new Field({field_name:"keywords", default_value: null,    in_flags:null,  optional:false}),
            ldesc:    new Field({field_name:"ldesc",    default_value: null,    in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[ExtraDescription:${this.keywords}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `E
${this.keywords}~
${this.ldesc}
~`;
    }
}

class GameObject extends Model {
    constructor(fields) {
        super(Object.assign({
            vnum:               new Field({field_name:"vnum",               default_value: null,    in_flags:null,                  optional:false}),
            sdesc:              new Field({field_name:"sdesc",              default_value: null,    in_flags:null,                  optional:false}),
            ldesc:              new Field({field_name:"ldesc",              default_value: null,    in_flags:null,                  optional:false}),
            keywords:           new Field({field_name:"keywords",           default_value: null,    in_flags:null,                  optional:false}),
            action_description: new Field({field_name:"action_description", default_value: "",      in_flags:null,                  optional:false}), // Not used
            item_type:          new Field({field_name:"item_type",          default_value: null,    in_flags:flags.ITEM_TYPES,      optional:false}),
            attributes:         new Field({field_name:"attributes",         default_value: [],      in_flags:flags.ITEM_ATTRIBUTES, optional:true}),
            wear_flags:         new Field({field_name:"wear_flags",         default_value: [],      in_flags:flags.WEAR_LOCATIONS,  optional:false}),
            extra_descriptions: new Field({field_name:"extra_descriptions", default_value: [],      in_flags:null,                  optional:false}),
            quality:            new Field({field_name:"quality",            default_value: null,    in_flags:flags.ITEM_QUALITY,    optional:false}),
            material:           new Field({field_name:"material",           default_value: null,    in_flags:flags.ITEM_MATERIALS,  optional:false}),
            condition:          new Field({field_name:"condition",          default_value: null,    in_flags:flags.ITEM_CONDITION,  optional:false}),
            value0:             new Field({field_name:"value0",             default_value: 0,       in_flags:null,                  optional:true}),
            value1:             new Field({field_name:"value1",             default_value: 0,       in_flags:null,                  optional:true}),
            value2:             new Field({field_name:"value2",             default_value: 0,       in_flags:null,                  optional:true}),
            value3:             new Field({field_name:"value3",             default_value: 0,       in_flags:null,                  optional:true}),
            value4:             new Field({field_name:"value4",             default_value: 0,       in_flags:null,                  optional:true}),
            value5:             new Field({field_name:"value5",             default_value: 0,       in_flags:null,                  optional:true}),
            special_applies:    new Field({field_name:"special_applies",    default_value: [],      in_flags:flags.MOB_AFFECTS,     optional:true}),
            programs:           new Field({field_name:"programs",           default_value: [],      in_flags:null,                  optional:true}),
            identify_message:   new Field({field_name:"identify_message",   default_value: null,    in_flags:flags.MOB_AFFECTS,     optional:true}),
        }, fields));
    }
    get _error_prefix() {
        return `[GameObject:(${this.vnum}) ${this.sdesc}]`;
    }
    
    validate() {
        let errors = super.validate();
        
        if (this.action_description !== "") {
            console.log(this.action_description)
            errors.push(`${this._error_prefix}.action_description is not used and should be empty`);
        }
        return errors;
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return this.errors.join("\n")
        }
        return `#${this.vnum}
${this.keywords}~
${this.sdesc}~
${this.ldesc}~
${this.action_description}~
${this.item_type.code}
${this.attributes.map((attribute)=>(attribute.code)).join("|")||0}
${this.wear_flags.map((flag)=>(flag.code)).join("|")||0}
${this.quality.code} ${this.material.code} ${this.condition.code} ${this.size.code}
${this.value0} ${this.value1} ${this.value2} ${this.value3} ${this.value4} ${this.value5}
${this.extra_descriptions.map((desc) => (desc.toString())).join("\n")}
${this.special_applies.map((spec) => (`A ${spec.code} ${spec.value}`)).join("\n")}
${this.identify_message != null ? `I\n${this.identify_message}\n~` : "" }
${this.programs.map((program) => (program.toString())).join("\n")}
`;
    }
}

class SimpleMob extends Model {
    constructor(fields) {
        super(Object.assign({
            vnum:                   new Field({field_name:"vnum",                   default_value:null,                         in_flags:null,                  optional:false}),
            sdesc:                  new Field({field_name:"sdesc",                  default_value:null,                         in_flags:null,                  optional:false}),
            ldesc:                  new Field({field_name:"ldesc",                  default_value:null,                         in_flags:null,                  optional:false}),
            fulldesc:               new Field({field_name:"fulldesc",               default_value:null,                         in_flags:null,                  optional:false}),
            keywords:               new Field({field_name:"keywords",               default_value:null,                         in_flags:null,                  optional:false}),
            level:                  new Field({field_name:"level",                  default_value:null,                         in_flags:null,                  optional:false}),
            mob_class:              new Field({field_name:"mob_class",              default_value:null,                         in_flags:flags.MOB_CLASSES,     optional:false}),
            race:                   new Field({field_name:"race",                   default_value:null,                         in_flags:flags.MOB_RACES,       optional:false}),
            sex:                    new Field({field_name:"sex",                    default_value:null,                         in_flags:flags.MOB_SEXES,       optional:false}),
            position:               new Field({field_name:"position",               default_value:null,                         in_flags:flags.MOB_POSITIONS,   optional:false}),
            deity:                  new Field({field_name:"deity",                  default_value:flags.MOB_DEITIES.DEITY_NONE, in_flags:flags.MOB_DEITIES,     optional:true}),
            act_flags:              new Field({field_name:"act_flags",              default_value:[],                           in_flags:flags.MOB_ACT_FLAGS,   optional:false}),
            understood_languages:   new Field({field_name:"understood_languages",   default_value:[],                           in_flags:flags.LANGUAGE_FLAGS,  optional:false}),
            spoken_languages:       new Field({field_name:"spoken_languages",       default_value:[],                           in_flags:flags.LANGUAGE_FLAGS,  optional:false}),
            can_train:              new Field({field_name:"can_train",              default_value:[],                           in_flags:null,                  optional:false}),
            equipment_resets:       new Field({field_name:"equipment_resets",       default_value:[],                           in_flags:null,                  optional:false}),
            programs:               new Field({field_name:"programs",               default_value:[],                           in_flags:null,                  optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[SimpleMob:(${this.vnum}) ${this.sdesc}]`
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return this.errors.join("\n")
        }
        return `#${this.vnum}
${this.keywords}~
${this.sdesc}~
${this.ldesc}~
${this.fulldesc}
~
S ${this.level} ${this.class} ${this.race} ${this.sex} ${this.position} ${this.deity}
${this.act_flags.map((flag)=>(flag.code)).join("|")}
${this.understood_languages.map((lang)=>(lang.code)).join("|")}
${this.spoken_languages.map((lang)=>(lang.code)).join("|")}
${this.can_train.map((train)=>(train.toString())).join("\n")}
${this.programs.map((prog)=>(prog.toString())).join("\n")}`
    }
    
    
}

class UniqueMob extends SimpleMob {
    constructor(fields) {
        super(Object.assign({
            affect_flags:           new Field({field_name:"affect_flags",           default_value:[],   in_flags:flags.MOB_AFFECTS,       optional:false}),
            virtual_armor_type:     new Field({field_name:"virtual_armor_type",     default_value:null, in_flags:flags.ARMOR_TYPES,       optional:false}),
            virtual_armor_material: new Field({field_name:"virtual_armor_material", default_value:null, in_flags:flags.OBJECT_MATERIALS,  optional:false}),
            alignment:              new Field({field_name:"alignment",              default_value:null, in_flags:flags.MOB_ALIGNMENTS,    optional:false}),
            str:                    new Field({field_name:"str",                    default_value:13,   in_flags:null,                    optional:false}),
            int:                    new Field({field_name:"int",                    default_value:13,   in_flags:null,                    optional:false}),
            wis:                    new Field({field_name:"wis",                    default_value:13,   in_flags:null,                    optional:false}),
            dex:                    new Field({field_name:"dex",                    default_value:13,   in_flags:null,                    optional:false}),
            con:                    new Field({field_name:"con",                    default_value:13,   in_flags:null,                    optional:false}),
            cha:                    new Field({field_name:"cha",                    default_value:13,   in_flags:null,                    optional:false}),
            lck:                    new Field({field_name:"lck",                    default_value:13,   in_flags:null,                    optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[UniqueMob:(${this.vnum}) ${this.sdesc}]`
    }
    
    validate() {
        let errors = super.validate()
        for (let stat in ["str", "int", "wis", "dex", "con", "cha", "lck"]) {
            if (!(3 <= this.stats[stat] <= 22)) {
                errors.push(`${this._error_prefix}.${stat} should be between 3 and 22`);
            }
        }
        return errors;
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return this.errors.join("\n")
        }
        return `#${this.vnum}
${this.keywords}~
${this.sdesc}~
${this.ldesc}~
${this.fulldesc}
~
U ${this.level} ${this.class} ${this.race} ${this.sex} ${this.position} ${this.deity}
${this.act_flags.map((flag)=>(flag.code)).join("|")}
${this.affect_flags.map((flag)=>(flag.code)).join("|")}
${this.virtual_armor_type} ${this.virtual_armor_material}
${this.alignment}
${this.str} ${this.int} ${this.wis} ${this.dex} ${this.con} ${this.cha} ${this.lck}
${this.understood_languages.map((lang)=>(lang.code)).join("|")}
${this.spoken_languages.map((lang)=>(lang.code)).join("|")}
${this.can_train.map((train)=>(train.toString())).join("\n")}
${this.programs.map((program) => (program.toString())).join("\n")}`
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
    get _error_prefix() {
        return `[TrainSkill:${this.skill}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} ${this.skill}~`
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
    get _error_prefix() {
        return `[TrainSpell:${this.spell}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} ${this.spell}~`
    }
}

class TrainLevel extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,  in_flags:null,  optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,   in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[TrainLevel]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} level~`
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
    get _error_prefix() {
        return `[TrainStatistic:${this.statistic}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} ${this.statistic}~`
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
    get _error_prefix() {
        return `[TrainFeat:${this.feat}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} ${this.feat}~`
    }
}

class Shop extends Model {
    constructor(fields) {
        super(Object.assign({
            shopkeeper:     new Field({field_name:"shopkeeper",     default_value:null,                             in_flags:null,              optional:false}),
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
    get _error_prefix() {
        return `[Shop:${this.shopkeeper.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `${this.shopkeeper.vnum} ${this.will_buy_1} ${this.will_buy_2} ${this.will_buy_3} ${this.will_buy_4} ${this.will_buy_5}
${this.profit_buy} ${this.profit_sell} ${this.open_hour} ${this.close_hour} ; ${this.shopkeeper.sdesc}`;
    }
}

class RepairRecharge extends Model {
    constructor(fields) {
        super(Object.assign({
            shopkeeper:         new Field({field_name:"shopkeeper",         default_value:null,                             in_flags:null,                      optional:false}),
            will_repair_1:      new Field({field_name:"will_repair_1",      default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,          optional:false}),
            will_repair_2:      new Field({field_name:"will_repair_2",      default_value:flags.ITEM_TYPES.ITEM_TYPE_NONE,  in_flags:flags.ITEM_TYPES,          optional:true}),
            repair_material:    new Field({field_name:"repair_material",    default_value:null,                             in_flags:flags.MOB_REPAIR_MATERIAL, optional:false}),
            profit_modifier:    new Field({field_name:"profit_modifier",    default_value:100,                              in_flags:null,                      optional:false}),
            repair:             new Field({field_name:"repair",             default_value:null,                             in_flags:flags.MOB_REPAIR_RECHARGE, optional:false}),
            open_hour:          new Field({field_name:"open_hour",          default_value:null,                             in_flags:flags.MOB_FEATS,           optional:false}),
            close_hour:         new Field({field_name:"close_hour",         default_value:null,                             in_flags:flags.MOB_FEATS,           optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[RepairRecharge:${this.shopkeeper.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `${this.shopkeeper.vnum} ${this.will_repair_1} ${this.will_repair_2} ${this.repair_material}
${this.profit_modifier} ${this.repair} ${this.open_hour} ${this.close_hour} ; ${this.shopkeeper.sdesc}`;
    }
}

class MobReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:    new Field({field_name:"defunct",    default_value: 0,       in_flags:null,  optional:false}),
            mob:        new Field({field_name:"mob",        default_value: null,    in_flags:null,  optional:false}),
            mob_limit:  new Field({field_name:"mob_limit",  default_value: 1,       in_flags:null,  optional:false}),
            room:       new Field({field_name:"room",       default_value: null,    in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[MobReset:${this.mob.vnum} in ${this.room.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `M ${this.defunct} ${this.mob.vnum} ${this.mob_limit} ${this.room.vnum} ; ${this.mob.sdesc} in ${this.room.sdesc}
${this.mob.equipment_resets.map((equip)=>(equip.toString())).join("\n")}`
    }
}

class EquipmentReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,                  optional:false}),
            item:           new Field({field_name:"item",           default_value: 1,       in_flags:null,                  optional:false}),
            equip_limit:    new Field({field_name:"equip_limit",    default_value: 1,       in_flags:null,                  optional:false}),
            wear_loc:       new Field({field_name:"wear_loc",       default_value: null,    in_flags:flags.MOB_WEAR_RESETS, optional:true}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,                  optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[EquipmentReset:${this.mob.vnum} in ${this.room.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        if (this.wear_loc) {
            // Equipped
            return ` E ${this.defunct} ${this.item.vnum} ${this.equip_limit} ${this.wear_loc.code} ; ${this.item.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
        else {
            // Held
            return ` G ${this.defunct} ${this.item.vnum} ${this.equip_limit} ; ${this.item.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
    }
}

class ItemReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,  optional:false}),
            item:           new Field({field_name:"item",           default_value: null,    in_flags:null,  optional:false}),
            item_limit:     new Field({field_name:"item_limit",     default_value: 1,       in_flags:null,  optional:false}),
            room_container: new Field({field_name:"room_container", default_value: null,    in_flags:null,  optional:false}),
            hidden:         new Field({field_name:"hidden",         default_value: false,   in_flags:null,  optional:false}),
            buried:         new Field({field_name:"buried",         default_value: false,   in_flags:null,  optional:false}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,  optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[ItemReset:${this.mob.vnum} in ${this.room_container.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        if (this.room_container instanceof GameObject) {
            // Container (hidden is handled differently)
            return `P ${this.hidden ? 1 : 0} ${this.item.vnum} ${this.item_limit} ${this.room_container.vnum} ; ${this.item.sdesc} in ${this.room_container.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
        else if (this.hidden) {
            return `H ${this.defunct} ${this.item.vnum} ${this.item_limit} ${this.room_container.vnum} ; ${this.item.sdesc} in ${this.room_container.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
        else if (this.buried) {
            return `U ${this.defunct} ${this.item.vnum} ${this.item_limit} ${this.room_container.vnum} ; ${this.item.sdesc} in ${this.room_container.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
        return `O ${this.defunct} ${this.item.vnum} ${this.item_limit} ${this.room_container.vnum} ; ${this.item.sdesc} in ${this.room_container.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
    }
}

class DoorReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,              optional:false}),
            room:           new Field({field_name:"room",           default_value: null,    in_flags:null,              optional:false}),
            exit:           new Field({field_name:"exit",           default_value: null,    in_flags:null,              optional:false}),
            exit_state:     new Field({field_name:"exit_state",     default_value: null,    in_flags:flags.DOOR_RESETS, optional:false}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,              optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[DoorReset:${this.exit.code} from ${this.room.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `D ${this.defunct} ${this.room.vnum} ${this.exit.direction} ${this.exit_state.code} ; ${this.room.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
    }
}

class RandomDoorReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",    default_value: 0,       in_flags:null,  optional:false}),
            room:           new Field({field_name:"room",       default_value: null,    in_flags:null,  optional:false}),
            last_door:      new Field({field_name:"last_door",  default_value: null,    in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[RandomDoorReset:0-${this.last_door} from ${this.room.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `R ${this.defunct} ${this.room.vnum} ${this.last_door} ; ${this.room.sdesc} rearrange exits 0-${this.last_door} randomly`
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
    get _error_prefix() {
        return `[RoomReset:${this.room.vnum}: ${this.bit_type.code} ${this.flag.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `B ${this.defunct} ${this.room.vnum} ${ROOM_FLAGS.BIT_RESET_ROOM}|${this.bit_type} ${this.flag.code} ; ${this.room.sdesc}`
    }
}

// TrapResets can be attached to DoorRests, ItemResets, or EquipmentResets
class TrapReset extends Model {
    constructor(fields) {
        super(Object.assign({
            reset_interval: new Field({field_name:"reset_interval", default_value:0,                                in_flags:null,                  optional:false}),
            trap_type:      new Field({field_name:"trap_type",      default_value:null,                             in_flags:flags.TRAP_TYPES,      optional:false}),
            trap_charges:   new Field({field_name:"trap_charges",   default_value:null,                             in_flags:flags.RESET_BIT_CODES, optional:false}),
            trigger_1:      new Field({field_name:"trigger_1",      default_value:flags.TRAP_TRIGGERS.TRIGGER_NONE, in_flags:flags.TRAP_TRIGGERS,   optional:false}),
            trigger_2:      new Field({field_name:"trigger_2",      default_value:flags.TRAP_TRIGGERS.TRIGGER_NONE, in_flags:flags.TRAP_TRIGGERS,   optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[TrapReset:${this.trap_type.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return ` T ${this.reset_interval} ${this.trap_type.code} ${this.trap_type.code} ${this.trigger_1.code}|${this.trigger_2.code}`
    }
}

// CoinResets go in mob's equipment_resets list
class CoinReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 1,       in_flags:null,              optional:false}),
            coin_type:      new Field({field_name:"coin_type",      default_value: null,    in_flags:flags.COIN_TYPES,  optional:false}),
            dice_count:     new Field({field_name:"dice_count",     default_value: null,    in_flags:null,              optional:false}),
            dice_sides:     new Field({field_name:"dice_sides",     default_value: null,    in_flags:null,              optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[CoinReset:${this.trap_type.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return ` C ${this.defunt} ${this.coin_type.code} ${this.dice_count} ${this.dice_sides}`
    }
}

class MobSpecial extends Model {
    constructor(fields) {
        super(Object.assign({
            mob:        new Field({field_name:"mob",        default_value: null,    in_flags:null,                  optional:false}),
            special:    new Field({field_name:"special",    default_value: null,    in_flags:flags.MOB_SPECIALS,    optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[MobSpecial:${this.mob.vnum} ${this.special.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `M ${this.mob.vnum} ${this.special.code}`
    }
}

class QuestLog extends Model {
    constructor(fields) {
        super(Object.assign({
            area_vnum:  new Field({field_name:"area_vnum",  default_value: "QQ00",  in_flags:null,                      optional:false}),
            qbit_start: new Field({field_name:"qbit_start", default_value: null,    in_flags:null,                      optional:false}),
            qbit_stop:  new Field({field_name:"qbit_stop",  default_value: null,    in_flags:null,                      optional:false}),
            min_qbit:   new Field({field_name:"min_qbit",   default_value: null,    in_flags:null,                      optional:false}),
            max_qbit:   new Field({field_name:"max_qbit",   default_value: null,    in_flags:null,                      optional:false}),
            event_code: new Field({field_name:"event_code", default_value: null,    in_flags:flags.QUEST_EVENT_CODES,   optional:false}),
            qlog_text:  new Field({field_name:"qlog_text",  default_value: null,    in_flags:null,                      optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[QuestLog:${this.qlog_text}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `${this.area_vnum} ${this.qbit_start} ${this.qbit_stop} ${this.min_qbit} ${this.max_qbit} ${this.event_code}${this.qlog_text}`
    }
}

class Program extends Model {
    constructor(fields) {
        super(Object.assign({
            trigger:    new Field({field_name:"trigger",    default_value: null,    in_flags:null,  optional:false}),
            percentage: new Field({field_name:"percentage", default_value: null,    in_flags:null,  optional:false}),
            program:    new Field({field_name:"program",    default_value: null,    in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[Program:${this.trigger.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `>${this.trigger} ${this.percentage}
${this.program}
|`
    }
}
//export default Loader;

// DEBUG
function testLoader() {
    let loader = new Loader();
    //console.log(loader.toString());
    loader.area.name = "Calimport";
    loader.area.category = flags.AREA_CATEGORIES.CITIES;
    loader.area.reset_msg = "{A0}A hot wind blows off the desert.";
    loader.area.authors.push("Grenwyn");
    loader.area.economy_min = 100000;
    loader.area.economy_max = 100000;
    loader.area.weather_humidity = 1;
    loader.area.weather_temperature = 8;
    // loader.area.authors.push("Lord Greywether") // should fail
    
    let courtroom = new Room();
    courtroom.vnum = "QQ01";
    courtroom.sdesc = "Courtroom";
    courtroom.ldesc = "A really big courtroom";
    courtroom.sector = flags.ROOM_SECTOR_FLAGS.SECT_INSIDE;
    // courtroom.room_flags.push(ROOM_FLAGS.ROOM_DEATH); // Should fail
    let courtroom_exit = new Exit();
    courtroom_exit.direction = flags.EXIT_DIRECTIONS.DDIR_DOWN;
    courtroom_exit.door_keyword = "trapdoor";
    courtroom_exit.door_flags.push(flags.EXIT_DOOR_FLAGS.EX_ISDOOR);
    courtroom_exit.door_flags.push(flags.EXIT_DOOR_FLAGS.EX_LOCKED);
    courtroom_exit.door_flags.push(flags.EXIT_DOOR_FLAGS.EX_CLOSED);
    courtroom.exits.push(courtroom_exit);
    
    let dungeon = new Room();
    dungeon.vnum = "QQ03";
    dungeon.sdesc = "Dungeon";
    dungeon.ldesc = "A really smelly dungeon";
    dungeon.sector = flags.ROOM_SECTOR_FLAGS.SECT_INSIDE;
    let dungeon_exit = new Exit();
    dungeon_exit.direction = flags.EXIT_DIRECTIONS.DDIR_UP
    dungeon_exit.door_keyword = "trapdoor"
    dungeon_exit.door_flags.push(flags.EXIT_DOOR_FLAGS.EX_ISDOOR)
    dungeon_exit.door_flags.push(flags.EXIT_DOOR_FLAGS.EX_LOCKED)
    dungeon_exit.door_flags.push(flags.EXIT_DOOR_FLAGS.EX_CLOSED)
    dungeon.exits.push(dungeon_exit)
    let dungeon_extra_desc = new ExtraDescription()
    dungeon_extra_desc.keywords = "smelly garbage"
    dungeon_extra_desc.ldesc = "There's a heap of really nasty garbage here. It might be a way out - if you die of food poisoning!"
    dungeon.extra_descriptions.push(dungeon_extra_desc)
    
    
    dungeon_exit.target_vnum = courtroom.vnum
    courtroom_exit.target_vnum = dungeon.vnum
    
    loader.area.rooms.push(courtroom)
    loader.area.rooms.push(dungeon)
    
    let trapdoor_key = new GameObject();
    trapdoor_key.vnum = "QQ01";
    trapdoor_key.sdesc = "{80}A large iron key";
    trapdoor_key.ldesc = "{80}A large iron key is lying about for anyone to take";
    trapdoor_key.keywords = "large iron key";
    trapdoor_key.item_type = flags.ITEM_TYPES.ITEM_TYPE_KEY;
    trapdoor_key.wear_flags.push(flags.WEAR_LOCATIONS.CAN_WEAR_TAKE);
    trapdoor_key.wear_flags.push(flags.WEAR_LOCATIONS.CAN_WEAR_HOLD);
    let trapdoor_key_desc = new ExtraDescription();
    trapdoor_key_desc.keywords = "large iron key";
    trapdoor_key_desc.ldesc = "{80}This is a heavy iron key, scratched from years of use.\nIt looks like it might open a trapdoor.";
    trapdoor_key.extra_descriptions.push(trapdoor_key_desc);
    trapdoor_key.quality = flags.ITEM_QUALITY.QUALITY_AVERAGE;
    trapdoor_key.condition = flags.ITEM_CONDITION.COND_USABLE;
    trapdoor_key.material = flags.ITEM_MATERIALS.MATERIAL_IRON;
    trapdoor_key.size = flags.ITEM_SIZES.SIZE_TINY;
    
    loader.area.objects.push(trapdoor_key);
    
    loader.area.justice_system = new JusticeSystem();
    loader.area.justice_system.courtroom = courtroom
    loader.area.justice_system.judge = {
        vnum: "QQ02",
        validate: () => (true)
    };
    loader.area.justice_system.dungeon = dungeon;
    loader.area.justice_system.guard = {
        vnum: "QQ04",
        validate: () => (true)
    };
    loader.area.justice_system.CRIME_HIGH_MURDER.punishment = flags.JUSTICE_PUNISHMENTS.PUNISHMENT_DEATH;
    loader.area.justice_system.CRIME_LOW_MURDER.punishment = flags.JUSTICE_PUNISHMENTS.PUNISHMENT_SEVER;
    loader.area.justice_system.CRIME_ASSAULT.punishment = flags.JUSTICE_PUNISHMENTS.PUNISHMENT_JAIL;
    loader.area.justice_system.CRIME_MUGGING.punishment = flags.JUSTICE_PUNISHMENTS.PUNISHMENT_RANDOM_ITEM;
    
    console.log(loader.toString());
}

testLoader();