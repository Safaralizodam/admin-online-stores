import React, { useEffect, useState } from 'react';
import { apiUrl, axiosRequest } from '../../utils/axiosRequest';

const Order = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosRequest.get('/Cart/get-products-from-cart');
        console.log('Cart items response:', response.data); // Log response for debugging

        if (response.data?.data?.[0]?.productsInCart) {
          setBasketItems(response.data.data[0].productsInCart);
        } else {
          setBasketItems([]);
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to fetch cart items.');
      }
    };

    fetchCartItems();
  }, []);

  const calculateSubtotal = () => {
    return basketItems.reduce((acc, item) => acc + (item.product.price || 0) * (item.quantity || 0), 0);
  };

  const calculateTax = (subtotal) => {
    return (subtotal * 0.08).toFixed(2); // Assuming 8% tax
  };

  const calculateTotal = (subtotal, tax, shipping) => {
    return (subtotal + parseFloat(tax) + shipping).toFixed(2);
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const shipping = 5.00;
  const total = calculateTotal(subtotal, tax, shipping);

  const handleRemove = async (id) => {
    try {
      await axiosRequest.delete(`/Cart/delete-product-from-cart?id=${id}`);
      setBasketItems(basketItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item.');
    }
  };

  const handleQuantityChange = async (id, increment) => {
    try {
      // Find the item and update its quantity
      const updatedItems = basketItems.map(item => {
        if (item.id === id) {
          const newQuantity = increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Update the state
      setBasketItems(updatedItems);

      // Make API call to update quantity
      await axiosRequest.put(`/Cart/update-product-quantity?id=${id}&quantity=${updatedItems.find(item => item.id === id).quantity}`);
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity.');
    }
  };

  return (
    <div className=" p-6 min-h-screen">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Your Basket</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {basketItems.length === 0 ? (
        <p className="text-center text-gray-600">Your basket is empty</p>
      ) : (
        <div>
          <div className="flex flex-wrap items-center  ">
            {basketItems.map(item => (
              <div key={item.id} className="bg-white w-[23%] m-[10px] shadow-lg rounded-lg p-4 flex flex-col justify-between">
                <img
                  src={`${apiUrl}${item.product.image}`}
                  alt={item.product.productName}
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-4 flex-1">
                  <h2 className="text-xl font-semibold">{item.product.productName}</h2>
                  <p className="text-gray-600 mt-2">Color: {item.product.color}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-l"
                        onClick={() => handleQuantityChange(item.id, false)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-r"
                        onClick={() => handleQuantityChange(item.id, true)}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-800 font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Order total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
