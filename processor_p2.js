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
    compose_data_arrival();
    /** sheet - V_DATA_ARRIVALS*/
    function compose_data_arrival() {
        /** Source */
        var sameDayOrigins = ["Same-Day Visitor_Hong Kong.xls", "Same-Day Visitor_Mainland China.xls", "Same-Day Visitor_Taiwan.xls", "Same-Day Visitor_Australia.xls", "Same-Day Visitor_Brazil.xls", "Same-Day Visitor_Canada.xls", "Same-Day Visitor_France.xls", "Same-Day Visitor_Germany.xls", "Same-Day Visitor_India.xls", "Same-Day Visitor_Indonesia.xls", "Same-Day Visitor_Italy.xls", "Same-Day Visitor_Japan.xls", "Same-Day Visitor_Malaysia.xls", "Same-Day Visitor_Netherlands.xls", "Same-Day Visitor_New Zealand.xls", "Same-Day Visitor_Philippines.xls", "Same-Day Visitor_Portugal.xls", "Same-Day Visitor_Republic of Korea.xls", "Same-Day Visitor_Russian Federation.xls", "Same-Day Visitor_Singapore.xls", "Same-Day Visitor_South Africa.xls", "Same-Day Visitor_Spain.xls", "Same-Day Visitor_Switzerland.xls", "Same-Day Visitor_Thailand.xls", "Same-Day Visitor_United Kingdom.xls", "Same-Day Visitor_United States of America.xls", "Same-Day Visitor_Vietnam.xls", "Same-Day Visitor_Others.xls"];

        var overnightOrigins = ["Overnight Visitor_Hong Kong.xls", "Overnight Visitor_Taiwan.xls", "Overnight Visitor_Mainland China.xls", "Overnight Visitor_Australia.xls", "Overnight Visitor_Brazil.xls", "Overnight Visitor_Canada.xls", "Overnight Visitor_France.xls", "Overnight Visitor_Germany.xls", "Overnight Visitor_Italy.xls", "Overnight Visitor_India.xls", "Overnight Visitor_Indonesia.xls", "Overnight Visitor_Japan.xls", "Overnight Visitor_New Zealand.xls", "Overnight Visitor_Malaysia.xls", "Overnight Visitor_Netherlands.xls", "Overnight Visitor_Philippines.xls", "Overnight Visitor_Republic of Korea.xls", "Overnight Visitor_Russian Federation.xls", "Overnight Visitor_Portugal.xls", "Overnight Visitor_Singapore.xls","Overnight Visitor_South Africa.xls", "Overnight Visitor_Switzerland.xls", "Overnight Visitor_Spain.xls", "Overnight Visitor_Thailand.xls", "Overnight Visitor_United Kingdom.xls", "Overnight Visitor_United States of America.xls", "Overnight Visitor_Vietnam.xls", "Overnight Visitor_Others.xls"];

        /** try process together */
        var allArrivals = sameDayOrigins.concat(overnightOrigins);

        /** define entry map. e.g - OuterHarbour : MFT - So far this is unuseful*/
        var entry_map = {
            'Outer Harbour': 'MFT',
            'Inner Harboura': 'Inner Harboura',
            'Provisional Ferry Terminal in Taipa': 'TFT',
            'Checkpoint of the Border Gate': 'Gongbei',
            'Checkpoint of Cotai': 'Cotai',
            'Checkpoint of Trans-border Industrial Park': 'Industrial Park',
            'Airport': 'Airport'
        }

        /** final sheets define*/
        var V_DATA_ARRIVALS = { name: 'V_DATA_ARRIVALS', data: [] };
        var columns = ["Date", "Type", "Entry", "MODE_ARR", "Residence", "Arrivals"];
        var rows = V_DATA_ARRIVALS.data;
        rows.push(columns);

        /** process all files */
        allArrivals.forEach(function (file, index, array) {
            /** define conutry */
            var residence = file.split('_')[1].split('.')[0];
            /** judge file name to decide type */
            var type = 'unknown';
            if (file.indexOf("Same-Day") !== -1) {
                type = 'SAME-DAY';
            } else if (file.indexOf("Overnight") !== -1) {
                type = 'OVERNIGHT';
            }
            /** read sheet */
            console.log(folder + file);
            var VisotorSheet = xlsx.parse(fs.readFileSync(folder + file))[1].data;
            var currentYear = '';
            VisotorSheet.forEach(function (line, index, array) {
                if (index === 0) {
                    return;
                }
                if ((!line[1]) || (line[1] && (!_m(line[1])))) {
                    return;
                }
                if (line[0] && line[0].match(/\d+/)) {
                    currentYear = line[0];
                }
                var dt = new Date(Date.UTC(currentYear, parseInt(_m(line[1])) - 1, 1, 0, 0, 0, 0));

                /** define column index which has data */
                var maps = [{ ci: 2, mode_arr: 'SEA', entry: 'MFT' },
                    { ci: 4, mode_arr: 'SEA', entry: 'Inner Harboura' },
                    { ci: 6, mode_arr: 'SEA', entry: 'TFT' },
                    { ci: 8, mode_arr: 'LAND', entry: 'Gongbei' },
                    { ci: 10, mode_arr: 'LAND', entry: 'Cotai' },
                    { ci: 12, mode_arr: 'LAND', entry: 'Industrial Park' },
                    { ci: 14, mode_arr: 'AIR', entry: 'Airport' },
                    { ci: 16, mode_arr: 'AIR', entry: 'Heliport' },]

                maps.forEach(function (item, index, array) {
                    var row = [];
                    var entry = item.entry;
                    var mode = item.mode_arr;
                    var arrivals = line[item.ci];
                    row.push(dt, type, entry, mode, residence, arrivals);
                    rows.push(row);
                });
            });
            fs.writeFile(folder + '/' + 'result.xlsx', xlsx.build([V_DATA_ARRIVALS]), function (err) {
                if (err) console.log(err);
                // callback();
            });

        });



    }
}