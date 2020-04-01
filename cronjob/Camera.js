var cron = require('node-cron');

const startJob = async () => {
    console.log('startJob');
    console.log(new Date());
    cron.schedule('* * * * *', async () => {
        console.log("Reng Reng Execute jobs !!! ");
    });
};

module.exports = {
    startJob,
};
