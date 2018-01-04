const kue = require('kue'),
    queue = kue.createQueue();

queue.process('email', 10, (job, done) => {
    email(job.data.to, done);
});

function email(address, done) {
    if (address.indexOf('learnboost') == -1) {
        //done('invalid to address') is possible but discouraged
        return done(new Error('invalid to address'));
    }
    // email send stuff...
    done();
}
