// declaro function
var o = function () {};
// hookeo observer
Object.observe(o, function(ob) {
  // log all changes.
  console.log(ob);
});
// freeze object.
Object.freeze(o);
