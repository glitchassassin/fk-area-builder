var flags = require("./flags.js");
var models = require("./area_model.js");

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

function autoline(text) {
    return (text ? "\n"+text : text)
}

function get_mob(area, vnum) {
    if (vnum == null) {
        return;
    }
    for (let i = 0; i < area.mobs.length; i++) {
        if (area.mobs[i].vnum === vnum) {
            return area.mobs[i]
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

class AreaExporter {
    renderArea(area) { // Area
        return `#AREA ${area.category.color_code}${area.name}~
#AUTHOR ${area.authors}~\
${this.renderJusticeSystem(area)}
#RANGES
${area.min_recommended_level} ${area.max_recommended_level} ${area.min_enforced_level} ${area.max_enforced_level}
$
#RESETMSG ${area.reset_msg}~
#FLAGS
${area.wilderness_flag} ${area.reset_duration}
#ECONOMY ${area.economy_min} ${area.economy_max}
#WEATHER ${area.weather_humidity} ${area.weather_temperature}
${area.mining_material != null ? "\n#MINING " + area.mining_material.code : ""}\
${area.logging_material != null ? "\n#LOGGING " + area.logging_material.code : ""}\
#QUESTS
${this.renderQuests(area)}
-1
#MOBILES
${this.renderMobs(area)}
#0
#OBJECTS
${this.renderItems(area)}
#0
#ROOMS
${this.renderRooms(area)}
#0
#RESETS\
${this.renderResets(area)}
S
#SHOPS\
${this.renderShops(area)}
0
#REPAIRS\
${this.renderRepairs(area)}
0
#SPECIALS\
${this.renderSpecials(area)}
S
#$
`
    }
    
    renderJusticeSystem(area) { // Justice System
        if (area.justice_system == null) {
            return "";
        }
        return `
#JUSTICE
CourtRoom ${area.justice_system.courtroom || "0"}
Dungeon ${area.justice_system.dungeon || "0"}
Judge ${area.justice_system.judge || "0"}
Guard ${area.justice_system.guard || "0"}
Crime CRIME_HIGH_MURDER ${area.justice_system.CRIME_HIGH_MURDER}
Crime CRIME_LOW_MURDER ${area.justice_system.CRIME_LOW_MURDER}
Crime CRIME_ASSAULT ${area.justice_system.CRIME_ASSAULT}
Crime CRIME_MUGGING ${area.justice_system.CRIME_MUGGING}
$`
    }
    
    renderRooms(area) { // Rooms
        return area.rooms.sort(vnum_sort).map((room)=>{
            return `#${room.vnum}
${room.sdesc}~
${room.ldesc}
~
${room.defunct} ${room.room_flags.map((flag)=>(flag.code)).join("|")||"0"} ${room.sector} ${room.teleport_delay||"0"} ${room.teleport_target||"0"} ${room.tunnel||"0"}\
${this.renderExits(room.exits)}\
${this.renderExtraDescriptions(room.extra_descriptions)}\
${this.renderPrograms(room.programs)}
S
`}).join("\n")
    }
    
    renderExits(exits) { // Exits
        return autoline(exits.map((exit) => (`${exit.direction}
${exit.comment}~
${exit.somewhere_door_keyword}~
${exit.door_flags.map((flag)=>(flag.code)).join("|")||"0"} ${exit.door_key ? exit.door_key.vnum : "-1"} ${exit.target_vnum ? exit.target_vnum.vnum : "0"} ${exit.exit_size}`)).join("\n"))
    }
    
    renderExtraDescriptions(extra_descriptions) {
        return autoline(extra_descriptions.map((ed)=>(`E
${ed.keywords}~
${ed.ldesc}
~`)).join("\n"))
    }
    
    renderPrograms(programs) { // Programs
        if (!programs.length) {
            return ""
        }
        return autoline(programs.map(program=>`>${program.trigger} ${program.argument}~
${program.program}
~`).join("\n")) + "\n|"
    }
    
    renderItems(area) {
        return area.items.sort(vnum_sort).map((item)=>`#${item.vnum}
${item.keywords}~
${item.sdesc}~
${item.ldesc}~
${item.action_description}~
${item.item_type}
${item.attributes.map((attribute)=>(attribute.code)).join("|")||0}
${item.wear_flags.map((flag)=>(flag.code)).join("|")||0}
${item.quality} ${item.material} ${item.condition} ${item.size}
${item.value0} ${item.value1} ${item.value2} ${item.value3} ${item.value4} ${item.value5}\
${this.renderItemApplies(item.special_applies)}\
${this.renderExtraDescriptions(item.extra_descriptions)}\
${item.identify_message != null ? `I\n${item.identify_message}\n~` : "" }\
${this.renderPrograms(item.programs)}`
        ).join("\n")
    }
    
    renderItemApplies(item_applies) {
        return autoline(item_applies.map(item_apply => `A ${this.apply_flag} ${this.parameter}`).join("\n"));
    }
    
    renderMobs(area) {
        return area.mobs.sort(vnum_sort).map((mob) => (
            `#${mob.vnum}
${mob.keywords}~
${mob.sdesc}~
${mob.ldesc}~
${mob.fulldesc}~
${mob.unique ? "U" : "S"} ${mob.level} ${mob.mob_class} ${mob.race} ${mob.sex} ${mob.position} ${mob.deity}
${mob.act_flags.map((flag)=>(flag.code)).join("|")}\
${mob.unique ? `
${mob.affect_flags.map((flag)=>(flag.code)).join("|")||"0"}
${mob.virtual_armor_type} ${mob.virtual_armor_material}
${mob.alignment}
${mob.str} ${mob.int} ${mob.wis} ${mob.dex} ${mob.con} ${mob.cha} ${mob.lck}` : ""}
${mob.understood_languages.map((lang)=>(lang.code)).join("|")}
${mob.spoken_languages.map((lang)=>(lang.code)).join("|")} \
${mob.unique ? `\n${mob.ris_resistant.map((ris)=>(ris.code)).join("|") || "RIS_NONE"} ${mob.ris_immune.map((ris)=>(ris.code)).join("|") || "RIS_NONE"} ${mob.ris_susceptible.map((ris)=>(ris.code)).join("|") || "RIS_NONE"}` : ""}\
${this.renderTrainSkill(mob.can_train_skill)}\
${this.renderTrainWeaponSkill(mob.can_train_weapon_skill)}\
${this.renderTrainSpell(mob.can_train_spell)}\
${this.renderTrainLevel(mob.can_train_level)}\
${this.renderTrainStatistic(mob.can_train_statistic)}\
${this.renderTrainFeat(mob.can_train_feat)}\
${this.renderPrograms(mob.programs)}`
            )).join("\n");
    }
    
    renderTrainSkill(trains) {
        return autoline(trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.skill.code}~`)).join("\n"));
    }
    
    renderTrainWeaponSkill(trains) {
        return autoline(trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.weapon_skill.code}~`)).join("\n"));
    }
    
    renderTrainSpell(trains) {
        return autoline(trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.spell.code}~`)).join("\n"));
    }
    
    renderTrainLevel(trains) {
        return autoline(trains.map((train)=>(`%${train.level} ${train.price_multiplier} level~`)).join("\n"));
    }
    
    renderTrainStatistic(trains) {
        return autoline(trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.statistic.code}~`)).join("\n"));
    }
    
    renderTrainFeat(trains) {
        return autoline(trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.feat.code}~`)).join("\n"));
    }
    
    renderShops(area) {
        return autoline(area.mobs.filter((mob)=>(!!mob.shop)).map((mob)=>(mob.shop ? 
            `${mob.shop.shopkeeper} ${mob.shop.will_buy_1} ${mob.shop.will_buy_2} ${mob.shop.will_buy_3} ${mob.shop.will_buy_4} ${mob.shop.will_buy_5}
${mob.shop.profit_buy} ${mob.shop.profit_sell} ${mob.shop.open_hour} ${mob.shop.close_hour} ; ${get_mob(area, mob.shop.shopkeeper).sdesc}` : "")
        ).join("\n"));
    }
    
    renderRepairs(area) {
        return autoline(area.mobs.filter((mob)=>(!!mob.repairs)).map((mob)=>(mob.repairs ? 
            `${mob.repairs.shopkeeper} ${mob.repairs.will_repair_1} ${mob.repairs.will_repair_2} ${mob.repairs.repair_material}
${mob.repairs.profit_modifier} ${mob.repairs.repair.bits} ${mob.repairs.open_hour} ${mob.repairs.close_hour} ; ${get_mob(area, mob.repairs.shopkeeper).sdesc}` : "")
        ).join("\n"));
    }
    
    renderResets(area) {
        return (this.renderMobResets(area) + this.renderItemResets(area) + this.renderDoorResets(area) + this.renderRoomResets(area));
    }
    
    renderMobResets(area) {
        return autoline(area.mobs.filter((mob)=>(!!mob.mob_resets.length)).map(mob=>(
            mob.mob_resets.map(reset=>(
                `M ${reset.defunct} ${reset.mob.vnum} ${reset.mob_limit} ${reset.room ? reset.room.vnum : "undefined"} ; ${reset.mob.sdesc} in ${reset.room ? reset.room.sdesc : "undefined"}\
${this.renderEquipmentResets(reset.equipment, area)}\
${this.renderCoinResets(reset.coins)}`
                )
            ).join("\n").trimRight()
        )).join("\n").trimRight())
    }
    
    renderEquipmentResets(equipment, area) {
        return autoline(equipment.map((equip)=>{
            if (equip.wear_loc) {
                // Equipped
                return ` E ${equip.defunct} ${equip.item.vnum} ${equip.equip_limit} ${equip.wear_loc} ; Equip ${equip.item.sdesc}${this.renderTrapReset(equip.trap_reset)}`
            }
            else {
                // Held
                return ` G ${equip.defunct} ${equip.item.vnum} ${equip.equip_limit} ; Hold ${equip.item.sdesc}${this.renderTrapReset(equip.trap_reset)}`
            }
        }).join("\n").trimRight());
    }
    
    renderItemResets(area) {
        return autoline(area.item_resets.map((reset)=>{
            if (reset.room_container instanceof models.Item) {
                // Container (hidden is handled differently)
                return ` P ${reset.hidden ? 1 : 0} ${reset.item.vnum} ${reset.item_limit} ${reset.room_container ? reset.room_container.vnum : "undefined"} ; ${reset.item.sdesc} in container ${reset.room_container ? reset.room_container.sdesc : "undefined"}\
${this.renderTrapReset(reset.trap_reset)}`
            }
            else if (reset.hidden) {
                return `H ${reset.defunct} ${reset.item.vnum} ${reset.item_limit} ${reset.room_container ? reset.room_container.vnum : "undefined"} ; ${reset.item.sdesc} hidden in ${reset.room_container ? reset.room_container.sdesc : "undefined"}\
${this.renderTrapReset(reset.trap_reset)}`
            }
            else if (reset.buried) {
                return `U ${reset.defunct} ${reset.item.vnum} ${reset.item_limit} ${reset.room_container ? reset.room_container.vnum : "undefined"} ; ${reset.item.sdesc} buried in ${reset.room_container ? reset.room_container.sdesc : "undefined"}\
${this.renderTrapReset(reset.trap_reset)}`
            }
            return `O ${reset.defunct} ${reset.item.vnum} ${reset.item_limit} ${reset.room_container ? reset.room_container.vnum : "undefined"} ; ${reset.item.sdesc} in room ${reset.room_container ? reset.room_container.sdesc : "undefined"}\
${this.renderEquipmentResets(reset.contents)}\
${this.renderTrapReset(reset.trap_reset)}`
        }).join("\n").trimRight());
    }
    
    renderDoorResets(area) {
        return autoline(area.rooms.filter((room)=>(!!room.door_resets.length)).map((room)=>(
            room.door_resets.map((reset)=>{
                if (reset.last_door) {
                    return `R ${reset.defunct} ${reset.room.vnum} ${reset.last_door} ; ${reset.room.sdesc} rearrange exits 0-${reset.last_door} randomly`
                }
                else {
                    return `D ${reset.defunct} ${reset.room.vnum} ${reset.exit} ${reset.exit_state} ; ${reset.room.sdesc}${reset.trap_reset ? "\n"+reset.trap_reset.toString() : ""}`
                }
        }).join("\n"))).join("\n").trimRight());
    }
    
    renderRoomResets(area) {
        return autoline(area.rooms.filter((room)=>(!!room.room_resets.length)).map((room)=>(
            room.room_resets.map((reset)=>{
                return `B ${reset.defunct} ${reset.room.vnum} ${flags.ROOM_FLAGS.BIT_RESET_ROOM}|${reset.bit_type} ${reset.flag} ; ${reset.room.sdesc}`
        }).join("\n"))).join("\n").trimRight());
    }
    
    renderTrapReset(trap_reset) {
        if (trap_reset === null) { return ""; }
        return `\n T ${trap_reset.reset_interval} ${trap_reset.trap_type} ${trap_reset.trap_charges} ${trap_reset.trigger_1}|${trap_reset.trigger_2}`
    }
    
    renderCoinResets(coin_resets) {
        return autoline(coin_resets.map((reset)=>` C ${reset.defunct} ${reset.coin_type} ${reset.dice_count} ${reset.dice_sides}`));
    }
    
    renderSpecials(area) {
        return autoline(area.mob_specials.map((reset)=>{
            return `M ${reset.mob.vnum} ${reset.special}`
        }).join("\n"));
    }
    
    renderQuests(area) {
        return area.quest_log.map((quest)=>{
            return `${area.vnum} ${quest.qbit_start} ${quest.qbit_stop} ${quest.min_qbit} ${quest.max_qbit} ${quest.event_code ? quest.event_code.color_code : ""}${quest.qlog_text}`
        }).join("\n");
    }
}

export default AreaExporter;