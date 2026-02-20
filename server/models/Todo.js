const mongoose = require('mongoose');

/**
 * Todo Schema for task management
 */
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

/**
 * Find todos by user ID
 * @param {string} userId - User ID
 * @param {Object} filters - Additional filters
 * @returns {Promise<Array>} Array of todo documents
 */
todoSchema.statics.findByUserId = function (userId, filters = {}) {
  return this.find({ userId, ...filters }).sort({ createdAt: -1 });
};

/**
 * Find todo by ID and user ID (ensures user owns the todo)
 * @param {string} todoId - Todo ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Todo document
 */
todoSchema.statics.findByIdAndUserId = function (todoId, userId) {
  return this.findOne({ _id: todoId, userId });
};

/**
 * Update todo completion status
 * @param {boolean} completed - New completion status
 * @returns {Promise<Object>} Updated todo document
 */
todoSchema.methods.updateCompletion = function (completed) {
  this.completed = completed;
  return this.save();
};

todoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
