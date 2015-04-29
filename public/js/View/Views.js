
App.EditEmployeeView = Ember.View.extend({ 
 didInsertElement: function() {
      $( "#imgMasterUpdown" ).click(function() {
             
          $( "#DivMaster" ).slideToggle( "slow", function() {
              // Animation complete.
            });
             var imgName= $(this).attr('src');
             if(imgName=='Images/downarrow.png')
               $(this).attr('src','Images/uparrow.png');
             else
                $(this).attr('src','Images/downarrow.png');  
          });

           $( "#imgOffUpdown" ).click(function() {
             
          $( "#DivOfficial" ).slideToggle( "slow", function() {
              // Animation complete.
            });
             var imgName= $(this).attr('src');
             if(imgName=='Images/downarrow.png')
               $(this).attr('src','Images/uparrow.png');
             else
                $(this).attr('src','Images/downarrow.png');  
          });

             $( "#imgPerUpdown" ).click(function() {
             
          $( "#DivPersonal" ).slideToggle( "slow", function() {
              // Animation complete.
            });
             var imgName= $(this).attr('src');
             if(imgName=='Images/downarrow.png')
               $(this).attr('src','Images/uparrow.png');
             else
                $(this).attr('src','Images/downarrow.png');  
          });

         
      // portion for button edit
      //Submit master edit converting labe to textbox starts
            $("#btnMSubmit").click(function(){
            $(".editableM").each(function(){
              //debugger;
                var id=this.id;
                 id= id.replace('lbl','txt');
                 //alert(chng);
                //var chng='<input type="text" class="editableM" id="'+id+'" value="'+$(this).html()+'"/>';
                 if(id=='txtDOJ' || id=='txtDOE' || id=='txtEmpId')
                   var chng='<input type="text" onkeydown="return false" class="editableM" id="'+id+'" value="'+$(this).html()+'"/>';
                 else
                   var chng='<input type="text" class="editableM" id="'+id+'" value="'+$(this).html()+'"/>';
                    
                $(this).replaceWith(chng);

                if(id=='txtDOJ' || id=='txtDOE')
                   $("#"+id+"").datepicker();
               
            });
            $(this).removeClass('edittxt').addClass('donetxt');
            $("#btnMDone").removeClass('donetxt').addClass('edittxt');
         return false;
        });
 //Submit master edit converting labe to textbox ends here

 //Submit Personal edit converting labe to textbox starts
         $("#btnPSubmit").click(function(){
            $(".editableP").each(function(){
                var id=this.id;
                 id= id.replace('lbl','txt');
                 var chng='<input type="text" class="editableP" id="'+id+'" value="'+$(this).html()+'"/>';
                 //alert(chng);
                $(this).replaceWith(chng);

                if(id=='txtPDOB')
                   $("#"+id+"").datepicker();
            });
            $(this).removeClass('edittxt').addClass('donetxt');
            $("#btnPDone").removeClass('donetxt').addClass('edittxt');
         return false;
        });
  //Submit personal edit converting labe to textbox end

  //Submit Personal edit converting labe to textbox starts
         $("#btnOSubmit").click(function(){
            $(".editableO").each(function(){
                var id=this.id;
                 id= id.replace('lbl','txt');
                 var chng='<input type="text" class="editableO" id="'+id+'" value="'+$(this).html()+'"/>';
                 //alert(chng);
                $(this).replaceWith(chng);
            });
            $(this).removeClass('edittxt').addClass('donetxt');
            $("#btnODone").removeClass('donetxt').addClass('edittxt');
         return false;
        });
  }
});


App.AddEmployeeView = Ember.View.extend({ 
 didInsertElement: function() {
  $("#txtDOJ").datepicker();
  $("#txtDOE").datepicker();
  $("#txtPDOB").datepicker();

  $( "#imgMasterUpdown" ).click(function() {
             
          $( "#DivMaster" ).slideToggle( "slow", function() {
              // Animation complete.
            });
             var imgName= $(this).attr('src');
             if(imgName=='Images/downarrow.png')
               $(this).attr('src','Images/uparrow.png');
             else
                $(this).attr('src','Images/downarrow.png');  
          });

           $( "#imgEditUpdown" ).click(function() {
             
          $( "#DivEditMaster" ).slideToggle( "slow", function() {
              // Animation complete.
            });
             var imgName= $(this).attr('src');
             if(imgName=='Images/downarrow.png')
               $(this).attr('src','Images/uparrow.png');
             else
                $(this).attr('src','Images/downarrow.png');  
          });
         
          $("#txtAutoEmp").autocomplete({ 
            //source:['a','ab'],
              source: function(request,response){
                var data={EmpName:$("#txtAutoEmp").val()};
                data=JSON.stringify(data);
                FnGetEmpByEmp(data,request,response);
              },
              select:function(event, ui){
               console.log(ui.item.value);
              },
            minLength:1
           });

          ;
          //    $( "#imgPerUpdown" ).click(function() {
             
          // $( "#DivPersonal" ).slideToggle( "slow", function() {
          //     // Animation complete.
          //   });
          //    var imgName= $(this).attr('src');
          //    if(imgName=='Images/downarrow.png')
          //      $(this).attr('src','Images/uparrow.png');
          //    else
          //       $(this).attr('src','Images/downarrow.png');  
          // });

    }
 });

App.AdminCheckView = Ember.View.extend({ 
didInsertElement:function(){
   //var cookie=getCookie('usertype');
   //var cookie=getSession('usertype');
    //var Session = App.Storage.create({});
    var cookie=getSession('usertype');
   //alert(cookie);
   if(cookie=='A')
   {
    $("#hypAdmin").css('display','block');
   }
  else
     $("#hypAdmin").css('display','none');

  }
})

App.UserNameView=Ember.View.extend({
  didInsertElement:function(){
      var obj=getSession('username');
      $("#spnUserName").html('Welcome '+obj)
     
  }
})