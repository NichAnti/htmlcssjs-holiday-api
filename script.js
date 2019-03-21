function readHoliday(year, month) {

  var outData = {

    year: year,
    month: month
  }

  $.ajax ({
    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: outData,
    success: function (inData, state) {

      if(inData.success) {

        var holidays = inData.response;

        var mom = moment();

        mom.month(month);
        mom.year(year);

        var monthDays = mom.daysInMonth();

        for (var day = 1; day <= monthDays; day++) {

          mom.date(day);

          var date = mom.format("DD dddd");

          if (day == 1) {

            var dayWeek = mom.format("d");
            dayWeek = Number(dayWeek);
          }

          var cell = $(".cell").eq(dayWeek + day - 1);

          cell.append(date);

          for(var i = 0; i < holidays.length; i++) {

            if(holidays[i].date == mom.format("YYYY-MM-DD")) {

              var nameHoliday = document.createElement("span");
              nameHoliday.className = "holiday";
              nameHoliday.innerHTML = holidays[i].name;
              cell.append(nameHoliday);
            }
          }

        }

      }
    },

    error: function (request, state, error) {
      console.log("request " + reuest);
      console.log("state " + state);
      console.log("error " + error);
    }

  })
}

function init () {

  var year = 2018;
  var month = 0;

  var mom = moment().month(month).year(year);
  var monthYear = mom.format("MMMM YYYY")

  $(".month-year h1").text(monthYear)

  readHoliday(year, month);

  $(".fa-angle-right").click(()=>{
    if(month < 11) {

      month++;

      var mom = moment().month(month).year(year);
      var monthYear = mom.format("MMMM YYYY");

      $(".month-year h1").text(monthYear);

      $(".cell").empty();

      readHoliday(year, month);
    }
  });

  $(".fa-angle-left").click(() => {
    if(month > 0) {

      month--;

      var mom = moment().month(month).year(year);
      var monthYear = mom.format("MMMM YYYY");

      $(".month-year h1").text(monthYear);

      $(".cell").empty();

      readHoliday(year, month);
    }
  });
}

$(init)
