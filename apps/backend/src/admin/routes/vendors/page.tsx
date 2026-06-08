// src/admin/routes/vendors/page.tsx
// import { defineRouteConfig } from "@medusajs/admin-sdk"
// import { Container, Heading } from "@medusajs/ui"

// const VendorsPage = () => {
//     return (
//         <Container className="divide-y p-0">
//             <div className="flex items-center justify-between px-6 py-4">
//                 <Heading level="h2">Vendors</Heading>
//             </div>
//         </Container>
//     )
// }

// export const config = defineRouteConfig({
//     label: "Vendors",
// })

// export default VendorsPage

// src/admin/routes/vendors/page.tsx
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Buildings } from "@medusajs/icons"
import {
    Container,
    Heading,
    DataTable,
    DataTablePaginationState,
    createDataTableColumnHelper,
    useDataTable,
} from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { sdk } from "../../lib/config"

// Types
type VendorAdmin = {
    id: string
    first_name: string | null
    last_name: string | null
    email: string
}

type Vendor = {
    id: string
    name: string
    admins: VendorAdmin[]
}

type VendorsResponse = {
    vendors: Vendor[]
    count: number
    limit: number
    offset: number
}

// Columns
const columnHelper = createDataTableColumnHelper<Vendor>()

const columns = [
    columnHelper.accessor("name", {
        header: "Business Name",
    }),
    columnHelper.accessor("admins", {
        header: "Admin",
        cell: ({ getValue }) => {
            const admins = getValue()
            if (!admins || admins.length === 0) return <span>-</span>
            return (
                <div className="flex flex-col gap-1">
                    {admins.map((admin) => (
                        <span key={admin.id} className="txt-small">
                            {admin.first_name} {admin.last_name} ({admin.email})
                        </span>
                    ))}
                </div>
            )
        },
    }),
]

const limit = 15

// Page Component
const VendorsPage = () => {
    const [pagination, setPagination] = useState<DataTablePaginationState>({
        pageSize: limit,
        pageIndex: 0,
    })

    const offset = useMemo(() => {
        return pagination.pageIndex * limit
    }, [pagination])

    const { data, isLoading } = useQuery<VendorsResponse>({
        queryKey: ["vendors", limit, offset],
        queryFn: () =>
            sdk.client.fetch("admin/vendors", {
                query: {
                    limit,
                    offset,
                },
            }),
    })

    const table = useDataTable({
        columns,
        data: data?.vendors || [],
        getRowId: (row) => row.id,
        rowCount: data?.count || 0,
        isLoading,
        pagination: {
            state: pagination,
            onPaginationChange: setPagination,
        },
    })

    return (
        <Container className="divide-y p-0">
            <DataTable instance={table}>
                <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                    <Heading>Vendors</Heading>
                </DataTable.Toolbar>
                <DataTable.Table />
                <DataTable.Pagination />
            </DataTable>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Vendors",
    icon: Buildings,
})

export default VendorsPage