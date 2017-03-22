var Timeout = {
    //variables
    DATE_VALUE: '',
    SET_INTERVAL: '',
    SET_TIME_GET_CL: $('.set-time'),
    DATE_GET_CL: $('.date'),
    DIFFERENCE_SECTION_CL: '.difference-section',
    RESET_SECTION_CL: '.reset-section',
    ERROR_MESSAGE_CL: '.error-message',

    //init
    init: function () {
        Timeout.setLocalTime();
        Timeout.onSend();
    },

    //function
    setCurrentTime: function () {
        var myDate = new Date();
        var currentTime = myDate.toLocaleTimeString();
        $('.current-time').html(currentTime);
    },

    setLocalTime: function () {
        setInterval(function () {
            Timeout.setCurrentTime()
        }, 1000);
    },

    onSend: function () {
        $('.btn-start').on('click', function (e) {
            e.preventDefault();
            if (Timeout.calculations() && Timeout.inputValid(Timeout.getFormValue(Timeout.SET_TIME_GET_CL))) {
                Timeout.DATE_VALUE = Timeout.getFormValue(Timeout.SET_TIME_GET_CL);
                Timeout.show(Timeout.DIFFERENCE_SECTION_CL);
                Timeout.setDifferenceInterval();
                Timeout.disabledFields(Timeout.DATE_GET_CL);
                Timeout.onReset();
                Timeout.show(Timeout.RESET_SECTION_CL);
            }
        });
    },

    onReset: function () {
        $('.clear').on('click', function (e) {
            e.preventDefault();
            Timeout.clearInterval();
            Timeout.hide(Timeout.DIFFERENCE_SECTION_CL);
            Timeout.hide(Timeout.RESET_SECTION_CL);
            Timeout.resetForm(Timeout.SET_TIME_GET_CL);
            Timeout.activeField(Timeout.DATE_GET_CL);
        })
    },

    show: function (element) {
        $(element).addClass('show');
    },

    hide: function (element) {
        $(element).removeClass('show');
    },


    /**
     * get data by map function
     * @param form
     * @returns {{}}
     */
    getFormValue: function (form) {
        form = form.serializeArray();
        var dataValue = {};
        form.map(function (item) {
            dataValue[item.name] = item.value;
        });
        return dataValue;
    },

    getFieldValue: function (section, field) {
        return section.find(field).val();
    },

    /*show time to designated event*/
    durationEvent: function () {
        var currentDate = new Date();
        var fullDateSplit = Timeout.DATE_VALUE.fulldate.split('-');
        //JavaScript counts months from 0 to 11. January is 0. December is 11.
        var getMonth = parseInt(fullDateSplit[1]) - 1;
        var dateStop = new Date(fullDateSplit[0], getMonth, fullDateSplit[2], Timeout.DATE_VALUE.hour, Timeout.DATE_VALUE.minute);

        var difference = Math.abs(dateStop.getTime() - currentDate.getTime());
        var secDifference = difference / 1000;

        var myDate = {
            days: Math.floor(secDifference / 3600 / 24),
            hours: Math.floor(secDifference / 3600 % 24),
            minutes: Math.floor(secDifference / 60 % 60),
            seconds: Math.floor(secDifference % 60)
        };

        var formatDate = {
            dayLabel: (myDate.days > 1 ) ? ' days ' : ' day ',
            hourLabel: (myDate.hours > 1) ? ' hours ' : ' hour ',
            minuteLabel: (myDate.minutes > 1 ) ? ' minutes ' : ' minute ',
            secondLabel: (myDate.seconds > 1) ? ' seconds ' : ' second '
        };
        if (myDate.days == 0 && myDate.hours == 0 && myDate.minutes == 0 && myDate.seconds == 0) {
            Timeout.clearInterval();
            $(Timeout.DIFFERENCE_SECTION_CL).find('.timeout').remove();
            $(Timeout.DIFFERENCE_SECTION_CL).find('.container').append("It's time!")
        } else {
            $('.event-remained').html('To designated ' + Timeout.isEmptyField(Timeout.getFieldValue(Timeout.SET_TIME_GET_CL, $('#event'))) + ' remained:');
            $('.remained').html(myDate.days + formatDate.dayLabel + myDate.hours + formatDate.hourLabel + myDate.minutes + formatDate.minuteLabel + myDate.seconds + formatDate.secondLabel);
        }
    },

    /**
     * check text area and set value
     * @param fieldValue
     * @returns {*}
     */
    isEmptyField: function (fieldValue) {
        if (fieldValue != '') {
            return fieldValue;
        } else {
            return 'event';
        }
    },

    /**
     * countdown time to designated event
     */
    setDifferenceInterval: function () {
        Timeout.durationEvent();
        Timeout.SET_INTERVAL = setInterval(function () {
            Timeout.durationEvent();
        }, 1000);
    },

    inputValid: function (form) {
        if (Timeout.isEmpty() ||
            form.fulldate.length == 0 ||
            form.hour.length == 0 ||
            form.hour > 23 ||
            form.minute > 59 ||
            form.minute.length == 0) {
            Timeout.show(Timeout.ERROR_MESSAGE_CL);
            return false;
        } else {
            Timeout.hide(Timeout.ERROR_MESSAGE_CL);
            return true;
        }
    },

    isEmpty: function () {
        $('.empty').each(function () {
            if (this.value == '') {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error')
            }
        });
    },

    disabledFields: function (input) {
        input.attr('disabled', true);
    },

    activeField: function (input) {
        input.attr('disabled', false);
    },

    resetForm: function (form) {
        form[0].reset();
    },

    calculations: function () {
        var currentTime = new Date().getTime();
        var values = Timeout.getFormValue(Timeout.SET_TIME_GET_CL);
        var fullDateSplit = values.fulldate.split('-');
        var getMonth = parseInt(fullDateSplit[1]) - 1;
        var eventTime = new Date(fullDateSplit[0], getMonth, fullDateSplit[2], values.hour, values.minute);
        var eventTimeString = eventTime.getTime();

        if (currentTime < eventTimeString) {
            return true;
        } else {
            $('input').addClass('error');
            alert('That date passed!');
            return false;
        }
    },

    clearInterval: function () {
        clearInterval(Timeout.SET_INTERVAL);
    }

};
$(document).ready(function () {
    Timeout.init();
});