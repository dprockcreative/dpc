/**
 * Cal Provider
 */
Date.prototype.getOffsetDay = function (offset) {
    var d = (this.getDay() - (offset||1)) % 7;
    return (d > -1) ? d:6;
}

Date.prototype.getIsoDay = function() {
    var d = this.getDay();
    return (d > 0) ? d:7;
}

angular
    .module('calProvider', [])
    .factory('$cal', function ($timeout, $log) {
        var $this       = this,
            daysTiny    = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            daysShort   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            daysLong    = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            lmDaysTiny  = ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            lmDaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            lmDaysLong  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            monthsLong  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.today          = new Date();
        this.todayDate      = this.today.toLocaleDateString();
        this.todayTime      = this.today.toLocaleTimeString();
        this.getDaysShort   = function (useISO) { return (useISO) ? this.daysToIsoDays(daysShort):daysShort; };
        this.getDaysLong    = function (useISO) { return (useISO) ? this.daysToIsoDays(daysLong):daysLong; };
        this.getLmDaysShort = function (useISO) { return (useISO) ? this.daysToIsoDays(lmDaysShort):lmDaysShort; };
        this.getLmDaysLong  = function (useISO) { return (useISO) ? this.daysToIsoDays(lmDaysLong):lmDaysLong; };
        this.getMonthsShort = function () { return monthsShort; };
        this.getMonthsLong  = function () { return monthsLong; };
        this.getDayShort    = function (day, useISO) { return (useISO) ? this.dayToIsoDay(daysShort, day):daysShort[day]; };
        this.getDayLong     = function (day, useISO) { return (useISO) ? this.dayToIsoDay(daysLong, day):daysLong[day]; };
        this.getLmDayShort  = function (day, useISO) { return (useISO) ? this.dayToIsoDay(lmDaysShort, day):lmDaysShort[day]; };
        this.getLmDayLong   = function (day, useISO) { return (useISO) ? this.dayToIsoDay(lmDaysLong, day):lmDaysLong[day]; };
        this.getMonthShort  = function (month) { return monthsShort[month]; };
        this.getMonthLong   = function (month) { return monthsLong[month]; };
        this.weekend        = [5,6], // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday

        this.dtg = function (year, month, date, hour, minute) {
            year   = (year   || year   === 0) ? String(year)  : $this.today.getFullYear();
            month  = (month  || month  === 0) ? String(month) : $this.today.getMonth();
            date   = (date   || date   === 0) ? String(date)  : $this.today.getDate();
            hour   = (hour   || hour   === 0) ? String(hour)  : $this.today.getHours();
            minute = (minute || minute === 0) ? String(minute): $this.today.getMinutes();
            return new Date(year, month, date, hour, minute);
        };

        this.dtgUTC = function (time) {
            return new Date(time);
        };

        this.now = function () {
            return new Date().getTime();
        };

        this.cloneDate = function (dtg) {
            if (undefined === dtg) { dtg = $this.today; }
            return new Date(dtg.getTime());
        };

        this.dayToIsoDay = function (days, day) {
            if (days[0].charAt(0).toLowerCase() === 's' && days[1].charAt(0).toLowerCase() === 'm') {
                var d = days.shift();
                days.push(d);
            }
            return days[day-1];
        };

        this.daysToIsoDays = function (days) {
            if (days[0].charAt(0).toLowerCase() === 's' && days[1].charAt(0).toLowerCase() === 'm') {
                var d = days.shift();
                days.push(d);
            }
            return {
                1: days[0],
                2: days[1],
                3: days[2],
                4: days[3],
                5: days[4],
                6: days[5],
                7: days[6]
            };
        };

        this.daysIn = function (year, month) {
            return 32 - new Date(year, month, 32).getDate();
        };

        this.weeksIn = function (dtg) {
            return Math.ceil((this.daysIn(dtg.getFullYear(), dtg.getMonth()) + dtg.getOffsetDay()) / 7);
        };

        this.getFullWeek = function (dtg) {
            return this.dtg(dtg.getFullYear(), dtg.getMonth(), (dtg.getDate() - dtg.getOffsetDay(1)));
        };

        this.getWeekEnd = function (dtg) {
            return this.dtg(dtg.getFullYear(), dtg.getMonth(), (dtg.getDate() - dtg.getOffsetDay(1) + 6));
        };

        this.getYear = function (dtg, n) {
            return String(dtg.getFullYear()).substr((n || 0));
        };

        this.getLastOfMonth = function (dtg) {
            dtg.setMonth( (dtg.getMonth() + 1) );
            dtg.setDate(0);
            return dtg;
        };

        this.getWeekOfMonth = function (dtg) {
            var month = dtg.getMonth(),
                first = this.dtg(dtg.getFullYear(), month, 1).getDay(),
                offset = dtg.getDate() + first - 1,
                week = Math.floor(offset / 7);
            return week;
        };

        this.lzero = function (n) { return (n<10)? '0'+n:String(n); };

        this.getMonths = function (mlong) {
            var i = 0,
                map = (mlong) ? $this.getMonthsLong():$this.getMonthsShort(),
                len = map.length,
                months = [];
            for (; i < len; i++) {
                months.push({value: i, label: map[i]});
            }
            return months;
        };

        this.getWeekdays = function () {
            var i = 0,
                map = $this.getDaysLong(),
                len = map.length,
                weekdays = [];
            for (; i < len; i++) {
                weekdays.push({value: i, label: map[i]});
            }
            return weekdays;
        };

        this.daysOf = function (year, month) {
            var len = $this.daysIn(year, month),
                days = [], i = 1;
            for (; i <= len; i++) {
                days.push({value: i, label: $this.lzero(i)});
            }
            return days;
        };

        this.yearsRange = function (start, range, reverse) {
            range = range || 10,
            i     = reverse ? parseInt(start+range) : start
            len   = reverse ? start : parseInt(start+range),
            years = [];
            if (!reverse) {
                for (; i <= len; i++) {
                    years.push({value: i, label: String(i)});
                }
            } else {
                for (; i >= len; i--) {
                    years.push({value: i, label: String(i)});
                }
            }
            return years;
        };

        return this;
    })
;