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
    this.__controllerPath = "detail";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.detail = Ti.UI.createWindow({
        title: "Title",
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    $.__views.back = Ti.UI.createButton({
        id: "back",
        top: "0",
        title: "< Back",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: "100%",
        height: "8%"
    });
    $.__views.detail.add($.__views.back);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Sentence :",
        top: "100",
        id: "__alloyId0"
    });
    $.__views.detail.add($.__views.__alloyId0);
    $.__views.sentence = Ti.UI.createLabel({
        top: "120",
        width: "75%",
        color: "white",
        id: "sentence",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.detail.add($.__views.sentence);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        text: "Language :",
        top: "200",
        id: "__alloyId1"
    });
    $.__views.detail.add($.__views.__alloyId1);
    $.__views.language = Ti.UI.createLabel({
        top: "220",
        width: "75%",
        color: "white",
        id: "language",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.detail.add($.__views.language);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "Sentence in your language :",
        top: "300",
        id: "__alloyId2"
    });
    $.__views.detail.add($.__views.__alloyId2);
    $.__views.translation = Ti.UI.createLabel({
        top: "320",
        width: "75%",
        color: "white",
        id: "translation",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.detail.add($.__views.translation);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("core");
    $.back.addEventListener("click", function() {
        $.detail.close();
    });
    var args = arguments[0];
    $.sentence.text = args.sentence;
    $.language.text = args.language;
    $.translation.text = args.translation;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;