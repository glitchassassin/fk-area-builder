import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {FormControl, FormHelperText} from 'material-ui/Form'
import {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import ReactQuill, {Quill} from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.css';
import AceEditor from 'react-ace';
import './FK_Syntax';
import 'brace/theme/monokai';
const uuid = require('uuid/v4');



var QClipboard = Quill.import('modules/clipboard');
var Delta = Quill.import('delta');

const color_list = {
    "0": "#000000", 
    "1": "#800000", 
    "2": "#008000", 
    "3": "#808000", 
    "4": "#000080", 
    "5": "#800080", 
    "6": "#008080", 
    "7": "#c0c0c0", 
    "8": "#808080", 
    "9": "#ff0000", 
    "A": "#00ff00", 
    "B": "#ffff00", 
    "C": "#0000ff", 
    "D": "#ff00ff", 
    "E": "#00ffff", 
    "F": "#ffffff"
}

const stringToDelta = (fk=null) => {
	var buffer = fk
	if (!buffer.match(/^{..}/)) {
		buffer = "{70}" + buffer // Add default color code to beginning of string
	}
	if (!buffer.match(/\n$/)) {
		buffer = buffer + "\n" // Add trailing newline for QuillJS
	}
	console.log(buffer)
	var segments = buffer.split(/{(.)(.)}([\s\S]*?)/gm)
	var ops = []
	for (var i=1; i < segments.length; i+=4) {
		var foreground = color_list[segments[i].toUpperCase()] || color_list["7"];
		var background = color_list[segments[i+1].toUpperCase()] || color_list["0"];
		var text = segments[i+3];
		var attributes = {
			color: foreground,
			background: background
		}
		ops.push({
			insert: text,
			attributes: attributes
		});
	}
	buffer = '';
	let to_return = new Delta(ops)
	console.log(to_return);
	return to_return
}
const deltaToString = (delta) => {
    var to_return = "{70}"
    const color_lookup = (kv)=>(kv[1]===op["attributes"]["color"])
    const background_color_lookup = (kv)=>(kv[1]===op["attributes"]["background"])
    for (var i in delta["ops"]) {
        var op = delta["ops"][i]
        if ("attributes" in op) // Add default color code regardless
        {
            var color = "7"
            var background_color = "0"
            // Color codes change
            if ("color" in op["attributes"]) {
                color = Object.entries(color_list).filter(color_lookup)[0]
                color = color ? color[0] : "7"
            }
            if ("background" in op["attributes"]) {
                background_color = Object.entries(color_list).filter(background_color_lookup)[0]
                background_color = background_color ? background_color[0] : "0"
            }
            if (to_return.match(/{..}$/)) {
                to_return = to_return.slice(0,-4) // Avoiding superfluous color codes
            }
            to_return += "{" + color + background_color + "}"
        }/*
        else {
            to_return += "{70}"
        }*/
        if ("insert" in op) {
            to_return += op.insert.replace(/\n(?!{..})/, "\n{70}")
        }
        if (to_return.match(/{..}$/)) {
            to_return = to_return.slice(0,-4) // Avoiding superfluous color codes
        }
    }
    return to_return
}
class FkClipboard extends QClipboard {
    convert = stringToDelta;
    onPaste(e) {
		if (e.defaultPrevented || !this.quill.isEnabled()) return;
		e.stopPropagation();
		e.preventDefault();
		
		var clipboardData = e.clipboardData || window.clipboardData;
		var pastedData = clipboardData.getData('Text');
		
		let range = this.quill.getSelection();
		let delta = new Delta().retain(range.index);
		let scrollTop = this.quill.scrollingContainer.scrollTop;
		this.container.focus();
		this.quill.selection.update(Quill.sources.SILENT);
		setTimeout(() => {
		delta = delta.concat(this.convert(pastedData)).delete(range.length);
		this.quill.updateContents(delta, Quill.sources.USER);
		// range.length contributes to delta.length()
		this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
		this.quill.scrollingContainer.scrollTop = scrollTop;
		this.quill.focus();
		}, 1);
    }
}

const color_code_styles = {
    input_label_root: {
        left: "105px",
        top: "5px",
        zIndex: "1",
        pointerEvents: "none"
    },
    input_label_shrink: {
        transform: "translate(0, -5.0px) scale(0.75)"
    },
    helper_text_root: {
        marginLeft: "95px"
    }
}

class ColorCodeEditor extends Component {
    id=uuid()
    quill=null
    state = {
        valueString:"",
        valueDelta:stringToDelta("")
    }
    handleChange(content, delta, source, editor) {
        if (source === "user") {
            let valueDelta = editor.getContents();
            let valueString = deltaToString(valueDelta).replace(/\n$/, "");
            //if (valueString==="") { this.quill.format("color", "#c0c0c0") }
            this.setState({valueDelta, valueString})
            console.log("handleChange", valueDelta, valueString);
            this.props.onChange({target:{id:this.props.id}}, valueString) // If editor is cleared, set default format
            //if (this.focus) { this.focus(); }
        }
    }
    validate() {
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    componentDidMount() {
        Quill.register('modules/clipboard', FkClipboard, true);
        if (this.props.value !== this.state.valueString) {
            this.setState({valueDelta:stringToDelta(this.props.value)})
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.valueString) {
            this.setState({valueDelta:stringToDelta(nextProps.value)})
        }
    }
    quillRef = (ref) => {
        if (!ref) { return; }
        this.quill = ref.getEditor()
        this.quill.format("color", "#c0c0c0")
		this.quill.root.addEventListener('copy', (e) => {
			var range = this.quill.getSelection();
			if (range) {
				if (range.length === 0) {
				} else {
					var text = this.quill.getContents(range.index, range.length);
					e.clipboardData.setData('text/plain', deltaToString(text));
				}
			}
			e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
		});
    }
    formats = ['background', 'color']
    modules = {
		toolbar: {
			container: [
				{'color': Object.values(color_list)}, 
				{'background': Object.values(color_list).slice(0,8)}
			]
		}
	}
    render() {
        const { classes } = this.props
        //let value = stringToDelta(this.props.value)
        return (
            <Grid container spacing={8} justify="center"><Grid item style={{width:"789px"}}>
            <FormControl style={{maxWidth:"789px", width:"100%"}} error={Boolean(this.validate().length)}>
                <InputLabel classes={{root:classes.input_label_root, shrink:classes.input_label_shrink}} shrink={Boolean(this.props.value.trim())}>{this.props.label}</InputLabel>
                <div style={{marginTop:"16px"}}>
                <ReactQuill
                    theme="snow"
                    value={this.state.valueDelta}
                    ref={this.quillRef}
                    style={{minHeight:(24+18*parseInt(this.props.rows||"1", 10))+"px"}}
                    onChange={this.handleChange.bind(this)}
                    formats={this.formats}
        			modules={this.modules}
                />
                </div>
                <FormHelperText classes={{root:classes.helper_text_root}}>{this.validate()}</FormHelperText>
            </FormControl>
            </Grid></Grid>
        )
    }
}
ColorCodeEditor.contextTypes = {
  validator: PropTypes.object
};
ColorCodeEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
ColorCodeEditor = withStyles(color_code_styles)(ColorCodeEditor)

const program_styles = {
    input_label_root: {
        left: "50px",
        top: "16px",
        zIndex: "1",
        pointerEvents: "none"
    },
    input_label_shrink: {
        transform: "translate(0, -17.0px) scale(0.75)"
    },
    helper_text_root: {
        marginLeft: "45px"
    }
}

class ProgramEditor extends Component {
    handleChange(value, event) {
        this.props.onChange({target:{id:this.props.id}}, value)
    }
    validate() {
        if (this.context.validator) {
            return this.context.validator[this.props.id].validate(this.props.value).join("")
        }
        return ""
    }
    render() {
        const { classes } = this.props
        return (
            <FormControl fullWidth error={Boolean(this.validate().length)}>
                <InputLabel classes={{root:classes.input_label_root, shrink:classes.input_label_shrink}} shrink={Boolean(this.props.value.trim())}>{this.props.label}</InputLabel>
                <div style={{marginTop:"16px"}}>
                <AceEditor
                    mode="fk"
                    theme="monokai"
                    name="authors"
                    onLoad={this.onLoad}
                    onChange={this.handleChange.bind(this)}
                    fontSize={12}
                    showPrintMargin={true}
                    showGutter={true}
                    width={"100%"}
                    height={"250px"}
                    highlightActiveLine={true}
                    value={this.props.value} 
                    setOptions={{
                        showLineNumbers: true,
                        tabSize: 2,
                    }}/>
                </div>
                <FormHelperText classes={{root:classes.helper_text_root}}>{this.validate()}</FormHelperText>
            </FormControl>
        )
    }
}
ProgramEditor.contextTypes = {
  validator: PropTypes.object
};
ProgramEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
ProgramEditor = withStyles(program_styles)(ProgramEditor)

export { ColorCodeEditor, ProgramEditor }