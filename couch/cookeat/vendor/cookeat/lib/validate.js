var validate = {
    _all : function() {
      required(doc, 'account');
      required(doc, 'type');
    },
    recipe : function() {
      if (doc.type != 'recipe') { throw {
        forbidden : message || "Invalid type: " + doc.type
      }; }
      required(doc, 'title');
      required(doc, 'summary');
      required(doc, 'ingredient');
      required(doc, 'tag');
    }
}
