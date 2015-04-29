function setCookie(cname, cvalue, expMin) {
      
    var d = new Date();
    d.setTime(d.getTime() + (expMin*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function setSession(cname, cvalue) {
      
    localStorage.setItem(cname,cvalue);
    //alert(localStorage.getItem(cname));
    // var d = new Date();
    // d.setTime(d.getTime() + (10*24*60*60*1000));
    // var expires = "expires="+d.toUTCString();
    // document.cookie = cname + "=" + cvalue + "; " + expires;
    // var Session = App.Storage.create({});
    // Session.setSession('usertype','A');
}
function getSession(cname) {
      
     return localStorage.getItem(cname);
    //  var name = cname + "=";
    // var ca = document.cookie.split(';');
    // for(var i=0; i<ca.length; i++) {
    //     var c = ca[i];
    //     while (c.charAt(0)==' ') c = c.substring(1);
    //     if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    // }
    // return "";
    // var Session = App.Storage.create({});
    // Session.getSession('usertype');
}
function clearSession() {
      
    localStorage.clear();
    //  var cookies = document.cookie.split(";");
    // var Session = App.Storage.create({});
    // Session.clearStorage();

    // for (var i = 0; i < cookies.length; i++) {
    //   var cookie = cookies[i];
    //   var eqPos = cookie.indexOf("=");
    //   var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    //   window.history.forward();
    //}
}

function getCookie(cname) {
  
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.history.forward();
    }
}

function openExcelFile(strFilePath) {
        try {
            //var workbook = XLS.readFile("/home/srs/Node_Projects/projects/Scheduler_Websample.xls");
 /* set up XMLHttpRequest */
          var url = strFilePath;
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
            
           }

         oReq.send();
         //console.log(result);
         return result;
     
      }
        catch (e) {
            console.log (e.message);
            return e.message
        }
   
}

function FngetEmpById(Emp_Rid){
    try
    { 
      var obj = $.ajax({
                url: 'http://localhost:3000/getEmpById/'+Emp_Rid,
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

 function FngetEduById(Emp_Rid){
    try
    { 
      var obj = $.ajax({
                url: 'http://localhost:3000/getEduById/'+Emp_Rid,
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };


function FngetEmployees(){
    try
    { 
      var obj = $.ajax({
                url: 'http://localhost:3000/GetEmployee',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };
function FngetUserType()
{
    try
    { 
      var obj = $.ajax({
                url: 'http://localhost:3000/getUserType',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }
  }


function FngetEmployeesNames(){
    try
    { 
      var obj = $.ajax({
                url: 'http://localhost:3000/GetEmployeeNames',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };


  function FnEmployeeBulkInsert(data){
    try
    { 
      var obj = $.ajax({
                url: 'http://localhost:3000/bulkInsert',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                async:false,
                data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };
    function fnDeleteEmployeePerOff(data){
    try
    { 
      console.log(data);
      var obj = $.ajax({
                url: 'http://localhost:3000/deleteDetails',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                async:false,
                data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

  function FnsearchByName(data){
    try
    { 
      console.log(data);
      console.log(JSON.parse(data).employee_name);
      var tst;
      if(JSON.parse(data).employee_name=='')
         tst="All";
       else
         tst=JSON.parse(data).employee_name;
      var obj = $.ajax({
                url: 'http://localhost:3000/GetEmployeeByName/'+tst,
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');

                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      console.log(obj.responseJSON);
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };
   function FngetEmployeeById(employee_id){
    try
    { 
      var obj = $.ajax({
                url: "http://localhost:3000/GetEmployeeById/"+employee_id,
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      console.log(obj);
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

function FnLogin(data){
    try
    { 
         var obj = $.ajax({
                url: "http://localhost:3000/loginout",
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                async:false,
                data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log(data);
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };
   
function Fnduplicate(data){
    try
    { 

         var obj = $.ajax({
                url: "http://localhost:3000/duplicateBlogger",
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                async:false,
                data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log(data);
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

   function FnAddEmployee(data){
    try
    { 

         var obj = $.ajax({
                url: "http://localhost:3000/addEmployee",
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                async:false,
                data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log(data);
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };
   
function FnduplicateEmail(data){
    try
    { 

         var obj = $.ajax({
                url: "http://localhost:3000/duplicateEmail",
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                async:false,
                data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log(data);
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

function FngetPostsById(post_id){
    try
    { 
      var obj = $.ajax({
                url: "http://localhost:3000/GetBloggerById/"+post_id,
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };
   function FnDeletePosts(post_id){
    try
    { 
      var obj = $.ajax({
                url: "http://localhost:3000/deleteBlogger/"+post_id,
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log(data);
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

   function FnDeleteEmployee(post_id){
    try
    { 
      var obj = $.ajax({
                url: "http://localhost:3000/deleteEmployee/"+post_id,
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log(data);
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      console.log(obj);
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

function FngetPosts(){
    try
    { 
      var obj = $.ajax({
                url: 'http://localhost:3000/getBlogger',
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json',
                async:false,
                //data: data,
                success: function( data, textStatus, jQxhr ){
                  //callback false implies no error 
                  console.log('sucesss');
                  //calback(false,data)
                 // return data;
                },

                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    bootbox.alert('Server not found');
                    //callback true implies error happened
                    //calback(true,errorThrown.description);
                    //return errorThrown;
                }
            }); 
      return obj.responseJSON;

    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

function FnUpdatePosts(data){
    try
    { 

         var obj= $.ajax({
              type: "POST",
              url:"http://localhost:3000/saveBlogger" ,
              data: data,
              contentType: "application/json",
              dataType:"json", 
              async:false,
              success: function(data){
                console.log(data);
               // alert(data);
              }
            }); 
          return obj.responseJSON;
    }
    catch(ex)
    { 
      console.log(ex)
    }

   };
   function FnUpdateEmployee(data){
    try
    { 

         var obj= $.ajax({
              type: "POST",
              url:"http://localhost:3000/editEmployee" ,
              data: data,
              contentType: "application/json",
              dataType:"json", 
              async:false,
              success: function(data){
                console.log(data);
               // alert(data);
              }
            }); 
          return obj.responseJSON;
    }
    catch(ex)
    { 
      console.log(ex)
    }

   };
   function FnAddPosts(data){
    try
    { 

         var obj= $.ajax({
              type: "POST",
              url:"http://localhost:3000/addBlogger" ,
              data: data,
              contentType: "application/json",
              dataType:"json", 
              async:false,
              success: function(data){
                console.log(data);
               // alert(data);
              }
            }); 
          return obj.responseJSON;
    }
    catch(ex)
    { 
      console.log(ex)
    }

   };

function saveeducationdetails(data)
   {
    try
    { 

         var obj= $.ajax({
              type: "POST",
              url:"http://localhost:3000/addEditEdu" ,
              data: data,
              contentType: "application/json",
              dataType:"json", 
              async:false,
              success: function(data){
                console.log(data);
               // alert(data);
              }
            }); 
          return obj.responseJSON;
    }
    catch(ex)
    { 
      console.log(ex)
    }
     
    }
    
function fnsavemasterdetails(data)
{
   try
   {

      var obj= $.ajax({
              type: "POST",
              url:"http://localhost:3000/addEditEmp",
              data: data,
              contentType: "application/json",
              dataType:"json", 
              async:false,
              success: function(data){
                console.log(data);
               // alert(data);
              },
               error: function(data) {
                     alert("Msg: "+ data.status + ": " + data.statusText);

                   }
            }); 
      
          return obj.responseJSON;
    }
    catch(ex)
    {
      console.log(ex);
    }

 }

function fnsavepersonaldetails(adddetails)
{
   try{
          console.log(adddetails);
           var obj=  $.ajax ({
                  type: "POST",
                  url:'http://localhost:3000/addEditPer', 
                  data:adddetails,   
                  contentType: "application/json",    
                  dataType:"json",   
                  async:false,         
                 success: function(data) {  
                 console.log(data);
                  },
                 error: function(data) {
                       alert("Msg: "+ data.status + ": " + data.statusText);
                     }                  
            });
          return obj.responseJSON;
     }
     catch(ex)
     {
      console.log(ex);
     }

 }

 function fnsaveofficialdetails(adddetails)
{
    try{
          console.log(adddetails);
           var obj=  $.ajax ({
                  type: "POST",
                  url:'http://localhost:3000/addEditOffc', 
                  data:adddetails,   
                  contentType: "application/json",    
                  dataType:"json",   
                  async:false,         
                 success: function(data) {  
                 console.log(data);
                  },
                 error: function(data) {
                       alert("Msg: "+ data.status + ": " + data.statusText);
                     }                  
            });
          return obj.responseJSON;
     }
     catch(ex)
     {
      console.log(ex);
     }


 }
  function fndeleteeducationdetails(adddetails)
 {

     try
    { 

         var obj= $.ajax({
              type: "POST",
              url:"http://localhost:3000/deleteemployeeeducation" ,
              data: adddetails,
              contentType: "application/json",
              //dataType:"json", 
              async:false,
              success: function(data){
               
                console.log(data);
              }
            }); 
          return obj.responseJSON;
    }
    catch(ex)
    { 
      console.log(ex)
    }

 }
 function fngetEmpDetails(data)
 {
     try
    { 
      
        if(data=='')
        {
           data='All';
           console.log('data',data);
        }
         var obj= $.ajax({
              type: "GET",
              url:"http://localhost:3000/getEmployee/"+data,
              contentType: "application/json",
              dataType:"json",               
              async:false,
              success: function(data){
                console.log(data);
              }
            }); 
         //console.log(obj.responseJSON);
          return obj.responseJSON;
    }
    catch(ex)
    { 
      console.log(ex)
    }

 }

 function FnGetEmpByEmp(data,request,response){
  try
  { 
    
       var obj = $.ajax({
              url: "http://localhost:3000/getEmpByName",
              dataType: 'json',
              type: 'POST',
              contentType: 'application/json',
              async:false,
              data: data,
              success: function( data, textStatus, jQxhr ){
                //callback false implies no error 
                console.log(data);
                response(data.Result);
                //calback(false,data)
               // return data;
              },

              error: function( jqXhr, textStatus, errorThrown ){
                  console.log( errorThrown );
                  //callback true implies error happened
                  //calback(true,errorThrown.description);
                  //return errorThrown;
              }
          }); 
    

  }
  catch(ex)
  { 
    console.log(ex)
  }

 }