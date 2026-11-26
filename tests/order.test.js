const axios = require('axios');
const {
    calculateDiscount,
    isValidPromoCode,
    calculateShipping,
    createOrderTotal,
    submitOrder
} = require('../src/order');

jest.mock('axios');

describe('Модульні тести (Unit tests)', () => {
    test('Розрахунок знижки на товар', () => {
        expect(calculateDiscount(200, 15)).toBe(170);
    });

    test('Валідація формату промокоду', () => {
        expect(isValidPromoCode('SALE20')).toBe(true);
        expect(isValidPromoCode('INVALID')).toBe(false);
    });

    test('Розрахунок вартості доставки за вагою', () => {
        expect(calculateShipping(1.5)).toBe(50);
        expect(calculateShipping(4)).toBe(90);
    });
});

describe('Інтеграційні тести (Integration tests)', () => {
    test('Інтеграція розрахунку знижки, промокоду та доставки', () => {
        expect(createOrderTotal(1000, 'SALE10', 3)).toBe(970);
        expect(createOrderTotal(1000, 'NONE', 1)).toBe(1050);
    });

    test('Відправка замовлення на зовнішній API', async () => {
        axios.post.mockResolvedValue({ data: { id: 101, status: 'created' } });
        const result = await submitOrder({ total: 970 });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(result.status).toBe('created');
    });
});
