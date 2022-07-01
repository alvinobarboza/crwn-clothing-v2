import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';
import './checkout-item.styles.scss'

const CheckoutItem = ({ item }) => {
    const { name, imageUrl, price, quantity } = item;

    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    const clearHandler = () => clearItemFromCart(item);
    const removeHandler = () => removeItemFromCart(item);
    const addHandler = () => addItemToCart(item)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;