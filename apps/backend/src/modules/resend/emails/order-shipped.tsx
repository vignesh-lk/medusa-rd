// src/modules/resend/emails/order-shipped.tsx
import {
    Text,
    Container,
    Heading,
    Html,
    Section,
    Tailwind,
    Head,
    Preview,
    Body,
    Row,
    Column,
    Img,
} from "@react-email/components"
import { BigNumberValue, CustomerDTO, OrderDTO } from "@medusajs/framework/types"

type OrderShippedEmailProps = {
    order: OrderDTO & {
        customer: CustomerDTO
    }
}

function OrderShippedEmailComponent({ order }: OrderShippedEmailProps) {
    const formatter = new Intl.NumberFormat([], {
        style: "currency",
        currencyDisplay: "narrowSymbol",
        currency: order.currency_code,
    })

    const formatPrice = (price: BigNumberValue) => {
        if (typeof price === "number") {
            return formatter.format(price)
        }
        if (typeof price === "string") {
            return formatter.format(parseFloat(price))
        }
        return price?.toString() || ""
    }

    return (
        <Tailwind>
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Your order has shipped!</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">

                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Heading className="text-white text-xl m-0">Your Order Has Shipped 🚚</Heading>
                    </Section>

                    {/* Message */}
                    <Container className="p-6">
                        <Heading className="text-2xl font-bold text-center text-gray-800">
                            Good news, {order.customer?.first_name || order.shipping_address?.first_name}!
                        </Heading>
                        <Text className="text-center text-gray-600 mt-2">
                            Your order #{order.display_id} is on its way.
                        </Text>
                    </Container>

                    {/* Order Items */}
                    <Container className="px-6">
                        <Heading className="text-xl font-semibold text-gray-800 mb-4">
                            Items Shipped
                        </Heading>
                        {order.items?.map((item) => (
                            <Section key={item.id} className="border-b border-gray-200 py-4">
                                <Row>
                                    <Column className="w-1/3">
                                        <Img
                                            src={item.thumbnail ?? ""}
                                            alt={item.product_title ?? ""}
                                            className="rounded-lg"
                                            width="100%"
                                        />
                                    </Column>
                                    <Column className="w-2/3 pl-4">
                                        <Text className="text-lg font-semibold text-gray-800">
                                            {item.product_title}
                                        </Text>
                                        <Text className="text-gray-600">{item.variant_title}</Text>
                                        <Text className="text-gray-800 mt-2 font-bold">
                                            {formatPrice(item.total)}
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                        ))}
                    </Container>

                    {/* Footer */}
                    <Section className="bg-gray-50 p-6 mt-10">
                        <Text className="text-center text-gray-500 text-sm">
                            If you have any questions, contact our support team at support@medusajs.com.
                        </Text>
                        <Text className="text-center text-gray-500 text-sm">
                            Order ID: {order.id}
                        </Text>
                        <Text className="text-center text-gray-400 text-xs mt-4">
                            © {new Date().getFullYear()} Medusajs, Inc. All rights reserved.
                        </Text>
                    </Section>

                </Body>
            </Html>
        </Tailwind>
    )
}

// Mock data for preview
const mockOrder = {
    order: {
        id: "order_123",
        display_id: 1,
        currency_code: "usd",
        total: 30,
        items: [
            {
                id: "item_1",
                product_title: "Medusa Sweatshirt",
                variant_title: "L",
                thumbnail: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png",
                total: 30,
            },
        ],
        customer: {
            first_name: "John",
        },
    },
}

export const orderShippedEmail = (props: OrderShippedEmailProps) => (
    <OrderShippedEmailComponent {...props} />
)

// @ts-ignore
export default () => <OrderShippedEmailComponent {...mockOrder} />