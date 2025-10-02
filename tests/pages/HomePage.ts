import { Page } from '@playwright/test';
import BasePage from './BasePage';

export class HomePage extends BasePage {
    selectors: { [key: string]: string };

    constructor(page: Page) {
        super(page);

        this.selectors = {
            logo: 'div[class*="logo"] img[alt="Website for automation practice"]',
            homeNavItem: 'ul[class*="navbar-nav"] a[href="/"]',
            productsNavItem: 'ul[class*="navbar-nav"] a[href="/products"]',
            signupLoginNavItem: 'a[href="/login"]',
            viewProductLink: 'a[href*="/product_details/"]',
        };
    }

    async navigateToHomePage(): Promise<void> {
        await this.navigateTo('/');
    }

    async isHomePageVisible(): Promise<boolean> {
        try {
            const logoVisible = await this.isElementVisible(this.selectors.logo);
            const homeNavItemVisible = await this.isElementVisible(this.selectors.homeNavItem);
            const productsNavItemVisible = await this.isElementVisible(this.selectors.productsNavItem);
            return logoVisible && homeNavItemVisible && productsNavItemVisible;
        } catch (e) {
            return false;
        }
    }

    async clickProductsNavItem(): Promise<void> {
        await this.clickElement(this.selectors.productsNavItem);
    }

    async clickViewProductPageLink(productIndex: number = 0): Promise<void> {
        const viewProductLinks = this.page.locator(this.selectors.viewProductLink);
        await viewProductLinks.nth(productIndex).click();
    }

}