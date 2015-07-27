function(doc) {
  // !code vendor/cookeat/lib/commonfn.js
  if (doc.tag == undefined) return;
  var tag;
  for(var i = 0; i < doc.tag.length, tag=doc.tag[i]; i++) {
    emit(doc._id, tag);
  }
}; 