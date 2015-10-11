function productListClicked(e) {

}

// Load the data into the collection, collection will bind the data into the ListView automaticly
Alloy.Collections.tasks.fetch({
  query: "SELECT * FROM tasks ORDER BY lastModifiedDate DESC"
});

function transfomer(model) {
  var transform = model.toJSON();

  transform.prettyTime = Alloy.Globals.moment(transform.lastModifiedDate).fromNow();
  return transform;
}

Alloy.Globals.pageStack.open($.index);
