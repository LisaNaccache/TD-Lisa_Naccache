import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('LearningFactDb', 'learningDbUser', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
});

// Tester la connexion
sequelize.authenticate()
    .then(() => console.log('PostgreSQL connection successful.'))
    .catch(err => console.error('Unable to connect :', err));

export default sequelize;
