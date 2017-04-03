/**
 *
 *
 * @class Watchable
 */
var Watchable = (function () {
    /**
     * Creates an instance of Watchable.
     * @param {Object} properties
     * @param {IListenerFull[]} [listeners=[]]
     *
     * @memberOf Watchable
     */
    function Watchable(properties, listeners) {
        if (listeners === void 0) { listeners = []; }
        this.properties = properties;
        this.listeners = listeners;
        var self = this;
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
                var value = properties[key];
                (function (a, b, c) {
                    Object.defineProperty(a, b, {
                        get: function () {
                            return c;
                        },
                        set: function (newValue) {
                            var o = c;
                            c = newValue;
                            self.setter(b, newValue, o);
                        }
                    });
                })(properties, key, value);
            }
        }
    }
    /**
     *
     *
     * @private
     * @param {string} key
     * @param {*} newValue
     * @param {*} oldValue
     *
     * @memberOf Watchable
     */
    Watchable.prototype.setter = function (key, newValue, oldValue) {
        for (var index = 0; index < this.listeners.length; index++) {
            var listener = this.listeners[index];
            if (listener.key === key.toString() || listener.key === "") {
                listener.cb(newValue, oldValue, key);
            }
        }
    };
    /**
     *
     *
     * @param {IListenerFull} listener
     * @returns
     *
     * @memberOf Watchable
     */
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
    /**
     *
     *
     * @param {IListener} [listener={ name: "" }]
     * @returns
     *
     * @memberOf Watchable
     */
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
