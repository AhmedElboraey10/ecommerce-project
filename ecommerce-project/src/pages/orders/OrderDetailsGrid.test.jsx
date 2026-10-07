import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { OrderDetailsGrid } from './OrderDetailsGrid';

describe('OrderDetailsGrid', () => {
    it('uses root-relative paths for product and buy-again images', () => {
        const order = {
            id: 'order-1',
            products: [
                {
                    productId: 'product-1',
                    quantity: 1,
                    estimatedDeliveryTimeMs: Date.now(),
                    product: {
                        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
                        name: 'Athletic Cotton Socks'
                    }
                }
            ]
        };

        render(
            <MemoryRouter>
                <OrderDetailsGrid order={order} loadCart={vi.fn()} />
            </MemoryRouter>
        );

        expect(screen.getByRole('img', { name: 'Athletic Cotton Socks' })).toHaveAttribute(
            'src',
            '/images/products/athletic-cotton-socks-6-pairs.jpg'
        );
        expect(screen.getByRole('button', { name: /add to cart/i }).querySelector('img'))
            .toHaveAttribute('src', expect.stringContaining('buy-again.png'));
    });
});
