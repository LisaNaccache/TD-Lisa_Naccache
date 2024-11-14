import * as express from 'express';
import {Request, Response} from 'express';

const app = express();
app.use(express.json()); // => to parse request body with http header "content-type": "application/json"


import swaggerJsdoc = require('swagger-jsdoc'); // * as swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi = require('swagger-ui-express');


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
                        timesReviewed: {
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
            },
        },
    },
    apis: ['app-todo.js'],
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
interface LearningPackage {
    id: number;
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    difficulty: number;
}

let learningPackages: LearningPackage[] = [
    {
        id: 1,
        title: "Learn TypeScript",
        description: "An introduction to TypeScript language and its core concepts.",
        category: "Programming",
        targetAudience: "Developers",
        difficulty: 5
    },
    {
        id: 2,
        title: "Learn NodeJs",
        description: "Learn the basics of Node.js and how to create a server.",
        category: "Backend Development",
        targetAudience: "Web Developers",
        difficulty: 6
    },
    {
        id: 3,
        title: "Learn Html",
        description: "Learn the fundamentals of HTML for web development.",
        category: "Frontend Development",
        targetAudience: "Beginners",
        difficulty: 3
    },
    {
        id: 4,
        title: "Learn Angular",
        description: "An introduction to Angular framework for building dynamic web applications.",
        category: "Frontend Frameworks",
        targetAudience: "Frontend Developers",
        difficulty: 7
    }
];


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
    timesReviewed: number;
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
app.get('/api/package', (req, res) => {
    res.status(200).json(learningPackages);
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
app.get('/api/package/:id', (req, res) => {
    const id = +req.params['id']
    console.log('handle http GET /api/package/:id', id);
    const idx = learningPackages.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = learningPackages[idx];
        res.send(found);
    } else {
        res.status(404).send('Learning Package entity not found by id:' + id);
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
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: An array of LearningPackages
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 */
app.post('/api/package', (req: Request, res: Response) => {
    let item = <LearningPackage>req.body;
    console.log('handle http POST /api/package', item);
    item.id = newId();
    learningPackages.push(item);
    res.send(item);
});


// app.patch()


console.log('starting...');
app.listen(3000, () => {
    console.log('Ok, started port 3000, please open http://localhost:3000/swagger-ui');
});

