import express from 'express';
import {Request, Response} from 'express';
import swaggerJsdoc = require('swagger-jsdoc');
import swaggerUi = require('swagger-ui-express');

import LearningPackage from './models/LearningPackage';
import LearningFact from "./models/LearningFact";

const cors = require('cors');

const app = express();
app.use(express.json()); // => to parse request body with http header "content-type": "application/json"
app.use(cors())

const jsDocOptions = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'Documentation for Express API with Swagger',
        },
        components: {
            schemas: {
                Todo: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                        },
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                    },
                },
                TodoNoId: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                    },
                },
                // Define other schemas as needed
                LearningPackage: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                        },
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        category: {
                            type: 'string',
                        },
                        targetAudience: {
                            type: 'string',
                        },
                        difficulty: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 20
                        },
                    },
                },
                LearningPackageNoId: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        category: {
                            type: 'string',
                        },
                        targetAudience: {
                            type: 'string',
                        },
                        difficulty: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 20
                        },
                    },
                },
                UserPackageLearning: {
                    type: 'object',
                    properties: {
                        startDate: {
                            type: 'string',
                            format: 'date'
                        },
                        expectedEndDate: {
                            type: 'string',
                            format: 'date'
                        },
                        minutesPerDayObjective: {
                            type: 'integer',
                        },
                    },
                },
                UserLearningFact: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                        },
                        reviewCount: {
                            type: 'integer',
                        },
                        confidenceLevel: {
                            type: 'integer',
                        },
                        lastReviewedDate: {
                            type: 'string',
                            format: 'date'
                        },
                    },
                },
                UserLearningFactNoId: {
                    type: 'object',
                    properties: {
                        reviewCount: {
                            type: 'integer',
                        },
                        confidenceLevel: {
                            type: 'integer',
                        },
                        lastReviewedDate: {
                            type: 'string',
                            format: 'date'
                        },
                    },
                },
                LearningFact: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer'},
                        timesReviewed: {type: 'integer'},
                        confidenceLevel: {type: 'integer'},
                        lastReviewedDate: {type: 'string', format: 'date'},
                        packageId: {type: 'integer'},
                        disabled: {type: 'boolean'}
                    }
                },
                LearningFactNoId: {
                    type: 'object',
                    properties: {
                        timesReviewed: {type: 'integer'},
                        confidenceLevel: {type: 'integer'},
                        lastReviewedDate: {type: 'string', format: 'date'},
                        packageId: {type: 'integer'}
                    }
                }
            },
        },
    },
    apis: ['app-todo.ts'],
};

const apiDoc = swaggerJsdoc(jsDocOptions);
console.log('api-doc json:', JSON.stringify(apiDoc, null, 2));

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(apiDoc));

app.get('/api/liveness', (req: Request, res: Response) => {
    res.send('OK !!!');
});

interface Todo {
    id?: number;
    title: string;
    description?: string;
    priority?: number;
}

let idGenerator = 1;

function newId() {
    return idGenerator++;
}

let todos: Todo[] = [
    {id: newId(), title: 'Learn TypeScript'},
    {id: newId(), title: 'Learn Angular'},
    {id: newId(), title: 'Learn NodeJs'},
    {id: newId(), title: 'Learn Express'},
];

// The LearningPackage

// Follow activity globally :The UserPackageLearning records that a user has committed to learning a package with a daily time target.
interface UserPackageLearning {
    id: number;
    userId: number;
    packageId: number;
    startDate: Date;
    expectedEndDate: Date;
    minutesPerDayObjective: number;
}

// Follow activity in detail : The UserLearningFact tracks the user's progress for each fact in a package.
interface UserLearningFact {
    id: number;
    userId: number;
    factId: number;
    reviewCount: number;
    confidenceLevel: number;
    lastReviewedDate: Date;
}

/**
 * @openapi
 * /api/todos:
 *   get:
 *     description: Get all todos
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Todo'
 */
app.get('/api/todos', (req: Request, res: Response) => {
    console.log('handle http GET /api/todos');
    res.send(todos);
});

/**
 * @openapi
 * /api/todos:
 *   post:
 *     description: save a new Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoNoId'
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 */
app.post('/api/todos', (req: Request, res: Response) => {
    let item = <Todo>req.body;
    console.log('handle http POST /api/todos', item);
    item.id = newId();
    todos.push(item);
    res.send(item);
});

/**
 * @openapi
 * /api/todos:
 *   put:
 *     description: update an existing todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 */
app.put('/api/todos', (req: Request, res: Response) => {
    let item = <Todo>req.body;
    console.log('handle http PUT /api/todos', item);
    const id = item.id;
    const idx = todos.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = todos[idx];
        if (item.title) {
            found.title = item.title;
        }
        if (item.description) {
            found.description = item.description;
        }
        res.send(found);
    } else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});


/**
 * @openapi
 * /api/todos/{id}:
 *   get:
 *     description: get a todo by its id
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Todo to get
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: the todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.get('/api/todos/:id', (req, res) => {
    const id = +req.params['id']
    console.log('handle http GET /api/todos/:id', id);
    const idx = todos.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = todos[idx];
        res.send(found);
    } else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});


/**
 * @openapi
 * /api/todos/{id}:
 *   delete:
 *     description: delete an existing Todo by its id
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Todo to delete
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: the deleted Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 *       404:
 *         description: when the Todo was not found
 */
app.delete('/api/todos/:id', (req, res) => {
    const id = +req.params['id']
    console.log('handle http DELETE /api/todos/:id', id);
    const idx = todos.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = todos.splice(idx, 1)[0];
        res.send(found);
    } else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});

// Endpoint LearningPackage

/**
 * @openapi
 * /api/package:
 *   get:
 *     description: Get all learning packages
 *     responses:
 *       200:
 *         description: An array of LearningPackage
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningPackage'
 */
app.get('/api/package', async (req: Request, res: Response) => {
    try {
        const packages = await LearningPackage.findAll();
        res.status(200).json(packages);
    } catch (err) {
        console.error('Package recovery error :', err);
        res.status(500).json({error: 'Internal server error.'});
    }
});

/**
 * @openapi
 * /api/package/{id}:
 *   get:
 *     description: Get a learning package by its id
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Learning Package to get
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: the learning package
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: Learning Package not found
 */
app.get('/api/package/:id', async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const foundPackage = await LearningPackage.findByPk(id);
        if (foundPackage) {
            res.status(200).json(foundPackage);
        } else {
            res.status(404).json({error: `Package not found with ID : ${id}`});
        }
    } catch (err) {
        console.error('Package recovery error :', err);
        res.status(500).json({error: 'Internal server error.'});
    }
});

/**
 * @openapi
 * /api/package:
 *   post:
 *     description: save a new Learning Package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackageNoId'
 *     responses:
 *       200:
 *         description: An array of LearningPackages
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 */
app.post('/api/package', async (req: Request, res: Response) => {
    try {
        const newPackage = await LearningPackage.create(req.body);
        res.status(201).json(newPackage);
    } catch (err) {
        console.error('Package creation error :', err);
        res.status(400).json({error: 'Error during validation or creation.'});
    }
});

/**
 * @openapi
 * /api/package/{id}:
 *   put:
 *     description: Update an existing Learning Package
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Learning Package to update
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackageNoId'
 *     responses:
 *       200:
 *         description: Learning Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackageNoId'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Learning Package not found
 *       500:
 *         description: Server error
 */
app.put('/api/package/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title, description, category, targetAudience, difficulty} = req.body;

    try {
        if (!id) {
            res.status(400).json({error: 'Invalid or missing ID.'});
        }

        const learningPackage = await LearningPackage.findByPk(id);

        if (!learningPackage) {
            res.status(404).json({message: 'Learning package not found'});
        } else {
            if (learningPackage) {
                learningPackage.set({
                    title,
                    description,
                    category,
                    targetAudience,
                    difficulty,
                });
            }

            if (learningPackage) {
                await learningPackage.save();
            }

            res.status(200).json({
                message: 'Learning package successfully updated',
                data: learningPackage,
            });
        }
    } catch (error) {
        console.error('Error updating learning package', error);
        res.status(500).json({error: 'Internal server error.'});
    }
});

/**
 * @openapi
 * /api/package-summaries:
 *   get:
 *     description: Get all learning packages with id and title fields only
 *     responses:
 *       200:
 *         description: An array of LearningPackage
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningPackage'
 */


// Endpoint LearningFact

/**
 * @openapi
 * /api/fact:
 *   get:
 *     description: Get all LearningFacts
 *     responses:
 *       200:
 *         description: An array of LearningFacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningFact'
 */
app.get('/api/fact', async (req: Request, res: Response) => {
    try {
        const facts = await LearningFact.findAll();
        res.status(200).json(facts);
    } catch (err) {
        console.error('Error retrieving LearningFacts:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


/**
 * @openapi
 * /api/package/{id}/fact:
 *   post:
 *     description: Create and add a new LearningFact to a given package
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Learning Package
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLearningFactNoId'
 *     responses:
 *       201:
 *         description: LearningFact created successfully
 *       400:
 *         description: Invalid data or package not found
 */
app.post('/api/package/:id/fact', async (req: Request, res: Response) => {
    try {
        const packageId = +req.params.id;
        const learningPackage = await LearningPackage.findByPk(packageId);

        if (!learningPackage) {
            res.status(400).json({error: `Package with ID ${packageId} not found.`});
        }

        const newFact = await LearningFact.create({...req.body, packageId});
        res.status(201).json(newFact);
    } catch (err) {
        console.error('Error creating LearningFact:', err);
        res.status(400).json({error: 'Error during creation.'});
    }
});

/**
 * @openapi
 * /api/package/{id}/fact:
 *   put:
 *     description: Update an existing LearningFact of a given package
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Learning Package
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLearningFact'
 *     responses:
 *       200:
 *         description: LearningFact updated successfully
 *       400:
 *         description: Invalid data or LearningFact not found
 */
app.put('/api/package/:id/fact', async (req: Request, res: Response) => {
    try {
        const packageId = +req.params.id;
        const {id, ...data} = req.body;

        const learningFact = await LearningFact.findOne({where: {id, packageId}});

        if (!learningFact) {
            res.status(400).json({error: 'LearningFact not found or invalid package ID.'});
        }

        if (learningFact) {
            await learningFact.update(data);
        }
        res.status(200).json(learningFact);
    } catch (err) {
        console.error('Error updating LearningFact:', err);
        res.status(500).json({error: 'Internal server error.'});
    }
});

/**
 * @openapi
 * /api/package/{id}/fact:
 *   delete:
 *     description: Delete or disable an existing LearningFact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Learning Package
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLearningFact'
 *     responses:
 *       200:
 *         description: LearningFact marked as disabled
 *       400:
 *         description: LearningFact not found
 */
app.delete('/api/package/:id/fact', async (req: Request, res: Response) => {
    try {
        const packageId = +req.params.id;
        const {id} = req.body;

        const learningFact = await LearningFact.findOne({where: {id, packageId}});

        if (!learningFact) {
            res.status(400).json({error: 'LearningFact not found or invalid package ID.'});
        }

        if (learningFact) {
            await learningFact.update({disabled: true});
        }
        res.status(200).json({message: 'LearningFact successfully disabled.'});
    } catch (err) {
        console.error('Error disabling LearningFact:', err);
        res.status(500).json({error: 'Internal server error.'});
    }
});


// app.patch()

console.log('starting...');
app.listen(3000, () => {
    console.log('Ok, started port 3000, please open http://localhost:3000/swagger-ui');
});

