function productListClicked(e) {

}

// Load the data into the collection, collection will bind the data into the ListView automaticly
Alloy.Collections.tasks.fetch();

Alloy.Globals.pageStack.open($.index);
