var Timeout = {

    //variables


    //init

    init: function () {
        Timeout.setInterval();
    },

    //function
    getActuallyTime: function () {
        var myDate = new Date();
        var actualTime = myDate.toLocaleTimeString();
        $('.time-block').html(actualTime);
    },

    setInterval: function () {
        setInterval(function(){Timeout.getActuallyTime()},1000);
    }


};
$(document).ready(function () {
    Timeout.init();
});