import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-request-ab44d-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Could NOT fetch cart data.');
            }

            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (err) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title:'Error!',
                message:'Fetching cart data FAILED.'
              }));
        }
    }
}

export const sendCartData = cart => {
    return async dispatch => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title:'Sending...',
            message:'Sending cart data.'
          }));
    
          const sendRequest = async () => {
            const response = await fetch('https://react-http-request-ab44d-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });
          
            if (!response.ok) {
                throw new Error('Sending cart data FAILED.');
            }
          }

          try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title:'Success!',
                message:'Sent cart data successfully.'
              }));
          } catch (err) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title:'Error!',
                message:'Sending cart data FAILED.'
              }));
          }
    }
}