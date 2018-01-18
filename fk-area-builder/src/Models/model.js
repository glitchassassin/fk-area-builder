class Field {
    constructor(options) {
        this.name = options.field_name;
        this.value = options.default_value||null;
        this.options = {
            in_flags: options.in_flags||null,
            optional: options.optional||true
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
                    if (this.value[i].do_not_use) {
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
                if (this.value.do_not_use) {
                    errors.append(`.${this.name} "${this.value.code}" should not be used`)
                }
            }
        }
        return errors;
    }
}

class Model {
    constructor(field_list) {
        var p = new Proxy(field_list, {
            get: (container, property) => (property in container ? "value" in container[property]? container[property].value : container[property] : undefined),
            set: (container, property, value) => ((container[property] = value) ? true : true)
        });
        p.validate = function() {
            let errors = [];
            for (let prop in this._fields) {
                errors = errors.concat(this._fields[prop].validate().map((err)=>(`${this._error_prefix}.${err}`)));
            }
            return errors;
        }
        return p;
    }
    
    /*get _error_prefix() {
        return "[Model]"
    }*/
    
    
}

module.exports = {
    Field: Field,
    Model: Model
}