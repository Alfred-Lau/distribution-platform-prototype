const kue = require('kue');
const queue = kue.createQueue();

const job = queue.create('email', {
    title: 'welcome email for tj',
    to: 'tj@learnboost.com',
    template: 'welcome-email'
}).save((err) => {
    if (!err) console.log('stored succeed.' + job.id);
});
