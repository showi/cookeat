function(doc, req) {
  if (!doc) {
    return {
      json: {_id: null}
    };
  }
  return {
    json: {
      id: doc._id,
      rev: doc._rev,
      title: doc.title,
      tag: doc.tag,
      step: doc.step,
      language: doc.language,
      ingredient: doc.ingredient,
    }
  };
};
