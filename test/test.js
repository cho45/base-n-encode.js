#!/usr/bin/env node

var assert = require('assert');
var util = require('util');


var BaseNEncode = require('../lib/base-n-encode.js').BaseNEncode;

var b2 = new BaseNEncode([ 0, 1 ]);
for (var i = 0; i <= 0x100; i++) {
	assert.equal(b2.encode(i), i.toString(2));
	assert.equal(b2.decode(i.toString(2)), i);
}


var b16 = new BaseNEncode([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f' ]);
for (var i = 0; i <= 0x100; i++) {
	assert.equal(b16.encode(i), i.toString(16));
	assert.equal(b16.decode(i.toString(16)), i);
}

var b16 = new BaseNEncode('0123456789abcdef');
for (var i = 0; i <= 0x100; i++) {
	assert.equal(b16.encode(i), i.toString(16));
	assert.equal(b16.decode(i.toString(16)), i);
}

var b64 = new BaseNEncode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
assert.equal(b64.encode('A'), 0);
assert.equal(b64.encodeString("ABC"), "QUJD");
assert.equal(b64.encodeString("A"), "QQ");
assert.equal(b64.encodeString("AB"), "QUI");
assert.equal(b64.decodeString("QUJD"), "ABC");
assert.equal(b64.decodeString("QQ"), "A\u0000");

assert.equal(b64.encodeString("あ"), "44GC");
assert.equal(b64.decodeString("44GC"), "あ");


var b256chars = [];
var n = 0xa000;
for (var i = 0; i < 255; i++) {
	b256chars.push(String.fromCharCode(n + i));
}

var b256 = new BaseNEncode(b256chars);
console.log(b256.encodeString('あいうえお'));
assert.equal(b256.decodeString(b256.encodeString('あいうえお')).replace(/\0/g, ''), 'あいうえお');

