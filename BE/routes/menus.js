import { Router } from 'express';
const router = Router();

// Fake Data
const menuItems = [
  { name: 'Croissant', level: 'viewer' },
  { name: 'Latte', level: 'viewer' },
  { name: 'Hot Chocolate', level: 'viewer' },
  { name: 'Satay', level: 'admin' },
  { name: 'Pad Thai', level: 'admin' },
];

const getMenus = async (req, res) => {
  try {
    const filteredMenus = menuItems
      .filter((menuItem) =>
        req.isAdmin
          ? menuItem.level === 'viewer' || menuItem.level === 'admin'
          : menuItem.level === 'viewer'
      )
      .map((menuItem) => menuItem.name);

    res.status(200).send(filteredMenus);
  } catch (error) {
    res.status(500).send(error);
  }
};

router.get('/menus', getMenus);

export default router;
