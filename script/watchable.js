var Watchable = (function () {
    function Watchable(properties, listeners) {
        if (listeners === void 0) { listeners = []; }
        this.properties = properties;
        this.listeners = listeners;
        var self = this;
        this.clone = JSON.parse(JSON.stringify(properties));
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
                (function (a, b) {
                    Object.defineProperty(a, b, {
                        get: function () {
                            return self.clone[b];
                        },
                        set: function (newValue) {
                            self.setter(b, newValue);
                        }
                    });
                })(properties, key);
            }
        }
        Object.defineProperty(properties, "WatchAble", {
            value: self,
            writable: true
        });
    }
    Watchable.instance = function (properties, listeners) {
        if (listeners === void 0) { listeners = []; }
        var w = new Watchable(properties, listeners);
        return w.properties;
    };
    Watchable.prototype.setter = function (key, value) {
        for (var index = 0; index < this.listeners.length; index++) {
            var listener = this.listeners[index];
            if (listener.key === key.toString() || listener.key === "") {
                var cloneVal = this.clone[key];
                this.clone[key] = value;
                listener.cb.call(this.properties, value, cloneVal);
            }
        }
    };
    Watchable.prototype.getter = function (key) {
        return this.clone[key];
    };
    Watchable.prototype.registerListener = function (listener) {
        listener.name = (listener.name === void 0 ? "" : listener.name.toString());
        listener.key = (listener.key === void 0 ? "" : listener.key.toString());
        this.listeners.push({
            name: listener.name,
            cb: listener.cb,
            key: listener.key
        });
        return this;
    };
    Watchable.prototype.removeListener = function (listener) {
        if (listener === void 0) { listener = { name: "" }; }
        listener.name = (listener.name === void 0 ? "" : listener.name.toString());
        listener.key = (listener.key === void 0 ? "" : listener.key.toString());
        this.listeners = this.listeners.filter(function (suspect) {
            return (listener.key === suspect.key && listener.name === suspect.name) === false;
        });
        return this;
    };
    return Watchable;
}());
