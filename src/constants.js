export const API_ENDPOINTS = {

    PRODUCTS: '/api/products',
    CATEGORIES: '/api/categories',
    PRODUCT_BY_ID: (productId) => `/api/products/${productId}`,
    CATEGORY_BY_ID: (categoryID) => `/api/category/${categoryID}`,
    CART: '/api/user/cart',
    CART_PRODUCT: (productId) => `/api/user/cart/${productId}`,
    WISHLIST: '/api/user/wishlist',
    WISHLIST_PRODUCT: (productId) => `/api/user/wishlist/${productId}`
};