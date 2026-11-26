const axios = require('axios');

function calculateDiscount(price, percent) {
    if (percent < 0 || percent > 100) throw new Error('Invalid discount');
    return Number((price * (1 - percent / 100)).toFixed(2));
}

function isValidPromoCode(code) {
    return typeof code === 'string' && /^SALE[0-9]{2}$/.test(code);
}

function calculateShipping(weightKg) {
    return weightKg <= 2 ? 50 : 50 + (weightKg - 2) * 20;
}

function createOrderTotal(price, promoCode, weightKg) {
    const discount = isValidPromoCode(promoCode) ? Number(promoCode.slice(4)) : 0;
    const discountedPrice = calculateDiscount(price, discount);
    const shipping = calculateShipping(weightKg);
    return discountedPrice + shipping;
}

async function submitOrder(orderPayload) {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', orderPayload);
    return res.data;
}

module.exports = {
    calculateDiscount,
    isValidPromoCode,
    calculateShipping,
    createOrderTotal,
    submitOrder
};
