window.ace.define("ace/mode/fk_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {

var oop = acequire("../lib/oop");
var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

var FkHighlightRules = function() {

    var keywords = (
        "mpadvance|mpaffect|mpapply|mpapplyb|mpareaecho|mpasound|mpat|mpcast|mpclearability|" +
        "mpclearspell|mpclosepassage|mpdamage|mpdegrade|mpdeposit|mpdrain|mpdream|mpecho|" +
        "mpechoaround|mpechoat|mpfavor|mpforce|mpgive|mpgoto|mphireemployee|mpinfect|" +
        "mpinvis|mpjunk|mpkill|mpkilllist|mplag|mplog|mpmadd|mpmakecash|mpmload|mpmset|" +
        "mpnothing|mpoadd|mpoload|mpopenpassage|mposet|mppeace|mppkset|mppractice|mppunish|" +
        "mppurge|mpquiet|mpregoto|mpresize|mprestore|mpreward|mprset|mpsetclan|mpsetfeat|" +
        "mpsetheight|mpsetsong|mpsettrap|mpsetweight|mpslay|mptakecash|mptakecashroom|" +
        "mptrain|mptransfer|mpunintercept|mpwalkto|mpwithdraw|if|else|endif|"
    );

    var builtinConstants = (
        "$n|$N|$i|$I|$t|$T|$r|$R|$e|$m|$s|$E|$M|$S|$j|$k|$l|$J|$K|$L|$o|$O|$c|$C|$p|$P|$a|" +
        "$A|$f|$F|$w|$W|$b|$v|$0|$1|$2|$3|$4|$5|$6|$7|$8|$9|self"
    );

    var builtinFunctions = (
        "actorhasobjnum|actorotypewear|align|canhire|canpkill|cha|charinroom|clan|class|" +
        "con|day|deity|dex|doingquest|economy|favor|feat|formation|getcurrentuses|goldamt|" +
        "goldamtroom|goldamtroomc|glory|glory_total|group|guild|hashorse|haspet|hitamt|" +
        "hitprcnt|hometown|inarea|inroom|int|isaffected|isburied($o)|ischaotic|ischarmed|" +
        "isclanned|isdevoted|isemployer|isevil|isfamilar|isfight|isfollow|isfullmoon|" +
        "isgood|isguilded|ishelled|isimmort|isindoors|islawful|ismobinvis|ismounted|" +
        "isneutral|isnpc|isordered|ispc|ispet|ispkill|isunconcerned|isundead|iswanted|" +
        "killer|kismet|language|lck|level|manaamt|manaprcnt|material|memorised|mobinroom|" +
        "mobinvislevel|month|moveamt|moveprcnt|name|norecall|number|numinarea|objininv|" +
        "objinroom|objtype|objval0|objval1|objval2|objval3|objval4|objval5|objisworn|" +
        "order|otypecarry|otypehere|otypeinv|otyperoom|otypewear|ovnumcarry|ovnumhere|" +
        "ovnuminv|ovnumroom|ovnumwear|ownsmark|pcinroom|perm_cha|perm_con|perm_dex|" +
        "perm_int|perm_lck|perm_str|perm_wis|position|practice|quality|quest|questr|race|" +
        "rand|resistance|sector|sex|skilllevel|skillcheck|str|string|stringprefix|temp|" +
        "thief|time|timeskilled|value5bits|wasinroom|wear_loc|weather|wis|"
    );
    var keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "constant.language": builtinConstants,
        "keyword": keywords
    }, "identifier");

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var vnum = "(?:[mi][\\d]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + "|" + vnum + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : ";.*$"
        }, {
            token : "constant.numeric", // imaginary
            regex : "(?:" + floatNumber + "|\\d+)[jJ]\\b"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // long integer
            regex : integer + "[lL]\\b"
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]\\)\\}]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],
    };
};

oop.inherits(FkHighlightRules, TextHighlightRules);

exports.FkHighlightRules = FkHighlightRules;
});

window.ace.define("ace/mode/folding/fk",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"], function(acequire, exports, module) {

var oop = acequire("../../lib/oop");
var BaseFoldMode = acequire("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(markers) {
    this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, match.index);
            if (match[2])
                return this.indentationBlock(session, row, match.index + match[2].length);
            return this.indentationBlock(session, row);
        }
    };

}).call(FoldMode.prototype);

});

window.ace.define("ace/mode/fk",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/fk_highlight_rules","ace/mode/folding/fk","ace/range"], function(acequire, exports, module) {

var oop = acequire("../lib/oop");
var TextMode = acequire("./text").Mode;
var FkHighlightRules = acequire("./fk_highlight_rules").FkHighlightRules;
var FkFoldMode = acequire("./folding/fk").FoldMode;
var Range = acequire("../range").Range;

var Mode = function() {
    this.HighlightRules = FkHighlightRules;
    this.foldingRules = new FkFoldMode("\\:");
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ";";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type === "comment") {
            return indent;
        }

        if (state === "start") {
            var match = line.match(/^.*[{([:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    var outdents = {
        "pass": 1,
        "return": 1,
        "raise": 1,
        "break": 1,
        "continue": 1
    };
    
    this.checkOutdent = function(state, line, input) {
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
        
        if (!tokens)
            return false;
        do {
            var last = tokens.pop();
        } while (last && (last.type === "comment" || (last.type === "text" && last.value.match(/^\s+$/))));
        
        if (!last)
            return false;
        
        return (last.type === "keyword" && outdents[last.value]);
    };

    this.autoOutdent = function(state, doc, row) {
        
        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) === tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
    };

    this.$id = "ace/mode/fk";
}).call(Mode.prototype);

exports.Mode = Mode;
});
