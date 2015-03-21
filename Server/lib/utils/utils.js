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
    },

    formatRateKey : function (rateKey) {
        return rateKey.replace("#","*");
    },

    unformatRateKey : function (rateKey) {
        return rateKey.replace("*","#")
    },


    buildEvent : function(ebevent) {

        return {
            'id': ebevent.id,
            'category':ebevent.category_id,
            'currency':ebevent.currency,
            'price': 100,
            'description': (ebevent.description === null) ? "No Description" : ebevent.description.text,
            'name': ebevent.name.text,
            'logo': ebevent.logo_url,
            'start': ebevent.start.local,
            'end': ebevent.end.local,
            'latitude':ebevent.venue.latitude,
            'longitude':ebevent.venue.longitude,
            'venue':ebevent.venue.name
        }
    },

    buildHotel : function(hbhotel, fromDate, toDate) {
        return {
            name:hbhotel.name,
            destination:hbhotel.destination,
            from: fromDate,
            to: toDate,
            latitude:hbhotel.latitude,
            longitude:hbhotel.longitude,
            room:hbhotel.rooms[0].name,
            price:hbhotel.rooms[0].prices[0].net,
            currency:hbhotel.rooms[0].prices[0].currency,
            board:hbhotel.rooms[0].prices[0].boardCode,
            reservationKey: this.formatRateKey(hbhotel.rooms[0].prices[0].rateKey)
        }
    },

    buildInvitation :function (invitationId, owner, eventId, hotelId, invites, pendingInvites) {

        //Calculate the confirmedInvites, by looking
        var confirmedInvites = new Array();
        if (typeof pendingInvites != "undefined") {
            for (var i in invites) {
                invited = invites[i];
                if (pendingInvites.indexOf(invited) == -1) {
                    confirmedInvites.push(invited);
                }
            }
        } else {
            confirmedInvites = invites;
        }

        return  {
            invitationId: invitationId,
            userId : owner,
            eventId: eventId,
            rateKey: hotelId,
            confirmedInvites: confirmedInvites,
            pendingInvites: pendingInvites,
            status: (typeof pendingInvites === "undefined" || pendingInvites.length === 0) ? "Confirmed":"Pending"
        }
    }


}
