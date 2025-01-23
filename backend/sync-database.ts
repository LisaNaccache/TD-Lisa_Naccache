import sequelize from './database';
import LearningPackage from './models/LearningPackage';
import LearningFact from './models/LearningFact';

console.log('Registered model :', LearningPackage === sequelize.models.LearningPackage);
console.log('Registered model :', LearningFact === sequelize.models.LearningFact);

sequelize.sync({ force: true }) // `force: true` recreates tables on each run
    .then(() => {
        console.log('The tables have been successfully synchronized.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Table synchronization error :', err);
        process.exit(1);
    });
