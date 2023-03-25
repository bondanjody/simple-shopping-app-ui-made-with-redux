import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title:'Sending...',
        message:'Sending cart data.'
      }));

      const response = await fetch('https://react-http-request-ab44d-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });
      
      if (!response.ok) {
        throw new Error('Sending cart data FAILED.');
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title:'Success!',
        message:'Sent cart data successfully.'
      }));
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title:'Error!',
        message:'Sending cart data FAILED.'
      }));
    })
    
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} message={notification.message} title={notification.title} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
    
  );
}

export default App;
