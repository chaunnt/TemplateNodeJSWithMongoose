const Camera = require('./Camera');

const startJobs = async () => {
    Camera.startJob();
};

module.exports = {
    startJobs
};
