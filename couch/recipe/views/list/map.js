function(doc) {
  // !code ../cookeat/vendor/cookeat/lib/commonfn.js
  // !code ../cookeat/vendor/cookeat/lib/validate.js
  
  if (doc.type != 'recipe') return;
  emit([doc.title, 0], {
    type: doc.type,
    tag: doc.tag,
    ingredient: doc.ingredient
  });
  var count = 1;
  if (doc.ingredient && Array.isArray(doc.ingredient)) {
    doc.ingredient.forEach(function (ingredient) {
      emit([doc.title, count++], {_id: ingredient, type: 'ingredient'});
    });
  }
  if (doc.tag && Array.isArray(doc.tag)) {
    doc.tag.forEach(function (tag) {
      emit([doc.title, count++], {tag: tag.toLowerCase(), type: 'tag'});
    });
  }
}; 