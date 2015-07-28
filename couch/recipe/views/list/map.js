function(doc) {
  // !code ../cookeat/vendor/cookeat/lib/commonfn.js
  // !code ../cookeat/vendor/cookeat/lib/validate.js
  
  if (doc.type != 'recipe') return;
  if (!doc.title) return;
  emit(doc.title, {
    tag: doc.tag,
    country: doc.country, 
    language: doc.language,
    created_on: doc.created_on,
    updated_on: doc.updated_on,
  });
}; 