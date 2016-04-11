(function(){
 
	var app = angular.module('store', [ ]);
	
	app.controller('StoreController', function(){
		this.product = gem;
		this.products = gems;
	});
	
	app.controller("ReviewController", function(){
		 this.review = {};
		 
		 this.addReview = function(product) {
			 product.reviews.push(this.review);
			 this.review = {};
		 };
	});
	
 
	var gem = {
		 name: 'Dodecahedron',
		 price: 2.95,
		 description: '. . .',
		 canPurchase: true,
		 soldOut: false
	};
	
	var gems = [
	            {
	            name: "Dodecahedron",
	            price: 2.95,
	            description: ". . .",
	            canPurchase: true,
	            images: [
	                     {
	                     full: 'images/Desert.jpg',
	                     thumb: 'images/Hydrangeas.jpg'
	                     }
	                    ],
	                    
                reviews: [
	                          {
	                          stars: 5,
	                          body: "I love this product!",
	                          author: "joe@thomas.com"
	                          },
	                          {
	                          stars: 1,
	                          body: "This product sucks",
	                          author: "tim@hater.com"
	                          }
                          ]
	                              
	                              
	                              
	            },
	            {
	            name: "Pentagonal Gem",
	            price: 5.95,
	            description: ". . .",
	            canPurchase: false,
	            }
	];	
	
	
})()