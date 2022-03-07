console.log("Script is being read!");

// Gets the current date from moment JS
var dateE1 = moment().format("dddd, MMMM Do YYYY");
// Gets the hour of the time
var dateE2 = moment().hour();

//Gets ID to display current date
$("#currentDay").html(dateE1);

//Creates a section for every hour
for (var i = 0; i < 9; i++) {
  //Sets up the section tag
  var section = $("<section id=time-" + i + "></section>").addClass("row");

  //Hours Display
  var hourDisplay = $("<div id=hourDisplay-" + i + "><div><p></p></div></div>")
    .addClass("hour col col-sm-2 col-2")
    .last()
    .addClass("row align-items-center justify-content-end pr-3");
  //Gets time and will correctly display it
  if (i < 3) {
    $(hourDisplay)
      .first("p")
      .html("<p>" + (i + 9) + "AM </p>");
  } else if (i === 3) {
    $(hourDisplay).html("<p>" + (i + 9) + "PM </p>");
  } else {
    $(hourDisplay).html("<p>" + (i - 3) + "PM");
  }

  //Textarea
  var textValue = localStorage.getItem("#ToDoTextArea-" + i);
  if (textValue) {
    var toDoBox = $(
      "<textarea id=ToDoTextArea-" + i + ">" + textValue + "</textarea>"
    ).addClass("col h-100");
  } else {
    var toDoBox = $("<textarea id=ToDoTextArea-" + i + "></textarea>").addClass(
      "col h-100"
    );
  }
  //Sets up the time classes
  if (i + 9 < dateE2) {
    $(toDoBox).addClass("past");
  } else if (i + 9 === dateE2) {
    $(toDoBox).addClass("present");
  } else {
    $(toDoBox).addClass("future");
  }

  //Save Button
  var savebtn = $("<div id=saveButton-" + i + "><i >Save</i> </div>")
    .addClass(
      "saveBtn col col-sm-1 col-2 h-100 d-flex justify-content-center align-items-center"
    )
    .first("i")
    .addClass("bi bi-save-fill");
  $(savebtn).on("click", saveBtnFun);

  //Create the sections in Container
  $("#container").append(section.append(hourDisplay, toDoBox, savebtn));
}

//Listens for a click when the save button is click
function saveBtnFun() {
  //Gets the ID from the button
  var IdName = $(this).attr("id");
  //Gets the number from save id
  IdName = IdName.replace(/[^0-9]/g, "");
  IdName = "#ToDoTextArea-" + IdName;

  //Checks to see if their is a value in textArea to be save
  if ($(IdName).val()) {
    //Saves the value into the storage
    localStorage.setItem(IdName, $(IdName).val());
  } else {
    //Will clear the storage if there's nothing in textArea
    localStorage.removeItem(IdName);
  }
}
