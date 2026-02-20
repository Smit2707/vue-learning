const Todo = require('../models/Todo');

/**
 * Get all todos for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllTodos = async (req, res) => {
  try {
    const { completed } = req.query;
    const filters = {};

    // Filter by completion status if provided
    if (completed !== undefined) {
      filters.completed = completed === 'true';
    }

    const todos = await Todo.findByUserId(req.user._id, filters);

    res.status(200).json({
      success: true,
      message: 'Todos retrieved successfully',
      data: {
        todos,
        count: todos.length,
      },
    });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving todos',
    });
  }
};

/**
 * Get a single todo by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUserId(id, req.user._id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo retrieved successfully',
      data: {
        todo,
      },
    });
  } catch (error) {
    console.error('Get todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving todo',
    });
  }
};

/**
 * Create a new todo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.create({
      title,
      description,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: {
        todo,
      },
    });
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating todo',
    });
  }
};

/**
 * Update a todo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByIdAndUserId(id, req.user._id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Update fields if provided
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: {
        todo,
      },
    });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating todo',
    });
  }
};

/**
 * Delete a todo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUserId(id, req.user._id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting todo',
    });
  }
};

/**
 * Toggle todo completion status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const toggleTodoCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUserId(id, req.user._id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    await todo.updateCompletion(!todo.completed);

    res.status(200).json({
      success: true,
      message: `Todo marked as ${todo.completed ? 'completed' : 'incomplete'}`,
      data: {
        todo,
      },
    });
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while toggling todo',
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoCompletion,
};
