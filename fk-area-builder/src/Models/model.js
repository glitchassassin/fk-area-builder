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
    
    validate(value) {
        let errors = [];
        if (this.options.ignore_validation) {
            return errors;
        }
        if (value == null || value === "") {
            if (!this.options.optional) {
                errors.push(`.${this.name} should not be empty`)
            }
        }
        else {
            if (value instanceof Array) {
                if (!this.options.optional && value.length == 0) {
                    errors.push(`.${this.name} should not be empty`)
                }
                for (let i = 0; i < value.length; i++) {
                    try {
                        if (this.options.in_flags && value[i].code && !(value[i].code in this.options.in_flags)) {
                            errors.push(`.${this.name} "${value[i].code}" is not valid`)
                        }
                    }
                    catch (e) {
                        console.log(this);
                        throw (e)
                    }
                    if (value[i].do_not_use) {
                        errors.push(`.${this.name} "${value[i].code}" should not be used`)
                    }
                    if (value[i] instanceof Model) {
                        errors = errors.concat(value[i].validate().map((err)=>(`.${this.name}${err}`)))
                    }
                }
            }
            else if (value instanceof Model) {
                errors = errors.concat(value.validate().map((err)=>(`.${this.name}${err}`)))
            }
            else {
                if (this.options.in_flags && !(value.code in this.options.in_flags)) {
                    errors.push(`.${this.name} "${value.code}" is not valid`)
                }
                if (value.do_not_use) {
                    errors.push(`.${this.name} "${value.code}" should not be used`)
                }
            }
        }
        return errors;
    }
}

class Model {
    constructor(field_list={}, values={}) {
        this._fields = field_list
        for (let p in field_list) {
            try {
                this[p] = values[p] !== undefined ? values[p] : field_list[p].value
            } catch(e) {
                throw(e);
            }
        }
    }
    
    get _error_prefix() {
        return "[Model]"
    }
    
    validate(field) {
        if (field !== undefined) {
            return this._fields[field].validate(this[field]).join("");
        }
        let errors = [];
        for (let prop in this._fields) {
            errors = errors.concat(this._fields[prop].validate(this[prop]).map((err)=>(`${this._error_prefix}${err}`)));
        }
        return errors;
    }
    
    clone(hash=new WeakMap()) {
        if (hash.has(this)) return hash.get(this);
        var props = Object.getOwnPropertyDescriptors(this)
        let result = Object.create(Object.getPrototypeOf(this))
        hash.set(this, result);
        let result_props = {}
        for (var prop in props) {
            if (props[prop].value && props[prop].value.clone) {
                result_props[prop] = props[prop].value.clone(hash);
            }
            else if (props[prop].value instanceof Array) {
                result_props[prop] = [];
                for (let i of props[prop].value) {
                    if (i instanceof Model) {
                        result_props[prop].push(i.clone(hash));
                    }
                    else {
                        result_props[prop].push(i);
                    }
                }
            }
            else {
                result_props[prop] = props[prop].value;
            }
        }
        return Object.assign(result, result_props);
    }
    
    equals(other_model) {
        if (other_model instanceof Model) {
            // Check if all fields are equal
            if (this === other_model) {
                // Same object - of course it's equal!
                return true;
            }
            for (let field in this._fields) {
                // If field is a Model, use its equals method for comparison
                if (this[field] instanceof Model && !this[field].equals(other_model[field])) {
                    return false;
                }
                // If field is an Array, check length, then each item for equality
                if (this[field] instanceof Array) {
                    if (this[field].length != other_model[field].length) {
                        return false;
                    }
                    for (let i = 0; i < this[field].length; i++) {
                        if (this[field][i] instanceof Model && !this[field][i].equals(other_model[field][i])) {
                            return false;
                        }
                        if (other_model[field][i] != this[field][i]) {
                            return false;
                        }
                    }
                }
                // Otherwise, just check equality.
                if (other_model[field] != this[field]) {
                    return false;
                }
            }
            // All fields check out; must be equal!
            return true;
        }
        // Other object is not a Model, so not equal.
        return false;
    }
}

module.exports = {
    Field: Field,
    Model: Model
}