var Timeout={DATE_VALUE:"",SET_INTERVAL:"",SET_TIME_GET_CL:$(".set-time"),DATE_GET_CL:$(".date"),DIFFERENCE_SECTION_CL:".difference-section",RESET_SECTION_CL:".reset-section",ERROR_MESSAGE_CL:".error-message",FULL_DATE:"",init:function(){Timeout.setLocalTime(),Timeout.onSend()},setCurrentTime:function(){var e=new Date,t=e.toLocaleTimeString();$(".current-time").html(t)},setLocalTime:function(){setInterval(function(){Timeout.setCurrentTime()},1e3)},onSend:function(){$(".btn-start").on("click",function(e){e.preventDefault(),Timeout.DATE_VALUE=Timeout.getFormValue(Timeout.SET_TIME_GET_CL),Timeout.FULL_DATE=Timeout.DATE_VALUE.fulldate,Timeout.inputValid(Timeout.getFormValue(Timeout.SET_TIME_GET_CL))&&(Timeout.show(Timeout.DIFFERENCE_SECTION_CL),Timeout.setDifferenceInterval(),Timeout.disabledFields(Timeout.DATE_GET_CL),Timeout.onReset(),Timeout.show(Timeout.RESET_SECTION_CL))})},onReset:function(){$(".clear").on("click",function(e){e.preventDefault(),Timeout.clearInterval(),Timeout.hide(Timeout.DIFFERENCE_SECTION_CL),Timeout.hide(Timeout.RESET_SECTION_CL),Timeout.resetForm(Timeout.SET_TIME_GET_CL),Timeout.activeField(Timeout.DATE_GET_CL)})},show:function(e){$(e).addClass("show")},hide:function(e){$(e).removeClass("show")},getFormValue:function(e){e=e.serializeArray();var t={};return e.map(function(e){t[e.name]=e.value}),t},getFormDate:function(){var e=new Date,t=Timeout.FULL_DATE,i=t.split("-"),o=parseInt(i[1])-1,n=new Date(i[0],o,i[2],Timeout.DATE_VALUE.hour,Timeout.DATE_VALUE.minute),u=Math.abs(n.getTime()-e.getTime()),a=Timeout.DATE_VALUE;a.event;return{currentDate:new Date,fullDate:Timeout.FULL_DATE,fullDateSplit:t.split("-"),getMonth:parseInt(i[1])-1,dateStop:new Date(i[0],o,i[2],Timeout.DATE_VALUE.hour,Timeout.DATE_VALUE.minute),difference:Math.abs(n.getTime()-e.getTime()),secDifference:u/1e3,getTextarea:Timeout.DATE_VALUE,textareaValue:a.event}},durationEvent:function(){var e=Timeout.getFormDate().secDifference,t=Timeout.getFormDate().textareaValue,i={days:Math.floor(e/3600/24),hours:Math.floor(e/3600%24),minutes:Math.floor(e/60%60),seconds:Math.floor(e%60)},o={dayLabel:i.days>1?" days ":" day ",hourLabel:i.hours>1?" hours ":" hour ",minuteLabel:i.minutes>1?" minutes ":" minute ",secondLabel:i.seconds>1?" seconds ":" second "};0==i.days&&0==i.hours&&0==i.minutes&&0==i.seconds?(Timeout.clearInterval(),$(Timeout.DIFFERENCE_SECTION_CL).find(".timeout").remove(),$(Timeout.DIFFERENCE_SECTION_CL).find(".container").append("It's time!")):($(".event-remained").html("To designated "+Timeout.isEmptyField(t)+" remained:"),$(".remained").html(i.days+o.dayLabel+i.hours+o.hourLabel+i.minutes+o.minuteLabel+i.seconds+o.secondLabel))},isEmptyField:function(e){return""!=e?e:"event"},setDifferenceInterval:function(){Timeout.durationEvent(),Timeout.SET_INTERVAL=setInterval(function(){Timeout.durationEvent()},1e3)},inputValid:function(e){return Timeout.getFormDate().currentDate>Timeout.getFormDate().dateStop?($("input[name=fulldate]").addClass("error"),alert("That date passed!"),!1):0==e.fulldate.length?($("input[name=fulldate]").addClass("error"),Timeout.show(Timeout.ERROR_MESSAGE_CL),!1):0==e.hour.length?($("input[name=hour]").addClass("error"),Timeout.show(Timeout.ERROR_MESSAGE_CL),!1):e.hour>23?($("input[name=hour]").addClass("error"),Timeout.show(Timeout.ERROR_MESSAGE_CL),!1):e.minute>59?($("input[name=minute]").addClass("error"),Timeout.show(Timeout.ERROR_MESSAGE_CL),!1):0==e.minute.length?($("input[name=minute]").addClass("error"),Timeout.show(Timeout.ERROR_MESSAGE_CL),!1):($("input").removeClass("error"),Timeout.hide(Timeout.ERROR_MESSAGE_CL),!0)},disabledFields:function(e){e.attr("disabled",!0)},activeField:function(e){e.attr("disabled",!1)},resetForm:function(e){e[0].reset()},clearInterval:function(){clearInterval(Timeout.SET_INTERVAL)}};$(document).ready(function(){Timeout.init()});
//# sourceMappingURL=app.js.map
