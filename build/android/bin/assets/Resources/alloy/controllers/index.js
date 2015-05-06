function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId3 = Ti.UI.createView({
        width: "100%",
        height: "300",
        id: "__alloyId3"
    });
    $.__views.index.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "white",
        text: "text to translate:",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "30",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.textField = Ti.UI.createTextField({
        id: "textField",
        width: "75%",
        top: "50"
    });
    $.__views.__alloyId3.add($.__views.textField);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "white",
        text: "base lang / run amount",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "110",
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        selectionIndicator: "true",
        useSpinner: "true",
        top: "140"
    });
    $.__views.__alloyId3.add($.__views.picker);
    var __alloyId6 = [];
    $.__views.col_lang = Ti.UI.createPickerColumn({
        id: "col_lang",
        width: "60%"
    });
    __alloyId6.push($.__views.col_lang);
    $.__views.col_amount = Ti.UI.createPickerColumn({
        id: "col_amount",
        width: "15%"
    });
    __alloyId6.push($.__views.col_amount);
    $.__views.picker.add(__alloyId6);
    $.__views.runbutton = Ti.UI.createButton({
        id: "runbutton",
        top: "260",
        title: "Run",
        width: "75%"
    });
    $.__views.__alloyId3.add($.__views.runbutton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var core = require("core");
    Ti.App.addEventListener("apiloaded", function() {
        var info = {
            lang: null,
            num: 1
        };
        (function(lang) {
            for (var i in lang) {
                var elem1 = Ti.UI.createPickerRow({
                    title: lang[i].name
                });
                $.col_lang.add(elem1);
                if (0 != i) {
                    var elem2 = Ti.UI.createPickerRow({
                        title: i
                    });
                    $.col_amount.add(elem2);
                } else info.lang = lang[i].name;
            }
            $.picker.addEventListener("change", function(e) {
                info = {
                    lang: e.selectedValue[0],
                    num: e.selectedValue[1]
                };
            });
        })(core.Tool.language);
        $.runbutton.addEventListener("click", function() {
            core.Tool.win("result", {
                text: $.textField.value,
                language: core.Tool.langcode(info["lang"]),
                amount: info["num"]
            }).open();
        });
        $.index.open();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;