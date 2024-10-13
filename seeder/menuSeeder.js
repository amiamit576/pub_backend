import Product from '../models/product.model.js';
import seedData from '../utlis/seeder.js';

const imageBaseURL = '/assets/images/';

const menuItems = [
  { name: 'Mojito', price: 10, category: 'Cocktail', image: `${imageBaseURL}wine1.jpg` },
  { name: 'Beer', price: 12, category: 'Alcoholic Beverage', image: `${imageBaseURL}beer1.jpg` },
  { name: 'Whiskey Sour', price: 14, category: 'Cocktail', image: `${imageBaseURL}skotch1.jpg` },
  { name: 'Gin & Tonic', price: 16, category: 'Cocktail', image: `${imageBaseURL}wine1.jpg` },
  { name: 'IPA Beer', price: 18, category: 'Alcoholic Beverage', image: `${imageBaseURL}skotch2.jpg` },
  { name: 'Old Fashioned', price: 20, category: 'Cocktail', image: `${imageBaseURL}skotch3.jpg` },
  { name: 'Martini', price: 22, category: 'Cocktail', image: `${imageBaseURL}wine2.jpg` },
  { name: 'Tequila Sunrise', price: 24, category: 'Cocktail', image: `${imageBaseURL}wine3.jpg` },
  { name: 'Wine - Red', price: 26, category: 'Wine', image: `${imageBaseURL}wine1.jpg` },
  { name: 'Wine - White', price: 28, category: 'Wine', image: `${imageBaseURL}wine2.jpg` },
  { name: 'Margarita', price: 30, category: 'Cocktail', image: `${imageBaseURL}beer2.jpg` },
  { name: 'Rum & Coke', price: 32, category: 'Cocktail', image: `${imageBaseURL}beer3.jpg` },
  { name: 'Pina Colada', price: 34, category: 'Cocktail', image: `${imageBaseURL}skotch2.jpg` },
  { name: 'Craft Beer', price: 36, category: 'Alcoholic Beverage', image: `${imageBaseURL}skotch2.jpg` },
  { name: 'Lager Beer', price: 38, category: 'Alcoholic Beverage', image: `${imageBaseURL}wine1.jpg` }
];


seedData(Product, menuItems);
