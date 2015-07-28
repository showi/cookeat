function(doc, req) {
// var data = **JSON.parse(req.body)**;
     var data = JSON.parse(req.body);
     data['_id'] = doc.type + '-' + req.uuid;
     data.author = req.userCtx.name; 
     message = req.uuid; 
     return [ data, message];
}
