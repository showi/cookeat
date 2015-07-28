function(head, req) {
 start({
 'headers': {
 'Content-Type': 'application/text'
 }
 });
    var row = null;
    var data = [];
    while(row = getRow()) {
      send(toJSON(row));
// send(toJSON(row));
    }
}