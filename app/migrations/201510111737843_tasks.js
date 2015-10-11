var preload_data = [{
  "text": "My Task man",
  "lastModifiedDate": Alloy.Globals.moment().toISOString(),
  "status": "completed",
  "image": "/images/1.png"
}, {
  "text": "Build the app",
  "lastModifiedDate": Alloy.Globals.moment().toISOString(),
  "status": "completed",
  "image": "/images/1.png"
}, {
  "text": "Say thanks for all of you",
  "lastModifiedDate": Alloy.Globals.moment().toISOString(),
  "status": "completed",
  "image": "/images/1.png"
}];

migration.up = function(migrator) {
  migrator.createTable({
    "columns": {
      "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
      "text": "TEXT",
      "lastModifiedDate": "TEXT",
      "status": "TEXT",
      "image": "TEXT"
    }
  });
  var i = 0;
  for (i; i < preload_data.length; i += 1) {
    migrator.insertRow(preload_data[i]);
  }
};

migration.down = function(db) {

};
