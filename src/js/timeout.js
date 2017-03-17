var Timeout = {

    //variables


    //init
    init: function () {
        Timeout.setLocalTime();
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
            Timeout.getFormValue($('.set-time'));
            Timeout.show($('.difference-section'));
            Timeout.durationEvent();
            Timeout.setDifferenceInterval();
        });
    },

    show: function (element) {
        element.addClass('visible');
    },

    getFormValue: function (form) {
        form = form.serializeArray();
        var dataValue = {};
        $.each(form, function (index, item) {
            dataValue[item.name] = item.value;
        });
        return dataValue;
    },

    getFieldValue: function (form, textarea) {
        var val = form.find(textarea).val();
        return val;
    },

    durationEvent: function () {
        var dateValue = Timeout.getFormValue($('.set-time'));
        var dateStart = new Date();
        var fullDateSplit = dateValue.fulldate.split('-');
        var getMonth = parseInt(fullDateSplit[1]) - 1 ;
        var dateStop = new Date(fullDateSplit[0], getMonth, fullDateSplit[2], dateValue.hour, dateValue.minute);
        //var dateStop = new Date(2017, 2, 16, 17, 59, 55);

        var difference = Math.abs(dateStop.getTime() - dateStart.getTime());
        var secDifference = difference / 1000;

        var days = Math.floor(secDifference / 3600 / 24);
        var hours = Math.floor(secDifference / 3600 % 24);
        var minutes = Math.floor(secDifference / 60 % 60);
        var seconds = Math.floor(secDifference % 60);

        $('.event-remained').html('To designated ' + Timeout.getFieldValue($('.set-time'), $('#event')) + ' remained:');
        $('.remained').html('Days: ' + days + ' Hours: ' + hours + ' Minutes: ' + minutes + ' Seconds: ' + seconds);
    },

    setDifferenceInterval: function () {
        setInterval(function(){Timeout.durationEvent()}, 1000);
    },

    onClearInterval: function () {
        var myInterval = setInterval(Timeout.durationEvent(), 1000);
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