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
        console.trace()
        console.log("Model Values", values);
        for (let p in field_list) {
            try {
                console.log(p, values[p])
                this[p] = values[p] !== undefined ? values[p] : field_list[p].value
            } catch(e) {
                console.log(p, e, field_list);
                throw(e);
            }
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
    
    clone() {
        var props = Object.getOwnPropertyDescriptors(this)
        for (var prop in props) {
            props[prop].value = props[prop].value && props[prop].value.clone ? props[prop].value.clone() : props[prop].value
        }
        return Object.create(
            Object.getPrototypeOf(this), 
            props
        )
    }
}

module.exports = {
    Field: Field,
    Model: Model
}