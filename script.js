var m = moment();
var currentDate = m.format("MMM Do YYYY");
var currentHour = moment().hours();


$(document).ready(function () {
    $("#currentDay").text("Today's Date: " + currentDate);


    $(".saveBtn").on("click", function () {
        var click = $(this).attr("hour-value");
        var eventInput = $(click).val();
        localStorage.setItem(click, eventInput);
    });

    var timeBlock = ["#9am", "#10am", "#11am", "#12pm", "#1pm", "#2pm", "#3pm", "#4pm", "#5pm"];
    for (i = 0; i < timeBlock.length; i++) {
        var savedEvent = $(".saved-event")
        $(timeBlock[i]).val(localStorage.getItem(timeBlock[i]));
    };

    function timeTable() {
        for (i = 6; i < 18; i++) {

            var hour = '#' + i;
            var scheduleHour = parseInt($(hour).attr("id"));
            $(hour).removeClass();
            if (
                scheduleHour === currentHour) {
                $(hour).attr("class", "present");
            }

            else if (
                scheduleHour > currentHour) {
                $(hour).attr("class", "future");
            }

            else if (
                scheduleHour < currentHour) {
                $(hour).attr("class", "past");
            }

        };
    }
    timeTable();

});