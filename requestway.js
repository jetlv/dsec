/// <reference path="./include.d.ts" />

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

/** compose cookie */
var __getSessions = function (resp) {
    var cookies = [];
    var fullArr = resp.headers['set-cookie'];
    for (var i in fullArr) {
        cookies.push(fullArr[i].split(';')[0]);
    }

    return cookies.join("; ");
}

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
var ck1 = { 'chkSelect_0/1503/13001/13002/25013/25014/25015': 'on' };  //use on to refer to 'checked'
var ck2 = { 'chkSelect_0/1503/13001/13002/25013/25014/25016': 'on' };
var ck3 = { 'chkSelect_0/1503/13001/13002/25013/25014/25017': 'on' };
var ck4 = { 'chkSelect_0/1503/13001/13002/25013/25014/25018': 'on' };
var ck5 = { 'chkSelect_0/1503/13001/13002/25013/25019': 'on' };
var expanded = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_PopulateLog: '12,20,28,34,41,' };
var expanded_state = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_ExpandState: 'eccccccccccceccccccceccccccceccccceccccccennnnn' };
var selected_node = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_SelectedNode: '' };
var indicator = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtSearchIndicator: '' };
var dummy = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$HiddenDummy: '' };
var event_checking = { __EVENTTARGET: 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$StartNavigationTemplateContainerID$StartNextLinkButton' };
var eventarg_afterchecking = { __EVENTARGUMENT: '' };
var hidden = { HiddenFieldDocumentCulture: 'en-US' };
var form_beforeChecking = Object.assign(ck1, ck2, ck3, ck4, ck5, event_checking, expanded, expanded_state, hidden, selected_node, indicator, dummy, eventarg_afterchecking);
// console.log(form_afterChecking);


var request = request.defaults({ proxy: 'http://127.0.0.1:8888' });

request.get({ url: url, gzip: true }, function (err, resp, body) {
    var $ = cheerio.load(body);
    var cookie = __getSessions(resp);
    regularHeaders.push({ "name": "Cookie", "value": cookie });
    var viewState_beforeStart = $('#__VIEWSTATE').attr('value');
    form_start = Object.assign(form_start, { __VIEWSTATE: viewState_beforeStart });
    request({ har: { headers: regularHeaders, url: url, method: 'POST'} , gzip : true , form: form_start }, function (err, resp, body) {
        var $ = cheerio.load(body);
        // fs.appendFileSync('body.html', body);
        var viewState_beforeChecking = $('#__VIEWSTATE').attr('value');
        form_beforeChecking = Object.assign(form_beforeChecking, {__VIEWSTATE: viewState_beforeChecking});
        console.log(form_beforeChecking);
        request({ har: { headers: regularHeaders, url: url, method: 'POST'} , gzip :true, form: form_beforeChecking }, function (err, resp, body) {
        });

    });

    // var form_afterChecking_final = Object.assign(form_afterChecking, {__VIEWSTATE : viewState});
    // request({ har: { headers: regularHeaders, url: url, method: 'POST', gzip : true}, form: form_afterChecking_final }, function (err, resp, body) {
    //     // fs.appendFileSync('body.html', body);
    // });
});



var titleKey = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtCustomizedReportTitle: 'Name' };
var formatKey = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadComboBoxFormat_Input: 'Table' };
var formatKey_clientState = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadComboBoxFormat_ClientState: { "logEntries": [], "value": "REPORT", "text": "Table", "enabled": true } };
var paperSize = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadComboBoxPaperSize_Input: 'A4' }
var paperSize_clientState = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadComboBoxPaperSize_ClientState: { "logEntries": [], "value": "1", "text": "A4", "enabled": true } };
var orientation = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadComboBoxPaperOrientation_Input: 'Portrait' };
var orientation_clientState = { clientplcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadComboBoxPaperOrientation_ClientState: { "logEntries": [], "value": "PORTRAIT", "text": "Portrait", "enabled": true } };
var chartSeriesType_clientState = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadComboBoxChartSeriesType_ClientState: { "logEntries": [], "value": "LINE", "text": "Line Chart", "enabled": false } };
/** output type  */
var outputType = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$Data: 'rdoDataByLatestRecords' };
/** latest mos */
var mos = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_txtDataLatestRecords_text: 24 };
var mos1 = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtDataLatestRecords: 24 };
/** Monthly */
var monthly = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$chkMonthlyDataPeriod: 'on' };