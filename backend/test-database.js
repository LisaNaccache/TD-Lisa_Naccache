"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
database_1.default.authenticate()
    .then(function () {
    console.log('Connexion réussie à la base LearningFactDb.');
    process.exit(0);
})
    .catch(function (err) {
    console.error('Erreur de connexion :', err);
    process.exit(1);
});
