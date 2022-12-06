const mysql=require('mysql2');
const express=require('express');
const port =5800;
const app =express();
const bodyParser=require('body-parser');

const cors=require('cors');


app.use(cors({

    orgin: "*",

}))



app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname+'/public'));

const connection=mysql.createConnection(

    {

host:'database-1.cuauvnew4dak.us-east-1.rds.amazonaws.com',
        user:'admin',

        password:'12345678',

        database:'covid19'
    }
);

connection.connect((err)=>{
    if(!err){
        console.log("Conenction established");
    }
    else{
        console.log("Failed")
    }
})

app.post('/submit', function (req, res, next) {
    console.log('submit form');
    var sname = req.body.fname;
    var dor = req.body.dor;
    var nos = req.body.sample;
    var nod = req.body.nod;
    var nop = req.body.nop;
    var non = req.body.non;
    var nodc = req. body.nodc;

  
    var sql = `INSERT INTO covid_details (State_name,Date_of_Record,No_of_Samples,No_of_Deaths,No_of_Positive,No_of_Negative,No_of_Discharge) VALUES ("${sname}", "${dor}", "${nos}","${nod}","${nop}","${non}","${nodc}");`
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log('inserted');
    })
  })