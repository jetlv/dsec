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
OvernightArrival();

