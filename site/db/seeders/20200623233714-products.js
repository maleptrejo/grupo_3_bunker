'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
  
    
    return queryInterface.bulkInsert('products', [
    
      {
        name: faker.commerce.productName(),
        price: faker.commerce.price(800,1000),
        description: faker.lorem.paragraph(2),
        image1: "1590366786500.jpg",
        image2: "1590366786500.jpg",
        image3: "1590366786500.jpg",
        stock: 3,
        brand_id: 1,
        category_id: 1, 
        discount_id: 1, 
        },
        {
          name: faker.commerce.productName(),
          price: faker.commerce.price(800,1000),
          description: faker.lorem.paragraph(2),
          image1: "1590367166457.jpg",
          image2: "1590367166457.jpg",
          image3: "1590367166457.jpg",
          stock: 2,
          brand_id: 2,
          category_id: 2, 
          discount_id: 2, 
          },
          {
            name: faker.commerce.productName(),
            price: faker.commerce.price(800,1000),
            description: faker.lorem.paragraph(2),
            image1: "1590430356931.jpg",
            image2: "1590430356931.jpg",
            image3: "1590430356931.jpg",
            stock: 3,
            brand_id: 3,
            category_id: 3, 
            discount_id: 3, 
            },
            {
              name: faker.commerce.productName(),
              price: faker.commerce.price(800,1000),
              description: faker.lorem.paragraph(2),
              image1: "1591477309639.jpg",
              image2: "1591477309639.jpg",
              image3: "1591477309639.jpg",
              stock: 4,
              brand_id: 4,
              category_id: 4, 
              discount_id: 4, 
              },
              {
                name: faker.commerce.productName(),
                price: faker.commerce.price(800,1000),
                description: faker.lorem.paragraph(2),
                image1: "1591472636231.jpg",
                image2: "1591472636231.jpg",
                image3: "1591472636231.jpg",
                stock: 5,
                brand_id: 5,
                category_id: 5, 
                discount_id: 5, 
                },
                {
                  name: faker.commerce.productName(),
                  price: faker.commerce.price(800,1000),
                  description: faker.lorem.paragraph(2),
                  image1: "1591462611958.jpg",
                  image2: "1591462611958.jpg",
                  image3: "1591462611958.jpg",
                  stock: 6,
                  brand_id: 1,
                  category_id: 1, 
                  discount_id: 1, 
                  },
                  {
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(800,1000),
                    description: faker.lorem.paragraph(2),
                    image1: "1590977580616.jpg",
                    image2: "1590977580616.jpg",
                    image3: "1590977580616.jpg",
                    stock: 7,
                    brand_id: 2,
                    category_id: 2, 
                    discount_id: 2, 
                    },
                    {
                      name: faker.commerce.productName(),
                      price: faker.commerce.price(800,1000),
                      description: faker.lorem.paragraph(2),
                      image1: "1590975681880.jpg",
                      image2: "1590975681880.jpg",
                      image3: "1590975681880.jpg",
                      stock: 8,
                      brand_id: 3,
                      category_id: 3, 
                      discount_id: 3, 
                      },
                      {
                        name: faker.commerce.productName(),
                        price: faker.commerce.price(800,1000),
                        description: faker.lorem.paragraph(2),
                        image1: "1590374267454.jpg",
                        image2: "1590374267454.jpg",
                        image3: "1590374267454.jpg",
                        stock: 9,
                        brand_id: 4,
                        category_id: 4, 
                        discount_id: 4, 
                        },
                      
                        {
                          name: faker.commerce.productName(),
                          price: faker.commerce.price(800,1000),
                          description: faker.lorem.paragraph(2),
                          image1: "1590373937278.jpg",
                          image2: "1590373937278.jpg",
                          image3: "1590373937278.jpg",
                          stock: 9,
                          brand_id: 5,
                          category_id: 5, 
                          discount_id: 5, 
                          },

      




    ]); 
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('products', null, {});
    
  
  }
}