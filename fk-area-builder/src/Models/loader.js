import {
    AreaActions, JusticeSystemActions, RoomActions, ExitActions, 
    ExtraDescriptionActions, ItemApplyActions, ItemActions, MobActions,
    TrainSkillActions, TrainWeaponSkillActions, GlobalActions,
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
    for (let f in flag_list) {
        if (flag_list[f].code === code || flag_list[f].bits === code) {
            return flag_list[f]
        }
    }
}

function get_color_code(code, flag_list) {
    for (let f in flag_list) {
        if (flag_list[f].color_code === code) {
            return flag_list[f]
        }
    }
}

function get_codes(codes, flag_list, default_value=null) {
    let to_return = []
    for (let c in codes) {
        for (let f in flag_list) {
            if (flag_list[f].code === codes[c]) {
                to_return.push(flag_list[f])
            }
        }
    }
    if (to_return.length === 0 && default_value !== null) {
        return [default_value];
    }
    return to_return;
}

function create_property_setter(action_group, dispatch) {
    return (property, value) => {
        dispatch({
            type: action_group.SET_PROP,
            key: property,
            value: value
        })
    }
}

class Loader {
    constructor(are_string) {
        // Accepts a string containing a .are file
        // Validates the file, then loads the contents into a new model
        this.area = are_string.replace(/\r/g, "") // Eliminate stupid characters
    }
    buildStore(dispatch) {
        this.parseAreaHeader(dispatch);
        this.parseJusticeSystem(dispatch);
        this.parseQuests(dispatch);
        this.parseMobiles(dispatch);
        this.parseItems(dispatch);
        this.parseRooms(dispatch);
        this.parseResets(dispatch);
        this.parseSpecials(dispatch);
        this.parseShops(dispatch);
        this.parseRepairs(dispatch);
    }
    
    parseAreaHeader(dispatch) {
        const setProp = create_property_setter(AreaActions, dispatch)
        
        let area = /^#AREA ({..})?(.*)~$/gm.exec(this.area)
        setProp("category", flags.AREA_CATEGORIES.INCOMPLETE);
        
        setProp("category", get_color_code(area[1], flags.AREA_CATEGORIES) || flags.AREA_CATEGORIES.INCOMPLETE);
        setProp("name", area[2]);
        
        let authors = /^#AUTHOR (.*)~$/gm.exec(this.area)
        setProp("authors", authors[1]);
        
        let ranges = /^#RANGES\r?\n([^\s]*) ([^\s]*) ([^\s]*) ([^\s]*)[^]*?\$$/gm.exec(this.area)
        setProp("min_recommended_level", ranges[1]);
        setProp("max_recommended_level", ranges[2]);
        setProp("min_enforced_level", ranges[3]);
        setProp("max_enforced_level", ranges[4]);
        
        let reset_msg = /^#RESETMSG (.*)~$/gm.exec(this.area);
        setProp("reset_msg", reset_msg[1]);
        
        let area_flags = /^#FLAGS\n([^\s]+) ([^\s]+)$/gm.exec(this.area)
        setProp("wilderness_flag", area_flags[1]);
        setProp("reset_duration", area_flags[2]);
        
        let economy = /^#ECONOMY ([^\s]+) ([^\s]+)$/gm.exec(this.area)
        setProp("economy_min", economy[1]);
        setProp("economy_max", economy[2]);
        
        let weather = /^#WEATHER ([^\s]+) ([^\s]+)$/gm.exec(this.area)
        setProp("weather_humidity", weather[1]);
        setProp("weather_temperature", weather[2]);
        
        let mining =/(?:^#MINING (.*)$)?/gm.exec(this.area)
        setProp("mining_material", mining ? mining[1] : null);
        
        let logging =/(?:^#LOGGING (.*)$)?/gm.exec(this.area)
        setProp("logging_material", logging ? logging[1] : null);
    }
    
    parseJusticeSystem(dispatch) {
        const setProp = create_property_setter(JusticeSystemActions, dispatch)
        
        let matches = /#JUSTICE\nCourtRoom (.*)\nDungeon (.*)\nJudge (.*)\n(?:Guard (.*)\n)?Crime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\n\$/gm.exec(this.area);
        if (!matches) {
            return;
        }
        
        setProp("courtroom", matches[1] || "0");
        setProp("dungeon", matches[2] || "0");
        setProp("judge", matches[3] || "0");
        setProp("guard", matches[4] || "0");
        setProp(matches[5], get_code(matches[6], flags.JUSTICE_PUNISHMENTS));
        setProp(matches[7], get_code(matches[8], flags.JUSTICE_PUNISHMENTS));
        setProp(matches[9], get_code(matches[10], flags.JUSTICE_PUNISHMENTS));
        setProp(matches[11], get_code(matches[12], flags.JUSTICE_PUNISHMENTS));
    }
    
    parseQuests(dispatch) {
        const setProp = create_property_setter(QuestLogActions, dispatch)
        
        let quests = this.area.match(/^#QUESTS[^]*?(-1|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!quests) {
            return
        }
        let qlog_regex = /^([^\s]{4}) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ({..})?(.*?)$/gm
        let matches;
        while ((matches = qlog_regex.exec(quests[0])) != null) {
            dispatch({type: QuestLogActions.ADD})
            dispatch({type:AreaActions.SET_PROP, key:"vnum", value:matches[1]});
            setProp("qbit_start", matches[2]);
            setProp("qbit_stop", matches[3]);
            setProp("min_qbit", matches[4]);
            setProp("max_qbit", matches[5]);
            setProp("event_code", get_color_code(matches[6], flags.QUEST_EVENT_CODES));
            setProp("qlog_text", matches[7]);
        }
    }
    
    parseMobiles(dispatch) {
        const setProp = create_property_setter(MobActions, dispatch)
        
        let mobiles = this.area.match(/^#MOBILES[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!mobiles) {
            return
        }
        let simple_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^~]\n)*.*)~\n(S) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n([^%].*)$\n([^%].*)$\n((?:%.*~\n)*)?(>[^]*?\|)?/gm
        let matches;
        while ((matches = simple_mobile_regex.exec(mobiles[0])) != null) {
            let mob_id = uuid()
            dispatch({type: MobActions.ADD})
            setProp("uuid", mob_id);
            setProp("vnum", matches[1]);
            setProp("keywords", matches[2]);
            setProp("sdesc", matches[3]);
            setProp("ldesc", matches[4]);
            setProp("fulldesc", matches[5]);
            // 6 = [S]imple mob
            setProp("unique", false);
            setProp("level", matches[7]);
            setProp("mob_class", get_code(matches[8], flags.MOB_CLASSES));
            setProp("race", get_code(matches[9], flags.MOB_RACES));
            setProp("sex", get_code(matches[10], flags.MOB_SEXES));
            setProp("position", get_code(matches[11], flags.MOB_POSITIONS));
            setProp("deity", get_code(matches[12], flags.MOB_DEITIES));
            setProp("act_flags", get_codes(matches[13].split("|"), flags.MOB_ACT_FLAGS));
            setProp("understood_languages", get_codes(matches[14].split("|"), flags.LANGUAGE_FLAGS));
            setProp("spoken_languages", get_codes(matches[15].split("|"), flags.LANGUAGE_FLAGS));
            
            this.parseMobileCanTrains(matches[16], mob_id, dispatch);
            this.parsePrograms(matches[17], mob_id, flags.MOB_PROGRAM_TRIGGERS, dispatch);
        }
        
        
        let unique_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^~]\n)*.*)~\n(U) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n(.*)$\n([^\s]+) (.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+).*\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+)\n((?:%.*~\n)+)?(>.*~[^]*?\|)/gm
        while ((matches = unique_mobile_regex.exec(mobiles[0])) != null) {
            let mob_id = uuid()
            dispatch({ type:MobActions.ADD })
            dispatch({ type:MobActions.CONVERT_TO_UNIQUE })
            setProp("uuid", mob_id);
            setProp("vnum", matches[1]);
            setProp("keywords", matches[2]);
            setProp("sdesc", matches[3]);
            setProp("ldesc", matches[4]);
            setProp("fulldesc", matches[5]);
            // 6 = [U]nique mob
            setProp("unique", true);
            setProp("level", matches[7]);
            setProp("mob_class", get_code(matches[8], flags.MOB_CLASSES));
            setProp("race", get_code(matches[9], flags.MOB_RACES));
            setProp("sex", get_code(matches[10], flags.MOB_SEXES));
            setProp("position", get_code(matches[11], flags.MOB_POSITIONS));
            setProp("deity", get_code(matches[12], flags.MOB_DEITIES));
            setProp("act_flags", get_codes(matches[13].split("|"), flags.MOB_ACT_FLAGS));
            setProp("affect_flags", get_codes(matches[14].split("|"), flags.MOB_AFFECTS));
            setProp("virtual_armor_type", get_code(matches[15], flags.ITEM_ARMOR_TYPES));
            setProp("virtual_armor_material", get_code(matches[16], flags.ITEM_MATERIALS));
            setProp("alignment", get_code(matches[17], flags.MOB_ALIGNMENTS));
            setProp("str", matches[18]);
            setProp("int", matches[19]);
            setProp("wis", matches[20]);
            setProp("dex", matches[21]);
            setProp("con", matches[22]);
            setProp("cha", matches[23]);
            setProp("lck", matches[24]);
            setProp("understood_languages", get_codes(matches[25].split("|"), flags.LANGUAGE_FLAGS));
            setProp("spoken_languages", get_codes(matches[26].split("|"), flags.LANGUAGE_FLAGS));
            setProp("ris_resistant", get_codes(matches[27].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE));
            setProp("ris_immune", get_codes(matches[28].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE));
            setProp("ris_susceptible", get_codes(matches[29].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE));

            this.parseMobileCanTrains(matches[30], mob_id, dispatch);
            this.parsePrograms(matches[31], mob_id, flags.MOB_PROGRAM_TRIGGERS, dispatch);
        }
    }
    
    parsePrograms(programs, pointer, flags, dispatch) {
        let program_regex = />([^ ]*) (.*)~$\n([^]*?)\n^~$/gm;
        let p;
        while ((p = program_regex.exec(programs)) != null) {
            dispatch({ type:ProgramActions.ADD })
            dispatch({ type:ProgramActions.SET_PROP, key:"trigger", value:get_code(p[1], flags) });
            dispatch({ type:ProgramActions.SET_PROP, key:"argument", value:p[2] });
            dispatch({ type:ProgramActions.SET_PROP, key:"program", value:p[3] });
            dispatch({ type:ProgramActions.SET_PROP, key:"pointer", value:pointer });
        }
    }
    
    parseMobileCanTrains(can_train, mob_id, dispatch) {
        let can_train_regex = /^%([^ ]+) ([^ ]+) ?(.+)?~$/gm;
        let t;
        while ((t = can_train_regex.exec(can_train)) != null) {
            let train;
            if (!train) {
                if (!t[3]) {
                    dispatch({ type:TrainLevelActions.ADD })
                    dispatch({ type:TrainLevelActions.SET_PROP, key:"level", value:t[1] })
                    dispatch({ type:TrainLevelActions.SET_PROP, key:"price_multiplier", value:t[2] })
                    dispatch({ type:TrainLevelActions.SET_PROP, key:"mob", value:mob_id });
                    break;
                }
            }
            if (!train) {
                for (let f in flags.MOB_SPELLS) {
                    if (flags.MOB_SPELLS[f].code === t[3]) {
                        dispatch({ type:TrainSpellActions.ADD })
                        dispatch({ type:TrainSpellActions.SET_PROP, key:"level", value:t[1] });
                        dispatch({ type:TrainSpellActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        dispatch({ type:TrainSpellActions.SET_PROP, key:"spell", value:flags.MOB_SPELLS[f] });
                        dispatch({ type:TrainSpellActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_SKILLS) {
                    if (flags.MOB_SKILLS[f].code === t[3]) {
                        dispatch({ type:TrainSkillActions.ADD })
                        dispatch({ type:TrainSkillActions.SET_PROP, key:"level", value:t[1] });
                        dispatch({ type:TrainSkillActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        dispatch({ type:TrainSkillActions.SET_PROP, key:"skill", value:flags.MOB_SKILLS[f] });
                        dispatch({ type:TrainSkillActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_WEAPON_SKILLS) {
                    if (flags.MOB_WEAPON_SKILLS[f].code === t[3]) {
                        dispatch({ type:TrainWeaponSkillActions.ADD })
                        dispatch({ type:TrainWeaponSkillActions.SET_PROP, key:"level", value:t[1] });
                        dispatch({ type:TrainWeaponSkillActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        dispatch({ type:TrainWeaponSkillActions.SET_PROP, key:"weapon_skill", value:flags.MOB_WEAPON_SKILLS[f] });
                        dispatch({ type:TrainWeaponSkillActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_FEATS) {
                    if (flags.MOB_FEATS[f].code === t[3]) {
                        dispatch({ type:TrainFeatActions.ADD })
                        dispatch({ type:TrainFeatActions.SET_PROP, key:"level", value:t[1] });
                        dispatch({ type:TrainFeatActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        dispatch({ type:TrainFeatActions.SET_PROP, key:"feat", value:flags.MOB_FEATS[f] });
                        dispatch({ type:TrainFeatActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
            if (!train) {
                for (let f in flags.MOB_STATISTICS) {
                    if (flags.MOB_STATISTICS[f].code === t[3]) {
                        dispatch({ type:TrainStatisticActions.ADD })
                        dispatch({ type:TrainStatisticActions.SET_PROP, key:"level", value:t[1] });
                        dispatch({ type:TrainStatisticActions.SET_PROP, key:"price_multiplier", value:t[2] });
                        dispatch({ type:TrainStatisticActions.SET_PROP, key:"statistic", value:flags.MOB_STATISTICS[f] });
                        dispatch({ type:TrainStatisticActions.SET_PROP, key:"mob", value:mob_id });
                        break;
                    }
                }
            }
        }
    }
    
    parseItems(dispatch) {
        const setProp = create_property_setter(ItemActions, dispatch)
        let items = this.area.match(/^#OBJECTS[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!items) {
            return
        }
        let item_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~(.*)\n~\n(.*)\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)(\n(?:E[^]*?^~\n)+)?((?:\nA .*)+)?(?:I\s([^]*?)~$)?(>[^]*?\|)?/gm
        let matches;
        while ((matches = item_regex.exec(items[0])) != null) {
            let item_id = uuid()
            dispatch({ type:ItemActions.ADD })
            setProp("uuid", item_id);
            
            setProp("vnum", matches[1]);
            setProp("keywords", matches[2]);
            setProp("sdesc", matches[3]);
            setProp("ldesc", matches[4].trim());
            setProp("action_description", matches[5]);
            setProp("item_type", get_code(matches[6], flags.ITEM_TYPES));
            setProp("attributes", get_codes(matches[7].split("|"), flags.ITEM_ATTRIBUTES));
            setProp("wear_flags", get_codes(matches[8].split("|"), flags.WEAR_LOCATIONS));
            setProp("quality", get_code(matches[9], flags.ITEM_QUALITY));
            setProp("material", get_code(matches[10], flags.ITEM_MATERIALS));
            setProp("condition", get_code(matches[11], flags.ITEM_CONDITION));
            setProp("size", get_code(matches[12], flags.ITEM_SIZES));
            setProp("value0", matches[13]);
            setProp("value1", matches[14]);
            setProp("value2", matches[15]);
            setProp("value3", matches[16]);
            setProp("value4", matches[17]);
            setProp("value5", matches[18]);
            setProp("identify_message", matches[21])
            
            this.parseExtraDescriptions(matches[19], item_id, dispatch);
            
            let special_applies = matches[20];
            let sa_regex = /A ([^\s]) (.*)/gm
            let sa_matches;
            while ((sa_matches = sa_regex.exec(special_applies)) != null) {
                dispatch({ type:ItemApplyActions.ADD })
                dispatch({ type:ItemApplyActions.SET_PROP, key:"apply_flag", value:get_code(matches[1], flags.ITEM_APPLIES) });
                dispatch({ type:ItemApplyActions.SET_PROP, key:"parameter", value:sa_matches[2] });
            }
            
            this.parsePrograms(matches[22], item_id, flags.ITEM_PROGRAM_TRIGGERS, dispatch)
        }
    }
    
    parseExtraDescriptions(extra_descs, pointer, dispatch) {
        let ed_regex = /E\n(.*)~\n([^]*?)\n^~$/gm
        let ed_matches;
        while ((ed_matches = ed_regex.exec(extra_descs)) != null) {
            dispatch({ type:ExtraDescriptionActions.ADD })
            dispatch({ type:ExtraDescriptionActions.SET_PROP, key:"keywords", value:ed_matches[1] });
            dispatch({ type:ExtraDescriptionActions.SET_PROP, key:"ldesc", value:ed_matches[2].trim() });
            dispatch({ type:ExtraDescriptionActions.SET_PROP, key:"pointer", value:pointer });
        }
    }
    
    parseRooms(dispatch) {
        const setProp = create_property_setter(RoomActions, dispatch)
        let rooms = this.area.match(/^#ROOMS[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!rooms) {
            return
        }
        let room_regex = /#(.*)$\n(.*)~\n((?:.*[^~]\n)*.*)\n~\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^]*?)?(^E$[^]*?)?(>[^]*?|)^(S$|(?=#))/gm
        let matches;
        while ((matches = room_regex.exec(rooms[0])) != null) {
            let room_id = uuid()
            dispatch({ type:RoomActions.ADD })
            setProp("uuid", room_id);
            
            setProp("vnum", matches[1]);
            setProp("sdesc", matches[2]);
            setProp("ldesc", matches[3]);
            setProp("defunct", matches[4]);
            setProp("room_flags", get_codes(matches[5].split("|"), flags.ROOM_FLAGS));
            setProp("sector", get_code(matches[6], flags.ROOM_SECTOR_FLAGS));
            setProp("teleport_delay", matches[7]);
            setProp("teleport_target", matches[8]);
            setProp("tunnel", matches[9]);
            
            let exit_regex = /(.*)\n(.*)~\n(.*)~\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
            let exit_matches;
            while ((exit_matches = exit_regex.exec(matches[10])) != null) {
                dispatch({ type:ExitActions.ADD })
                dispatch({ type:ExitActions.SET_PROP, key:"direction", value:get_code(exit_matches[1], flags.EXIT_DIRECTIONS) });
                dispatch({ type:ExitActions.SET_PROP, key:"room", value:room_id });
                dispatch({ type:ExitActions.SET_PROP, key:"comment", value:exit_matches[2] });
                dispatch({ type:ExitActions.SET_PROP, key:"somewhere_door_keyword", value:exit_matches[3] });
                dispatch({ type:ExitActions.SET_PROP, key:"door_flags", value:get_codes(exit_matches[4].split("|"), flags.EXIT_DOOR_FLAGS) });
                dispatch({ type:ExitActions.SET_PROP, key:"door_key", value:exit_matches[5] });
                dispatch({ type:ExitActions.SET_PROP, key:"target_vnum", value:exit_matches[6] });
                dispatch({ type:ExitActions.SET_PROP, key:"exit_size", value:get_code(exit_matches[7], flags.EXIT_SIZES) || flags.EXIT_SIZES.EXIT_SIZE_ANY });
            }
            
            this.parseExtraDescriptions(matches[11], room_id, dispatch);
            this.parsePrograms(matches[12], room_id, flags.ROOM_PROGRAM_TRIGGERS, dispatch)
        }
    }
    
    parseResets(dispatch) {
        let resets = this.area.match(/^#RESETS[^]*?^(S|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!resets) {
            return
        }
        let reset_regex = /^ *([^\s]) +([^\s]+) +([^\s]+) +([^\s]+) *([^\s]*) *;/gm
        let matches;
        
        let last_reset;
        let last_mob_reset;
        let last_item_reset;
        while ((matches = reset_regex.exec(resets[0])) != null) {
            let reset_id = uuid()
            if (matches[1] === "M") {
                dispatch({ type:MobResetActions.ADD })
                dispatch({ type:MobResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:MobResetActions.SET_PROP, key:"defunct", value:matches[2] });
                dispatch({ type:MobResetActions.SET_PROP, key:"mob", value:matches[3] });
                dispatch({ type:MobResetActions.SET_PROP, key:"mob_limit", value:matches[4] });
                dispatch({ type:MobResetActions.SET_PROP, key:"room", value:matches[5] });
                last_reset = reset_id;
                last_mob_reset = last_reset;
            }
            else if (matches[1] === "E") {
                dispatch({ type:EquipmentResetActions.ADD })
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"defunct", value:matches[2] });
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"item", value:matches[3] });
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"equip_limit", value:matches[4] });
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"wear_loc", value:get_code(matches[5], flags.MOB_WEAR_POSITIONS) });
                last_reset = reset_id;
            }
            else if (matches[1] === "G") {
                dispatch({ type:EquipmentResetActions.ADD })
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"defunct", value:matches[2] });
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"item", value:matches[3] });
                dispatch({ type:EquipmentResetActions.SET_PROP, key:"equip_limit", value:matches[4] });
                last_reset = reset_id;
            }
            else if (matches[1] === "T") {
                dispatch({ type:TrapResetActions.ADD })
                dispatch({ type:TrapResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:TrapResetActions.SET_PROP, key:"reset_interval", value:matches[2] });
                dispatch({ type:TrapResetActions.SET_PROP, key:"trap_type", value:get_code(matches[3], flags.TRAP_TYPES) });
                dispatch({ type:TrapResetActions.SET_PROP, key:"trap_charges", value:matches[4] });
                let triggers = get_codes(matches[5], flags.TRAP_TRIGGERS);
                dispatch({ type:TrapResetActions.SET_PROP, key:"trigger_1", value:triggers[0] || flags.TRAP_TRIGGERS.TRIGGER_NONE });
                dispatch({ type:TrapResetActions.SET_PROP, key:"trigger_2", value:triggers[1] || flags.TRAP_TRIGGERS.TRIGGER_NONE });
                dispatch({ type:TrapResetActions.SET_PROP, key:"pointer", value:last_reset });
                last_reset = reset_id;
            }
            else if (matches[1] === "C") {
                dispatch({ type:CoinResetActions.ADD })
                dispatch({ type:CoinResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:CoinResetActions.SET_PROP, key:"defunct", value:matches[2] });
                dispatch({ type:CoinResetActions.SET_PROP, key:"coin_type", value:get_code(matches[3], flags.COIN_TYPES) });
                dispatch({ type:CoinResetActions.SET_PROP, key:"dice_count", value:matches[4] });
                dispatch({ type:CoinResetActions.SET_PROP, key:"dice_count", value:matches[5] });
                dispatch({ type:CoinResetActions.SET_PROP, key:"mob", value:last_mob_reset });
                last_reset = reset_id;
            }
            else if (matches[1] === "P") {
                dispatch({ type:ItemResetActions.ADD })
                dispatch({ type:ItemResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:ItemResetActions.SET_PROP, key:"hidden", value:(matches[2] === 1) }); // Boolean
                dispatch({ type:ItemResetActions.SET_PROP, key:"item", value:matches[3] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"item_limit", value:matches[4] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"room_container", value:matches[5] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"item_pointer", value:last_item_reset });
                last_reset = reset_id;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "H") {
                dispatch({ type:ItemResetActions.ADD })
                dispatch({ type:ItemResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:ItemResetActions.SET_PROP, key:"hidden", value:true });
                dispatch({ type:ItemResetActions.SET_PROP, key:"item", value:matches[3] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"item_limit", value:matches[4] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"room_container", value:matches[5] });
                last_reset = reset_id;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "U") {
                dispatch({ type:ItemResetActions.ADD })
                dispatch({ type:ItemResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:ItemResetActions.SET_PROP, key:"buried", value:true });
                dispatch({ type:ItemResetActions.SET_PROP, key:"item", value:matches[3] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"item_limit", value:matches[4] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"room_container", value:matches[5] });
                last_reset = reset_id;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "O") {
                dispatch({ type:ItemResetActions.ADD })
                dispatch({ type:ItemResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:ItemResetActions.SET_PROP, key:"item", value:matches[3] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"item_limit", value:matches[4] });
                dispatch({ type:ItemResetActions.SET_PROP, key:"room_container", value:matches[5] });
                last_reset = reset_id;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "D") {
                dispatch({ type:DoorResetActions.ADD })
                dispatch({ type:DoorResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:DoorResetActions.SET_PROP, key:"room", value:matches[3] });
                dispatch({ type:DoorResetActions.SET_PROP, key:"exit", value:get_code(matches[4], flags.DOOR_RESET_DIRECTIONS) });
                dispatch({ type:DoorResetActions.SET_PROP, key:"exit_state", value:get_code(matches[5], flags.DOOR_RESET_FLAGS) });
                last_reset = reset_id;
            }
            else if (matches[1] === "R") {
                dispatch({ type:DoorResetActions.ADD })
                dispatch({ type:DoorResetActions.SET_PROP, key:"uuid", value:reset_id });
                dispatch({ type:DoorResetActions.SET_PROP, key:"room", value:matches[3] });
                dispatch({ type:DoorResetActions.SET_PROP, key:"last_door", value:matches[4] });
                last_reset = reset_id;
            }
        }
    }
    
    parseSpecials(dispatch) {
        const setProp = create_property_setter(MobSpecialActions, dispatch)
        let specials = this.area.match(/^#SPECIALS[^]*?^(S|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!specials) {
            return
        }
        let specials_regex = /^M ([^\s]*) ([^\s]*)/gm
        let matches;
        
        while ((matches = specials_regex.exec(specials[0])) != null) {
            let special_id = uuid()
            dispatch({ type:MobSpecialActions.ADD })
            setProp("uuid", special_id);
            setProp("mob", matches[1]);
            setProp("special", get_code(matches[2], flags.MOB_SPECIALS));
        }
    }
    
    parseShops(dispatch) {
        const setProp = create_property_setter(ShopActions, dispatch)
        let shops = this.area.match(/^#SHOPS[^]*?^(0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!shops) {
            return
        }
        let shops_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = shops_regex.exec(shops[0])) != null) {
            let special_id = uuid()
            dispatch({ type:ShopActions.ADD })
            setProp("uuid", special_id);
            setProp("shopkeeper", matches[1]);
            setProp("will_buy_1", get_code(matches[2], flags.ITEM_TYPES));
            setProp("will_buy_2", get_code(matches[3], flags.ITEM_TYPES));
            setProp("will_buy_3", get_code(matches[4], flags.ITEM_TYPES));
            setProp("will_buy_4", get_code(matches[5], flags.ITEM_TYPES));
            setProp("will_buy_5", get_code(matches[6], flags.ITEM_TYPES));
            setProp("profit_buy", matches[7]);
            setProp("profit_sell", matches[8]);
            setProp("open_hour", matches[9]);
            setProp("close_hour", matches[10]);
        }
    }
    
    parseRepairs(dispatch) {
        const setProp = create_property_setter(RepairRechargeActions, dispatch)
        let repairs = this.area.match(/^#REPAIRS[^]*?^(0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!repairs) {
            return
        }
        let repairs_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = repairs_regex.exec(repairs[0])) != null) {
            let special_id = uuid()
            dispatch({ type:RepairRechargeActions.ADD })
            setProp("uuid", special_id);
            setProp("shopkeeper", matches[1]);
            setProp("will_repair_1", get_code(matches[2], flags.ITEM_TYPES));
            setProp("will_repair_2", get_code(matches[3], flags.ITEM_TYPES));
            setProp("repair_material", get_code(matches[4], flags.MOB_REPAIR_MATERIAL));
            setProp("profit_modifier", matches[5]);
            setProp("repair", get_code(matches[6], flags.MOB_REPAIR_RECHARGE));
            setProp("open_hour", matches[7]);
            setProp("close_hour", matches[8]);
        }
    }
    /*
    get_mob(vnum) {
        if (vnum == null) {
            return;
        }
        for (let i = 0; i < this.area.mobs.length; i++) {
            if (this.area.mobs[i].vnum === vnum) {
                return this.area.mobs[i]
            }
        }
        // Not in file; Return empty mob as reference
        let mob = new models.SimpleMob()
        mob.vnum = vnum;
        mob.sdesc = "[MISSING]";
        mob.ldesc = "[MISSING]";
        mob.fulldesc = "[MISSING]";
        mob.keywords = "[MISSING]";
        mob.level = 1;
        mob.mob_class = flags.MOB_CLASSES.CLASS_WARRIOR;
        mob.race = flags.MOB_RACES.RACE_HUMAN;
        mob.sex = flags.MOB_SEXES.SEX_NEUTRAL;
        mob.position = flags.MOB_POSITIONS.POS_STANDING;
        return mob;
    }
    
    get_item(vnum) {
        if (vnum == null) {
            return;
        }
        for (let i = 0; i < this.area.items.length; i++) {
            if (this.area.items[i].vnum === vnum) {
                return this.area.items[i]
            }
        }
        // Not in file; Return empty item as reference
        let item = new models.Item()
        item.vnum = vnum;
        item.sdesc = "[MISSING]";
        item.ldesc = "[MISSING]";
        item.keywords = "[MISSING]";
        item.item_type = flags.ITEM_TYPES.ITEM_TYPE_NONE;
        item.quality = flags.ITEM_QUALITY.QUALITY_AVERAGE;
        item.material = flags.ITEM_MATERIALS.MATERIAL_CLOTH;
        item.condition = flags.ITEM_CONDITION.COND_PERFECT;
        item.size = flags.ITEM_SIZES.SIZE_MEDIUM;
        return item;
    }
    
    get_room(vnum) {
        if (vnum == null) {
            return;
        }
        for (let i = 0; i < this.area.rooms.length; i++) {
            if (this.area.rooms[i].vnum === vnum) {
                return this.area.rooms[i]
            }
        }
        // Not in file; Return empty room as reference
        let room = new models.Room()
        room.vnum = vnum;
        room.sdesc = "[MISSING]";
        room.ldesc = "[MISSING]";
        room.sector = flags.ROOM_SECTOR_FLAGS.SECT_INSIDE;
        return room;
    }
    */
}

function populateArea(area, dispatch) {
    if (area) {
        let loader = new Loader(area)
        loader.buildStore(dispatch);
    }
}

export default populateArea;