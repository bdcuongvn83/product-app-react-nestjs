import { Body, Controller, Post } from '@nestjs/common';
import { Operator } from 'src/product/const';
import { ProductService } from 'src/product/product.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly productService: ProductService) {}

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

    const response = {
      fulfillmentMessages: [
        {
          payload: {
            richContent: [
              [
                {
                  type: 'info',
                  title: `We found ${products.length} products for the keyword "${keyword}"`,
                  subtitle: 'Click below to view more details.',
                  actionLink: `http://localhost:3000/Users/ProductItemSelect/${products[0].id}`,
                },
              ],
              [
                // Tạo một card có thể nhấp cho mỗi sản phẩm
                ...products.slice(0, 3).map((product) => ({
                  type: 'info',
                  title: `${product.productName} - $${product.price}`,
                  subtitle: `Click to view details`,
                  actionLink: `http://localhost:3000/Users/ProductItemSelect/${product.id}`,
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
