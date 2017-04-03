/**
 * Used when removing a listener
 * 
 * @interface IListener
 */
interface IListener {
	name: string,
	key?: string,
}
/**
 * Extends listener
 * Used when registering a listener
 * 
 * @interface IListenerFull
 * @extends {IListener}
 */
interface IListenerFull extends IListener {
	cb: (newValue?, oldValue?, key?) => any
}
/**
 * 
 * 
 * @class Watchable
 */
class Watchable {
	/**
	 * Creates an instance of Watchable.
	 * @param {Object} properties 
	 * @param {IListenerFull[]} [listeners=[]] 
	 * 
	 * @memberOf Watchable
	 */
	constructor(private properties: Object, private listeners: IListenerFull[] = []) {
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
				})(properties, key, value)
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
	private setter(key: string, newValue: any, oldValue: any) {
		for (var index = 0; index < this.listeners.length; index++) {
			var listener = this.listeners[index];
			if (listener.key === key.toString() || listener.key === "") {
				listener.cb(newValue, oldValue, key);
			}
		}
	}
	/**
	 * 
	 * 
	 * @param {IListenerFull} listener 
	 * @returns 
	 * 
	 * @memberOf Watchable
	 */
	public registerListener(listener: IListenerFull) {
		listener.name = (listener.name === void 0 ? "" : listener.name.toString())
		listener.key = (listener.key === void 0 ? "" : listener.key.toString())

		this.listeners.push({
			name: listener.name,
			cb: listener.cb,
			key: listener.key
		});

		return this;
	}
	/**
	 * 
	 * 
	 * @param {IListener} [listener={ name: "" }] 
	 * @returns 
	 * 
	 * @memberOf Watchable
	 */
	public removeListener(listener: IListener = { name: "" }) {
		listener.name = (listener.name === void 0 ? "" : listener.name.toString())
		listener.key = (listener.key === void 0 ? "" : listener.key.toString())

		this.listeners = this.listeners.filter(function (suspect) {
			return (listener.key === suspect.key && listener.name === suspect.name) === false;
		});

		return this;
	}
}
