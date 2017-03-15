var Timeout = {

    //variables


    //init
    init: function () {
        Timeout.setInterval();
        Timeout.onSend($('#start'));
    },

    //function
    getActuallyTime: function () {
        var myDate = new Date();
        var actualTime = myDate.toLocaleTimeString();
        $('.time-block').html(actualTime);
    },

    setInterval: function () {
        setInterval(function () {
            Timeout.getActuallyTime()
        }, 1000);
    },

    onSend: function (btn) {
        $(btn).on('click', function () {
            Timeout.getFormValue($('.set-time'));
            Timeout.durationEvent();
        });
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
        var dateStop = new Date(dateValue.year, dateValue.month, dateValue.day, dateValue.hour, dateValue.minute);

        var a = dateStart.toLocaleTimeString();
        var b = dateStop.toLocaleTimeString();

        var difference = Math.abs(dateStop.getTime() - dateStart.getTime());
        //console.log(difference / 1000);
        //var daysTo = Math.ceil(difference / (1000 * 60 * 60 * 24));
        var secondsTo = Math.ceil(difference / 1000);
        //console.log(daysTo);

        //var dni = Math.round(difference / 1000 / 3600 / 24);
        //console.log(dni);
        //var godzin = Math.ceil(difference / 1000 / 3600);
        //console.log(godzin);
        //var minut = Math.ceil(difference / 1000 / 60);
        //console.log(minut);
        //var sekund = Math.ceil(difference / 1000);
        //console.log(sekund)
        //$('.difference').html(da);

        $('.difference').html(secondsTo);
        setInterval(function(){Timeout.durationEvent()},1000);
    }


};
$(document).ready(function () {
    Timeout.init();
});