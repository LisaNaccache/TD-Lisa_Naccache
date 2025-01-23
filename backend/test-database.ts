import sequelize from './database';

sequelize.authenticate()
    .then(() => {
        console.log('Successful connection to the LearningFactDb database.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error :', err);
        process.exit(1);
    });