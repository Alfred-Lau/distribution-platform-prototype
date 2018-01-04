const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const kue = require('kue'),
    queue = kue.createQueue();


queue.on('error', function(err) {
    console.log('Oops... ', err);
});

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    database: 'central_control',
    password: '123456',
});

// api private
const createKueTask = (content) => {
    // 拆解任务，存入kue redis队列
    const job = queue.create('task', content).save((err) => {
        if (!err) console.log('stored succeed.' + job.id);
    });
    const id = job.data.id;

    // 引入kue的job event事件机制来完善功能

    job.on('enqueue', () => {
        console.log('任务进入队列');
        console.log(job.data.id);
        //修改状态为：进行中(1)
        exports.start(id);
    }).on('complete', function(result) {
        console.log('任务完成 ', result);
        console.log(job.data.id);
        // 修改状态为：成功(2)
        exports.complete(id);

    }).on('failed attempt', function(errorMessage, doneAttempts) {
        console.log('任务失败' + errorMessage);
        console.log(job.data.id);


    }).on('failed', function(errorMessage) {
        console.log('任务失败,且未能继续尝试' + errorMessage);
        console.log(job.data.id);
        //修改状态为：超时(3)
        exports.failed(id);

    }).on('progress', function(progress, data) {
        console.log('\r  job #' + job.id + ' ' + progress + '% 完成进度 ', data);

    });


}

exports.start = function(jobid) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('和数据库连接失败');
        } else {
            // 设置vstatus位为处理中
            var id = jobid;
            connection.query('UPDATE tasks SET vstatus=1 WHERE id="' + id + '";', (err, rows, fields) => {
                console.log('状态修改:进行中');
                // 释放pool连接池资源
                connection.release();
            });
        }
    });
}

exports.failed = function(jobid) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('和数据库连接失败');
        } else {
            // 设置vstatus位为失败
            var id = jobid;

            connection.query('UPDATE tasks SET vstatus=3 WHERE id="' + id + '";', (err, rows, fields) => {
                console.log('状态修改:失败');
                // 释放pool连接池资源
                connection.release();
            });
        }
    });
}

exports.complete = function(jobid) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('和数据库连接失败');
        } else {
            // 设置vstatus位为处理中
            var id = jobid;

            connection.query('UPDATE tasks SET vstatus=2 WHERE id="' + id + '";', (err, rows, fields) => {
                console.log('状态修改:成功');
                // 释放pool连接池资源
                connection.release();
            });
        }
    });
}


// api public
exports.index = () => {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('和数据库连接失败.');
        } else {
            console.log('连接成功');
            var vstatusNum = 0;
            // 添加定时查询语句
            connection.query('select * from tasks where vstatus = "' + vstatusNum + '" order by vpublishtime desc limit 10', (err, rows, fields) => {
                if (rows.length > 0) {
                    // 调用kue生成redis任务
                    rows.forEach(function(row) {
                        var id = row.id;
                        var content = {
                                id: row.id,
                                title: 'initialize the job',
                                channel: row.channel,
                                uname: row.uname,
                                upass: row.upass,
                                vpath: row.vpath,
                                vname: row.vanme,
                                vnickname: row.vnickname,
                                vdesc: row.vdesc,
                                vtag: row.vtag,
                                vcategory: row.vcategory,
                                vpublishtime: row.vpublishtime,
                                vstatus: row.vstatus,
                                vtype: row.vtype,
                                voriginal: row.voriginal,
                            }
                            // 建立kue任务
                        createKueTask(content);
                    });
                } else {
                    console.log('最近10s没有更新数据');
                }
                // 释放pool连接池资源
                connection.release();
            });
        }
    });
}
