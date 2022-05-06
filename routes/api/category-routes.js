const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
  let categoryData = await Category.findAll({
    include: [{ model: Product }],
  })
  res.status(200).json(categoryData);
} catch (error) {
  res.status(500).json(error);
}
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    let categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product }]
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData)
  } 
  catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    let categoryData = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(categoryData);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    let categoryData = await Category.update(
      {
       category_name: req.body.category_name
      },
      {
       where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(categoryData);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    let categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
        return;
    }

    res.status(200).json(categoryData);
  }
  catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
