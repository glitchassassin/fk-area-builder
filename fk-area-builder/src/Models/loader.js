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
        
        this.area.category = get_color_code(area[1], flags.AREA_CATEGORIES);
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
        justice_system.courtroom = this.get_room(matches[1]);
        justice_system.dungeon = this.get_room(matches[2]);
        justice_system.judge = this.get_mob(matches[3]);
        justice_system.guard = this.get_mob(matches[4]);
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
            quest.area_vnum = matches[1];
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
        let simple_mobile_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^\n~]\n)*.*)~\n(S) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\n(.*)$\n(.*)$\n(.*)$\n((?:%.*~\n)*)?(>[^]*?\|)?/gm
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
            let can_train_regex = /^%([^ ]+) ([^ ]+)( .+)?~$/gm;
            let t;
            while ((t = can_train_regex.exec(can_train)) != null) {
                let train;
                if (!train) {
                    if (!t[3]) {
                        train = new models.TrainLevel();
                        train.level = t[1];
                        train.price_multiplier = t[2];
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
                            break;
                        }
                    }
                }
                // Whew! Now, if it's real, add it to the list...
                if (train) {
                    mob.can_train.push(train);
                }
            }
            
            let programs = matches[17];
            let program_regex = />([^ ]*) (.*)~$\n([^]*?)\n^~$/gm;
            let p;
            while ((p = program_regex.exec(programs)) != null) {
                let program = new models.Program();
                program.trigger = p[1]
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
            mob.ris_resistant = get_codes(matches[27].split("|"), flags.MOB_RIS);
            mob.ris_immune = get_codes(matches[28].split("|"), flags.MOB_RIS);
            mob.ris_susceptible = get_codes(matches[29].split("|"), flags.MOB_RIS);
            
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
                            break;
                        }
                    }
                }
                // Whew! Now, if it's real, add it to the list...
                if (train) {
                    mob.can_train.push(train);
                }
            }
            
            let programs = matches[31];
            let program_regex = />([^ ]*) (.*)~$\n([^]*?)\n^~$/gm;
            let p;
            while ((p = program_regex.exec(programs)) != null) {
                let program = new models.Program();
                program.trigger = p[1]
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
        let item_regex = /#(.*)$\n(.*)~\n(.*)~\n(.*)~\n((?:.*[^\n~]\n)*.*)~\n(.*)\n(.*)\n(.*)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)\n([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)(\n(?:E[^]*?^~\n)+)?((?:\nA .*)+)?(?:I\s([^]*?)~$)?(>[^]*?|)?/gm
        let matches;
        while ((matches = item_regex.exec(items)) != null) {
            let item = new models.Item();
            
            item.vnum = matches[1];
            item.keywords = matches[2];
            item.sdesc = matches[3];
            item.ldesc = matches[4];
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
                ed.ldesc = ed_matches[2];
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
                prog.trigger = prog_matches[1];
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
                exit.exit_size = get_code(exit_matches[7], flags.EXIT_SIZES);
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
                program.trigger = p[1]
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
        let reset_regex = /^ *([^\s]) +([^\s]+) +([^\s]+) +([^\s]+) +([^\s]*) *;/gm
        let matches;
        
        let last_reset;
        while ((matches = reset_regex.exec(resets)) != null) {
            if (matches[1] == "M") {
                let mob_reset = new models.MobReset();
                mob_reset.defunct = matches[2];
                mob_reset.mob = this.get_mob(matches[3]);
                mob_reset.mob_limit = matches[4];
                mob_reset.room = this.get_room(matches[5]);
                
                if (mob_reset.mob && mob_reset.room) {
                    this.area.mob_resets.push(mob_reset);
                    last_reset = this.get_mob(matches[3]);
                }
            }
            else if (matches[1] == "E") {
                let equip_reset = new models.EquipmentReset();
                equip_reset.defunct = matches[2];
                equip_reset.item = this.get_item(matches[3]);
                equip_reset.equip_limit = matches[4];
                equip_reset.wear_loc = get_code(matches[5], flags.MOB_WEAR_POSITIONS);
                last_reset.equipment_resets.push(equip_reset);
                last_reset = equip_reset;
            }
            else if (matches[1] == "G") {
                let equip_reset = new models.EquipmentReset();
                equip_reset.defunct = matches[2];
                equip_reset.item = this.get_item(matches[3]);
                equip_reset.equip_limit = matches[4];
                last_reset.equipment_resets.push(equip_reset);
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
                last_reset.equipment_resets.push(coin_reset);
            }
            else if (matches[1] == "P") {
                let item_reset = new models.ItemReset();
                item_reset.hidden = (matches[2] == 1); // Boolean
                item_reset.item = this.get_item(matches[3]);
                item_reset.item_limit = matches[4];
                item_reset.room_container = this.get_item(matches[5]);
                this.area.equipment_resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] == "H") {
                let item_reset = new models.ItemReset();
                item_reset.hidden = true;
                item_reset.item = this.get_item(matches[3]);
                item_reset.item_limit = matches[4];
                item_reset.room_container = this.get_room(matches[5]);
                this.area.equipment_resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] == "U") {
                let item_reset = new models.ItemReset();
                item_reset.buried = true;
                item_reset.item = this.get_item(matches[3]);
                item_reset.item_limit = matches[4];
                item_reset.room_container = this.get_room(matches[5]);
                this.area.equipment_resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] == "O") {
                let item_reset = new models.ItemReset();
                item_reset.item = this.get_item(matches[3]);
                item_reset.item_limit = matches[4];
                item_reset.room_container = this.get_room(matches[5]);
                this.area.equipment_resets.push(item_reset);
                last_reset = item_reset;
            }
            else if (matches[1] == "D") {
                let door_reset = new models.DoorReset();
                door_reset.room = this.get_room(matches[3]);
                door_reset.exit = get_code(matches[4], flags.DOOR_RESET_DIRECTIONS);
                door_reset.exit_state = get_code(matches[5], flags.DOOR_RESET_FLAGS);
                this.area.door_resets.push(door_reset);
                last_reset = door_reset;
            }
            else if (matches[1] == "R") {
                let door_reset = new models.RandomDoorReset();
                door_reset.room = this.get_room(matches[3]);
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
        let shops = area_text.match(/^#REPAIRS[^]*?^0$/gm)[0]
        if (!shops) {
            return
        }
        let shops_regex = /^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)$\s^([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/gm
        let matches;
        
        while ((matches = shops_regex.exec(shops)) != null) {
            let shop = new models.Shop();
            shop.shopkeeper = this.get_mob(matches[1]);
            shop.will_repair_1 = get_code(matches[2], flags.ITEM_TYPES);
            shop.will_repair_2 = get_code(matches[3], flags.ITEM_TYPES);
            shop.repair_material = matches[4];
            shop.profit_modifier = matches[5];
            shop.repair = matches[6];
            shop.open_hour = matches[7];
            shop.close_hour = matches[8];
            this.area.shops.push(shop);
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
        let mob = new models.SimpleMob()
        mob.vnum = vnum;
        mob.sdesc = "[MISSING]";
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
        let item = new models.Item()
        item.vnum = vnum;
        item.sdesc = "[MISSING]";
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
        let room = new models.Room()
        room.vnum = vnum;
        room.sdesc = "[MISSING]";
        return room;
    }
    
    toString() {
        return this.area.toString();
    }
}

// DEBUG
function testLoader() {
    let loader = new Loader(fs.readFileSync("../../../areas/sample1.are", "utf-8"));
    
    console.log(loader.toString());
}

testLoader();