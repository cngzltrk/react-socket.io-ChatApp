/*
Önce sunucu için gerekli modülleri ekleyelim.
Socket.Io kullanımı için socketIo modülü kullanılıyor.
Web server ve http özellikleri içinse epxress ve http modülleri.
*/
 
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
 
const app = express(); // express nesnesini örnekle
const appServer = http.createServer(app); // express'i kullanan http server oluşturuluyor
const channel = socketIo(appServer); // Socket.io middleware'e ekleniyor.
 
// ya çevre değişkenlerinden gelen port bilgisini ya da 5555 portunu kullanıyoruz
const port = process.env.PORT || 5555;
 
// Yeni soketler için connection isimli bir olay dinleyici açılıyor.
// İstemci connection namespace'ini kullanarak bağlanıyor
channel.on("connection", socket => {
    console.log(`${Date(Date.now()).toLocaleString()}: yeni bir istemci bağlandı`);
    
    socket.emit('server',"hi from server");
    socket.on("room:create",(data)=>{
        console.log(data);
        socket.join(data);
        //socket.broadcast.to('room1').emit('server:room1',"hello from room1");
    });


    socket.on("client:message",(data)=>{
        console.log(data);

        socket.to(data.roomname).emit('server:message',(data));

    });


    // istemcilerin bağlantı kesmelerini ele aldığımız olay
    // Bu kez "disconnect" isimli bir namespace söz konusu
    // disconnect, socket.io için rezerve edilmiş anahtar kelimelerden.
    socket.on("disconnect", () => {
        /* 
        Burada çeşitli temizleme operasyonları yapılabilir.
        Mesela istemcinin geliş gidiş hareketlerini takip ediyorsak,
        burada state değişikliği yaptırtabiliriz.
        */
        console.log(`${Date(Date.now()).toLocaleString()}istemci bağlantıyı kapattı`);
    });
});
 
// Sunucuyu ayağa kaldırıyor ve dinlemeye başlıyoruz
appServer.listen(port, () => {
    console.log(`${Date(Date.now()).toLocaleString()}: Sunucu ${port} nolu port üzerinden aktif konumda.`);
});