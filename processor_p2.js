/// <reference path="./include.d.ts" />

var fs = require('fs');
var xlsx = require('node-xlsx');

module.exports = function (folder, callback) {

    /** define the months mapping */
    const M = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };

    /** function to match the mos */
    function _m(str) {
        for (var mos in M) {
            if (str.match(mos)) {
                return M[str.match(mos)[0]];
            }
        }
        return null;
    }

    /** sheet - V_DATA_ARRIVALS*/
    function compose_data_arrival() {
        /** Source */
        var sameDayOrigins = ["Same-Day Visitor_Hong Kong.xls","Same-Day Visitor_Mainland China.xls","Same-Day Visitor_Taiwan.xls","Same-Day Visitor_Australia.xls","Same-Day Visitor_Brazil.xls","Same-Day Visitor_Canada.xls","Same-Day Visitor_France.xls","Same-Day Visitor_Germany.xls","Same-Day Visitor_India.xls","Same-Day Visitor_Indonesia.xls","Same-Day Visitor_Italy.xls","Same-Day Visitor_Japan.xls","Same-Day Visitor_Malaysia.xls","Same-Day Visitor_Netherlands.xls","Same-Day Visitor_New Zealand.xls","Same-Day Visitor_Philippines.xls","Same-Day Visitor_Portugal.xls","Same-Day Visitor_Republic of Korea.xls","Same-Day Visitor_Russian Federation.xls","Same-Day Visitor_Singapore.xls","Same-Day Visitor_South Africa.xls","Same-Day Visitor_Spain.xls","Same-Day Visitor_Switzerland.xls","Same-Day Visitor_Thailand.xls","Same-Day Visitor_United Kingdom.xls","Same-Day Visitor_United States of America.xls","Same-Day Visitor_Vietnam.xls","Same-Day Visitor_Others.xls"];

        /** define entry map. e.g - OuterHarbour : MFT */
        var entry_map = {
            'Outer Harbour': 'MFT'
        }

        /** final sheets define*/
        var V_DATA_ARRIVALS = { name: 'V_DATA_ARRIVALS', data: [] };
        var columns = ["Date", "Type", "Entry", "MODE_ARR", "Residence", "Arrivals"];
        var rows = V_DATA_ARRIVALS.data;
        rows.push(columns);

        /** read original sheets */
        var overNightVisitorFile = 'Overnight Visitors.xls';
        var sameDayVisotorsFile = 'Same-Day Visitors.xls';
        var overNightVisitorSheet = xlsx.parse(fs.readFileSync(overNightVisitorFile))[1].data;
        var sameDayVisotorSheet = xlsx.parse(fs.readFileSync(sameDayVisotorsFile))[1].data;

        /** define current year */
        
        overNightVisitorSheet.forEach(function (line, index, array) {
            if (index === 0) {
                return;
            }
            if ((!line[1]) || (line[1] && (!_m(line[1])))) {
                return;
            }
            if (line[0] && line[0].match(/\d+/)) {
                currentYear = line[0];
            }
        });
    }
}