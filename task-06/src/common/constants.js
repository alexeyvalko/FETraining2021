const K1 = 1000; // цена K1
const K2 = 2000; // цена K2

const extraCharge1 = 20;
const extraCharge2 = 15;
const extraCharge3 = 10;

const TITLE_BREADS = 'Основание';
const TITLE_INGREDIENTS = 'Ингридиенты';
const TITLE_SAUCES = 'Соусы';

const ingredients = [
  { name: 'Сыр', cost: 252, calories: 100 },
  { name: 'Колбаса', cost: 265, calories: 111 },
  { name: 'Мясо', cost: 275, calories: 12 },
  { name: 'Грибы', cost: 310, calories: 12 },
  { name: 'Морепродукты', cost: 360, calories: 102 },
];

const sauces = [
  { name: 'Томатный соус', cost: 185, calories: 120 },
  { name: 'Чесночный соус', cost: 150, calories: 110 },
  { name: 'Cырный соус', cost: 140, calories: 50 },
  { name: 'Соус "Биг Тейсти"', cost: 220, calories: 80 },
];

const breads = [
  { name: 'Тонкое', cost: 350, calories: 100 },
  { name: 'Толстое', cost: 380, calories: 120 },
  { name: 'Слоёное', cost: 410, calories: 130 },
  { name: 'Кальцоне', cost: 580, calories: 135 },
  { name: 'Итальянское', cost: 590, calories: 135 },
];

export {
  K1,
  K2,
  ingredients,
  sauces,
  breads,
  TITLE_BREADS,
  TITLE_INGREDIENTS,
  TITLE_SAUCES,
  extraCharge1,
  extraCharge2,
  extraCharge3,
};
