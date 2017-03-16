var Timeout = {

    //variables


    //init
    init: function () {
        Timeout.setInterval();
        Timeout.onSend($('#start'));
    },

    //function
    setCurrentTime: function () {
        var myDate = new Date();
        var actualTime = myDate.toLocaleTimeString();
        $('.current-time').html(actualTime);
    },

    setInterval: function () {
        setInterval(function () {
            Timeout.setCurrentTime()
        }, 1000);
    },

    onSend: function (btn) {
        $(btn).on('click', function () {
            Timeout.getFormValue($('.set-time'));
            Timeout.addClassToShow();
            Timeout.durationEvent();
        });
    },
    addClassToShow: function (){
        $('.difference-section').addClass('visible');
    },

    getFormValue: function (form) {
        form = form.serializeArray();
        var dataValue = {};
        $.each(form, function (index, item) {
            dataValue[item.name] = item.value;
        });
        return dataValue;
    },

    durationEvent: function () {
        var dateValue = Timeout.getFormValue($('.set-time'));
        var dateStart = new Date();
        //var dateStop = new Date(dateValue.year, dateValue.month, dateValue.day, dateValue.hour, dateValue.minute);
        var dateStop = new Date(2017,2,16,11,55,0);


        var a = dateStart.toLocaleTimeString();
        var b = dateStop.toLocaleTimeString();

        var difference = Math.abs(dateStop.getTime() - dateStart.getTime());
        var secDifference = difference / 1000;

        var days = Math.floor(secDifference / 3600 / 24);
        var hours = Math.floor(secDifference / 3600 % 24);
        var minutes = Math.floor(secDifference / 60 % 60);
        var seconds = Math.floor(secDifference % 60);

        $('.remained').html('Days: ' + days + ' Hours: ' + hours + ' Minutes: ' + minutes + ' Seconds: ' + seconds);
        setInterval(function(){Timeout.durationEvent()},1000);
    }


};
$(document).ready(function () {
    Timeout.init();
});