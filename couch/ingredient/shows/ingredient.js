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
      name: doc._name,
      language: doc.language,
      description: doc.description,
    }
  };
};
