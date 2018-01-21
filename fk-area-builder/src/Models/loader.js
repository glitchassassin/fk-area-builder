var fs = require("fs");
var flags = require("./flags.js");
var models = require("./are_model.js");

class Loader {
    constructor(are_string) {
        // Accepts a string containing a .are file
        // Validates the file, then loads the contents into a new model
        this.area = new models.Area();
        
        this.parseAreaHeader(are_string);
        this.parseQuests(are_string);
        this.parseMobiles(are_string);
        
        // JusticeSystem has to wait until mobs & rooms are loaded to establish links
        this.parseJusticeSystem(are_string);
    }
    
    parseAreaHeader(area_text) {
        let area = /^#AREA ({..})?(.*)~$/gm.exec(area_text)
        this.area.category = flags.AREA_CATEGORIES.INCOMPLETE;
        
        for (let cat in flags.AREA_CATEGORIES) {
            if (flags.AREA_CATEGORIES[cat].color_code == area[1]) {
                this.area.category = flags.AREA_CATEGORIES[cat];
                break;
            }
        }
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
            for (let code in flags.QUEST_EVENT_CODES) {
                if (flags.QUEST_EVENT_CODES[code].color_code == matches[6]) {
                    quest.event_code = flags.QUEST_EVENT_CODES[code];
                    break;
                }
            }
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
            for (let f in flags.MOB_CLASSES) {
                if (flags.MOB_CLASSES[f].code == matches[8]) {
                    mob.mob_class = flags.MOB_CLASSES[f]
                }
            }
            for (let f in flags.MOB_RACES) {
                if (flags.MOB_RACES[f].code == matches[9]) {
                    mob.race = flags.MOB_RACES[f]
                }
            }
            for (let f in flags.MOB_SEXES) {
                if (flags.MOB_SEXES[f].code == matches[10]) {
                    mob.sex = flags.MOB_SEXES[f]
                }
            }
            for (let f in flags.MOB_POSITIONS) {
                if (flags.MOB_POSITIONS[f].code == matches[11]) {
                    mob.position = flags.MOB_POSITIONS[f]
                }
            }
            for (let f in flags.MOB_DEITIES) {
                if (flags.MOB_DEITIES[f].code == matches[12]) {
                    mob.deity = flags.MOB_DEITIES[f]
                }
            }
            let act_flags = matches[13].split("|");
            for (let i in act_flags) {
                for (let f in flags.MOB_ACT_FLAGS) {
                    if (flags.MOB_ACT_FLAGS[f].code == act_flags[i]) {
                        mob.act_flags.push(flags.MOB_ACT_FLAGS[f])
                    }
                }
            }
            let understood_languages = matches[14].split("|");
            for (let i in understood_languages) {
                for (let f in flags.LANGUAGE_FLAGS) {
                    if (flags.LANGUAGE_FLAGS[f].code == understood_languages[i]) {
                        mob.understood_languages.push(flags.LANGUAGE_FLAGS[f])
                    }
                }
            }
            let spoken_languages = matches[15].split("|");
            for (let i in spoken_languages) {
                for (let f in flags.LANGUAGE_FLAGS) {
                    if (flags.LANGUAGE_FLAGS[f].code == spoken_languages[i]) {
                        mob.spoken_languages.push(flags.LANGUAGE_FLAGS[f])
                    }
                }
            }
            
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
            for (let f in flags.MOB_CLASSES) {
                if (flags.MOB_CLASSES[f].code == matches[8]) {
                    mob.mob_class = flags.MOB_CLASSES[f]
                }
            }
            for (let f in flags.MOB_RACES) {
                if (flags.MOB_RACES[f].code == matches[9]) {
                    mob.race = flags.MOB_RACES[f]
                }
            }
            for (let f in flags.MOB_SEXES) {
                if (flags.MOB_SEXES[f].code == matches[10]) {
                    mob.sex = flags.MOB_SEXES[f]
                }
            }
            for (let f in flags.MOB_POSITIONS) {
                if (flags.MOB_POSITIONS[f].code == matches[11]) {
                    mob.position = flags.MOB_POSITIONS[f]
                }
            }
            for (let f in flags.MOB_DEITIES) {
                if (flags.MOB_DEITIES[f].code == matches[12]) {
                    mob.deity = flags.MOB_DEITIES[f]
                }
            }
            let act_flags = matches[13].split("|");
            for (let i in act_flags) {
                for (let f in flags.MOB_ACT_FLAGS) {
                    if (flags.MOB_ACT_FLAGS[f].code == act_flags[i]) {
                        mob.act_flags.push(flags.MOB_ACT_FLAGS[f])
                    }
                }
            }
            let affect_flags = matches[14].split("|");
            for (let i in affect_flags) {
                for (let f in flags.MOB_AFFECTS) {
                    if (flags.MOB_AFFECTS[f].code == affect_flags[i]) {
                        mob.affect_flags.push(flags.MOB_AFFECTS[f])
                    }
                }
            }
            let virtual_armor_type = matches[15];
            for (let f in flags.ITEM_ARMOR_TYPES) {
                if (flags.ITEM_ARMOR_TYPES[f].code == virtual_armor_type) {
                    mob.virtual_armor_type = flags.ITEM_ARMOR_TYPES[f]
                }
            }
            let virtual_armor_material = matches[16];
            for (let f in flags.ITEM_MATERIALS) {
                if (flags.ITEM_MATERIALS[f].code == virtual_armor_material) {
                    mob.virtual_armor_material = flags.ITEM_MATERIALS[f]
                }
            }
            let alignment = matches[17].trim();
            for (let f in flags.MOB_ALIGNMENTS) {
                if (flags.MOB_ALIGNMENTS[f].code == alignment) {
                    mob.alignment = flags.MOB_ALIGNMENTS[f]
                }
            }
            mob.str = matches[18];
            mob.int = matches[19];
            mob.wis = matches[20];
            mob.dex = matches[21];
            mob.con = matches[22];
            mob.cha = matches[23];
            mob.lck = matches[24];
            let understood_languages = matches[25].split("|");
            for (let i in understood_languages) {
                for (let f in flags.LANGUAGE_FLAGS) {
                    if (flags.LANGUAGE_FLAGS[f].code == understood_languages[i] && mob.understood_languages.indexOf(flags.LANGUAGE_FLAGS[f]) == -1) {
                        mob.understood_languages.push(flags.LANGUAGE_FLAGS[f])
                    }
                }
            }
            let spoken_languages = matches[26].split("|");
            for (let i in spoken_languages) {
                for (let f in flags.LANGUAGE_FLAGS) {
                    if (flags.LANGUAGE_FLAGS[f].code == spoken_languages[i] && mob.spoken_languages.indexOf(flags.LANGUAGE_FLAGS[f]) == -1) {
                        mob.spoken_languages.push(flags.LANGUAGE_FLAGS[f])
                    }
                }
            }
            let ris_resistant = matches[27].split("|");
            for (let i in ris_resistant) {
                for (let f in flags.MOB_RIS) {
                    if (flags.MOB_RIS[f].code == ris_resistant[i] && mob.ris_resistant.indexOf(flags.MOB_RIS[f]) == -1) {
                        mob.ris_resistant.push(flags.MOB_RIS[f])
                    }
                }
            }
            let ris_immune = matches[28].split("|");
            for (let i in ris_immune) {
                for (let f in flags.MOB_RIS) {
                    if (flags.MOB_RIS[f].code == ris_immune[i] && mob.ris_immune.indexOf(flags.MOB_RIS[f]) == -1) {
                        mob.ris_immune.push(flags.MOB_RIS[f])
                    }
                }
            }
            let ris_susceptible = matches[29].split("|");
            for (let i in ris_susceptible) {
                for (let f in flags.MOB_RIS) {
                    if (flags.MOB_RIS[f].code == ris_susceptible[i] && mob.ris_susceptible.indexOf(flags.MOB_RIS[f]) == -1) {
                        mob.ris_susceptible.push(flags.MOB_RIS[f])
                    }
                }
            }
            
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