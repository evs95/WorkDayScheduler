var container = $(".container");

var now = moment();

var currentTime = { text: moment().format("h A"), hour: moment().hour() };

$("#currentDay").text(now.format("dddd MMMM DD, YYYY"));

var hoursOfTheDay = Array.from(new Array(24)).map((v, i) => {
  var text = moment().hour(i).format("h A");
  var hour = moment().hour(i);
  return { text, hour };
});

function color(time) {
  return time.text === currentTime.text ? "present" : time.hour < now ? "past" : "future";
}

hoursOfTheDay.forEach((hr) => {
  var grid = $(
    `<form data-name="${hr.text}" class="row"></form>.`
  );

  var time = $(
    `<label class="hour col-1 col-span-2 h-16 p-2 text-right">${hr.text}</label>`
  );

  var textArea = $(`<textarea name="${hr.text}" maxLength="50" class="col-10 col-span-8 h-16 p-6 ${color(hr)}">${window.localStorage.getItem(hr.text) || ""}</textarea>`);

  textArea.keydown((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      return false;
    }
  });

  var saveButton = $(`<button type="submit" class="col-1 saveBtn"><i class="fas fa-save text-xl"></i></button>`);

  grid.on('click', function(event){
    event.preventDefault();

    var value = $(`textarea[name="${hr.text}"]`).val();

    window.localStorage.setItem(hr.text, value);
  });

  grid.append(time);
  grid.append(textArea);
  grid.append(saveButton);

  container.append(grid);
});
