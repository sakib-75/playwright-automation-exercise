import { Page } from '@playwright/test';
import BasePage from './BasePage';

export class ProductDetailsPage extends BasePage {
    selectors: { [key: string]: string };

    constructor(page: Page) {
        super(page);

        this.selectors = {
            productTitle: 'div.product-details div.product-information h2',
            productPrice: 'div.product-details div.product-information span span',
            productCategory: 'div.product-details div.product-information p:has-text("Category:")',
            productAvailability: 'div.product-details div.product-information p:has-text("Availability")',
            productCondition: 'div.product-details div.product-information p:has-text("Condition")',
            productBrand: 'div.product-details div.product-information p:has-text("Brand")',
            productQuantityInput: 'div.product-details input#quantity',
            addToCartButton: 'div.product-details button[class*="cart"]',
            cartModal: 'div#cartModal div.modal-content',
            viewCartLink: 'div#cartModal a[href="/view_cart"]',
            continueShoppingButton: 'div#cartModal button:has-text("Continue Shopping")',
        };
    }


    async isProductDetailsPageVisible(): Promise<boolean> {
        try {
            const productTitleVisible = await this.isElementVisible(this.selectors.productTitle);
            const addToCartButtonVisible = await this.isElementVisible(this.selectors.addToCartButton);
            const pageURL = await this.getCurrentUrl();
            return productTitleVisible && addToCartButtonVisible && pageURL.includes('/product_details/');
        } catch (e) {
            return false;
        }
    }

    async getProductTitle(): Promise<string | null> {
        return await this.getText(this.selectors.productTitle);
    }

    async getProductPrice(): Promise<string | null> {
        return await this.getText(this.selectors.productPrice);
    }

    async getProductCategory(): Promise<string | null> {
        return await this.getText(this.selectors.productCategory);
    }

    async getProductAvailability(): Promise<string | null> {
        return await this.getText(this.selectors.productAvailability);
    }

    async getProductCondition(): Promise<string | null> {
        return await this.getText(this.selectors.productCondition);
    }

    async getProductBrand(): Promise<string | null> {
        return await this.getText(this.selectors.productBrand);
    }

    async areProductDetailsAvailable(): Promise<boolean> {
        try {
            const [title, price, category, availability, condition, brand] = await Promise.all([
                this.getProductTitle(),
                this.getProductPrice(),
                this.getProductCategory(),
                this.getProductAvailability(),
                this.getProductCondition(),
                this.getProductBrand(),
            ]);

            const values = { title, price, category, availability, condition, brand };

            for (const [key, value] of Object.entries(values)) {
                if (value === null) return false;
                if (typeof value === 'string' && value.trim().length === 0) return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }

    async setProductQuantity(quantity: number): Promise<void> {
        await this.clearField(this.selectors.productQuantityInput);
        await this.fillInputField(this.selectors.productQuantityInput, quantity.toString());
    }

    async getProductQuantity(): Promise<string | null> {
        return await this.getInputValue(this.selectors.productQuantityInput);
    }

    async clickAddToCartButton(): Promise<void> {
        await this.clickElement(this.selectors.addToCartButton);
    }

    async isCartModalVisible(): Promise<boolean> {
        return await this.isElementVisible(this.selectors.cartModal);
    }

    async clickViewCartLink(): Promise<void> {
        await this.clickElement(this.selectors.viewCartLink);
    }

    async clickContinueShoppingButton(): Promise<void> {
        await this.clickElement(this.selectors.continueShoppingButton);
    }
}
