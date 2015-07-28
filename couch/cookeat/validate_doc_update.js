function(newDoc, oldDoc, userCtx) {
  // !code vendor/cookeat/lib/commonfn.js
  // !code vendor/cookeat/lib/validate.js
  
// function required(doc, field, _message) {
// message = _message || "Document must have a " + field;
// if (!doc[field]) throw({forbidden : message});
// }
//
// function unchanged(field) {
// if (oldDoc && toJSON(oldDoc[field]) != toJSON(newDoc[field]))
// throw({forbidden : "Field can't be changed: " + field});
// }
//
// function user_is(role) {
// return userCtx.roles.indexOf(role) >= 0;
// }
//
// function has_role(userCtx, _roles, _message) {
// roles = _roles;
// if (roles instanceof String) {
// roles = [roles];
// }
// message = _message || "User " + userCtx.name + " is not " + roles;
// for (var i in userCtx.roles) {
// for (var j in roles) {
// if (userCtx.roles[i] == roles[j]) {
// return;
// }
// }
// }
// throw({forbidden : message});
// }
// function user_match(userCtx, doc, _message) {
// message = _message || "User do not match";
// if (userCtx.name != doc.account) {
// throw{forbidden: message };
// }
// }
// var VALID_TYPES = ['recipe', 'ingredient', 'tag'];
// function has_valid_type(doc) {
// for (var i in VALID_TYPES) {
// if (doc.type == VALID_TYPES[i]) { return; }
// }
// throw{forbidden: message || "Invalid type: " + doc.type};
// }
  try {
    has_role(userCtx('cookeat-admin')); 
    return;
  } catch(error) {
    ; 
  }
  /* Usage */
  if(oldDoc) {
    if(newDoc._deleted) {
      user_match(userCtx, newDoc, "You are not authorized to delete this document");
    } else {
      unchanged("account");
      unchanged("type");
      unchanged("_id");
      user_match(userCtx, newDoc, "You are not authorized to modify this document");
    }
  } else {
    newDoc.account =  userCtx.name;
    has_role(userCtx, ['cookeat-admin', 
                              'cookeat-user']);
    required(newDoc, 'account');
// required(newDoc, 'type');
    // user_match(newDoc.account,"You are not authorized to create this
    // document");
  }
  has_valid_type(newDoc);
}