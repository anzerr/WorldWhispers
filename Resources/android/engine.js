var obj = function(obm, view, text, lang, num) {
    this.obm = obm;
    this.translation = [];
    this.usedlang = [];
    this.elem = [];
    this.baselang = lang;
    this.view = view;
    this.startint = num;
    if (0 != num) {
        this.obm.Tool.reset();
        this.run(text, lang, num);
    }
};

obj.prototype = {
    lang: [],
    run: function(text, lang, num) {
        var translation = this.savedata({
            text: text,
            lang: lang,
            color: this.startint == num ? "green" : "white"
        }), self = this;
        var nextlang = this.randlang();
        num > 0 ? this.translate(text, nextlang, translation.lang, function(res) {
            Ti.API.info(res + " to " + nextlang + " left " + num);
            self.run(res, nextlang, num - 1);
        }) : this.translate(text, this.baselang, translation.lang, function(res) {
            self.savedata({
                text: res,
                lang: self.baselang,
                color: "green"
            });
        });
    },
    savedata: function(obj) {
        var id = this.translation.length;
        this.gendisplay(obj);
        this.translation[id] = obj;
        this.usedlang[this.usedlang.length] = obj.lang;
        return this.translation[id];
    },
    translate: function(text, target, source, callback) {
        this.usedlang[this.usedlang.length] = this.usedlang;
        this.send(this.url, {
            key: this.key,
            source: source,
            target: target,
            q: text,
            prettyprint: false
        }, function(res) {
            callback(res.data.translations[0].translatedText);
        });
    },
    gendisplay: function(obj) {
        var height = 30, top = this.translation.length * height, self = this;
        this.obm.elem = [];
        var elem = Ti.UI.createImageView({
            image: "./flags/" + obj.lang + ".png",
            top: top + (height - 20) / 2,
            left: 0,
            width: 24,
            height: 20
        });
        this.elem[this.elem.length] = elem;
        this.obm.elem[this.obm.elem.length] = elem;
        this.view.add(elem);
        var elem = Ti.UI.createLabel({
            text: obj.text,
            color: obj.color,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            top: top + (height - 20) / 2,
            left: 30,
            width: "70%",
            height: 20
        });
        this.elem[this.elem.length] = elem;
        this.obm.elem[this.obm.elem.length] = elem;
        this.view.add(elem);
        var pageinfo;
        this.baselang != obj.lang ? this.translate(obj.text, this.baselang, obj.lang, function(res) {
            pageinfo = {
                sentence: obj.text,
                language: self.obm.Tool.codelang(obj.lang),
                translation: res
            };
        }) : pageinfo = {
            sentence: obj.text,
            language: self.obm.Tool.codelang(obj.lang),
            translation: obj.text
        };
        var elem = Ti.UI.createButton({
            title: "Info >",
            top: top,
            left: "80%",
            width: "20%",
            height: 30,
            font: {
                fontSize: 10
            },
            borderRadius: 1
        });
        this.elem[this.elem.length] = elem;
        this.obm.elem[this.obm.elem.length] = elem;
        elem.addEventListener("click", function() {
            isset(pageinfo) && self.obm.Tool.win("detail", pageinfo).open();
        });
        this.view.add(elem);
    },
    loadlang: function(callback) {
        var self = this;
        this.send(this.url + "/languages", {
            key: this.key,
            source: this.obm.Config.baselang,
            target: this.obm.Config.baselang,
            prettyprint: false
        }, function(res) {
            var data = res.data.languages;
            for (var i in data) self.lang[self.lang.length] = data[i];
            callback(self.lang);
        });
    },
    randlang: function() {
        var found = false, rand = null;
        while (!found) {
            null == this.lang && (this.lang = []);
            rand = this.lang[Math.floor(Math.random() * this.lang.length)];
            var valid = true;
            for (var i in this.usedlang) if (this.usedlang[i] == rand.language) {
                valid = false;
                break;
            }
            valid && (found = true);
        }
        return rand.language;
    },
    url: "https://www.googleapis.com/language/translate/v2",
    key: "AIzaSyAq9sFTT5tNOfwxj48XRJy5INyTH92CME0",
    send: function(url, parm, callback) {
        Ti.API.debug(url);
        for (var i in parm) Ti.API.debug(i + " : " + parm[i]);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info(this.responseText);
                callback(JSON.parse(this.responseText));
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
            },
            timeout: 5e3
        });
        client.setRequestHeader("Content-Type", "application/json");
        client.open("GET", url, false);
        client.send(parm);
    }
};

module.exports = obj;