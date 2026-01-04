/**
 * Cart Service - Handles cart operations for both logged-in and guest users
 * - Guest users: Cart stored in localStorage
 * - Logged-in users: Cart synced with database via API
 */

const CART_STORAGE_KEY = 'guestCart';

/**
 * Check if user is logged in
 */
const isLoggedIn = () => {
  return !!localStorage.getItem('customerToken');
};

/**
 * Get cart from localStorage (for guest users)
 */
export const getLocalCart = () => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

/**
 * Save cart to localStorage (for guest users)
 */
export const saveLocalCart = (cartItems) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
};

/**
 * Clear localStorage cart
 */
export const clearLocalCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
    return false;
  }
};

/**
 * Add item to cart
 * - If logged in: Save to database via API
 * - If not logged in: Save to localStorage
 * @param {Object} productData - Product data to add to cart
 * @param {Function} addToCartMutation - The addToCart mutation trigger function from RTK Query (useAddToCartMutation hook)
 */
export const addToCart = async (productData, addToCartMutation = null) => {
  const {
    productId,
    quantity = 1,
    selectedVariant = {},
    engraving_text = '',
    price = 0,
    discountedPrice = null,
    product_id = ''
  } = productData;

  if (isLoggedIn()) {
    // User is logged in - save to database
    if (!addToCartMutation) {
      throw new Error('Add to cart mutation is required for logged-in users');
    }

    try {
      // addToCartMutation is the mutation trigger function from RTK Query
      const result = await addToCartMutation({
        productId,
        quantity,
        selectedVariant,
        engraving_text
      }).unwrap();
      return { success: true, data: result.data, fromLocalStorage: false };
    } catch (error) {
      console.error('Error adding to cart via API:', error);
      throw error;
    }
  } else {
    // Guest user - save to localStorage
    const cartItems = getLocalCart();
    
    // Check if item already exists with same variant
    const existingItemIndex = cartItems.findIndex(
      item => item.productId === productId &&
      JSON.stringify(item.selectedVariant || {}) === JSON.stringify(selectedVariant || {})
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item with unique tempId for localStorage
      cartItems.push({
        productId,
        product_id,
        quantity,
        price,
        discountedPrice,
        selectedVariant,
        engraving_text,
        tempId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        addedAt: new Date().toISOString()
      });
    }

    saveLocalCart(cartItems);
    return { success: true, data: { items: cartItems }, fromLocalStorage: true };
  }
};

/**
 * Get cart items
 * - If logged in: Fetch from database via API (requires query hook result or refetch function)
 * - If not logged in: Get from localStorage
 * 
 * Note: For logged-in users, you should use useGetCartQuery hook directly in components
 * This function is mainly for guest users or when you have a refetch function
 */
export const getCart = async (cartQueryResult = null) => {
  if (isLoggedIn()) {
    // User is logged in - fetch from database
    // cartQueryResult should be the result from useGetCartQuery hook
    if (!cartQueryResult) {
      throw new Error('Cart query result is required for logged-in users. Use useGetCartQuery hook in your component.');
    }

    try {
      // If it's a refetch function, call it
      if (typeof cartQueryResult === 'function') {
        const result = await cartQueryResult();
        return { success: true, data: result.data, fromLocalStorage: false };
      }
      // If it's already the query result data
      if (cartQueryResult.data) {
        return { success: true, data: cartQueryResult.data, fromLocalStorage: false };
      }
      throw new Error('Invalid cart query result');
    } catch (error) {
      console.error('Error fetching cart from API:', error);
      throw error;
    }
  } else {
    // Guest user - get from localStorage
    const cartItems = getLocalCart();
    return { success: true, data: { items: cartItems }, fromLocalStorage: true };
  }
};

/**
 * Sync localStorage cart to database after login
 * This should be called after successful login
 * Uses the syncCart API endpoint for bulk sync
 * @param {Function} syncCartMutation - The syncCart mutation hook from CustomerApi
 */
export const syncLocalCartToDatabase = async (syncCartMutation) => {
  if (!isLoggedIn()) {
    return { success: false, message: 'User is not logged in' };
  }

  const localCartItems = getLocalCart();
  
  if (!localCartItems || localCartItems.length === 0) {
    return { success: true, message: 'No items to sync', synced: 0 };
  }

  try {
    // Prepare items for sync (remove tempId and addedAt fields)
    const itemsToSync = localCartItems.map(item => ({
      productId: item.productId,
      product_id: item.product_id || '',
      quantity: item.quantity || 1,
      price: item.price || 0,
      discountedPrice: item.discountedPrice || null,
      selectedVariant: item.selectedVariant || {},
      engraving_text: item.engraving_text || ''
    }));

    // Use syncCart API endpoint for bulk sync
    const result = await syncCartMutation({ items: itemsToSync }).unwrap();
    
    // Clear localStorage cart after successful sync
    if (result.data && result.data.synced > 0) {
      clearLocalCart();
    }

    return { 
      success: true, 
      message: result.data?.synced ? `Synced ${result.data.synced} item(s) to database` : 'Cart synced',
      synced: result.data?.synced || 0,
      errors: result.data?.errors
    };
  } catch (error) {
    console.error('Error syncing cart to database:', error);
    return { success: false, message: error.data?.message || error.message || 'Failed to sync cart', synced: 0 };
  }
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (itemId, quantity, updateCartItemMutation = null) => {
  if (isLoggedIn()) {
    if (!updateCartItemMutation) {
      throw new Error('Update cart item mutation is required for logged-in users');
    }

    try {
      // updateCartItemMutation is the mutation trigger function from RTK Query
      const result = await updateCartItemMutation({ itemId, quantity }).unwrap();
      return { success: true, data: result.data, fromLocalStorage: false };
    } catch (error) {
      console.error('Error updating cart item via API:', error);
      throw error;
    }
  } else {
    const cartItems = getLocalCart();
    // For localStorage, we need to use a unique identifier
    // If item doesn't have _id, we'll use index or create a tempId
    const itemIndex = cartItems.findIndex((item, index) => {
      if (item._id === itemId || item.tempId === itemId) return true;
      // If no ID, use index as fallback (not ideal but works for localStorage)
      return index.toString() === itemId;
    });
    
    if (itemIndex > -1) {
      cartItems[itemIndex].quantity = quantity;
      // Ensure tempId exists for future reference
      if (!cartItems[itemIndex].tempId && !cartItems[itemIndex]._id) {
        cartItems[itemIndex].tempId = `temp_${Date.now()}_${itemIndex}`;
      }
      saveLocalCart(cartItems);
      return { success: true, data: { items: cartItems }, fromLocalStorage: true };
    } else {
      throw new Error('Cart item not found');
    }
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (itemId, removeFromCartMutation = null) => {
  if (isLoggedIn()) {
    if (!removeFromCartMutation) {
      throw new Error('Remove from cart mutation is required for logged-in users');
    }

    try {
      // removeFromCartMutation is the mutation trigger function from RTK Query
      const result = await removeFromCartMutation({ itemId }).unwrap();
      return { success: true, data: result.data, fromLocalStorage: false };
    } catch (error) {
      console.error('Error removing cart item via API:', error);
      throw error;
    }
  } else {
    const cartItems = getLocalCart();
    const filteredItems = cartItems.filter((item, index) => {
      if (item._id === itemId || item.tempId === itemId) return false;
      // If no ID, use index as fallback
      return index.toString() !== itemId;
    });
    saveLocalCart(filteredItems);
    return { success: true, data: { items: filteredItems }, fromLocalStorage: true };
  }
};

/**
 * Get cart item count
 * @param {Object|Function} cartQueryResult - The result from useGetCartQuery hook or refetch function
 */
export const getCartItemCount = async (cartQueryResult = null) => {
  try {
    const cart = await getCart(cartQueryResult);
    if (cart.success && cart.data && cart.data.items) {
      return cart.data.items.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
};

