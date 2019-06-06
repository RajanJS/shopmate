import React, { Component } from 'react'
import NavBarMen from '../components/navBarMen'
import NavigationBar from '../components/navBar'
import NavBarMobile from '../components/navBarMobile'
import SocialIcons from '../components/socialIcons'
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Footer2 from '../components/footer2'
import ItemDetailCard from '../components/itemDetailCard'
import Grid from '@material-ui/core/Grid'
import { fetchRequest } from '../utils/request'
import { saveCartId, removeCartId } from '../utils/auth'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import ButtonComp from '../components/button'
import ItemCardBig from '../components/itemCardBig'

const styles = {
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}
class ProductPage extends Component {
  /*
  state = {
    newCartItems: null,
    newtotalItems: null,
    newAmount: null,
    orderStatus: null,
    quantity: 1
  }
  async placeOrder() {
    const { user } = this.props
    const orderStatus = await fetchRequest('orders', {
      method: 'POST',
      body: JSON.stringify({ cart_id: user.cartId, shipping_id: 4, tax_id: 2 })
    })
    this.setState({
      orderStatus,
      newTotalItems: null,
      newAmount: null,
      newCartItems: null
    })
    //console.log(orderStatus)
    removeCartId()
  }

  async createCartId() {
    const newCartId = await fetchRequest('shoppingcart/generateUniqueId', {
      method: 'GET'
    })
    saveCartId(newCartId.cart_id)
    this.setState({ cartId: newCartId.cart_id })
    return newCartId.cart_id
  }

  async getCartItems(cartId) {
    const cartItems = await fetchRequest(
      decoratedUrl(`shoppingcart/${user.cartId}`)
    )
    if (cartItems.length > 0) {
      let totalItems = 0
      cartItems.forEach(item => {
        totalItems = totalItems + item.quantity
      })
      this.setState({ newTotalItems: totalItems, newCartItems: cartItems })
    }
  }

  async addToCart(productId) {
    const { user } = this.props
    let addToCartResult = null
    //if there's a cartId stored in cookies
    if (user.cartId) {
      const addToCartResult = await fetchRequest('shoppingcart/add', {
        method: 'POST',
        body: JSON.stringify({
          cart_id: user.cartId,
          product_id: productId,
          attributes: 'none'
        })
      })
      // calculate total items in cart and total amount
      if (addToCartResult.length > 0) {
        let totalItems = 0
        let amount = 0
        addToCartResult.forEach(item => {
          totalItems = totalItems + item.quantity
          amount = amount + item.quantity * item.price
        })
        this.setState({
          newTotalItems: totalItems,
          newCartItems: addToCartResult,
          newAmount: amount
        })
      }
    } else {
      //create a cart id and store to cookies
      const newCartId = await this.createCartId()
      saveCartId(newCartId)
      const addToCartResult = await fetchRequest('shoppingcart/add', {
        method: 'POST',
        body: JSON.stringify({
          cart_id: newCartId,
          product_id: productId,
          attributes: 'none'
        })
      })
      if (addToCartResult.length > 0) {
        let totalItems = 0
        let amount = 0
        addToCartResult.forEach(item => {
          totalItems = totalItems + item.quantity
          amount = amount + item.quantity * item.price
        })
        this.setState({
          newTotalItems: totalItems,
          newCartItems: addToCartResult,
          newAmount: amount
        })
      }
    }
  }

  noOfItemToCart(productId) {
    let i = 1
    while (this.state.quantity >= i) {
      this.addToCart(productId)
      i++
    }
    this.setState({ quantity: 1 })
  }

  adjustQuantity(number) {
    this.setState({ quantity: this.state.quantity + number })
  }
*/
  render() {
    const {
      classes,
      productDetails,
      productReviews,
      totalItems,
      amount,
      cartItems,
      user,
      categories,
      newTotalItems,
      newCartItems,
      newAmount,
      orderStatus,
      quantity,
      addToCart,
      adjustQuantity,
      getCartItems,
      noOfItemToCart,
      placeOrder,
      removeFromCart,
      reduceQuantity,
      clearProducts
    } = this.props
    //console.log(this.state)
    return (
      <div style={{ backgroundColor: '#F7F7F7' }}>
        <NavBarMen
          cartItems={newCartItems ? newCartItems : cartItems}
          totalItems={newTotalItems || newTotalItems === 0 ? newTotalItems : totalItems}
          amount={newAmount ? newAmount : amount}
          bgcolor="#efefef"
          placeOrder={cartId => placeOrder(cartId)}
          user={user}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          reduceQuantity={reduceQuantity}
        />
        {orderStatus ? (
          <Box
            bgcolor="background.paper"
            color="text.primary"
            p={2}
            position="fixed"
            top={0}
            left="43%"
            zIndex="modal"
          >
            <Typography>Order Placed SuccessFully</Typography>
            <ButtonComp text="ok" onClick={() => null} button={1} />
          </Box>
        ) : null}
        <Hidden only={['sm', 'xs']} implementation="css">
          <NavigationBar categories={categories} clearProducts={clearProducts}/>
        </Hidden>
        <Hidden only={['lg', 'md']} implementation="css">
          <NavBarMobile back={true} />
          <ItemCardBig
            showProducts={true}
            productDetails={productDetails}
            productReviews={productReviews}
            addToCart={productId => noOfItemToCart(productId)}
            user={user}
            mobile={true}
            quantity={quantity}
            adjustQuantity={number => adjustQuantity(number)}
          />
        </Hidden>
        <Hidden only={['xs']} implementation="css">
          <div className={classes.center}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <ItemDetailCard
                  showProducts={true}
                  productDetails={productDetails}
                  productReviews={productReviews}
                  addToCart={productId => noOfItemToCart(productId)}
                  user={user}
                  quantity={quantity}
                  adjustQuantity={number => adjustQuantity(number)}
                />
              </Grid>
              <Grid item xs={12}>
                <ItemDetailCard
                  productDetails={productDetails}
                  productReviews={productReviews}
                  user={user}
                />
              </Grid>
            </Grid>
          </div>
          <Footer2 />
        </Hidden>
        <Hidden only={['xl', 'sm', 'md', 'lg']} implementation="css" />
      </div>
    )
  }
}

export default withStyles(styles)(ProductPage)
