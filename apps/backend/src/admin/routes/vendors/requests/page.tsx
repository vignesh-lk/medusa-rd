// src/admin/routes/vendors/requests/page.tsx
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"

const VendorRequestPage = () => {
    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h2">Vendor Request</Heading>
            </div>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Vendor Request",
    rank: 2,
})

export default VendorRequestPage