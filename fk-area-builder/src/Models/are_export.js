import { items_library, mobs_library } from '../Models/vnum_library';
var flags = require("./flags.js");
var models = require("./model_templates.js");

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

function get_mob(state, vnum) {
    // Not in file; Return empty mob as reference
    let mob = new models.SimpleMob()
    mob.vnum = vnum;
    mob.sdesc = "[MISSING]";
    
    if (vnum == null) {
        return mob;
    }
    let flat_list = mobs_library(state.mobs)
    flat_list = flat_list[0].list.concat(flat_list[1].list, flat_list[2].list);
    let matches = flat_list.filter((m)=>(m.vnum===vnum))
    if (matches.length) {
        return matches[0]
    }
    
    return mob;
}

function get_item(state, vnum) {
    // Not in file; Return empty item as reference
    let item = new models.Item()
    item.vnum = vnum;
    item.sdesc = "[MISSING]";
    
    if (vnum == null) {
        return item;
    }
    let flat_list = items_library(state.items)
    flat_list = flat_list[0].list.concat(flat_list[1].list, flat_list[2].list);
    let matches = flat_list.filter((m)=>(m.vnum===vnum))
    if (matches.length) {
        return matches[0]
    }
    return item;
}

function get_room(state, vnum) {
    // Not in file; Return empty room as reference
    let room = new models.Room()
    room.vnum = vnum;
    room.sdesc = "[MISSING]";
    
    if (vnum == null) {
        return room;
    }
    let matches = state.rooms.filter((m)=>(m.vnum===vnum))
    if (matches.length) {
        return matches[0]
    }
    return room;
}
function strip_color_codes(desc) {
    return desc.replace(/\{..\}/g, "");
}

class AreaExporter {
    renderArea(state) { // Area
        return `#AREA ${state.area.category.color_code}${state.area.name}~

#AUTHOR ${state.area.authors}~\

${this.renderJusticeSystem(state)}

#RANGES
${state.area.min_recommended_level} ${state.area.max_recommended_level} ${state.area.min_enforced_level} ${state.area.max_enforced_level}
$

#RESETMSG ${state.area.reset_msg}~

#FLAGS
${state.area.wilderness_flag} ${state.area.reset_duration}

#ECONOMY ${state.area.economy_min} ${state.area.economy_max}

#WEATHER ${state.area.weather_humidity} ${state.area.weather_temperature}
${state.area.mining_material != null ? "\n#MINING " + state.area.mining_material.code : ""}\
${state.area.logging_material != null ? "\n#LOGGING " + state.area.logging_material.code : ""}\

#QUESTS
${this.renderQuests(state)}
-1

#MOBILES
${this.renderMobs(state)}
#0

#OBJECTS
${this.renderItems(state)}
#0

#ROOMS
${this.renderRooms(state)}
#0

#RESETS\
${this.renderResets(state)}
S

#SHOPS\
${this.renderShops(state)}
0

#REPAIRS\
${this.renderRepairs(state)}
0

#SPECIALS\
${this.renderSpecials(state)}
S
#$
`
    }
    
    renderJusticeSystem(state) { // Justice System
        if (state.justice_system == null) {
            return "";
        }
        return `
#JUSTICE
CourtRoom ${state.justice_system.courtroom || "0"}
Dungeon ${state.justice_system.dungeon || "0"}
Judge ${state.justice_system.judge || "0"}
Guard ${state.justice_system.guard || "0"}
Crime CRIME_HIGH_MURDER ${state.justice_system.CRIME_HIGH_MURDER}
Crime CRIME_LOW_MURDER ${state.justice_system.CRIME_LOW_MURDER}
Crime CRIME_ASSAULT ${state.justice_system.CRIME_ASSAULT}
Crime CRIME_MUGGING ${state.justice_system.CRIME_MUGGING}
$`
    }
    
    renderRooms(state) { // Rooms
        return state.rooms.sort(vnum_sort).map((room)=>{
            return `#${room.vnum}
${room.sdesc}~
${room.ldesc}
~
${room.defunct} ${room.room_flags.map((flag)=>(flag.code)).join("|")||"0"} ${room.sector} ${room.teleport_delay||"0"} ${room.teleport_target||"0"} ${room.tunnel||"0"}\
${this.renderExits(state, room.uuid)}\
${this.renderExtraDescriptions(state, room.uuid)}\
${this.renderPrograms(state, room.uuid)}
S`}).join("\n")
    }
    
    renderExits(state, uuid) { // Exits
        return autoline(state.exits.filter((i)=>(i.pointer===uuid)).map((exit) => (`${exit.direction}
${exit.comment}~
${exit.somewhere_door_keyword}~
${exit.door_flags.map((flag)=>(flag.code)).join("|")||"0"} ${exit.door_key || "-1"} ${exit.target_vnum || "0"} ${exit.exit_size}`)).join("\n"))
    }
    
    renderExtraDescriptions(state, uuid) {
        return autoline(state.extra_descriptions.filter((i)=>(i.pointer===uuid)).map((ed)=>(`E
${ed.keywords}~
${ed.ldesc}
~`)).join("\n"))
    }
    
    renderPrograms(state, uuid) { // Programs
        if (!state.programs.filter((i)=>(i.pointer===uuid)).length) {
            return ""
        }
        return autoline(state.programs.filter((i)=>(i.pointer===uuid)).map(program=>`>${program.trigger} ${program.argument}~
${program.program}
~`).join("\n")) + "\n|"
    }
    
    renderItems(state) {
        return state.items.sort(vnum_sort).map((item)=>`#${item.vnum}
${item.keywords}~
${item.sdesc}~
${item.ldesc}~
${item.action_description}~
${item.item_type}
${item.attributes.map((attribute)=>(attribute.code)).join("|")||0}
${item.wear_flags.map((flag)=>(flag.code)).join("|")||0}
${item.quality} ${item.material} ${item.condition} ${item.size}
${item.value0} ${item.value1} ${item.value2} ${item.value3} ${item.value4} ${item.value5}\
${this.renderItemApplies(state, item.uuid)}\
${this.renderExtraDescriptions(state, item.uuid)}\
${item.identify_message != null ? `I\n${item.identify_message}\n~` : "" }\
${this.renderPrograms(state, item.uuid)}`
        ).join("\n")
    }
    
    renderItemApplies(state, uuid) {
        return autoline(state.item_applies.filter((i)=>(i.pointer===uuid)).map(item_apply => `A ${this.apply_flag} ${this.parameter}`).join("\n"));
    }
    
    renderMobs(state) {
        return state.mobs.sort(vnum_sort).map((mob) => (
            `#${mob.vnum}
${mob.keywords}~
${mob.sdesc}~
${mob.ldesc}~
${mob.fulldesc}~
${mob.unique ? "U" : "S"} ${mob.level} ${mob.mob_class} ${mob.race} ${mob.sex} ${mob.position} ${mob.deity}
${mob.act_flags.map((flag)=>(flag.code)).join("|")}\
${mob.unique ? `
${mob.affect_flags.map((flag)=>(flag.code)).join("|")||"0"} ${mob.affect_two_flags.map((flag)=>(flag.code)).join("|")||"0"}
${mob.virtual_armor_type} ${mob.virtual_armor_material}
${mob.alignment}
${mob.str} ${mob.int} ${mob.wis} ${mob.dex} ${mob.con} ${mob.cha} ${mob.lck}` : ""}
${mob.understood_languages.map((lang)=>(lang.code)).join("|")}
${mob.spoken_languages.map((lang)=>(lang.code)).join("|")} \
${mob.unique ? `\n${mob.ris_resistant.map((ris)=>(ris.code)).join("|") || "RIS_NONE"} ${mob.ris_immune.map((ris)=>(ris.code)).join("|") || "RIS_NONE"} ${mob.ris_susceptible.map((ris)=>(ris.code)).join("|") || "RIS_NONE"}` : ""}\
${this.renderTrainSkill(state, mob.uuid)}\
${this.renderTrainWeaponSkill(state, mob.uuid)}\
${this.renderTrainSpell(state, mob.uuid)}\
${this.renderTrainLevel(state, mob.uuid)}\
${this.renderTrainStatistic(state, mob.uuid)}\
${this.renderTrainFeat(state, mob.uuid)}\
${this.renderTrainLang(state, mob.uuid)}\
${this.renderPrograms(state, mob.uuid)}`
            )).join("\n");
    }
    
    renderTrainSkill(state, uuid) {
        return autoline(state.can_train_skill.filter((i)=>(i.mob===uuid)).map((train)=>(
            `%${train.level} ${train.price_multiplier} ${train.skill ? train.skill.code : undefined}~`
        )).join("\n"));
    }
    
    renderTrainWeaponSkill(state, uuid) {
        return autoline(state.can_train_weapon_skill.filter((i)=>(i.mob===uuid)).map((train)=>(
            `%${train.level} ${train.price_multiplier} ${train.weapon_skill ? train.weapon_skill.code : undefined}~`
        )).join("\n"));
    }
    
    renderTrainSpell(state, uuid) {
        return autoline(state.can_train_spell.filter((i)=>(i.mob===uuid)).map((train)=>(
            `%${train.level} ${train.price_multiplier} ${train.spell ? train.spell.code : undefined}~`
        )).join("\n"));
    }
    
    renderTrainLevel(state, uuid) {
        return autoline(state.can_train_level.filter((i)=>(i.mob===uuid)).map((train)=>(
            `%${train.level} ${train.price_multiplier} level~`
        )).join("\n"));
    }
    
    renderTrainStatistic(state, uuid) {
        return autoline(state.can_train_statistic.filter((i)=>(i.mob===uuid)).map((train)=>(
            `%${train.level} ${train.price_multiplier} ${train.statistic ? train.statistic.code : undefined}~`
        )).join("\n"));
    }
    
    renderTrainFeat(state, uuid) {
        return autoline(state.can_train_feat.filter((i)=>(i.mob===uuid)).map((train)=>(
            `%${train.level} ${train.price_multiplier} ${train.feat ? train.feat.code : undefined}~`
        )).join("\n"));
    }
    
    renderTrainLang(state, uuid) {
        return autoline(state.can_train_lang.filter((i)=>(i.mob===uuid)).map((train)=>(
            `%${train.level} ${train.price_multiplier} ${train.lang ? train.lang.code : undefined}~`
        )).join("\n"));
    }
    
    renderShops(state) {
        return autoline(state.shops.map((shop)=>(
            `${shop.shopkeeper} ${shop.will_buy_1} ${shop.will_buy_2} ${shop.will_buy_3} ${shop.will_buy_4} ${shop.will_buy_5}
${shop.profit_buy} ${shop.profit_sell} ${shop.open_hour} ${shop.close_hour} ; ${strip_color_codes(get_mob(state, shop.shopkeeper).sdesc)}`
        )).join("\n"));
    }
    
    renderRepairs(state) {
        return autoline(state.repairs.map((repairs)=>(
            `${repairs.shopkeeper} ${repairs.will_repair_1} ${repairs.will_repair_2} ${repairs.repair_material}
${repairs.profit_modifier} ${repairs.repair?repairs.repair.bits:repairs.repair} ${repairs.open_hour} ${repairs.close_hour} ; ${strip_color_codes(get_mob(state, repairs.shopkeeper).sdesc)}`)
        ).join("\n"));
    }
    
    renderResets(state) {
        return (this.renderMobResets(state) + this.renderItemResets(state) + this.renderDoorResets(state) + this.renderRoomResets(state));
    }
    
    renderMobResets(state) {
        return autoline(state.mob_resets.map(reset=>{
            return `M ${reset.defunct} ${reset.mob} ${reset.mob_limit} ${reset.room} ; ${strip_color_codes(get_mob(state, reset.mob).sdesc)} in ${strip_color_codes(get_room(state, reset.room).sdesc)}\
${this.renderEquipmentResets(state, reset.uuid)}\
${this.renderCoinResets(state, reset.uuid)}`
        }).join("\n").trimRight())
    }
    
    renderEquipmentResets(state, uuid) {
        return autoline(state.equipment_resets.filter((i)=>(i.mob_reset===uuid)).map((equip)=>{
            if (equip.wear_loc) {
                // Equipped
                return ` E ${equip.defunct} ${equip.item} ${equip.equip_limit} ${equip.wear_loc} ; Equip ${strip_color_codes(get_item(state, equip.item).sdesc)}\
${this.renderTrapReset(state, equip.uuid)}`
            }
            else {
                // Held
                return ` G ${equip.defunct} ${equip.item} ${equip.equip_limit} ; Hold ${strip_color_codes(get_item(state, equip.item).sdesc)}\
${this.renderTrapReset(state, equip.uuid)}`
            }
        }).join("\n").trimRight());
    }
    
    renderItemResets(state) {
        return autoline(state.item_resets.filter((i)=>(i.item_pointer===null)).map((reset)=>{
            if (reset.hidden) {
                return `H ${reset.defunct} ${reset.item} ${reset.item_limit} ${reset.room_container || "undefined"} ; ${strip_color_codes(get_item(state, reset.item).sdesc)} hidden in ${reset.room_container ? strip_color_codes(get_room(state, reset.room_container).sdesc) : "undefined"}\
${this.renderContainedItems(state, reset.uuid)}\
${this.renderTrapReset(state, reset.uuid)}`
            }
            else if (reset.buried) {
                return `U ${reset.defunct} ${reset.item} ${reset.item_limit} ${reset.room_container || "undefined"} ; ${strip_color_codes(get_item(state, reset.item).sdesc)} buried in ${reset.room_container ? strip_color_codes(get_room(state, reset.room_container).sdesc) : "undefined"}\
${this.renderContainedItems(state, reset.uuid)}\
${this.renderTrapReset(state, reset.uuid)}`
            }
            return `O ${reset.defunct} ${reset.item} ${reset.item_limit} ${reset.room_container || "undefined"} ; ${strip_color_codes(get_item(state, reset.item).sdesc)} in room ${reset.room_container ? strip_color_codes(get_room(state, reset.room_container).sdesc) : "undefined"}\
${this.renderContainedItems(state, reset.uuid)}\
${this.renderTrapReset(state, reset.uuid)}`
        }).join("\n").trimRight());
    }
    
    renderContainedItems(state, uuid) {
        console.log(state.item_resets, state.item_resets.filter((i)=>(i.item_pointer===uuid)));
        return autoline(state.item_resets.filter((i)=>(i.item_pointer===uuid)).map((reset)=>{
            return ` P ${reset.hidden ? 1 : 0} ${reset.item} ${reset.item_limit} ${reset.room_container || "undefined"} ; ${strip_color_codes(get_item(state, reset.item).sdesc)} in container ${reset.room_container ? strip_color_codes(get_item(state, reset.room_container).sdesc) : "undefined"}\
${this.renderTrapReset(state, reset.uuid)}`
        }).join("\n").trimRight());
    }
    
    renderDoorResets(state) {
        return autoline(state.door_resets.map((reset)=>{
            if (reset.last_door) {
                return `R ${reset.defunct} ${reset.room} ${reset.last_door} ; ${reset.room.sdesc} rearrange exits 0-${reset.last_door} randomly`
            }
            else {
                return `D ${reset.defunct} ${reset.room} ${reset.exit} ${reset.exit_state} ; ${strip_color_codes(get_room(state, reset.room).sdesc)}${this.renderTrapReset(state, reset.uuid)}`
            }
        }));
    }
    
    renderRoomResets(state) {
        return autoline(state.room_resets.map((reset)=>{
            return `B ${reset.defunct} ${reset.room} ${flags.ROOM_FLAGS.BIT_RESET_ROOM}|${reset.bit_type} ${reset.flag} ; ${strip_color_codes(get_room(state, reset.room).sdesc)}`
        }).join("\n"));
    }
    
    renderTrapReset(state, uuid) {
        return state.trap_resets.filter((i)=>(i.pointer===uuid)).map((trap_reset)=>(
            `\n T ${trap_reset.reset_interval} ${trap_reset.trap_type} ${trap_reset.trap_charges} ${trap_reset.trigger_1}|${trap_reset.trigger_2}`
        )).join("")
    }
    
    renderCoinResets(state, uuid) {
        return autoline(state.coin_resets.filter((i)=>(i.pointer===uuid)).map((reset)=>
            ` C ${reset.defunct} ${reset.coin_type} ${reset.dice_count} ${reset.dice_sides}`
        ).join("\n"));
    }
    
    renderSpecials(state) {
        return autoline(state.mob_specials.map((reset)=>{
            return `M ${reset.mob} ${reset.special}`
        }).join("\n"));
    }
    
    renderQuests(state) {
        return state.quest_log.map((quest)=>{
            return `${state.area.vnum} ${quest.qbit_start} ${quest.qbit_stop} ${quest.min_qbit} ${quest.max_qbit} ${quest.event_code ? quest.event_code.color_code : ""}${quest.qlog_text}`
        }).join("\n");
    }
}

export default AreaExporter;