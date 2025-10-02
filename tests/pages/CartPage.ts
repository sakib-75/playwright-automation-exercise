import { Page } from '@playwright/test';
import BasePage from './BasePage';

export class CartPage extends BasePage {
    selectors: { [key: string]: string };

    constructor(page: Page) {
        super(page);

        this.selectors = {
            cartInfoTable: 'table#cart_info_table',
            proceedToCheckout: '#cart_items a.check_out',
            productInCartTable: '#cart_info_table tr[id*="product"]',
            productTitleInCartTable: '#cart_info_table td.cart_description h4 a',
            productPriceInCartTable: '#cart_info_table td.cart_price p',
            productQuantityInputInCartTable: '#cart_info_table td.cart_quantity button',
            productTotalPriceInCartTable: '#cart_info_table td.cart_total p',
            productDeleteFromCartTable: '#cart_info_table td a.cart_quantity_delete',
        };
    }


    async isCartPageVisible(): Promise<boolean> {
        try {
            const cartInfoTableVisible = await this.isElementVisible(this.selectors.cartInfoTable);
            const pageURL = await this.getCurrentUrl();
            return cartInfoTableVisible && pageURL.includes('/view_cart');
        } catch (e) {
            return false;
        }
    }

    async getProductCountInCart(): Promise<number> {
        return await this.page.locator(this.selectors.productInCartTable).count();
    }

    async getProductTitlesInCart(): Promise<string[]> {
        return await this.getListOfText(this.selectors.productTitleInCartTable);
    }

    async getProductPricesInCart(): Promise<string[]> {
        return await this.getListOfText(this.selectors.productPriceInCartTable);
    }

    async getProductQuantitiesInCart(): Promise<string[]> {
        return await this.getListOfText(this.selectors.productQuantityInputInCartTable);
    }

    async getProductTotalPricesInCart(): Promise<string[]> {
        return await this.getListOfText(this.selectors.productTotalPriceInCartTable);
    }
    async deleteProductFromCart(productIndex: number = 0): Promise<void> {
        const deleteButtons = this.page.locator(this.selectors.productDeleteFromCartTable);
        await deleteButtons.nth(productIndex).click();
    }
}
