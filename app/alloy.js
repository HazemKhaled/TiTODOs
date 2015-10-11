Alloy.Globals.moment = require('alloy/moment');
Alloy.Globals.pageStack = {
  navigationWindow: null,
  pages: [],
  open: function(page) {

    Alloy.Globals.pageStack.pages.push(page);

    if (OS_IOS) {

      if (Alloy.Globals.pageStack.navigationWindow === null) {

        Alloy.Globals.pageStack.navigationWindow = Ti.UI.iOS.createNavigationWindow({
          window: page
        });

        Alloy.Globals.pageStack.navigationWindow.open();
      } else {
        Alloy.Globals.pageStack.navigationWindow.openWindow(page);
      }
    } else if (OS_MOBILEWEB) {

      Alloy.Globals.pageStack.navigationWindow.open(page);
    } else {
      page.open();
    }
  },
  close: function(page) {

    if (OS_IOS) {
      Alloy.Globals.pageStack.navigationWindow.closeWindow(page);
    } else if (OS_MOBILEWEB) {
      Alloy.Globals.pageStack.navigationWindow.close(page);
    } else {
      page.close();
    }
    Alloy.Globals.pageStack.pages = _.without(Alloy.Globals.pageStack.pages, page);
  },
  back: function() {
    var page = _.last(Alloy.Globals.pageStack.pages);
    Alloy.Globals.pageStack.close(page);

    if (Alloy.Globals.pageStack.pages.length == 0 && OS_IOS) {
      Alloy.Globals.pageStack.navigationWindow.close();
      Alloy.Globals.pageStack.navigationWindow = null;
    }
  },
  home: function() {

    while (Alloy.Globals.pageStack.pages.length >= 2) {
      Alloy.Globals.pageStack.back();
    }
  }
};
