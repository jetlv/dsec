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
var ck1={'chkSelect_0/1503/13001/14001/14301/14302/14305':'on'};
var ck2={'chkSelect_0/1503/13001/14001/14301/14302/14306':'on'};
var ck3={'chkSelect_0/1503/13001/14001/14301/14302/14307':'on'};
var ck4={'chkSelect_0/1503/13001/14001/14301/14302/14308':'on'};
var ck5={'chkSelect_0/1503/13001/14001/14301/14302/14309':'on'};
var ck6={'chkSelect_0/1503/13001/14001/14301/14302/14310':'on'};
var ck7={'chkSelect_0/1503/13001/14001/14301/14302/14311':'on'};
var ck8={'chkSelect_0/1503/13001/14001/14301/14302/14312':'on'};
var ck9={'chkSelect_0/1503/13001/14001/14301/14302/14313':'on'};
var ck10={'chkSelect_0/1503/13001/14001/14301/14302/14314':'on'};
var ck11={'chkSelect_0/1503/13001/14001/14301/14302/14315':'on'};
var ck12={'chkSelect_0/1503/13001/14001/14301/14302/14316':'on'};
var ck13={'chkSelect_0/1503/13001/14001/14301/14302/14317':'on'};
var ck14={'chkSelect_0/1503/13001/14001/14301/14302/14318':'on'};
var ck15={'chkSelect_0/1503/13001/14001/14301/14302/14319':'on'};
var ck16={'chkSelect_0/1503/13001/14001/14301/14302/14320':'on'};
var ck17={'chkSelect_0/1503/13001/14001/14301/14302/14321':'on'};
var ck18={'chkSelect_0/1503/13001/14001/14301/14302/14322':'on'};
var ck19={'chkSelect_0/1503/13001/14001/14301/14302/14323':'on'};
var ck20={'chkSelect_0/1503/13001/14001/14301/14302/14324':'on'};
var ck21={'chkSelect_0/1503/13001/14001/14301/14302/14325':'on'};
var ck22={'chkSelect_0/1503/13001/14001/14301/14302/14326':'on'};
var ck23={'chkSelect_0/1503/13001/14001/14301/14302/14327':'on'};
var ck24={'chkSelect_0/1503/13001/14001/14301/14302/14328':'on'};
var ck25={'chkSelect_0/1503/13001/14001/14301/14302/14329':'on'};

// var ck26={'chkSelect_0/1503/13001/14001/14301/14330/14331':'on'};
// var ck27={'chkSelect_0/1503/13001/14001/14301/14330/14332':'on'};
// var ck28={'chkSelect_0/1503/13001/14001/14301/14330/14333':'on'};
// var ck29={'chkSelect_0/1503/13001/14001/14301/14330/14334':'on'};
// var ck30={'chkSelect_0/1503/13001/14001/14301/14330/14335':'on'};
// var ck31={'chkSelect_0/1503/13001/14001/14301/14330/14336':'on'};
// var ck32={'chkSelect_0/1503/13001/14001/14301/14330/14337':'on'};
// var ck33={'chkSelect_0/1503/13001/14001/14301/14330/14338':'on'};
// var ck34={'chkSelect_0/1503/13001/14001/14301/14330/14339':'on'};
// var ck35={'chkSelect_0/1503/13001/14001/14301/14330/14340':'on'};
// var ck36={'chkSelect_0/1503/13001/14001/14301/14330/14341':'on'};
// var ck37={'chkSelect_0/1503/13001/14001/14301/14330/14342':'on'};
// var ck38={'chkSelect_0/1503/13001/14001/14301/14330/14343':'on'};
// var ck39={'chkSelect_0/1503/13001/14001/14301/14330/14344':'on'};
// var ck40={'chkSelect_0/1503/13001/14001/14301/14330/14345':'on'};
// var ck41={'chkSelect_0/1503/13001/14001/14301/14330/14346':'on'};
// var ck42={'chkSelect_0/1503/13001/14001/14301/14330/14347':'on'};
// var ck43={'chkSelect_0/1503/13001/14001/14301/14330/14348':'on'};
// var ck44={'chkSelect_0/1503/13001/14001/14301/14330/14349':'on'};
// var ck45={'chkSelect_0/1503/13001/14001/14301/14330/14350':'on'};
// var ck46={'chkSelect_0/1503/13001/14001/14301/14330/14351':'on'};
// var ck47={'chkSelect_0/1503/13001/14001/14301/14330/14352':'on'};
// var ck48={'chkSelect_0/1503/13001/14001/14301/14330/14353':'on'};
// var ck49={'chkSelect_0/1503/13001/14001/14301/14330/14354':'on'};
// var ck50={'chkSelect_0/1503/13001/14001/14301/14330/14355':'on'};
// var ck51={'chkSelect_0/1503/13001/14001/14301/14330/14356':'on'};
// var ck52={'chkSelect_0/1503/13001/14001/14301/14330/14357':'on'};

// var ck53={'chkSelect_0/1503/13001/14001/14301/14358/14359':'on'};
// var ck54={'chkSelect_0/1503/13001/14001/14301/14358/14360':'on'};
// var ck55={'chkSelect_0/1503/13001/14001/14301/14358/14361':'on'};
// var ck56={'chkSelect_0/1503/13001/14001/14301/14358/14362':'on'};
// var ck57={'chkSelect_0/1503/13001/14001/14301/14358/14363':'on'};
// var ck58={'chkSelect_0/1503/13001/14001/14301/14358/14364':'on'};
// var ck59={'chkSelect_0/1503/13001/14001/14301/14358/14365':'on'};
// var ck60={'chkSelect_0/1503/13001/14001/14301/14358/14366':'on'};
// var ck61={'chkSelect_0/1503/13001/14001/14301/14358/14367':'on'};
// var ck62={'chkSelect_0/1503/13001/14001/14301/14358/14368':'on'};
// var ck63={'chkSelect_0/1503/13001/14001/14301/14358/14369':'on'};
// var ck64={'chkSelect_0/1503/13001/14001/14301/14358/14370':'on'};
// var ck65={'chkSelect_0/1503/13001/14001/14301/14358/14371':'on'};
// var ck66={'chkSelect_0/1503/13001/14001/14301/14358/14372':'on'};
// var ck67={'chkSelect_0/1503/13001/14001/14301/14358/14373':'on'};
// var ck68={'chkSelect_0/1503/13001/14001/14301/14358/14374':'on'};
// var ck69={'chkSelect_0/1503/13001/14001/14301/14358/14375':'on'};
// var ck70={'chkSelect_0/1503/13001/14001/14301/14358/14376':'on'};
// var ck71={'chkSelect_0/1503/13001/14001/14301/14358/14377':'on'};
// var ck72={'chkSelect_0/1503/13001/14001/14301/14358/14378':'on'};
// var ck73={'chkSelect_0/1503/13001/14001/14301/14358/14379':'on'};
// var ck74={'chkSelect_0/1503/13001/14001/14301/14358/14380':'on'};
// var ck75={'chkSelect_0/1503/13001/14001/14301/14358/14381':'on'};
// var ck76={'chkSelect_0/1503/13001/14001/14301/14358/14382':'on'};
// var ck77={'chkSelect_0/1503/13001/14001/14301/14358/14383':'on'};
// var ck78={'chkSelect_0/1503/13001/14001/14301/14358/14384':'on'};
// var ck79={'chkSelect_0/1503/13001/14001/14301/14358/14385':'on'};


var expanded = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_PopulateLog: '12,20,30,34,35,' };
var expanded_state = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_ExpandState: 'eccccccccccceccccccceccccccccceccceeccnnnnnnnnnnnnnnnnnnnnnnnnnnn' };
var selected_node = { plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_DSECTreeViewEx1_SelectedNode: '' };
var indicator = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtSearchIndicator: '' };
var dummy = { plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$HiddenDummy: '' };
var event_checking = { __EVENTTARGET: 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$StartNavigationTemplateContainerID$StartNextLinkButton' };
var eventarg_beforeChecking = { __EVENTARGUMENT: '' };
var hidden = { HiddenFieldDocumentCulture: 'en-US' };
var form_beforeChecking = Object.assign(ck1,ck2,ck3,ck4,ck5,ck6,ck7,ck8,ck9,ck10,ck11,ck12,ck13,ck14,ck15,ck16,ck17,ck18,ck19,ck20,ck21,ck22,ck23,ck24,ck25,event_checking, expanded, expanded_state, hidden, selected_node, indicator, dummy, eventarg_beforeChecking);

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
var event_beforeConfiguration = {__EVENTTARGET: 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$StepNavigationTemplateContainerID$StepNextLinkButton'};
var eventarg_beforeConfiguration = {__EVENTARGUMENT : ''};
var form_beforeConfiguration = Object.assign(event_beforeConfiguration, eventarg_beforeConfiguration, titleKey, formatKey, formatKey_clientState, paperSize, paperSize_clientState, orientation, orientation_clientState, chartSeriesType_clientState, outputType, mos, mos1, monthly);

/** download */
var event_final = {__EVENTTARGET: 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadToolBar1'};
var eventarg_final = {__EVENTARGUMENT : '2'};
var unknowArg1 = {plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadToolBar1_ClientState:''};
var unknowArg2 = {plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtSaveCustomizeReport : ''};
var finalHidden = {HiddenFieldDocumentCulture: 'en-US'};
var form_final = Object.assign(event_final, eventarg_final, unknowArg1, unknowArg2, finalHidden, lang);


// var request = request.defaults({ proxy: 'http://127.0.0.1:8888' });
request.get({ url: url, gzip: true }, function (err, resp, body) {
    var $ = cheerio.load(body);
    fs.writeFileSync('body1.html', body);
    var cookie = __getSessions(resp);
    regularHeaders.push({ "name": "Cookie", "value": cookie });
    var viewState_beforeStart = $('#__VIEWSTATE').attr('value');
    form_start = Object.assign(form_start, { __VIEWSTATE: viewState_beforeStart });
    request({ har: { headers: regularHeaders, url: url, method: 'POST' }, gzip: true, form: form_start }, function (err, resp, body) {
        var $ = cheerio.load(body);
        fs.writeFileSync('body2.html', body);
        var viewState_beforeChecking = $('#__VIEWSTATE').attr('value');
        form_beforeChecking = Object.assign(form_beforeChecking, { __VIEWSTATE: viewState_beforeChecking });
        // console.log(form_beforeChecking);
        request({ har: { headers: regularHeaders, url: url, method: 'POST' }, gzip: true, form: form_beforeChecking }, function (err, resp, body) {
            var $ = cheerio.load(body);
            fs.writeFileSync('body3.html', body);
            var viewState_beforeConfiguration = $('#__VIEWSTATE').attr('value');
            form_beforeConfiguration = Object.assign(form_beforeConfiguration, {__VIEWSTATE: viewState_beforeConfiguration});
            request({ har: { headers: regularHeaders, url: url, method: 'POST' }, gzip: true, form: form_beforeConfiguration }, function (err, resp, body) {
                var $ = cheerio.load(body);
                var viewState_final = $('#__VIEWSTATE').attr('value');
                form_final = Object.assign(form_final, { __VIEWSTATE: viewState_final});
                request({ har: { headers: regularHeaders, url: url, method: 'POST' }, encoding : null, gzip: true, form: form_final}, function (err, resp, body) {    
                    fs.writeFileSync('body4.html', body);
                    fs.writeFileSync('testResult.xls', body);
                });
            });
        });
    });
});

