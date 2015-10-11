var args = arguments[0] || {};

// Focus on 1st input
function windowOpened() {
  $.text.focus();
}

function saveBtnClicked() {
  var myModel = Alloy.createModel('tasks', {
    "text": $.text.value,
    "lastModifiedDate": Alloy.Globals.moment().toISOString(),
    "status": "pending",
    "image": "/images/1.png"
  });
  myModel.save();

  Alloy.Globals.pageStack.back();
}
