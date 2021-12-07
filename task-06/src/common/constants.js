const K1 = 1000; // цена K1
const K2 = 2000; // цена K2

const TITLE_BREADS = 'Основание';
const TITLE_INGREDIENTS = 'Ингридиенты';
const TITLE_SAUCES = 'Соусы';

const ingredients = [
  { name: 'Сыр', cost: 11, calories: 100 },
  { name: 'Колбаса', cost: 21, calories: 111 },
  { name: 'Мясо', cost: 21, calories: 122 },
  { name: 'Морепродукты', cost: 150, calories: 102 },
];

const sauces = [
  { name: 'Томатный соус', cost: 11, calories: 100 },
  { name: 'Чесночный соус', cost: 11, calories: 100 },
  { name: 'Cырный соус', cost: 11, calories: 100 },
  { name: 'Соус "Биг Тейсти"', cost: 11, calories: 100 },
];

const breads = [
  { name: 'Тонкое', cost: 11, calories: 100 },
  { name: 'Толстое', cost: 15, calories: 120 },
  { name: 'Слоёное', cost: 20, calories: 130 },
  { name: 'Кальцоне', cost: 50, calories: 135 },
  { name: 'Итальянское', cost: 50, calories: 135 },
];

export { K1, K2, ingredients, sauces, breads, TITLE_BREADS, TITLE_INGREDIENTS, TITLE_SAUCES};
