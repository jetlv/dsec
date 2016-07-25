/// <reference path="./include.d.ts" />

var webdriver = require('selenium-webdriver');
var proxy = require('selenium-webdriver/proxy');
var firefox = require('selenium-webdriver/firefox');
var phantomJs = require('selenium-webdriver/phantomjs');
var by = webdriver.By;
var fs = require('fs');
var async = require('async');
var baseMenu = ["Tourism and services", "Tourism", "Hotels & Guesthouses"];
var request = require('request');


/**
 * define Date tool
 */

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

/** Operating establishments */
var exp_opratingestablishments_hotels = baseMenu.concat(["Operating establishments", "Hotels"]);

/** Guest rooms */
var exp_guestrooms_hotels = baseMenu.concat(["Guest rooms", "Hotels"]);

/** Bedplaces */
var exp_bedplaces_hotels = baseMenu.concat(["Bedplaces", "Hotels"]);

/** Average occupancy rate */
var exp_averageoccupancyrate_hotels = baseMenu.concat(["Average occupancy rate", "Hotels"]);

/** No. of guests */
/** Hotels */
var exp_noofguests_hotels_5starhotels_Asia = baseMenu.concat(["No. of guests", "Hotels", "5-star hotels", "Asia"]);
var exp_noofguests_hotels_5starhotels_usofamericaandcanada = baseMenu.concat(["No. of guests", "Hotels", "5-star hotels", "United States of America & Canada"]);
var exp_noofguests_hotels_5starhotels_Europe = baseMenu.concat(["No. of guests", "Hotels", "5-star hotels", "Europe"]);
var exp_noofguests_hotels_5starhotels_ausnewzealand = baseMenu.concat(["No. of guests", "Hotels", "5-star hotels", "Australia & New Zealand"]);

var exp_noofguests_hotels_4starhotels_Asia = baseMenu.concat(["No. of guests", "Hotels", "4-star hotels", "Asia"]);
var exp_noofguests_hotels_4starhotels_usofamericaandcanada = baseMenu.concat(["No. of guests", "Hotels", "4-star hotels", "United States of America & Canada"]);
var exp_noofguests_hotels_4starhotels_Europe = baseMenu.concat(["No. of guests", "Hotels", "4-star hotels", "Europe"]);
var exp_noofguests_hotels_4starhotels_ausnewzealand = baseMenu.concat(["No. of guests", "Hotels", "4-star hotels", "Australia & New Zealand"]);

var exp_noofguests_hotels_3starhotels_Asia = baseMenu.concat(["No. of guests", "Hotels", "3-star hotels", "Asia"]);
var exp_noofguests_hotels_3starhotels_usofamericaandcanada = baseMenu.concat(["No. of guests", "Hotels", "3-star hotels", "United States of America & Canada"]);
var exp_noofguests_hotels_3starhotels_Europe = baseMenu.concat(["No. of guests", "Hotels", "3-star hotels", "Europe"]);
var exp_noofguests_hotels_3starhotels_ausnewzealand = baseMenu.concat(["No. of guests", "Hotels", "3-star hotels", "Australia & New Zealand"]);

var exp_noofguests_hotels_2starhotels_Asia = baseMenu.concat(["No. of guests", "Hotels", "2-star hotels", "Asia"]);
var exp_noofguests_hotels_2starhotels_usofamericaandcanada = baseMenu.concat(["No. of guests", "Hotels", "2-star hotels", "United States of America & Canada"]);
var exp_noofguests_hotels_2starhotels_Europe = baseMenu.concat(["No. of guests", "Hotels", "2-star hotels", "Europe"]);
var exp_noofguests_hotels_2starhotels_ausnewzealand = baseMenu.concat(["No. of guests", "Hotels", "2-star hotels", "Australia & New Zealand"]);
/** Guests House */

var exp_noofguests_guests_Asia = baseMenu.concat(["No. of guests", "Guest-houses", "Asia"]);
var exp_noofguests_guests_usofamericaandcanada = baseMenu.concat(["No. of guests", "Guest-houses", "United States of America & Canada"]);
var exp_noofguests_guests_Europe = baseMenu.concat(["No. of guests", "Guest-houses", "Europe"]);
var exp_noofguests_guests_ausnewzealand = baseMenu.concat(["No. of guests", "Guest-houses", "Australia & New Zealand"]);

/** No. of guests through travel agencies */
var exp_noofgueststa_hotels = baseMenu.concat(["No. of guests through travel agencies", "Hotels"]);

/** Average length of stay of guests */
/** Hotels */
var exp_alofguests_hotels_5starhotels_Asia = baseMenu.concat(["Average length of stay of guests", "Hotels", "5-star hotels", "Asia"]);
var exp_alofguests_hotels_5starhotels_usofamericaandcanada = baseMenu.concat(["Average length of stay of guests", "Hotels", "5-star hotels", "United States of America & Canada"]);
var exp_alofguests_hotels_5starhotels_Europe = baseMenu.concat(["Average length of stay of guests", "Hotels", "5-star hotels", "Europe"]);
var exp_alofguests_hotels_5starhotels_ausnewzealand = baseMenu.concat(["Average length of stay of guests", "Hotels", "5-star hotels", "Australia & New Zealand"]);

var exp_alofguests_hotels_4starhotels_Asia = baseMenu.concat(["Average length of stay of guests", "Hotels", "4-star hotels", "Asia"]);
var exp_alofguests_hotels_4starhotels_usofamericaandcanada = baseMenu.concat(["Average length of stay of guests", "Hotels", "4-star hotels", "United States of America & Canada"]);
var exp_alofguests_hotels_4starhotels_Europe = baseMenu.concat(["Average length of stay of guests", "Hotels", "4-star hotels", "Europe"]);
var exp_alofguests_hotels_4starhotels_ausnewzealand = baseMenu.concat(["Average length of stay of guests", "Hotels", "4-star hotels", "Australia & New Zealand"]);

var exp_alofguests_hotels_3starhotels_Asia = baseMenu.concat(["Average length of stay of guests", "Hotels", "3-star hotels", "Asia"]);
var exp_alofguests_hotels_3starhotels_usofamericaandcanada = baseMenu.concat(["Average length of stay of guests", "Hotels", "3-star hotels", "United States of America & Canada"]);
var exp_alofguests_hotels_3starhotels_Europe = baseMenu.concat(["Average length of stay of guests", "Hotels", "3-star hotels", "Europe"]);
var exp_alofguests_hotels_3starhotels_ausnewzealand = baseMenu.concat(["Average length of stay of guests", "Hotels", "3-star hotels", "Australia & New Zealand"]);

var exp_alofguests_hotels_2starhotels_Asia = baseMenu.concat(["Average length of stay of guests", "Hotels", "2-star hotels", "Asia"]);
var exp_alofguests_hotels_2starhotels_usofamericaandcanada = baseMenu.concat(["Average length of stay of guests", "Hotels", "2-star hotels", "United States of America & Canada"]);
var exp_alofguests_hotels_2starhotels_Europe = baseMenu.concat(["Average length of stay of guests", "Hotels", "2-star hotels", "Europe"]);
var exp_alofguests_hotels_2starhotels_ausnewzealand = baseMenu.concat(["Average length of stay of guests", "Hotels", "2-star hotels", "Australia & New Zealand"]);
/** Guests House */

var exp_alofguests_guests_Asia = baseMenu.concat(["Average length of stay of guests", "Guest-houses", "Asia"]);
var exp_alofguests_guests_usofamericaandcanada = baseMenu.concat(["Average length of stay of guests", "Guest-houses", "United States of America & Canada"]);
var exp_alofguests_guests_Europe = baseMenu.concat(["Average length of stay of guests", "Guest-houses", "Europe"]);
var exp_alofguests_guests_ausnewzealand = baseMenu.concat(["Average length of stay of guests", "Guest-houses", "Australia & New Zealand"]);

// var expandArray = [exp_opratingestablishments_hotels, exp_guestrooms_hotels, exp_bedplaces_hotels, exp_averageoccupancyrate_hotels, exp_noofguests_hotels_5starhotels_Asia, exp_noofguests_hotels_5starhotels_usofamericaandcanada, exp_noofguests_hotels_5starhotels_Europe, exp_noofguests_hotels_5starhotels_ausnewzealand, exp_noofguests_hotels_4starhotels_Asia, exp_noofguests_hotels_4starhotels_usofamericaandcanada, exp_noofguests_hotels_4starhotels_Europe, exp_noofguests_hotels_4starhotels_ausnewzealand, exp_noofguests_hotels_3starhotels_Asia, exp_noofguests_hotels_3starhotels_usofamericaandcanada, exp_noofguests_hotels_3starhotels_Europe, exp_noofguests_hotels_3starhotels_ausnewzealand, exp_noofguests_hotels_2starhotels_Asia, exp_noofguests_hotels_2starhotels_usofamericaandcanada, exp_noofguests_hotels_2starhotels_Europe, exp_noofguests_hotels_2starhotels_ausnewzealand, exp_noofguests_guests_Asia, exp_noofguests_guests_usofamericaandcanada, exp_noofguests_guests_Europe, exp_noofguests_guests_ausnewzealand, exp_noofgueststa_hotels];

var OGBA = [exp_opratingestablishments_hotels, exp_guestrooms_hotels, exp_bedplaces_hotels, exp_averageoccupancyrate_hotels];
var FiveSTAR = [exp_noofguests_hotels_5starhotels_Asia, exp_noofguests_hotels_5starhotels_usofamericaandcanada, exp_noofguests_hotels_5starhotels_Europe, exp_noofguests_hotels_5starhotels_ausnewzealand];
var FourSTAR = [exp_noofguests_hotels_4starhotels_Asia, exp_noofguests_hotels_4starhotels_usofamericaandcanada, exp_noofguests_hotels_4starhotels_Europe, exp_noofguests_hotels_4starhotels_ausnewzealand];
var ThreeSTAR = [exp_noofguests_hotels_3starhotels_Asia, exp_noofguests_hotels_3starhotels_usofamericaandcanada, exp_noofguests_hotels_3starhotels_Europe, exp_noofguests_hotels_3starhotels_ausnewzealand];
var TwoSTAR = [exp_noofguests_hotels_2starhotels_Asia, exp_noofguests_hotels_2starhotels_usofamericaandcanada, exp_noofguests_hotels_2starhotels_Europe, exp_noofguests_hotels_2starhotels_ausnewzealand];
var GuestsHouse = [exp_noofguests_guests_Asia, exp_noofguests_guests_usofamericaandcanada, exp_noofguests_guests_Europe, exp_noofguests_guests_ausnewzealand];
var NOGTA = [exp_noofgueststa_hotels];
var ALFiveStar = [exp_alofguests_hotels_5starhotels_Asia, exp_alofguests_hotels_5starhotels_usofamericaandcanada, exp_alofguests_hotels_5starhotels_Europe, exp_alofguests_hotels_5starhotels_ausnewzealand];
var ALFourStar = [exp_alofguests_hotels_4starhotels_Asia, exp_alofguests_hotels_4starhotels_usofamericaandcanada, exp_alofguests_hotels_4starhotels_Europe, exp_alofguests_hotels_4starhotels_ausnewzealand];
var ALThreeStar = [exp_alofguests_hotels_3starhotels_Asia, exp_alofguests_hotels_3starhotels_usofamericaandcanada, exp_alofguests_hotels_3starhotels_Europe, exp_alofguests_hotels_3starhotels_ausnewzealand];
var ALTwoStar = [exp_alofguests_hotels_2starhotels_Asia, exp_alofguests_hotels_2starhotels_usofamericaandcanada, exp_alofguests_hotels_2starhotels_Europe, exp_alofguests_hotels_2starhotels_ausnewzealand];
var ALGuestsHouse = [exp_alofguests_guests_Asia, exp_alofguests_guests_usofamericaandcanada, exp_alofguests_guests_Europe, exp_alofguests_guests_ausnewzealand];

var folder = new Date().Format('yyyyMMddhhmmss') + '/';
fs.mkdirSync(folder);

async.series([function (callback) { singleQuery(OGBA, folder + 'OGBA.xls', callback) },
    function (callback) { singleQuery(FiveSTAR, folder + 'FiveSTAR.xls', callback) },
    function (callback) { singleQuery(FourSTAR, folder + 'FourSTAR.xls', callback) },
    function (callback) { singleQuery(ThreeSTAR, folder + 'ThreeSTAR.xls', callback) },
    function (callback) { singleQuery(TwoSTAR, folder + 'TwoSTAR.xls', callback) },
    function (callback) { singleQuery(GuestsHouse, folder + 'GuestsHouse.xls', callback) },
    function (callback) { singleQuery(NOGTA, folder + 'NOGTA.xls', callback) },
    function (callback) { singleQuery(ALFiveStar, folder + 'ALFiveStar.xls', callback) },
    function (callback) { singleQuery(ALFourStar, folder + 'ALFourStar.xls', callback) },
    function (callback) { singleQuery(ALThreeStar, folder + 'ALThreeStar.xls', callback) },
    function (callback) { singleQuery(ALTwoStar, folder + 'ALTwoStar.xls', callback) },
    function (callback) { singleQuery(ALGuestsHouse, folder + 'ALGuestsHouse.xls', callback) }
    ], function (err, result) {
        if (err) console.log(err);
        console.log('All xls files fetched');
    });

/**
 * Single query. Pass the expand Array
 */

function singleQuery(expandArray, savedName, nextQuery) {

    //Define the screenshot function
    webdriver.WebDriver.prototype.saveScreenshot = function (filename) {
        return driver.takeScreenshot().then(function (data) {
            fs.writeFile(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64', function (err) {
                if (err) throw err;
            });
        })
    };

    //setProxy(proxy.manual({http: '127.0.0.1:2099'})).
    var driver = new webdriver.Builder().forBrowser('phantomjs').usingServer('http://127.0.0.1:4444/wd/hub').build();

    /**
     * get correct xpath based on the array and value provided
     * Note : There should not be duplicated elements in array. Surely the element should be exist in array
     */
    function getFullXpath(array, which) {
        var deliverXpath = '//';
        for (var value in array) {
            // console.log(value);
            if (array[value] === which) {
                deliverXpath += "a[text()='" + array[value] + "']"
                return deliverXpath;
            }
            deliverXpath += "a[text()='" + array[value] + "']//following::";
        };
    }

    var already = [];

    driver.get('http://www.dsec.gov.mo/TimeSeriesDatabase.aspx?lang=en-US').then(function () {
        driver.findElement(by.id('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_lblStart')).click();
    }).then(function () {
        driver.saveScreenshot('pics/loaded.png');
    }).then(function () {
        //Expand you want

        async.forEachOfSeries(expandArray, function (toExpand, outerIndex, callback) {
            async.forEachOfSeries(toExpand, function (value, index, next) {
                driver.wait(function () {
                    return driver.isElementPresent(by.xpath(getFullXpath(toExpand, value))).then(function (present) {
                        return present;
                    })
                }, 50000).then(function () {
                    var item = driver.findElement(by.xpath(getFullXpath(toExpand, value)));
                    item.getId().then(function (id) {
                        if (already.indexOf(id) == -1) {
                            driver.findElement(by.xpath(getFullXpath(toExpand, value))).click().then(function () {
                                setTimeout(function () {
                                    console.log(value + ' expanded');
                                    already.push(id);
                                    next();
                                    if (index == toExpand.length - 1) {
                                        callback();
                                    }
                                }, 300);
                            });
                        } else {
                            setTimeout(function () {
                                console.log(value + ' already expanded');
                                next();
                                if (index == toExpand.length - 1) {
                                    callback();
                                }
                            }, 300);
                        }
                    });


                });
            });

        }, function (err) {
            if (err) console.log(err);
            console.log('All indicator expanded');
            driver.saveScreenshot('pics/expanded.png').then(function () {
                var counter = 0;
                driver.wait(function () {
                    return driver.findElements(by.xpath('//tr[@onmouseover="this.bgColor=\'gold\'"]/td[2]/table/tbody/tr/td[1]/span/input[@type=\'checkbox\']')).then(function (elements) {
                        return elements /** && elements.length == 145*/;
                    })
                }, 500000).then(function () {
                    driver.findElements(by.xpath('//tr[@onmouseover="this.bgColor=\'gold\'"]/td[2]/table/tbody/tr/td[1]/span/input[@type=\'checkbox\']')).then(function (elements) {
                        elements.forEach(function (value, index, array) {
                            driver.wait(function () {
                                return value;
                            }, 10000).then(function () {
                                value.click();
                                console.log(value + ' checked');
                                counter++;
                                if (counter % 5 === 0) {
                                    console.log(counter + ' items checked');
                                }
                            });
                        });
                    });
                });
            }).then(function () {
                driver.saveScreenshot('pics/checked.png');
            }).then(function () {
                driver.findElement(by.id('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_StartNavigationTemplateContainerID_StartNextLinkButton')).click();
            }).then(function () {
                driver.wait(function () {
                    return driver.isElementPresent(by.id('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_txtCustomizedReportTitle')).then(function (present) {
                        return present;
                    });
                }, 10000).then(function () {
                    driver.findElement(by.id('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_txtCustomizedReportTitle')).clear();
                });
            }).then(function () {
                driver.findElement(by.id('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_txtCustomizedReportTitle')).sendKeys(savedName.split('/')[1].split('.')[0]);
            }).then(function () {
                driver.findElement(by.id('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_chkYearlyDataPeriod')).click();
            }).then(function () {
                driver.findElement(by.id('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_chkQuarterlyDataPeriod')).click();
            }).then(function () {
                driver.saveScreenshot('pics/forminput.png');
            }).then(function () {
                driver.findElement(by.id('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_StepNavigationTemplateContainerID_StepNextLinkButton')).click();
            }).then(function () {

            }).then(function () {
                driver.wait(function () {
                    return driver.isElementPresent(by.xpath('//span[text()="Save as Excel file"]')).then(function (present) {
                        return present;
                    });
                }, 10000).then(function () {
                    var form = [];



                    driver.findElement(by.name('__EVENTTARGET')).getAttribute("value").then(function (et) {
                        form.push({ 'name': '__EVENTTARGET', 'value': 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$RadToolBar1' });
                    }).then(function () {
                        driver.findElement(by.name('__EVENTARGUMENT')).getAttribute("value").then(function (et) {
                            form.push({ 'name': '__EVENTARGUMENT', 'value': '2' });
                        }).then(function () {
                            driver.findElement(by.name('HiddenFieldDocumentCulture')).getAttribute("value").then(function (et) {
                                form.push({ 'name': 'HiddenFieldDocumentCulture', 'value': et });
                            }).then(function () {
                                driver.findElement(by.name('__VIEWSTATE')).getAttribute("value").then(function (et) {
                                    form.push({ 'name': '__VIEWSTATE', 'value': et });
                                }).then(function () {
                                    driver.findElement(by.name('lng')).getAttribute("value").then(function (et) {
                                        form.push({ 'name': 'lng', 'value': et });
                                    }).then(function () {
                                        driver.findElement(by.name('plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadToolBar1_ClientState')).getAttribute("value").then(function (et) {
                                            form.push({ 'name': 'plcRoot_Layout_zoneContent_pageplaceholder_partPlaceholder_Layout_zoneMain_CustomReport_Wizard1_RadToolBar1_ClientState', 'value': et });
                                        }).then(function () {
                                            driver.findElement(by.name('plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtSaveCustomizeReport')).getAttribute("value").then(function (et) {
                                                form.push({ 'name': 'plcRoot$Layout$zoneContent$pageplaceholder$partPlaceholder$Layout$zoneMain$CustomReport$Wizard1$txtSaveCustomizeReport', 'value': et });
                                            }).then(function () {
                                                console.log(form);
                                                var har = {
                                                    "postData": {
                                                        "params": form,
                                                        "mimeType": "application/x-www-form-urlencoded"
                                                    },
                                                    "queryString": [],
                                                    "headers": [{
                                                        "name": "Host",
                                                        "value": "www.dsec.gov.mo"
                                                    },
                                                        {
                                                            "name": "Connection",
                                                            "value": "keep-alive"
                                                        },
                                                        {
                                                            "name": "Cache-Control",
                                                            "value": "max-age=0"
                                                        },
                                                        {
                                                            "name": "Origin",
                                                            "value": "http://www.dsec.gov.mo"
                                                        },
                                                        {
                                                            "name": "Upgrade-Insecure-Requests",
                                                            "value": "1"
                                                        },
                                                        {
                                                            "name": "User-Agent",
                                                            "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
                                                        },
                                                        {
                                                            "name": "Content-Type",
                                                            "value": "application/x-www-form-urlencoded"
                                                        },
                                                        {
                                                            "name": "Accept",
                                                            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
                                                        },
                                                        {
                                                            "name": "Referer",
                                                            "value": "http://www.dsec.gov.mo/TimeSeriesDatabase.aspx"
                                                        },
                                                        {
                                                            "name": "Accept-Encoding",
                                                            "value": "gzip, deflate"
                                                        },
                                                        {
                                                            "name": "Accept-Language",
                                                            "value": "zh-CN,zh;q=0.8"
                                                        }],
                                                    "url": "http://www.dsec.gov.mo/TimeSeriesDatabase.aspx",
                                                    "method": "POST",
                                                    "httpVersion": "HTTP/1.1"

                                                }
                                                // request = request.defaults({ proxy: 'http://127.0.0.1:8888' });
                                                request({ gzip: true, url: 'http://www.dsec.gov.mo/TimeSeriesDatabase.aspx', method: 'POST', har: har, encoding: null }, function (err, resp, body) {
                                                    for (var i in resp.headers) {
                                                        console.log(i + ' : ' + resp.headers[i]);
                                                    }
                                                    fs.writeFileSync(savedName, body);
                                                    driver.quit();
                                                    nextQuery();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

    });
}

