function(head, req) {
  start({
    'headers': {
      'Content-Type': 'application/text'
    }
  });
  var row = null;
  var result = [];
  while(row = getRow()) {
    result.push(row);
  }
  send(JSON.stringify(result));
}