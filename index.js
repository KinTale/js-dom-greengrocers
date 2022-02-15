const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: 'Vegetable'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: 'Vegetable'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: 'Vegetable'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: 'Fruit'
    }
  ],
  cart: []
};

const itemStore = document.querySelector('.store--item-list')
const itemCart = document.querySelector('.cart--item-list')
const total = document.querySelector('.total-number')
const cartItemName = document.getElementsByTagName('p')
const fruitButton = document.querySelector('.filter-fruit')
const vegButton = document.querySelector('.filter-vegetable')
const headerButton = document.querySelector('#store')

//Gets each total price from Cart array then sums them together to get total price
const renderCartTotal = () => {
  const totalPrice = state.cart.map((x) => x.totalPrice).reduce((a, c) => a + c)
  total.innerText = `£ ${totalPrice.toFixed(2)}`
}

//Creates cart item from the object being passed.
const renderCart = (items) => {
  const item = document.createElement('li')

  const img = document.createElement('img')
  img.className = ('cart--item-icon')
  img.setAttribute('src', `assets/icons/${items.id}.svg`)

  const itemName = document.createElement('p')
  itemName.innerText = items.name

  const removeButton = document.createElement('button')
  removeButton.classList.add('quantity-btn', 'remove-btn', 'center')

  const quantityText = document.createElement('span')
  quantityText.classList.add('quantity-text', 'center')
  quantityText.innerText = 1

  const addButton = document.createElement('button')
  addButton.classList.add('quantity-btn', 'add-btn', 'center')

  //Reduces quantity, updates quantity & total in Cart array
  //EVENT
  removeButton.addEventListener('click', function (minusQuantity) {
    let counterValue = Number(quantityText.innerText)
    counterValue--
    quantityText.innerText = counterValue
    for (const cartItems of state.cart) {
      if (cartItems.id === items.id) {
        cartItems.quantity -= 1
        cartItems.totalPrice = cartItems.basePrice * cartItems.quantity
      }
      if (cartItems.totalPrice === 0) {
        state.cart.splice(state.cart.indexOf(cartItems), 1)
        total.innerText = `£ ${cartItems.totalPrice.toFixed(2)}`
      }
      if (counterValue < 1) { item.remove() }
    }
    renderCartTotal()
  })

  //Increasesquantity, updates quantity & total in Cart array
  //EVENT
  addButton.addEventListener('click', function (addQuantity) {
    let counterValue = Number(quantityText.innerText)
    counterValue++
    quantityText.innerText = counterValue
    for (const cartItems of state.cart) {
      if (cartItems.id === items.id) {
        cartItems.quantity += 1
        cartItems.totalPrice = cartItems.basePrice * cartItems.quantity
      }
    }
    renderCartTotal()
  })

  itemCart.append(item)
  item.append(img, itemName, removeButton, quantityText, addButton)
}
// Creates store catalogue of the object being passed
const renderStoreCatalogue = (items) => {

  const itemList = document.createElement('li')

  const storeItemHolder = document.createElement('div')
  storeItemHolder.className = 'store--item-icon'

  const img = document.createElement('img')
  img.setAttribute('src', `assets/icons/${items.id}.svg`)
  storeItemHolder.append(img)

  const cartButton = document.createElement('button')
  cartButton.innerText = 'Add to cart'

  itemList.append(storeItemHolder, cartButton)

  // Adds items to cart
  //EVENT
  cartButton.addEventListener('click', function (item) {
    for (const itemName of cartItemName)
      if (items.name === itemName.innerText) {
        alert('This item is already in cart')
        return
      }
  //New item object to calculate price and quantity to be pushed in the state.cart once that item is added to cart
    const itemsToCart = {
      id: items.id,
      name: items.name,
      basePrice: +items.price,
      totalPrice: +items.price,
      quantity: 1
    }
    state.cart.push(itemsToCart)
    renderCart(items)
    renderCartTotal()
  })
  return itemList
}

//loops through item object in STATE and passes it to renderStoreCatalogue(funtion)
const loadData = (items) => {
  
  //displays all item in store
  for (const items of state.items) {
    const itemList = renderStoreCatalogue(items)
    itemStore.append(itemList)
  }

  //it filters items with type: Fruit and displays with renderStoreCatalogue(function)
  //EVENT
  fruitButton.addEventListener('click', function () {
    const filteredItem = state.items.filter((x) => x.type === 'Fruit')
    itemStore.innerHTML = ''
  
    for (const items of filteredItem) {
      const itemList = renderStoreCatalogue(items)
      itemStore.append(itemList)
    }
  })

  //it filters items with type: Vegetable and displays with renderStoreCatalogue(function)
  //EVENT
  vegButton.addEventListener('click', function () {
    const filteredItem = state.items.filter((x) => x.type === 'Vegetable')
    itemStore.innerHTML = ''
  
    for (const items of filteredItem) {
      const itemList = renderStoreCatalogue(items)
      itemStore.append(itemList)
    }
  })
}

loadData(state)
