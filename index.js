const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const itemStore = document.querySelector('.store--item-list')
const itemCart = document.querySelector('.cart--item-list')
const totalQuantity = document.getElementsByClassName('.quantity-text').innerText
const total = document.querySelector('.total-number')
const cartItemName = document.getElementsByTagName('p')
const cartsum = document.getElementsByTagName('li')


const renderCartTotal = () => {
  const totalPrice = state.cart.map((x) => x.totalPrice).reduce((a, c) => a + c)
  total.innerText = `£ ${totalPrice.toFixed(2)}`
  console.log('price', totalPrice) //CONSOLE LOG
}

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
    }
    if (counterValue < 1) {
      item.remove()
      alert('Item Removed from cart.')
    }
    renderCartTotal()
  })
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



const renderStoreCatalogue = (items) => {
  const itemList = document.createElement('li')

  const storeItemHolder = document.createElement('div')
  storeItemHolder.className = 'store--item-icon'

  const img = document.createElement('img')
  img.setAttribute('src', `assets/icons/${items.id}.svg`)

  const cartButton = document.createElement('button')
  cartButton.innerText = 'Add to cart'

  itemList.append(storeItemHolder, img, cartButton)


  //EVENT
  cartButton.addEventListener('click', function (item) {
    for (const itemName of cartItemName)
      if (items.name === itemName.innerText) {
        alert('This item is already in cart')
        return
      }

    const itemsToCart = {
      id: items.id,
      name: items.name,
      basePrice: +items.price,
      totalPrice: +items.price,
      quantity: 1
    }
    state.cart.push(itemsToCart)
    console.log(state.cart) //CONSOLE LOG
    renderCart(items)
    renderCartTotal()
  })
  return itemList
}

const loadData = (items) => {
  for (const items of state.items) {
    const itemList = renderStoreCatalogue(items)
    itemStore.append(itemList)
  }
}

loadData(state)
