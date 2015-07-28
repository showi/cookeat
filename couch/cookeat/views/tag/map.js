function(doc) {
  if (doc.tag == undefined) return;
  var tag;
  for(var i = 0; i < doc.tag.length, tag=doc.tag[i]; i++) {
    emit(tag, 1);
  }
}; 