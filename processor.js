/// <reference path="./include.d.ts" />


module.exports = function (folder, callback) {

    /** CONSTANT  */
    const FILE_OGBA = 'H_Inventory.xls';
    const FILE_FIVESTAR = 'H_Guests_5Star.xls';
    const FILE_FOUSTAR = 'H_Guests_4Star.xls';
    const FILE_THREESTAR = 'H_Guests_3Star.xls';
    const FILE_TWOSTAR = 'H_Guests_2Star.xls';
    const FILE_GUESTSHOUSE = 'H_Guests_Guesthouse.xls';
    const FILE_NOGTA = 'H_Guests_TA.xls';
    const ALFILE_FIVESTAR = 'H_LOS_5Star.xls';
    const ALFILE_FOUSTAR = 'H_LOS_4Star.xls';
    const ALFILE_THREESTAR = 'H_LOS_3Star.xls';
    const ALFILE_TWOSTAR = 'H_LOS_2Star.xls';
    const ALFILE_GUESTSHOUSE = 'H_LOS_Guesthouse.xls';

    /** define the months mapping */
    const M = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };

    /** function to match the mos */
    function _m(str) {
        for(var mos in M) {
            if(str.match(mos)) {
                return M[str.match(mos)[0]];
            }
        }
        return null;
    } 


    var fs = require('fs');
    var ExcelReader = require('./ExcelReader');
    // var ExcelWriter = require('./ExcelWriter');
    var xlsx = require('node-xlsx');

    // var folder = './20160726155730/';

    /** OGBA - DATA_INVENTORY*/

    var ogbaColumn = ["Date", "H_CAT", "Properties", "Rooms", "Bedplaces", "Occupancy"];
    var ogbaReader = new ExcelReader(folder + FILE_OGBA);
    // var ogbaWriter = new ExcelWriter('result.xlsx', ogbaColumn, 'DATA_INVENTORY');
    var ogbaWriter = { name: 'DATA_INVENTORY', data: [] };
    ogbaWriter.data.push(ogbaColumn);

    /** First sheet is useless for formatting */
    var ogbaSheet = ogbaReader.readAll()[1];

    ogbaCurrentYear = '';
    ogbaSheet.data.forEach(function (line, index, array) {
        // console.log(line);
        if (index === 0) {
            return;
        }
        if ((!line[1]) || (line[1] && (!_m(line[1])))) {
            return;
        }
        if (line[0] && line[0].match(/\d+/)) {
            ogbaCurrentYear = line[0];
        }

        var dt = new Date(Date.UTC(ogbaCurrentYear, parseInt(_m(line[1])) -1 , 1, 0, 0, 0, 0));

        /** FiveStar */
        var fiveStarProperties = line[2];
        var fiveStarRooms = line[12];
        var fiveStarBedPlaces = line[23];
        var fiveStarOccupancy = line[33];
        var fiveStarRow = [];
        fiveStarRow.push(dt);
        fiveStarRow.push('5-star');
        fiveStarRow.push(fiveStarProperties);
        fiveStarRow.push(fiveStarRooms);
        fiveStarRow.push(fiveStarBedPlaces);
        fiveStarRow.push(fiveStarOccupancy);
        ogbaWriter.data.push(fiveStarRow);

        /** FourStar */
        var fourStarProperties = line[4];
        var fourStarRooms = line[14];
        var fourStarBedPlaces = line[25];
        var fourStarOccupancy = line[35];
        var fourStarRow = [];
        fourStarRow.push(dt);
        fourStarRow.push('4-star');
        fourStarRow.push(fourStarProperties);
        fourStarRow.push(fourStarRooms);
        fourStarRow.push(fourStarBedPlaces);
        fourStarRow.push(fourStarOccupancy);
        ogbaWriter.data.push(fourStarRow);

        /** Three Star */
        var threeStarProperties = line[6];
        var threeStarRooms = line[16];
        var threeStarBedPlaces = line[27];
        var threeStarOccupancy = line[37];
        var threeStarRow = [];
        threeStarRow.push(dt);
        threeStarRow.push('3-star');
        threeStarRow.push(threeStarProperties);
        threeStarRow.push(threeStarRooms);
        threeStarRow.push(threeStarBedPlaces);
        threeStarRow.push(threeStarOccupancy);
        ogbaWriter.data.push(threeStarRow);

        /** two Star */
        var twoStarProperties = line[8];
        var twoStarRooms = line[18];
        var twoStarBedPlaces = line[29];
        var twoStarOccupancy = line[39];
        var twoStarRow = [];
        twoStarRow.push(dt);
        twoStarRow.push('2-star');
        twoStarRow.push(twoStarProperties);
        twoStarRow.push(twoStarRooms);
        twoStarRow.push(twoStarBedPlaces);
        twoStarRow.push(twoStarOccupancy);
        ogbaWriter.data.push(twoStarRow);

        /** guest house */
        var guestProperties = line[10];
        var guestRooms = line[20];
        var guestBedPlaces = line[31];
        var guestOccupancy = line[41];
        var guestRow = [];
        guestRow.push(dt);
        guestRow.push('GuestHouse');
        guestRow.push(guestProperties);
        guestRow.push(guestRooms);
        guestRow.push(guestBedPlaces);
        guestRow.push(guestOccupancy);
        ogbaWriter.data.push(guestRow);
    });


    /** OGBA - DATA_INVENTORY END############################################################################ */

    /** Guests - DATA_GUESTS */
    var guestColumn = ["Date", "H_CAT", "Residence", "Guests", "LOS"];
    var fiveReader = new ExcelReader(folder + FILE_FIVESTAR);
    var fourReader = new ExcelReader(folder + FILE_FOUSTAR);
    var threeReader = new ExcelReader(folder + FILE_THREESTAR);
    var twoReader = new ExcelReader(folder + FILE_TWOSTAR);
    var guestReader = new ExcelReader(folder + FILE_GUESTSHOUSE);
    var alFiveReader = new ExcelReader(folder + ALFILE_FIVESTAR);
    var alFourReader = new ExcelReader(folder + ALFILE_FOUSTAR);
    var alThreeReader = new ExcelReader(folder + ALFILE_THREESTAR);
    var alTwoReader = new ExcelReader(folder + ALFILE_TWOSTAR);
    var alGuestReader = new ExcelReader(folder + ALFILE_GUESTSHOUSE);

    // var guestWriter = new ExcelWriter('result.xlsx', guestColumn, 'DATA_GUEST');
    var guestWriter = { name: 'DATA_GUEST', data: [] };
    guestWriter.data.push(guestColumn);

    var fiveSheet = fiveReader.readAll()[1];
    var fourSheet = fourReader.readAll()[1];
    var threeSheet = threeReader.readAll()[1];
    var twoSheet = twoReader.readAll()[1];
    var guestSheet = guestReader.readAll()[1];

    var alFiveSheet = alFiveReader.readAll()[1];
    var alFourSheet = alFourReader.readAll()[1];
    var alThreeSheet = alThreeReader.readAll()[1];
    var alTwoSheet = alTwoReader.readAll()[1];
    var alGuestSheet = alGuestReader.readAll()[1];

    /** define column index */
    var C = { "Mainland China": 2, "Hong Kong": 4, "Macao": 6, "Taiwan": 8, "Japan": 10, "India": 12, "Indonesia": 14, "Malaysia": 16, "Philippines": 18, "Republic of Korea": 20, "Singapore": 23, "Thailand": 25, "Other Asian Countries": 27, "Canada": 29, "United States of America": 31, "France": 33, "Germany": 35, "Italy": 37, "Portugal": 39, "United Kingdom": 41, "Other European Countries": 43, "Australia": 45, "New Zealand": 47 };


    var guestsYear = '';
    /** loop based on five star due to the similiar structure of the sheets */
    fiveSheet.data.forEach(function (line, index, array) {
        if (index === 0) {
            return;
        }
        if ((!line[1]) || (line[1] && (!_m(line[1])))) {
            return;
        }
        if (line[0] && line[0].match(/\d+/)) {
            guestsYear = line[0];
        }
        var dt = new Date(Date.UTC(guestsYear, parseInt(_m(line[1]))-1, 1, 0, 0, 0, 0));
        /** 5 star extracted row */
        // fs.appendFileSync('5starloc.txt', JSON.stringify(alFiveSheet.data[index]) + '\r\n');
        for (var country in C) {
            var residence = country;
            var guests = line[C[country]];
            var loc = alFiveSheet.data[index][C[country]];
            var row = [];
            row.push(dt);
            row.push('5-star');
            row.push(residence);
            row.push(guests);
            row.push(loc);
            guestWriter.data.push(row);
        }
    });

    fourSheet.data.forEach(function (line, index, array) {
        if (index === 0) {
            return;
        }
        if ((!line[1]) || (line[1] && (!_m(line[1])))) {
            return;
        }
        if (line[0] && line[0].match(/\d+/)) {
            guestsYear = line[0];
        }

        var dt = new Date(Date.UTC(guestsYear, parseInt(_m(line[1]))-1, 1, 0, 0, 0, 0));
        /** 4 star extracted row */
        for (var country in C) {
            var residence = country;
            var guests = line[C[country]];
            var loc = alFourSheet.data[index][C[country]];
            var row = [];
            row.push(dt);
            row.push('4-star');
            row.push(residence);
            row.push(guests);
            row.push(loc);
            guestWriter.data.push(row);
        }
    });

    threeSheet.data.forEach(function (line, index, array) {
        if (index === 0) {
            return;
        }
        if ((!line[1]) || (line[1] && (!_m(line[1])))) {
            return;
        }
        if (line[0] && line[0].match(/\d+/)) {
            guestsYear = line[0];
        }

        var dt = new Date(Date.UTC(guestsYear, parseInt(_m(line[1]))-1, 1, 0, 0, 0, 0));
        /** 3 star extracted row */
        for (var country in C) {
            var residence = country;
            var guests = line[C[country]];
            var loc = alThreeSheet.data[index][C[country]];
            var row = [];
            row.push(dt);
            row.push('3-star');
            row.push(residence);
            row.push(guests);
            row.push(loc);
            guestWriter.data.push(row);
        }
    });

    twoSheet.data.forEach(function (line, index, array) {
        if (index === 0) {
            return;
        }
        if ((!line[1]) || (line[1] && (!_m(line[1])))) {
            return;
        }
        if (line[0] && line[0].match(/\d+/)) {
            guestsYear = line[0];
        }

        var dt = new Date(Date.UTC(guestsYear, parseInt(_m(line[1]))-1, 1, 0, 0, 0, 0));
        /** 2 star extracted row */
        for (var country in C) {
            var residence = country;
            var guests = line[C[country]];
            var loc = alTwoSheet.data[index][C[country]];
            var row = [];
            row.push(dt);
            row.push('2-star');
            row.push(residence);
            row.push(guests);
            row.push(loc);
            guestWriter.data.push(row);
        }
    });

    guestSheet.data.forEach(function (line, index, array) {
        if (index === 0) {
            return;
        }
        if ((!line[1]) || (line[1] && (!_m(line[1])))) {
            return;
        }
        if (line[0] && line[0].match(/\d+/)) {
            guestsYear = line[0];
        }

        var dt = new Date(Date.UTC(guestsYear, parseInt(_m(line[1]))-1, 1, 0, 0, 0, 0));
        /** 2 star extracted row */
        for (var country in C) {
            var residence = country;
            var guests = line[C[country]];
            var loc = alGuestSheet.data[index][C[country]];
            var row = [];
            row.push(dt);
            row.push('GuestHouses');
            row.push(residence);
            row.push(guests);
            row.push(loc);
            guestWriter.data.push(row);
        }
    });

    /** TA - DATA_GUESTS_TA */
    var taColumns = ["Date", "H_CAT", "Guests_TA"];
    var taReader = new ExcelReader(folder + '/' + FILE_NOGTA);
    var taSheets = taReader.readAll()[1];

    var taWriter = { name: 'DATA_GUESTS_TA', data: [] };
    taWriter.data.push(taColumns);

    var taYear = '';

    taSheets.data.forEach(function (line, index, array) {
        if (index === 0) {
            return;
        }
        if ((!line[1]) || (line[1] && (!_m(line[1])))) {
            return;
        }
        if (line[0] && line[0].match(/\d+/)) {
            taYear = line[0];
        }

        // var dt = new Date(_m(line[1]) + '/2/' + taYear);
        var dt = new Date(Date.UTC(taYear, parseInt(_m(line[1]))-1, 1, 0, 0, 0, 0));
        var fiveStar_taNum = line[2];
        var tafiveStar_row = [];
        tafiveStar_row.push(dt);
        tafiveStar_row.push('5-star');
        tafiveStar_row.push(fiveStar_taNum);
        taWriter.data.push(tafiveStar_row);

        var fourStar_taNum = line[4];
        var tafourStar_row = [];
        tafourStar_row.push(dt);
        tafourStar_row.push('4-star');
        tafourStar_row.push(fourStar_taNum);
        taWriter.data.push(tafourStar_row);

        var threeStar_taNum = line[6];
        var tathreeStar_row = [];
        tathreeStar_row.push(dt);
        tathreeStar_row.push('3-star');
        tathreeStar_row.push(threeStar_taNum);
        taWriter.data.push(tathreeStar_row);

        var twoStar_taNum = line[8];
        var tatwoStar_row = [];
        tatwoStar_row.push(dt);
        tatwoStar_row.push('2-star');
        tatwoStar_row.push(twoStar_taNum);
        taWriter.data.push(tatwoStar_row);

        var guestHouse_taNum = line[10];
        var taguestHouse_row = [];
        taguestHouse_row.push(dt);
        taguestHouse_row.push('GuestHouses');
        taguestHouse_row.push(guestHouse_taNum);
        taWriter.data.push(taguestHouse_row);

    });


    fs.writeFile(folder + '/' + 'result.xlsx', xlsx.build([ogbaWriter, guestWriter, taWriter]), function (err) {
        if (err) console.log(err);
        callback();
    });
}