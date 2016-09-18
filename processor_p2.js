/// <reference path="./include.d.ts" />

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

    /** first sheet */
    function compose_data_arrival() {
        /** define entry map. e.g - OuterHarbour : MFT */
        var entry_map = {
            'Outer Harbour': 'MFT'
        }

        

    }
}