function todoListClicked(e) {
  // get the clicked item from that section
  var item = e.section.getItemAt(e.itemIndex);

  // clicked row
  Ti.API.debug(JSON.stringify(item));

  var options = Ti.UI.createOptionDialog({
    cancel: 2,
    title: item.text.text,
    options: ['Completed', 'Cancel'],
  });

  options.addEventListener('click', function(eOptions) {
    switch (eOptions.index) {
      case 0:
        var myModel = Alloy.Collections.tasks.at(e.itemIndex);
        myModel.set('status', 'completed');
        myModel.set('lastModifiedDate', Alloy.Globals.moment().toISOString());
        myModel.save();
        loadtasks();
        break;
    }
  });
  options.show();
}

function loadtasks(_status) {
  status = _status || 'completed';
  Alloy.Collections.tasks.fetch({
    query: "SELECT * FROM tasks WHERE status='" + status + "' ORDER BY lastModifiedDate DESC"
  });
}
// Load the data into the collection, collection will bind the data into the ListView automaticly
loadtasks();

function transfomer(model) {
  var transform = model.toJSON();

  transform.prettyTime = Alloy.Globals.moment(transform.lastModifiedDate).fromNow();
  return transform;
}

// Reload the data after clicked on tabbed bar button
$.segmentBar.addEventListener('click', function(e) {
  loadtasks(e.index === 0 ? 'completed' : 'pending');
});

// Open add new screen
function addBtnClicked() {
  Alloy.Globals.pageStack.open(Alloy.createController('form').getView());
}

Alloy.Globals.pageStack.open($.index);
