var flags = require("./flags.js");
var models = require("./area_model.js");

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

class Loader {
    constructor(are_string) {
        // Accepts a string containing a .are file
        // Validates the file, then loads the contents into a new model
        this.area = new models.Area();
        
        let fixed_area = are_string.replace(/\r/g, "") // Eliminate stupid characters
        this.parseAreaHeader(fixed_area);
        this.parseQuests(fixed_area);
        this.parseMobiles(fixed_area);
        this.parseItems(fixed_area);
        this.parseRooms(fixed_area);
        this.parseResets(fixed_area);
        this.parseSpecials(fixed_area);
        this.parseShops(fixed_area);
        this.parseRepairs(fixed_area);
        
        // JusticeSystem has to wait until mobs & rooms are loaded to establish links
        this.parseJusticeSystem(fixed_area);
    }
    
    parseAreaHeader(area_text) {
        let area = /^#AREA ({..})?(.*)~$/gm.exec(area_text)
        this.area.category = flags.AREA_CATEGORIES.INCOMPLETE;
        
        this.area.category = get_color_code(area[1], flags.AREA_CATEGORIES) || flags.AREA_CATEGORIES.INCOMPLETE;
        this.area.name = area[2];
        
        let authors = /^#AUTHOR (.*)~$/gm.exec(area_text)
        this.area.authors = authors[1];
        
        let ranges = /^#RANGES\r?\n([^\s]*) ([^\s]*) ([^\s]*) ([^\s]*)[^]*?\$$/gm.exec(area_text)
        this.area.min_recommended_level = ranges[1];
        this.area.max_recommended_level = ranges[2];
        this.area.min_enforced_level = ranges[3];
        this.area.max_enforced_level = ranges[4];
        
        let reset_msg = /^#RESETMSG (.*)~$/gm.exec(area_text);
        this.area.reset_msg = reset_msg[1];
        
        let area_flags = /^#FLAGS\n([^\s]+) ([^\s]+)$/gm.exec(area_text)
        this.area.wilderness_flag = area_flags[1];
        this.area.reset_duration = area_flags[2];
        
        let economy = /^#ECONOMY ([^\s]+) ([^\s]+)$/gm.exec(area_text)
        this.area.economy_min = economy[1];
        this.area.economy_max = economy[2];
        
        let weather = /^#WEATHER ([^\s]+) ([^\s]+)$/gm.exec(area_text)
        this.area.weather_humidity = weather[1];
        this.area.weather_temperature = weather[2];
        
        let mining =/(?:^#MINING (.*)$)?/gm.exec(area_text)
        this.area.mining_material = mining ? mining[1] : null;
        
        let logging =/(?:^#LOGGING (.*)$)?/gm.exec(area_text)
        this.area.logging_material = logging ? logging[1] : null;
    }
    
    parseJusticeSystem(area_text) {
        let matches = /#JUSTICE\nCourtRoom (.*)\nDungeon (.*)\nJudge (.*)\n(?:Guard (.*)\n)?Crime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\nCrime ([^\s]*) ([^\s]*)\n\$/gm.exec(area_text);
        if (!matches) {
            return;
        }
        
        let justice_system = new models.JusticeSystem();
        justice_system.courtroom = matches[1];
        justice_system.dungeon = matches[2];
        justice_system.judge = matches[3];
        justice_system.guard = matches[4];
        justice_system[matches[5]] = get_code(matches[6], flags.JUSTICE_PUNISHMENTS);
        justice_system[matches[7]] = get_code(matches[8], flags.JUSTICE_PUNISHMENTS);
        justice_system[matches[9]] = get_code(matches[10], flags.JUSTICE_PUNISHMENTS);
        justice_system[matches[11]] = get_code(matches[12], flags.JUSTICE_PUNISHMENTS);
        this.area.justice_system = justice_system;
    }
    
    parseQuests(area_text) {
        let quests = area_text.match(/^#QUESTS[^]*?(-1|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!quests) {
            return
        }
        let qlog_regex = /^([^\s]{4}) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ({..})?(.*?)$/gm
        let matches;
        while ((matches = qlog_regex.exec(quests[0])) != null) {
            let quest = new models.QuestLog();
            quest.area = this.area;
            quest.area.vnum = matches[1];
            quest.qbit_start = matches[2];
            quest.qbit_stop = matches[3];
            quest.min_qbit = matches[4];
            quest.max_qbit = matches[5];
            quest.event_code = get_color_code(matches[6], flags.QUEST_EVENT_CODES);
            quest.qlog_text = matches[7];
            this.area.quest_log.push(quest)
        }
    }
    
    parseMobiles(area_text) {
        let mobiles = area_text.match(/^#MOBILES[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!mobiles) {
            return
        }
        let simple_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^~]\n)*.*)~\n(S) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n([^%].*)$\n([^%].*)$\n((?:%.*~\n)*)?(>[^]*?\|)?/gm
        let matches;
        while ((matches = simple_mobile_regex.exec(mobiles[0])) != null) {
            let mob = new models.SimpleMob();
            mob.vnum = matches[1];
            mob.keywords = matches[2];
            mob.sdesc = matches[3];
            mob.ldesc = matches[4];
            mob.fulldesc = matches[5];
            // 6 = [S]imple mob
            mob.unique = false;
            mob.level = matches[7];
            mob.mob_class = get_code(matches[8], flags.MOB_CLASSES);
            mob.race = get_code(matches[9], flags.MOB_RACES);
            mob.sex = get_code(matches[10], flags.MOB_SEXES);
            mob.position = get_code(matches[11], flags.MOB_POSITIONS);
            mob.deity = get_code(matches[12], flags.MOB_DEITIES);
            mob.act_flags = get_codes(matches[13].split("|"), flags.MOB_ACT_FLAGS);
            mob.understood_languages = get_codes(matches[14].split("|"), flags.LANGUAGE_FLAGS);
            mob.spoken_languages = get_codes(matches[15].split("|"), flags.LANGUAGE_FLAGS);
            
            let can_train = matches[16];
            let can_train_regex = /^%([^ ]+) ([^ ]+) ?(.+)?~$/gm;
            let t;
            while ((t = can_train_regex.exec(can_train)) != null) {
                let train;
                if (!train) {
                    if (!t[3]) {
                        train = new models.TrainLevel();
                        train.level = t[1];
                        train.price_multiplier = t[2];
                        mob.can_train_level.push(train);
                        break;
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_SPELLS) {
                        if (flags.MOB_SPELLS[f].code === t[3]) {
                            train = new models.TrainSpell();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.spell = flags.MOB_SPELLS[f];
                            mob.can_train_spell.push(train);
                            break;
                        }
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_SKILLS) {
                        if (flags.MOB_SKILLS[f].code === t[3]) {
                            train = new models.TrainSkill();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.skill = flags.MOB_SKILLS[f];
                            mob.can_train_skill.push(train);
                            break;
                        }
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_WEAPON_SKILLS) {
                        if (flags.MOB_WEAPON_SKILLS[f].code === t[3]) {
                            train = new models.TrainWeaponSkill();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.weapon_skill = flags.MOB_WEAPON_SKILLS[f];
                            mob.can_train_weapon_skill.push(train);
                            break;
                        }
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_FEATS) {
                        if (flags.MOB_FEATS[f].code === t[3]) {
                            train = new models.TrainFeat();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.skill = flags.MOB_FEATS[f];
                            mob.can_train_feat.push(train);
                            break;
                        }
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_STATISTICS) {
                        if (flags.MOB_STATISTICS[f].code === t[3]) {
                            train = new models.TrainStatistic();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.skill = flags.MOB_STATISTICS[f];
                            mob.can_train_statistic.push(train);
                            break;
                        }
                    }
                }
            }
            
            let programs = matches[17];
            let program_regex = />([^ ]*) (.*)~$\n([^]*?)\n^~$/gm;
            let p;
            while ((p = program_regex.exec(programs)) != null) {
                let program = new models.Program();
                program.trigger = get_code(p[1], flags.MOB_PROGRAM_TRIGGERS)
                program.argument = p[2]
                program.program = p[3]
                mob.programs.push(program)
            }
            this.area.mobs.push(mob)
        }
        
        
        let unique_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^~]\n)*.*)~\n(U) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n(.*)$\n([^\s]+) (.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+).*\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+)\n((?:%.*~\n)+)?(>.*~[^]*?\|)/gm
        while ((matches = unique_mobile_regex.exec(mobiles)) != null) {
            let mob = new models.UniqueMob();
            mob.vnum = matches[1];
            mob.keywords = matches[2];
            mob.sdesc = matches[3];
            mob.ldesc = matches[4];
            mob.fulldesc = matches[5];
            // 6 = [U]nique mob
            mob.unique = true;
            mob.level = matches[7];
            mob.mob_class = get_code(matches[8], flags.MOB_CLASSES);
            mob.race = get_code(matches[9], flags.MOB_RACES);
            mob.sex = get_code(matches[10], flags.MOB_SEXES);
            mob.position = get_code(matches[11], flags.MOB_POSITIONS);
            mob.deity = get_code(matches[12], flags.MOB_DEITIES);
            mob.act_flags = get_codes(matches[13].split("|"), flags.MOB_ACT_FLAGS);
            mob.affect_flags = get_codes(matches[14].split("|"), flags.MOB_AFFECTS);
            mob.virtual_armor_type = get_code(matches[15], flags.ITEM_ARMOR_TYPES);
            mob.virtual_armor_material = get_code(matches[16], flags.ITEM_MATERIALS);
            mob.alignment = get_code(matches[17], flags.MOB_ALIGNMENTS);
            mob.str = matches[18];
            mob.int = matches[19];
            mob.wis = matches[20];
            mob.dex = matches[21];
            mob.con = matches[22];
            mob.cha = matches[23];
            mob.lck = matches[24];
            mob.understood_languages = get_codes(matches[25].split("|"), flags.LANGUAGE_FLAGS);
            mob.spoken_languages = get_codes(matches[26].split("|"), flags.LANGUAGE_FLAGS);
            mob.ris_resistant = get_codes(matches[27].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE);
            mob.ris_immune = get_codes(matches[28].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE);
            mob.ris_susceptible = get_codes(matches[29].split("|"), flags.MOB_RIS, flags.MOB_RIS.RIS_NONE);
            
            let can_train = matches[30];
            let can_train_regex = /^%([^ ]+) ([^ ]+)( .+)?~$/gm;
            let t;
            while ((t = can_train_regex.exec(can_train)) != null) {
                let train;
                if (!train) {
                    if (!t[3]) {
                        train = new models.TrainLevel();
                        train.level = t[1];
                        train.price_multiplier = t[2];
                        mob.can_train_level.push(train);
                        break;
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_SPELLS) {
                        if (flags.MOB_SPELLS[f].code === t[3]) {
                            train = new models.TrainSpell();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.spell = flags.MOB_SPELLS[f];
                            mob.can_train_spell.push(train);
                            break;
                        }
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_SKILLS) {
                        if (flags.MOB_SKILLS[f].code === t[3]) {
                            train = new models.TrainSkill();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.skill = flags.MOB_SKILLS[f];
                            mob.can_train_skill.push(train);
                            break;
                        }
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_FEATS) {
                        if (flags.MOB_FEATS[f].code === t[3]) {
                            train = new models.TrainFeat();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.skill = flags.MOB_FEATS[f];
                            mob.can_train_feat.push(train);
                            break;
                        }
                    }
                }
                if (!train) {
                    for (let f in flags.MOB_STATISTICS) {
                        if (flags.MOB_STATISTICS[f].code === t[3]) {
                            train = new models.TrainStatistic();
                            train.level = t[1];
                            train.price_multiplier = t[2];
                            train.skill = flags.MOB_STATISTICS[f];
                            mob.can_train_statistics.push(train);
                            break;
                        }
                    }
                }
            }
            
            let programs = matches[31];
            let program_regex = />([^ ]*) (.*)~$\n([^]*?)\n^~$/gm;
            let p;
            while ((p = program_regex.exec(programs)) != null) {
                let program = new models.Program();
                program.trigger = get_code(p[1], flags.MOB_PROGRAM_TRIGGERS)
                program.argument = p[2]
                program.program = p[3]
                mob.programs.push(program)
            }
            this.area.mobs.push(mob)
        }
    }
    
    parseItems(area_text) {
        let items = area_text.match(/^#OBJECTS[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!items) {
            return
        }
        let item_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~(.*)\n~\n(.*)\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)(\n(?:E[^]*?^~\n)+)?((?:\nA .*)+)?(?:I\s([^]*?)~$)?(>[^]*?\|)?/gm
        let matches;
        while ((matches = item_regex.exec(items[0])) != null) {
            let item = new models.Item();
            
            item.vnum = matches[1];
            item.keywords = matches[2];
            item.sdesc = matches[3];
            item.ldesc = matches[4].trim();
            item.action_description = matches[5];
            item.item_type = get_code(matches[6], flags.ITEM_TYPES);
            item.attributes = get_codes(matches[7].split("|"), flags.ITEM_ATTRIBUTES);
            item.wear_flags = get_codes(matches[8].split("|"), flags.WEAR_LOCATIONS);
            item.quality = get_code(matches[9], flags.ITEM_QUALITY);
            item.material = get_code(matches[10], flags.ITEM_MATERIALS);
            item.condition = get_code(matches[11], flags.ITEM_CONDITION);
            item.size = get_code(matches[12], flags.ITEM_SIZES);
            item.value0 = matches[13];
            item.value1 = matches[14];
            item.value2 = matches[15];
            item.value3 = matches[16];
            item.value4 = matches[17];
            item.value5 = matches[18];
            
            let extra_descs = matches[19];
            let ed_regex = /E\n(.*)~\n([^]*?)\n^~$/gm
            let ed_matches;
            while ((ed_matches = ed_regex.exec(extra_descs)) != null) {
                let ed = new models.ExtraDescription()
                ed.keywords = ed_matches[1];
                ed.ldesc = ed_matches[2].trim();
                item.extra_descriptions.push(ed);
            }
            
            let special_applies = matches[20];
            let sa_regex = /A ([^\s]) (.*)/gm
            let sa_matches;
            while ((sa_matches = sa_regex.exec(special_applies)) != null) {
                let sa = new models.ItemApply()
                sa.apply_flag = get_code(matches[1], flags.ITEM_APPLIES)
                sa.parameter = sa_matches[2];
                item.special_applies.push(sa);
            }
            
            item.identify_message = matches[21]
            
            let programs = matches[22];
            let prog_regex = />([^ ]*) (.*)~$\n([^]*?)\n^~$/gm;
            let prog_matches;
            while ((prog_matches = prog_regex.exec(programs)) != null) {
                let prog = new models.Program()
                prog.trigger = get_code(prog_matches[1], flags.ITEM_PROGRAM_TRIGGERS);
                prog.argument = prog_matches[2];
                prog.program = prog_matches[3];
                item.programs.push(prog);
            }
            
            this.area.items.push(item);
        }
    }
    
    parseRooms(area_text) {
        let rooms = area_text.match(/^#ROOMS[^]*?(#0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)/gm)
        if (!rooms) {
            return
        }
        let room_regex = /#(.*)$\n(.*)~\n((?:.*[^~]\n)*.*)\n~\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^]*?)?(^E$[^]*?)?(>[^]*?|)^(S$|(?=#))/gm
        let matches;
        while ((matches = room_regex.exec(rooms[0])) != null) {
            let room = new models.Room();
            
            room.vnum = matches[1];
            room.sdesc = matches[2];
            room.ldesc = matches[3];
            room.defunct = matches[4];
            room.room_flags = get_codes(matches[5].split("|"), flags.ROOM_FLAGS);
            room.sector = get_code(matches[6], flags.ROOM_SECTOR_FLAGS);
            room.teleport_delay = matches[7];
            room.teleport_target = matches[8];
            room.tunnel = matches[9];
            
            let exit_regex = /(.*)\n(.*)~\n(.*)~\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
            let exit_matches;
            while ((exit_matches = exit_regex.exec(matches[10])) != null) {
                let exit = new models.Exit();
                exit.direction = get_code(exit_matches[1], flags.EXIT_DIRECTIONS);
                exit.comment = exit_matches[2];
                exit.somewhere_door_keyword = exit_matches[3];
                exit.door_flags = get_codes(exit_matches[4].split("|"), flags.EXIT_DOOR_FLAGS);
                exit.door_key = this.get_item(exit_matches[5]);
                exit.target_vnum = this.get_room(exit_matches[6]);
                exit.exit_size = get_code(exit_matches[7], flags.EXIT_SIZES) || flags.EXIT_SIZES.EXIT_SIZE_ANY;
                room.exits.push(exit);
            }
            
            let extra_descs = matches[11];
            let ed_regex = /E\n(.*)~\n([^]*?)\n^~$/gm
            let ed_matches;
            while ((ed_matches = ed_regex.exec(extra_descs)) != null) {
                let ed = new models.ExtraDescription()
                ed.keywords = ed_matches[1];
                ed.ldesc = ed_matches[2];
                room.extra_descriptions.push(ed);
            }
            
            let programs = matches[12];
            let program_regex = />([^ ]*) (.*)~$\n([^]*?)\n^~$/gm;
            let p;
            while ((p = program_regex.exec(programs)) != null) {
                let program = new models.Program();
                program.trigger = get_code(p[1], flags.ROOM_PROGRAM_TRIGGERS);
                program.argument = p[2]
                program.program = p[3]
                room.programs.push(program)
            }
            this.area.rooms.push(room);
        }
    }
    
    parseResets(area_text) {
        let resets = area_text.match(/^#RESETS[^]*?^(S|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!resets) {
            return
        }
        let reset_regex = /^ *([^\s]) +([^\s]+) +([^\s]+) +([^\s]+) *([^\s]*) *;/gm
        let matches;
        
        let last_reset;
        let last_mob_reset;
        let last_item_reset;
        while ((matches = reset_regex.exec(resets[0])) != null) {
            if (matches[1] === "M") {
                let mob_reset = new models.MobReset();
                let mob = this.get_mob(matches[3]);
                mob_reset.defunct = matches[2];
                mob_reset.mob = mob;
                mob_reset.mob_limit = matches[4];
                mob_reset.room = this.get_room(matches[5]);
                mob.mob_resets.push(mob_reset);
                last_reset = mob_reset;
                last_mob_reset = last_reset;
            }
            else if (matches[1] === "E") {
                let equip_reset = new models.EquipmentReset();
                equip_reset.defunct = matches[2];
                equip_reset.item = this.get_item(matches[3]);
                equip_reset.equip_limit = matches[4];
                equip_reset.wear_loc = get_code(matches[5], flags.MOB_WEAR_POSITIONS);
                last_mob_reset.equipment.push(equip_reset);
                last_reset = equip_reset;
            }
            else if (matches[1] === "G") {
                let equip_reset = new models.EquipmentReset();
                equip_reset.defunct = matches[2];
                equip_reset.item = this.get_item(matches[3]);
                equip_reset.equip_limit = matches[4];
                last_mob_reset.equipment.push(equip_reset);
                last_reset = equip_reset;
            }
            else if (matches[1] === "T") {
                let trap_reset = new models.TrapReset();
                trap_reset.reset_interval = matches[2];
                trap_reset.trap_type = get_code(matches[3], flags.TRAP_TYPES);
                trap_reset.trap_charges = matches[4];
                let triggers = get_codes(matches[5], flags.TRAP_TRIGGERS);
                trap_reset.trigger_1 = triggers[0];
                trap_reset.trigger_2 = triggers[1] || flags.TRAP_TRIGGERS.TRIGGER_NONE;
                last_reset.trap_reset = trap_reset;
            }
            else if (matches[1] === "C") {
                let coin_reset = new models.CoinReset();
                coin_reset.defunct = matches[2];
                coin_reset.coin_type = get_code(matches[3], flags.COIN_TYPES);
                coin_reset.dice_count = matches[4];
                coin_reset.dice_count = matches[5];
                last_mob_reset.mob.equipment_resets.push(coin_reset);
            }
            else if (matches[1] === "P") {
                let item_reset = new models.ItemReset();
                item_reset.hidden = (matches[2] === 1); // Boolean
                item_reset.item = this.get_item(matches[3]);
                item_reset.item_limit = matches[4];
                item_reset.room_container = this.get_item(matches[5]);
                last_item_reset.contents.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] === "H") {
                let item_reset = new models.ItemReset();
                item_reset.hidden = true;
                item_reset.item = this.get_item(matches[3]);
                item_reset.item_limit = matches[4];
                item_reset.room_container = this.get_room(matches[5]);
                item_reset.item.resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] === "U") {
                let item_reset = new models.ItemReset();
                item_reset.buried = true;
                item_reset.item = this.get_item(matches[3]);
                item_reset.item_limit = matches[4];
                item_reset.room_container = this.get_room(matches[5]);
                item_reset.item.resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] === "O") {
                let item_reset = new models.ItemReset();
                item_reset.item = this.get_item(matches[3]);
                item_reset.item_limit = matches[4];
                item_reset.room_container = this.get_room(matches[5]);
                item_reset.item.resets.push(item_reset);
                last_reset = item_reset;
                last_item_reset = last_reset;
            }
            else if (matches[1] === "D") {
                let door_reset = new models.DoorReset();
                door_reset.room = this.get_room(matches[3]);
                door_reset.exit = get_code(matches[4], flags.DOOR_RESET_DIRECTIONS);
                door_reset.exit_state = get_code(matches[5], flags.DOOR_RESET_FLAGS);
                door_reset.room.door_resets.push(door_reset);
                last_reset = door_reset;
            }
            else if (matches[1] === "R") {
                let door_reset = new models.RandomDoorReset();
                door_reset.room = this.get_room(matches[3]);
                door_reset.last_door = matches[4];
                door_reset.room.door_resets.push(door_reset);
                last_reset = door_reset;
            }
        }
    }
    
    parseSpecials(area_text) {
        let specials = area_text.match(/^#SPECIALS[^]*?^(S|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!specials) {
            return
        }
        let specials_regex = /^M ([^\s]*) ([^\s]*)/gm
        let matches;
        
        while ((matches = specials_regex.exec(specials[0])) != null) {
            let mob_special = new models.MobSpecial();
            mob_special.mob = this.get_mob(matches[1]);;
            mob_special.special = get_code(matches[2], flags.MOB_SPECIALS);
            this.area.mob_specials.push(mob_special);
        }
    }
    
    parseShops(area_text) {
        let shops = area_text.match(/^#SHOPS[^]*?^(0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!shops) {
            return
        }
        let shops_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = shops_regex.exec(shops[0])) != null) {
            let shop = new models.Shop();
            let mob = this.get_mob(matches[1]);
            if (mob != null) {
                mob.shop = shop;
            }
            shop.shopkeeper = matches[1];
            shop.will_buy_1 = get_code(matches[2], flags.ITEM_TYPES);
            shop.will_buy_2 = get_code(matches[3], flags.ITEM_TYPES);
            shop.will_buy_3 = get_code(matches[4], flags.ITEM_TYPES);
            shop.will_buy_4 = get_code(matches[5], flags.ITEM_TYPES);
            shop.will_buy_5 = get_code(matches[6], flags.ITEM_TYPES);
            shop.profit_buy = matches[7];
            shop.profit_sell = matches[8];
            shop.open_hour = matches[9];
            shop.close_hour = matches[10];
        }
    }
    
    parseRepairs(area_text) {
        let repairs = area_text.match(/^#REPAIRS[^]*?^(0|#PROGRAMS|#QUESTS|#MOBILES|#OBJECTS|#ROOMS|#RESETS|#SHOPS|#REPAIRS|#SPECIALS|#\$)$/gm)
        if (!repairs) {
            return
        }
        let repairs_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = repairs_regex.exec(repairs[0])) != null) {
            let repair = new models.RepairRecharge();
            let mob = this.get_mob(matches[1]);
            repair.shopkeeper = matches[1];
            repair.will_repair_1 = get_code(matches[2], flags.ITEM_TYPES);
            repair.will_repair_2 = get_code(matches[3], flags.ITEM_TYPES);
            repair.repair_material = get_code(matches[4], flags.MOB_REPAIR_MATERIAL);
            repair.profit_modifier = matches[5];
            repair.repair = get_code(matches[6], flags.MOB_REPAIR_RECHARGE);
            repair.open_hour = matches[7];
            repair.close_hour = matches[8];
            mob.repairs = repair;
        }
    }
    
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
    
    toString() {
        return this.area.toString();
    }
}

// DEBUG
function testLoader() {
    return new Loader(`
#AREA Roseportal House~

#AUTHOR Dalvyn~

#JUSTICE
CourtRoom 4081
Dungeon 4085
Judge 4070
Crime CRIME_HIGH_MURDER PUNISHMENT_DEATH
Crime CRIME_LOW_MURDER PUNISHMENT_SEVER
Crime CRIME_ASSAULT PUNISHMENT_JAIL
Crime CRIME_MUGGING PUNISHMENT_RANDOM_ITEM
$

#RANGES
0 65 0 65
$

#RESETMSG {D0}You hear priests chanting prayers of hope for the next morning.~

#FLAGS
0 0

#ECONOMY 0 80000

#WEATHER 5 5

#QUESTS
-1

#MOBILES
#16201
cleric guard~
{70}a cleric guard~
{70}A cleric guard of the temple stands here.~
This tall and strong human wears a steel breastplate decorated
with the symbol of Lathander. It is one of the warrior-priests
who have sworn to defend the temple and its inhabitants.
~
U 45 CLASS_LATHANDER RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
0
ARMOR_TYPE_FULL_PLATE MATERIAL_STEEL
ALIGN_NEUTRAL_GOOD
13 13 13 13 13 13 13
LANG_COMMON
LANG_COMMON
0 0 0
>death_prog 100~
mpjunk all
~
|
#16202
fighter guard~
{70}a figher guard~
{70}A fighter guard of the temple stands here.~
This tall and strong human wears a steel breastplate decorated
with the symbol of Lathander. It is one of the warrior-priests
who have sworn to defend the temple and its inhabitants.
~
U 45 CLASS_FIGHTERS RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
0
ARMOR_TYPE_FULL_PLATE MATERIAL_STEEL
ALIGN_NEUTRAL_GOOD
13 13 13 13 13 13 13
LANG_COMMON
LANG_COMMON
0 0 0
>death_prog 100~
mpjunk all
~
|
#16203
paladin guard~
{70}a paladin guard~
{70}A paladin guard of the temple stands here.~
This tall and strong human wears a steel breastplate decorated
with the symbol of Lathander. It is one of the warrior-priests
who have sworn to defend the temple and its inhabitants.
~
U 45 CLASS_PALADINS RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
0
ARMOR_TYPE_FULL_PLATE MATERIAL_STEEL
ALIGN_LAWFUL_GOOD
13 13 13 13 13 13 13
LANG_COMMON
LANG_COMMON
0 0 0
>death_prog 100~
mpjunk all
~
|
#16204
gardener~
{30}the gardener~
{30}The temple gardener stands here, seeing that nobody walks on the flowers.~
This rather old man wear a simple brown robe. He is wandering the
gardens of the temple, making sure that nobody walks on the flowers
or on the herbs.
~
S 30 CLASS_FIGHTERS RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
LANG_COMMON
LANG_COMMON
%14 1 dig~
>fight_prog 20~
yell Help! I am being attacked by $N on $b in the temple of Lathander!
mpat 4000 yell Help! I am being attacked by $N on $b in the temple of Lathander!
if quest(0,2,self) == 0
  mpecho A guard comes to help $I
  mpmload 16201
  mpforce m16201 mpoload 16239
  mpforce m16201 wield i16239
  mpforce m16201 mpkill $n
  mpmadd self quest 0 2 1
else
  if quest(0,2,self) == 1
    mpecho A guard comes to help $I
    mpmload 16202
    mpforce m16202 mpoload 16235
    mpforce m16202 wield i16235
    mpforce m16202 mpkill $n
    mpmadd self quest 0 2 1
  else
    if quest(0,2,self) == 0
      mpecho A guard comes to help $I
      mpmload 16203
      mpforce m16202 mpoload 16240
      mpforce m16202 wield i16240
      mpforce m16202 mpkill $n
      mpmadd self quest 0 2 1
    endif
  endif
endif
~
>death_prog 100~
mpmset self quest 0 2 0
mplog WITNESS: $n has killed $I on $b in the temple of Lathander (Berdusk).
mpjunk all
~
|
#16208
tailor temple~
{B0}the temple tailor~
{B0}The temple tailor is weaving some clothes here.~
This old human is clad in a wonderfully woven yellow silk robe. He
seems to be very good at his art, managing to weave perfect clothes
very quickly.
~
S 35 CLASS_FIGHTERS RACE_HUMAN SEX_MALE POS_STANDING DEITY_LATHANDER
ACT_SENTINEL|ACT_CITIZEN
LANG_COMMON
LANG_COMMON
%15 1 staves~
>fight_prog 20~
yell Help! I am being attacked by $N on $b in the temple of Lathander!
mpat 4000 yell Help! I am being attacked by $N on $b in the temple of Lathander!
if quest(0,2,self) == 0
  mpecho A guard comes to help $I
  mpmload 16201
  mpforce m16201 mpoload 16239
  mpforce m16201 wield i16239
  mpforce m16201 mpkill $n
  mpmadd self quest 0 2 1
else
  if quest(0,2,self) == 1
    mpecho A guard comes to help $I
    mpmload 16202
    mpforce m16202 mpoload 16235
    mpforce m16202 wield i16235
    mpforce m16202 mpkill $n
    mpmadd self quest 0 2 1
  else
    if quest(0,2,self) == 0
      mpecho A guard comes to help $I
      mpmload 16202
      mpforce m16202 mpoload 16240
      mpforce m16202 wield i16240
      mpforce m16202 mpkill $n
      mpmadd self quest 0 2 1
    endif
  endif
endif
~
>intercept_prog buy~
if deity($n) == Lathander
  mpunintercept
else
  sayto $n I only trade with followers of Lathander.
endif
~
>death_prog 100~
mpmset self quest 0 2 0
mplog WITNESS: $n has killed $I on $b in the temple of Lathander (Berdusk).
mpjunk all
~
|
#0

#OBJECTS
#16200
long yellow robe pink trim~
{B0}a long yellow robe with {D0}pink trim~
{B0}A long yellow robe with {D0}pink trim lies on the ground.~
~
ITEM_TYPE_ARMOR
0
CAN_WEAR_TAKE|CAN_WEAR_BODY
QUALITY_SUPERIOR MATERIAL_SILK COND_PERFECT SIZE_MEDIUM
0 0 LAYER_ARMOR ARMOR_TYPE_CLOTH 0 0
E
robe yellow pink trim lathander long~
This brightly coloured cloth is made of fine quality silk.
~
>give_prog 100~
mplog GIVEAWAY: $n has given i16200 (robe of Lathander) to $t.
~
|
#16201
yellow silk cap pink trim~
{B0}a yellow silk cap with {D0}pink trim~
{B0}A yellow silk cap with {D0}pink trim lies on the ground.~
~
ITEM_TYPE_ARMOR
0
CAN_WEAR_TAKE|CAN_WEAR_HEAD
QUALITY_SUPERIOR MATERIAL_SILK COND_PERFECT SIZE_MEDIUM
0 0 LAYER_ARMOR ARMOR_TYPE_CLOTH 0 0
E
yellow silk cap pink trim~
This brightly coloured cloth is made of fine quality silk.
~
#16235
broadsword sword pink handled steel~
{D0}a pink handled {70}broad sword~
{D0}A pink handled {70}broad sword lies on the ground here.~
~
ITEM_TYPE_WEAPON
0
CAN_WEAR_TAKE|CAN_WEAR_HOLD
QUALITY_HIGH MATERIAL_STEEL COND_PERFECT SIZE_MEDIUM
0 0 0 WEAPON_TYPE_BROAD_SWORD 0 0
E
broadsword sword pink handled steel~
The blade of this weapon is made of steel. Its handle is
covered with pink paint.
~
#16239
flail pink handled steel~
{D0}a pink handled {70}steel flail~
{D0}A pink handled {70}steel flail lies on the ground here.~
~
ITEM_TYPE_WEAPON
0
CAN_WEAR_TAKE|CAN_WEAR_HOLD
QUALITY_HIGH MATERIAL_STEEL COND_PERFECT SIZE_MEDIUM
0 0 0 WEAPON_TYPE_FLAIL 0 0
E
flail pink handled steel~
This weapon is made of steel. Its handle is
covered with pink paint.
~
#16240
morningstar star pink handled steel~
{D0}a pink handled {70}steel morningstar~
{D0}A pink handled {70}steel morningstar lies on the ground here.~
~
ITEM_TYPE_WEAPON
0
CAN_WEAR_TAKE|CAN_WEAR_HOLD
QUALITY_HIGH MATERIAL_STEEL COND_PERFECT SIZE_MEDIUM
0 0 0 WEAPON_TYPE_MORNING_STAR 0 0
E
morningstar star pink handled steel~
This weapon is made of steel. Its handle is
covered with pink paint.
~
#0

#ROOMS
#16201
Stone corridor~
{B0}An arched hallway circles around the small garden in the center
of this temple. Brightly coloured paintings decorate the walls. There
are many circular holes in the ceiling, to allow the rays of the sun
to light this place.
~
0 ROOM_INDOORS SECT_INSIDE 0 0 0
DDIR_EAST
~
~
0 -1 16200 1
DDIR_NORTH
~
~
0 -1 16202 1
DDIR_SOUTH
~
~
0 -1 16214 1
DDIR_WEST
~
~
0 -1 16241 1
E
paintings brightly coloured~
{90}These paintings depict the Morninglord, Lathander.
~
S
#16202
Stone corridor~
{B0}This arched hallway circles around the large garden in the center
of the temple. The floor is made of small white and yellow marble
squares that reflect the light of the sun coming in through the many
circular holes in the ceiling.
~
0 ROOM_INDOORS SECT_INSIDE 0 0 0
DDIR_NORTH
~
~
0 -1 16203 1
DDIR_SOUTH
~
~
0 -1 16201 1
S
#16203
Stone corridor~
{B0}The floor of this arched hallway is made of small yellow and white
marble squares. At dawn, when the rays of the sun comes through the
many circular holes in the ceiling, these marble squares reflect the
light and light the place.
~
0 ROOM_INDOORS SECT_INSIDE 0 0 0
DDIR_SOUTH
~
~
0 -1 16202 1
DDIR_NORTH
~
~
0 -1 16223 1
DDIR_WEST
~
~
0 -1 16204 1
S
#16219
Rose Garden~
{A0}Several roses grow in this part of the gardens. Yellow, pink,
red, and white roses move slightly with each breath of the wind,
emitting a very nice perfume. A gravel path circles around the
patches of flowers, to allow visitors and worshippers to wander
around without walking on the flowers.
~
0 0 SECT_FIELD 0 0 0
DDIR_SOUTH
~
~
0 -1 16242 1
DDIR_EAST
~
~
0 -1 16220 1
S
#16220
Garden~
{A0}In this part of the gardens, the healers of Lathander grow special
herbs that are used to brew healing potions. You can see herbs of
every colours and every sizes here. A gravel path circles around the
patches of herbs, to allow visitors and worshippers to wander
around without walking on the herbs.
~
0 0 SECT_FIELD 0 0 0
DDIR_WEST
~
~
0 -1 16219 1
DDIR_SOUTH
~
~
0 -1 16241 1
S
#16223
Temple Tailor~
{70}This small room is barely decorated. Several clothes hanging
on the wall are displayed for those who would like to buy them.
Most of them have been dyed yellow, pink, or red, the colours of
Lathander.
~
0 ROOM_INDOORS SECT_INSIDE 0 0 0
DDIR_SOUTH
~
~
0 -1 16203 1
S
#16241
Gravel Path~
{70}This small gravel path leads to the main church of Lathander to
the west and to the entrance of the temple to the east. It circles
around several patches of brightly coloured flowers and bushes. The
ground is coverd with several tiny yellow and black stones.
~
0 0 SECT_ROAD 0 0 0
DDIR_EAST
~
~
0 -1 16201 1
DDIR_NORTH
~
~
0 -1 16220 1
DDIR_SOUTH
~
~
0 -1 16222 1
DDIR_WEST
~
~
0 -1 16242 1
S
#0

#RESETS
M 0 16204 1 16219; gardener in gardens
 G 0 8512 50; sells carrot
 G 0 8521 50; sells red apple
 G 0 8030 100; sells shovel
M 0 16208 1 16223; tailor in tailor shop
 G 0 16200 30; sells yellow robe with pink trim
 G 0 16201 30; sells yellow silk cap with pink trim
S

#SHOPS
16204 ITEM_TYPE_NONE ITEM_TYPE_NONE ITEM_TYPE_NONE ITEM_TYPE_NONE
ITEM_TYPE_NONE 120 70 5 22 ; gardener buys nothing
16208 ITEM_TYPE_ARMOR ITEM_TYPE_NONE ITEM_TYPE_NONE ITEM_TYPE_NONE
ITEM_TYPE_NONE 120 70 5 22 ; tailor buys armor
0

#REPAIRS
16208 ITEM_TYPE_ARMOR ITEM_TYPE_CONTAINER SUBSTANCE_LEATHER
100 1 5 22 ; Tailor repairs armours and containers made of silk/leather
0

#SPECIALS
M 16201 spec_guard
S
#$

`);
}

export default testLoader;