function(doc) {
  // !code ../cookeat/vendor/cookeat/lib/commonfn.js
  // !code ../cookeat/vendor/cookeat/lib/validate.js
  
  if (doc.type != 'ingredient') return;
  if (!doc.name) return;
  emit(doc.name, {
    description: doc.description, 
    language: doc.language,
    created_on: doc.created_on,
    updated_on: doc.updated_on,
  });
  
}; 