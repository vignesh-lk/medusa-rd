// src/admin/routes/vendors/details/page.tsx
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"

const VendorDetailsPage = () => {
    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h2">Vendor Details</Heading>
            </div>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Vendor Details",
    rank: 1,
})

export default VendorDetailsPage