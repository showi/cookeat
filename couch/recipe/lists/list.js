function(head, req) {
  start({
    'headers': {
      'Content-Type': 'application/json'
    }
  });
  var row = null;
  var result = [];
  while(row = getRow()) {
 if (row.value.type != 'recipe') continue;
    result.push({id: row.id, title: row.key[0], type: row.value.type, tag: row.value.tag, ingredient: row.value.ingredient});  
  }
  send(JSON.stringify({rows: result}));
}