class Loader {
    constructor(are_string="") {
        // Accepts a string containing a .are file
        // Validates the file, then loads the contents into a new model
        this.area = new Area();
    }
    
    toString() {
        return this.area.toString();
    }
}

class Area {
    constructor() {
        this._error_prefix = "[Area]";
        this.name = null;
        this.category = null;
        this.valid_categories = {
            wilderness: {
                color_code: "{20}",
                sdesc: "Wilderness areas"
            },
            low_level: {
                color_code: "{30}",
                sdesc: "Low level dungeons/quest areas"
            },
            incomplete: {
                color_code: "{40}",
                sdesc: "Incomplete areas"
            },
            mid_level: {
                color_code: "{50}",
                sdesc: "Mid level dungeons/quest areas"
            },
            high_level: {
                color_code: "{60}",
                sdesc: "High level dungeons/quest areas"
            },
            other_planes: {
                color_code: "{70}",
                sdesc: "Areas from other planes"
            },
            underdark: {
                color_code: "{80}",
                sdesc: "Underdark Areas"
            },
            special: {
                color_code: "{90}",
                sdesc: "Special areas"
            },
            villages: {
                color_code: "{A0}",
                sdesc: "Villages and encampments"
            },
            cities: {
                color_code: "{B0}",
                sdesc: "Major cities and towns"
            },
            imms_rps: {
                color_code: "{C0}",
                sdesc: "Areas for imms and special rps"
            },
            guildhouses_academies: {
                color_code: "{D0}",
                sdesc: "Guildhouses and Academies"
            },
            organizations: {
                color_code: "{E0}",
                sdesc: "Organization HQ and side areas"
            },
            temples: {
                color_code: "{F0}",
                sdesc: "Temples"
            },
        };
        this.authors = [];
        this.justice_system = null;
        this.level_range = {
            min_recommended: 1,
            max_recommended: 65,
            min_enforced: 0,
            max_enforced: 65
        };
        this.reset_msg = null;
        this.wilderness_flag = 0;
        this.reset_duration = 0;
        this.economy = {
            min: 5000,
            max: 5000
        };
        this.weather = {
            humidity: 5,
            temperature: 5
        };
        this.mining_material = null;
        this.valid_mining_materials = {
            MATERIAL_SILVER: {
                code: "MATERIAL_SILVER",
                sdesc: "Silver"
            },
            MATERIAL_GOLD: {
                code: "MATERIAL_GOLD",
                sdesc: "Gold"
            },
            MATERIAL_LEAD: {
                code: "MATERIAL_LEAD",
                sdesc: "Lead"
            },
            MATERIAL_COPPER: {
                code: "MATERIAL_COPPER",
                sdesc: "Copper"
            },
            MATERIAL_PLATINUM: {
                code: "MATERIAL_PLATINUM",
                sdesc: "Platinum"
            },
            MATERIAL_TITANIUM: {
                code: "MATERIAL_TITANIUM",
                sdesc: "Titanium"
            },
            MATERIAL_TIN: {
                code: "MATERIAL_TIN",
                sdesc: "Tin"
            },
            MATERIAL_IRON: {
                code: "MATERIAL_IRON",
                sdesc: "Iron"
            },
            MATERIAL_MITHRIL: {
                code: "MATERIAL_MITHRIL",
                sdesc: "Mithril"
            },
            MATERIAL_ADAMANTIUM: {
                code: "MATERIAL_ADAMANTIUM",
                sdesc: "Adamantium"
            }

        }
        this.logging_material = null;
        this.valid_logging_materials = {
            MATERIAL_WOOD: {
                code: "MATERIAL_WOOD",
                sdesc: "Wood"
            },
            MATERIAL_HARDWOOD: {
                code: "MATERIAL_HARDWOOD",
                sdesc: "Hardwood"
            },
            MATERIAL_SOFTWOOD: {
                code: "MATERIAL_SOFTWOOD",
                sdesc: "Softwood"
            },
            MATERIAL_OAK: {
                code: "MATERIAL_OAK",
                sdesc: "Oak"
            },
            MATERIAL_YEW: {
                code: "MATERIAL_YEW",
                sdesc: "Yew"
            },
            MATERIAL_EBONY: {
                code: "MATERIAL_EBONY",
                sdesc: "Ebony"
            },
            MATERIAL_DARKWOOD: {
                code: "MATERIAL_DARKWOOD",
                sdesc: "Darkwood"
            }
        }
    }
    
    validate() {
        let errors = []
        // Area name
        if (this.name == null) {
            errors.push(`${this._error_prefix} No area name defined`);
        }
        // Category
        if (this.category == null) {
            errors.push(`${this._error_prefix} No area category defined`);
        }
        // Authors list
        if (!this.authors.length) {
            errors.push(`${this._error_prefix} No authors defined`);
        }
        else if (this.authors.join(" ").length >= 36) {
            errors.push(`${this._error_prefix} Authors list too long (max 36 characters)`);
        }
        else {
            for (let i = 0; i < this.authors.length; i++) {
                if (this.authors[i].indexOf(" ") != -1) {
                    errors.push(`${this._error_prefix} Spaces are not permitted for author names ("${this.authors[i]}")`);
                }
            }
        }
        // Justice system
        if (this.justice_system != null) {
            let justice_system_errors = this.justice_system.validate()
            if (justice_system_errors.length) {
                errors.push(justice_system_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        }
        // Level range
        if (!(0 < this.level_range.min_recommended <= 65)) {
            errors.push(`${this._error_prefix} Minimum recommended level is invalid`);
        }
        if (!(0 < this.level_range.max_recommended <= 65)) {
            errors.push(`${this._error_prefix} Maximum recommended level is invalid`);
        }
        if (!(0 < this.level_range.min_enforced <= 65)) {
            errors.push(`${this._error_prefix} Minimum enforced level is invalid`);
        }
        if (!(0 < this.level_range.max_enforced <= 65)) {
            errors.push(`${this._error_prefix} Maximum enforced level is invalid`);
        }
        // Reset message
        if (this.reset_msg == null) {
            errors.push(`${this._error_prefix} No reset message defined`);
        }
        // Reset duration
        if (this.reset_duration == null) {
            errors.push(`${this._error_prefix} No reset duration defined`);
        }
        else if (this.reset_duration < -1) {
            errors.push(`${this._error_prefix} Invalid reset duration`);
        }
        // Flags
        if (this.wilderness_flag != 0) {
            errors.push(`${this._error_prefix} Wilderness flag should be 0 for most areas`);
        }
        // Economy
        if (this.economy.min < 0) {
            errors.push(`${this._error_prefix} Invalid economy minimum value`);
        }
        if (this.economy.max < 0) {
            errors.push(`${this._error_prefix} Invalid economy maximum value`);
        }
        // Weather
        if (!(1 <= this.weather.humidity <= 10)) {
            errors.push(`${this._error_prefix} Invalid weather humidity`);
        }
        if (!(1 <= this.weather.temperature <= 10)) {
            errors.push(`${this._error_prefix} Invalid weather temperature`);
        }
        // Mining materials
        if (this.mining_material != null && this.valid_mining_materials.indexOf(this.mining_material) != -1) {
            errors.push(`${this._error_prefix} Invalid mining material`);
        }
        // Logging materials
        if (this.logging_material != null && this.valid_logging_materials.indexOf(this.logging_material) != -1) {
            errors.push(`${this._error_prefix} Invalid logging material`);
        }
        
        return errors
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return "Invalid Area\n" + errors.join("\n");
        }
        
        return `#AREA ${this.name}~
#AUTHOR ${this.authors.join(" ")}~
#RANGES
${this.level_range.min_recommended} ${this.level_range.max_recommended} ${this.level_range.min_enforced} ${this.level_range.max_enforced}
$
#RESETMSG ${this.reset_msg}~
#FLAGS
${this.wilderness_flag} ${this.reset_duration}
#ECONOMY ${this.economy.min} ${this.economy.max}
#WEATHER ${this.weather.humidity} ${this.weather.temperature}
${this.justice_system != null ? this.justice_system.toString() : ""}
${this.mining_material != null ? "#MINING " + this.mining_material.code : ""}
${this.logging_material != null ? "#LOGGING " + this.logging_material.code : ""}
#$
`;
    }
}

class JusticeSystem {
    constructor() {
        this._error_prefix = "[JusticeSystem]"
        this.courtroom = null;
        this.dungeon = null;
        this.judge = null;
        this.guard = null;
        this.crimes = {
            CRIME_HIGH_MURDER: {
                code: "CRIME_HIGH_MURDER",
                sdesc: "High Murder",
                ldesc: "Murdering another PC",
                punishment: null
            },
            CRIME_LOW_MURDER: {
                code: "CRIME_LOW_MURDER",
                sdesc: "Low Murder",
                ldesc: "Killing a mob",
                punishment: null
            },
            CRIME_ASSAULT: {
                code: "CRIME_ASSAULT",
                sdesc: "Assault",
                ldesc: "Attacking (but not killing) a PC/mob",
                punishment: null
            },
            CRIME_MUGGING: {
                code: "CRIME_MUGGING",
                sdesc: "Mugging",
                ldesc: "A failed pickpocket/steal attempt",
                punishment: null
            }
        }
        this.valid_punishments = {
            PUNISHMENT_NOT_ENFORCED: {
                code: "PUNISHMENT_NOT_ENFORCED",
                sdesc: "Not enforced",
                ldesc: "No punishment"
            },
            PUNISHMENT_DEATH: {
                code: "PUNISHMENT_DEATH",
                sdesc: "Death",
                ldesc: "Death"
            },
            PUNISHMENT_RANDOM_ITEM: {
                code: "PUNISHMENT_RANDOM_ITEM",
                sdesc: "Random Item",
                ldesc: "Random item is confiscated"
            },
            PUNISHMENT_SEVER: {
                code: "PUNISHMENT_SEVER",
                sdesc: "Sever",
                ldesc: "Random limb is severed"
            },
            PUNISHMENT_JAIL: {
                code: "PUNISHMENT_JAIL",
                sdesc: "Jail",
                ldesc: "1 hour real time in the dungeon room"
            },
            PUNISHMENT_EXILE: {
                code: "PUNISHMENT_EXILE",
                sdesc: "Exile (NOT CODED)",
                ldesc: "Not coded yet!"
            }
        }
    }
    
    validate() {
        let errors = []
        
        // Check courtroom
        if (this.courtroom == null) {
            errors.push(`${this._error_prefix} No courtroom defined`);
        }
        else {
            let courtroom_errors = this.courtroom.validate()
            if (courtroom_errors.length) {
                errors.push(courtroom_errors.map((error) => `${this._error_prefix} ${error}`))
            }
        }
        
        // Check dungeon
        if (this.dungeon == null) {
            errors.push(`${this._error_prefix} No dungeon defined`);
        }
        else {
            let dungeon_errors = this.dungeon.validate()
            if (dungeon_errors.length) {
                errors.push(dungeon_errors.map((error) => `${this._error_prefix} ${error}`))
            }
        }
        
        // Check judge
        if (this.judge == null) {
            errors.push(`${this._error_prefix} No judge defined`);
        }
        else {
            let judge_errors = this.judge.validate()
            if (judge_errors.length) {
                errors.push(judge_errors.map((error) => `${this._error_prefix} ${error}`))
            }
        }
        
        // Check guard
        if (this.guard == null) {
            errors.push(`${this._error_prefix} No guard defined`);
        }
        else {
            let guard_errors = this.guard.validate()
            if (guard_errors.length) {
                errors.push(guard_errors.map((error) => `${this._error_prefix} ${error}`))
            }
        }
        
        // Check crimes
        for (let c in this.crimes) {
            let crime = this.crimes[c]
            if (crime.punishment == null) {
                errors.push(`${this._error_prefix} Crime "${crime.sdesc}" has no punishment defined`);
            }
            else if (crime.punishment == this.valid_punishments.PUNISHMENT_EXILE) {
                errors.push(`${this._error_prefix} Crime "${crime.sdesc}" has uncoded punishment "Exile"`);
            }
        }
        
        return errors
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return "Invalid JusticeSystem: \n" + errors.join("\n")
        }
        return `#JUSTICE
CourtRoom ${this.courtroom.vnum}
Dungeon ${this.dungeon.vnum}
Judge ${this.judge.vnum}
Guard ${this.guard.vnum}
Crime CRIME_HIGH_MURDER ${this.crimes.CRIME_HIGH_MURDER.punishment.code}
Crime CRIME_LOW_MURDER ${this.crimes.CRIME_LOW_MURDER.punishment.code}
Crime CRIME_ASSAULT ${this.crimes.CRIME_ASSAULT.punishment.code}
Crime CRIME_MUGGING ${this.crimes.CRIME_MUGGING.punishment.code}
$`
    }
}

class Mob {
    constructor() {
        
    }
    
    validate() {
        
    }
    
    toString() {
        
    }
}

class GameObject {
    constructor() {
        
    }
    
    validate() {
        
    }
    
    toString() {
        
    }
}

class Room {
    constructor() {
        this._error_prefix = "[Room]"
        this.vnum = null;
        this.sdesc = null;
        this.ldesc = null;
        this.flags = {
            defunct: 0,
            room_flags: [],
            sector: null,
            teleport_delay: 0,
            teleport_target: 0,
            tunnel: 0
        }
        this.exits = []
        this.valid_room_flags = {
            ROOM_DARK: {
                code: "ROOM_DARK",
                sdesc: "ROOM_DARK",
                ldesc: "Light is needed in room"
            },
            ROOM_DEATH: {
                code: "ROOM_DEATH",
                sdesc: "ROOM_DEATH",
                ldesc: "Do not use"
            },
            ROOM_NO_MOB: {
                code: "ROOM_NO_MOB",
                sdesc: "ROOM_NO_MOB",
                ldesc: "Mobs cannot enter room"
            },
            ROOM_INDOORS: {
                code: "ROOM_INDOORS",
                sdesc: "ROOM_INDOORS",
                ldesc: "Not affected by weather"
            },
            ROOM_LAWFUL: {
                code: "ROOM_LAWFUL",
                sdesc: "ROOM_LAWFUL",
                ldesc: "Good aligned chars only"
            },
            ROOM_NEUTRAL: {
                code: "ROOM_NEUTRAL",
                sdesc: "ROOM_NEUTRAL",
                ldesc: "Neutral aligned characters only"
            },
            ROOM_CHAOTIC: {
                code: "ROOM_CHAOTIC",
                sdesc: "ROOM_CHAOTIC",
                ldesc: "Evil aligned chars only"
            },
            ROOM_NO_MAGIC: {
                code: "ROOM_NO_MAGIC",
                sdesc: "ROOM_NO_MAGIC",
                ldesc: "Players cannot cast spells"
            },
            ROOM_NO_TUNNEL: {
                code: "ROOM_NO_TUNNEL",
                sdesc: "ROOM_NO_TUNNEL",
                ldesc: "Do not use"
            },
            ROOM_PRIVATE: {
                code: "ROOM_PRIVATE",
                sdesc: "ROOM_PRIVATE",
                ldesc: "Only 2 players may enter room"
            },
            ROOM_SAFE: {
                code: "ROOM_SAFE",
                sdesc: "ROOM_SAFE",
                ldesc: "No fighting in this room"
            },
            ROOM_SOLITARY: {
                code: "ROOM_SOLITARY",
                sdesc: "ROOM_SOLITARY",
                ldesc: "Only 1 player may enter room"
            },
            ROOM_PET_SHOP: {
                code: "ROOM_PET_SHOP",
                sdesc: "ROOM_PET_SHOP",
                ldesc: "Room is a petshop"
            },
            ROOM_NO_RECALL: {
                code: "ROOM_NO_RECALL",
                sdesc: "ROOM_NO_RECALL",
                ldesc: "Players cannot recall"
            },
            ROOM_DONATION: {
                code: "ROOM_DONATION",
                sdesc: "ROOM_DONATION",
                ldesc: "Prevents players from using 'get all'"
            },
            ROOM_NODROPALL: {
                code: "ROOM_NODROPALL",
                sdesc: "ROOM_NODROPALL",
                ldesc: "Stops players doing 'drop all', ideal for public squares etc"
            },
            ROOM_SILENCE: {
                code: "ROOM_SILENCE",
                sdesc: "ROOM_SILENCE",
                ldesc: "Players may not speak or emote"
            },
            ROOM_LOGSPEECH: {
                code: "ROOM_LOGSPEECH",
                sdesc: "ROOM_LOGSPEECH",
                ldesc: "Do not use without builder admin consultation"
            },
            ROOM_NODROP: {
                code: "ROOM_NODROP",
                sdesc: "ROOM_NODROP",
                ldesc: "Players may not drop stuff"
            },
            ROOM_CLANSTOREROOM: {
                code: "ROOM_CLANSTOREROOM",
                sdesc: "ROOM_CLANSTOREROOM",
                ldesc: "Used for guild storerooms. Ask a builders admin first."
            },
            ROOM_NO_SUMMON: {
                code: "ROOM_NO_SUMMON",
                sdesc: "ROOM_NO_SUMMON",
                ldesc: "Player cannot be summoned from room"
            },
            ROOM_NO_ASTRAL: {
                code: "ROOM_NO_ASTRAL",
                sdesc: "ROOM_NO_ASTRAL",
                ldesc: "Cannot gate or magically transport to or from this room"
            },
            ROOM_TELEPORT: {
                code: "ROOM_TELEPORT",
                sdesc: "ROOM_TELEPORT",
                ldesc: "Will teleport the PC after the delay set in value3 to the vnum set in value4"
            },
            ROOM_TELESHOWDESC: {
                code: "ROOM_TELESHOWDESC",
                sdesc: "ROOM_TELESHOWDESC",
                ldesc: "When teleported it shows the PC's the description of the new room"
            },
            ROOM_NOFLOOR: {
                code: "ROOM_NOFLOOR",
                sdesc: "ROOM_NOFLOOR",
                ldesc: "Players and objects fall to (down) room"
            },
            ROOM_PROTOTYPE: {
                code: "ROOM_PROTOTYPE",
                sdesc: "ROOM_PROTOTYPE",
                ldesc: "Used by OLC. Do not use."
            },
            ROOM_INN: {
                code: "ROOM_INN",
                sdesc: "ROOM_INN",
                ldesc: "Allows PC's to heal at a faster rate"
            }
        }
        this.valid_sector_flags = {
            SECT_INSIDE: {
                code:"SECT_INSIDE",
                sdesc: "SECT_INSIDE",
                ldesc: "(0) inside a building or structure etc. It is always lit"
            },
            SECT_CITY: {
                code:"SECT_CITY",
                sdesc: "SECT_CITY",
                ldesc: "(1) typical city street, it is always lit"
            },
            SECT_FIELD: {
                code:"SECT_FIELD",
                sdesc: "SECT_FIELD",
                ldesc: "p (2) a grassy field"
            },
            SECT_FOREST: {
                code:"SECT_FOREST",
                sdesc: "SECT_FOREST",
                ldesc: "F (3) heavily wooded forest"
            },
            SECT_HILLS: {
                code:"SECT_HILLS",
                sdesc: "SECT_HILLS",
                ldesc: "h (4) rolling hills"
            },
            SECT_MOUNTAIN: {
                code:"SECT_MOUNTAIN",
                sdesc: "SECT_MOUNTAIN",
                ldesc: "^ (5) mountainous terrain"
            },
            SECT_WATER_SWIM: {
                code:"SECT_WATER_SWIM",
                sdesc: "SECT_WATER_SWIM",
                ldesc: "(6) calm water"
            },
            SECT_WATER_NOSWIM: {
                code:"SECT_WATER_NOSWIM",
                sdesc: "SECT_WATER_NOSWIM",
                ldesc: "w (7) swimming skill required"
            },
            SECT_UNDERWATER: {
                code:"SECT_UNDERWATER",
                sdesc: "SECT_UNDERWATER",
                ldesc: "(8) Water-breathing required. Character swims."
            },
            SECT_AIR: {
                code:"SECT_AIR",
                sdesc: "SECT_AIR",
                ldesc: "(9) flying required"
            },
            SECT_DESERT: {
                code:"SECT_DESERT",
                sdesc: "SECT_DESERT",
                ldesc: "d (10) dry sandy terrain"
            },
            SECT_DUNNO: {
                code:"SECT_DUNNO",
                sdesc: "SECT_DUNNO",
                ldesc: "Do not use. Reserved for future use."
            },
            SECT_OCEANFLOOR: {
                code:"SECT_OCEANFLOOR",
                sdesc: "SECT_OCEANFLOOR",
                ldesc: "(12) Underwater. Breathwater is required. Character can WALK."
            },
            SECT_UNDERGROUND: {
                code:"SECT_UNDERGROUND",
                sdesc: "SECT_UNDERGROUND",
                ldesc: "(13) underground structure"
            },
            SECT_WOODS: {
                code:"SECT_WOODS",
                sdesc: "SECT_WOODS",
                ldesc: "f (14) lightly wooded terrain"
            },
            SECT_ROAD: {
                code:"SECT_ROAD",
                sdesc: "SECT_ROAD",
                ldesc: "\\ (15) roads outside of cites"
            },
            SECT_TUNDRA: {
                code:"SECT_TUNDRA",
                sdesc: "SECT_TUNDRA",
                ldesc: "t (16) cold scrub land/frozen wastes"
            },
            SECT_BARREN: {
                code:"SECT_BARREN",
                sdesc: "SECT_BARREN",
                ldesc: "b (17) barren lands/moors/rocky, treeless plains"
            },
            SECT_ABYSS: {
                code:"SECT_ABYSS",
                sdesc: "SECT_ABYSS",
                ldesc: "V (19) an abyss which requires flight to cross (UNDERDARK)"
            },
            SECT_FUNGUSFOREST: {
                code:"SECT_FUNGUSFOREST",
                sdesc: "SECT_FUNGUSFOREST",
                ldesc: "F (20) a forest which blocks exits randomly (UNDERDARK)"
            },
            SECT_CHASM: {
                code:"SECT_CHASM",
                sdesc: "SECT_CHASM",
                ldesc: "x (21) must pass climb check or be injured (UNDERDARK)"
            },
            SECT_CAVE: {
                code:"SECT_CAVE",
                sdesc: "SECT_CAVE",
                ldesc: "C (22) speaks for itself (UNDERDARK)"
            },
            SECT_GUARDEDTUNNEL: {
                code:"SECT_GUARDEDTUNNEL",
                sdesc: "SECT_GUARDEDTUNNEL",
                ldesc: "# (23) Used to confine wandering patrols (UNDERDARK)"
            },
            SECT_UNDERGROUND_SEA: {
                code:"SECT_UNDERGROUND_SEA",
                sdesc: "SECT_UNDERGROUND_SEA",
                ldesc: "W (25) must swim (UNDERDARK)"
            },
            SECT_UNDERGROUND_RIVER: {
                code:"SECT_UNDERGROUND_RIVER",
                sdesc: "SECT_UNDERGROUND_RIVER",
                ldesc: "r (26) must swim, may get caught in current (UNDERDARK)"
            },
            SECT_SIDE_TUNNEL: {
                code:"SECT_SIDE_TUNNEL",
                sdesc: "SECT_SIDE_TUNNEL",
                ldesc: "o (27) regular terrain (UNDERDARK)"
            },
            SECT_VOLCANO: {
                code:"SECT_VOLCANO",
                sdesc: "SECT_VOLCANO",
                ldesc: "^ (28) burns PC (UNDERDARK)"
            },
            SECT_SULPHUR: {
                code:"SECT_SULPHUR",
                sdesc: "SECT_SULPHUR",
                ldesc: "= (29) burns PC (UNDERDARK)"
            }
        }
    }
    
    validate() {
        let errors = []
        if (this.vnum == null) {
            errors.push(`${this._error_prefix} No vnum defined`);
        }
        if (this.sdesc == null) {
            errors.push(`${this._error_prefix} No room name defined`);
        }
        if (this.ldesc == null) {
            errors.push(`${this._error_prefix} No description defined`);
        }
        if (this.flags.sector == null) {
            errors.push(`${this._error_prefix} No sector defined`);
        }
        else if (this.valid_sector_flags.indexOf(this.flags.sector) == -1) {
            errors.push(`${this._error_prefix} Invalid sector`);
        }
        for (let i = 0; i < this.flags.room_flags.length; i++) {
            if (this.valid_room_flags.indexOf(this.flags.room_flags[i]) == -1) {
                errors.push(`${this._error_prefix} Invalid room flag`);
            }
            else if (["ROOM_DEATH", "ROOM_NO_TUNNEL", "ROOM_PROTOTYPE"].indexOf(this.flags.room_flags[i].code) == -1) {
                errors.push(`${this._error_prefix} Room flag ${this.flags.room_flags[i].code} should not be used`);
            }
        }
        for (let i = 0; i < this.exits.length; i++) {
            let exit_errors = this.exits[i].validate()
            if (exit_errors.length) {
                errors.push(exit_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        }
        return errors
    }
    
    toString() {
        return `${this.vnum}
${this.sdesc}~
${this.ldesc}
~
${this.flags.defunct} ${this.flags.room_flags.join("|")||"0"} ${this.flags.sector} ${this.flags.teleport_delay} ${this.flags.teleport_target} ${this.flags.tunnel}
${this.exits.map((exit) => (exit.toString())).join("\n")}
S
`;
    }
}

class Exit {
    constructor() {
        this.direction = null;
        this.comment = "";
        this.somewhere_keyword = null;
        this.door_keyword = "";
        this.flags = {
            door_flags: [],
            door_key: -1,
            target_vnum: null,
            exit_size: 0
        }
        this.valid_directions = {
            DDIR_EAST: {
                code: "DDIR_EAST",
                sdesc: "East"
            },
            DDIR_WEST: {
                code: "DDIR_WEST",
                sdesc: "West"
            },
            DDIR_NORTH: {
                code: "DDIR_NORTH",
                sdesc: "North"
            },
            DDIR_SOUTH: {
                code: "DDIR_SOUTH",
                sdesc: "South"
            },
            DDIR_UP: {
                code: "DDIR_UP",
                sdesc: "Up"
            },
            DDIR_DOWN: {
                code: "DDIR_DOWN",
                sdesc: "Down"
            },
            DDIR_SOMEWHERE: {
                code: "DDIR_SOMEWHERE",
                sdesc: "Somewhere"
            },
        }
        this.valid_door_flags = {
            EX_ISDOOR: {
                code: "EX_ISDOOR",
                sdesc: "EX_ISDOOR",
                ldesc: "exit has a door"
            },
            EX_CLOSED: {
                code: "EX_CLOSED",
                sdesc: "EX_CLOSED",
                ldesc: "exit with door is closed"
            },
            EX_LOCKED: {
                code: "EX_LOCKED",
                sdesc: "EX_LOCKED",
                ldesc: "exit with door is locked"
            },
            EX_SECRET: {
                code: "EX_SECRET",
                sdesc: "EX_SECRET",
                ldesc: "cannot be seen or opened"
            },
            EX_PICKPROOF: {
                code: "EX_PICKPROOF",
                sdesc: "EX_PICKPROOF",
                ldesc: "door cannot be picked"
            },
            EX_FLY: {
                code: "EX_FLY",
                sdesc: "EX_FLY",
                ldesc: "player must fly to pass the door"
            },
            EX_CLIMB: {
                code: "EX_CLIMB",
                sdesc: "EX_CLIMB",
                ldesc: "players must climb to pass"
            },
            EX_DIG: {
                code: "EX_DIG",
                sdesc: "EX_DIG",
                ldesc: "players must dig the exit"
            },
            EX_NOPASSDOOR: {
                code: "EX_NOPASSDOOR",
                sdesc: "EX_NOPASSDOOR",
                ldesc: "passdoor doesn't work"
            },
            EX_HIDDEN: {
                code: "EX_HIDDEN",
                sdesc: "EX_HIDDEN",
                ldesc: "cannot be seen but can open"
            },
            EX_PASSAGE: {
                code: "EX_PASSAGE",
                sdesc: "EX_PASSAGE",
                ldesc: "passage opened by a mob program"
            },
            EX_PORTAL: {
                code: "EX_PORTAL",
                sdesc: "EX_PORTAL",
                ldesc: "spells that create portals"
            },
            EX_XCLIMB: {
                code: "EX_XCLIMB",
                sdesc: "EX_XCLIMB",
                ldesc: "typing 'climb' will scoot you out this exit"
            },
            EX_XENTER: {
                code: "EX_XENTER",
                sdesc: "EX_XENTER",
                ldesc: "typing 'enter' will move a PC out of this exit"
            },
            EX_XLEAVE: {
                code: "EX_XLEAVE",
                sdesc: "EX_XLEAVE",
                ldesc: "typing 'leave' will send a PC out this exit"
            },
            EX_XAUTO: {
                code: "EX_XAUTO",
                sdesc: "EX_XAUTO",
                ldesc: "players will 'automatically' use this exit. This is required for somewhere exits with keyword entrances."
            },
            EX_XSEARCHABLE: {
                code: "EX_XSEARCHABLE",
                sdesc: "EX_XSEARCHABLE",
                ldesc: "door can be found in standard search"
            },
            EX_BASHED: {
                code: "EX_BASHED",
                sdesc: "EX_BASHED",
                ldesc: "exit has been bashed"
            },
            EX_BASHPROOF: {
                code: "EX_BASHPROOF",
                sdesc: "EX_BASHPROOF",
                ldesc: "exit cannot be bashed"
            },
            EX_NOMOB: {
                code: "EX_NOMOB",
                sdesc: "EX_NOMOB",
                ldesc: "mobiles cannot pass"
            },
            EX_WINDOW: {
                code: "EX_WINDOW",
                sdesc: "EX_WINDOW",
                ldesc: "players can look even thru closed door"
            },
            EX_XLOOK: {
                code: "EX_XLOOK",
                sdesc: "EX_XLOOK",
                ldesc: "players can look through the exit"
            }
        }
        this.valid_exit_sizes = {
            EXIT_SIZE_ANY: {
                code: 0,
                sdesc: "EXIT_SIZE_ANY",
            },
            EXIT_SIZE_ANY_1: {
                code: 1,
                sdesc: "EXIT_SIZE_ANY_1",
            },
            EXIT_SIZE_TINY: {
                code: 1000,
                sdesc: "EXIT_SIZE_TINY",
            },
            EXIT_SIZE_SMALL: {
                code: 1001,
                sdesc: "EXIT_SIZE_SMALL",
            },
            EXIT_SIZE_MEDIUM: {
                code: 1002,
                sdesc: "EXIT_SIZE_MEDIUM",
            },
            EXIT_SIZE_NORMAL: {
                code: 1002,
                sdesc: "EXIT_SIZE_NORMAL",
            },
            EXIT_SIZE_LARGE: {
                code: 1003,
                sdesc: "EXIT_SIZE_LARGE",
            },
            EXIT_SIZE_HUGE: {
                code: 1004,
                sdesc: "EXIT_SIZE_HUGE",
            },
            EXIT_SIZE_GIANT: {
                code: 1005,
                sdesc: "EXIT_SIZE_GIANT",
            }
        }
    }
    
    validate() {
        let errors = [];
        if (this.direction == null) {
            errors.push(`${this._error_prefix} No direction defined`);
        }
        if (this.valid_directions.map((direction) => (direction.code)).indexOf(this.direction) == -1) {
            errors.push(`${this._error_prefix} Invalid direction`);
        }
        if (this.target_vnum == null) {
            errors.push(`${this._error_prefix} No target vnum defined`);
        }
        if (this.direction == this.valid_directions.DDIR_SOMEWHERE && this.somewhere_keyword == null) {
            errors.push(`${this._error_prefix} Somewhere exit defined, but no exit keyword specified`);
        }
        if (this.direction == this.valid_directions.DDIR_SOMEWHERE && this.flags.door_flags.indexOf(this.valid_door_flags.EX_XAUTO) == -1) {
            errors.push(`${this._error_prefix} Somewhere exit defined, but EX_XAUTO flag not set`);
        }
        if (this.door_keyword != "" && this.flags.door_flags.indexOf(this.valid_door_flags.EX_ISDOOR) == -1) {
            errors.push(`${this._error_prefix} Door keywords defined, but EX_ISDOOR flag not set`);
        }
        for (let i = 0; i < this.flags.door_flags.length; i++) {
            if (this.valid_door_flags.indexOf(this.flags.door_flags[i]) == -1) {
                errors.push(`${this._error_prefix} Invalid flag`);
            }
        }
        if (this.valid_exit_sizes.map((size) => (size.code)).indexOf(this.flags.exit_size) == -1) {
            errors.push(`${this._error_prefix} Invalid exit size set`);
        }
        if (this.valid_exit_sizes.map((size) => (size.code)).indexOf(this.flags.exit_size) == -1) {
            errors.push(`${this._error_prefix} Invalid exit size set`);
        }
        return errors
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `${this.direction.code}
${this.comment}~
${this.direction == this.valid_directions.DDIR_SOMEWHERE ? this.somewhere_keyword : this.door_keyword}~
${this.flags.door_flags.map((flag)=>(flag.code)).join("|")||"0"} ${this.flags.door_key} ${this.flags.target_vnum} ${this.flags.exit_size}`;
    }
}
//export default Loader;

// DEBUG
function testLoader() {
    let loader = new Loader();
    console.log(loader.toString())
    
    loader.area.name = "Calimport"
    loader.area.category = loader.area.valid_categories.cities
    loader.area.reset_msg = "{A0}A hot wind blows off the desert."
    loader.area.authors.push("Grenwyn")
    loader.area.economy.min = 100000
    loader.area.economy.max = 100000
    loader.area.weather.humidity = 1
    loader.area.weather.temperature = 8
    // loader.area.authors.push("Lord Greywether") // should fail
    
    loader.area.justice_system = new JusticeSystem();
    loader.area.justice_system.courtroom = {
        vnum: "QQ01",
        validate: () => (true)
    }
    loader.area.justice_system.judge = {
        vnum: "QQ02",
        validate: () => (true)
    }
    loader.area.justice_system.dungeon = {
        vnum: "QQ03",
        validate: () => (true)
    }
    loader.area.justice_system.guard = {
        vnum: "QQ04",
        validate: () => (true)
    }
    loader.area.justice_system.crimes.CRIME_HIGH_MURDER.punishment = loader.area.justice_system.valid_punishments.PUNISHMENT_DEATH
    loader.area.justice_system.crimes.CRIME_LOW_MURDER.punishment = loader.area.justice_system.valid_punishments.PUNISHMENT_SEVER
    loader.area.justice_system.crimes.CRIME_ASSAULT.punishment = loader.area.justice_system.valid_punishments.PUNISHMENT_JAIL
    loader.area.justice_system.crimes.CRIME_MUGGING.punishment = loader.area.justice_system.valid_punishments.PUNISHMENT_RANDOM_ITEM
    
    console.log(loader.toString())
}

testLoader();