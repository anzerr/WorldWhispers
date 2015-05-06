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
    this.__controllerPath = "result";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.result = Ti.UI.createWindow({
        title: "Title",
        id: "result"
    });
    $.__views.result && $.addTopLevelView($.__views.result);
    $.__views.back = Ti.UI.createButton({
        id: "back",
        top: "0",
        title: "< Back",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: "100%",
        height: "8%"
    });
    $.__views.result.add($.__views.back);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        scrollType: "vertical",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "92%",
        width: "90%",
        top: "8%"
    });
    $.__views.result.add($.__views.scrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var core = require("core");
    $.back.addEventListener("click", function() {
        $.result.close();
    });
    var args = arguments[0];
    new core.Engine(core, $.scrollView, args.text, args.language, args.amount);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;