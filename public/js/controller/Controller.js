App.EmployeeController = Ember.ObjectController.extend({
   page:1,
   pagelimit:2, 
  paginatedContent:(function(){
       var obj= fngetEmpDetails('');  
       var start = (this.get('page') - 1) * this.get('pagelimit');
       var last =  this.get('pagelimit');
      if(obj.Status=='Pass')
       return obj.Result.splice(start,last);
      else
        return null;
      }).property('page','pagelimit'),
totalpage:(function(){
        
       var obj= fngetEmpDetails('');  
      var smodel=obj.Result;
   return Math.ceil(smodel.length/this.get('pagelimit'));
}).property('pagelimit'),

 pages: (function() {
    var collection = new Array();
    for(var i = 0; i < this.get('totalpage'); i++) {
      var objArry={number:i+1};
      collection.push(objArry);
    }
    return collection;      
  }).property('totalpage'),

  prevPage: (function() {
    var page = this.get('page');
    var totalPages = this.get('totalpage');
    
    if(page > 1 && totalPages > 1) {
      return page-1;
    } else {
      return null;
    }
  }).property('page', 'totalpage'),
   nextPage: (function() {
    var page = this.get('page');
    var totalPages = this.get('totalpage');
    if(page < totalPages && totalPages > 1) {
      return page+1;
    } else {
      return null;
    }
  }).property('page', 'totalpage'),

  actions: { 
    // aTextChanged:function(){
    //  alert('hi');
    // },
    fnSearchEmp:function(){
       var obj= fngetEmpDetails($("#txtAutoEmp").val()); 
       var NewTotal=Math.ceil(obj.Result.length/this.get('pagelimit'));
       this.set('totalpage',NewTotal);
      if(obj.Result.length <=this.get('pagelimit')){
        //this.set('nextPage',false);
        this.set('page',0);
        this.set('paginatedContent',obj.Result);
      }
      else
      {
          this.set('page',1);
          var start = (this.get('page') - 1) * this.get('pagelimit');
          var last = start + this.get('pagelimit');
          //this.set('nextPage',false);
          this.set('paginatedContent',obj.Result.splice(start,last));
      }
    },
     goToPage:function(number){
          this.set('page',number);
          var obj=fngetEmpDetails($("#txtAutoEmp").val());
          var smodel=obj.Result;
          var start = (this.get('page') - 1) * this.get('pagelimit');
          var last = this.get('pagelimit');
          //console.log(start+','+last);
          this.set('paginatedContent',smodel.splice(start,last));
       },
      selectPrevPage: function() {
          var page = this.get('page');
          var totalPages = this.get('totalpage');
          if(page > 1 && totalPages > 1) {
           this.set('page',page-1);
          }
          else
            this.set('page',1);

        var obj=fngetEmpDetails($("#txtAutoEmp").val());
        var smodel=obj.Result;
          var start = (this.get('page') - 1) * this.get('pagelimit');
          var last = this.get('pagelimit');
          //console.log(start+','+last);
          this.set('paginatedContent',smodel.splice(start,last));
      },
       selectNextPage: function() {
        
        var page = this.get('page');
        var totalPages = this.get('totalpage');
        // console.log('totalpage in next :'+totalPages);
        // console.log('page in next :'+page);

        if(page < totalPages && totalPages > 1) {
           this.set('page',page+1);
         // console.log('next page is true');
        }
        else{
           this.set('page',1);
           //console.log('next page is false');
           }
       var obj=fngetEmpDetails($("#txtAutoEmp").val());
        var smodel=obj.Result;
          var start = (this.get('page') - 1) * this.get('pagelimit');
          var last = this.get('pagelimit');
          //console.log(start+','+last);
          this.set('paginatedContent',smodel.splice(start,last));
      },
    fnSaveEditEmp:function(RID){
      // $("#tbltr"+RID+"").click(function(){
      //   alert(RID);
      // })
      $("#tbltr"+RID+"> td > label").each(function(){
              //debugger;
              //console.log(this.id);
                var id=this.id
                 id= id.replace('lbl','txt');
                 //alert(chng);
                //var chng='<input type="text" class="editableM" id="'+id+'" value="'+$(this).html()+'"/>';
                 if(id=='txtDOJ'+RID || id=='txtDOE'+RID || id=='txtEmpId'+RID )
                   var chng='<input type="text" id="'+id+'" onkeydown="return false" class="editableM" value="'+$(this).html()+'"/>';
                 else
                   var chng='<input type="text" id="'+id+'" class="editableM" value="'+$(this).html()+'"/>';
                    
                $(this).replaceWith(chng);

                if(id=='txtDOJ'+RID || id=='txtDOE'+RID)
                   $("#"+id+"").datepicker();
            });
       $("#btnMSubmit"+RID+"").removeClass('edittxt').addClass('donetxt');
            $("#btnMDone"+RID+"").removeClass('donetxt').addClass('edittxt');

    },
   editMasterDetails:function(RID)
   {
    var  adddetails={RID:1};
      var condition=true;            
            if($("#txtEmpId"+RID+"").val() =='')
            {
              $("#txtEmpId"+RID+"").focus();
              $("#txtEmpId"+RID+"").notify("EmpId canot be empty", { position:"down",arrowShow: true});
              condition=false;
             
            }
            else if($("#txtEmpName"+RID+"").val() =='')
            {
              $("#txtEmpName"+RID+"").focus();
                $("#txtEmpName"+RID+"").notify("EmpName canot be empty", { position:"rigtht",arrowShow: true});
                condition= false;
            }
           
           else if( $("#txtDOJ"+RID+"").val() =='')
            {
               $("#txtDOJ"+RID+"").focus();
               $("#txtDOJ"+RID+"").notify("DOJ canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else if( $("#txtDOE"+RID+"").val() =='')
            {
               $("#txtDOE"+RID+"").focus();
               $("#txtDOE"+RID+"").notify("DOE canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else if($("#txtRole"+RID+"").val() =='')
            {
              $("#txtRole"+RID+"").focus();
               $("#txtRole"+RID+"").notify("Role canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else
            {
              adddetails.Role=$("#txtRole"+RID+"").val().trim();
              adddetails.Emp_Id=$("#txtEmpId"+RID+"").val().trim();
              adddetails.DOE=$("#txtDOE"+RID+"").val().trim();
              adddetails.DOJ=$("#txtDOJ"+RID+"").val().trim();
              adddetails.Emp_Name=$("#txtEmpName"+RID+"").val().trim();


            }
         if(condition==true)
         {
           

           adddetails=JSON.stringify(adddetails);
           //console.log(adddetails);
           var obj=fnsavemasterdetails(adddetails);
           if(obj.Status=='Pass')
           {
              $("#tbltr"+RID+"> td > input").each(function(){
              //debugger;
                    //console.log(this.id);
                       var id=this.id
                       id= id.replace('txt','lbl');
                       var chng='<label class="editableM" id="'+id+'">'+$(this).val()+'</label>';
                      $(this).replaceWith(chng);

                  });
                 $("#btnMDone"+RID+"").removeClass('edittxt').addClass('donetxt');
                 $("#btnMSubmit"+RID+"").removeClass('donetxt').addClass('edittxt');
           }
           bootbox.alert(obj.Message);
        }

   },
   addMasterDetails:function()
   {
    var  adddetails={RID:0};
      var condition=true;            
            if($("#txtEmpId").val() =='')
            {
              $("#txtEmpId").focus();
              $("#txtEmpId").notify("EmpId canot be empty", { position:"down",arrowShow: true});
              condition=false;
             
            }
            else if($("#txtEmpName").val() =='')
            {
              $("#txtEmpName").focus();
                $("#txtEmpName").notify("EmpName canot be empty", { position:"rigtht",arrowShow: true});
                condition= false;
            }
           
           else if( $("#txtDOJ").val() =='')
            {
               $("#txtDOJ").focus();
               $("#txtDOJ").notify("DOJ canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else if( $("#txtDOE").val() =='')
            {
               $("#txtDOE").focus();
               $("#txtDOE").notify("DOE canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else if($("#txtRole").val() =='')
            {
              $("#txtRole").focus();
               $("#txtRole").notify("Role canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else
            {
              adddetails.Role=$("#txtRole").val().trim();
              adddetails.Emp_Id=$("#txtEmpId").val().trim();
              adddetails.DOE=$("#txtDOE").val().trim();
              adddetails.DOJ=$("#txtDOJ").val().trim();
              adddetails.Emp_Name=$("#txtEmpName").val().trim();


            }
         if(condition==true)
         {
           adddetails=JSON.stringify(adddetails);
           //console.log(adddetails);
            var obj=fnsavemasterdetails(adddetails);
              bootbox.alert(obj.Message);
        }

   },
  addPersonal:function(){
  
     var  adddetails={RID:0};

         var condition=true;
             if($("#txtEmpId").val()=='')
            {
              $("#txtEmpId").focus();
              $("#txtEmpId").notify("EmpId canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
            }
           else if($("#txtPAddr1").val()=='')
            {
              $("#txtPAddr1").focus();
              $("#txtPAddr1").notify("Addr1 canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtPAddr2").val()=='')
            {
              $("#txtPAddr2").focus();
              $("#txtPAddr2").notify("Addr2 canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtPCity").val()=='')
            {
              $("#txtPCity").focus();
              $("#txtPCity").notify("City canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPCountry").val()=='')
            {
              $("#txtPCountry").focus();
              $("#txtPCountry").notify("Country canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPZIP").val()=='')
            {
              $("#txtPZIP").focus();
              $("#txtPZIP").notify("ZIP canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPDOB").val()=='')
            {
              $("#txtPDOB").focus();
              $("#txtPDOB").notify("DOB canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtBlood").val()=='')
            {
              $("#txtBlood").focus();
              $("#txtBlood").notify("Blood canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPEmail").val()=='')
            {
              $("#txtPEmail").focus();
              $("#txtPEmail").notify("Email canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPMobile").val()=='')
            {
              $("#txtPMobile").focus();
              $("#txtPMobile").notify("Mobile canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
           else
           {
                adddetails.Emp_Rid=$("#txtEmpId").val().trim();
                 adddetails.Addr1=$("#txtPAddr1").val().trim();
                 adddetails.Addr2=$("#txtPAddr2").val().trim();
                 adddetails.City=$("#txtPCity").val().trim();    
                 adddetails.Country=$("#txtPCountry").val().trim();
                 adddetails.ZIP=$("#txtPZIP").val().trim();
                 adddetails.DOB=$("#txtPDOB").val().trim();
                 adddetails.Blood=$("#txtBlood").val().trim();
                 adddetails.Email=$("#txtPEmail").val().trim();
                 adddetails.Mobile=$("#txtPMobile").val().trim();

           }
            
            
             //  var id=this.id;
             // id= id.replace('txt','lbl');
             // var chng='<label class="editableP" id="'+id+'">'+$(this).val()+'</label>';
             // $(this).replaceWith(chng);
   if(condition==true)
         {
          adddetails=JSON.stringify(adddetails);
          //console.log(adddetails);
          var obj= fnsavepersonaldetails(adddetails);
             bootbox.alert(obj.Message);
         }
  },
  addOfficial:function(){
 
    var  adddetails={RID:0};
     var condition=true;
             if($("#txtEmpId").val()=='')
            {
              $("#txtEmpId").focus();
              $("#txtEmpId").notify("EmpId canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
            }
           else if($("#txtOAddr1").val()=='')
            {
              $("#txtOAddr1").focus();
              $("#txtOAddr1").notify("Addr1 canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtOAddr2").val()=='')
            {
              $("#txtOAddr2").focus();
              $("#txtOAddr2").notify("Addr2 canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtOCity").val()=='')
            {
              $("#txtOCity").focus();
              $("#txtOCity").notify("City canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtOCountry").val()=='')
            {
              $("#txtOCountry").focus();
              $("#txtOCountry").notify("Country canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtOZIP").val()=='')
            {
              $("#txtOZIP").focus();
              $("#txtOZIP").notify("ZIP canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtOZIP").val()=='')
            {
              $("#txtOZIP").focus();
              $("#txtOZIP").notify("ZIP canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
                  
              else if($("#txtOWorkPhone").val()=='')
            {
              $("#txtOWorkPhone").focus();
              $("#txtOWorkPhone").notify("WorkPhone canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }  
               else if($("#txtOWorkExt").val()=='')
            {
              $("#txtOWorkExt").focus();
              $("#txtOWorkExt").notify("WorkExt canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            } 
              else if($("#txtOEmail").val()=='')
            {
              $("#txtOEmail").focus();
              $("#txtOEmail").notify("Email canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }     
            else
            {
                 adddetails.Emp_Rid=$("#txtEmpId").val().trim();
                 adddetails.Addr1=$("#txtOAddr1").val().trim();
                 adddetails.Addr2=$("#txtOAddr2").val().trim();
                 adddetails.City=$("#txtOCity").val().trim();    
                 adddetails.Country=$("#txtOCountry").val().trim();
                 adddetails.ZIP=$("#txtOZIP").val().trim();
                 adddetails.Email=$("#txtOEmail").val().trim();
                 adddetails.WorkPhone=$("#txtOWorkPhone").val().trim();
                 adddetails.WorkExt=$("#txtOWorkExt").val().trim();

            }
            if(condition==true)
            {
         
             adddetails=JSON.stringify(adddetails);
             var obj=fnsaveofficialdetails(adddetails);
             bootbox.alert(obj.Message);
            } 

      }
    }
});

App.InsertController = Ember.ObjectController.extend({
  actions: { 
    goHome:function(){
     this.transitionToRoute('employees')
    },
     emailCheck: function(){
      //console.log('Coming');
      if(validator.isEmail($("#txtEmail").val()) && !(validator.isNull($("#txtEmail").val())))
      {
       // console.log('satisfy');
        var data={email:$("#txtEmail").val()};
        //console.log(data);
        data=JSON.stringify(data);
        var obj=FnduplicateEmail(data);
           if(obj !=null)
           {
            //console.log(obj);
              if(obj.Status=='Fail')
              {
                $("#txtEmail").notify(obj.Message,{ position:"rigtht",arrowShow: true,className:"error"});
                 $("#txtEmail").val("");
                 $("#txtEmail").focus();
              }
              else
                $("#txtEmail").notify(obj.Message,{ position:"rigtht",arrowShow: true,className:"success"});
           } 
      }
      else
      {
        
           if(!(validator.isEmail($("#txtEmail").val())) || validator.isNull($("#txtEmail").val()))
           {
             $("#txtEmail").notify("Enter a valid email", { position:"rigtht",arrowShow: true});
           }
        return null; 
      }
     
    },
    doneAdding: function() {
      //console.log('coming insert')
    
          if(validator.isNull($("#txtFirstName").val()))
          {
            $("#txtFirstName").notify("firstname canot be empty", { position:"rigtht",arrowShow: true});
            $("#txtFirstName").focus();
          }
          else if(validator.isNull($("#txtDOJ").val()) || !(validator.isDate($("#txtDOJ").val())))
          {
            $("#txtDOJ").notify("enter a valid date", { position:"rigtht",arrowShow: true});
            $("#txtDOJ").focus();
          }
          else if(validator.isNull($("#txtBirthDate").val()) || !(validator.isDate($("#txtBirthDate").val())))
          {
             $("#txtBirthDate").notify("enter a valid date", { position:"rigtht",arrowShow: true});
             $("#txtBirthDate").focus();
          }

          else if(validator.isNull($("#txtEmail").val()) || !(validator.isEmail($("#txtEmail").val())))
          {
               $("#txtEmail").notify("enter valid email", { position:"rigtht",arrowShow: true});
               $("#txtEmail").focus();

          }
          else
          {
            var data={employee_name:$("#txtFirstName").val(),doj:$("#txtDOJ").val(),srsemail:$("#txtEmail").val(),dob:$("#txtBirthDate").val()};
            //console.log(data);
            data=JSON.stringify(data);
            var obj=FnAddEmployee(data);
            //console.log(obj);
               if(obj !=null)
                 bootbox.alert(obj.Message);
                 
                 //alert(obj.Message);
          
           this.transitionToRoute('employees'); 
          }
    }
  }
});

App.EmployeesController = Ember.ObjectController.extend({
  //needs:['home'],
  page:10,
  isAuthor:true,
  isAdmin:(function(){
   //var obj=FngetUserType();
  // var Obj=this.strore.find('login');
   //var obj=FngetUserType();
   //var obj=getCookie('usertype');
   //var obj=getSession('usertype');
   //var Session = App.Storage.create({});
   var obj=getSession('usertype');
   console.log(obj);
   if(obj !=null)
   {
     if(obj=='A')
       return true;
     else
       return false;
   }
   else 
     return false;
  }).property(),
 //  isAuthor:(function(){
 //   var home= this.get('controllers.home');
 //   alert(home.get('isAdmin'));
 //   return home.get('isAdmin');
 //  // var utype=getCookie("usertype");
 //  // alert(utype);
 //  // if(utype=='A')
 //  //    return true;
 //  //  else 
 //  //    return false
 // }).property(),
 actions:{
  deleteEmployee:function(Emp_Rid){

    bootbox.confirm("Are you sure ??", function(result) {
       if(result)
       {

           var data={tbl:'M_EmployeeDetails',Emp_Rid:Emp_Rid};
          data=JSON.stringify(data);
          var obj=fnDeleteEmployeePerOff(data);
          if(obj.Status=='Pass')
          {
            clearSession();
            this.transitionToRoute('login');
          }
          bootbox.alert(obj.Message);

        }
   });
  },
  deletePersonal:function(Emp_Rid){

    bootbox.confirm("Are you sure ??", function(result) {
       if(result)
       {
          var data={tbl:'M_Personal',Emp_Rid:Emp_Rid};
        data=JSON.stringify(data);
       var obj=fnDeleteEmployeePerOff(data);
        bootbox.alert(obj.Message);

        }
   });
  }, 
  deleteOfficial:function(Emp_Rid){
     bootbox.confirm("Are you sure ??", function(result) {
       if(result)
       { 
        var data={tbl:'M_Official',Emp_Rid:Emp_Rid};
        data=JSON.stringify(data);
       var obj=fnDeleteEmployeePerOff(data);
        bootbox.alert(obj.Message);

        }
   });
  },
  doneEditing:function(){

     var  adddetails={RID:1};
      var condition=true;            
            if($("#txtEmpId").val().trim() =='')
            {
              $("#txtEmpId").focus();
              $("#txtEmpId").notify("EmpId canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
             
            }
            else if($("#txtEmpName").val().trim() =='')
            {
              $("#txtEmpName").focus();
                $("#txtEmpName").notify("EmpName canot be empty", { position:"rigtht",arrowShow: true});
                condition= false;
            }
           
           else if( $("#txtDOJ").val().trim() =='')
            {
              $("#txtDOJ").focus();
               $("#txtDOJ").notify("DOJ canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else if( $("#txtDOE").val().trim() =='')
            {
               $("#txtDOE").focus();
               $("#txtDOE").notify("DOE canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else if($("#txtRole").val().trim() =='')
            {
               $("#txtDOE").focus();
               $("#txtRole").notify("Role canot be empty", { position:"rigtht",arrowShow: true});
               condition= false;
               
            }
            else
            {
              adddetails.Role=$("#txtRole").val().trim();
              adddetails.Emp_Id=$("#txtEmpId").val().trim();
              adddetails.DOE=$("#txtDOE").val().trim();
              adddetails.DOJ=$("#txtDOJ").val().trim();
              adddetails.Emp_Name=$("#txtEmpName").val().trim();


            }
         if(condition==true)
         {
           adddetails=JSON.stringify(adddetails);
           console.log(adddetails);
            var obj=fnsavemasterdetails(adddetails);
              if(obj.Status=='Pass')
              {
                   $(".editableM").each(function () {
                      var id=this.id;
                      id= id.replace('txt','lbl');
                      var chng='<label class="editableM" id="'+id+'">'+$(this).val()+'</label>';
                      $(this).replaceWith(chng);
                 });
                  $("#btnMDone").removeClass('edittxt').addClass('donetxt');
                  $("#btnMSubmit").removeClass('donetxt').addClass('edittxt');
                
              }
              bootbox.alert(obj.Message);
        }
  },
  doneEditingPersonal:function(){
   var  adddetails={RID:1};

         var condition=true;
         //alert($("#lblEmpId").html());

            if(typeof $("#lblEmpId").html() =='undefined')
            {
              $.notify("Save employee details first", { position:"rigtht",arrowShow: true});
              condition=false;
            }
           else if($("#txtPAddr1").val().trim()=='')
            {
              $("#txtPAddr1").focus();
              $("#txtPAddr1").notify("Addr1 canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtPAddr2").val().trim()=='')
            {
              $("#txtPAddr2").focus();
              $("#txtPAddr2").notify("Addr2 canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtPCity").val().trim()=='')
            { 
              $("#txtPCity").focus();
              $("#txtPCity").notify("City canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPCountry").val().trim()=='')
            {
              $("#txtPCountry").focus();
              $("#txtPCountry").notify("Country canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPZIP").val().trim()=='')
            {
              $("#txtPZIP").focus();
              $("#txtPZIP").notify("ZIP canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPDOB").val().trim()=='')
            { 
              $("#txtPDOB").focus();
              $("#txtPDOB").notify("DOB canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtBlood").val().trim()=='')
            {
              $("#txtBlood").focus();
              $("#txtBlood").notify("Blood canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPEmail").val().trim()=='')
            {
              $("#txtPEmail").focus();
              $("#txtPEmail").notify("Email canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtPMobile").val().trim()=='')
            {
              $("#txtPMobile").focus();
              $("#txtPMobile").notify("Mobile canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
           else
           {
                adddetails.Emp_Rid=$("#lblEmpId").html().trim();
                 adddetails.Addr1=$("#txtPAddr1").val().trim();
                 adddetails.Addr2=$("#txtPAddr2").val().trim();
                 adddetails.City=$("#txtPCity").val().trim();    
                 adddetails.Country=$("#txtPCountry").val().trim();
                 adddetails.ZIP=$("#txtPZIP").val().trim();
                 adddetails.DOB=$("#txtPDOB").val().trim();
                 adddetails.Blood=$("#txtBlood").val().trim();
                 adddetails.Email=$("#txtPEmail").val().trim();
                 adddetails.Mobile=$("#txtPMobile").val().trim();

           }
  
       if(condition==true)
             {
              adddetails=JSON.stringify(adddetails);
              console.log(adddetails);
              var obj= fnsavepersonaldetails(adddetails);
              if(obj.Status=='Pass')
              {
                    $(".editableP").each(function () {
                      var id=this.id;
                      id= id.replace('txt','lbl');
                      var chng='<label class="editableP" id="'+id+'">'+$(this).val()+'</label>';
                      $(this).replaceWith(chng);
                 });
                 $("#btnPDone").removeClass('edittxt').addClass('donetxt');
                 $("#btnPSubmit").removeClass('donetxt').addClass('edittxt');


              }
                 bootbox.alert(obj.Message);
            }
     
  },
  doneEditingOfficial:function(){
 
         
         var  adddetails={RID:1};
     var condition=true;
     
            if(typeof $("#lblEmpId").html() =='undefined')
            {
              $.notify("Save employee details first", { position:"rigtht",arrowShow: true});
              condition=false;
            }
          
           else if($("#txtOAddr1").val().trim()=='')
            {
              $("#txtOAddr1").focus();
              $("#txtOAddr1").notify("Addr1 canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtOAddr2").val().trim()=='')
            {
              $("#txtOAddr2").focus();
              $("#txtOAddr2").notify("Addr2 canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
            else if($("#txtOCity").val().trim()=='')
            {
              $("#txtOCity").focus();
              $("#txtOCity").notify("City canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
             else if($("#txtOCountry").val().trim()=='')
            {
              $("#txtOCountry").focus();
              $("#txtOCountry").notify("Country canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
          
             else if($("#txtOZIP").val().trim()=='')
            {
              $("#txtOZIP").focus();
              $("#txtOZIP").notify("ZIP canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }
                  
            else if($("#txtOWorkPhone").val().trim()=='')
            {
              $("#txtOWorkPhone").focus();
              $("#txtOWorkPhone").notify("WorkPhone canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }  
            else if($("#txtOWorkExt").val().trim()=='')
            {
              $("#txtOWorkExt").focus();
              $("#txtOWorkExt").notify("WorkExt canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            } 
              else if($("#txtOEmail").val().trim()=='')
            {
              $("#txtOEmail").focus();
              $("#txtOEmail").notify("Email canot be empty", { position:"rigtht",arrowShow: true});
              condition=false;
              
            }     
            else
            {
                 adddetails.Emp_Rid=$("#lblEmpId").html().trim();
                 adddetails.Addr1=$("#txtOAddr1").val().trim();
                 adddetails.Addr2=$("#txtOAddr2").val().trim();
                 adddetails.City=$("#txtOCity").val().trim();    
                 adddetails.Country=$("#txtOCountry").val().trim();
                 adddetails.ZIP=$("#txtOZIP").val().trim();
                 adddetails.Email=$("#txtOEmail").val().trim();
                 adddetails.WorkPhone=$("#txtOWorkPhone").val().trim();
                 adddetails.WorkExt=$("#txtOWorkExt").val().trim();

            }
            if(condition==true)
            {
         
             adddetails=JSON.stringify(adddetails);
             var obj=fnsaveofficialdetails(adddetails);
             if(obj.Status=='Pass')
             {
                 $(".editableO").each(function () {
                      var id=this.id;
                      id= id.replace('txt','lbl');
                      var chng='<label class="editableO" id="'+id+'">'+$(this).val()+'</label>';
                      $(this).replaceWith(chng);
                 });

              $("#btnODone").removeClass('edittxt').addClass('donetxt');
              $("#btnOSubmit").removeClass('donetxt').addClass('edittxt');
             }
             bootbox.alert(obj.Message);
            } 
             
  },
  fnEditMaster:function(obj){
    console.log(obj);
    obj.src="Images/Save.png";

  }
 }
});

App.LoginController = Ember.ObjectController.extend({
//needs:['home'], 
  isAdmin:(function(){
   //var obj=FngetUserType();
    //var Obj=this.strore.find('login');
  // var obj=FngetUserType();
   //var obj=getCookie('usertype');
   var obj=getSession('usertype');
   // var Session = App.Storage.create({});
   // var obj=Session.getSession('usertype');
   console.log(obj);
   if(obj !=null)
   {
     if(obj=='A')
       return true;
     else
       return false;
   }
   else 
     return false;
  }).property(),
//isAdmin:false,
actions: { 
      fnLogin: function() {
        try{
          
         if(!(validator.isNull($("#txtUserName").val())) && !(validator.isNull($("#txtPassword").val())))
         {
          var data={RID:0,UserName:$("#txtUserName").val(),Password:$("#txtPassword").val()};
          data=JSON.stringify(data);
          
          var obj=FnLogin(data);
            //console.log(obj);
          if(obj!=null && obj.Status=='Fail')
             bootbox.alert(obj.Message);
          else
          {
          console.log('username',obj.Result.Emp_name);
            var UserType=obj.Result.UserType;
            setSession('Emp_Rid',obj.Result.Emp_Rid);
            setSession('username',obj.Result.Emp_name);
             if(UserType=='A')
             {
                setSession('usertype','A');
             }
              else
              {
                 setSession('usertype','U');
              }
             this.transitionToRoute('welcome');     
          }

         }
         else
         {
            if(validator.isNull($("#txtUserName").val()))
            {
             $("#txtUserName").notify("Username canot be empty", { position:"rigtht",arrowShow: true});
             $("#txtUserName").focus();
            }
            else
            {
             $("#txtPassword").notify("Password canot be empty", { position:"rigtht",arrowShow: true});
             $("#txtPassword").focus();
            }
  

         }

      }
      catch(ex)
        {
          alert(ex.message);
          bootbox.alert("Server not found");
        }
  }
}
});

App.UploadController=Ember.ObjectController.extend({
   actions:{
     goHome:function(){
     this.transitionToRoute('employees');
     return false;
    },
    doneUpload:function(){
      try
        {
          
          var url = document.getElementById('txtFile').value;
          var oReq = new XMLHttpRequest();
          oReq.open("GET", url, true);
          oReq.responseType = "arraybuffer";
           var result = {};

          oReq.onload = function(e) {
            var arraybuffer = oReq.response;
           
            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
           
            /* Call XLS */
            var workbook = XLS.read(bstr, {type:"binary"});
            //console.log('workbook');
            //console.log(workbook);
             
            workbook.SheetNames.forEach(function(sheetName) {
               // alert(sheetName)
                var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if(roa.length > 0){
                  result[sheetName] = roa;
                }
              });
            var insertobj={contacts:result.contact};
            insertobj=JSON.stringify(insertobj)
           // console.log(insertobj);
            //alert(insertobj);
            var obj=FnEmployeeBulkInsert(insertobj);
            if(obj !=null)
                bootbox.alert(obj.Message);

           }
         oReq.send();

         this.transitionToRoute('employees');
         
       }
       catch(ex)
         {
          console.log(ex.message)
         }
    }
   }
});


App.HomeController=Ember.ObjectController.extend({
  EmployeeName:(function(){
    var obj=getSession('username');
    //console.log('Username',obj);
    return obj;
  }).property(),
  isAdmin:(function(){
   var obj=getSession('usertype');
   //alert(obj.UserType);
   if(obj !=null)
   {
     if(obj=='A')
       return true;
     else
       return false;
   }
   else 
     return false;
  }).property(),
  actions:{
    fnLogout:function(){
      console.log('calling fnlogout');
      //var usn= getCookie("username");
      var usn= getSession('username');
      console.log(usn);
      var data={RID:1,UserName:usn,Password:123};
          data=JSON.stringify(data);
      var obj=FnLogin(data);
      if(obj!=null && obj.Status=='Pass')
      {
         //deleteAllCookies();
         clearSession();
         this.transitionToRoute('login');
         //this.store.deleteRecord(UserInfo);
      }
    }

  }
});


App.EducationController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage: 2,
     actions: {

       editemployeeeducation:function(params)
      {

          var dynamicid=params.RID;
          var editableclass="editable"+dynamicid;

          $("#editchanges"+dynamicid+"").css("display", "none");
          $("#savechanges"+dynamicid+"").css("display", "block");
          
              
         $("."+editableclass+"").each(function (index) {
           var textval=$(this).text();

             if(index == 2 || index == 3) 
              {
                 var random= Math.random();
                     random=random.toString().split(".");
                     random=random[1]; 

                 $(this).replaceWith("<input type='text' style='width:150px;' class='"+editableclass+"' id='datepickerid"+random+"' value='"+textval+"'>" );
                 $("#datepickerid"+random+"").datepicker();
              }
              else
               {
                  $(this).replaceWith("<input type='text' style='width:150px;' class='"+editableclass+"' value='"+textval+"'>" );
               }       

         }); 
  
      },
      saveemployeeeducation:function(params)
      {
         var adddetails={};

          var dynamicid=params.RID;
          var Emp_Rid=params.Emp_Rid;
          var editableclass="editable"+dynamicid;
          adddetails.Emp_Rid=Emp_Rid;
          adddetails.RID="1";
          
         $("."+editableclass+"").each(function (index) {
            
            if(index == 0)
            {
              adddetails.Subject=$(this).val();
            }
            if(index == 1)
            {
               adddetails.Board=$(this).val();    
            }
            if(index == 2)
            {
               adddetails.Dfrom=$(this).val();
            }
            if(index == 3)
            {
               adddetails.Dto=$(this).val();
            }
            if(index == 4)
            {
               adddetails.Percentage=$(this).val();
            }
            
            var value=$(this).val();
       
           $(this).replaceWith("<label class='"+editableclass+"'>"+value+"</label>");

         });

    if((validator.isNull( adddetails.Subject)) || (validator.isNull(adddetails.Board)) || (validator.isNull(adddetails.Dfrom)) || (validator.isNull(adddetails.Dto)) || (validator.isNull(adddetails.Percentage)))
     {
         alert("please enter the required fields");
     }
     else
     {
       adddetails=JSON.stringify(adddetails);
       console.log(adddetails);
      var obj= saveeducationdetails(adddetails);
      if(obj.Status=='Pass')
      {
             $("#editchanges"+dynamicid+"").css("display", "block");
             $("#savechanges"+dynamicid+"").css("display", "none");   
      }
      bootbox.alert(obj.Message);

     }

      },
      addemployeeeducation:function()
      {
       $("#neweducationrecord").css('display','table-row');
       $("#addemployeefrom").datepicker();
       $("#addemployeeto").datepicker();
      },
      addemployeeeducationdetails:function()
      {
         var adddetails={};

         var subject=$("#addemployeesubject").val();
         var board=$("#addemployeeboard").val();
         var from=$("#addemployeefrom").val();
         var to=$("#addemployeeto").val();
         var percentage=$("#addemployeepercentage").val();

         var Emp_Rid=getSession('Emp_Rid');
         adddetails.RID="0";
         adddetails.Emp_Rid=Emp_Rid;
         adddetails.Subject=subject;
         adddetails.Board=board;
         adddetails.Dfrom=from;
         adddetails.Dto=to;
         adddetails.Percentage=percentage;
         
       if((validator.isNull($("#addemployeesubject").val())) || (validator.isNull($("#addemployeeboard").val())) || (validator.isNull($("#addemployeefrom").val())) || (validator.isNull($("#addemployeeto").val())) || (validator.isNull($("#addemployeepercentage").val())))
       {

            alert("Please enter the required fields");
       }
       else
       {
         adddetails=JSON.stringify(adddetails);
          var obj= saveeducationdetails(adddetails);
         if(obj.Status=='Pass')
          {
            $("#addemployeesubject,#addemployeeboard,#addemployeefrom,#addemployeeto,#addemployeepercentage").val("");   
            $("#neweducationrecord").css('display','table-column-group'); 
          } 

       }
        
      
      },
      canceladdemployeeeducationdetails:function()
      {
        $("#neweducationrecord").css('display','table-column-group');
      },
      deleteemployeeeducation:function(params)
      {
          var adddetails={};

          var Subject=params.Subject;
          var Rid=params.Rid;

          adddetails.Subject=Subject;
          adddetails.Rid=Rid;
          adddetails=JSON.stringify(adddetails);

          var obj=fndeleteeducationdetails(adddetails); 
          bootbox.alert(obj.Message);
      }
     }
   });

