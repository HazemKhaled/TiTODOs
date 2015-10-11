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

function loadtasks() {
  // Load the data into the collection, collection will bind the data into the ListView automaticly
  Alloy.Collections.tasks.fetch({
    query: "SELECT * FROM tasks ORDER BY lastModifiedDate DESC"
  });
}
loadtasks();

function transfomer(model) {
  var transform = model.toJSON();

  transform.prettyTime = Alloy.Globals.moment(transform.lastModifiedDate).fromNow();
  return transform;
}

Alloy.Globals.pageStack.open($.index);
