


module.exports={

fnCommonMsg:function(Id){
  var Msgobj={
    MDS:'Details send successfully',
    MND:'No data available',
    MU:'Updated successfully',
    MUF:'Updation failed',
    MI:'Added successfully',
    MIF:'Insertion failed',
    MD:'Deleted successfully',
    MCF:'Already exists',
    MC:'Not available',
    MDF:'Deletion failed',
    ML:'Login Sucess',
    MLF:'Invalid credentials',
    MAdmin:'User Authenticated Admin',
    MUser:'User Authenticated User',
    MAuthFail:'User Authentication Failed',
    MPErr :'Parameter error or missing parameter'
  }

  return Msgobj[Id]
 }
}