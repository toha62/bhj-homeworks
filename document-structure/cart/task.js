class Cart {
  constructor(cartClass, productsClass) {
    this.cart = document.querySelector(`.${cartClass}`);
    this.products = document.querySelector(`.${productsClass}`);
    this.cartProducts = this.cart.querySelector('.cart__products');
    this.currentProductElement = null;

    this.registerEvents();
    
  }

  registerEvents() {
    this.products.addEventListener('click', (event) => {
      const { target } = event;
      this.currentProductElement = target.closest('.product');      
      
      if (this.isQuantityControl(target)) {
        this.quantityControlAction(target);        
      }
      if (this.isProductAdd(target)) {
        this.productAddAction();
      }
    });
  }

  isQuantityControl(element) {
    return element.classList.contains('product__quantity-control');
  }

  quantityControlAction(controlElement) {
    let productQuantity = this.getProductQuantity();

    if (this.isControlDecrease(controlElement)) {
      if (productQuantity > 0) {
        productQuantity--;
      }          
    } else {
      productQuantity++;
    }
    this.setProductQuantity(productQuantity); 
  }

  isControlDecrease(element) {
    return element.classList.contains('product__quantity-control_dec')
  }

  getProductQuantity() {    
    return +this.currentProductElement.querySelector('.product__quantity-value').innerText;
  }

  setProductQuantity(quantity) {
    this.currentProductElement.querySelector('.product__quantity-value').innerText = quantity;
  }

  isProductAdd(element) {
    return element.classList.contains('product__add');
  }

  productAddAction() {
    const productQuantity = this.getProductQuantity();

    if (productQuantity > 0) {
      const productId = this.currentProductElement.dataset.id;
      const productImgSrc = this.currentProductElement.querySelector('.product__image').src;

      for (let product of this.cartProducts.children) {
        if (product.dataset.id === productId) {
          product.querySelector('.cart__product-count').innerText = 
            +product.querySelector('.cart__product-count').innerText + productQuantity;
          return;
        }
      }

      this.cartProducts.insertAdjacentHTML('beforeend', `
        <div class="cart__product" data-id="${productId}">
          <img class="cart__product-image" src="${productImgSrc}">
          <div class="cart__product-count">${productQuantity}</div>
        </div>
      `);
    }   
    
    
  }

}

new Cart('cart', 'products');