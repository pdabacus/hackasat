const { getSatelliteInfo } = require("tle.js/dist/tlejs.cjs");
const { getLatLngObj } = require("tle.js/dist/tlejs.cjs");
//const { getInclination } = require("tle.js/dist/tlejs.cjs");

var tle =
    " COSMOS 2504 \n" +
    " 1 40555U 15020D   20101.44064482  .00000104  00000-0  36031-4 0  9995\n" +
    " 2 40555  82.5204 173.2889 0614584 281.5746  71.7061 13.59402796243165";

var lat = 27.0704;
var lon = 119.62;
var t = 1587042970.590099;

var pwm_a = 2457;
var pwm_b = 7372;

var time = new Date(0);
time.setUTCMilliseconds(t*1000);
console.log(time);

var latlon = getLatLngObj(tle, time);
console.log(latlon);

var data = getSatelliteInfo(tle, time, lat, lon, 0);
console.log(data);

if (data.azimuth > 180) {
    data.azimuth -= 180;
    data.elevation = 180 - data.elevation;
}
var az = pwm_a + (pwm_b - pwm_a) * data.azimuth / 180;
var el = pwm_a + (pwm_b - pwm_a) * data.elevation / 180;

console.log(t);
console.log(az);
console.log(el);
console.log("=================");

var N = 720;
for (i=0; i<N; ++i) {
    time = new Date(0);
    time.setUTCMilliseconds(t*1000);
    data = getSatelliteInfo(tle, time, lat, lon, 0);
    if (data.azimuth > 180) {
        data.azimuth -= 180;
        data.elevation = 180 - data.elevation;
    }
    az = pwm_a + (pwm_b - pwm_a + 1) * data.azimuth / 180;
    el = pwm_a + (pwm_b - pwm_a + 1) * data.elevation / 180;
    console.log(t + ", " + Math.round(az) + ", " + Math.round(el));
    ++t;
}
console.log();
