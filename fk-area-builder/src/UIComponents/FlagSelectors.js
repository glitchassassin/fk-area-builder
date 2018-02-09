import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import AutoComplete from 'material-ui/AutoComplete';

const ldesc_style = {
    color: "rgba(180,180,180,1)",
    lineHeight: "15px",
    fontStyle: "italic",
    padding: "5px",
    display: "inline-block",
    whiteSpace: "normal"
}

class FlagWithCategorySelector extends React.Component {
    state = {
        value: null,
    };

    handleChange = (event, index, value) => this.setState({ value });
    
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
            to_return.push(<Subheader>{cat}</Subheader>)
            for (let i = 0; i < categories[cat].length; i++) {
                to_return.push(<MenuItem value={flags[categories[cat][i]].code} primaryText={flags[categories[cat][i]].sdesc} />)
            }
        }
        return to_return;
    }
    
    render() {
        return (
            <SelectField
              floatingLabelText={this.props.label}
              value={this.state.value}
              onChange={this.handleChange}
            >
                {this.generateItems(this.props.flags)}
            </SelectField>
        );
    }
}

class FlagSelector extends React.Component {
    state = {
        value: this.props.value,
    };

    handleChange(event, index, value) {
        this.setState({ value });
        
        this.props.onChange({target:{id:this.props.id}}, value, index);
    }
    
    generateItems(flags) {
        return Object.keys(flags).map(function(key) {
            if (flags[key].do_not_use) {
                return "";
            }
            if (flags[key].ldesc) {
                return (<MenuItem key={flags[key].code} value={flags[key]} primaryText={flags[key].sdesc}><span style={ldesc_style}>{flags[key].ldesc}</span></MenuItem>)
            }
            return (<MenuItem key={flags[key].code} value={flags[key]} primaryText={flags[key].sdesc} />)
        })
    }
    
    render() {
        return (
            <SelectField
              floatingLabelText={this.props.label}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            >
                {this.generateItems(this.props.flags)}
            </SelectField>
        );
    }
}

class MultiFlagSelector extends FlagSelector {
    state = {
        values: this.props.value,
    };

    handleChange(event, index, value) {
        this.setState({ values: value });
        
        this.props.onChange({target:{id:this.props.id}}, value, index);
    }
    
    generateItems(flags, values) {
        return Object.keys(flags).map(function(key) {
            if (flags[key].do_not_use) {
                return "";
            }
            if (flags[key].ldesc) {
                return (<MenuItem key={flags[key].code} value={flags[key]} checked={values && values.indexOf(flags[key]) > -1} primaryText={flags[key].sdesc}><span style={ldesc_style}>{flags[key].ldesc}</span></MenuItem>)
            }
            return (<MenuItem key={flags[key].code} value={flags[key]} checked={values && values.indexOf(flags[key]) > -1} primaryText={flags[key].sdesc} />)
        })
    }
    
    render() {
        const {values} = this.state;
        return (
            <SelectField
              multiple={true}
              floatingLabelText={this.props.label}
              value={values}
              onChange={this.handleChange.bind(this)}
            >
                {this.generateItems(this.props.flags, values)}
            </SelectField>
        );
    }
}

class VnumAutoComplete extends React.Component {
    state = {
        value: this.props.value
    }
    generateItems(vnum_list) {
        return vnum_list.map((vnum_item) => (
            {
                text: vnum_item.vnum,
                value: (<MenuItem 
                    key={vnum_item.vnum}
                    value={vnum_item.vnum}
                    primaryText={`${vnum_item.vnum}: ${vnum_item.sdesc}`} 
                />)
            }
        ));
    }
    updateInput(searchText, dataSource, params) {
        this.props.onChange({target:{id:this.props.id}}, searchText);
    }
    render() {
        return (
            <AutoComplete 
                floatingLabelText={this.props.floatingLabelText} 
                id={this.props.id} 
                searchText={this.props.value} 
                autoComplete="off" 
                onUpdateInput={this.updateInput.bind(this)} 
                filter={AutoComplete.noFilter} 
                openOnFocus={true} 
                dataSource={this.generateItems(this.props.dataSource)}
            />
        )
    }
}

export {FlagWithCategorySelector,FlagSelector,MultiFlagSelector,VnumAutoComplete}