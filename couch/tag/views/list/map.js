function(doc) {
  // !code ../cookeat/vendor/cookeat/lib/commonfn.js
  // !code ../cookeat/vendor/cookeat/lib/validate.js
  
// if (doc.type != 'tag') return;
  if (!doc.tag) return;
  var tag;
  for (var i = 0; i < doc.tag.length, tag=doc.tag[i]; i++) {
    emit(tag, 1);    
  }
}; 