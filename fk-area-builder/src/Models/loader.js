import {
    AreaActions, JusticeSystemActions, RoomActions, ExitActions, 
    ExtraDescriptionActions, ItemApplyActions, ItemActions, MobActions,
    TrainSkillActions, TrainWeaponSkillActions, GlobalActions, TrainLangActions,
    TrainSpellActions, TrainLevelActions, TrainStatisticActions, 
    TrainFeatActions, ShopActions, RepairRechargeActions, MobResetActions,
    EquipmentResetActions, ItemResetActions, DoorResetActions, 
    RandomDoorResetActions, RoomResetActions, TrapResetActions, 
    CoinResetActions, MobSpecialActions, QuestLogActions, ProgramActions
} from './actionTypes'
var flags = require("./flags.js");
var models = require("./model_templates.js");
var uuid = require("uuid/v4");


function get_code(code, flag_list) {
    if (code === undefined) { return; }
    for (let f in flag_list) {
        if (flag_list[f].code === code.trim() || flag_list[f].bits === code.trim()) {
            return flag_list[f]
        }
    }
}

function get_color_code(code, flag_list) {
    if (code === undefined) { return; }
    for (let f in flag_list) {
        if (flag_list[f].color_code === code.trim()) {
            return flag_list[f]
        }
    }
}

function get_codes(codes, flag_list, default_value=null) {
    let to_return = []
    for (let c in codes) {
        for (let f in flag_list) {
            if (flag_list[f].code === codes[c].trim()) {
                to_return.push(flag_list[f])
            }
        }
    }
    if (to_return.length === 0 && default_value !== null) {
        return [default_value];
    }
    return to_return;
}

function create_property_setter(action_group) {
    return (property, value) => {
        return {
            type: action_group.SET_PROP,
            key: property,
            value: value
        }
    }
}

class Loader {
    constructor(are_string) {
        // Accepts a string containing a .are file
        // Validates the file, then loads the contents into a new model
        this.area = are_string.replace(/\r/g, "") // Eliminate stupid characters
    }
    buildStore(dispatch) {
        let actions = [{type:GlobalActions.NEW}]; // Clear the existing area
        actions = actions.concat(
            this.parseAreaHeader(),
            this.parseJusticeSystem(),
            this.parseQuests(),
            this.parseMobiles(),
            this.parseItems(),
            this.parseRooms(),
            this.parseResets(),
            this.parseSpecials(),
            this.parseShops(),
            this.parseRepairs()
        );
        dispatch(actions) // Send all actions at once, instead of each one individually
    }
    
    parseAreaHeader() {
        const setProp = create_property_setter(AreaActions)
        let actions = [];
        
        let area = /^#AREA ({..})?(.*)~$/gm.exec(this.area)
        actions.push(setProp("category", flags.AREA_CATEGORIES.INCOMPLETE));
        
        actions.push(setProp("category", get_color_code(area[1], flags.AREA_CATEGORIES) || flags.AREA_CATEGORIES.INCOMPLETE));
        actions.push(setProp("name", area[2]));
        
        let authors = /^#AUTHOR (.*)~$/gm.exec(this.area)
        actions.push(setProp("authors", authors[1]));
        
        let ranges = /^#RANGES\r?\n([^\s]*) ([^\s]*) ([^\s]*) ([^\s]*)[^]*?\$$/gm.exec(this.area)
        actions.push(setProp("min_recommended_level", ranges[1]));
        actions.push(setProp("max_recommended_level", ranges[2]));
        actions.push(setProp("min_enforced_level", ranges[3]));
        actions.push(setProp("max_enforced_level", ranges[4]));
        
        let reset_msg = /^#RESETMSG (.*)~$/gm.exec(this.area);
        actions.push(setProp("reset_msg", reset_msg[1]));
        
        let area_flags = /^#FLAGS\n([^\s]+) ([^\s]+)$/gm.exec(this.area)
        actions.push(setProp("wilderness_flag", area_flags[1]));
        actions.push(setProp("reset_duration", area_flags[2]));
        
        let economy = /^#ECONOMY ([^\s]+) ([^\s]+)$/gm.exec(this.area)
        actions.push(setProp("economy_min", economy[1]));
        actions.push(setProp("economy_max", economy[2]));
        
        let weather = /^#WEATHER ([^\s]+) ([^\s]+)$/gm.exec(this.area)
        actions.push(setProp("weather_humidity", weather[1]));
        actions.push(setProp("weather_temperature", weather[2]));
        
        let mining =/(?:^#MINING (.*)$)?/gm.exec(this.area)
        actions.push(setProp("mining_material", mining ? mining[1] : null));
        
        let logging =/(?:^#LOGGING (.*)$)?/gm.exec(this.area)
        actions.push(setProp("logging_material", logging ? logging[1] : null));
        
        return actions;
    }
    
    parseJusticeSystem() {
        const setProp = create_property_setter(JusticeSystemActions)
        let actions=[];
        
        let matches = /#JUSTICE\nCourtRoom (.*)\nDungeon (.*)\nJudge (.*)\n(?:Guard (.*)\n)?Crime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\n\$/gm.exec(this.area);
        if (!matches) {
            return;
        }
        
        actions.push(setProp("courtroom", matches[1] || "0"));
        actions.push(setProp("dungeon", matches[2] || "0"));
        actions.push(setProp("judge", matches[3] || "0"));
        actions.push(setProp("guard", matches[4] || "0"));
        actions.push(setProp(matches[5], get_code(matches[6], flags.JUSTICE_PUNISHMENTS)));
        actions.push(setProp(matches[7], get_code(matches[8], flags.JUSTICE_PUNISHMENTS)));
        actions.push(setProp(matches[9], get_code(matches[10], flags.JUSTICE_PUNISHMENTS)));
        actions.push(setProp(matches[11], get_code(matches[12], flags.JUSTICE_PUNISHMENTS)));
        
        return actions;
    }
    
    parseQuests() {
        const setProp = create_property_setter(QuestLogActions)
        let actions = [];
        
        let quests = this.area.match(/^#QUESTS[^]*?(-1|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!quests) {
            return
        }
        let qlog_regex = /^([^\s]{4}) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ({..})?(.*?)$/gm
        let matches;
        while ((matches = qlog_regex.exec(quests[0])) != null) {
            actions.push({type: QuestLogActions.ADD})
            actions.push({type:AreaActions.SET_PROP, key:"vnum", value:matches[1]});
            actions.push(setProp("qbit_start", matches[2]));
            actions.push(setProp("qbit_stop", matches[3]));
            actions.push(setProp("min_qbit", matches[4]));
            actions.push(setProp("max_qbit", matches[5]));
            actions.push(setProp("event_code", get_color_code(matches[6], flags.QUEST_EVENT_CODES)));
            actions.push(setProp("qlog_text", matches[7]));
        }
        return actions;
    }
    
    parseMobiles() {
        const setProp = create_property_setter(MobActions)
        let actions = [];
        
        let mobiles = this.area.match(/^#MOBILES[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!mobiles) {
            return
        }
        let simple_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^~]\n)*.*)~\n(S) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n([^%].*)$\n([^%].*)$\n((?:%.*~\n)*)?(>[^]*?\|)?/gm
        let matches;
        while ((matches = simple_mobile_regex.exec(mobiles[0])) != null) {
            let mob_id = uuid()
            actions.push({type: MobActions.ADD})
            actions.push(setProp("uuid", mob_id));
            actions.push(setProp("vnum", matches[1]));
            actions.push(setProp("keywords", matches[2]));
            actions.push(setProp("sdesc", matches[3]));
            actions.push(setProp("ldesc", matches[4]));
            actions.push(setProp("fulldesc", matches[5]));
            // 6 = [S]imple mob
            actions.push(setProp("unique", false));
            actions.push(setProp("level", matches[7]));
            actions.push(setProp("mob_class", get_code(matches[8], flags.MOB_CLASSES)));
            actions.push(setProp("race", get_code(matches[9], flags.MOB_RACES)));
            actions.push(setProp("sex", get_code(matches[10], flags.MOB_SEXES)));
            actions.push(setProp("position", get_code(matches[11], flags.MOB_POSITIONS)));
            actions.push(setProp("deity", get_code(matches[12], flags.MOB_DEITIES)));
            actions.push(setProp("act_flags", get_codes(matches[13].split("|"), flags.MOB_ACT_FLAGS)));
            actions.push(setProp("understood_languages", get_codes(matches[14].split("|"), flags.LANGUAGE_FLAGS)));
            actions.push(setProp("spoken_languages", get_codes(matches[15].split("|"), flags.LANGUAGE_FLAGS)));
            
            actions = actions.concat(this.parseMobileCanTrains(matches[16], mob_id));
            actions = actions.concat(this.parsePrograms(matches[17], mob_id, flags.MOB_PROGRAM_TRIGGERS));
        }
        
        
        let unique_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^~]\n)*.*)~\n(U) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n(.*)$\n([^\s]+) (.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+).*\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+)\n((?:%.*~\n)+)?(>.*~[^]*?\|)/gm
        while ((matches = unique_mobile_regex.exec(mobiles[0])) != null) {
            let mob_id = uuid()
            actions.push({ type:MobActions.ADD })
            actions.push({ type:MobActions.CONVERT_TO_UNIQUE })
            actions.push(setProp("uuid", mob_id));
            actions.push(setProp("vnum", matches[1]));
            actions.push(setProp("keywords", matches[2]));
            actions.push(setProp("sdesc", matches[3]));
            actions.push(setProp("ldesc", matches[4]));
            actions.push(setProp("fulldesc", matches[5]));
            // 6 = [U]nique mob
            actions.push(setProp("unique", true));
            actions.push(setProp("level", matches[7]));
            actions.push(setProp("mob_class", get_code(matches[8], flags.MOB_CLASSES)));
            actions.push(setProp("race", get_code(matches[9], flags.MOB_RACES)));
            actions.push(setProp("sex", get_code(matches[10], flags.MOB_SEXES)));
            actions.push(setProp("position", get_code(matches[11], flags.MOB_POSITIONS)));
            actions.push(setProp("deity", get_code(matches[12], flags.MOB_DEITIES)));
            actions.push(setProp("act_flags", get_codes(matches[13].split("|"), flags.MOB_ACT_FLAGS)));
            actions.push(setProp("affect_flags", get_codes(matches[14].split("|"), flags.MOB_AFFECTS)));
            actions.push(setProp("virtual_armor_type", get_code(matches[15], flags.ITEM_ARMOR_TYPES)));
            actions.push(setProp("virtual_armor_material", get_code(matches[16], flags.ITEM_MATERIALS)));
            actions.push(setProp("alignment", get_code(matches[17], flags.MOB_ALIGNMENTS)));
            actions.push(setProp("str", matches[18]));
            actions.push(setProp("int", matches[19]));
            actions.push(setProp("wis", matches[20]));
            actions.push(setProp("dex", matches[21]));
            actions.push(setProp("con", matches[22]));
            actions.push(setProp("cha", matches[23]));
            actions.push(setProp("lck", matches[24]));
            actions.push(setProp("understood_languages", get_codes(matches[25].split("|"), flags.LANGUAGE_FLAGS)));
            actions.push(setProp("spoken_languages", get_codes(matches[26].split("|"), flags.LANGUAGE_FLAGS)));
            actions.push(setProp("ris_resistant", get_codes(matches[27].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE)));
            actions.push(setProp("ris_immune", get_codes(matches[28].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE)));
            actions.push(setProp("ris_susceptible", get_codes(matches[29].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE)));

            actions = actions.concat(this.parseMobileCanTrains(matches[30], mob_id));
            actions = actions.concat(this.parsePrograms(matches[31], mob_id, flags.MOB_PROGRAM_TRIGGERS));
        }
        
        return actions;
    }
    
    parsePrograms(programs, pointer, flags) {
        let program_regex = />([^ ]*) (.*)~$\n([^]*?)\n^~$/gm;
        let p;
        let actions = [];
        while ((p = program_regex.exec(programs)) != null) {
            actions.push({ type:ProgramActions.ADD })
            actions.push({ type:ProgramActions.SET_PROP, key:"trigger", value:get_code(p[1], flags) });
            actions.push({ type:ProgramActions.SET_PROP, key:"argument", value:p[2] });
            actions.push({ type:ProgramActions.SET_PROP, key:"program", value:p[3] });
            actions.push({ type:ProgramActions.SET_PROP, key:"pointer", value:pointer });
        }
        return actions;
    }
    
    parseMobileCanTrains(can_train, mob_id) {
        let can_train_regex = /^%([^ ]+) ([^ ]+) ?(.+)?~$/gm;
        let t;
        let actions = []
        while ((t = can_train_regex.exec(can_train)) != null) {
            let train;
            if (!train) {
                if (!t[3]) {
                    actions.push({ type:TrainLevelActions.ADD })
                    actions.push({ type:TrainLevelActions.SET_PROP, key:"level", value:t[1] })
                    actions.push({ type:TrainLevelActions.SET_PROP, key:"price_multiplier", value:t[2] })
                    actions.push({ type:TrainLevelActions.SET_PROP, key:"mob", value:mob_id });
                    break;
                }
            }
            if (!train) {
                for (let f in flags.MOB_SPELLS) {
                    if (flags.MOB_SPELLS[f].code === t[3]) {
                        actions.push({ type:TrainSpellActions.ADD })
                        actions.push({ type:TrainSpellActions.SET_PROP, key:"level", value:t[1] });
                        actions.push({ type:TrainSpellActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        actions.push({ type:TrainSpellActions.SET_PROP, key:"spell", value:flags.MOB_SPELLS[f] });
                        actions.push({ type:TrainSpellActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_SKILLS) {
                    if (flags.MOB_SKILLS[f].code === t[3]) {
                        actions.push({ type:TrainSkillActions.ADD })
                        actions.push({ type:TrainSkillActions.SET_PROP, key:"level", value:t[1] });
                        actions.push({ type:TrainSkillActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        actions.push({ type:TrainSkillActions.SET_PROP, key:"skill", value:flags.MOB_SKILLS[f] });
                        actions.push({ type:TrainSkillActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_WEAPON_SKILLS) {
                    if (flags.MOB_WEAPON_SKILLS[f].code === t[3]) {
                        actions.push({ type:TrainWeaponSkillActions.ADD })
                        actions.push({ type:TrainWeaponSkillActions.SET_PROP, key:"level", value:t[1] });
                        actions.push({ type:TrainWeaponSkillActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        actions.push({ type:TrainWeaponSkillActions.SET_PROP, key:"weapon_skill", value:flags.MOB_WEAPON_SKILLS[f] });
                        actions.push({ type:TrainWeaponSkillActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_FEATS) {
                    if (flags.MOB_FEATS[f].code === t[3]) {
                        actions.push({ type:TrainFeatActions.ADD })
                        actions.push({ type:TrainFeatActions.SET_PROP, key:"level", value:t[1] });
                        actions.push({ type:TrainFeatActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        actions.push({ type:TrainFeatActions.SET_PROP, key:"feat", value:flags.MOB_FEATS[f] });
                        actions.push({ type:TrainFeatActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_LANGUAGES) {
                    if (flags.MOB_LANGUAGES[f].code === t[3]) {
                        actions.push({ type:TrainLangActions.ADD })
                        actions.push({ type:TrainLangActions.SET_PROP, key:"level", value:t[1] });
                        actions.push({ type:TrainLangActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        actions.push({ type:TrainLangActions.SET_PROP, key:"lang", value:flags.MOB_LANGUAGES[f] });
                        actions.push({ type:TrainLangActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_STATISTICS) {
                    if (flags.MOB_STATISTICS[f].code === t[3]) {
                        actions.push({ type:TrainStatisticActions.ADD })
                        actions.push({ type:TrainStatisticActions.SET_PROP, key:"level", value:t[1] });
                        actions.push({ type:TrainStatisticActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        actions.push({ type:TrainStatisticActions.SET_PROP, key:"statistic", value:flags.MOB_STATISTICS[f] });
                        actions.push({ type:TrainStatisticActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
        }
        return actions;
    }
    
    parseItems() {
        const setProp = create_property_setter(ItemActions)
        let actions = []
        let items = this.area.match(/^#OBJECTS[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!items) {
            return []
        }
        let item_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~(.*)\n~\n(.*)\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)(\n(?:E[^]*?^~\n)+)?((?:\nA .*)+)?(?:I\s([^]*?)~$)?(>[^]*?\|)?/gm
        let matches;
        while ((matches = item_regex.exec(items[0])) != null) {
            let item_id = uuid()
            actions.push({ type:ItemActions.ADD })
            actions.push(setProp("uuid", item_id));
            
            actions.push(setProp("vnum", matches[1]));
            actions.push(setProp("keywords", matches[2]));
            actions.push(setProp("sdesc", matches[3]));
            actions.push(setProp("ldesc", matches[4].trim()));
            actions.push(setProp("action_description", matches[5]));
            let item_type = get_code(matches[6], flags.ITEM_TYPES)
            actions.push(setProp("item_type", item_type));
            actions.push(setProp("attributes", get_codes(matches[7].split("|"), flags.ITEM_ATTRIBUTES)));
            actions.push(setProp("wear_flags", get_codes(matches[8].split("|"), flags.WEAR_LOCATIONS)));
            actions.push(setProp("quality", get_code(matches[9], flags.ITEM_QUALITY)));
            actions.push(setProp("material", get_code(matches[10], flags.ITEM_MATERIALS)));
            actions.push(setProp("condition", get_code(matches[11], flags.ITEM_CONDITION)));
            actions.push(setProp("size", get_code(matches[12], flags.ITEM_SIZES)));
            for (let vm of [["value0", 13],["value1", 14],["value2", 15],["value3", 16],["value4", 17]]) {
                let value;
                if (item_type[vm[0]].type==flags.META_VALUE_TYPES.FLAG) {
                    value = get_code(matches[vm[1]], item_type[vm[0]].type_enum)
                }
                else if (item_type[vm[0]].type==flags.META_VALUE_TYPES.MULTI_FLAGS) {
                    value = get_codes(matches[vm[1]], item_type[vm[0]].type_enum)
                }
                else {
                    value = matches[vm[1]]
                }
                actions.push(setProp(vm[0], value))
            }
            actions.push(setProp("value5", matches[18]));
            actions.push(setProp("identify_message", matches[21]))
            
            actions = actions.concat(this.parseExtraDescriptions(matches[19], item_id));
            
            let special_applies = matches[20];
            let sa_regex = /A ([^\s]) (.*)/gm
            let sa_matches;
            while ((sa_matches = sa_regex.exec(special_applies)) != null) {
                actions.push({ type:ItemApplyActions.ADD })
                actions.push({ type:ItemApplyActions.SET_PROP, key:"apply_flag", value:get_code(matches[1], flags.ITEM_APPLIES) });
                actions.push({ type:ItemApplyActions.SET_PROP, key:"parameter", value:sa_matches[2] });
            }
            
            actions = actions.concat(this.parsePrograms(matches[22], item_id, flags.ITEM_PROGRAM_TRIGGERS))
        }
        return actions;
    }
    
    parseExtraDescriptions(extra_descs, pointer) {
        let ed_regex = /E\n(.*)~\n([^]*?)\n^~$/gm
        let ed_matches;
        let actions = [];
        while ((ed_matches = ed_regex.exec(extra_descs)) != null) {
            actions.push({ type:ExtraDescriptionActions.ADD })
            actions.push({ type:ExtraDescriptionActions.SET_PROP, key:"keywords", value:ed_matches[1] });
            actions.push({ type:ExtraDescriptionActions.SET_PROP, key:"ldesc", value:ed_matches[2].trim() });
            actions.push({ type:ExtraDescriptionActions.SET_PROP, key:"pointer", value:pointer });
        }
        return actions;
    }
    
    parseRooms() {
        const setProp = create_property_setter(RoomActions)
        let actions = [];
        let rooms = this.area.match(/^#ROOMS[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!rooms) {
            return []
        }
        let room_regex = /#(.*)$\n(.*)~\n((?:.*[^~]\n)*.*)\n~\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^]*?)?(^E$[^]*?)?(>[^]*?|)^(S$|(?=#))/gm
        let matches;
        while ((matches = room_regex.exec(rooms[0])) != null) {
            let room_id = uuid()
            actions.push({ type:RoomActions.ADD })
            actions.push(setProp("uuid", room_id));
            
            actions.push(setProp("vnum", matches[1]));
            actions.push(setProp("sdesc", matches[2]));
            actions.push(setProp("ldesc", matches[3]));
            actions.push(setProp("defunct", matches[4]));
            actions.push(setProp("room_flags", get_codes(matches[5].split("|"), flags.ROOM_FLAGS)));
            actions.push(setProp("sector", get_code(matches[6], flags.ROOM_SECTOR_FLAGS)));
            actions.push(setProp("teleport_delay", matches[7]));
            actions.push(setProp("teleport_target", matches[8]));
            actions.push(setProp("tunnel", matches[9]));
            
            let exit_regex = /(.*)\n(.*)~\n(.*)~\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
            let exit_matches;
            while ((exit_matches = exit_regex.exec(matches[10])) != null) {
                actions.push({ type:ExitActions.ADD })
                actions.push({ type:ExitActions.SET_PROP, key:"direction", value:get_code(exit_matches[1], flags.EXIT_DIRECTIONS) });
                actions.push({ type:ExitActions.SET_PROP, key:"room", value:room_id });
                actions.push({ type:ExitActions.SET_PROP, key:"comment", value:exit_matches[2] });
                actions.push({ type:ExitActions.SET_PROP, key:"somewhere_door_keyword", value:exit_matches[3] });
                actions.push({ type:ExitActions.SET_PROP, key:"door_flags", value:get_codes(exit_matches[4].split("|"), flags.EXIT_DOOR_FLAGS) });
                actions.push({ type:ExitActions.SET_PROP, key:"door_key", value:exit_matches[5] });
                actions.push({ type:ExitActions.SET_PROP, key:"target_vnum", value:exit_matches[6] });
                actions.push({ type:ExitActions.SET_PROP, key:"exit_size", value:get_code(exit_matches[7], flags.EXIT_SIZES) || flags.EXIT_SIZES.EXIT_SIZE_ANY });
            }
            
            actions = actions.concat(this.parseExtraDescriptions(matches[11], room_id));
            actions = actions.concat(this.parsePrograms(matches[12], room_id, flags.ROOM_PROGRAM_TRIGGERS))
        }
        return actions;
    }
    
    parseResets() {
        let actions = [];
        let resets = this.area.match(/^#RESETS[^]*?^(S|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!resets) {
            return []
        }
        let reset_regex = /^ *([^\s]) +([^\s]+) +([^\s]+) +([^\s]+) *([^\s]*) *;/gm
        let matches;
        
        let last_reset;
        let last_mob_reset;
        let last_item_reset;
        while ((matches = reset_regex.exec(resets[0])) != null) {
            let reset_id = uuid()
            if (matches[1] === "M") {
                actions.push({ type:MobResetActions.ADD })
                actions.push({ type:MobResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:MobResetActions.SET_PROP, key:"defunct", value:matches[2] });
                actions.push({ type:MobResetActions.SET_PROP, key:"mob", value:matches[3] });
                actions.push({ type:MobResetActions.SET_PROP, key:"mob_limit", value:matches[4] });
                actions.push({ type:MobResetActions.SET_PROP, key:"room", value:matches[5] });
                last_reset = reset_id;
                last_mob_reset = last_reset;
            }
            else if (matches[1] === "E") {
                actions.push({ type:EquipmentResetActions.ADD })
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"defunct", value:matches[2] });
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"item", value:matches[3] });
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"equip_limit", value:matches[4] });
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"wear_loc", value:get_code(matches[5], flags.MOB_WEAR_POSITIONS) });
                last_reset = reset_id;
            }
            else if (matches[1] === "G") {
                actions.push({ type:EquipmentResetActions.ADD })
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"mob_reset", value:last_mob_reset });
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"defunct", value:matches[2] });
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"item", value:matches[3] });
                actions.push({ type:EquipmentResetActions.SET_PROP, key:"equip_limit", value:matches[4] });
                last_reset = reset_id;
            }
            else if (matches[1] === "T") {
                actions.push({ type:TrapResetActions.ADD })
                actions.push({ type:TrapResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:TrapResetActions.SET_PROP, key:"reset_interval", value:matches[2] });
                actions.push({ type:TrapResetActions.SET_PROP, key:"trap_type", value:get_code(matches[3], flags.TRAP_TYPES) });
                actions.push({ type:TrapResetActions.SET_PROP, key:"trap_charges", value:matches[4] });
                let triggers = get_codes(matches[5], flags.TRAP_TRIGGERS);
                actions.push({ type:TrapResetActions.SET_PROP, key:"trigger_1", value:triggers[0] || flags.TRAP_TRIGGERS.TRIGGER_NONE });
                actions.push({ type:TrapResetActions.SET_PROP, key:"trigger_2", value:triggers[1] || flags.TRAP_TRIGGERS.TRIGGER_NONE });
                actions.push({ type:TrapResetActions.SET_PROP, key:"pointer", value:last_reset });
                last_reset = reset_id;
            }
            else if (matches[1] === "C") {
                actions.push({ type:CoinResetActions.ADD })
                actions.push({ type:CoinResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:CoinResetActions.SET_PROP, key:"defunct", value:matches[2] });
                actions.push({ type:CoinResetActions.SET_PROP, key:"coin_type", value:get_code(matches[3], flags.COIN_TYPES) });
                actions.push({ type:CoinResetActions.SET_PROP, key:"dice_count", value:matches[4] });
                actions.push({ type:CoinResetActions.SET_PROP, key:"dice_count", value:matches[5] });
                actions.push({ type:CoinResetActions.SET_PROP, key:"mob", value:last_mob_reset });
                last_reset = reset_id;
            }
            else if (matches[1] === "P") {
                actions.push({ type:ItemResetActions.ADD })
                actions.push({ type:ItemResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:ItemResetActions.SET_PROP, key:"hidden", value:(matches[2] === 1) }); // Boolean
                actions.push({ type:ItemResetActions.SET_PROP, key:"item", value:matches[3] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"item_limit", value:matches[4] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"room_container", value:matches[5] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"item_pointer", value:last_item_reset });
                last_reset = reset_id;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "H") {
                actions.push({ type:ItemResetActions.ADD })
                actions.push({ type:ItemResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:ItemResetActions.SET_PROP, key:"hidden", value:true });
                actions.push({ type:ItemResetActions.SET_PROP, key:"item", value:matches[3] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"item_limit", value:matches[4] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"room_container", value:matches[5] });
                last_reset = reset_id;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "U") {
                actions.push({ type:ItemResetActions.ADD })
                actions.push({ type:ItemResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:ItemResetActions.SET_PROP, key:"buried", value:true });
                actions.push({ type:ItemResetActions.SET_PROP, key:"item", value:matches[3] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"item_limit", value:matches[4] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"room_container", value:matches[5] });
                last_reset = reset_id;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "O") {
                actions.push({ type:ItemResetActions.ADD })
                actions.push({ type:ItemResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:ItemResetActions.SET_PROP, key:"item", value:matches[3] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"item_limit", value:matches[4] });
                actions.push({ type:ItemResetActions.SET_PROP, key:"room_container", value:matches[5] });
                last_reset = reset_id;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "D") {
                actions.push({ type:DoorResetActions.ADD })
                actions.push({ type:DoorResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:DoorResetActions.SET_PROP, key:"room", value:matches[3] });
                actions.push({ type:DoorResetActions.SET_PROP, key:"exit", value:get_code(matches[4], flags.DOOR_RESET_DIRECTIONS) });
                actions.push({ type:DoorResetActions.SET_PROP, key:"exit_state", value:get_code(matches[5], flags.DOOR_RESET_FLAGS) });
                last_reset = reset_id;
            }
            else if (matches[1] === "R") {
                actions.push({ type:DoorResetActions.ADD })
                actions.push({ type:DoorResetActions.SET_PROP, key:"uuid", value:reset_id });
                actions.push({ type:DoorResetActions.SET_PROP, key:"room", value:matches[3] });
                actions.push({ type:DoorResetActions.SET_PROP, key:"last_door", value:matches[4] });
                last_reset = reset_id;
            }
        }
        return actions;
    }
    
    parseSpecials() {
        const setProp = create_property_setter(MobSpecialActions)
        let actions = []
        let specials = this.area.match(/^#SPECIALS[^]*?^(S|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!specials) {
            return
        }
        let specials_regex = /^M ([^\s]*) ([^\s]*)/gm
        let matches;
        
        while ((matches = specials_regex.exec(specials[0])) != null) {
            let special_id = uuid()
            actions.push({ type:MobSpecialActions.ADD })
            actions.push(setProp("uuid", special_id));
            actions.push(setProp("mob", matches[1]));
            actions.push(setProp("special", get_code(matches[2], flags.MOB_SPECIALS)));
        }
        
        return actions;
    }
    
    parseShops() {
        const setProp = create_property_setter(ShopActions)
        let actions = []
        let shops = this.area.match(/^#SHOPS[^]*?^(0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!shops) {
            return
        }
        let shops_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = shops_regex.exec(shops[0])) != null) {
            let special_id = uuid()
            actions.push({ type:ShopActions.ADD })
            actions.push(setProp("uuid", special_id));
            actions.push(setProp("shopkeeper", matches[1]));
            actions.push(setProp("will_buy_1", get_code(matches[2], flags.ITEM_TYPES)));
            actions.push(setProp("will_buy_2", get_code(matches[3], flags.ITEM_TYPES)));
            actions.push(setProp("will_buy_3", get_code(matches[4], flags.ITEM_TYPES)));
            actions.push(setProp("will_buy_4", get_code(matches[5], flags.ITEM_TYPES)));
            actions.push(setProp("will_buy_5", get_code(matches[6], flags.ITEM_TYPES)));
            actions.push(setProp("profit_buy", matches[7]));
            actions.push(setProp("profit_sell", matches[8]));
            actions.push(setProp("open_hour", matches[9]));
            actions.push(setProp("close_hour", matches[10]));
        }
        return actions;
    }
    
    parseRepairs() {
        const setProp = create_property_setter(RepairRechargeActions)
        let actions = [];
        let repairs = this.area.match(/^#REPAIRS[^]*?^(0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!repairs) {
            return
        }
        let repairs_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = repairs_regex.exec(repairs[0])) != null) {
            let special_id = uuid()
            actions.push({ type:RepairRechargeActions.ADD })
            actions.push(setProp("uuid", special_id));
            actions.push(setProp("shopkeeper", matches[1]));
            actions.push(setProp("will_repair_1", get_code(matches[2], flags.ITEM_TYPES)));
            actions.push(setProp("will_repair_2", get_code(matches[3], flags.ITEM_TYPES)));
            actions.push(setProp("repair_material", get_code(matches[4], flags.MOB_REPAIR_MATERIAL)));
            actions.push(setProp("profit_modifier", matches[5]));
            actions.push(setProp("repair", get_code(matches[6], flags.MOB_REPAIR_RECHARGE)));
            actions.push(setProp("open_hour", matches[7]));
            actions.push(setProp("close_hour", matches[8]));
        }
        return actions;
    }
}

function populateArea(area, dispatch) {
    if (area) {
        let loader = new Loader(area)
        console.log("Building store...")
        loader.buildStore(dispatch);
    }
}

export default populateArea;