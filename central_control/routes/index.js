const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const util = require('util');
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'central_control',
    password: '123456'
});


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: '巧发' });
});


router.post('/submit', (req, res, next) => {
    //创建上传表单
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置上传目录
    form.uploadDir = 'public/upload/';
    form.keepExtensions = true;
    //文件大小
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        } else {
            // 数据入MySQL
            console.log(fields);
            const channelMap = ['youku', 'souhu', 'qqvideo', 'omqq', 'bilibili', 'five6', 'tudou', 'aiqiyi', 'leshi', 'toutiao'];
            for (var i = 0; i < 10; i++) {
                var channel = channelMap[i];
                switch (channel) {
                    case "youku":
                        {
                            (function() {
                                var channelNum = 1;
                                var uname = fields.youkuUserName;
                                var upass = fields.youkuPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.youkuVideoName;
                                var vdesc = fields.youkuVideoDesc;
                                var vtag = fields.youkuVideoTag;
                                var vpublishtime = fields.youkuUploadTime;
                                var vcategory = fields.youkuVideoCategory;
                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n youku\n\n');
                                                    // console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n youku连接资源释放');
                                        });
                                    }
                                });
                            })();
                            break;
                        }
                    case "souhu":
                        {
                            (function() {
                                var channelNum = 2;
                                var uname = fields.souhuUserName;
                                var upass = fields.souhuPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.souhuVideoName;
                                var vdesc = fields.souhuVideoDesc;
                                var vtag = fields.souhuVideoTag;
                                var vpublishtime = fields.souhuUploadTime;
                                var vcategory = fields.souhuVideoCategory;
                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n souhu:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n souhu连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;
                        }
                    case "qqvideo":
                        {
                            (function() {
                                var channelNum = 3;
                                var uname = fields.qqvideoUserName;
                                var upass = fields.qqvideoPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.qqvideoVideoName;
                                var vdesc = fields.qqvideoVideoDesc;
                                var vtag = fields.qqvideoVideoTag;
                                var vpublishtime = fields.qqvideoUploadTime;
                                var vcategory = fields.qqVideoCategory;

                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n qqvideo:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n qqvideo连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;
                        }
                    case "omqq":
                        {
                            (function() {
                                var channelNum = 4;
                                var uname = fields.omqqUserName;
                                var upass = fields.omqqPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.omqqVideoName;
                                var vdesc = fields.omqqVideoDesc;
                                var vtag = fields.omqqVideoTag;
                                var vpublishtime = fields.omqqUploadTime;
                                var vcategory = fields.omqqVideoCategory;

                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n omqq:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n omqq连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;
                        }
                    case "bilibili":
                        {
                            (function() {
                                var channelNum = 5;
                                var uname = fields.bilibiliUserName;
                                var upass = fields.bilibiliPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.bilibiliVideoName;
                                var vdesc = fields.bilibiliVideoDesc;
                                var vtag = fields.bilibiliVideoTag;
                                var vpublishtime = fields.bilibiliUploadTime;
                                var vcategory = fields.bilibiliVideoCategory;

                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n bilibili:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n bilibili连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;

                        }
                    case "five6":
                        {
                            (function() {
                                var channelNum = 6;
                                var uname = fields.five6UserName;
                                var upass = fields.five6Password;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.five6VideoName;
                                var vdesc = fields.five6VideoDesc;
                                var vtag = fields.five6VideoTag;
                                var vpublishtime = fields.five6UploadTime;
                                var vcategory = fields.five6VideoCategory;

                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n five6:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n five6连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;
                        }
                    case "tudou":
                        {
                            (function() {
                                var channelNum = 7;
                                var uname = fields.tudouUserName;
                                var upass = fields.tudouPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.tudouVideoName;
                                var vdesc = fields.tudouVideoDesc;
                                var vtag = fields.tudouVideoTag;
                                var vpublishtime = fields.tudouUploadTime;
                                var vcategory = fields.tudouVideoCategory;

                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n tudou:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n tudou连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;
                        }
                    case "aiqiyi":
                        {
                            (function() {
                                var channelNum = 8;
                                var uname = fields.aiqiyiUserName;
                                var upass = fields.aiqiyiPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.aiqiyiVideoName;
                                var vdesc = fields.aiqiyiVideoDesc;
                                var vtag = fields.aiqiyiVideoTag;
                                var vpublishtime = fields.aiqiyiUploadTime;
                                var vcategory = fields.aiqiyiVideoCategory;
                                var vtype = fields.aiqiyiVideoOrigin;

                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory,
                                            vtype: vtype,
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n aiqiyi:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n aiqiyi连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;
                        }
                    case "leshi":
                        {
                            (function() {
                                var channelNum = 9;
                                var uname = fields.leshiUserName;
                                var upass = fields.leshiPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.leshiVideoName;
                                var vdesc = fields.leshiVideoDesc;
                                var vtag = fields.leshiVideoTag;
                                var vpublishtime = fields.leshiUploadTime;
                                var vcategory = fields.leshiVideoCategory;
                                var voriginal = fields.leshiVideoOrigin === 'on' ? 'original' : 'reprinted';

                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory,
                                            voriginal: voriginal,
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n leshi:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n leshi连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;

                        }
                    case "toutiao":
                        {
                            (function() {
                                var channelNum = 10;
                                var uname = fields.toutiaoUserName;
                                var upass = fields.toutiaoPassword;
                                var vpath = files.file.path;
                                var vname = files.file.name;
                                var vnickname = fields.toutiaoVideoName;
                                var vdesc = fields.toutiaoVideoDesc;
                                var vtag = fields.toutiaoVideoTag;
                                var vpublishtime = fields.toutiaoUploadTime;
                                var vcategory = fields.toutiaoVideoCategory;

                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        console.log('和数据库连接失败.');
                                    } else {
                                        console.log('连接成功');
                                        connection.query('insert into tasks set ?', {
                                            channel: channelNum,
                                            uname: uname,
                                            upass: upass,
                                            vpath: vpath,
                                            vname: vname,
                                            vnickname: vnickname,
                                            vdesc: vdesc,
                                            vtag: vtag,
                                            vpublishtime: vpublishtime,
                                            vcategory: vcategory
                                        }, (err, rows, fields) => {
                                            if (err) throw err;
                                            connection.query('select * from tasks', function(err, result) {
                                                if (err) {
                                                    console.log('查询失败.');
                                                } else {
                                                    console.log('\n\n\n toutiao:\n\n');
                                                    console.log(result);
                                                }
                                            });
                                            // 释放pool连接池资源
                                            connection.release();
                                            console.log('\n\n\n toutiao连接资源释放');

                                        });
                                    }
                                });
                            })();
                            break;

                        }
                        defaule: {
                            break;
                        }
                }
            }

            // 查询任务列表数据，返回渲染
            res.redirect('/status');


        }
    });
})


router.get('/status', (req, res, next) => {
    (function() {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log('和数据库连接失败.');
            } else {
                console.log('连接成功');
                connection.query('select * from tasks', function(err, result) {
                    if (err) {
                        console.log('获取数据失败.');
                    } else {
                        res.render('status', { result: result });
                    }
                });
                // 释放pool连接池资源
                connection.release();
            }
        });
    })();
})
module.exports = router;
