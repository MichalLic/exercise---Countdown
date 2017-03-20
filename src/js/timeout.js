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
        Timeout.onSetMax();
        Timeout.onSend($('.btn-start'));
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

    onSend: function (btn) {
        $(btn).on('click', function () {
            event.preventDefault();

            if (Timeout.inputValid(Timeout.getFormValue(Timeout.SET_TIME_GET_CL))) {
                Timeout.DATE_VALUE = Timeout.getFormValue(Timeout.SET_TIME_GET_CL);
                Timeout.show(Timeout.DIFFERENCE_SECTION_CL);
                Timeout.setDifferenceInterval();
                Timeout.disabledFields(Timeout.DATE_GET_CL);
                Timeout.onReset($('.clear'));
                Timeout.show(Timeout.RESET_SECTION_CL);
            }
        });
    },

    onReset: function (btn) {
        $(btn).on('click', function () {
            event.preventDefault();
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

    //get data by map function
    getFormValue: function (form) {
        form = form.serializeArray();
        var dataValue = {};
        var reformattedArray = form.map(function (item) {
            dataValue[item.name] = item.value;
        });
        return dataValue;
    },

    getFieldValue: function (section, field) {
        return section.find(field).val();
    },

    //show time to designated event
    durationEvent: function () {
        var currentDate = new Date();
        var fullDateSplit = Timeout.DATE_VALUE.fulldate.split('-');
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
            dayLabel: (myDate.days != 1) ? ' days ' : ' day ',
            hourLabel: (myDate.hours != 1) ? ' hours ' : ' hour ',
            minuteLabel: (myDate.minutes != 1 ) ? ' minutes ' : ' minute ',
            secondLabel: (myDate.seconds != 1) ? ' seconds ' : ' second '
        };


        $('.event-remained').html('To designated ' + Timeout.isEmptyField(Timeout.getFieldValue(Timeout.SET_TIME_GET_CL, $('#event'))) + ' remained:');
        $('.remained').html(myDate.days + formatDate.dayLabel + myDate.hours + formatDate.hourLabel + myDate.minutes + formatDate.minuteLabel + myDate.seconds + formatDate.secondLabel);
    },

    //check text area and set value
    isEmptyField: function (fieldValue) {
        if (fieldValue != '') {
            return fieldValue;
        } else {
            return 'event';
        }
    },

    //countdown time to designated event
    setDifferenceInterval: function () {
        Timeout.durationEvent();
        Timeout.SET_INTERVAL = setInterval(function () {
            Timeout.durationEvent();
        }, 1000);
    },

    inputValid: function (form) {
        if (form.fulldate == '' ||
            form.hour == '' ||
            form.hour > 23 ||
            form.minute == '' ||
            form.minute > 59) {
            Timeout.show(Timeout.ERROR_MESSAGE_CL);
            return false;
        } else {
            Timeout.hide(Timeout.ERROR_MESSAGE_CL);
            return true;
        }
    },

    disabledFields: function (input) {
        input.attr('disabled', true);
    },

    activeField: function (input) {
        input.attr('disabled', false)
    },

    resetForm: function (form) {
        form[0].reset();
    },

    //set max value if field has bad filling
    onSetMax: function () {
        Timeout.DATE_GET_CL.on('input', function () {
            var max = parseInt(this.max);
            if (parseInt(this.value) > max) {
                this.value = max;
            }
        });
    },

    clearInterval: function () {
        clearInterval(Timeout.SET_INTERVAL);
    }

};
$(document).ready(function () {
    Timeout.init();
});