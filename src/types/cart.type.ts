import type { Product } from "./product.type"

export interface AddToCartPayload {
    productId: number
    quantity: number
    accessToken: string
}

export interface DeleteToCartPayload {
    productId: number
    accessToken: string | null
}


export interface CartItem {
    id: number
    product: Product
    quantity: number
}