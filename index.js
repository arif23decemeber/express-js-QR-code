var express = require('express')
var app = express()
var path = require('path')

var QRCode = require('qrcode')
var base64Img = require('base64-img')


app.use('/public',express.static(__dirname + '/public'));



app.get('/generate/qr_code/:user_id', function (req, res) {
  QRCode.toDataURL('http://localhost:3000/profile/'+req.params.user_id, function (err, url) {
    let base = url;
    var filepath = base64Img.imgSync(base, 'public', req.params.user_id);
    res.json({
      "user_id" : req.params.user_id,
      "qr_code" : filepath
    });
  })
});

//buat method POST setelah itu lakukan fetching pada API profile

app.get('/profile/1234', function (req, res) {
  res.json({
    "user_id" : 1,
    "nama" : "Jack",
    "address" : "Jakarta",
    "qr" : "public/1234.png"
  })
});


app.listen(3000, ()=>console.log("port 3000..."))
