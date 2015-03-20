/**
 * Created by dcastro on 20/3/15.
 */

// utils.js
// ========

module.exports = {
    buildAvailRequest : function(from, to, paxes, latitude, longitude, radius) {

        var rooms  = Math.ceil(paxes / 2);

        return {
            "stay":{
                "checkIn":from,
                "checkOut":to,
                "shiftDays":"0"
            },
            "dailyPrice":"Y",
            "occupancies":[
                {
                    "rooms":rooms,
                    "adults":paxes,
                    "children":"0"
                }
            ],
            "limit":{
                "maxHotels":5,
                "maxRooms":1
            },
            "query":"",
            "language":"ENG",
            "version":"default",
            "provider":"ACE",
            "geolocation":{
                "radius":radius * 1000.0,
                "latitude":latitude,
                "longitude":longitude,
                "unit":"m"
            }
        };


    },

    formatEventDate : function (dateString) {
        var date = new Date(dateString);
        var yyyy = date.getFullYear().toString();
        var mm = ("0" + (date.getMonth() + 1)).slice(-2)
        var dd  = ("0" + (date.getDate())).slice(-2);

        return yyyy+"-"+mm+"-"+dd;
    }
}
