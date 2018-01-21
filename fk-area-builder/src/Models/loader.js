var fs = require("fs");
var flags = require("./flags.js");
var models = require("./are_model.js");

function get_code(code, flag_list) {
    for (let f in flag_list) {
        if (flag_list[f].code == code) {
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
        
        // JusticeSystem has to wait until mobs & rooms are loaded to establish links
        this.parseJusticeSystem(are_string);
    }
    
    parseAreaHeader(area_text) {
        let area = /^#AREA ({..})?(.*)~$/gm.exec(area_text)
        this.area.category = flags.AREA_CATEGORIES.INCOMPLETE;
        
        this.area.category = get_code(area[1], flags.AREA_CATEGORIES);
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
        let justice_system = /^#JUSTICE[^]*?\$/gm.exec(area_text)[1];
        if (!justice_system) {
            return;
        }
        
        
        
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
            quest.event_code = get_code(matches[6], flags.QUEST_EVENT_CODES);
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
            mob.alignment = get_code(matches[16], flags.MOB_ALIGNMENTS);
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
            item.action_description = matches[5];
            
            this.area.items.push(item);
        }
    }
    
    parseRooms(area_text) {
        
    }
    
    parseResets(area_text) {
        
    }
    
    parseSpecials(area_text) {
        
    }
    
    toString() {
        return this.area.toString();
    }
}

// DEBUG
function testLoader() {
    let loader = new Loader(fs.readFileSync("../../../areas/sample2.1.are", "utf-8"));
    
    console.log(loader.toString());
}

testLoader();