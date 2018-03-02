var flags = require("./flags.js");
var models = require("./area_model.js");

// Model classes

class AreaExporter {
    renderArea(area) { // Area
        return `#AREA ${area.category.color_code}${area.name}~
#AUTHOR ${area.authors}~
${this.renderJusticeSystem(area)}
#RANGES
${area.min_recommended_level} ${area.max_recommended_level} ${area.min_enforced_level} ${area.max_enforced_level}
$
#RESETMSG ${area.reset_msg}~
#FLAGS
${area.wilderness_flag} ${area.reset_duration}
#ECONOMY ${area.economy_min} ${area.economy_max}
#WEATHER ${area.weather_humidity} ${area.weather_temperature}
${area.mining_material != null ? "#MINING " + area.mining_material.code : ""}
${area.logging_material != null ? "#LOGGING " + area.logging_material.code : ""}
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
#RESETS
${this.renderResets(area)}
S
#SHOPS
${this.renderShops(area)}
0
#REPAIRS
${this.renderRepairs(area)}
0
#SPECIALS
${this.renderSpecials(area)}
S
#$
`
    }
    
    renderJusticeSystem(area) { // Justice System
        if (area.justice_system == null) {
            return "";
        }
        return `#JUSTICE
CourtRoom ${area.justice_system.courtroom}
Dungeon ${area.justice_system.dungeon}
Judge ${area.justice_system.judge}
Guard ${area.justice_system.guard}
Crime CRIME_HIGH_MURDER ${area.justice_system.CRIME_HIGH_MURDER.punishment}
Crime CRIME_LOW_MURDER ${area.justice_system.CRIME_LOW_MURDER.punishment}
Crime CRIME_ASSAULT ${area.justice_system.CRIME_ASSAULT.punishment}
Crime CRIME_MUGGING ${area.justice_system.CRIME_MUGGING.punishment}
$`
    }
    
    renderRooms(area) { // Rooms
        return area.rooms.map((room)=>{
            return `#${room.vnum}
${room.sdesc}~
${room.ldesc}
~
${room.defunct} ${room.room_flags.map((flag)=>(flag.code)).join("|")||"0"} ${room.sector.code} ${room.teleport_delay||"0"} ${room.teleport_target||"0"} ${room.tunnel||"0"}
${this.renderExits(room.exits)}
${this.renderExtraDescriptions(room.extra_descriptions)}
${this.renderPrograms(room.programs)}
S
`}).join("\n")
    }
    
    renderExits(exits) { // Exits
        return exits.map((exit) => (`${exit.direction.code}
${exit.comment}~
${exit.somewhere_door_keyword}~
${exit.door_flags.map((flag)=>(flag.code)).join("|")||"0"} ${exit.door_key ? exit.door_key.vnum : "-1"} ${exit.target_vnum ? exit.target_vnum.vnum : "0"} ${exit.exit_size.code}`)).join("\n")
    }
    
    renderExtraDescriptions(extra_descriptions) {
        return extra_descriptions.map((ed)=>(`E
${ed.keywords}~
${ed.ldesc}
~`)).join("\n")
    }
    
    renderPrograms(programs) { // Programs
        if (!programs) {
            return ""
        }
        return programs.map(program=>`>${program.trigger.code} ${program.argument}~
${program.program}
~`).join("\n") + "\n|"
    }
    
    renderItems(area) {
        return area.items.map((item)=>`#${item.vnum}
${item.keywords}~
${item.sdesc}~
${item.ldesc}~
${item.action_description}~
${item.item_type}
${item.attributes.map((attribute)=>(attribute.code)).join("|")||0}
${item.wear_flags.map((flag)=>(flag.code)).join("|")||0}
${item.quality} ${item.material} ${item.condition} ${item.size}
${item.value0} ${item.value1} ${item.value2} ${item.value3} ${item.value4} ${item.value5}
${this.renderItemApplies(item.special_applies)}
${this.renderExtraDescriptions(item.extra_descriptions)}
${item.identify_message != null ? `I\n${item.identify_message}\n~` : "" }
${this.renderPrograms(item.programs)}`
        ).join("\n")
    }
    
    renderItemApplies(item_applies) {
        return item_applies.map(item_apply => `A ${this.apply_flag.code} ${this.parameter}`).join("\n");
    }
    
    renderMobs(area) {
        area.mobs.map((mob) => (
            `#${mob.vnum}
${mob.keywords}~
${mob.sdesc}~
${mob.ldesc}~
${mob.fulldesc}
~
S ${mob.level} ${mob.mob_class.code} ${mob.race.code} ${mob.sex.code} ${mob.position.code} ${mob.deity.code}
${mob.act_flags.map((flag)=>(flag.code)).join("|")}
${mob.unique ? `
${mob.affect_flags.map((flag)=>(flag.code)).join("|")||"0"}
${mob.virtual_armor_type.code} ${mob.virtual_armor_material.code}
${mob.alignment.code}
${mob.str} ${mob.int} ${mob.wis} ${mob.dex} ${mob.con} ${mob.cha} ${mob.lck}` : ""}
${mob.understood_languages.map((lang)=>(lang.code)).join("|")}
${mob.spoken_languages.map((lang)=>(lang.code)).join("|")}
${mob.unique ? `${mob.ris_resistant.map((ris)=>(ris.code)).join("|") || "RIS_NONE"} ${mob.ris_immune.map((ris)=>(ris.code)).join("|") || "RIS_NONE"} ${mob.ris_susceptible.map((ris)=>(ris.code)).join("|") || "RIS_NONE"}` : ""}
${this.renderTrainSkill(mob.can_train_skill)}
${this.renderTrainWeaponSkill(mob.can_train_weapon_skill)}
${this.renderTrainSpell(mob.can_train_spell)}
${this.renderTrainLevel(mob.can_train_level)}
${this.renderTrainStatistic(mob.can_train_statistic)}
${this.renderTrainFeat(mob.can_train_feat)}
${this.renderPrograms(mob.programs)}`
            )).join("\n");
    }
    
    renderTrainSkill(trains) {
        return trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.skill.code}~`))
    }
    
    renderTrainWeaponSkill(trains) {
        return trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.weapon_skill.code}~`))
    }
    
    renderTrainSpell(trains) {
        return trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.spell.code}~`))
    }
    
    renderTrainLevel(trains) {
        return trains.map((train)=>(`%${train.level} ${train.price_multiplier} level~`))
    }
    
    renderTrainStatistic(trains) {
        return trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.statistic.code}~`))
    }
    
    renderTrainFeat(trains) {
        return trains.map((train)=>(`%${train.level} ${train.price_multiplier} ${train.feat.code}~`))
    }
    
    renderShops(area) {
        return area.shops.map((shop)=>(`${shop.shopkeeper.vnum} ${shop.will_buy_1.code} ${shop.will_buy_2.code} ${shop.will_buy_3.code} ${shop.will_buy_4.code} ${shop.will_buy_5.code}
${shop.profit_buy} ${shop.profit_sell} ${shop.open_hour} ${shop.close_hour} ; ${shop.shopkeeper.sdesc}`))
    }
    
    renderRepairs(area) {
        return area.repairs.map((shop)=>(`${shop.shopkeeper.vnum} ${shop.will_repair_1.code} ${shop.will_repair_2.code} ${shop.repair_material.code}
${shop.profit_modifier} ${shop.repair.bits} ${shop.open_hour} ${shop.close_hour} ; ${shop.shopkeeper.sdesc}`))
    }
    
    renderResets(area) {
        return (this.renderMobResets(area) + this.renderItemResets(area) + this.renderDoorResets(area) + this.renderRoomResets(area))
    }
    
    renderMobResets(area) {
        return area.mobs.map(mob=>(
            mob.mob_resets.map(reset=>(
                `M ${reset.defunct} ${reset.mob.vnum} ${reset.mob_limit} ${reset.room ? reset.room.vnum : "undefined"} ; ${reset.mob.sdesc} in ${reset.room ? reset.room.sdesc : "undefined"}${this.renderEquipmentResets(reset.equipment, area)}${this.renderCoinResets(reset.coins)}`
                )
            )
        ))
    }
    
    renderEquipmentResets(equipment, area) {
        return equipment.map((equip)=>{
            if (equip.wear_loc) {
                // Equipped
                return ` E ${equip.defunct} ${equip.item.vnum} ${equip.equip_limit} ${equip.wear_loc.code} ; Equip ${equip.item.sdesc}${equip.trap_reset ? "\n"+equip.trap_reset.toString() : ""}`
            }
            else {
                // Held
                return ` G ${equip.defunct} ${equip.item.vnum} ${equip.equip_limit} ; Hold ${equip.item.sdesc}${equip.trap_reset ? "\n"+equip.trap_reset.toString() : ""}`
            }
        }).join("\n")
    }
    
    renderItemResets(area) {
        return area.item_resets.map((reset)=>{
            if (reset.room_container instanceof models.Item) {
                // Container (hidden is handled differently)
                return ` P ${reset.hidden ? 1 : 0} ${reset.item.vnum} ${reset.item_limit} ${reset.room_container ? reset.room_container.vnum : "undefined"} ; ${reset.item.sdesc} in container ${reset.room_container ? reset.room_container.sdesc : "undefined"}${reset.trap_reset ? "\n"+reset.trap_reset.toString() : ""}`
            }
            else if (reset.hidden) {
                return `H ${reset.defunct} ${reset.item.vnum} ${reset.item_limit} ${reset.room_container ? reset.room_container.vnum : "undefined"} ; ${reset.item.sdesc} hidden in ${reset.room_container ? reset.room_container.sdesc : "undefined"}${reset.trap_reset ? "\n"+reset.trap_reset.toString() : ""}`
            }
            else if (reset.buried) {
                return `U ${reset.defunct} ${reset.item.vnum} ${reset.item_limit} ${reset.room_container ? reset.room_container.vnum : "undefined"} ; ${reset.item.sdesc} buried in ${reset.room_container ? reset.room_container.sdesc : "undefined"}${reset.trap_reset ? "\n"+reset.trap_reset.toString() : ""}`
            }
            return `O ${reset.defunct} ${reset.item.vnum} ${reset.item_limit} ${reset.room_container ? reset.room_container.vnum : "undefined"} ; ${reset.item.sdesc} in room ${reset.room_container ? reset.room_container.sdesc : "undefined"}${reset.contents.length ? "\n"+reset.contents.map((c)=>(c.toString())).join("\n") : ""}${reset.trap_reset ? "\n"+reset.trap_reset.toString() : ""}`
        }).join("\n")
    }
    
    renderDoorResets(area) {
        return area.door_resets.map((reset)=>{
            if (reset.last_door) {
                return `R ${reset.defunct} ${reset.room.vnum} ${reset.last_door} ; ${reset.room.sdesc} rearrange exits 0-${reset.last_door} randomly`
            }
            else {
                return `D ${reset.defunct} ${reset.room.vnum} ${reset.exit.code} ${reset.exit_state.code} ; ${reset.room.sdesc}${reset.trap_reset ? "\n"+reset.trap_reset.toString() : ""}`
            }
        }).join("\n")
    }
    
    renderRoomResets(area) {
        return area.room_resets.map((reset)=>{
            return `B ${reset.defunct} ${reset.room.vnum} ${flags.ROOM_FLAGS.BIT_RESET_ROOM}|${reset.bit_type} ${reset.flag.code} ; ${reset.room.sdesc}`
        }).join("\n")
    }
    
    renderTrapReset(trap_reset) {
        return ` T ${trap_reset.reset_interval} ${trap_reset.trap_type.code} ${trap_reset.trap_charges} ${trap_reset.trigger_1.code}|${trap_reset.trigger_2.code}`
    }
    
    renderCoinResets(coin_reset) {
        return ` C ${coin_reset.defunct} ${coin_reset.coin_type} ${coin_reset.dice_count} ${coin_reset.dice_sides}`
    }
    
    renderSpecials(area) {
        return area.mob_specials.map((reset)=>{
            return `M ${reset.mob.vnum} ${reset.special.code}`
        }).join("\n")
    }
    
    renderQuests(area) {
        return area.quest_log.map((quest)=>{
            return `${quest.area.vnum} ${quest.qbit_start} ${quest.qbit_stop} ${quest.min_qbit} ${quest.max_qbit} ${quest.event_code.color_code}${quest.qlog_text}`
        }).join("\n")
    }
}

export default AreaExporter;