// var p = require('./processor.js');

// p('./20160726163154/', new Function());
/// <reference path="include.d.ts" />

var cheerio = require('cheerio');
var fs = require('fs');


var coutries = ["Mainland China", "Hong Kong", "Taiwan", "Australia", "Brazil", "Canada", "France", "Germany", "India", "Indonesia", "Italy", "Japan", "Malaysia", "Netherlands", "New Zealand", "Philippines", "Portugal", "Republic of Korea", "Russian Federation", "Singapore", "South Africa", "Spain", "Switzerland", "Thailand", "United Kingdom", "United States of America", "Vietnam", "Others"];

/** compose Same-day arrival runobjs */
function sameDayArrival() {
    var $ = cheerio.load(fs.readFileSync('./cks/SameDayVisitor.html'));
    var ac = [];
    var cks = {};
    var init = 42;
    var offset = 0;
    var pre = '12,20,30,33,35,38,41,';
    var later = ',70,71,77,72,';

    $('table tr[onmouseover="this.bgColor=\'gold\'"]').each(function (index, element) {
        var ckId = $(this).find('td').eq(1).find('table tr td').eq(0).find('span input').attr('id');
        var ckobj = {};
        ckobj[ckId] = 'on';
        cks = Object.assign(cks, ckobj);
        if ((index !== 0) && ((index + 1) % 8 === 0)) {
            ac.push({ cks: cks, populateLog: pre + parseInt(init + offset) + later, country: coutries[offset] });
            cks = {};
            offset++;
        }
    });


    fs.writeFileSync('./cks/SameDayVisitor.json', JSON.stringify(ac));
}


/** compose Overnight arrival runbojs */
function OvernightArrival() {

    var $ = cheerio.load(fs.readFileSync('./cks/OvernightVisitor.html'));
    var ac = [];
    var cks = {};
    var init = 42;
    var offset = 0;
    var pre = '12,20,30,33,35,39,41,';
    var later = ',70,71,77,72,';
    $('table tr[onmouseover="this.bgColor=\'gold\'"]').each(function (index, element) {
        var ckId = $(this).find('td').eq(1).find('table tr td').eq(0).find('span input').attr('id');
        var ckobj = {};
        ckobj[ckId] = 'on';
        cks = Object.assign(cks, ckobj);
        if ((index !== 0) && ((index + 1) % 8 === 0)) {
            ac.push({ cks: cks, populateLog: pre + parseInt(init + offset) + later, country: coutries[offset] });
            cks = {};
            offset++;
        }
    });

    fs.writeFileSync('./cks/OvernightVisitor.json', JSON.stringify(ac));
}

/** compose Departures runobjs */
function departures() {

    var $ = cheerio.load(fs.readFileSync('./cks/Departures.html'));
    var ac = [];
    var cks = {};
    var init = 39;
    var offset = 0;
    //12,20,30,33,36,38,39,67,68,74,69,
    //12,20,30,33,36,38,40,67,68,74,69,
    var pre = '12,20,30,33,36,38,';
    var later = ',67,68,74,69,';
    $('table tr[onmouseover="this.bgColor=\'gold\'"]').each(function (index, element) {
        var ckId = $(this).find('td').eq(1).find('table tr td').eq(0).find('span input').attr('id');
        var ckobj = {};
        ckobj[ckId] = 'on';
        cks = Object.assign(cks, ckobj);
        if ((index !== 0) && ((index + 1) % 8 === 0)) {
            ac.push({ cks: cks, populateLog: pre + parseInt(init + offset) + later, country: coutries[offset] });
            cks = {};
            offset++;
        }
    });
    console.log(ac.length);
    fs.writeFileSync('./cks/Departures.json', JSON.stringify(ac));
}

chinaVisitor();
/** complse china visitor - total */
function chinaVisitor() {
    var cities = ["Guangdong", "Fujian", "Zhejiang", "Hunan", "Jiangsu", "Henan", "Sichuan", "Beijing", "Shangai", "Tianjin", "Chongqing", "Hubei", "Guangxi", "Jiangxi", "Liaoning", "Anhui", "Shandong", "Hebei", "Jilin"];
    var $ = cheerio.load(fs.readFileSync('./cks/ChinaVisitor_Total.html'));
    var ac = [];
    var cks = {};
    $('table tr[onmouseover="this.bgColor=\'gold\'"]').each(function (index, element) {
        var ckId = $(this).find('td').eq(1).find('table tr td').eq(0).find('span input').attr('id');
        var ckobj = {};
        ckobj[ckId] = 'on';
        cks = Object.assign(cks, ckobj);

    });
    /** to keep the same format between ivs and total */
    var totalObj = {};
    var ivsTotal = 'chkSelect_0/1503/13001/14001/14166/14167/60397/14168';
    totalObj[ivsTotal] = 'on';
    cks = Object.assign(cks, totalObj);
    ac.push({ cks: cks, populateLog: '12,20,30,33,35,37,43,', country: 'China' });
    fs.writeFileSync('./cks/ChinaVisitor_Total.json', JSON.stringify(ac));
}

/** complse china visitor - IVS  */
function chinaVisitorIVS() {
    var cities = ["Guangdong", "Fujian", "Zhejiang", "Hunan", "Jiangsu", "Henan", "Sichuan", "Beijing", "Shangai", "Tianjin", "Chongqing", "Hubei", "Guangxi", "Jiangxi", "Liaoning", "Anhui", "Shandong", "Hebei", "Jilin"];
    var $ = cheerio.load(fs.readFileSync('./cks/ChinaVisitor_IVS.html'));
    var ac = [];
    var cks = {};
    $('table tr[onmouseover="this.bgColor=\'gold\'"]').each(function (index, element) {
        var ckId = $(this).find('td').eq(1).find('table tr td').eq(0).find('span input').attr('id');
        var ckobj = {};
        ckobj[ckId] = 'on';
        cks = Object.assign(cks, ckobj);
    });
    var totalObj = {};
    var ivsTotal = 'chkSelect_0/1503/13001/14001/14166/14167/60397/14168';
    totalObj[ivsTotal] = 'on';
    cks = Object.assign(cks, totalObj);
    ac.push({ cks: cks, populateLog: '12,20,30,33,35,37,44,', country: 'China' });
    fs.writeFileSync('./cks/ChinaVisitor_IVS.json', JSON.stringify(ac));
}

/** compose los - finally will manually append indicator checkbox id */
function los() {
    var pops = ['12,20,30,34,35,', '12,20,30,34,36,', '12,20,30,34,37,'];
    var indicators = ['chkSCN_0/1503/13001/14001/14301/14302', 'chkSCN_0/1503/13001/14001/14301/14330', 'chkSCN_0/1503/13001/14001/14301/14358'];
    var htmls = ['./cks/Los_All.html', './cks/Los_Overnight.html', './cks/Los_SameDay.html'];
    var ac = [];
    htmls.forEach(function (html, index, element) {
        var cks = {};
        var $ = cheerio.load(fs.readFileSync(html));
        $('table tr[onmouseover="this.bgColor=\'gold\'"]').each(function (index, element) {
            var ckId = $(this).find('td').eq(1).find('table tr td').eq(0).find('span input').attr('id');
            var ckobj = {};
            ckobj[ckId] = 'on';
            cks = Object.assign(cks, ckobj);
        });
        var idc = {};
        idc[indicators[index]] = 'on';
        cks = Object.assign(cks, idc);
        ac.push({ cks: cks, populateLog: pops[index], country: 'no need', category: html.split('/')[2].split('.')[0] });
    });
    fs.writeFileSync('./cks/Los.json', JSON.stringify(ac));
}
