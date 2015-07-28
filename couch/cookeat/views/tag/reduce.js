function(keys, values, rereduce) {
  if (rereduce) {
    return sum(values);
  }
  var data = {};
  var key;
  for (var i = 0; i < keys.length, key=keys[i]; i++) {
    if (data[key] === undefined) {
      data[key] = values[i];
    } else {
      data[key]++;;
    }
  }
  var response = [];
  for (var key in data) {
    response.append([key+"foo", data[key]]);
  }
  return response;
}