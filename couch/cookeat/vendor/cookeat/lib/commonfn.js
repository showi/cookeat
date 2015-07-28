function required(doc, field, _message) {
  message = _message || "Document must have a " + field;
  if (!doc[field]) throw ({
    forbidden : message
  });
}

function unchanged(field) {
  if (oldDoc && toJSON(oldDoc[field]) != toJSON(newDoc[field])) throw ({
    forbidden : "Field can't be changed: " + field
  });
}

function user_is(role) {
  return userCtx.roles.indexOf(role) >= 0;
}

function has_role(userCtx, _roles, _message) {
  roles = _roles;
  if (roles instanceof String) {
    roles = [
      roles
    ];
  }
  message = _message || "User " + userCtx.name + " is not " + roles;
  for ( var i in userCtx.roles) {
    for ( var j in roles) {
      if (userCtx.roles[i] == roles[j]) { return; }
    }
  }
  throw ({
    forbidden : message
  });
}
function user_match(userCtx, doc, _message) {
  message = _message || "User do not match";
  if (userCtx.name != doc.account) { throw {
    forbidden : message
  }; }
}
var VALID_TYPES = [
    'recipe', 'ingredient', 'tag'
];
function has_valid_type(doc) {
  for ( var i in VALID_TYPES) {
    if (doc.type == VALID_TYPES[i]) { return; }
  }
  throw {
    forbidden : message || "Invalid type: " + doc.type
  };
}
