// Flag tables

const AREA_CATEGORIES = {
    WILDERNESS: {
        color_code: "{20}",
        sdesc: "Wilderness areas"
    },
    LOW_LEVEL: {
        color_code: "{30}",
        sdesc: "Low level dungeons/quest areas"
    },
    INCOMPLETE: {
        color_code: "{40}",
        sdesc: "Incomplete areas"
    },
    MID_LEVEL: {
        color_code: "{50}",
        sdesc: "Mid level dungeons/quest areas"
    },
    HIGH_LEVEL: {
        color_code: "{60}",
        sdesc: "High level dungeons/quest areas"
    },
    OTHER_PLANES: {
        color_code: "{70}",
        sdesc: "Areas from other planes"
    },
    UNDERDARK: {
        color_code: "{80}",
        sdesc: "Underdark Areas"
    },
    SPECIAL: {
        color_code: "{90}",
        sdesc: "Special areas"
    },
    VILLAGES: {
        color_code: "{A0}",
        sdesc: "Villages and encampments"
    },
    CITIES: {
        color_code: "{B0}",
        sdesc: "Major cities and towns"
    },
    IMMS_RPS: {
        color_code: "{C0}",
        sdesc: "Areas for imms and special rps"
    },
    GUILDHOUSES_ACADEMIES: {
        color_code: "{D0}",
        sdesc: "Guildhouses and Academies"
    },
    ORGANIZATIONS: {
        color_code: "{E0}",
        sdesc: "Organization HQ and side areas"
    },
    TEMPLES: {
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

const ITEM_TYPES = {
    ITEM_TYPE_LIGHT: {
        code: "ITEM_TYPE_LIGHT",
        sdesc: "ITEM_TYPE_LIGHT",
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
            type: "int",
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "level of spell/s *",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "spell number 1",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "spell number 2",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "spell number3",
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "weapon flag",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "weapon flag modifiers",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "container flags",
        },
        value2: {
            type: null,
            type_enum: null,
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
            ldesc: "layers",
        },
    },
    ITEM_TYPE_TREASURE: {
        code: "ITEM_TYPE_TREASURE",
        sdesc: "ITEM_TYPE_TREASURE",
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
            ldesc: "layers",
        },
    },
    ITEM_TYPE_ARMOR: {
        code: "ITEM_TYPE_ARMOR",
        sdesc: "ITEM_TYPE_ARMOR",
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "body type (lesson pending)",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "layers",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "level of spells",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "spell number 1",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "spell number 2",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "container flags",
        },
        value2: {
            type: null,
            type_enum: null,
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
            ldesc: "layers",
        },
    },
    ITEM_TYPE_DRINKCON: {
        code: "ITEM_TYPE_DRINKCON",
        sdesc: "ITEM_TYPE_DRINKCON",
        value0: {
            type: null,
            type_enum: null,
            ldesc: "total amount of drinks",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "current amount of drinks",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "liquid #",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "component/herb value",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "junks on use or not",
        },
    },
    ITEM_TYPE_KEY: {
        code: "ITEM_TYPE_KEY",
        sdesc: "ITEM_TYPE_KEY",
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "nourishment value",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "decay timer",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "FOOD_RAW or FOOD_COOKED, 0 is raw",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "# of coins",
        },
        value1: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "Amount of drinks",
        },
        value2: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "level of spells",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "spell number 1",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "spell number 2",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "quantity",
        },
        value2: {
            type: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "maximum capacity of pipe",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "amount of herb in the pipe",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "herb type",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "spell number",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "Language",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "Skill Level (From 1 to 25)",
        },
    },
    ITEM_TYPE_LEVER: {
        code: "ITEM_TYPE_LEVER",
        sdesc: "ITEM_TYPE_LEVER",
        value0: {
            type: null,
            type_enum: null,
            ldesc: "lever trigger flag",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "vnum of teleport room or spell number or start room or room to be randomised",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "room to load the mob or object into",
        },
        value3: {
            type: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "lever trigger flag",
        },
        value1: {
            type: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "trap type",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "number of reloads",
        },
        value2: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "low room vnum",
        },
        value2: {
            type: null,
            type_enum: null,
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
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "weapon flag",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "weapon flag modifiers",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "capacity in pounds",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "container flags",
        },
        value2: {
            type: null,
            type_enum: null,
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
            ldesc: "layers",
        },
    },
    ITEM_TYPE_SHOVEL: {
        code: "ITEM_TYPE_SHOVEL",
        sdesc: "ITEM_TYPE_SHOVEL",
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "level",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "Number of uses",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value3: {
            type: null,
            type_enum: null,
            ldesc: "herb type",
        },
        value4: {
            type: null,
            type_enum: null,
            ldesc: "spell slot number",
        },
    },
    ITEM_TYPE_SYMBOL: {
        code: "ITEM_TYPE_SYMBOL",
        sdesc: "ITEM_TYPE_SYMBOL",
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "level of spell",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "max charges",
        },
        value2: {
            type: null,
            type_enum: null,
            ldesc: "charges left",
        },
        value3: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "capacity",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "container flags",
        },
        value2: {
            type: null,
            type_enum: null,
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
        value0: {
            type: null,
            type_enum: null,
            ldesc: "number of uses for the component and amount of herb",
        },
        value1: {
            type: null,
            type_enum: null,
            ldesc: "unused",
        },
        value2: {
            type: null,
            type_enum: null,
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
        this.name = null;
        this.category = null;
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
        this.logging_material = null;
        
        this.rooms = [];
        this.objects = [];
        this.mobs = [];
        
    }
    get _error_prefix() {
        return `[Area:${this.name}]`;
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
                errors = errors.concat(justice_system_errors.map((error) => `${this._error_prefix} ${error}`));
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
        if (this.mining_material != null && !(this.mining_material.code in OBJECT_MATERIALS)) {
            errors.push(`${this._error_prefix} Invalid mining material`);
        }
        // Logging materials
        if (this.logging_material != null && !(this.logging_material.code in OBJECT_MATERIALS)) {
            errors.push(`${this._error_prefix} Invalid logging material`);
        }
        // Check rooms
        for (let i = 0; i < this.rooms.length; i++) {
            let room_errors = this.rooms[i].validate();
            if (room_errors.length) {
                errors = errors.concat(room_errors.map((error) => (`${this._error_prefix} ${error}`)))
            }
        }
        // Check objects
        for (let i = 0; i < this.objects.length; i++) {
            let object_errors = this.objects[i].validate();
            if (object_errors.length) {
                errors = errors.concat(object_errors.map((error) => (`${this._error_prefix} ${error}`)))
            }
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
${this.rooms.length ? "#ROOMS\n" + this.rooms.map((room)=>(room.toString())).join("\n") : ""}
${this.objects.length ? "#OBJECTS\n" + this.objects.map((obj)=>(obj.toString())).join("\n") : ""}
#$
`.replace(/\n[\n]+/g, "\n");
    }
}

class JusticeSystem {
    constructor() {
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
    }
    get _error_prefix() {
        return "[JusticeSystem]"
    }
    
    validate() {
        let errors = []
        
        // Check courtroom
        if (this.courtroom == null) {
            errors.push(`${this._error_prefix} No courtroom defined`);
        }
        /*else { // Courtroom room errors will be tracked by Area
            let courtroom_errors = this.courtroom.validate()
            if (courtroom_errors.length) {
                errors = errors.concat(courtroom_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        }*/ 
        
        // Check dungeon
        if (this.dungeon == null) {
            errors.push(`${this._error_prefix} No dungeon defined`);
        }
        /* else { // Dungeon room errors will be tracked by Area
            let dungeon_errors = this.dungeon.validate()
            if (dungeon_errors.length) {
                errors = errors.concat(dungeon_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        } */
        
        // Check judge
        if (this.judge == null) {
            errors.push(`${this._error_prefix} No judge defined`);
        }
        /* else { // Mob errors will be tracked by Area
            let judge_errors = this.judge.validate()
            if (judge_errors.length) {
                errors = errors.concat(judge_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        } */
        
        // Check guard
        if (this.guard == null) {
            errors.push(`${this._error_prefix} No guard defined`);
        }
        /* else { // Mob errors will be tracked by Area
            let guard_errors = this.guard.validate()
            if (guard_errors.length) {
                errors = errors.concat(guard_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        } */
        
        // Check crimes
        for (let c in this.crimes) {
            let crime = this.crimes[c]
            if (crime.punishment == null) {
                errors.push(`${this._error_prefix} Crime "${crime.sdesc}" has no punishment defined`);
            }
            else if (crime.punishment.do_not_use) {
                errors.push(`${this._error_prefix} Crime "${crime.sdesc}" has uncoded punishment "${crime.punishment.code}"`);
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

class Room {
    constructor() {
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
        };
        this.exits = [];
        this.extra_descriptions = [];
    }
    get _error_prefix() {
        return `[Room:(${this.vnum}) ${this.sdesc}]`;
    }
    validate() {
        let errors = [];
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
        else if (!(this.flags.sector.code in SECTOR_FLAGS)) {
            errors.push(`${this._error_prefix} Invalid sector`);
        }
        else if (this.flags.sector.do_not_use) {
            errors.push(`${this._error_prefix} Sector "${this.flags.sector.code}" should not be used`);
        }
        for (let i = 0; i < this.flags.room_flags.length; i++) {
            if (!(this.flags.room_flags[i].code in ROOM_FLAGS)) {
                errors.push(`${this._error_prefix} Invalid room flag`);
            }
            else if (this.flags.room_flags[i].do_not_use) {
                errors.push(`${this._error_prefix} Room flag ${this.flags.room_flags[i].code} should not be used`);
            }
        }
        for (let i = 0; i < this.exits.length; i++) {
            let exit_errors = this.exits[i].validate();
            if (exit_errors.length) {
                errors = errors.concat(exit_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        }
        for (let i = 0; i < this.extra_descriptions.length; i++) {
            let extra_description_errors = this.extra_descriptions[i].validate();
            if (extra_description_errors.length) {
                errors = errors.concat(extra_description_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        }
        return errors;
    }
    
    toString() {
        return `#${this.vnum}
${this.sdesc}~
${this.ldesc}
~
${this.flags.defunct} ${this.flags.room_flags.join("|")||"0"} ${this.flags.sector.code} ${this.flags.teleport_delay} ${this.flags.teleport_target} ${this.flags.tunnel}
${this.exits.map((exit) => (exit.toString())).join("\n")}
${this.extra_descriptions.map((desc) => (desc.toString())).join("\n")}
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
    }
    get _error_prefix() {
        return `[Exit:${this.flags.target_vnum}]`
    }
    validate() {
        let errors = [];
        if (this.direction == null) {
            errors.push(`${this._error_prefix} No direction defined`);
        }
        if (this.direction in EXIT_DIRECTIONS) {
            errors.push(`${this._error_prefix} Invalid direction`);
        }
        if (this.flags.target_vnum == null) {
            errors.push(`${this._error_prefix} No target vnum defined`);
        }
        if (this.direction == EXIT_DIRECTIONS.DDIR_SOMEWHERE && this.somewhere_keyword == null) {
            errors.push(`${this._error_prefix} Somewhere exit defined, but no exit keyword specified`);
        }
        if (this.direction == EXIT_DIRECTIONS.DDIR_SOMEWHERE && this.flags.door_flags.indexOf(EXIT_DOOR_FLAGS.EX_XAUTO) != -1) {
            errors.push(`${this._error_prefix} Somewhere exit defined, but EX_XAUTO flag not set`);
        }
        if (this.door_keyword != "" && this.flags.door_flags.indexOf(EXIT_DOOR_FLAGS.EX_ISDOOR) == -1) {
            errors.push(`${this._error_prefix} Door keywords defined, but EX_ISDOOR flag not set`);
        }
        for (let i = 0; i < this.flags.door_flags.length; i++) {
            if (!(this.flags.door_flags[i].code in EXIT_DOOR_FLAGS)) {
                errors.push(`${this._error_prefix} Invalid flag`);
            }
        }
        if (this.flags.exit_size in EXIT_SIZES) {
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
${this.direction == EXIT_DIRECTIONS.DDIR_SOMEWHERE ? this.somewhere_keyword : this.door_keyword}~
${this.flags.door_flags.map((flag)=>(flag.code)).join("|")||"0"} ${this.flags.door_key} ${this.flags.target_vnum} ${this.flags.exit_size}`;
    }
}

class ExtraDescription {
    constructor() {
        this.keywords = null;
        this.ldesc = null;
    }
    get _error_prefix() {
        return `[ExtraDescription:${this.keywords}]`;
    }
    
    validate() {
        let errors = [];
        if (this.keywords == null) {
            errors.push(`${this._error_prefix} No keywords defined`);
        }
        if (this.ldesc == null) {
            errors.push(`${this._error_prefix} No description defined`);
        }
        return errors;
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

class GameObject {
    constructor() {
        this.vnum = null;
        this.sdesc = null;
        this.ldesc - null;
        this.keywords = null;
        this.action_description = ""; // Not used
        this.item_type = null;
        this.attributes = [];
        this.wear_flags = [];
        this.extra_descriptions = [];
        this.quality = null;
        this.material = null;
        this.condition = null;
        this.size = null;
        this.values = {
            value0: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
            value5: 0,
        }
        this.special_applies = [];
        this.programs = [];
        this.identify_message = null;
    }
    get _error_prefix() {
        return `[GameObject:(${this.vnum}) ${this.sdesc}]`;
    }
    
    validate() {
        let errors = [];
        if (this.vnum == null) {
            errors.push(`${this._error_prefix} No vnum defined`);
        }
        if (this.sdesc == null) {
            errors.push(`${this._error_prefix} No short description defined`);
        }
        if (this.ldesc == null) {
            errors.push(`${this._error_prefix} No long description defined`);
        }
        if (this.keywords == null) {
            errors.push(`${this._error_prefix} No keywords defined`);
        }
        if (this.action_description !== "") {
            errors.push(`${this._error_prefix} "action_description" is not used and should be empty`);
        }
        if (this.item_type == null) {
            errors.push(`${this._error_prefix} No item type defined`);
        }
        else if (!(this.item_type.code in ITEM_TYPES)) {
            errors.push(`${this._error_prefix} Invalid item type defined`);
        }
        for (let i = 0; i < this.attributes.length; i++) {
            if (!(this.attributes[i].code in OBJECT_ATTRIBUTES)) {
                errors.push(`${this._error_prefix} Invalid attribute defined`);
            }
            else if (this.attributes[i].do_not_use) {
                errors.push(`${this._error_prefix} Attribute "${this.attributes[i].code}" should not be used`);
            }
        }
        for (let i = 0; i < this.wear_flags.length; i++) {
            if (!(this.wear_flags[i].code in WEAR_LOCATIONS)) {
                errors.push(`${this._error_prefix} Invalid wear flag defined`);
            }
            else if (this.wear_flags[i].do_not_use) {
                errors.push(`${this._error_prefix} Wear flag "${this.wear_flags[i].code}" should not be used`);
            }
        }
        for (let i = 0; i < this.extra_descriptions.length; i++) {
            let ed_errors = this.extra_descriptions[i].validate()
            if (ed_errors.length) {
                errors = errors.concat(ed_errors.map((error) => `${this._error_prefix} ${error}`));
            }
        }
        if (this.quality == null) {
            errors.push(`${this._error_prefix} No quality defined`);
        }
        else if (!(this.quality.code in OBJECT_QUALITY)) {
            errors.push(`${this._error_prefix} Invalid quality defined`);
        }
        if (this.condition == null) {
            errors.push(`${this._error_prefix} No condition defined`);
        }
        else if (!(this.condition.code in OBJECT_CONDITION)) {
            errors.push(`${this._error_prefix} Invalid condition defined`);
        }
        if (this.material == null) {
            errors.push(`${this._error_prefix} No material defined`);
        }
        else if (!(this.material.code in OBJECT_MATERIALS)) {
            errors.push(`${this._error_prefix} Invalid material defined`);
        }
        if (this.size == null) {
            errors.push(`${this._error_prefix} No size defined`);
        }
        else if (!(this.size.code in OBJECT_SIZES)) {
            errors.push(`${this._error_prefix} Invalid size defined`);
        }
        for (let i = 0; i < this.special_applies.length; i++) {
            if (!(this.special_applies[i].code in OBJECT_APPLIES)) {
                errors.push(`${this._error_prefix} Invalid APPLY defined`);
            }
            else if (["APPLY_CLASS","APPLY_LEVEL","APPLY_AGE","APPLY_EXP",
                      "APPLY_RESISTANT","APPLY_IMMUNE","APPLY_SUSCEPTIBLE",
                      "APPLY_PALM","APPLY_SCAN","APPLY_BLOOD"].indexOf(this.special_applies[i].code) != -1) {
                errors.push(`${this._error_prefix} Unused APPLY code "${this.special_applies[i].code}" defined`);
            }
        }
        return errors;
    }
    
    toString() {
        return `#${this.vnum}
${this.keywords}~
${this.sdesc}~
${this.ldesc}~
${this.action_description}~
${this.item_type.code}
${this.attributes.map((attribute)=>(attribute.code)).join("|")||0}
${this.wear_flags.map((flag)=>(flag.code)).join("|")||0}
${this.quality.code} ${this.material.code} ${this.condition.code} ${this.size.code}
${this.values.value0} ${this.values.value1} ${this.values.value2} ${this.values.value3} ${this.values.value4} ${this.values.value5}
${this.extra_descriptions.map((desc) => (desc.toString())).join("\n")}
${this.special_applies.map((spec) => (`A ${spec.code} ${spec.value}`)).join("\n")}
${this.identify_message != null ? `I\n${this.identify_message}\n~` : "" }
${this.programs.map((program) => (program.toString())).join("\n")}
`;
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


//export default Loader;

// DEBUG
function testLoader() {
    let loader = new Loader();
    //console.log(loader.toString());
    
    loader.area.name = "Calimport";
    loader.area.category = AREA_CATEGORIES.CITIES;
    loader.area.reset_msg = "{A0}A hot wind blows off the desert.";
    loader.area.authors.push("Grenwyn");
    loader.area.economy.min = 100000;
    loader.area.economy.max = 100000;
    loader.area.weather.humidity = 1;
    loader.area.weather.temperature = 8;
    // loader.area.authors.push("Lord Greywether") // should fail
    
    let courtroom = new Room();
    courtroom.vnum = "QQ01";
    courtroom.sdesc = "Courtroom";
    courtroom.ldesc = "A really big courtroom";
    courtroom.flags.sector = SECTOR_FLAGS.SECT_INSIDE;
    let courtroom_exit = new Exit();
    courtroom_exit.direction = EXIT_DIRECTIONS.DDIR_DOWN;
    courtroom_exit.door_keyword = "trapdoor";
    courtroom_exit.flags.door_flags.push(EXIT_DOOR_FLAGS.EX_ISDOOR);
    courtroom_exit.flags.door_flags.push(EXIT_DOOR_FLAGS.EX_LOCKED);
    courtroom_exit.flags.door_flags.push(EXIT_DOOR_FLAGS.EX_CLOSED);
    courtroom.exits.push(courtroom_exit)
    
    let dungeon = new Room();
    dungeon.vnum = "QQ03";
    dungeon.sdesc = "Dungeon";
    dungeon.ldesc = "A really smelly dungeon";
    dungeon.flags.sector = SECTOR_FLAGS.SECT_INSIDE;
    let dungeon_exit = new Exit();
    dungeon_exit.direction = EXIT_DIRECTIONS.DDIR_UP
    dungeon_exit.door_keyword = "trapdoor"
    dungeon_exit.flags.door_flags.push(EXIT_DOOR_FLAGS.EX_ISDOOR)
    dungeon_exit.flags.door_flags.push(EXIT_DOOR_FLAGS.EX_LOCKED)
    dungeon_exit.flags.door_flags.push(EXIT_DOOR_FLAGS.EX_CLOSED)
    dungeon.exits.push(dungeon_exit)
    let dungeon_extra_desc = new ExtraDescription()
    dungeon_extra_desc.keywords = "smelly garbage"
    dungeon_extra_desc.ldesc = "There's a heap of really nasty garbage here. It might be a way out - if you die of food poisoning!"
    dungeon.extra_descriptions.push(dungeon_extra_desc)
    
    
    dungeon_exit.flags.target_vnum = courtroom.vnum
    courtroom_exit.flags.target_vnum = dungeon.vnum
    
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
    loader.area.justice_system.crimes.CRIME_HIGH_MURDER.punishment = PUNISHMENTS.PUNISHMENT_DEATH;
    loader.area.justice_system.crimes.CRIME_LOW_MURDER.punishment = PUNISHMENTS.PUNISHMENT_SEVER;
    loader.area.justice_system.crimes.CRIME_ASSAULT.punishment = PUNISHMENTS.PUNISHMENT_JAIL;
    loader.area.justice_system.crimes.CRIME_MUGGING.punishment = PUNISHMENTS.PUNISHMENT_RANDOM_ITEM;
    
    console.log(loader.toString());
}

testLoader();