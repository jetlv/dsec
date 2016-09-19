/// <reference path="./include.d.ts" />

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
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


/** compose cookie */
var __getSessions = function (resp) {
    var cookies = [];
    var fullArr = resp.headers['set-cookie'];
    for (var i in fullArr) {
        cookies.push(fullArr[i].split(';')[0]);
    }

    return cookies.join("; ");
}


/**Same day arrival visitors */
var runObjs = JSON.parse(fs.readFileSync('./cks/SameDayVisitor.json').toString());

var folder = new Date().Format('yyyyMMddhhmmss') + '/';
fs.mkdirSync(folder);
async.mapLimit(runObjs, 2, function (runObj, callback) {
    var filePath = folder + 'Same-Day Visitor_' + runObj.country + '.xls'
    performOnce(filePath, runObj, callback);
}, function (err) {

});

function performOnce(filePath, runObj, callback) {

    /** parameter extraction */
    var cks = runObj.cks;
    var populateLog = runObj.populateLog;


    /** common */
    var regularHeaders = [
        {
            "name": "Accept",
            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        },
        {
            "name": "Accept-Encoding",
            "value": "gzip, deflate"
        },
        {
            "name": "Host",
            "value": "www.dsec.gov.mo"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
        }
    ]
    var lang = { lng: 'en-US' };
    var url = 'http://www.dsec.gov.mo/TimeSeriesDatabase.aspx?lang=en-US';

    /** start */
    var event_start = { __EVENTTARGET: 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$btnStart' };
    var form_start = event_start;


    /** after checking */
    var expanded = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_PopulateLog: populateLog };
    var expanded_state = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_ExpandState: 'eccccccccccceccccccceccccccccceccceeccnnnnnnnnnnnnnnnnnnnnnnnnnnn' };
    var selected_node = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_SelectedNode: '' };
    var indicator = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtSearchIndicator: '' };
    var dummy = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$HiddenDummy: '' };
    var event_checking = { __EVENTTARGET: 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$StartNavigationTemplateContainerID$StartNextLinkButton' };
    var eventarg_beforeChecking = { __EVENTARGUMENT: '' };
    var hidden = { HiddenFieldDocumentCulture: 'en-US' };
    var form_beforeChecking = Object.assign(cks, event_checking, expanded, expanded_state, hidden, selected_node, indicator, dummy, eventarg_beforeChecking);

    /** before configuration  */
    var titleKey = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtCustomizedReportTitle: 'Name' };
    var formatKey = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadComboBoxFormat_Input: 'Table' };
    var formatKey_clientState = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadComboBoxFormat_ClientState: { "logEntries": [], "value": "REPORT", "text": "Table", "enabled": true } };
    var paperSize = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadComboBoxPaperSize_Input: 'A4' }
    var paperSize_clientState = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadComboBoxPaperSize_ClientState: { "logEntries": [], "value": "1", "text": "A4", "enabled": true } };
    var orientation = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadComboBoxPaperOrientation_Input: 'Portrait' };
    var orientation_clientState = { clientplcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadComboBoxPaperOrientation_ClientState: { "logEntries": [], "value": "PORTRAIT", "text": "Portrait", "enabled": true } };
    var chartSeriesType_clientState = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadComboBoxChartSeriesType_ClientState: { "logEntries": [], "value": "LINE", "text": "Line Chart", "enabled": false } };
    var outputType = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$Data: 'rdoDataByLatestRecords' };
    var mos = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_txtDataLatestRecords_text: 24 };
    var mos1 = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtDataLatestRecords: 24 };
    var monthly = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$chkMonthlyDataPeriod: 'on' };
    var event_beforeConfiguration = { __EVENTTARGET: 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$StepNavigationTemplateContainerID$StepNextLinkButton' };
    var eventarg_beforeConfiguration = { __EVENTARGUMENT: '' };
    var form_beforeConfiguration = Object.assign(event_beforeConfiguration, eventarg_beforeConfiguration, titleKey, formatKey, formatKey_clientState, paperSize, paperSize_clientState, orientation, orientation_clientState, chartSeriesType_clientState, outputType, mos, mos1, monthly);

    /** download */
    var event_final = { __EVENTTARGET: 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadToolBar1' };
    var eventarg_final = { __EVENTARGUMENT: '2' };
    var unknowArg1 = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadToolBar1_ClientState: '' };
    var unknowArg2 = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtSaveCustomizeReport: '' };
    var finalHidden = { HiddenFieldDocumentCulture: 'en-US' };
    var form_final = Object.assign(event_final, eventarg_final, unknowArg1, unknowArg2, finalHidden, lang);


    // var request = request.defaults({ proxy: 'http://127.0.0.1:8888' });
    request.get({ url: url, gzip: true }, function (err, resp, body) {
        var $ = cheerio.load(body);
        // fs.writeFileSync('body1.html', body);
        var cookie = __getSessions(resp);
        regularHeaders.push({ "name": "Cookie", "value": cookie });
        var viewState_beforeStart = $('#__VIEWSTATE').attr('value');
        form_start = Object.assign(form_start, { __VIEWSTATE: viewState_beforeStart });
        request({ har: { headers: regularHeaders, url: url, method: 'POST' }, gzip: true, form: form_start }, function (err, resp, body) {
            var $ = cheerio.load(body);
            // fs.writeFileSync('body2.html', body);
            var viewState_beforeChecking = $('#__VIEWSTATE').attr('value');
            form_beforeChecking = Object.assign(form_beforeChecking, { __VIEWSTATE: viewState_beforeChecking });
            // console.log(form_beforeChecking);
            request({ har: { headers: regularHeaders, url: url, method: 'POST' }, gzip: true, form: form_beforeChecking }, function (err, resp, body) {
                var $ = cheerio.load(body);
                // fs.writeFileSync('body3.html', body);
                var viewState_beforeConfiguration = $('#__VIEWSTATE').attr('value');
                form_beforeConfiguration = Object.assign(form_beforeConfiguration, { __VIEWSTATE: viewState_beforeConfiguration });
                request({ har: { headers: regularHeaders, url: url, method: 'POST' }, gzip: true, form: form_beforeConfiguration }, function (err, resp, body) {
                    var $ = cheerio.load(body);
                    var viewState_final = $('#__VIEWSTATE').attr('value');
                    form_final = Object.assign(form_final, { __VIEWSTATE: viewState_final });
                    request({ har: { headers: regularHeaders, url: url, method: 'POST' }, encoding: null, gzip: true, form: form_final }, function (err, resp, body) {
                        // fs.writeFileSync('body4.html', body);
                        fs.writeFileSync(filePath, body);
                        setTimeout(function () {
                            console.log(filePath + ' was done');
                            callback();
                        }, 3000);
                    });
                });
            });
        });
    });
}