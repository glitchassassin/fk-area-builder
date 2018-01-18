class Field {
    constructor(field_name, default_value=null, in_flags=null, optional=true, check_do_not_use=false) {
        this.name = field_name;
        this.value = default_value;
        this.options = {
            in_flags: in_flags,
            optional: optional,
            check_do_not_use: check_do_not_use
        };
    }
    
    validate() {
        let errors = [];
        if (this.value == null) {
            if (!this.options.optional) {
                errors.append(`.${this.name} should not be empty`)
            }
        }
        else {
            if (this.value instanceof Array) {
                for (let i = 0; i < this.value.length; i++) {
                    if (this.options.in_flags && (this.value[i].code in this.options.in_flags)) {
                        errors.append(`.${this.name} "${this.value[i].code}" is not valid`)
                    }
                    if (this.options.check_do_not_use && this.value[i].do_not_use) {
                        errors.append(`.${this.name} "${this.value[i].code}" should not be used`)
                    }
                }
            }
            else if (this.value instanceof Model) {
                errors = errors.concat(this.value.validate().map((err)=>(`${this.name}.${err}`)))
            }
            else {
                if (this.options.in_flags && (this.value.code in this.options.in_flags)) {
                    errors.append(`.${this.name} "${this.value.code}" is not valid`)
                }
                if (this.options.check_do_not_use && this.value.do_not_use) {
                    errors.append(`.${this.name} "${this.value.code}" should not be used`)
                }
            }
        }
        return errors;
    }
}

class Model {
    constructor(field_list) {
        this._fields = field_list;
        this.__proto__ = new Proxy(this._fields, {
            get: (container, property) => (property in container ? container[property].value : undefined),
            set: (container, property, value) => ((container[property] = value) ? true : true)
        });
    }
    
    get _error_prefix() {
        return "[Model]"
    }
    
    validate() {
        let errors = [];
        for (let prop in this._fields) {
            errors = errors.concat(this._fields[prop].validate().map((err)=>(`${this._error_prefix}.${err}`)));
        }
        return errors;
    }
}

module.exports = {
    Field: Field,
    Model: Model
}