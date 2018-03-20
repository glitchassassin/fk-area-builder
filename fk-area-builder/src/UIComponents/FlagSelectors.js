import React from 'react';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import ListSubheader from 'material-ui/List/ListSubheader';
import {ListItem, ListItemText} from 'material-ui/List';
import Autosuggest from 'react-autosuggest';
import {equal_recursively} from '../Models/model';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types';

const ldesc_style = {
    color: "rgba(180,180,180,1)",
    lineHeight: "15px",
    fontStyle: "italic",
    padding: "5px",
    display: "inline-block",
    whiteSpace: "normal"
}

class FlagWithCategorySelector extends React.Component {
    handleChange(event) {
        console.log(event)
        this.props.onChange({target:{id:this.props.id}}, this.props.flags[event.target.target.value]);
    }
    
    shouldComponentUpdate(newProps) {
        return !equal_recursively(this.props.value, newProps.value)
    }
    
    generateItems(flags) {
        let categories = {};
        
        for (let c in flags) {
            if (!(flags[c].category in categories)) {
                categories[flags[c].category] = [];
            }
            categories[flags[c].category].push(c);
        }
        let to_return = []
        for (let cat in categories) {
            to_return.push(<ListSubheader key={cat}>{cat}</ListSubheader>)
            for (let i = 0; i < categories[cat].length; i++) {
                if (flags[categories[cat][i]].do_not_use) {
                    continue;
                }
                if (flags[categories[cat][i]].ldesc) {
                    to_return.push(<MenuItem key={flags[categories[cat][i]].code} value={flags[categories[cat][i]].code} secondary={flags[categories[cat][i]].ldesc}>{flags[categories[cat][i]].sdesc}</MenuItem>)
                }
                to_return.push(<MenuItem key={flags[categories[cat][i]].code} value={flags[categories[cat][i]].code}>{flags[categories[cat][i]].sdesc}</MenuItem>)
            }
        }
        return to_return;
    }
    
    validate() {
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    
    render() {
        return (
            <FormControl error={!!this.validate()}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select
                    value={this.props.value?this.props.value.code:null}
                    onChange={this.handleChange.bind(this)}
                    fullWidth={this.props.fullWidth}
                >
                    {this.generateItems(this.props.flags)}
                </Select>
                <FormHelperText>{this.validate()}</FormHelperText>
            </FormControl>
        );
    }
}
FlagWithCategorySelector.contextTypes = {
  validator: PropTypes.function
};

class FlagSelector extends React.Component {
    handleChange(event) {
        console.log(event.target);
        this.props.onChange({target:{id:this.props.id}}, this.props.flags[event.target.value]);
    }
    
    shouldComponentUpdate(newProps) {
        return !equal_recursively(this.props.value, newProps.value)
    }
    
    generateItems(flags) {
        return [<MenuItem key={""} value={null} />].concat(Object.keys(flags).map(function(key) {
            if (flags[key].do_not_use) {
                return "";
            }
            if (flags[key].ldesc) {
                return (<MenuItem key={flags[key].code} value={flags[key].code} secondary={flags[key].ldesc}>{flags[key].sdesc}</MenuItem>)
            }
            return (<MenuItem key={flags[key].code} value={flags[key].code}>{flags[key].sdesc}</MenuItem>)
        }))
    }
    
    validate() {
        console.log(this.context)
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    
    render() {
        console.log(this.props);
        console.log(this.generateItems(this.props.flags));
        return (
            <FormControl fullWidth={this.props.fullWidth} error={!!this.validate()}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select
                    value={this.props.value?this.props.value.code:""}
                    onChange={this.handleChange.bind(this)}
                    fullWidth={this.props.fullWidth}
                >
                    {this.generateItems(this.props.flags)}
                </Select>
                <FormHelperText>{this.validate()}</FormHelperText>
            </FormControl>
        );
    }
}
FlagSelector.contextTypes = {
  validator: PropTypes.function
};

class MultiFlagSelector extends FlagSelector {
    handleChange(event) {
        console.log(event)
        this.props.onChange({target:{id:this.props.id}}, this.props.flags[event.target.value]);
    }
    
    shouldComponentUpdate(newProps) {
        return !equal_recursively(this.props.value, newProps.value)
    }
    
    generateItems(flags, values) {
        return Object.keys(flags).map(function(key) {
            if (flags[key].do_not_use) {
                return "";
            }
            if (flags[key].ldesc) {
                return (<MenuItem key={flags[key].code} value={flags[key].code} checked={values && values.indexOf(flags[key]) > -1}>{flags[key].sdesc} secondary={flags[key].ldesc}</MenuItem>)
            }
            return (<MenuItem key={flags[key].code} value={flags[key].code} checked={values && values.indexOf(flags[key]) > -1}>{flags[key].sdesc}</MenuItem>)
        })
    }
    
    validate() {
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    
    render() {
        return (
            <FormControl error={!!this.validate()}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select
                    multiple={true}
                    value={this.props.value?this.props.value.code:null}
                    onChange={this.handleChange.bind(this)}
                    fullWidth={this.props.fullWidth}
                >
                    {this.generateItems(this.props.flags, this.props.value)}
                </Select>
                <FormHelperText>{this.validate()}</FormHelperText>
            </FormControl>
        );
    }
}
MultiFlagSelector.contextTypes = {
  validator: PropTypes.function
};

class VnumAutoComplete extends React.Component {
    state = {
        suggestions:this.props.dataSource
    }
    shouldComponentUpdate(newProps) {
        return !equal_recursively(this.props.value, newProps.value)
    }
    
    updateInput(event, v) {
        console.log(event, v)
        this.props.onChange({target:{id:this.props.id}}, v.newValue);
    }
    
    validate() {
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    
    get_suggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? this.props.dataSource : this.props.dataSource.filter(item =>
            item.vnum.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    renderInput(inputProps) {
        const { classes, ref, ...other } = inputProps;
    
        return (
            <Input
                inputRef={ref}
                classes={{
                  input: classes.input,
                }}
                {...other}
            />
        );
    }
    renderSuggestion(suggestion, { query, isHighlighted }) {
        return (
            <MenuItem selected={isHighlighted} component="div">
                <ListItemText primary={suggestion.vnum} secondary={suggestion.sdesc} />
            </MenuItem>
        );
    }
    renderSuggestionsContainer(options) {
        const { containerProps, children } = options;
        return (
            <Paper {...containerProps} square>
                {children}
            </Paper>
        );
    }
    
    render() {
        const { classes } = this.props;
        return (
            <FormControl fullWidth={this.props.fullWidth} error={!!this.validate()}>
                <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
                <Autosuggest 
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    fullWidth={this.props.fullWidth}
                    getSuggestionValue={item=>item.vnum}
                    onSuggestionsFetchRequested={({ value }) => {
                        this.setState({
                            suggestions: this.get_suggestions(value)
                        })
                    }}
                    onSuggestionsClearRequested={() => {
                        this.setState({
                            suggestions: this.props.dataSource
                        })
                    }}
                    shouldRenderSuggestions={()=>(true)}
                    renderInputComponent={this.renderInput}
                    renderSuggestionsContainer={this.renderSuggestionsContainer}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={{
                        classes,
                        id:this.props.id,
                        fullWidth:this.props.fullWidth,
                        value:this.props.value,
                        onChange:this.updateInput.bind(this)
                    }}
                    suggestions={this.state.suggestions}
                />
                <FormHelperText>{this.validate()}</FormHelperText>
            </FormControl>
        )
    }
}
VnumAutoComplete.contextTypes = {
  validator: PropTypes.function
};
VnumAutoComplete.propTypes = {
  classes: PropTypes.object.isRequired
};
const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    marginTop: "16px",
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});
VnumAutoComplete = withStyles(styles)(VnumAutoComplete)

class ValidatedTextField extends React.Component {
    shouldComponentUpdate(newProps) {
        return !equal_recursively(this.props.value, newProps.value)
    }
    handleChange(event, value) {
        console.log(event, value)
        this.props.onChange({target:{id:this.props.id}}, event.target.value)
    }
    
    validate() {
        console.log(this.props)
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    
    render() {
        return (
            <TextField 
                error={!!this.validate()}
                label={this.props.label}
                value={this.props.value} 
                fullWidth={this.props.fullWidth}
                autoComplete="off" 
                onChange={this.handleChange.bind(this)}
                helperText={this.validate()} />
        )
    }
}
ValidatedTextField.contextTypes = {
  validator: PropTypes.function
};

export {FlagWithCategorySelector,FlagSelector,MultiFlagSelector,VnumAutoComplete,ValidatedTextField}