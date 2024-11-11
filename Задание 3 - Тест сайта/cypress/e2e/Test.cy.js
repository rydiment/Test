
describe('SauceDemo Tests', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com', { timeout: 120000 }); 
    });
  
    it('Вписываем пользователя и пароль', () => {
      const username = 'standard_user';
      const password = 'secret_sauce';
  
      cy.get('[id=user-name]').type(username);
      cy.get('[id=password]').type(password);
      cy.get('[id=login-button]').click();
  
     
      cy.url().should('include', '/inventory.html');
    });
  
    it('Тест сортировки по возрастанию', () => {
      
      cy.get('[id=user-name]').type('standard_user');
      cy.get('[id=password]').type('secret_sauce');
      cy.get('[id=login-button]').click();
  
      
      cy.url().should('include', '/inventory.html');
  
     
      cy.get('.product_sort_container').select('lohi');
  
      let prices = [];
      cy.get('.inventory_item_price').each(($el) => {
        const priceText = $el.text().replace('$', '');
        prices.push(parseFloat(priceText));
      }).then(() => {
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });
    });
  
    it('Тест сортировки по убыванию', () => {
      
      cy.get('[id=user-name]').type('standard_user');
      cy.get('[id=password]').type('secret_sauce');
      cy.get('[id=login-button]').click();
  
      
      cy.url().should('include', '/inventory.html');
  
     
      cy.get('.product_sort_container').select('hilo');
  
      let prices = [];
      cy.get('.inventory_item_price').each(($el) => {
        const priceText = $el.text().replace('$', '');
        prices.push(parseFloat(priceText));
      }).then(() => {
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).to.deep.equal(sortedPrices);
      });
    });
  
    it('Тест добавления в корзину', () => {
   
      cy.get('[id=user-name]').type('standard_user');
      cy.get('[id=password]').type('secret_sauce');
      cy.get('[id=login-button]').click();
  
      
      cy.url().should('include', '/inventory.html');
  
     
      cy.get('.btn.btn_primary.btn_small.btn_inventory')
        .then(($els) => {
          for (let i = 0; i < 2; i++) {
            cy.wrap($els[i]).click();
          }
        });
  
      
      cy.get('.shopping_cart_badge').click();
      cy.get('.btn.btn_action.btn_medium.checkout_button').click();
  
      cy.get('#first-name').type('Sergei');
      cy.get('#last-name').type('Eltsov');
      cy.get('#postal-code').type('426018');
  
      cy.get('#continue').click();
      cy.get('#finish').click();
      cy.get('#back-to-products').click();
    });
  });