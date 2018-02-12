var fs = require("fs");
var flags = require("./flags.js");
var models = require("./are_model.js");

function get_code(code, flag_list) {
    for (let f in flag_list) {
        if (flag_list[f].code == code || flag_list[f].bits == code) {
            return flag_list[f]
        }
    }
}

function get_color_code(code, flag_list) {
    for (let f in flag_list) {
        if (flag_list[f].color_code == code) {
            return flag_list[f]
        }
    }
}

function get_codes(codes, flag_list) {
    let to_return = []
    for (let c in codes) {
        for (let f in flag_list) {
            if (flag_list[f].code == codes[c]) {
                to_return.push(flag_list[f])
            }
        }
    }
    return to_return;
}

class Loader {
    constructor(are_string) {
        // Accepts a string containing a .are file
        // Validates the file, then loads the contents into a new model
        this.area = new models.Area();
        
        this.parseAreaHeader(are_string);
        this.parseQuests(are_string);
        this.parseMobiles(are_string);
        this.parseItems(are_string);
        this.parseRooms(are_string);
        this.parseResets(are_string);
        this.parseSpecials(are_string);
        this.parseShops(are_string);
        this.parseRepairs(are_string);
        
        // JusticeSystem has to wait until mobs & rooms are loaded to establish links
        this.parseJusticeSystem(are_string);
    }
    
    parseAreaHeader(area_text) {
        let area = /^#AREA ({..})?(.*)~$/gm.exec(area_text)
        this.area.category = flags.AREA_CATEGORIES.INCOMPLETE;
        
        this.area.category = get_color_code(area[1], flags.AREA_CATEGORIES) || flags.AREA_CATEGORIES.INCOMPLETE;
        this.area.name = area[2];
        
        let authors = /^#AUTHOR (.*)~$/gm.exec(area_text)
        this.area.authors = authors[1].split(" ");
        
        let ranges = /^#RANGES\n([^\s]*) ([^\s]*) ([^\s]*) ([^\s]*)[^]*?\$$/gm.exec(area_text)
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
        justice_system[matches[5]].punishment = get_code(matches[6], flags.JUSTICE_PUNISHMENTS);
        justice_system[matches[7]].punishment = get_code(matches[8], flags.JUSTICE_PUNISHMENTS);
        justice_system[matches[9]].punishment = get_code(matches[10], flags.JUSTICE_PUNISHMENTS);
        justice_system[matches[11]].punishment = get_code(matches[12], flags.JUSTICE_PUNISHMENTS);
        this.area.justice_system = justice_system;
    }
    
    parseQuests(area_text) {
        let quests = area_text.match(/^#QUESTS[^]*?-1/gm)[0]
        if (!quests) {
            return
        }
        let qlog_regex = /^([^\s]{4}) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ({..})?(.*?)$/gm
        let matches;
        while ((matches = qlog_regex.exec(quests)) != null) {
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
        let mobiles = area_text.match(/^#MOBILES[^]*?#0/gm)[0]
        if (!mobiles) {
            return
        }
        let simple_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^\n~]\n)*.*)~\n(S) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n([^%].*)$\n([^%].*)$\n((?:%.*~\n)*)?(>[^]*?\|)?/gm
        let matches;
        while ((matches = simple_mobile_regex.exec(mobiles)) != null) {
            let mob = new models.SimpleMob();
            mob.vnum = matches[1];
            mob.keywords = matches[2];
            mob.sdesc = matches[3];
            mob.ldesc = matches[4];
            mob.fulldesc = matches[5];
            // 6 = [S]imple mob
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
                        if (flags.MOB_SPELLS[f].code == t[3]) {
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
                        if (flags.MOB_SKILLS[f].code == t[3]) {
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
                        if (flags.MOB_WEAPON_SKILLS[f].code == t[3]) {
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
                        if (flags.MOB_FEATS[f].code == t[3]) {
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
                        if (flags.MOB_STATISTICS[f].code == t[3]) {
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
        
        
        let unique_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^\n~]\n)*.*)~\n(U) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n(.*)$\n([^\s]+) (.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+).*\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+)\n((?:%.*~\n)+)?(>.*~[^]*?\|)/gm
        while ((matches = unique_mobile_regex.exec(mobiles)) != null) {
            let mob = new models.UniqueMob();
            mob.vnum = matches[1];
            mob.keywords = matches[2];
            mob.sdesc = matches[3];
            mob.ldesc = matches[4];
            mob.fulldesc = matches[5];
            // 6 = [U]nique mob
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
            mob.ris_resistant = get_codes(matches[27].split("|"), flags.MOB_RIS) || flags.MOB_RIS.RIS_NONE;
            mob.ris_immune = get_codes(matches[28].split("|"), flags.MOB_RIS) || flags.MOB_RIS.RIS_NONE;
            mob.ris_susceptible = get_codes(matches[29].split("|"), flags.MOB_RIS) || flags.MOB_RIS.RIS_NONE;
            
            let can_train = matches[30];
            let can_train_regex = /^%([^ ]+) ([^ ]+)( .+)?~$/gm;
            let t;
            while ((t = can_train_regex.exec(can_train)) != null) {
                let train;
                console.log(can_train);
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
                        if (flags.MOB_SPELLS[f].code == t[3]) {
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
                        if (flags.MOB_SKILLS[f].code == t[3]) {
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
                        if (flags.MOB_FEATS[f].code == t[3]) {
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
                        if (flags.MOB_STATISTICS[f].code == t[3]) {
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
        let items = area_text.match(/^#OBJECTS[^]*?#0/gm)[0]
        if (!items) {
            return
        }
        let item_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^\n~]\n)*.*)~\n(.*)\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)(\n(?:E[^]*?^~\n)+)?((?:\nA .*)+)?(?:I\s([^]*?)~$)?(>[^]*?\|)?/gm
        let matches;
        while ((matches = item_regex.exec(items)) != null) {
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
            let ed_regex = /E\n(.*)~\n([^]*?)^~$/gm
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
        let rooms = area_text.match(/^#ROOMS[^]*?#0/gm)[0]
        if (!rooms) {
            return
        }
        let room_regex = /#(.*)$\n(.*)~\n((?:.*[^\n~]\n)*.*)~\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^]*?)?(^E$[^]*?)?(>[^]*?|)^S$/gm
        let matches;
        while ((matches = room_regex.exec(rooms)) != null) {
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
                exit.door_key = exit_matches[5];
                exit.target_vnum = exit_matches[6];
                exit.exit_size = get_code(exit_matches[7], flags.EXIT_SIZES) || flags.EXIT_SIZES.EXIT_SIZE_ANY;
                room.exits.push(exit);
            }
            
            let extra_descs = matches[11];
            let ed_regex = /E\n(.*)~\n([^]*?)^~$/gm
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
        let resets = area_text.match(/^#RESETS[^]*?^S$/gm)[0]
        if (!resets) {
            return
        }
        let reset_regex = /^ *([^\s]) +([^\s]+) +([^\s]+) +([^\s]+) *([^\s]*) *;/gm
        let matches;
        
        let last_reset;
        let last_mob_reset;
        while ((matches = reset_regex.exec(resets)) != null) {
            if (matches[1] == "M") {
                let mob_reset = new models.MobReset();
                mob_reset.defunct = matches[2];
                mob_reset.mob = matches[3];
                mob_reset.mob_limit = matches[4];
                mob_reset.room = matches[5];
                
                if (mob_reset.mob && mob_reset.room) {
                    this.area.mob_resets.push(mob_reset);
                    last_reset = mob_reset;
                    last_mob_reset = last_reset;
                }
            }
            else if (matches[1] == "E") {
                let equip_reset = new models.EquipmentReset();
                equip_reset.defunct = matches[2];
                equip_reset.item = matches[3];
                equip_reset.equip_limit = matches[4];
                equip_reset.wear_loc = get_code(matches[5], flags.MOB_WEAR_POSITIONS);
                last_mob_reset.mob.equipment_resets.push(equip_reset);
                last_reset = equip_reset;
            }
            else if (matches[1] == "G") {
                let equip_reset = new models.EquipmentReset();
                equip_reset.defunct = matches[2];
                equip_reset.item = matches[3];
                equip_reset.equip_limit = matches[4];
                last_mob_reset.mob.equipment_resets.push(equip_reset);
                last_reset = equip_reset;
            }
            else if (matches[1] == "T") {
                let trap_reset = new models.TrapReset();
                trap_reset.reset_interval = matches[2];
                trap_reset.trap_type = get_code(matches[3], flags.TRAP_TYPES);
                trap_reset.trap_charges = matches[4];
                let triggers = get_codes(matches[5], flags.TRAP_TRIGGERS);
                trap_reset.trigger_1 = triggers[0];
                trap_reset.trigger_2 = triggers[1] || flags.TRAP_TRIGGERS.TRIGGER_NONE;
                last_reset.trap_reset = trap_reset;
            }
            else if (matches[1] == "C") {
                let coin_reset = new models.CoinReset();
                coin_reset.defunct = matches[2];
                coin_reset.coin_type = get_code(matches[3], flags.COIN_TYPES);
                coin_reset.dice_count = matches[4];
                coin_reset.dice_count = matches[5];
                last_mob_reset.mob.equipment_resets.push(coin_reset);
            }
            else if (matches[1] == "P") {
                let item_reset = new models.ItemReset();
                item_reset.hidden = (matches[2] == 1); // Boolean
                item_reset.item = matches[3];
                item_reset.item_limit = matches[4];
                item_reset.room_container = matches[5];
                this.area.equipment_resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] == "H") {
                let item_reset = new models.ItemReset();
                item_reset.hidden = true;
                item_reset.item = matches[3];
                item_reset.item_limit = matches[4];
                item_reset.room_container = matches[5];
                this.area.equipment_resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] == "U") {
                let item_reset = new models.ItemReset();
                item_reset.buried = true;
                item_reset.item = matches[3];
                item_reset.item_limit = matches[4];
                item_reset.room_container = matches[5];
                this.area.equipment_resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] == "O") {
                let item_reset = new models.ItemReset();
                item_reset.item = matches[3];
                item_reset.item_limit = matches[4];
                item_reset.room_container = matches[5];
                this.area.equipment_resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] == "D") {
                let door_reset = new models.DoorReset();
                door_reset.room = matches[3];
                door_reset.exit = get_code(matches[4], flags.DOOR_RESET_DIRECTIONS);
                door_reset.exit_state = get_code(matches[5], flags.DOOR_RESET_FLAGS);
                this.area.door_resets.push(door_reset);
                last_reset = door_reset;
            }
            else if (matches[1] == "R") {
                let door_reset = new models.RandomDoorReset();
                door_reset.room = matches[3];
                door_reset.last_door = matches[4];
                this.area.door_resets.push(door_reset);
                last_reset = door_reset;
            }
        }
    }
    
    parseSpecials(area_text) {
        let specials = area_text.match(/^#SPECIALS[^]*?^S$/gm)[0]
        if (!specials) {
            return
        }
        let specials_regex = /^M ([^\s]*) ([^\s]*)/gm
        let matches;
        
        while ((matches = specials_regex.exec(specials)) != null) {
            let mob_special = new models.MobSpecial();
            mob_special.mob = this.get_mob(matches[1]);;
            mob_special.special = get_code(matches[2], flags.MOB_SPECIALS);
            this.area.mob_specials.push(mob_special);
        }
    }
    
    parseShops(area_text) {
        let shops = area_text.match(/^#SHOPS[^]*?^0$/gm)[0]
        if (!shops) {
            return
        }
        let shops_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = shops_regex.exec(shops)) != null) {
            let shop = new models.Shop();
            let mob = this.get_mob(matches[1]);
            if (mob == null) {
                mob = new models.SimpleMob();
                mob.vnum = matches[1];
                mob.sdesc = "[MISSING]";
            }
            shop.shopkeeper = this.get_mob(matches[1]);
            shop.will_buy_1 = get_code(matches[2], flags.ITEM_TYPES);
            shop.will_buy_2 = get_code(matches[3], flags.ITEM_TYPES);
            shop.will_buy_3 = get_code(matches[4], flags.ITEM_TYPES);
            shop.will_buy_4 = get_code(matches[5], flags.ITEM_TYPES);
            shop.will_buy_5 = get_code(matches[6], flags.ITEM_TYPES);
            shop.profit_buy = matches[7];
            shop.profit_sell = matches[8];
            shop.open_hour = matches[9];
            shop.close_hour = matches[10];
            this.area.shops.push(shop);
        }
    }
    
    parseRepairs(area_text) {
        let repairs = area_text.match(/^#REPAIRS[^]*?^0$/gm)[0]
        if (!repairs) {
            return
        }
        let repairs_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = repairs_regex.exec(repairs)) != null) {
            let repair = new models.RepairRecharge();
            repair.shopkeeper = this.get_mob(matches[1]);
            repair.will_repair_1 = get_code(matches[2], flags.ITEM_TYPES);
            repair.will_repair_2 = get_code(matches[3], flags.ITEM_TYPES);
            repair.repair_material = get_code(matches[4], flags.MOB_REPAIR_MATERIAL);
            repair.profit_modifier = matches[5];
            repair.repair = get_code(matches[6], flags.MOB_REPAIR_RECHARGE);
            repair.open_hour = matches[7];
            repair.close_hour = matches[8];
            this.area.repairs.push(repair);
        }
    }
    
    get_mob(vnum) {
        if (vnum == null) {
            return;
        }
        for (let i = 0; i < this.area.mobs.length; i++) {
            if (this.area.mobs[i].vnum == vnum) {
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
            if (this.area.items[i].vnum == vnum) {
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
            if (this.area.rooms[i].vnum == vnum) {
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
                                                                     
                                                                     
                                             
#AREA {40}Sample Area~



#AUTHOR Bobthebuilder~

#JUSTICE
CourtRoom 0
Dungeon 0
Judge 0
Guard 0
Crime CRIME_HIGH_MURDER PUNISHMENT_NOT_ENFORCED
Crime CRIME_LOW_MURDER PUNISHMENT_NOT_ENFORCED
Crime CRIME_ASSAULT PUNISHMENT_NOT_ENFORCED
Crime CRIME_MUGGING PUNISHMENT_NOT_ENFORCED
$

#RANGES
0 65 0 65
$

#RESETMSG {80}You hear the reset echo of builders looking at samples!~

#FLAGS
0 15

#PROGRAMS
#END

#ECONOMY 0 0

#WEATHER 5 5

#QUESTS
QQ00 0 1 1 1 {F0}This is a QBIT with one switch: on, 1, and off,0.
QQ00 1 2 1 1 {E0}This is a QBIT with four stages: 0, 1, 2, and 3.
QQ00 1 2 2 2 {E0}The steps should be this color blue.
QQ00 1 2 3 3 {A0}The end should be colored green. You completed the quest.
QQ00 3 2 1 1 {E0}Ranges of bits always begin at the sum of the first two numbers
QQ00 3 2 1 3 {E0}This bit will appear during the entire range of these bits.
QQ00 3 2 2 2 {E0}of the range before them. So in this case 1 + 2 = 3. Just like
QQ00 3 2 3 3 {A0}how 0 + 1 = 1 to begin the second range at 1.
QQ00 5 3 1 1 {E0}Will you learn about programs from Bob?
QQ00 5 3 2 6 {E0}You are learning about programs from Bob and Steve.
QQ00 5 3 2 2 {E0}Speech programs are handy!
QQ00 5 3 3 3 {E0}Intercept programs are handy, but you need to be careful.
QQ00 5 3 4 4 {E0}Speech programs with P look for exact phrases.
QQ00 5 3 5 5 {E0}Bob taught you about give progams.
QQ00 5 3 5 5 {E0}Bob told you to talk to Steve next.
QQ00 5 3 6 6 {E0}Steve told you about basic program structure.
QQ00 5 3 7 7 {A0}Steve told you about some ways to show mobile actions.
QQ00 5 3 7 7 {A0}Steve finished up the brief lesson. Look at the Builder Lessons.
-1

#MOBILES
#QQ00
human man male bob simple~
{90}Bob~
{90}Bob the simple mobile stands here.~
{80}1234567890123456789012345678901234567890123456789012345678901234567890
Bob looks awfully simple. Here is where you can describe how simple he
looks. You should keep the lines of that description within 70 invidu-
al characters so that all clients can see them correctly.  They do not
have to be justified on both sides, but I think that looks nice.
(Color codes do not count against the seventy characters.)~
S 15 CLASS_WARRIOR RACE_HUMAN SEX_MALE POS_STANDING DEITY_NONE
ACT_SENTINEL|ACT_CITIZEN
LANG_COMMON
LANG_COMMON
>greet_prog 100~
if questr(QQ00, 5, 3, $n) == 0
  sayto $n Let me tell you a little bit about different kinds of programs.
  sayto $n This is a greet program that triggers when you walk into the room
  sayto $n with me. It triggers based on the percent above. This one triggers
  sayto $n 100% of the time.
  sayto $n Do you want to learn about programs?
  mpmset $n questr QQ00 5 3 1
endif
~
>speech_prog yes yea ay aye~
if questr(QQ00, 5, 3, $n) == 1
  mpmset $n questr QQ00 5 3 2
  sayto $n Great. I just set a QBIT on you and made two entries appear in your QLOG.
  smote points up to the QUESTS section above.
  pause 1
  sayto $n One tells you that I am teaching you, it will stick throughout the lesson,
  sayto $n and the other tells you that right now I am talking about speech programs.
  pause 1
  sayto $n Speech programs trigger when someone says a word or words. They are very handy.
  sayto $n Read the lesson about them for more info. This is a great opportunity for you to
  sayto $n Breathe life into your mobiles.
  sayto $n Now sit down.
endif
~
>intercept_prog sit~
if questr(QQ00, 5, 3, $n) == 2
  mpmset $n questr QQ00 5 3 3
  mpunintercept
  sayto $n Great! These programs trigger when someone uses a specific command.
  sayto $n It can be a real one or one that you made up.
  sayto $n Remember to add the MPUNINTERCEPT command so that it does not stop
  sayto $n them completely (unless you want it to), otherwise they will not be
  sayto $n able to successfully execute the command.
  pause 1 Now repeat after me: I like bunny rabbits
else
  mpunintercept
endif
~
>speech_prog p I like bunny rabbits~
if questr(QQ00, 5, 3, $n) == 3
  mpmset $n questr QQ00 5 3 4
  sayto $n This kind of speech prog (with a P added in) looks for
  sayto $n a specific arrangement of words instead of just the words
  sayto $n themselves.
  mpoload QQ00
  mpgive iQQ00 $n
  sayto $n Now give that back to me.
endif
~
>give_prog iQQ00~
if questr(QQ00, 5, 3, $n) == 4
  mpmset $n questr QQ00 5 3 5
  mpjunk iQQ00
  sayto $n See that? I gave you an object and then you gave it back to me, triggering
  sayto $n a GIVE_PROG. I created the object with the mpoload command, gave it to you
  sayto $n with MPGIVE and then destroyed it with MPJUNK. (You can MPOLOAD with just the
  sayto $n item's VNUM, but the best keyword to use with the item after that is the
  sayto $n letter i + the VNUM, so iVNUM or iQQ00.) 
  pause 1
  sayto $n This is the basic lesson on useful programs. Go see unique mobile Steve for more info.
endif
~
|
#QQ01
human man male Steve unique~
{D0}Steve~
{D0}Steve the unique mobile stands here.~
{D0}1234567890123456789012345678901234567890123456789012345678901234567890
Steve is a unique mobile. He is different from Bob because you can set
his specific skills and he will not load anything that you do not tell
him to load (whereas Steve will start with a low amount of cash, Steve
will have nothing in his inventory).~
U 15 CLASS_WARRIOR RACE_HUMAN SEX_MALE POS_STANDING DEITY_NONE
ACT_SENTINEL|ACT_CITIZEN|ACT_NOSHOVE
AFF_NONE
ARMOR_TYPE_LEATHER MATERIAL_LEATHER
ALIGN_TRUE_NEUTRAL
16 13 13 16 18 13 13 
LANG_COMMON
LANG_COMMON
RIS_NONE RIS_NONE RIS_NONE
>greet_prog 100~
if questr(QQ00, 5, 3, $n) == 5
  mpmset $n questr QQ00 5 3 6
  sayto $n Hi there. Bob must have sent you.
  sayto $n Let's talk about components of a program.
  sayto $n Every program has a title, then any if checks, the the results.
  sayto $n IFs must have an ENDIF.
  sayto $n Some IFs also have an ELSE in between. See this one and then sit down.
else
  sayto $n Go see Bob first!
endif
~
>intercept_prog rest~
if questr(QQ00, 5, 3, $n) == 6
  mpmset $n questr QQ00 5 3 7
  sayto $n You have a whole bunch of echo commands available to show what I am doing, but
  sayto $n but sometimes it is easier to just use smote. See below.
  smote waves at @$N.
  sayto $n Smote uses @ before its targets. So when I do @$N it means that you will see 'you' and everyone else will see your name
  sayto $n (if they have greeted you) or your adjective (if they have not).
  mpechoat $n $I waves at you.
  sayto $n Here, with mpechoat, you just see that ($I means my full short description - so Steve in this case).
  mpechoaround $n $I waves at @N.
  sayto $n With mpechoaround it shows to everyone else in the room, so I used @N to just show them your adjective if you are not greeted.
  sayto $n mpechoat and mpechoaround should be paired up to make sense.
  pause 1
  sayto $n Here is one for use when you want to show the same thing to everyone.
  mpecho {F0}A bright light shines around the room!
  sayto $n And that pause thing that I keep doing makes the program pause for as many seconds as I tell it to.
  pause 1
  sayto $n That's one second.
  pause 10
  sayto $n That's ten seconds.
  wave $n
  sayto $n Go read the lessons!
endif
~
|
#QQ02
horse female mare~
{30}a mare~
{30}A mare is here.~
{30}I am an example horse with a random prog to make me poop.~
S 12 CLASS_MONSTER RACE_HORSE SEX_FEMALE POS_STANDING DEITY_NONE
ACT_SENTINEL|ACT_MOUNTABLE
LANG_ANIMAL
LANG_ANIMAL
>rand_prog 1~
if sector($i) == 1
  if rand(20)
    mpecho $I cocks her tail and poops!
    mpoload 8580
    mpquiet on
    drop i8580
    mpquiet off
  endif
endif
~
|
#QQ03
human man male igor hunchback~
{90}Igor~
{90}Igor the hunchback "stands" here.~
{80}
1234567890123456789012345678901234567890123456789012345678901234567890
Igor is just here to tell you some more things about programs. None of
his dialog is run by a quest.~
S 15 CLASS_WARRIOR RACE_HUMAN SEX_MALE POS_STANDING DEITY_NONE
ACT_SENTINEL|ACT_CITIZEN
LANG_COMMON
LANG_COMMON
>greet_prog 100~
if race($n) != orc
  smote looks up at @$N and waves.
  sayto $n Glad that you are not an orc. I don't talk to them.
  smote nudges @mQQ01
  sayto mQQ01 Right, Steve?
  mpforce mQQ01 nod
  pause 1
  sayto $n I will tell you something about programs and show you how to use random functions.
  pause 1
  sayto $n Which do you want to hear about?
else
  smote furiously rings in invisible bell.
  yell Orc! Orc!
endif
~
>speech_prog programs something~
if race($n) != orc
  smote claps his big hands together.
  sayto $n Still glad that you are not an orc.
  pause 1
  sayto $n The math for calculating QBITs confuses many people so here is an easy list.
  sayto $n If second number is '1', then the the highest value is 1
  sayto $n If second number is '2', then the the highest value is 3
  sayto $n If second number is '3', then the the highest value is 7
  sayto $n If second number is '4', then the the highest value is 15
  sayto $n If second number is '5', then the the highest value is 31
  sayto $n If second number is '6', then the the highest value is 63
  smote gives @$N some time to digest the information.
  pause 5
  sayto $n Okay. Watch this now. I will check if you asked me something already
  sayto $n and respond accordingly.
  if questr(QQ00, 0, 1, $i) == 0
    mpmset $n questr QQ00 0 1 1
    sayto $n Okay. Remember to ask me about random functions.
  else
    if questr(QQ00, 0, 1, $i) == 1
      wave
      sayto $n Thanks for asking me about programs and random programs!
    endif
  endif
else
  sayto $n Nasty orc.
endif
~
>speech_prog random rand functions~
if race($n) != orc
  smote smiles stupidly.
  sayto $n Random programs are simple to use, but remember that your target in a random
  sayto $n program is $r, not $n.
  pause 2
  sayto $n There is also an if check for random results. It goes if rand(%). So it would
  sayto $n look like if rand(50) for fifty percent.
  pause 1
  sayto $n If you use if rand then remember that subsequent rand checks are checking against
  sayto $n the remaining percent, not the total.
  sayto $n So to have three results with equal chances then you would check first for 33 percent
  sayto $n and then for 50 percent (50% of the remaining 66%, ergo 33%).
  pause 1
  sayto $n You can wait a minute to see a random program work or you can try to sleep to see how
  sayto $n if rand checks work.
  sayto $n Okay. Watch this now. I will check if you asked me something already
  sayto $n and respond accordingly.
  if questr(QQ00, 0, 1, $i) == 0
    mpmset $n questr QQ00 0 1 1
    sayto $n Okay. Remember to ask me about programs.
  else
    if questr(QQ00, 0, 1, $i) == 1
      wave
      sayto $n Thanks for asking me about programs and random programs!
    endif
  endif
else
  sayto $n Nasty orc.
endif
~
>rand_prog 10~
yell There is a ten percent chance each round that I will yell like this and point at someone!
point $r
~
>intercept_prog sleep~
yell If you try to sleep then there are all kinds of things that I do!
pause 1
sayto $n There are three sets of results with even chances that each, within them, have results
sayto $n also with even chances.
if rand(33)
  say First of three results with even chances of occuring.
  if rand(50)
    say First of two results with even chances of occuring.
  else
    say Second of two results with even chances of occuring.
  endif
else
  if rand(50)
    say Second of three results with even chances of occuring.
    if rand(25)
      say First of four results with even chances of occuring.
    else
      if rand(33)
        say Second of four results with even chances of occuring.
      else
        if rand(50)
          say Third of four results with even chances of occuring.
        else
          say Fourth of four results with even chances of occuring.
        endif
      endif
    endif
  else
    say Third of three results with even chances of occuring.
    if rand(20)
      say First of five results with even chances of occuring.
    else
      if rand(25)
        say Second of five results with even chances of occuring.
      else
        if rand(33)
          say Third of five results with even chances of occuring.
        else
          if rand(50)
            say Fourth of five results with even chances of occuring.
          else
            say Fifth of five results with even chances of occuring.
          endif
        endif
      endif
    endif 
  endif
endif
~
>intercept_prog north~
if questr(QQ00, 0, 1, $i) == 1
  mpmset $i QQ00 0 1 0
  say I reset myself when you leave!
  mpunintercept
else
  mpunintercept
endif
~
|

#0


#OBJECTS
#QQ00
token plain generic~
{B0}a plain, generic token~
{B0}A plain, generic token is lying here.~
~
ITEM_TYPE_TREASURE
0
CAN_WEAR_TAKE|CAN_WEAR_HOLD
QUALITY_AVERAGE MATERIAL_WOOD COND_PERFECT SIZE_TINY
0 0 0 0 LAYER_ALL 0
E
token plain generic~
A PC can just use the keywords token, plain, and generic for me, but
ol' Bob can use my VNUM + i so I become iQQ01 to him!
~

#0


#ROOMS
#QQ00
Bob's Room~
{30}1234567890123456789012345678901234567890123456789012345678901234567890
This is Bob's room. It connects to Steve's. It also has a sign hanging
to show that it belongs to Bob. Remember to put in exits that you want
and to put in any extra keywords to look at.  This room is grassy, but
it is inside so that weather does not affect it.
~
0 ROOM_INDOORS SECT_FIELD 0 0 0
DDIR_SOUTH
~
{30}wooden door~
EX_ISDOOR|EX_CLOSED -1 QQ01 0
E
sign~
The sign below has really ugly colors.
{B0}XXXXXXXXXXXX
{B0}XX{D0}..{F0}Bob's{D0}.{B0}XX
{B0}XX{D0}.{F0}Room{D0}...{B0}XX
{B0}XXXXXXXXXXXX

But it looks like this (with colors) to players.

XXXXXXXXXXXX
XX..Bob's.XX
XX.Room...XX
XXXXXXXXXXXX
~
S
#QQ01
Steve's Room~
{30}1234567890123456789012345678901234567890123456789012345678901234567890
Steve's room looks a lot like Bob's room, it has the same door, but it
has a program instead of a sign (but it could have both).  Notice that
once there is a program here then it needs a pipe above the S and just
below the last tilde.
~
0 ROOM_INDOORS SECT_FIELD 0 0 0
DDIR_NORTH
~
{30}wooden door~
EX_ISDOOR|EX_CLOSED -1 QQ00 0
>greet_prog 100~
ifmobinroom(QQ01)
  if sex($n) == 2
    mpforce mQQ01 say Woooo! A girl entered the room.
  else
    mpforce mQQ01 say A guy entered the room! (Steve wishes that it was a girl.)
  endif
else
  mpecho {60}The supermob says, "{70}If Steve were here in the room then I would make him say something{60}."
endif
~
|
S
#0


#RESETS
M 0 QQ00   1 QQ00 ;          One Bob mobile in Bob's room
M 0 QQ01   1 QQ01 ;          One Steve mobile in Steve's room
M 0 QQ03   1 QQ01 ;          One Igor mobile in Steve's room
D 0 QQ00 DIR_SOUTH DOOR_CLOSED_UNLOCKED ; the door from Bob's room to Steve's will close on reset if no one is around
S


#SHOPS
0


#REPAIRS
0


#SPECIALS
S


#$
`);
}

export default testLoader;