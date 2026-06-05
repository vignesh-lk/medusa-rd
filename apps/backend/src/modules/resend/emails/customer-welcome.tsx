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
} from "@react-email/components"

type CustomerWelcomeEmailProps = {
    first_name?: string
    email?: string
}

function CustomerWelcomeEmailComponent({ first_name, email }: CustomerWelcomeEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Welcome to our store!</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Welcome{first_name ? `, ${first_name}` : ""}!
                            </Heading>
                        </Section>
                        <Section className="my-[32px]">
                            <Text className="text-black text-[14px] leading-[24px]">
                                Thank you for signing up{email ? ` with ${email}` : ""}. We're excited to have you on board!
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

const mockCustomer: CustomerWelcomeEmailProps = {
    first_name: "John",
    email: "john@example.com",
}

export const customerWelcomeEmail = (props: CustomerWelcomeEmailProps) => (
    <CustomerWelcomeEmailComponent {...props} />
)

export default () => <CustomerWelcomeEmailComponent {...mockCustomer} />