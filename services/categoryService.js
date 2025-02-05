const CategoryModal = require("../models/categoryModel");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const slug = slugify(title, { lower: true });
    const category = new CategoryModal({ title, slug, description });
    await category.save();
    res.status(201).json({ data: category });
  } catch (err) {
    res.status(500).json({ message: `Error creating category: ${err}` });
  }
};

// Without pagination
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await CategoryModal.find();
//     res.status(200).json({ results: categories.length, data: categories });
//   } catch (err) {
//     res.status(500).json({ message: `Error fetching categories: ${err}` });
//   }
// };

// With pagination
exports.getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const categories = await CategoryModal.find().skip(skip).limit(limit);
    res.status(200).json({
      page,
      limit,
      results: categories.length,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ message: `Error fetching categories: ${err}` });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModal.findOne({ _id: id }); // or `findById(id)`
    if (!category)
      return res
        .status(404)
        .json({ message: `Category not found with id: ${id}` });
    res.status(200).json({ data: category });
  } catch (err) {
    res.status(500).json({ message: `Error fetching category: ${err}` });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const slug = slugify(title, { lower: true });
    const category = await CategoryModal.findOneAndUpdate( // or `findByIdAndUpdate(id, ...)`
      { _id: id }, // Find the category by its ID
      { title, slug, description }, // Updating fields
      { new: true } // `true` to return the updated category (`false` by default)
    );
    if (!category)
      return res
        .status(404)
        .json({ message: `Category not found with id: ${id}` });
    res.status(200).json({ message: "Category updated", data: category });
  } catch (err) {
    res.status(500).json({ message: `Error updating category: ${err}` });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModal.findOneAndDelete({ _id: id }); // or `findByIdAndDelete(id)`
    if (!category)
      return res
        .status(404)
        .json({ message: `Category not found with id: ${id}` });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: `Error deleting category: ${err}` });
  }
};