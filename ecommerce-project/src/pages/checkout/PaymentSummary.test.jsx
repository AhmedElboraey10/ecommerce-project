import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import axios from 'axios'
import { PaymentSummary } from "./PaymentSummery"

vi.mock('axios')

describe(
    'PaymentSummary component',
    () => {
        let paymentSummary
        let loadCart

        beforeEach(
            () => {
                paymentSummary = {
                    totalItems: 3,
                    productCostCents: 4275,
                    shippingCostCents: 499,
                    totalCostBeforeTaxCents: 4774,
                    taxCents: 477,
                    totalCostCents: 5251
                }
                loadCart = vi.fn()
            }
        )

        it(
            'displays the payment summary correctly',
            () => {
                render(
                    <MemoryRouter>
                        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                    </MemoryRouter>
                )

                expect(
                    screen.getByText('Items (3):')
                ).toBeInTheDocument()

                expect(
                    within(
                        screen.getByTestId('product-cost-row')
                    ).getByText('$42.75')
                ).toBeInTheDocument()

                expect(
                    within(
                        screen.getByTestId('shipping-cost-row')
                    ).getByText('$4.99')
                ).toBeInTheDocument()

                expect(
                    within(
                        screen.getByTestId('total-before-tax-row')
                    ).getByText('$47.74')
                ).toBeInTheDocument()

                expect(
                    within(
                        screen.getByTestId('tax-row')
                    ).getByText('$4.77')
                ).toBeInTheDocument()

                expect(
                    screen.getByTestId('total-cost-row')
                ).toHaveTextContent('$52.51')
            }
        )

        it(
            'places an order',
            async () => {
                render(
                    <MemoryRouter>
                        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                    </MemoryRouter>
                )

                const user = userEvent.setup()

                await user.click(screen.getByText('Place your order'))

                expect(axios.post).toHaveBeenCalledWith('/api/orders')
                expect(loadCart).toHaveBeenCalled()
            }
        )
    }
)