var m = require("./model.js")
var Field = m.Field
var Model = m.Model

// Flag tables

const AREA_CATEGORIES = {
    WILDERNESS: {
        code: "WILDERNESS",
        color_code: "{20}",
        sdesc: "Wilderness areas"
    },
    LOW_LEVEL: {
        code: "LOW_LEVEL",
        color_code: "{30}",
        sdesc: "Low level dungeons/quest areas"
    },
    INCOMPLETE: {
        code: "INCOMPLETE",
        color_code: "{40}",
        sdesc: "Incomplete areas"
    },
    MID_LEVEL: {
        code: "MID_LEVEL",
        color_code: "{50}",
        sdesc: "Mid level dungeons/quest areas"
    },
    HIGH_LEVEL: {
        code: "HIGH_LEVEL",
        color_code: "{60}",
        sdesc: "High level dungeons/quest areas"
    },
    OTHER_PLANES: {
        code: "OTHER_PLANES",
        color_code: "{70}",
        sdesc: "Areas from other planes"
    },
    UNDERDARK: {
        code: "UNDERDARK",
        color_code: "{80}",
        sdesc: "Underdark Areas"
    },
    SPECIAL: {
        code: "SPECIAL",
        color_code: "{90}",
        sdesc: "Special areas"
    },
    VILLAGES: {
        code: "VILLAGES",
        color_code: "{A0}",
        sdesc: "Villages and encampments"
    },
    CITIES: {
        code: "CITIES",
        color_code: "{B0}",
        sdesc: "Major cities and towns"
    },
    IMMS_RPS: {
        code: "IMMS_RPS",
        color_code: "{C0}",
        sdesc: "Areas for imms and special rps"
    },
    GUILDHOUSES_ACADEMIES: {
        code: "GUILDHOUSES_ACADEMIES",
        color_code: "{D0}",
        sdesc: "Guildhouses and Academies"
    },
    ORGANIZATIONS: {
        code: "ORGANIZATIONS",
        color_code: "{E0}",
        sdesc: "Organization HQ and side areas"
    },
    TEMPLES: {
        code: "TEMPLES",
        color_code: "{F0}",
        sdesc: "Temples"
    },
};

const PUNISHMENTS = {
    PUNISHMENT_NOT_ENFORCED: {
        code: "PUNISHMENT_NOT_ENFORCED",
        sdesc: "Not enforced",
        ldesc: "No punishment",
        do_not_use: false
    },
    PUNISHMENT_DEATH: {
        code: "PUNISHMENT_DEATH",
        sdesc: "Death",
        ldesc: "Death",
        do_not_use: false
    },
    PUNISHMENT_RANDOM_ITEM: {
        code: "PUNISHMENT_RANDOM_ITEM",
        sdesc: "Random Item",
        ldesc: "Random item is confiscated",
        do_not_use: false
    },
    PUNISHMENT_SEVER: {
        code: "PUNISHMENT_SEVER",
        sdesc: "Sever",
        ldesc: "Random limb is severed",
        do_not_use: false
    },
    PUNISHMENT_JAIL: {
        code: "PUNISHMENT_JAIL",
        sdesc: "Jail",
        ldesc: "1 hour real time in the dungeon room",
        do_not_use: false
    },
    PUNISHMENT_EXILE: {
        code: "PUNISHMENT_EXILE",
        sdesc: "Exile (NOT CODED)",
        ldesc: "Not coded yet!",
        do_not_use: true
    }
}

const VALUE_TYPES = {
    INT: "int",
    POS_INT: "positive int",
    FLAG: "flag",
    MULTI_FLAGS: "multiple flags",
    STRING: "string",
    VNUM: "vnum",
    BOOLEAN: "boolean" // 0 = true, 1 = false
}

const VNUM_TYPES = {
    OBJECT: "object",
    ROOM: "room",
    MOB: "mob"
}

const MAGIC_ITEM_SPELLS = {
    SPELL_NONE: {
        code: "SPELL_NONE",
        sdesc: "SPELL_NONE"
    },
    SPELL_ACETUM_PRIMUS: {
        code: "SPELL_ACETUM_PRIMUS",
        sdesc: "SPELL_ACETUM_PRIMUS"
    },
    SPELL_ACID_ARROW: {
        code: "SPELL_ACID_ARROW",
        sdesc: "SPELL_ACID_ARROW"
    },
    SPELL_ACID_BLAST: {
        code: "SPELL_ACID_BLAST",
        sdesc: "SPELL_ACID_BLAST"
    },
    SPELL_ACID_BREATH: {
        code: "SPELL_ACID_BREATH",
        sdesc: "SPELL_ACID_BREATH"
    },
    SPELL_ALERTNESS: {
        code: "SPELL_ALERTNESS",
        sdesc: "SPELL_ALERTNESS"
    },
    SPELL_ANIMATE_DEAD: {
        code: "SPELL_ANIMATE_DEAD",
        sdesc: "SPELL_ANIMATE_DEAD"
    },
    SPELL_ANIMATE_OBJECT: {
        code: "SPELL_ANIMATE_OBJECT",
        sdesc: "SPELL_ANIMATE_OBJECT"
    },
    SPELL_ANTIMAGIC_SHELL: {
        code: "SPELL_ANTIMAGIC_SHELL",
        sdesc: "SPELL_ANTIMAGIC_SHELL"
    },
    SPELL_ARMOR: {
        code: "SPELL_ARMOR",
        sdesc: "SPELL_ARMOR"
    },
    SPELL_ASTRAL_WALK: {
        code: "SPELL_ASTRAL_WALK",
        sdesc: "SPELL_ASTRAL_WALK"
    },
    SPELL_BARKSKIN: {
        code: "SPELL_BARKSKIN",
        sdesc: "SPELL_BARKSKIN"
    },
    SPELL_BLAZEBANE: {
        code: "SPELL_BLAZEBANE",
        sdesc: "SPELL_BLAZEBANE"
    },
    SPELL_BLESS: {
        code: "SPELL_BLESS",
        sdesc: "SPELL_BLESS"
    },
    SPELL_BLINDNESS: {
        code: "SPELL_BLINDNESS",
        sdesc: "SPELL_BLINDNESS"
    },
    SPELL_BLOOD_OF_CYRIC: {
        code: "SPELL_BLOOD_OF_CYRIC",
        sdesc: "SPELL_BLOOD_OF_CYRIC"
    },
    SPELL_BURNING_HANDS: {
        code: "SPELL_BURNING_HANDS",
        sdesc: "SPELL_BURNING_HANDS"
    },
    SPELL_CALL_LIGHTNING: {
        code: "SPELL_CALL_LIGHTNING",
        sdesc: "SPELL_CALL_LIGHTNING"
    },
    SPELL_CAUSE_CRITICAL: {
        code: "SPELL_CAUSE_CRITICAL",
        sdesc: "SPELL_CAUSE_CRITICAL"
    },
    SPELL_CAUSE_LIGHT: {
        code: "SPELL_CAUSE_LIGHT",
        sdesc: "SPELL_CAUSE_LIGHT"
    },
    SPELL_CAUSE_SERIOUS: {
        code: "SPELL_CAUSE_SERIOUS",
        sdesc: "SPELL_CAUSE_SERIOUS"
    },
    SPELL_CLAIRVOYANCE: {
        code: "SPELL_CLAIRVOYANCE",
        sdesc: "SPELL_CLAIRVOYANCE"
    },
    SPELL_CHANGE_SEX: {
        code: "SPELL_CHANGE_SEX",
        sdesc: "SPELL_CHANGE_SEX"
    },
    SPELL_CHAIN_LIGHTNING: {
        code: "SPELL_CHAIN_LIGHTNING",
        sdesc: "SPELL_CHAIN_LIGHTNING"
    },
    SPELL_CHARGED_BEACON: {
        code: "SPELL_CHARGED_BEACON",
        sdesc: "SPELL_CHARGED_BEACON"
    },
    SPELL_CHARIOT_OF_THE_SUN: {
        code: "SPELL_CHARIOT_OF_THE_SUN",
        sdesc: "SPELL_CHARIOT_OF_THE_SUN"
    },
    SPELL_CHARM_PERSON: {
        code: "SPELL_CHARM_PERSON",
        sdesc: "SPELL_CHARM_PERSON"
    },
    SPELL_CHILL_TOUCH: {
        code: "SPELL_CHILL_TOUCH",
        sdesc: "SPELL_CHILL_TOUCH"
    },
    SPELL_COLOR_SPRAY: {
        code: "SPELL_COLOR_SPRAY",
        sdesc: "SPELL_COLOR_SPRAY"
    },
    SPELL_CONE_OF_COLD: {
        code: "SPELL_CONE_OF_COLD",
        sdesc: "SPELL_CONE_OF_COLD"
    },
    SPELL_CONJURE_ELEMENTAL: {
        code: "SPELL_CONJURE_ELEMENTAL",
        sdesc: "SPELL_CONJURE_ELEMENTAL"
    },
    SPELL_CONTINUAL_LIGHT: {
        code: "SPELL_CONTINUAL_LIGHT",
        sdesc: "SPELL_CONTINUAL_LIGHT"
    },
    SPELL_CONTROL_WEATHER: {
        code: "SPELL_CONTROL_WEATHER",
        sdesc: "SPELL_CONTROL_WEATHER"
    },
    SPELL_CREATE_FOOD: {
        code: "SPELL_CREATE_FOOD",
        sdesc: "SPELL_CREATE_FOOD"
    },
    SPELL_CREATE_SPRING: {
        code: "SPELL_CREATE_SPRING",
        sdesc: "SPELL_CREATE_SPRING"
    },
    SPELL_CREATE_SYMBOL: {
        code: "SPELL_CREATE_SYMBOL",
        sdesc: "SPELL_CREATE_SYMBOL"
    },
    SPELL_CREATE_WATER: {
        code: "SPELL_CREATE_WATER",
        sdesc: "SPELL_CREATE_WATER"
    },
    SPELL_CURE_BLINDNESS: {
        code: "SPELL_CURE_BLINDNESS",
        sdesc: "SPELL_CURE_BLINDNESS"
    },
    SPELL_CURE_CRITICAL: {
        code: "SPELL_CURE_CRITICAL",
        sdesc: "SPELL_CURE_CRITICAL"
    },
    SPELL_CURE_LIGHT: {
        code: "SPELL_CURE_LIGHT",
        sdesc: "SPELL_CURE_LIGHT"
    },
    SPELL_CURE_POISON: {
        code: "SPELL_CURE_POISON",
        sdesc: "SPELL_CURE_POISON"
    },
    SPELL_CURE_SERIOUS: {
        code: "SPELL_CURE_SERIOUS",
        sdesc: "SPELL_CURE_SERIOUS"
    },
    SPELL_CURSE: {
        code: "SPELL_CURSE",
        sdesc: "SPELL_CURSE"
    },
    SPELL_DETECT_BURIED: {
        code: "SPELL_DETECT_BURIED",
        sdesc: "SPELL_DETECT_BURIED"
    },
    SPELL_DETECT_EVIL: {
        code: "SPELL_DETECT_EVIL",
        sdesc: "SPELL_DETECT_EVIL"
    },
    SPELL_DETECT_HIDDEN: {
        code: "SPELL_DETECT_HIDDEN",
        sdesc: "SPELL_DETECT_HIDDEN"
    },
    SPELL_DETECT_INVIS: {
        code: "SPELL_DETECT_INVIS",
        sdesc: "SPELL_DETECT_INVIS"
    },
    SPELL_DETECT_MAGIC: {
        code: "SPELL_DETECT_MAGIC",
        sdesc: "SPELL_DETECT_MAGIC"
    },
    SPELL_DETECT_POISON: {
        code: "SPELL_DETECT_POISON",
        sdesc: "SPELL_DETECT_POISON"
    },
    SPELL_DISJUNCTION: {
        code: "SPELL_DISJUNCTION",
        sdesc: "SPELL_DISJUNCTION"
    },
    SPELL_DISPEL_EVIL: {
        code: "SPELL_DISPEL_EVIL",
        sdesc: "SPELL_DISPEL_EVIL"
    },
    SPELL_DISPEL_MAGIC: {
        code: "SPELL_DISPEL_MAGIC",
        sdesc: "SPELL_DISPEL_MAGIC"
    },
    SPELL_DIVINITY: {
        code: "SPELL_DIVINITY",
        sdesc: "SPELL_DIVINITY"
    },
    SPELL_DISINTEGRATE: {
        code: "SPELL_DISINTEGRATE",
        sdesc: "SPELL_DISINTEGRATE"
    },
    SPELL_DRAGONSKIN: {
        code: "SPELL_DRAGONSKIN",
        sdesc: "SPELL_DRAGONSKIN"
    },
    SPELL_DREAM: {
        code: "SPELL_DREAM",
        sdesc: "SPELL_DREAM"
    },
    SPELL_EARTHQUAKE: {
        code: "SPELL_EARTHQUAKE",
        sdesc: "SPELL_EARTHQUAKE"
    },
    SPELL_ENCHANT_WEAPON: {
        code: "SPELL_ENCHANT_WEAPON",
        sdesc: "SPELL_ENCHANT_WEAPON"
    },
    SPELL_ENERGY_DRAIN: {
        code: "SPELL_ENERGY_DRAIN",
        sdesc: "SPELL_ENERGY_DRAIN"
    },
    SPELL_FAERIE_FIRE: {
        code: "SPELL_FAERIE_FIRE",
        sdesc: "SPELL_FAERIE_FIRE"
    },
    SPELL_FAERIE_FOG: {
        code: "SPELL_FAERIE_FOG",
        sdesc: "SPELL_FAERIE_FOG"
    },
    SPELL_FARHEAL: {
        code: "SPELL_FARHEAL",
        sdesc: "SPELL_FARHEAL"
    },
    SPELL_FATIGUE: {
        code: "SPELL_FATIGUE",
        sdesc: "SPELL_FATIGUE"
    },
    SPELL_FEEBLEMIND: {
        code: "SPELL_FEEBLEMIND",
        sdesc: "SPELL_FEEBLEMIND"
    },
    SPELL_FIND_FAMILIAR: {
        code: "SPELL_FIND_FAMILIAR",
        sdesc: "SPELL_FIND_FAMILIAR"
    },
    SPELL_FIND_TRAPS: {
        code: "SPELL_FIND_TRAPS",
        sdesc: "SPELL_FIND_TRAPS"
    },
    SPELL_FIREBALL: {
        code: "SPELL_FIREBALL",
        sdesc: "SPELL_FIREBALL"
    },
    SPELL_FIRE_BREATH: {
        code: "SPELL_FIRE_BREATH",
        sdesc: "SPELL_FIRE_BREATH"
    },
    SPELL_FLAME_ARROW: {
        code: "SPELL_FLAME_ARROW",
        sdesc: "SPELL_FLAME_ARROW"
    },
    SPELL_FIRESHIELD: {
        code: "SPELL_FIRESHIELD",
        sdesc: "SPELL_FIRESHIELD"
    },
    SPELL_FLAME_JAWS: {
        code: "SPELL_FLAME_JAWS",
        sdesc: "SPELL_FLAME_JAWS"
    },
    SPELL_FLAMESTRIKE: {
        code: "SPELL_FLAMESTRIKE",
        sdesc: "SPELL_FLAMESTRIKE"
    },
    SPELL_FLY: {
        code: "SPELL_FLY",
        sdesc: "SPELL_FLY"
    },
    SPELL_FRIENDS: {
        code: "SPELL_FRIENDS",
        sdesc: "SPELL_FRIENDS"
    },
    SPELL_FROST_BREATH: {
        code: "SPELL_FROST_BREATH",
        sdesc: "SPELL_FROST_BREATH"
    },
    SPELL_FUMBLE: {
        code: "SPELL_FUMBLE",
        sdesc: "SPELL_FUMBLE"
    },
    SPELL_GAS_BREATH: {
        code: "SPELL_GAS_BREATH",
        sdesc: "SPELL_GAS_BREATH"
    },
    SPELL_GATE: {
        code: "SPELL_GATE",
        sdesc: "SPELL_GATE"
    },
    SPELL_GOOD_FORTUNE: {
        code: "SPELL_GOOD_FORTUNE",
        sdesc: "SPELL_GOOD_FORTUNE"
    },
    SPELL_HAND_OF_CHAOS: {
        code: "SPELL_HAND_OF_CHAOS",
        sdesc: "SPELL_HAND_OF_CHAOS"
    },
    SPELL_HARM: {
        code: "SPELL_HARM",
        sdesc: "SPELL_HARM"
    },
    SPELL_HEAL: {
        code: "SPELL_HEAL",
        sdesc: "SPELL_HEAL"
    },
    SPELL_HOLY_SANCTITY: {
        code: "SPELL_HOLY_SANCTITY",
        sdesc: "SPELL_HOLY_SANCTITY"
    },
    SPELL_ICESHIELD: {
        code: "SPELL_ICESHIELD",
        sdesc: "SPELL_ICESHIELD"
    },
    SPELL_ICE_STORM: {
        code: "SPELL_ICE_STORM",
        sdesc: "SPELL_ICE_STORM"
    },
    SPELL_IDENTIFY: {
        code: "SPELL_IDENTIFY",
        sdesc: "SPELL_IDENTIFY"
    },
    SPELL_ILL_FORTUNE: {
        code: "SPELL_ILL_FORTUNE",
        sdesc: "SPELL_ILL_FORTUNE"
    },
    SPELL_ILMATERS_BLESSING: {
        code: "SPELL_ILMATERS_BLESSING",
        sdesc: "SPELL_ILMATERS_BLESSING"
    },
    SPELL_INFRAVISION: {
        code: "SPELL_INFRAVISION",
        sdesc: "SPELL_INFRAVISION"
    },
    SPELL_INVIS: {
        code: "SPELL_INVIS",
        sdesc: "SPELL_INVIS"
    },
    SPELL_KNOCK: {
        code: "SPELL_KNOCK",
        sdesc: "SPELL_KNOCK"
    },
    SPELL_KNOW_ALIGNMENT: {
        code: "SPELL_KNOW_ALIGNMENT",
        sdesc: "SPELL_KNOW_ALIGNMENT"
    },
    SPELL_LEVITATE: {
        code: "SPELL_LEVITATE",
        sdesc: "SPELL_LEVITATE"
    },
    SPELL_LIGHTNING_BOLT: {
        code: "SPELL_LIGHTNING_BOLT",
        sdesc: "SPELL_LIGHTNING_BOLT"
    },
    SPELL_LIGHTNING_BREATH: {
        code: "SPELL_LIGHTNING_BREATH",
        sdesc: "SPELL_LIGHTNING_BREATH"
    },
    SPELL_LOCATE_OBJECT: {
        code: "SPELL_LOCATE_OBJECT",
        sdesc: "SPELL_LOCATE_OBJECT"
    },
    SPELL_MAGIC_MIRROR: {
        code: "SPELL_MAGIC_MIRROR",
        sdesc: "SPELL_MAGIC_MIRROR"
    },
    SPELL_MAGIC_MISSILE: {
        code: "SPELL_MAGIC_MISSILE",
        sdesc: "SPELL_MAGIC_MISSILE"
    },
    SPELL_MAGNETIC_THRUST: {
        code: "SPELL_MAGNETIC_THRUST",
        sdesc: "SPELL_MAGNETIC_THRUST"
    },
    SPELL_MASS_INVIS: {
        code: "SPELL_MASS_INVIS",
        sdesc: "SPELL_MASS_INVIS"
    },
    SPELL_MIND_WRACK: {
        code: "SPELL_MIND_WRACK",
        sdesc: "SPELL_MIND_WRACK"
    },
    SPELL_MIND_WRENCH: {
        code: "SPELL_MIND_WRENCH",
        sdesc: "SPELL_MIND_WRENCH"
    },
    SPELL_MINOR_GLOBE: {
        code: "SPELL_MINOR_GLOBE",
        sdesc: "SPELL_MINOR_GLOBE"
    },
    SPELL_MNEMONIC_ENHANCER: {
        code: "SPELL_MNEMONIC_ENHANCER",
        sdesc: "SPELL_MNEMONIC_ENHANCER"
    },
    SPELL_MONSTER_SUMMON: {
        code: "SPELL_MONSTER_SUMMON",
        sdesc: "SPELL_MONSTER_SUMMON"
    },
    SPELL_MOONBEAM: {
        code: "SPELL_MOONBEAM",
        sdesc: "SPELL_MOONBEAM"
    },
    SPELL_NULL_SPHERE: {
        code: "SPELL_NULL_SPHERE",
        sdesc: "SPELL_NULL_SPHERE"
    },
    SPELL_PASS_DOOR: {
        code: "SPELL_PASS_DOOR",
        sdesc: "SPELL_PASS_DOOR"
    },
    SPELL_PHOENIX_CLAW: {
        code: "SPELL_PHOENIX_CLAW",
        sdesc: "SPELL_PHOENIX_CLAW"
    },
    SPELL_PASS_PLANT: {
        code: "SPELL_PASS_PLANT",
        sdesc: "SPELL_PASS_PLANT"
    },
    SPELL_POISON: {
        code: "SPELL_POISON",
        sdesc: "SPELL_POISON"
    },
    SPELL_POLYMORPH: {
        code: "SPELL_POLYMORPH",
        sdesc: "SPELL_POLYMORPH"
    },
    SPELL_POSSESS: {
        code: "SPELL_POSSESS",
        sdesc: "SPELL_POSSESS"
    },
    SPELL_PRODUCE_FLAME: {
        code: "SPELL_PRODUCE_FLAME",
        sdesc: "SPELL_PRODUCE_FLAME"
    },
    SPELL_PROTECTION: {
        code: "SPELL_PROTECTION",
        sdesc: "SPELL_PROTECTION"
    },
    SPELL_QUANTUM_SPIKE: {
        code: "SPELL_QUANTUM_SPIKE",
        sdesc: "SPELL_QUANTUM_SPIKE"
    },
    SPELL_RAINBOW_PATTERN: {
        code: "SPELL_RAINBOW_PATTERN",
        sdesc: "SPELL_RAINBOW_PATTERN"
    },
    SPELL_RAZORBAIT: {
        code: "SPELL_RAZORBAIT",
        sdesc: "SPELL_RAZORBAIT"
    },
    SPELL_RECHARGE: {
        code: "SPELL_RECHARGE",
        sdesc: "SPELL_RECHARGE"
    },
    SPELL_REGENERATE: {
        code: "SPELL_REGENERATE",
        sdesc: "SPELL_REGENERATE"
    },
    SPELL_RESIST_COLD: {
        code: "SPELL_RESIST_COLD",
        sdesc: "SPELL_RESIST_COLD"
    },
    SPELL_RESIST_ELECTRICITY: {
        code: "SPELL_RESIST_ELECTRICITY",
        sdesc: "SPELL_RESIST_ELECTRICITY"
    },
    SPELL_RESIST_FIRE: {
        code: "SPELL_RESIST_FIRE",
        sdesc: "SPELL_RESIST_FIRE"
    },
    SPELL_REFRESH: {
        code: "SPELL_REFRESH",
        sdesc: "SPELL_REFRESH"
    },
    SPELL_REMOVE_CURSE: {
        code: "SPELL_REMOVE_CURSE",
        sdesc: "SPELL_REMOVE_CURSE"
    },
    SPELL_REMOVE_INVIS: {
        code: "SPELL_REMOVE_INVIS",
        sdesc: "SPELL_REMOVE_INVIS"
    },
    SPELL_REMOVE_TRAP: {
        code: "SPELL_REMOVE_TRAP",
        sdesc: "SPELL_REMOVE_TRAP"
    },
    SPELL_RESILIENCE: {
        code: "SPELL_RESILIENCE",
        sdesc: "SPELL_RESILIENCE"
    },
    SPELL_RESTORATION: {
        code: "SPELL_RESTORATION",
        sdesc: "SPELL_RESTORATION"
    },
    SPELL_RESTORE_MANA: {
        code: "SPELL_RESTORE_MANA",
        sdesc: "SPELL_RESTORE_MANA"
    },
    SPELL_REVIVE: {
        code: "SPELL_REVIVE",
        sdesc: "SPELL_REVIVE"
    },
    SPELL_SAGACITY: {
        code: "SPELL_SAGACITY",
        sdesc: "SPELL_SAGACITY"
    },
    SPELL_SANCTUARY: {
        code: "SPELL_SANCTUARY",
        sdesc: "SPELL_SANCTUARY"
    },
    SPELL_SCORCHING_SURGE: {
        code: "SPELL_SCORCHING_SURGE",
        sdesc: "SPELL_SCORCHING_SURGE"
    },
    SPELL_SHADOW_WALK: {
        code: "SPELL_SHADOW_WALK",
        sdesc: "SPELL_SHADOW_WALK"
    },
    SPELL_SHADOW_FIST: {
        code: "SPELL_SHADOW_FIST",
        sdesc: "SPELL_SHADOW_FIST"
    },
    SPELL_SHADOW_FUNNEL: {
        code: "SPELL_SHADOW_FUNNEL",
        sdesc: "SPELL_SHADOW_FUNNEL"
    },
    SPELL_SHADOW_DOOR: {
        code: "SPELL_SHADOW_DOOR",
        sdesc: "SPELL_SHADOW_DOOR"
    },
    SPELL_SHIELD: {
        code: "SPELL_SHIELD",
        sdesc: "SPELL_SHIELD"
    },
    SPELL_SHOCKING_GRASP: {
        code: "SPELL_SHOCKING_GRASP",
        sdesc: "SPELL_SHOCKING_GRASP"
    },
    SPELL_SHOCKSHIELD: {
        code: "SPELL_SHOCKSHIELD",
        sdesc: "SPELL_SHOCKSHIELD"
    },
    SPELL_SLEEP: {
        code: "SPELL_SLEEP",
        sdesc: "SPELL_SLEEP"
    },
    SPELL_SLINK: {
        code: "SPELL_SLINK",
        sdesc: "SPELL_SLINK"
    },
    SPELL_SPECTRAL_FIST: {
        code: "SPELL_SPECTRAL_FIST",
        sdesc: "SPELL_SPECTRAL_FIST"
    },
    SPELL_SPECTRAL_HAND: {
        code: "SPELL_SPECTRAL_HAND",
        sdesc: "SPELL_SPECTRAL_HAND"
    },
    SPELL_SPECTRAL_LIGHTNING: {
        code: "SPELL_SPECTRAL_LIGHTNING",
        sdesc: "SPELL_SPECTRAL_LIGHTNING"
    },
    SPELL_SONIC_RESONANCE: {
        code: "SPELL_SONIC_RESONANCE",
        sdesc: "SPELL_SONIC_RESONANCE"
    },
    SPELL_STRENGTH: {
        code: "SPELL_STRENGTH",
        sdesc: "SPELL_STRENGTH"
    },
    SPELL_SUNRAY: {
        code: "SPELL_SUNRAY",
        sdesc: "SPELL_SUNRAY"
    },
    SPELL_STONE_SKIN: {
        code: "SPELL_STONE_SKIN",
        sdesc: "SPELL_STONE_SKIN"
    },
    SPELL_SULFUROUS_SPRAY: {
        code: "SPELL_SULFUROUS_SPRAY",
        sdesc: "SPELL_SULFUROUS_SPRAY"
    },
    SPELL_SUMMON: {
        code: "SPELL_SUMMON",
        sdesc: "SPELL_SUMMON"
    },
    SPELL_SWORDBAIT: {
        code: "SPELL_SWORDBAIT",
        sdesc: "SPELL_SWORDBAIT"
    },
    SPELL_TELEPORT: {
        code: "SPELL_TELEPORT",
        sdesc: "SPELL_TELEPORT"
    },
    SPELL_TOUCH_OF_JUSTICE: {
        code: "SPELL_TOUCH_OF_JUSTICE",
        sdesc: "SPELL_TOUCH_OF_JUSTICE"
    },
    SPELL_TRANSPORT: {
        code: "SPELL_TRANSPORT",
        sdesc: "SPELL_TRANSPORT"
    },
    SPELL_TROLLISH_VIGOR: {
        code: "SPELL_TROLLISH_VIGOR",
        sdesc: "SPELL_TROLLISH_VIGOR"
    },
    SPELL_TRUE_SIGHT: {
        code: "SPELL_TRUE_SIGHT",
        sdesc: "SPELL_TRUE_SIGHT"
    },
    SPELL_VALIANCE: {
        code: "SPELL_VALIANCE",
        sdesc: "SPELL_VALIANCE"
    },
    SPELL_VAMPIRIC_TOUCH: {
        code: "SPELL_VAMPIRIC_TOUCH",
        sdesc: "SPELL_VAMPIRIC_TOUCH"
    },
    SPELL_VENTRILOQUISM: {
        code: "SPELL_VENTRILOQUISM",
        sdesc: "SPELL_VENTRILOQUISM"
    },
    SPELL_WARHORSE: {
        code: "SPELL_WARHORSE",
        sdesc: "SPELL_WARHORSE"
    },
    SPELL_WATER_BREATHING: {
        code: "SPELL_WATER_BREATHING",
        sdesc: "SPELL_WATER_BREATHING"
    },
    SPELL_WEAKEN: {
        code: "SPELL_WEAKEN",
        sdesc: "SPELL_WEAKEN"
    },
    SPELL_WIND_WALK: {
        code: "SPELL_WIND_WALK",
        sdesc: "SPELL_WIND_WALK"
    },
    SPELL_WINTER_MIST: {
        code: "SPELL_WINTER_MIST",
        sdesc: "SPELL_WINTER_MIST"
    },
    SPELL_WITCH_LIGHT: {
        code: "SPELL_WITCH_LIGHT",
        sdesc: "SPELL_WITCH_LIGHT"
    },
    SPELL_WORD_OF_RECALL: {
        code: "SPELL_WORD_OF_RECALL",
        sdesc: "SPELL_WORD_OF_RECALL"
    },
    SPELL_WRAITHFORM: {
        code: "SPELL_WRAITHFORM",
        sdesc: "SPELL_WRAITHFORM"
    },
    SPELL_WRATH_OF_DOMINUS: {
        code: "SPELL_WRATH_OF_DOMINUS",
        sdesc: "SPELL_WRATH_OF_DOMINUS"
    },
    SPELL_WEB: {
        code: "SPELL_WEB",
        sdesc: "SPELL_WEB"
    },
    SPELL_TURN_UNDEAD: {
        code: "SPELL_TURN_UNDEAD",
        sdesc: "SPELL_TURN_UNDEAD"
    },
    SPELL_SENTRY_OF_HELM: {
        code: "SPELL_SENTRY_OF_HELM",
        sdesc: "SPELL_SENTRY_OF_HELM"
    },
    SPELL_WATER_TO_WINE: {
        code: "SPELL_WATER_TO_WINE",
        sdesc: "SPELL_WATER_TO_WINE"
    },
    SPELL_RAISE_DEAD: {
        code: "SPELL_RAISE_DEAD",
        sdesc: "SPELL_RAISE_DEAD"
    },
    SPELL_RESURRECTION: {
        code: "SPELL_RESURRECTION",
        sdesc: "SPELL_RESURRECTION"
    },
    SPELL_HOLD_PERSON: {
        code: "SPELL_HOLD_PERSON",
        sdesc: "SPELL_HOLD_PERSON"
    },
    SPELL_SILENCE: {
        code: "SPELL_SILENCE",
        sdesc: "SPELL_SILENCE"
    },
    SPELL_ENTANGLE: {
        code: "SPELL_ENTANGLE",
        sdesc: "SPELL_ENTANGLE"
    },
    SPELL_COMPREHEND_LANGUAGE: {
        code: "SPELL_COMPREHEND_LANGUAGE",
        sdesc: "SPELL_COMPREHEND_LANGUAGE"
    },
    SPELL_MIND_SHIELD: {
        code: "SPELL_MIND_SHIELD",
        sdesc: "SPELL_MIND_SHIELD"
    },
    SPELL_STONE_WALK: {
        code: "SPELL_STONE_WALK",
        sdesc: "SPELL_STONE_WALK"
    },
    SPELL_ENCHANT_ARMOR: {
        code: "SPELL_ENCHANT_ARMOR",
        sdesc: "SPELL_ENCHANT_ARMOR"
    },
    SPELL_HEROISM: {
        code: "SPELL_HEROISM",
        sdesc: "SPELL_HEROISM"
    },
    SPELL_SHADOW_CONJURATION: {
        code: "SPELL_SHADOW_CONJURATION",
        sdesc: "SPELL_SHADOW_CONJURATION"
    },
    SPELL_MIRROR_IMAGE: {
        code: "SPELL_MIRROR_IMAGE",
        sdesc: "SPELL_MIRROR_IMAGE"
    },
    SPELL_DELAYED_BLAST_FIREBALL: {
        code: "SPELL_DELAYED_BLAST_FIREBALL",
        sdesc: "SPELL_DELAYED_BLAST_FIREBALL"
    },
    SPELL_MENDING: {
        code: "SPELL_MENDING",
        sdesc: "SPELL_MENDING"
    },
    SPELL_NON_DETECTION: {
        code: "SPELL_NON_DETECTION",
        sdesc: "SPELL_NON_DETECTION"
    },
    SPELL_FREEDOM: {
        code: "SPELL_FREEDOM",
        sdesc: "SPELL_FREEDOM"
    },
    SPELL_CHARM_MONSTER: {
        code: "SPELL_CHARM_MONSTER",
        sdesc: "SPELL_CHARM_MONSTER"
    },
    SPELL_HOLD_MONSTER: {
        code: "SPELL_HOLD_MONSTER",
        sdesc: "SPELL_HOLD_MONSTER"
    },
    SPELL_CONTROL_UNDEAD: {
        code: "SPELL_CONTROL_UNDEAD",
        sdesc: "SPELL_CONTROL_UNDEAD"
    },
    SPELL_ACIDSHIELD: {
        code: "SPELL_ACIDSHIELD",
        sdesc: "SPELL_ACIDSHIELD"
    },
    SPELL_CREATE_OBJECT: {
        code: "SPELL_CREATE_OBJECT",
        sdesc: "SPELL_CREATE_OBJECT"
    },
    SPELL_FEAR: {
        code: "SPELL_FEAR",
        sdesc: "SPELL_FEAR"
    },
    SPELL_ETHEREAL_FLYER: {
        code: "SPELL_ETHEREAL_FLYER",
        sdesc: "SPELL_ETHEREAL_FLYER"
    },
    SPELL_RESERVED_FOR_FUTURE: {
        code: "SPELL_RESERVED_FOR_FUTURE",
        sdesc: "SPELL_RESERVED_FOR_FUTURE"
    },
    SPELL_PHANTASMAL_KILLER: {
        code: "SPELL_PHANTASMAL_KILLER",
        sdesc: "SPELL_PHANTASMAL_KILLER"
    },
    SPELL_SPEAK_WITH_DEAD: {
        code: "SPELL_SPEAK_WITH_DEAD",
        sdesc: "SPELL_SPEAK_WITH_DEAD"
    },
    SPELL_FLOATING_DISC: {
        code: "SPELL_FLOATING_DISC",
        sdesc: "SPELL_FLOATING_DISC"
    }
}

const OBJECT_LAYERS = {
    LAYER_ALL: {
        code: "LAYER_ALL",
        sdesc: "LAYER_ALL",
        ldesc: "Nothing else can be worn with the item in the same locations."
    },
    LAYER_UNDER: {
        code: "LAYER_UNDER",
        sdesc: "LAYER_UNDER",
        ldesc: "Worn under armour. Such as padding and under clothes."
    },
    LAYER_ARMOR: {
        code: "LAYER_ARMOR",
        sdesc: "LAYER_ARMOR",
        ldesc: "Actual armor. It can have something worn under and over it."
    },
    LAYER_OVER: {
        code: "LAYER_OVER",
        sdesc: "LAYER_OVER",
        ldesc: "Can be worn over armour. Like robes."
    }
}

const WEAR_LOCATIONS = {
    CAN_WEAR_TAKE: {
        code: "CAN_WEAR_TAKE",
        sdesc: "CAN_WEAR_TAKE",
        ldesc: "This allows the item to be picked up by the PC.",
        do_not_use: false
    },
    CAN_WEAR_FINGER: {
        code: "CAN_WEAR_FINGER",
        sdesc: "CAN_WEAR_FINGER",
        ldesc: "There are two finger locations and they are not layerable.",
        do_not_use: false
    },
    CAN_WEAR_NECK: {
        code: "CAN_WEAR_NECK",
        sdesc: "CAN_WEAR_NECK",
        ldesc: "There are two neck locations and they are not layerable.",
        do_not_use: false
    },
    CAN_WEAR_BODY: {
        code: "CAN_WEAR_BODY",
        sdesc: "CAN_WEAR_BODY",
        ldesc: "There is one body location and it is layerable.",
        do_not_use: false
    },
    CAN_WEAR_HEAD: {
        code: "CAN_WEAR_HEAD",
        sdesc: "CAN_WEAR_HEAD",
        ldesc: "There is one head location and it is layerable.",
        do_not_use: false
    },
    CAN_WEAR_LEGS: {
        code: "CAN_WEAR_LEGS",
        sdesc: "CAN_WEAR_LEGS",
        ldesc: "There is one legs location and it is layerable.",
        do_not_use: false
    },
    CAN_WEAR_FEET: {
        code: "CAN_WEAR_FEET",
        sdesc: "CAN_WEAR_FEET",
        ldesc: "There is one feet location and it is layerable.",
        do_not_use: false
    },
    CAN_WEAR_HANDS: {
        code: "CAN_WEAR_HANDS",
        sdesc: "CAN_WEAR_HANDS",
        ldesc: "There is one hands location and it is layerable.",
        do_not_use: false
    },
    CAN_WEAR_ARMS: {
        code: "CAN_WEAR_ARMS",
        sdesc: "CAN_WEAR_ARMS",
        ldesc: "There is one arms location and it is layerable.",
        do_not_use: false
    },
    CAN_WEAR_WAIST: {
        code: "CAN_WEAR_WAIST",
        sdesc: "CAN_WEAR_WAIST",
        ldesc: "There is one waist location and it is not layerable.",
        do_not_use: false
    },
    CAN_WEAR_BELT: {
        code: "CAN_WEAR_BELT",
        sdesc: "CAN_WEAR_BELT",
        ldesc: "There is one belt location and it is layerable.",
        do_not_use: false
    },
    CAN_WEAR_WRIST: {
        code: "CAN_WEAR_WRIST",
        sdesc: "CAN_WEAR_WRIST",
        ldesc: "There are two wrist location and they are not layerable.",
        do_not_use: false
    },
    CAN_WEAR_HOLD: {
        code: "CAN_WEAR_HOLD",
        sdesc: "CAN_WEAR_HOLD",
        ldesc: "There are two hold locations and they are not layerable.",
        do_not_use: false
    },
    CAN_WEAR_BOTH_HANDS: {
        code: "CAN_WEAR_BOTH_HANDS",
        sdesc: "CAN_WEAR_BOTH_HANDS",
        ldesc: "There is one both hands location and it is not layerable.",
        do_not_use: false
    },
    CAN_WEAR_EARS: {
        code: "CAN_WEAR_EARS",
        sdesc: "CAN_WEAR_EARS",
        ldesc: "There is one ears location and it is not layerable.",
        do_not_use: false
    },
    CAN_WEAR_FACE: {
        code: "CAN_WEAR_FACE",
        sdesc: "CAN_WEAR_FACE",
        ldesc: "There is one face location and it is not layerable.",
        do_not_use: false
    },
    CAN_WEAR_FLOATING: {
        code: "CAN_WEAR_FLOATING",
        sdesc: "CAN_WEAR_FLOATING",
        ldesc: "There is one floating location and it is not layerable.",
        do_not_use: false
    },
    CAN_WEAR_SYMBOL: {
        code: "CAN_WEAR_SYMBOL",
        sdesc: "CAN_WEAR_SYMBOL",
        ldesc: "There is one feet location and it is layerable. (This one is not to be used in normal areas. It is for god symbols only).",
        do_not_use: false
    },
    CAN_WEAR_SADDLE: {
        code: "CAN_WEAR_SADDLE",
        sdesc: "CAN_WEAR_SADDLE",
        ldesc: "There is one saddle location and it is layerable. This can only be used by mobiles and PC's of a certain body type.",
        do_not_use: false
    },
    CAN_WEAR_ARMOR: {
        code: "CAN_WEAR_ARMOR",
        sdesc: "CAN_WEAR_ARMOR",
        ldesc: "This wear location is only for mobiles, set in hard code. It is not for use by builders.",
        do_not_use: true
    }
}

const OBJECT_ATTRIBUTES = {
    FLAG_GLOW: {
        code: "FLAG_GLOW",
        sdesc: "FLAG_GLOW",
        ldesc: "Item description has (Glowing) and provides light when equipped. (Unequipped objects must weigh > 100 pounds to light the room.)",
        do_not_use: false
    },
    FLAG_HUM: {
        code: "FLAG_HUM",
        sdesc: "FLAG_HUM",
        ldesc: "Item description has (Humming)",
        do_not_use: false
    },
    FLAG_DARK: {
        code: "FLAG_DARK",
        sdesc: "FLAG_DARK",
        ldesc: "This flag has no affect",
        do_not_use: true
    },
    FLAG_LOYAL: {
        code: "FLAG_LOYAL",
        sdesc: "FLAG_LOYAL",
        ldesc: "Weapon does not drop on floor if disarmed",
        do_not_use: false
    },
    FLAG_EVIL: {
        code: "FLAG_EVIL",
        sdesc: "FLAG_EVIL",
        ldesc: "Item has an evil aura",
        do_not_use: false
    },
    FLAG_INVIS: {
        code: "FLAG_INVIS",
        sdesc: "FLAG_INVIS",
        ldesc: "Item is invisible",
        do_not_use: false
    },
    FLAG_MAGIC: {
        code: "FLAG_MAGIC",
        sdesc: "FLAG_MAGIC",
        ldesc: "Item object has affects or program.",
        do_not_use: false
    },
    FLAG_NODROP: {
        code: "FLAG_NODROP",
        sdesc: "FLAG_NODROP",
        ldesc: "PC cannot drop object. Item is cursed",
        do_not_use: false
    },
    FLAG_RESIZE: {
        code: "FLAG_RESIZE",
        sdesc: "FLAG_RESIZE",
        ldesc: "Armour will resize when worn",
        do_not_use: false
    },
    FLAG_ANTI_LAWFUL: {
        code: "FLAG_ANTI_LAWFUL",
        sdesc: "FLAG_ANTI_LAWFUL",
        ldesc: "Item zaps good chars",
        do_not_use: false
    },
    FLAG_ANTI_CHAOTIC: {
        code: "FLAG_ANTI_CHAOTIC",
        sdesc: "FLAG_ANTI_CHAOTIC",
        ldesc: "Item zaps evil chars",
        do_not_use: false
    },
    FLAG_ANTI_UNCONCERNED: {
        code: "FLAG_ANTI_UNCONCERNED",
        sdesc: "FLAG_ANTI_UNCONCERNED",
        ldesc: "Item zaps neutral chars",
        do_not_use: false
    },
    FLAG_NOREMOVE: {
        code: "FLAG_NOREMOVE",
        sdesc: "FLAG_NOREMOVE",
        ldesc: "Item cannot be removed. Item is cursed.",
        do_not_use: false
    },
    FLAG_INVENTORY: {
        code: "FLAG_INVENTORY",
        sdesc: "FLAG_INVENTORY",
        ldesc: "Item cannot be put into containers and is more resistant to damage.",
        do_not_use: false
    },
    FLAG_ANTI_WIZARD: {
        code: "FLAG_ANTI_WIZARD",
        sdesc: "FLAG_ANTI_WIZARD",
        ldesc: "Item cannot be used by wizards",
        do_not_use: false
    },
    FLAG_ANTI_ROGUE: {
        code: "FLAG_ANTI_ROGUE",
        sdesc: "FLAG_ANTI_ROGUE",
        ldesc: "Item cannot be used by rogues",
        do_not_use: false
    },
    FLAG_ANTI_WARRIOR: {
        code: "FLAG_ANTI_WARRIOR",
        sdesc: "FLAG_ANTI_WARRIOR",
        ldesc: "Item cannot be used by warriors",
        do_not_use: false
    },
    FLAG_ANTI_PRIEST: {
        code: "FLAG_ANTI_PRIEST",
        sdesc: "FLAG_ANTI_PRIEST",
        ldesc: "Item cannot be used by priests",
        do_not_use: false
    },
    FLAG_NOSCRY: {
        code: "FLAG_NOSCRY",
        sdesc: "FLAG_NOSCRY",
        ldesc: "Item cannot be scryed for with spells.",
        do_not_use: false
    },
    FLAG_SHOPKEEPER: {
        code: "FLAG_SHOPKEEPER",
        sdesc: "FLAG_SHOPKEEPER",
        ldesc: "Used in hard code. Not for use by builders.",
        do_not_use: true
    },
    FLAG_METAL: {
        code: "FLAG_METAL",
        sdesc: "FLAG_METAL",
        ldesc: "No longer in use.",
        do_not_use: true
    },
    FLAG_CONCEALED: {
        code: "FLAG_CONCEALED",
        sdesc: "FLAG_CONCEALED",
        ldesc: "Only used on holy symbols with the conceal command",
        do_not_use: false
    },
    FLAG_DONATION: {
        code: "FLAG_DONATION",
        sdesc: "FLAG_DONATION",
        ldesc: "Do not use.",
        do_not_use: true
    },
    FLAG_POISONED: {
        code: "FLAG_POISONED",
        sdesc: "FLAG_POISONED",
        ldesc: "1/4 more damage",
        do_not_use: false
    },
    FLAG_COVERING: {
        code: "FLAG_COVERING",
        sdesc: "FLAG_COVERING",
        ldesc: "For containers 'look under'",
        do_not_use: false
    },
    FLAG_DEATHROT: {
        code: "FLAG_DEATHROT",
        sdesc: "FLAG_DEATHROT",
        ldesc: "Item disappears from corpse when the PC or moble dies",
        do_not_use: false
    },
    FLAG_PROTOTYPE: {
        code: "FLAG_PROTOTYPE",
        sdesc: "FLAG_PROTOTYPE",
        ldesc: "Used in OLC. Not to be used for offline building.",
        do_not_use: true
    },
    FLAG_BURIED: {
        code: "FLAG_BURIED",
        sdesc: "FLAG_BURIED",
        ldesc: "Item is underground",
        do_not_use: false
    },
    FLAG_PERMANENT: {
        code: "FLAG_PERMANENT",
        sdesc: "FLAG_PERMANENT",
        ldesc: "Item stays on the PC through death.",
        do_not_use: false
    },
    FLAG_TRANSPARENT: {
        code: "FLAG_TRANSPARENT",
        sdesc: "FLAG_TRANSPARENT",
        ldesc: "Items worn under this layer can be seen. Used for cloaks etc.",
        do_not_use: false
    },
    FLAG_UNIQUE: {
        code: "FLAG_UNIQUE",
        sdesc: "FLAG_UNIQUE",
        ldesc: "Prevents the PC from wearing more than one of a specific object.",
        do_not_use: false
    }
};

const OBJECT_QUALITY = {
    QUALITY_WORTHLESS: {
        code: "QUALITY_WORTHLESS",
        sdesc: "QUALITY_WORTHLESS"
    },
    QUALITY_INFERIOR: {
        code: "QUALITY_INFERIOR",
        sdesc: "QUALITY_INFERIOR"
    },
    QUALITY_LOW: {
        code: "QUALITY_LOW",
        sdesc: "QUALITY_LOW"
    },
    QUALITY_AVERAGE: {
        code: "QUALITY_AVERAGE",
        sdesc: "QUALITY_AVERAGE"
    },
    QUALITY_HIGH: {
        code: "QUALITY_HIGH",
        sdesc: "QUALITY_HIGH"
    },
    QUALITY_SUPERIOR: {
        code: "QUALITY_SUPERIOR",
        sdesc: "QUALITY_SUPERIOR"
    },
    QUALITY_OUTSTANDING: {
        code: "QUALITY_OUTSTANDING",
        sdesc: "QUALITY_OUTSTANDING"
    }
};

const OBJECT_MATERIALS = {
    MATERIAL_UNKNOWN: {
        code: "MATERIAL_UNKNOWN",
        sdesc: "MATERIAL_UNKNOWN"
    },
    MATERIAL_WOOD: {
        code: "MATERIAL_WOOD",
        sdesc: "MATERIAL_WOOD"
    },
    MATERIAL_OAK: {
        code: "MATERIAL_OAK",
        sdesc: "MATERIAL_OAK"
    },
    MATERIAL_YEW: {
        code: "MATERIAL_YEW",
        sdesc: "MATERIAL_YEW"
    },
    MATERIAL_EBONY: {
        code: "MATERIAL_EBONY",
        sdesc: "MATERIAL_EBONY"
    },
    MATERIAL_HARDWOOD: {
        code: "MATERIAL_HARDWOOD",
        sdesc: "MATERIAL_HARDWOOD"
    },
    MATERIAL_ICE: {
        code: "MATERIAL_ICE",
        sdesc: "MATERIAL_ICE"
    },
    MATERIAL_SOFTWOOD: {
        code: "MATERIAL_SOFTWOOD",
        sdesc: "MATERIAL_SOFTWOOD"
    },
    MATERIAL_FLESH: {
        code: "MATERIAL_FLESH",
        sdesc: "MATERIAL_FLESH"
    },
    MATERIAL_SILK: {
        code: "MATERIAL_SILK",
        sdesc: "MATERIAL_SILK"
    },
    MATERIAL_WOOL: {
        code: "MATERIAL_WOOL",
        sdesc: "MATERIAL_WOOL"
    },
    MATERIAL_CLOTH: {
        code: "MATERIAL_CLOTH",
        sdesc: "MATERIAL_CLOTH"
    },
    MATERIAL_FUR: {
        code: "MATERIAL_FUR",
        sdesc: "MATERIAL_FUR"
    },
    MATERIAL_WATER: {
        code: "MATERIAL_WATER",
        sdesc: "MATERIAL_WATER"
    },
    MATERIAL_METAL: {
        code: "MATERIAL_METAL",
        sdesc: "MATERIAL_METAL"
    },
    MATERIAL_SILVER: {
        code: "MATERIAL_SILVER",
        sdesc: "MATERIAL_SILVER"
    },
    MATERIAL_GOLD: {
        code: "MATERIAL_GOLD",
        sdesc: "MATERIAL_GOLD"
    },
    MATERIAL_STEEL: {
        code: "MATERIAL_STEEL",
        sdesc: "MATERIAL_STEEL"
    },
    MATERIAL_LEAD: {
        code: "MATERIAL_LEAD",
        sdesc: "MATERIAL_LEAD"
    },
    MATERIAL_BRONZE: {
        code: "MATERIAL_BRONZE",
        sdesc: "MATERIAL_BRONZE"
    },
    MATERIAL_COPPER: {
        code: "MATERIAL_COPPER",
        sdesc: "MATERIAL_COPPER"
    },
    MATERIAL_PLATINUM: {
        code: "MATERIAL_PLATINUM",
        sdesc: "MATERIAL_PLATINUM"
    },
    MATERIAL_TITANIUM: {
        code: "MATERIAL_TITANIUM",
        sdesc: "MATERIAL_TITANIUM"
    },
    MATERIAL_ALUMINIUM: {
        code: "MATERIAL_ALUMINIUM",
        sdesc: "MATERIAL_ALUMINIUM"
    },
    MATERIAL_TIN: {
        code: "MATERIAL_TIN",
        sdesc: "MATERIAL_TIN"
    },
    MATERIAL_IRON: {
        code: "MATERIAL_IRON",
        sdesc: "MATERIAL_IRON"
    },
    MATERIAL_BRASS: {
        code: "MATERIAL_BRASS",
        sdesc: "MATERIAL_BRASS"
    },
    MATERIAL_DIAMOND: {
        code: "MATERIAL_DIAMOND",
        sdesc: "MATERIAL_DIAMOND"
    },
    MATERIAL_PEARL: {
        code: "MATERIAL_PEARL",
        sdesc: "MATERIAL_PEARL"
    },
    MATERIAL_GEM: {
        code: "MATERIAL_GEM",
        sdesc: "MATERIAL_GEM"
    },
    MATERIAL_RUBY: {
        code: "MATERIAL_RUBY",
        sdesc: "MATERIAL_RUBY"
    },
    MATERIAL_OBSIDIAN: {
        code: "MATERIAL_OBSIDIAN",
        sdesc: "MATERIAL_OBSIDIAN"
    },
    MATERIAL_IVORY: {
        code: "MATERIAL_IVORY",
        sdesc: "MATERIAL_IVORY"
    },
    MATERIAL_MITHRIL: {
        code: "MATERIAL_MITHRIL",
        sdesc: "MATERIAL_MITHRIL"
    },
    MATERIAL_ADAMANTIUM: {
        code: "MATERIAL_ADAMANTIUM",
        sdesc: "MATERIAL_ADAMANTIUM"
    },
    MATERIAL_ENERGY: {
        code: "MATERIAL_ENERGY",
        sdesc: "MATERIAL_ENERGY"
    },
    MATERIAL_GLASS: {
        code: "MATERIAL_GLASS",
        sdesc: "MATERIAL_GLASS"
    },
    MATERIAL_PAPER: {
        code: "MATERIAL_PAPER",
        sdesc: "MATERIAL_PAPER"
    },
    MATERIAL_MARBLE: {
        code: "MATERIAL_MARBLE",
        sdesc: "MATERIAL_MARBLE"
    },
    MATERIAL_PLANT: {
        code: "MATERIAL_PLANT",
        sdesc: "MATERIAL_PLANT"
    },
    MATERIAL_STONE: {
        code: "MATERIAL_STONE",
        sdesc: "MATERIAL_STONE"
    },
    MATERIAL_HIDE: {
        code: "MATERIAL_HIDE",
        sdesc: "MATERIAL_HIDE"
    },
    MATERIAL_BONE: {
        code: "MATERIAL_BONE",
        sdesc: "MATERIAL_BONE"
    },
    MATERIAL_POWDER: {
        code: "MATERIAL_POWDER",
        sdesc: "MATERIAL_POWDER"
    },
    MATERIAL_LEATHER: {
        code: "MATERIAL_LEATHER",
        sdesc: "MATERIAL_LEATHER"
    },
    MATERIAL_OIL: {
        code: "MATERIAL_OIL",
        sdesc: "MATERIAL_OIL"
    },
    MATERIAL_ELVEN: {
        code: "MATERIAL_ELVEN",
        sdesc: "MATERIAL_ELVEN"
    },
    MATERIAL_ELECTRUM: {
        code: "MATERIAL_ELECTRUM",
        sdesc: "MATERIAL_ELECTRUM"
    },
    MATERIAL_EMERALD: {
        code: "MATERIAL_EMERALD",
        sdesc: "MATERIAL_EMERALD"
    },
    MATERIAL_SAPPHIRE: {
        code: "MATERIAL_SAPPHIRE",
        sdesc: "MATERIAL_SAPPHIRE"
    },
    MATERIAL_COLD_IRON: {
        code: "MATERIAL_COLD_IRON",
        sdesc: "MATERIAL_COLD_IRON"
    },
    MATERIAL_DRAGON_HIDE: {
        code: "MATERIAL_DRAGON_HIDE",
        sdesc: "MATERIAL_DRAGON_HIDE"
    },
    MATERIAL_DARKWOOD: {
        code: "MATERIAL_DARKWOOD",
        sdesc: "MATERIAL_DARKWOOD"
    },
    MATERIAL_ALCHEMICAL_SILVER: {
        code: "MATERIAL_ALCHEMICAL_SILVER",
        sdesc: "MATERIAL_ALCHEMICAL_SILVER"
    }
};

const OBJECT_CONDITION = {
    COND_TERRIBLE: {
        code: "COND_TERRIBLE",
        sdesc: "COND_TERRIBLE"
    },
    COND_AWFUL: {
        code: "COND_AWFUL",
        sdesc: "COND_AWFUL"
    },
    COND_VERY_BAD: {
        code: "COND_VERY_BAD",
        sdesc: "COND_VERY_BAD"
    },
    COND_BAD: {
        code: "COND_BAD",
        sdesc: "COND_BAD"
    },
    COND_USABLE: {
        code: "COND_USABLE",
        sdesc: "COND_USABLE"
    },
    COND_GOOD: {
        code: "COND_GOOD",
        sdesc: "COND_GOOD"
    },
    COND_VERY_GOOD: {
        code: "COND_VERY_GOOD",
        sdesc: "COND_VERY_GOOD"
    },
    COND_SUPERB: {
        code: "COND_SUPERB",
        sdesc: "COND_SUPERB"
    },
    COND_PERFECT: {
        code: "COND_PERFECT",
        sdesc: "COND_PERFECT"
    }
};

const OBJECT_SIZES = {
    SIZE_TINY: {
        code: "SIZE_TINY",
        sdesc: "SIZE_TINY"
    },
    SIZE_SMALL: {
        code: "SIZE_SMALL",
        sdesc: "SIZE_SMALL"
    },
    SIZE_MEDIUM: {
        code: "SIZE_MEDIUM",
        sdesc:"SIZE_MEDIUM" 
    },
    SIZE_LARGE: {
        code: "SIZE_LARGE",
        sdesc: "SIZE_LARGE"
    },
    SIZE_HUGE: {
        code: "SIZE_HUGE",
        sdesc: "SIZE_HUGE"
    },
    SIZE_GIANT: {
        code: "SIZE_GIANT",
        sdesc: "SIZE_GIANT"
    }
};

const OBJECT_APPLIES = {
    APPLY_STR: {
        code: "APPLY_STR",
        sdesc: "APPLY_STR",
        ldesc: "Adds or takes away strength.",
        do_not_use: false
    },
    APPLY_DEX: {
        code: "APPLY_DEX",
        sdesc: "APPLY_DEX",
        ldesc: "Adds or takes away from dexterity",
        do_not_use: false
    },
    APPLY_INT: {
        code: "APPLY_INT",
        sdesc: "APPLY_INT",
        ldesc: "Adds or takes away from intelligence",
        do_not_use: false
    },
    APPLY_WIS: {
        code: "APPLY_WIS",
        sdesc: "APPLY_WIS",
        ldesc: "Adds or takes away from wisdom",
        do_not_use: false
    },
    APPLY_CON: {
        code: "APPLY_CON",
        sdesc: "APPLY_CON",
        ldesc: "Adds or takes away from constitution",
        do_not_use: false
    },
    APPLY_SEX: {
        code: "APPLY_SEX",
        sdesc: "APPLY_SEX",
        ldesc: "Changes the sex of the PC by the value",
        do_not_use: false
    },
    APPLY_CLASS: {
        code: "APPLY_CLASS",
        sdesc: "APPLY_CLASS",
        ldesc: "Do not use",
        do_not_use: true
    },
    APPLY_LEVEL: {
        code: "APPLY_LEVEL",
        sdesc: "APPLY_LEVEL",
        ldesc: "Do not use",
        do_not_use: true
    },
    APPLY_AGE: {
        code: "APPLY_AGE",
        sdesc: "APPLY_AGE",
        ldesc: "Do not use",
        do_not_use: true
    },
    APPLY_HEIGHT: {
        code: "APPLY_HEIGHT",
        sdesc: "APPLY_HEIGHT",
        ldesc: "Adds to or takes away from the height of the character",
        do_not_use: false
    },
    APPLY_WEIGHT: {
        code: "APPLY_WEIGHT",
        sdesc: "APPLY_WEIGHT",
        ldesc: "Adds to or takes away from the characters weight. (Not the weight carried)",
        do_not_use: false
    },
    APPLY_MANA: {
        code: "APPLY_MANA",
        sdesc: "APPLY_MANA",
        ldesc: "Adds to or takes away from the character's total mana",
        do_not_use: false
    },
    APPLY_HIT: {
        code: "APPLY_HIT",
        sdesc: "APPLY_HIT",
        ldesc: "Adds to or takes away from the total hitpoints of the character",
        do_not_use: false
    },
    APPLY_MOVE: {
        code: "APPLY_MOVE",
        sdesc: "APPLY_MOVE",
        ldesc: "Adds to or takes away from the total stamina/move of the character",
        do_not_use: false
    },
    APPLY_VALUE: {
        code: "APPLY_VALUE",
        sdesc: "APPLY_VALUE",
        ldesc: "Adds to or takes value from an object. This is measured in Copper.",
        do_not_use: false
    },
    APPLY_EXP: {
        code: "APPLY_EXP",
        sdesc: "APPLY_EXP",
        ldesc: "Do not use",
        do_not_use: true
    },
    APPLY_AC: {
        code: "APPLY_AC",
        sdesc: "APPLY_AC",
        ldesc: "Affects the character/s armor class. Negative value improves armour class, a postitive value degrades armour class",
        do_not_use: false
    },
    APPLY_HITROLL: {
        code: "APPLY_HITROLL",
        sdesc: "APPLY_HITROLL",
        ldesc: "Adds or takes away hitroll to/from a weapon",
        do_not_use: false
    },
    APPLY_DAMROLL: {
        code: "APPLY_DAMROLL",
        sdesc: "APPLY_DAMROLL",
        ldesc: "Adds or takes away dammroll from a weapon",
        do_not_use: false
    },
    APPLY_RANGE: {
        code: "APPLY_RANGE",
        sdesc: "APPLY_RANGE",
        ldesc: "Allows the character to shoot or throw further or less, by the number of rooms specified",
        do_not_use: false
    },
    APPLY_BOWS: {
        code: "APPLY_BOWS",
        sdesc: "APPLY_BOWS",
        ldesc: "Adds or takes away from the characters bow skill",
        do_not_use: false
    },
    APPLY_SAP: {
        code: "APPLY_SAP",
        sdesc: "APPLY_SAP",
        ldesc: "Adds or takes away from the characters sap skill",
        do_not_use: false
    },
    APPLY_BRAWLING: {
        code: "APPLY_BRAWLING",
        sdesc: "APPLY_BRAWLING",
        ldesc: "Adds or takes away from the characters brawling skill",
        do_not_use: false
    },
    APPLY_APPRAISE: {
        code: "APPLY_APPRAISE",
        sdesc: "APPLY_APPRAISE",
        ldesc: "Adds or takes away from the characters appraise skill",
        do_not_use: false
    },
    APPLY_CHA: {
        code: "APPLY_CHA",
        sdesc: "APPLY_CHA",
        ldesc: "Adds to or takes away from a PC's charisma",
        do_not_use: false
    },
    APPLY_AFFECT: {
        code: "APPLY_AFFECT",
        sdesc: "APPLY_AFFECT",
        ldesc: "Used to apply AFF_ flags. Character remains affected while the object is worn.",
        do_not_use: false
    },
    APPLY_RESISTANT: {
        code: "APPLY_RESISTANT",
        sdesc: "APPLY_RESISTANT",
        ldesc: "No longer in use. Do not use.",
        do_not_use: true
    },
    APPLY_IMMUNE: {
        code: "APPLY_IMMUNE",
        sdesc: "APPLY_IMMUNE",
        ldesc: "No longer in use. Do not use.",
        do_not_use: true
    },
    APPLY_SUSCEPTIBLE: {
        code: "APPLY_SUSCEPTIBLE",
        sdesc: "APPLY_SUSCEPTIBLE",
        ldesc: "No longer in use. Do not use.",
        do_not_use: true
    },
    APPLY_WEAPONSPELL: {
        code: "APPLY_WEAPONSPELL",
        sdesc: "APPLY_WEAPONSPELL",
        ldesc: "Casts a spell when hitting use SPELL_ 100 % of the time.",
        do_not_use: false
    },
    APPLY_LCK: {
        code: "APPLY_LCK",
        sdesc: "APPLY_LCK",
        ldesc: "Adds to or takes away from luck",
        do_not_use: false
    },
    APPLY_BACKSTAB: {
        code: "APPLY_BACKSTAB",
        sdesc: "APPLY_BACKSTAB",
        ldesc: "Adds to or takes away from the backstab skill",
        do_not_use: false
    },
    APPLY_PICK: {
        code: "APPLY_PICK",
        sdesc: "APPLY_PICK",
        ldesc: "Adds to or takes away from the pick locks skill",
        do_not_use: false
    },
    APPLY_TRACK: {
        code: "APPLY_TRACK",
        sdesc: "APPLY_TRACK",
        ldesc: "Adds to or takes away from the track skill",
        do_not_use: false
    },
    APPLY_STEAL: {
        code: "APPLY_STEAL",
        sdesc: "APPLY_STEAL",
        ldesc: "Adds to or takes away from the steal skill",
        do_not_use: false
    },
    APPLY_SNEAK: {
        code: "APPLY_SNEAK",
        sdesc: "APPLY_SNEAK",
        ldesc: "Adds to or takes away from the sneak skill",
        do_not_use: false
    },
    APPLY_HIDE: {
        code: "APPLY_HIDE",
        sdesc: "APPLY_HIDE",
        ldesc: "Adds to or takes away from the hide skill",
        do_not_use: false
    },
    APPLY_PALM: {
        code: "APPLY_PALM",
        sdesc: "APPLY_PALM",
        ldesc: "Not coded. Do not use.",
        do_not_use: true
    },
    APPLY_DETRAP: {
        code: "APPLY_DETRAP",
        sdesc: "APPLY_DETRAP",
        ldesc: "Adds to or takes away from the detrap skill",
        do_not_use: false
    },
    APPLY_DODGE: {
        code: "APPLY_DODGE",
        sdesc: "APPLY_DODGE",
        ldesc: "Adds to or takes away from the dodge skill",
        do_not_use: false
    },
    APPLY_PEEK: {
        code: "APPLY_PEEK",
        sdesc: "APPLY_PEEK",
        ldesc: "Adds to or takes away from the peek skill",
        do_not_use: false
    },
    APPLY_SCAN: {
        code: "APPLY_SCAN",
        sdesc: "APPLY_SCAN",
        ldesc: "No longer used",
        do_not_use: true
    },
    APPLY_GOUGE: {
        code: "APPLY_GOUGE",
        sdesc: "APPLY_GOUGE",
        ldesc: "Adds to or takes away from the gouge skill",
        do_not_use: false
    },
    APPLY_SEARCH: {
        code: "APPLY_SEARCH",
        sdesc: "APPLY_SEARCH",
        ldesc: "Adds to or takes away from the search skill",
        do_not_use: false
    },
    APPLY_MOUNT: {
        code: "APPLY_MOUNT",
        sdesc: "APPLY_MOUNT",
        ldesc: "Adds to or takes away from the mount skill",
        do_not_use: false
    },
    APPLY_DISARM: {
        code: "APPLY_DISARM",
        sdesc: "APPLY_DISARM",
        ldesc: "Adds to or takes away from the disarm skill",
        do_not_use: false
    },
    APPLY_KICK: {
        code: "APPLY_KICK",
        sdesc: "APPLY_KICK",
        ldesc: "Adds to or takes away from the kick skill",
        do_not_use: false
    },
    APPLY_PARRY: {
        code: "APPLY_PARRY",
        sdesc: "APPLY_PARRY",
        ldesc: "Adds to or takes away from the parry skill",
        do_not_use: false
    },
    APPLY_BASH: {
        code: "APPLY_BASH",
        sdesc: "APPLY_BASH",
        ldesc: "Adds to or takes away from the bash skill",
        do_not_use: false
    },
    APPLY_STUN: {
        code: "APPLY_STUN",
        sdesc: "APPLY_STUN",
        ldesc: "Adds to or takes away from the stun skill",
        do_not_use: false
    },
    APPLY_PUNCH: {
        code: "APPLY_PUNCH",
        sdesc: "APPLY_PUNCH",
        ldesc: "Adds to or takes away from the punch skill",
        do_not_use: false
    },
    APPLY_CLIMB: {
        code: "APPLY_CLIMB",
        sdesc: "APPLY_CLIMB",
        ldesc: "Adds to or takes away from the climb skill",
        do_not_use: false
    },
    APPLY_GRIP: {
        code: "APPLY_GRIP",
        sdesc: "APPLY_GRIP",
        ldesc: "Adds to or takes away from the grip skill",
        do_not_use: false
    },
    APPLY_SCRIBE: {
        code: "APPLY_SCRIBE",
        sdesc: "APPLY_SCRIBE",
        ldesc: "Adds to or takes away from the scribe skill",
        do_not_use: false
    },
    APPLY_BREW: {
        code: "APPLY_BREW",
        sdesc: "APPLY_BREW",
        ldesc: "Adds to or takes away from the brew potions skill",
        do_not_use: false
    },
    APPLY_WEARSPELL: {
        code: "APPLY_WEARSPELL",
        sdesc: "APPLY_WEARSPELL",
        ldesc: "Used to apply SPELL_ spell affects. Spell is applied to wearer when object is worn, and will wear off like a normal spell.",
        do_not_use: false
    },
    APPLY_REMOVESPELL: {
        code: "APPLY_REMOVESPELL",
        sdesc: "APPLY_REMOVESPELL",
        ldesc: "When object is removed, the SPELL_ affects the character.",
        do_not_use: false
    },
    APPLY_EMOTION: {
        code: "APPLY_EMOTION",
        sdesc: "APPLY_EMOTION",
        ldesc: "Adds to or takes away from a PC's emotional state",
        do_not_use: false
    },
    APPLY_MENTALSTATE: {
        code: "APPLY_MENTALSTATE",
        sdesc: "APPLY_MENTALSTATE",
        ldesc: "Adds to or takes away from a PC's mental state",
        do_not_use: false
    },
    APPLY_STRIPSN: {
        code: "APPLY_STRIPSN",
        sdesc: "APPLY_STRIPSN",
        ldesc: "Use SPELL_ here.",
        do_not_use: false
    },
    APPLY_REMOVE: {
        code: "APPLY_REMOVE",
        sdesc: "APPLY_REMOVE",
        ldesc: "Use AFF_ flags here. Removes the affect upon wearing the object.",
        do_not_use: false
    },
    APPLY_DIG: {
        code: "APPLY_DIG",
        sdesc: "APPLY_DIG",
        ldesc: "Adds to or takes away from a PC's dig skill",
        do_not_use: false
    },
    APPLY_FULL: {
        code: "APPLY_FULL",
        sdesc: "APPLY_FULL",
        ldesc: "Affects the hours until the PC is hungry",
        do_not_use: false
    },
    APPLY_THIRST: {
        code: "APPLY_THIRST",
        sdesc: "APPLY_THIRST",
        ldesc: "Affects the hours until the PC is thirsty",
        do_not_use: false
    },
    APPLY_DRUNK: {
        code: "APPLY_DRUNK",
        sdesc: "APPLY_DRUNK",
        ldesc: "Affects the hours until the PC is sober",
        do_not_use: false
    },
    APPLY_BLOOD: {
        code: "APPLY_BLOOD",
        sdesc: "APPLY_BLOOD",
        ldesc: "Do not use.",
        do_not_use: true
    },
    APPLY_HAGGLE: {
        code: "APPLY_HAGGLE",
        sdesc: "APPLY_HAGGLE",
        ldesc: "Increases or decreases the characters haggle skill.",
        do_not_use: false
    },
    APPLY_OBJWEIGHT: {
        code: "APPLY_OBJWEIGHT",
        sdesc: "APPLY_OBJWEIGHT",
        ldesc: "Increases or decreases the weight of the object.",
        do_not_use: false
    },
    APPLY_RESIST_MAGIC: {
        code: "APPLY_RESIST_MAGIC",
        sdesc: "APPLY_RESIST_MAGIC",
        ldesc: "Wearing of the object affects the characters resistance to magic",
        do_not_use: false
    },
    APPLY_RESIST_FIRE: {
        code: "APPLY_RESIST_FIRE",
        sdesc: "APPLY_RESIST_FIRE",
        ldesc: "Wearing of the object affects the characters resistance to fire",
        do_not_use: false
    },
    APPLY_RESIST_COLD: {
        code: "APPLY_RESIST_COLD",
        sdesc: "APPLY_RESIST_COLD",
        ldesc: "Wearing of the object affects the characters resistance to cold",
        do_not_use: false
    },
    APPLY_RESIST_ELECTRICITY: {
        code: "APPLY_RESIST_ELECTRICITY",
        sdesc: "APPLY_RESIST_ELECTRICITY",
        ldesc: "Wearing of the object affects the characters resistance to electricity",
        do_not_use: false
    },
    APPLY_RESIST_ENERGY: {
        code: "APPLY_RESIST_ENERGY",
        sdesc: "APPLY_RESIST_ENERGY",
        ldesc: "Wearing of the object affects the characters resistance to energy",
        do_not_use: false
    },
    APPLY_RESIST_ACID: {
        code: "APPLY_RESIST_ACID",
        sdesc: "APPLY_RESIST_ACID",
        ldesc: "Wearing of the object affects the characters resistance to acid",
        do_not_use: false
    },
    APPLY_RESIST_POISON: {
        code: "APPLY_RESIST_POISON",
        sdesc: "APPLY_RESIST_POISON",
        ldesc: "Wearing of the object affects the characters resistance to poison",
        do_not_use: false
    },
    APPLY_RESIST_DRAIN: {
        code: "APPLY_RESIST_DRAIN",
        sdesc: "APPLY_RESIST_DRAIN",
        ldesc: "Wearing of the object affects the characters resistance to drain",
        do_not_use: false
    },
    APPLY_RESIST_HOLD: {
        code: "APPLY_RESIST_HOLD",
        sdesc: "APPLY_RESIST_HOLD",
        ldesc: "Wearing of the object affects the characters resistance to hold spells",
        do_not_use: false
    },
    APPLY_RESIST_PHYSICAL: {
        code: "APPLY_RESIST_PHYSICAL",
        sdesc: "APPLY_RESIST_PHYSICAL",
        ldesc: "Wearing of the object affects the characters resistance to physical attacks",
        do_not_use: false
    },
    APPLY_RESIST_HEALING: {
        code: "APPLY_RESIST_HEALING",
        sdesc: "APPLY_RESIST_HEALING",
        ldesc: "Wearing of the object affects the characters resistance to healing",
        do_not_use: false
    },
    APPLY_RESIST_MIND: {
        code: "APPLY_RESIST_MIND",
        sdesc: "APPLY_RESIST_MIND",
        ldesc: "Wearing of the object affects the characters resistance to mind spells and attacks",
        do_not_use: false
    },
    APPLY_RESIST_BASH: {
        code: "APPLY_RESIST_BASH",
        sdesc: "APPLY_RESIST_BASH",
        ldesc: "Wearing of the object affects the characters resistance to bash",
        do_not_use: false
    },
    APPLY_RESIST_PIERCE: {
        code: "APPLY_RESIST_PIERCE",
        sdesc: "APPLY_RESIST_PIERCE",
        ldesc: "Wearing of the object affects the characters resistance to piercing weapons",
        do_not_use: false
    },
    APPLY_RESIST_SLASH: {
        code: "APPLY_RESIST_SLASH",
        sdesc: "APPLY_RESIST_SLASH",
        ldesc: "Wearing of the object affects the characters resistance to slashing weapons",
        do_not_use: false
    },
    APPLY_RESIST_NONMAGIC: {
        code: "APPLY_RESIST_NONMAGIC",
        sdesc: "APPLY_RESIST_NONMAGIC",
        ldesc: "Wearing of the object affects the characters resistance to non magical attacks",
        do_not_use: false
    },
    APPLY_MAGIC: {
        code: "APPLY_MAGIC",
        sdesc: "APPLY_MAGIC",
        ldesc: "Wearing of the object increases magic damage",
        do_not_use: false
    },
    APPLY_FIRE: {
        code: "APPLY_FIRE",
        sdesc: "APPLY_FIRE",
        ldesc: "Wearing of the object increases fire damage",
        do_not_use: false
    },
    APPLY_COLD: {
        code: "APPLY_COLD",
        sdesc: "APPLY_COLD",
        ldesc: "Wearing of the object increases cold damage",
        do_not_use: false
    },
    APPLY_ELECTRICITY: {
        code: "APPLY_ELECTRICITY",
        sdesc: "APPLY_ELECTRICITY",
        ldesc: "Wearing of the object increases electrical damage",
        do_not_use: false
    },
    APPLY_ENERGY: {
        code: "APPLY_ENERGY",
        sdesc: "APPLY_ENERGY",
        ldesc: "Wearing of the object increases energy damage",
        do_not_use: false
    },
    APPLY_ACID: {
        code: "APPLY_ACID",
        sdesc: "APPLY_ACID",
        ldesc: "Wearing of the object increases acid damage",
        do_not_use: false
    },
    APPLY_POISON: {
        code: "APPLY_POISON",
        sdesc: "APPLY_POISON",
        ldesc: "Wearing of the object increases poison damage",
        do_not_use: false
    },
    APPLY_DRAIN: {
        code: "APPLY_DRAIN",
        sdesc: "APPLY_DRAIN",
        ldesc: "Wearing of the object increases drain damage",
        do_not_use: false
    },
    APPLY_HEALING: {
        code: "APPLY_HEALING",
        sdesc: "APPLY_HEALING",
        ldesc: "Wearing of the object increases healing",
        do_not_use: false
    },
    APPLY_PHYSICAL: {
        code: "APPLY_PHYSICAL",
        sdesc: "APPLY_PHYSICAL",
        ldesc: "Wearing of the object increases physical damage",
        do_not_use: false
    },
    APPLY_MIND: {
        code: "APPLY_MIND",
        sdesc: "APPLY_MIND",
        ldesc: "Wearing of the object increases mind damage",
        do_not_use: false
    },
    APPLY_BLUDGEON: {
        code: "APPLY_BLUDGEON",
        sdesc: "APPLY_BLUDGEON",
        ldesc: "Wearing of the object increases bludgeon damage",
        do_not_use: false
    },
    APPLY_PIERCE: {
        code: "APPLY_PIERCE",
        sdesc: "APPLY_PIERCE",
        ldesc: "Wearing of the object increases piercing damage",
        do_not_use: false
    },
    APPLY_SLASH: {
        code: "APPLY_SLASH",
        sdesc: "APPLY_SLASH",
        ldesc: "Wearing of the object increases slashing damage",
        do_not_use: false
    },
    APPLY_WEAPONSPELL_ONE: {
        code: "APPLY_WEAPONSPELL_ONE",
        sdesc: "APPLY_WEAPONSPELL_ONE",
        ldesc: "Casts a spell when hitting use SPELL_ 10 % of the time.",
        do_not_use: false
    },
    APPLY_WEAPONSPELL_TWO: {
        code: "APPLY_WEAPONSPELL_TWO",
        sdesc: "APPLY_WEAPONSPELL_TWO",
        ldesc: "Casts a spell when hitting use SPELL_ 25 % of the time.",
        do_not_use: false
    },
    APPLY_WEAPONSPELL_FIVE: {
        code: "APPLY_WEAPONSPELL_FIVE",
        sdesc: "APPLY_WEAPONSPELL_FIVE",
        ldesc: "Casts a spell when hitting use SPELL_ 50 % of the time.",
        do_not_use: false
    },
    APPLY_DUAL_WIELD: {
        code: "APPLY_DUAL_WIELD",
        sdesc: "APPLY_DUAL_WIELD",
        ldesc: "Increases or decreases the dual wield skill",
        do_not_use: false
    },
    APPLY_DISGUISE: {
        code: "APPLY_DISGUISE",
        sdesc: "APPLY_DISGUISE",
        ldesc: "Increases or decreases the disguise skill",
        do_not_use: false
    },
    APPLY_LEVEL_ONE_SPELL_SLOTS: {
        code: "APPLY_LEVEL_ONE_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_ONE_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 1 spell slots",
        do_not_use: false
    },
    APPLY_LEVEL_TWO_SPELL_SLOTS: {
        code: "APPLY_LEVEL_TWO_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_TWO_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 2 spell slots",
        do_not_use: false
    },
    APPLY_LEVEL_THREE_SPELL_SLOTS: {
        code: "APPLY_LEVEL_THREE_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_THREE_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 3 spell slots",
        do_not_use: false
    },
    APPLY_LEVEL_FOUR_SPELL_SLOTS: {
        code: "APPLY_LEVEL_FOUR_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_FOUR_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 4 spell slots",
        do_not_use: false
    },
    APPLY_LEVEL_FIVE_SPELL_SLOTS: {
        code: "APPLY_LEVEL_FIVE_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_FIVE_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 5 spell slots",
        do_not_use: false
    },
    APPLY_LEVEL_SIX_SPELL_SLOTS: {
        code: "APPLY_LEVEL_SIX_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_SIX_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 6 spell slots",
        do_not_use: false
    },
    APPLY_LEVEL_SEVEN_SPELL_SLOTS: {
        code: "APPLY_LEVEL_SEVEN_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_SEVEN_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 7 spell slots",
        do_not_use: false
    },
    APPLY_LEVEL_EIGHT_SPELL_SLOTS: {
        code: "APPLY_LEVEL_EIGHT_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_EIGHT_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 8 spell slots",
        do_not_use: false
    },
    APPLY_LEVEL_NINE_SPELL_SLOTS: {
        code: "APPLY_LEVEL_NINE_SPELL_SLOTS",
        sdesc: "APPLY_LEVEL_NINE_SPELL_SLOTS",
        ldesc: "Increases or decreases the number of level 9 spell slots",
        do_not_use: false
    },
    APPLY_EXHAUSTION_MENTAL_STATE: {
        code: "APPLY_EXHAUSTION_MENTAL_STATE",
        sdesc: "APPLY_EXHAUSTION_MENTAL_STATE",
        ldesc: "Modifies the exhaustion mental state of the wearer (100 for dead tired, 0 for normal)",
        do_not_use: false
    },
    APPLY_SANITY_MENTAL_STATE: {
        code: "APPLY_SANITY_MENTAL_STATE",
        sdesc: "APPLY_SANITY_MENTAL_STATE",
        ldesc: "Modifies the sanity mental state of the wearer (100 for mad, 0 for normal)",
    }
};

const WEAPON_FLAGS = {
    WFLAG_ARROW_DEFLECTION: {
        code: "WFLAG_ARROW_DEFLECTION",
        sdesc: "WFLAG_ARROW_DEFLECTION",
        ldesc: "Acts as if the PC has the arrow deflection feat while wielding a weapon",
        do_not_use: true
    },
    WFLAG_REFLECTIVE: {
        code: "WFLAG_REFLECTIVE",
        sdesc: "WFLAG_REFLECTIVE",
        ldesc: "Weapon will reflect spells back at the caster",
        do_not_use: true
    },
    WFLAG_BANE: {
        code: "WFLAG_BANE",
        sdesc: "WFLAG_BANE",
        ldesc: "Increased modifiers against a specific race",
        do_not_use: true
    },
    WFLAG_DISRUPTION: {
        code: "WFLAG_DISRUPTION",
        sdesc: "WFLAG_DISRUPTION",
        ldesc: "Critical hits have a chance of destroying undead - doing 2-4 times normal damage",
        do_not_use: true
    },
    WFLAG_RETURNING: {
        code: "WFLAG_RETURNING",
        sdesc: "WFLAG_RETURNING",
        ldesc: "Thrown weapons or projectiles to the PC's inventory after use",
        do_not_use: true
    },
    WFLAG_SPEED: {
        code: "WFLAG_SPEED",
        sdesc: "WFLAG_SPEED",
        ldesc: "Increased number of attacks",
        do_not_use: true
    },
    WFLAG_THROWING: {
        code: "WFLAG_THROWING",
        sdesc: "WFLAG_THROWING",
        ldesc: "A normally unthrown weapon has the ability to be thrown",
        do_not_use: true
    },
    WFLAG_WOUNDING: {
        code: "WFLAG_WOUNDING",
        sdesc: "WFLAG_WOUNDING",
        ldesc: "Causes the victim to bleed",
        do_not_use: true
    },
    WFLAG_VENOMOUS: {
        code: "WFLAG_VENOMOUS",
        sdesc: "WFLAG_VENOMOUS",
        ldesc: "The weapon is always poisonous, it does not need poison to be reapplied",
        do_not_use: true
    },
    WFLAG_SMITING: {
        code: "WFLAG_SMITING",
        sdesc: "WFLAG_SMITING",
        ldesc: "Critical hit gives the weapon a chance of destroying constructs",
        do_not_use: true
    },
    WFLAG_VAMPIRIC: {
        code: "WFLAG_VAMPIRIC",
        sdesc: "WFLAG_VAMPIRIC",
        ldesc: "The weapon will give hitpoints to the wielder and take them from the victim",
        do_not_use: true
    },
    WFLAG_KEEN: {
        code: "WFLAG_KEEN",
        sdesc: "WFLAG_KEEN",
        ldesc: "Increased critical threat range",
        do_not_use: true
    },
    WFLAG_VORPAL: {
        code: "WFLAG_VORPAL",
        sdesc: "WFLAG_VORPAL",
        ldesc: "Chance of severing limbs",
        do_not_use: true
    },
    WFLAG_BACKSTABBING: {
        code: "WFLAG_BACKSTABBING",
        sdesc: "WFLAG_BACKSTABBING",
        ldesc: "Increased damage from backstabs",
        do_not_use: true
    },
    WFLAG_HOLY: {
        code: "WFLAG_HOLY",
        sdesc: "WFLAG_HOLY",
        ldesc: "Increased damage to undead and outsiders",
        do_not_use: true
    },
    WFLAG_DEFENDER: {
        code: "WFLAG_DEFENDER",
        sdesc: "WFLAG_DEFENDER",
        ldesc: "Increased AC",
        do_not_use: true
    }
};

const WEAPON_TYPES = {
    WEAPON_TYPE_BASTARD_SWORD: {
        code: "WEAPON_TYPE_BASTARD_SWORD",
        sdesc: "WEAPON_TYPE_BASTARD_SWORD",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_BATTLE_AXE: {
        code: "WEAPON_TYPE_BATTLE_AXE",
        sdesc: "WEAPON_TYPE_BATTLE_AXE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_BLACKJACK: {
        code: "WEAPON_TYPE_BLACKJACK",
        sdesc: "WEAPON_TYPE_BLACKJACK",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_BOAR_SPEAR: {
        code: "WEAPON_TYPE_BOAR_SPEAR",
        sdesc: "WEAPON_TYPE_BOAR_SPEAR",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_BOLA: {
        code: "WEAPON_TYPE_BOLA",
        sdesc: "WEAPON_TYPE_BOLA",
        projectile: false,
        thrown: true,
        exotic: true
    },
    WEAPON_TYPE_BOOMERANG: {
        code: "WEAPON_TYPE_BOOMERANG",
        sdesc: "WEAPON_TYPE_BOOMERANG",
        projectile: false,
        thrown: true,
        exotic: true
    },
    WEAPON_TYPE_BROAD_SWORD: {
        code: "WEAPON_TYPE_BROAD_SWORD",
        sdesc: "WEAPON_TYPE_BROAD_SWORD",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_CAT_O_NINE_TAILS: {
        code: "WEAPON_TYPE_CAT_O_NINE_TAILS",
        sdesc: "WEAPON_TYPE_CAT_O_NINE_TAILS",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_FULLBLADE: {
        code: "WEAPON_TYPE_FULLBLADE",
        sdesc: "WEAPON_TYPE_FULLBLADE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_CLUB: {
        code: "WEAPON_TYPE_CLUB",
        sdesc: "WEAPON_TYPE_CLUB",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_COMPOSITE_BOW: {
        code: "WEAPON_TYPE_COMPOSITE_BOW",
        sdesc: "WEAPON_TYPE_COMPOSITE_BOW",
        projectile: true,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_GREATCLUB: {
        code: "WEAPON_TYPE_GREATCLUB",
        sdesc: "WEAPON_TYPE_GREATCLUB",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_CUTLASS: {
        code: "WEAPON_TYPE_CUTLASS",
        sdesc: "WEAPON_TYPE_CUTLASS",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_DAGGER: {
        code: "WEAPON_TYPE_DAGGER",
        sdesc: "WEAPON_TYPE_DAGGER",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_DARTS: {
        code: "WEAPON_TYPE_DARTS",
        sdesc: "WEAPON_TYPE_DARTS",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_DIRK: {
        code: "WEAPON_TYPE_DIRK",
        sdesc: "WEAPON_TYPE_DIRK",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_FALCHION: {
        code: "WEAPON_TYPE_FALCHION",
        sdesc: "WEAPON_TYPE_FALCHION",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_FLAIL: {
        code: "WEAPON_TYPE_FLAIL",
        sdesc: "WEAPON_TYPE_FLAIL",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_FISHING_NET: {
        code: "WEAPON_TYPE_FISHING_NET",
        sdesc: "WEAPON_TYPE_FISHING_NET",
        projectile: false,
        thrown: true,
        exotic: true
    },
    WEAPON_TYPE_FOIL: {
        code: "WEAPON_TYPE_FOIL",
        sdesc: "WEAPON_TYPE_FOIL",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_GLADIATOR_NET: {
        code: "WEAPON_TYPE_GLADIATOR_NET",
        sdesc: "WEAPON_TYPE_GLADIATOR_NET",
        projectile: false,
        thrown: true,
        exotic: true
    },
    WEAPON_TYPE_HALBERD: {
        code: "WEAPON_TYPE_HALBERD",
        sdesc: "WEAPON_TYPE_HALBERD",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_HANDAXE: {
        code: "WEAPON_TYPE_HANDAXE",
        sdesc: "WEAPON_TYPE_HANDAXE",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_HEAVY_CROSSBOW: {
        code: "WEAPON_TYPE_HEAVY_CROSSBOW",
        sdesc: "WEAPON_TYPE_HEAVY_CROSSBOW",
        projectile: true,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_HARPOON: {
        code: "WEAPON_TYPE_HARPOON",
        sdesc: "WEAPON_TYPE_HARPOON",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_JAVELIN: {
        code: "WEAPON_TYPE_JAVELIN",
        sdesc: "WEAPON_TYPE_JAVELIN",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_JO: {
        code: "WEAPON_TYPE_JO",
        sdesc: "WEAPON_TYPE_JO",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_KATANA: {
        code: "WEAPON_TYPE_KATANA",
        sdesc: "WEAPON_TYPE_KATANA",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_LANCE: {
        code: "WEAPON_TYPE_LANCE",
        sdesc: "WEAPON_TYPE_LANCE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_LASSO: {
        code: "WEAPON_TYPE_LASSO",
        sdesc: "WEAPON_TYPE_LASSO",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_LIGHT_CROSSBOW: {
        code: "WEAPON_TYPE_LIGHT_CROSSBOW",
        sdesc: "WEAPON_TYPE_LIGHT_CROSSBOW",
        projectile: true,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_LONG_BOW: {
        code: "WEAPON_TYPE_LONG_BOW",
        sdesc: "WEAPON_TYPE_LONG_BOW",
        projectile: true,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_LONG_SWORD: {
        code: "WEAPON_TYPE_LONG_SWORD",
        sdesc: "WEAPON_TYPE_LONG_SWORD",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_MACE: {
        code: "WEAPON_TYPE_MACE",
        sdesc: "WEAPON_TYPE_MACE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_MAIN_GAUCHE: {
        code: "WEAPON_TYPE_MAIN_GAUCHE",
        sdesc: "WEAPON_TYPE_MAIN_GAUCHE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_MORNING_STAR: {
        code: "WEAPON_TYPE_MORNING_STAR",
        sdesc: "WEAPON_TYPE_MORNING_STAR",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_NAGINATA: {
        code: "WEAPON_TYPE_NAGINATA",
        sdesc: "WEAPON_TYPE_NAGINATA",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_NUNCHAKU: {
        code: "WEAPON_TYPE_NUNCHAKU",
        sdesc: "WEAPON_TYPE_NUNCHAKU",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_PICK: {
        code: "WEAPON_TYPE_PICK",
        sdesc: "WEAPON_TYPE_PICK",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_PILUM: {
        code: "WEAPON_TYPE_PILUM",
        sdesc: "WEAPON_TYPE_PILUM",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_QUARTERSTAFF: {
        code: "WEAPON_TYPE_QUARTERSTAFF",
        sdesc: "WEAPON_TYPE_QUARTERSTAFF",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_RAPIER: {
        code: "WEAPON_TYPE_RAPIER",
        sdesc: "WEAPON_TYPE_RAPIER",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_SABRE: {
        code: "WEAPON_TYPE_SABRE",
        sdesc: "WEAPON_TYPE_SABRE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_SAI: {
        code: "WEAPON_TYPE_SAI",
        sdesc: "WEAPON_TYPE_SAI",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_SCIMITAR: {
        code: "WEAPON_TYPE_SCIMITAR",
        sdesc: "WEAPON_TYPE_SCIMITAR",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_SHORT_BOW: {
        code: "WEAPON_TYPE_SHORT_BOW",
        sdesc: "WEAPON_TYPE_SHORT_BOW",
        projectile: true,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_SHORT_SWORD: {
        code: "WEAPON_TYPE_SHORT_SWORD",
        sdesc: "WEAPON_TYPE_SHORT_SWORD",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_SHURIKEN: {
        code: "WEAPON_TYPE_SHURIKEN",
        sdesc: "WEAPON_TYPE_SHURIKEN",
        projectile: false,
        thrown: true,
        exotic: true
    },
    WEAPON_TYPE_SLING: {
        code: "WEAPON_TYPE_SLING",
        sdesc: "WEAPON_TYPE_SLING",
        projectile: true,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_SPEAR: {
        code: "WEAPON_TYPE_SPEAR",
        sdesc: "WEAPON_TYPE_SPEAR",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_STAFF_SLING: {
        code: "WEAPON_TYPE_STAFF_SLING",
        sdesc: "WEAPON_TYPE_STAFF_SLING",
        projectile: true,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_TOMAHAWK: {
        code: "WEAPON_TYPE_TOMAHAWK",
        sdesc: "WEAPON_TYPE_TOMAHAWK",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_TONFA: {
        code: "WEAPON_TYPE_TONFA",
        sdesc: "WEAPON_TYPE_TONFA",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_TRIDENT: {
        code: "WEAPON_TYPE_TRIDENT",
        sdesc: "WEAPON_TYPE_TRIDENT",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_GREATSWORD: {
        code: "WEAPON_TYPE_GREATSWORD",
        sdesc: "WEAPON_TYPE_GREATSWORD",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_LIGHT_HAMMER: {
        code: "WEAPON_TYPE_LIGHT_HAMMER",
        sdesc: "WEAPON_TYPE_LIGHT_HAMMER",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_WARHAMMER: {
        code: "WEAPON_TYPE_WARHAMMER",
        sdesc: "WEAPON_TYPE_WARHAMMER",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_WHIP: {
        code: "WEAPON_TYPE_WHIP",
        sdesc: "WEAPON_TYPE_WHIP",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_KNIFE: {
        code: "WEAPON_TYPE_KNIFE",
        sdesc: "WEAPON_TYPE_KNIFE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_SICKLE: {
        code: "WEAPON_TYPE_SICKLE",
        sdesc: "WEAPON_TYPE_SICKLE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_SCYTHE: {
        code: "WEAPON_TYPE_SCYTHE",
        sdesc: "WEAPON_TYPE_SCYTHE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_BOULDER: {
        code: "WEAPON_TYPE_BOULDER",
        sdesc: "WEAPON_TYPE_BOULDER",
        projectile: false,
        thrown: true,
        exotic: false
    },
    WEAPON_TYPE_CESTUS: {
        code: "WEAPON_TYPE_CESTUS",
        sdesc: "WEAPON_TYPE_CESTUS",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_GREATAXE: {
        code: "WEAPON_TYPE_GREATAXE",
        sdesc: "WEAPON_TYPE_GREATAXE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_LIGHT_MACE: {
        code: "WEAPON_TYPE_LIGHT_MACE",
        sdesc: "WEAPON_TYPE_LIGHT_MACE",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_DWARVEN_WARAXE: {
        code: "WEAPON_TYPE_DWARVEN_WARAXE",
        sdesc: "WEAPON_TYPE_DWARVEN_WARAXE",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_SPIKED_CHAIN: {
        code: "WEAPON_TYPE_SPIKED_CHAIN",
        sdesc: "WEAPON_TYPE_SPIKED_CHAIN",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_KAMA: {
        code: "WEAPON_TYPE_KAMA",
        sdesc: "WEAPON_TYPE_KAMA",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_SIANGHAM: {
        code: "WEAPON_TYPE_SIANGHAM",
        sdesc: "WEAPON_TYPE_SIANGHAM",
        projectile: false,
        thrown: false,
        exotic: true
    },
    WEAPON_TYPE_KUKRI: {
        code: "WEAPON_TYPE_KUKRI",
        sdesc: "WEAPON_TYPE_KUKRI",
        projectile: false,
        thrown: false,
        exotic: false
    },
    WEAPON_TYPE_LIGHT_PICK: {
        code: "WEAPON_TYPE_LIGHT_PICK",
        sdesc: "WEAPON_TYPE_LIGHT_PICK",
        projectile: false,
        thrown: false,
        exotic: false
    }
};

const CONTAINER_FLAGS = {
    CONT_CLOSEABLE: {
        code: 1,
        sdesc: "CONT_CLOSEABLE"
    },
    CONT_PICKPROOF: {
        code: 2,
        sdesc: "CONT_PICKPROOF"
    },
    CONT_CLOSED: {
        code: 4,
        sdesc: "CONT_CLOSED"
    },
    CONT_LOCKED: {
        code: 8,
        sdesc: "CONT_LOCKED"
    }
};

const BODY_TYPES = {
    HUMANOID: {
        code: "0",
        sdesc: "BODY_TYPE_HUMANOID"
    }
}

const ARMOR_TYPES = {
    ARMOR_TYPE_NONE: {
        code: "ARMOR_TYPE_NONE",
        sdesc: "ARMOR_TYPE_NONE"
    },
    ARMOR_TYPE_BANDED: {
        code: "ARMOR_TYPE_BANDED",
        sdesc: "ARMOR_TYPE_BANDED"
    },
    ARMOR_TYPE_BRIGANDINE: {
        code: "ARMOR_TYPE_BRIGANDINE",
        sdesc: "ARMOR_TYPE_BRIGANDINE"
    },
    ARMOR_TYPE_CHAIN_MAIL: {
        code: "ARMOR_TYPE_CHAIN_MAIL",
        sdesc: "ARMOR_TYPE_CHAIN_MAIL"
    },
    ARMOR_TYPE_HALF_PLATE: {
        code: "ARMOR_TYPE_HALF_PLATE",
        sdesc: "ARMOR_TYPE_HALF_PLATE"
    },
    ARMOR_TYPE_FULL_PLATE: {
        code: "ARMOR_TYPE_FULL_PLATE",
        sdesc: "ARMOR_TYPE_FULL_PLATE"
    },
    ARMOR_TYPE_HIDE: {
        code: "ARMOR_TYPE_HIDE",
        sdesc: "ARMOR_TYPE_HIDE"
    },
    ARMOR_TYPE_LEATHER: {
        code: "ARMOR_TYPE_LEATHER",
        sdesc: "ARMOR_TYPE_LEATHER"
    },
    ARMOR_TYPE_PADDED: {
        code: "ARMOR_TYPE_PADDED",
        sdesc: "ARMOR_TYPE_PADDED"
    },
    ARMOR_TYPE_RING_MAIL: {
        code: "ARMOR_TYPE_RING_MAIL",
        sdesc: "ARMOR_TYPE_RING_MAIL"
    },
    ARMOR_TYPE_SCALE_MAIL: {
        code: "ARMOR_TYPE_SCALE_MAIL",
        sdesc: "ARMOR_TYPE_SCALE_MAIL"
    },
    ARMOR_TYPE_SPLINT_MAIL: {
        code: "ARMOR_TYPE_SPLINT_MAIL",
        sdesc: "ARMOR_TYPE_SPLINT_MAIL"
    },
    ARMOR_TYPE_STUDDED_LEATHER: {
        code: "ARMOR_TYPE_STUDDED_LEATHER",
        sdesc: "ARMOR_TYPE_STUDDED_LEATHER"
    },
    ARMOR_TYPE_CLOTH: {
        code: "ARMOR_TYPE_CLOTH",
        sdesc: "ARMOR_TYPE_CLOTH"
    },
    ARMOR_TYPE_BUCKLER: {
        code: "ARMOR_TYPE_BUCKLER",
        sdesc: "ARMOR_TYPE_BUCKLER"
    },
    ARMOR_TYPE_WOODEN_LIGHT_SHIELD: {
        code: "ARMOR_TYPE_WOODEN_LIGHT_SHIELD",
        sdesc: "ARMOR_TYPE_WOODEN_LIGHT_SHIELD"
    },
    ARMOR_TYPE_WOODEN_HEAVY_SHIELD: {
        code: "ARMOR_TYPE_WOODEN_HEAVY_SHIELD",
        sdesc: "ARMOR_TYPE_WOODEN_HEAVY_SHIELD"
    },
    ARMOR_TYPE_METAL_LIGHT_SHIELD: {
        code: "ARMOR_TYPE_METAL_LIGHT_SHIELD",
        sdesc: "ARMOR_TYPE_METAL_LIGHT_SHIELD"
    },
    ARMOR_TYPE_METAL_HEAVY_SHIELD: {
        code: "ARMOR_TYPE_METAL_HEAVY_SHIELD",
        sdesc: "ARMOR_TYPE_METAL_HEAVY_SHIELD"
    },
    ARMOR_TYPE_TOWER_SHIELD: {
        code: "ARMOR_TYPE_TOWER_SHIELD",
        sdesc: "ARMOR_TYPE_TOWER_SHIELD"
    },
    ARMOR_TYPE_CHAIN_SHIRT: {
        code: "ARMOR_TYPE_CHAIN_SHIRT",
        sdesc: "ARMOR_TYPE_CHAIN_SHIRT"
    }
};

const FURNITURE_STATES = {
    FURNITURE_CHAIR: {
        code: "FURNITURE_CHAIR",
        sdesc: "FURNITURE_CHAIR"
    },
    FURNITURE_BED: {
        code: "FURNITURE_BED",
        sdesc: "FURNITURE_BED"
    },
    FURNITURE_LECTERN: {
        code: "FURNITURE_LECTERN",
        sdesc: "FURNITURE_LECTERN"
    },
    FURNITURE_ALTAR: {
        code: "FURNITURE_ALTAR",
        sdesc: "FURNITURE_ALTAR"
    }
};

const DRINK_TYPES = {
    LIQ_WATER: {
        code: "LIQ_WATER",
        sdesc: "LIQ_WATER"
    },
    LIQ_BEER: {
        code: "LIQ_BEER",
        sdesc: "LIQ_BEER"
    },
    LIQ_WINE: {
        code: "LIQ_WINE",
        sdesc: "LIQ_WINE"
    },
    LIQ_ALE: {
        code: "LIQ_ALE",
        sdesc: "LIQ_ALE"
    },
    LIQ_DARK_ALE: {
        code: "LIQ_DARK_ALE",
        sdesc: "LIQ_DARK_ALE"
    },
    LIQ_WHISKEY: {
        code: "LIQ_WHISKEY",
        sdesc: "LIQ_WHISKEY"
    },
    LIQ_JUICE: {
        code: "LIQ_JUICE",
        sdesc: "LIQ_JUICE"
    },
    LIQ_SPIRITS: {
        code: "LIQ_SPIRITS",
        sdesc: "LIQ_SPIRITS"
    },
    LIQ_PORT: {
        code: "LIQ_PORT",
        sdesc: "LIQ_PORT"
    },
    LIQ_SLIME_MOLD: {
        code: "LIQ_SLIME_MOLD",
        sdesc: "LIQ_SLIME_MOLD"
    },
    LIQ_MILK: {
        code: "LIQ_MILK",
        sdesc: "LIQ_MILK"
    },
    LIQ_TEA: {
        code: "LIQ_TEA",
        sdesc: "LIQ_TEA"
    },
    LIQ_COFFEE: {
        code: "LIQ_COFFEE",
        sdesc: "LIQ_COFFEE"
    },
    LIQ_BLOOD: {
        code: "LIQ_BLOOD",
        sdesc: "LIQ_BLOOD"
    },
    LIQ_SALTWATER: {
        code: "LIQ_SALTWATER",
        sdesc: "LIQ_SALTWATER"
    },
    LIQ_COLA: {
        code: "LIQ_COLA",
        sdesc: "LIQ_COLA"
    },
    LIQ_MEAD: {
        code: "LIQ_MEAD",
        sdesc: "LIQ_MEAD"
    },
    LIQ_GROG: {
        code: "LIQ_GROG",
        sdesc: "LIQ_GROG"
    }
};

const HERB_TYPES = {
    NOT_POISONED: {
        code: "NOT_POISONED",
        sdesc: "NOT_POISONED"
    },
    HERB_PIPEWEED: {
        code: "HERB_PIPEWEED",
        sdesc: "HERB_PIPEWEED"
    },
    HERB_DHAT: {
        code: "HERB_DHAT",
        sdesc: "HERB_DHAT"
    },
    HERB_DWALE: {
        code: "HERB_DWALE",
        sdesc: "HERB_DWALE"
    },
    HERB_KONEION: {
        code: "HERB_KONEION",
        sdesc: "HERB_KONEION"
    },
    HERB_MONKSHOOD: {
        code: "HERB_MONKSHOOD",
        sdesc: "HERB_MONKSHOOD"
    },
    HERB_CATNIP: {
        code: "HERB_CATNIP",
        sdesc: "HERB_CATNIP"
    },
    HERB_CANDLESTICK_PLANT: {
        code: "HERB_CANDLESTICK_PLANT",
        sdesc: "HERB_CANDLESTICK_PLANT"
    },
    HERB_ADDERS_TONGUE: {
        code: "HERB_ADDERS_TONGUE",
        sdesc: "HERB_ADDERS_TONGUE"
    },
    HERB_ALLCURE: {
        code: "HERB_ALLCURE",
        sdesc: "HERB_ALLCURE"
    },
    HERB_ALOE: {
        code: "HERB_ALOE",
        sdesc: "HERB_ALOE"
    },
    HERB_ARNICA: {
        code: "HERB_ARNICA",
        sdesc: "HERB_ARNICA"
    },
    HERB_BLOODROOT: {
        code: "HERB_BLOODROOT",
        sdesc: "HERB_BLOODROOT"
    },
    HERB_COMFREY: {
        code: "HERB_COMFREY",
        sdesc: "HERB_COMFREY"
    },
    HERB_DWALE: {
        code: "HERB_DWALE",
        sdesc: "HERB_DWALE"
    },
    HERB_ECHINACEA: {
        code: "HERB_ECHINACEA",
        sdesc: "HERB_ECHINACEA"
    },
    HERB_WOUNDWORT: {
        code: "HERB_WOUNDWORT",
        sdesc: "HERB_WOUNDWORT"
    },
    HERB_WORMWOOD: {
        code: "HERB_WORMWOOD",
        sdesc: "HERB_WORMWOOD"
    },
    HERB_ALL_SAINTS_WORT: {
        code: "HERB_ALL_SAINTS_WORT",
        sdesc: "HERB_ALL_SAINTS_WORT"
    },
    HERB_CURE_ALL: {
        code: "HERB_CURE_ALL",
        sdesc: "HERB_CURE_ALL"
    },
    HERB_SHANGNUM_MOSS: {
        code: "HERB_SHANGNUM_MOSS",
        sdesc: "HERB_SHANGNUM_MOSS"
    },
    HERB_MARSH_MALLOW: {
        code: "HERB_MARSH-MALLOW",
        sdesc: "HERB_MARSH-MALLOW"
    },
    HERB_LUNGWORT: {
        code: "HERB_LUNGWORT",
        sdesc: "HERB_LUNGWORT"
    },
    HERB_BIRTHWORT: {
        code: "HERB_BIRTHWORT",
        sdesc: "HERB_BIRTHWORT"
    },
    HERB_BUGSBANE: {
        code: "HERB_BUGSBANE",
        sdesc: "HERB_BUGSBANE"
    },
    HERB_SNAKESALVE: {
        code: "HERB_SNAKESALVE",
        sdesc: "HERB_SNAKESALVE"
    },
    HERB_SKULLCUP: {
        code: "HERB_SKULLCUP",
        sdesc: "HERB_SKULLCUP"
    },
    HERB_BING_LANG: {
        code: "HERB_BING_LANG",
        sdesc: "HERB_BING_LANG"
    },
    HERB_HEATHER: {
        code: "HERB_HEATHER",
        sdesc: "HERB_HEATHER"
    },
    HERB_HENBANE: {
        code: "HERB_HENBANE",
        sdesc: "HERB_HENBANE"
    },
    HERB_HUSHTHORN: {
        code: "HERB_HUSHTHORN",
        sdesc: "HERB_HUSHTHORN"
    },
    HERB_JUNIPER: {
        code: "HERB_JUNIPER",
        sdesc: "HERB_JUNIPER"
    },
    HERB_KOLO: {
        code: "HERB_KOLO",
        sdesc: "HERB_KOLO"
    },
    HERB_BILLBERRY: {
        code: "HERB_BILLBERRY",
        sdesc: "HERB_BILLBERRY"
    },
    HERB_DARKWEED: {
        code: "HERB_DARKWEED",
        sdesc: "HERB_DARKWEED"
    },
    HERB_GINKO: {
        code: "HERB_GINKO",
        sdesc: "HERB_GINKO"
    },
    HERB_WINTERSALVE: {
        code: "HERB_WINTERSALVE",
        sdesc: "HERB_WINTERSALVE"
    }
};

const COIN_TYPES = {
    COIN_COPPER: {
        code: "COIN_COPPER",
        sdesc: "COIN_COPPER"
    },
    COIN_SILVER: {
        code: "COIN_SILVER",
        sdesc: "COIN_SILVER"
    },
    COIN_ELECTRUM: {
        code: "COIN_ELECTRUM",
        sdesc: "COIN_ELECTRUM"
    },
    COIN_GOLD: {
        code: "COIN_GOLD",
        sdesc: "COIN_GOLD"
    },
    COIN_PLATINUM: {
        code: "COIN_PLATINUM",
        sdesc: "COIN_PLATINUM"
    }
};

const PIPE_FLAGS = {
    PIPE_EMPTY: {
        code: 0,
        sdesc: "PIPE_EMPTY",
    },
    PIPE_TAMPED: {
        code: "PIPE_TAMPED",
        sdesc: "PIPE_TAMPED",
    },
    PIPE_LIT: {
        code: "PIPE_LIT",
        sdesc: "PIPE_LIT",
    },
    PIPE_HOT: {
        code: "PIPE_HOT",
        sdesc: "PIPE_HOT",
    },
    PIPE_DIRTY: {
        code: "PIPE_DIRTY",
        sdesc: "PIPE_DIRTY",
    },
    PIPE_FILTHY: {
        code: "PIPE_FILTHY",
        sdesc: "PIPE_FILTHY",
    },
    PIPE_GOINGOUT: {
        code: "PIPE_GOINGOUT",
        sdesc: "PIPE_GOINGOUT",
    },
    PIPE_BURNT: {
        code: "PIPE_BURNT",
        sdesc: "PIPE_BURNT",
    },
    PIPE_FULLOFASH: {
        code: "PIPE_FULLOFASH",
        sdesc: "PIPE_FULLOFASH",
    }
};

const LANGUAGE_FLAGS = {
    LANG_COMMON: {
        code: "LANG_COMMON",
        sdesc: "LANG_COMMON"
    },
    LANG_ELVEN: {
        code: "LANG_ELVEN",
        sdesc: "LANG_ELVEN"
    },
    LANG_DWARVEN: {
        code: "LANG_DWARVEN",
        sdesc: "LANG_DWARVEN"
    },
    LANG_SYLVAN: {
        code: "LANG_SYLVAN",
        sdesc: "LANG_SYLVAN"
    },
    LANG_DARKSPEAK: {
        code: "LANG_DARKSPEAK",
        sdesc: "LANG_DARKSPEAK"
    },
    LANG_ORCISH: {
        code: "LANG_ORCISH",
        sdesc: "LANG_ORCISH"
    },
    LANG_ABYSSAL: {
        code: "LANG_ABYSSAL",
        sdesc: "LANG_ABYSSAL"
    },
    LANG_AQUAN: {
        code: "LANG_AQUAN",
        sdesc: "LANG_AQUAN"
    },
    LANG_INSECTOID: {
        code: "LANG_INSECTOID",
        sdesc: "LANG_INSECTOID"
    },
    LANG_AURAN: {
        code: "LANG_AURAN",
        sdesc: "LANG_AURAN"
    },
    LANG_GIANT: {
        code: "LANG_GIANT",
        sdesc: "LANG_GIANT"
    },
    LANG_DRACONIC: {
        code: "LANG_DRACONIC",
        sdesc: "LANG_DRACONIC"
    },
    LANG_THIEVES: {
        code: "LANG_THIEVES",
        sdesc: "LANG_THIEVES"
    },
    LANG_MAGICAL: {
        code: "LANG_MAGICAL",
        sdesc: "LANG_MAGICAL"
    },
    LANG_GOBLIN: {
        code: "LANG_GOBLIN",
        sdesc: "LANG_GOBLIN"
    },
    LANG_GOD: {
        code: "LANG_GOD",
        sdesc: "LANG_GOD"
    },
    LANG_ANCIENT: {
        code: "LANG_ANCIENT",
        sdesc: "LANG_ANCIENT"
    },
    LANG_HALFLING: {
        code: "LANG_HALFLING",
        sdesc: "LANG_HALFLING"
    },
    LANG_CLAN: {
        code: "LANG_CLAN",
        sdesc: "LANG_CLAN"
    },
    LANG_GNOLL: {
        code: "LANG_GNOLL",
        sdesc: "LANG_GNOLL"
    },
    LANG_GITH: {
        code: "LANG_GITH",
        sdesc: "LANG_GITH"
    },
    LANG_GNOME: {
        code: "LANG_GNOME",
        sdesc: "LANG_GNOME"
    },
    LANG_ANIMAL: {
        code: "LANG_ANIMAL",
        sdesc: "LANG_ANIMAL"
    },
    LANG_CELESTIAL: {
        code: "LANG_CELESTIAL",
        sdesc: "LANG_CELESTIAL"
    },
    LANG_IGNAN: {
        code: "LANG_IGNAN",
        sdesc: "LANG_IGNAN"
    },
    LANG_INFERNAL: {
        code: "LANG_INFERNAL",
        sdesc: "LANG_INFERNAL"
    },
    LANG_TERRAN: {
        code: "LANG_TERRAN",
        sdesc: "LANG_TERRAN"
    }
};

const LEVER_BUTTON_FLAGS = {
    TRIG_NONE: {
        code: "TRIG_NONE",
        sdesc: "TRIG_NONE",
        ldesc: "Use 0 when there are no triggers",
        do_not_use: false
    },
    TRIG_UP: {
        code: "TRIG_UP",
        sdesc: "TRIG_UP",
        ldesc: "Lever starts out in the up position",
        do_not_use: false
    },
    TRIG_UNLOCK: {
        code: "TRIG_UNLOCK",
        sdesc: "TRIG_UNLOCK",
        ldesc: "This will set a newly created exit or existing one to unlocked",
        do_not_use: false
    },
    TRIG_LOCK: {
        code: "TRIG_LOCK",
        sdesc: "TRIG_LOCK",
        ldesc: "This will set a newly crated exit or exiting one to locked",
        do_not_use: false
    },
    TRIG_D_NORTH: {
        code: "TRIG_D_NORTH",
        sdesc: "TRIG_D_NORTH",
        ldesc: "Sets the exit to open to the north",
        do_not_use: false
    },
    TRIG_D_SOUTH: {
        code: "TRIG_D_SOUTH",
        sdesc: "TRIG_D_SOUTH",
        ldesc: "Sets the exit to open to the south",
        do_not_use: false
    },
    TRIG_D_EAST: {
        code: "TRIG_D_EAST",
        sdesc: "TRIG_D_EAST",
        ldesc: "Sets the exit to open to the east",
        do_not_use: false
    },
    TRIG_D_WEST: {
        code: "TRIG_D_WEST",
        sdesc: "TRIG_D_WEST",
        ldesc: "Sets the exit to open to the west",
        do_not_use: false
    },
    TRIG_D_UP: {
        code: "TRIG_D_UP",
        sdesc: "TRIG_D_UP",
        ldesc: "Sets the exit open up",
        do_not_use: false
    },
    TRIG_D_DOWN: {
        code: "TRIG_D_DOWN",
        sdesc: "TRIG_D_DOWN",
        ldesc: "Sets the exit to open down",
        do_not_use: false
    },
    TRIG_DOOR: {
        code: "TRIG_DOOR",
        sdesc: "TRIG_DOOR",
        ldesc: "This is required to make any of the triggers utilising exits work",
        do_not_use: false
    },
    TRIG_CONTAINER: {
        code: "TRIG_CONTAINER",
        sdesc: "TRIG_CONTAINER",
        ldesc: "This trigger is not used",
        do_not_use: true
    },
    TRIG_OPEN: {
        code: "TRIG_OPEN",
        sdesc: "TRIG_OPEN",
        ldesc: "This trigger opens any door that is generated with other triggers",
        do_not_use: false
    },
    TRIG_CLOSE: {
        code: "TRIG_CLOSE",
        sdesc: "TRIG_CLOSE",
        ldesc: "This trigger closes any door that is generated with other exit triggers",
        do_not_use: false
    },
    TRIG_PASSAGE: {
        code: "TRIG_PASSAGE",
        sdesc: "TRIG_PASSAGE",
        ldesc: "This trigger is needed to create a new exit.",
        do_not_use: false
    },
    TRIG_OLOAD: {
        code: "TRIG_OLOAD",
        sdesc: "TRIG_OLOAD",
        ldesc: "Loads up an object. Value1 is the Room. Value2 is the mob number.",
        do_not_use: false
    },
    TRIG_MLOAD: {
        code: "TRIG_MLOAD",
        sdesc: "TRIG_MLOAD",
        ldesc: "Loads up a mobile. Value1 is the Room. Value2 is the mob number.",
        do_not_use: false
    },
    TRIG_TELEPORT: {
        code: "TRIG_TELEPORT",
        sdesc: "TRIG_TELEPORT",
        ldesc: "Teleports lever puller or button pusher to set vnum",
        do_not_use: false
    },
    TRIG_TELEPORTALL: {
        code: "TRIG_TELEPORTALL",
        sdesc: "TRIG_TELEPORTALL",
        ldesc: "Teleports everyone in the room to set vnum",
        do_not_use: false
    },
    TRIG_TELEPORTPLUS: {
        code: "TRIG_TELEPORTPLUS",
        sdesc: "TRIG_TELEPORTPLUS",
        ldesc: "This trigger is not used",
        do_not_use: true
    },
    TRIG_DEATH: {
        code: "TRIG_DEATH",
        sdesc: "TRIG_DEATH",
        ldesc: "This trigger is not used",
        do_not_use: true
    },
    TRIG_CAST: {
        code: "TRIG_CAST",
        sdesc: "TRIG_CAST",
        ldesc: "Casts a spell on lever/button pusher. Value1 needs to contain the spell number",
        do_not_use: false
    },
    TRIG_FAKEBLADE: {
        code: "TRIG_FAKEBLADE",
        sdesc: "TRIG_FAKEBLADE",
        ldesc: "This trigger is not used",
        do_not_use: true
    },
    TRIG_RANDFOUR: {
        code: "TRIG_RANDFOUR",
        sdesc: "TRIG_RANDFOUR",
        ldesc: "Randomises the existing exits of the vnum in value1 to NSEW. It will not add new exits, just change where the existing ones go.",
        do_not_use: false
    },
    TRIG_RANDSIX: {
        code: "TRIG_RANDSIX",
        sdesc: "TRIG_RANDSIX",
        ldesc: "Randomises the existing exits of the vnum in value1 to NSEWDU. It will not add new exits, just change where the existing ones go.",
        do_not_use: false
    },
    TRIG_TRAPDOOR: {
        code: "TRIG_TRAPDOOR",
        sdesc: "TRIG_TRAPDOOR",
        ldesc: "This trigger is not used",
        do_not_use: true
    },
    TRIG_ANOTHEROOM: {
        code: "TRIG_ANOTHEROOM",
        sdesc: "TRIG_ANOTHEROOM",
        ldesc: "This trigger is not used",
        do_not_use: true
    },
    TRIG_USEDIAL: {
        code: "TRIG_USEDIAL",
        sdesc: "TRIG_USEDIAL",
        ldesc: "This trigger is not used",
        do_not_use: true
    },
    TRIG_ABSOLUTEVNUM: {
        code: "TRIG_ABSOLUTEVNUM",
        sdesc: "TRIG_ABSOLUTEVNUM",
        ldesc: "This trigger is not used",
        do_not_use: true
    },
    TRIG_SHOWROOMDESC: {
        code: "TRIG_SHOWROOMDESC",
        sdesc: "TRIG_SHOWROOMDESC",
        ldesc: "Required in order to allow the teleported to know that they have been teleported",
        do_not_use: false
    },
    TRIG_AUTORETURN: {
        code: "TRIG_AUTORETURN",
        sdesc: "TRIG_AUTORETURN",
        ldesc: "This will make the trigger go back to the original position",
        do_not_use: false
    },
    TRIG_NOTRAP: {
        code: "TRIG_NOTRAP",
        sdesc: "TRIG_NOTRAP",
        ldesc: "Will bypass any traps on the exit if used. It allows for a trap to be on a door that will not trigger if the lever is used to open it instead of other means.",
        do_not_use: false
    }
};

const TRAP_TYPES = {
    TTYPE_NONE: {
        code: "TTYPE_NONE",
        sdesc: "TTYPE_NONE",
        ldesc: "No trap at all"
    },
    TTYPE_SPIKE_MINOR: {
        code: "TTYPE_SPIKE_MINOR",
        sdesc: "TTYPE_SPIKE_MINOR",
        ldesc: "a minor spike trap : 5d6/PIERCE on CHAR"
    },
    TTYPE_SPIKE_AVERAGE: {
        code: "TTYPE_SPIKE_AVERAGE",
        sdesc: "TTYPE_SPIKE_AVERAGE",
        ldesc: "an average spike trap : 10d6/PIERCE on CHAR"
    },
    TTYPE_SPIKE_STRONG: {
        code: "TTYPE_SPIKE_STRONG",
        sdesc: "TTYPE_SPIKE_STRONG",
        ldesc: "a strong spike trap : 15d6/PIERCE on CHAR"
    },
    TTYPE_SPIKE_DEADLY: {
        code: "TTYPE_SPIKE_DEADLY",
        sdesc: "TTYPE_SPIKE_DEADLY",
        ldesc: "a deadly spike trap : 25d6/PIERCE on CHAR"
    },
    TTYPE_BLADE_MINOR: {
        code: "TTYPE_BLADE_MINOR",
        sdesc: "TTYPE_BLADE_MINOR",
        ldesc: "a minor spinning blade trap : 5d6/SLASH on CHAR"
    },
    TTYPE_BLADE_AVERAGE: {
        code: "TTYPE_BLADE_AVERAGE",
        sdesc: "TTYPE_BLADE_AVERAGE",
        ldesc: "an average spinning blade trap : 10d6/SLASH on CHAR"
    },
    TTYPE_BLADE_STRONG: {
        code: "TTYPE_BLADE_STRONG",
        sdesc: "TTYPE_BLADE_STRONG",
        ldesc: "a strong spinning blade trap : 15d6/SLASH on CHAR"
    },
    TTYPE_BLADE_DEADLY: {
        code: "TTYPE_BLADE_DEADLY",
        sdesc: "TTYPE_BLADE_DEADLY",
        ldesc: "a deadly spinning blade trap : 25d6/SLASH on CHAR"
    },
    TTYPE_STONE_MINOR: {
        code: "TTYPE_STONE_MINOR",
        sdesc: "TTYPE_STONE_MINOR",
        ldesc: "a minor falling stone trap : 5d6/BASH on CHAR"
    },
    TTYPE_STONE_AVERAGE: {
        code: "TTYPE_STONE_AVERAGE",
        sdesc: "TTYPE_STONE_AVERAGE",
        ldesc: "an average falling stone trap : 10d6/BASH on CHAR"
    },
    TTYPE_STONE_STRONG: {
        code: "TTYPE_STONE_STRONG",
        sdesc: "TTYPE_STONE_STRONG",
        ldesc: "a strong falling stone trap : 15d6/BASH on CHAR"
    },
    TTYPE_STONE_DEADLY: {
        code: "TTYPE_STONE_DEADLY",
        sdesc: "TTYPE_STONE_DEADLY",
        ldesc: "a deadly falling stone trap : 25d6/BASH on CHAR"
    },
    TTYPE_ACID_MINOR: {
        code: "TTYPE_ACID_MINOR",
        sdesc: "TTYPE_ACID_MINOR",
        ldesc: "a minor acid trap : 5d8/ACID on CHAR"
    },
    TTYPE_ACID_AVERAGE: {
        code: "TTYPE_ACID_AVERAGE",
        sdesc: "TTYPE_ACID_AVERAGE",
        ldesc: "an average acid trap : 10d8/ACID on CHAR"
    },
    TTYPE_ACID_STRONG: {
        code: "TTYPE_ACID_STRONG",
        sdesc: "TTYPE_ACID_STRONG",
        ldesc: "a strong acid trap : 15d8/ACID on CHAR"
    },
    TTYPE_ACID_DEADLY: {
        code: "TTYPE_ACID_DEADLY",
        sdesc: "TTYPE_ACID_DEADLY",
        ldesc: "a deadly acid trap : 25d8/ACID on CHAR"
    },
    TTYPE_FROST_MINOR: {
        code: "TTYPE_FROST_MINOR",
        sdesc: "TTYPE_FROST_MINOR",
        ldesc: "a minor frost trap : 10d4/COLD on CHAR"
    },
    TTYPE_FROST_AVERAGE: {
        code: "TTYPE_FROST_AVERAGE",
        sdesc: "TTYPE_FROST_AVERAGE",
        ldesc: "an average frost trap : 20d4/COLD on CHAR"
    },
    TTYPE_FROST_STRONG: {
        code: "TTYPE_FROST_STRONG",
        sdesc: "TTYPE_FROST_STRONG",
        ldesc: "a strong frost trap : 30d4/COLD on CHAR"
    },
    TTYPE_FROST_DEADLY: {
        code: "TTYPE_FROST_DEADLY",
        sdesc: "TTYPE_FROST_DEADLY",
        ldesc: "a deadly frost trap : 50d4/COLD on CHAR"
    },
    TTYPE_FIRE_MINOR: {
        code: "TTYPE_FIRE_MINOR",
        sdesc: "TTYPE_FIRE_MINOR",
        ldesc: "a minor fire trap : 10d4/FIRE on CHAR"
    },
    TTYPE_FIRE_AVERAGE: {
        code: "TTYPE_FIRE_AVERAGE",
        sdesc: "TTYPE_FIRE_AVERAGE",
        ldesc: "an average fire trap : 20d4/FIRE on CHAR"
    },
    TTYPE_FIRE_STRONG: {
        code: "TTYPE_FIRE_STRONG",
        sdesc: "TTYPE_FIRE_STRONG",
        ldesc: "a strong fire trap : 30d4/FIRE on CHAR"
    },
    TTYPE_FIRE_DEADLY: {
        code: "TTYPE_FIRE_DEADLY",
        sdesc: "TTYPE_FIRE_DEADLY",
        ldesc: "a deadly fire trap : 50d4/FIRE on CHAR"
    },
    TTYPE_ELECTRICITY_MINOR: {
        code: "TTYPE_ELECTRICITY_MINOR",
        sdesc: "TTYPE_ELECTRICITY_MINOR",
        ldesc: "a minor electrical trap : 8d6/ELECTRICITY on CHAR"
    },
    TTYPE_ELECTRICITY_AVERAGE: {
        code: "TTYPE_ELECTRICITY_AVERAGE",
        sdesc: "TTYPE_ELECTRICITY_AVERAGE",
        ldesc: "an average electrical trap : 16d6/ELECTRICITY on CHAR"
    },
    TTYPE_ELECTRICITY_STRONG: {
        code: "TTYPE_ELECTRICITY_STRONG",
        sdesc: "TTYPE_ELECTRICITY_STRONG",
        ldesc: "a strong electrical trap : 25d6/ELECTRICITY on CHAR"
    },
    TTYPE_ELECTRICITY_DEADLY: {
        code: "TTYPE_ELECTRICITY_DEADLY",
        sdesc: "TTYPE_ELECTRICITY_DEADLY",
        ldesc: "a deadly electrical trap : 42d6/ELECTRICITY on CHAR"
    },
    TTYPE_NEG_ENERGY_MINOR: {
        code: "TTYPE_NEG_ENERGY_MINOR",
        sdesc: "TTYPE_NEG_ENERGY_MINOR",
        ldesc: "a minor negative energy trap : 8d8/HEALING on CHAR"
    },
    TTYPE_NEG_ENERGY_AVERAGE: {
        code: "TTYPE_NEG_ENERGY_AVERAGE",
        sdesc: "TTYPE_NEG_ENERGY_AVERAGE",
        ldesc: "an average negative energy trap : 16d8/HEALING on CHAR"
    },
    TTYPE_NEG_ENERGY_STRONG: {
        code: "TTYPE_NEG_ENERGY_STRONG",
        sdesc: "TTYPE_NEG_ENERGY_STRONG",
        ldesc: "a strong negative energy trap : 25d8/HEALING on CHAR"
    },
    TTYPE_NEG_ENERGY_DEADLY: {
        code: "TTYPE_NEG_ENERGY_DEADLY",
        sdesc: "TTYPE_NEG_ENERGY_DEADLY",
        ldesc: "a deadly negative energy trap : 42d8/HEALING on CHAR"
    },
    TTYPE_SPELL_RAZORBAIT: {
        code: "TTYPE_SPELL_RAZORBAIT",
        sdesc: "TTYPE_SPELL_RAZORBAIT",
        ldesc: "a razorbait spell trap"
    },
    TTYPE_SPELL_SWORDBAIT: {
        code: "TTYPE_SPELL_SWORDBAIT",
        sdesc: "TTYPE_SPELL_SWORDBAIT",
        ldesc: "a swordbait spell trap"
    },
    TTYPE_SPELL_WINTER_MIST: {
        code: "TTYPE_SPELL_WINTER_MIST",
        sdesc: "TTYPE_SPELL_WINTER_MIST",
        ldesc: "a winter mist spell trap"
    },
    TTYPE_SPELL_BLAZEBANE: {
        code: "TTYPE_SPELL_BLAZEBANE",
        sdesc: "TTYPE_SPELL_BLAZEBANE",
        ldesc: "a blazebane spell trap"
    },
    TTYPE_SPELL_CHARGED_BEACON: {
        code: "TTYPE_SPELL_CHARGED_BEACON",
        sdesc: "TTYPE_SPELL_CHARGED_BEACON",
        ldesc: "a charged beacon spell trap"
    },
    TTYPE_SPELL_WEAKEN: {
        code: "TTYPE_SPELL_WEAKEN",
        sdesc: "TTYPE_SPELL_WEAKEN",
        ldesc: "a weaken spell trap"
    },
    TTYPE_SPELL_FUMBLE: {
        code: "TTYPE_SPELL_FUMBLE",
        sdesc: "TTYPE_SPELL_FUMBLE",
        ldesc: "a fumble spell trap"
    },
    TTYPE_SPELL_CURSE: {
        code: "TTYPE_SPELL_CURSE",
        sdesc: "TTYPE_SPELL_CURSE",
        ldesc: "a curse spell trap"
    },
    TTYPE_SPELL_ILL_FORTUNE: {
        code: "TTYPE_SPELL_ILL_FORTUNE",
        sdesc: "TTYPE_SPELL_ILL_FORTUNE",
        ldesc: "an ill fortune spell trap"
    },
    TTYPE_SPELL_BLINDNESS: {
        code: "TTYPE_SPELL_BLINDNESS",
        sdesc: "TTYPE_SPELL_BLINDNESS",
        ldesc: "a blindness spell trap"
    },
    TTYPE_SPELL_ENTANGLE: {
        code: "TTYPE_SPELL_ENTANGLE",
        sdesc: "TTYPE_SPELL_ENTANGLE",
        ldesc: "an entangle spell trap"
    },
    TTYPE_SPELL_HOLD_MONSTER: {
        code: "TTYPE_SPELL_HOLD_MONSTER",
        sdesc: "TTYPE_SPELL_HOLD_MONSTER",
        ldesc: "a hold monster spell trap"
    },
    TTYPE_SPELL_RAINBOW_PATTERN: {
        code: "TTYPE_SPELL_RAINBOW_PATTERN",
        sdesc: "TTYPE_SPELL_RAINBOW_PATTERN",
        ldesc: "a rainbow pattern spell trap"
    },
    TTYPE_SPELL_COLOR_SPRAY: {
        code: "TTYPE_SPELL_COLOR_SPRAY",
        sdesc: "TTYPE_SPELL_COLOR_SPRAY",
        ldesc: "a color spray spell trap"
    },
    TTYPE_SPELL_FAERIE_FIRE: {
        code: "TTYPE_SPELL_FAERIE_FIRE",
        sdesc: "TTYPE_SPELL_FAERIE_FIRE",
        ldesc: "a faerie fire spell trap"
    },
    TTYPE_SPELL_POISON: {
        code: "TTYPE_SPELL_POISON",
        sdesc: "TTYPE_SPELL_POISON",
        ldesc: "a poison spell trap"
    },
    TTYPE_SPELL_DISPEL_MAGIC: {
        code: "TTYPE_SPELL_DISPEL_MAGIC",
        sdesc: "TTYPE_SPELL_DISPEL_MAGIC",
        ldesc: "a dispel magic spell trap"
    },
    TTYPE_SPELL_CAUSE_LIGHT: {
        code: "TTYPE_SPELL_CAUSE_LIGHT",
        sdesc: "TTYPE_SPELL_CAUSE_LIGHT",
        ldesc: "a cause light spell trap"
    },
    TTYPE_SPELL_CAUSE_SERIOUS: {
        code: "TTYPE_SPELL_CAUSE_SERIOUS",
        sdesc: "TTYPE_SPELL_CAUSE_SERIOUS",
        ldesc: "a cause serious spell trap"
    },
    TTYPE_SPELL_CAUSE_CRITICAL: {
        code: "TTYPE_SPELL_CAUSE_CRITICAL",
        sdesc: "TTYPE_SPELL_CAUSE_CRITICAL",
        ldesc: "a cause critical spell trap"
    },
    TTYPE_SPELL_HARM: {
        code: "TTYPE_SPELL_HARM",
        sdesc: "TTYPE_SPELL_HARM",
        ldesc: "a harm spell trap"
    },
    TTYPE_SPELL_SHOCKING_GRASP: {
        code: "TTYPE_SPELL_SHOCKING_GRASP",
        sdesc: "TTYPE_SPELL_SHOCKING_GRASP",
        ldesc: "a shocking grasp spell trap"
    },
    TTYPE_SPELL_BURNING_HANDS: {
        code: "TTYPE_SPELL_BURNING_HANDS",
        sdesc: "TTYPE_SPELL_BURNING_HANDS",
        ldesc: "a burning hands spell trap"
    },
    TTYPE_SPELL_CHILL_TOUCH: {
        code: "TTYPE_SPELL_CHILL_TOUCH",
        sdesc: "TTYPE_SPELL_CHILL_TOUCH",
        ldesc: "a chill touch spell trap"
    },
    TTYPE_SPELL_MAGIC_MISSILE: {
        code: "TTYPE_SPELL_MAGIC_MISSILE",
        sdesc: "TTYPE_SPELL_MAGIC_MISSILE",
        ldesc: "a magic missile spell trap"
    },
    TTYPE_SPELL_ACID_ARROW: {
        code: "TTYPE_SPELL_ACID_ARROW",
        sdesc: "TTYPE_SPELL_ACID_ARROW",
        ldesc: "an acid arrow spell trap"
    },
    TTYPE_SPELL_FLAME_ARROW: {
        code: "TTYPE_SPELL_FLAME_ARROW",
        sdesc: "TTYPE_SPELL_FLAME_ARROW",
        ldesc: "a flame arrow spell trap"
    },
    TTYPE_SPELL_FLAMESTRIKE: {
        code: "TTYPE_SPELL_FLAMESTRIKE",
        sdesc: "TTYPE_SPELL_FLAMESTRIKE",
        ldesc: "a flamestrike spell trap"
    },
    TTYPE_SPELL_PHOENIX_CLAW: {
        code: "TTYPE_SPELL_PHOENIX_CLAW",
        sdesc: "TTYPE_SPELL_PHOENIX_CLAW",
        ldesc: "a phoenix claw spell trap"
    },
    TTYPE_SPELL_FIREBALL: {
        code: "TTYPE_SPELL_FIREBALL",
        sdesc: "TTYPE_SPELL_FIREBALL",
        ldesc: "a fireball spell trap"
    },
    TTYPE_SPELL_SOUND_BURST: {
        code: "TTYPE_SPELL_SOUND_BURST",
        sdesc: "TTYPE_SPELL_SOUND_BURST",
        ldesc: "a sound burst spell trap"
    },
    TTYPE_SPELL_ACID_BLAST: {
        code: "TTYPE_SPELL_ACID_BLAST",
        sdesc: "TTYPE_SPELL_ACID_BLAST",
        ldesc: "an acid blast spell trap"
    },
    TTYPE_SPELL_LIGHTNING_BOLT: {
        code: "TTYPE_SPELL_LIGHTNING_BOLT",
        sdesc: "TTYPE_SPELL_LIGHTNING_BOLT",
        ldesc: "a lightning bolt spell trap"
    },
    TTYPE_SPELL_CHAIN_LIGHTNING: {
        code: "TTYPE_SPELL_CHAIN_LIGHTNING",
        sdesc: "TTYPE_SPELL_CHAIN_LIGHTNING",
        ldesc: "a chain lightning spell trap"
    },
    TTYPE_SPELL_CONE_OF_COLD: {
        code: "TTYPE_SPELL_CONE_OF_COLD",
        sdesc: "TTYPE_SPELL_CONE_OF_COLD",
        ldesc: "a cone of cold spell trap"
    },
    TTYPE_SPELL_ICE_STORM: {
        code: "TTYPE_SPELL_ICE_STORM",
        sdesc: "TTYPE_SPELL_ICE_STORM",
        ldesc: "an ice storm spell trap"
    },
    TTYPE_SPELL_ENERGY_DRAIN: {
        code: "TTYPE_SPELL_ENERGY_DRAIN",
        sdesc: "TTYPE_SPELL_ENERGY_DRAIN",
        ldesc: "an energy drain spell trap"
    },
    TTYPE_SPELL_PHANTASMAL_KILLER: {
        code: "TTYPE_SPELL_PHANTASMAL_KILLER",
        sdesc: "TTYPE_SPELL_PHANTASMAL_KILLER",
        ldesc: "a phantasmal killer spell trap"
    },
    TTYPE_SPELL_DISINTEGRATE: {
        code: "TTYPE_SPELL_DISINTEGRATE",
        sdesc: "TTYPE_SPELL_DISINTEGRATE",
        ldesc: "a disintegrate spell trap"
    }
};

const TRAP_TRIGGERS = {
    TRIGGER_NONE: {
        code: "TRIGGER_NONE",
        sdesc: "TRIGGER_NONE"
    },
    TRIGGER_GET: {
        code: "TRIGGER_GET",
        sdesc: "TRIGGER_GET"
    },
    TRIGGER_OPEN: {
        code: "TRIGGER_OPEN",
        sdesc: "TRIGGER_OPEN"
    },
    TRIGGER_SHOVE: {
        code: "TRIGGER_SHOVE",
        sdesc: "TRIGGER_SHOVE"
    },
    TRIGGER_PUT: {
        code: "TRIGGER_PUT",
        sdesc: "TRIGGER_PUT"
    },
    TRIGGER_EXAMINE: {
        code: "TRIGGER_EXAMINE",
        sdesc: "TRIGGER_EXAMINE"
    },
    TRIGGER_USE: {
        code: "TRIGGER_USE",
        sdesc: "TRIGGER_USE"
    },
    TRIGGER_UNLOCK: {
        code: "TRIGGER_UNLOCK",
        sdesc: "TRIGGER_UNLOCK"
    },
    TRIGGER_CLOSE: {
        code: "TRIGGER_CLOSE",
        sdesc: "TRIGGER_CLOSE"
    },
    TRIGGER_MOVE: {
        code: "TRIGGER_MOVE",
        sdesc: "TRIGGER_MOVE"
    },
    TRIGGER_PICK: {
        code: "TRIGGER_PICK",
        sdesc: "TRIGGER_PICK"
    }
};

const ITEM_TYPES = {
    ITEM_TYPE_LIGHT: {
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
            type: VALUE_TYPES.INT,
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
    },
    ITEM_TYPE_SCROLL: {
        code: "ITEM_TYPE_SCROLL",
        sdesc: "ITEM_TYPE_SCROLL",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spell(s) (The level of the spell determines the cost. For scrolls that are sold make the spell level high. For scrolls that are found make the spell level low.)",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 1",
        },
        value2: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 2",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 3",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_WAND: {
        code: "ITEM_TYPE_WAND",
        sdesc: "ITEM_TYPE_WAND",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: null,
            ldesc: "spell number",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_STAFF: {
        code: "ITEM_TYPE_STAFF",
        sdesc: "ITEM_TYPE_STAFF",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: VALUE_TYPES.POS_INT,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_WEAPON: {
        code: "ITEM_TYPE_WEAPON",
        sdesc: "ITEM_TYPE_WEAPON",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: WEAPON_FLAGS,
            ldesc: "weapon flag",
        },
        value2: {
            type: VALUE_TYPES.STRING,
            type_enum: null,
            ldesc: "weapon flag modifiers",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: WEAPON_TYPES,
            ldesc: "Weapon Type",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_SHEATH: {
        code: "ITEM_TYPE_SHEATH",
        sdesc: "ITEM_TYPE_SHEATH",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: VALUE_TYPES.SUM_FLAGS,
            type_enum: CONTAINER_FLAGS,
            ldesc: "container flags",
        },
        value2: {
            type: VALUE_TYPES.VNUM,
            type_enum: VNUM_TYPES.OBJECT,
            ldesc: "key vnum",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: VALUE_TYPES.FLAG,
            type_enum: OBJECT_LAYERS,
            ldesc: "layers",
        },
    },
    ITEM_TYPE_TREASURE: {
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
            type: VALUE_TYPES.FLAG,
            type_enum: OBJECT_LAYERS,
            ldesc: "layers",
        },
    },
    ITEM_TYPE_ARMOR: {
        code: "ITEM_TYPE_ARMOR",
        sdesc: "ITEM_TYPE_ARMOR",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: BODY_TYPES,
            ldesc: "body type (lesson pending)",
        },
        value2: {
            type: VALUE_TYPES.FLAG,
            type_enum: OBJECT_LAYERS,
            ldesc: "layers",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: ARMOR_TYPES,
            ldesc: "Armor type",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_POTION: {
        code: "ITEM_TYPE_POTION",
        sdesc: "ITEM_TYPE_POTION",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spells",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 1",
        },
        value2: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 2",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 3",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_FURNITURE: {
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
            type: VALUE_TYPES.FLAG,
            type_enum: FURNITURE_STATES,
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
    },
    ITEM_TYPE_TRASH: {
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
    },
    ITEM_TYPE_CONTAINER: {
        code: "ITEM_TYPE_CONTAINER",
        sdesc: "ITEM_TYPE_CONTAINER",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: CONTAINER_FLAGS,
            ldesc: "container flags",
        },
        value2: {
            type: VALUE_TYPES.VNUM,
            type_enum: VNUM_TYPES.OBJECT,
            ldesc: "key vnum",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: VALUE_TYPES.FLAG,
            type_enum: OBJECT_LAYERS,
            ldesc: "layers",
        },
    },
    ITEM_TYPE_DRINKCON: {
        code: "ITEM_TYPE_DRINKCON",
        sdesc: "ITEM_TYPE_DRINKCON",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "total amount of drinks",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "current amount of drinks",
        },
        value2: {
            type: VALUE_TYPES.FLAG,
            type_enum: DRINK_TYPES,
            ldesc: "liquid #",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: HERB_TYPES,
            ldesc: "component/herb value",
        },
        value4: {
            type: VALUE_TYPES.BOOLEAN,
            type_enum: null,
            ldesc: "junks on use or not",
        },
    },
    ITEM_TYPE_KEY: {
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
    },
    ITEM_TYPE_FOOD: {
        code: "ITEM_TYPE_FOOD",
        sdesc: "ITEM_TYPE_FOOD",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "nourishment value",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "decay timer",
        },
        value2: {
            type: VALUE_TYPES.BOOLEAN,
            type_enum: null,
            ldesc: "FOOD_RAW or FOOD_COOKED, 0 is raw",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: HERB_TYPES,
            ldesc: "component/herb value",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_MONEY: {
        code: "ITEM_TYPE_MONEY",
        sdesc: "ITEM_TYPE_MONEY",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "# of coins",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: COIN_TYPES,
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
    },
    ITEM_TYPE_PEN: {
        code: "ITEM_TYPE_PEN",
        sdesc: "ITEM_TYPE_PEN",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
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
    },
    ITEM_TYPE_CORPSE_NPC: {
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
    },
    ITEM_TYPE_CORPSE_PC: {
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
    },
    ITEM_TYPE_FOUNTAIN: {
        code: "ITEM_TYPE_FOUNTAIN",
        sdesc: "ITEM_TYPE_FOUNTAIN",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "Amount of drinks",
        },
        value2: {
            type: VALUE_TYPES.FLAG,
            type_enum: DRINK_TYPES,
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
    },
    ITEM_TYPE_PILL: {
        code: "ITEM_TYPE_PILL",
        sdesc: "ITEM_TYPE_PILL",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spells",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 1",
        },
        value2: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 2",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number 3",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_BLOOD: {
        code: "ITEM_TYPE_BLOOD",
        sdesc: "ITEM_TYPE_BLOOD",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "quantity",
        },
        value2: {
            type: VALUE_TYPES.POS_INT,
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
    },
    ITEM_TYPE_BLOODSTAIN: {
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
            type: VALUE_TYPES.POS_INT,
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
    },
    ITEM_TYPE_SCRAPS: {
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
            type: VALUE_TYPES.POS_INT,
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
    },
    ITEM_TYPE_PIPE: {
        code: "ITEM_TYPE_PIPE",
        sdesc: "ITEM_TYPE_PIPE",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "maximum capacity of pipe",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "amount of herb in the pipe",
        },
        value2: {
            type: VALUE_TYPES.FLAG,
            type_enum: HERB_TYPES,
            ldesc: "herb type",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: PIPE_FLAGS,
            ldesc: "pipe flags",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_FIRE: {
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
            type: VALUE_TYPES.INT,
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
    },
    ITEM_TYPE_BOOK: {
        code: "ITEM_TYPE_BOOK",
        sdesc: "ITEM_TYPE_BOOK",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: LANGUAGE_FLAGS,
            ldesc: "Language",
        },
        value4: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "Skill Level (From 1 to 25)",
        },
    },
    ITEM_TYPE_LEVER: {
        code: "ITEM_TYPE_LEVER",
        sdesc: "ITEM_TYPE_LEVER",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.FLAG,
            type_enum: LEVER_BUTTON_FLAGS,
            ldesc: "lever trigger flag",
        },
        value1: {
            type: VALUE_TYPES.STRING,
            type_enum: null,
            ldesc: "vnum of teleport room or spell number or start room or room to be randomised",
        },
        value2: {
            type: VALUE_TYPES.VNUM,
            type_enum: VNUM_TYPES.ROOM,
            ldesc: "room to load the mob or object into",
        },
        value3: {
            type: VALUE_TYPES.VNUM,
            type_enum: null,
            ldesc: "object or mob to loaded",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_BUTTON: {
        code: "ITEM_TYPE_BUTTON",
        sdesc: "ITEM_TYPE_BUTTON",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.FLAG,
            type_enum: LEVER_BUTTON_FLAGS,
            ldesc: "lever trigger flag",
        },
        value1: {
            type: VALUE_TYPES.STRING,
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
    },
    ITEM_TYPE_TRAP: {
        code: "ITEM_TYPE_TRAP",
        sdesc: "ITEM_TYPE_TRAP",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.FLAG,
            type_enum: TRAP_TYPES,
            ldesc: "trap type",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "number of reloads",
        },
        value2: {
            type: VALUE_TYPES.MULTI_FLAGS,
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
    },
    ITEM_TYPE_MAP: {
        code: "ITEM_TYPE_MAP",
        sdesc: "ITEM_TYPE_MAP",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: VALUE_TYPES.VNUM,
            type_enum: VNUM_TYPES.ROOM,
            ldesc: "low room vnum",
        },
        value2: {
            type: VALUE_TYPES.VNUM,
            type_enum: VNUM_TYPES.ROOM,
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
    },
    ITEM_TYPE_PORTAL: {
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
    },
    ITEM_TYPE_PAPER: {
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
            type: VALUE_TYPES.FLAG,
            type_enum: LANGUAGE_FLAGS,
            ldesc: "language number",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "language skill level",
        },
    },
    ITEM_TYPE_PROJECTILE: {
        code: "ITEM_TYPE_PROJECTILE",
        sdesc: "ITEM_TYPE_PROJECTILE",
        do_not_use: false,
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: WEAPON_FLAGS,
            ldesc: "weapon flag",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "weapon flag modifiers",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: WEAPON_TYPES,
            ldesc: "Weapon Type",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_QUIVER: {
        code: "ITEM_TYPE_QUIVER",
        sdesc: "ITEM_TYPE_QUIVER",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: CONTAINER_FLAGS,
            ldesc: "container flags",
        },
        value2: {
            type: VALUE_TYPES.VNUM,
            type_enum: VNUM_TYPES.OBJECT,
            ldesc: "key vnum",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value4: {
            type: VALUE_TYPES.FLAG,
            type_enum: OBJECT_LAYERS,
            ldesc: "layers",
        },
    },
    ITEM_TYPE_SHOVEL: {
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
    },
    ITEM_TYPE_SALVE: {
        code: "ITEM_TYPE_SALVE",
        sdesc: "ITEM_TYPE_SALVE",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "Number of uses",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: HERB_TYPES,
            ldesc: "herb type",
        },
        value4: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "spell slot number",
        },
    },
    ITEM_TYPE_SYMBOL: {
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
    },
    ITEM_TYPE_TRADEGOODS: {
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
    },
    ITEM_TYPE_INSTRUMENT: {
        code: "ITEM_TYPE_INSTRUMENT",
        sdesc: "ITEM_TYPE_INSTRUMENT",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: VALUE_TYPES.FLAG,
            type_enum: MAGIC_ITEM_SPELLS,
            ldesc: "spell number",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
    },
    ITEM_TYPE_HIDE: {
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
            type: VALUE_TYPES.VNUM,
            type_enum: VNUM_TYPES.MOB,
            ldesc: "mob vnum",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "race number",
        },
    },
    ITEM_TYPE_CART: {
        code: "ITEM_TYPE_CART",
        sdesc: "ITEM_TYPE_CART",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "capacity",
        },
        value1: {
            type: VALUE_TYPES.FLAG,
            type_enum: CONTAINER_FLAGS,
            ldesc: "container flags",
        },
        value2: {
            type: VALUE_TYPES.VNUM,
            type_enum: VNUM_TYPES.OBJECT,
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
    },
    ITEM_TYPE_COMPONENT: {
        code: "ITEM_TYPE_COMPONENT",
        sdesc: "ITEM_TYPE_COMPONENT",
        do_not_use: false,
        value0: {
            type: VALUE_TYPES.POS_INT,
            type_enum: null,
            ldesc: "number of uses for the component and amount of herb",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: VALUE_TYPES.FLAG,
            type_enum: HERB_TYPES,
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
    }
}

const EXIT_DIRECTIONS = {
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
};

const EXIT_DOOR_FLAGS = {
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
};

const EXIT_SIZES = {
    EXIT_SIZE_ANY: {
        code: "EXIT_SIZE_ANY",
        sdesc: "EXIT_SIZE_ANY",
    },
    EXIT_SIZE_TINY: {
        code: "EXIT_SIZE_TINY",
        sdesc: "EXIT_SIZE_TINY",
    },
    EXIT_SIZE_SMALL: {
        code: "EXIT_SIZE_SMALL",
        sdesc: "EXIT_SIZE_SMALL",
    },
    EXIT_SIZE_MEDIUM: {
        code: "EXIT_SIZE_MEDIUM",
        sdesc: "EXIT_SIZE_MEDIUM",
    },
    EXIT_SIZE_NORMAL: {
        code: "EXIT_SIZE_NORMAL",
        sdesc: "EXIT_SIZE_NORMAL",
    },
    EXIT_SIZE_LARGE: {
        code: "EXIT_SIZE_LARGE",
        sdesc: "EXIT_SIZE_LARGE",
    },
    EXIT_SIZE_HUGE: {
        code: "EXIT_SIZE_HUGE",
        sdesc: "EXIT_SIZE_HUGE",
    },
    EXIT_SIZE_GIANT: {
        code: "EXIT_SIZE_GIANT",
        sdesc: "EXIT_SIZE_GIANT",
    }
};

const ROOM_FLAGS = {
    ROOM_DARK: {
        code: "ROOM_DARK",
        sdesc: "ROOM_DARK",
        ldesc: "Light is needed in room",
        do_not_use: false
    },
    ROOM_DEATH: {
        code: "ROOM_DEATH",
        sdesc: "ROOM_DEATH",
        ldesc: "Do not use",
        do_not_use: true
    },
    ROOM_NO_MOB: {
        code: "ROOM_NO_MOB",
        sdesc: "ROOM_NO_MOB",
        ldesc: "Mobs cannot enter room",
        do_not_use: false
    },
    ROOM_INDOORS: {
        code: "ROOM_INDOORS",
        sdesc: "ROOM_INDOORS",
        ldesc: "Not affected by weather",
        do_not_use: false
    },
    ROOM_LAWFUL: {
        code: "ROOM_LAWFUL",
        sdesc: "ROOM_LAWFUL",
        ldesc: "Good aligned chars only",
        do_not_use: false
    },
    ROOM_NEUTRAL: {
        code: "ROOM_NEUTRAL",
        sdesc: "ROOM_NEUTRAL",
        ldesc: "Neutral aligned characters only",
        do_not_use: false
    },
    ROOM_CHAOTIC: {
        code: "ROOM_CHAOTIC",
        sdesc: "ROOM_CHAOTIC",
        ldesc: "Evil aligned chars only",
        do_not_use: false
    },
    ROOM_NO_MAGIC: {
        code: "ROOM_NO_MAGIC",
        sdesc: "ROOM_NO_MAGIC",
        ldesc: "Players cannot cast spells",
        do_not_use: false
    },
    ROOM_NO_TUNNEL: {
        code: "ROOM_NO_TUNNEL",
        sdesc: "ROOM_NO_TUNNEL",
        ldesc: "Do not use",
        do_not_use: true
    },
    ROOM_PRIVATE: {
        code: "ROOM_PRIVATE",
        sdesc: "ROOM_PRIVATE",
        ldesc: "Only 2 players may enter room",
        do_not_use: false
    },
    ROOM_SAFE: {
        code: "ROOM_SAFE",
        sdesc: "ROOM_SAFE",
        ldesc: "No fighting in this room",
        do_not_use: false
    },
    ROOM_SOLITARY: {
        code: "ROOM_SOLITARY",
        sdesc: "ROOM_SOLITARY",
        ldesc: "Only 1 player may enter room",
        do_not_use: false
    },
    ROOM_PET_SHOP: {
        code: "ROOM_PET_SHOP",
        sdesc: "ROOM_PET_SHOP",
        ldesc: "Room is a petshop",
        do_not_use: false
    },
    ROOM_NO_RECALL: {
        code: "ROOM_NO_RECALL",
        sdesc: "ROOM_NO_RECALL",
        ldesc: "Players cannot recall",
        do_not_use: false
    },
    ROOM_DONATION: {
        code: "ROOM_DONATION",
        sdesc: "ROOM_DONATION",
        ldesc: "Prevents players from using 'get all'",
        do_not_use: false
    },
    ROOM_NODROPALL: {
        code: "ROOM_NODROPALL",
        sdesc: "ROOM_NODROPALL",
        ldesc: "Stops players doing 'drop all', ideal for public squares etc",
        do_not_use: false
    },
    ROOM_SILENCE: {
        code: "ROOM_SILENCE",
        sdesc: "ROOM_SILENCE",
        ldesc: "Players may not speak or emote",
        do_not_use: false
    },
    ROOM_LOGSPEECH: {
        code: "ROOM_LOGSPEECH",
        sdesc: "ROOM_LOGSPEECH",
        ldesc: "Do not use without builder admin consultation",
        do_not_use: false
    },
    ROOM_NODROP: {
        code: "ROOM_NODROP",
        sdesc: "ROOM_NODROP",
        ldesc: "Players may not drop stuff",
        do_not_use: false
    },
    ROOM_CLANSTOREROOM: {
        code: "ROOM_CLANSTOREROOM",
        sdesc: "ROOM_CLANSTOREROOM",
        ldesc: "Used for guild storerooms. Ask a builders admin first.",
        do_not_use: false
    },
    ROOM_NO_SUMMON: {
        code: "ROOM_NO_SUMMON",
        sdesc: "ROOM_NO_SUMMON",
        ldesc: "Player cannot be summoned from room",
        do_not_use: false
    },
    ROOM_NO_ASTRAL: {
        code: "ROOM_NO_ASTRAL",
        sdesc: "ROOM_NO_ASTRAL",
        ldesc: "Cannot gate or magically transport to or from this room",
        do_not_use: false
    },
    ROOM_TELEPORT: {
        code: "ROOM_TELEPORT",
        sdesc: "ROOM_TELEPORT",
        ldesc: "Will teleport the PC after the delay set in value3 to the vnum set in value4",
        do_not_use: false
    },
    ROOM_TELESHOWDESC: {
        code: "ROOM_TELESHOWDESC",
        sdesc: "ROOM_TELESHOWDESC",
        ldesc: "When teleported it shows the PC's the description of the new room",
        do_not_use: false
    },
    ROOM_NOFLOOR: {
        code: "ROOM_NOFLOOR",
        sdesc: "ROOM_NOFLOOR",
        ldesc: "Players and objects fall to (down) room",
        do_not_use: false
    },
    ROOM_PROTOTYPE: {
        code: "ROOM_PROTOTYPE",
        sdesc: "ROOM_PROTOTYPE",
        ldesc: "Used by OLC. Do not use.",
        do_not_use: true
    },
    ROOM_INN: {
        code: "ROOM_INN",
        sdesc: "ROOM_INN",
        ldesc: "Allows PC's to heal at a faster rate",
        do_not_use: false
    }
};

const SECTOR_FLAGS = {
    SECT_INSIDE: {
        code:"SECT_INSIDE",
        sdesc: "SECT_INSIDE",
        ldesc: "(0) inside a building or structure etc. It is always lit",
        do_not_use: false
    },
    SECT_CITY: {
        code:"SECT_CITY",
        sdesc: "SECT_CITY",
        ldesc: "(1) typical city street, it is always lit",
        do_not_use: false
    },
    SECT_FIELD: {
        code:"SECT_FIELD",
        sdesc: "SECT_FIELD",
        ldesc: "p (2) a grassy field",
        do_not_use: false
    },
    SECT_FOREST: {
        code:"SECT_FOREST",
        sdesc: "SECT_FOREST",
        ldesc: "F (3) heavily wooded forest",
        do_not_use: false
    },
    SECT_HILLS: {
        code:"SECT_HILLS",
        sdesc: "SECT_HILLS",
        ldesc: "h (4) rolling hills",
        do_not_use: false
    },
    SECT_MOUNTAIN: {
        code:"SECT_MOUNTAIN",
        sdesc: "SECT_MOUNTAIN",
        ldesc: "^ (5) mountainous terrain",
        do_not_use: false
    },
    SECT_WATER_SWIM: {
        code:"SECT_WATER_SWIM",
        sdesc: "SECT_WATER_SWIM",
        ldesc: "(6) calm water",
        do_not_use: false
    },
    SECT_WATER_NOSWIM: {
        code:"SECT_WATER_NOSWIM",
        sdesc: "SECT_WATER_NOSWIM",
        ldesc: "w (7) swimming skill required",
        do_not_use: false
    },
    SECT_UNDERWATER: {
        code:"SECT_UNDERWATER",
        sdesc: "SECT_UNDERWATER",
        ldesc: "(8) Water-breathing required. Character swims.",
        do_not_use: false
    },
    SECT_AIR: {
        code:"SECT_AIR",
        sdesc: "SECT_AIR",
        ldesc: "(9) flying required",
        do_not_use: false
    },
    SECT_DESERT: {
        code:"SECT_DESERT",
        sdesc: "SECT_DESERT",
        ldesc: "d (10) dry sandy terrain",
        do_not_use: false
    },
    SECT_DUNNO: {
        code:"SECT_DUNNO",
        sdesc: "SECT_DUNNO",
        ldesc: "Do not use. Reserved for future use.",
        do_not_use: true
    },
    SECT_OCEANFLOOR: {
        code:"SECT_OCEANFLOOR",
        sdesc: "SECT_OCEANFLOOR",
        ldesc: "(12) Underwater. Breathwater is required. Character can WALK.",
        do_not_use: false
    },
    SECT_UNDERGROUND: {
        code:"SECT_UNDERGROUND",
        sdesc: "SECT_UNDERGROUND",
        ldesc: "(13) underground structure",
        do_not_use: false
    },
    SECT_WOODS: {
        code:"SECT_WOODS",
        sdesc: "SECT_WOODS",
        ldesc: "f (14) lightly wooded terrain",
        do_not_use: false
    },
    SECT_ROAD: {
        code:"SECT_ROAD",
        sdesc: "SECT_ROAD",
        ldesc: "\\ (15) roads outside of cites",
        do_not_use: false
    },
    SECT_TUNDRA: {
        code:"SECT_TUNDRA",
        sdesc: "SECT_TUNDRA",
        ldesc: "t (16) cold scrub land/frozen wastes",
        do_not_use: false
    },
    SECT_BARREN: {
        code:"SECT_BARREN",
        sdesc: "SECT_BARREN",
        ldesc: "b (17) barren lands/moors/rocky, treeless plains",
        do_not_use: false
    },
    SECT_ABYSS: {
        code:"SECT_ABYSS",
        sdesc: "SECT_ABYSS",
        ldesc: "V (19) an abyss which requires flight to cross (UNDERDARK)",
        do_not_use: false
    },
    SECT_FUNGUSFOREST: {
        code:"SECT_FUNGUSFOREST",
        sdesc: "SECT_FUNGUSFOREST",
        ldesc: "F (20) a forest which blocks exits randomly (UNDERDARK)",
        do_not_use: false
    },
    SECT_CHASM: {
        code:"SECT_CHASM",
        sdesc: "SECT_CHASM",
        ldesc: "x (21) must pass climb check or be injured (UNDERDARK)",
        do_not_use: false
    },
    SECT_CAVE: {
        code:"SECT_CAVE",
        sdesc: "SECT_CAVE",
        ldesc: "C (22) speaks for itself (UNDERDARK)",
        do_not_use: false
    },
    SECT_GUARDEDTUNNEL: {
        code:"SECT_GUARDEDTUNNEL",
        sdesc: "SECT_GUARDEDTUNNEL",
        ldesc: "# (23) Used to confine wandering patrols (UNDERDARK)",
        do_not_use: false
    },
    SECT_UNDERGROUND_SEA: {
        code:"SECT_UNDERGROUND_SEA",
        sdesc: "SECT_UNDERGROUND_SEA",
        ldesc: "W (25) must swim (UNDERDARK)",
        do_not_use: false
    },
    SECT_UNDERGROUND_RIVER: {
        code:"SECT_UNDERGROUND_RIVER",
        sdesc: "SECT_UNDERGROUND_RIVER",
        ldesc: "r (26) must swim, may get caught in current (UNDERDARK)",
        do_not_use: false
    },
    SECT_SIDE_TUNNEL: {
        code:"SECT_SIDE_TUNNEL",
        sdesc: "SECT_SIDE_TUNNEL",
        ldesc: "o (27) regular terrain (UNDERDARK)",
        do_not_use: false
    },
    SECT_VOLCANO: {
        code:"SECT_VOLCANO",
        sdesc: "SECT_VOLCANO",
        ldesc: "^ (28) burns PC (UNDERDARK)",
        do_not_use: false
    },
    SECT_SULPHUR: {
        code:"SECT_SULPHUR",
        sdesc: "SECT_SULPHUR",
        ldesc: "= (29) burns PC (UNDERDARK)",
        do_not_use: false
    }
};

const MOB_CLASSES = {
    // Warrior Classes
    CLASS_WARRIOR: {
        code: "CLASS_WARRIOR",
        sdesc: "CLASS_WARRIOR",
        category: "Warrior"
    },
    CLASS_RANGERS: {
        code: "CLASS_RANGERS",
        sdesc: "CLASS_RANGERS",
        category: "Warrior"
    },
    CLASS_FIGHTERS: {
        code: "CLASS_FIGHTERS",
        sdesc: "CLASS_FIGHTERS",
        category: "Warrior"
    },
    CLASS_PALADINS: {
        code: "CLASS_PALADINS",
        sdesc: "CLASS_PALADINS",
        category: "Warrior"
    },
    // Wizard Classes
    CLASS_WIZARD: {
        code: "CLASS_WIZARD",
        sdesc: "CLASS_WIZARD",
        category: "Wizard"
    },
    CLASS_ILLUSIONISTS: {
        code: "CLASS_ILLUSIONISTS",
        sdesc: "CLASS_ILLUSIONISTS",
        category: "Wizard"
    },
    CLASS_INVOKERS: {
        code: "CLASS_INVOKERS",
        sdesc: "CLASS_INVOKERS",
        category: "Wizard"
    },
    CLASS_MAGES: {
        code: "CLASS_MAGES",
        sdesc: "CLASS_MAGES",
        category: "Wizard"
    },
    CLASS_NECROMANCERS: {
        code: "CLASS_NECROMANCERS",
        sdesc: "CLASS_NECROMANCERS",
        category: "Wizard"
    },
    CLASS_TRANSMUTERS: {
        code: "CLASS_TRANSMUTERS",
        sdesc: "CLASS_TRANSMUTERS",
        category: "Wizard"
    },
    CLASS_ABJURER: {
        code: "CLASS_ABJURER",
        sdesc: "CLASS_ABJURER",
        category: "Wizard"
    },
    CLASS_CONJURER: {
        code: "CLASS_CONJURER",
        sdesc: "CLASS_CONJURER",
        category: "Wizard"
    },
    // Rogue classes
    CLASS_ROGUE: {
        code: "CLASS_ROGUE",
        sdesc: "CLASS_ROGUE",
        category: "Rogue"
    },
    CLASS_THIEVES: {
        code: "CLASS_THIEVES",
        sdesc: "CLASS_THIEVES",
        category: "Rogue"
    },
    CLASS_BARDS: {
        code: "CLASS_BARDS",
        sdesc: "CLASS_BARDS",
        category: "Rogue"
    },
    // Priest classes
    CLASS_PRIEST: {
        code: "CLASS_PRIEST",
        sdesc: "CLASS_PRIEST",
        category: "Priest"
    },
    CLASS_BANE: {
        code: "CLASS_BANE",
        sdesc: "CLASS_BANE",
        category: "Priest"
    },
    CLASS_BESHABA: {
        code: "CLASS_BESHABA",
        sdesc: "CLASS_BESHABA",
        category: "Priest"
    },
    CLASS_CHAUNTEA: {
        code: "CLASS_CHAUNTEA",
        sdesc: "CLASS_CHAUNTEA",
        category: "Priest"
    },
    CLASS_CORELLON: {
        code: "CLASS_CORELLON",
        sdesc: "CLASS_CORELLON",
        category: "Priest"
    },
    CLASS_CYRIC: {
        code: "CLASS_CYRIC",
        sdesc: "CLASS_CYRIC",
        category: "Priest"
    },
    CLASS_GARL: {
        code: "CLASS_GARL",
        sdesc: "CLASS_GARL",
        category: "Priest"
    },
    CLASS_GOND: {
        code: "CLASS_GOND",
        sdesc: "CLASS_GOND",
        category: "Priest"
    },
    CLASS_GRUUMSH: {
        code: "CLASS_GRUUMSH",
        sdesc: "CLASS_GRUUMSH",
        category: "Priest"
    },
    CLASS_HELM: {
        code: "CLASS_HELM",
        sdesc: "CLASS_HELM",
        category: "Priest"
    },
    CLASS_ILMATER: {
        code: "CLASS_ILMATER",
        sdesc: "CLASS_ILMATER",
        category: "Priest"
    },
    CLASS_KELEMVOR: {
        code: "CLASS_KELEMVOR",
        sdesc: "CLASS_KELEMVOR",
        category: "Priest"
    },
    CLASS_LATHANDER: {
        code: "CLASS_LATHANDER",
        sdesc: "CLASS_LATHANDER",
        category: "Priest"
    },
    CLASS_LLOTH: {
        code: "CLASS_LLOTH",
        sdesc: "CLASS_LLOTH",
        category: "Priest"
    },
    CLASS_LOVIATAR: {
        code: "CLASS_LOVIATAR",
        sdesc: "CLASS_LOVIATAR",
        category: "Priest"
    },
    CLASS_MALAR: {
        code: "CLASS_MALAR",
        sdesc: "CLASS_MALAR",
        category: "Priest"
    },
    CLASS_MASK: {
        code: "CLASS_MASK",
        sdesc: "CLASS_MASK",
        category: "Priest"
    },
    CLASS_MIELIKKI: {
        code: "CLASS_MIELIKKI",
        sdesc: "CLASS_MIELIKKI",
        category: "Priest"
    },
    CLASS_MORADIN: {
        code: "CLASS_MORADIN",
        sdesc: "CLASS_MORADIN",
        category: "Priest"
    },
    CLASS_MYSTRA: {
        code: "CLASS_MYSTRA",
        sdesc: "CLASS_MYSTRA",
        category: "Priest"
    },
    CLASS_OGHMA: {
        code: "CLASS_OGHMA",
        sdesc: "CLASS_OGHMA",
        category: "Priest"
    },
    CLASS_SELUNE: {
        code: "CLASS_SELUNE",
        sdesc: "CLASS_SELUNE",
        category: "Priest"
    },
    CLASS_SHAR: {
        code: "CLASS_SHAR",
        sdesc: "CLASS_SHAR",
        category: "Priest"
    },
    CLASS_SUNE: {
        code: "CLASS_SUNE",
        sdesc: "CLASS_SUNE",
        category: "Priest"
    },
    CLASS_TALONA: {
        code: "CLASS_TALONA",
        sdesc: "CLASS_TALONA",
        category: "Priest"
    },
    CLASS_TALOS: {
        code: "CLASS_TALOS",
        sdesc: "CLASS_TALOS",
        category: "Priest"
    },
    CLASS_TEMPUS: {
        code: "CLASS_TEMPUS",
        sdesc: "CLASS_TEMPUS",
        category: "Priest"
    },
    CLASS_TORM: {
        code: "CLASS_TORM",
        sdesc: "CLASS_TORM",
        category: "Priest"
    },
    CLASS_TYMORA: {
        code: "CLASS_TYMORA",
        sdesc: "CLASS_TYMORA",
        category: "Priest"
    },
    CLASS_TYR: {
        code: "CLASS_TYR",
        sdesc: "CLASS_TYR",
        category: "Priest"
    },
    CLASS_UMBERLEE: {
        code: "CLASS_UMBERLEE",
        sdesc: "CLASS_UMBERLEE",
        category: "Priest"
    },
    CLASS_WAUKEEN: {
        code: "CLASS_WAUKEEN",
        sdesc: "CLASS_WAUKEEN",
        category: "Priest"
    },
    CLASS_YONDALLA: {
        code: "CLASS_YONDALLA",
        sdesc: "CLASS_YONDALLA",
        category: "Priest"
    },
    // Other classes
    CLASS_VAMPIRE: {
        code: "CLASS_VAMPIRE",
        sdesc: "CLASS_VAMPIRE",
        category: "Other"
    },
    CLASS_MONSTER: {
        code: "CLASS_MONSTER",
        sdesc: "CLASS_MONSTER",
        category: "Other"
    },
    CLASS_NONE: {
        code: "CLASS_NONE",
        sdesc: "CLASS_NONE",
        category: "Other"
    }
};

const MOB_RACES = {
    RACE_BEHOLDER: {
        code: "RACE_BEHOLDER",
        sdesc: "beholder",
        category: "aberration"
    },
    RACE_CORRUPTED_EAGLE: {
        code: "RACE_CORRUPTED_EAGLE",
        sdesc: "corrupted eagle",
        category: "aberration"
    },
    RACE_DARKMANTLE: {
        code: "RACE_DARKMANTLE",
        sdesc: "darkmantle",
        category: "aberration"
    },
    RACE_DRIDER: {
        code: "RACE_DRIDER",
        sdesc: "drider",
        category: "aberration"
    },
    RACE_ETTERCAP: {
        code: "RACE_ETTERCAP",
        sdesc: "ettercap",
        category: "aberration"
    },
    RACE_GRELL: {
        code: "RACE_GRELL",
        sdesc: "grell",
        category: "aberration"
    },
    RACE_HARPOON_SPIDER: {
        code: "RACE_HARPOON_SPIDER",
        sdesc: "harpoon spider",
        category: "aberration"
    },
    RACE_HARPOON_SPIDER_DREAD: {
        code: "RACE_HARPOON_SPIDER_DREAD",
        sdesc: "dread harpoon spider",
        category: "aberration"
    },
    RACE_HOOKHORROR: {
        code: "RACE_HOOKHORROR",
        sdesc: "hookhorror",
        category: "aberration"
    },
    RACE_ILLITHID: {
        code: "RACE_ILLITHID",
        sdesc: "illithid",
        category: "aberration"
    },
    RACE_ELDER_BRAIN: {
        code: "RACE_ELDER_BRAIN",
        sdesc: "elder brain",
        category: "aberration"
    },
    RACE_KYTHON_ADULT: {
        code: "RACE_KYTHON_ADULT",
        sdesc: "kython adult",
        category: "aberration"
    },
    RACE_KYTHON_BROODLING: {
        code: "RACE_KYTHON_BROODLING",
        sdesc: "kython broodling",
        category: "aberration"
    },
    RACE_KYTHON_JUVENILE: {
        code: "RACE_KYTHON_JUVENILE",
        sdesc: "kython juvenile",
        category: "aberration"
    },
    RACE_KYTHON_SLAUGHTERKING: {
        code: "RACE_KYTHON_SLAUGHTERKING",
        sdesc: "kython slaughterking",
        category: "aberration"
    },
    RACE_LURKER: {
        code: "RACE_LURKER",
        sdesc: "lurker",
        category: "aberration"
    },
    RACE_MIMIC: {
        code: "RACE_MIMIC",
        sdesc: "mimic",
        category: "aberration"
    },
    RACE_NAGA: {
        code: "RACE_NAGA",
        sdesc: "naga",
        category: "aberration"
    },
    RACE_RUST_MONSTER: {
        code: "RACE_RUST_MONSTER",
        sdesc: "rust monster",
        category: "aberration"
    },
    RACE_UMBERHULK: {
        code: "RACE_UMBERHULK",
        sdesc: "umberhulk",
        category: "aberration"
    },
    RACE_APE: {
        code: "RACE_APE",
        sdesc: "ape",
        category: "animal"
    },
    RACE_APE_DIRE: {
        code: "RACE_APE_DIRE",
        sdesc: "ape dire",
        category: "animal"
    },
    RACE_BABOON: {
        code: "RACE_BABOON",
        sdesc: "baboon",
        category: "animal"
    },
    RACE_BADGER: {
        code: "RACE_BADGER",
        sdesc: "badger",
        category: "animal"
    },
    RACE_BADGER_DIRE: {
        code: "RACE_BADGER_DIRE",
        sdesc: "dire badger",
        category: "animal"
    },
    RACE_BAT: {
        code: "RACE_BAT",
        sdesc: "bat",
        category: "animal"
    },
    RACE_BAT_DIRE: {
        code: "RACE_BAT_DIRE",
        sdesc: "dire bat",
        category: "animal"
    },
    RACE_BEAR: {
        code: "RACE_BEAR",
        sdesc: "bear",
        category: "animal"
    },
    RACE_BEAR_BLACK: {
        code: "RACE_BEAR_BLACK",
        sdesc: "black bear",
        category: "animal"
    },
    RACE_BEAR_BROWN: {
        code: "RACE_BEAR_BROWN",
        sdesc: "brown bear",
        category: "animal"
    },
    RACE_BEAR_DIRE: {
        code: "RACE_BEAR_DIRE",
        sdesc: "dire bear",
        category: "animal"
    },
    RACE_BEAR_POLAR: {
        code: "RACE_BEAR_POLAR",
        sdesc: "polar bear",
        category: "animal"
    },
    RACE_BIRD: {
        code: "RACE_BIRD",
        sdesc: "bird",
        category: "animal"
    },
    RACE_EAGLE: {
        code: "RACE_EAGLE",
        sdesc: "eagle",
        category: "animal"
    },
    RACE_HAWK: {
        code: "RACE_HAWK",
        sdesc: "hawk",
        category: "animal"
    },
    RACE_RAVEN: {
        code: "RACE_RAVEN",
        sdesc: "raven",
        category: "animal"
    },
    RACE_OWL: {
        code: "RACE_OWL",
        sdesc: "owl",
        category: "animal"
    },
    RACE_BISON: {
        code: "RACE_BISON",
        sdesc: "bison",
        category: "animal"
    },
    RACE_BOAR: {
        code: "RACE_BOAR",
        sdesc: "boar",
        category: "animal"
    },
    RACE_BOAR_DIRE: {
        code: "RACE_BOAR_DIRE",
        sdesc: "dire boar",
        category: "animal"
    },
    RACE_PIG: {
        code: "RACE_PIG",
        sdesc: "pig",
        category: "animal"
    },
    RACE_CAMEL: {
        code: "RACE_CAMEL",
        sdesc: "camel",
        category: "animal"
    },
    RACE_CAT: {
        code: "RACE_CAT",
        sdesc: "cat",
        category: "animal"
    },
    RACE_CHEETAH: {
        code: "RACE_CHEETAH",
        sdesc: "cheetah",
        category: "animal"
    },
    RACE_COW: {
        code: "RACE_COW",
        sdesc: "cow",
        category: "animal"
    },
    RACE_CRAB: {
        code: "RACE_CRAB",
        sdesc: "crab",
        category: "animal"
    },
    RACE_CROCODILE: {
        code: "RACE_CROCODILE",
        sdesc: "crocodile",
        category: "animal"
    },
    RACE_CROCODILE_GIANT: {
        code: "RACE_CROCODILE_GIANT",
        sdesc: "giant crocodile",
        category: "animal"
    },
    RACE_BAT_DEEP: {
        code: "RACE_BAT_DEEP",
        sdesc: "deep bat",
        category: "animal"
    },
    RACE_BAT_DEEP_NIGHT_HUNTER: {
        code: "RACE_BAT_DEEP_NIGHT_HUNTER",
        sdesc: "night hunter",
        category: "animal"
    },
    RACE_DEINONYCHUS: {
        code: "RACE_DEINONYCHUS",
        sdesc: "deinonychus",
        category: "animal"
    },
    RACE_DOG: {
        code: "RACE_DOG",
        sdesc: "dog",
        category: "animal"
    },
    RACE_DOG_RIDING: {
        code: "RACE_DOG_RIDING",
        sdesc: "riding dog",
        category: "animal"
    },
    RACE_ELASMOSAURUS: {
        code: "RACE_ELASMOSAURUS",
        sdesc: "elasmosaurus",
        category: "animal"
    },
    RACE_ELEPHANT: {
        code: "RACE_ELEPHANT",
        sdesc: "elephant",
        category: "animal"
    },
    RACE_FISH: {
        code: "RACE_FISH",
        sdesc: "fish",
        category: "animal"
    },
    RACE_HORSE: {
        code: "RACE_HORSE",
        sdesc: "horse",
        category: "animal"
    },
    RACE_DONKEY: {
        code: "RACE_DONKEY",
        sdesc: "donkey",
        category: "animal"
    },
    RACE_HORSE_HEAVY: {
        code: "RACE_HORSE_HEAVY",
        sdesc: "heavy horse",
        category: "animal"
    },
    RACE_HORSE_HEAVYWAR: {
        code: "RACE_HORSE_HEAVYWAR",
        sdesc: "heavy warhorse",
        category: "animal"
    },
    RACE_HORSE_LIGHT: {
        code: "RACE_HORSE_LIGHT",
        sdesc: "light horse",
        category: "animal"
    },
    RACE_HORSE_LIGHTWAR: {
        code: "RACE_HORSE_LIGHTWAR",
        sdesc: "light warhorse",
        category: "animal"
    },
    RACE_MULE: {
        code: "RACE_MULE",
        sdesc: "mule",
        category: "animal"
    },
    RACE_PONY: {
        code: "RACE_PONY",
        sdesc: "pony",
        category: "animal"
    },
    RACE_PONY_WAR: {
        code: "RACE_PONY_WAR",
        sdesc: "war pony",
        category: "animal"
    },
    RACE_HYENA: {
        code: "RACE_HYENA",
        sdesc: "hyena",
        category: "animal"
    },
    RACE_LION: {
        code: "RACE_LION",
        sdesc: "lion",
        category: "animal"
    },
    RACE_LION_DIRE: {
        code: "RACE_LION_DIRE",
        sdesc: "dire lion",
        category: "animal"
    },
    RACE_LIZARD: {
        code: "RACE_LIZARD",
        sdesc: "lizard",
        category: "animal"
    },
    RACE_LIZARD_MONITOR: {
        code: "RACE_LIZARD_MONITOR",
        sdesc: "monitor lizard",
        category: "animal"
    },
    RACE_LIZARD_RIDING: {
        code: "RACE_LIZARD_RIDING",
        sdesc: "riding lizard",
        category: "animal"
    },
    RACE_MANTARAY: {
        code: "RACE_MANTARAY",
        sdesc: "manta ray",
        category: "animal"
    },
    RACE_MEGARAPTOR: {
        code: "RACE_MEGARAPTOR",
        sdesc: "megaraptor",
        category: "animal"
    },
    RACE_MONKEY: {
        code: "RACE_MONKEY",
        sdesc: "monkey",
        category: "animal"
    },
    RACE_OCTOPUS: {
        code: "RACE_OCTOPUS",
        sdesc: "octopus",
        category: "animal"
    },
    RACE_OCTOPUS_GIANT: {
        code: "RACE_OCTOPUS_GIANT",
        sdesc: "giant octopus",
        category: "animal"
    },
    RACE_PANTHER: {
        code: "RACE_PANTHER",
        sdesc: "panther",
        category: "animal"
    },
    RACE_PORPOISE: {
        code: "RACE_PORPOISE",
        sdesc: "porpoise",
        category: "animal"
    },
    RACE_PTERANODON: {
        code: "RACE_PTERANODON",
        sdesc: "pteranodon",
        category: "animal"
    },
    RACE_RABBIT: {
        code: "RACE_RABBIT",
        sdesc: "rabbit",
        category: "animal"
    },
    RACE_RAT: {
        code: "RACE_RAT",
        sdesc: "rat",
        category: "animal"
    },
    RACE_RAT_DIRE: {
        code: "RACE_RAT_DIRE",
        sdesc: "dire rat",
        category: "animal"
    },
    RACE_RHINOCEROS: {
        code: "RACE_RHINOCEROS",
        sdesc: "rhinoceros",
        category: "animal"
    },
    RACE_SHARK: {
        code: "RACE_SHARK",
        sdesc: "shark",
        category: "animal"
    },
    RACE_SHARK_DIRE: {
        code: "RACE_SHARK_DIRE",
        sdesc: "dire shark",
        category: "animal"
    },
    RACE_SNAKE: {
        code: "RACE_SNAKE",
        sdesc: "snake",
        category: "animal"
    },
    RACE_SNAKE_CONSTRICTOR: {
        code: "RACE_SNAKE_CONSTRICTOR",
        sdesc: "constrictor snake",
        category: "animal"
    },
    RACE_SNAKE_CONSTRICTOR_GIANT: {
        code: "RACE_SNAKE_CONSTRICTOR_GIANT",
        sdesc: "giant constrictor snake",
        category: "animal"
    },
    RACE_SQUID: {
        code: "RACE_SQUID",
        sdesc: "squid",
        category: "animal"
    },
    RACE_SQUID_GIANT: {
        code: "RACE_SQUID_GIANT",
        sdesc: "giant squid",
        category: "animal"
    },
    RACE_TIGER: {
        code: "RACE_TIGER",
        sdesc: "tiger",
        category: "animal"
    },
    RACE_TIGER_DIRE: {
        code: "RACE_TIGER_DIRE",
        sdesc: "dire tiger",
        category: "animal"
    },
    RACE_TOAD: {
        code: "RACE_TOAD",
        sdesc: "toad",
        category: "animal"
    },
    RACE_FROG: {
        code: "RACE_FROG",
        sdesc: "frog",
        category: "animal"
    },
    RACE_TRESSYM: {
        code: "RACE_TRESSYM",
        sdesc: "tressym",
        category: "animal"
    },
    RACE_TRICERATOPS: {
        code: "RACE_TRICERATOPS",
        sdesc: "triceratops",
        category: "animal"
    },
    RACE_TYRANNOSAURUS: {
        code: "RACE_TYRANNOSAURUS",
        sdesc: "tyrannosaurus",
        category: "animal"
    },
    RACE_WEASEL: {
        code: "RACE_WEASEL",
        sdesc: "weasel",
        category: "animal"
    },
    RACE_WEASEL_DIRE: {
        code: "RACE_WEASEL_DIRE",
        sdesc: "dire weasel",
        category: "animal"
    },
    RACE_WHALE_BALEEN: {
        code: "RACE_WHALE_BALEEN",
        sdesc: "whale baleen",
        category: "animal"
    },
    RACE_WHALE_CACHALOT: {
        code: "RACE_WHALE_CACHALOT",
        sdesc: "cachalot",
        category: "animal"
    },
    RACE_WHALE_ORCA: {
        code: "RACE_WHALE_ORCA",
        sdesc: "orca",
        category: "animal"
    },
    RACE_WOLF: {
        code: "RACE_WOLF",
        sdesc: "wolf",
        category: "animal"
    },
    RACE_WOLF_DIRE: {
        code: "RACE_WOLF_DIRE",
        sdesc: "dire wolf",
        category: "animal"
    },
    RACE_WOLVERINE: {
        code: "RACE_WOLVERINE",
        sdesc: "wolverine",
        category: "animal"
    },
    RACE_WOLVERINE_DIRE: {
        code: "RACE_WOLVERINE_DIRE",
        sdesc: "dire wolverine",
        category: "animal"
    },
    RACE_ANIMATED: {
        code: "RACE_ANIMATED",
        sdesc: "animated",
        category: "construct"
    },
    RACE_CRAWLING_CLAW: {
        code: "RACE_CRAWLING_CLAW",
        sdesc: "crawling_claw",
        category: "construct"
    },
    RACE_DUMMY: {
        code: "RACE_DUMMY",
        sdesc: "dummy",
        category: "construct"
    },
    RACE_GOLEM: {
        code: "RACE_GOLEM",
        sdesc: "golem",
        category: "construct"
    },
    RACE_GOLEM_CLAY: {
        code: "RACE_GOLEM_CLAY",
        sdesc: "clay golem",
        category: "construct"
    },
    RACE_GOLEM_FLESH: {
        code: "RACE_GOLEM_FLESH",
        sdesc: "flesh golem",
        category: "construct"
    },
    RACE_GOLEM_IRON: {
        code: "RACE_GOLEM_IRON",
        sdesc: "iron golem",
        category: "construct"
    },
    RACE_MAGICAL: {
        code: "RACE_MAGICAL",
        sdesc: "magical",
        category: "construct"
    },
    RACE_GOLEM_STONE: {
        code: "RACE_GOLEM_STONE",
        sdesc: "stone golem",
        category: "construct"
    },
    RACE_HAMMERER_AUTOMATON: {
        code: "RACE_HAMMERER_AUTOMATON",
        sdesc: "hammerer automaton",
        category: "construct"
    },
    RACE_HELMED_HORROR: {
        code: "RACE_HELMED_HORROR",
        sdesc: "helmed horror",
        category: "construct"
    },
    RACE_PULVERIZER_AUTOMATON: {
        code: "RACE_PULVERIZER_AUTOMATON",
        sdesc: "pulverizer automaton",
        category: "construct"
    },
    RACE_RETRIEVER: {
        code: "RACE_RETRIEVER",
        sdesc: "retriever",
        category: "construct"
    },
    RACE_DRAGON: {
        code: "RACE_DRAGON",
        sdesc: "dragon",
        category: "dragon"
    },
    RACE_BLACK_DRAGON: {
        code: "RACE_BLACK_DRAGON",
        sdesc: "black dragon",
        category: "dragon"
    },
    RACE_BLUE_DRAGON: {
        code: "RACE_BLUE_DRAGON",
        sdesc: "blue dragon",
        category: "dragon"
    },
    RACE_BRASS_DRAGON: {
        code: "RACE_BRASS_DRAGON",
        sdesc: "brass dragon",
        category: "dragon"
    },
    RACE_BRONZE_DRAGON: {
        code: "RACE_BRONZE_DRAGON",
        sdesc: "bronze dragon",
        category: "dragon"
    },
    RACE_BROWN_DRAGON: {
        code: "RACE_BROWN_DRAGON",
        sdesc: "brown dragon",
        category: "dragon"
    },
    RACE_COPPER_DRAGON: {
        code: "RACE_COPPER_DRAGON",
        sdesc: "copper dragon",
        category: "dragon"
    },
    RACE_DEEP_DRAGON: {
        code: "RACE_DEEP_DRAGON",
        sdesc: "deep dragon",
        category: "dragon"
    },
    RACE_FAERIE_DRAGON: {
        code: "RACE_FAERIE_DRAGON",
        sdesc: "faerie dragon",
        category: "dragon"
    },
    RACE_GOLD_DRAGON: {
        code: "RACE_GOLD_DRAGON",
        sdesc: "gold dragon",
        category: "dragon"
    },
    RACE_GREEN_DRAGON: {
        code: "RACE_GREEN_DRAGON",
        sdesc: "green dragon",
        category: "dragon"
    },
    RACE_RED_DRAGON: {
        code: "RACE_RED_DRAGON",
        sdesc: "red dragon",
        category: "dragon"
    },
    RACE_SILVER_DRAGON: {
        code: "RACE_SILVER_DRAGON",
        sdesc: "silver dragon",
        category: "dragon"
    },
    RACE_WHITE_DRAGON: {
        code: "RACE_WHITE_DRAGON",
        sdesc: "white dragon",
        category: "dragon"
    },
    RACE_WYVERN: {
        code: "RACE_WYVERN",
        sdesc: "wyvern",
        category: "dragon"
    },
    RACE_AIRELEM: {
        code: "RACE_AIRELEM",
        sdesc: "air elemental",
        category: "elemental"
    },
    RACE_FIRELEM: {
        code: "RACE_FIRELEM",
        sdesc: "fire elemental",
        category: "elemental"
    },
    RACE_EARELEM: {
        code: "RACE_EARELEM",
        sdesc: "earth elemental",
        category: "elemental"
    },
    RACE_ICE_ELEMENTAL: {
        code: "RACE_ICE_ELEMENTAL",
        sdesc: "ice elemental",
        category: "elemental"
    },
    RACE_WATELEM: {
        code: "RACE_WATELEM",
        sdesc: "water elemental",
        category: "elemental"
    },
    RACE_SPRITE: {
        code: "RACE_SPRITE",
        sdesc: "sprite",
        category: "fey"
    },
    RACE_PIXIE: {
        code: "RACE_PIXIE",
        sdesc: "pixie",
        category: "fey"
    },
    RACE_GIANT: {
        code: "RACE_GIANT",
        sdesc: "giant",
        category: "giant"
    },
    RACE_GIANTCYCLOPS: {
        code: "RACE_GIANTCYCLOPS",
        sdesc: "cyclops",
        category: "giant"
    },
    RACE_ETTIN: {
        code: "RACE_ETTIN",
        sdesc: "ettin",
        category: "giant"
    },
    RACE_GIANT_HILL: {
        code: "RACE_GIANT_HILL",
        sdesc: "hill giant",
        category: "giant"
    },
    RACE_GIANT_OCEAN: {
        code: "RACE_GIANT_OCEAN",
        sdesc: "ocean giant",
        category: "giant"
    },
    RACE_OGRE: {
        code: "RACE_OGRE",
        sdesc: "ogre",
        category: "giant"
    },
    RACE_DEEPIMASKARI: {
        code: "RACE_DEEPIMASKARI",
        sdesc: "deep imaskari",
        category: "humanoid"
    },
    RACE_DWARF: {
        code: "RACE_DWARF",
        sdesc: "dwarf",
        category: "humanoid"
    },
    RACE_DWARFARCTIC: {
        code: "RACE_DWARFARCTIC",
        sdesc: "arctic dwarf",
        category: "humanoid"
    },
    RACE_DUERGAR: {
        code: "RACE_DUERGAR",
        sdesc: "duergar",
        category: "humanoid"
    },
    RACE_DWARFGOLD: {
        code: "RACE_DWARFGOLD",
        sdesc: "gold dwarf",
        category: "humanoid"
    },
    RACE_DWARFSHIELD: {
        code: "RACE_DWARFSHIELD",
        sdesc: "shield dwarf",
        category: "humanoid"
    },
    RACE_DWARFURDUNNIR: {
        code: "RACE_DWARFURDUNNIR",
        sdesc: "urdunnir dwarf",
        category: "humanoid"
    },
    RACE_DWARFWILD: {
        code: "RACE_DWARFWILD",
        sdesc: "wilf dwarf",
        category: "humanoid"
    },
    RACE_ELF: {
        code: "RACE_ELF",
        sdesc: "elf",
        category: "humanoid"
    },
    RACE_ELFAQUATIC: {
        code: "RACE_ELFAQUATIC",
        sdesc: "aquatic elf",
        category: "humanoid"
    },
    RACE_ELFAVARIEL: {
        code: "RACE_ELFAVARIEL",
        sdesc: "avariel elf",
        category: "humanoid"
    },
    RACE_DROW: {
        code: "RACE_DROW",
        sdesc: "drow",
        category: "humanoid"
    },
    RACE_ELFMOON: {
        code: "RACE_ELFMOON",
        sdesc: "moon elf",
        category: "humanoid"
    },
    RACE_ELFSUN: {
        code: "RACE_ELFSUN",
        sdesc: "sun elf",
        category: "humanoid"
    },
    RACE_ELFWILD: {
        code: "RACE_ELFWILD",
        sdesc: "wild elf",
        category: "humanoid"
    },
    RACE_ELFWOOD: {
        code: "RACE_ELFWOOD",
        sdesc: "wood elf",
        category: "humanoid"
    },
    RACE_FISHMAN: {
        code: "RACE_FISHMAN",
        sdesc: "fishman",
        category: "humanoid"
    },
    RACE_KUOTOA: {
        code: "RACE_KUOTOA",
        sdesc: "kuotoa",
        category: "humanoid"
    },
    RACE_GIBBERLING: {
        code: "RACE_GIBBERLING",
        sdesc: "gibberling",
        category: "humanoid"
    },
    RACE_GITH: {
        code: "RACE_GITH",
        sdesc: "gith",
        category: "humanoid"
    },
    RACE_GITHZERAI: {
        code: "RACE_GITHZERAI",
        sdesc: "githzerai",
        category: "humanoid"
    },
    RACE_GNOLL: {
        code: "RACE_GNOLL",
        sdesc: "gnoll",
        category: "humanoid"
    },
    RACE_GNOME: {
        code: "RACE_GNOME",
        sdesc: "gnome",
        category: "humanoid"
    },
    RACE_GNOMEDEEP: {
        code: "RACE_GNOMEDEEP",
        sdesc: "deep gnome",
        category: "humanoid"
    },
    RACE_GNOMEFOREST: {
        code: "RACE_GNOMEFOREST",
        sdesc: "forest gnome",
        category: "humanoid"
    },
    RACE_GNOMEROCK: {
        code: "RACE_GNOMEROCK",
        sdesc: "rock gnome",
        category: "humanoid"
    },
    RACE_GOBLINOID: {
        code: "RACE_GOBLINOID",
        sdesc: "goblinoid",
        category: "humanoid"
    },
    RACE_BUGBEAR: {
        code: "RACE_BUGBEAR",
        sdesc: "bugbear",
        category: "humanoid"
    },
    RACE_GOBLIN: {
        code: "RACE_GOBLIN",
        sdesc: "goblin",
        category: "humanoid"
    },
    RACE_HOBGOBLIN: {
        code: "RACE_HOBGOBLIN",
        sdesc: "hobgoblin",
        category: "humanoid"
    },
    RACE_GREMLIN: {
        code: "RACE_GREMLIN",
        sdesc: "gremlin",
        category: "humanoid"
    },
    RACE_HALFELF: {
        code: "RACE_HALFELF",
        sdesc: "halfelf",
        category: "humanoid"
    },
    RACE_HALFELFAQUATIC: {
        code: "RACE_HALFELFAQUATIC",
        sdesc: "aquatic halfelf",
        category: "humanoid"
    },
    RACE_HALFELFDROW: {
        code: "RACE_HALFELFDROW",
        sdesc: "halfdrow",
        category: "humanoid"
    },
    RACE_HALFLING: {
        code: "RACE_HALFLING",
        sdesc: "halfling",
        category: "humanoid"
    },
    RACE_HALFLINGGHOSTWISE: {
        code: "RACE_HALFLINGGHOSTWISE",
        sdesc: "ghostwise halfling",
        category: "humanoid"
    },
    RACE_HALFLINGLIGHTFOOT: {
        code: "RACE_HALFLINGLIGHTFOOT",
        sdesc: "lightfoot halfling",
        category: "humanoid"
    },
    RACE_HALFLINGSTRONGHEART: {
        code: "RACE_HALFLINGSTRONGHEART",
        sdesc: "strongheart halfling",
        category: "humanoid"
    },
    RACE_HALFORC: {
        code: "RACE_HALFORC",
        sdesc: "halforc",
        category: "humanoid"
    },
    RACE_HUMAN: {
        code: "RACE_HUMAN",
        sdesc: "human",
        category: "humanoid"
    },
    RACE_SHAPESHIFTER: {
        code: "RACE_SHAPESHIFTER",
        sdesc: "shapeshifter",
        category: "humanoid"
    },
    RACE_LYCANTHROPE: {
        code: "RACE_LYCANTHROPE",
        sdesc: "lycanthrope",
        category: "humanoid"
    },
    RACE_LYCANTHROPE_WEREWOLF: {
        code: "RACE_LYCANTHROPE_WEREWOLF",
        sdesc: "werewolf",
        category: "humanoid"
    },
    RACE_ORC: {
        code: "RACE_ORC",
        sdesc: "orc",
        category: "humanoid"
    },
    RACE_ORCGRAY: {
        code: "RACE_ORCGRAY",
        sdesc: "gray orc",
        category: "humanoid"
    },
    RACE_ORCMOUNTAIN: {
        code: "RACE_ORCMOUNTAIN",
        sdesc: "mountain orc",
        category: "humanoid"
    },
    RACE_ORCOROG: {
        code: "RACE_ORCOROG",
        sdesc: "orog orc",
        category: "humanoid"
    },
    RACE_REPTILIAN: {
        code: "RACE_REPTILIAN",
        sdesc: "reptilian",
        category: "humanoid"
    },
    RACE_LIZARDMAN: {
        code: "RACE_LIZARDMAN",
        sdesc: "lizardman",
        category: "humanoid"
    },
    RACE_KOBOLD: {
        code: "RACE_KOBOLD",
        sdesc: "kobold",
        category: "humanoid"
    },
    RACE_TROGLODYTE: {
        code: "RACE_TROGLODYTE",
        sdesc: "troglodyte",
        category: "humanoid"
    },
    RACE_TABAXI: {
        code: "RACE_TABAXI",
        sdesc: "tabaxi",
        category: "humanoid"
    },
    RACE_TROLL: {
        code: "RACE_TROLL",
        sdesc: "troll",
        category: "humanoid"
    },
    RACE_ANKHEG: {
        code: "RACE_ANKHEG",
        sdesc: "ankheg",
        category: "magical"
    },
    RACE_ASPERI: {
        code: "RACE_ASPERI",
        sdesc: "asperi",
        category: "magical"
    },
    RACE_BEHIR: {
        code: "RACE_BEHIR",
        sdesc: "behir",
        category: "magical"
    },
    RACE_BULETTE: {
        code: "RACE_BULETTE",
        sdesc: "bulette",
        category: "magical"
    },
    RACE_CHIMERA: {
        code: "RACE_CHIMERA",
        sdesc: "chimera",
        category: "magical"
    },
    RACE_CHIMERA_BLACK: {
        code: "RACE_CHIMERA_BLACK",
        sdesc: "black chimera",
        category: "magical"
    },
    RACE_CHIMERA_BLUE: {
        code: "RACE_CHIMERA_BLUE",
        sdesc: "blue chimera",
        category: "magical"
    },
    RACE_CHIMERA_GREEN: {
        code: "RACE_CHIMERA_GREEN",
        sdesc: "green chimera",
        category: "magical"
    },
    RACE_CHIMERA_RED: {
        code: "RACE_CHIMERA_RED",
        sdesc: "red chimera",
        category: "magical"
    },
    RACE_CHIMERA_WHITE: {
        code: "RACE_CHIMERA_WHITE",
        sdesc: "white chimera",
        category: "magical"
    },
    RACE_DISPLACER_BEAST: {
        code: "RACE_DISPLACER_BEAST",
        sdesc: "displacer beast",
        category: "magical"
    },
    RACE_FROST_SALAMANDER: {
        code: "RACE_FROST_SALAMANDER",
        sdesc: "frost salamander",
        category: "magical"
    },
    RACE_EAGLE_GIANT: {
        code: "RACE_EAGLE_GIANT",
        sdesc: "giant eagle",
        category: "magical"
    },
    RACE_GIRALLON: {
        code: "RACE_GIRALLON",
        sdesc: "girallon",
        category: "magical"
    },
    RACE_GRIFFON: {
        code: "RACE_GRIFFON",
        sdesc: "griffon",
        category: "magical"
    },
    RACE_HIPPOGRIFF: {
        code: "RACE_HIPPOGRIFF",
        sdesc: "hippogriff",
        category: "magical"
    },
    RACE_LAMIA: {
        code: "RACE_LAMIA",
        sdesc: "lamia",
        category: "magical"
    },
    RACE_MANTICORE: {
        code: "RACE_MANTICORE",
        sdesc: "manticore",
        category: "magical"
    },
    RACE_OWLBEAR: {
        code: "RACE_OWLBEAR",
        sdesc: "owlbear",
        category: "magical"
    },
    RACE_PEGASUS: {
        code: "RACE_PEGASUS",
        sdesc: "pegasus",
        category: "magical"
    },
    RACE_WORMPURPLE: {
        code: "RACE_WORMPURPLE",
        sdesc: "purple worm",
        category: "magical"
    },
    RACE_REMORHAZ: {
        code: "RACE_REMORHAZ",
        sdesc: "remorhaz",
        category: "magical"
    },
    RACE_BAT_DEEP_SINISTER: {
        code: "RACE_BAT_DEEP_SINISTER",
        sdesc: "sinister",
        category: "magical"
    },
    RACE_SPHINX: {
        code: "RACE_SPHINX",
        sdesc: "sphinx",
        category: "magical"
    },
    RACE_SPHINX_ANDRO: {
        code: "RACE_SPHINX_ANDRO",
        sdesc: "andro sphinx",
        category: "magical"
    },
    RACE_STIRGE: {
        code: "RACE_STIRGE",
        sdesc: "stirge",
        category: "magical"
    },
    RACE_SWARM: {
        code: "RACE_SWARM",
        sdesc: "swarm",
        category: "magical"
    },
    RACE_SWARM_LOCUST: {
        code: "RACE_SWARM_LOCUST",
        sdesc: "locust swarm",
        category: "magical"
    },
    RACE_SWARM_WASP: {
        code: "RACE_SWARM_WASP",
        sdesc: "wasp swarm",
        category: "magical"
    },
    RACE_AARAKOCRA: {
        code: "RACE_AARAKOCRA",
        sdesc: "aarakocra",
        category: "monstrous"
    },
    RACE_CENTAUR: {
        code: "RACE_CENTAUR",
        sdesc: "centaur",
        category: "monstrous"
    },
    RACE_CHITINE: {
        code: "RACE_CHITINE",
        sdesc: "chitine",
        category: "monstrous"
    },
    RACE_GARGOYLE: {
        code: "RACE_GARGOYLE",
        sdesc: "gargoyle",
        category: "monstrous"
    },
    RACE_HARPY: {
        code: "RACE_HARPY",
        sdesc: "harpy",
        category: "monstrous"
    },
    RACE_KIRLANAN: {
        code: "RACE_KIRLANAN",
        sdesc: "kirlanan",
        category: "monstrous"
    },
    RACE_MINOTAUR: {
        code: "RACE_MINOTAUR",
        sdesc: "minotaur",
        category: "monstrous"
    },
    RACE_QUAGGOTH: {
        code: "RACE_QUAGGOTH",
        sdesc: "quaggoth",
        category: "monstrous"
    },
    RACE_SAHUAGIN: {
        code: "RACE_SAHUAGIN",
        sdesc: "sahuagin",
        category: "monstrous"
    },
    RACE_SAHUAGIN_SAVAGE: {
        code: "RACE_SAHUAGIN_SAVAGE",
        sdesc: "savage sahuagin",
        category: "monstrous"
    },
    RACE_THRIKREEN: {
        code: "RACE_THRIKREEN",
        sdesc: "thrikreen",
        category: "monstrous"
    },
    RACE_WEMIC: {
        code: "RACE_WEMIC",
        sdesc: "wemic",
        category: "monstrous"
    },
    RACE_YUANTI: {
        code: "RACE_YUANTI",
        sdesc: "yuanti",
        category: "monstrous"
    },
    RACE_SLIME: {
        code: "RACE_SLIME",
        sdesc: "slime",
        category: "ooze"
    },
    RACE_OOZE: {
        code: "RACE_OOZE",
        sdesc: "ooze",
        category: "ooze"
    },
    RACE_GELATIN: {
        code: "RACE_GELATIN",
        sdesc: "gelatin",
        category: "ooze"
    },
    RACE_OOZEGREY: {
        code: "RACE_OOZEGREY",
        sdesc: "grey ooze",
        category: "ooze"
    },
    RACE_AASIMAR: {
        code: "RACE_AASIMAR",
        sdesc: "aasimar",
        category: "outsider"
    },
    RACE_ACHAIERAI: {
        code: "RACE_ACHAIERAI",
        sdesc: "achaierai",
        category: "outsider"
    },
    RACE_ANGEL: {
        code: "RACE_ANGEL",
        sdesc: "angel",
        category: "outsider"
    },
    RACE_ANGEL_ASTRAL_DEVA: {
        code: "RACE_ANGEL_ASTRAL_DEVA",
        sdesc: "angel astral deva",
        category: "outsider"
    },
    RACE_ARCHON: {
        code: "RACE_ARCHON",
        sdesc: "archon",
        category: "outsider"
    },
    RACE_ARCHON_HOUND: {
        code: "RACE_ARCHON_HOUND",
        sdesc: "hound archon",
        category: "outsider"
    },
    RACE_SWORD_ARCHON: {
        code: "RACE_SWORD_ARCHON",
        sdesc: "sword archon",
        category: "outsider"
    },
    RACE_WARDEN_ARCHON: {
        code: "RACE_WARDEN_ARCHON",
        sdesc: "warden archon",
        category: "outsider"
    },
    RACE_ARROWHAWK: {
        code: "RACE_ARROWHAWK",
        sdesc: "arrowhawk",
        category: "outsider"
    },
    RACE_BARGHEST: {
        code: "RACE_BARGHEST",
        sdesc: "barghest",
        category: "outsider"
    },
    RACE_COLCHILN: {
        code: "RACE_COLCHILN",
        sdesc: "colchiln",
        category: "outsider"
    },
    RACE_DEMON: {
        code: "RACE_DEMON",
        sdesc: "demon",
        category: "outsider"
    },
    RACE_BABAU: {
        code: "RACE_BABAU",
        sdesc: "babau",
        category: "outsider"
    },
    RACE_BALOR: {
        code: "RACE_BALOR",
        sdesc: "balor",
        category: "outsider"
    },
    RACE_BARLGURA: {
        code: "RACE_BARLGURA",
        sdesc: "bar-lgura",
        category: "outsider"
    },
    RACE_BEBILITH: {
        code: "RACE_BEBILITH",
        sdesc: "bebilith",
        category: "outsider"
    },
    RACE_CHASME: {
        code: "RACE_CHASME",
        sdesc: "chasme",
        category: "outsider"
    },
    RACE_DRETCH: {
        code: "RACE_DRETCH",
        sdesc: "dretch",
        category: "outsider"
    },
    RACE_GLABREZU: {
        code: "RACE_GLABREZU",
        sdesc: "glabrezu",
        category: "outsider"
    },
    RACE_HEZROU: {
        code: "RACE_HEZROU",
        sdesc: "hezrou",
        category: "outsider"
    },
    RACE_MANE: {
        code: "RACE_MANE",
        sdesc: "mane",
        category: "outsider"
    },
    RACE_MARILITH: {
        code: "RACE_MARILITH",
        sdesc: "marilith",
        category: "outsider"
    },
    RACE_NABASSU: {
        code: "RACE_NABASSU",
        sdesc: "nabassu",
        category: "outsider"
    },
    RACE_NALFESHNEE: {
        code: "RACE_NALFESHNEE",
        sdesc: "nalfeshnee",
        category: "outsider"
    },
    RACE_QUASIT: {
        code: "RACE_QUASIT",
        sdesc: "quasit",
        category: "outsider"
    },
    RACE_RUTTERKIN: {
        code: "RACE_RUTTERKIN",
        sdesc: "rutterkin",
        category: "outsider"
    },
    RACE_SHADOW_DEMON: {
        code: "RACE_SHADOW_DEMON",
        sdesc: "shadow demon",
        category: "outsider"
    },
    RACE_SUCCUBUS: {
        code: "RACE_SUCCUBUS",
        sdesc: "succubus",
        category: "outsider"
    },
    RACE_VROCK: {
        code: "RACE_VROCK",
        sdesc: "vrock",
        category: "outsider"
    },
    RACE_DEVIL: {
        code: "RACE_DEVIL",
        sdesc: "devil",
        category: "outsider"
    },
    RACE_ABISHAI: {
        code: "RACE_ABISHAI",
        sdesc: "abishai",
        category: "outsider"
    },
    RACE_ABISHAI_BLACK: {
        code: "RACE_ABISHAI_BLACK",
        sdesc: "black abishai",
        category: "outsider"
    },
    RACE_ABISHAI_BLUE: {
        code: "RACE_ABISHAI_BLUE",
        sdesc: "blue abishai",
        category: "outsider"
    },
    RACE_ABISHAI_GREEN: {
        code: "RACE_ABISHAI_GREEN",
        sdesc: "green abishai",
        category: "outsider"
    },
    RACE_ABISHAI_RED: {
        code: "RACE_ABISHAI_RED",
        sdesc: "red abishai",
        category: "outsider"
    },
    RACE_ABISHAI_WHITE: {
        code: "RACE_ABISHAI_WHITE",
        sdesc: "white abishai",
        category: "outsider"
    },
    RACE_GELUGON: {
        code: "RACE_GELUGON",
        sdesc: "gelugon",
        category: "outsider"
    },
    RACE_HAMATULA: {
        code: "RACE_HAMATULA",
        sdesc: "hamatula",
        category: "outsider"
    },
    RACE_IMP: {
        code: "RACE_IMP",
        sdesc: "imp",
        category: "outsider"
    },
    RACE_PIT_FIEND: {
        code: "RACE_PIT_FIEND",
        sdesc: "pit fiend",
        category: "outsider"
    },
    RACE_LEMURE: {
        code: "RACE_LEMURE",
        sdesc: "lemure",
        category: "outsider"
    },
    RACE_NUPPERIBO: {
        code: "RACE_NUPPERIBO",
        sdesc: "nupperibo",
        category: "outsider"
    },
    RACE_OSYLUTH: {
        code: "RACE_OSYLUTH",
        sdesc: "osyluth",
        category: "outsider"
    },
    RACE_SPINAGON: {
        code: "RACE_SPINAGON",
        sdesc: "spinagon",
        category: "outsider"
    },
    RACE_DRAEGLOTH: {
        code: "RACE_DRAEGLOTH",
        sdesc: "draegloth",
        category: "outsider"
    },
    RACE_FORMIAN: {
        code: "RACE_FORMIAN",
        sdesc: "formian",
        category: "outsider"
    },
    RACE_FORMIAN_WARRIOR: {
        code: "RACE_FORMIAN_WARRIOR",
        sdesc: "formian warrior",
        category: "outsider"
    },
    RACE_FORMIAN_WORKER: {
        code: "RACE_FORMIAN_WORKER",
        sdesc: "formian worker",
        category: "outsider"
    },
    RACE_GENASI: {
        code: "RACE_GENASI",
        sdesc: "genasi",
        category: "outsider"
    },
    RACE_GENSAIAIR: {
        code: "RACE_GENSAIAIR",
        sdesc: "air genasi",
        category: "outsider"
    },
    RACE_GENSAIEARTH: {
        code: "RACE_GENSAIEARTH",
        sdesc: "earth genasi",
        category: "outsider"
    },
    RACE_GENSAIFIRE: {
        code: "RACE_GENSAIFIRE",
        sdesc: "fire genasi",
        category: "outsider"
    },
    RACE_GENSAIWATER: {
        code: "RACE_GENSAIWATER",
        sdesc: "water genasi",
        category: "outsider"
    },
    RACE_GENIE: {
        code: "RACE_GENIE",
        sdesc: "genie",
        category: "outsider"
    },
    RACE_EFREETI: {
        code: "RACE_EFREETI",
        sdesc: "efreeti",
        category: "outsider"
    },
    RACE_LILLEND: {
        code: "RACE_LILLEND",
        sdesc: "lillend",
        category: "outsider"
    },
    RACE_MEPHIT: {
        code: "RACE_MEPHIT",
        sdesc: "mephit",
        category: "outsider"
    },
    RACE_MEPHIT_AIR: {
        code: "RACE_MEPHIT_AIR",
        sdesc: "air mephit",
        category: "outsider"
    },
    RACE_MEPHIT_DUST: {
        code: "RACE_MEPHIT_DUST",
        sdesc: "dust mephit",
        category: "outsider"
    },
    RACE_MEPHIT_EARTH: {
        code: "RACE_MEPHIT_EARTH",
        sdesc: "earth mephit",
        category: "outsider"
    },
    RACE_MEPHIT_FIRE: {
        code: "RACE_MEPHIT_FIRE",
        sdesc: "fire mephit",
        category: "outsider"
    },
    RACE_MEPHIT_ICE: {
        code: "RACE_MEPHIT_ICE",
        sdesc: "ice mephit",
        category: "outsider"
    },
    RACE_MEPHIT_MAGMA: {
        code: "RACE_MEPHIT_MAGMA",
        sdesc: "magma mephit",
        category: "outsider"
    },
    RACE_MEPHIT_OOZE: {
        code: "RACE_MEPHIT_OOZE",
        sdesc: "ooze mephit",
        category: "outsider"
    },
    RACE_MEPHIT_SALT: {
        code: "RACE_MEPHIT_SALT",
        sdesc: "salt mephit",
        category: "outsider"
    },
    RACE_MEPHIT_STEAM: {
        code: "RACE_MEPHIT_STEAM",
        sdesc: "steam mephit",
        category: "outsider"
    },
    RACE_MEPHIT_WATER: {
        code: "RACE_MEPHIT_WATER",
        sdesc: "water mephit",
        category: "outsider"
    },
    RACE_NIGHTMARE: {
        code: "RACE_NIGHTMARE",
        sdesc: "nightmare",
        category: "outsider"
    },
    RACE_NIIATH: {
        code: "RACE_NIIATH",
        sdesc: "ni'iath",
        category: "outsider"
    },
    RACE_RAKSHASA: {
        code: "RACE_RAKSHASA",
        sdesc: "rakshasa",
        category: "outsider"
    },
    RACE_RAST: {
        code: "RACE_RAST",
        sdesc: "rast",
        category: "outsider"
    },
    RACE_RAVID: {
        code: "RACE_RAVID",
        sdesc: "ravid",
        category: "outsider"
    },
    RACE_SHADE: {
        code: "RACE_SHADE",
        sdesc: "shade",
        category: "outsider"
    },
    RACE_SLAAD: {
        code: "RACE_SLAAD",
        sdesc: "slaad",
        category: "outsider"
    },
    RACE_SLAADDEATH: {
        code: "RACE_SLAADDEATH",
        sdesc: "death slaad",
        category: "outsider"
    },
    RACE_SLAADGREEN: {
        code: "RACE_SLAADGREEN",
        sdesc: "green slaad",
        category: "outsider"
    },
    RACE_TIEFLING: {
        code: "RACE_TIEFLING",
        sdesc: "tiefling",
        category: "outsider"
    },
    RACE_FEYRI: {
        code: "RACE_FEYRI",
        sdesc: "feyri",
        category: "outsider"
    },
    RACE_TANARUKK: {
        code: "RACE_TANARUKK",
        sdesc: "tanarukk",
        category: "outsider"
    },
    RACE_TITAN: {
        code: "RACE_TITAN",
        sdesc: "titan",
        category: "outsider"
    },
    RACE_TOJANIDA: {
        code: "RACE_TOJANIDA",
        sdesc: "tojanida",
        category: "outsider"
    },
    RACE_XORN: {
        code: "RACE_XORN",
        sdesc: "xorn",
        category: "outsider"
    },
    RACE_GREENWARDER: {
        code: "RACE_GREENWARDER",
        sdesc: "green warder",
        category: "plant"
    },
    RACE_MYCONOID: {
        code: "RACE_MYCONOID",
        sdesc: "myconoid",
        category: "plant"
    },
    RACE_MYCONOID_SOVEREIGN: {
        code: "RACE_MYCONOID_SOVEREIGN",
        sdesc: "myconoid sovereign",
        category: "plant"
    },
    RACE_MYCONOID_LEADER: {
        code: "RACE_MYCONOID_LEADER",
        sdesc: "myconoid leader",
        category: "plant"
    },
    RACE_MYCONOID_GUARD: {
        code: "RACE_MYCONOID_GUARD",
        sdesc: "myconoid guard",
        category: "plant"
    },
    RACE_MYCONOID_WORKER: {
        code: "RACE_MYCONOID_WORKER",
        sdesc: "myconoid worker",
        category: "plant"
    },
    RACE_PLANT: {
        code: "RACE_PLANT",
        sdesc: "plant",
        category: "plant"
    },
    RACE_BLOODTHORN: {
        code: "RACE_BLOODTHORN",
        sdesc: "bloodthorn",
        category: "plant"
    },
    RACE_SHRIEKER: {
        code: "RACE_SHRIEKER",
        sdesc: "shrieker",
        category: "plant"
    },
    RACE_TREANT: {
        code: "RACE_TREANT",
        sdesc: "treant",
        category: "plant"
    },
    RACE_VIPER_TREE: {
        code: "RACE_VIPER_TREE",
        sdesc: "viper tree",
        category: "plant"
    },
    RACE_CORPOREAL: {
        code: "RACE_CORPOREAL",
        sdesc: "corporeal",
        category: "undead"
    },
    RACE_BAT_DEEP_BONEBAT: {
        code: "RACE_BAT_DEEP_BONEBAT",
        sdesc: "bonebat",
        category: "undead"
    },
    RACE_GHOUL: {
        code: "RACE_GHOUL",
        sdesc: "ghoul",
        category: "undead"
    },
    RACE_GHAST: {
        code: "RACE_GHAST",
        sdesc: "ghast",
        category: "undead"
    },
    RACE_LACEDON: {
        code: "RACE_LACEDON",
        sdesc: "lacedon",
        category: "undead"
    },
    RACE_LICH: {
        code: "RACE_LICH",
        sdesc: "lich",
        category: "undead"
    },
    RACE_MUMMY: {
        code: "RACE_MUMMY",
        sdesc: "mummy",
        category: "undead"
    },
    RACE_SKELETON: {
        code: "RACE_SKELETON",
        sdesc: "skeleton",
        category: "undead"
    },
    RACE_UNDEAD: {
        code: "RACE_UNDEAD",
        sdesc: "undead",
        category: "undead"
    },
    RACE_VAMPIRE: {
        code: "RACE_VAMPIRE",
        sdesc: "vampire",
        category: "undead"
    },
    RACE_WIGHT: {
        code: "RACE_WIGHT",
        sdesc: "wight",
        category: "undead"
    },
    RACE_ZOMBIE: {
        code: "RACE_ZOMBIE",
        sdesc: "zombie",
        category: "undead"
    },
    RACE_INCORPOREAL: {
        code: "RACE_INCORPOREAL",
        sdesc: "incorporeal",
        category: "undead"
    },
    RACE_GHOST: {
        code: "RACE_GHOST",
        sdesc: "ghost",
        category: "undead"
    },
    RACE_SPIRIT: {
        code: "RACE_SPIRIT",
        sdesc: "spirit",
        category: "undead"
    },
    RACE_WRAITH: {
        code: "RACE_WRAITH",
        sdesc: "wraith",
        category: "undead"
    },
    RACE_BEETLE: {
        code: "RACE_BEETLE",
        sdesc: "beetle",
        category: "vermin"
    },
    RACE_BEETLE_BOMBARDIER: {
        code: "RACE_BEETLE_BOMBARDIER",
        sdesc: "bombardier beetle",
        category: "vermin"
    },
    RACE_BEETLE_GIANT_FIRE: {
        code: "RACE_BEETLE_GIANT_FIRE",
        sdesc: "giant fire beetle",
        category: "vermin"
    },
    RACE_BEETLE_GIANT_STAG: {
        code: "RACE_BEETLE_GIANT_STAG",
        sdesc: "giant stag beetle",
        category: "vermin"
    },
    RACE_BEETLE_GIANT_WATER: {
        code: "RACE_BEETLE_GIANT_WATER",
        sdesc: "giant water beetle",
        category: "vermin"
    },
    RACE_CAVE_FISHER: {
        code: "RACE_CAVE_FISHER",
        sdesc: "cave fisher",
        category: "vermin"
    },
    RACE_ANT_GIANT: {
        code: "RACE_ANT_GIANT",
        sdesc: "giant ant",
        category: "vermin"
    },
    RACE_ANT_GIANT_WORKER: {
        code: "RACE_ANT_GIANT_WORKER",
        sdesc: "giant worker ant",
        category: "vermin"
    },
    RACE_ANT_GIANT_SOLDIER: {
        code: "RACE_ANT_GIANT_SOLDIER",
        sdesc: "giant soldier ant",
        category: "vermin"
    },
    RACE_ANT_GIANT_QUEEN: {
        code: "RACE_ANT_GIANT_QUEEN",
        sdesc: "giant queen ant",
        category: "vermin"
    },
    RACE_BEE_GIANT: {
        code: "RACE_BEE_GIANT",
        sdesc: "giant bee",
        category: "vermin"
    },
    RACE_GIANTCOACKROACH: {
        code: "RACE_GIANTCOACKROACH",
        sdesc: "giant coackroach",
        category: "vermin"
    },
    RACE_WASP_GIANT: {
        code: "RACE_WASP_GIANT",
        sdesc: "giant wasp",
        category: "vermin"
    },
    RACE_INSECT: {
        code: "RACE_INSECT",
        sdesc: "insect",
        category: "vermin"
    },
    RACE_CENTIPEDE_MONSTROUS: {
        code: "RACE_CENTIPEDE_MONSTROUS",
        sdesc: "monstrous centipede",
        category: "vermin"
    },
    RACE_SCORPION: {
        code: "RACE_SCORPION",
        sdesc: "monstrous scorpion",
        category: "vermin"
    },
    RACE_SPIDER: {
        code: "RACE_SPIDER",
        sdesc: "spider",
        category: "vermin"
    }
};

const MOB_SEXES = {
    SEX_MALE: {
        code: "SEX_MALE",
        sdesc: "SEX_MALE"
    },
    SEX_FEMALE: {
        code: "SEX_FEMALE",
        sdesc: "SEX_FEMALE"
    },
    SEX_NEUTRAL: {
        code: "SEX_NEUTRAL",
        sdesc: "SEX_NEUTRAL"
    }
};

const MOB_POSITIONS = {
    POS_DEAD: {
        code: "POS_DEAD",
        sdesc: "POS_DEAD"
    },
    POS_MORTAL: {
        code: "POS_MORTAL",
        sdesc: "POS_MORTAL"
    },
    POS_INCAP: {
        code: "POS_INCAP",
        sdesc: "POS_INCAP"
    },
    POS_STUNNED: {
        code: "POS_STUNNED",
        sdesc: "POS_STUNNED"
    },
    POS_SLEEPING: {
        code: "POS_SLEEPING",
        sdesc: "POS_SLEEPING"
    },
    POS_MEDITATING: {
        code: "POS_MEDITATING",
        sdesc: "POS_MEDITATING"
    },
    POS_RESTING: {
        code: "POS_RESTING",
        sdesc: "POS_RESTING"
    },
    POS_KNEELING: {
        code: "POS_KNEELING",
        sdesc: "POS_KNEELING"
    },
    POS_FIGHTING: {
        code: "POS_FIGHTING",
        sdesc: "POS_FIGHTING"
    },
    POS_STANDING: {
        code: "POS_STANDING",
        sdesc: "POS_STANDING"
    },
    POS_MOUNTED: {
        code: "POS_MOUNTED",
        sdesc: "POS_MOUNTED"
    },
    POS_SHOVE: {
        code: "POS_SHOVE",
        sdesc: "POS_SHOVE"
    },
    POS_DRAG: {
        code: "POS_DRAG",
        sdesc: "POS_DRAG"
    }
};

const MOB_DEITIES = {
    DEITY_NONE: {
        code: "DEITY_NONE",
        sdesc: "DEITY_NONE"
    },
    DEITY_CHAUNTEA: {
        code: "DEITY_CHAUNTEA",
        sdesc: "DEITY_CHAUNTEA"
    },
    DEITY_TYR: {
        code: "DEITY_TYR",
        sdesc: "DEITY_TYR"
    },
    DEITY_MYSTRA: {
        code: "DEITY_MYSTRA",
        sdesc: "DEITY_MYSTRA"
    },
    DEITY_ILMATER: {
        code: "DEITY_ILMATER",
        sdesc: "DEITY_ILMATER"
    },
    DEITY_MASK: {
        code: "DEITY_MASK",
        sdesc: "DEITY_MASK"
    },
    DEITY_KELEMVOR: {
        code: "DEITY_KELEMVOR",
        sdesc: "DEITY_KELEMVOR"
    },
    DEITY_SUNE: {
        code: "DEITY_SUNE",
        sdesc: "DEITY_SUNE"
    },
    DEITY_MIELIKKI: {
        code: "DEITY_MIELIKKI",
        sdesc: "DEITY_MIELIKKI"
    },
    DEITY_TEMPUS: {
        code: "DEITY_TEMPUS",
        sdesc: "DEITY_TEMPUS"
    },
    DEITY_CYRIC: {
        code: "DEITY_CYRIC",
        sdesc: "DEITY_CYRIC"
    },
    DEITY_LATHANDER: {
        code: "DEITY_LATHANDER",
        sdesc: "DEITY_LATHANDER"
    },
    DEITY_MALAR: {
        code: "DEITY_MALAR",
        sdesc: "DEITY_MALAR"
    },
    DEITY_GOND: {
        code: "DEITY_GOND",
        sdesc: "DEITY_GOND"
    },
    DEITY_SELUNE: {
        code: "DEITY_SELUNE",
        sdesc: "DEITY_SELUNE"
    },
    DEITY_TYMORA: {
        code: "DEITY_TYMORA",
        sdesc: "DEITY_TYMORA"
    },
    DEITY_LOVIATAR: {
        code: "DEITY_LOVIATAR",
        sdesc: "DEITY_LOVIATAR"
    },
    DEITY_HELM: {
        code: "DEITY_HELM",
        sdesc: "DEITY_HELM"
    },
    DEITY_TALOS: {
        code: "DEITY_TALOS",
        sdesc: "DEITY_TALOS"
    },
    DEITY_BESHABA: {
        code: "DEITY_BESHABA",
        sdesc: "DEITY_BESHABA"
    },
    DEITY_OGHMA: {
        code: "DEITY_OGHMA",
        sdesc: "DEITY_OGHMA"
    },
    DEITY_LLOTH: {
        code: "DEITY_LLOTH",
        sdesc: "DEITY_LLOTH"
    },
    DEITY_CORELLON: {
        code: "DEITY_CORELLON",
        sdesc: "DEITY_CORELLON"
    },
    DEITY_MORADIN: {
        code: "DEITY_MORADIN",
        sdesc: "DEITY_MORADIN"
    },
    DEITY_GRUUMSH: {
        code: "DEITY_GRUUMSH",
        sdesc: "DEITY_GRUUMSH"
    },
    DEITY_TORM: {
        code: "DEITY_TORM",
        sdesc: "DEITY_TORM"
    },
    DEITY_YONDALLA: {
        code: "DEITY_YONDALLA",
        sdesc: "DEITY_YONDALLA"
    },
    DEITY_GARL: {
        code: "DEITY_GARL",
        sdesc: "DEITY_GARL"
    },
    DEITY_SHAR: {
        code: "DEITY_SHAR",
        sdesc: "DEITY_SHAR"
    },
    DEITY_UMBERLEE: {
        code: "DEITY_UMBERLEE",
        sdesc: "DEITY_UMBERLEE"
    },
    DEITY_WAUKEEN: {
        code: "DEITY_WAUKEEN",
        sdesc: "DEITY_WAUKEEN"
    },
    DEITY_BANE: {
        code: "DEITY_BANE",
        sdesc: "DEITY_BANE"
    },
    DEITY_TALONA: {
        code: "DEITY_TALONA",
        sdesc: "DEITY_TALONA"
    },

};

const MOB_ACT_FLAGS = {
    ACT_SENTINEL: {
        code: "ACT_SENTINEL",
        sdesc: "ACT_SENTINEL",
        ldesc: "The mobile stays in one room"
    },
    ACT_SCAVENGER: {
        code: "ACT_SCAVENGER",
        sdesc: "ACT_SCAVENGER",
        ldesc: "The mobile picks up objects on the ground"
    },
    ACT_IS_HEALER: {
        code: "ACT_IS_HEALER",
        sdesc: "ACT_IS_HEALER",
        ldesc: "Mobile is a healer using the 'heal' command"
    },
    ACT_AGGRESSIVE: {
        code: "ACT_AGGRESSIVE",
        sdesc: "ACT_AGGRESSIVE",
        ldesc: "The mobile attacks PC's when they enter the room the mob is in"
    },
    ACT_STAY_AREA: {
        code: "ACT_STAY_AREA",
        sdesc: "ACT_STAY_AREA",
        ldesc: "The mobile will not leave the area it has been loaded into. If this is not set the mobile can wander into other areas unless stopped by a nomob flag on a room or an exit."
    },
    ACT_WIMPY: {
        code: "ACT_WIMPY",
        sdesc: "ACT_WIMPY",
        ldesc: "The mobile flees when hurt. Many pets and mounts will be flagged with this, unless they are bred for war. In addition mobiles with this flag, will submit to the demand command."
    },
    ACT_PET: {
        code: "ACT_PET",
        sdesc: "ACT_PET",
        ldesc: "For mobiles that are to be pets and animals that can be claimed. Do not use on horses or anything that should be considered a mount."
    },
    ACT_UNDEAD: {
        code: "ACT_UNDEAD",
        sdesc: "ACT_UNDEAD",
        ldesc: "For undead mobiles. Make sure to use this on undead mobs as it is used by the favour system."
    },
    ACT_NOSHOVE: {
        code: "ACT_NOSHOVE",
        sdesc: "ACT_NOSHOVE",
        ldesc: "Mobile cannot be shoved. This is important for mobiles who should always be found in a certain spot."
    },
    ACT_NOFIGHT: {
        code: "ACT_NOFIGHT",
        sdesc: "ACT_NOFIGHT",
        ldesc: "Mobile will not fight back. Part of the killmode code."
    },
    ACT_BANK: {
        code: "ACT_BANK",
        sdesc: "ACT_BANK",
        ldesc: "Mobile is a banker"
    },
    ACT_NOWANDER: {
        code: "ACT_NOWANDER",
        sdesc: "ACT_NOWANDER",
        ldesc: "Doesn't wander outside the sector type it is loaded in"
    },
    ACT_MOUNTABLE: {
        code: "ACT_MOUNTABLE",
        sdesc: "ACT_MOUNTABLE",
        ldesc: "The mobile can be mounted."
    },
    ACT_SECRETIVE: {
        code: "ACT_SECRETIVE",
        sdesc: "ACT_SECRETIVE",
        ldesc: "The mobile's actions are not seen."
    },
    ACT_CITIZEN: {
        code: "ACT_CITIZEN",
        sdesc: "ACT_CITIZEN",
        ldesc: "Mobile is a citizen and affects a character's lawful status if killed. This is also used in the games justice system."
    },
    ACT_MOBINVIS: {
        code: "ACT_MOBINVIS",
        sdesc: "ACT_MOBINVIS",
        ldesc: "Mobile's cannot be seen by mortals even with detect invis. It is like an immortals wizinvis. Can only be seen by immortals."
    },
    ACT_NOASSIST: {
        code: "ACT_NOASSIST",
        sdesc: "ACT_NOASSIST",
        ldesc: "Does not assist other mobiles or characters in battle."
    },
    ACT_REQUEST: {
        code: "ACT_REQUEST",
        sdesc: "ACT_REQUEST",
        ldesc: "The armour that the mobile wears can be requested by good aligned with the request command. Do not use on shop-keepers."
    },
    ACT_NOCORPSE: {
        code: "ACT_NOCORPSE",
        sdesc: "ACT_NOCORPSE",
        ldesc: "The mobile drops no corpse on death. Ideal for dummies."
    }

};

const MOB_AFFECTS = {
    AFF_BLIND: {
        code: "AFF_BLIND",
        sdesc: "AFF_BLIND",
        ldesc: "Mobile is affected by blindness"
    },
    AFF_INVIS: {
        code: "AFF_INVIS",
        sdesc: "AFF_INVIS",
        ldesc: "Mobile is invisible"
    },
    AFF_DETECT_EVIL: {
        code: "AFF_DETECT_EVIL",
        sdesc: "AFF_DETECT_EVIL",
        ldesc: "Mobile can detect evil"
    },
    AFF_DETECT_INVIS: {
        code: "AFF_DETECT_INVIS",
        sdesc: "AFF_DETECT_INVIS",
        ldesc: "Mobile can detect magic"
    },
    AFF_DETECT_MAGIC: {
        code: "AFF_DETECT_MAGIC",
        sdesc: "AFF_DETECT_MAGIC",
        ldesc: "Mobile can detect magic"
    },
    AFF_DETECT_HIDDEN: {
        code: "AFF_DETECT_HIDDEN",
        sdesc: "AFF_DETECT_HIDDEN",
        ldesc: "Mobile can detect hidden creatures"
    },
    AFF_DETECT_BURIED: {
        code: "AFF_DETECT_BURIED",
        sdesc: "AFF_DETECT_BURIED",
        ldesc: "Mobile can detect buried"
    },
    AFF_SANCTUARY: {
        code: "AFF_SANCTUARY",
        sdesc: "AFF_SANCTUARY",
        ldesc: "Mobile is protected by sanctuary"
    },
    AFF_FAERIE_FIRE: {
        code: "AFF_FAERIE_FIRE",
        sdesc: "AFF_FAERIE_FIRE",
        ldesc: "Mobile is affected by faerie fire"
    },
    AFF_INFRARED: {
        code: "AFF_INFRARED",
        sdesc: "AFF_INFRARED",
        ldesc: "Mobile has infravision"
    },
    AFF_CURSE: {
        code: "AFF_CURSE",
        sdesc: "AFF_CURSE",
        ldesc: "Mobile is cursed"
    },
    AFF_POISON: {
        code: "AFF_POISON",
        sdesc: "AFF_POISON",
        ldesc: "Mobile is poisoned"
    },
    AFF_PROTECT: {
        code: "AFF_PROTECT",
        sdesc: "AFF_PROTECT",
        ldesc: "Mobile is protected by protection"
    },
    AFF_PARALYSIS: {
        code: "AFF_PARALYSIS",
        sdesc: "AFF_PARALYSIS",
        ldesc: "Mobile is paralyzed"
    },
    AFF_SNEAK: {
        code: "AFF_SNEAK",
        sdesc: "AFF_SNEAK",
        ldesc: "Mobile is sneaking"
    },
    AFF_HIDE: {
        code: "AFF_HIDE",
        sdesc: "AFF_HIDE",
        ldesc: "Mobile is hiding"
    },
    AFF_SLEEP: {
        code: "AFF_SLEEP",
        sdesc: "AFF_SLEEP",
        ldesc: "Mobile is affected by sleep spell"
    },
    AFF_CHARM: {
        code: "AFF_CHARM",
        sdesc: "AFF_CHARM",
        ldesc: "Mobile is charmed"
    },
    AFF_FLYING: {
        code: "AFF_FLYING",
        sdesc: "AFF_FLYING",
        ldesc: "Mobile is is flying"
    },
    AFF_PASS_DOOR: {
        code: "AFF_PASS_DOOR",
        sdesc: "AFF_PASS_DOOR",
        ldesc: "Mobile can pass door"
    },
    AFF_FLOATING: {
        code: "AFF_FLOATING",
        sdesc: "AFF_FLOATING",
        ldesc: "Mobile is floating"
    },
    AFF_TRUE_SIGHT: {
        code: "AFF_TRUE_SIGHT",
        sdesc: "AFF_TRUE_SIGHT",
        ldesc: "Mobile is affected by truesight"
    },
    AFF_FIRESHIELD: {
        code: "AFF_FIRESHIELD",
        sdesc: "AFF_FIRESHIELD",
        ldesc: "Mobile is affected by fireshield"
    },
    AFF_SHOCKSHIELD: {
        code: "AFF_SHOCKSHIELD",
        sdesc: "AFF_SHOCKSHIELD",
        ldesc: "Mobile is affected by shockshield"
    },
    AFF_ICESHIELD: {
        code: "AFF_ICESHIELD",
        sdesc: "AFF_ICESHIELD",
        ldesc: "Mobile is affected by iceshield"
    },
    AFF_BERSERK: {
        code: "AFF_BERSERK",
        sdesc: "AFF_BERSERK",
        ldesc: "Mobile is berserk when fighting"
    },
    AFF_WATER_BREATHING: {
        code: "AFF_WATER_BREATHING",
        sdesc: "AFF_WATER_BREATHING",
        ldesc: "Mobile is affected by water breathing"
    },
    AFF_GUARDIAN: {
        code: "AFF_GUARDIAN",
        sdesc: "AFF_GUARDIAN",
        ldesc: "Mobile wakes you if someone walks in while you sleep"
    }
};

const MOB_ALIGNMENTS = {
    LAWFUL_GOOD: {
        code: 1000,
        sdesc: "Lawful Good"
    },
    NEUTRAL_GOOD: {
        code: 650,
        sdesc: "Neutral Good"
    },
    CHAOTIC_GOOD: {
        code: 450,
        sdesc: "Chaotic Good"
    },
    LAWFUL_NEUTRAL: {
        code: 200,
        sdesc: "Lawful Neutral"
    },
    TRUE_NEUTRAL: {
        code: 0,
        sdesc: "True Neutral"
    },
    CHAOTIC_NEUTRAL: {
        code: -200,
        sdesc: "Chaotic Neutral"
    },
    LAWFUL_EVIL: {
        code: -450,
        sdesc: "Lawful Evil"
    },
    NEUTRAL_EVIL: {
        code: -650,
        sdesc: "Neutral Evil"
    },
    CHAOTIC_EVIL: {
        code: -1000,
        sdesc: "Chaotic Evil"
    }
};

const MOB_RIS = {
    RIS_FIRE: {
        code: "RIS_FIRE",
        sdesc: "RIS_FIRE",
        ldesc: "Spells that are firebased, such as fireball burning hands etc"
    },
    RIS_COLD: {
        code: "RIS_COLD",
        sdesc: "RIS_COLD",
        ldesc: "Spells that are cold based, such as chill touch etc"
    },
    RIS_ELECTRICITY: {
        code: "RIS_ELECTRICITY",
        sdesc: "RIS_ELECTRICITY",
        ldesc: "Spells that are electricity based, such as call lightning etc"
    },
    RIS_ENERGY: {
        code: "RIS_ENERGY",
        sdesc: "RIS_ENERGY",
        ldesc: "Spells that are energy based, such as disintergrate etc."
    },
    RIS_BLUNT: {
        code: "RIS_BLUNT",
        sdesc: "RIS_BLUNT",
        ldesc: "Resistant or suseptible to blunt weapons, such as maces etc."
    },
    RIS_PIERCE: {
        code: "RIS_PIERCE",
        sdesc: "RIS_PIERCE",
        ldesc: "Resistant or suseptible to piercing weapons, such as daggers etc"
    },
    RIS_SLASH: {
        code: "RIS_SLASH",
        sdesc: "RIS_SLASH",
        ldesc: "Resistant or suseptible to slashing weapons, such as swords etc"
    },
    RIS_ACID: {
        code: "RIS_ACID",
        sdesc: "RIS_ACID",
        ldesc: "Spells that are acid based such as, acid blast etc."
    },
    RIS_POISON: {
        code: "RIS_POISON",
        sdesc: "RIS_POISON",
        ldesc: "Resistant or suseptible to poison, including potions, poisoned foods and drinks, poisoned weapons and poison based spells"
    },
    RIS_DRAIN: {
        code: "RIS_DRAIN",
        sdesc: "RIS_DRAIN",
        ldesc: "Spells that a are necromantic based, such as vampiric touch etc."
    },
    RIS_SLEEP: {
        code: "RIS_SLEEP",
        sdesc: "RIS_SLEEP",
        ldesc: "Spells that are sleep based, such as the sleep spell etc."
    },
    RIS_CHARM: {
        code: "RIS_CHARM",
        sdesc: "RIS_CHARM",
        ldesc: "Spells and skills that are charm based, such as charm person, charm spell, influence etc."
    },
    RIS_HOLD: {
        code: "RIS_HOLD",
        sdesc: "RIS_HOLD",
        ldesc: "Spells that are hold based, such as hold, web, paralysis"
    },
    RIS_NONMAGIC: {
        code: "RIS_NONMAGIC",
        sdesc: "RIS_NONMAGIC",
        ldesc: "Resistant or suseptible to non magical weapons"
    },
    RIS_SUMMON: {
        code: "RIS_SUMMON",
        sdesc: "RIS_SUMMON",
        ldesc: "Resistant or suseptible to being summoned"
    },
    RIS_HOLY: {
        code: "RIS_HOLY",
        sdesc: "RIS_HOLY",
        ldesc: "Resistant or suseptible to healing based spells."
    },
    RIS_MENTAL: {
        code: "RIS_MENTAL",
        sdesc: "RIS_MENTAL",
        ldesc: "Resistant or suseptible to mental based spells, revive, mind wrench etc"
    },
    RIS_DROWNING: {
        code: "RIS_DROWNING",
        sdesc: "RIS_DROWNING",
        ldesc: "Resistant or suseptible to physical attacks like earthquake, drowning"
    },
    RIS_LIGHT: {
        code: "RIS_LIGHT",
        sdesc: "RIS_LIGHT",
        ldesc: "Resistant or suseptible to light based spells such as sunray etc"
    },
    RIS_SOUND: {
        code: "RIS_SOUND",
        sdesc: "RIS_SOUND",
        ldesc: "Resistant or suseptible to sound based spells such as, sonic resonance etc"
    },
    RIS_MAGIC: {
        code: "RIS_MAGIC",
        sdesc: "RIS_MAGIC",
        ldesc: "Resistant or suseptible to magical weapons"
    },
    RIS_WOOD: {
        code: "RIS_WOOD",
        sdesc: "RIS_WOOD",
        ldesc: "Resistant or suseptible to non magical weapons made of wood."
    },
    RIS_SILVER: {
        code: "RIS_SILVER",
        sdesc: "RIS_SILVER",
        ldesc: "Resistant or suseptible to non magical weapons made of silver"
    },
    RIS_IRON: {
        code: "RIS_IRON",
        sdesc: "RIS_IRON",
        ldesc: "Resistant or suseptible to non magical weapons made of iron"
    }
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
    constitution: {
        code: "constitution",
        sdesc: "constitution"
    },
    strength: {
        code: "strength",
        sdesc: "strength"
    },
    wisdom: {
        code: "wisdom",
        sdesc: "wisdom"
    },
    intelligence: {
        code: "intelligence",
        sdesc: "intelligence"
    },
    charisma: {
        code: "charisma",
        sdesc: "charisma"
    },
    luck: {
        code: "luck",
        sdesc: "luck"
    },
    dexterity: {
        code: "dexterity",
        sdesc: "dexterity"
    },
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
    appraise: {
        code: "appraise",
        sdesc: "appraise",
        do_not_use: false,
    },
    armorsmithing: {
        code: "armorsmithing",
        sdesc: "armorsmithing",
        do_not_use: false,
    },
    fletching: {
        code: "fletching",
        sdesc: "fletching",
        do_not_use: false,
    },
    lapidary: {
        code: "lapidary",
        sdesc: "lapidary",
        do_not_use: false,
    },
    leathermaking: {
        code: "leathermaking",
        sdesc: "leathermaking",
        do_not_use: false,
    },
    logging: {
        code: "logging",
        sdesc: "logging",
        do_not_use: false,
    },
    mining: {
        code: "mining",
        sdesc: "mining",
        do_not_use: false,
    },
    smelting: {
        code: "smelting",
        sdesc: "smelting",
        do_not_use: false,
    },
    tanning: {
        code: "tanning",
        sdesc: "tanning",
        do_not_use: false,
    },
    weaponsmithing: {
        code: "weaponsmithing",
        sdesc: "weaponsmithing",
        do_not_use: false,
    },
    woodworking: {
        code: "woodworking",
        sdesc: "woodworking",
        do_not_use: false,
    },
    clothmaking: {
        code: "clothmaking",
        sdesc: "clothmaking",
        do_not_use: false,
    },
    herbalism: {
        code: "herbalism",
        sdesc: "herbalism",
        do_not_use: false,
    },
    tailoring: {
        code: "tailoring",
        sdesc: "tailoring",
        do_not_use: false,
    }
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
    SUBSTANCE_WOOD: {
        code: "SUBSTANCE_WOOD",
        sdesc: "SUBSTANCE_WOOD",
        do_not_use: false,
    },
    SUBSTANCE_METAL: {
        code: "SUBSTANCE_METAL",
        sdesc: "SUBSTANCE_METAL",
        do_not_use: false,
    },
    SUBSTANCE_GEMSTONE: {
        code: "SUBSTANCE_GEMSTONE",
        sdesc: "SUBSTANCE_GEMSTONE",
        do_not_use: false,
    },
    SUBSTANCE_LEATHER: {
        code: "SUBSTANCE_LEATHER",
        sdesc: "SUBSTANCE_LEATHER",
        do_not_use: false,
    },
    SUBSTANCE_EXOTIC: {
        code: "SUBSTANCE_EXOTIC",
        sdesc: "SUBSTANCE_EXOTIC",
        do_not_use: false,
    }
};

const MOB_REPAIR_RECHARGE = {
    SHOP_FIX: {
        code: "SHOP_FIX",
        sdesc: "SHOP_FIX",
    },
    SHOP_RECHARGE: {
        code: "SHOP_RECHARGE",
        sdesc: "SHOP_RECHARGE",
    }
};

const MOB_WEAR_RESETS = {
    WEAR_FINGER_L: {
        code: "WEAR_FINGER_L",
        sdesc: "WEAR_FINGER_L"
    },
    WEAR_FINGER_R: {
        code: "WEAR_FINGER_R",
        sdesc: "WEAR_FINGER_R"
    },
    WEAR_NECK_A: {
        code: "WEAR_NECK_A",
        sdesc: "WEAR_NECK_A"
    },
    WEAR_NECK_B: {
        code: "WEAR_NECK_B",
        sdesc: "WEAR_NECK_B"
    },
    WEAR_BODY: {
        code: "WEAR_BODY",
        sdesc: "WEAR_BODY"
    },
    WEAR_HEAD: {
        code: "WEAR_HEAD",
        sdesc: "WEAR_HEAD"
    },
    WEAR_LEGS: {
        code: "WEAR_LEGS",
        sdesc: "WEAR_LEGS"
    },
    WEAR_FEET: {
        code: "WEAR_FEET",
        sdesc: "WEAR_FEET"
    },
    WEAR_HANDS: {
        code: "WEAR_HANDS",
        sdesc: "WEAR_HANDS"
    },
    WEAR_ARMS: {
        code: "WEAR_ARMS",
        sdesc: "WEAR_ARMS"
    },
    WEAR_WAIST: {
        code: "WEAR_WAIST",
        sdesc: "WEAR_WAIST"
    },
    WEAR_WRIST_L: {
        code: "WEAR_WRIST_L",
        sdesc: "WEAR_WRIST_L"
    },
    WEAR_WRIST_R: {
        code: "WEAR_WRIST_R",
        sdesc: "WEAR_WRIST_R"
    },
    WEAR_LEFT_HAND: {
        code: "WEAR_LEFT_HAND",
        sdesc: "WEAR_LEFT_HAND"
    },
    WEAR_RIGHT_HAND: {
        code: "WEAR_RIGHT_HAND",
        sdesc: "WEAR_RIGHT_HAND"
    },
    WEAR_BOTH_HANDS: {
        code: "WEAR_BOTH_HANDS",
        sdesc: "WEAR_BOTH_HANDS"
    },
    WEAR_EARS: {
        code: "WEAR_EARS",
        sdesc: "WEAR_EARS"
    },
    WEAR_EYES: {
        code: "WEAR_EYES",
        sdesc: "WEAR_EYES"
    }
};

const DOOR_RESETS = {
    DOOR_OPEN_UNLOCKED: {
        code: "DOOR_OPEN_UNLOCKED",
        sdesc: "DOOR_OPEN_UNLOCKED"
    },
    DOOR_CLOSED_UNLOCKED: {
        code: "DOOR_CLOSED_UNLOCKED",
        sdesc: "DOOR_CLOSED_UNLOCKED"
    },
    DOOR_CLOSED_LOCKED: {
        code: "DOOR_CLOSED_LOCKED",
        sdesc: "DOOR_CLOSED_LOCKED"
    },
    DOOR_NONE: {
        code: "DOOR_NONE",
        sdesc: "DOOR_NONE"
    },
};

const RESET_BIT_CODES = {
    BIT_RESET_ROOM: {
        code: "BIT_RESET_ROOM",
        sdesc: "BIT_RESET_ROOM"
    },
    BIT_RESET_TOGGLE: {
        code: "BIT_RESET_TOGGLE",
        sdesc: "BIT_RESET_TOGGLE"
    },
    BIT_RESET_SET: {
        code: "BIT_RESET_SET",
        sdesc: "BIT_RESET_SET"
    },
    BIT_RESET_REMOVE: {
        code: "BIT_RESET_REMOVE",
        sdesc: "BIT_RESET_REMOVE"
    }
};

const MOB_SPECIALS = {
    spec_fido: {
        code: "spec_fido",
        sdesc: "spec_fido",
        ldesc: "Eats corpses",
        do_not_use: false
    },
    spec_cast_adept: {
        code: "spec_cast_adept",
        sdesc: "spec_cast_adept",
        ldesc: "For constantly healing mobs",
        do_not_use: false
    },
    spec_breath_fire: {
        code: "spec_breath_fire",
        sdesc: "spec_breath_fire",
        ldesc: "Uses fire breath weapon",
        do_not_use: false
    },
    spec_breath_frost: {
        code: "spec_breath_frost",
        sdesc: "spec_breath_frost",
        ldesc: "Uses frost breath weapon",
        do_not_use: false
    },
    spec_breath_acid: {
        code: "spec_breath_acid",
        sdesc: "spec_breath_acid",
        ldesc: "Uses acid breath weapon",
        do_not_use: false
    },
    spec_breath_gas: {
        code: "spec_breath_gas",
        sdesc: "spec_breath_gas",
        ldesc: "Uses gas breath weapon",
        do_not_use: false
    },
    spec_breath_lightning: {
        code: "spec_breath_lightning",
        sdesc: "spec_breath_lightning",
        ldesc: "Uses fire lightning weapon",
        do_not_use: false
    },
    spec_breath_any: {
        code: "spec_breath_any",
        sdesc: "spec_breath_any",
        ldesc: "Uses a random breath weapon in battle",
        do_not_use: false
    },
    spec_poison: {
        code: "spec_poison",
        sdesc: "spec_poison",
        ldesc: "Poisons foe with a bite",
        do_not_use: false
    },
    spec_guard: {
        code: "spec_guard",
        sdesc: "spec_guard",
        ldesc: "For guards in the justice system",
        do_not_use: false
    },
    spec_cast_cleric: {
        code: "spec_cast_cleric",
        sdesc: "spec_cast_cleric",
        ldesc: "General Cleric in battle",
        do_not_use: false
    },
    spec_janitor: {
        code: "spec_janitor",
        sdesc: "spec_janitor",
        ldesc: "Cleans up trash and drinks",
        do_not_use: false
    },
    spec_cast_undead: {
        code: "spec_cast_undead",
        sdesc: "spec_cast_undead",
        ldesc: "Casts curse, drain type spells in battle",
        do_not_use: false
    },
    spec_executioner: {
        code: "spec_executioner",
        sdesc: "spec_executioner",
        ldesc: "Old justice for dealing with killers and thieves. Do not use.",
        do_not_use: true
    },
    spec_judge: {
        code: "spec_judge",
        sdesc: "spec_judge",
        ldesc: "For judges in the justice system",
        do_not_use: false
    },
    spec_pet_gen: {
        code: "spec_pet_gen",
        sdesc: "spec_pet_gen",
        ldesc: "Looks for master, rests when master does",
        do_not_use: false
    },
    spec_paladin_warhorse: {
        code: "spec_paladin_warhorse",
        sdesc: "spec_paladin_warhorse",
        ldesc: "For a paladins warhorse, looks for master, aids, rescues, alerts to evil, doesn't tire",
        do_not_use: false
    },
    spec_pet_hawk: {
        code: "spec_pet_hawk",
        sdesc: "spec_pet_hawk",
        ldesc: "Will work for all pet birds",
        do_not_use: false
    },
    spec_pet_dog: {
        code: "spec_pet_dog",
        sdesc: "spec_pet_dog",
        ldesc: "Does spec_pet_gen plus also rescues master, race echos, sniffs invis chars",
        do_not_use: false
    },
    spec_pet_panther: {
        code: "spec_pet_panther",
        sdesc: "spec_pet_panther",
        ldesc: "For companion large cats, see dog",
        do_not_use: false
    },
    spec_pet_bear: {
        code: "spec_pet_bear",
        sdesc: "spec_pet_bear",
        ldesc: "For companion bears, see dog",
        do_not_use: false
    },
    spec_pet_wolverine: {
        code: "spec_pet_wolverine",
        sdesc: "spec_pet_wolverine",
        ldesc: "For companion wolves, see dog",
        do_not_use: false
    }
};

const QUEST_EVENT_CODES = {
    SPECIAL_EVENT: {
        code: "SPECIAL_EVENT",
        sdesc: "SPECIAL_EVENT",
        color_code: "{F0}", 
        ldesc: "Special Event or Misc."
    },
    IN_PROGRESS: {
        code: "IN_PROGRESS",
        sdesc: "IN_PROGRESS",
        color_code: "{E0}", 
        ldesc: "Quest in progress."
    },
    COMPLETED: {
        code: "COMPLETED",
        sdesc: "COMPLETED",
        color_code: "{A0}", 
        ldesc: "Completed quest."
    },
    FAILED: {
        code: "FAILED",
        sdesc: "FAILED",
        color_code: "{90}", 
        ldesc: "Failed quest."
    },
    KNOWLEDGE: {
        code: "KNOWLEDGE",
        sdesc: "KNOWLEDGE",
        color_code: "{20}", 
        ldesc: "Knowledge Geography etc."
    },
    TRADE: {
        code: "TRADE",
        sdesc: "TRADE",
        color_code: "{30}", 
        ldesc: "Trade learned."
    },
    NOT_STARTED: {
        code: "NOT_STARTED",
        sdesc: "NOT_STARTED",
        color_code: "{B0}", 
        ldesc: "Quest not yet started."
    },
}

// Model classes

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

class Area extends Model {
    constructor(fields) {
        super(Object.assign({
            name:                   new Field({field_name:"name",                   default_value: null,    in_flags:null,              optional:false}),
            category:               new Field({field_name:"category",               default_value: null,    in_flags:AREA_CATEGORIES,   optional:false}),
            authors:                new Field({field_name:"authors",                default_value: [],      in_flags:null,              optional:false}),
            justice_system:         new Field({field_name:"justice_system",         default_value: null,    in_flags:null,              optional:true}),
            min_recommended_level:  new Field({field_name:"min_recommended_level",  default_value: 1,       in_flags:null,              optional:false}),
            max_recommended_level:  new Field({field_name:"max_recommended_level",  default_value: 65,      in_flags:null,              optional:false}),
            min_enforced_level:     new Field({field_name:"min_enforced_level",     default_value: 0,       in_flags:null,              optional:false}),
            max_enforced_level:     new Field({field_name:"max_enforced_level",     default_value: 65,      in_flags:null,              optional:false}),
            reset_msg:              new Field({field_name:"reset_msg",              default_value: null,    in_flags:null,              optional:false}),
            wilderness_flag:        new Field({field_name:"wilderness_flag",        default_value: 0,       in_flags:null,              optional:false}),
            reset_duration:         new Field({field_name:"reset_duration",         default_value: 0,       in_flags:null,              optional:false}),
            economy_min:            new Field({field_name:"economy_min",            default_value: 5000,    in_flags:null,              optional:false}),
            economy_max:            new Field({field_name:"economy_max",            default_value: 5000,    in_flags:null,              optional:false}),
            weather_humidity:       new Field({field_name:"weather_humidity",       default_value: 5,       in_flags:null,              optional:false}),
            weather_temperature:    new Field({field_name:"weather_temperature",    default_value: 5,       in_flags:null,              optional:false}),
            mining_material:        new Field({field_name:"mining_material",        default_value: null,    in_flags:OBJECT_MATERIALS,  optional:true}),
            logging_material:       new Field({field_name:"logging_material",       default_value: null,    in_flags:OBJECT_MATERIALS,  optional:true}),
            rooms:                  new Field({field_name:"rooms",                  default_value: [],      in_flags:null,              optional:true}),
            room_resets:            new Field({field_name:"room_resets",            default_value: [],      in_flags:null,              optional:true}),
            door_resets:            new Field({field_name:"door_resets",            default_value: [],      in_flags:null,              optional:true}),
            objects:                new Field({field_name:"objects",                default_value: [],      in_flags:null,              optional:true}),
            item_resets:            new Field({field_name:"item_resets",            default_value: [],      in_flags:null,              optional:true}),
            mobs:                   new Field({field_name:"mobs",                   default_value: [],      in_flags:null,              optional:true}),
            mob_resets:             new Field({field_name:"mob_resets",             default_value: [],      in_flags:null,              optional:true}),
            mob_specials:           new Field({field_name:"mob_specials",           default_value: [],      in_flags:null,              optional:true}),
            shops:                  new Field({field_name:"shops",                  default_value: [],      in_flags:null,              optional:true}),
            repairs:                new Field({field_name:"repairs",                default_value: [],      in_flags:null,              optional:true}),
            quest_log:              new Field({field_name:"quest_log",              default_value: [],      in_flags:null,              optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[Area:${this.name}]`;
    }
    validate() {
        let errors = super.validate()
        if (this.authors.join(" ").length >= 36) {
            errors.push(`${this._error_prefix}.authors List too long (max 36 characters)`);
        }
        for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i].indexOf(" ") != -1) {
                errors.push(`${this._error_prefix}.authors Spaces are not permitted in author names ("${this.authors[i]}")`);
            }
        }
        // Level range
        if (!(0 < this.min_recommended_level <= 65)) {
            errors.push(`${this._error_prefix}.min_recommended_level must be between 0 and 65`);
        }
        if (!(0 < this.max_recommended_level <= 65)) {
            errors.push(`${this._error_prefix}.max_recommended_level must be between 0 and 65`);
        }
        if (!(0 < this.min_enforced_level <= 65)) {
            errors.push(`${this._error_prefix}.min_enforced_level must be between 0 and 65`);
        }
        if (!(0 < this.max_enforced_level <= 65)) {
            errors.push(`${this._error_prefix}.max_enforced_level must be between 0 and 65`);
        }
        // Reset duration
        if (this.reset_duration < -1) {
            errors.push(`${this._error_prefix}.reset_duration Invalid reset duration`);
        }
        // Flags
        if (this.wilderness_flag != 0) {
            errors.push(`${this._error_prefix}.wilderness_flag should be 0 for most areas`);
        }
        // Economy
        if (this.economy_min < 0) {
            errors.push(`${this._error_prefix}.economy_min should be a positive number`);
        }
        if (this.economy_max < 0) {
            errors.push(`${this._error_prefix}.economy_max should be a positive number`);
        }
        // Weather
        if (!(1 <= this.weather_humidity <= 10)) {
            errors.push(`${this._error_prefix}.weather_humidity must be between 1 and 10`);
        }
        if (!(1 <= this.weather_temperature <= 10)) {
            errors.push(`${this._error_prefix}.weather_temperature must be between 1 and 10`);
        }
        return errors
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return "Invalid Area\n" + errors.join("\n");
        }
        
        return `#AREA ${this.category.color_code}${this.name}~
#AUTHOR ${this.authors.join(" ")}~
#RANGES
${this.min_recommended_level} ${this.max_recommended_level} ${this.min_enforced_level} ${this.max_enforced_level}
$
#RESETMSG ${this.reset_msg}~
#FLAGS
${this.wilderness_flag} ${this.reset_duration}
#ECONOMY ${this.economy_min} ${this.economy_max}
#WEATHER ${this.weather_humidity} ${this.weather_temperature}
${this.justice_system != null ? this.justice_system.toString() : ""}
${this.mining_material != null ? "#MINING " + this.mining_material.code : ""}
${this.logging_material != null ? "#LOGGING " + this.logging_material.code : ""}
${this.rooms.length ? `#ROOMS
${this.rooms.map((room)=>(room.toString())).join("\n")}
S` : ""}
${this.objects.length ? `#OBJECTS
${this.objects.map((obj)=>(obj.toString())).join("\n")}
#0`: ""}
${this.quest_log.length ? `#QUESTS
${this.quest_log.map((quest)=>(quest.toString())).join("\n")}
#0`: ""}
${this.mobs.length ? `#MOBILES
${this.mobs.map((mob)=>(mob.toString())).join("\n")}
#0` : ""}
#RESETS
${this.mob_resets.map((res)=>(res.toString())).join("\n") /* Includes equipment resets */}
${this.item_resets.map((res)=>(res.toString())).join("\n")}
${this.room_resets.map((res)=>(res.toString())).join("\n")}
${this.door_resets.map((res)=>(res.toString())).join("\n")}
S
${this.shops.length ? `#SHOPS
${this.shops.map((obj)=>(obj.toString())).join("\n")}
0` : ""}
${this.repairs.length ? `#REPAIRS
${this.repairs.map((obj)=>(obj.toString())).join("\n")}
0` : ""}
#SPECIALS
${this.mob_specials.map((res)=>(res.toString())).join("\n")}
S
#$
`.replace(/\n[\n]+/g, "\n");
    }
}

class JusticeSystem extends Model {
    constructor(fields) {
        super(Object.assign({
            courtroom: new Field({field_name:"courtroom", default_value: null,    in_flags:null,  optional:false}),
            dungeon: new Field({field_name:"dungeon", default_value: null,    in_flags:null,  optional:false}),
            judge: new Field({field_name:"judge", default_value: null,    in_flags:null,  optional:false}),
            guard: new Field({field_name:"guard", default_value: null,    in_flags:null,  optional:false}),
            CRIME_HIGH_MURDER: new Field({field_name:"CRIME_HIGH_MURDER", default_value: {
                code: "CRIME_HIGH_MURDER",
                sdesc: "High Murder",
                ldesc: "Murdering another PC",
                punishment: null
            }, in_flags:null, optional:false}),
            CRIME_LOW_MURDER: new Field({field_name:"CRIME_LOW_MURDER", default_value: {
                code: "CRIME_LOW_MURDER",
                sdesc: "Low Murder",
                ldesc: "Killing a mob",
                punishment: null
            }, in_flags:null, optional:false}),
            CRIME_ASSAULT: new Field({field_name:"CRIME_ASSAULT", default_value: {
                code: "CRIME_ASSAULT",
                sdesc: "Assault",
                ldesc: "Attacking (but not killing) a PC/mob",
                punishment: null
            }, in_flags:null, optional:false}),
            CRIME_MUGGING: new Field({field_name:"CRIME_MUGGING", default_value: {
                code: "CRIME_MUGGING",
                sdesc: "Mugging",
                ldesc: "A failed pickpocket/steal attempt",
                punishment: null
            }, in_flags:null, optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return "[JusticeSystem]"
    }
    
    validate() {
        let errors = super.validate()
        
        // Check crimes
        let crimes = ["CRIME_HIGH_MURDER","CRIME_LOW_MURDER","CRIME_ASSAULT","CRIME_MUGGING"];
        for (let c in crimes) {
            let crime = this[crimes[c]]
            if (crime.punishment == null) {
                errors.push(`${this._error_prefix}.${crime.code} has no punishment defined`);
            }
            else if (crime.punishment.do_not_use) {
                errors.push(`${this._error_prefix}.${crime.code} has punishment "${crime.punishment.code}" which should not be used`);
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
Crime CRIME_HIGH_MURDER ${this.CRIME_HIGH_MURDER.punishment.code}
Crime CRIME_LOW_MURDER ${this.CRIME_LOW_MURDER.punishment.code}
Crime CRIME_ASSAULT ${this.CRIME_ASSAULT.punishment.code}
Crime CRIME_MUGGING ${this.CRIME_MUGGING.punishment.code}
$`
    }
}

class Room extends Model {
    constructor(fields) {
        super(Object.assign({
            vnum:               new Field({field_name:"vnum",               default_value: null,    in_flags:null,          optional:false}),
            sdesc:              new Field({field_name:"sdesc",              default_value: null,    in_flags:null,          optional:false}),
            ldesc:              new Field({field_name:"ldesc",              default_value: null,    in_flags:null,          optional:false}),
            defunct:            new Field({field_name:"defunct",            default_value: 0,       in_flags:null,          optional:false}),
            room_flags:         new Field({field_name:"room_flags",         default_value: [],      in_flags:ROOM_FLAGS,    optional:true}),
            sector:             new Field({field_name:"sector",             default_value: null,    in_flags:SECTOR_FLAGS,  optional:false}),
            teleport_delay:     new Field({field_name:"teleport_delay",     default_value: 0,       in_flags:null,          optional:false}),
            teleport_target:    new Field({field_name:"teleport_target",    default_value: 0,       in_flags:null,          optional:false}),
            tunnel:             new Field({field_name:"tunnel",             default_value: 0,       in_flags:null,          optional:false}),
            exits:              new Field({field_name:"exits",              default_value: [],      in_flags:null,          optional:true}),
            door_resets:        new Field({field_name:"door_resets",        default_value: [],      in_flags:null,          optional:true}),
            extra_descriptions: new Field({field_name:"extra_descriptions", default_value: [],      in_flags:null,          optional:true}),
        }, fields));
    }
    get _error_prefix() {
        return `[Room:(${this.vnum}) ${this.sdesc}]`;
    }
    validate() {
        let errors = super.validate();
        if (this.defunct != 0) {
            errors.push(`${this._error_prefix}.defunct must be 0`);
        }
        return errors;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `#${this.vnum}
${this.sdesc}~
${this.ldesc}
~
${this.defunct} ${this.room_flags.join("|")||"0"} ${this.sector.code} ${this.teleport_delay} ${this.teleport_target} ${this.tunnel}
${this.exits.map((exit) => (exit.toString())).join("\n")}
${this.extra_descriptions.map((desc) => (desc.toString())).join("\n")}
S
`;
    }
}

class Exit extends Model {
    constructor(fields) {
        super(Object.assign({
            direction:          new Field({field_name:"direction",          default_value: null,                        in_flags:null,              optional:false}),
            comment:            new Field({field_name:"comment",            default_value: "",                          in_flags:null,              optional:false}),
            somewhere_keyword:  new Field({field_name:"somewhere_keyword",  default_value: null,                        in_flags:null,              optional:true}),
            door_keyword:       new Field({field_name:"door_keyword",       default_value: "",                          in_flags:null,              optional:false}),
            // Flags                    
            door_flags:         new Field({field_name:"door_flags",         default_value: [],                          in_flags:EXIT_DOOR_FLAGS,   optional:false}),
            door_key:           new Field({field_name:"door_key",           default_value: -1,                          in_flags:null,              optional:false}),
            target_vnum:        new Field({field_name:"target_vnum",        default_value: null,                        in_flags:null,              optional:false}),
            exit_size:          new Field({field_name:"exit_size",          default_value: EXIT_SIZES.EXIT_SIZE_ANY,    in_flags:EXIT_SIZES,        optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[Exit:${this.target_vnum}]`
    }
    validate() {
        let errors = super.validate();
        if (this.direction == EXIT_DIRECTIONS.DDIR_SOMEWHERE && this.somewhere_keyword == null) {
            errors.push(`${this._error_prefix}.somewhere_keyword Somewhere exit defined, but no exit keyword specified`);
        }
        if (this.direction == EXIT_DIRECTIONS.DDIR_SOMEWHERE && this.door_flags.indexOf(EXIT_DOOR_FLAGS.EX_XAUTO) != -1) {
            errors.push(`${this._error_prefix}.door_flags Somewhere exit defined, but EX_XAUTO flag not set`);
        }
        if (this.door_keyword != "" && this.door_flags.indexOf(EXIT_DOOR_FLAGS.EX_ISDOOR) == -1) {
            errors.push(`${this._error_prefix}.door_flags Door keywords defined, but EX_ISDOOR flag not set`);
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
${this.direction == EXIT_DIRECTIONS.DDIR_SOMEWHERE ? this.somewhere_keyword : this.door_keyword}~
${this.door_flags.map((flag)=>(flag.code)).join("|")||"0"} ${this.door_key} ${this.target_vnum} ${this.exit_size}`;
    }
}

class ExtraDescription extends Model {
    constructor(fields) {
        super(Object.assign({
            keywords: new Field({field_name:"keywords", default_value: null,    in_flags:null,  optional:false}),
            ldesc:    new Field({field_name:"ldesc",    default_value: null,    in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[ExtraDescription:${this.keywords}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `E
${this.keywords}~
${this.ldesc}
~`;
    }
}

class GameObject extends Model {
    constructor(fields) {
        super(Object.assign({
            vnum:               new Field({field_name:"vnum",               default_value: null,    in_flags:null,              optional:false}),
            sdesc:              new Field({field_name:"sdesc",              default_value: null,    in_flags:null,              optional:false}),
            ldesc:              new Field({field_name:"ldesc",              default_value: null,    in_flags:null,              optional:false}),
            keywords:           new Field({field_name:"keywords",           default_value: null,    in_flags:null,              optional:false}),
            action_description: new Field({field_name:"action_description", default_value: "",      in_flags:null,              optional:false}), // Not used
            item_type:          new Field({field_name:"item_type",          default_value: null,    in_flags:ITEM_TYPES,        optional:false}),
            attributes:         new Field({field_name:"attributes",         default_value: [],      in_flags:OBJECT_ATTRIBUTES, optional:true}),
            wear_flags:         new Field({field_name:"wear_flags",         default_value: [],      in_flags:WEAR_LOCATIONS,    optional:false}),
            extra_descriptions: new Field({field_name:"extra_descriptions", default_value: [],      in_flags:null,              optional:false}),
            quality:            new Field({field_name:"quality",            default_value: null,    in_flags:OBJECT_QUALITY,    optional:false}),
            material:           new Field({field_name:"material",           default_value: null,    in_flags:OBJECT_MATERIALS,  optional:false}),
            condition:          new Field({field_name:"condition",          default_value: null,    in_flags:OBJECT_CONDITION,  optional:false}),
            value0:             new Field({field_name:"value0",             default_value: 0,       in_flags:null,              optional:true}),
            value1:             new Field({field_name:"value1",             default_value: 0,       in_flags:null,              optional:true}),
            value2:             new Field({field_name:"value2",             default_value: 0,       in_flags:null,              optional:true}),
            value3:             new Field({field_name:"value3",             default_value: 0,       in_flags:null,              optional:true}),
            value4:             new Field({field_name:"value4",             default_value: 0,       in_flags:null,              optional:true}),
            value5:             new Field({field_name:"value5",             default_value: 0,       in_flags:null,              optional:true}),
            special_applies:    new Field({field_name:"special_applies",    default_value: [],      in_flags:MOB_AFFECTS,       optional:true}),
            programs:           new Field({field_name:"programs",           default_value: [],      in_flags:MOB_AFFECTS,       optional:true}),
            identify_message:   new Field({field_name:"identify_message",   default_value: null,    in_flags:MOB_AFFECTS,       optional:true}),
        }, fields));
    }
    get _error_prefix() {
        return `[GameObject:(${this.vnum}) ${this.sdesc}]`;
    }
    
    validate() {
        let errors = super.validate();
        
        if (this.action_description !== "") {
            console.log(this.action_description)
            errors.push(`${this._error_prefix}.action_description is not used and should be empty`);
        }
        return errors;
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return this.errors.join("\n")
        }
        return `#${this.vnum}
${this.keywords}~
${this.sdesc}~
${this.ldesc}~
${this.action_description}~
${this.item_type.code}
${this.attributes.map((attribute)=>(attribute.code)).join("|")||0}
${this.wear_flags.map((flag)=>(flag.code)).join("|")||0}
${this.quality.code} ${this.material.code} ${this.condition.code} ${this.size.code}
${this.value0} ${this.value1} ${this.value2} ${this.value3} ${this.value4} ${this.value5}
${this.extra_descriptions.map((desc) => (desc.toString())).join("\n")}
${this.special_applies.map((spec) => (`A ${spec.code} ${spec.value}`)).join("\n")}
${this.identify_message != null ? `I\n${this.identify_message}\n~` : "" }
${this.programs.map((program) => (program.toString())).join("\n")}
`;
    }
}

class SimpleMob extends Model {
    constructor(fields) {
        super(Object.assign({
            vnum:                   new Field({field_name:"vnum",                   default_value:null,                     in_flags:null,              optional:false}),
            sdesc:                  new Field({field_name:"sdesc",                  default_value:null,                     in_flags:null,              optional:false}),
            ldesc:                  new Field({field_name:"ldesc",                  default_value:null,                     in_flags:null,              optional:false}),
            fulldesc:               new Field({field_name:"fulldesc",               default_value:null,                     in_flags:null,              optional:false}),
            keywords:               new Field({field_name:"keywords",               default_value:null,                     in_flags:null,              optional:false}),
            level:                  new Field({field_name:"level",                  default_value:null,                     in_flags:null,              optional:false}),
            mob_class:              new Field({field_name:"mob_class",              default_value:null,                     in_flags:MOB_CLASSES,       optional:false}),
            race:                   new Field({field_name:"race",                   default_value:null,                     in_flags:MOB_RACES,         optional:false}),
            sex:                    new Field({field_name:"sex",                    default_value:null,                     in_flags:MOB_SEXES,         optional:false}),
            position:               new Field({field_name:"position",               default_value:null,                     in_flags:MOB_POSITIONS,     optional:false}),
            deity:                  new Field({field_name:"deity",                  default_value:MOB_DEITIES.DEITY_NONE,   in_flags:MOB_DEITIES,       optional:true}),
            act_flags:              new Field({field_name:"act_flags",              default_value:[],                       in_flags:MOB_ACT_FLAGS,     optional:false}),
            understood_languages:   new Field({field_name:"understood_languages",   default_value:[],                       in_flags:LANGUAGE_FLAGS,    optional:false}),
            spoken_languages:       new Field({field_name:"spoken_languages",       default_value:[],                       in_flags:LANGUAGE_FLAGS,    optional:false}),
            can_train:              new Field({field_name:"can_train",              default_value:[],                       in_flags:null,              optional:false}),
            equipment_resets:       new Field({field_name:"equipment_resets",       default_value:[],                       in_flags:null,              optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[SimpleMob:(${this.vnum}) ${this.sdesc}]`
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return this.errors.join("\n")
        }
        return `#${this.vnum}
${this.keywords}~
${this.sdesc}~
${this.ldesc}~
${this.fulldesc}
~
S ${this.level} ${this.class} ${this.race} ${this.sex} ${this.position} ${this.deity}
${this.act_flags.map((flag)=>(flag.code)).join("|")}
${this.understood_languages.map((lang)=>(lang.code)).join("|")}
${this.spoken_languages.map((lang)=>(lang.code)).join("|")}
${this.can_train.map((train)=>(train.toString())).join("\n")}
${this.programs.map((prog)=>(prog.toString())).join("\n")}`
    }
    
    
}

class UniqueMob extends SimpleMob {
    constructor(fields) {
        super(Object.assign({
            //                            Field name                 Default value  In flags...         Optional    Check do_not_use
            affect_flags:           new Field({field_name:"affect_flags",           default_value:[],             in_flags:MOB_AFFECTS,        optional:false}),
            virtual_armor_type:     new Field({field_name:"virtual_armor_type",     default_value:null,           in_flags:ARMOR_TYPES,        optional:false}),
            virtual_armor_material: new Field({field_name:"virtual_armor_material", default_value:null,           in_flags:OBJECT_MATERIALS,   optional:false}),
            alignment:              new Field({field_name:"alignment",              default_value:null,           in_flags:MOB_ALIGNMENTS,     optional:false}),
            str:                    new Field({field_name:"str",                    default_value:13,             in_flags:null,               optional:false}),
            int:                    new Field({field_name:"int",                    default_value:13,             in_flags:null,               optional:false}),
            wis:                    new Field({field_name:"wis",                    default_value:13,             in_flags:null,               optional:false}),
            dex:                    new Field({field_name:"dex",                    default_value:13,             in_flags:null,               optional:false}),
            con:                    new Field({field_name:"con",                    default_value:13,             in_flags:null,               optional:false}),
            cha:                    new Field({field_name:"cha",                    default_value:13,             in_flags:null,               optional:false}),
            lck:                    new Field({field_name:"lck",                    default_value:13,             in_flags:null,               optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[UniqueMob:(${this.vnum}) ${this.sdesc}]`
    }
    
    validate() {
        let errors = super.validate()
        for (let stat in ["str", "int", "wis", "dex", "con", "cha", "lck"]) {
            if (!(3 <= this.stats[stat] <= 22)) {
                errors.push(`${this._error_prefix}.${stat} should be between 3 and 22`);
            }
        }
        return errors;
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return this.errors.join("\n")
        }
        return `#${this.vnum}
${this.keywords}~
${this.sdesc}~
${this.ldesc}~
${this.fulldesc}
~
U ${this.level} ${this.class} ${this.race} ${this.sex} ${this.position} ${this.deity}
${this.act_flags.map((flag)=>(flag.code)).join("|")}
${this.affect_flags.map((flag)=>(flag.code)).join("|")}
${this.virtual_armor_type} ${this.virtual_armor_material}
${this.alignment}
${this.str} ${this.int} ${this.wis} ${this.dex} ${this.con} ${this.cha} ${this.lck}
${this.understood_languages.map((lang)=>(lang.code)).join("|")}
${this.spoken_languages.map((lang)=>(lang.code)).join("|")}
|`
    }
}

class TrainSkill extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,      in_flags:null,          optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,          optional:false}),
            skill:              new Field({field_name:"skill",              default_value: null,    in_flags:MOB_SKILLS,    optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[TrainSkill:${this.skill}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} ${this.skill}~`
    }
}

class TrainSpell extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,      in_flags:null,          optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,          optional:false}),
            spell:              new Field({field_name:"spell",              default_value: null,    in_flags:MOB_SPELLS,    optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[TrainSpell:${this.spell}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} ${this.spell}~`
    }
}

class TrainLevel extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,      in_flags:null,  optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[TrainLevel]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} level~`
    }
}

class TrainStatistic extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 10,      in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,              optional:false}),
            statistic:          new Field({field_name:"statistic",          default_value: null,    in_flags:MOB_STATISTICS,    optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[TrainStatistic:${this.statistic}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} ${this.statistic}~`
    }
}

class TrainFeat extends Model {
    constructor(fields) {
        super(Object.assign({
            level:              new Field({field_name:"level",              default_value: 1,       in_flags:null,              optional:false}),
            price_multiplier:   new Field({field_name:"price_multiplier",   default_value: 1,       in_flags:null,              optional:false}),
            feat:               new Field({field_name:"feat",               default_value: null,    in_flags:MOB_FEATS,         optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[TrainFeat:${this.feat}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `%${this.level} ${this.price_multiplier} ${this.feat}~`
    }
}

class Shop extends Model {
    constructor(fields) {
        super(Object.assign({
            shopkeeper:     new Field({field_name:"shopkeeper",     default_value: null,                        in_flags:null,          optional:false}),
            will_buy_1:     new Field({field_name:"will_buy_1",     default_value: ITEM_TYPES.ITEM_TYPE_NONE,   in_flags:ITEM_TYPES,    optional:false}),
            will_buy_2:     new Field({field_name:"will_buy_2",     default_value: ITEM_TYPES.ITEM_TYPE_NONE,   in_flags:ITEM_TYPES,    optional:true}),
            will_buy_3:     new Field({field_name:"will_buy_3",     default_value: ITEM_TYPES.ITEM_TYPE_NONE,   in_flags:ITEM_TYPES,    optional:true}),
            will_buy_4:     new Field({field_name:"will_buy_4",     default_value: ITEM_TYPES.ITEM_TYPE_NONE,   in_flags:ITEM_TYPES,    optional:true}),
            will_buy_5:     new Field({field_name:"will_buy_5",     default_value: ITEM_TYPES.ITEM_TYPE_NONE,   in_flags:ITEM_TYPES,    optional:true}),
            profit_buy:     new Field({field_name:"profit_buy",     default_value: 150,                         in_flags:null,          optional:false}),
            profit_sell:    new Field({field_name:"profit_sell",    default_value: 50,                          in_flags:null,          optional:false}),
            open_hour:      new Field({field_name:"open_hour",      default_value: 7,                           in_flags:null,          optional:false}),
            close_hour:     new Field({field_name:"close_hour",     default_value: 19,                          in_flags:null,          optional:false}),
        }, fields))        }
    get _error_prefix() {
        return `[Shop:${this.shopkeeper.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `${this.shopkeeper.vnum} ${this.will_buy_1} ${this.will_buy_2} ${this.will_buy_3} ${this.will_buy_4} ${this.will_buy_5}
${this.profit_buy} ${this.profit_sell} ${this.open_hour} ${this.close_hour} ; ${this.shopkeeper.sdesc}`;
    }
}

class RepairRecharge extends Model {
    constructor(fields) {
        super(Object.assign({
            shopkeeper:         new Field({field_name:"shopkeeper",         default_value: null,                        in_flags:null,                  optional:false}),
            will_repair_1:      new Field({field_name:"will_repair_1",      default_value: ITEM_TYPES.ITEM_TYPE_NONE,   in_flags:ITEM_TYPES,            optional:false}),
            will_repair_2:      new Field({field_name:"will_repair_2",      default_value: ITEM_TYPES.ITEM_TYPE_NONE,   in_flags:ITEM_TYPES,            optional:true}),
            repair_material:    new Field({field_name:"repair_material",    default_value: null,                        in_flags:MOB_REPAIR_MATERIAL,   optional:false}),
            profit_modifier:    new Field({field_name:"profit_modifier",    default_value: 100,                         in_flags:null,                  optional:false}),
            repair:             new Field({field_name:"repair",             default_value: null,                        in_flags:MOB_REPAIR_RECHARGE,   optional:false}),
            open_hour:          new Field({field_name:"open_hour",          default_value: null,                        in_flags:MOB_FEATS,             optional:false}),
            close_hour:         new Field({field_name:"close_hour",         default_value: null,                        in_flags:MOB_FEATS,             optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[RepairRecharge:${this.shopkeeper.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `${this.shopkeeper.vnum} ${this.will_repair_1} ${this.will_repair_2} ${this.repair_material}
${this.profit_modifier} ${this.repair} ${this.open_hour} ${this.close_hour} ; ${this.shopkeeper.sdesc}`;
    }
}

class MobReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:    new Field({field_name:"defunct",    default_value: 0,       in_flags:null,  optional:false}),
            mob:        new Field({field_name:"mob",        default_value: null,    in_flags:null,  optional:false}),
            mob_limit:  new Field({field_name:"mob_limit",  default_value: 1,       in_flags:null,  optional:false}),
            room:       new Field({field_name:"room",       default_value: null,    in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[MobReset:${this.mob.vnum} in ${this.room.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `M ${this.defunct} ${this.mob.vnum} ${this.mob_limit} ${this.room.vnum} ; ${this.mob.sdesc} in ${this.room.sdesc}
${this.mob.equipment_resets.map((equip)=>(equip.toString())).join("\n")}`
    }
}

class EquipmentReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,              optional:false}),
            item:           new Field({field_name:"item",           default_value: 1,       in_flags:null,              optional:false}),
            equip_limit:    new Field({field_name:"equip_limit",    default_value: 1,       in_flags:null,              optional:false}),
            wear_loc:       new Field({field_name:"wear_loc",       default_value: null,    in_flags:MOB_WEAR_RESETS,   optional:true}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,              optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[EquipmentReset:${this.mob.vnum} in ${this.room.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        if (this.wear_loc) {
            // Equipped
            return ` E ${this.defunct} ${this.item.vnum} ${this.equip_limit} ${this.wear_loc.code} ; ${this.item.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
        else {
            // Held
            return ` G ${this.defunct} ${this.item.vnum} ${this.equip_limit} ; ${this.item.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
    }
}

class ItemReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,  optional:false}),
            item:           new Field({field_name:"item",           default_value: null,    in_flags:null,  optional:false}),
            item_limit:     new Field({field_name:"item_limit",     default_value: 1,       in_flags:null,  optional:false}),
            room_container: new Field({field_name:"room_container", default_value: null,    in_flags:null,  optional:false}),
            hidden:         new Field({field_name:"hidden",         default_value: false,   in_flags:null,  optional:false}),
            buried:         new Field({field_name:"buried",         default_value: false,   in_flags:null,  optional:false}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,  optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[ItemReset:${this.mob.vnum} in ${this.room_container.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        if (this.room_container instanceof GameObject) {
            // Container (hidden is handled differently)
            return `P ${this.hidden ? 1 : 0} ${this.item.vnum} ${this.item_limit} ${this.room_container.vnum} ; ${this.item.sdesc} in ${this.room_container.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
        else if (this.hidden) {
            return `H ${this.defunct} ${this.item.vnum} ${this.item_limit} ${this.room_container.vnum} ; ${this.item.sdesc} in ${this.room_container.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
        else if (this.buried) {
            return `U ${this.defunct} ${this.item.vnum} ${this.item_limit} ${this.room_container.vnum} ; ${this.item.sdesc} in ${this.room_container.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
        }
        return `O ${this.defunct} ${this.item.vnum} ${this.item_limit} ${this.room_container.vnum} ; ${this.item.sdesc} in ${this.room_container.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
    }
}

class DoorReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,          optional:false}),
            room:           new Field({field_name:"room",           default_value: null,    in_flags:null,          optional:false}),
            exit:           new Field({field_name:"exit",           default_value: null,    in_flags:null,          optional:false}),
            exit_state:     new Field({field_name:"exit_state",     default_value: null,    in_flags:DOOR_RESETS,   optional:false}),
            trap_reset:     new Field({field_name:"trap_reset",     default_value: null,    in_flags:null,          optional:true}),
        }, fields))
    }
    get _error_prefix() {
        return `[DoorReset:${this.exit.code} from ${this.room.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `D ${this.defunct} ${this.room.vnum} ${this.exit.direction} ${this.exit_state.code} ; ${this.room.sdesc}
${this.trap_reset ? this.trap_reset.toString() : ""}`
    }
}

class RandomDoorReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",    default_value: 0,       in_flags:null,  optional:false}),
            room:           new Field({field_name:"room",       default_value: null,    in_flags:null,  optional:false}),
            last_door:      new Field({field_name:"last_door",  default_value: null,    in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[RandomDoorReset:0-${this.last_door} from ${this.room.vnum}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `R ${this.defunct} ${this.room.vnum} ${this.last_door} ; ${this.room.sdesc} rearrange exits 0-${this.last_door} randomly`
    }
}

class RoomReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 0,       in_flags:null,              optional:false}),
            room:           new Field({field_name:"room",           default_value: null,    in_flags:null,              optional:false}),
            bit_type:       new Field({field_name:"bit_type",       default_value: null,    in_flags:RESET_BIT_CODES,   optional:false}),
            flag:           new Field({field_name:"flag",           default_value: null,    in_flags:ROOM_FLAGS,        optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[RoomReset:${this.room.vnum}: ${this.bit_type.code} ${this.flag.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `B ${this.defunct} ${this.room.vnum} ${ROOM_FLAGS.BIT_RESET_ROOM}|${this.bit_type} ${this.flag.code} ; ${this.room.sdesc}`
    }
}

// TrapResets can be attached to DoorRests, ItemResets, or EquipmentResets
class TrapReset extends Model {
    constructor(fields) {
        super(Object.assign({
            reset_interval: new Field({field_name:"reset_interval", default_value: 0,                           in_flags:null,              optional:false}),
            trap_type:      new Field({field_name:"trap_type",      default_value: null,                        in_flags:TRAP_TYPES,        optional:false}),
            trap_charges:   new Field({field_name:"trap_charges",   default_value: null,                        in_flags:RESET_BIT_CODES,   optional:false}),
            trigger_1:      new Field({field_name:"trigger_1",      default_value: TRAP_TRIGGERS.TRIGGER_NONE,  in_flags:TRAP_TRIGGERS,     optional:false}),
            trigger_2:      new Field({field_name:"trigger_2",      default_value: TRAP_TRIGGERS.TRIGGER_NONE,  in_flags:TRAP_TRIGGERS,     optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[TrapReset:${this.trap_type.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return ` T ${this.reset_interval} ${this.trap_type.code} ${this.trap_type.code} ${this.trigger_1.code}|${this.trigger_2.code}`
    }
}

// CoinResets go in mob's equipment_resets list
class CoinReset extends Model {
    constructor(fields) {
        super(Object.assign({
            defunct:        new Field({field_name:"defunct",        default_value: 1,                           in_flags:null,          optional:false}),
            coin_type:      new Field({field_name:"coin_type",      default_value: null,                        in_flags:COIN_TYPES,    optional:false}),
            dice_count:     new Field({field_name:"dice_count",     default_value: null,                        in_flags:null,          optional:false}),
            dice_sides:     new Field({field_name:"dice_sides",     default_value: null,                        in_flags:null,          optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[CoinReset:${this.trap_type.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return ` C ${this.defunt} ${this.coin_type.code} ${this.dice_count} ${this.dice_sides}`
    }
}

class MobSpecial extends Model {
    constructor(fields) {
        super(Object.assign({
            mob:        new Field({field_name:"mob",        default_value: null,    in_flags:null,          optional:false}),
            special:    new Field({field_name:"special",    default_value: null,    in_flags:MOB_SPECIALS,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[MobSpecial:${this.mob.vnum} ${this.special.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `M ${this.mob.vnum} ${this.special.code}`
    }
}

class QuestLog extends Model {
    constructor(fields) {
        super(Object.assign({
            area_vnum:  new Field({field_name:"area_vnum",  default_value: "QQ00",  in_flags:null,              optional:false}),
            qbit_start: new Field({field_name:"qbit_start", default_value: null,    in_flags:null,              optional:false}),
            qbit_stop:  new Field({field_name:"qbit_stop",  default_value: null,    in_flags:null,              optional:false}),
            min_qbit:   new Field({field_name:"min_qbit",   default_value: null,    in_flags:null,              optional:false}),
            max_qbit:   new Field({field_name:"max_qbit",   default_value: null,    in_flags:null,              optional:false}),
            event_code: new Field({field_name:"event_code", default_value: null,    in_flags:QUEST_EVENT_CODES, optional:false}),
            qlog_text:  new Field({field_name:"qlog_text",  default_value: null,    in_flags:null,              optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[QuestLog:${this.qlog_text}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `${this.area_vnum} ${this.qbit_start} ${this.qbit_stop} ${this.min_qbit} ${this.max_qbit} ${this.event_code}${this.qlog_text}`
    }
}

class Program extends Model {
    constructor(fields) {
        super(Object.assign({
            trigger:    new Field({field_name:"trigger",    default_value: null,    in_flags:null,  optional:false}),
            percentage: new Field({field_name:"percentage", default_value: null,    in_flags:null,  optional:false}),
            program:    new Field({field_name:"program",    default_value: null,    in_flags:null,  optional:false}),
        }, fields))
    }
    get _error_prefix() {
        return `[Program:${this.trigger.code}]`;
    }
    
    toString() {
        let errors = this.validate();
        if (errors.length) {
            return errors.join("\n");
        }
        return `>${this.trigger} ${this.percentage}
${this.program}
|`
    }
}
//export default Loader;

// DEBUG
function testLoader() {
    let loader = new Loader();
    //console.log(loader.toString());
    loader.area.name = "Calimport";
    loader.area.category = AREA_CATEGORIES.CITIES;
    loader.area.reset_msg = "{A0}A hot wind blows off the desert.";
    loader.area.authors.push("Grenwyn");
    loader.area.economy_min = 100000;
    loader.area.economy_max = 100000;
    loader.area.weather_humidity = 1;
    loader.area.weather_temperature = 8;
    // loader.area.authors.push("Lord Greywether") // should fail
    
    let courtroom = new Room();
    courtroom.vnum = "QQ01";
    courtroom.sdesc = "Courtroom";
    courtroom.ldesc = "A really big courtroom";
    courtroom.sector = SECTOR_FLAGS.SECT_INSIDE;
    // courtroom.room_flags.push(ROOM_FLAGS.ROOM_DEATH); // Should fail
    let courtroom_exit = new Exit();
    courtroom_exit.direction = EXIT_DIRECTIONS.DDIR_DOWN;
    courtroom_exit.door_keyword = "trapdoor";
    courtroom_exit.door_flags.push(EXIT_DOOR_FLAGS.EX_ISDOOR);
    courtroom_exit.door_flags.push(EXIT_DOOR_FLAGS.EX_LOCKED);
    courtroom_exit.door_flags.push(EXIT_DOOR_FLAGS.EX_CLOSED);
    courtroom.exits.push(courtroom_exit);
    
    let dungeon = new Room();
    dungeon.vnum = "QQ03";
    dungeon.sdesc = "Dungeon";
    dungeon.ldesc = "A really smelly dungeon";
    dungeon.sector = SECTOR_FLAGS.SECT_INSIDE;
    let dungeon_exit = new Exit();
    dungeon_exit.direction = EXIT_DIRECTIONS.DDIR_UP
    dungeon_exit.door_keyword = "trapdoor"
    dungeon_exit.door_flags.push(EXIT_DOOR_FLAGS.EX_ISDOOR)
    dungeon_exit.door_flags.push(EXIT_DOOR_FLAGS.EX_LOCKED)
    dungeon_exit.door_flags.push(EXIT_DOOR_FLAGS.EX_CLOSED)
    dungeon.exits.push(dungeon_exit)
    let dungeon_extra_desc = new ExtraDescription()
    dungeon_extra_desc.keywords = "smelly garbage"
    dungeon_extra_desc.ldesc = "There's a heap of really nasty garbage here. It might be a way out - if you die of food poisoning!"
    dungeon.extra_descriptions.push(dungeon_extra_desc)
    
    
    dungeon_exit.target_vnum = courtroom.vnum
    courtroom_exit.target_vnum = dungeon.vnum
    
    loader.area.rooms.push(courtroom)
    loader.area.rooms.push(dungeon)
    
    let trapdoor_key = new GameObject();
    trapdoor_key.vnum = "QQ01";
    trapdoor_key.sdesc = "{80}A large iron key";
    trapdoor_key.ldesc = "{80}A large iron key is lying about for anyone to take";
    trapdoor_key.keywords = "large iron key";
    trapdoor_key.item_type = ITEM_TYPES.ITEM_TYPE_KEY;
    trapdoor_key.wear_flags.push(WEAR_LOCATIONS.CAN_WEAR_TAKE);
    trapdoor_key.wear_flags.push(WEAR_LOCATIONS.CAN_WEAR_HOLD);
    let trapdoor_key_desc = new ExtraDescription();
    trapdoor_key_desc.keywords = "large iron key";
    trapdoor_key_desc.ldesc = "{80}This is a heavy iron key, scratched from years of use.\nIt looks like it might open a trapdoor.";
    trapdoor_key.extra_descriptions.push(trapdoor_key_desc);
    trapdoor_key.quality = OBJECT_QUALITY.QUALITY_AVERAGE;
    trapdoor_key.condition = OBJECT_CONDITION.COND_USABLE;
    trapdoor_key.material = OBJECT_MATERIALS.MATERIAL_IRON;
    trapdoor_key.size = OBJECT_SIZES.SIZE_TINY;
    
    loader.area.objects.push(trapdoor_key);
    
    loader.area.justice_system = new JusticeSystem();
    loader.area.justice_system.courtroom = courtroom
    loader.area.justice_system.judge = {
        vnum: "QQ02",
        validate: () => (true)
    };
    loader.area.justice_system.dungeon = dungeon;
    loader.area.justice_system.guard = {
        vnum: "QQ04",
        validate: () => (true)
    };
    loader.area.justice_system.CRIME_HIGH_MURDER.punishment = PUNISHMENTS.PUNISHMENT_DEATH;
    loader.area.justice_system.CRIME_LOW_MURDER.punishment = PUNISHMENTS.PUNISHMENT_SEVER;
    loader.area.justice_system.CRIME_ASSAULT.punishment = PUNISHMENTS.PUNISHMENT_JAIL;
    loader.area.justice_system.CRIME_MUGGING.punishment = PUNISHMENTS.PUNISHMENT_RANDOM_ITEM;
    
    console.log(loader.toString());
}

testLoader();