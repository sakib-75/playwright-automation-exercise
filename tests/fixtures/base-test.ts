import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';


type CustomFixtures = {
  homePage: HomePage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage
  cartPage: CartPage;
};

const test = base.extend<CustomFixtures>({
  homePage: async ({ page }, use) => {
    // logger.info('Creating HomePage instance');
    const homePage = new HomePage(page);
    await use(homePage);
  },
  
  productsPage: async ({ page }, use) => {
    // logger.info('Creating ProductsPage instance');
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  
});

export { test };
