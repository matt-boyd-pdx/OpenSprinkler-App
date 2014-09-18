/* jshint undef: false */
var assert = chai.assert;

describe("Initial Definition Check", function(){
	it("storage.set(object,callback) should accept an object of key/value pairs to be set into localStorage and respond with callback", function(done){
		assert.doesNotThrow(function(){
			storage.set({
				testkey: "helloworld"
			},function(result){
				if (result === true) {
					done();
				}
			});
		});
	});

	it("storage.get(object,callback) should accept an array of keys to be retrieved from localStorage and respond with callback", function(done){
		assert.doesNotThrow(function(){
			storage.get(["testkey"],function(result){
				if (result.testkey === "helloworld") {
					done();
				}
			});
		});
	});

	it("storage.remove(object,callback) should accept an array of keys to be deleted from localStorage and respond with callback", function(done){
		assert.doesNotThrow(function(){
			storage.remove(["testkey"],function(result){
				if (result === true) {
					done();
				}
			});
		});
	});
});

describe("OpenSprinkler Firmware Version Functions",function(){

	describe("Test against Arduino Firmware Version",function(){
		before(function(){
			controller.options = {
				fwv: 210
			};
		});
		it("isOPSi() should identify if the device is an OSPi",function(){
			assert.equal(false,isOSPi());
		});
		it("versionCompare(device,compare) should check the given firmware (device) against the compare firmware where the input is an array",function(){
			assert.strictEqual(false,versionCompare([1],[1,5]));
			assert.strictEqual(0,versionCompare([1,5],[1,5]));
			assert.strictEqual(1,versionCompare([2,1],[1,5]));
		});
		it("checkOSVersion(compare) should compare the input firmware version against the Arduino firmware version.",function(){
			assert.strictEqual(false,checkOSVersion(211));
			assert.strictEqual(true,checkOSVersion(210));
			assert.strictEqual(1,checkOSVersion(208));
		});
		it("checkOSPiVersion(compare) should compare the input firmware version against the OSPi firmware version.",function(){
			assert.strictEqual(false,checkOSPiVersion("2.0"));
			assert.strictEqual(false,checkOSPiVersion("1.9"));
			assert.strictEqual(false,checkOSPiVersion("2.1"));
		});
	});

	describe("Test against OSPi Firmware Version",function(){
		before(function(){
			controller.options = {
				fwv: "1.9.0-OSPi"
			};
		});
		it("isOPSi() should identify if the device is an OSPi",function(){
			assert.equal(true,isOSPi());
		});
		it("versionCompare(device,compare) should check the given firmware (device) against the compare firmware where the input is an array",function(){
			assert.strictEqual(false,versionCompare([1],[1,5]));
			assert.strictEqual(0,versionCompare([1,5],[1,5]));
			assert.strictEqual(1,versionCompare([2,1],[1,5]));
		});
		it("checkOSVersion(compare) should compare the input firmware version against the Arduino firmware version.",function(){
			assert.strictEqual(false,checkOSVersion(211));
			assert.strictEqual(false,checkOSVersion(210));
			assert.strictEqual(false,checkOSVersion(208));
		});
		it("checkOSPiVersion(compare) should compare the input firmware version against the OSPi firmware version.",function(){
			assert.strictEqual(1,checkOSPiVersion("1.8"));
			assert.strictEqual(true,checkOSPiVersion("1.9.0"));
			assert.strictEqual(false,checkOSPiVersion("2.0"));
			assert.strictEqual(false,checkOSPiVersion("2.1"));
		});
	});

	describe("Retrieve the formatted firmware version",function(){
		before(function(){
			controller.options = {
				fwv: 204
			};
		});
		it("getOSVersion(fwv) should return the firmware in a string representation",function(){
			assert.equal("1.8.3-OSPi",getOSVersion("1.8.3-OSPi"));
			assert.equal("2.1.193-OSPi",getOSVersion("2.1.193-OSPi"));
			assert.equal("2.0.8",getOSVersion(208));
			assert.equal("2.0.4",getOSVersion());
		});
	});
});

describe("General Function Checks", function(){
	it("colorContrast(color) should take rgb(r,g,b) and return the appropriate color contrast for the input color",function(){
		assert.equal("black",colorContrast("rgb(50,200,0)"));
		assert.equal("white",colorContrast("rgb(0,0,0)"));
	});

	it("parseIntArray(array) should convert all members into integers",function(){
		assert.deepEqual([9, 394, 29193, -1],parseIntArray(["9","394","29193","-1"]));
	});

	it("sec2hms(number) should return a string representation of the difference the input represents (seconds)",function(){
		assert.equal("23:59:59",sec2hms(86399));
		assert.equal("15:00",sec2hms(900));
	});

	it("sec2dhms(number) should return an object containing days, hours, minutes and seconds from the input (seconds)",function(){
		assert.deepEqual({
			days: 936,
			hours: 17,
			minutes: 20,
			seconds: 9
		}, sec2dhms(80932809));
	});

	it("dhms2str(object) should convert an object with elements days, hours, minutes and seconds into a string representation",function(){
		assert.equal("5d 4h 3m 1s",dhms2str({days:5,hours:4,minutes:3,seconds:1}));
		assert.equal("0s",dhms2str({}));
	});

	it("dhms2sec(object) should convert an object with elements days, hours, minutes and seconds into a second value",function(){
		assert.equal(100981,dhms2sec({days:1,hours:4,minutes:3,seconds:1}));
	});

	it("getDayName(day,type) should return the day of the week and can be of type 'short'",function(){
		assert.equal("Sunday",getDayName(new Date(1410745528126)));
		assert.equal("Thu",getDayName(new Date(1410445528126),"short"));
	});

	it("getUnique(array) should take any array and remove duplicates",function(){
		assert.deepEqual([0],getUnique([0,0]));
		assert.deepEqual([9992,"hello"],getUnique([9992,9992,"hello"]));
	});

	it("pad(number) should succesfully prepend a 0 to a single digit",function(){
		assert.equal("00", pad(0));
		assert.equal("01", pad(1));
		assert.equal("10", pad(10));
		assert.equal("999", pad(999));
	});
});