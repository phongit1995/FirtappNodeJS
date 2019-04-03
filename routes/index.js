var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:123@cluster0-zhqus.mongodb.net/quanlysanpham",{ useNewUrlParser: true },function(erro){
  if(erro) throw erro;
  console.log("Đã Connect thành công tới sever");
  
});
const schema = mongoose.Schema({
  username:String ,
  password:String
});
const User = mongoose.model("user",schema);


/* GET home page. */
router.get('/', function(req, res, next) {
  
  User.find({},function(erro){
    res.send("Chào Mừng Tới Với Node JS");
  });
});
router.get('/xem', function(req, res, next) {
  
  User.find().exec(function(erro,dulieu){
    if(erro) throw erro;
    
    res.render('xem', {title:"Phong Nguyen",user:dulieu});
    // console.log(dulieu);
  })
 
});
router.get("/them",function(req,res){
  res.render("them",{title:"Thêm Thông Tin"})
});
router.post("/them",function(req,res){
    var userName = req.body.UserName ;
    var passWord= req.body.passWord;
    User.create({
      username:userName,
      password:passWord
    },function(erro){
      if(erro) throw erro ;
      console.log("Thêm Thành Công");
      res.redirect("/xem");
    })
    
});
router.get("/xoa/:idcanxoa",function(req,res,next){
  var idcanxoa = req.params.idcanxoa;
  console.log(idcanxoa);
  User.deleteOne({_id:idcanxoa},function(erro){
    if(erro) throw erro ;
      console.log("Xóa Thành Công");
      res.redirect("/xem");
  })
  
});
router.get("/sua/:idsua",function(req,res){
  var idcansua = req.params.idsua;
  User.find({_id:idcansua},function(erro,data){
    res.render("sua",{title:"Trang Sửa",dulieu:data});
  })
  
});
router.post("/sua/:idcansua",function (req,res) {
  var id = req.params.idcansua ;
  
    User.update({_id:id},{username:req.body.UserName,password:req.body.passWord},function(erro){
        if(erro) throw erro;
        console.log("sửa thành Công");
        res.redirect("/xem");

    }) 
})
module.exports = router;
