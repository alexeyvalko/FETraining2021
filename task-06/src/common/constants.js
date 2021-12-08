const K1 = 1000; // цена K1
const K2 = 2000; // цена K2

const extraCharge1 = 20;
const extraCharge2 = 15;
const extraCharge3 = 10;

const TITLE_BREADS = 'Основание';
const TITLE_INGREDIENTS = 'Ингридиенты';
const TITLE_SAUCES = 'Соусы';

const ingredients = [
  { name: 'Сыр', cost: 70, calories: 100 },
  { name: 'Колбаса', cost: 65, calories: 111 },
  { name: 'Мясо', cost: 55, calories: 122 },
  { name: 'Морепродукты', cost: 120, calories: 102 },
];

const sauces = [
  { name: 'Томатный соус', cost: 15, calories: 100 },
  { name: 'Чесночный соус', cost: 20, calories: 100 },
  { name: 'Cырный соус', cost: 30, calories: 100 },
  { name: 'Соус "Биг Тейсти"', cost: 50, calories: 100 },
];

const breads = [
  { name: 'Тонкое', cost: 110, calories: 100 },
  { name: 'Толстое', cost: 150, calories: 120 },
  { name: 'Слоёное', cost: 200, calories: 130 },
  { name: 'Кальцоне', cost: 500, calories: 135 },
  { name: 'Итальянское', cost: 500, calories: 135 },
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
