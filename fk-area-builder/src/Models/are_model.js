class Loader {
    constructor(are_string="") {
        // Accepts a string containing a .are file
        // Validates the file, then loads the contents into a new model
        this.area = new Area();
    }
    
    toString() {
        return this.area.toString()
    }
}

class Area {
    constructor() {
        this._error_prefix = "Area"
        this.name = null;
        this.authors = [];
        this.justice_system = null;
    }
    
    validate() {
        let errors = []
        // Area name
        if (this.name == null) {
            errors.push(`${this._error_prefix} No area name defined`);
        }
        if (!this.authors.length) {
            errors.push(`${this._error_prefix} No authors defined`);
        }
        else {
            for (let i = 0; i < this.authors.length; i++) {
                if (this.authors[i].indexOf(" ") != -1) {
                    errors.push(`${this._error_prefix} Spaces are not permitted for author names ("${this.authors[i]}")`);
                }
            }
        }
        if (this.justice_system != null) {
            let justice_system_errors = this.justice_system.validate()
            if (justice_system_errors.length) {
                errors.push(justice_system_errors.map((error) => `${this._error_prefix} ${error}`))
            }
        }
        return errors
    }
    
    toString() {
        let errors = this.validate()
        if (errors.length) {
            return "Invalid Area\n" + errors.join("\n")
        }
        
        return `#AREA ${this.name}~

#AUTHOR ${this.authors.join(" ")}~

${this.justice_system != null ? this.justice_system.toString() : ""}
#$
`
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

//export default Loader;

// DEBUG
function testLoader() {
    let loader = new Loader();
    console.log(loader.toString())
    
    loader.area.name = "Calimport"
    loader.area.authors.push("Grenwyn")
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