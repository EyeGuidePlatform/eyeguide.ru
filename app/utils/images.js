const fs = require('fs');
const request = require('async-request');
const download = require('image-downloader');

exports.getImageList = (req, res) => {
    fs.readdir(__dirname+'/../../src/img/', (err, items) => {
        res.json(items);
    })
}

exports.syncImage = async (req, res) => {
    let response = await request('http://eyeguide.ru/synch/images');
    response = JSON.parse(response.body);

    //console.log(response);
    fs.readdir(__dirname+'/../../src/img/', (err, items) => {
        for (let i=0; i<response.length; i++){
            let flag = false;
            for (let j=0; j<items.length; j++){
                if (items[j]==response[i]){
                    flag = true;
                }
            }
            if (!flag) {
                download.image({
                    url:'http://eyeguide.ru/img/'+response[i],
                    dest:__dirname+'/../../src/img/'
                }).then((err, filname)=>console.log(err, filname));
            }
        }
    })
}