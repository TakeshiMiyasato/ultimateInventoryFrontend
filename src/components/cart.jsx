import React from "react";

const items = [
    {
        id: 1,
        name: "overwatch",
        price: 20
    },
    {
        id: 2,
        name: "minecraft",
        price: 32
    },
    {
        id: 3,
        name: "fortnite",
        price: 51
    }
];

const Shop = () => {
    const [cart, setCart] = React.useState([]);
    const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);

    const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

    const addToCart = (item) => setCart((currentCart) => [...currentCart, item]);
    const detallesVentas = [];
    cart.forEach((element) => {
        if (detallesVentas.map((a) => a.id).includes(element.id)) {
            return;
        }
        detallesVentas.push({
            id: element.id,
            name: element.name,
            quantity: amountOfItems(element.id)
        });
    });
    console.log(count);

    const removeFromCart = (item) => {
        setCart((currentCart) => {
            const indexOfItemToRemove = currentCart.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            if (indexOfItemToRemove === -1) {
                return currentCart;
            }

            return [
                ...currentCart.slice(0, indexOfItemToRemove),
                ...currentCart.slice(indexOfItemToRemove + 1)
            ];
        });
    };

    const listItemsToBuy = () =>
        items.map((item) => (
            <div key={item.id}>
                {item.name} -{item.price}
                <button type="submit" onClick={() => addToCart(item)}>
                    Add
                </button>
            </div>
        ));

    const showInCart = (item) => {
        if (amountOfItems(item.id) > 0) {
            return (
                <div key={item.name}>
                    ({amountOfItems(item.id)} x {item.price}){item.name}
                    <button type="submit" onClick={() => removeFromCart(item)}>
                        Remove
                    </button>
                </div>
            );
        }
    };

    const showClearButton = () => {
        if (cartTotal > 0) {
            return (
                <div>
                    <button onClick={() => setCart([])}>Clear</button>
                </div>
            );
        }
    };

    const listItemsInCart = () => items.map((item) => showInCart(item));

    return (
        <div>
            STORE
            <div>{listItemsToBuy()}</div>
            <div>CART</div>
            <div>{listItemsInCart()}</div>
            <div>Total: ${cartTotal}</div>
            {showClearButton()}
        </div>
    );
};

export default Shop;
