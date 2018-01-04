var formidable = require('formidable');
var uuid = require('node-uuid');
var util = require('util');
var path = require('path');
var cp = require('child_process');
var fs = require('fs');
var zlib = require('zlib');
var request = require('request');
var FormData = require('form-data');
var rest = require('restler');

// var TaskCommit = require('../models/task');
var task = {};
var filename = "./public/qrcode.png";

function child_produce(url, task) {
    var id = '1';
    var casper_path = path.join(__dirname, '/../../utils/toutiao.js');
    var casper = cp.spawn('casperjs', [casper_path, id, task.uname, task.upass, task.video_title, task.video_desc, task.category, task.video_path, url, task.original, task.ads], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    casper.stdout.on('data', function(chunk) {
        process.stdout.write(chunk);
    });
}

function upload_video_cover(cover_path, filename, cb) {
    var formData = new FormData();
    var formData = {
        upfile: {
            value: fs.createReadStream(cover_path),
            options: {
                filename: filename,
                contentType: 'image/jpeg'
            }
        }
    };

    var options = {
        // proxy: 'http://localhost:8888',
        formData: formData,
        method: 'POST',
        // 直接通过request模块取到的数据有可能是被压缩的，需要加压缩，后面进一步由JSON字符串变为对象
        gzip: 'true',
        url: 'http://mp.toutiao.com/tools/upload_picture/',
        headers: {
            // 'User-Agent': 'request',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
            'Connection': 'keep-alive',
            'Content-Type': 'multipart/form-data',
            'Host': 'mp.toutiao.com',
            'Origin': 'http://open.web.meitu.com',
            'Referer': 'http://open.web.meitu.com/sources/avatar/avatar.swf?version=201410201414',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36',
            'X-Requested-With': 'ShockwaveFlash/21.0.0.242'
        }
    };

    function callback(err, res, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        var url = JSON.parse(body).url;
        console.log("get url:" + url);
        cb(url, task);
        // return url;
    }
    request(options, callback);
}

//prcode contains 4 chars
var encodePNGAtFour = function(cb) {

    rest.post('http://api.ysdm.net/create.json', {
        multipart: true,
        data: {
            'username': 'alfalf',
            'password': 'shenzhoufeichuan',
            'typeid': '3040',
            'softid': '47334',
            'softkey': 'af66873d9613473ea85bb376d7039e83',
            //'image': rest.file(filename, null, fs.statSync(filename).size, null, 'image/gif') // filename: 抓取回来的码证码文件
            'image': rest.file(filename, null, fs.statSync(filename).size, null, 'image/jpeg') // filename:
                // 抓取回来的码证码文件
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).on('complete', function(data) {
        var captcha = JSON.parse(data);
        return cb(captcha);
    });
};

//prcode contains 5 chars
var encodePNGAtFive = function(cb) {

    rest.post('http://api.ysdm.net/create.json', {
        multipart: true,
        data: {
            'username': 'alfalf',
            'password': 'shenzhoufeichuan',
            'typeid': '3050',
            'softid': '47334',
            'softkey': 'af66873d9613473ea85bb376d7039e83',
            //'image': rest.file(filename, null, fs.statSync(filename).size, null, 'image/gif') // filename: 抓取回来的码证码文件
            'image': rest.file(filename, null, fs.statSync(filename).size, null, 'image/jpeg') // filename:
                // 抓取回来的码证码文件
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).on('complete', function(data) {
        var captcha = JSON.parse(data);
        return cb(captcha);
    });
};

/**
 * 测试返回的内容是否正确
 * @param result
 * @returns {*}
 */
var test = function(result) {
    // 判断验证码返回值
    'use strict';
    // print('获取到验证码返回结果');
    if (result.Result && result.Id) {
        return {
            status: true,
            code: result.Result,
            id: result.Id
        };
    } else {
        // 获取验证码出现错误
        return {
            status: false,
            error: {
                reason: result.Error,
                errorCode: result.Error_Code
            }
        };
    }
};

exports.omqq = function(contents) {

    task.uname = contents.uname;
    task.upass = contents.upass;
    task.video_title = contents.vnickname;
    task.video_desc = contents.vdesc;
    task.video_tag = contents.vtag;
    task.video_path = path.join(__dirname, '/../../', contents.vpath);
    var channel = contents.channel;

    var casper_path = path.join(__dirname, '/../../utils/omqq.js');
    var casper = cp.spawn('casperjs', [casper_path, channel, task.uname, task.upass, task.video_desc, task.video_path, task.video_title, task.video_tag], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    casper.stdout.on('data', function(chunk) {
        process.stdout.write(chunk);
    });
}


exports.qqvideo = function(contents) {

    task.uname = contents.uname;
    task.upass = contents.upass;
    task.video_title = contents.vnickname;
    task.video_desc = contents.vdesc;
    task.video_tag = contents.vtag;
    task.video_path = path.join(__dirname, '/../../', contents.vpath);
    var channel = contents.channel;


    var casper_path = path.join(__dirname, '/../../utils/tencentvideo.js');
    var casper = cp.spawn('casperjs', [casper_path, channel, task.uname, task.upass, task.video_desc, task.video_path, task.video_title, task.video_tag], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    casper.stdout.on('data', function(chunk) {
        process.stdout.write(chunk);
    });
}

exports.youku = function(contents) {
    console.log(contents);
    task.uname = contents.uname;
    task.upass = contents.upass;
    task.video_title = contents.vnickname;
    task.video_desc = contents.vdesc;
    task.video_tag = contents.vtag;
    task.video_path = path.join(__dirname, '/../../', contents.vpath);
    var channel = contents.channel;

    console.log(task);
    var casper_path = path.join(__dirname, '/../../utils/youku.js');
    console.log(casper_path);
    var casper = cp.spawn('casperjs', [casper_path, channel, task.uname, task.upass, task.video_title, task.video_desc, task.video_tag, task.video_path], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    console.log(casper);
    casper.stdout.on('data', function(chunk) {
        console.log('\n\n\n data事件get');
        process.stdout.write(chunk);
        console.log(chunk);
    });

    console.log('coming here.');

}

exports.souhu = function(contents) {
    var oldPath = path.join(__dirname, '/../../', contents.vpath);
    var newPath = path.join(__dirname, '/../../public/upload/', contents.vnickname);

    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('rename succeed');
        }
    });

    task.uname = contents.uname;
    task.upass = contents.upass;
    task.video_title = contents.vnickname;
    task.video_desc = contents.vdesc;
    task.video_tag = contents.vtag;
    task.video_path = path.join(__dirname, '/../../', contents.vpath);
    var channel = contents.channel;

    var casper_path = path.join(__dirname, '/../../utils/souhu.js');
    var casper = cp.spawn('casperjs', [casper_path, channel, task.uname, task.upass, task.video_title, task.video_desc, task.video_path, task.video_tag], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    casper.stdin.setEncoding('utf-8');
    casper.stdout.on('error', function(err) {
        console.log(err);
    });
    casper.stdout.on('data', function(chunk) {
        chunk = chunk.toString();
        if (chunk.indexOf('souhuqrcodeimg got') !== -1) {
            encodePNGAtFour(function(result) {
                result = test(result);
                if (result.status) {
                    // success
                    id = result.id;
                    casper.stdin.write(result.code + '\n');
                }
            });
        } else {
            console.log(chunk);
        }
    });
}
