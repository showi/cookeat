function(doc) {
  if (doc.type != 'ingredient') return;
  emit(doc.name, {
    description: doc.description,
    parent: doc.parent,
    tag: doc.tag
  });
}; 