function equal_recursively(obj1, obj2) {
    if (obj1 === obj2) {
        // Same object/primitive
        return true;
    }
    if (obj1 instanceof Array && obj2 instanceof Array) {
        if (obj1.length !== obj2.length) {
            return false; // Arrays, but different length, so not equal
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!equal_recursively(obj1[i], obj2[i])) {
                return false; // Item is not equal
            }
        }
        return true; // Array check passed, so equal
    }
    else if (obj1 !== null && obj2 !== null && obj1 instanceof Object && obj2 instanceof Object) {
        let keys = new Set(Object.keys(obj1), Object.keys(obj2))
        for (let prop of keys) {
            if (!equal_recursively(obj1[prop], obj2[prop])) {
                return false; // Prop is not equal
            }
        }
        return true; // Object check passed, so equal
    }
    return false;
}

function clone(obj) {
    var props = Object.getOwnPropertyDescriptors(obj)
    let result = Object.create(Object.getPrototypeOf(obj))
    let result_props = {}
    for (var prop in props) {
        result_props[prop] = props[prop].value;
    }
    return Object.assign(result, result_props);
}

class Field {
    constructor(options) {
        this.name = options.field_name;
        this.value = options.default_value;
        this.options = {
            in_flags: options.in_flags,
            optional: options.optional,
            ignore_validation: options.ignore_validation
        };
    }
}

class Model {
    constructor(field_list={}, values={}) {
        for (let p in field_list) {
            try {
                this[p] = values[p] !== undefined ? values[p] : field_list[p].value
            } catch(e) {
                throw(e);
            }
        }
    }
    
    clone() {
        return clone(this)
    }
}

module.exports = {
    Field: Field,
    Model: Model,
    equal_recursively: equal_recursively
}