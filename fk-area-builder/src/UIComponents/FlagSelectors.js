import React from 'react';
import {MenuItem} from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import ListSubheader from 'material-ui/List/ListSubheader';
import {ListItemText} from 'material-ui/List';
import Autosuggest from 'react-autosuggest';
import {equal_recursively} from '../Models/model';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

class FlagWithCategorySelector extends React.Component {
    handleChange(event) {
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
            <FormControl fullWidth={true} error={!!this.validate()}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select
                    value={this.props.value?this.props.value.code:""}
                    onChange={this.handleChange.bind(this)}
                    renderValue={(v)=>(v?this.props.flags[v].sdesc:"")}
                    fullWidth={true}
                >
                    {this.generateItems(this.props.flags)}
                </Select>
                <FormHelperText>{this.validate()}</FormHelperText>
            </FormControl>
        );
    }
}
FlagWithCategorySelector.contextTypes = {
  validator: PropTypes.object
};

class FlagSelector extends React.Component {
    handleChange(event) {
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
                return (<MenuItem 
                    key={flags[key].code} 
                    value={flags[key].code}>
                    <ListItemText 
                        primary={flags[key].sdesc}
                        secondary={flags[key].ldesc} />
                </MenuItem>)
            }
            return (<MenuItem key={flags[key].code} value={flags[key].code}>{flags[key].sdesc}</MenuItem>)
        }))
    }
    
    validate() {
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    
    render() {
        return (
            <FormControl fullWidth={true} error={!!this.validate()}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select
                    value={this.props.value?this.props.value.code:""}
                    onChange={this.handleChange.bind(this)}
                    renderValue={(v)=>{return v?this.props.flags[v].sdesc:""}}
                    fullWidth={true}
                >
                    {this.generateItems(this.props.flags)}
                </Select>
                <FormHelperText>{this.validate()}</FormHelperText>
            </FormControl>
        );
    }
}
FlagSelector.contextTypes = {
  validator: PropTypes.object
};

class MultiFlagSelector extends FlagSelector {
    handleChange(event) {
        this.props.onChange({target:{id:this.props.id}}, event.target.value.map(v=>this.props.flags[v]));
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
                return (<MenuItem 
                    key={flags[key].code} 
                    value={flags[key].code} >
                    <ListItemText 
                        primary={flags[key].sdesc}
                        secondary={flags[key].ldesc} />
                </MenuItem>)
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
            <FormControl fullWidth={true} error={!!this.validate()}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select
                    multiple={true}
                    value={this.props.value.map(v=>v.code)}
                    onChange={this.handleChange.bind(this)}
                    fullWidth={true}
                    renderValue={(v)=>(v.map(flag=>this.props.flags[flag].sdesc).join(", "))}
                >
                    {this.generateItems(this.props.flags, this.props.value)}
                </Select>
                <FormHelperText>{this.validate()}</FormHelperText>
            </FormControl>
        );
    }
}
MultiFlagSelector.contextTypes = {
  validator: PropTypes.object
};

class VnumAutoComplete extends React.Component {
    state = {
        suggestions:this.props.dataSource
    }
    shouldComponentUpdate(newProps) {
        return !equal_recursively(this.props.value, newProps.value)
    }
    
    updateInput(event, v) {
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
    renderSuggestionsContainer = ({ containerProps, children }) => {
        if (this.autosuggest) {
            return (
                <Popover 
                    disableAutoFocus
                    disableEnforceFocus
                    disableRestoreFocus
                    hideBackdrop
                    anchorEl={this.autosuggest.input} 
                    anchorOrigin={{vertical:"bottom",horizontal:"left"}}
                    open={Boolean(containerProps.className && containerProps.className.indexOf("suggestionsContainerOpen")!==-1)} 
                    {...containerProps} >
                    {children}
                </Popover>
            );
        }
    }
    
    render() {
        const { classes } = this.props;
        return (
            <FormControl fullWidth={true} error={!!this.validate()}>
                <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
                <Autosuggest 
                    ref={(autosuggest)=>(this.autosuggest = autosuggest)}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderInputComponent={this.renderInput}
                    suggestions={this.state.suggestions}
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
                    renderSuggestionsContainer={this.renderSuggestionsContainer}
                    getSuggestionValue={item=>item.vnum}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={{
                        classes,
                        id:this.props.id,
                        fullWidth:true,
                        value:this.props.value||"",
                        onChange:this.updateInput.bind(this)
                    }}
                />
                <FormHelperText>{this.validate()}</FormHelperText>
            </FormControl>
        )
    }
}
VnumAutoComplete.contextTypes = {
  validator: PropTypes.object
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
    //position: 'absolute',
    zIndex: 1500,
    marginTop: theme.spacing.unit,
    //left: 0,
    //right: 0,
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
        return !equal_recursively(this.props, newProps)
    }
    handleChange(event, value) {
        this.props.onChange({target:{id:this.props.id}}, event.target.value)
    }
    
    validate() {
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    
    render() {
        const { onChange, id, ...other } = this.props
        return (
            <TextField 
                error={!!this.validate()}
                autoComplete="off" 
                fullWidth={true}
                onChange={this.handleChange.bind(this)}
                helperText={this.validate()} 
                {...other} />
        )
    }
}
ValidatedTextField.contextTypes = {
  validator: PropTypes.object
};

export {FlagWithCategorySelector,FlagSelector,MultiFlagSelector,VnumAutoComplete,ValidatedTextField}