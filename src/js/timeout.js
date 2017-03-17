var Timeout = {

    //variables


    //init
    init: function () {
        Timeout.setLocalTime();
        Timeout.onSetMax();
        Timeout.onSend($('#start'));
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
            Timeout.inputValid();
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
        var val = section.find(field).val();
        return val;
    },

    //show time to designated event
    durationEvent: function () {
        var dateValue = Timeout.getFormValue($('.set-time'));
        var dateStart = new Date();
        var fullDateSplit = dateValue.fulldate.split('-');
        var getMonth = parseInt(fullDateSplit[1]) - 1;
        var dateStop = new Date(fullDateSplit[0], getMonth, fullDateSplit[2], dateValue.hour, dateValue.minute);

        var difference = Math.abs(dateStop.getTime() - dateStart.getTime());
        var secDifference = difference / 1000;

        var days = Math.floor(secDifference / 3600 / 24);
        var hours = Math.floor(secDifference / 3600 % 24);
        var minutes = Math.floor(secDifference / 60 % 60);
        var seconds = Math.floor(secDifference % 60);

        $('.event-remained').html('To designated ' + Timeout.isEmpty() + ' remained:');
        $('.remained').html('Days: ' + days + ' Hours: ' + hours + ' Minutes: ' + minutes + ' Seconds: ' + seconds);
    },

    //check text area and set value
    isEmpty: function () {
        var fieldValue = Timeout.getFieldValue($('.set-time'), $('#event'));
        if (!fieldValue == '') {
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

    inputValid: function () {
        var form = Timeout.getFormValue($('.set-time'));
        if (form.fulldate == '' ||
            form.hour == '' ||
            form.hour > 23 ||
            form.minute == '' ||
            form.minute > 59) {
            Timeout.show('.error-p');
            return false
        } else {
            console.log('okeokeokeoke');
            Timeout.getFormValue($('.set-time'));
            Timeout.show('.difference-section');
            Timeout.durationEvent();
            Timeout.setDifferenceInterval();
            Timeout.hide('.error-p');
        }
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