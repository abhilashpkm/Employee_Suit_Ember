

App.IndexRoute=Ember.Route.extend({
 afterModel:function(){
    //var Session = App.Storage.create({});
    var uname=getSession('usertype');
     //var uname=getCookie("username");
    if(!(validator.isNull(uname)))
        this.transitionTo("employees");
    else
        this.transitionTo("login");
  }
}); 

App.LoginRoute=Ember.Route.extend({
  model:function(){
  }
}); 


App.HomeRoute=Ember.Route.extend({
  model:function(){
  }
}); 

App.EmployeeRoute = Ember.Route.extend({
  model:function(params){
    // console.log(params.employee_id);
    // console.log('calling by id employee route');
    // var obj= FngetEmployeeById(params.employee_id);
    // //console.log(obj.Result);
    // return obj.Result;
   }    
});
App.UploadRoute = Ember.Route.extend({
   model:function(){
    //var utype=getCookie("usertype");
    //var Session = App.Storage.create({});
    var utype=getSession('usertype');
      //alert(utype);
      if(utype=='A')
         return true;
       else 
         return false
  }
});

App.EmployeesRoute=Ember.Route.extend({
  model:function(){
    //var Emp_Rid=getCookie('Emp_Rid');
   // var Session = App.Storage.create({});
    var Emp_Rid=getSession('Emp_Rid');

    if(Emp_Rid =='')
       Emp_Rid='041';
      var obj=FngetEmpById(Emp_Rid);
    if(obj.Status=='Pass')
     return obj.Result;
    else
      return null;
  }
});
App.InsertRoute=Ember.Route.extend({
model:function(){
  }
});

App.EducationRoute = Ember.Route.extend({
  model:function(){
  var Emp_Rid=getSession('Emp_Rid');
   var obj=FngetEduById(Emp_Rid);
   //console.log(obj.Result);
   if(obj.Status=='Pass')
    return obj.Result;
   else
     return null;
  }

});

App.EducationPageRoute = Ember.Route.extend({
    model: function(params) {
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
        this.controllerFor('education').set('selectedPage', model.get('id'));
    }
});



