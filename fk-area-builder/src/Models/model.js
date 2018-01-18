class Field {
    constructor(options) {
        this.name = options.field_name;
        this.value = options.default_value;
        this.options = {
            in_flags: options.in_flags,
            optional: options.optional
        };
    }
    
    validate(value) {
        let errors = [];
        if (value == null) {
            if (!this.options.optional) {
                errors.push(`.${this.name} should not be empty`)
            }
        }
        else {
            if (value instanceof Array) {
                for (let i = 0; i < value.length; i++) {
                    if (this.options.in_flags && !(value[i].code in this.options.in_flags)) {
                        errors.push(`.${this.name} "${value[i].code}" is not valid`)
                    }
                    if (value[i].do_not_use) {
                        errors.push(`.${this.name} "${value[i].code}" should not be used`)
                    }
                }
            }
            else if (value instanceof Model) {
                errors = errors.concat(value.validate().map((err)=>(`${this.name}.${err}`)))
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
    constructor(field_list) {
        this._fields = field_list
        
        for (let p in field_list) {
            this[p] = field_list[p].value
        }
    }
    
    get _error_prefix() {
        return "[Model]"
    }
    
    validate() {
        let errors = [];
        for (let prop in this._fields) {
            errors = errors.concat(this._fields[prop].validate(this[prop]).map((err)=>(`${this._error_prefix}${err}`)));
        }
        return errors;
    }
}

module.exports = {
    Field: Field,
    Model: Model
}