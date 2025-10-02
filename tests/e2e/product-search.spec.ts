import { test } from '../fixtures/base-test';
import { expect } from '@playwright/test';
import {logger } from '../utils/logger';


test.describe('Product Search Tests - Test Case 1', () => {
  test('Verify user can search for products successfully (existent products)', async ({ homePage, productsPage }) => {
    await homePage.navigateToHomePage();
    expect(await homePage.isHomePageVisible()).toBeTruthy;
    logger.info('Navigated to home page');

    await homePage.clickProductsNavItem();
    expect(await productsPage.isProductsPageVisible()).toBeTruthy;
    logger.info('Clicked on "Products" from navbar');

    const searchTerms = ['Men Tshirt', 'Jeans', 'Winter Top'];
    for (const term of searchTerms) {
      await productsPage.searchForProduct(term);
      const productTitles = await productsPage.getListOfProductTitle();
      logger.info(`Searched for product: ${term}`);

      expect(productTitles.length).toBeGreaterThan(0);
      for (const title of productTitles) {
        expect(title.toLowerCase()).toContain(term.toLowerCase());
      }
      logger.info(`Verified that all displayed products contain the search term: ${term}`);
    }
  });

  test('Verify search with no results (non-existent product)', async ({ homePage, productsPage }) => {
    await homePage.navigateToHomePage();
    expect(await homePage.isHomePageVisible()).toBeTruthy;
    logger.info('Navigated to home page');

    await homePage.clickProductsNavItem();
    expect(await productsPage.isProductsPageVisible()).toBeTruthy;
    logger.info('Clicked on "Products" button');

    await productsPage.searchForProduct('NonExistentProduct12345');
    logger.info('Searched for a non-existent product');

    const productTitles = await productsPage.getListOfProductTitle();
    expect(productTitles.length).toBe(0);
    logger.info('Verified that no products are displayed for non-existent product search');
  });

});