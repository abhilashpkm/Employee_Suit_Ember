

App = Ember.Application.create({
ready:function(){
   
   }
});

App.Storage = Ember.Object.extend({
  init: function() {
    this.clearStorage();

    var items = ['foo', 'bar', 'baz'];
    localStorage.items = JSON.stringify(items);
  },
  find: function(key) {
    // pseudo implementation
    if( !Ember.isNone(key) ) {
      var items = [];
      var storedItems = JSON.parse(localStorage[key]);
      storedItems.forEach(function(item){
        items.pushObject(item);
      });
      return items;
    }
  },
  setSession:function(cname,cvalue){
  localStorage.setItem(cname,cvalue);
  },
  getSession:function(cname){
   var obj=localStorage.getItem(cname);
  return obj;
  },
  clearStorage: function() {
    // pseudo implementation
    localStorage.clear();
  }
});

App.Router.map(function() {
  this.resource('login');
  this.resource('home', function() {
    this.resource('employee');
    this.resource('CompleteInfo',function(){
    	this.resource('employees');
      this.resource("education",function() {
       this.route("page", { path: "page/:page_id" });
    });
    this.resource("pagination");
    });
    this.resource('about');http://builds.emberjs.com/beta/ember-data.min.js
    this.resource('welcome');
  });
  });
