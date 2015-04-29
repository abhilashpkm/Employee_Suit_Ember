var express = require('express');
var router = express.Router();
var Validator=require('validator');
var db=require('../helper/DbConnection');
var CommonFn=require('../helper/CommonFn');
var CommonMsg=require('../helper/CommonMsg');

ResponseMsg={Message:'Operation Done Successfully',Status:'Pass',Result:null};

function error(err, req, res) {
    ResponseMsg.Message = err.stack;
    res.statusCode=500;
    ResponseMsg.Status = 'Fail'; 
    res.send(ResponseMsg);
    console.error(err.stack);

};

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.redirect('index.html');
// });

router.get('/getEmployee/:EmpName', function(req, res, next) {
      try{

             var EmpName=req.params.EmpName;
             if(EmpName=='All')
               EmpName='';
         CommonFn.fnGetEmployee(EmpName,function(err,Result){
               if(!err)
                   {
                     if(Result.length>0)
                     {
                       ResponseMsg.Status="Pass";
                       ResponseMsg.Message=CommonMsg.fnCommonMsg('MDS') ;
                     }
                     else
                     {
                      ResponseMsg.Status='Fail'; 
                      ResponseMsg.Message=CommonMsg.fnCommonMsg('MND');
                     }
                      ResponseMsg.Result=Result;
                      res.send(ResponseMsg);
                   }
               else
                 {
                     res.statusCode=500; 
                     ResponseMsg.Status='Fail'; 
                     ResponseMsg.Message=err;
                     res.send(ResponseMsg);
                 }
                 //09495140977 vimala vijaykumar;
            });
         }
      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/addEditEmp', function(req, res, next) {
      try{
             
         console.log(req.body);    
         //var RID,Emp_Id,Emp_Name,DOJ,DOB,MObile,Email,Blood,Role,WorkPhone,WorkExt;
         var RID,Emp_Id,Emp_Name,DOJ,DOE,Role;
         RID=req.body.RID;
         Emp_Id=req.body.Emp_Id;
         Emp_Name= req.body.Emp_Name;
         DOJ= req.body.DOJ;
         DOE= req.body.DOE;
         // MObile= req.body.MObile;
         // Email= req.body.Email;
         // Blood= req.body.Blood;
         Role= req.body.Role;
         // WorkPhone=req.body.WorkPhone;
         // WorkExt=req.body.WorkExt;
         if(Validator.isInt(RID))
          console.log('true');
        else
           console.log('false');
         if(!(Validator.isNull(Emp_Id)))
            console.log('true');
        else
           console.log('false');
         if(!(Validator.isNull(Emp_Name)))
           console.log('true');
        else
           console.log('false');
          if(Validator.isDate(DOJ))
           console.log('true');
        else
           console.log('false');
        if(Validator.isDate(DOE))
           console.log('true');
        else
           console.log('false');

             if(!(Validator.isNull(Role)))
           console.log('true');
        else
           console.log('false');

        if(Validator.isInt(RID) && !(Validator.isNull(Emp_Id)) && !(Validator.isNull(Emp_Name)) && 
          Validator.isDate(DOJ) && Validator.isDate(DOE) && !(Validator.isNull(Role)))  
           {   
               
               var obj={ RID:RID,
                         Emp_Id:Emp_Id,
                         Emp_Name:Emp_Name,
                         DOJ:DOJ,
                         DOE:DOE,
                         Role:Role
                       };

             CommonFn.fnaddEditEmployee(obj,function(err,Result){
                 if(!err)
                     {
                      console.log(Result);
                       if(Result[0][0].Result==1)
                       {
                         ResponseMsg.Status="Pass";
                         ResponseMsg.Message=CommonMsg.fnCommonMsg('MI') ;
                       }
                       else
                       {
                        ResponseMsg.Status='Fail'; 
                        ResponseMsg.Message=CommonMsg.fnCommonMsg('MIF');
                       }
                        ResponseMsg.Result=Result;
                        res.send(ResponseMsg);
                     }
                 else
                   {
                       res.statusCode=500; 
                       ResponseMsg.Status='Fail'; 
                       ResponseMsg.Message=err;
                       res.send(ResponseMsg);
                   }
              });
           }
           else
            {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg);
            }
          }

      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/addEditPer', function(req, res, next) {
      try{
             
         var RID,Emp_Rid,Addr1,Addr2,City,Country,ZIP,Blood,Email,DOB,Mobile;
         RID=req.body.RID;
         Emp_Rid=req.body.Emp_Rid;
         Addr1= req.body.Addr1;
         Addr2= req.body.Addr2;
         City= req.body.City;
         Country= req.body.Country;
         ZIP= req.body.ZIP;
         Email= req.body.Email;
         DOB= req.body.DOB;
         Mobile= req.body.Mobile;
         Blood= req.body.Blood;

         if(Validator.isInt(RID))
           console.log('true');
         else
           console.log('false');
         if(!(Validator.isNull(Emp_Rid)))
           console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(Addr1)))
              console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(Addr2)))
            console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(City)))
            console.log('true');
         else
           console.log('false');
         if(!(Validator.isNull(Country)))
            console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(ZIP)))
          console.log('true');
         else
           console.log('false');
         if(Validator.isEmail(Email))
          console.log('true');
         else
           console.log('false');

         if(Validator.isDate(DOB))
            console.log('true');
         else
           console.log('false');
         if(!(Validator.isNull(Mobile)))
          console.log('true');
         else
           console.log('false');
         if(!(Validator.isNull(Blood)))
           console.log('true');
         else
           console.log('false');


        if(Validator.isInt(RID) && !(Validator.isNull(Emp_Rid)) && !(Validator.isNull(Addr1)) 
          && !(Validator.isNull(Addr2)) && !(Validator.isNull(City)) && !(Validator.isNull(Country)) 
          && !(Validator.isNull(ZIP)) && Validator.isEmail(Email) && Validator.isDate(DOB) && 
          !(Validator.isNull(Mobile)) && !(Validator.isNull(Blood)))  
           {   
               
               var obj={ RID:RID,
                         Emp_Rid:Emp_Rid,
                         Addr1:Addr1,
                         Addr2:Addr2,
                         City:City,
                         Country:Country,
                         ZIP:ZIP,
                         Email:Email,
                         Blood:Blood,
                         DOB:DOB,
                         Mobile:Mobile
                        };

             CommonFn.fnaddEditPersonal(obj,function(err,Result){
                 if(!err)
                     {
                      console.log(Result);
                       if(Result[0][0].Result==1)
                       {
                         ResponseMsg.Status="Pass";
                         ResponseMsg.Message=CommonMsg.fnCommonMsg('MI') ;
                       }
                       else
                       {
                        ResponseMsg.Status='Fail'; 
                        ResponseMsg.Message=CommonMsg.fnCommonMsg('MIF');
                       }
                        ResponseMsg.Result=Result;
                        res.send(ResponseMsg);
                     }
                 else
                   {
                       res.statusCode=500; 
                       ResponseMsg.Status='Fail'; 
                       ResponseMsg.Message=err;
                       res.send(ResponseMsg);
                   }
              });
           }
           else
            {


               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg);
            }
          }

      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/addEditOffc', function(req, res, next) {
      try{
             
         var RID,Emp_Rid,Addr1,Addr2,City,Country,Zip,Email,WorkPhone,WorkExt;
         RID=req.body.RID;
         Emp_Rid=req.body.Emp_Rid;
         Addr1= req.body.Addr1;
         Addr2= req.body.Addr2;
         City= req.body.City;
         Country= req.body.Country;
         ZIP= req.body.ZIP;
         Email= req.body.Email;
         WorkPhone= req.body.WorkPhone;
         WorkExt= req.body.WorkExt;


          if(Validator.isInt(RID))
           console.log('true');
         else
           console.log('false');
         if(!(Validator.isNull(Emp_Rid)))
           console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(Addr1)))
              console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(Addr2)))
            console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(City)))
            console.log('true');
         else
           console.log('false');
         if(!(Validator.isNull(Country)))
            console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(ZIP)))
          console.log('true');
         else
           console.log('false');
         if(Validator.isEmail(Email))
          console.log('true');
         else
           console.log('false');

         if(!(Validator.isNull(WorkPhone)))
            console.log('true');
         else
           console.log('false');
         if(!(Validator.isNull(WorkExt)))
           console.log('true');
         else
           console.log('false');


        if(Validator.isInt(RID) && !(Validator.isNull(Emp_Rid)) && !(Validator.isNull(Addr1)) 
          && !(Validator.isNull(Addr2)) && !(Validator.isNull(City)) && !(Validator.isNull(Country)) 
          && !(Validator.isNull(ZIP)) && Validator.isEmail(Email) && !(Validator.isNull(WorkExt)) && 
          !(Validator.isNull(WorkPhone)))  
           {   
               
               var obj={ RID:RID,
                         Emp_Rid:Emp_Rid,
                         Addr1:Addr1,
                         Addr2:Addr2,
                         City:City,
                         Country:Country,
                         ZIP:ZIP,
                         Email:Email,
                         WorkPhone:WorkPhone,
                         WorkExt:WorkExt
                        };

             CommonFn.fnaddEditOfficial(obj,function(err,Result){
                 if(!err)
                     {
                      console.log(Result);
                       if(Result[0][0].Result==1)
                       {
                         ResponseMsg.Status="Pass";
                         ResponseMsg.Message=CommonMsg.fnCommonMsg('MI') ;
                       }
                       else
                       {
                        ResponseMsg.Status='Fail'; 
                        ResponseMsg.Message=CommonMsg.fnCommonMsg('MIF');
                       }
                        ResponseMsg.Result=Result;
                        res.send(ResponseMsg);
                     }
                 else
                   {
                       res.statusCode=500; 
                       ResponseMsg.Status='Fail'; 
                       ResponseMsg.Message=err;
                       res.send(ResponseMsg);
                   }
              });
           }
           else
            {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg);
            }
          }

      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/addEditEdu', function(req, res, next) {
      try{
             
         var RID,Emp_Id,Subject,Board,Dfrom,Dto,Percentage;
         RID=req.body.RID;
         Emp_Rid=req.body.Emp_Rid;
         Subject= req.body.Subject;
         Dfrom= req.body.Dfrom;
         Dto= req.body.Dto;
         Percentage= req.body.Percentage;
         Board=req.body.Board;

        if(Validator.isInt(RID) && !(Validator.isNull(Emp_Rid)) && !(Validator.isNull(Subject)) 
          && Validator.isDate(Dfrom) && Validator.isDate(Dto) && !(Validator.isNull(Percentage))
          && !(Validator.isNull(Board)))  
           {   
               var obj={ RID:RID,
                         Emp_Rid:Emp_Rid,
                         Subject:Subject,
                         Dfrom:Dfrom,
                         Dto:Dto,
                         Percentage:Percentage,
                         Board:Board
                        };

             CommonFn.fnaddEditEducation(obj,function(err,Result){
                 if(!err)
                     {
                      console.log(Result);
                       if(Result[0][0].Result==1)
                       {
                         ResponseMsg.Status="Pass";
                         ResponseMsg.Message=CommonMsg.fnCommonMsg('MI') ;
                       }
                       else
                       {
                        ResponseMsg.Status='Fail'; 
                        ResponseMsg.Message=CommonMsg.fnCommonMsg('MIF');
                       }
                        ResponseMsg.Result=Result;
                        res.send(ResponseMsg);
                     }
                 else
                   {
                       res.statusCode=500; 
                       ResponseMsg.Status='Fail'; 
                       ResponseMsg.Message=err;
                       res.send(ResponseMsg);
                   }
              });
           }
           else
            {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg);
            }
          }

      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/addEditSkil', function(req, res, next) {
      try{
             
         var RID,Emp_Id,Skill,TotalExp,RelevantExp,LastUsed;
         RID=req.body.RID;
         Emp_Rid=req.body.Emp_Rid;
         Skill= req.body.Skill;
         TotalExp= req.body.TotalExp;
         RelevantExp= req.body.RelevantExp;
         LastUsed= req.body.LastUsed;

        if( Validator.isInt(RID) && Validator.isInt(Emp_Rid) && !(Validator.isNull(Skill)) 
           && !(Validator.isNull(TotalExp)) && !(Validator.isNull(RelevantExp)) && 
            !(Validator.isNull(LastUsed)))  
           {   
               var obj={ RID:RID,
                         Emp_Rid:Emp_Rid,
                         Skill:Skill,
                         TotalExp:TotalExp,
                         RelevantExp:RelevantExp,
                         LastUsed:LastUsed
                        };

             CommonFn.fnaddEditSkill(obj,function(err,Result){
                 if(!err)
                     {
                      console.log(Result);
                       if(Result[0][0].Result==1)
                       {
                         ResponseMsg.Status="Pass";
                         ResponseMsg.Message=CommonMsg.fnCommonMsg('MI') ;
                       }
                       else
                       {
                        ResponseMsg.Status='Fail'; 
                        ResponseMsg.Message=CommonMsg.fnCommonMsg('MIF');
                       }
                        ResponseMsg.Result=Result;
                        res.send(ResponseMsg);
                     }
                 else
                   {
                       res.statusCode=500; 
                       ResponseMsg.Status='Fail'; 
                       ResponseMsg.Message=err;
                       res.send(ResponseMsg);
                   }
              });
           }
           else
            {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg);
            }
          }

      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/addEditExp', function(req, res, next) {
      try{
             
         var RID,Emp_Id,Company,Location,Dfrom,Dto,Designation,Contact;
         RID=req.body.RID;
         Emp_Rid=req.body.Emp_Rid;
         Company= req.body.Company;
         Location= req.body.Location;
         Dfrom= req.body.Dfrom;
         Dto= req.body.Dto;
         Designation=req.body.Designation;
         Contact=req.body.Contact;

        if( Validator.isInt(RID) && Validator.isInt(Emp_Rid) && !(Validator.isNull(Company)) 
           && !(Validator.isNull(Location)) && Validator.isDate(Dfrom) && Validator.isDate(Dto) &&
            !(Validator.isNull(Designation)) && !(Validator.isNull(Contact)))  
           {   
               var obj={ RID:RID,
                         Emp_Rid:Emp_Rid,
                         Company:Company,
                         Location:Location,
                         Dfrom:Dfrom,
                         Dto:Dto,
                         Designation:Designation,
                         Contact:Contact
                        };

             CommonFn.fnaddEditExp(obj,function(err,Result){
                 if(!err)
                     {
                      console.log(Result);
                       if(Result[0][0].Result==1)
                       {
                         ResponseMsg.Status="Pass";
                         ResponseMsg.Message=CommonMsg.fnCommonMsg('MI') ;
                       }
                       else
                       {
                        ResponseMsg.Status='Fail'; 
                        ResponseMsg.Message=CommonMsg.fnCommonMsg('MIF');
                       }
                        ResponseMsg.Result=Result;
                        res.send(ResponseMsg);
                     }
                 else
                   {
                       res.statusCode=500; 
                       ResponseMsg.Status='Fail'; 
                       ResponseMsg.Message=err;
                       res.send(ResponseMsg);
                   }
              });
           }
           else
            {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg);
            }
          }

      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/deleteDetails', function(req, res, next) {
      try{
             
         var RID,TableName;
         RID=req.body.Emp_Rid;
         TableName=req.body.tbl;


        if(!(Validator.isNull(RID)) && !(Validator.isNull(TableName)))  
           {   
               var obj={ RID:RID,
                         TableName:TableName
                        };

             CommonFn.fnDeleteTable(obj,function(err,Result){
                 if(!err)
                     {
                      console.log(Result);
                       if(Result[0][0].Result==1)
                       {
                         ResponseMsg.Status="Pass";
                         ResponseMsg.Message=CommonMsg.fnCommonMsg('MD') ;
                       }
                       else
                       {
                        ResponseMsg.Status='Fail'; 
                        ResponseMsg.Message=CommonMsg.fnCommonMsg('MDF');
                       }
                        ResponseMsg.Result=Result;
                        res.send(ResponseMsg);
                     }
                 else
                   {
                       res.statusCode=500; 
                       ResponseMsg.Status='Fail'; 
                       ResponseMsg.Message=err;
                       res.send(ResponseMsg);
                   }
              });
           }
           else
            {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg);
            }
          }

      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/loginout', function(req, res, next) {
      try{
             
         var RID,UserName,Password;
         RID=req.body.RID;
         UserName=req.body.UserName;
         Password=req.body.Password;

        if( Validator.isInt(RID) && !(Validator.isNull(Password)) && !(Validator.isNull(UserName)))  
           {   
               var obj={ RID:RID,
                         UserName:UserName,
                          Password:Password
                        };

             CommonFn.fnLoginout(obj,function(err,Result){
                 if(!err)
                     {
                      console.log(Result);
                       if(Result[0][0].Result==1)
                       {
                      
                         ResponseMsg.Status="Pass";
                         ResponseMsg.Message=CommonMsg.fnCommonMsg('ML') ;
                         //setting up session
                         if(RID=='0')
                            req.session.UserType=Result[0][0].UserType;
                          else
                            req.session = null;
                       }
                       else
                       {
                        ResponseMsg.Status='Fail'; 
                        ResponseMsg.Message=CommonMsg.fnCommonMsg('MLF');
                       }
                        ResponseMsg.Result=Result[0][0];
                        res.send(ResponseMsg);
                     }
                 else
                   {
                       res.statusCode=500; 
                       ResponseMsg.Status='Fail'; 
                       ResponseMsg.Message=err;
                       res.send(ResponseMsg);
                   }
              });
           }
           else
            {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg);
            }
          }

      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.get('/getUserType',function(req,res,next){
  try{

    console.log(req.session.UserType);

     if(req.session.UserType !=null)
     {
       if(req.session.UserType=='A')
       {
        ResponseMsg.Result='Admin';
        ResponseMsg.Message=CommonMsg.fnCommonMsg('MAdmin');

       }
       else
       {
        ResponseMsg.Result='User';
        ResponseMsg.Message=CommonMsg.fnCommonMsg('MUser');

       }
       ResponseMsg.Status='Pass'; 
       res.send(ResponseMsg);
     }
     else
     {
        ResponseMsg.Status='Pass';  
       ResponseMsg.Message=CommonMsg.fnCommonMsg('MLF');
       ResponseMsg.Result=null;
       res.send(ResponseMsg);
     }


  }
  catch(ex)
  {
    error(ex,req,res); 

  }

});

router.get('/getEmpById/:Emp_Rid', function(req, res, next) {
      try{

      var Emp_Rid=req.params.Emp_Rid;

      if(!(Validator.isNull(Emp_Rid)))  
        {

         CommonFn.fnGetEmpById(Emp_Rid,function(err,Result){
               if(!err)
                   {
                     if(Result.length>0)
                     {
                       var finalResult=new Array();
                       finalResult.push(Result[0][0]);
                       ResponseMsg.Status="Pass";
                       ResponseMsg.Message=CommonMsg.fnCommonMsg('MDS') ;
                       ResponseMsg.Result=finalResult;
                     }
                     else
                     {
                      ResponseMsg.Status='Fail'; 
                      ResponseMsg.Message=CommonMsg.fnCommonMsg('MND');
                      ResponseMsg.Result=null;
                     }
                      
                      res.send(ResponseMsg);
                   }
               else
                 {
                     res.statusCode=500; 
                     ResponseMsg.Status='Fail'; 
                     ResponseMsg.Message=err;
                     res.send(ResponseMsg);
                 }
                 //09495140977 vimala vijaykumar;
            });
         }
         else
         {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg); 
         }

        }
      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.get('/getEduById/:Emp_Rid', function(req, res, next) {
      try{

      var Emp_Rid=req.params.Emp_Rid;

      if( !(Validator.isNull(Emp_Rid)))  
        {

         CommonFn.fnGetEduById(Emp_Rid,function(err,Result){
               if(!err)
                   {
                     if(Result.length>0)
                     {
                     
                       ResponseMsg.Status="Pass";
                       ResponseMsg.Message=CommonMsg.fnCommonMsg('MDS') ;
                       ResponseMsg.Result=Result;
                     }
                     else
                     {
                      ResponseMsg.Status='Fail'; 
                      ResponseMsg.Message=CommonMsg.fnCommonMsg('MND');
                      ResponseMsg.Result=null;
                     }
                      
                      res.send(ResponseMsg);
                   }
               else
                 {
                     res.statusCode=500; 
                     ResponseMsg.Status='Fail'; 
                     ResponseMsg.Message=err;
                     res.send(ResponseMsg);
                 }
                 //09495140977 vimala vijaykumar;
            });
         }
         else
         {
               res.statusCode=400; 
               ResponseMsg.Status='Fail';
               ResponseMsg.Message=CommonMsg.fnCommonMsg('MPErr');
               res.send(ResponseMsg); 
         }

        }
      catch(ex)
        {
          error(ex,req,res); 
        };

});


router.get('/geteducationdetails', function(req, res, next) {
      try{
             
         CommonFn.GetEducationDetails(function(err,Result){
          if(err)
          {
            res.statusCode=500; 
             ResponseMsg.Status='Fail'; 
             ResponseMsg.Message=err;
             res.send(ResponseMsg);

          }
          else
          {
            res.send(Result); 
          }

        });
              
         }
      catch(ex)
        {
          error(ex,req,res); 
        };

});

router.post('/deleteemployeeeducation', function(req, res, next) {

     var details=req.body;
    try{
             
         CommonFn.fndeleteemployeeeducation(details,function(err,Result){
          if(err)
          {
           
             res.send(ResponseMsg);
          }
          else
          {
            res.sendStatus(Result); 
          }

        });
              
         }
      catch(ex)
        {
          error(ex,req,res); 
        };

  });

router.post('/getEmpByName', function(req, res, next) {
      try{
            EmpName=req.body.EmpName;   
            if(!(Validator.isNull(EmpName))) 
            {

              var obj={EmpName:EmpName};
               CommonFn.GetEmpNameByNameDetails(obj,function(err,Result){
                if(err)
                {
                  res.statusCode=500; 
                   ResponseMsg.Status='Fail'; 
                   ResponseMsg.Message=err;
                   res.send(ResponseMsg);

                }
                else
                {
                      ResponseMsg.Status="Pass";
                      ResponseMsg.Message=CommonMsg.fnCommonMsg('MDS');
                      ResponseMsg.Result=Result;
                      res.send(ResponseMsg);
                }
              });
            }
         }
      catch(ex)
        {
          error(ex,req,res); 
        };

});


module.exports = router;
