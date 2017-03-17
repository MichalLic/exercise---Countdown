var Timeout = {

    //variables


    //init
    init: function () {
        Timeout.setLocalTime();
        Timeout.onSetMax();
        Timeout.onSend($('.btn-start'));
        Timeout.onClearInterval();
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
            Timeout.inputValid(Timeout.getFormValue($('.set-time')));
            // todo get in variables
            Timeout.inactiveField($('.date'));
            Timeout.resetForm($('.set-time'));
        });
    },

    show: function (element) {
        $(element).addClass('visible');
    },

    hide: function (element) {
        $(element).removeClass('visible');
    },

    getFormValue: function (form) {
        form = form.serializeArray();
        var dataValue = {};
        $.each(form, function (index, item) {
            dataValue[item.name] = item.value;
        });
        return dataValue;
    },

    getFieldValue: function (section, field) {
       return section.find(field).val();
    },

    //show time to designated event
    durationEvent: function () {
        var dateValue = Timeout.getFormValue($('.set-time'));
        var currentDate = new Date();
        var fullDateSplit = dateValue.fulldate.split('-');
         /* @ TODO Cannot read property 'split' of undefine...*/
        var getMonth = parseInt(fullDateSplit[1]) - 1;
        var dateStop = new Date(fullDateSplit[0], getMonth, fullDateSplit[2], dateValue.hour, dateValue.minute);

        var difference = Math.abs(dateStop.getTime() - currentDate.getTime());
        var secDifference = difference / 1000;

        var myDate = {
            days: Math.floor(secDifference / 3600 / 24),
            hours: Math.floor(secDifference / 3600 % 24),
            minutes: Math.floor(secDifference / 60 % 60),
            seconds: Math.floor(secDifference % 60)
        };

        $('.event-remained').html('To designated ' + Timeout.isEmptyField(Timeout.getFieldValue($('.set-time'), $('#event'))) + ' remained:');
        $('.remained').html('Days: ' + myDate.days + ' Hours: ' + myDate.hours + ' Minutes: ' + myDate.minutes + ' Seconds: ' + myDate.seconds);
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
        setInterval(function () {
            Timeout.durationEvent()
        }, 1000);
    },

    inputValid: function (form) {
        if (form.fulldate == '' ||
            form.hour == '' ||
            form.hour > 23 ||
            form.minute == '' ||
            form.minute > 59) {
            Timeout.show('.error-message');
            return false
        } else {
            Timeout.getFormValue($('.set-time'));
            Timeout.show('.difference-section');
            Timeout.setDifferenceInterval();
            Timeout.hide('.error-message');
        }
    },

    inactiveField: function (input){
        input.attr('disabled', 'disabled');
    },

    resetForm: function (form) {
        console.log(form);
        setTimeout(function(){form[0].reset();}, 2000)
    //     @ todo mayby settime in general function??
    },

    //set max value if field has bad filling
    onSetMax: function () {
        $('.date').on('input', function () {
            var max = parseInt(this.max);
            if (parseInt(this.value) > max) {
                this.value = max;
            }
        });
    },

    onClearInterval: function () {
        var myInterval = setInterval(function () {
            Timeout.durationEvent()
        }, 1000);
        var va = Timeout.setDifferenceInterval();
        $('#clear').on('click', function () {
            console.log('opoapaopa');
            console.log(va);
            console.log(myInterval);

            clearInterval(myInterval);
            clearInterval(Timeout.setDifferenceInterval());
        });
    }

};
$(document).ready(function () {
    Timeout.init();
});