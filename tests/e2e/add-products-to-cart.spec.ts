import { test } from '../fixtures/base-test';
import { expect } from '@playwright/test';
import { logger } from '../utils/logger';


test.describe('Add to Cart Tests - Test Case 2', () => {
  test('Verify user can search for products successfully (existent product)', async ({ homePage, productDetailsPage, cartPage }) => {
    await homePage.navigateToHomePage();
    expect(await homePage.isHomePageVisible()).toBeTruthy();
    logger.info('Navigated to home page');

    await homePage.clickViewProductPageLink(0);
    logger.info('Clicked "View Product" for any product on home page');

    expect(await productDetailsPage.isProductDetailsPageVisible()).toBeTruthy();
    expect(await productDetailsPage.areProductDetailsAvailable()).toBeTruthy();
    logger.info('Verified that user is navigated to product details page and product details are visible');

    const productQuantity = 4;
    await productDetailsPage.setProductQuantity(productQuantity);
    expect(await productDetailsPage.getProductQuantity()).toBe(productQuantity.toString());
    logger.info('Increased product quantity to 4');

    await productDetailsPage.clickAddToCartButton();
    expect(await productDetailsPage.isCartModalVisible()).toBeTruthy();
    logger.info('Clicked "Add to cart" button');

    await productDetailsPage.clickViewCartLink();
    expect(await cartPage.isCartPageVisible()).toBeTruthy();
    logger.info('Clicked "View Cart" link in the modal');

    expect(await cartPage.getProductCountInCart()).toBe(1);
    const productQuantitiesInCart = await cartPage.getProductQuantitiesInCart();
    expect(productQuantitiesInCart[0]).toEqual(productQuantity.toString());
    logger.info('Verified that product is displayed in cart page with exact quantity');

  });


}); 