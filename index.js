const express = require("./node_modules/express");
const mysql = require("./node_modules/mysql");
const bodyparser = require("./node_modules/body-parser");

const user = require("./models/user");
const app = express();
app.listen(9000);

app.use(bodyparser.urlencoded({extended:false}));

app.get("/api/user/:id", function(req, res){
  try{
    user.getUser(req.params.id,function(err, data){
      if(err){
        throw err;
      }else{
        res.send(data);
      }
    })
  }catch(error){
    res.status(500).send(error);
  }
});

app.post("/api/user", function(req, res){
try{
  user.insertUser(req.body, function(err,data){
    if(err){
      throw err;;
    }else{
      user.getUser(data.insertId,function(err,data){
        if(err){
          throw err;
        }else{
          res.send(data);
        }
      })
    }
  })
}catch(error){
  res.status(500).send(error);
}
});



app.put("/api/user/:id", function(req, res){
try{
  user.updateUser(req.params.id, req.body, function(err, data){
    if(err){
      throw err;
    }else{
      res.send(data);
    }
  })
}catch(error){
  res.status(500).send(error);
}

});

app.delete("/api/user/:id", function(req, res){

});
