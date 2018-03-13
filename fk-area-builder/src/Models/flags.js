// Flag tables

class Flag {
	constructor(obj) {
        //super(obj);
    	Object.assign(this, obj);
    }
    toString() {
        return this.code
    }
}

const AREA_CATEGORIES = {
    WILDERNESS: new Flag({
        code: "WILDERNESS",
        color_code: "{20}",
        sdesc: "Wilderness areas"
    }),
    LOW_LEVEL: new Flag({
        code: "LOW_LEVEL",
        color_code: "{30}",
        sdesc: "Low level dungeons/quest areas"
    }),
    INCOMPLETE: new Flag({
        code: "INCOMPLETE",
        color_code: "{40}",
        sdesc: "Incomplete areas"
    }),
    MID_LEVEL: new Flag({
        code: "MID_LEVEL",
        color_code: "{50}",
        sdesc: "Mid level dungeons/quest areas"
    }),
    HIGH_LEVEL: new Flag({
        code: "HIGH_LEVEL",
        color_code: "{60}",
        sdesc: "High level dungeons/quest areas"
    }),
    OTHER_PLANES: new Flag({
        code: "OTHER_PLANES",
        color_code: "{70}",
        sdesc: "Areas from other planes"
    }),
    UNDERDARK: new Flag({
        code: "UNDERDARK",
        color_code: "{80}",
        sdesc: "Underdark Areas"
    }),
    SPECIAL: new Flag({
        code: "SPECIAL",
        color_code: "{90}",
        sdesc: "Special areas"
    }),
    VILLAGES: new Flag({
        code: "VILLAGES",
        color_code: "{A0}",
        sdesc: "Villages and encampments"
    }),
    CITIES: new Flag({
        code: "CITIES",
        color_code: "{B0}",
        sdesc: "Major cities and towns"
    }),
    IMMS_RPS: new Flag({
        code: "IMMS_RPS",
        color_code: "{C0}",
        sdesc: "Areas for imms and special rps"
    }),
    GUILDHOUSES_ACADEMIES: new Flag({
        code: "GUILDHOUSES_ACADEMIES",
        color_code: "{D0}",
        sdesc: "Guildhouses and Academies"
    }),
    ORGANIZATIONS: new Flag({
        code: "ORGANIZATIONS",
        color_code: "{E0}",
        sdesc: "Organization HQ and side areas"
    }),
    TEMPLES: new Flag({
        code: "TEMPLES",
        color_code: "{F0}",
        sdesc: "Temples"
    }),
};
const JUSTICE_PUNISHMENTS = {
    PUNISHMENT_NOT_ENFORCED: new Flag({
        code: "PUNISHMENT_NOT_ENFORCED",
        sdesc: "Not enforced",
        ldesc: "No punishment",
        do_not_use: false
    }),
    PUNISHMENT_DEATH: new Flag({
        code: "PUNISHMENT_DEATH",
        sdesc: "Death",
        ldesc: "Death",
        do_not_use: false
    }),
    PUNISHMENT_RANDOM_ITEM: new Flag({
        code: "PUNISHMENT_RANDOM_ITEM",
        sdesc: "Random Item",
        ldesc: "Random item is confiscated",
        do_not_use: false
    }),
    PUNISHMENT_SEVER: new Flag({
        code: "PUNISHMENT_SEVER",
        sdesc: "Sever",
        ldesc: "Random limb is severed",
        do_not_use: false
    }),
    PUNISHMENT_JAIL: new Flag({
        code: "PUNISHMENT_JAIL",
        sdesc: "Jail",
        ldesc: "1 hour real time in the dungeon room",
        do_not_use: false
    }),
    PUNISHMENT_EXILE: new Flag({
        code: "PUNISHMENT_EXILE",
        sdesc: "Exile (NOT CODED)",
        ldesc: "Not coded yet!",
        do_not_use: true
    })
};
const META_VALUE_TYPES = {
    INT: "int",
    POS_INT: "positive int",
    FLAG: "flag",
    MULTI_FLAGS: "multiple flags",
    STRING: "string",
    VNUM: "vnum",
    BOOLEAN: "boolean" // 0 = true, 1 = false
};
const META_VNUM_TYPES = {
    OBJECT: "object",
    ROOM: "room",
    MOB: "mob"
};
const MAGIC_ITEM_SPELLS = {
    SPELL_NONE: new Flag({
        code: "SPELL_NONE",
        sdesc: "SPELL_NONE"
    }),
    SPELL_ACETUM_PRIMUS: new Flag({
        code: "SPELL_ACETUM_PRIMUS",
        sdesc: "SPELL_ACETUM_PRIMUS"
    }),
    SPELL_ACID_ARROW: new Flag({
        code: "SPELL_ACID_ARROW",
        sdesc: "SPELL_ACID_ARROW"
    }),
    SPELL_ACID_BLAST: new Flag({
        code: "SPELL_ACID_BLAST",
        sdesc: "SPELL_ACID_BLAST"
    }),
    SPELL_ACID_BREATH: new Flag({
        code: "SPELL_ACID_BREATH",
        sdesc: "SPELL_ACID_BREATH"
    }),
    SPELL_ALERTNESS: new Flag({
        code: "SPELL_ALERTNESS",
        sdesc: "SPELL_ALERTNESS"
    }),
    SPELL_ANIMATE_DEAD: new Flag({
        code: "SPELL_ANIMATE_DEAD",
        sdesc: "SPELL_ANIMATE_DEAD"
    }),
    SPELL_ANIMATE_OBJECT: new Flag({
        code: "SPELL_ANIMATE_OBJECT",
        sdesc: "SPELL_ANIMATE_OBJECT"
    }),
    SPELL_ANTIMAGIC_SHELL: new Flag({
        code: "SPELL_ANTIMAGIC_SHELL",
        sdesc: "SPELL_ANTIMAGIC_SHELL"
    }),
    SPELL_ARMOR: new Flag({
        code: "SPELL_ARMOR",
        sdesc: "SPELL_ARMOR"
    }),
    SPELL_ASTRAL_WALK: new Flag({
        code: "SPELL_ASTRAL_WALK",
        sdesc: "SPELL_ASTRAL_WALK"
    }),
    SPELL_BARKSKIN: new Flag({
        code: "SPELL_BARKSKIN",
        sdesc: "SPELL_BARKSKIN"
    }),
    SPELL_BLAZEBANE: new Flag({
        code: "SPELL_BLAZEBANE",
        sdesc: "SPELL_BLAZEBANE"
    }),
    SPELL_BLESS: new Flag({
        code: "SPELL_BLESS",
        sdesc: "SPELL_BLESS"
    }),
    SPELL_BLINDNESS: new Flag({
        code: "SPELL_BLINDNESS",
        sdesc: "SPELL_BLINDNESS"
    }),
    SPELL_BLOOD_OF_CYRIC: new Flag({
        code: "SPELL_BLOOD_OF_CYRIC",
        sdesc: "SPELL_BLOOD_OF_CYRIC"
    }),
    SPELL_BURNING_HANDS: new Flag({
        code: "SPELL_BURNING_HANDS",
        sdesc: "SPELL_BURNING_HANDS"
    }),
    SPELL_CALL_LIGHTNING: new Flag({
        code: "SPELL_CALL_LIGHTNING",
        sdesc: "SPELL_CALL_LIGHTNING"
    }),
    SPELL_CAUSE_CRITICAL: new Flag({
        code: "SPELL_CAUSE_CRITICAL",
        sdesc: "SPELL_CAUSE_CRITICAL"
    }),
    SPELL_CAUSE_LIGHT: new Flag({
        code: "SPELL_CAUSE_LIGHT",
        sdesc: "SPELL_CAUSE_LIGHT"
    }),
    SPELL_CAUSE_SERIOUS: new Flag({
        code: "SPELL_CAUSE_SERIOUS",
        sdesc: "SPELL_CAUSE_SERIOUS"
    }),
    SPELL_CLAIRVOYANCE: new Flag({
        code: "SPELL_CLAIRVOYANCE",
        sdesc: "SPELL_CLAIRVOYANCE"
    }),
    SPELL_CHANGE_SEX: new Flag({
        code: "SPELL_CHANGE_SEX",
        sdesc: "SPELL_CHANGE_SEX"
    }),
    SPELL_CHAIN_LIGHTNING: new Flag({
        code: "SPELL_CHAIN_LIGHTNING",
        sdesc: "SPELL_CHAIN_LIGHTNING"
    }),
    SPELL_CHARGED_BEACON: new Flag({
        code: "SPELL_CHARGED_BEACON",
        sdesc: "SPELL_CHARGED_BEACON"
    }),
    SPELL_CHARIOT_OF_THE_SUN: new Flag({
        code: "SPELL_CHARIOT_OF_THE_SUN",
        sdesc: "SPELL_CHARIOT_OF_THE_SUN"
    }),
    SPELL_CHARM_PERSON: new Flag({
        code: "SPELL_CHARM_PERSON",
        sdesc: "SPELL_CHARM_PERSON"
    }),
    SPELL_CHILL_TOUCH: new Flag({
        code: "SPELL_CHILL_TOUCH",
        sdesc: "SPELL_CHILL_TOUCH"
    }),
    SPELL_COLOR_SPRAY: new Flag({
        code: "SPELL_COLOR_SPRAY",
        sdesc: "SPELL_COLOR_SPRAY"
    }),
    SPELL_CONE_OF_COLD: new Flag({
        code: "SPELL_CONE_OF_COLD",
        sdesc: "SPELL_CONE_OF_COLD"
    }),
    SPELL_CONJURE_ELEMENTAL: new Flag({
        code: "SPELL_CONJURE_ELEMENTAL",
        sdesc: "SPELL_CONJURE_ELEMENTAL"
    }),
    SPELL_CONTINUAL_LIGHT: new Flag({
        code: "SPELL_CONTINUAL_LIGHT",
        sdesc: "SPELL_CONTINUAL_LIGHT"
    }),
    SPELL_CONTROL_WEATHER: new Flag({
        code: "SPELL_CONTROL_WEATHER",
        sdesc: "SPELL_CONTROL_WEATHER"
    }),
    SPELL_CREATE_FOOD: new Flag({
        code: "SPELL_CREATE_FOOD",
        sdesc: "SPELL_CREATE_FOOD"
    }),
    SPELL_CREATE_SPRING: new Flag({
        code: "SPELL_CREATE_SPRING",
        sdesc: "SPELL_CREATE_SPRING"
    }),
    SPELL_CREATE_SYMBOL: new Flag({
        code: "SPELL_CREATE_SYMBOL",
        sdesc: "SPELL_CREATE_SYMBOL"
    }),
    SPELL_CREATE_WATER: new Flag({
        code: "SPELL_CREATE_WATER",
        sdesc: "SPELL_CREATE_WATER"
    }),
    SPELL_CURE_BLINDNESS: new Flag({
        code: "SPELL_CURE_BLINDNESS",
        sdesc: "SPELL_CURE_BLINDNESS"
    }),
    SPELL_CURE_CRITICAL: new Flag({
        code: "SPELL_CURE_CRITICAL",
        sdesc: "SPELL_CURE_CRITICAL"
    }),
    SPELL_CURE_LIGHT: new Flag({
        code: "SPELL_CURE_LIGHT",
        sdesc: "SPELL_CURE_LIGHT"
    }),
    SPELL_CURE_POISON: new Flag({
        code: "SPELL_CURE_POISON",
        sdesc: "SPELL_CURE_POISON"
    }),
    SPELL_CURE_SERIOUS: new Flag({
        code: "SPELL_CURE_SERIOUS",
        sdesc: "SPELL_CURE_SERIOUS"
    }),
    SPELL_CURSE: new Flag({
        code: "SPELL_CURSE",
        sdesc: "SPELL_CURSE"
    }),
    SPELL_DETECT_BURIED: new Flag({
        code: "SPELL_DETECT_BURIED",
        sdesc: "SPELL_DETECT_BURIED"
    }),
    SPELL_DETECT_EVIL: new Flag({
        code: "SPELL_DETECT_EVIL",
        sdesc: "SPELL_DETECT_EVIL"
    }),
    SPELL_DETECT_HIDDEN: new Flag({
        code: "SPELL_DETECT_HIDDEN",
        sdesc: "SPELL_DETECT_HIDDEN"
    }),
    SPELL_DETECT_INVIS: new Flag({
        code: "SPELL_DETECT_INVIS",
        sdesc: "SPELL_DETECT_INVIS"
    }),
    SPELL_DETECT_MAGIC: new Flag({
        code: "SPELL_DETECT_MAGIC",
        sdesc: "SPELL_DETECT_MAGIC"
    }),
    SPELL_DETECT_POISON: new Flag({
        code: "SPELL_DETECT_POISON",
        sdesc: "SPELL_DETECT_POISON"
    }),
    SPELL_DISJUNCTION: new Flag({
        code: "SPELL_DISJUNCTION",
        sdesc: "SPELL_DISJUNCTION"
    }),
    SPELL_DISPEL_EVIL: new Flag({
        code: "SPELL_DISPEL_EVIL",
        sdesc: "SPELL_DISPEL_EVIL"
    }),
    SPELL_DISPEL_MAGIC: new Flag({
        code: "SPELL_DISPEL_MAGIC",
        sdesc: "SPELL_DISPEL_MAGIC"
    }),
    SPELL_DIVINITY: new Flag({
        code: "SPELL_DIVINITY",
        sdesc: "SPELL_DIVINITY"
    }),
    SPELL_DISINTEGRATE: new Flag({
        code: "SPELL_DISINTEGRATE",
        sdesc: "SPELL_DISINTEGRATE"
    }),
    SPELL_DRAGONSKIN: new Flag({
        code: "SPELL_DRAGONSKIN",
        sdesc: "SPELL_DRAGONSKIN"
    }),
    SPELL_DREAM: new Flag({
        code: "SPELL_DREAM",
        sdesc: "SPELL_DREAM"
    }),
    SPELL_EARTHQUAKE: new Flag({
        code: "SPELL_EARTHQUAKE",
        sdesc: "SPELL_EARTHQUAKE"
    }),
    SPELL_ENCHANT_WEAPON: new Flag({
        code: "SPELL_ENCHANT_WEAPON",
        sdesc: "SPELL_ENCHANT_WEAPON"
    }),
    SPELL_ENERGY_DRAIN: new Flag({
        code: "SPELL_ENERGY_DRAIN",
        sdesc: "SPELL_ENERGY_DRAIN"
    }),
    SPELL_FAERIE_FIRE: new Flag({
        code: "SPELL_FAERIE_FIRE",
        sdesc: "SPELL_FAERIE_FIRE"
    }),
    SPELL_FAERIE_FOG: new Flag({
        code: "SPELL_FAERIE_FOG",
        sdesc: "SPELL_FAERIE_FOG"
    }),
    SPELL_FARHEAL: new Flag({
        code: "SPELL_FARHEAL",
        sdesc: "SPELL_FARHEAL"
    }),
    SPELL_FATIGUE: new Flag({
        code: "SPELL_FATIGUE",
        sdesc: "SPELL_FATIGUE"
    }),
    SPELL_FEEBLEMIND: new Flag({
        code: "SPELL_FEEBLEMIND",
        sdesc: "SPELL_FEEBLEMIND"
    }),
    SPELL_FIND_FAMILIAR: new Flag({
        code: "SPELL_FIND_FAMILIAR",
        sdesc: "SPELL_FIND_FAMILIAR"
    }),
    SPELL_FIND_TRAPS: new Flag({
        code: "SPELL_FIND_TRAPS",
        sdesc: "SPELL_FIND_TRAPS"
    }),
    SPELL_FIREBALL: new Flag({
        code: "SPELL_FIREBALL",
        sdesc: "SPELL_FIREBALL"
    }),
    SPELL_FIRE_BREATH: new Flag({
        code: "SPELL_FIRE_BREATH",
        sdesc: "SPELL_FIRE_BREATH"
    }),
    SPELL_FLAME_ARROW: new Flag({
        code: "SPELL_FLAME_ARROW",
        sdesc: "SPELL_FLAME_ARROW"
    }),
    SPELL_FIRESHIELD: new Flag({
        code: "SPELL_FIRESHIELD",
        sdesc: "SPELL_FIRESHIELD"
    }),
    SPELL_FLAME_JAWS: new Flag({
        code: "SPELL_FLAME_JAWS",
        sdesc: "SPELL_FLAME_JAWS"
    }),
    SPELL_FLAMESTRIKE: new Flag({
        code: "SPELL_FLAMESTRIKE",
        sdesc: "SPELL_FLAMESTRIKE"
    }),
    SPELL_FLY: new Flag({
        code: "SPELL_FLY",
        sdesc: "SPELL_FLY"
    }),
    SPELL_FRIENDS: new Flag({
        code: "SPELL_FRIENDS",
        sdesc: "SPELL_FRIENDS"
    }),
    SPELL_FROST_BREATH: new Flag({
        code: "SPELL_FROST_BREATH",
        sdesc: "SPELL_FROST_BREATH"
    }),
    SPELL_FUMBLE: new Flag({
        code: "SPELL_FUMBLE",
        sdesc: "SPELL_FUMBLE"
    }),
    SPELL_GAS_BREATH: new Flag({
        code: "SPELL_GAS_BREATH",
        sdesc: "SPELL_GAS_BREATH"
    }),
    SPELL_GATE: new Flag({
        code: "SPELL_GATE",
        sdesc: "SPELL_GATE"
    }),
    SPELL_GOOD_FORTUNE: new Flag({
        code: "SPELL_GOOD_FORTUNE",
        sdesc: "SPELL_GOOD_FORTUNE"
    }),
    SPELL_HAND_OF_CHAOS: new Flag({
        code: "SPELL_HAND_OF_CHAOS",
        sdesc: "SPELL_HAND_OF_CHAOS"
    }),
    SPELL_HARM: new Flag({
        code: "SPELL_HARM",
        sdesc: "SPELL_HARM"
    }),
    SPELL_HEAL: new Flag({
        code: "SPELL_HEAL",
        sdesc: "SPELL_HEAL"
    }),
    SPELL_HOLY_SANCTITY: new Flag({
        code: "SPELL_HOLY_SANCTITY",
        sdesc: "SPELL_HOLY_SANCTITY"
    }),
    SPELL_ICESHIELD: new Flag({
        code: "SPELL_ICESHIELD",
        sdesc: "SPELL_ICESHIELD"
    }),
    SPELL_ICE_STORM: new Flag({
        code: "SPELL_ICE_STORM",
        sdesc: "SPELL_ICE_STORM"
    }),
    SPELL_IDENTIFY: new Flag({
        code: "SPELL_IDENTIFY",
        sdesc: "SPELL_IDENTIFY"
    }),
    SPELL_ILL_FORTUNE: new Flag({
        code: "SPELL_ILL_FORTUNE",
        sdesc: "SPELL_ILL_FORTUNE"
    }),
    SPELL_ILMATERS_BLESSING: new Flag({
        code: "SPELL_ILMATERS_BLESSING",
        sdesc: "SPELL_ILMATERS_BLESSING"
    }),
    SPELL_INFRAVISION: new Flag({
        code: "SPELL_INFRAVISION",
        sdesc: "SPELL_INFRAVISION"
    }),
    SPELL_INVIS: new Flag({
        code: "SPELL_INVIS",
        sdesc: "SPELL_INVIS"
    }),
    SPELL_KNOCK: new Flag({
        code: "SPELL_KNOCK",
        sdesc: "SPELL_KNOCK"
    }),
    SPELL_KNOW_ALIGNMENT: new Flag({
        code: "SPELL_KNOW_ALIGNMENT",
        sdesc: "SPELL_KNOW_ALIGNMENT"
    }),
    SPELL_LEVITATE: new Flag({
        code: "SPELL_LEVITATE",
        sdesc: "SPELL_LEVITATE"
    }),
    SPELL_LIGHTNING_BOLT: new Flag({
        code: "SPELL_LIGHTNING_BOLT",
        sdesc: "SPELL_LIGHTNING_BOLT"
    }),
    SPELL_LIGHTNING_BREATH: new Flag({
        code: "SPELL_LIGHTNING_BREATH",
        sdesc: "SPELL_LIGHTNING_BREATH"
    }),
    SPELL_LOCATE_OBJECT: new Flag({
        code: "SPELL_LOCATE_OBJECT",
        sdesc: "SPELL_LOCATE_OBJECT"
    }),
    SPELL_MAGIC_MIRROR: new Flag({
        code: "SPELL_MAGIC_MIRROR",
        sdesc: "SPELL_MAGIC_MIRROR"
    }),
    SPELL_MAGIC_MISSILE: new Flag({
        code: "SPELL_MAGIC_MISSILE",
        sdesc: "SPELL_MAGIC_MISSILE"
    }),
    SPELL_MAGNETIC_THRUST: new Flag({
        code: "SPELL_MAGNETIC_THRUST",
        sdesc: "SPELL_MAGNETIC_THRUST"
    }),
    SPELL_MASS_INVIS: new Flag({
        code: "SPELL_MASS_INVIS",
        sdesc: "SPELL_MASS_INVIS"
    }),
    SPELL_MIND_WRACK: new Flag({
        code: "SPELL_MIND_WRACK",
        sdesc: "SPELL_MIND_WRACK"
    }),
    SPELL_MIND_WRENCH: new Flag({
        code: "SPELL_MIND_WRENCH",
        sdesc: "SPELL_MIND_WRENCH"
    }),
    SPELL_MINOR_GLOBE: new Flag({
        code: "SPELL_MINOR_GLOBE",
        sdesc: "SPELL_MINOR_GLOBE"
    }),
    SPELL_MNEMONIC_ENHANCER: new Flag({
        code: "SPELL_MNEMONIC_ENHANCER",
        sdesc: "SPELL_MNEMONIC_ENHANCER"
    }),
    SPELL_MONSTER_SUMMON: new Flag({
        code: "SPELL_MONSTER_SUMMON",
        sdesc: "SPELL_MONSTER_SUMMON"
    }),
    SPELL_MOONBEAM: new Flag({
        code: "SPELL_MOONBEAM",
        sdesc: "SPELL_MOONBEAM"
    }),
    SPELL_NULL_SPHERE: new Flag({
        code: "SPELL_NULL_SPHERE",
        sdesc: "SPELL_NULL_SPHERE"
    }),
    SPELL_PASS_DOOR: new Flag({
        code: "SPELL_PASS_DOOR",
        sdesc: "SPELL_PASS_DOOR"
    }),
    SPELL_PHOENIX_CLAW: new Flag({
        code: "SPELL_PHOENIX_CLAW",
        sdesc: "SPELL_PHOENIX_CLAW"
    }),
    SPELL_PASS_PLANT: new Flag({
        code: "SPELL_PASS_PLANT",
        sdesc: "SPELL_PASS_PLANT"
    }),
    SPELL_POISON: new Flag({
        code: "SPELL_POISON",
        sdesc: "SPELL_POISON"
    }),
    SPELL_POLYMORPH: new Flag({
        code: "SPELL_POLYMORPH",
        sdesc: "SPELL_POLYMORPH"
    }),
    SPELL_POSSESS: new Flag({
        code: "SPELL_POSSESS",
        sdesc: "SPELL_POSSESS"
    }),
    SPELL_PRODUCE_FLAME: new Flag({
        code: "SPELL_PRODUCE_FLAME",
        sdesc: "SPELL_PRODUCE_FLAME"
    }),
    SPELL_PROTECTION: new Flag({
        code: "SPELL_PROTECTION",
        sdesc: "SPELL_PROTECTION"
    }),
    SPELL_QUANTUM_SPIKE: new Flag({
        code: "SPELL_QUANTUM_SPIKE",
        sdesc: "SPELL_QUANTUM_SPIKE"
    }),
    SPELL_RAINBOW_PATTERN: new Flag({
        code: "SPELL_RAINBOW_PATTERN",
        sdesc: "SPELL_RAINBOW_PATTERN"
    }),
    SPELL_RAZORBAIT: new Flag({
        code: "SPELL_RAZORBAIT",
        sdesc: "SPELL_RAZORBAIT"
    }),
    SPELL_RECHARGE: new Flag({
        code: "SPELL_RECHARGE",
        sdesc: "SPELL_RECHARGE"
    }),
    SPELL_REGENERATE: new Flag({
        code: "SPELL_REGENERATE",
        sdesc: "SPELL_REGENERATE"
    }),
    SPELL_RESIST_COLD: new Flag({
        code: "SPELL_RESIST_COLD",
        sdesc: "SPELL_RESIST_COLD"
    }),
    SPELL_RESIST_ELECTRICITY: new Flag({
        code: "SPELL_RESIST_ELECTRICITY",
        sdesc: "SPELL_RESIST_ELECTRICITY"
    }),
    SPELL_RESIST_FIRE: new Flag({
        code: "SPELL_RESIST_FIRE",
        sdesc: "SPELL_RESIST_FIRE"
    }),
    SPELL_REFRESH: new Flag({
        code: "SPELL_REFRESH",
        sdesc: "SPELL_REFRESH"
    }),
    SPELL_REMOVE_CURSE: new Flag({
        code: "SPELL_REMOVE_CURSE",
        sdesc: "SPELL_REMOVE_CURSE"
    }),
    SPELL_REMOVE_INVIS: new Flag({
        code: "SPELL_REMOVE_INVIS",
        sdesc: "SPELL_REMOVE_INVIS"
    }),
    SPELL_REMOVE_TRAP: new Flag({
        code: "SPELL_REMOVE_TRAP",
        sdesc: "SPELL_REMOVE_TRAP"
    }),
    SPELL_RESILIENCE: new Flag({
        code: "SPELL_RESILIENCE",
        sdesc: "SPELL_RESILIENCE"
    }),
    SPELL_RESTORATION: new Flag({
        code: "SPELL_RESTORATION",
        sdesc: "SPELL_RESTORATION"
    }),
    SPELL_RESTORE_MANA: new Flag({
        code: "SPELL_RESTORE_MANA",
        sdesc: "SPELL_RESTORE_MANA"
    }),
    SPELL_REVIVE: new Flag({
        code: "SPELL_REVIVE",
        sdesc: "SPELL_REVIVE"
    }),
    SPELL_SAGACITY: new Flag({
        code: "SPELL_SAGACITY",
        sdesc: "SPELL_SAGACITY"
    }),
    SPELL_SANCTUARY: new Flag({
        code: "SPELL_SANCTUARY",
        sdesc: "SPELL_SANCTUARY"
    }),
    SPELL_SCORCHING_SURGE: new Flag({
        code: "SPELL_SCORCHING_SURGE",
        sdesc: "SPELL_SCORCHING_SURGE"
    }),
    SPELL_SHADOW_WALK: new Flag({
        code: "SPELL_SHADOW_WALK",
        sdesc: "SPELL_SHADOW_WALK"
    }),
    SPELL_SHADOW_FIST: new Flag({
        code: "SPELL_SHADOW_FIST",
        sdesc: "SPELL_SHADOW_FIST"
    }),
    SPELL_SHADOW_FUNNEL: new Flag({
        code: "SPELL_SHADOW_FUNNEL",
        sdesc: "SPELL_SHADOW_FUNNEL"
    }),
    SPELL_SHADOW_DOOR: new Flag({
        code: "SPELL_SHADOW_DOOR",
        sdesc: "SPELL_SHADOW_DOOR"
    }),
    SPELL_SHIELD: new Flag({
        code: "SPELL_SHIELD",
        sdesc: "SPELL_SHIELD"
    }),
    SPELL_SHOCKING_GRASP: new Flag({
        code: "SPELL_SHOCKING_GRASP",
        sdesc: "SPELL_SHOCKING_GRASP"
    }),
    SPELL_SHOCKSHIELD: new Flag({
        code: "SPELL_SHOCKSHIELD",
        sdesc: "SPELL_SHOCKSHIELD"
    }),
    SPELL_SLEEP: new Flag({
        code: "SPELL_SLEEP",
        sdesc: "SPELL_SLEEP"
    }),
    SPELL_SLINK: new Flag({
        code: "SPELL_SLINK",
        sdesc: "SPELL_SLINK"
    }),
    SPELL_SPECTRAL_FIST: new Flag({
        code: "SPELL_SPECTRAL_FIST",
        sdesc: "SPELL_SPECTRAL_FIST"
    }),
    SPELL_SPECTRAL_HAND: new Flag({
        code: "SPELL_SPECTRAL_HAND",
        sdesc: "SPELL_SPECTRAL_HAND"
    }),
    SPELL_SPECTRAL_LIGHTNING: new Flag({
        code: "SPELL_SPECTRAL_LIGHTNING",
        sdesc: "SPELL_SPECTRAL_LIGHTNING"
    }),
    SPELL_SONIC_RESONANCE: new Flag({
        code: "SPELL_SONIC_RESONANCE",
        sdesc: "SPELL_SONIC_RESONANCE"
    }),
    SPELL_STRENGTH: new Flag({
        code: "SPELL_STRENGTH",
        sdesc: "SPELL_STRENGTH"
    }),
    SPELL_SUNRAY: new Flag({
        code: "SPELL_SUNRAY",
        sdesc: "SPELL_SUNRAY"
    }),
    SPELL_STONE_SKIN: new Flag({
        code: "SPELL_STONE_SKIN",
        sdesc: "SPELL_STONE_SKIN"
    }),
    SPELL_SULFUROUS_SPRAY: new Flag({
        code: "SPELL_SULFUROUS_SPRAY",
        sdesc: "SPELL_SULFUROUS_SPRAY"
    }),
    SPELL_SUMMON: new Flag({
        code: "SPELL_SUMMON",
        sdesc: "SPELL_SUMMON"
    }),
    SPELL_SWORDBAIT: new Flag({
        code: "SPELL_SWORDBAIT",
        sdesc: "SPELL_SWORDBAIT"
    }),
    SPELL_TELEPORT: new Flag({
        code: "SPELL_TELEPORT",
        sdesc: "SPELL_TELEPORT"
    }),
    SPELL_TOUCH_OF_JUSTICE: new Flag({
        code: "SPELL_TOUCH_OF_JUSTICE",
        sdesc: "SPELL_TOUCH_OF_JUSTICE"
    }),
    SPELL_TRANSPORT: new Flag({
        code: "SPELL_TRANSPORT",
        sdesc: "SPELL_TRANSPORT"
    }),
    SPELL_TROLLISH_VIGOR: new Flag({
        code: "SPELL_TROLLISH_VIGOR",
        sdesc: "SPELL_TROLLISH_VIGOR"
    }),
    SPELL_TRUE_SIGHT: new Flag({
        code: "SPELL_TRUE_SIGHT",
        sdesc: "SPELL_TRUE_SIGHT"
    }),
    SPELL_VALIANCE: new Flag({
        code: "SPELL_VALIANCE",
        sdesc: "SPELL_VALIANCE"
    }),
    SPELL_VAMPIRIC_TOUCH: new Flag({
        code: "SPELL_VAMPIRIC_TOUCH",
        sdesc: "SPELL_VAMPIRIC_TOUCH"
    }),
    SPELL_VENTRILOQUISM: new Flag({
        code: "SPELL_VENTRILOQUISM",
        sdesc: "SPELL_VENTRILOQUISM"
    }),
    SPELL_WARHORSE: new Flag({
        code: "SPELL_WARHORSE",
        sdesc: "SPELL_WARHORSE"
    }),
    SPELL_WATER_BREATHING: new Flag({
        code: "SPELL_WATER_BREATHING",
        sdesc: "SPELL_WATER_BREATHING"
    }),
    SPELL_WEAKEN: new Flag({
        code: "SPELL_WEAKEN",
        sdesc: "SPELL_WEAKEN"
    }),
    SPELL_WIND_WALK: new Flag({
        code: "SPELL_WIND_WALK",
        sdesc: "SPELL_WIND_WALK"
    }),
    SPELL_WINTER_MIST: new Flag({
        code: "SPELL_WINTER_MIST",
        sdesc: "SPELL_WINTER_MIST"
    }),
    SPELL_WITCH_LIGHT: new Flag({
        code: "SPELL_WITCH_LIGHT",
        sdesc: "SPELL_WITCH_LIGHT"
    }),
    SPELL_WORD_OF_RECALL: new Flag({
        code: "SPELL_WORD_OF_RECALL",
        sdesc: "SPELL_WORD_OF_RECALL"
    }),
    SPELL_WRAITHFORM: new Flag({
        code: "SPELL_WRAITHFORM",
        sdesc: "SPELL_WRAITHFORM"
    }),
    SPELL_WRATH_OF_DOMINUS: new Flag({
        code: "SPELL_WRATH_OF_DOMINUS",
        sdesc: "SPELL_WRATH_OF_DOMINUS"
    }),
    SPELL_WEB: new Flag({
        code: "SPELL_WEB",
        sdesc: "SPELL_WEB"
    }),
    SPELL_TURN_UNDEAD: new Flag({
        code: "SPELL_TURN_UNDEAD",
        sdesc: "SPELL_TURN_UNDEAD"
    }),
    SPELL_SENTRY_OF_HELM: new Flag({
        code: "SPELL_SENTRY_OF_HELM",
        sdesc: "SPELL_SENTRY_OF_HELM"
    }),
    SPELL_WATER_TO_WINE: new Flag({
        code: "SPELL_WATER_TO_WINE",
        sdesc: "SPELL_WATER_TO_WINE"
    }),
    SPELL_RAISE_DEAD: new Flag({
        code: "SPELL_RAISE_DEAD",
        sdesc: "SPELL_RAISE_DEAD"
    }),
    SPELL_RESURRECTION: new Flag({
        code: "SPELL_RESURRECTION",
        sdesc: "SPELL_RESURRECTION"
    }),
    SPELL_HOLD_PERSON: new Flag({
        code: "SPELL_HOLD_PERSON",
        sdesc: "SPELL_HOLD_PERSON"
    }),
    SPELL_SILENCE: new Flag({
        code: "SPELL_SILENCE",
        sdesc: "SPELL_SILENCE"
    }),
    SPELL_ENTANGLE: new Flag({
        code: "SPELL_ENTANGLE",
        sdesc: "SPELL_ENTANGLE"
    }),
    SPELL_COMPREHEND_LANGUAGE: new Flag({
        code: "SPELL_COMPREHEND_LANGUAGE",
        sdesc: "SPELL_COMPREHEND_LANGUAGE"
    }),
    SPELL_MIND_SHIELD: new Flag({
        code: "SPELL_MIND_SHIELD",
        sdesc: "SPELL_MIND_SHIELD"
    }),
    SPELL_STONE_WALK: new Flag({
        code: "SPELL_STONE_WALK",
        sdesc: "SPELL_STONE_WALK"
    }),
    SPELL_ENCHANT_ARMOR: new Flag({
        code: "SPELL_ENCHANT_ARMOR",
        sdesc: "SPELL_ENCHANT_ARMOR"
    }),
    SPELL_HEROISM: new Flag({
        code: "SPELL_HEROISM",
        sdesc: "SPELL_HEROISM"
    }),
    SPELL_SHADOW_CONJURATION: new Flag({
        code: "SPELL_SHADOW_CONJURATION",
        sdesc: "SPELL_SHADOW_CONJURATION"
    }),
    SPELL_MIRROR_IMAGE: new Flag({
        code: "SPELL_MIRROR_IMAGE",
        sdesc: "SPELL_MIRROR_IMAGE"
    }),
    SPELL_DELAYED_BLAST_FIREBALL: new Flag({
        code: "SPELL_DELAYED_BLAST_FIREBALL",
        sdesc: "SPELL_DELAYED_BLAST_FIREBALL"
    }),
    SPELL_MENDING: new Flag({
        code: "SPELL_MENDING",
        sdesc: "SPELL_MENDING"
    }),
    SPELL_NON_DETECTION: new Flag({
        code: "SPELL_NON_DETECTION",
        sdesc: "SPELL_NON_DETECTION"
    }),
    SPELL_FREEDOM: new Flag({
        code: "SPELL_FREEDOM",
        sdesc: "SPELL_FREEDOM"
    }),
    SPELL_CHARM_MONSTER: new Flag({
        code: "SPELL_CHARM_MONSTER",
        sdesc: "SPELL_CHARM_MONSTER"
    }),
    SPELL_HOLD_MONSTER: new Flag({
        code: "SPELL_HOLD_MONSTER",
        sdesc: "SPELL_HOLD_MONSTER"
    }),
    SPELL_CONTROL_UNDEAD: new Flag({
        code: "SPELL_CONTROL_UNDEAD",
        sdesc: "SPELL_CONTROL_UNDEAD"
    }),
    SPELL_ACIDSHIELD: new Flag({
        code: "SPELL_ACIDSHIELD",
        sdesc: "SPELL_ACIDSHIELD"
    }),
    SPELL_CREATE_OBJECT: new Flag({
        code: "SPELL_CREATE_OBJECT",
        sdesc: "SPELL_CREATE_OBJECT"
    }),
    SPELL_FEAR: new Flag({
        code: "SPELL_FEAR",
        sdesc: "SPELL_FEAR"
    }),
    SPELL_ETHEREAL_FLYER: new Flag({
        code: "SPELL_ETHEREAL_FLYER",
        sdesc: "SPELL_ETHEREAL_FLYER"
    }),
    SPELL_RESERVED_FOR_FUTURE: new Flag({
        code: "SPELL_RESERVED_FOR_FUTURE",
        sdesc: "SPELL_RESERVED_FOR_FUTURE"
    }),
    SPELL_PHANTASMAL_KILLER: new Flag({
        code: "SPELL_PHANTASMAL_KILLER",
        sdesc: "SPELL_PHANTASMAL_KILLER"
    }),
    SPELL_SPEAK_WITH_DEAD: new Flag({
        code: "SPELL_SPEAK_WITH_DEAD",
        sdesc: "SPELL_SPEAK_WITH_DEAD"
    }),
    SPELL_FLOATING_DISC: new Flag({
        code: "SPELL_FLOATING_DISC",
        sdesc: "SPELL_FLOATING_DISC"
    })
};
const ITEM_LAYERS = {
    LAYER_ALL: new Flag({
        code: "LAYER_ALL",
        sdesc: "LAYER_ALL",
        ldesc: "Nothing else can be worn with the item in the same locations."
    }),
    LAYER_UNDER: new Flag({
        code: "LAYER_UNDER",
        sdesc: "LAYER_UNDER",
        ldesc: "Worn under armour. Such as padding and under clothes."
    }),
    LAYER_ARMOR: new Flag({
        code: "LAYER_ARMOR",
        sdesc: "LAYER_ARMOR",
        ldesc: "Actual armor. It can have something worn under and over it."
    }),
    LAYER_OVER: new Flag({
        code: "LAYER_OVER",
        sdesc: "LAYER_OVER",
        ldesc: "Can be worn over armour. Like robes."
    })
};
const WEAR_LOCATIONS = {
    CAN_WEAR_TAKE: new Flag({
        code: "CAN_WEAR_TAKE",
        sdesc: "CAN_WEAR_TAKE",
        ldesc: "This allows the item to be picked up by the PC.",
        do_not_use: false
    }),
    CAN_WEAR_FINGER: new Flag({
        code: "CAN_WEAR_FINGER",
        sdesc: "CAN_WEAR_FINGER",
        ldesc: "There are two finger locations and they are not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_NECK: new Flag({
        code: "CAN_WEAR_NECK",
        sdesc: "CAN_WEAR_NECK",
        ldesc: "There are two neck locations and they are not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_BODY: new Flag({
        code: "CAN_WEAR_BODY",
        sdesc: "CAN_WEAR_BODY",
        ldesc: "There is one body location and it is layerable.",
        do_not_use: false
    }),
    CAN_WEAR_HEAD: new Flag({
        code: "CAN_WEAR_HEAD",
        sdesc: "CAN_WEAR_HEAD",
        ldesc: "There is one head location and it is layerable.",
        do_not_use: false
    }),
    CAN_WEAR_LEGS: new Flag({
        code: "CAN_WEAR_LEGS",
        sdesc: "CAN_WEAR_LEGS",
        ldesc: "There is one legs location and it is layerable.",
        do_not_use: false
    }),
    CAN_WEAR_FEET: new Flag({
        code: "CAN_WEAR_FEET",
        sdesc: "CAN_WEAR_FEET",
        ldesc: "There is one feet location and it is layerable.",
        do_not_use: false
    }),
    CAN_WEAR_HANDS: new Flag({
        code: "CAN_WEAR_HANDS",
        sdesc: "CAN_WEAR_HANDS",
        ldesc: "There is one hands location and it is layerable.",
        do_not_use: false
    }),
    CAN_WEAR_ARMS: new Flag({
        code: "CAN_WEAR_ARMS",
        sdesc: "CAN_WEAR_ARMS",
        ldesc: "There is one arms location and it is layerable.",
        do_not_use: false
    }),
    CAN_WEAR_WAIST: new Flag({
        code: "CAN_WEAR_WAIST",
        sdesc: "CAN_WEAR_WAIST",
        ldesc: "There is one waist location and it is not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_BELT: new Flag({
        code: "CAN_WEAR_BELT",
        sdesc: "CAN_WEAR_BELT",
        ldesc: "There is one belt location and it is layerable.",
        do_not_use: false
    }),
    CAN_WEAR_WRIST: new Flag({
        code: "CAN_WEAR_WRIST",
        sdesc: "CAN_WEAR_WRIST",
        ldesc: "There are two wrist location and they are not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_HOLD: new Flag({
        code: "CAN_WEAR_HOLD",
        sdesc: "CAN_WEAR_HOLD",
        ldesc: "There are two hold locations and they are not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_BOTH_HANDS: new Flag({
        code: "CAN_WEAR_BOTH_HANDS",
        sdesc: "CAN_WEAR_BOTH_HANDS",
        ldesc: "There is one both hands location and it is not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_EARS: new Flag({
        code: "CAN_WEAR_EARS",
        sdesc: "CAN_WEAR_EARS",
        ldesc: "There is one ears location and it is not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_FACE: new Flag({
        code: "CAN_WEAR_FACE",
        sdesc: "CAN_WEAR_FACE",
        ldesc: "There is one face location and it is not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_FLOATING: new Flag({
        code: "CAN_WEAR_FLOATING",
        sdesc: "CAN_WEAR_FLOATING",
        ldesc: "There is one floating location and it is not layerable.",
        do_not_use: false
    }),
    CAN_WEAR_SYMBOL: new Flag({
        code: "CAN_WEAR_SYMBOL",
        sdesc: "CAN_WEAR_SYMBOL",
        ldesc: "There is one feet location and it is layerable. (This one is not to be used in normal areas. It is for god symbols only).",
        do_not_use: false
    }),
    CAN_WEAR_SADDLE: new Flag({
        code: "CAN_WEAR_SADDLE",
        sdesc: "CAN_WEAR_SADDLE",
        ldesc: "There is one saddle location and it is layerable. This can only be used by mobiles and PC's of a certain body type.",
        do_not_use: false
    }),
    CAN_WEAR_ARMOR: new Flag({
        code: "CAN_WEAR_ARMOR",
        sdesc: "CAN_WEAR_ARMOR",
        ldesc: "This wear location is only for mobiles, set in hard code. It is not for use by builders.",
        do_not_use: true
    })
};
const ITEM_ATTRIBUTES = {
    FLAG_GLOW: new Flag({
        code: "FLAG_GLOW",
        sdesc: "FLAG_GLOW",
        ldesc: "Item description has (Glowing) and provides light when equipped. (Unequipped objects must weigh > 100 pounds to light the room.)",
        do_not_use: false
    }),
    FLAG_HUM: new Flag({
        code: "FLAG_HUM",
        sdesc: "FLAG_HUM",
        ldesc: "Item description has (Humming)",
        do_not_use: false
    }),
    FLAG_DARK: new Flag({
        code: "FLAG_DARK",
        sdesc: "FLAG_DARK",
        ldesc: "This flag has no affect",
        do_not_use: true
    }),
    FLAG_LOYAL: new Flag({
        code: "FLAG_LOYAL",
        sdesc: "FLAG_LOYAL",
        ldesc: "Weapon does not drop on floor if disarmed",
        do_not_use: false
    }),
    FLAG_EVIL: new Flag({
        code: "FLAG_EVIL",
        sdesc: "FLAG_EVIL",
        ldesc: "Item has an evil aura",
        do_not_use: false
    }),
    FLAG_INVIS: new Flag({
        code: "FLAG_INVIS",
        sdesc: "FLAG_INVIS",
        ldesc: "Item is invisible",
        do_not_use: false
    }),
    FLAG_MAGIC: new Flag({
        code: "FLAG_MAGIC",
        sdesc: "FLAG_MAGIC",
        ldesc: "Item object has affects or program.",
        do_not_use: false
    }),
    FLAG_NODROP: new Flag({
        code: "FLAG_NODROP",
        sdesc: "FLAG_NODROP",
        ldesc: "PC cannot drop object. Item is cursed",
        do_not_use: false
    }),
    FLAG_RESIZE: new Flag({
        code: "FLAG_RESIZE",
        sdesc: "FLAG_RESIZE",
        ldesc: "Armour will resize when worn",
        do_not_use: false
    }),
    FLAG_ANTI_LAWFUL: new Flag({
        code: "FLAG_ANTI_LAWFUL",
        sdesc: "FLAG_ANTI_LAWFUL",
        ldesc: "Item zaps good chars",
        do_not_use: false
    }),
    FLAG_ANTI_CHAOTIC: new Flag({
        code: "FLAG_ANTI_CHAOTIC",
        sdesc: "FLAG_ANTI_CHAOTIC",
        ldesc: "Item zaps evil chars",
        do_not_use: false
    }),
    FLAG_ANTI_UNCONCERNED: new Flag({
        code: "FLAG_ANTI_UNCONCERNED",
        sdesc: "FLAG_ANTI_UNCONCERNED",
        ldesc: "Item zaps neutral chars",
        do_not_use: false
    }),
    FLAG_NOREMOVE: new Flag({
        code: "FLAG_NOREMOVE",
        sdesc: "FLAG_NOREMOVE",
        ldesc: "Item cannot be removed. Item is cursed.",
        do_not_use: false
    }),
    FLAG_INVENTORY: new Flag({
        code: "FLAG_INVENTORY",
        sdesc: "FLAG_INVENTORY",
        ldesc: "Item cannot be put into containers and is more resistant to damage.",
        do_not_use: false
    }),
    FLAG_ANTI_WIZARD: new Flag({
        code: "FLAG_ANTI_WIZARD",
        sdesc: "FLAG_ANTI_WIZARD",
        ldesc: "Item cannot be used by wizards",
        do_not_use: false
    }),
    FLAG_ANTI_ROGUE: new Flag({
        code: "FLAG_ANTI_ROGUE",
        sdesc: "FLAG_ANTI_ROGUE",
        ldesc: "Item cannot be used by rogues",
        do_not_use: false
    }),
    FLAG_ANTI_WARRIOR: new Flag({
        code: "FLAG_ANTI_WARRIOR",
        sdesc: "FLAG_ANTI_WARRIOR",
        ldesc: "Item cannot be used by warriors",
        do_not_use: false
    }),
    FLAG_ANTI_PRIEST: new Flag({
        code: "FLAG_ANTI_PRIEST",
        sdesc: "FLAG_ANTI_PRIEST",
        ldesc: "Item cannot be used by priests",
        do_not_use: false
    }),
    FLAG_NOSCRY: new Flag({
        code: "FLAG_NOSCRY",
        sdesc: "FLAG_NOSCRY",
        ldesc: "Item cannot be scryed for with spells.",
        do_not_use: false
    }),
    FLAG_SHOPKEEPER: new Flag({
        code: "FLAG_SHOPKEEPER",
        sdesc: "FLAG_SHOPKEEPER",
        ldesc: "Used in hard code. Not for use by builders.",
        do_not_use: true
    }),
    FLAG_METAL: new Flag({
        code: "FLAG_METAL",
        sdesc: "FLAG_METAL",
        ldesc: "No longer in use.",
        do_not_use: true
    }),
    FLAG_CONCEALED: new Flag({
        code: "FLAG_CONCEALED",
        sdesc: "FLAG_CONCEALED",
        ldesc: "Only used on holy symbols with the conceal command",
        do_not_use: false
    }),
    FLAG_DONATION: new Flag({
        code: "FLAG_DONATION",
        sdesc: "FLAG_DONATION",
        ldesc: "Do not use.",
        do_not_use: true
    }),
    FLAG_POISONED: new Flag({
        code: "FLAG_POISONED",
        sdesc: "FLAG_POISONED",
        ldesc: "1/4 more damage",
        do_not_use: false
    }),
    FLAG_COVERING: new Flag({
        code: "FLAG_COVERING",
        sdesc: "FLAG_COVERING",
        ldesc: "For containers 'look under'",
        do_not_use: false
    }),
    FLAG_DEATHROT: new Flag({
        code: "FLAG_DEATHROT",
        sdesc: "FLAG_DEATHROT",
        ldesc: "Item disappears from corpse when the PC or moble dies",
        do_not_use: false
    }),
    FLAG_PROTOTYPE: new Flag({
        code: "FLAG_PROTOTYPE",
        sdesc: "FLAG_PROTOTYPE",
        ldesc: "Used in OLC. Not to be used for offline building.",
        do_not_use: true
    }),
    FLAG_BURIED: new Flag({
        code: "FLAG_BURIED",
        sdesc: "FLAG_BURIED",
        ldesc: "Item is underground",
        do_not_use: false
    }),
    FLAG_PERMANENT: new Flag({
        code: "FLAG_PERMANENT",
        sdesc: "FLAG_PERMANENT",
        ldesc: "Item stays on the PC through death.",
        do_not_use: false
    }),
    FLAG_TRANSPARENT: new Flag({
        code: "FLAG_TRANSPARENT",
        sdesc: "FLAG_TRANSPARENT",
        ldesc: "Items worn under this layer can be seen. Used for cloaks etc.",
        do_not_use: false
    }),
    FLAG_UNIQUE: new Flag({
        code: "FLAG_UNIQUE",
        sdesc: "FLAG_UNIQUE",
        ldesc: "Prevents the PC from wearing more than one of a specific object.",
        do_not_use: false
    })
};
const ITEM_QUALITY = {
    QUALITY_WORTHLESS: new Flag({
        code: "QUALITY_WORTHLESS",
        sdesc: "QUALITY_WORTHLESS"
    }),
    QUALITY_INFERIOR: new Flag({
        code: "QUALITY_INFERIOR",
        sdesc: "QUALITY_INFERIOR"
    }),
    QUALITY_LOW: new Flag({
        code: "QUALITY_LOW",
        sdesc: "QUALITY_LOW"
    }),
    QUALITY_AVERAGE: new Flag({
        code: "QUALITY_AVERAGE",
        sdesc: "QUALITY_AVERAGE"
    }),
    QUALITY_HIGH: new Flag({
        code: "QUALITY_HIGH",
        sdesc: "QUALITY_HIGH"
    }),
    QUALITY_SUPERIOR: new Flag({
        code: "QUALITY_SUPERIOR",
        sdesc: "QUALITY_SUPERIOR"
    }),
    QUALITY_OUTSTANDING: new Flag({
        code: "QUALITY_OUTSTANDING",
        sdesc: "QUALITY_OUTSTANDING"
    })
};
const ITEM_MATERIALS = {
    MATERIAL_UNKNOWN: new Flag({
        code: "MATERIAL_UNKNOWN",
        sdesc: "MATERIAL_UNKNOWN"
    }),
    MATERIAL_WOOD: new Flag({
        code: "MATERIAL_WOOD",
        sdesc: "MATERIAL_WOOD"
    }),
    MATERIAL_OAK: new Flag({
        code: "MATERIAL_OAK",
        sdesc: "MATERIAL_OAK"
    }),
    MATERIAL_YEW: new Flag({
        code: "MATERIAL_YEW",
        sdesc: "MATERIAL_YEW"
    }),
    MATERIAL_EBONY: new Flag({
        code: "MATERIAL_EBONY",
        sdesc: "MATERIAL_EBONY"
    }),
    MATERIAL_HARDWOOD: new Flag({
        code: "MATERIAL_HARDWOOD",
        sdesc: "MATERIAL_HARDWOOD"
    }),
    MATERIAL_ICE: new Flag({
        code: "MATERIAL_ICE",
        sdesc: "MATERIAL_ICE"
    }),
    MATERIAL_SOFTWOOD: new Flag({
        code: "MATERIAL_SOFTWOOD",
        sdesc: "MATERIAL_SOFTWOOD"
    }),
    MATERIAL_FLESH: new Flag({
        code: "MATERIAL_FLESH",
        sdesc: "MATERIAL_FLESH"
    }),
    MATERIAL_SILK: new Flag({
        code: "MATERIAL_SILK",
        sdesc: "MATERIAL_SILK"
    }),
    MATERIAL_WOOL: new Flag({
        code: "MATERIAL_WOOL",
        sdesc: "MATERIAL_WOOL"
    }),
    MATERIAL_CLOTH: new Flag({
        code: "MATERIAL_CLOTH",
        sdesc: "MATERIAL_CLOTH"
    }),
    MATERIAL_FUR: new Flag({
        code: "MATERIAL_FUR",
        sdesc: "MATERIAL_FUR"
    }),
    MATERIAL_WATER: new Flag({
        code: "MATERIAL_WATER",
        sdesc: "MATERIAL_WATER"
    }),
    MATERIAL_METAL: new Flag({
        code: "MATERIAL_METAL",
        sdesc: "MATERIAL_METAL"
    }),
    MATERIAL_SILVER: new Flag({
        code: "MATERIAL_SILVER",
        sdesc: "MATERIAL_SILVER"
    }),
    MATERIAL_GOLD: new Flag({
        code: "MATERIAL_GOLD",
        sdesc: "MATERIAL_GOLD"
    }),
    MATERIAL_STEEL: new Flag({
        code: "MATERIAL_STEEL",
        sdesc: "MATERIAL_STEEL"
    }),
    MATERIAL_LEAD: new Flag({
        code: "MATERIAL_LEAD",
        sdesc: "MATERIAL_LEAD"
    }),
    MATERIAL_BRONZE: new Flag({
        code: "MATERIAL_BRONZE",
        sdesc: "MATERIAL_BRONZE"
    }),
    MATERIAL_COPPER: new Flag({
        code: "MATERIAL_COPPER",
        sdesc: "MATERIAL_COPPER"
    }),
    MATERIAL_PLATINUM: new Flag({
        code: "MATERIAL_PLATINUM",
        sdesc: "MATERIAL_PLATINUM"
    }),
    MATERIAL_TITANIUM: new Flag({
        code: "MATERIAL_TITANIUM",
        sdesc: "MATERIAL_TITANIUM"
    }),
    MATERIAL_ALUMINIUM: new Flag({
        code: "MATERIAL_ALUMINIUM",
        sdesc: "MATERIAL_ALUMINIUM"
    }),
    MATERIAL_TIN: new Flag({
        code: "MATERIAL_TIN",
        sdesc: "MATERIAL_TIN"
    }),
    MATERIAL_IRON: new Flag({
        code: "MATERIAL_IRON",
        sdesc: "MATERIAL_IRON"
    }),
    MATERIAL_BRASS: new Flag({
        code: "MATERIAL_BRASS",
        sdesc: "MATERIAL_BRASS"
    }),
    MATERIAL_DIAMOND: new Flag({
        code: "MATERIAL_DIAMOND",
        sdesc: "MATERIAL_DIAMOND"
    }),
    MATERIAL_PEARL: new Flag({
        code: "MATERIAL_PEARL",
        sdesc: "MATERIAL_PEARL"
    }),
    MATERIAL_GEM: new Flag({
        code: "MATERIAL_GEM",
        sdesc: "MATERIAL_GEM"
    }),
    MATERIAL_RUBY: new Flag({
        code: "MATERIAL_RUBY",
        sdesc: "MATERIAL_RUBY"
    }),
    MATERIAL_OBSIDIAN: new Flag({
        code: "MATERIAL_OBSIDIAN",
        sdesc: "MATERIAL_OBSIDIAN"
    }),
    MATERIAL_IVORY: new Flag({
        code: "MATERIAL_IVORY",
        sdesc: "MATERIAL_IVORY"
    }),
    MATERIAL_MITHRIL: new Flag({
        code: "MATERIAL_MITHRIL",
        sdesc: "MATERIAL_MITHRIL"
    }),
    MATERIAL_ADAMANTIUM: new Flag({
        code: "MATERIAL_ADAMANTIUM",
        sdesc: "MATERIAL_ADAMANTIUM"
    }),
    MATERIAL_ENERGY: new Flag({
        code: "MATERIAL_ENERGY",
        sdesc: "MATERIAL_ENERGY"
    }),
    MATERIAL_GLASS: new Flag({
        code: "MATERIAL_GLASS",
        sdesc: "MATERIAL_GLASS"
    }),
    MATERIAL_PAPER: new Flag({
        code: "MATERIAL_PAPER",
        sdesc: "MATERIAL_PAPER"
    }),
    MATERIAL_MARBLE: new Flag({
        code: "MATERIAL_MARBLE",
        sdesc: "MATERIAL_MARBLE"
    }),
    MATERIAL_PLANT: new Flag({
        code: "MATERIAL_PLANT",
        sdesc: "MATERIAL_PLANT"
    }),
    MATERIAL_STONE: new Flag({
        code: "MATERIAL_STONE",
        sdesc: "MATERIAL_STONE"
    }),
    MATERIAL_HIDE: new Flag({
        code: "MATERIAL_HIDE",
        sdesc: "MATERIAL_HIDE"
    }),
    MATERIAL_BONE: new Flag({
        code: "MATERIAL_BONE",
        sdesc: "MATERIAL_BONE"
    }),
    MATERIAL_POWDER: new Flag({
        code: "MATERIAL_POWDER",
        sdesc: "MATERIAL_POWDER"
    }),
    MATERIAL_LEATHER: new Flag({
        code: "MATERIAL_LEATHER",
        sdesc: "MATERIAL_LEATHER"
    }),
    MATERIAL_OIL: new Flag({
        code: "MATERIAL_OIL",
        sdesc: "MATERIAL_OIL"
    }),
    MATERIAL_ELVEN: new Flag({
        code: "MATERIAL_ELVEN",
        sdesc: "MATERIAL_ELVEN"
    }),
    MATERIAL_ELECTRUM: new Flag({
        code: "MATERIAL_ELECTRUM",
        sdesc: "MATERIAL_ELECTRUM"
    }),
    MATERIAL_EMERALD: new Flag({
        code: "MATERIAL_EMERALD",
        sdesc: "MATERIAL_EMERALD"
    }),
    MATERIAL_SAPPHIRE: new Flag({
        code: "MATERIAL_SAPPHIRE",
        sdesc: "MATERIAL_SAPPHIRE"
    }),
    MATERIAL_COLD_IRON: new Flag({
        code: "MATERIAL_COLD_IRON",
        sdesc: "MATERIAL_COLD_IRON"
    }),
    MATERIAL_DRAGON_HIDE: new Flag({
        code: "MATERIAL_DRAGON_HIDE",
        sdesc: "MATERIAL_DRAGON_HIDE"
    }),
    MATERIAL_DARKWOOD: new Flag({
        code: "MATERIAL_DARKWOOD",
        sdesc: "MATERIAL_DARKWOOD"
    }),
    MATERIAL_ALCHEMICAL_SILVER: new Flag({
        code: "MATERIAL_ALCHEMICAL_SILVER",
        sdesc: "MATERIAL_ALCHEMICAL_SILVER"
    })
};
const ITEM_CONDITION = {
    COND_TERRIBLE: new Flag({
        code: "COND_TERRIBLE",
        sdesc: "COND_TERRIBLE"
    }),
    COND_AWFUL: new Flag({
        code: "COND_AWFUL",
        sdesc: "COND_AWFUL"
    }),
    COND_VERY_BAD: new Flag({
        code: "COND_VERY_BAD",
        sdesc: "COND_VERY_BAD"
    }),
    COND_BAD: new Flag({
        code: "COND_BAD",
        sdesc: "COND_BAD"
    }),
    COND_USABLE: new Flag({
        code: "COND_USABLE",
        sdesc: "COND_USABLE"
    }),
    COND_GOOD: new Flag({
        code: "COND_GOOD",
        sdesc: "COND_GOOD"
    }),
    COND_VERY_GOOD: new Flag({
        code: "COND_VERY_GOOD",
        sdesc: "COND_VERY_GOOD"
    }),
    COND_SUPERB: new Flag({
        code: "COND_SUPERB",
        sdesc: "COND_SUPERB"
    }),
    COND_PERFECT: new Flag({
        code: "COND_PERFECT",
        sdesc: "COND_PERFECT"
    })
};
const ITEM_SIZES = {
    SIZE_TINY: new Flag({
        code: "SIZE_TINY",
        sdesc: "SIZE_TINY"
    }),
    SIZE_SMALL: new Flag({
        code: "SIZE_SMALL",
        sdesc: "SIZE_SMALL"
    }),
    SIZE_MEDIUM: new Flag({
        code: "SIZE_MEDIUM",
        sdesc:"SIZE_MEDIUM" 
    }),
    SIZE_LARGE: new Flag({
        code: "SIZE_LARGE",
        sdesc: "SIZE_LARGE"
    }),
    SIZE_HUGE: new Flag({
        code: "SIZE_HUGE",
        sdesc: "SIZE_HUGE"
    }),
    SIZE_GIANT: new Flag({
        code: "SIZE_GIANT",
        sdesc: "SIZE_GIANT"
    })
};
const ITEM_APPLIES = {
    APPLY_STR: new Flag({
        code: "APPLY_STR",
        sdesc: "APPLY_STR",
        ldesc: "Adds or takes away strength.",
        do_not_use: false
    }),
    APPLY_DEX: new Flag({
        code: "APPLY_DEX",
        sdesc: "APPLY_DEX",
        ldesc: "Adds or takes away from dexterity",
        do_not_use: false
    }),
    APPLY_INT: new Flag({
        code: "APPLY_INT",
        sdesc: "APPLY_INT",
        ldesc: "Adds or takes away from intelligence",
        do_not_use: false
    }),
    APPLY_WIS: new Flag({
        code: "APPLY_WIS",
        sdesc: "APPLY_WIS",
        ldesc: "Adds or takes away from wisdom",
        do_not_use: false
    }),
    APPLY_CON: new Flag({
        code: "APPLY_CON",
        sdesc: "APPLY_CON",
        ldesc: "Adds or takes away from constitution",
        do_not_use: false
    }),
    APPLY_SEX: new Flag({
        code: "APPLY_SEX",
        sdesc: "APPLY_SEX",
        ldesc: "Changes the sex of the PC by the value",
        do_not_use: false
    }),
    APPLY_CLASS: new Flag({
        code: "APPLY_CLASS",
        sdesc: "APPLY_CLASS",
        ldesc: "Do not use",
        do_not_use: true
    }),
    APPLY_LEVEL: new Flag({
        code: "APPLY_LEVEL",
        sdesc: "APPLY_LEVEL",
        ldesc: "Do not use",
        do_not_use: true
    }),
    APPLY_AGE: new Flag({
        code: "APPLY_AGE",
        sdesc: "APPLY_AGE",
        ldesc: "Do not use",
        do_not_use: true
    }),
    APPLY_HEIGHT: new Flag({
        code: "APPLY_HEIGHT",
        sdesc: "APPLY_HEIGHT",
        ldesc: "Adds to or takes away from the height of the character",
        do_not_use: false
    }),
    APPLY_WEIGHT: new Flag({
        code: "APPLY_WEIGHT",
        sdesc: "APPLY_WEIGHT",
        ldesc: "Adds to or takes away from the characters weight. (Not the weight carried)",
        do_not_use: false
    }),
    APPLY_MANA: new Flag({
        code: "APPLY_MANA",
        sdesc: "APPLY_MANA",
        ldesc: "Adds to or takes away from the character's total mana",
        do_not_use: false
    }),
    APPLY_HIT: new Flag({
        code: "APPLY_HIT",
        sdesc: "APPLY_HIT",
        ldesc: "Adds to or takes away from the total hitpoints of the character",
        do_not_use: false
    }),
    APPLY_MOVE: new Flag({
        code: "APPLY_MOVE",
        sdesc: "APPLY_MOVE",
        ldesc: "Adds to or takes away from the total stamina/move of the character",
        do_not_use: false
    }),
    APPLY_VALUE: new Flag({
        code: "APPLY_VALUE",
        sdesc: "APPLY_VALUE",
        ldesc: "Adds to or takes value from an object. This is measured in Copper.",
        do_not_use: false
    }),
    APPLY_EXP: new Flag({
        code: "APPLY_EXP",
        sdesc: "APPLY_EXP",
        ldesc: "Do not use",
        do_not_use: true
    }),
    APPLY_AC: new Flag({
        code: "APPLY_AC",
        sdesc: "APPLY_AC",
        ldesc: "Affects the character/s armor class. Negative value improves armour class, a postitive value degrades armour class",
        do_not_use: false
    }),
    APPLY_HITROLL: new Flag({
        code: "APPLY_HITROLL",
        sdesc: "APPLY_HITROLL",
        ldesc: "Adds or takes away hitroll to/from a weapon",
        do_not_use: false
    }),
    APPLY_DAMROLL: new Flag({
        code: "APPLY_DAMROLL",
        sdesc: "APPLY_DAMROLL",
        ldesc: "Adds or takes away dammroll from a weapon",
        do_not_use: false
    }),
    APPLY_RANGE: new Flag({
        code: "APPLY_RANGE",
        sdesc: "APPLY_RANGE",
        ldesc: "Allows the character to shoot or throw further or less, by the number of rooms specified",
        do_not_use: false
    }),
    APPLY_BOWS: new Flag({
        code: "APPLY_BOWS",
        sdesc: "APPLY_BOWS",
        ldesc: "Adds or takes away from the characters bow skill",
        do_not_use: false
    }),
    APPLY_SAP: new Flag({
        code: "APPLY_SAP",
        sdesc: "APPLY_SAP",
        ldesc: "Adds or takes away from the characters sap skill",
        do_not_use: false
    }),
    APPLY_BRAWLING: new Flag({
        code: "APPLY_BRAWLING",
        sdesc: "APPLY_BRAWLING",
        ldesc: "Adds or takes away from the characters brawling skill",
        do_not_use: false
    }),
    APPLY_APPRAISE: new Flag({
        code: "APPLY_APPRAISE",
        sdesc: "APPLY_APPRAISE",
        ldesc: "Adds or takes away from the characters appraise skill",
        do_not_use: false
    }),
    APPLY_CHA: new Flag({
        code: "APPLY_CHA",
        sdesc: "APPLY_CHA",
        ldesc: "Adds to or takes away from a PC's charisma",
        do_not_use: false
    }),
    APPLY_AFFECT: new Flag({
        code: "APPLY_AFFECT",
        sdesc: "APPLY_AFFECT",
        ldesc: "Used to apply AFF_ flags. Character remains affected while the object is worn.",
        do_not_use: false
    }),
    APPLY_RESISTANT: new Flag({
        code: "APPLY_RESISTANT",
        sdesc: "APPLY_RESISTANT",
        ldesc: "No longer in use. Do not use.",
        do_not_use: true
    }),
    APPLY_IMMUNE: new Flag({
        code: "APPLY_IMMUNE",
        sdesc: "APPLY_IMMUNE",
        ldesc: "No longer in use. Do not use.",
        do_not_use: true
    }),
    APPLY_SUSCEPTIBLE: new Flag({
        code: "APPLY_SUSCEPTIBLE",
        sdesc: "APPLY_SUSCEPTIBLE",
        ldesc: "No longer in use. Do not use.",
        do_not_use: true
    }),
    APPLY_WEAPONSPELL: new Flag({
        code: "APPLY_WEAPONSPELL",
        sdesc: "APPLY_WEAPONSPELL",
        ldesc: "Casts a spell when hitting use SPELL_ 100 % of the time.",
        do_not_use: false
    }),
    APPLY_LCK: new Flag({
        code: "APPLY_LCK",
        sdesc: "APPLY_LCK",
        ldesc: "Adds to or takes away from luck",
        do_not_use: false
    }),
    APPLY_BACKSTAB: new Flag({
        code: "APPLY_BACKSTAB",
        sdesc: "APPLY_BACKSTAB",
        ldesc: "Adds to or takes away from the backstab skill",
        do_not_use: false
    }),
    APPLY_PICK: new Flag({
        code: "APPLY_PICK",
        sdesc: "APPLY_PICK",
        ldesc: "Adds to or takes away from the pick locks skill",
        do_not_use: false
    }),
    APPLY_TRACK: new Flag({
        code: "APPLY_TRACK",
        sdesc: "APPLY_TRACK",
        ldesc: "Adds to or takes away from the track skill",
        do_not_use: false
    }),
    APPLY_STEAL: new Flag({
        code: "APPLY_STEAL",
        sdesc: "APPLY_STEAL",
        ldesc: "Adds to or takes away from the steal skill",
        do_not_use: false
    }),
    APPLY_SNEAK: new Flag({
        code: "APPLY_SNEAK",
        sdesc: "APPLY_SNEAK",
        ldesc: "Adds to or takes away from the sneak skill",
        do_not_use: false
    }),
    APPLY_HIDE: new Flag({
        code: "APPLY_HIDE",
        sdesc: "APPLY_HIDE",
        ldesc: "Adds to or takes away from the hide skill",
        do_not_use: false
    }),
    APPLY_PALM: new Flag({
        code: "APPLY_PALM",
        sdesc: "APPLY_PALM",
        ldesc: "Not coded. Do not use.",
        do_not_use: true
    }),
    APPLY_DETRAP: new Flag({
        code: "APPLY_DETRAP",
        sdesc: "APPLY_DETRAP",
        ldesc: "Adds to or takes away from the detrap skill",
        do_not_use: false
    }),
    APPLY_DODGE: new Flag({
        code: "APPLY_DODGE",
        sdesc: "APPLY_DODGE",
        ldesc: "Adds to or takes away from the dodge skill",
        do_not_use: false
    }),
    APPLY_PEEK: new Flag({
        code: "APPLY_PEEK",
        sdesc: "APPLY_PEEK",
        ldesc: "Adds to or takes away from the peek skill",
        do_not_use: false
    }),
    APPLY_SCAN: new Flag({
        code: "APPLY_SCAN",
        sdesc: "APPLY_SCAN",
        ldesc: "No longer used",
        do_not_use: true
    }),
    APPLY_GOUGE: new Flag({
        code: "APPLY_GOUGE",
        sdesc: "APPLY_GOUGE",
        ldesc: "Adds to or takes away from the gouge skill",
        do_not_use: false
    }),
    APPLY_SEARCH: new Flag({
        code: "APPLY_SEARCH",
        sdesc: "APPLY_SEARCH",
        ldesc: "Adds to or takes away from the search skill",
        do_not_use: false
    }),
    APPLY_MOUNT: new Flag({
        code: "APPLY_MOUNT",
        sdesc: "APPLY_MOUNT",
        ldesc: "Adds to or takes away from the mount skill",
        do_not_use: false
    }),
    APPLY_DISARM: new Flag({
        code: "APPLY_DISARM",
        sdesc: "APPLY_DISARM",
        ldesc: "Adds to or takes away from the disarm skill",
        do_not_use: false
    }),
    APPLY_KICK: new Flag({
        code: "APPLY_KICK",
        sdesc: "APPLY_KICK",
        ldesc: "Adds to or takes away from the kick skill",
        do_not_use: false
    }),
    APPLY_PARRY: new Flag({
        code: "APPLY_PARRY",
        sdesc: "APPLY_PARRY",
        ldesc: "Adds to or takes away from the parry skill",
        do_not_use: false
    }),
    APPLY_BASH: new Flag({
        code: "APPLY_BASH",
        sdesc: "APPLY_BASH",
        ldesc: "Adds to or takes away from the bash skill",
        do_not_use: false
    }),
    APPLY_STUN: new Flag({
        code: "APPLY_STUN",
        sdesc: "APPLY_STUN",
        ldesc: "Adds to or takes away from the stun skill",
        do_not_use: false
    }),
    APPLY_PUNCH: new Flag({
        code: "APPLY_PUNCH",
        sdesc: "APPLY_PUNCH",
        ldesc: "Adds to or takes away from the punch skill",
        do_not_use: false
    }),
    APPLY_CLIMB: new Flag({
        code: "APPLY_CLIMB",
        sdesc: "APPLY_CLIMB",
        ldesc: "Adds to or takes away from the climb skill",
        do_not_use: false
    }),
    APPLY_GRIP: new Flag({
        code: "APPLY_GRIP",
        sdesc: "APPLY_GRIP",
        ldesc: "Adds to or takes away from the grip skill",
        do_not_use: false
    }),
    APPLY_SCRIBE: new Flag({
        code: "APPLY_SCRIBE",
        sdesc: "APPLY_SCRIBE",
        ldesc: "Adds to or takes away from the scribe skill",
        do_not_use: false
    }),
    APPLY_BREW: new Flag({
        code: "APPLY_BREW",
        sdesc: "APPLY_BREW",
        ldesc: "Adds to or takes away from the brew potions skill",
        do_not_use: false
    }),
    APPLY_WEARSPELL: new Flag({
        code: "APPLY_WEARSPELL",
        sdesc: "APPLY_WEARSPELL",
        ldesc: "Used to apply SPELL_ spell affects. Spell is applied to wearer when object is worn, and will wear off like a normal spell.",
        do_not_use: false
    }),
    APPLY_REMOVESPELL: new Flag({
        code: "APPLY_REMOVESPELL",
        sdesc: "APPLY_REMOVESPELL",
        ldesc: "When object is removed, the SPELL_ affects the character.",
        do_not_use: false
    }),
    APPLY_EMOTION: new Flag({
        code: "APPLY_EMOTION",
        sdesc: "APPLY_EMOTION",
        ldesc: "Adds to or takes away from a PC's emotional state",
        do_not_use: false
    }),
    APPLY_MENTALSTATE: new Flag({
        code: "APPLY_MENTALSTATE",
        sdesc: "APPLY_MENTALSTATE",
        ldesc: "Adds to or takes away from a PC's mental state",
        do_not_use: false
    }),
    APPLY_STRIPSN: new Flag({
        code: "APPLY_STRIPSN",
        sdesc: "APPLY_STRIPSN",
        ldesc: "Use SPELL_ here.",
        do_not_use: false
    }),
    APPLY_REMOVE: new Flag({
        code: "APPLY_REMOVE",
        sdesc: "APPLY_REMOVE",
        ldesc: "Use AFF_ flags here. Removes the affect upon wearing the object.",
        do_not_use: false
    }),
    APPLY_DIG: new Flag({
        code: "APPLY_DIG",
        sdesc: "APPLY_DIG",
        ldesc: "Adds to or takes away from a PC's dig skill",
        do_not_use: false
    }),
    APPLY_FULL: new Flag({
        code: "APPLY_FULL",
        sdesc: "APPLY_FULL",
        ldesc: "Affects the hours until the PC is hungry",
        do_not_use: false
    }),
    APPLY_THIRST: new Flag({
        code: "APPLY_THIRST",
        sdesc: "APPLY_THIRST",
        ldesc: "Affects the hours until the PC is thirsty",
        do_not_use: false
    }),
    APPLY_DRUNK: new Flag({
        code: "APPLY_DRUNK",
        sdesc: "APPLY_DRUNK",
        ldesc: "Affects the hours until the PC is sober",
        do_not_use: false
    }),
    APPLY_BLOOD: new Flag({
        code: "APPLY_BLOOD",
        sdesc: "APPLY_BLOOD",
        ldesc: "Do not use.",
        do_not_use: true
    }),
    APPLY_HAGGLE: new Flag({
        code: "APPLY_HAGGLE",
        sdesc: "APPLY_HAGGLE",
        ldesc: "Increases or decreases the characters haggle skill.",
        do_not_use: false
    }),
    APPLY_OBJWEIGHT: new Flag({
        code: "APPLY_OBJWEIGHT",
        sdesc: "APPLY_OBJWEIGHT",
        ldesc: "Increases or decreases the weight of the object.",
        do_not_use: false
    }),
    APPLY_RESIST_MAGIC: new Flag({
        code: "APPLY_RESIST_MAGIC",
        sdesc: "APPLY_RESIST_MAGIC",
        ldesc: "Wearing of the object affects the characters resistance to magic",
        do_not_use: false
    }),
    APPLY_RESIST_FIRE: new Flag({
        code: "APPLY_RESIST_FIRE",
        sdesc: "APPLY_RESIST_FIRE",
        ldesc: "Wearing of the object affects the characters resistance to fire",
        do_not_use: false
    }),
    APPLY_RESIST_COLD: new Flag({
        code: "APPLY_RESIST_COLD",
        sdesc: "APPLY_RESIST_COLD",
        ldesc: "Wearing of the object affects the characters resistance to cold",
        do_not_use: false
    }),
    APPLY_RESIST_ELECTRICITY: new Flag({
        code: "APPLY_RESIST_ELECTRICITY",
        sdesc: "APPLY_RESIST_ELECTRICITY",
        ldesc: "Wearing of the object affects the characters resistance to electricity",
        do_not_use: false
    }),
    APPLY_RESIST_ENERGY: new Flag({
        code: "APPLY_RESIST_ENERGY",
        sdesc: "APPLY_RESIST_ENERGY",
        ldesc: "Wearing of the object affects the characters resistance to energy",
        do_not_use: false
    }),
    APPLY_RESIST_ACID: new Flag({
        code: "APPLY_RESIST_ACID",
        sdesc: "APPLY_RESIST_ACID",
        ldesc: "Wearing of the object affects the characters resistance to acid",
        do_not_use: false
    }),
    APPLY_RESIST_POISON: new Flag({
        code: "APPLY_RESIST_POISON",
        sdesc: "APPLY_RESIST_POISON",
        ldesc: "Wearing of the object affects the characters resistance to poison",
        do_not_use: false
    }),
    APPLY_RESIST_DRAIN: new Flag({
        code: "APPLY_RESIST_DRAIN",
        sdesc: "APPLY_RESIST_DRAIN",
        ldesc: "Wearing of the object affects the characters resistance to drain",
        do_not_use: false
    }),
    APPLY_RESIST_HOLD: new Flag({
        code: "APPLY_RESIST_HOLD",
        sdesc: "APPLY_RESIST_HOLD",
        ldesc: "Wearing of the object affects the characters resistance to hold spells",
        do_not_use: false
    }),
    APPLY_RESIST_PHYSICAL: new Flag({
        code: "APPLY_RESIST_PHYSICAL",
        sdesc: "APPLY_RESIST_PHYSICAL",
        ldesc: "Wearing of the object affects the characters resistance to physical attacks",
        do_not_use: false
    }),
    APPLY_RESIST_HEALING: new Flag({
        code: "APPLY_RESIST_HEALING",
        sdesc: "APPLY_RESIST_HEALING",
        ldesc: "Wearing of the object affects the characters resistance to healing",
        do_not_use: false
    }),
    APPLY_RESIST_MIND: new Flag({
        code: "APPLY_RESIST_MIND",
        sdesc: "APPLY_RESIST_MIND",
        ldesc: "Wearing of the object affects the characters resistance to mind spells and attacks",
        do_not_use: false
    }),
    APPLY_RESIST_BASH: new Flag({
        code: "APPLY_RESIST_BASH",
        sdesc: "APPLY_RESIST_BASH",
        ldesc: "Wearing of the object affects the characters resistance to bash",
        do_not_use: false
    }),
    APPLY_RESIST_PIERCE: new Flag({
        code: "APPLY_RESIST_PIERCE",
        sdesc: "APPLY_RESIST_PIERCE",
        ldesc: "Wearing of the object affects the characters resistance to piercing weapons",
        do_not_use: false
    }),
    APPLY_RESIST_SLASH: new Flag({
        code: "APPLY_RESIST_SLASH",
        sdesc: "APPLY_RESIST_SLASH",
        ldesc: "Wearing of the object affects the characters resistance to slashing weapons",
        do_not_use: false
    }),
    APPLY_RESIST_NONMAGIC: new Flag({
        code: "APPLY_RESIST_NONMAGIC",
        sdesc: "APPLY_RESIST_NONMAGIC",
        ldesc: "Wearing of the object affects the characters resistance to non magical attacks",
        do_not_use: false
    }),
    APPLY_MAGIC: new Flag({
        code: "APPLY_MAGIC",
        sdesc: "APPLY_MAGIC",
        ldesc: "Wearing of the object increases magic damage",
        do_not_use: false
    }),
    APPLY_FIRE: new Flag({
        code: "APPLY_FIRE",
        sdesc: "APPLY_FIRE",
        ldesc: "Wearing of the object increases fire damage",
        do_not_use: false
    }),
    APPLY_COLD: new Flag({
        code: "APPLY_COLD",
        sdesc: "APPLY_COLD",
        ldesc: "Wearing of the object increases cold damage",
        do_not_use: false
    }),
    APPLY_ELECTRICITY: new Flag({
        code: "APPLY_ELECTRICITY",
        sdesc: "APPLY_ELECTRICITY",
        ldesc: "Wearing of the object increases electrical damage",
        do_not_use: false
    }),
    APPLY_ENERGY: new Flag({
        code: "APPLY_ENERGY",
        sdesc: "APPLY_ENERGY",
        ldesc: "Wearing of the object increases energy damage",
        do_not_use: false
    }),
    APPLY_ACID: new Flag({
        code: "APPLY_ACID",
        sdesc: "APPLY_ACID",
        ldesc: "Wearing of the object increases acid damage",
        do_not_use: false
    }),
    APPLY_POISON: new Flag({
        code: "APPLY_POISON",
        sdesc: "APPLY_POISON",
        ldesc: "Wearing of the object increases poison damage",
        do_not_use: false
    }),
    APPLY_DRAIN: new Flag({
        code: "APPLY_DRAIN",
        sdesc: "APPLY_DRAIN",
        ldesc: "Wearing of the object increases drain damage",
        do_not_use: false
    }),
    APPLY_HEALING: new Flag({
        code: "APPLY_HEALING",
        sdesc: "APPLY_HEALING",
        ldesc: "Wearing of the object increases healing",
        do_not_use: false
    }),
    APPLY_PHYSICAL: new Flag({
        code: "APPLY_PHYSICAL",
        sdesc: "APPLY_PHYSICAL",
        ldesc: "Wearing of the object increases physical damage",
        do_not_use: false
    }),
    APPLY_MIND: new Flag({
        code: "APPLY_MIND",
        sdesc: "APPLY_MIND",
        ldesc: "Wearing of the object increases mind damage",
        do_not_use: false
    }),
    APPLY_BLUDGEON: new Flag({
        code: "APPLY_BLUDGEON",
        sdesc: "APPLY_BLUDGEON",
        ldesc: "Wearing of the object increases bludgeon damage",
        do_not_use: false
    }),
    APPLY_PIERCE: new Flag({
        code: "APPLY_PIERCE",
        sdesc: "APPLY_PIERCE",
        ldesc: "Wearing of the object increases piercing damage",
        do_not_use: false
    }),
    APPLY_SLASH: new Flag({
        code: "APPLY_SLASH",
        sdesc: "APPLY_SLASH",
        ldesc: "Wearing of the object increases slashing damage",
        do_not_use: false
    }),
    APPLY_WEAPONSPELL_ONE: new Flag({
        code: "APPLY_WEAPONSPELL_ONE",
        sdesc: "APPLY_WEAPONSPELL_ONE",
        ldesc: "Casts a spell when hitting use SPELL_ 10 % of the time.",
        do_not_use: false
    }),
    APPLY_WEAPONSPELL_TWO: new Flag({
        code: "APPLY_WEAPONSPELL_TWO",
        sdesc: "APPLY_WEAPONSPELL_TWO",
        ldesc: "Casts a spell when hitting use SPELL_ 25 % of the time.",
        do_not_use: false
    }),
    APPLY_WEAPONSPELL_FIVE: new Flag({
        code: "APPLY_WEAPONSPELL_FIVE",
        sdesc: "APPLY_WEAPONSPELL_FIVE",
        ldesc: "Casts a spell when hitting use SPELL_ 50 % of the time.",
        do_not_use: false
    }),
    APPLY_DUAL_WIELD: new Flag({
        code: "APPLY_DUAL_WIELD",
        sdesc: "APPLY_DUAL_WIELD",
        ldesc: "Increases or decreases the dual wield skill",
        do_not_use: false
    }),
    APPLY_DISGUISE: new Flag({
        code: "APPLY_DISGUISE",
        sdesc: "APPLY_DISGUISE",
        ldesc: "Increases or decreases the disguise skill",
        do_not_use: false
    }),
    APPLY_LEVEL_ONE_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_ONE_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_ONE_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 1 spell slots",
        do_not_use: false
    }),
    APPLY_LEVEL_TWO_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_TWO_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_TWO_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 2 spell slots",
        do_not_use: false
    }),
    APPLY_LEVEL_THREE_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_THREE_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_THREE_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 3 spell slots",
        do_not_use: false
    }),
    APPLY_LEVEL_FOUR_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_FOUR_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_FOUR_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 4 spell slots",
        do_not_use: false
    }),
    APPLY_LEVEL_FIVE_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_FIVE_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_FIVE_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 5 spell slots",
        do_not_use: false
    }),
    APPLY_LEVEL_SIX_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_SIX_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_SIX_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 6 spell slots",
        do_not_use: false
    }),
    APPLY_LEVEL_SEVEN_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_SEVEN_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_SEVEN_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 7 spell slots",
        do_not_use: false
    }),
    APPLY_LEVEL_EIGHT_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_EIGHT_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_EIGHT_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 8 spell slots",
        do_not_use: false
    }),
    APPLY_LEVEL_NINE_SPELL_SLOTS: new Flag({
        code: "APPLY_LEVEL_NINE_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_NINE_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 9 spell slots",
        do_not_use: false
    }),
    APPLY_EXHAUSTION_MENTAL_STATE: new Flag({
        code: "APPLY_EXHAUSTION_MENTAL_STATE",
        sdesc: "APPLY_EXHAUSTION_MENTAL_STATE",
        ldesc: "Modifies the exhaustion mental state of the wearer (100 for dead tired, 0 for normal)",
        do_not_use: false
    }),
    APPLY_SANITY_MENTAL_STATE: new Flag({
        code: "APPLY_SANITY_MENTAL_STATE",
        sdesc: "APPLY_SANITY_MENTAL_STATE",
        ldesc: "Modifies the sanity mental state of the wearer (100 for mad, 0 for normal)",
    })
};
const ITEM_WEAPON_FLAGS = {
    WFLAG_ARROW_DEFLECTION: new Flag({
        code: "WFLAG_ARROW_DEFLECTION",
        sdesc: "WFLAG_ARROW_DEFLECTION",
        ldesc: "Acts as if the PC has the arrow deflection feat while wielding a weapon",
        do_not_use: true
    }),
    WFLAG_REFLECTIVE: new Flag({
        code: "WFLAG_REFLECTIVE",
        sdesc: "WFLAG_REFLECTIVE",
        ldesc: "Weapon will reflect spells back at the caster",
        do_not_use: true
    }),
    WFLAG_BANE: new Flag({
        code: "WFLAG_BANE",
        sdesc: "WFLAG_BANE",
        ldesc: "Increased modifiers against a specific race",
        do_not_use: true
    }),
    WFLAG_DISRUPTION: new Flag({
        code: "WFLAG_DISRUPTION",
        sdesc: "WFLAG_DISRUPTION",
        ldesc: "Critical hits have a chance of destroying undead - doing 2-4 times normal damage",
        do_not_use: true
    }),
    WFLAG_RETURNING: new Flag({
        code: "WFLAG_RETURNING",
        sdesc: "WFLAG_RETURNING",
        ldesc: "Thrown weapons or projectiles to the PC's inventory after use",
        do_not_use: true
    }),
    WFLAG_SPEED: new Flag({
        code: "WFLAG_SPEED",
        sdesc: "WFLAG_SPEED",
        ldesc: "Increased number of attacks",
        do_not_use: true
    }),
    WFLAG_THROWING: new Flag({
        code: "WFLAG_THROWING",
        sdesc: "WFLAG_THROWING",
        ldesc: "A normally unthrown weapon has the ability to be thrown",
        do_not_use: true
    }),
    WFLAG_WOUNDING: new Flag({
        code: "WFLAG_WOUNDING",
        sdesc: "WFLAG_WOUNDING",
        ldesc: "Causes the victim to bleed",
        do_not_use: true
    }),
    WFLAG_VENOMOUS: new Flag({
        code: "WFLAG_VENOMOUS",
        sdesc: "WFLAG_VENOMOUS",
        ldesc: "The weapon is always poisonous, it does not need poison to be reapplied",
        do_not_use: true
    }),
    WFLAG_SMITING: new Flag({
        code: "WFLAG_SMITING",
        sdesc: "WFLAG_SMITING",
        ldesc: "Critical hit gives the weapon a chance of destroying constructs",
        do_not_use: true
    }),
    WFLAG_VAMPIRIC: new Flag({
        code: "WFLAG_VAMPIRIC",
        sdesc: "WFLAG_VAMPIRIC",
        ldesc: "The weapon will give hitpoints to the wielder and take them from the victim",
        do_not_use: true
    }),
    WFLAG_KEEN: new Flag({
        code: "WFLAG_KEEN",
        sdesc: "WFLAG_KEEN",
        ldesc: "Increased critical threat range",
        do_not_use: true
    }),
    WFLAG_VORPAL: new Flag({
        code: "WFLAG_VORPAL",
        sdesc: "WFLAG_VORPAL",
        ldesc: "Chance of severing limbs",
        do_not_use: true
    }),
    WFLAG_BACKSTABBING: new Flag({
        code: "WFLAG_BACKSTABBING",
        sdesc: "WFLAG_BACKSTABBING",
        ldesc: "Increased damage from backstabs",
        do_not_use: true
    }),
    WFLAG_HOLY: new Flag({
        code: "WFLAG_HOLY",
        sdesc: "WFLAG_HOLY",
        ldesc: "Increased damage to undead and outsiders",
        do_not_use: true
    }),
    WFLAG_DEFENDER: new Flag({
        code: "WFLAG_DEFENDER",
        sdesc: "WFLAG_DEFENDER",
        ldesc: "Increased AC",
        do_not_use: true
    })
};
const ITEM_WEAPON_TYPES = {
    WEAPON_TYPE_BASTARD_SWORD: new Flag({
        code: "WEAPON_TYPE_BASTARD_SWORD",
        sdesc: "WEAPON_TYPE_BASTARD_SWORD",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_BATTLE_AXE: new Flag({
        code: "WEAPON_TYPE_BATTLE_AXE",
        sdesc: "WEAPON_TYPE_BATTLE_AXE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_BLACKJACK: new Flag({
        code: "WEAPON_TYPE_BLACKJACK",
        sdesc: "WEAPON_TYPE_BLACKJACK",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_BOAR_SPEAR: new Flag({
        code: "WEAPON_TYPE_BOAR_SPEAR",
        sdesc: "WEAPON_TYPE_BOAR_SPEAR",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_BOLA: new Flag({
        code: "WEAPON_TYPE_BOLA",
        sdesc: "WEAPON_TYPE_BOLA",
        projectile: false,
        thrown: true,
        exotic: true
    }),
    WEAPON_TYPE_BOOMERANG: new Flag({
        code: "WEAPON_TYPE_BOOMERANG",
        sdesc: "WEAPON_TYPE_BOOMERANG",
        projectile: false,
        thrown: true,
        exotic: true
    }),
    WEAPON_TYPE_BROAD_SWORD: new Flag({
        code: "WEAPON_TYPE_BROAD_SWORD",
        sdesc: "WEAPON_TYPE_BROAD_SWORD",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_CAT_O_NINE_TAILS: new Flag({
        code: "WEAPON_TYPE_CAT_O_NINE_TAILS",
        sdesc: "WEAPON_TYPE_CAT_O_NINE_TAILS",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_FULLBLADE: new Flag({
        code: "WEAPON_TYPE_FULLBLADE",
        sdesc: "WEAPON_TYPE_FULLBLADE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_CLUB: new Flag({
        code: "WEAPON_TYPE_CLUB",
        sdesc: "WEAPON_TYPE_CLUB",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_COMPOSITE_BOW: new Flag({
        code: "WEAPON_TYPE_COMPOSITE_BOW",
        sdesc: "WEAPON_TYPE_COMPOSITE_BOW",
        projectile: true,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_GREATCLUB: new Flag({
        code: "WEAPON_TYPE_GREATCLUB",
        sdesc: "WEAPON_TYPE_GREATCLUB",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_CUTLASS: new Flag({
        code: "WEAPON_TYPE_CUTLASS",
        sdesc: "WEAPON_TYPE_CUTLASS",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_DAGGER: new Flag({
        code: "WEAPON_TYPE_DAGGER",
        sdesc: "WEAPON_TYPE_DAGGER",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_DARTS: new Flag({
        code: "WEAPON_TYPE_DARTS",
        sdesc: "WEAPON_TYPE_DARTS",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_DIRK: new Flag({
        code: "WEAPON_TYPE_DIRK",
        sdesc: "WEAPON_TYPE_DIRK",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_FALCHION: new Flag({
        code: "WEAPON_TYPE_FALCHION",
        sdesc: "WEAPON_TYPE_FALCHION",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_FLAIL: new Flag({
        code: "WEAPON_TYPE_FLAIL",
        sdesc: "WEAPON_TYPE_FLAIL",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_FISHING_NET: new Flag({
        code: "WEAPON_TYPE_FISHING_NET",
        sdesc: "WEAPON_TYPE_FISHING_NET",
        projectile: false,
        thrown: true,
        exotic: true
    }),
    WEAPON_TYPE_FOIL: new Flag({
        code: "WEAPON_TYPE_FOIL",
        sdesc: "WEAPON_TYPE_FOIL",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_GLADIATOR_NET: new Flag({
        code: "WEAPON_TYPE_GLADIATOR_NET",
        sdesc: "WEAPON_TYPE_GLADIATOR_NET",
        projectile: false,
        thrown: true,
        exotic: true
    }),
    WEAPON_TYPE_HALBERD: new Flag({
        code: "WEAPON_TYPE_HALBERD",
        sdesc: "WEAPON_TYPE_HALBERD",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_HANDAXE: new Flag({
        code: "WEAPON_TYPE_HANDAXE",
        sdesc: "WEAPON_TYPE_HANDAXE",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_HEAVY_CROSSBOW: new Flag({
        code: "WEAPON_TYPE_HEAVY_CROSSBOW",
        sdesc: "WEAPON_TYPE_HEAVY_CROSSBOW",
        projectile: true,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_HARPOON: new Flag({
        code: "WEAPON_TYPE_HARPOON",
        sdesc: "WEAPON_TYPE_HARPOON",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_JAVELIN: new Flag({
        code: "WEAPON_TYPE_JAVELIN",
        sdesc: "WEAPON_TYPE_JAVELIN",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_JO: new Flag({
        code: "WEAPON_TYPE_JO",
        sdesc: "WEAPON_TYPE_JO",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_KATANA: new Flag({
        code: "WEAPON_TYPE_KATANA",
        sdesc: "WEAPON_TYPE_KATANA",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_LANCE: new Flag({
        code: "WEAPON_TYPE_LANCE",
        sdesc: "WEAPON_TYPE_LANCE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_LASSO: new Flag({
        code: "WEAPON_TYPE_LASSO",
        sdesc: "WEAPON_TYPE_LASSO",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_LIGHT_CROSSBOW: new Flag({
        code: "WEAPON_TYPE_LIGHT_CROSSBOW",
        sdesc: "WEAPON_TYPE_LIGHT_CROSSBOW",
        projectile: true,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_LONG_BOW: new Flag({
        code: "WEAPON_TYPE_LONG_BOW",
        sdesc: "WEAPON_TYPE_LONG_BOW",
        projectile: true,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_LONG_SWORD: new Flag({
        code: "WEAPON_TYPE_LONG_SWORD",
        sdesc: "WEAPON_TYPE_LONG_SWORD",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_MACE: new Flag({
        code: "WEAPON_TYPE_MACE",
        sdesc: "WEAPON_TYPE_MACE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_MAIN_GAUCHE: new Flag({
        code: "WEAPON_TYPE_MAIN_GAUCHE",
        sdesc: "WEAPON_TYPE_MAIN_GAUCHE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_MORNING_STAR: new Flag({
        code: "WEAPON_TYPE_MORNING_STAR",
        sdesc: "WEAPON_TYPE_MORNING_STAR",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_NAGINATA: new Flag({
        code: "WEAPON_TYPE_NAGINATA",
        sdesc: "WEAPON_TYPE_NAGINATA",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_NUNCHAKU: new Flag({
        code: "WEAPON_TYPE_NUNCHAKU",
        sdesc: "WEAPON_TYPE_NUNCHAKU",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_PICK: new Flag({
        code: "WEAPON_TYPE_PICK",
        sdesc: "WEAPON_TYPE_PICK",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_PILUM: new Flag({
        code: "WEAPON_TYPE_PILUM",
        sdesc: "WEAPON_TYPE_PILUM",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_QUARTERSTAFF: new Flag({
        code: "WEAPON_TYPE_QUARTERSTAFF",
        sdesc: "WEAPON_TYPE_QUARTERSTAFF",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_RAPIER: new Flag({
        code: "WEAPON_TYPE_RAPIER",
        sdesc: "WEAPON_TYPE_RAPIER",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_SABRE: new Flag({
        code: "WEAPON_TYPE_SABRE",
        sdesc: "WEAPON_TYPE_SABRE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_SAI: new Flag({
        code: "WEAPON_TYPE_SAI",
        sdesc: "WEAPON_TYPE_SAI",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_SCIMITAR: new Flag({
        code: "WEAPON_TYPE_SCIMITAR",
        sdesc: "WEAPON_TYPE_SCIMITAR",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_SHORT_BOW: new Flag({
        code: "WEAPON_TYPE_SHORT_BOW",
        sdesc: "WEAPON_TYPE_SHORT_BOW",
        projectile: true,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_SHORT_SWORD: new Flag({
        code: "WEAPON_TYPE_SHORT_SWORD",
        sdesc: "WEAPON_TYPE_SHORT_SWORD",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_SHURIKEN: new Flag({
        code: "WEAPON_TYPE_SHURIKEN",
        sdesc: "WEAPON_TYPE_SHURIKEN",
        projectile: false,
        thrown: true,
        exotic: true
    }),
    WEAPON_TYPE_SLING: new Flag({
        code: "WEAPON_TYPE_SLING",
        sdesc: "WEAPON_TYPE_SLING",
        projectile: true,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_SPEAR: new Flag({
        code: "WEAPON_TYPE_SPEAR",
        sdesc: "WEAPON_TYPE_SPEAR",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_STAFF_SLING: new Flag({
        code: "WEAPON_TYPE_STAFF_SLING",
        sdesc: "WEAPON_TYPE_STAFF_SLING",
        projectile: true,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_TOMAHAWK: new Flag({
        code: "WEAPON_TYPE_TOMAHAWK",
        sdesc: "WEAPON_TYPE_TOMAHAWK",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_TONFA: new Flag({
        code: "WEAPON_TYPE_TONFA",
        sdesc: "WEAPON_TYPE_TONFA",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_TRIDENT: new Flag({
        code: "WEAPON_TYPE_TRIDENT",
        sdesc: "WEAPON_TYPE_TRIDENT",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_GREATSWORD: new Flag({
        code: "WEAPON_TYPE_GREATSWORD",
        sdesc: "WEAPON_TYPE_GREATSWORD",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_LIGHT_HAMMER: new Flag({
        code: "WEAPON_TYPE_LIGHT_HAMMER",
        sdesc: "WEAPON_TYPE_LIGHT_HAMMER",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_WARHAMMER: new Flag({
        code: "WEAPON_TYPE_WARHAMMER",
        sdesc: "WEAPON_TYPE_WARHAMMER",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_WHIP: new Flag({
        code: "WEAPON_TYPE_WHIP",
        sdesc: "WEAPON_TYPE_WHIP",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_KNIFE: new Flag({
        code: "WEAPON_TYPE_KNIFE",
        sdesc: "WEAPON_TYPE_KNIFE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_SICKLE: new Flag({
        code: "WEAPON_TYPE_SICKLE",
        sdesc: "WEAPON_TYPE_SICKLE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_SCYTHE: new Flag({
        code: "WEAPON_TYPE_SCYTHE",
        sdesc: "WEAPON_TYPE_SCYTHE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_BOULDER: new Flag({
        code: "WEAPON_TYPE_BOULDER",
        sdesc: "WEAPON_TYPE_BOULDER",
        projectile: false,
        thrown: true,
        exotic: false
    }),
    WEAPON_TYPE_CESTUS: new Flag({
        code: "WEAPON_TYPE_CESTUS",
        sdesc: "WEAPON_TYPE_CESTUS",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_GREATAXE: new Flag({
        code: "WEAPON_TYPE_GREATAXE",
        sdesc: "WEAPON_TYPE_GREATAXE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_LIGHT_MACE: new Flag({
        code: "WEAPON_TYPE_LIGHT_MACE",
        sdesc: "WEAPON_TYPE_LIGHT_MACE",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_DWARVEN_WARAXE: new Flag({
        code: "WEAPON_TYPE_DWARVEN_WARAXE",
        sdesc: "WEAPON_TYPE_DWARVEN_WARAXE",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_SPIKED_CHAIN: new Flag({
        code: "WEAPON_TYPE_SPIKED_CHAIN",
        sdesc: "WEAPON_TYPE_SPIKED_CHAIN",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_KAMA: new Flag({
        code: "WEAPON_TYPE_KAMA",
        sdesc: "WEAPON_TYPE_KAMA",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_SIANGHAM: new Flag({
        code: "WEAPON_TYPE_SIANGHAM",
        sdesc: "WEAPON_TYPE_SIANGHAM",
        projectile: false,
        thrown: false,
        exotic: true
    }),
    WEAPON_TYPE_KUKRI: new Flag({
        code: "WEAPON_TYPE_KUKRI",
        sdesc: "WEAPON_TYPE_KUKRI",
        projectile: false,
        thrown: false,
        exotic: false
    }),
    WEAPON_TYPE_LIGHT_PICK: new Flag({
        code: "WEAPON_TYPE_LIGHT_PICK",
        sdesc: "WEAPON_TYPE_LIGHT_PICK",
        projectile: false,
        thrown: false,
        exotic: false
    })
};
const ITEM_CONTAINER_FLAGS = {
    CONT_CLOSEABLE: new Flag({
        code: 1,
        sdesc: "CONT_CLOSEABLE"
    }),
    CONT_PICKPROOF: new Flag({
        code: 2,
        sdesc: "CONT_PICKPROOF"
    }),
    CONT_CLOSED: new Flag({
        code: 4,
        sdesc: "CONT_CLOSED"
    }),
    CONT_LOCKED: new Flag({
        code: 8,
        sdesc: "CONT_LOCKED"
    })
};
const ITEM_BODY_TYPES = {
    HUMANOID: new Flag({
        code: "0",
        sdesc: "BODY_TYPE_HUMANOID"
    })
};
const ITEM_ARMOR_TYPES = {
    ARMOR_TYPE_NONE: new Flag({
        code: "ARMOR_TYPE_NONE",
        sdesc: "ARMOR_TYPE_NONE"
    }),
    ARMOR_TYPE_BANDED: new Flag({
        code: "ARMOR_TYPE_BANDED",
        sdesc: "ARMOR_TYPE_BANDED"
    }),
    ARMOR_TYPE_BRIGANDINE: new Flag({
        code: "ARMOR_TYPE_BRIGANDINE",
        sdesc: "ARMOR_TYPE_BRIGANDINE"
    }),
    ARMOR_TYPE_CHAIN_MAIL: new Flag({
        code: "ARMOR_TYPE_CHAIN_MAIL",
        sdesc: "ARMOR_TYPE_CHAIN_MAIL"
    }),
    ARMOR_TYPE_HALF_PLATE: new Flag({
        code: "ARMOR_TYPE_HALF_PLATE",
        sdesc: "ARMOR_TYPE_HALF_PLATE"
    }),
    ARMOR_TYPE_FULL_PLATE: new Flag({
        code: "ARMOR_TYPE_FULL_PLATE",
        sdesc: "ARMOR_TYPE_FULL_PLATE"
    }),
    ARMOR_TYPE_HIDE: new Flag({
        code: "ARMOR_TYPE_HIDE",
        sdesc: "ARMOR_TYPE_HIDE"
    }),
    ARMOR_TYPE_LEATHER: new Flag({
        code: "ARMOR_TYPE_LEATHER",
        sdesc: "ARMOR_TYPE_LEATHER"
    }),
    ARMOR_TYPE_PADDED: new Flag({
        code: "ARMOR_TYPE_PADDED",
        sdesc: "ARMOR_TYPE_PADDED"
    }),
    ARMOR_TYPE_RING_MAIL: new Flag({
        code: "ARMOR_TYPE_RING_MAIL",
        sdesc: "ARMOR_TYPE_RING_MAIL"
    }),
    ARMOR_TYPE_SCALE_MAIL: new Flag({
        code: "ARMOR_TYPE_SCALE_MAIL",
        sdesc: "ARMOR_TYPE_SCALE_MAIL"
    }),
    ARMOR_TYPE_SPLINT_MAIL: new Flag({
        code: "ARMOR_TYPE_SPLINT_MAIL",
        sdesc: "ARMOR_TYPE_SPLINT_MAIL"
    }),
    ARMOR_TYPE_STUDDED_LEATHER: new Flag({
        code: "ARMOR_TYPE_STUDDED_LEATHER",
        sdesc: "ARMOR_TYPE_STUDDED_LEATHER"
    }),
    ARMOR_TYPE_CLOTH: new Flag({
        code: "ARMOR_TYPE_CLOTH",
        sdesc: "ARMOR_TYPE_CLOTH"
    }),
    ARMOR_TYPE_BUCKLER: new Flag({
        code: "ARMOR_TYPE_BUCKLER",
        sdesc: "ARMOR_TYPE_BUCKLER"
    }),
    ARMOR_TYPE_WOODEN_LIGHT_SHIELD: new Flag({
        code: "ARMOR_TYPE_WOODEN_LIGHT_SHIELD",
        sdesc: "ARMOR_TYPE_WOODEN_LIGHT_SHIELD"
    }),
    ARMOR_TYPE_WOODEN_HEAVY_SHIELD: new Flag({
        code: "ARMOR_TYPE_WOODEN_HEAVY_SHIELD",
        sdesc: "ARMOR_TYPE_WOODEN_HEAVY_SHIELD"
    }),
    ARMOR_TYPE_METAL_LIGHT_SHIELD: new Flag({
        code: "ARMOR_TYPE_METAL_LIGHT_SHIELD",
        sdesc: "ARMOR_TYPE_METAL_LIGHT_SHIELD"
    }),
    ARMOR_TYPE_METAL_HEAVY_SHIELD: new Flag({
        code: "ARMOR_TYPE_METAL_HEAVY_SHIELD",
        sdesc: "ARMOR_TYPE_METAL_HEAVY_SHIELD"
    }),
    ARMOR_TYPE_TOWER_SHIELD: new Flag({
        code: "ARMOR_TYPE_TOWER_SHIELD",
        sdesc: "ARMOR_TYPE_TOWER_SHIELD"
    }),
    ARMOR_TYPE_CHAIN_SHIRT: new Flag({
        code: "ARMOR_TYPE_CHAIN_SHIRT",
        sdesc: "ARMOR_TYPE_CHAIN_SHIRT"
    })
};
const ITEM_FURNITURE_STATES = {
    FURNITURE_CHAIR: new Flag({
        code: "FURNITURE_CHAIR",
        sdesc: "FURNITURE_CHAIR"
    }),
    FURNITURE_BED: new Flag({
        code: "FURNITURE_BED",
        sdesc: "FURNITURE_BED"
    }),
    FURNITURE_LECTERN: new Flag({
        code: "FURNITURE_LECTERN",
        sdesc: "FURNITURE_LECTERN"
    }),
    FURNITURE_ALTAR: new Flag({
        code: "FURNITURE_ALTAR",
        sdesc: "FURNITURE_ALTAR"
    })
};
const ITEM_DRINK_TYPES = {
    LIQ_WATER: new Flag({
        code: "LIQ_WATER",
        sdesc: "LIQ_WATER"
    }),
    LIQ_BEER: new Flag({
        code: "LIQ_BEER",
        sdesc: "LIQ_BEER"
    }),
    LIQ_WINE: new Flag({
        code: "LIQ_WINE",
        sdesc: "LIQ_WINE"
    }),
    LIQ_ALE: new Flag({
        code: "LIQ_ALE",
        sdesc: "LIQ_ALE"
    }),
    LIQ_DARK_ALE: new Flag({
        code: "LIQ_DARK_ALE",
        sdesc: "LIQ_DARK_ALE"
    }),
    LIQ_WHISKEY: new Flag({
        code: "LIQ_WHISKEY",
        sdesc: "LIQ_WHISKEY"
    }),
    LIQ_JUICE: new Flag({
        code: "LIQ_JUICE",
        sdesc: "LIQ_JUICE"
    }),
    LIQ_SPIRITS: new Flag({
        code: "LIQ_SPIRITS",
        sdesc: "LIQ_SPIRITS"
    }),
    LIQ_PORT: new Flag({
        code: "LIQ_PORT",
        sdesc: "LIQ_PORT"
    }),
    LIQ_SLIME_MOLD: new Flag({
        code: "LIQ_SLIME_MOLD",
        sdesc: "LIQ_SLIME_MOLD"
    }),
    LIQ_MILK: new Flag({
        code: "LIQ_MILK",
        sdesc: "LIQ_MILK"
    }),
    LIQ_TEA: new Flag({
        code: "LIQ_TEA",
        sdesc: "LIQ_TEA"
    }),
    LIQ_COFFEE: new Flag({
        code: "LIQ_COFFEE",
        sdesc: "LIQ_COFFEE"
    }),
    LIQ_BLOOD: new Flag({
        code: "LIQ_BLOOD",
        sdesc: "LIQ_BLOOD"
    }),
    LIQ_SALTWATER: new Flag({
        code: "LIQ_SALTWATER",
        sdesc: "LIQ_SALTWATER"
    }),
    LIQ_COLA: new Flag({
        code: "LIQ_COLA",
        sdesc: "LIQ_COLA"
    }),
    LIQ_MEAD: new Flag({
        code: "LIQ_MEAD",
        sdesc: "LIQ_MEAD"
    }),
    LIQ_GROG: new Flag({
        code: "LIQ_GROG",
        sdesc: "LIQ_GROG"
    })
};
const ITEM_HERB_TYPES = {
    NOT_POISONED: new Flag({
        code: "NOT_POISONED",
        sdesc: "NOT_POISONED"
    }),
    HERB_PIPEWEED: new Flag({
        code: "HERB_PIPEWEED",
        sdesc: "HERB_PIPEWEED"
    }),
    HERB_DHAT: new Flag({
        code: "HERB_DHAT",
        sdesc: "HERB_DHAT"
    }),
    HERB_DWALE: new Flag({
        code: "HERB_DWALE",
        sdesc: "HERB_DWALE"
    }),
    HERB_KONEION: new Flag({
        code: "HERB_KONEION",
        sdesc: "HERB_KONEION"
    }),
    HERB_MONKSHOOD: new Flag({
        code: "HERB_MONKSHOOD",
        sdesc: "HERB_MONKSHOOD"
    }),
    HERB_CATNIP: new Flag({
        code: "HERB_CATNIP",
        sdesc: "HERB_CATNIP"
    }),
    HERB_CANDLESTICK_PLANT: new Flag({
        code: "HERB_CANDLESTICK_PLANT",
        sdesc: "HERB_CANDLESTICK_PLANT"
    }),
    HERB_ADDERS_TONGUE: new Flag({
        code: "HERB_ADDERS_TONGUE",
        sdesc: "HERB_ADDERS_TONGUE"
    }),
    HERB_ALLCURE: new Flag({
        code: "HERB_ALLCURE",
        sdesc: "HERB_ALLCURE"
    }),
    HERB_ALOE: new Flag({
        code: "HERB_ALOE",
        sdesc: "HERB_ALOE"
    }),
    HERB_ARNICA: new Flag({
        code: "HERB_ARNICA",
        sdesc: "HERB_ARNICA"
    }),
    HERB_BLOODROOT: new Flag({
        code: "HERB_BLOODROOT",
        sdesc: "HERB_BLOODROOT"
    }),
    HERB_COMFREY: new Flag({
        code: "HERB_COMFREY",
        sdesc: "HERB_COMFREY"
    }),
    HERB_DWALE: new Flag({
        code: "HERB_DWALE",
        sdesc: "HERB_DWALE"
    }),
    HERB_ECHINACEA: new Flag({
        code: "HERB_ECHINACEA",
        sdesc: "HERB_ECHINACEA"
    }),
    HERB_WOUNDWORT: new Flag({
        code: "HERB_WOUNDWORT",
        sdesc: "HERB_WOUNDWORT"
    }),
    HERB_WORMWOOD: new Flag({
        code: "HERB_WORMWOOD",
        sdesc: "HERB_WORMWOOD"
    }),
    HERB_ALL_SAINTS_WORT: new Flag({
        code: "HERB_ALL_SAINTS_WORT",
        sdesc: "HERB_ALL_SAINTS_WORT"
    }),
    HERB_CURE_ALL: new Flag({
        code: "HERB_CURE_ALL",
        sdesc: "HERB_CURE_ALL"
    }),
    HERB_SHANGNUM_MOSS: new Flag({
        code: "HERB_SHANGNUM_MOSS",
        sdesc: "HERB_SHANGNUM_MOSS"
    }),
    HERB_MARSH_MALLOW: new Flag({
        code: "HERB_MARSH-MALLOW",
        sdesc: "HERB_MARSH-MALLOW"
    }),
    HERB_LUNGWORT: new Flag({
        code: "HERB_LUNGWORT",
        sdesc: "HERB_LUNGWORT"
    }),
    HERB_BIRTHWORT: new Flag({
        code: "HERB_BIRTHWORT",
        sdesc: "HERB_BIRTHWORT"
    }),
    HERB_BUGSBANE: new Flag({
        code: "HERB_BUGSBANE",
        sdesc: "HERB_BUGSBANE"
    }),
    HERB_SNAKESALVE: new Flag({
        code: "HERB_SNAKESALVE",
        sdesc: "HERB_SNAKESALVE"
    }),
    HERB_SKULLCUP: new Flag({
        code: "HERB_SKULLCUP",
        sdesc: "HERB_SKULLCUP"
    }),
    HERB_BING_LANG: new Flag({
        code: "HERB_BING_LANG",
        sdesc: "HERB_BING_LANG"
    }),
    HERB_HEATHER: new Flag({
        code: "HERB_HEATHER",
        sdesc: "HERB_HEATHER"
    }),
    HERB_HENBANE: new Flag({
        code: "HERB_HENBANE",
        sdesc: "HERB_HENBANE"
    }),
    HERB_HUSHTHORN: new Flag({
        code: "HERB_HUSHTHORN",
        sdesc: "HERB_HUSHTHORN"
    }),
    HERB_JUNIPER: new Flag({
        code: "HERB_JUNIPER",
        sdesc: "HERB_JUNIPER"
    }),
    HERB_KOLO: new Flag({
        code: "HERB_KOLO",
        sdesc: "HERB_KOLO"
    }),
    HERB_BILLBERRY: new Flag({
        code: "HERB_BILLBERRY",
        sdesc: "HERB_BILLBERRY"
    }),
    HERB_DARKWEED: new Flag({
        code: "HERB_DARKWEED",
        sdesc: "HERB_DARKWEED"
    }),
    HERB_GINKO: new Flag({
        code: "HERB_GINKO",
        sdesc: "HERB_GINKO"
    }),
    HERB_WINTERSALVE: new Flag({
        code: "HERB_WINTERSALVE",
        sdesc: "HERB_WINTERSALVE"
    })
};
const ITEM_COIN_TYPES = {
    COIN_COPPER: new Flag({
        code: "COIN_COPPER",
        sdesc: "COIN_COPPER"
    }),
    COIN_SILVER: new Flag({
        code: "COIN_SILVER",
        sdesc: "COIN_SILVER"
    }),
    COIN_ELECTRUM: new Flag({
        code: "COIN_ELECTRUM",
        sdesc: "COIN_ELECTRUM"
    }),
    COIN_GOLD: new Flag({
        code: "COIN_GOLD",
        sdesc: "COIN_GOLD"
    }),
    COIN_PLATINUM: new Flag({
        code: "COIN_PLATINUM",
        sdesc: "COIN_PLATINUM"
    })
};
const ITEM_PIPE_FLAGS = {
    PIPE_EMPTY: new Flag({
        code: 0,
        sdesc: "PIPE_EMPTY",
    }),
    PIPE_TAMPED: new Flag({
        code: "PIPE_TAMPED",
        sdesc: "PIPE_TAMPED",
    }),
    PIPE_LIT: new Flag({
        code: "PIPE_LIT",
        sdesc: "PIPE_LIT",
    }),
    PIPE_HOT: new Flag({
        code: "PIPE_HOT",
        sdesc: "PIPE_HOT",
    }),
    PIPE_DIRTY: new Flag({
        code: "PIPE_DIRTY",
        sdesc: "PIPE_DIRTY",
    }),
    PIPE_FILTHY: new Flag({
        code: "PIPE_FILTHY",
        sdesc: "PIPE_FILTHY",
    }),
    PIPE_GOINGOUT: new Flag({
        code: "PIPE_GOINGOUT",
        sdesc: "PIPE_GOINGOUT",
    }),
    PIPE_BURNT: new Flag({
        code: "PIPE_BURNT",
        sdesc: "PIPE_BURNT",
    }),
    PIPE_FULLOFASH: new Flag({
        code: "PIPE_FULLOFASH",
        sdesc: "PIPE_FULLOFASH",
    })
};
const LANGUAGE_FLAGS = {
    LANG_COMMON: new Flag({
        code: "LANG_COMMON",
        sdesc: "LANG_COMMON"
    }),
    LANG_ELVEN: new Flag({
        code: "LANG_ELVEN",
        sdesc: "LANG_ELVEN"
    }),
    LANG_DWARVEN: new Flag({
        code: "LANG_DWARVEN",
        sdesc: "LANG_DWARVEN"
    }),
    LANG_SYLVAN: new Flag({
        code: "LANG_SYLVAN",
        sdesc: "LANG_SYLVAN"
    }),
    LANG_DARKSPEAK: new Flag({
        code: "LANG_DARKSPEAK",
        sdesc: "LANG_DARKSPEAK"
    }),
    LANG_ORCISH: new Flag({
        code: "LANG_ORCISH",
        sdesc: "LANG_ORCISH"
    }),
    LANG_ABYSSAL: new Flag({
        code: "LANG_ABYSSAL",
        sdesc: "LANG_ABYSSAL"
    }),
    LANG_AQUAN: new Flag({
        code: "LANG_AQUAN",
        sdesc: "LANG_AQUAN"
    }),
    LANG_INSECTOID: new Flag({
        code: "LANG_INSECTOID",
        sdesc: "LANG_INSECTOID"
    }),
    LANG_AURAN: new Flag({
        code: "LANG_AURAN",
        sdesc: "LANG_AURAN"
    }),
    LANG_GIANT: new Flag({
        code: "LANG_GIANT",
        sdesc: "LANG_GIANT"
    }),
    LANG_DRACONIC: new Flag({
        code: "LANG_DRACONIC",
        sdesc: "LANG_DRACONIC"
    }),
    LANG_THIEVES: new Flag({
        code: "LANG_THIEVES",
        sdesc: "LANG_THIEVES"
    }),
    LANG_MAGICAL: new Flag({
        code: "LANG_MAGICAL",
        sdesc: "LANG_MAGICAL"
    }),
    LANG_GOBLIN: new Flag({
        code: "LANG_GOBLIN",
        sdesc: "LANG_GOBLIN"
    }),
    LANG_GOD: new Flag({
        code: "LANG_GOD",
        sdesc: "LANG_GOD"
    }),
    LANG_ANCIENT: new Flag({
        code: "LANG_ANCIENT",
        sdesc: "LANG_ANCIENT"
    }),
    LANG_HALFLING: new Flag({
        code: "LANG_HALFLING",
        sdesc: "LANG_HALFLING"
    }),
    LANG_CLAN: new Flag({
        code: "LANG_CLAN",
        sdesc: "LANG_CLAN"
    }),
    LANG_GNOLL: new Flag({
        code: "LANG_GNOLL",
        sdesc: "LANG_GNOLL"
    }),
    LANG_GITH: new Flag({
        code: "LANG_GITH",
        sdesc: "LANG_GITH"
    }),
    LANG_GNOME: new Flag({
        code: "LANG_GNOME",
        sdesc: "LANG_GNOME"
    }),
    LANG_ANIMAL: new Flag({
        code: "LANG_ANIMAL",
        sdesc: "LANG_ANIMAL"
    }),
    LANG_CELESTIAL: new Flag({
        code: "LANG_CELESTIAL",
        sdesc: "LANG_CELESTIAL"
    }),
    LANG_IGNAN: new Flag({
        code: "LANG_IGNAN",
        sdesc: "LANG_IGNAN"
    }),
    LANG_INFERNAL: new Flag({
        code: "LANG_INFERNAL",
        sdesc: "LANG_INFERNAL"
    }),
    LANG_TERRAN: new Flag({
        code: "LANG_TERRAN",
        sdesc: "LANG_TERRAN"
    })
};
const ITEM_LEVER_BUTTON_FLAGS = {
    TRIG_NONE: new Flag({
        code: "TRIG_NONE",
        sdesc: "TRIG_NONE",
        ldesc: "Use 0 when there are no triggers",
        do_not_use: false
    }),
    TRIG_UP: new Flag({
        code: "TRIG_UP",
        sdesc: "TRIG_UP",
        ldesc: "Lever starts out in the up position",
        do_not_use: false
    }),
    TRIG_UNLOCK: new Flag({
        code: "TRIG_UNLOCK",
        sdesc: "TRIG_UNLOCK",
        ldesc: "This will set a newly created exit or existing one to unlocked",
        do_not_use: false
    }),
    TRIG_LOCK: new Flag({
        code: "TRIG_LOCK",
        sdesc: "TRIG_LOCK",
        ldesc: "This will set a newly crated exit or exiting one to locked",
        do_not_use: false
    }),
    TRIG_D_NORTH: new Flag({
        code: "TRIG_D_NORTH",
        sdesc: "TRIG_D_NORTH",
        ldesc: "Sets the exit to open to the north",
        do_not_use: false
    }),
    TRIG_D_SOUTH: new Flag({
        code: "TRIG_D_SOUTH",
        sdesc: "TRIG_D_SOUTH",
        ldesc: "Sets the exit to open to the south",
        do_not_use: false
    }),
    TRIG_D_EAST: new Flag({
        code: "TRIG_D_EAST",
        sdesc: "TRIG_D_EAST",
        ldesc: "Sets the exit to open to the east",
        do_not_use: false
    }),
    TRIG_D_WEST: new Flag({
        code: "TRIG_D_WEST",
        sdesc: "TRIG_D_WEST",
        ldesc: "Sets the exit to open to the west",
        do_not_use: false
    }),
    TRIG_D_UP: new Flag({
        code: "TRIG_D_UP",
        sdesc: "TRIG_D_UP",
        ldesc: "Sets the exit open up",
        do_not_use: false
    }),
    TRIG_D_DOWN: new Flag({
        code: "TRIG_D_DOWN",
        sdesc: "TRIG_D_DOWN",
        ldesc: "Sets the exit to open down",
        do_not_use: false
    }),
    TRIG_DOOR: new Flag({
        code: "TRIG_DOOR",
        sdesc: "TRIG_DOOR",
        ldesc: "This is required to make any of the triggers utilising exits work",
        do_not_use: false
    }),
    TRIG_CONTAINER: new Flag({
        code: "TRIG_CONTAINER",
        sdesc: "TRIG_CONTAINER",
        ldesc: "This trigger is not used",
        do_not_use: true
    }),
    TRIG_OPEN: new Flag({
        code: "TRIG_OPEN",
        sdesc: "TRIG_OPEN",
        ldesc: "This trigger opens any door that is generated with other triggers",
        do_not_use: false
    }),
    TRIG_CLOSE: new Flag({
        code: "TRIG_CLOSE",
        sdesc: "TRIG_CLOSE",
        ldesc: "This trigger closes any door that is generated with other exit triggers",
        do_not_use: false
    }),
    TRIG_PASSAGE: new Flag({
        code: "TRIG_PASSAGE",
        sdesc: "TRIG_PASSAGE",
        ldesc: "This trigger is needed to create a new exit.",
        do_not_use: false
    }),
    TRIG_OLOAD: new Flag({
        code: "TRIG_OLOAD",
        sdesc: "TRIG_OLOAD",
        ldesc: "Loads up an object. Value1 is the Room. Value2 is the mob number.",
        do_not_use: false
    }),
    TRIG_MLOAD: new Flag({
        code: "TRIG_MLOAD",
        sdesc: "TRIG_MLOAD",
        ldesc: "Loads up a mobile. Value1 is the Room. Value2 is the mob number.",
        do_not_use: false
    }),
    TRIG_TELEPORT: new Flag({
        code: "TRIG_TELEPORT",
        sdesc: "TRIG_TELEPORT",
        ldesc: "Teleports lever puller or button pusher to set vnum",
        do_not_use: false
    }),
    TRIG_TELEPORTALL: new Flag({
        code: "TRIG_TELEPORTALL",
        sdesc: "TRIG_TELEPORTALL",
        ldesc: "Teleports everyone in the room to set vnum",
        do_not_use: false
    }),
    TRIG_TELEPORTPLUS: new Flag({
        code: "TRIG_TELEPORTPLUS",
        sdesc: "TRIG_TELEPORTPLUS",
        ldesc: "This trigger is not used",
        do_not_use: true
    }),
    TRIG_DEATH: new Flag({
        code: "TRIG_DEATH",
        sdesc: "TRIG_DEATH",
        ldesc: "This trigger is not used",
        do_not_use: true
    }),
    TRIG_CAST: new Flag({
        code: "TRIG_CAST",
        sdesc: "TRIG_CAST",
        ldesc: "Casts a spell on lever/button pusher. Value1 needs to contain the spell number",
        do_not_use: false
    }),
    TRIG_FAKEBLADE: new Flag({
        code: "TRIG_FAKEBLADE",
        sdesc: "TRIG_FAKEBLADE",
        ldesc: "This trigger is not used",
        do_not_use: true
    }),
    TRIG_RANDFOUR: new Flag({
        code: "TRIG_RANDFOUR",
        sdesc: "TRIG_RANDFOUR",
        ldesc: "Randomises the existing exits of the vnum in value1 to NSEW. It will not add new exits, just change where the existing ones go.",
        do_not_use: false
    }),
    TRIG_RANDSIX: new Flag({
        code: "TRIG_RANDSIX",
        sdesc: "TRIG_RANDSIX",
        ldesc: "Randomises the existing exits of the vnum in value1 to NSEWDU. It will not add new exits, just change where the existing ones go.",
        do_not_use: false
    }),
    TRIG_TRAPDOOR: new Flag({
        code: "TRIG_TRAPDOOR",
        sdesc: "TRIG_TRAPDOOR",
        ldesc: "This trigger is not used",
        do_not_use: true
    }),
    TRIG_ANOTHEROOM: new Flag({
        code: "TRIG_ANOTHEROOM",
        sdesc: "TRIG_ANOTHEROOM",
        ldesc: "This trigger is not used",
        do_not_use: true
    }),
    TRIG_USEDIAL: new Flag({
        code: "TRIG_USEDIAL",
        sdesc: "TRIG_USEDIAL",
        ldesc: "This trigger is not used",
        do_not_use: true
    }),
    TRIG_ABSOLUTEVNUM: new Flag({
        code: "TRIG_ABSOLUTEVNUM",
        sdesc: "TRIG_ABSOLUTEVNUM",
        ldesc: "This trigger is not used",
        do_not_use: true
    }),
    TRIG_SHOWROOMDESC: new Flag({
        code: "TRIG_SHOWROOMDESC",
        sdesc: "TRIG_SHOWROOMDESC",
        ldesc: "Required in order to allow the teleported to know that they have been teleported",
        do_not_use: false
    }),
    TRIG_AUTORETURN: new Flag({
        code: "TRIG_AUTORETURN",
        sdesc: "TRIG_AUTORETURN",
        ldesc: "This will make the trigger go back to the original position",
        do_not_use: false
    }),
    TRIG_NOTRAP: new Flag({
        code: "TRIG_NOTRAP",
        sdesc: "TRIG_NOTRAP",
        ldesc: "Will bypass any traps on the exit if used. It allows for a trap to be on a door that will not trigger if the lever is used to open it instead of other means.",
        do_not_use: false
    })
};
const TRAP_TYPES = {
    TTYPE_NONE: new Flag({
        code: "TTYPE_NONE",
        sdesc: "TTYPE_NONE",
        ldesc: "No trap at all"
    }),
    TTYPE_SPIKE_MINOR: new Flag({
        code: "TTYPE_SPIKE_MINOR",
        sdesc: "TTYPE_SPIKE_MINOR",
        ldesc: "a minor spike trap : 5d6/PIERCE on CHAR"
    }),
    TTYPE_SPIKE_AVERAGE: new Flag({
        code: "TTYPE_SPIKE_AVERAGE",
        sdesc: "TTYPE_SPIKE_AVERAGE",
        ldesc: "an average spike trap : 10d6/PIERCE on CHAR"
    }),
    TTYPE_SPIKE_STRONG: new Flag({
        code: "TTYPE_SPIKE_STRONG",
        sdesc: "TTYPE_SPIKE_STRONG",
        ldesc: "a strong spike trap : 15d6/PIERCE on CHAR"
    }),
    TTYPE_SPIKE_DEADLY: new Flag({
        code: "TTYPE_SPIKE_DEADLY",
        sdesc: "TTYPE_SPIKE_DEADLY",
        ldesc: "a deadly spike trap : 25d6/PIERCE on CHAR"
    }),
    TTYPE_BLADE_MINOR: new Flag({
        code: "TTYPE_BLADE_MINOR",
        sdesc: "TTYPE_BLADE_MINOR",
        ldesc: "a minor spinning blade trap : 5d6/SLASH on CHAR"
    }),
    TTYPE_BLADE_AVERAGE: new Flag({
        code: "TTYPE_BLADE_AVERAGE",
        sdesc: "TTYPE_BLADE_AVERAGE",
        ldesc: "an average spinning blade trap : 10d6/SLASH on CHAR"
    }),
    TTYPE_BLADE_STRONG: new Flag({
        code: "TTYPE_BLADE_STRONG",
        sdesc: "TTYPE_BLADE_STRONG",
        ldesc: "a strong spinning blade trap : 15d6/SLASH on CHAR"
    }),
    TTYPE_BLADE_DEADLY: new Flag({
        code: "TTYPE_BLADE_DEADLY",
        sdesc: "TTYPE_BLADE_DEADLY",
        ldesc: "a deadly spinning blade trap : 25d6/SLASH on CHAR"
    }),
    TTYPE_STONE_MINOR: new Flag({
        code: "TTYPE_STONE_MINOR",
        sdesc: "TTYPE_STONE_MINOR",
        ldesc: "a minor falling stone trap : 5d6/BASH on CHAR"
    }),
    TTYPE_STONE_AVERAGE: new Flag({
        code: "TTYPE_STONE_AVERAGE",
        sdesc: "TTYPE_STONE_AVERAGE",
        ldesc: "an average falling stone trap : 10d6/BASH on CHAR"
    }),
    TTYPE_STONE_STRONG: new Flag({
        code: "TTYPE_STONE_STRONG",
        sdesc: "TTYPE_STONE_STRONG",
        ldesc: "a strong falling stone trap : 15d6/BASH on CHAR"
    }),
    TTYPE_STONE_DEADLY: new Flag({
        code: "TTYPE_STONE_DEADLY",
        sdesc: "TTYPE_STONE_DEADLY",
        ldesc: "a deadly falling stone trap : 25d6/BASH on CHAR"
    }),
    TTYPE_ACID_MINOR: new Flag({
        code: "TTYPE_ACID_MINOR",
        sdesc: "TTYPE_ACID_MINOR",
        ldesc: "a minor acid trap : 5d8/ACID on CHAR"
    }),
    TTYPE_ACID_AVERAGE: new Flag({
        code: "TTYPE_ACID_AVERAGE",
        sdesc: "TTYPE_ACID_AVERAGE",
        ldesc: "an average acid trap : 10d8/ACID on CHAR"
    }),
    TTYPE_ACID_STRONG: new Flag({
        code: "TTYPE_ACID_STRONG",
        sdesc: "TTYPE_ACID_STRONG",
        ldesc: "a strong acid trap : 15d8/ACID on CHAR"
    }),
    TTYPE_ACID_DEADLY: new Flag({
        code: "TTYPE_ACID_DEADLY",
        sdesc: "TTYPE_ACID_DEADLY",
        ldesc: "a deadly acid trap : 25d8/ACID on CHAR"
    }),
    TTYPE_FROST_MINOR: new Flag({
        code: "TTYPE_FROST_MINOR",
        sdesc: "TTYPE_FROST_MINOR",
        ldesc: "a minor frost trap : 10d4/COLD on CHAR"
    }),
    TTYPE_FROST_AVERAGE: new Flag({
        code: "TTYPE_FROST_AVERAGE",
        sdesc: "TTYPE_FROST_AVERAGE",
        ldesc: "an average frost trap : 20d4/COLD on CHAR"
    }),
    TTYPE_FROST_STRONG: new Flag({
        code: "TTYPE_FROST_STRONG",
        sdesc: "TTYPE_FROST_STRONG",
        ldesc: "a strong frost trap : 30d4/COLD on CHAR"
    }),
    TTYPE_FROST_DEADLY: new Flag({
        code: "TTYPE_FROST_DEADLY",
        sdesc: "TTYPE_FROST_DEADLY",
        ldesc: "a deadly frost trap : 50d4/COLD on CHAR"
    }),
    TTYPE_FIRE_MINOR: new Flag({
        code: "TTYPE_FIRE_MINOR",
        sdesc: "TTYPE_FIRE_MINOR",
        ldesc: "a minor fire trap : 10d4/FIRE on CHAR"
    }),
    TTYPE_FIRE_AVERAGE: new Flag({
        code: "TTYPE_FIRE_AVERAGE",
        sdesc: "TTYPE_FIRE_AVERAGE",
        ldesc: "an average fire trap : 20d4/FIRE on CHAR"
    }),
    TTYPE_FIRE_STRONG: new Flag({
        code: "TTYPE_FIRE_STRONG",
        sdesc: "TTYPE_FIRE_STRONG",
        ldesc: "a strong fire trap : 30d4/FIRE on CHAR"
    }),
    TTYPE_FIRE_DEADLY: new Flag({
        code: "TTYPE_FIRE_DEADLY",
        sdesc: "TTYPE_FIRE_DEADLY",
        ldesc: "a deadly fire trap : 50d4/FIRE on CHAR"
    }),
    TTYPE_ELECTRICITY_MINOR: new Flag({
        code: "TTYPE_ELECTRICITY_MINOR",
        sdesc: "TTYPE_ELECTRICITY_MINOR",
        ldesc: "a minor electrical trap : 8d6/ELECTRICITY on CHAR"
    }),
    TTYPE_ELECTRICITY_AVERAGE: new Flag({
        code: "TTYPE_ELECTRICITY_AVERAGE",
        sdesc: "TTYPE_ELECTRICITY_AVERAGE",
        ldesc: "an average electrical trap : 16d6/ELECTRICITY on CHAR"
    }),
    TTYPE_ELECTRICITY_STRONG: new Flag({
        code: "TTYPE_ELECTRICITY_STRONG",
        sdesc: "TTYPE_ELECTRICITY_STRONG",
        ldesc: "a strong electrical trap : 25d6/ELECTRICITY on CHAR"
    }),
    TTYPE_ELECTRICITY_DEADLY: new Flag({
        code: "TTYPE_ELECTRICITY_DEADLY",
        sdesc: "TTYPE_ELECTRICITY_DEADLY",
        ldesc: "a deadly electrical trap : 42d6/ELECTRICITY on CHAR"
    }),
    TTYPE_NEG_ENERGY_MINOR: new Flag({
        code: "TTYPE_NEG_ENERGY_MINOR",
        sdesc: "TTYPE_NEG_ENERGY_MINOR",
        ldesc: "a minor negative energy trap : 8d8/HEALING on CHAR"
    }),
    TTYPE_NEG_ENERGY_AVERAGE: new Flag({
        code: "TTYPE_NEG_ENERGY_AVERAGE",
        sdesc: "TTYPE_NEG_ENERGY_AVERAGE",
        ldesc: "an average negative energy trap : 16d8/HEALING on CHAR"
    }),
    TTYPE_NEG_ENERGY_STRONG: new Flag({
        code: "TTYPE_NEG_ENERGY_STRONG",
        sdesc: "TTYPE_NEG_ENERGY_STRONG",
        ldesc: "a strong negative energy trap : 25d8/HEALING on CHAR"
    }),
    TTYPE_NEG_ENERGY_DEADLY: new Flag({
        code: "TTYPE_NEG_ENERGY_DEADLY",
        sdesc: "TTYPE_NEG_ENERGY_DEADLY",
        ldesc: "a deadly negative energy trap : 42d8/HEALING on CHAR"
    }),
    TTYPE_SPELL_RAZORBAIT: new Flag({
        code: "TTYPE_SPELL_RAZORBAIT",
        sdesc: "TTYPE_SPELL_RAZORBAIT",
        ldesc: "a razorbait spell trap"
    }),
    TTYPE_SPELL_SWORDBAIT: new Flag({
        code: "TTYPE_SPELL_SWORDBAIT",
        sdesc: "TTYPE_SPELL_SWORDBAIT",
        ldesc: "a swordbait spell trap"
    }),
    TTYPE_SPELL_WINTER_MIST: new Flag({
        code: "TTYPE_SPELL_WINTER_MIST",
        sdesc: "TTYPE_SPELL_WINTER_MIST",
        ldesc: "a winter mist spell trap"
    }),
    TTYPE_SPELL_BLAZEBANE: new Flag({
        code: "TTYPE_SPELL_BLAZEBANE",
        sdesc: "TTYPE_SPELL_BLAZEBANE",
        ldesc: "a blazebane spell trap"
    }),
    TTYPE_SPELL_CHARGED_BEACON: new Flag({
        code: "TTYPE_SPELL_CHARGED_BEACON",
        sdesc: "TTYPE_SPELL_CHARGED_BEACON",
        ldesc: "a charged beacon spell trap"
    }),
    TTYPE_SPELL_WEAKEN: new Flag({
        code: "TTYPE_SPELL_WEAKEN",
        sdesc: "TTYPE_SPELL_WEAKEN",
        ldesc: "a weaken spell trap"
    }),
    TTYPE_SPELL_FUMBLE: new Flag({
        code: "TTYPE_SPELL_FUMBLE",
        sdesc: "TTYPE_SPELL_FUMBLE",
        ldesc: "a fumble spell trap"
    }),
    TTYPE_SPELL_CURSE: new Flag({
        code: "TTYPE_SPELL_CURSE",
        sdesc: "TTYPE_SPELL_CURSE",
        ldesc: "a curse spell trap"
    }),
    TTYPE_SPELL_ILL_FORTUNE: new Flag({
        code: "TTYPE_SPELL_ILL_FORTUNE",
        sdesc: "TTYPE_SPELL_ILL_FORTUNE",
        ldesc: "an ill fortune spell trap"
    }),
    TTYPE_SPELL_BLINDNESS: new Flag({
        code: "TTYPE_SPELL_BLINDNESS",
        sdesc: "TTYPE_SPELL_BLINDNESS",
        ldesc: "a blindness spell trap"
    }),
    TTYPE_SPELL_ENTANGLE: new Flag({
        code: "TTYPE_SPELL_ENTANGLE",
        sdesc: "TTYPE_SPELL_ENTANGLE",
        ldesc: "an entangle spell trap"
    }),
    TTYPE_SPELL_HOLD_MONSTER: new Flag({
        code: "TTYPE_SPELL_HOLD_MONSTER",
        sdesc: "TTYPE_SPELL_HOLD_MONSTER",
        ldesc: "a hold monster spell trap"
    }),
    TTYPE_SPELL_RAINBOW_PATTERN: new Flag({
        code: "TTYPE_SPELL_RAINBOW_PATTERN",
        sdesc: "TTYPE_SPELL_RAINBOW_PATTERN",
        ldesc: "a rainbow pattern spell trap"
    }),
    TTYPE_SPELL_COLOR_SPRAY: new Flag({
        code: "TTYPE_SPELL_COLOR_SPRAY",
        sdesc: "TTYPE_SPELL_COLOR_SPRAY",
        ldesc: "a color spray spell trap"
    }),
    TTYPE_SPELL_FAERIE_FIRE: new Flag({
        code: "TTYPE_SPELL_FAERIE_FIRE",
        sdesc: "TTYPE_SPELL_FAERIE_FIRE",
        ldesc: "a faerie fire spell trap"
    }),
    TTYPE_SPELL_POISON: new Flag({
        code: "TTYPE_SPELL_POISON",
        sdesc: "TTYPE_SPELL_POISON",
        ldesc: "a poison spell trap"
    }),
    TTYPE_SPELL_DISPEL_MAGIC: new Flag({
        code: "TTYPE_SPELL_DISPEL_MAGIC",
        sdesc: "TTYPE_SPELL_DISPEL_MAGIC",
        ldesc: "a dispel magic spell trap"
    }),
    TTYPE_SPELL_CAUSE_LIGHT: new Flag({
        code: "TTYPE_SPELL_CAUSE_LIGHT",
        sdesc: "TTYPE_SPELL_CAUSE_LIGHT",
        ldesc: "a cause light spell trap"
    }),
    TTYPE_SPELL_CAUSE_SERIOUS: new Flag({
        code: "TTYPE_SPELL_CAUSE_SERIOUS",
        sdesc: "TTYPE_SPELL_CAUSE_SERIOUS",
        ldesc: "a cause serious spell trap"
    }),
    TTYPE_SPELL_CAUSE_CRITICAL: new Flag({
        code: "TTYPE_SPELL_CAUSE_CRITICAL",
        sdesc: "TTYPE_SPELL_CAUSE_CRITICAL",
        ldesc: "a cause critical spell trap"
    }),
    TTYPE_SPELL_HARM: new Flag({
        code: "TTYPE_SPELL_HARM",
        sdesc: "TTYPE_SPELL_HARM",
        ldesc: "a harm spell trap"
    }),
    TTYPE_SPELL_SHOCKING_GRASP: new Flag({
        code: "TTYPE_SPELL_SHOCKING_GRASP",
        sdesc: "TTYPE_SPELL_SHOCKING_GRASP",
        ldesc: "a shocking grasp spell trap"
    }),
    TTYPE_SPELL_BURNING_HANDS: new Flag({
        code: "TTYPE_SPELL_BURNING_HANDS",
        sdesc: "TTYPE_SPELL_BURNING_HANDS",
        ldesc: "a burning hands spell trap"
    }),
    TTYPE_SPELL_CHILL_TOUCH: new Flag({
        code: "TTYPE_SPELL_CHILL_TOUCH",
        sdesc: "TTYPE_SPELL_CHILL_TOUCH",
        ldesc: "a chill touch spell trap"
    }),
    TTYPE_SPELL_MAGIC_MISSILE: new Flag({
        code: "TTYPE_SPELL_MAGIC_MISSILE",
        sdesc: "TTYPE_SPELL_MAGIC_MISSILE",
        ldesc: "a magic missile spell trap"
    }),
    TTYPE_SPELL_ACID_ARROW: new Flag({
        code: "TTYPE_SPELL_ACID_ARROW",
        sdesc: "TTYPE_SPELL_ACID_ARROW",
        ldesc: "an acid arrow spell trap"
    }),
    TTYPE_SPELL_FLAME_ARROW: new Flag({
        code: "TTYPE_SPELL_FLAME_ARROW",
        sdesc: "TTYPE_SPELL_FLAME_ARROW",
        ldesc: "a flame arrow spell trap"
    }),
    TTYPE_SPELL_FLAMESTRIKE: new Flag({
        code: "TTYPE_SPELL_FLAMESTRIKE",
        sdesc: "TTYPE_SPELL_FLAMESTRIKE",
        ldesc: "a flamestrike spell trap"
    }),
    TTYPE_SPELL_PHOENIX_CLAW: new Flag({
        code: "TTYPE_SPELL_PHOENIX_CLAW",
        sdesc: "TTYPE_SPELL_PHOENIX_CLAW",
        ldesc: "a phoenix claw spell trap"
    }),
    TTYPE_SPELL_FIREBALL: new Flag({
        code: "TTYPE_SPELL_FIREBALL",
        sdesc: "TTYPE_SPELL_FIREBALL",
        ldesc: "a fireball spell trap"
    }),
    TTYPE_SPELL_SOUND_BURST: new Flag({
        code: "TTYPE_SPELL_SOUND_BURST",
        sdesc: "TTYPE_SPELL_SOUND_BURST",
        ldesc: "a sound burst spell trap"
    }),
    TTYPE_SPELL_ACID_BLAST: new Flag({
        code: "TTYPE_SPELL_ACID_BLAST",
        sdesc: "TTYPE_SPELL_ACID_BLAST",
        ldesc: "an acid blast spell trap"
    }),
    TTYPE_SPELL_LIGHTNING_BOLT: new Flag({
        code: "TTYPE_SPELL_LIGHTNING_BOLT",
        sdesc: "TTYPE_SPELL_LIGHTNING_BOLT",
        ldesc: "a lightning bolt spell trap"
    }),
    TTYPE_SPELL_CHAIN_LIGHTNING: new Flag({
        code: "TTYPE_SPELL_CHAIN_LIGHTNING",
        sdesc: "TTYPE_SPELL_CHAIN_LIGHTNING",
        ldesc: "a chain lightning spell trap"
    }),
    TTYPE_SPELL_CONE_OF_COLD: new Flag({
        code: "TTYPE_SPELL_CONE_OF_COLD",
        sdesc: "TTYPE_SPELL_CONE_OF_COLD",
        ldesc: "a cone of cold spell trap"
    }),
    TTYPE_SPELL_ICE_STORM: new Flag({
        code: "TTYPE_SPELL_ICE_STORM",
        sdesc: "TTYPE_SPELL_ICE_STORM",
        ldesc: "an ice storm spell trap"
    }),
    TTYPE_SPELL_ENERGY_DRAIN: new Flag({
        code: "TTYPE_SPELL_ENERGY_DRAIN",
        sdesc: "TTYPE_SPELL_ENERGY_DRAIN",
        ldesc: "an energy drain spell trap"
    }),
    TTYPE_SPELL_PHANTASMAL_KILLER: new Flag({
        code: "TTYPE_SPELL_PHANTASMAL_KILLER",
        sdesc: "TTYPE_SPELL_PHANTASMAL_KILLER",
        ldesc: "a phantasmal killer spell trap"
    }),
    TTYPE_SPELL_DISINTEGRATE: new Flag({
        code: "TTYPE_SPELL_DISINTEGRATE",
        sdesc: "TTYPE_SPELL_DISINTEGRATE",
        ldesc: "a disintegrate spell trap"
    })
};
const TRAP_TRIGGERS = {
    TRIGGER_NONE: new Flag({
        code: "TRIGGER_NONE",
        sdesc: "TRIGGER_NONE"
    }),
    TRIGGER_GET: new Flag({
        code: "TRIGGER_GET",
        sdesc: "TRIGGER_GET"
    }),
    TRIGGER_OPEN: new Flag({
        code: "TRIGGER_OPEN",
        sdesc: "TRIGGER_OPEN"
    }),
    TRIGGER_SHOVE: new Flag({
        code: "TRIGGER_SHOVE",
        sdesc: "TRIGGER_SHOVE"
    }),
    TRIGGER_PUT: new Flag({
        code: "TRIGGER_PUT",
        sdesc: "TRIGGER_PUT"
    }),
    TRIGGER_EXAMINE: new Flag({
        code: "TRIGGER_EXAMINE",
        sdesc: "TRIGGER_EXAMINE"
    }),
    TRIGGER_USE: new Flag({
        code: "TRIGGER_USE",
        sdesc: "TRIGGER_USE"
    }),
    TRIGGER_UNLOCK: new Flag({
        code: "TRIGGER_UNLOCK",
        sdesc: "TRIGGER_UNLOCK"
    }),
    TRIGGER_CLOSE: new Flag({
        code: "TRIGGER_CLOSE",
        sdesc: "TRIGGER_CLOSE"
    }),
    TRIGGER_MOVE: new Flag({
        code: "TRIGGER_MOVE",
        sdesc: "TRIGGER_MOVE"
    }),
    TRIGGER_PICK: new Flag({
        code: "TRIGGER_PICK",
        sdesc: "TRIGGER_PICK"
    })
};
const ITEM_TYPES = {
    ITEM_TYPE_LIGHT: new Flag({
        code: "ITEM_TYPE_LIGHT",
        sdesc: "ITEM_TYPE_LIGHT",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: META_VALUE_TYPES.INT,
            type_enum: null,
            ldesc: "hours left, 0 is dead, -1 is infinite. Infinite lights are to be rare magical items.",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_SCROLL: new Flag({
        code: "ITEM_TYPE_SCROLL",
        sdesc: "ITEM_TYPE_SCROLL",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spell(s) (The level of the spell determines the cost. For scrolls that are sold make the spell level high. For scrolls that are found make the spell level low.)",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 1",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 2",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 3",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_WAND: new Flag({
        code: "ITEM_TYPE_WAND",
        sdesc: "ITEM_TYPE_WAND",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: null,
            ldesc: "spell number",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_STAFF: new Flag({
        code: "ITEM_TYPE_STAFF",
        sdesc: "ITEM_TYPE_STAFF",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_WEAPON: new Flag({
        code: "ITEM_TYPE_WEAPON",
        sdesc: "ITEM_TYPE_WEAPON",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: ITEM_WEAPON_FLAGS,
            ldesc: "weapon flag",
        },
        value2: {
            type: META_VALUE_TYPES.STRING,
            type_enum: null,
            ldesc: "weapon flag modifiers",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_WEAPON_TYPES,
            ldesc: "Weapon Type",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_SHEATH: new Flag({
        code: "ITEM_TYPE_SHEATH",
        sdesc: "ITEM_TYPE_SHEATH",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: META_VALUE_TYPES.SUM_FLAGS,
            type_enum:ITEM_CONTAINER_FLAGS,
            ldesc: "container flags",
        },
        value2: {
            type: META_VALUE_TYPES.VNUM,
            type_enum:META_VNUM_TYPES.OBJECT,
            ldesc: "key vnum",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_LAYERS,
            ldesc: "layers",
        },
    }),
    ITEM_TYPE_TREASURE: new Flag({
        code: "ITEM_TYPE_TREASURE",
        sdesc: "ITEM_TYPE_TREASURE",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_LAYERS,
            ldesc: "layers",
        },
    }),
    ITEM_TYPE_ARMOR: new Flag({
        code: "ITEM_TYPE_ARMOR",
        sdesc: "ITEM_TYPE_ARMOR",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_BODY_TYPES,
            ldesc: "body type (lesson pending)",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_LAYERS,
            ldesc: "layers",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_ARMOR_TYPES,
            ldesc: "Armor type",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_POTION: new Flag({
        code: "ITEM_TYPE_POTION",
        sdesc: "ITEM_TYPE_POTION",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spells",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 1",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 2",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 3",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_FURNITURE: new Flag({
        code: "ITEM_TYPE_FURNITURE",
        sdesc: "ITEM_TYPE_FURNITURE",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_FURNITURE_STATES,
            ldesc: "Furniture State",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_TRASH: new Flag({
        code: "ITEM_TYPE_TRASH",
        sdesc: "ITEM_TYPE_TRASH",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_CONTAINER: new Flag({
        code: "ITEM_TYPE_CONTAINER",
        sdesc: "ITEM_TYPE_CONTAINER",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_CONTAINER_FLAGS,
            ldesc: "container flags",
        },
        value2: {
            type: META_VALUE_TYPES.VNUM,
            type_enum:META_VNUM_TYPES.OBJECT,
            ldesc: "key vnum",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_LAYERS,
            ldesc: "layers",
        },
    }),
    ITEM_TYPE_DRINKCON: new Flag({
        code: "ITEM_TYPE_DRINKCON",
        sdesc: "ITEM_TYPE_DRINKCON",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "total amount of drinks",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "current amount of drinks",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_DRINK_TYPES,
            ldesc: "liquid #",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_HERB_TYPES,
            ldesc: "component/herb value",
        },
        value4: {
            type: META_VALUE_TYPES.BOOLEAN,
            type_enum: null,
            ldesc: "junks on use or not",
        },
    }),
    ITEM_TYPE_KEY: new Flag({
        code: "ITEM_TYPE_KEY",
        sdesc: "ITEM_TYPE_KEY",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_FOOD: new Flag({
        code: "ITEM_TYPE_FOOD",
        sdesc: "ITEM_TYPE_FOOD",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "nourishment value",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "decay timer",
        },
        value2: {
            type: META_VALUE_TYPES.BOOLEAN,
            type_enum: null,
            ldesc: "FOOD_RAW or FOOD_COOKED, 0 is raw",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_HERB_TYPES,
            ldesc: "component/herb value",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_MONEY: new Flag({
        code: "ITEM_TYPE_MONEY",
        sdesc: "ITEM_TYPE_MONEY",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "# of coins",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_COIN_TYPES,
            ldesc: "coin type",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_PEN: new Flag({
        code: "ITEM_TYPE_PEN",
        sdesc: "ITEM_TYPE_PEN",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "amount of ink",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_CORPSE_NPC: new Flag({
        code: "ITEM_TYPE_CORPSE_NPC",
        sdesc: "ITEM_TYPE_CORPSE_NPC",
        do_not_use: true,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "decomposition timer",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "25 * Race Size",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_CORPSE_PC: new Flag({
        code: "ITEM_TYPE_CORPSE_PC",
        sdesc: "ITEM_TYPE_CORPSE_PC",
        do_not_use: true,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_FOUNTAIN: new Flag({
        code: "ITEM_TYPE_FOUNTAIN",
        sdesc: "ITEM_TYPE_FOUNTAIN",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "Amount of drinks",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_DRINK_TYPES,
            ldesc: "Liquid Type",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_PILL: new Flag({
        code: "ITEM_TYPE_PILL",
        sdesc: "ITEM_TYPE_PILL",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spells",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 1",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 2",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 3",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_BLOOD: new Flag({
        code: "ITEM_TYPE_BLOOD",
        sdesc: "ITEM_TYPE_BLOOD",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "quantity",
        },
        value2: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "decay timer",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_BLOODSTAIN: new Flag({
        code: "ITEM_TYPE_BLOODSTAIN",
        sdesc: "ITEM_TYPE_BLOODSTAIN",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "decay timer",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_SCRAPS: new Flag({
        code: "ITEM_TYPE_SCRAPS",
        sdesc: "ITEM_TYPE_SCRAPS",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "decay timer",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_PIPE: new Flag({
        code: "ITEM_TYPE_PIPE",
        sdesc: "ITEM_TYPE_PIPE",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "maximum capacity of pipe",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "amount of herb in the pipe",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_HERB_TYPES,
            ldesc: "herb type",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_PIPE_FLAGS,
            ldesc: "pipe flags",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_FIRE: new Flag({
        code: "ITEM_TYPE_FIRE",
        sdesc: "ITEM_TYPE_FIRE",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: META_VALUE_TYPES.INT,
            type_enum: null,
            ldesc: "hours left, 0 is dead, -1 is infinite",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_BOOK: new Flag({
        code: "ITEM_TYPE_BOOK",
        sdesc: "ITEM_TYPE_BOOK",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: LANGUAGE_FLAGS,
            ldesc: "Language",
        },
        value4: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "Skill Level (From 1 to 25)",
        },
    }),
    ITEM_TYPE_LEVER: new Flag({
        code: "ITEM_TYPE_LEVER",
        sdesc: "ITEM_TYPE_LEVER",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_LEVER_BUTTON_FLAGS,
            ldesc: "lever trigger flag",
        },
        value1: {
            type: META_VALUE_TYPES.STRING,
            type_enum: null,
            ldesc: "vnum of teleport room or spell number or start room or room to be randomised",
        },
        value2: {
            type: META_VALUE_TYPES.VNUM,
            type_enum:META_VNUM_TYPES.ROOM,
            ldesc: "room to load the mob or object into",
        },
        value3: {
            type: META_VALUE_TYPES.VNUM,
            type_enum: null,
            ldesc: "object or mob to loaded",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_BUTTON: new Flag({
        code: "ITEM_TYPE_BUTTON",
        sdesc: "ITEM_TYPE_BUTTON",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_LEVER_BUTTON_FLAGS,
            ldesc: "lever trigger flag",
        },
        value1: {
            type: META_VALUE_TYPES.STRING,
            type_enum: null,
            ldesc: "vnum of teleport room or spell number",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_TRAP: new Flag({
        code: "ITEM_TYPE_TRAP",
        sdesc: "ITEM_TYPE_TRAP",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: TRAP_TYPES,
            ldesc: "trap type",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "number of reloads",
        },
        value2: {
            type: META_VALUE_TYPES.MULTI_FLAGS,
            type_enum: TRAP_TRIGGERS,
            ldesc: "trap trigger",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_MAP: new Flag({
        code: "ITEM_TYPE_MAP",
        sdesc: "ITEM_TYPE_MAP",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: META_VALUE_TYPES.VNUM,
            type_enum:META_VNUM_TYPES.ROOM,
            ldesc: "low room vnum",
        },
        value2: {
            type: META_VALUE_TYPES.VNUM,
            type_enum:META_VNUM_TYPES.ROOM,
            ldesc: "high room vnum",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_PORTAL: new Flag({
        code: "ITEM_TYPE_PORTAL",
        sdesc: "ITEM_TYPE_PORTAL",
        do_not_use: true,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_PAPER: new Flag({
        code: "ITEM_TYPE_PAPER",
        sdesc: "ITEM_TYPE_PAPER",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "text status",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "subject status",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "to status",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: LANGUAGE_FLAGS,
            ldesc: "language number",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "language skill level",
        },
    }),
    ITEM_TYPE_PROJECTILE: new Flag({
        code: "ITEM_TYPE_PROJECTILE",
        sdesc: "ITEM_TYPE_PROJECTILE",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_WEAPON_FLAGS,
            ldesc: "weapon flag",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "weapon flag modifiers",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_WEAPON_TYPES,
            ldesc: "Weapon Type",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_QUIVER: new Flag({
        code: "ITEM_TYPE_QUIVER",
        sdesc: "ITEM_TYPE_QUIVER",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_CONTAINER_FLAGS,
            ldesc: "container flags",
        },
        value2: {
            type: META_VALUE_TYPES.VNUM,
            type_enum:META_VNUM_TYPES.OBJECT,
            ldesc: "key vnum",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_LAYERS,
            ldesc: "layers",
        },
    }),
    ITEM_TYPE_SHOVEL: new Flag({
        code: "ITEM_TYPE_SHOVEL",
        sdesc: "ITEM_TYPE_SHOVEL",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_SALVE: new Flag({
        code: "ITEM_TYPE_SALVE",
        sdesc: "ITEM_TYPE_SALVE",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "Number of uses",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_HERB_TYPES,
            ldesc: "herb type",
        },
        value4: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "spell slot number",
        },
    }),
    ITEM_TYPE_SYMBOL: new Flag({
        code: "ITEM_TYPE_SYMBOL",
        sdesc: "ITEM_TYPE_SYMBOL",
        do_not_use: true,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "NO. spell component uses",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_TRADEGOODS: new Flag({
        code: "ITEM_TYPE_TRADEGOODS",
        sdesc: "ITEM_TYPE_TRADEGOODS",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_INSTRUMENT: new Flag({
        code: "ITEM_TYPE_INSTRUMENT",
        sdesc: "ITEM_TYPE_INSTRUMENT",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: META_VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_HIDE: new Flag({
        code: "ITEM_TYPE_HIDE",
        sdesc: "ITEM_TYPE_HIDE",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: META_VALUE_TYPES.VNUM,
            type_enum:META_VNUM_TYPES.MOB,
            ldesc: "mob vnum",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "race number",
        },
    }),
    ITEM_TYPE_CART: new Flag({
        code: "ITEM_TYPE_CART",
        sdesc: "ITEM_TYPE_CART",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "capacity",
        },
        value1: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_CONTAINER_FLAGS,
            ldesc: "container flags",
        },
        value2: {
            type: META_VALUE_TYPES.VNUM,
            type_enum:META_VNUM_TYPES.OBJECT,
            ldesc: "key vnum",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_COMPONENT: new Flag({
        code: "ITEM_TYPE_COMPONENT",
        sdesc: "ITEM_TYPE_COMPONENT",
        do_not_use: false,
        value0: {
            type: META_VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "number of uses for the component and amount of herb",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: META_VALUE_TYPES.FLAG,
            type_enum:ITEM_HERB_TYPES,
            ldesc: "herb type",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    }),
    ITEM_TYPE_NONE: new Flag({
        code: "ITEM_TYPE_NONE",
        sdesc: "ITEM_TYPE_NONE",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    })
};
const EXIT_DIRECTIONS = {
    DDIR_EAST: new Flag({
        code: "DDIR_EAST",
        sdesc: "East"
    }),
    DDIR_WEST: new Flag({
        code: "DDIR_WEST",
        sdesc: "West"
    }),
    DDIR_NORTH: new Flag({
        code: "DDIR_NORTH",
        sdesc: "North"
    }),
    DDIR_SOUTH: new Flag({
        code: "DDIR_SOUTH",
        sdesc: "South"
    }),
    DDIR_UP: new Flag({
        code: "DDIR_UP",
        sdesc: "Up"
    }),
    DDIR_DOWN: new Flag({
        code: "DDIR_DOWN",
        sdesc: "Down"
    }),
    DDIR_NORTHEAST: new Flag({
        code: "DDIR_NORTHEAST",
        sdesc: "Northeast"
    }),
    DDIR_NORTHWEST: new Flag({
        code: "DDIR_NORTHWEST",
        sdesc: "Northwest"
    }),
    DDIR_SOUTHEAST: new Flag({
        code: "DDIR_SOUTHEAST",
        sdesc: "Southeast"
    }),
    DDIR_SOUTHWEST: new Flag({
        code: "DDIR_SOUTHWEST",
        sdesc: "Southwest"
    }),
    DDIR_SOMEWHERE: new Flag({
        code: "DDIR_SOMEWHERE",
        sdesc: "Somewhere"
    }),
};
const EXIT_DOOR_FLAGS = {
    EX_ISDOOR: new Flag({
        code: "EX_ISDOOR",
        sdesc: "EX_ISDOOR",
        ldesc: "exit has a door"
    }),
    EX_CLOSED: new Flag({
        code: "EX_CLOSED",
        sdesc: "EX_CLOSED",
        ldesc: "exit with door is closed"
    }),
    EX_LOCKED: new Flag({
        code: "EX_LOCKED",
        sdesc: "EX_LOCKED",
        ldesc: "exit with door is locked"
    }),
    EX_SECRET: new Flag({
        code: "EX_SECRET",
        sdesc: "EX_SECRET",
        ldesc: "cannot be seen or opened"
    }),
    EX_PICKPROOF: new Flag({
        code: "EX_PICKPROOF",
        sdesc: "EX_PICKPROOF",
        ldesc: "door cannot be picked"
    }),
    EX_FLY: new Flag({
        code: "EX_FLY",
        sdesc: "EX_FLY",
        ldesc: "player must fly to pass the door"
    }),
    EX_CLIMB: new Flag({
        code: "EX_CLIMB",
        sdesc: "EX_CLIMB",
        ldesc: "players must climb to pass"
    }),
    EX_DIG: new Flag({
        code: "EX_DIG",
        sdesc: "EX_DIG",
        ldesc: "players must dig the exit"
    }),
    EX_NOPASSDOOR: new Flag({
        code: "EX_NOPASSDOOR",
        sdesc: "EX_NOPASSDOOR",
        ldesc: "passdoor doesn't work"
    }),
    EX_HIDDEN: new Flag({
        code: "EX_HIDDEN",
        sdesc: "EX_HIDDEN",
        ldesc: "cannot be seen but can open"
    }),
    EX_PASSAGE: new Flag({
        code: "EX_PASSAGE",
        sdesc: "EX_PASSAGE",
        ldesc: "passage opened by a mob program"
    }),
    EX_PORTAL: new Flag({
        code: "EX_PORTAL",
        sdesc: "EX_PORTAL",
        ldesc: "spells that create portals"
    }),
    EX_XCLIMB: new Flag({
        code: "EX_XCLIMB",
        sdesc: "EX_XCLIMB",
        ldesc: "typing 'climb' will scoot you out this exit"
    }),
    EX_XENTER: new Flag({
        code: "EX_XENTER",
        sdesc: "EX_XENTER",
        ldesc: "typing 'enter' will move a PC out of this exit"
    }),
    EX_XLEAVE: new Flag({
        code: "EX_XLEAVE",
        sdesc: "EX_XLEAVE",
        ldesc: "typing 'leave' will send a PC out this exit"
    }),
    EX_XAUTO: new Flag({
        code: "EX_XAUTO",
        sdesc: "EX_XAUTO",
        ldesc: "players will 'automatically' use this exit. This is required for somewhere exits with keyword entrances."
    }),
    EX_XSEARCHABLE: new Flag({
        code: "EX_XSEARCHABLE",
        sdesc: "EX_XSEARCHABLE",
        ldesc: "door can be found in standard search"
    }),
    EX_BASHED: new Flag({
        code: "EX_BASHED",
        sdesc: "EX_BASHED",
        ldesc: "exit has been bashed"
    }),
    EX_BASHPROOF: new Flag({
        code: "EX_BASHPROOF",
        sdesc: "EX_BASHPROOF",
        ldesc: "exit cannot be bashed"
    }),
    EX_NOMOB: new Flag({
        code: "EX_NOMOB",
        sdesc: "EX_NOMOB",
        ldesc: "mobiles cannot pass"
    }),
    EX_WINDOW: new Flag({
        code: "EX_WINDOW",
        sdesc: "EX_WINDOW",
        ldesc: "players can look even thru closed door"
    }),
    EX_XLOOK: new Flag({
        code: "EX_XLOOK",
        sdesc: "EX_XLOOK",
        ldesc: "players can look through the exit"
    })
};
const EXIT_SIZES = {
    EXIT_SIZE_ANY: new Flag({
        code: "EXIT_SIZE_ANY",
        sdesc: "EXIT_SIZE_ANY",
        bits: 0
    }),
    EXIT_SIZE_TINY: new Flag({
        code: "EXIT_SIZE_TINY",
        sdesc: "EXIT_SIZE_TINY",
        bits: 1000
    }),
    EXIT_SIZE_SMALL: new Flag({
        code: "EXIT_SIZE_SMALL",
        sdesc: "EXIT_SIZE_SMALL",
        bits: 1001
    }),
    EXIT_SIZE_MEDIUM: new Flag({
        code: "EXIT_SIZE_MEDIUM",
        sdesc: "EXIT_SIZE_MEDIUM",
        bits: 1002
    }),
    EXIT_SIZE_NORMAL: new Flag({
        code: "EXIT_SIZE_NORMAL",
        sdesc: "EXIT_SIZE_NORMAL",
        bits: 1002
    }),
    EXIT_SIZE_LARGE: new Flag({
        code: "EXIT_SIZE_LARGE",
        sdesc: "EXIT_SIZE_LARGE",
        bits: 1003
    }),
    EXIT_SIZE_HUGE: new Flag({
        code: "EXIT_SIZE_HUGE",
        sdesc: "EXIT_SIZE_HUGE",
        bits: 1004
    }),
    EXIT_SIZE_GIANT: new Flag({
        code: "EXIT_SIZE_GIANT",
        sdesc: "EXIT_SIZE_GIANT",
        bits: 1005
    })
};
const ROOM_FLAGS = {
    ROOM_DARK: new Flag({
        code: "ROOM_DARK",
        sdesc: "ROOM_DARK",
        ldesc: "Light is needed in room",
        do_not_use: false
    }),
    ROOM_DEATH: new Flag({
        code: "ROOM_DEATH",
        sdesc: "ROOM_DEATH",
        ldesc: "Do not use",
        do_not_use: true
    }),
    ROOM_NO_MOB: new Flag({
        code: "ROOM_NO_MOB",
        sdesc: "ROOM_NO_MOB",
        ldesc: "Mobs cannot enter room",
        do_not_use: false
    }),
    ROOM_INDOORS: new Flag({
        code: "ROOM_INDOORS",
        sdesc: "ROOM_INDOORS",
        ldesc: "Not affected by weather",
        do_not_use: false
    }),
    ROOM_LAWFUL: new Flag({
        code: "ROOM_LAWFUL",
        sdesc: "ROOM_LAWFUL",
        ldesc: "Good aligned chars only",
        do_not_use: false
    }),
    ROOM_NEUTRAL: new Flag({
        code: "ROOM_NEUTRAL",
        sdesc: "ROOM_NEUTRAL",
        ldesc: "Neutral aligned characters only",
        do_not_use: false
    }),
    ROOM_CHAOTIC: new Flag({
        code: "ROOM_CHAOTIC",
        sdesc: "ROOM_CHAOTIC",
        ldesc: "Evil aligned chars only",
        do_not_use: false
    }),
    ROOM_NO_MAGIC: new Flag({
        code: "ROOM_NO_MAGIC",
        sdesc: "ROOM_NO_MAGIC",
        ldesc: "Players cannot cast spells",
        do_not_use: false
    }),
    ROOM_NO_TUNNEL: new Flag({
        code: "ROOM_NO_TUNNEL",
        sdesc: "ROOM_NO_TUNNEL",
        ldesc: "Do not use",
        do_not_use: true
    }),
    ROOM_PRIVATE: new Flag({
        code: "ROOM_PRIVATE",
        sdesc: "ROOM_PRIVATE",
        ldesc: "Only 2 players may enter room",
        do_not_use: false
    }),
    ROOM_SAFE: new Flag({
        code: "ROOM_SAFE",
        sdesc: "ROOM_SAFE",
        ldesc: "No fighting in this room",
        do_not_use: false
    }),
    ROOM_SOLITARY: new Flag({
        code: "ROOM_SOLITARY",
        sdesc: "ROOM_SOLITARY",
        ldesc: "Only 1 player may enter room",
        do_not_use: false
    }),
    ROOM_PET_SHOP: new Flag({
        code: "ROOM_PET_SHOP",
        sdesc: "ROOM_PET_SHOP",
        ldesc: "Room is a petshop",
        do_not_use: false
    }),
    ROOM_NO_RECALL: new Flag({
        code: "ROOM_NO_RECALL",
        sdesc: "ROOM_NO_RECALL",
        ldesc: "Players cannot recall",
        do_not_use: false
    }),
    ROOM_DONATION: new Flag({
        code: "ROOM_DONATION",
        sdesc: "ROOM_DONATION",
        ldesc: "Prevents players from using 'get all'",
        do_not_use: false
    }),
    ROOM_NODROPALL: new Flag({
        code: "ROOM_NODROPALL",
        sdesc: "ROOM_NODROPALL",
        ldesc: "Stops players doing 'drop all', ideal for public squares etc",
        do_not_use: false
    }),
    ROOM_SILENCE: new Flag({
        code: "ROOM_SILENCE",
        sdesc: "ROOM_SILENCE",
        ldesc: "Players may not speak or emote",
        do_not_use: false
    }),
    ROOM_LOGSPEECH: new Flag({
        code: "ROOM_LOGSPEECH",
        sdesc: "ROOM_LOGSPEECH",
        ldesc: "Do not use without builder admin consultation",
        do_not_use: false
    }),
    ROOM_NODROP: new Flag({
        code: "ROOM_NODROP",
        sdesc: "ROOM_NODROP",
        ldesc: "Players may not drop stuff",
        do_not_use: false
    }),
    ROOM_CLANSTOREROOM: new Flag({
        code: "ROOM_CLANSTOREROOM",
        sdesc: "ROOM_CLANSTOREROOM",
        ldesc: "Used for guild storerooms. Ask a builders admin first.",
        do_not_use: false
    }),
    ROOM_NO_SUMMON: new Flag({
        code: "ROOM_NO_SUMMON",
        sdesc: "ROOM_NO_SUMMON",
        ldesc: "Player cannot be summoned from room",
        do_not_use: false
    }),
    ROOM_NO_ASTRAL: new Flag({
        code: "ROOM_NO_ASTRAL",
        sdesc: "ROOM_NO_ASTRAL",
        ldesc: "Cannot gate or magically transport to or from this room",
        do_not_use: false
    }),
    ROOM_TELEPORT: new Flag({
        code: "ROOM_TELEPORT",
        sdesc: "ROOM_TELEPORT",
        ldesc: "Will teleport the PC after the delay set in value3 to the vnum set in value4",
        do_not_use: false
    }),
    ROOM_TELESHOWDESC: new Flag({
        code: "ROOM_TELESHOWDESC",
        sdesc: "ROOM_TELESHOWDESC",
        ldesc: "When teleported it shows the PC's the description of the new room",
        do_not_use: false
    }),
    ROOM_NOFLOOR: new Flag({
        code: "ROOM_NOFLOOR",
        sdesc: "ROOM_NOFLOOR",
        ldesc: "Players and objects fall to (down) room",
        do_not_use: false
    }),
    ROOM_PROTOTYPE: new Flag({
        code: "ROOM_PROTOTYPE",
        sdesc: "ROOM_PROTOTYPE",
        ldesc: "Used by OLC. Do not use.",
        do_not_use: true
    }),
    ROOM_INN: new Flag({
        code: "ROOM_INN",
        sdesc: "ROOM_INN",
        ldesc: "Allows PC's to heal at a faster rate",
        do_not_use: false
    })
};
const ROOM_SECTOR_FLAGS = {
    SECT_INSIDE: new Flag({
        code:"SECT_INSIDE",
        sdesc: "SECT_INSIDE",
        ldesc: "(0) inside a building or structure etc. It is always lit",
        do_not_use: false
    }),
    SECT_CITY: new Flag({
        code:"SECT_CITY",
        sdesc: "SECT_CITY",
        ldesc: "(1) typical city street, it is always lit",
        do_not_use: false
    }),
    SECT_FIELD: new Flag({
        code:"SECT_FIELD",
        sdesc: "SECT_FIELD",
        ldesc: "p (2) a grassy field",
        do_not_use: false
    }),
    SECT_FOREST: new Flag({
        code:"SECT_FOREST",
        sdesc: "SECT_FOREST",
        ldesc: "F (3) heavily wooded forest",
        do_not_use: false
    }),
    SECT_HILLS: new Flag({
        code:"SECT_HILLS",
        sdesc: "SECT_HILLS",
        ldesc: "h (4) rolling hills",
        do_not_use: false
    }),
    SECT_MOUNTAIN: new Flag({
        code:"SECT_MOUNTAIN",
        sdesc: "SECT_MOUNTAIN",
        ldesc: "^ (5) mountainous terrain",
        do_not_use: false
    }),
    SECT_WATER_SWIM: new Flag({
        code:"SECT_WATER_SWIM",
        sdesc: "SECT_WATER_SWIM",
        ldesc: "(6) calm water",
        do_not_use: false
    }),
    SECT_WATER_NOSWIM: new Flag({
        code:"SECT_WATER_NOSWIM",
        sdesc: "SECT_WATER_NOSWIM",
        ldesc: "w (7) swimming skill required",
        do_not_use: false
    }),
    SECT_UNDERWATER: new Flag({
        code:"SECT_UNDERWATER",
        sdesc: "SECT_UNDERWATER",
        ldesc: "(8) Water-breathing required. Character swims.",
        do_not_use: false
    }),
    SECT_AIR: new Flag({
        code:"SECT_AIR",
        sdesc: "SECT_AIR",
        ldesc: "(9) flying required",
        do_not_use: false
    }),
    SECT_DESERT: new Flag({
        code:"SECT_DESERT",
        sdesc: "SECT_DESERT",
        ldesc: "d (10) dry sandy terrain",
        do_not_use: false
    }),
    SECT_DUNNO: new Flag({
        code:"SECT_DUNNO",
        sdesc: "SECT_DUNNO",
        ldesc: "Do not use. Reserved for future use.",
        do_not_use: true
    }),
    SECT_OCEANFLOOR: new Flag({
        code:"SECT_OCEANFLOOR",
        sdesc: "SECT_OCEANFLOOR",
        ldesc: "(12) Underwater. Breathwater is required. Character can WALK.",
        do_not_use: false
    }),
    SECT_UNDERGROUND: new Flag({
        code:"SECT_UNDERGROUND",
        sdesc: "SECT_UNDERGROUND",
        ldesc: "(13) underground structure",
        do_not_use: false
    }),
    SECT_WOODS: new Flag({
        code:"SECT_WOODS",
        sdesc: "SECT_WOODS",
        ldesc: "f (14) lightly wooded terrain",
        do_not_use: false
    }),
    SECT_ROAD: new Flag({
        code:"SECT_ROAD",
        sdesc: "SECT_ROAD",
        ldesc: "\\ (15) roads outside of cites",
        do_not_use: false
    }),
    SECT_TUNDRA: new Flag({
        code:"SECT_TUNDRA",
        sdesc: "SECT_TUNDRA",
        ldesc: "t (16) cold scrub land/frozen wastes",
        do_not_use: false
    }),
    SECT_BARREN: new Flag({
        code:"SECT_BARREN",
        sdesc: "SECT_BARREN",
        ldesc: "b (17) barren lands/moors/rocky, treeless plains",
        do_not_use: false
    }),
    SECT_ABYSS: new Flag({
        code:"SECT_ABYSS",
        sdesc: "SECT_ABYSS",
        ldesc: "V (19) an abyss which requires flight to cross (UNDERDARK)",
        do_not_use: false
    }),
    SECT_FUNGUSFOREST: new Flag({
        code:"SECT_FUNGUSFOREST",
        sdesc: "SECT_FUNGUSFOREST",
        ldesc: "F (20) a forest which blocks exits randomly (UNDERDARK)",
        do_not_use: false
    }),
    SECT_CHASM: new Flag({
        code:"SECT_CHASM",
        sdesc: "SECT_CHASM",
        ldesc: "x (21) must pass climb check or be injured (UNDERDARK)",
        do_not_use: false
    }),
    SECT_CAVE: new Flag({
        code:"SECT_CAVE",
        sdesc: "SECT_CAVE",
        ldesc: "C (22) speaks for itself (UNDERDARK)",
        do_not_use: false
    }),
    SECT_GUARDEDTUNNEL: new Flag({
        code:"SECT_GUARDEDTUNNEL",
        sdesc: "SECT_GUARDEDTUNNEL",
        ldesc: "# (23) Used to confine wandering patrols (UNDERDARK)",
        do_not_use: false
    }),
    SECT_UNDERGROUND_SEA: new Flag({
        code:"SECT_UNDERGROUND_SEA",
        sdesc: "SECT_UNDERGROUND_SEA",
        ldesc: "W (25) must swim (UNDERDARK)",
        do_not_use: false
    }),
    SECT_UNDERGROUND_RIVER: new Flag({
        code:"SECT_UNDERGROUND_RIVER",
        sdesc: "SECT_UNDERGROUND_RIVER",
        ldesc: "r (26) must swim, may get caught in current (UNDERDARK)",
        do_not_use: false
    }),
    SECT_SIDE_TUNNEL: new Flag({
        code:"SECT_SIDE_TUNNEL",
        sdesc: "SECT_SIDE_TUNNEL",
        ldesc: "o (27) regular terrain (UNDERDARK)",
        do_not_use: false
    }),
    SECT_VOLCANO: new Flag({
        code:"SECT_VOLCANO",
        sdesc: "SECT_VOLCANO",
        ldesc: "^ (28) burns PC (UNDERDARK)",
        do_not_use: false
    }),
    SECT_SULPHUR: new Flag({
        code:"SECT_SULPHUR",
        sdesc: "SECT_SULPHUR",
        ldesc: "= (29) burns PC (UNDERDARK)",
        do_not_use: false
    })
};
const MOB_CLASSES = {
    // Warrior Classes
    CLASS_WARRIOR: new Flag({
        code: "CLASS_WARRIOR",
        sdesc: "CLASS_WARRIOR",
        category: "Warrior"
    }),
    CLASS_RANGERS: new Flag({
        code: "CLASS_RANGERS",
        sdesc: "CLASS_RANGERS",
        category: "Warrior"
    }),
    CLASS_FIGHTERS: new Flag({
        code: "CLASS_FIGHTERS",
        sdesc: "CLASS_FIGHTERS",
        category: "Warrior"
    }),
    CLASS_PALADINS: new Flag({
        code: "CLASS_PALADINS",
        sdesc: "CLASS_PALADINS",
        category: "Warrior"
    }),
    // Wizard Classes
    CLASS_WIZARD: new Flag({
        code: "CLASS_WIZARD",
        sdesc: "CLASS_WIZARD",
        category: "Wizard"
    }),
    CLASS_ILLUSIONISTS: new Flag({
        code: "CLASS_ILLUSIONISTS",
        sdesc: "CLASS_ILLUSIONISTS",
        category: "Wizard"
    }),
    CLASS_INVOKERS: new Flag({
        code: "CLASS_INVOKERS",
        sdesc: "CLASS_INVOKERS",
        category: "Wizard"
    }),
    CLASS_MAGES: new Flag({
        code: "CLASS_MAGES",
        sdesc: "CLASS_MAGES",
        category: "Wizard"
    }),
    CLASS_NECROMANCERS: new Flag({
        code: "CLASS_NECROMANCERS",
        sdesc: "CLASS_NECROMANCERS",
        category: "Wizard"
    }),
    CLASS_TRANSMUTERS: new Flag({
        code: "CLASS_TRANSMUTERS",
        sdesc: "CLASS_TRANSMUTERS",
        category: "Wizard"
    }),
    CLASS_ABJURER: new Flag({
        code: "CLASS_ABJURER",
        sdesc: "CLASS_ABJURER",
        category: "Wizard"
    }),
    CLASS_CONJURER: new Flag({
        code: "CLASS_CONJURER",
        sdesc: "CLASS_CONJURER",
        category: "Wizard"
    }),
    // Rogue classes
    CLASS_ROGUE: new Flag({
        code: "CLASS_ROGUE",
        sdesc: "CLASS_ROGUE",
        category: "Rogue"
    }),
    CLASS_THIEVES: new Flag({
        code: "CLASS_THIEVES",
        sdesc: "CLASS_THIEVES",
        category: "Rogue"
    }),
    CLASS_BARDS: new Flag({
        code: "CLASS_BARDS",
        sdesc: "CLASS_BARDS",
        category: "Rogue"
    }),
    // Priest classes
    CLASS_PRIEST: new Flag({
        code: "CLASS_PRIEST",
        sdesc: "CLASS_PRIEST",
        category: "Priest"
    }),
    CLASS_BANE: new Flag({
        code: "CLASS_BANE",
        sdesc: "CLASS_BANE",
        category: "Priest"
    }),
    CLASS_BESHABA: new Flag({
        code: "CLASS_BESHABA",
        sdesc: "CLASS_BESHABA",
        category: "Priest"
    }),
    CLASS_CHAUNTEA: new Flag({
        code: "CLASS_CHAUNTEA",
        sdesc: "CLASS_CHAUNTEA",
        category: "Priest"
    }),
    CLASS_CORELLON: new Flag({
        code: "CLASS_CORELLON",
        sdesc: "CLASS_CORELLON",
        category: "Priest"
    }),
    CLASS_CYRIC: new Flag({
        code: "CLASS_CYRIC",
        sdesc: "CLASS_CYRIC",
        category: "Priest"
    }),
    CLASS_GARL: new Flag({
        code: "CLASS_GARL",
        sdesc: "CLASS_GARL",
        category: "Priest"
    }),
    CLASS_GOND: new Flag({
        code: "CLASS_GOND",
        sdesc: "CLASS_GOND",
        category: "Priest"
    }),
    CLASS_GRUUMSH: new Flag({
        code: "CLASS_GRUUMSH",
        sdesc: "CLASS_GRUUMSH",
        category: "Priest"
    }),
    CLASS_HELM: new Flag({
        code: "CLASS_HELM",
        sdesc: "CLASS_HELM",
        category: "Priest"
    }),
    CLASS_ILMATER: new Flag({
        code: "CLASS_ILMATER",
        sdesc: "CLASS_ILMATER",
        category: "Priest"
    }),
    CLASS_KELEMVOR: new Flag({
        code: "CLASS_KELEMVOR",
        sdesc: "CLASS_KELEMVOR",
        category: "Priest"
    }),
    CLASS_LATHANDER: new Flag({
        code: "CLASS_LATHANDER",
        sdesc: "CLASS_LATHANDER",
        category: "Priest"
    }),
    CLASS_LLOTH: new Flag({
        code: "CLASS_LLOTH",
        sdesc: "CLASS_LLOTH",
        category: "Priest"
    }),
    CLASS_LOVIATAR: new Flag({
        code: "CLASS_LOVIATAR",
        sdesc: "CLASS_LOVIATAR",
        category: "Priest"
    }),
    CLASS_MALAR: new Flag({
        code: "CLASS_MALAR",
        sdesc: "CLASS_MALAR",
        category: "Priest"
    }),
    CLASS_MASK: new Flag({
        code: "CLASS_MASK",
        sdesc: "CLASS_MASK",
        category: "Priest"
    }),
    CLASS_MIELIKKI: new Flag({
        code: "CLASS_MIELIKKI",
        sdesc: "CLASS_MIELIKKI",
        category: "Priest"
    }),
    CLASS_MORADIN: new Flag({
        code: "CLASS_MORADIN",
        sdesc: "CLASS_MORADIN",
        category: "Priest"
    }),
    CLASS_MYSTRA: new Flag({
        code: "CLASS_MYSTRA",
        sdesc: "CLASS_MYSTRA",
        category: "Priest"
    }),
    CLASS_OGHMA: new Flag({
        code: "CLASS_OGHMA",
        sdesc: "CLASS_OGHMA",
        category: "Priest"
    }),
    CLASS_SELUNE: new Flag({
        code: "CLASS_SELUNE",
        sdesc: "CLASS_SELUNE",
        category: "Priest"
    }),
    CLASS_SHAR: new Flag({
        code: "CLASS_SHAR",
        sdesc: "CLASS_SHAR",
        category: "Priest"
    }),
    CLASS_SUNE: new Flag({
        code: "CLASS_SUNE",
        sdesc: "CLASS_SUNE",
        category: "Priest"
    }),
    CLASS_TALONA: new Flag({
        code: "CLASS_TALONA",
        sdesc: "CLASS_TALONA",
        category: "Priest"
    }),
    CLASS_TALOS: new Flag({
        code: "CLASS_TALOS",
        sdesc: "CLASS_TALOS",
        category: "Priest"
    }),
    CLASS_TEMPUS: new Flag({
        code: "CLASS_TEMPUS",
        sdesc: "CLASS_TEMPUS",
        category: "Priest"
    }),
    CLASS_TORM: new Flag({
        code: "CLASS_TORM",
        sdesc: "CLASS_TORM",
        category: "Priest"
    }),
    CLASS_TYMORA: new Flag({
        code: "CLASS_TYMORA",
        sdesc: "CLASS_TYMORA",
        category: "Priest"
    }),
    CLASS_TYR: new Flag({
        code: "CLASS_TYR",
        sdesc: "CLASS_TYR",
        category: "Priest"
    }),
    CLASS_UMBERLEE: new Flag({
        code: "CLASS_UMBERLEE",
        sdesc: "CLASS_UMBERLEE",
        category: "Priest"
    }),
    CLASS_WAUKEEN: new Flag({
        code: "CLASS_WAUKEEN",
        sdesc: "CLASS_WAUKEEN",
        category: "Priest"
    }),
    CLASS_YONDALLA: new Flag({
        code: "CLASS_YONDALLA",
        sdesc: "CLASS_YONDALLA",
        category: "Priest"
    }),
    // Other classes
    CLASS_VAMPIRE: new Flag({
        code: "CLASS_VAMPIRE",
        sdesc: "CLASS_VAMPIRE",
        category: "Other"
    }),
    CLASS_MONSTER: new Flag({
        code: "CLASS_MONSTER",
        sdesc: "CLASS_MONSTER",
        category: "Other"
    }),
    CLASS_NONE: new Flag({
        code: "CLASS_NONE",
        sdesc: "CLASS_NONE",
        category: "Other"
    })
};
const MOB_RACES = {
    RACE_BEHOLDER: new Flag({
        code: "RACE_BEHOLDER",
        sdesc: "beholder",
        category: "aberration"
    }),
    RACE_CORRUPTED_EAGLE: new Flag({
        code: "RACE_CORRUPTED_EAGLE",
        sdesc: "corrupted eagle",
        category: "aberration"
    }),
    RACE_DARKMANTLE: new Flag({
        code: "RACE_DARKMANTLE",
        sdesc: "darkmantle",
        category: "aberration"
    }),
    RACE_DRIDER: new Flag({
        code: "RACE_DRIDER",
        sdesc: "drider",
        category: "aberration"
    }),
    RACE_ETTERCAP: new Flag({
        code: "RACE_ETTERCAP",
        sdesc: "ettercap",
        category: "aberration"
    }),
    RACE_GRELL: new Flag({
        code: "RACE_GRELL",
        sdesc: "grell",
        category: "aberration"
    }),
    RACE_HARPOON_SPIDER: new Flag({
        code: "RACE_HARPOON_SPIDER",
        sdesc: "harpoon spider",
        category: "aberration"
    }),
    RACE_HARPOON_SPIDER_DREAD: new Flag({
        code: "RACE_HARPOON_SPIDER_DREAD",
        sdesc: "dread harpoon spider",
        category: "aberration"
    }),
    RACE_HOOKHORROR: new Flag({
        code: "RACE_HOOKHORROR",
        sdesc: "hookhorror",
        category: "aberration"
    }),
    RACE_ILLITHID: new Flag({
        code: "RACE_ILLITHID",
        sdesc: "illithid",
        category: "aberration"
    }),
    RACE_ELDER_BRAIN: new Flag({
        code: "RACE_ELDER_BRAIN",
        sdesc: "elder brain",
        category: "aberration"
    }),
    RACE_KYTHON_ADULT: new Flag({
        code: "RACE_KYTHON_ADULT",
        sdesc: "kython adult",
        category: "aberration"
    }),
    RACE_KYTHON_BROODLING: new Flag({
        code: "RACE_KYTHON_BROODLING",
        sdesc: "kython broodling",
        category: "aberration"
    }),
    RACE_KYTHON_JUVENILE: new Flag({
        code: "RACE_KYTHON_JUVENILE",
        sdesc: "kython juvenile",
        category: "aberration"
    }),
    RACE_KYTHON_SLAUGHTERKING: new Flag({
        code: "RACE_KYTHON_SLAUGHTERKING",
        sdesc: "kython slaughterking",
        category: "aberration"
    }),
    RACE_LURKER: new Flag({
        code: "RACE_LURKER",
        sdesc: "lurker",
        category: "aberration"
    }),
    RACE_MIMIC: new Flag({
        code: "RACE_MIMIC",
        sdesc: "mimic",
        category: "aberration"
    }),
    RACE_NAGA: new Flag({
        code: "RACE_NAGA",
        sdesc: "naga",
        category: "aberration"
    }),
    RACE_RUST_MONSTER: new Flag({
        code: "RACE_RUST_MONSTER",
        sdesc: "rust monster",
        category: "aberration"
    }),
    RACE_UMBERHULK: new Flag({
        code: "RACE_UMBERHULK",
        sdesc: "umberhulk",
        category: "aberration"
    }),
    RACE_APE: new Flag({
        code: "RACE_APE",
        sdesc: "ape",
        category: "animal"
    }),
    RACE_APE_DIRE: new Flag({
        code: "RACE_APE_DIRE",
        sdesc: "ape dire",
        category: "animal"
    }),
    RACE_BABOON: new Flag({
        code: "RACE_BABOON",
        sdesc: "baboon",
        category: "animal"
    }),
    RACE_BADGER: new Flag({
        code: "RACE_BADGER",
        sdesc: "badger",
        category: "animal"
    }),
    RACE_BADGER_DIRE: new Flag({
        code: "RACE_BADGER_DIRE",
        sdesc: "dire badger",
        category: "animal"
    }),
    RACE_BAT: new Flag({
        code: "RACE_BAT",
        sdesc: "bat",
        category: "animal"
    }),
    RACE_BAT_DIRE: new Flag({
        code: "RACE_BAT_DIRE",
        sdesc: "dire bat",
        category: "animal"
    }),
    RACE_BEAR: new Flag({
        code: "RACE_BEAR",
        sdesc: "bear",
        category: "animal"
    }),
    RACE_BEAR_BLACK: new Flag({
        code: "RACE_BEAR_BLACK",
        sdesc: "black bear",
        category: "animal"
    }),
    RACE_BEAR_BROWN: new Flag({
        code: "RACE_BEAR_BROWN",
        sdesc: "brown bear",
        category: "animal"
    }),
    RACE_BEAR_DIRE: new Flag({
        code: "RACE_BEAR_DIRE",
        sdesc: "dire bear",
        category: "animal"
    }),
    RACE_BEAR_POLAR: new Flag({
        code: "RACE_BEAR_POLAR",
        sdesc: "polar bear",
        category: "animal"
    }),
    RACE_BIRD: new Flag({
        code: "RACE_BIRD",
        sdesc: "bird",
        category: "animal"
    }),
    RACE_EAGLE: new Flag({
        code: "RACE_EAGLE",
        sdesc: "eagle",
        category: "animal"
    }),
    RACE_HAWK: new Flag({
        code: "RACE_HAWK",
        sdesc: "hawk",
        category: "animal"
    }),
    RACE_RAVEN: new Flag({
        code: "RACE_RAVEN",
        sdesc: "raven",
        category: "animal"
    }),
    RACE_OWL: new Flag({
        code: "RACE_OWL",
        sdesc: "owl",
        category: "animal"
    }),
    RACE_BISON: new Flag({
        code: "RACE_BISON",
        sdesc: "bison",
        category: "animal"
    }),
    RACE_BOAR: new Flag({
        code: "RACE_BOAR",
        sdesc: "boar",
        category: "animal"
    }),
    RACE_BOAR_DIRE: new Flag({
        code: "RACE_BOAR_DIRE",
        sdesc: "dire boar",
        category: "animal"
    }),
    RACE_PIG: new Flag({
        code: "RACE_PIG",
        sdesc: "pig",
        category: "animal"
    }),
    RACE_CAMEL: new Flag({
        code: "RACE_CAMEL",
        sdesc: "camel",
        category: "animal"
    }),
    RACE_CAT: new Flag({
        code: "RACE_CAT",
        sdesc: "cat",
        category: "animal"
    }),
    RACE_CHEETAH: new Flag({
        code: "RACE_CHEETAH",
        sdesc: "cheetah",
        category: "animal"
    }),
    RACE_COW: new Flag({
        code: "RACE_COW",
        sdesc: "cow",
        category: "animal"
    }),
    RACE_CRAB: new Flag({
        code: "RACE_CRAB",
        sdesc: "crab",
        category: "animal"
    }),
    RACE_CROCODILE: new Flag({
        code: "RACE_CROCODILE",
        sdesc: "crocodile",
        category: "animal"
    }),
    RACE_CROCODILE_GIANT: new Flag({
        code: "RACE_CROCODILE_GIANT",
        sdesc: "giant crocodile",
        category: "animal"
    }),
    RACE_BAT_DEEP: new Flag({
        code: "RACE_BAT_DEEP",
        sdesc: "deep bat",
        category: "animal"
    }),
    RACE_BAT_DEEP_NIGHT_HUNTER: new Flag({
        code: "RACE_BAT_DEEP_NIGHT_HUNTER",
        sdesc: "night hunter",
        category: "animal"
    }),
    RACE_DEINONYCHUS: new Flag({
        code: "RACE_DEINONYCHUS",
        sdesc: "deinonychus",
        category: "animal"
    }),
    RACE_DOG: new Flag({
        code: "RACE_DOG",
        sdesc: "dog",
        category: "animal"
    }),
    RACE_DOG_RIDING: new Flag({
        code: "RACE_DOG_RIDING",
        sdesc: "riding dog",
        category: "animal"
    }),
    RACE_ELASMOSAURUS: new Flag({
        code: "RACE_ELASMOSAURUS",
        sdesc: "elasmosaurus",
        category: "animal"
    }),
    RACE_ELEPHANT: new Flag({
        code: "RACE_ELEPHANT",
        sdesc: "elephant",
        category: "animal"
    }),
    RACE_FISH: new Flag({
        code: "RACE_FISH",
        sdesc: "fish",
        category: "animal"
    }),
    RACE_HORSE: new Flag({
        code: "RACE_HORSE",
        sdesc: "horse",
        category: "animal"
    }),
    RACE_DONKEY: new Flag({
        code: "RACE_DONKEY",
        sdesc: "donkey",
        category: "animal"
    }),
    RACE_HORSE_HEAVY: new Flag({
        code: "RACE_HORSE_HEAVY",
        sdesc: "heavy horse",
        category: "animal"
    }),
    RACE_HORSE_HEAVYWAR: new Flag({
        code: "RACE_HORSE_HEAVYWAR",
        sdesc: "heavy warhorse",
        category: "animal"
    }),
    RACE_HORSE_LIGHT: new Flag({
        code: "RACE_HORSE_LIGHT",
        sdesc: "light horse",
        category: "animal"
    }),
    RACE_HORSE_LIGHTWAR: new Flag({
        code: "RACE_HORSE_LIGHTWAR",
        sdesc: "light warhorse",
        category: "animal"
    }),
    RACE_MULE: new Flag({
        code: "RACE_MULE",
        sdesc: "mule",
        category: "animal"
    }),
    RACE_PONY: new Flag({
        code: "RACE_PONY",
        sdesc: "pony",
        category: "animal"
    }),
    RACE_PONY_WAR: new Flag({
        code: "RACE_PONY_WAR",
        sdesc: "war pony",
        category: "animal"
    }),
    RACE_HYENA: new Flag({
        code: "RACE_HYENA",
        sdesc: "hyena",
        category: "animal"
    }),
    RACE_LION: new Flag({
        code: "RACE_LION",
        sdesc: "lion",
        category: "animal"
    }),
    RACE_LION_DIRE: new Flag({
        code: "RACE_LION_DIRE",
        sdesc: "dire lion",
        category: "animal"
    }),
    RACE_LIZARD: new Flag({
        code: "RACE_LIZARD",
        sdesc: "lizard",
        category: "animal"
    }),
    RACE_LIZARD_MONITOR: new Flag({
        code: "RACE_LIZARD_MONITOR",
        sdesc: "monitor lizard",
        category: "animal"
    }),
    RACE_LIZARD_RIDING: new Flag({
        code: "RACE_LIZARD_RIDING",
        sdesc: "riding lizard",
        category: "animal"
    }),
    RACE_MANTARAY: new Flag({
        code: "RACE_MANTARAY",
        sdesc: "manta ray",
        category: "animal"
    }),
    RACE_MEGARAPTOR: new Flag({
        code: "RACE_MEGARAPTOR",
        sdesc: "megaraptor",
        category: "animal"
    }),
    RACE_MONKEY: new Flag({
        code: "RACE_MONKEY",
        sdesc: "monkey",
        category: "animal"
    }),
    RACE_OCTOPUS: new Flag({
        code: "RACE_OCTOPUS",
        sdesc: "octopus",
        category: "animal"
    }),
    RACE_OCTOPUS_GIANT: new Flag({
        code: "RACE_OCTOPUS_GIANT",
        sdesc: "giant octopus",
        category: "animal"
    }),
    RACE_PANTHER: new Flag({
        code: "RACE_PANTHER",
        sdesc: "panther",
        category: "animal"
    }),
    RACE_PORPOISE: new Flag({
        code: "RACE_PORPOISE",
        sdesc: "porpoise",
        category: "animal"
    }),
    RACE_PTERANODON: new Flag({
        code: "RACE_PTERANODON",
        sdesc: "pteranodon",
        category: "animal"
    }),
    RACE_RABBIT: new Flag({
        code: "RACE_RABBIT",
        sdesc: "rabbit",
        category: "animal"
    }),
    RACE_RAT: new Flag({
        code: "RACE_RAT",
        sdesc: "rat",
        category: "animal"
    }),
    RACE_RAT_DIRE: new Flag({
        code: "RACE_RAT_DIRE",
        sdesc: "dire rat",
        category: "animal"
    }),
    RACE_RHINOCEROS: new Flag({
        code: "RACE_RHINOCEROS",
        sdesc: "rhinoceros",
        category: "animal"
    }),
    RACE_SHARK: new Flag({
        code: "RACE_SHARK",
        sdesc: "shark",
        category: "animal"
    }),
    RACE_SHARK_DIRE: new Flag({
        code: "RACE_SHARK_DIRE",
        sdesc: "dire shark",
        category: "animal"
    }),
    RACE_SNAKE: new Flag({
        code: "RACE_SNAKE",
        sdesc: "snake",
        category: "animal"
    }),
    RACE_SNAKE_CONSTRICTOR: new Flag({
        code: "RACE_SNAKE_CONSTRICTOR",
        sdesc: "constrictor snake",
        category: "animal"
    }),
    RACE_SNAKE_CONSTRICTOR_GIANT: new Flag({
        code: "RACE_SNAKE_CONSTRICTOR_GIANT",
        sdesc: "giant constrictor snake",
        category: "animal"
    }),
    RACE_SQUID: new Flag({
        code: "RACE_SQUID",
        sdesc: "squid",
        category: "animal"
    }),
    RACE_SQUID_GIANT: new Flag({
        code: "RACE_SQUID_GIANT",
        sdesc: "giant squid",
        category: "animal"
    }),
    RACE_TIGER: new Flag({
        code: "RACE_TIGER",
        sdesc: "tiger",
        category: "animal"
    }),
    RACE_TIGER_DIRE: new Flag({
        code: "RACE_TIGER_DIRE",
        sdesc: "dire tiger",
        category: "animal"
    }),
    RACE_TOAD: new Flag({
        code: "RACE_TOAD",
        sdesc: "toad",
        category: "animal"
    }),
    RACE_FROG: new Flag({
        code: "RACE_FROG",
        sdesc: "frog",
        category: "animal"
    }),
    RACE_TRESSYM: new Flag({
        code: "RACE_TRESSYM",
        sdesc: "tressym",
        category: "animal"
    }),
    RACE_TRICERATOPS: new Flag({
        code: "RACE_TRICERATOPS",
        sdesc: "triceratops",
        category: "animal"
    }),
    RACE_TYRANNOSAURUS: new Flag({
        code: "RACE_TYRANNOSAURUS",
        sdesc: "tyrannosaurus",
        category: "animal"
    }),
    RACE_WEASEL: new Flag({
        code: "RACE_WEASEL",
        sdesc: "weasel",
        category: "animal"
    }),
    RACE_WEASEL_DIRE: new Flag({
        code: "RACE_WEASEL_DIRE",
        sdesc: "dire weasel",
        category: "animal"
    }),
    RACE_WHALE_BALEEN: new Flag({
        code: "RACE_WHALE_BALEEN",
        sdesc: "whale baleen",
        category: "animal"
    }),
    RACE_WHALE_CACHALOT: new Flag({
        code: "RACE_WHALE_CACHALOT",
        sdesc: "cachalot",
        category: "animal"
    }),
    RACE_WHALE_ORCA: new Flag({
        code: "RACE_WHALE_ORCA",
        sdesc: "orca",
        category: "animal"
    }),
    RACE_WOLF: new Flag({
        code: "RACE_WOLF",
        sdesc: "wolf",
        category: "animal"
    }),
    RACE_WOLF_DIRE: new Flag({
        code: "RACE_WOLF_DIRE",
        sdesc: "dire wolf",
        category: "animal"
    }),
    RACE_WOLVERINE: new Flag({
        code: "RACE_WOLVERINE",
        sdesc: "wolverine",
        category: "animal"
    }),
    RACE_WOLVERINE_DIRE: new Flag({
        code: "RACE_WOLVERINE_DIRE",
        sdesc: "dire wolverine",
        category: "animal"
    }),
    RACE_ANIMATED: new Flag({
        code: "RACE_ANIMATED",
        sdesc: "animated",
        category: "construct"
    }),
    RACE_CRAWLING_CLAW: new Flag({
        code: "RACE_CRAWLING_CLAW",
        sdesc: "crawling_claw",
        category: "construct"
    }),
    RACE_DUMMY: new Flag({
        code: "RACE_DUMMY",
        sdesc: "dummy",
        category: "construct"
    }),
    RACE_GOLEM: new Flag({
        code: "RACE_GOLEM",
        sdesc: "golem",
        category: "construct"
    }),
    RACE_GOLEM_CLAY: new Flag({
        code: "RACE_GOLEM_CLAY",
        sdesc: "clay golem",
        category: "construct"
    }),
    RACE_GOLEM_FLESH: new Flag({
        code: "RACE_GOLEM_FLESH",
        sdesc: "flesh golem",
        category: "construct"
    }),
    RACE_GOLEM_IRON: new Flag({
        code: "RACE_GOLEM_IRON",
        sdesc: "iron golem",
        category: "construct"
    }),
    RACE_MAGICAL: new Flag({
        code: "RACE_MAGICAL",
        sdesc: "magical",
        category: "construct"
    }),
    RACE_GOLEM_STONE: new Flag({
        code: "RACE_GOLEM_STONE",
        sdesc: "stone golem",
        category: "construct"
    }),
    RACE_HAMMERER_AUTOMATON: new Flag({
        code: "RACE_HAMMERER_AUTOMATON",
        sdesc: "hammerer automaton",
        category: "construct"
    }),
    RACE_HELMED_HORROR: new Flag({
        code: "RACE_HELMED_HORROR",
        sdesc: "helmed horror",
        category: "construct"
    }),
    RACE_PULVERIZER_AUTOMATON: new Flag({
        code: "RACE_PULVERIZER_AUTOMATON",
        sdesc: "pulverizer automaton",
        category: "construct"
    }),
    RACE_RETRIEVER: new Flag({
        code: "RACE_RETRIEVER",
        sdesc: "retriever",
        category: "construct"
    }),
    RACE_DRAGON: new Flag({
        code: "RACE_DRAGON",
        sdesc: "dragon",
        category: "dragon"
    }),
    RACE_BLACK_DRAGON: new Flag({
        code: "RACE_BLACK_DRAGON",
        sdesc: "black dragon",
        category: "dragon"
    }),
    RACE_BLUE_DRAGON: new Flag({
        code: "RACE_BLUE_DRAGON",
        sdesc: "blue dragon",
        category: "dragon"
    }),
    RACE_BRASS_DRAGON: new Flag({
        code: "RACE_BRASS_DRAGON",
        sdesc: "brass dragon",
        category: "dragon"
    }),
    RACE_BRONZE_DRAGON: new Flag({
        code: "RACE_BRONZE_DRAGON",
        sdesc: "bronze dragon",
        category: "dragon"
    }),
    RACE_BROWN_DRAGON: new Flag({
        code: "RACE_BROWN_DRAGON",
        sdesc: "brown dragon",
        category: "dragon"
    }),
    RACE_COPPER_DRAGON: new Flag({
        code: "RACE_COPPER_DRAGON",
        sdesc: "copper dragon",
        category: "dragon"
    }),
    RACE_DEEP_DRAGON: new Flag({
        code: "RACE_DEEP_DRAGON",
        sdesc: "deep dragon",
        category: "dragon"
    }),
    RACE_FAERIE_DRAGON: new Flag({
        code: "RACE_FAERIE_DRAGON",
        sdesc: "faerie dragon",
        category: "dragon"
    }),
    RACE_GOLD_DRAGON: new Flag({
        code: "RACE_GOLD_DRAGON",
        sdesc: "gold dragon",
        category: "dragon"
    }),
    RACE_GREEN_DRAGON: new Flag({
        code: "RACE_GREEN_DRAGON",
        sdesc: "green dragon",
        category: "dragon"
    }),
    RACE_RED_DRAGON: new Flag({
        code: "RACE_RED_DRAGON",
        sdesc: "red dragon",
        category: "dragon"
    }),
    RACE_SILVER_DRAGON: new Flag({
        code: "RACE_SILVER_DRAGON",
        sdesc: "silver dragon",
        category: "dragon"
    }),
    RACE_WHITE_DRAGON: new Flag({
        code: "RACE_WHITE_DRAGON",
        sdesc: "white dragon",
        category: "dragon"
    }),
    RACE_WYVERN: new Flag({
        code: "RACE_WYVERN",
        sdesc: "wyvern",
        category: "dragon"
    }),
    RACE_AIRELEM: new Flag({
        code: "RACE_AIRELEM",
        sdesc: "air elemental",
        category: "elemental"
    }),
    RACE_FIRELEM: new Flag({
        code: "RACE_FIRELEM",
        sdesc: "fire elemental",
        category: "elemental"
    }),
    RACE_EARELEM: new Flag({
        code: "RACE_EARELEM",
        sdesc: "earth elemental",
        category: "elemental"
    }),
    RACE_ICE_ELEMENTAL: new Flag({
        code: "RACE_ICE_ELEMENTAL",
        sdesc: "ice elemental",
        category: "elemental"
    }),
    RACE_WATELEM: new Flag({
        code: "RACE_WATELEM",
        sdesc: "water elemental",
        category: "elemental"
    }),
    RACE_SPRITE: new Flag({
        code: "RACE_SPRITE",
        sdesc: "sprite",
        category: "fey"
    }),
    RACE_PIXIE: new Flag({
        code: "RACE_PIXIE",
        sdesc: "pixie",
        category: "fey"
    }),
    RACE_GIANT: new Flag({
        code: "RACE_GIANT",
        sdesc: "giant",
        category: "giant"
    }),
    RACE_GIANTCYCLOPS: new Flag({
        code: "RACE_GIANTCYCLOPS",
        sdesc: "cyclops",
        category: "giant"
    }),
    RACE_ETTIN: new Flag({
        code: "RACE_ETTIN",
        sdesc: "ettin",
        category: "giant"
    }),
    RACE_GIANT_HILL: new Flag({
        code: "RACE_GIANT_HILL",
        sdesc: "hill giant",
        category: "giant"
    }),
    RACE_GIANT_OCEAN: new Flag({
        code: "RACE_GIANT_OCEAN",
        sdesc: "ocean giant",
        category: "giant"
    }),
    RACE_OGRE: new Flag({
        code: "RACE_OGRE",
        sdesc: "ogre",
        category: "giant"
    }),
    RACE_DEEPIMASKARI: new Flag({
        code: "RACE_DEEPIMASKARI",
        sdesc: "deep imaskari",
        category: "humanoid"
    }),
    RACE_DWARF: new Flag({
        code: "RACE_DWARF",
        sdesc: "dwarf",
        category: "humanoid"
    }),
    RACE_DWARFARCTIC: new Flag({
        code: "RACE_DWARFARCTIC",
        sdesc: "arctic dwarf",
        category: "humanoid"
    }),
    RACE_DUERGAR: new Flag({
        code: "RACE_DUERGAR",
        sdesc: "duergar",
        category: "humanoid"
    }),
    RACE_DWARFGOLD: new Flag({
        code: "RACE_DWARFGOLD",
        sdesc: "gold dwarf",
        category: "humanoid"
    }),
    RACE_DWARFSHIELD: new Flag({
        code: "RACE_DWARFSHIELD",
        sdesc: "shield dwarf",
        category: "humanoid"
    }),
    RACE_DWARFURDUNNIR: new Flag({
        code: "RACE_DWARFURDUNNIR",
        sdesc: "urdunnir dwarf",
        category: "humanoid"
    }),
    RACE_DWARFWILD: new Flag({
        code: "RACE_DWARFWILD",
        sdesc: "wilf dwarf",
        category: "humanoid"
    }),
    RACE_ELF: new Flag({
        code: "RACE_ELF",
        sdesc: "elf",
        category: "humanoid"
    }),
    RACE_ELFAQUATIC: new Flag({
        code: "RACE_ELFAQUATIC",
        sdesc: "aquatic elf",
        category: "humanoid"
    }),
    RACE_ELFAVARIEL: new Flag({
        code: "RACE_ELFAVARIEL",
        sdesc: "avariel elf",
        category: "humanoid"
    }),
    RACE_DROW: new Flag({
        code: "RACE_DROW",
        sdesc: "drow",
        category: "humanoid"
    }),
    RACE_ELFMOON: new Flag({
        code: "RACE_ELFMOON",
        sdesc: "moon elf",
        category: "humanoid"
    }),
    RACE_ELFSUN: new Flag({
        code: "RACE_ELFSUN",
        sdesc: "sun elf",
        category: "humanoid"
    }),
    RACE_ELFWILD: new Flag({
        code: "RACE_ELFWILD",
        sdesc: "wild elf",
        category: "humanoid"
    }),
    RACE_ELFWOOD: new Flag({
        code: "RACE_ELFWOOD",
        sdesc: "wood elf",
        category: "humanoid"
    }),
    RACE_FISHMAN: new Flag({
        code: "RACE_FISHMAN",
        sdesc: "fishman",
        category: "humanoid"
    }),
    RACE_KUOTOA: new Flag({
        code: "RACE_KUOTOA",
        sdesc: "kuotoa",
        category: "humanoid"
    }),
    RACE_GIBBERLING: new Flag({
        code: "RACE_GIBBERLING",
        sdesc: "gibberling",
        category: "humanoid"
    }),
    RACE_GITH: new Flag({
        code: "RACE_GITH",
        sdesc: "gith",
        category: "humanoid"
    }),
    RACE_GITHZERAI: new Flag({
        code: "RACE_GITHZERAI",
        sdesc: "githzerai",
        category: "humanoid"
    }),
    RACE_GNOLL: new Flag({
        code: "RACE_GNOLL",
        sdesc: "gnoll",
        category: "humanoid"
    }),
    RACE_GNOME: new Flag({
        code: "RACE_GNOME",
        sdesc: "gnome",
        category: "humanoid"
    }),
    RACE_GNOMEDEEP: new Flag({
        code: "RACE_GNOMEDEEP",
        sdesc: "deep gnome",
        category: "humanoid"
    }),
    RACE_GNOMEFOREST: new Flag({
        code: "RACE_GNOMEFOREST",
        sdesc: "forest gnome",
        category: "humanoid"
    }),
    RACE_GNOMEROCK: new Flag({
        code: "RACE_GNOMEROCK",
        sdesc: "rock gnome",
        category: "humanoid"
    }),
    RACE_GOBLINOID: new Flag({
        code: "RACE_GOBLINOID",
        sdesc: "goblinoid",
        category: "humanoid"
    }),
    RACE_BUGBEAR: new Flag({
        code: "RACE_BUGBEAR",
        sdesc: "bugbear",
        category: "humanoid"
    }),
    RACE_GOBLIN: new Flag({
        code: "RACE_GOBLIN",
        sdesc: "goblin",
        category: "humanoid"
    }),
    RACE_HOBGOBLIN: new Flag({
        code: "RACE_HOBGOBLIN",
        sdesc: "hobgoblin",
        category: "humanoid"
    }),
    RACE_GREMLIN: new Flag({
        code: "RACE_GREMLIN",
        sdesc: "gremlin",
        category: "humanoid"
    }),
    RACE_HALFELF: new Flag({
        code: "RACE_HALFELF",
        sdesc: "halfelf",
        category: "humanoid"
    }),
    RACE_HALFELFAQUATIC: new Flag({
        code: "RACE_HALFELFAQUATIC",
        sdesc: "aquatic halfelf",
        category: "humanoid"
    }),
    RACE_HALFELFDROW: new Flag({
        code: "RACE_HALFELFDROW",
        sdesc: "halfdrow",
        category: "humanoid"
    }),
    RACE_HALFLING: new Flag({
        code: "RACE_HALFLING",
        sdesc: "halfling",
        category: "humanoid"
    }),
    RACE_HALFLINGGHOSTWISE: new Flag({
        code: "RACE_HALFLINGGHOSTWISE",
        sdesc: "ghostwise halfling",
        category: "humanoid"
    }),
    RACE_HALFLINGLIGHTFOOT: new Flag({
        code: "RACE_HALFLINGLIGHTFOOT",
        sdesc: "lightfoot halfling",
        category: "humanoid"
    }),
    RACE_HALFLINGSTRONGHEART: new Flag({
        code: "RACE_HALFLINGSTRONGHEART",
        sdesc: "strongheart halfling",
        category: "humanoid"
    }),
    RACE_HALFORC: new Flag({
        code: "RACE_HALFORC",
        sdesc: "halforc",
        category: "humanoid"
    }),
    RACE_HUMAN: new Flag({
        code: "RACE_HUMAN",
        sdesc: "human",
        category: "humanoid"
    }),
    RACE_SHAPESHIFTER: new Flag({
        code: "RACE_SHAPESHIFTER",
        sdesc: "shapeshifter",
        category: "humanoid"
    }),
    RACE_LYCANTHROPE: new Flag({
        code: "RACE_LYCANTHROPE",
        sdesc: "lycanthrope",
        category: "humanoid"
    }),
    RACE_LYCANTHROPE_WEREWOLF: new Flag({
        code: "RACE_LYCANTHROPE_WEREWOLF",
        sdesc: "werewolf",
        category: "humanoid"
    }),
    RACE_ORC: new Flag({
        code: "RACE_ORC",
        sdesc: "orc",
        category: "humanoid"
    }),
    RACE_ORCGRAY: new Flag({
        code: "RACE_ORCGRAY",
        sdesc: "gray orc",
        category: "humanoid"
    }),
    RACE_ORCMOUNTAIN: new Flag({
        code: "RACE_ORCMOUNTAIN",
        sdesc: "mountain orc",
        category: "humanoid"
    }),
    RACE_ORCOROG: new Flag({
        code: "RACE_ORCOROG",
        sdesc: "orog orc",
        category: "humanoid"
    }),
    RACE_REPTILIAN: new Flag({
        code: "RACE_REPTILIAN",
        sdesc: "reptilian",
        category: "humanoid"
    }),
    RACE_LIZARDMAN: new Flag({
        code: "RACE_LIZARDMAN",
        sdesc: "lizardman",
        category: "humanoid"
    }),
    RACE_KOBOLD: new Flag({
        code: "RACE_KOBOLD",
        sdesc: "kobold",
        category: "humanoid"
    }),
    RACE_TROGLODYTE: new Flag({
        code: "RACE_TROGLODYTE",
        sdesc: "troglodyte",
        category: "humanoid"
    }),
    RACE_TABAXI: new Flag({
        code: "RACE_TABAXI",
        sdesc: "tabaxi",
        category: "humanoid"
    }),
    RACE_TROLL: new Flag({
        code: "RACE_TROLL",
        sdesc: "troll",
        category: "humanoid"
    }),
    RACE_ANKHEG: new Flag({
        code: "RACE_ANKHEG",
        sdesc: "ankheg",
        category: "magical"
    }),
    RACE_ASPERI: new Flag({
        code: "RACE_ASPERI",
        sdesc: "asperi",
        category: "magical"
    }),
    RACE_BEHIR: new Flag({
        code: "RACE_BEHIR",
        sdesc: "behir",
        category: "magical"
    }),
    RACE_BULETTE: new Flag({
        code: "RACE_BULETTE",
        sdesc: "bulette",
        category: "magical"
    }),
    RACE_CHIMERA: new Flag({
        code: "RACE_CHIMERA",
        sdesc: "chimera",
        category: "magical"
    }),
    RACE_CHIMERA_BLACK: new Flag({
        code: "RACE_CHIMERA_BLACK",
        sdesc: "black chimera",
        category: "magical"
    }),
    RACE_CHIMERA_BLUE: new Flag({
        code: "RACE_CHIMERA_BLUE",
        sdesc: "blue chimera",
        category: "magical"
    }),
    RACE_CHIMERA_GREEN: new Flag({
        code: "RACE_CHIMERA_GREEN",
        sdesc: "green chimera",
        category: "magical"
    }),
    RACE_CHIMERA_RED: new Flag({
        code: "RACE_CHIMERA_RED",
        sdesc: "red chimera",
        category: "magical"
    }),
    RACE_CHIMERA_WHITE: new Flag({
        code: "RACE_CHIMERA_WHITE",
        sdesc: "white chimera",
        category: "magical"
    }),
    RACE_DISPLACER_BEAST: new Flag({
        code: "RACE_DISPLACER_BEAST",
        sdesc: "displacer beast",
        category: "magical"
    }),
    RACE_FROST_SALAMANDER: new Flag({
        code: "RACE_FROST_SALAMANDER",
        sdesc: "frost salamander",
        category: "magical"
    }),
    RACE_EAGLE_GIANT: new Flag({
        code: "RACE_EAGLE_GIANT",
        sdesc: "giant eagle",
        category: "magical"
    }),
    RACE_GIRALLON: new Flag({
        code: "RACE_GIRALLON",
        sdesc: "girallon",
        category: "magical"
    }),
    RACE_GRIFFON: new Flag({
        code: "RACE_GRIFFON",
        sdesc: "griffon",
        category: "magical"
    }),
    RACE_HIPPOGRIFF: new Flag({
        code: "RACE_HIPPOGRIFF",
        sdesc: "hippogriff",
        category: "magical"
    }),
    RACE_LAMIA: new Flag({
        code: "RACE_LAMIA",
        sdesc: "lamia",
        category: "magical"
    }),
    RACE_MANTICORE: new Flag({
        code: "RACE_MANTICORE",
        sdesc: "manticore",
        category: "magical"
    }),
    RACE_OWLBEAR: new Flag({
        code: "RACE_OWLBEAR",
        sdesc: "owlbear",
        category: "magical"
    }),
    RACE_PEGASUS: new Flag({
        code: "RACE_PEGASUS",
        sdesc: "pegasus",
        category: "magical"
    }),
    RACE_WORMPURPLE: new Flag({
        code: "RACE_WORMPURPLE",
        sdesc: "purple worm",
        category: "magical"
    }),
    RACE_REMORHAZ: new Flag({
        code: "RACE_REMORHAZ",
        sdesc: "remorhaz",
        category: "magical"
    }),
    RACE_BAT_DEEP_SINISTER: new Flag({
        code: "RACE_BAT_DEEP_SINISTER",
        sdesc: "sinister",
        category: "magical"
    }),
    RACE_SPHINX: new Flag({
        code: "RACE_SPHINX",
        sdesc: "sphinx",
        category: "magical"
    }),
    RACE_SPHINX_ANDRO: new Flag({
        code: "RACE_SPHINX_ANDRO",
        sdesc: "andro sphinx",
        category: "magical"
    }),
    RACE_STIRGE: new Flag({
        code: "RACE_STIRGE",
        sdesc: "stirge",
        category: "magical"
    }),
    RACE_SWARM: new Flag({
        code: "RACE_SWARM",
        sdesc: "swarm",
        category: "magical"
    }),
    RACE_SWARM_LOCUST: new Flag({
        code: "RACE_SWARM_LOCUST",
        sdesc: "locust swarm",
        category: "magical"
    }),
    RACE_SWARM_WASP: new Flag({
        code: "RACE_SWARM_WASP",
        sdesc: "wasp swarm",
        category: "magical"
    }),
    RACE_AARAKOCRA: new Flag({
        code: "RACE_AARAKOCRA",
        sdesc: "aarakocra",
        category: "monstrous"
    }),
    RACE_CENTAUR: new Flag({
        code: "RACE_CENTAUR",
        sdesc: "centaur",
        category: "monstrous"
    }),
    RACE_CHITINE: new Flag({
        code: "RACE_CHITINE",
        sdesc: "chitine",
        category: "monstrous"
    }),
    RACE_GARGOYLE: new Flag({
        code: "RACE_GARGOYLE",
        sdesc: "gargoyle",
        category: "monstrous"
    }),
    RACE_HARPY: new Flag({
        code: "RACE_HARPY",
        sdesc: "harpy",
        category: "monstrous"
    }),
    RACE_KIRLANAN: new Flag({
        code: "RACE_KIRLANAN",
        sdesc: "kirlanan",
        category: "monstrous"
    }),
    RACE_MINOTAUR: new Flag({
        code: "RACE_MINOTAUR",
        sdesc: "minotaur",
        category: "monstrous"
    }),
    RACE_QUAGGOTH: new Flag({
        code: "RACE_QUAGGOTH",
        sdesc: "quaggoth",
        category: "monstrous"
    }),
    RACE_SAHUAGIN: new Flag({
        code: "RACE_SAHUAGIN",
        sdesc: "sahuagin",
        category: "monstrous"
    }),
    RACE_SAHUAGIN_SAVAGE: new Flag({
        code: "RACE_SAHUAGIN_SAVAGE",
        sdesc: "savage sahuagin",
        category: "monstrous"
    }),
    RACE_THRIKREEN: new Flag({
        code: "RACE_THRIKREEN",
        sdesc: "thrikreen",
        category: "monstrous"
    }),
    RACE_WEMIC: new Flag({
        code: "RACE_WEMIC",
        sdesc: "wemic",
        category: "monstrous"
    }),
    RACE_YUANTI: new Flag({
        code: "RACE_YUANTI",
        sdesc: "yuanti",
        category: "monstrous"
    }),
    RACE_SLIME: new Flag({
        code: "RACE_SLIME",
        sdesc: "slime",
        category: "ooze"
    }),
    RACE_OOZE: new Flag({
        code: "RACE_OOZE",
        sdesc: "ooze",
        category: "ooze"
    }),
    RACE_GELATIN: new Flag({
        code: "RACE_GELATIN",
        sdesc: "gelatin",
        category: "ooze"
    }),
    RACE_OOZEGREY: new Flag({
        code: "RACE_OOZEGREY",
        sdesc: "grey ooze",
        category: "ooze"
    }),
    RACE_AASIMAR: new Flag({
        code: "RACE_AASIMAR",
        sdesc: "aasimar",
        category: "outsider"
    }),
    RACE_ACHAIERAI: new Flag({
        code: "RACE_ACHAIERAI",
        sdesc: "achaierai",
        category: "outsider"
    }),
    RACE_ANGEL: new Flag({
        code: "RACE_ANGEL",
        sdesc: "angel",
        category: "outsider"
    }),
    RACE_ANGEL_ASTRAL_DEVA: new Flag({
        code: "RACE_ANGEL_ASTRAL_DEVA",
        sdesc: "angel astral deva",
        category: "outsider"
    }),
    RACE_ARCHON: new Flag({
        code: "RACE_ARCHON",
        sdesc: "archon",
        category: "outsider"
    }),
    RACE_ARCHON_HOUND: new Flag({
        code: "RACE_ARCHON_HOUND",
        sdesc: "hound archon",
        category: "outsider"
    }),
    RACE_SWORD_ARCHON: new Flag({
        code: "RACE_SWORD_ARCHON",
        sdesc: "sword archon",
        category: "outsider"
    }),
    RACE_WARDEN_ARCHON: new Flag({
        code: "RACE_WARDEN_ARCHON",
        sdesc: "warden archon",
        category: "outsider"
    }),
    RACE_ARROWHAWK: new Flag({
        code: "RACE_ARROWHAWK",
        sdesc: "arrowhawk",
        category: "outsider"
    }),
    RACE_BARGHEST: new Flag({
        code: "RACE_BARGHEST",
        sdesc: "barghest",
        category: "outsider"
    }),
    RACE_COLCHILN: new Flag({
        code: "RACE_COLCHILN",
        sdesc: "colchiln",
        category: "outsider"
    }),
    RACE_DEMON: new Flag({
        code: "RACE_DEMON",
        sdesc: "demon",
        category: "outsider"
    }),
    RACE_BABAU: new Flag({
        code: "RACE_BABAU",
        sdesc: "babau",
        category: "outsider"
    }),
    RACE_BALOR: new Flag({
        code: "RACE_BALOR",
        sdesc: "balor",
        category: "outsider"
    }),
    RACE_BARLGURA: new Flag({
        code: "RACE_BARLGURA",
        sdesc: "bar-lgura",
        category: "outsider"
    }),
    RACE_BEBILITH: new Flag({
        code: "RACE_BEBILITH",
        sdesc: "bebilith",
        category: "outsider"
    }),
    RACE_CHASME: new Flag({
        code: "RACE_CHASME",
        sdesc: "chasme",
        category: "outsider"
    }),
    RACE_DRETCH: new Flag({
        code: "RACE_DRETCH",
        sdesc: "dretch",
        category: "outsider"
    }),
    RACE_GLABREZU: new Flag({
        code: "RACE_GLABREZU",
        sdesc: "glabrezu",
        category: "outsider"
    }),
    RACE_HEZROU: new Flag({
        code: "RACE_HEZROU",
        sdesc: "hezrou",
        category: "outsider"
    }),
    RACE_MANE: new Flag({
        code: "RACE_MANE",
        sdesc: "mane",
        category: "outsider"
    }),
    RACE_MARILITH: new Flag({
        code: "RACE_MARILITH",
        sdesc: "marilith",
        category: "outsider"
    }),
    RACE_NABASSU: new Flag({
        code: "RACE_NABASSU",
        sdesc: "nabassu",
        category: "outsider"
    }),
    RACE_NALFESHNEE: new Flag({
        code: "RACE_NALFESHNEE",
        sdesc: "nalfeshnee",
        category: "outsider"
    }),
    RACE_QUASIT: new Flag({
        code: "RACE_QUASIT",
        sdesc: "quasit",
        category: "outsider"
    }),
    RACE_RUTTERKIN: new Flag({
        code: "RACE_RUTTERKIN",
        sdesc: "rutterkin",
        category: "outsider"
    }),
    RACE_SHADOW_DEMON: new Flag({
        code: "RACE_SHADOW_DEMON",
        sdesc: "shadow demon",
        category: "outsider"
    }),
    RACE_SUCCUBUS: new Flag({
        code: "RACE_SUCCUBUS",
        sdesc: "succubus",
        category: "outsider"
    }),
    RACE_VROCK: new Flag({
        code: "RACE_VROCK",
        sdesc: "vrock",
        category: "outsider"
    }),
    RACE_DEVIL: new Flag({
        code: "RACE_DEVIL",
        sdesc: "devil",
        category: "outsider"
    }),
    RACE_ABISHAI: new Flag({
        code: "RACE_ABISHAI",
        sdesc: "abishai",
        category: "outsider"
    }),
    RACE_ABISHAI_BLACK: new Flag({
        code: "RACE_ABISHAI_BLACK",
        sdesc: "black abishai",
        category: "outsider"
    }),
    RACE_ABISHAI_BLUE: new Flag({
        code: "RACE_ABISHAI_BLUE",
        sdesc: "blue abishai",
        category: "outsider"
    }),
    RACE_ABISHAI_GREEN: new Flag({
        code: "RACE_ABISHAI_GREEN",
        sdesc: "green abishai",
        category: "outsider"
    }),
    RACE_ABISHAI_RED: new Flag({
        code: "RACE_ABISHAI_RED",
        sdesc: "red abishai",
        category: "outsider"
    }),
    RACE_ABISHAI_WHITE: new Flag({
        code: "RACE_ABISHAI_WHITE",
        sdesc: "white abishai",
        category: "outsider"
    }),
    RACE_GELUGON: new Flag({
        code: "RACE_GELUGON",
        sdesc: "gelugon",
        category: "outsider"
    }),
    RACE_HAMATULA: new Flag({
        code: "RACE_HAMATULA",
        sdesc: "hamatula",
        category: "outsider"
    }),
    RACE_IMP: new Flag({
        code: "RACE_IMP",
        sdesc: "imp",
        category: "outsider"
    }),
    RACE_PIT_FIEND: new Flag({
        code: "RACE_PIT_FIEND",
        sdesc: "pit fiend",
        category: "outsider"
    }),
    RACE_LEMURE: new Flag({
        code: "RACE_LEMURE",
        sdesc: "lemure",
        category: "outsider"
    }),
    RACE_NUPPERIBO: new Flag({
        code: "RACE_NUPPERIBO",
        sdesc: "nupperibo",
        category: "outsider"
    }),
    RACE_OSYLUTH: new Flag({
        code: "RACE_OSYLUTH",
        sdesc: "osyluth",
        category: "outsider"
    }),
    RACE_SPINAGON: new Flag({
        code: "RACE_SPINAGON",
        sdesc: "spinagon",
        category: "outsider"
    }),
    RACE_DRAEGLOTH: new Flag({
        code: "RACE_DRAEGLOTH",
        sdesc: "draegloth",
        category: "outsider"
    }),
    RACE_FORMIAN: new Flag({
        code: "RACE_FORMIAN",
        sdesc: "formian",
        category: "outsider"
    }),
    RACE_FORMIAN_WARRIOR: new Flag({
        code: "RACE_FORMIAN_WARRIOR",
        sdesc: "formian warrior",
        category: "outsider"
    }),
    RACE_FORMIAN_WORKER: new Flag({
        code: "RACE_FORMIAN_WORKER",
        sdesc: "formian worker",
        category: "outsider"
    }),
    RACE_GENASI: new Flag({
        code: "RACE_GENASI",
        sdesc: "genasi",
        category: "outsider"
    }),
    RACE_GENSAIAIR: new Flag({
        code: "RACE_GENSAIAIR",
        sdesc: "air genasi",
        category: "outsider"
    }),
    RACE_GENSAIEARTH: new Flag({
        code: "RACE_GENSAIEARTH",
        sdesc: "earth genasi",
        category: "outsider"
    }),
    RACE_GENSAIFIRE: new Flag({
        code: "RACE_GENSAIFIRE",
        sdesc: "fire genasi",
        category: "outsider"
    }),
    RACE_GENSAIWATER: new Flag({
        code: "RACE_GENSAIWATER",
        sdesc: "water genasi",
        category: "outsider"
    }),
    RACE_GENIE: new Flag({
        code: "RACE_GENIE",
        sdesc: "genie",
        category: "outsider"
    }),
    RACE_EFREETI: new Flag({
        code: "RACE_EFREETI",
        sdesc: "efreeti",
        category: "outsider"
    }),
    RACE_LILLEND: new Flag({
        code: "RACE_LILLEND",
        sdesc: "lillend",
        category: "outsider"
    }),
    RACE_MEPHIT: new Flag({
        code: "RACE_MEPHIT",
        sdesc: "mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_AIR: new Flag({
        code: "RACE_MEPHIT_AIR",
        sdesc: "air mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_DUST: new Flag({
        code: "RACE_MEPHIT_DUST",
        sdesc: "dust mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_EARTH: new Flag({
        code: "RACE_MEPHIT_EARTH",
        sdesc: "earth mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_FIRE: new Flag({
        code: "RACE_MEPHIT_FIRE",
        sdesc: "fire mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_ICE: new Flag({
        code: "RACE_MEPHIT_ICE",
        sdesc: "ice mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_MAGMA: new Flag({
        code: "RACE_MEPHIT_MAGMA",
        sdesc: "magma mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_OOZE: new Flag({
        code: "RACE_MEPHIT_OOZE",
        sdesc: "ooze mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_SALT: new Flag({
        code: "RACE_MEPHIT_SALT",
        sdesc: "salt mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_STEAM: new Flag({
        code: "RACE_MEPHIT_STEAM",
        sdesc: "steam mephit",
        category: "outsider"
    }),
    RACE_MEPHIT_WATER: new Flag({
        code: "RACE_MEPHIT_WATER",
        sdesc: "water mephit",
        category: "outsider"
    }),
    RACE_NIGHTMARE: new Flag({
        code: "RACE_NIGHTMARE",
        sdesc: "nightmare",
        category: "outsider"
    }),
    RACE_NIIATH: new Flag({
        code: "RACE_NIIATH",
        sdesc: "ni'iath",
        category: "outsider"
    }),
    RACE_RAKSHASA: new Flag({
        code: "RACE_RAKSHASA",
        sdesc: "rakshasa",
        category: "outsider"
    }),
    RACE_RAST: new Flag({
        code: "RACE_RAST",
        sdesc: "rast",
        category: "outsider"
    }),
    RACE_RAVID: new Flag({
        code: "RACE_RAVID",
        sdesc: "ravid",
        category: "outsider"
    }),
    RACE_SHADE: new Flag({
        code: "RACE_SHADE",
        sdesc: "shade",
        category: "outsider"
    }),
    RACE_SLAAD: new Flag({
        code: "RACE_SLAAD",
        sdesc: "slaad",
        category: "outsider"
    }),
    RACE_SLAADDEATH: new Flag({
        code: "RACE_SLAADDEATH",
        sdesc: "death slaad",
        category: "outsider"
    }),
    RACE_SLAADGREEN: new Flag({
        code: "RACE_SLAADGREEN",
        sdesc: "green slaad",
        category: "outsider"
    }),
    RACE_TIEFLING: new Flag({
        code: "RACE_TIEFLING",
        sdesc: "tiefling",
        category: "outsider"
    }),
    RACE_FEYRI: new Flag({
        code: "RACE_FEYRI",
        sdesc: "feyri",
        category: "outsider"
    }),
    RACE_TANARUKK: new Flag({
        code: "RACE_TANARUKK",
        sdesc: "tanarukk",
        category: "outsider"
    }),
    RACE_TITAN: new Flag({
        code: "RACE_TITAN",
        sdesc: "titan",
        category: "outsider"
    }),
    RACE_TOJANIDA: new Flag({
        code: "RACE_TOJANIDA",
        sdesc: "tojanida",
        category: "outsider"
    }),
    RACE_XORN: new Flag({
        code: "RACE_XORN",
        sdesc: "xorn",
        category: "outsider"
    }),
    RACE_GREENWARDER: new Flag({
        code: "RACE_GREENWARDER",
        sdesc: "green warder",
        category: "plant"
    }),
    RACE_MYCONOID: new Flag({
        code: "RACE_MYCONOID",
        sdesc: "myconoid",
        category: "plant"
    }),
    RACE_MYCONOID_SOVEREIGN: new Flag({
        code: "RACE_MYCONOID_SOVEREIGN",
        sdesc: "myconoid sovereign",
        category: "plant"
    }),
    RACE_MYCONOID_LEADER: new Flag({
        code: "RACE_MYCONOID_LEADER",
        sdesc: "myconoid leader",
        category: "plant"
    }),
    RACE_MYCONOID_GUARD: new Flag({
        code: "RACE_MYCONOID_GUARD",
        sdesc: "myconoid guard",
        category: "plant"
    }),
    RACE_MYCONOID_WORKER: new Flag({
        code: "RACE_MYCONOID_WORKER",
        sdesc: "myconoid worker",
        category: "plant"
    }),
    RACE_PLANT: new Flag({
        code: "RACE_PLANT",
        sdesc: "plant",
        category: "plant"
    }),
    RACE_BLOODTHORN: new Flag({
        code: "RACE_BLOODTHORN",
        sdesc: "bloodthorn",
        category: "plant"
    }),
    RACE_SHRIEKER: new Flag({
        code: "RACE_SHRIEKER",
        sdesc: "shrieker",
        category: "plant"
    }),
    RACE_TREANT: new Flag({
        code: "RACE_TREANT",
        sdesc: "treant",
        category: "plant"
    }),
    RACE_VIPER_TREE: new Flag({
        code: "RACE_VIPER_TREE",
        sdesc: "viper tree",
        category: "plant"
    }),
    RACE_CORPOREAL: new Flag({
        code: "RACE_CORPOREAL",
        sdesc: "corporeal",
        category: "undead"
    }),
    RACE_BAT_DEEP_BONEBAT: new Flag({
        code: "RACE_BAT_DEEP_BONEBAT",
        sdesc: "bonebat",
        category: "undead"
    }),
    RACE_GHOUL: new Flag({
        code: "RACE_GHOUL",
        sdesc: "ghoul",
        category: "undead"
    }),
    RACE_GHAST: new Flag({
        code: "RACE_GHAST",
        sdesc: "ghast",
        category: "undead"
    }),
    RACE_LACEDON: new Flag({
        code: "RACE_LACEDON",
        sdesc: "lacedon",
        category: "undead"
    }),
    RACE_LICH: new Flag({
        code: "RACE_LICH",
        sdesc: "lich",
        category: "undead"
    }),
    RACE_MUMMY: new Flag({
        code: "RACE_MUMMY",
        sdesc: "mummy",
        category: "undead"
    }),
    RACE_SKELETON: new Flag({
        code: "RACE_SKELETON",
        sdesc: "skeleton",
        category: "undead"
    }),
    RACE_UNDEAD: new Flag({
        code: "RACE_UNDEAD",
        sdesc: "undead",
        category: "undead"
    }),
    RACE_VAMPIRE: new Flag({
        code: "RACE_VAMPIRE",
        sdesc: "vampire",
        category: "undead"
    }),
    RACE_WIGHT: new Flag({
        code: "RACE_WIGHT",
        sdesc: "wight",
        category: "undead"
    }),
    RACE_ZOMBIE: new Flag({
        code: "RACE_ZOMBIE",
        sdesc: "zombie",
        category: "undead"
    }),
    RACE_INCORPOREAL: new Flag({
        code: "RACE_INCORPOREAL",
        sdesc: "incorporeal",
        category: "undead"
    }),
    RACE_GHOST: new Flag({
        code: "RACE_GHOST",
        sdesc: "ghost",
        category: "undead"
    }),
    RACE_SPIRIT: new Flag({
        code: "RACE_SPIRIT",
        sdesc: "spirit",
        category: "undead"
    }),
    RACE_WRAITH: new Flag({
        code: "RACE_WRAITH",
        sdesc: "wraith",
        category: "undead"
    }),
    RACE_BEETLE: new Flag({
        code: "RACE_BEETLE",
        sdesc: "beetle",
        category: "vermin"
    }),
    RACE_BEETLE_BOMBARDIER: new Flag({
        code: "RACE_BEETLE_BOMBARDIER",
        sdesc: "bombardier beetle",
        category: "vermin"
    }),
    RACE_BEETLE_GIANT_FIRE: new Flag({
        code: "RACE_BEETLE_GIANT_FIRE",
        sdesc: "giant fire beetle",
        category: "vermin"
    }),
    RACE_BEETLE_GIANT_STAG: new Flag({
        code: "RACE_BEETLE_GIANT_STAG",
        sdesc: "giant stag beetle",
        category: "vermin"
    }),
    RACE_BEETLE_GIANT_WATER: new Flag({
        code: "RACE_BEETLE_GIANT_WATER",
        sdesc: "giant water beetle",
        category: "vermin"
    }),
    RACE_CAVE_FISHER: new Flag({
        code: "RACE_CAVE_FISHER",
        sdesc: "cave fisher",
        category: "vermin"
    }),
    RACE_ANT_GIANT: new Flag({
        code: "RACE_ANT_GIANT",
        sdesc: "giant ant",
        category: "vermin"
    }),
    RACE_ANT_GIANT_WORKER: new Flag({
        code: "RACE_ANT_GIANT_WORKER",
        sdesc: "giant worker ant",
        category: "vermin"
    }),
    RACE_ANT_GIANT_SOLDIER: new Flag({
        code: "RACE_ANT_GIANT_SOLDIER",
        sdesc: "giant soldier ant",
        category: "vermin"
    }),
    RACE_ANT_GIANT_QUEEN: new Flag({
        code: "RACE_ANT_GIANT_QUEEN",
        sdesc: "giant queen ant",
        category: "vermin"
    }),
    RACE_BEE_GIANT: new Flag({
        code: "RACE_BEE_GIANT",
        sdesc: "giant bee",
        category: "vermin"
    }),
    RACE_GIANTCOACKROACH: new Flag({
        code: "RACE_GIANTCOACKROACH",
        sdesc: "giant coackroach",
        category: "vermin"
    }),
    RACE_WASP_GIANT: new Flag({
        code: "RACE_WASP_GIANT",
        sdesc: "giant wasp",
        category: "vermin"
    }),
    RACE_INSECT: new Flag({
        code: "RACE_INSECT",
        sdesc: "insect",
        category: "vermin"
    }),
    RACE_CENTIPEDE_MONSTROUS: new Flag({
        code: "RACE_CENTIPEDE_MONSTROUS",
        sdesc: "monstrous centipede",
        category: "vermin"
    }),
    RACE_SCORPION: new Flag({
        code: "RACE_SCORPION",
        sdesc: "monstrous scorpion",
        category: "vermin"
    }),
    RACE_SPIDER: new Flag({
        code: "RACE_SPIDER",
        sdesc: "spider",
        category: "vermin"
    })
};
const MOB_SEXES = {
    SEX_MALE: new Flag({
        code: "SEX_MALE",
        sdesc: "SEX_MALE"
    }),
    SEX_FEMALE: new Flag({
        code: "SEX_FEMALE",
        sdesc: "SEX_FEMALE"
    }),
    SEX_NEUTRAL: new Flag({
        code: "SEX_NEUTRAL",
        sdesc: "SEX_NEUTRAL"
    })
};
const MOB_POSITIONS = {
    POS_DEAD: new Flag({
        code: "POS_DEAD",
        sdesc: "POS_DEAD"
    }),
    POS_MORTAL: new Flag({
        code: "POS_MORTAL",
        sdesc: "POS_MORTAL"
    }),
    POS_INCAP: new Flag({
        code: "POS_INCAP",
        sdesc: "POS_INCAP"
    }),
    POS_STUNNED: new Flag({
        code: "POS_STUNNED",
        sdesc: "POS_STUNNED"
    }),
    POS_SLEEPING: new Flag({
        code: "POS_SLEEPING",
        sdesc: "POS_SLEEPING"
    }),
    POS_MEDITATING: new Flag({
        code: "POS_MEDITATING",
        sdesc: "POS_MEDITATING"
    }),
    POS_RESTING: new Flag({
        code: "POS_RESTING",
        sdesc: "POS_RESTING"
    }),
    POS_KNEELING: new Flag({
        code: "POS_KNEELING",
        sdesc: "POS_KNEELING"
    }),
    POS_FIGHTING: new Flag({
        code: "POS_FIGHTING",
        sdesc: "POS_FIGHTING"
    }),
    POS_STANDING: new Flag({
        code: "POS_STANDING",
        sdesc: "POS_STANDING"
    }),
    POS_MOUNTED: new Flag({
        code: "POS_MOUNTED",
        sdesc: "POS_MOUNTED"
    }),
    POS_SHOVE: new Flag({
        code: "POS_SHOVE",
        sdesc: "POS_SHOVE"
    }),
    POS_DRAG: new Flag({
        code: "POS_DRAG",
        sdesc: "POS_DRAG"
    })
};
const MOB_DEITIES = {
    DEITY_NONE: new Flag({
        code: "DEITY_NONE",
        sdesc: "DEITY_NONE"
    }),
    DEITY_CHAUNTEA: new Flag({
        code: "DEITY_CHAUNTEA",
        sdesc: "DEITY_CHAUNTEA"
    }),
    DEITY_TYR: new Flag({
        code: "DEITY_TYR",
        sdesc: "DEITY_TYR"
    }),
    DEITY_MYSTRA: new Flag({
        code: "DEITY_MYSTRA",
        sdesc: "DEITY_MYSTRA"
    }),
    DEITY_ILMATER: new Flag({
        code: "DEITY_ILMATER",
        sdesc: "DEITY_ILMATER"
    }),
    DEITY_MASK: new Flag({
        code: "DEITY_MASK",
        sdesc: "DEITY_MASK"
    }),
    DEITY_KELEMVOR: new Flag({
        code: "DEITY_KELEMVOR",
        sdesc: "DEITY_KELEMVOR"
    }),
    DEITY_SUNE: new Flag({
        code: "DEITY_SUNE",
        sdesc: "DEITY_SUNE"
    }),
    DEITY_MIELIKKI: new Flag({
        code: "DEITY_MIELIKKI",
        sdesc: "DEITY_MIELIKKI"
    }),
    DEITY_TEMPUS: new Flag({
        code: "DEITY_TEMPUS",
        sdesc: "DEITY_TEMPUS"
    }),
    DEITY_CYRIC: new Flag({
        code: "DEITY_CYRIC",
        sdesc: "DEITY_CYRIC"
    }),
    DEITY_LATHANDER: new Flag({
        code: "DEITY_LATHANDER",
        sdesc: "DEITY_LATHANDER"
    }),
    DEITY_MALAR: new Flag({
        code: "DEITY_MALAR",
        sdesc: "DEITY_MALAR"
    }),
    DEITY_GOND: new Flag({
        code: "DEITY_GOND",
        sdesc: "DEITY_GOND"
    }),
    DEITY_SELUNE: new Flag({
        code: "DEITY_SELUNE",
        sdesc: "DEITY_SELUNE"
    }),
    DEITY_TYMORA: new Flag({
        code: "DEITY_TYMORA",
        sdesc: "DEITY_TYMORA"
    }),
    DEITY_LOVIATAR: new Flag({
        code: "DEITY_LOVIATAR",
        sdesc: "DEITY_LOVIATAR"
    }),
    DEITY_HELM: new Flag({
        code: "DEITY_HELM",
        sdesc: "DEITY_HELM"
    }),
    DEITY_TALOS: new Flag({
        code: "DEITY_TALOS",
        sdesc: "DEITY_TALOS"
    }),
    DEITY_BESHABA: new Flag({
        code: "DEITY_BESHABA",
        sdesc: "DEITY_BESHABA"
    }),
    DEITY_OGHMA: new Flag({
        code: "DEITY_OGHMA",
        sdesc: "DEITY_OGHMA"
    }),
    DEITY_LLOTH: new Flag({
        code: "DEITY_LLOTH",
        sdesc: "DEITY_LLOTH"
    }),
    DEITY_CORELLON: new Flag({
        code: "DEITY_CORELLON",
        sdesc: "DEITY_CORELLON"
    }),
    DEITY_MORADIN: new Flag({
        code: "DEITY_MORADIN",
        sdesc: "DEITY_MORADIN"
    }),
    DEITY_GRUUMSH: new Flag({
        code: "DEITY_GRUUMSH",
        sdesc: "DEITY_GRUUMSH"
    }),
    DEITY_TORM: new Flag({
        code: "DEITY_TORM",
        sdesc: "DEITY_TORM"
    }),
    DEITY_YONDALLA: new Flag({
        code: "DEITY_YONDALLA",
        sdesc: "DEITY_YONDALLA"
    }),
    DEITY_GARL: new Flag({
        code: "DEITY_GARL",
        sdesc: "DEITY_GARL"
    }),
    DEITY_SHAR: new Flag({
        code: "DEITY_SHAR",
        sdesc: "DEITY_SHAR"
    }),
    DEITY_UMBERLEE: new Flag({
        code: "DEITY_UMBERLEE",
        sdesc: "DEITY_UMBERLEE"
    }),
    DEITY_WAUKEEN: new Flag({
        code: "DEITY_WAUKEEN",
        sdesc: "DEITY_WAUKEEN"
    }),
    DEITY_BANE: new Flag({
        code: "DEITY_BANE",
        sdesc: "DEITY_BANE"
    }),
    DEITY_TALONA: new Flag({
        code: "DEITY_TALONA",
        sdesc: "DEITY_TALONA"
    }),

};
const MOB_ACT_FLAGS = {
    ACT_SENTINEL: new Flag({
        code: "ACT_SENTINEL",
        sdesc: "ACT_SENTINEL",
        ldesc: "The mobile stays in one room"
    }),
    ACT_SCAVENGER: new Flag({
        code: "ACT_SCAVENGER",
        sdesc: "ACT_SCAVENGER",
        ldesc: "The mobile picks up objects on the ground"
    }),
    ACT_IS_HEALER: new Flag({
        code: "ACT_IS_HEALER",
        sdesc: "ACT_IS_HEALER",
        ldesc: "Mobile is a healer using the 'heal' command"
    }),
    ACT_AGGRESSIVE: new Flag({
        code: "ACT_AGGRESSIVE",
        sdesc: "ACT_AGGRESSIVE",
        ldesc: "The mobile attacks PC's when they enter the room the mob is in"
    }),
    ACT_STAY_AREA: new Flag({
        code: "ACT_STAY_AREA",
        sdesc: "ACT_STAY_AREA",
        ldesc: "The mobile will not leave the area it has been loaded into. If this is not set the mobile can wander into other areas unless stopped by a nomob flag on a room or an exit."
    }),
    ACT_WIMPY: new Flag({
        code: "ACT_WIMPY",
        sdesc: "ACT_WIMPY",
        ldesc: "The mobile flees when hurt. Many pets and mounts will be flagged with this, unless they are bred for war. In addition mobiles with this flag, will submit to the demand command."
    }),
    ACT_PET: new Flag({
        code: "ACT_PET",
        sdesc: "ACT_PET",
        ldesc: "For mobiles that are to be pets and animals that can be claimed. Do not use on horses or anything that should be considered a mount."
    }),
    ACT_UNDEAD: new Flag({
        code: "ACT_UNDEAD",
        sdesc: "ACT_UNDEAD",
        ldesc: "For undead mobiles. Make sure to use this on undead mobs as it is used by the favour system."
    }),
    ACT_NOSHOVE: new Flag({
        code: "ACT_NOSHOVE",
        sdesc: "ACT_NOSHOVE",
        ldesc: "Mobile cannot be shoved. This is important for mobiles who should always be found in a certain spot."
    }),
    ACT_NOFIGHT: new Flag({
        code: "ACT_NOFIGHT",
        sdesc: "ACT_NOFIGHT",
        ldesc: "Mobile will not fight back. Part of the killmode code."
    }),
    ACT_BANK: new Flag({
        code: "ACT_BANK",
        sdesc: "ACT_BANK",
        ldesc: "Mobile is a banker"
    }),
    ACT_NOWANDER: new Flag({
        code: "ACT_NOWANDER",
        sdesc: "ACT_NOWANDER",
        ldesc: "Doesn't wander outside the sector type it is loaded in"
    }),
    ACT_MOUNTABLE: new Flag({
        code: "ACT_MOUNTABLE",
        sdesc: "ACT_MOUNTABLE",
        ldesc: "The mobile can be mounted."
    }),
    ACT_SECRETIVE: new Flag({
        code: "ACT_SECRETIVE",
        sdesc: "ACT_SECRETIVE",
        ldesc: "The mobile's actions are not seen."
    }),
    ACT_CITIZEN: new Flag({
        code: "ACT_CITIZEN",
        sdesc: "ACT_CITIZEN",
        ldesc: "Mobile is a citizen and affects a character's lawful status if killed. This is also used in the games justice system."
    }),
    ACT_MOBINVIS: new Flag({
        code: "ACT_MOBINVIS",
        sdesc: "ACT_MOBINVIS",
        ldesc: "Mobile's cannot be seen by mortals even with detect invis. It is like an immortals wizinvis. Can only be seen by immortals."
    }),
    ACT_NOASSIST: new Flag({
        code: "ACT_NOASSIST",
        sdesc: "ACT_NOASSIST",
        ldesc: "Does not assist other mobiles or characters in battle."
    }),
    ACT_REQUEST: new Flag({
        code: "ACT_REQUEST",
        sdesc: "ACT_REQUEST",
        ldesc: "The armour that the mobile wears can be requested by good aligned with the request command. Do not use on shop-keepers."
    }),
    ACT_NOCORPSE: new Flag({
        code: "ACT_NOCORPSE",
        sdesc: "ACT_NOCORPSE",
        ldesc: "The mobile drops no corpse on death. Ideal for dummies."
    })

};
const MOB_AFFECTS = {
    AFF_BLIND: new Flag({
        code: "AFF_BLIND",
        sdesc: "AFF_BLIND",
        ldesc: "Mobile is affected by blindness"
    }),
    AFF_INVIS: new Flag({
        code: "AFF_INVIS",
        sdesc: "AFF_INVIS",
        ldesc: "Mobile is invisible"
    }),
    AFF_DETECT_EVIL: new Flag({
        code: "AFF_DETECT_EVIL",
        sdesc: "AFF_DETECT_EVIL",
        ldesc: "Mobile can detect evil"
    }),
    AFF_DETECT_INVIS: new Flag({
        code: "AFF_DETECT_INVIS",
        sdesc: "AFF_DETECT_INVIS",
        ldesc: "Mobile can detect magic"
    }),
    AFF_DETECT_MAGIC: new Flag({
        code: "AFF_DETECT_MAGIC",
        sdesc: "AFF_DETECT_MAGIC",
        ldesc: "Mobile can detect magic"
    }),
    AFF_DETECT_HIDDEN: new Flag({
        code: "AFF_DETECT_HIDDEN",
        sdesc: "AFF_DETECT_HIDDEN",
        ldesc: "Mobile can detect hidden creatures"
    }),
    AFF_DETECT_BURIED: new Flag({
        code: "AFF_DETECT_BURIED",
        sdesc: "AFF_DETECT_BURIED",
        ldesc: "Mobile can detect buried"
    }),
    AFF_SANCTUARY: new Flag({
        code: "AFF_SANCTUARY",
        sdesc: "AFF_SANCTUARY",
        ldesc: "Mobile is protected by sanctuary"
    }),
    AFF_FAERIE_FIRE: new Flag({
        code: "AFF_FAERIE_FIRE",
        sdesc: "AFF_FAERIE_FIRE",
        ldesc: "Mobile is affected by faerie fire"
    }),
    AFF_INFRARED: new Flag({
        code: "AFF_INFRARED",
        sdesc: "AFF_INFRARED",
        ldesc: "Mobile has infravision"
    }),
    AFF_CURSE: new Flag({
        code: "AFF_CURSE",
        sdesc: "AFF_CURSE",
        ldesc: "Mobile is cursed"
    }),
    AFF_POISON: new Flag({
        code: "AFF_POISON",
        sdesc: "AFF_POISON",
        ldesc: "Mobile is poisoned"
    }),
    AFF_PROTECT: new Flag({
        code: "AFF_PROTECT",
        sdesc: "AFF_PROTECT",
        ldesc: "Mobile is protected by protection"
    }),
    AFF_PARALYSIS: new Flag({
        code: "AFF_PARALYSIS",
        sdesc: "AFF_PARALYSIS",
        ldesc: "Mobile is paralyzed"
    }),
    AFF_SNEAK: new Flag({
        code: "AFF_SNEAK",
        sdesc: "AFF_SNEAK",
        ldesc: "Mobile is sneaking"
    }),
    AFF_HIDE: new Flag({
        code: "AFF_HIDE",
        sdesc: "AFF_HIDE",
        ldesc: "Mobile is hiding"
    }),
    AFF_SLEEP: new Flag({
        code: "AFF_SLEEP",
        sdesc: "AFF_SLEEP",
        ldesc: "Mobile is affected by sleep spell"
    }),
    AFF_CHARM: new Flag({
        code: "AFF_CHARM",
        sdesc: "AFF_CHARM",
        ldesc: "Mobile is charmed"
    }),
    AFF_FLYING: new Flag({
        code: "AFF_FLYING",
        sdesc: "AFF_FLYING",
        ldesc: "Mobile is is flying"
    }),
    AFF_PASS_DOOR: new Flag({
        code: "AFF_PASS_DOOR",
        sdesc: "AFF_PASS_DOOR",
        ldesc: "Mobile can pass door"
    }),
    AFF_FLOATING: new Flag({
        code: "AFF_FLOATING",
        sdesc: "AFF_FLOATING",
        ldesc: "Mobile is floating"
    }),
    AFF_TRUE_SIGHT: new Flag({
        code: "AFF_TRUE_SIGHT",
        sdesc: "AFF_TRUE_SIGHT",
        ldesc: "Mobile is affected by truesight"
    }),
    AFF_FIRESHIELD: new Flag({
        code: "AFF_FIRESHIELD",
        sdesc: "AFF_FIRESHIELD",
        ldesc: "Mobile is affected by fireshield"
    }),
    AFF_SHOCKSHIELD: new Flag({
        code: "AFF_SHOCKSHIELD",
        sdesc: "AFF_SHOCKSHIELD",
        ldesc: "Mobile is affected by shockshield"
    }),
    AFF_ICESHIELD: new Flag({
        code: "AFF_ICESHIELD",
        sdesc: "AFF_ICESHIELD",
        ldesc: "Mobile is affected by iceshield"
    }),
    AFF_BERSERK: new Flag({
        code: "AFF_BERSERK",
        sdesc: "AFF_BERSERK",
        ldesc: "Mobile is berserk when fighting"
    }),
    AFF_WATER_BREATHING: new Flag({
        code: "AFF_WATER_BREATHING",
        sdesc: "AFF_WATER_BREATHING",
        ldesc: "Mobile is affected by water breathing"
    }),
    AFF_GUARDIAN: new Flag({
        code: "AFF_GUARDIAN",
        sdesc: "AFF_GUARDIAN",
        ldesc: "Mobile wakes you if someone walks in while you sleep"
    }),
    AFF_NONE: new Flag({
        code: "AFF_NONE",
        sdesc: "AFF_NONE",
        ldesc: "Mobile has no affects"
    })
};
const MOB_ALIGNMENTS = {
    ALIGN_LAWFUL_GOOD: new Flag({
        code: "ALIGN_LAWFUL_GOOD",
        sdesc: "Lawful Good"
    }),
    ALIGN_NEUTRAL_GOOD: new Flag({
        code: "ALIGN_NEUTRAL_GOOD",
        sdesc: "Neutral Good"
    }),
    ALIGN_CHAOTIC_GOOD: new Flag({
        code: "ALIGN_CHAOTIC_GOOD",
        sdesc: "Chaotic Good"
    }),
    ALIGN_LAWFUL_NEUTRAL: new Flag({
        code: "ALIGN_LAWFUL_NEUTRAL",
        sdesc: "Lawful Neutral"
    }),
    ALIGN_TRUE_NEUTRAL: new Flag({
        code: "ALIGN_TRUE_NEUTRAL",
        sdesc: "True Neutral"
    }),
    ALIGN_CHAOTIC_NEUTRAL: new Flag({
        code: "ALIGN_CHAOTIC_NEUTRAL",
        sdesc: "Chaotic Neutral"
    }),
    ALIGN_LAWFUL_EVIL: new Flag({
        code: "ALIGN_LAWFUL_EVIL",
        sdesc: "Lawful Evil"
    }),
    ALIGN_NEUTRAL_EVIL: new Flag({
        code: "ALIGN_NEUTRAL_EVIL",
        sdesc: "Neutral Evil"
    }),
    ALIGN_CHAOTIC_EVIL: new Flag({
        code: "ALIGN_CHAOTIC_EVIL",
        sdesc: "Chaotic Evil"
    })
};
const MOB_RIS = {
    RIS_FIRE: new Flag({
        code: "RIS_FIRE",
        sdesc: "RIS_FIRE",
        ldesc: "Spells that are firebased, such as fireball burning hands etc"
    }),
    RIS_COLD: new Flag({
        code: "RIS_COLD",
        sdesc: "RIS_COLD",
        ldesc: "Spells that are cold based, such as chill touch etc"
    }),
    RIS_ELECTRICITY: new Flag({
        code: "RIS_ELECTRICITY",
        sdesc: "RIS_ELECTRICITY",
        ldesc: "Spells that are electricity based, such as call lightning etc"
    }),
    RIS_ENERGY: new Flag({
        code: "RIS_ENERGY",
        sdesc: "RIS_ENERGY",
        ldesc: "Spells that are energy based, such as disintergrate etc."
    }),
    RIS_BLUNT: new Flag({
        code: "RIS_BLUNT",
        sdesc: "RIS_BLUNT",
        ldesc: "Resistant or suseptible to blunt weapons, such as maces etc."
    }),
    RIS_PIERCE: new Flag({
        code: "RIS_PIERCE",
        sdesc: "RIS_PIERCE",
        ldesc: "Resistant or suseptible to piercing weapons, such as daggers etc"
    }),
    RIS_SLASH: new Flag({
        code: "RIS_SLASH",
        sdesc: "RIS_SLASH",
        ldesc: "Resistant or suseptible to slashing weapons, such as swords etc"
    }),
    RIS_ACID: new Flag({
        code: "RIS_ACID",
        sdesc: "RIS_ACID",
        ldesc: "Spells that are acid based such as, acid blast etc."
    }),
    RIS_POISON: new Flag({
        code: "RIS_POISON",
        sdesc: "RIS_POISON",
        ldesc: "Resistant or suseptible to poison, including potions, poisoned foods and drinks, poisoned weapons and poison based spells"
    }),
    RIS_DRAIN: new Flag({
        code: "RIS_DRAIN",
        sdesc: "RIS_DRAIN",
        ldesc: "Spells that a are necromantic based, such as vampiric touch etc."
    }),
    RIS_SLEEP: new Flag({
        code: "RIS_SLEEP",
        sdesc: "RIS_SLEEP",
        ldesc: "Spells that are sleep based, such as the sleep spell etc."
    }),
    RIS_CHARM: new Flag({
        code: "RIS_CHARM",
        sdesc: "RIS_CHARM",
        ldesc: "Spells and skills that are charm based, such as charm person, charm spell, influence etc."
    }),
    RIS_HOLD: new Flag({
        code: "RIS_HOLD",
        sdesc: "RIS_HOLD",
        ldesc: "Spells that are hold based, such as hold, web, paralysis"
    }),
    RIS_NONMAGIC: new Flag({
        code: "RIS_NONMAGIC",
        sdesc: "RIS_NONMAGIC",
        ldesc: "Resistant or suseptible to non magical weapons"
    }),
    RIS_SUMMON: new Flag({
        code: "RIS_SUMMON",
        sdesc: "RIS_SUMMON",
        ldesc: "Resistant or suseptible to being summoned"
    }),
    RIS_HOLY: new Flag({
        code: "RIS_HOLY",
        sdesc: "RIS_HOLY",
        ldesc: "Resistant or suseptible to healing based spells."
    }),
    RIS_MENTAL: new Flag({
        code: "RIS_MENTAL",
        sdesc: "RIS_MENTAL",
        ldesc: "Resistant or suseptible to mental based spells, revive, mind wrench etc"
    }),
    RIS_DROWNING: new Flag({
        code: "RIS_DROWNING",
        sdesc: "RIS_DROWNING",
        ldesc: "Resistant or suseptible to physical attacks like earthquake, drowning"
    }),
    RIS_LIGHT: new Flag({
        code: "RIS_LIGHT",
        sdesc: "RIS_LIGHT",
        ldesc: "Resistant or suseptible to light based spells such as sunray etc"
    }),
    RIS_SOUND: new Flag({
        code: "RIS_SOUND",
        sdesc: "RIS_SOUND",
        ldesc: "Resistant or suseptible to sound based spells such as, sonic resonance etc"
    }),
    RIS_MAGIC: new Flag({
        code: "RIS_MAGIC",
        sdesc: "RIS_MAGIC",
        ldesc: "Resistant or suseptible to magical weapons"
    }),
    RIS_WOOD: new Flag({
        code: "RIS_WOOD",
        sdesc: "RIS_WOOD",
        ldesc: "Resistant or suseptible to non magical weapons made of wood."
    }),
    RIS_SILVER: new Flag({
        code: "RIS_SILVER",
        sdesc: "RIS_SILVER",
        ldesc: "Resistant or suseptible to non magical weapons made of silver"
    }),
    RIS_IRON: new Flag({
        code: "RIS_IRON",
        sdesc: "RIS_IRON",
        ldesc: "Resistant or suseptible to non magical weapons made of iron"
    }),
    RIS_NONE: new Flag({
        code: "RIS_NONE",
        sdesc: "RIS_NONE",
        ldesc: "No resistance/immunity/susceptibility"
    })
};
const MOB_SPELLS = {
    "acid arrow": {
        code: "acid arrow",
        sdesc: "acid arrow",
        do_not_use: false
    },
    "acid blast": {
        code: "acid blast",
        sdesc: "acid blast",
        do_not_use: false
    },
    "acid breath": {
        code: "acid breath",
        sdesc: "acid breath",
        do_not_use: false
    },
    "alertness": {
        code: "alertness",
        sdesc: "alertness",
        do_not_use: false
    },
    "animate dead": {
        code: "animate dead",
        sdesc: "animate dead",
        do_not_use: false
    },
    "animate object": {
        code: "animate object",
        sdesc: "animate object",
        do_not_use: false
    },
    "antimagic shell": {
        code: "antimagic shell",
        sdesc: "antimagic shell",
        do_not_use: false
    },
    "armor": {
        code: "armor",
        sdesc: "armor",
        do_not_use: false
    },
    "astral walk": {
        code: "astral walk",
        sdesc: "astral walk",
        do_not_use: false
    },
    "barkskin": {
        code: "barkskin",
        sdesc: "barkskin",
        do_not_use: false
    },
    "blazebane": {
        code: "blazebane",
        sdesc: "blazebane",
        do_not_use: false
    },
    "bless": {
        code: "bless",
        sdesc: "bless",
        do_not_use: false
    },
    "blindness": {
        code: "blindness",
        sdesc: "blindness",
        do_not_use: false
    },
    "blood of cyric": {
        code: "blood of cyric",
        sdesc: "blood of cyric",
        do_not_use: false
    },
    "bulls strength": {
        code: "bulls strength",
        sdesc: "bulls strength",
        do_not_use: false
    },
    "burning hands": {
        code: "burning hands",
        sdesc: "burning hands",
        do_not_use: false
    },
    "call lightning": {
        code: "call lightning",
        sdesc: "call lightning",
        do_not_use: false
    },
    "cause critical": {
        code: "cause critical",
        sdesc: "cause critical",
        do_not_use: false
    },
    "cause light": {
        code: "cause light",
        sdesc: "cause light",
        do_not_use: false
    },
    "cause serious": {
        code: "cause serious",
        sdesc: "cause serious",
        do_not_use: false
    },
    "chain lightning": {
        code: "chain lightning",
        sdesc: "chain lightning",
        do_not_use: false
    },
    "change sex": {
        code: "change sex",
        sdesc: "change sex",
        do_not_use: false
    },
    "charged beacon": {
        code: "charged beacon",
        sdesc: "charged beacon",
        do_not_use: false
    },
    "chariot of the sun": {
        code: "chariot of the sun",
        sdesc: "chariot of the sun",
        do_not_use: false
    },
    "charm monster": {
        code: "charm monster",
        sdesc: "charm monster",
        do_not_use: false
    },
    "charm person": {
        code: "charm person",
        sdesc: "charm person",
        do_not_use: false
    },
    "chill touch": {
        code: "chill touch",
        sdesc: "chill touch",
        do_not_use: false
    },
    "clairvoyance": {
        code: "clairvoyance",
        sdesc: "clairvoyance",
        do_not_use: false
    },
    "color spray": {
        code: "color spray",
        sdesc: "color spray",
        do_not_use: false
    },
    "comprehend languages": {
        code: "comprehend languages",
        sdesc: "comprehend languages",
        do_not_use: false
    },
    "cone of cold": {
        code: "cone of cold",
        sdesc: "cone of cold",
        do_not_use: false
    },
    "conjure elemental": {
        code: "conjure elemental",
        sdesc: "conjure elemental",
        do_not_use: false
    },
    "continual light": {
        code: "continual light",
        sdesc: "continual light",
        do_not_use: false
    },
    "control undead": {
        code: "control undead",
        sdesc: "control undead",
        do_not_use: false
    },
    "control weather": {
        code: "control weather",
        sdesc: "control weather",
        do_not_use: false
    },
    "create food": {
        code: "create food",
        sdesc: "create food",
        do_not_use: false
    },
    "create object": {
        code: "create object",
        sdesc: "create object",
        do_not_use: false
    },
    "create spring": {
        code: "create spring",
        sdesc: "create spring",
        do_not_use: false
    },
    "create water": {
        code: "create water",
        sdesc: "create water",
        do_not_use: false
    },
    "cure blindness": {
        code: "cure blindness",
        sdesc: "cure blindness",
        do_not_use: false
    },
    "cure critical": {
        code: "cure critical",
        sdesc: "cure critical",
        do_not_use: false
    },
    "cure light": {
        code: "cure light",
        sdesc: "cure light",
        do_not_use: false
    },
    "cure poison": {
        code: "cure poison",
        sdesc: "cure poison",
        do_not_use: false
    },
    "cure serious": {
        code: "cure serious",
        sdesc: "cure serious",
        do_not_use: false
    },
    "curse": {
        code: "curse",
        sdesc: "curse",
        do_not_use: false
    },
    "delayed blast": {
        code: "delayed blast",
        sdesc: "delayed blast",
        do_not_use: false
    },
    "detect buried": {
        code: "detect buried",
        sdesc: "detect buried",
        do_not_use: false
    },
    "detect evil": {
        code: "detect evil",
        sdesc: "detect evil",
        do_not_use: false
    },
    "detect hidden": {
        code: "detect hidden",
        sdesc: "detect hidden",
        do_not_use: false
    },
    "detect invis": {
        code: "detect invis",
        sdesc: "detect invis",
        do_not_use: false
    },
    "detect magic": {
        code: "detect magic",
        sdesc: "detect magic",
        do_not_use: false
    },
    "detect poison": {
        code: "detect poison",
        sdesc: "detect poison",
        do_not_use: false
    },
    "disintegrate": {
        code: "disintegrate",
        sdesc: "disintegrate",
        do_not_use: false
    },
    "disjunction": {
        code: "disjunction",
        sdesc: "disjunction",
        do_not_use: false
    },
    "dispel evil": {
        code: "dispel evil",
        sdesc: "dispel evil",
        do_not_use: false
    },
    "dispel magic": {
        code: "dispel magic",
        sdesc: "dispel magic",
        do_not_use: false
    },
    "divinity": {
        code: "divinity",
        sdesc: "divinity",
        do_not_use: false
    },
    "dragonskin": {
        code: "dragonskin",
        sdesc: "dragonskin",
        do_not_use: false
    },
    "dream": {
        code: "dream",
        sdesc: "dream",
        do_not_use: false
    },
    "earthquake": {
        code: "earthquake",
        sdesc: "earthquake",
        do_not_use: false
    },
    "eltsacs fear": {
        code: "eltsacs fear",
        sdesc: "eltsacs fear",
        do_not_use: false
    },
    "enchant armor": {
        code: "enchant armor",
        sdesc: "enchant armor",
        do_not_use: false
    },
    "enchant weapon": {
        code: "enchant weapon",
        sdesc: "enchant weapon",
        do_not_use: false
    },
    "energy drain": {
        code: "energy drain",
        sdesc: "energy drain",
        do_not_use: false
    },
    "entangle": {
        code: "entangle",
        sdesc: "entangle",
        do_not_use: false
    },
    "ethereal flyer": {
        code: "ethereal flyer",
        sdesc: "ethereal flyer",
        do_not_use: false
    },
    "faerie fire": {
        code: "faerie fire",
        sdesc: "faerie fire",
        do_not_use: false
    },
    "faerie fog": {
        code: "faerie fog",
        sdesc: "faerie fog",
        do_not_use: false
    },
    "farheal": {
        code: "farheal",
        sdesc: "farheal",
        do_not_use: false
    },
    "fatigue": {
        code: "fatigue",
        sdesc: "fatigue",
        do_not_use: false
    },
    "feeblemind": {
        code: "feeblemind",
        sdesc: "feeblemind",
        do_not_use: false
    },
    "find familiar": {
        code: "find familiar",
        sdesc: "find familiar",
        do_not_use: false
    },
    "find traps": {
        code: "find traps",
        sdesc: "find traps",
        do_not_use: false
    },
    "fire breath": {
        code: "fire breath",
        sdesc: "fire breath",
        do_not_use: false
    },
    "fireball": {
        code: "fireball",
        sdesc: "fireball",
        do_not_use: false
    },
    "fireshield": {
        code: "fireshield",
        sdesc: "fireshield",
        do_not_use: false
    },
    "flame arrow": {
        code: "flame arrow",
        sdesc: "flame arrow",
        do_not_use: false
    },
    "flame jaws": {
        code: "flame jaws",
        sdesc: "flame jaws",
        do_not_use: false
    },
    "flamestrike": {
        code: "flamestrike",
        sdesc: "flamestrike",
        do_not_use: false
    },
    "fly": {
        code: "fly",
        sdesc: "fly",
        do_not_use: false
    },
    "freedom of movement": {
        code: "freedom of movement",
        sdesc: "freedom of movement",
        do_not_use: false
    },
    "friends": {
        code: "friends",
        sdesc: "friends",
        do_not_use: false
    },
    "frost breath": {
        code: "frost breath",
        sdesc: "frost breath",
        do_not_use: false
    },
    "fumble": {
        code: "fumble",
        sdesc: "fumble",
        do_not_use: false
    },
    "gas breath": {
        code: "gas breath",
        sdesc: "gas breath",
        do_not_use: false
    },
    "gate": {
        code: "gate",
        sdesc: "gate",
        do_not_use: false
    },
    "globe of invulnerability": {
        code: "globe of invulnerability",
        sdesc: "globe of invulnerability",
        do_not_use: false
    },
    "good fortune": {
        code: "good fortune",
        sdesc: "good fortune",
        do_not_use: false
    },
    "hand of chaos": {
        code: "hand of chaos",
        sdesc: "hand of chaos",
        do_not_use: false
    },
    "harm": {
        code: "harm",
        sdesc: "harm",
        do_not_use: false
    },
    "heal": {
        code: "heal",
        sdesc: "heal",
        do_not_use: false
    },
    "heroism": {
        code: "heroism",
        sdesc: "heroism",
        do_not_use: false
    },
    "hold monster": {
        code: "hold monster",
        sdesc: "hold monster",
        do_not_use: false
    },
    "hold person": {
        code: "hold person",
        sdesc: "hold person",
        do_not_use: false
    },
    "holy sanctity": {
        code: "holy sanctity",
        sdesc: "holy sanctity",
        do_not_use: false
    },
    "holy symbol": {
        code: "holy symbol",
        sdesc: "holy symbol",
        do_not_use: false
    },
    "ice storm": {
        code: "ice storm",
        sdesc: "ice storm",
        do_not_use: false
    },
    "iceshield": {
        code: "iceshield",
        sdesc: "iceshield",
        do_not_use: false
    },
    "identify": {
        code: "identify",
        sdesc: "identify",
        do_not_use: false
    },
    "ill fortune": {
        code: "ill fortune",
        sdesc: "ill fortune",
        do_not_use: false
    },
    "ilmaters bless": {
        code: "ilmaters bless",
        sdesc: "ilmaters bless",
        do_not_use: false
    },
    "infravision": {
        code: "infravision",
        sdesc: "infravision",
        do_not_use: false
    },
    "invis": {
        code: "invis",
        sdesc: "invis",
        do_not_use: false
    },
    "invisibility purge": {
        code: "invisibility purge",
        sdesc: "invisibility purge",
        do_not_use: false
    },
    "knock": {
        code: "knock",
        sdesc: "knock",
        do_not_use: false
    },
    "know alignment": {
        code: "know alignment",
        sdesc: "know alignment",
        do_not_use: false
    },
    "levitate": {
        code: "levitate",
        sdesc: "levitate",
        do_not_use: false
    },
    "lightning bolt": {
        code: "lightning bolt",
        sdesc: "lightning bolt",
        do_not_use: false
    },
    "lightning breath": {
        code: "lightning breath",
        sdesc: "lightning breath",
        do_not_use: false
    },
    "llanthyrs mend": {
        code: "llanthyrs mend",
        sdesc: "llanthyrs mend",
        do_not_use: false
    },
    "locate object": {
        code: "locate object",
        sdesc: "locate object",
        do_not_use: false
    },
    "magic mirror": {
        code: "magic mirror",
        sdesc: "magic mirror",
        do_not_use: false
    },
    "magic missile": {
        code: "magic missile",
        sdesc: "magic missile",
        do_not_use: false
    },
    "magnetic thrus": {
        code: "magnetic thrus",
        sdesc: "magnetic thrus",
        do_not_use: false
    },
    "mass invis": {
        code: "mass invis",
        sdesc: "mass invis",
        do_not_use: false
    },
    "mind blank": {
        code: "mind blank",
        sdesc: "mind blank",
        do_not_use: false
    },
    "mind wrack": {
        code: "mind wrack",
        sdesc: "mind wrack",
        do_not_use: false
    },
    "mind wrench": {
        code: "mind wrench",
        sdesc: "mind wrench",
        do_not_use: false
    },
    "mirror image": {
        code: "mirror image",
        sdesc: "mirror image",
        do_not_use: false
    },
    "mnemonic enhan": {
        code: "mnemonic enhan",
        sdesc: "mnemonic enhan",
        do_not_use: false
    },
    "monster summon": {
        code: "monster summon",
        sdesc: "monster summon",
        do_not_use: false
    },
    "moonbeam": {
        code: "moonbeam",
        sdesc: "moonbeam",
        do_not_use: false
    },
    "nondetection": {
        code: "nondetection",
        sdesc: "nondetection",
        do_not_use: false
    },
    "null sphere": {
        code: "null sphere",
        sdesc: "null sphere",
        do_not_use: false
    },
    "pass door": {
        code: "pass door",
        sdesc: "pass door",
        do_not_use: false
    },
    "pass plant": {
        code: "pass plant",
        sdesc: "pass plant",
        do_not_use: false
    },
    "phantasmal killer": {
        code: "phantasmal killer",
        sdesc: "phantasmal killer",
        do_not_use: false
    },
    "phoenix claw": {
        code: "phoenix claw",
        sdesc: "phoenix claw",
        do_not_use: false
    },
    "poison": {
        code: "poison",
        sdesc: "poison",
        do_not_use: false
    },
    "polymorph": {
        code: "polymorph",
        sdesc: "polymorph",
        do_not_use: false
    },
    "possess": {
        code: "possess",
        sdesc: "possess",
        do_not_use: false
    },
    "produce flame": {
        code: "produce flame",
        sdesc: "produce flame",
        do_not_use: false
    },
    "protection": {
        code: "protection",
        sdesc: "protection",
        do_not_use: false
    },
    "quantum spike": {
        code: "quantum spike",
        sdesc: "quantum spike",
        do_not_use: false
    },
    "rainbow pattern": {
        code: "rainbow pattern",
        sdesc: "rainbow pattern",
        do_not_use: false
    },
    "raise dead": {
        code: "raise dead",
        sdesc: "raise dead",
        do_not_use: false
    },
    "razorbait": {
        code: "razorbait",
        sdesc: "razorbait",
        do_not_use: false
    },
    "recharge": {
        code: "recharge",
        sdesc: "recharge",
        do_not_use: false
    },
    "refresh": {
        code: "refresh",
        sdesc: "refresh",
        do_not_use: false
    },
    "regenerate": {
        code: "regenerate",
        sdesc: "regenerate",
        do_not_use: false
    },
    "remove curse": {
        code: "remove curse",
        sdesc: "remove curse",
        do_not_use: false
    },
    "remove trap": {
        code: "remove trap",
        sdesc: "remove trap",
        do_not_use: false
    },
    "resilience": {
        code: "resilience",
        sdesc: "resilience",
        do_not_use: false
    },
    "resist cold": {
        code: "resist cold",
        sdesc: "resist cold",
        do_not_use: false
    },
    "resist electricity": {
        code: "resist electricity",
        sdesc: "resist electricity",
        do_not_use: false
    },
    "resist fire": {
        code: "resist fire",
        sdesc: "resist fire",
        do_not_use: false
    },
    "restoration": {
        code: "restoration",
        sdesc: "restoration",
        do_not_use: false
    },
    "restore mana": {
        code: "restore mana",
        sdesc: "restore mana",
        do_not_use: false
    },
    "resurrection": {
        code: "resurrection",
        sdesc: "resurrection",
        do_not_use: false
    },
    "revive": {
        code: "revive",
        sdesc: "revive",
        do_not_use: false
    },
    "sagacity": {
        code: "sagacity",
        sdesc: "sagacity",
        do_not_use: false
    },
    "sanctuary": {
        code: "sanctuary",
        sdesc: "sanctuary",
        do_not_use: false
    },
    "scorching surge": {
        code: "scorching surge",
        sdesc: "scorching surge",
        do_not_use: false
    },
    "sentry of helm": {
        code: "sentry of helm",
        sdesc: "sentry of helm",
        do_not_use: false
    },
    "shadow conjuration": {
        code: "shadow conjuration",
        sdesc: "shadow conjuration",
        do_not_use: false
    },
    "shadow door": {
        code: "shadow door",
        sdesc: "shadow door",
        do_not_use: false
    },
    "shadow fist": {
        code: "shadow fist",
        sdesc: "shadow fist",
        do_not_use: false
    },
    "shadow funnel": {
        code: "shadow funnel",
        sdesc: "shadow funnel",
        do_not_use: false
    },
    "shadow walk": {
        code: "shadow walk",
        sdesc: "shadow walk",
        do_not_use: false
    },
    "shield": {
        code: "shield",
        sdesc: "shield",
        do_not_use: false
    },
    "shocking grasp": {
        code: "shocking grasp",
        sdesc: "shocking grasp",
        do_not_use: false
    },
    "shockshield": {
        code: "shockshield",
        sdesc: "shockshield",
        do_not_use: false
    },
    "silence": {
        code: "silence",
        sdesc: "silence",
        do_not_use: false
    },
    "sleep": {
        code: "sleep",
        sdesc: "sleep",
        do_not_use: false
    },
    "slink": {
        code: "slink",
        sdesc: "slink",
        do_not_use: false
    },
    "sound burst": {
        code: "sound burst",
        sdesc: "sound burst",
        do_not_use: false
    },
    "speak with dead": {
        code: "speak with dead",
        sdesc: "speak with dead",
        do_not_use: false
    },
    "spectral fist": {
        code: "spectral fist",
        sdesc: "spectral fist",
        do_not_use: false
    },
    "spectral hand": {
        code: "spectral hand",
        sdesc: "spectral hand",
        do_not_use: false
    },
    "spectral light": {
        code: "spectral light",
        sdesc: "spectral light",
        do_not_use: false
    },
    "stone skin": {
        code: "stone skin",
        sdesc: "stone skin",
        do_not_use: false
    },
    "stone walk": {
        code: "stone walk",
        sdesc: "stone walk",
        do_not_use: false
    },
    "sulfurous spray": {
        code: "sulfurous spray",
        sdesc: "sulfurous spray",
        do_not_use: false
    },
    "summon": {
        code: "summon",
        sdesc: "summon",
        do_not_use: false
    },
    "sunray": {
        code: "sunray",
        sdesc: "sunray",
        do_not_use: false
    },
    "swordbait": {
        code: "swordbait",
        sdesc: "swordbait",
        do_not_use: false
    },
    "tayzas acidshield": {
        code: "tayzas acidshield",
        sdesc: "tayzas acidshield",
        do_not_use: false
    },
    "teleport": {
        code: "teleport",
        sdesc: "teleport",
        do_not_use: false
    },
    "touch of justice": {
        code: "touch of justice",
        sdesc: "touch of justice",
        do_not_use: false
    },
    "transport": {
        code: "transport",
        sdesc: "transport",
        do_not_use: false
    },
    "trollish vigor": {
        code: "trollish vigor",
        sdesc: "trollish vigor",
        do_not_use: false
    },
    "true sight": {
        code: "true sight",
        sdesc: "true sight",
        do_not_use: false
    },
    "turn undead": {
        code: "turn undead",
        sdesc: "turn undead",
        do_not_use: false
    },
    "valiance": {
        code: "valiance",
        sdesc: "valiance",
        do_not_use: false
    },
    "vampiric touch": {
        code: "vampiric touch",
        sdesc: "vampiric touch",
        do_not_use: false
    },
    "ventriloquism": {
        code: "ventriloquism",
        sdesc: "ventriloquism",
        do_not_use: false
    },
    "warhorse": {
        code: "warhorse",
        sdesc: "warhorse",
        do_not_use: false
    },
    "water breathing": {
        code: "water breathing",
        sdesc: "water breathing",
        do_not_use: false
    },
    "water to wine": {
        code: "water to wine",
        sdesc: "water to wine",
        do_not_use: false
    },
    "weaken": {
        code: "weaken",
        sdesc: "weaken",
        do_not_use: false
    },
    "web": {
        code: "web",
        sdesc: "web",
        do_not_use: false
    },
    "wind walk": {
        code: "wind walk",
        sdesc: "wind walk",
        do_not_use: false
    },
    "winter mist": {
        code: "winter mist",
        sdesc: "winter mist",
        do_not_use: false
    },
    "witch light": {
        code: "witch light",
        sdesc: "witch light",
        do_not_use: false
    },
    "word of recall": {
        code: "word of recall",
        sdesc: "word of recall",
        do_not_use: false
    },
    "wraithform": {
        code: "wraithform",
        sdesc: "wraithform",
        do_not_use: false
    },
    
};
const MOB_SKILLS = {
    "aid": {
        code: "aid",
        sdesc: "aid",
    },
    "animal empathy": {
        code: "animal empathy",
        sdesc: "animal empathy",
    },
    "backstab": {
        code: "backstab",
        sdesc: "backstab",
    },
    "bash": {
        code: "bash",
        sdesc: "bash",
    },
    "bite": {
        code: "bite",
        sdesc: "bite",
    },
    "brew": {
        code: "brew",
        sdesc: "brew",
    },
    "circle stab": {
        code: "circle stab",
        sdesc: "circle stab",
    },
    "claw": {
        code: "claw",
        sdesc: "claw",
    },
    "climb": {
        code: "climb",
        sdesc: "climb",
    },
    "companion": {
        code: "companion",
        sdesc: "companion",
    },
    "concentration": {
        code: "concentration",
        sdesc: "concentration",
    },
    "cook": {
        code: "cook",
        sdesc: "cook",
    },
    "detrap": {
        code: "detrap",
        sdesc: "detrap",
    },
    "dig": {
        code: "dig",
        sdesc: "dig",
    },
    "dirtkick": {
        code: "dirtkick",
        sdesc: "dirtkick",
    },
    "disarm": {
        code: "disarm",
        sdesc: "disarm",
    },
    "discern": {
        code: "discern",
        sdesc: "discern",
    },
    "disguise": {
        code: "disguise",
        sdesc: "disguise",
    },
    "dodge": {
        code: "dodge",
        sdesc: "dodge",
    },
    "doorbash": {
        code: "doorbash",
        sdesc: "doorbash",
    },
    "dual backstab": {
        code: "dual backstab",
        sdesc: "dual backstab",
    },
    "dual wield": {
        code: "dual wield",
        sdesc: "dual wield",
    },
    "enhanced damage": {
        code: "enhanced damage",
        sdesc: "enhanced damage",
    },
    "feed": {
        code: "feed",
        sdesc: "feed",
    },
    "fifth attack": {
        code: "fifth attack",
        sdesc: "fifth attack",
    },
    "fourth attack": {
        code: "fourth attack",
        sdesc: "fourth attack",
    },
    "gouge": {
        code: "gouge",
        sdesc: "gouge",
    },
    "grip": {
        code: "grip",
        sdesc: "grip",
    },
    "haggle": {
        code: "haggle",
        sdesc: "haggle",
    },
    "handle animal": {
        code: "handle animal",
        sdesc: "handle animal",
    },
    "hide": {
        code: "hide",
        sdesc: "hide",
    },
    "hitall": {
        code: "hitall",
        sdesc: "hitall",
    },
    "ignite": {
        code: "ignite",
        sdesc: "ignite",
    },
    "influence": {
        code: "influence",
        sdesc: "influence",
    },
    "kick": {
        code: "kick",
        sdesc: "kick",
    },
    "layonhands": {
        code: "layonhands",
        sdesc: "layonhands",
    },
    "limber": {
        code: "limber",
        sdesc: "limber",
    },
    "listen": {
        code: "listen",
        sdesc: "listen",
    },
    "meditate": {
        code: "meditate",
        sdesc: "meditate",
    },
    "mount": {
        code: "mount",
        sdesc: "mount",
    },
    "parry": {
        code: "parry",
        sdesc: "parry",
    },
    "pathfinding": {
        code: "pathfinding",
        sdesc: "pathfinding",
    },
    "peek": {
        code: "peek",
        sdesc: "peek",
    },
    "pick lock": {
        code: "pick lock",
        sdesc: "pick lock",
    },
    "poison weapon": {
        code: "poison weapon",
        sdesc: "poison weapon",
    },
    "punch": {
        code: "punch",
        sdesc: "punch",
    },
    "rage": {
        code: "rage",
        sdesc: "rage",
    },
    "rescue": {
        code: "rescue",
        sdesc: "rescue",
    },
    "riposte": {
        code: "riposte",
        sdesc: "riposte",
    },
    "sap": {
        code: "sap",
        sdesc: "sap",
    },
    "scribe": {
        code: "scribe",
        sdesc: "scribe",
    },
    "search": {
        code: "search",
        sdesc: "search",
    },
    "second attack": {
        code: "second attack",
        sdesc: "second attack",
    },
    "second dodge": {
        code: "second dodge",
        sdesc: "second dodge",
    },
    "second parry": {
        code: "second parry",
        sdesc: "second parry",
    },
    "shapechange": {
        code: "shapechange",
        sdesc: "shapechange",
    },
    "sing": {
        code: "sing",
        sdesc: "sing",
    },
    "slice": {
        code: "slice",
        sdesc: "slice",
    },
    "sneak": {
        code: "sneak",
        sdesc: "sneak",
    },
    "spellcraft": {
        code: "spellcraft",
        sdesc: "spellcraft",
    },
    "steal": {
        code: "steal",
        sdesc: "steal",
    },
    "sting": {
        code: "sting",
        sdesc: "sting",
    },
    "stun": {
        code: "stun",
        sdesc: "stun",
    },
    "swim": {
        code: "swim",
        sdesc: "swim",
    },
    "tail": {
        code: "tail",
        sdesc: "tail",
    },
    "third attack": {
        code: "third attack",
        sdesc: "third attack",
    },
    "third dodge": {
        code: "third dodge",
        sdesc: "third dodge",
    },
    "third parry": {
        code: "third parry",
        sdesc: "third parry",
    },
    "track": {
        code: "track",
        sdesc: "track",
    },
    "trip": {
        code: "trip",
        sdesc: "trip",
    },
    "use magic device": {
        code: "use magic device",
        sdesc: "use magic device",
    },
};
const MOB_WEAPON_SKILLS = {
    "bows": {
        code: "bows",
        sdesc: "bows"
    },
    "brawling": {
        code: "brawling",
        sdesc: "brawling"
    },
    "chains": {
        code: "chains",
        sdesc: "chains"
    },
    "clubs": {
        code: "clubs",
        sdesc: "clubs"
    },
    "crossbows": {
        code: "crossbows",
        sdesc: "crossbows"
    },
    "double-edged blades": {
        code: "double-edged blades",
        sdesc: "double-edged blades"
    },
    "great blades": {
        code: "great blades",
        sdesc: "great blades"
    },
    "great chains": {
        code: "great chains",
        sdesc: "great chains"
    },
    "lines": {
        code: "lines",
        sdesc: "lines"
    },
    "long axes": {
        code: "long axes",
        sdesc: "long axes"
    },
    "long spikes": {
        code: "long spikes",
        sdesc: "long spikes"
    },
    "mounted polearms": {
        code: "mounted polearms",
        sdesc: "mounted polearms"
    },
    "polearms": {
        code: "polearms",
        sdesc: "polearms"
    },
    "rope weapons": {
        code: "rope weapons",
        sdesc: "rope weapons"
    },
    "shieldwork": {
        code: "shieldwork",
        sdesc: "shieldwork"
    },
    "short axes": {
        code: "short axes",
        sdesc: "short axes"
    },
    "short blades": {
        code: "short blades",
        sdesc: "short blades"
    },
    "short spikes": {
        code: "short spikes",
        sdesc: "short spikes"
    },
    "single-edged blades": {
        code: "single-edged blades",
        sdesc: "single-edged blades"
    },
    "slings": {
        code: "slings",
        sdesc: "slings"
    },
    "staves": {
        code: "staves",
        sdesc: "staves"
    },
    "thrown projectiles": {
        code: "thrown projectiles",
        sdesc: "thrown projectiles"
    },
    "thrusting blades": {
        code: "thrusting blades",
        sdesc: "thrusting blades"
    },
    "whips": {
        code: "whips",
        sdesc: "whips"
    },
};
const MOB_LANGUAGES = {
    "ancient": {
        code: "ancient",
        sdesc: "ancient"
    },
    "animal": {
        code: "animal",
        sdesc: "animal"
    },
    "aquan": {
        code: "aquan",
        sdesc: "aquan"
    },
    "thieves cant": {
        code: "thieves cant",
        sdesc: "thieves cant"
    },
    "auran": {
        code: "auran",
        sdesc: "auran"
    },
    "common": {
        code: "common",
        sdesc: "common"
    },
    "darkspeak": {
        code: "darkspeak",
        sdesc: "darkspeak"
    },
    "draconic": {
        code: "draconic",
        sdesc: "draconic"
    },
    "dwarven": {
        code: "dwarven",
        sdesc: "dwarven"
    },
    "elven": {
        code: "elven",
        sdesc: "elven"
    },
    "giant": {
        code: "giant",
        sdesc: "giant"
    },
    "gith": {
        code: "gith",
        sdesc: "gith"
    },
    "gnoll": {
        code: "gnoll",
        sdesc: "gnoll"
    },
    "gnome": {
        code: "gnome",
        sdesc: "gnome"
    },
    "goblin": {
        code: "goblin",
        sdesc: "goblin"
    },
    "halfling": {
        code: "halfling",
        sdesc: "halfling"
    },
    "ignan": {
        code: "ignan",
        sdesc: "ignan"
    },
    "insectoid": {
        code: "insectoid",
        sdesc: "insectoid"
    },
    "magical": {
        code: "magical",
        sdesc: "magical"
    },
    "orcish": {
        code: "orcish",
        sdesc: "orcish"
    },
    "sylvan": {
        code: "sylvan",
        sdesc: "sylvan"
    },
    "terran": {
        code: "terran",
        sdesc: "terran"
    },
    "abyssal": {
        code: "abyssal",
        sdesc: "abyssal"
    },
    "celestial": {
        code: "celestial",
        sdesc: "celestial"
    }
};
const MOB_STATISTICS = {
    constitution: new Flag({
        code: "constitution",
        sdesc: "constitution"
    }),
    strength: new Flag({
        code: "strength",
        sdesc: "strength"
    }),
    wisdom: new Flag({
        code: "wisdom",
        sdesc: "wisdom"
    }),
    intelligence: new Flag({
        code: "intelligence",
        sdesc: "intelligence"
    }),
    charisma: new Flag({
        code: "charisma",
        sdesc: "charisma"
    }),
    luck: new Flag({
        code: "luck",
        sdesc: "luck"
    }),
    dexterity: new Flag({
        code: "dexterity",
        sdesc: "dexterity"
    }),
};
const MOB_FEATS = {
    "awareness": {
        code: "awareness",
        sdesc: "awareness",
        do_not_use: false
    },
    "armor proficiency": {
        code: "armor proficiency",
        sdesc: "armor proficiency",
        do_not_use: false
    },
    "blind-fight": {
        code: "blind-fight",
        sdesc: "blind-fight",
        do_not_use: false
    },
    "blooded": {
        code: "blooded",
        sdesc: "blooded",
        do_not_use: false
    },
    "bloodline of fire": {
        code: "bloodline of fire",
        sdesc: "bloodline of fire",
        do_not_use: false
    },
    "bullheaded": {
        code: "bullheaded",
        sdesc: "bullheaded",
        do_not_use: false
    },
    "cleave": {
        code: "cleave",
        sdesc: "cleave",
        do_not_use: false
    },
    "combat casting": {
        code: "combat casting",
        sdesc: "combat casting",
        do_not_use: false
    },
    "courteous magocracy": {
        code: "courteous magocracy",
        sdesc: "courteous magocracy",
        do_not_use: false
    },
    "daylight adaptation": {
        code: "daylight adaptation",
        sdesc: "daylight adaptation",
        do_not_use: false
    },
    "deflect arrows": {
        code: "deflect arrows",
        sdesc: "deflect arrows",
        do_not_use: false
    },
    "empower spell": {
        code: "empower spell",
        sdesc: "empower spell",
        do_not_use: false
    },
    "endurance": {
        code: "endurance",
        sdesc: "endurance",
        do_not_use: false
    },
    "enlarge spell": {
        code: "enlarge spell",
        sdesc: "enlarge spell",
        do_not_use: false
    },
    "evasion": {
        code: "evasion",
        sdesc: "evasion",
        do_not_use: false
    },
    "expertise": {
        code: "expertise",
        sdesc: "expertise",
        do_not_use: false
    },
    "extend spell": {
        code: "extend spell",
        sdesc: "extend spell",
        do_not_use: false
    },
    "extra turning": {
        code: "extra turning",
        sdesc: "extra turning",
        do_not_use: false
    },
    "far shot": {
        code: "far shot",
        sdesc: "far shot",
        do_not_use: false
    },
    "foe hunter": {
        code: "foe hunter",
        sdesc: "foe hunter",
        do_not_use: false
    },
    "great cleave": {
        code: "great cleave",
        sdesc: "great cleave",
        do_not_use: false
    },
    "heighten spell": {
        code: "heighten spell",
        sdesc: "heighten spell",
        do_not_use: false
    },
    "improved bash": {
        code: "improved bash",
        sdesc: "improved bash",
        do_not_use: false
    },
    "improved counterspell": {
        code: "improved counterspell",
        sdesc: "improved counterspell",
        do_not_use: false
    },
    "improved critical": {
        code: "improved critical",
        sdesc: "improved critical",
        do_not_use: false
    },
    "improved disarm": {
        code: "improved disarm",
        sdesc: "improved disarm",
        do_not_use: false
    },
    "improved familiar": {
        code: "improved familiar",
        sdesc: "improved familiar",
        do_not_use: false
    },
    "improved initiative": {
        code: "improved initiative",
        sdesc: "improved initiative",
        do_not_use: false
    },
    "improved trip": {
        code: "improved trip",
        sdesc: "improved trip",
        do_not_use: false
    },
    "improved brawling": {
        code: "improved brawling",
        sdesc: "improved brawling",
        do_not_use: false
    },
    "luck of heroes": {
        code: "luck of heroes",
        sdesc: "luck of heroes",
        do_not_use: false
    },
    "maximize spell": {
        code: "maximize spell",
        sdesc: "maximize spell",
        do_not_use: false
    },
    "militia": {
        code: "militia",
        sdesc: "militia",
        do_not_use: false
    },
    "mind over body": {
        code: "mind over body",
        sdesc: "mind over body",
        do_not_use: false
    },
    "mounted archery": {
        code: "mounted archery",
        sdesc: "mounted archery",
        do_not_use: false
    },
    "mounted combat": {
        code: "mounted combat",
        sdesc: "mounted combat",
        do_not_use: false
    },
    "persistent spell": {
        code: "persistent spell",
        sdesc: "persistent spell",
        do_not_use: false
    },
    "point blank shot": {
        code: "point blank shot",
        sdesc: "point blank shot",
        do_not_use: false
    },
    "poison resist": {
        code: "poison resist",
        sdesc: "poison resist",
        do_not_use: false
    },
    "power attack": {
        code: "power attack",
        sdesc: "power attack",
        do_not_use: false
    },
    "precise shot": {
        code: "precise shot",
        sdesc: "precise shot",
        do_not_use: false
    },
    "quick draw": {
        code: "quick draw",
        sdesc: "quick draw",
        do_not_use: false
    },
    "quicken spell": {
        code: "quicken spell",
        sdesc: "quicken spell",
        do_not_use: false
    },
    "rapid shot": {
        code: "rapid shot",
        sdesc: "rapid shot",
        do_not_use: false
    },
    "run": {
        code: "run",
        sdesc: "run",
        do_not_use: false
    },
    "saddleback": {
        code: "saddleback",
        sdesc: "saddleback",
        do_not_use: false
    },
    "shadow weave magic": {
        code: "shadow weave magic",
        sdesc: "shadow weave magic",
        do_not_use: false
    },
    "silent spell": {
        code: "silent spell",
        sdesc: "silent spell",
        do_not_use: false
    },
    "silver palm": {
        code: "silver palm",
        sdesc: "silver palm",
        do_not_use: false
    },
    "skill focus": {
        code: "skill focus",
        sdesc: "skill focus",
        do_not_use: false
    },
    "smooth talk": {
        code: "smooth talk",
        sdesc: "smooth talk",
        do_not_use: false
    },
    "spellcasting prodigy": {
        code: "spellcasting prodigy",
        sdesc: "spellcasting prodigy",
        do_not_use: false
    },
    "spell focus": {
        code: "spell focus",
        sdesc: "spell focus",
        do_not_use: false
    },
    "spell mastery": {
        code: "spell mastery",
        sdesc: "spell mastery",
        do_not_use: false
    },
    "spell penetration": {
        code: "spell penetration",
        sdesc: "spell penetration",
        do_not_use: false
    },
    "spirited charge": {
        code: "spirited charge",
        sdesc: "spirited charge",
        do_not_use: false
    },
    "stealthy": {
        code: "stealthy",
        sdesc: "stealthy",
        do_not_use: false
    },
    "still spell": {
        code: "still spell",
        sdesc: "still spell",
        do_not_use: false
    },
    "strong arm": {
        code: "strong arm",
        sdesc: "strong arm",
        do_not_use: false
    },
    "strong soul": {
        code: "strong soul",
        sdesc: "strong soul",
        do_not_use: false
    },
    "sunder": {
        code: "sunder",
        sdesc: "sunder",
        do_not_use: false
    },
    "teacher": {
        code: "teacher",
        sdesc: "teacher",
        do_not_use: false
    },
    "thug": {
        code: "thug",
        sdesc: "thug",
        do_not_use: false
    },
    "toughness": {
        code: "toughness",
        sdesc: "toughness",
        do_not_use: false
    },
    "trample": {
        code: "trample",
        sdesc: "trample",
        do_not_use: false
    },
    "twin spell": {
        code: "twin spell",
        sdesc: "twin spell",
        do_not_use: false
    },
    "twin sword style": {
        code: "twin sword style",
        sdesc: "twin sword style",
        do_not_use: false
    },
    "weapon focus": {
        code: "weapon focus",
        sdesc: "weapon focus",
        do_not_use: false
    },
    "weapon proficiency": {
        code: "weapon proficiency",
        sdesc: "weapon proficiency",
        do_not_use: false
    }
};
const MOB_BARDSONGS = {
    "song of heroism": {
        code: "song of heroism",
        sdesc: "song of heroism",
        do_not_use: false
    },
    "shadows cloak": {
        code: "shadows cloak",
        sdesc: "shadows cloak",
        do_not_use: false
    },
    "song of selune": {
        code: "song of selune",
        sdesc: "song of selune",
        do_not_use: false
    },
    "helms watch": {
        code: "helms watch",
        sdesc: "helms watch",
        do_not_use: false
    },
    "elemental compassion": {
        code: "elemental compassion",
        sdesc: "elemental compassion",
        do_not_use: false
    }
};
const MOB_TRADES = {
    appraise: new Flag({
        code: "appraise",
        sdesc: "appraise",
        do_not_use: false,
    }),
    armorsmithing: new Flag({
        code: "armorsmithing",
        sdesc: "armorsmithing",
        do_not_use: false,
    }),
    fletching: new Flag({
        code: "fletching",
        sdesc: "fletching",
        do_not_use: false,
    }),
    lapidary: new Flag({
        code: "lapidary",
        sdesc: "lapidary",
        do_not_use: false,
    }),
    leathermaking: new Flag({
        code: "leathermaking",
        sdesc: "leathermaking",
        do_not_use: false,
    }),
    logging: new Flag({
        code: "logging",
        sdesc: "logging",
        do_not_use: false,
    }),
    mining: new Flag({
        code: "mining",
        sdesc: "mining",
        do_not_use: false,
    }),
    smelting: new Flag({
        code: "smelting",
        sdesc: "smelting",
        do_not_use: false,
    }),
    tanning: new Flag({
        code: "tanning",
        sdesc: "tanning",
        do_not_use: false,
    }),
    weaponsmithing: new Flag({
        code: "weaponsmithing",
        sdesc: "weaponsmithing",
        do_not_use: false,
    }),
    woodworking: new Flag({
        code: "woodworking",
        sdesc: "woodworking",
        do_not_use: false,
    }),
    clothmaking: new Flag({
        code: "clothmaking",
        sdesc: "clothmaking",
        do_not_use: false,
    }),
    herbalism: new Flag({
        code: "herbalism",
        sdesc: "herbalism",
        do_not_use: false,
    }),
    tailoring: new Flag({
        code: "tailoring",
        sdesc: "tailoring",
        do_not_use: false,
    })
};
const MOB_KNOWLEDGE_SKILLS = {
    "knowledge-geography": {
        code: "knowledge-geography",
        sdesc: "knowledge-geography",
        do_not_use: false
    },
    "knowledge-history": {
        code: "knowledge-history",
        sdesc: "knowledge-history",
        do_not_use: false
    },
    "knowledge-nature": {
        code: "knowledge-nature",
        sdesc: "knowledge-nature",
        do_not_use: false
    },
    "knowledge-planes": {
        code: "knowledge-planes",
        sdesc: "knowledge-planes",
        do_not_use: false
    },
    "knowledge-religion": {
        code: "knowledge-religion",
        sdesc: "knowledge-religion",
        do_not_use: false
    },
    "knowledge-arcana": {
        code: "knowledge-arcana",
        sdesc: "knowledge-arcana",
        do_not_use: false
    }
};
const MOB_REPAIR_MATERIAL = {
    SUBSTANCE_WOOD: new Flag({
        code: "SUBSTANCE_WOOD",
        sdesc: "SUBSTANCE_WOOD",
        do_not_use: false,
    }),
    SUBSTANCE_METAL: new Flag({
        code: "SUBSTANCE_METAL",
        sdesc: "SUBSTANCE_METAL",
        do_not_use: false,
    }),
    SUBSTANCE_GEMSTONE: new Flag({
        code: "SUBSTANCE_GEMSTONE",
        sdesc: "SUBSTANCE_GEMSTONE",
        do_not_use: false,
    }),
    SUBSTANCE_LEATHER: new Flag({
        code: "SUBSTANCE_LEATHER",
        sdesc: "SUBSTANCE_LEATHER",
        do_not_use: false,
    }),
    SUBSTANCE_EXOTIC: new Flag({
        code: "SUBSTANCE_EXOTIC",
        sdesc: "SUBSTANCE_EXOTIC",
        do_not_use: false,
    })
};
const MOB_REPAIR_RECHARGE = {
    SHOP_FIX: new Flag({
        code: "SHOP_FIX",
        sdesc: "SHOP_FIX",
        bits: "1"
    }),
    SHOP_RECHARGE: new Flag({
        code: "SHOP_RECHARGE",
        sdesc: "SHOP_RECHARGE",
        bits: "2"
    })
};
const MOB_WEAR_POSITIONS = {
    WEAR_FINGER_L: new Flag({
        code: "WEAR_FINGER_L",
        sdesc: "WEAR_FINGER_L"
    }),
    WEAR_FINGER_R: new Flag({
        code: "WEAR_FINGER_R",
        sdesc: "WEAR_FINGER_R"
    }),
    WEAR_NECK_A: new Flag({
        code: "WEAR_NECK_A",
        sdesc: "WEAR_NECK_A"
    }),
    WEAR_NECK_B: new Flag({
        code: "WEAR_NECK_B",
        sdesc: "WEAR_NECK_B"
    }),
    WEAR_BODY: new Flag({
        code: "WEAR_BODY",
        sdesc: "WEAR_BODY"
    }),
    WEAR_HEAD: new Flag({
        code: "WEAR_HEAD",
        sdesc: "WEAR_HEAD"
    }),
    WEAR_LEGS: new Flag({
        code: "WEAR_LEGS",
        sdesc: "WEAR_LEGS"
    }),
    WEAR_FEET: new Flag({
        code: "WEAR_FEET",
        sdesc: "WEAR_FEET"
    }),
    WEAR_HANDS: new Flag({
        code: "WEAR_HANDS",
        sdesc: "WEAR_HANDS"
    }),
    WEAR_ARMS: new Flag({
        code: "WEAR_ARMS",
        sdesc: "WEAR_ARMS"
    }),
    WEAR_WAIST: new Flag({
        code: "WEAR_WAIST",
        sdesc: "WEAR_WAIST"
    }),
    WEAR_WRIST_L: new Flag({
        code: "WEAR_WRIST_L",
        sdesc: "WEAR_WRIST_L"
    }),
    WEAR_WRIST_R: new Flag({
        code: "WEAR_WRIST_R",
        sdesc: "WEAR_WRIST_R"
    }),
    WEAR_LEFT_HAND: new Flag({
        code: "WEAR_LEFT_HAND",
        sdesc: "WEAR_LEFT_HAND"
    }),
    WEAR_RIGHT_HAND: new Flag({
        code: "WEAR_RIGHT_HAND",
        sdesc: "WEAR_RIGHT_HAND"
    }),
    WEAR_BOTH_HANDS: new Flag({
        code: "WEAR_BOTH_HANDS",
        sdesc: "WEAR_BOTH_HANDS"
    }),
    WEAR_EARS: new Flag({
        code: "WEAR_EARS",
        sdesc: "WEAR_EARS"
    }),
    WEAR_EYES: new Flag({
        code: "WEAR_EYES",
        sdesc: "WEAR_EYES"
    })
};
const DOOR_RESET_FLAGS = {
    DOOR_OPEN_UNLOCKED: new Flag({
        code: "DOOR_OPEN_UNLOCKED",
        sdesc: "DOOR_OPEN_UNLOCKED"
    }),
    DOOR_CLOSED_UNLOCKED: new Flag({
        code: "DOOR_CLOSED_UNLOCKED",
        sdesc: "DOOR_CLOSED_UNLOCKED"
    }),
    DOOR_CLOSED_LOCKED: new Flag({
        code: "DOOR_CLOSED_LOCKED",
        sdesc: "DOOR_CLOSED_LOCKED"
    }),
    DOOR_NONE: new Flag({
        code: "DOOR_NONE",
        sdesc: "DOOR_NONE"
    }),
};
const DOOR_RESET_DIRECTIONS = {
    DIR_NORTH: new Flag({
        code: "DIR_NORTH",
        sdesc: "DIR_NORTH",
        bits: 0
    }),
    DIR_EAST: new Flag({
        code: "DIR_EAST",
        sdesc: "DIR_EAST",
        bits: 1
    }),
    DIR_SOUTH: new Flag({
        code: "DIR_SOUTH",
        sdesc: "DIR_SOUTH",
        bits: 2
    }),
    DIR_WEST: new Flag({
        code: "DIR_WEST",
        sdesc: "DIR_WEST",
        bits: 3
    }),
    DIR_UP: new Flag({
        code: "DIR_UP",
        sdesc: "DIR_UP",
        bits: 4
    }),
    DIR_DOWN: new Flag({
        code: "DIR_DOWN",
        sdesc: "DIR_DOWN",
        bits: 5
    }),
}
const RESET_BIT_CODES = {
    BIT_RESET_TOGGLE: new Flag({
        code: "BIT_RESET_TOGGLE",
        sdesc: "BIT_RESET_TOGGLE"
    }),
    BIT_RESET_SET: new Flag({
        code: "BIT_RESET_SET",
        sdesc: "BIT_RESET_SET"
    }),
    BIT_RESET_REMOVE: new Flag({
        code: "BIT_RESET_REMOVE",
        sdesc: "BIT_RESET_REMOVE"
    })
};
const MOB_SPECIALS = {
    spec_fido: new Flag({
        code: "spec_fido",
        sdesc: "spec_fido",
        ldesc: "Eats corpses",
        do_not_use: false
    }),
    spec_cast_adept: new Flag({
        code: "spec_cast_adept",
        sdesc: "spec_cast_adept",
        ldesc: "For constantly healing mobs",
        do_not_use: false
    }),
    spec_breath_fire: new Flag({
        code: "spec_breath_fire",
        sdesc: "spec_breath_fire",
        ldesc: "Uses fire breath weapon",
        do_not_use: false
    }),
    spec_breath_frost: new Flag({
        code: "spec_breath_frost",
        sdesc: "spec_breath_frost",
        ldesc: "Uses frost breath weapon",
        do_not_use: false
    }),
    spec_breath_acid: new Flag({
        code: "spec_breath_acid",
        sdesc: "spec_breath_acid",
        ldesc: "Uses acid breath weapon",
        do_not_use: false
    }),
    spec_breath_gas: new Flag({
        code: "spec_breath_gas",
        sdesc: "spec_breath_gas",
        ldesc: "Uses gas breath weapon",
        do_not_use: false
    }),
    spec_breath_lightning: new Flag({
        code: "spec_breath_lightning",
        sdesc: "spec_breath_lightning",
        ldesc: "Uses fire lightning weapon",
        do_not_use: false
    }),
    spec_breath_any: new Flag({
        code: "spec_breath_any",
        sdesc: "spec_breath_any",
        ldesc: "Uses a random breath weapon in battle",
        do_not_use: false
    }),
    spec_poison: new Flag({
        code: "spec_poison",
        sdesc: "spec_poison",
        ldesc: "Poisons foe with a bite",
        do_not_use: false
    }),
    spec_guard: new Flag({
        code: "spec_guard",
        sdesc: "spec_guard",
        ldesc: "For guards in the justice system",
        do_not_use: false
    }),
    spec_cast_cleric: new Flag({
        code: "spec_cast_cleric",
        sdesc: "spec_cast_cleric",
        ldesc: "General Cleric in battle",
        do_not_use: false
    }),
    spec_janitor: new Flag({
        code: "spec_janitor",
        sdesc: "spec_janitor",
        ldesc: "Cleans up trash and drinks",
        do_not_use: false
    }),
    spec_cast_undead: new Flag({
        code: "spec_cast_undead",
        sdesc: "spec_cast_undead",
        ldesc: "Casts curse, drain type spells in battle",
        do_not_use: false
    }),
    spec_executioner: new Flag({
        code: "spec_executioner",
        sdesc: "spec_executioner",
        ldesc: "Old justice for dealing with killers and thieves. Do not use.",
        do_not_use: true
    }),
    spec_judge: new Flag({
        code: "spec_judge",
        sdesc: "spec_judge",
        ldesc: "For judges in the justice system",
        do_not_use: false
    }),
    spec_pet_gen: new Flag({
        code: "spec_pet_gen",
        sdesc: "spec_pet_gen",
        ldesc: "Looks for master, rests when master does",
        do_not_use: false
    }),
    spec_paladin_warhorse: new Flag({
        code: "spec_paladin_warhorse",
        sdesc: "spec_paladin_warhorse",
        ldesc: "For a paladins warhorse, looks for master, aids, rescues, alerts to evil, doesn't tire",
        do_not_use: false
    }),
    spec_pet_hawk: new Flag({
        code: "spec_pet_hawk",
        sdesc: "spec_pet_hawk",
        ldesc: "Will work for all pet birds",
        do_not_use: false
    }),
    spec_pet_dog: new Flag({
        code: "spec_pet_dog",
        sdesc: "spec_pet_dog",
        ldesc: "Does spec_pet_gen plus also rescues master, race echos, sniffs invis chars",
        do_not_use: false
    }),
    spec_pet_panther: new Flag({
        code: "spec_pet_panther",
        sdesc: "spec_pet_panther",
        ldesc: "For companion large cats, see dog",
        do_not_use: false
    }),
    spec_pet_bear: new Flag({
        code: "spec_pet_bear",
        sdesc: "spec_pet_bear",
        ldesc: "For companion bears, see dog",
        do_not_use: false
    }),
    spec_pet_wolverine: new Flag({
        code: "spec_pet_wolverine",
        sdesc: "spec_pet_wolverine",
        ldesc: "For companion wolves, see dog",
        do_not_use: false
    })
};
const QUEST_EVENT_CODES = {
    SPECIAL_EVENT: new Flag({
        code: "SPECIAL_EVENT",
        sdesc: "SPECIAL_EVENT {F0}",
        color_code: "{F0}", 
        ldesc: "Special Event or Misc."
    }),
    IN_PROGRESS: new Flag({
        code: "IN_PROGRESS",
        sdesc: "IN_PROGRESS {E0}",
        color_code: "{E0}", 
        ldesc: "Quest in progress."
    }),
    COMPLETED: new Flag({
        code: "COMPLETED",
        sdesc: "COMPLETED {A0}",
        color_code: "{A0}", 
        ldesc: "Completed quest."
    }),
    FAILED: new Flag({
        code: "FAILED",
        sdesc: "FAILED {90}",
        color_code: "{90}", 
        ldesc: "Failed quest."
    }),
    KNOWLEDGE: new Flag({
        code: "KNOWLEDGE",
        sdesc: "KNOWLEDGE {20}",
        color_code: "{20}", 
        ldesc: "Knowledge Geography etc."
    }),
    TRADE: new Flag({
        code: "TRADE",
        sdesc: "TRADE {30}",
        color_code: "{30}", 
        ldesc: "Trade learned."
    }),
    NOT_STARTED: new Flag({
        code: "NOT_STARTED",
        sdesc: "NOT_STARTED {B0}",
        color_code: "{B0}", 
        ldesc: "Quest not yet started."
    }),
};
const ROOM_PROGRAM_TRIGGERS = {
    act_prog: new Flag({
        code: "act_prog",
        sdesc: "act_prog",
        ldesc: "emotes socials actions bamfs"
    }),
    speech_prog: new Flag({
        code: "speech_prog",
        sdesc: "speech_prog",
        ldesc: "says or tells from same room as mob"
    }),
    rand_prog: new Flag({
        code: "rand_prog",
        sdesc: "rand_prog",
        ldesc: "randomly triggered based on percentile"
    }),
    fight_prog: new Flag({
        code: "fight_prog",
        sdesc: "fight_prog",
        ldesc: "random within a fight percentile"
    }),
    greet_prog: new Flag({
        code: "greet_prog",
        sdesc: "greet_prog",
        ldesc: "entry that mob can see by mob/player"
    }),
    entry_prog: new Flag({
        code: "entry_prog",
        sdesc: "entry_prog",
        ldesc: "when the mob itself enters a room"
    }),
    leave_prog: new Flag({
        code: "leave_prog",
        sdesc: "leave_prog",
        ldesc: "when the PC leaves a room"
    }),
    death_prog: new Flag({
        code: "death_prog",
        sdesc: "death_prog",
        ldesc: "when the mob dies"
    }),
    script_prog: new Flag({
        code: "script_prog",
        sdesc: "script_prog",
        ldesc: "loops by line. Hour triggers start"
    }),
    time_prog: new Flag({
        code: "time_prog",
        sdesc: "time_prog",
        ldesc: "script prog runs once on hour"
    }),
    hour_prog: new Flag({
        code: "hour_prog",
        sdesc: "hour_prog",
        ldesc: "loops as Script for an hour from start"
    })
};
const ITEM_PROGRAM_TRIGGERS = {
    wear_prog: new Flag({
        code: "wear_prog",
        sdesc: "wear_prog",
        ldesc: "(percentage): when a player wears the object"
    }),
    remove_prog: new Flag({
        code: "remove_prog",
        sdesc: "remove_prog",
        ldesc: "(percentage): when a player removes the object"
    }),
    speech_prog: new Flag({
        code: "speech_prog",
        sdesc: "speech_prog",
        ldesc: "(keyword/phrase): says or tells from same room as object"
    }),
    rand_prog: new Flag({
        code: "rand_prog",
        sdesc: "rand_prog",
        ldesc: "(percentage): randomly triggered based on percentile"
    }),
    sac_prog: new Flag({
        code: "sac_prog",
        sdesc: "sac_prog",
        ldesc: "(percentage): when a player sacrifices the object"
    }),
    zap_prog: new Flag({
        code: "zap_prog",
        sdesc: "zap_prog",
        ldesc: "(percentage): when the player is zapped - alignment"
    }),
    get_prog: new Flag({
        code: "get_prog",
        sdesc: "get_prog",
        ldesc: "(percentage): when a player gets the object"
    }),
    drop_prog: new Flag({
        code: "drop_prog",
        sdesc: "drop_prog",
        ldesc: "(percentage): when a player drops the object"
    }),
    damage_prog: new Flag({
        code: "damage_prog",
        sdesc: "damage_prog",
        ldesc: "(percentage): when the object is damaged"
    }),
    repair_prog: new Flag({
        code: "repair_prog",
        sdesc: "repair_prog",
        ldesc: "(percentage): when the object is repaired"
    }),
    greet_prog: new Flag({
        code: "greet_prog",
        sdesc: "greet_prog",
        ldesc: "(percentage): when a mob/player enters the room"
    }),
    exa_prog: new Flag({
        code: "exa_prog",
        sdesc: "exa_prog",
        ldesc: "(percentage): when the object is Examined or Looked"
    }),
    push_prog: new Flag({
        code: "push_prog",
        sdesc: "push_prog",
        ldesc: "(percentage): when a player pushes an object"
    }),
    pull_prog: new Flag({
        code: "pull_prog",
        sdesc: "pull_prog",
        ldesc: "(percentage): when a player pulls an object"
    }),
    use_prog: new Flag({
        code: "use_prog",
        sdesc: "use_prog",
        ldesc: "(percentage): See below for more information"
    }),
    intercept_prog: new Flag({
        code: "intercept_prog",
        sdesc: "intercept_prog",
        ldesc: "(keyword): when a player types a command"
    }),
    give_prog: new Flag({
        code: "give_prog",
        sdesc: "give_prog",
        ldesc: "(percentage): when a player gives the object"
    })
};
const MOB_PROGRAM_TRIGGERS = {
    act_prog: new Flag({
        code: "act_prog",
        sdesc: "act_prog",
        ldesc: "(keyword/phrase): Works for emotes socials actions bamfs",
    }),
    speech_prog: new Flag({
        code: "speech_prog",
        sdesc: "speech_prog",
        ldesc: "(keyword/phrase): Works on says from same room as mob",
    }),
    rand_prog: new Flag({
        code: "rand_prog",
        sdesc: "rand_prog",
        ldesc: "(percentage): randomly triggered based on percentile",
    }),
    fight_prog: new Flag({
        code: "fight_prog",
        sdesc: "fight_prog",
        ldesc: "(percentage): random within a fight - percentile",
    }),
    hitprcnt_prog: new Flag({
        code: "hitprcnt_prog",
        sdesc: "hitprcnt_prog",
        ldesc: "(percentage): percent is percentage of mob's max H.P.",
    }),
    greet_prog: new Flag({
        code: "greet_prog",
        sdesc: "greet_prog",
        ldesc: "(percentage): entry that mob can see - by mob/player",
    }),
    entry_prog: new Flag({
        code: "entry_prog",
        sdesc: "entry_prog",
        ldesc: "(percentage): when the mob itself enters a room",
    }),
    bribe_prog: new Flag({
        code: "bribe_prog",
        sdesc: "bribe_prog",
        ldesc: "(amount of gold): when a player gives the mob money",
    }),
    death_prog: new Flag({
        code: "death_prog",
        sdesc: "death_prog",
        ldesc: "(percentage): when the mob dies",
    }),
    script_prog: new Flag({
        code: "script_prog",
        sdesc: "script_prog",
        ldesc: "loops by line Hour triggers start",
    }),
    time_prog: new Flag({
        code: "time_prog",
        sdesc: "time_prog",
        ldesc: "(hour and minutes): script prog - runs once on hour",
    }),
    hour_prog: new Flag({
        code: "hour_prog",
        sdesc: "hour_prog",
        ldesc: "(hour): loops as Script for an hour from start",
    }),
    intercept_prog: new Flag({
        code: "intercept_prog",
        sdesc: "intercept_prog",
        ldesc: "(keyword): when a player types a command",
    }),
    give_prog: new Flag({
        code: "give_prog",
        sdesc: "give_prog",
        ldesc: "(item vnum ivnum): when character gives mobile certain object",
    }),
    arrival_prog: new Flag({
        code: "arrival_prog",
        sdesc: "arrival_prog",
        ldesc: "(percentage): activates when mobile who is using mpwalkto arrives at destination",
    }),
    buy_prog: new Flag({
        code: "buy_prog",
        sdesc: "buy_prog",
        ldesc: "(item vnum): activates when the mobile sells that vnum",
    }),
    injure_prog: new Flag({
        code: "injure_prog",
        sdesc: "injure_prog",
        ldesc: "(percentage): activates when the mobile is injured",
    })
};

// Export all constants
export {
    AREA_CATEGORIES,
    JUSTICE_PUNISHMENTS,
    META_VALUE_TYPES,
    META_VNUM_TYPES,
    MAGIC_ITEM_SPELLS,
    ITEM_LAYERS,
    WEAR_LOCATIONS,
    ITEM_ATTRIBUTES,
    ITEM_QUALITY,
    ITEM_MATERIALS,
    ITEM_CONDITION,
    ITEM_SIZES,
    ITEM_APPLIES,
    ITEM_WEAPON_FLAGS,
    ITEM_WEAPON_TYPES,
    ITEM_CONTAINER_FLAGS,
    ITEM_BODY_TYPES,
    ITEM_ARMOR_TYPES,
    ITEM_FURNITURE_STATES,
    ITEM_DRINK_TYPES,
    ITEM_HERB_TYPES,
    ITEM_COIN_TYPES,
    ITEM_PIPE_FLAGS,
    LANGUAGE_FLAGS,
    ITEM_LEVER_BUTTON_FLAGS,
    TRAP_TYPES,
    TRAP_TRIGGERS,
    ITEM_TYPES,
    EXIT_DIRECTIONS,
    EXIT_DOOR_FLAGS,
    EXIT_SIZES,
    ROOM_FLAGS,
    ROOM_SECTOR_FLAGS,
    MOB_CLASSES,
    MOB_RACES,
    MOB_SEXES,
    MOB_POSITIONS,
    MOB_DEITIES,
    MOB_ACT_FLAGS,
    MOB_AFFECTS,
    MOB_ALIGNMENTS,
    MOB_RIS,
    MOB_SPELLS,
    MOB_SKILLS,
    MOB_WEAPON_SKILLS,
    MOB_LANGUAGES,
    MOB_STATISTICS,
    MOB_FEATS,
    MOB_BARDSONGS,
    MOB_TRADES,
    MOB_KNOWLEDGE_SKILLS,
    MOB_REPAIR_MATERIAL,
    MOB_REPAIR_RECHARGE,
    MOB_WEAR_POSITIONS,
    DOOR_RESET_FLAGS,
    RESET_BIT_CODES,
    DOOR_RESET_DIRECTIONS,
    MOB_SPECIALS,
    QUEST_EVENT_CODES,
    ROOM_PROGRAM_TRIGGERS,
    ITEM_PROGRAM_TRIGGERS,
    MOB_PROGRAM_TRIGGERS
};