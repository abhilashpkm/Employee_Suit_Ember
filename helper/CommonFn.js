

var db=require('../helper/DbConnection');
module.exports ={
   GetEmpNameByNameDetails:function(obj,callback){

    try{
          var query2='select Emp_name from Employee_Db.M_EmployeeDetails where M_EmployeeDetails.Emp_name like'+db.escape(obj.EmpName+'%')+';';
          db.query(query2, function(err, rows, fields) {
            if (err)
                {
                  
                  callback(true,err);

                }
                else
                {
                  var Items=new Array();
                    for(var i in rows)
                    {
                      Items.push(rows[i].Emp_name)
                    }
                    callback(false,Items);
                }
               
          });
            
       }
       catch(ex)
       {
          callback(true,ex);
       }

   },
  fnGetEmployee:function(EmpName, callback){

    try{
          var query1='delete from Employee_Db.M_EmployeeDetails where RID=4';
          var query2='select RID,Emp_Id,DATE_FORMAT(DOJ,'+db.escape('%m/%d/%Y')+') as DOJ,DATE_FORMAT(DOE,'+db.escape('%m/%d/%Y')+') as DOE,Emp_name,Role from Employee_Db.M_EmployeeDetails where M_EmployeeDetails.Emp_name like '+db.escape(EmpName+'%')+';';
          db.query(query2, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
            
       }
       catch(ex)
       {
          callback(true,ex);
       }

   },
   fnGetEmpById:function(Emp_Rid,callback){

    try{
          
          var query2='call Employee_Db.Sp_getEmpById('+db.escape(Emp_Rid)+')';

          db.query(query2, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
            
       }
       catch(ex)
       {
          callback(true,ex);
       }

   },
    fnGetEduById:function(Emp_Rid,callback){

    try{
          
          var query2='select RID,Emp_Rid,Subject,Board,DATE_FORMAT(Dfrom,'+db.escape('%m/%d/%Y')+') as Dfrom,DATE_FORMAT(Dto,'+db.escape('%m/%d/%Y')+') as Dto,Percentage from Employee_Db.M_Education where M_Education.Emp_Rid='+db.escape(Emp_Rid)+';';
          
          console.log(query2);
          db.query(query2, function(err, rows, fields) {
            if (err)
                {
                
                  callback(true,err);

                }
                else
                {
                    
                  
                    callback(false,rows);
                }
               
          });
            
       }
       catch(ex)
       {
          callback(true,ex);
       }

   }
   ,
   fnaddEditEmployee:function(obj,callback){

    try{
          var query='call Employee_Db.Sp_AddEditEmp('+obj.RID+','+db.escape(obj.Emp_Id)+','+
            db.escape(obj.Emp_Name)+','+'STR_TO_DATE('+db.escape(obj.DOJ)+','+db.escape('%m/%d/%Y')+'),'+
            'STR_TO_DATE('+db.escape(obj.DOE)+','+db.escape('%m/%d/%Y')+'),'+db.escape(obj.Role)+');';
            console.log(query);
           db.query(query, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
    }
    catch(ex)
      {
        callback(true,ex);
      }
   },
    fnaddEditPersonal:function(obj,callback){

    try{
          var query='call Employee_Db.Sp_AddEditPer('+obj.RID+','+db.escape(obj.Emp_Rid)+','+
            db.escape(obj.Addr1)+','+db.escape(obj.Addr2)+','+db.escape(obj.City)+','+
            db.escape(obj.Country)+','+db.escape(obj.ZIP)+','+db.escape(obj.Email)
             +','+db.escape(obj.Blood)+','+db.escape(obj.Mobile)+','+
             'STR_TO_DATE('+db.escape(obj.DOB)+','+db.escape('%m/%d/%Y')+')'+');';
            console.log(query);
           db.query(query, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
    }
    catch(ex)
      {
        callback(true,ex);
      }
   },
    fnaddEditOfficial:function(obj,callback){

    try{
          var query='call Employee_Db.Sp_AddEditOff('+obj.RID+','+db.escape(obj.Emp_Rid)+','+
            db.escape(obj.Addr1)+','+db.escape(obj.Addr2)+','+db.escape(obj.City)+','+
            db.escape(obj.Country)+','+db.escape(obj.ZIP)+','+db.escape(obj.Email)+','+
             db.escape(obj.WorkPhone)+','+db.escape(obj.WorkExt)+');';
            console.log(query);
           db.query(query, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
    }
    catch(ex)
      {
        callback(true,ex);
      }
   },
    fnaddEditEducation:function(obj,callback){

    try{
          var query='call Employee_Db.Sp_AddEditEdu('+obj.RID+','+db.escape(obj.Emp_Rid)+','+
            db.escape(obj.Subject)+','+db.escape(obj.Board)+','+'STR_TO_DATE('+db.escape(obj.Dfrom)+','+db.escape('%m/%d/%Y')+')'+','+
            'STR_TO_DATE('+db.escape(obj.Dto)+','+db.escape('%m/%d/%Y')+')'+','+db.escape(obj.Percentage)+');';
            console.log(query);
            db.query(query, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
    }
    catch(ex)
      {
        callback(true,ex);
      }
   },
    fnaddEditSkill:function(obj,callback){

    try{
          var query='call Employee_Db.Sp_AddEditSkil('+obj.RID+','+obj.Emp_Rid+','+
            db.escape(obj.Skill)+','+db.escape(obj.TotalExp)+','+db.escape(obj.RelevantExp)+','+
            db.escape(obj.LastUsed)+');';
            console.log(query);
            db.query(query, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
    }
    catch(ex)
      {
        callback(true,ex);
      }
   },
   fnaddEditExp:function(obj,callback){
    try{
          var query='call Employee_Db.Sp_AddEditExp('+obj.RID+','+obj.Emp_Rid+','+
            db.escape(obj.Company)+','+db.escape(obj.Location)+','+   
            'STR_TO_DATE('+db.escape(obj.Dfrom)+','+db.escape('%m/%d/%Y')+')'+','+
            'STR_TO_DATE('+db.escape(obj.Dto)+','+db.escape('%m/%d/%Y')+'),'+db.escape(obj.Designation)+','+
             db.escape(obj.Contact)+');';
            console.log(query);
            db.query(query, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
    }
    catch(ex)
      {
        callback(true,ex);
      }
   },
   fnDeleteTable:function(obj,callback){
    try{
          var query='call Employee_Db.Sp_DeleteDetails('+db.escape(obj.RID)+','+db.escape(obj.TableName)+');';
            console.log(query);
            db.query(query, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
    }
    catch(ex)
      {
        callback(true,ex);
      }
   },
     fnLoginout:function(obj,callback){
    try{
          var query='call Employee_Db.Sp_LoginLogout('+obj.RID+','+db.escape(obj.UserName)+','+db.escape(obj.Password)+');';
            console.log(query);
            db.query(query, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                  
                    callback(false,rows);
                }
               
          });
    }
    catch(ex)
      {
        callback(true,ex);
      }
   },
    GetEducationDetails:function(callback){
   try{
          var query1='select * from Employee_Db.M_Education';
          //var query2='select * from Employee_Db.M_EmployeeDetails';

          db.query(query1, function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,rows);
                }
               
          });
            
       }
       catch(ex)
       {
          callback(true,ex);
       }

   
 },
 fndeleteemployeeeducation:function(details,callback){
   try{

        var query1='delete from Employee_Db.M_Education where Emp_Rid=? and Subject=?';
          
          db.query(query1,[details.Rid,details.Subject], function(err, rows, fields) {
            if (err)
                {
                  callback(true,err);

                }
                else
                {
                    callback(false,200);
                }
               
          });
         
       }
       catch(ex)
       {
          callback(true,ex);
       }

   
 }
 }
 