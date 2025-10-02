import { Page } from '@playwright/test';
import BasePage from './BasePage';

export class ProductsPage extends BasePage {
    selectors: { [key: string]: string };

    constructor(page: Page) {
        super(page);

        this.selectors = {
            productsHeader: '//h2[text()="All Products"]',
            searchInput: 'input[id="search_product"]',
            searchButton: 'button[id="submit_search"]',
            productsList: '.features_items .product-image-wrapper',
            productTitles: 'div.single-products div[class*="productinfo"] p',
        };
    }


    async isProductsPageVisible(): Promise<boolean> {
        try {
            const productsHeaderVisible = await this.isElementVisible(this.selectors.productsHeader);
            const pageURL = await this.getCurrentUrl();
            return productsHeaderVisible && pageURL.includes('/products');
        } catch (e) {
            return false;
        }
    }

    async searchForProduct(productName: string): Promise<void> {
        await this.fillInputField(this.selectors.searchInput, productName);
        await this.clickElement(this.selectors.searchButton);
    }

    async getListOfProductTitle(): Promise<string[]> {
        const productTitles = await this.getListOfText(this.selectors.productTitles);
        console.log('Product Titles:', productTitles);
        return productTitles;
    }

}
