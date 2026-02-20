const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  validateTodoCreation,
  validateTodoUpdate,
} = require('../middleware/validation');
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoCompletion,
} = require('../controllers/todoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Todo ID
 *         title:
 *           type: string
 *           description: Todo title
 *         description:
 *           type: string
 *           description: Todo description
 *         completed:
 *           type: boolean
 *           description: Todo completion status
 *         userId:
 *           type: string
 *           description: User ID who owns the todo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Todo creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Todo last update date
 *     TodoResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             todo:
 *               $ref: '#/components/schemas/Todo'
 *             todos:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *             count:
 *               type: number
 *               description: Number of todos
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos for the authenticated user
 *     tags: [Todos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by completion status (true/false)
 *     responses:
 *       200:
 *         description: Todos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       401:
 *         description: Unauthorized - No token provided
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     tags: [Todos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       401:
 *         description: Unauthorized - No token provided
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticate, getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: Todo title
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 description: Todo description (optional)
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Bad request - Validation error
 *       401:
 *         description: Unauthorized - No token provided
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, validateTodoCreation, createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: Todo title
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 description: Todo description
 *               completed:
 *                 type: boolean
 *                 description: Todo completion status
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Bad request - Validation error
 *       401:
 *         description: Unauthorized - No token provided
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, validateTodoUpdate, updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - No token provided
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, deleteTodo);

/**
 * @swagger
 * /api/todos/{id}/toggle:
 *   patch:
 *     summary: Toggle todo completion status
 *     tags: [Todos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo completion status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       401:
 *         description: Unauthorized - No token provided
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id/toggle', authenticate, toggleTodoCompletion);

module.exports = router;
