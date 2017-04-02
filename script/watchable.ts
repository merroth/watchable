interface IListener {
	name: string,
	key?: string,
}
interface IListenerFull extends IListener {
	cb: (newValue, oldValue) => any
}

class Watchable {
	private clone: any;
	constructor(private properties, private listeners: IListenerFull[] = []) {
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
				})(properties, key)
			}
		}
		Object.defineProperty(properties, "WatchAble", {
			value: self,
			writable: true
		});
	}

	private setter(key, value) {
		var old = this.clone[key];
		this.clone[key] = value;
		for (var index = 0; index < this.listeners.length; index++) {
			var listener = this.listeners[index];
			if (listener.key === key.toString() || listener.key === "") {
				listener.cb(value, old);
			}
		}
	}

	private getter(key) {
		return this.clone[key];
	}

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

	public removeListener(listener: IListener = { name: "" }) {
		listener.name = (listener.name === void 0 ? "" : listener.name.toString())
		listener.key = (listener.key === void 0 ? "" : listener.key.toString())

		this.listeners = this.listeners.filter(function (suspect) {
			return (listener.key === suspect.key && listener.name === suspect.name) === false;
		});

		return this;
	}
}