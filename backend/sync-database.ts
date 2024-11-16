import sequelize from './database';
import LearningPackage from './models/LearningPackage';

console.log('Modèle enregistré :', LearningPackage === sequelize.models.LearningPackage);

sequelize.sync({ force: true }) // `force: true` recree les tables a chaque execution
    .then(() => {
        console.log('Les tables ont été synchronisées avec succès.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Erreur lors de la synchronisation des tables :', err);
        process.exit(1);
    });
