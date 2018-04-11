var flags = require("./flags.js");

// Model classes

class Field {
    constructor(options) {
        this.name = options.field_name;
        this.value = options.default_value;
        this.extra_validator = options.extra_validator;
        this.options = {
            in_flags: options.in_flags,
            optional: options.optional,
        };
    }
    
    validate(value) {
        let errors = [];
        
        if (value == null || (typeof value === "string" && value.trim() === "")) {
            if (!this.options.optional) {
                errors.push(`${this.name} should not be empty`)
            }
        }
        else {
            if (value instanceof Array) {
                if (!this.options.optional && value.length === 0) {
                    errors.push(`${this.name} should not be empty`)
                }
                for (let i = 0; i < value.length; i++) {
                    try {
                        if (this.options.in_flags && value[i].code && !(value[i].code in this.options.in_flags)) {
                            errors.push(`${this.name} "${value[i].code}" is not valid`)
                        }
                    }
                    catch (e) {
                        console.log(this);
                        throw (e)
                    }
                    if (value[i].do_not_use) {
                        errors.push(`${this.name} "${value[i].code}" should not be used`)
                    }
                }
            }
            else {
                if (this.options.in_flags && !(value.code in this.options.in_flags)) {
                    errors.push(`${this.name} "${value.code}" is not valid`)
                }
                if (value.do_not_use) {
                    errors.push(`${this.name} "${value.code}" should not be used`)
                }
            }
        }
        if (this.extra_validator && {}.toString.call(this.extra_validator) === '[object Function]') {
            let extra_errors = this.extra_validator(value)
            if (extra_errors) {
                errors = errors.concat(extra_errors);
            }
        }
        
        return errors;
    }
}

class ModelValidator {
    constructor(field_list={}) {
        Object.assign(this, field_list);
    }
    
    _error_prefix(model) {
        return "[Model]"
    }
    
    validate(model) {
        let errors = [];
        for (let prop in this) {
            if (this[prop] instanceof Field || (this[prop] instanceof ModelValidator && model[prop])) {
                try {
                    errors = errors.concat(this[prop].validate(model[prop]).map((err)=>(`${this._error_prefix(model)} ${err}`)));
                } catch (e) {
                    console.log(prop)
                    throw(e);
                }
            }
        }
        return errors;
    }
}

class ModelArrayValidator {
    constructor(model_validator) {
        Object.assign(this, {model_validator});
    }
    
    _error_prefix(model) {
        return "[ModelArray]"
    }
    
    validate(models) {
        if (models.constructor === Array) {
            return [].concat.apply([], models.map(model=>this.model_validator.validate(model)));
        }
        else {
            return this.model_validator.validate(models); // May be a single instance of the group
        }
    }
}

class StateValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            area:                   new AreaValidator(),
            justice_system:         new JusticeSystemValidator(),
            rooms:                  new ModelArrayValidator(new RoomValidator()),
            items:                  new ModelArrayValidator(new ItemValidator()),
            mobs:                   new ModelArrayValidator(new MobValidator()),
            mob_specials:           new ModelArrayValidator(new MobSpecialValidator()),
            quest_log:              new ModelArrayValidator(new QuestLogValidator()),
            exits:                  new ModelArrayValidator(new ExitValidator()),
            door_resets:            new ModelArrayValidator(new DoorResetValidator()),
            room_resets:            new ModelArrayValidator(new RoomResetValidator()),
            extra_descriptions:     new ModelArrayValidator(new ExtraDescriptionValidator()),
            programs:               new ModelArrayValidator(new ProgramValidator()),
            special_applies:        new ModelArrayValidator(new ItemApplyValidator()),
            item_resets:            new ModelArrayValidator(new ItemResetValidator()),
            can_train_skill:        new ModelArrayValidator(new TrainSkillValidator()),
            can_train_weapon_skill: new ModelArrayValidator(new TrainWeaponSkillValidator()),
            can_train_spell:        new ModelArrayValidator(new TrainSpellValidator()),
            can_train_level:        new ModelArrayValidator(new TrainLevelValidator()),
            can_train_statistic:    new ModelArrayValidator(new TrainStatisticValidator()),
            can_train_feat:         new ModelArrayValidator(new TrainFeatValidator()),
            mob_resets:             new ModelArrayValidator(new MobResetValidator()),
            shop:                   new ModelArrayValidator(new ShopValidator()),
            repairs:                new ModelArrayValidator(new RepairRechargeValidator()),
            equipment_resets:       new ModelArrayValidator(new EquipmentResetValidator()),
            coins_resets:           new ModelArrayValidator(new CoinResetValidator()),
            trap_reset:             new ModelArrayValidator(new TrapResetValidator()),
        }, fields))
    }
    _error_prefix(model) {
        return `State: `;
    }
}

class AreaValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            name:                   new Field({field_name:"Area Name",                   in_flags:null,                  optional:false}),
            category:               new Field({field_name:"Category",               in_flags:flags.AREA_CATEGORIES, optional:false}),
            authors:                new Field({field_name:"Authors",                in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (value.length >= 36) {
                    return [`Authors list too long (max 36 characters)`];
                }
            }}),
            vnum:                   new Field({field_name:"Base Vnum",                   in_flags:null,                  optional:false}),
            min_recommended_level:  new Field({field_name:"Min recommended level",  in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(0 <= value && value <= 65)) {
                    return[`min_recommended_level must be between 0 and 65`];
                }
            }}),
            max_recommended_level:  new Field({field_name:"Max recommended level",  in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(0 <= value && value <= 65)) {
                    return[`max_recommended_level must be between 0 and 65`];
                }
            }}),
            min_enforced_level:     new Field({field_name:"Min enforced level",     in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(0 <= value && value <= 65)) {
                    return[`min_enforced_level must be between 0 and 65`];
                }
            }}),
            max_enforced_level:     new Field({field_name:"Max enforced level",     in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(0 <= value && value <= 65)) {
                    return[`max_enforced_level must be between 0 and 65`];
                }
            }}),
            reset_msg:              new Field({field_name:"Area reset echo",              in_flags:null,                  optional:false}),
            wilderness_flag:        new Field({field_name:"Wilderness flag",        in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (value !== "0") {
                    return [`Wilderness flag should be 0 for most areas`];
                }
            }}),
            reset_duration:         new Field({field_name:"Area reset duration",         in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (value < -1) {
                    return [`Invalid reset duration`];
                }
            }}),
            economy_min:            new Field({field_name:"economy min",            in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (value < 0) {
                    return [`Economy min should be a positive number`];
                }
            }}),
            economy_max:            new Field({field_name:"Economy max",            in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (value < 0) {
                    return [`Economy max should be a positive number`];
                }
            }}),
            weather_humidity:       new Field({field_name:"Humidity",       in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(1 <= value && value <= 10)) {
                    return [`Humidity must be between 1 and 10`];
                }
            }}),
            weather_temperature:    new Field({field_name:"Temperature",    in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(1 <= value && value <= 10)) {
                    return [`Temperature must be between 1 and 10`];
                }
            }}),
            mining_material:        new Field({field_name:"Mining material",        in_flags:flags.ITEM_MATERIALS,  optional:true}),
            logging_material:       new Field({field_name:"Logging material",       in_flags:flags.ITEM_MATERIALS,  optional:true}),
        }, fields))
    }
    _error_prefix(model) {
        return `Area General: `;
    }
}

class JusticeSystemValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            courtroom:          new Field({field_name:"Courtroom",          in_flags:null,                      optional:true}),
            dungeon:            new Field({field_name:"Dungeon",            in_flags:null,                      optional:true}),
            judge:              new Field({field_name:"Judge",              in_flags:null,                      optional:true}),
            guard:              new Field({field_name:"Guard",              in_flags:null,                      optional:true}),
            CRIME_HIGH_MURDER:  new Field({field_name:"CRIME_HIGH_MURDER",  in_flags:flags.JUSTICE_PUNISHMENTS, optional:false}),
            CRIME_LOW_MURDER:   new Field({field_name:"CRIME_LOW_MURDER",   in_flags:flags.JUSTICE_PUNISHMENTS, optional:false}),
            CRIME_ASSAULT:      new Field({field_name:"CRIME_ASSAULT",      in_flags:flags.JUSTICE_PUNISHMENTS, optional:false}),
            CRIME_MUGGING:      new Field({field_name:"CRIME_MUGGING",      in_flags:flags.JUSTICE_PUNISHMENTS, optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return "Justice System: "
    }
}

class RoomValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            vnum:               new Field({field_name:"Vnum",               in_flags:null,                      optional:false}),
            sdesc:              new Field({field_name:"Short description",              in_flags:null,                      optional:false}),
            ldesc:              new Field({field_name:"Long description",              in_flags:null,                      optional:false}),
            defunct:            new Field({field_name:"defunct",            in_flags:null,                      optional:false,     extra_validator: (value) => {
                if (value !== "0") {
                    return[`defunct must be 0`];
                }
            }}),
            room_flags:         new Field({field_name:"Room flags",         in_flags:flags.ROOM_FLAGS,          optional:true}),
            sector:             new Field({field_name:"Sector",             in_flags:flags.ROOM_SECTOR_FLAGS,   optional:false}),
            teleport_delay:     new Field({field_name:"Teleport delay",     in_flags:null,                      optional:true}),
            teleport_target:    new Field({field_name:"Teleport target",    in_flags:null,                      optional:true}),
            tunnel:             new Field({field_name:"Room Capacity [Tunnel]",             in_flags:null,                      optional:true}),
        }, fields));
    }
    validate_state(state, room) {
        let programs = new ModelArrayValidator(new ProgramValidator()).validate(state.programs.filter(i=>i.pointer===room.uuid))
        let room_resets = new ModelArrayValidator(new RoomResetValidator()).validate(state.room_resets.filter(i=>(i.room===room.vnum)))
        let door_resets = new ModelArrayValidator(new DoorResetValidator()).validate(state.door_resets.filter(i=>(i.room===room.vnum)))
        let exits = new ModelArrayValidator(new ExitValidator()).validate(state.exits.filter(i=>i.room===room.uuid))
        let extra_descs = new ModelArrayValidator(new ExtraDescriptionValidator()).validate(state.extra_descriptions.filter(i=>i.pointer===room.uuid))
        return this.validate(room).concat(programs, room_resets, door_resets, exits, extra_descs)
    }
    _error_prefix(model) {
        return `Room ${model.vnum} (${model.sdesc}): `;
    }
}

class ExitValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            direction:              new Field({field_name:"Direction",              in_flags:flags.EXIT_DIRECTIONS, optional:false}),
            comment:                new Field({field_name:"Comment",                in_flags:null,                  optional:true}),
            somewhere_door_keyword: new Field({field_name:"Somewhere/Door Keywords", in_flags:null,                  optional:true}),
            // Flags                    
            door_flags:             new Field({field_name:"Door Flags",             in_flags:flags.EXIT_DOOR_FLAGS, optional:true}),
            door_key:               new Field({field_name:"Door Key",               in_flags:null,                  optional:false}),
            target_vnum:            new Field({field_name:"Exit Target",            in_flags:null,                  optional:false}),
            exit_size:              new Field({field_name:"Exit Size",              in_flags:flags.EXIT_SIZES,      optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `Exit ${model.direction?model.direction.code:undefined}: `
    }
}

class ExtraDescriptionValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            keywords: new Field({field_name:"Keywords", in_flags:null,  optional:false}),
            ldesc:    new Field({field_name:"Long description",    in_flags:null,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `ExtraDescription (${model.keywords}): `;
    }
}

class ItemApplyValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            apply_flag: new Field({field_name:"Apply Flag", in_flags:flags.ITEM_APPLIES,    optional:false}),
            parameter:  new Field({field_name:"Value",  in_flags:null,                  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `ItemApply (${model.apply_flag}): `;
    }
}

class ItemValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            vnum:               new Field({field_name:"Vnum",               in_flags:null,                  optional:false}),
            sdesc:              new Field({field_name:"Short description",              in_flags:null,                  optional:false}),
            ldesc:              new Field({field_name:"Long description",              in_flags:null,                  optional:false}),
            keywords:           new Field({field_name:"Keywords",           in_flags:null,                  optional:false}),
            action_description: new Field({field_name:"action_description", in_flags:null,                  optional:true,     extra_validator: (value) => {
                // eslint-disable-next-line
                if (value != "") {
                    return[`action_description is not used and should be empty`];
                }
            }}), // Not used
            item_type:          new Field({field_name:"Item Type",          in_flags:flags.ITEM_TYPES,      optional:false}),
            attributes:         new Field({field_name:"Attributes",         in_flags:flags.ITEM_ATTRIBUTES, optional:true}),
            wear_flags:         new Field({field_name:"Wear Locations",         in_flags:flags.WEAR_LOCATIONS,  optional:true}),
            quality:            new Field({field_name:"Quality",            in_flags:flags.ITEM_QUALITY,    optional:false}),
            material:           new Field({field_name:"Material",           in_flags:flags.ITEM_MATERIALS,  optional:false}),
            condition:          new Field({field_name:"Condition",          in_flags:flags.ITEM_CONDITION,  optional:false}),
            size:               new Field({field_name:"Size",               in_flags:flags.ITEM_SIZES,      optional:false}),
            value0:             new Field({field_name:"Value 0",             in_flags:null,                  optional:true}),
            value1:             new Field({field_name:"Value 1",             in_flags:null,                  optional:true}),
            value2:             new Field({field_name:"Value 2",             in_flags:null,                  optional:true}),
            value3:             new Field({field_name:"Value 3",             in_flags:null,                  optional:true}),
            value4:             new Field({field_name:"Value 4",             in_flags:null,                  optional:true}),
            value5:             new Field({field_name:"Value 5",             in_flags:null,                  optional:true}),
            identify_message:   new Field({field_name:"Identify text",   in_flags:null,     optional:true}),
        }, fields));
    }
    validate_state(state, item) {
        let programs = new ModelArrayValidator(new ProgramValidator()).validate(state.programs.filter(i=>i.pointer===item.uuid))
        let applies = new ModelArrayValidator(new ItemApplyValidator()).validate(state.item_applies.filter(i=>i.pointer===item.uuid))
        let extra_descs = new ModelArrayValidator(new ExtraDescriptionValidator()).validate(state.extra_descriptions.filter(i=>i.pointer===item.uuid))
        return this.validate(item).concat(programs, applies, extra_descs)
    }
    _error_prefix(model) {
        return `Item ${model.vnum} (${model.sdesc}): `;
    }
}

class SimpleMobValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            vnum:                   new Field({field_name:"Vnum",                   in_flags:null,                  optional:false}),
            sdesc:                  new Field({field_name:"Short description",                  in_flags:null,                  optional:false}),
            ldesc:                  new Field({field_name:"Long description",                  in_flags:null,                  optional:false}),
            fulldesc:               new Field({field_name:"Full description",               in_flags:null,                  optional:false}),
            keywords:               new Field({field_name:"Keywords",               in_flags:null,                  optional:false}),
            level:                  new Field({field_name:"Level",                  in_flags:null,                  optional:false}),
            mob_class:              new Field({field_name:"Class",              in_flags:flags.MOB_CLASSES,     optional:false}),
            race:                   new Field({field_name:"Race",                   in_flags:flags.MOB_RACES,       optional:false}),
            sex:                    new Field({field_name:"Sex",                    in_flags:flags.MOB_SEXES,       optional:false}),
            position:               new Field({field_name:"Position",               in_flags:flags.MOB_POSITIONS,   optional:false}),
            deity:                  new Field({field_name:"Deity",                  in_flags:flags.MOB_DEITIES,     optional:true}),
            act_flags:              new Field({field_name:"Act flags",              in_flags:flags.MOB_ACT_FLAGS,   optional:true}),
            understood_languages:   new Field({field_name:"Understood languages",   in_flags:flags.LANGUAGE_FLAGS,  optional:false}),
            spoken_languages:       new Field({field_name:"Spoken languages",       in_flags:flags.LANGUAGE_FLAGS,  optional:false}),
        }, fields));
    }
    validate_state(state, mob) {
        let programs = new ModelArrayValidator(new ProgramValidator()).validate(state.programs.filter(i=>i.pointer===mob.uuid))
        let skill = new ModelArrayValidator(new TrainSkillValidator()).validate(state.can_train_skill.filter(i=>i.mob===mob.uuid))
        let weapon_skill = new ModelArrayValidator(new TrainWeaponSkillValidator()).validate(state.can_train_weapon_skill.filter(i=>i.mob===mob.uuid))
        let spell = new ModelArrayValidator(new TrainSpellValidator()).validate(state.can_train_spell.filter(i=>i.mob===mob.uuid))
        let level = new ModelArrayValidator(new TrainLevelValidator()).validate(state.can_train_level.filter(i=>i.mob===mob.uuid))
        let feat = new ModelArrayValidator(new TrainFeatValidator()).validate(state.can_train_feat.filter(i=>i.mob===mob.uuid))
        let statistic = new ModelArrayValidator(new TrainStatisticValidator()).validate(state.can_train_statistic.filter(i=>i.mob===mob.uuid))
        return this.validate(mob).concat(programs, skill, weapon_skill, spell, level, feat, statistic)
    }
    _error_prefix(model) {
        return `SimpleMob ${model.vnum} (${model.sdesc}): `
    }
}

class UniqueMobValidator extends SimpleMobValidator {
    constructor(fields) {
        super(Object.assign({
            affect_flags:           new Field({field_name:"Affect flags",           in_flags:flags.MOB_AFFECTS,     optional:true}),
            affect_two_flags:       new Field({field_name:"Affect flags 2",         in_flags:flags.MOB_AFFECTS_TWO, optional:true}),
            virtual_armor_type:     new Field({field_name:"Virtual armor type",     in_flags:flags.ITEM_ARMOR_TYPES,optional:false}),
            virtual_armor_material: new Field({field_name:"Virtual armor material", in_flags:flags.ITEM_MATERIALS,  optional:false}),
            alignment:              new Field({field_name:"Alignment",              in_flags:flags.MOB_ALIGNMENTS,  optional:false}),
            str:                    new Field({field_name:"Str",                    in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(3 <= value && value <= 22)) {
                    return[`Str should be between 3 and 22`];
                }
            }}),
            int:                    new Field({field_name:"Int",                    in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(3 <= value && value <= 22)) {
                    return[`Int should be between 3 and 22`];
                }
            }}),
            wis:                    new Field({field_name:"Wis",                    in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(3 <= value && value <= 22)) {
                    return[`Wis should be between 3 and 22`];
                }
            }}),
            dex:                    new Field({field_name:"Dex",                    in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(3 <= value && value <= 22)) {
                    return[`Dex should be between 3 and 22`];
                }
            }}),
            con:                    new Field({field_name:"Con",                    in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(3 <= value && value <= 22)) {
                    return[`Con should be between 3 and 22`];
                }
            }}),
            cha:                    new Field({field_name:"Cha",                    in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(3 <= value && value <= 22)) {
                    return[`Cha should be between 3 and 22`];
                }
            }}),
            lck:                    new Field({field_name:"Lck",                    in_flags:null,                  optional:false,     extra_validator: (value) => {
                if (!(3 <= value && value <= 22)) {
                    return[`Lck should be between 3 and 22`];
                }
            }}),
            ris_resistant:          new Field({field_name:"Resistant",              in_flags:flags.MOB_RIS,         optional:false}),
            ris_immune:             new Field({field_name:"Immune",                 in_flags:flags.MOB_RIS,         optional:false}),
            ris_susceptible:        new Field({field_name:"Susceptible",            in_flags:flags.MOB_RIS,         optional:false}),
        }, fields));
    }
    _error_prefix(model) {
        return `UniqueMob ${model.vnum} (${model.sdesc}): `
    }
}

class MobValidator extends UniqueMobValidator {
    validate(model) {
        if (model.unique) {
            return super.validate(model)
        }
        else {
            return (new SimpleMobValidator()).validate(model)
        }
    }
}

class TrainSkillValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"Level",              in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"Price multiplier",   in_flags:null,              optional:false}),
            skill:              new Field({field_name:"Skill",              in_flags:flags.MOB_SKILLS,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `TrainSkill (${model.skill? model.skill.code : undefined}): `;
    }
}

class TrainWeaponSkillValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"Level",              in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"Price multiplier",   in_flags:null,              optional:false}),
            weapon_skill:       new Field({field_name:"Weapon skill",       in_flags:flags.MOB_WEAPON_SKILLS,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `TrainWeaponSkill (${model.weapon_skill? model.weapon_skill.code : undefined}): `;
    }
}

class TrainSpellValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"Level",              in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"Price multiplier",   in_flags:null,              optional:false}),
            spell:              new Field({field_name:"Spell",              in_flags:flags.MOB_SPELLS,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `TrainSpell (${model.spell? model.spell.code : undefined}): `;
    }
}

class TrainLevelValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"Level",              in_flags:null,  optional:false}),
            price_multiplier:   new Field({field_name:"Price multiplier",   in_flags:null,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `TrainLevel: `;
    }
}

class TrainStatisticValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"Level",              in_flags:null,                  optional:false}),
            price_multiplier:   new Field({field_name:"Price multiplier",   in_flags:null,                  optional:false}),
            statistic:          new Field({field_name:"Statistic",          in_flags:flags.MOB_STATISTICS,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `TrainStatistic (${model.statistic? model.statistic.code : undefined}): `;
    }
}

class TrainFeatValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"Level",              in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"Price multiplier",   in_flags:null,              optional:false}),
            feat:               new Field({field_name:"Feat",               in_flags:flags.MOB_FEATS,   optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `TrainFeat (${model.feat? model.feat.code : undefined}): `;
    }
}

class TrainLangValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"Level",              in_flags:null,                  optional:false}),
            price_multiplier:   new Field({field_name:"Price multiplier",   in_flags:null,                  optional:false}),
            lang:               new Field({field_name:"Lang",               in_flags:flags.MOB_LANGUAGES,   optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `TrainLang (${model.lang? model.lang.code : undefined}): `;
    }
}

class ShopValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            shopkeeper:     new Field({field_name:"Shopkeeper",     in_flags:null,              optional:false}),
            will_buy_1:     new Field({field_name:"Will buy 1",     in_flags:flags.ITEM_TYPES,  optional:false}),
            will_buy_2:     new Field({field_name:"Will buy 2",     in_flags:flags.ITEM_TYPES,  optional:true}),
            will_buy_3:     new Field({field_name:"Will buy 3",     in_flags:flags.ITEM_TYPES,  optional:true}),
            will_buy_4:     new Field({field_name:"Will buy 4",     in_flags:flags.ITEM_TYPES,  optional:true}),
            will_buy_5:     new Field({field_name:"Will buy 5",     in_flags:flags.ITEM_TYPES,  optional:true}),
            profit_buy:     new Field({field_name:"Profit (buy)",     in_flags:null,              optional:false}),
            profit_sell:    new Field({field_name:"Profit (sell)",    in_flags:null,              optional:false}),
            open_hour:      new Field({field_name:"Open hour",      in_flags:null,              optional:false}),
            close_hour:     new Field({field_name:"Close hour",     in_flags:null,              optional:false}),
        }, fields))        }
    _error_prefix(model) {
        return `Shop (${model.shopkeeper}): `;
    }
}

class RepairRechargeValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            shopkeeper:         new Field({field_name:"Shopkeeper",         in_flags:null,                      optional:false}),
            will_repair_1:      new Field({field_name:"Will repair 1",      in_flags:flags.ITEM_TYPES,          optional:false}),
            will_repair_2:      new Field({field_name:"Will repair 2",      in_flags:flags.ITEM_TYPES,          optional:true}),
            repair_material:    new Field({field_name:"Repair material",    in_flags:flags.MOB_REPAIR_MATERIAL, optional:false}),
            profit_modifier:    new Field({field_name:"Profit modifier",    in_flags:null,                      optional:false}),
            repair:             new Field({field_name:"Repair",             in_flags:flags.MOB_REPAIR_RECHARGE, optional:false}),
            open_hour:          new Field({field_name:"Open hour",          in_flags:null,                      optional:false}),
            close_hour:         new Field({field_name:"Close hour",         in_flags:null,                      optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `Repair/Recharge (${model.shopkeeper}): `;
    }
}

class MobResetValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            defunct:    new Field({field_name:"Defunct",    in_flags:null,  optional:false}),
            mob:        new Field({field_name:"Mob",        in_flags:null,  optional:false}),
            mob_limit:  new Field({field_name:"Mob limit",  in_flags:null,  optional:false}),
            room:       new Field({field_name:"Room",       in_flags:null,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `MobReset (${model.mob} in ${model.room}): `;
    }
}

class EquipmentResetValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"Defunct",        in_flags:null,                  optional:false}),
            item:           new Field({field_name:"Item",           in_flags:null,                  optional:false}),
            equip_limit:    new Field({field_name:"Equip limit",    in_flags:null,                  optional:false}),
            wear_loc:       new Field({field_name:"Wear location",       in_flags:flags.MOB_WEAR_POSITIONS, optional:true}),
        }, fields))
    }
    _error_prefix(model) {
        return `EquipmentReset (${model.item}): `;
    }
}

class ItemResetValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"Defunct",        in_flags:null,  optional:false}),
            item:           new Field({field_name:"Item",           in_flags:null,  optional:false}),
            item_limit:     new Field({field_name:"Item limit",     in_flags:null,  optional:false}),
            room_container: new Field({field_name:"Room/container", in_flags:null,  optional:false}),
            hidden:         new Field({field_name:"Hidden",         in_flags:null,  optional:false}),
            buried:         new Field({field_name:"Buried",         in_flags:null,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `ItemReset (${model.item} in ${model.room_container ? model.room_container : "undefined"}): `;
    }
}

class DoorResetValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"Defunct",        in_flags:null,              optional:false}),
            room:           new Field({field_name:"Room",           in_flags:null,              optional:false}),
            exit:           new Field({field_name:"Exit",           in_flags:flags.DOOR_RESET_DIRECTIONS,              optional:false}),
            exit_state:     new Field({field_name:"Exit state",     in_flags:flags.DOOR_RESET_FLAGS, optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `DoorReset (${model.exit ? model.exit.code : "[no exit defined]"} from ${model.room}): `;
    }
}

class RandomDoorResetValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"Defunct",    in_flags:null,  optional:false}),
            room:           new Field({field_name:"Room",       in_flags:null,  optional:false}),
            last_door:      new Field({field_name:"Last door",  in_flags:null,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `RandomDoorReset (0-${model.last_door} from ${model.room}): `;
    }
}

class RoomResetValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"Defunct",        in_flags:null,                  optional:false}),
            room:           new Field({field_name:"Room",           in_flags:null,                  optional:false}),
            bit_type:       new Field({field_name:"Bit type",       in_flags:flags.RESET_BIT_CODES, optional:false}),
            flag:           new Field({field_name:"Room Flag",           in_flags:flags.ROOM_FLAGS,      optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `RoomReset (${model.room}): `;
    }
}

// TrapResets can be attached to DoorRests, ItemResets, or EquipmentResets
class TrapResetValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            reset_interval: new Field({field_name:"Reset interval", in_flags:null,                  optional:false}),
            trap_type:      new Field({field_name:"Trap type",      in_flags:flags.TRAP_TYPES,      optional:false}),
            trap_charges:   new Field({field_name:"Trap charges",   in_flags:null,                  optional:false}),
            trigger_1:      new Field({field_name:"Trigger 1",      in_flags:flags.TRAP_TRIGGERS,   optional:false}),
            trigger_2:      new Field({field_name:"Trigger 2",      in_flags:flags.TRAP_TRIGGERS,   optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `TrapReset (${model.trap_type ? model.trap_type.code : "undefined"}): `;
    }
}

// CoinResets go in mob's equipment_resets list
class CoinResetValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"Defunct",        in_flags:null,              optional:false}),
            coin_type:      new Field({field_name:"Coin type",      in_flags:flags.ITEM_COIN_TYPES,  optional:false}),
            dice_count:     new Field({field_name:"Dice count",     in_flags:null,              optional:false}),
            dice_sides:     new Field({field_name:"Dice sides",     in_flags:null,              optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `CoinReset (${model.coin_type}): `;
    }
}

class MobSpecialValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            mob:        new Field({field_name:"Mob",        in_flags:null,                  optional:false}),
            special:    new Field({field_name:"Special",    in_flags:flags.MOB_SPECIALS,    optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `MobSpecial (${model.special ? model.special.code : undefined}): `;
    }
}

class QuestLogValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            qbit_start: new Field({field_name:"Qbit start", in_flags:null,                      optional:false}),
            qbit_stop:  new Field({field_name:"Qbit stop",  in_flags:null,                      optional:false}),
            min_qbit:   new Field({field_name:"Min qbit",   in_flags:null,                      optional:false}),
            max_qbit:   new Field({field_name:"Max qbit",   in_flags:null,                      optional:false}),
            event_code: new Field({field_name:"Event type", in_flags:flags.QUEST_EVENT_CODES,   optional:false}),
            qlog_text:  new Field({field_name:"Qlog text",  in_flags:null,                      optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `QuestLog (${model.qlog_text}): `;
    }
}

class ProgramValidator extends ModelValidator {
    constructor(fields) {
        super(Object.assign({
            trigger:    new Field({field_name:"Trigger",    in_flags:null,  optional:false}), // Comes from one of three sets of flags, depending on room/item/mob
            argument:   new Field({field_name:"Argument",   in_flags:null,  optional:true}),
            program:    new Field({field_name:"Program",    in_flags:null,  optional:false}),
        }, fields))
    }
    _error_prefix(model) {
        return `Program (${model.trigger?model.trigger.code:"UNDEFINED"}): `;
    }
}
//export default Loader;

module.exports = {
    StateValidator,
    AreaValidator,
    JusticeSystemValidator,
    RoomValidator,
    ExitValidator,
    ExtraDescriptionValidator,
    ItemApplyValidator,
    ItemValidator,
    MobValidator,
    SimpleMobValidator,
    UniqueMobValidator,
    TrainSkillValidator,
    TrainWeaponSkillValidator,
    TrainSpellValidator,
    TrainLevelValidator,
    TrainStatisticValidator,
    TrainFeatValidator,
    TrainLangValidator,
    ShopValidator,
    RepairRechargeValidator,
    MobResetValidator,
    EquipmentResetValidator,
    ItemResetValidator,
    DoorResetValidator,
    RandomDoorResetValidator,
    RoomResetValidator,
    TrapResetValidator,
    CoinResetValidator,
    MobSpecialValidator,
    QuestLogValidator,
    ProgramValidator,
}