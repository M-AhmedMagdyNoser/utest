const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubcategoryModal = require("../models/subcategoryModel");
const ApiError = require("../utils/apiError");

exports.createSubcategory = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const slug = slugify(title, { lower: true });
  const subcategory = new SubcategoryModal({
    title,
    slug,
    description,
    category,
  });
  await subcategory.save();
  res.status(201).json({ data: subcategory });
});

exports.getSubcategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const subcategories = await SubcategoryModal.find().skip(skip).limit(limit);
  res.status(200).json({
    page,
    limit,
    results: subcategories.length,
    data: subcategories,
  });
});

exports.getSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubcategoryModal.findById(id);
  if (!subcategory)
    return next(new ApiError(404, `Subcategory not found with id: ${id}`));
  res.status(200).json({ data: subcategory });
});

exports.updateSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  const slug = slugify(title, { lower: true });
  const subcategory = await SubcategoryModal.findByIdAndUpdate(
    id,
    { title, slug, description, category },
    { new: true }
  );
  if (!subcategory)
    return next(new ApiError(404, `Subcategory not found with id: ${id}`));
  res.status(200).json({ message: "Subcategory updated", data: subcategory });
});

exports.deleteSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubcategoryModal.findByIdAndDelete(id);
  if (!subcategory)
    return next(new ApiError(404, `Subcategory not found with id: ${id}`));
  res.status(204).send();
});
