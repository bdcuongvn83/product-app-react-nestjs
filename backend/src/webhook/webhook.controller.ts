import { Body, Controller, Post } from '@nestjs/common';
import { Operator } from 'src/product/const';
import { ProductService } from 'src/product/product.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly productService: ProductService) {}
  FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

  @Post()
  async handleWebhook(@Body() body: any): Promise<any> {
    console.log('handleWebhook, body :', body);
    const maxlimit = 3;

    const intentName = body.queryResult.intent.displayName; // or body.queryResult.intent.name
    let products = [];
    let keyword = '';
    let nextSuggestTitle = `Would you like to search for a suitable option within a budget, e.g: around $1000?`;
    let nextSuggestSubTitle = 'Please input price.';

    console.log('intentName:', intentName);

    if (intentName === 'i-provide-category-laptop') {
      // Handle search product intent, query the database for products

      console.log('handleWebhook, search category:laptop:');
      keyword = 'laptop';
      products = await this.productService.searchProduct(
        keyword,
        null,
        undefined,
        undefined,
        maxlimit,
      );
    } else if (intentName === 'i-provide-productname') {
      keyword = body.queryResult.parameters['e-productname'] || 'default';
      console.log('handleWebhook, keyword:', keyword);

      products = await this.productService.searchProduct(
        null,
        keyword,
        undefined,
        undefined,
        maxlimit,
      );
    } else if (intentName === 'i-provide-productname - price') {
      const price = body.queryResult.parameters['price'] || 'default';
      const outputContexts = body.queryResult.outputContexts;
      const context = outputContexts.find((ctx) =>
        ctx.name.includes('i-input-productname'),
      );
      const productName = context?.parameters?.['e-productname.original']; // Đổi tên đúng theo context cha
      console.log('Product Name:', productName);

      console.log('handleWebhook, keyword price', price);

      products = await this.productService.searchProduct(
        null,
        productName,
        price,
        undefined,
        maxlimit,
      );
      nextSuggestTitle = `Would you like to search more product(yes/no)`;
      nextSuggestSubTitle = 'Please input yes/no.';
    } else if (intentName === 'i-provide-category-laptop - price') {
      const price = body.queryResult.parameters['price'] || 10000;
      keyword = `category:laptop, price: ${price}`;
      products = await this.productService.searchProduct(
        'laptop',
        null,
        price,
        Operator.lessthan,
        maxlimit,
      );
      nextSuggestTitle = `Would you like to search more product(yes/no)`;
      nextSuggestSubTitle = 'Please input yes/no.';
    } else if (intentName === 'i-provide-category-laptop - productname') {
      // Handle search product intent, query the database for products
      keyword = body.queryResult.parameters['e-productname'] || 'default';
      console.log('handleWebhook, keyword:', keyword);

      products = await this.productService.searchProduct(
        null,
        keyword,
        undefined,
        undefined,
        maxlimit,
      );
    } else if (intentName === 'i-provide- category-iphone') {
      // Handle search product intent, query the database for products
      //let keyword = body.queryResult.parameters['e-laptop'] || 'default';
      console.log('handleWebhook, keyword:', keyword);
      keyword = 'phone';
      products = await this.productService.searchProduct(
        keyword,
        null,
        undefined,
        undefined,
        maxlimit,
      );
    } else if (intentName === 'i-provide- category-iphone - price') {
      const price = body.queryResult.parameters['price'] || 10000;
      keyword = `category:phone, price: ${price}`;
      products = await this.productService.searchProduct(
        'phone',
        null,
        price,
        Operator.lessthan,
        maxlimit,
      );
      //
      nextSuggestTitle = `Would you like to search more product(yes/no)`;
      nextSuggestSubTitle = 'Please input yes/no.';
    }

    console.log('handleWebhook, result products:', products);
    let response = {};
    if (products.length == 0) {
      console.log('handleWebhook, case no products:');
      response = {
        fulfillmentMessages: [
          {
            payload: {
              richContent: [
                [
                  {
                    type: 'info',
                    title: `We found ${products.length} products for the keyword "${keyword}"`,
                    subtitle: nextSuggestTitle,
                  },
                ],
              ],
            },
          },
        ],
      };
      return response;
    } else {
      response = {
        fulfillmentMessages: [
          {
            payload: {
              richContent: [
                [
                  {
                    type: 'info',
                    title: `We found ${products.length} products for the keyword "${keyword}"`,
                    subtitle: 'Click below to view more details.',
                    actionLink: `${this.FRONTEND_URL}/Users/ProductItemSelect/${products[0].id}`,
                  },
                ],
                [
                  // Tạo một card có thể nhấp cho mỗi sản phẩm
                  ...products.slice(0, 3).map((product) => ({
                    type: 'info',
                    title: `${product.productName} - $${product.price}`,
                    subtitle: `Click to view details`,
                    actionLink: `${this.FRONTEND_URL}/Users/ProductItemSelect/${product.id}`,
                  })),
                ],
                [
                  {
                    type: 'info',
                    title: nextSuggestTitle,
                    subtitle: nextSuggestSubTitle,
                  },
                ],
              ],
            },
          },
        ],
      };

      return response;
    }
  }
}
