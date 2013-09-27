var BaseNEncode = function () { this.init.apply(this, arguments) };
BaseNEncode.prototype = {
	init : function (chars) {

		if (typeof chars === 'string') {
			chars = chars.split('');
		}

		this.base = chars.length;
		this.chars = chars;
		this.map = {};
		this.bits = 1; while (this.base >> (this.bits + 1)) this.bits++;


		for (var i = 0, len = chars.length; i < len; i++) {
			this.map[ chars[i] ] = i;
		}
	},

	encode : function (number) {
		if (!number) return this.chars[0];

		var ret = '';

		while (number > 0) {
			var rem = number % this.base;
			number = Math.floor(number / this.base);
			ret = this.chars[rem] + ret;
		}

		return ret;
	},

	decode : function (encoded) {
		var decoded = 0, multi = 1;
		for (var i = encoded.length - 1; i >= 0; i--) {
			decoded += this.map[encoded.charAt(i)] * multi;
			multi = multi * this.base;
		}
		return decoded;
	},

	encodeString : function (string) {
		if (this.bits > 0x100) throw "not supported with bits over 255";

		string = unescape(encodeURIComponent(string));

		var stream = '';
		for (var i = 0, len = string.length; i < len; i++) {
			stream += (string.charCodeAt(i) + 0x100).toString(2).slice(1);
		}

		while (stream.length % this.bits !== 0) stream += '0';

		var ret = '';

		for (var i = 0, len = stream.length; i < len; i += this.bits) {
			ret += this.encode(parseInt(stream.substr(i, this.bits), 2));
		}

		return ret;
	},

	decodeString : function (encoded) {
		if (this.bits > 0x100) throw "not supported with bits over 255";

		var stream = '';
		for (var i = 0, len = encoded.length; i < len; i++) {
			stream += (this.map[encoded.charAt(i)] + (1 << this.bits)).toString(2).slice(1);
		}

		var ret = '';

		for (var i = 0, len = stream.length; i < len; i += 8) {
			ret += String.fromCharCode(parseInt(stream.substr(i, 8), 2));
		}

		return decodeURIComponent(escape(ret));
	}
};

this.BaseNEncode = BaseNEncode;

