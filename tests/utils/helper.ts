import moment from 'moment';


class Helpers {
  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomNumber(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRandomEmail(): string {
    return `user_${this.generateRandomString(8)}@example.com`;
  }

  static getCurrentDateTime(): string {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  static getCurrentDate(): string {
    return moment().format('YYYY-MM-DD');
  }

  static getCurrentTime(): string {
    return moment().format('HH:mm:ss');
  }

  static formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
    return moment(date).format(format);
  }

  static addDays(date: Date | string, days: number): string {
    return moment(date).add(days, 'days').format('YYYY-MM-DD');
  }

  static subtractDays(date: Date | string, days: number): string {
    return moment(date).subtract(days, 'days').format('YYYY-MM-DD');
  }

  static async waitForTimeout(milliseconds: number): Promise<void> {
    console.log(`Waiting for ${milliseconds}ms`);
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static sanitizeString(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  }

  static removeSpecialCharacters(str: string): string {
    return str.replace(/[^a-zA-Z0-9]/g, '');
  }

  static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static parsePrice(priceStr: string): number {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  }

}

export default Helpers;
