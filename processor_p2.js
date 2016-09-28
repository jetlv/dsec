/// <reference path="./include.d.ts" />

var fs = require('fs');
var xlsx = require('node-xlsx');
var async = require('async');
/**
 * Date extension
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

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

    async.waterfall([async.apply(compose_data_arrival), async.apply(compose_data_departures), async.apply(compose_data_china), async.apply(composeLos)], function (err, result) {
        console.log('All things done');
    });

    /** sheet - V_DATA_ARRIVALS*/
    function compose_data_arrival(callback) {
        /** obj for non-ivs */
        var nonIvsObj = {};

        /** Source */
        var sameDayOrigins = ["Same-Day Visitor_Hong Kong.xls", "Same-Day Visitor_Mainland China.xls", "Same-Day Visitor_Taiwan.xls", "Same-Day Visitor_Australia.xls", "Same-Day Visitor_Brazil.xls", "Same-Day Visitor_Canada.xls", "Same-Day Visitor_France.xls", "Same-Day Visitor_Germany.xls", "Same-Day Visitor_India.xls", "Same-Day Visitor_Indonesia.xls", "Same-Day Visitor_Italy.xls", "Same-Day Visitor_Japan.xls", "Same-Day Visitor_Malaysia.xls", "Same-Day Visitor_Netherlands.xls", "Same-Day Visitor_New Zealand.xls", "Same-Day Visitor_Philippines.xls", "Same-Day Visitor_Portugal.xls", "Same-Day Visitor_Republic of Korea.xls", "Same-Day Visitor_Russian Federation.xls", "Same-Day Visitor_Singapore.xls", "Same-Day Visitor_South Africa.xls", "Same-Day Visitor_Spain.xls", "Same-Day Visitor_Switzerland.xls", "Same-Day Visitor_Thailand.xls", "Same-Day Visitor_United Kingdom.xls", "Same-Day Visitor_United States of America.xls", "Same-Day Visitor_Vietnam.xls", "Same-Day Visitor_Others.xls"];

        var overnightOrigins = ["Overnight Visitor_Hong Kong.xls", "Overnight Visitor_Taiwan.xls", "Overnight Visitor_Mainland China.xls", "Overnight Visitor_Australia.xls", "Overnight Visitor_Brazil.xls", "Overnight Visitor_Canada.xls", "Overnight Visitor_France.xls", "Overnight Visitor_Germany.xls", "Overnight Visitor_Italy.xls", "Overnight Visitor_India.xls", "Overnight Visitor_Indonesia.xls", "Overnight Visitor_Japan.xls", "Overnight Visitor_New Zealand.xls", "Overnight Visitor_Malaysia.xls", "Overnight Visitor_Netherlands.xls", "Overnight Visitor_Philippines.xls", "Overnight Visitor_Republic of Korea.xls", "Overnight Visitor_Russian Federation.xls", "Overnight Visitor_Portugal.xls", "Overnight Visitor_Singapore.xls", "Overnight Visitor_South Africa.xls", "Overnight Visitor_Switzerland.xls", "Overnight Visitor_Spain.xls", "Overnight Visitor_Thailand.xls", "Overnight Visitor_United Kingdom.xls", "Overnight Visitor_United States of America.xls", "Overnight Visitor_Vietnam.xls", "Overnight Visitor_Others.xls"];

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
            // console.log(folder + file);
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
                    { ci: 4, mode_arr: 'SEA', entry: 'Inner Harbour' },
                    { ci: 6, mode_arr: 'SEA', entry: 'TFT' },
                    { ci: 8, mode_arr: 'LAND', entry: 'Gongbei' },
                    { ci: 10, mode_arr: 'LAND', entry: 'Cotai' },
                    { ci: 12, mode_arr: 'LAND', entry: 'Industrial Park' },
                    { ci: 14, mode_arr: 'AIR', entry: 'Airport' },
                    { ci: 16, mode_arr: 'AIR', entry: 'Heliport' },]

                // var chinaArrival = 0;
                maps.forEach(function (item, index, array) {
                    var row = [];
                    var entry = item.entry;
                    var mode = item.mode_arr;
                    var arrivals = line[item.ci];
                    /** for non-ivs */
                    if (residence == 'Mainland China') {
                        if (nonIvsObj[dt.Format('yyyyMMdd') + '_' + type] == undefined) {
                            nonIvsObj[dt.Format('yyyyMMdd') + '_' + type] = parseInt(arrivals);
                        } else {
                            if (arrivals > 0) {
                                nonIvsObj[dt.Format('yyyyMMdd') + '_' + type] = nonIvsObj[dt.Format('yyyyMMdd') + '_' + type] + parseInt(arrivals);
                                // if (dt.Format('yyyyMMdd') == '20150101') {
                                //     console.log(dt.Format('yyyyMMdd') + '_' + type + ' -> ' + arrivals);
                                // }
                            }
                        }
                    }
                    row.push(dt, type, entry, mode, residence, arrivals);
                    rows.push(row);
                });
                // console.log(chinaArrival);
                // nonIvsObj[dt.Format('yyyyMMdd') + '_' + type] = chinaArrival;
            });

        });

        callback(null, { sheet: [V_DATA_ARRIVALS], chinaTotal: nonIvsObj });
    }

    /** sheet - V_DATA_Departures */
    function compose_data_departures(context, callback) {
        var departureOrigins = ["Departures Visitor_Hong Kong.xls", "Departures Visitor_Australia.xls", "Departures Visitor_Mainland China.xls", "Departures Visitor_Taiwan.xls", "Departures Visitor_Brazil.xls", "Departures Visitor_France.xls", "Departures Visitor_Canada.xls", "Departures Visitor_Germany.xls", "Departures Visitor_India.xls", "Departures Visitor_Italy.xls", "Departures Visitor_Indonesia.xls", "Departures Visitor_Japan.xls", "Departures Visitor_Netherlands.xls", "Departures Visitor_Malaysia.xls", "Departures Visitor_New Zealand.xls", "Departures Visitor_Philippines.xls", "Departures Visitor_Portugal.xls", "Departures Visitor_Republic of Korea.xls", "Departures Visitor_Russian Federation.xls", "Departures Visitor_Singapore.xls", "Departures Visitor_South Africa.xls", "Departures Visitor_Spain.xls", "Departures Visitor_Switzerland.xls", "Departures Visitor_Thailand.xls", "Departures Visitor_United Kingdom.xls", "Departures Visitor_United States of America.xls", "Departures Visitor_Vietnam.xls", "Departures Visitor_Others.xls"];

        /** final sheets define*/
        var V_DATA_DEPARTURES = { name: 'V_DATA_DEPARTURES', data: [] };
        var columns = ["Date", "Entry", "MODE_ARR", "Residence", "Departures"];
        var rows = V_DATA_DEPARTURES.data;
        rows.push(columns);

        /** process all files */
        departureOrigins.forEach(function (file, index, array) {
            /** define conutry */
            var residence = file.split('_')[1].split('.')[0];

            /** read sheet */
            var departureSheet = xlsx.parse(fs.readFileSync(folder + file))[1].data;
            var currentYear = '';
            departureSheet.forEach(function (line, index, array) {
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
                    { ci: 4, mode_arr: 'SEA', entry: 'Inner Harbour' },
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
                    var departures = line[item.ci];
                    row.push(dt, entry, mode, residence, departures);
                    rows.push(row);
                });
            });


        });
        context.sheet.push(V_DATA_DEPARTURES);
        callback(null, context);
    }

    /** sheet - V_DATA_CHINA */
    function compose_data_china(context, callback) {

        // console.log(JSON.stringify(context.chinaTotal));

        /** cities define */
        var cities = ["Total", "Guangdong", "Fujian", "Zhejiang", "Hunan", "Jiangsu", "Henan", "Sichuan", "Beijing", "Shangai", "Tianjin", "Chongqing", "Hubei", "Guangxi", "Jiangxi", "Liaoning", "Anhui", "Shanxi", "Shandong", "Helongjiang", "Hebei", "Shaanxi", "Inner Mongolia", "Jilin"];
        var totalFile = folder + 'ChinaVisitor_Total.xls';
        var ivsFile = folder + 'ChinaVisitor_IVS.xls';

        /** final sheets define*/
        var V_DATA_CHINA = { name: 'V_DATA_CHINA', data: [] };
        var columns = ["Date", "Category", "Province", "Arrivals"];
        var rows = V_DATA_CHINA.data;
        rows.push(columns);

        var totalSheet = xlsx.parse(fs.readFileSync(totalFile))[1].data;
        var ivsSheet = xlsx.parse(fs.readFileSync(ivsFile))[1].data;

        var currentYear = '';
        var existingCities;
        ivsSheet.forEach(function (line, index, array) {
            if (index === 0) {
                return;
            }
            if (index === 8) {
                existingCities = line;
                existingCities.push("Total");
                // console.log(existingCities.length + ' <- This is existing cities length');
            }
            if ((!line[1]) || (line[1] && (!_m(line[1])))) {
                return;
            }
            if (line[0] && line[0].match(/\d+/)) {
                currentYear = line[0];
            }
            /** temporarily using Guangdong as identifier  */

            var dt = new Date(Date.UTC(currentYear, parseInt(_m(line[1])) - 1, 1, 0, 0, 0, 0));

            /** Define ivs global total per row  */
            var cTotal = line[2];
            // console.log(cTotal);
            var subTotal = 0;

            /** define non-ivs total - china total not including "others"*/
            var non_ivsTotal = 0;

            /** get IVS rows, per city per line */
            var iCategory = "IVS";
            var nCatrgory = "Non-IVS";
            /** define offset - process non existing data */
            var offset = 0;
            cities.forEach(function (city, cityIndex, array) {
                var notExisting = false;;
                if (cityIndex == 0) {
                    return;
                }
                if (existingCities.indexOf(city) === -1) {
                    // console.log(city + ' is not existing');
                    offset += 2;
                    notExisting = true;
                }
                var row = [];
                var nRow = [];
                var province = city;
                var arrivals = notExisting ? 0 : line[2 * (cityIndex + 1) - offset];
                var totalArrivals = totalSheet[index][2 * (cityIndex + 1)];
                if (cityIndex > 9) {
                    arrivals = notExisting ? 0 : line[2 * (cityIndex + 1) + 1 - offset];
                    totalArrivals = totalSheet[index][2 * (cityIndex + 1) + 1];
                }
                /** plus provinces for IVS */
                subTotal += parseInt(arrivals);

                /** china total plus  - both ivs and non-ivs*/
                non_ivsTotal += (parseInt(totalArrivals) - parseInt(arrivals));

                row.push(dt, iCategory, province, arrivals);
                nRow.push(dt, nCatrgory, province, parseInt(totalArrivals) - parseInt(arrivals));
                rows.push(row);
                rows.push(nRow);
            });
            /** caculate ivs 'Other' for current line */
            var oArrivals = cTotal - subTotal;
            // console.log('subTotal - ' + subTotal);
            var oRow = [dt, iCategory, "Other", oArrivals];
            rows.push(oRow);

            /** caculate non-ivs 'Other' for current line */
            var chinaTotal = parseInt(context.chinaTotal[dt.Format('yyyyMMdd') + '_SAME-DAY']) + parseInt(context.chinaTotal[dt.Format('yyyyMMdd') + '_OVERNIGHT']);
            // console.log('Same-Day - ' + parseInt(context.chinaTotal[dt.Format('yyyyMMdd') + '_SAME-DAY']));
            // console.log('OVERNIGHT - ' + parseInt(context.chinaTotal[dt.Format('yyyyMMdd') + '_OVERNIGHT']));
            // console.log(chinaTotal);
            var otherNonIvsArrivals = chinaTotal - cTotal - non_ivsTotal;
            var nonIvsOtherRow = [dt, nCatrgory, "Other", otherNonIvsArrivals];
            rows.push(nonIvsOtherRow);
        });

        context.sheet.push(V_DATA_CHINA);
        callback(null, context);
    }

    /** sheet V_DATA_LOS */
    function composeLos(context, callback) {
        var allFile = folder + 'Los_All.xls';
        var overnight = folder + 'Los_Overnight.xls';
        var sameDay = folder + 'Los_SameDay.xls'

        /** final sheets define*/
        var V_DATA_LOS = { name: 'V_DATA_LOS', data: [] };
        var columns = ["Date", "Category", "Residence", "LOS"];
        var rows = V_DATA_LOS.data;
        rows.push(columns);

        var allSheet = xlsx.parse(fs.readFileSync(allFile))[1].data;
        var overnightSheet = xlsx.parse(fs.readFileSync(overnight))[1].data;
        var sameDaySheet = xlsx.parse(fs.readFileSync(sameDay))[1].data;

        var pushSingleSheet = function (sheet, category) {
            var currentYear = '';
            sheet.forEach(function (line, index, array) {
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
                //>9
                var coutries = ["Average", "Mainland China", "Hong Kong", "Taiwan", "Australia", "Brazil", "Canada", "France", "Germany", "India", "Indonesia", "Italy", "Japan", "Malaysia", "Netherlands", "New Zealand", "Philippines", "Portugal", "Republic of Korea", "Russian Federation", "Singapore", "South Africa", "Spain", "Switzerland", "Thailand", "United Kingdom", "United States of America", "Vietnam"];

                coutries.forEach(function (country, countryIndex, array) {
                    var row = [];
                    var los = line[2 * (countryIndex + 1)];
                    if (countryIndex > 9) {
                        los = line[2 * (countryIndex + 1) + 1];
                    }
                    row.push(dt, category, country, los);
                    rows.push(row);
                });
            });
        }

        pushSingleSheet(allSheet, 'Total');
        pushSingleSheet(overnightSheet, 'Overnight');
        pushSingleSheet(sameDaySheet, 'Same-Day');

        context.sheet.push(V_DATA_LOS);

        fs.writeFile(folder + '/' + 'DSEC Visitation Data.xlsx', xlsx.build(context.sheet), function (err) {
            if (err) console.log(err);
            callback(null);
        });
    }
}