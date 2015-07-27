function(doc) {
  if (doc.type != 'recipe') return;
  emit(doc.title, {tag: doc.tag, country: doc.country, language: doc.language});
}; 