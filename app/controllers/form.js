var args = arguments[0] || {};

if (args.hasOwnProperty('itemIndex')) {
  // Edit mode
  var myModel = Alloy.Collections.tasks.at(args.itemIndex);
  $.text.value = myModel.get('text');
  $.image.image = myModel.get('image');
} else {
  // Add mode
  var myModel = Alloy.createModel('tasks');
  myModel.set("status", "pending");
}

// Focus on 1st input
function windowOpened() {
  $.text.focus();
}

function showImageOptionDialog() {

  var options = Ti.UI.createOptionDialog({
    cancel: 2,
    title: 'From?',
    options: ['Camera', 'Gallery', 'Cancel'],
  });

  options.addEventListener('click', function(eOptions) {
    switch (eOptions.index) {
      case 0:
        Ti.Media.showCamera({
          allowEditing: true,
          saveToPhotoGallery: true,
          mediaTypes: [Titanium.Media.MEDIA_TYPE_PHOTO],
          success: function(event) {
            alert(event.media.nativePath);
            $.image.image = event.media;
            myModel.set('image', event.media.nativePath);
          },
          error: function(errorEvent) {
            alert("Hey, It's not working on simulator");
          }
        });
        break;
      case 1:
        Ti.Media.openPhotoGallery({
          allowEditing: true,
          mediaTypes: [Titanium.Media.MEDIA_TYPE_PHOTO],
          success: function(event) {
            var image = event.media,
              fileName = Math.random() + '.png';

            var writeFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
            writeFile.write(image);

            $.image.image = writeFile.nativePath;
            myModel.set('image', writeFile.nativePath);
          },
          error: function() {
            alert('Sorry, something happen wrong, try again.');
          }
        });
        break;
    }
  });
  options.show();
}

function saveBtnClicked() {

  if ($.text.value.length === 0) {
    var alertDialog = Ti.UI.createAlertDialog({
      title: 'Error',
      message: 'Enter task title at least',
      buttons: ['OK']
    });
    alertDialog.addEventListener('click', function() {
      $.text.focus();
    });
    alertDialog.show();

    return false;
  }

  myModel.set("text", $.text.value);
  myModel.set("lastModifiedDate", require('alloy/moment')().toISOString());

  // insert if add, update if edit
  myModel.save();

  // Refresh home screen
  args.refreshCollection();

  Alloy.Globals.pageStack.back();
}
