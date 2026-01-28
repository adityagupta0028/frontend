/**
 * Wishlist Service - Handles wishlist operations for both logged-in and guest users
 * - Guest users: Wishlist stored in localStorage
 * - Logged-in users: Wishlist synced with database via API
 */

const WISHLIST_STORAGE_KEY = 'guestWishlist';

/**
 * Check if user is logged in
 */
const isLoggedIn = () => {
  return !!localStorage.getItem('customerToken');
};

/**
 * Get wishlist from localStorage (for guest users)
 */
export const getLocalWishlist = () => {
  try {
    const wishlistData = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlistData ? JSON.parse(wishlistData) : [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
};

/**
 * Save wishlist to localStorage (for guest users)
 */
export const saveLocalWishlist = (wishlistItems) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    return true;
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
    return false;
  }
};

/**
 * Clear localStorage wishlist
 */
export const clearLocalWishlist = () => {
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing wishlist from localStorage:', error);
    return false;
  }
};

/**
 * Add item to wishlist
 * - If logged in: Save to database via API
 * - If not logged in: Save to localStorage
 * @param {Object} productData - Product data to add to wishlist
 * @param {Function} addToWishlistMutation - The addToWishlist mutation trigger function from RTK Query
 */
export const addToWishlist = async (productData, addToWishlistMutation = null) => {
  const {
    productId,
    product_id = '',
    selectedVariant = {},
    // Optional product metadata for localStorage
    productName = '',
    productPrice = 0,
    productImage = '',
    productOriginalPrice = null
  } = productData;

  if (isLoggedIn()) {
    // User is logged in - save to database
    if (!addToWishlistMutation) {
      throw new Error('Add to wishlist mutation is required for logged-in users');
    }

    try {
      const result = await addToWishlistMutation({
        productId,
        product_id,
        selectedVariant
      }).unwrap();
      return { success: true, data: result.data, fromLocalStorage: false };
    } catch (error) {
      console.error('Error adding to wishlist via API:', error);
      throw error;
    }
  } else {
    // Guest user - save to localStorage
    const wishlistItems = getLocalWishlist();
    
    // Check if item already exists with same variant
    const existingItemIndex = wishlistItems.findIndex(
      item => item.productId === productId &&
      JSON.stringify(item.selectedVariant || {}) === JSON.stringify(selectedVariant || {})
    );

    if (existingItemIndex > -1) {
      // Item already in wishlist
      return { success: true, data: { items: wishlistItems }, fromLocalStorage: true, alreadyExists: true };
    }

    // Add new item with unique tempId and product metadata for localStorage
    wishlistItems.push({
      productId,
      product_id,
      selectedVariant,
      // Store product metadata for display
      productName,
      productPrice,
      productImage,
      productOriginalPrice,
      tempId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString()
    });

    saveLocalWishlist(wishlistItems);
    return { success: true, data: { items: wishlistItems }, fromLocalStorage: true };
  }
};

/**
 * Remove item from wishlist
 */
export const removeFromWishlist = async (productId, removeFromWishlistMutation = null) => {
  if (isLoggedIn()) {
    if (!removeFromWishlistMutation) {
      throw new Error('Remove from wishlist mutation is required for logged-in users');
    }

    try {
      const result = await removeFromWishlistMutation({ productId }).unwrap();
      return { success: true, data: result.data, fromLocalStorage: false };
    } catch (error) {
      console.error('Error removing wishlist item via API:', error);
      throw error;
    }
  } else {
    const wishlistItems = getLocalWishlist();
    const filteredItems = wishlistItems.filter(
      item => item.productId !== productId
    );
    saveLocalWishlist(filteredItems);
    return { success: true, data: { items: filteredItems }, fromLocalStorage: true };
  }
};

/**
 * Get wishlist items
 * - If logged in: Fetch from database via API (requires query hook result or refetch function)
 * - If not logged in: Get from localStorage
 */
export const getWishlist = async (wishlistQueryResult = null) => {
  if (isLoggedIn()) {
    // User is logged in - fetch from database
    if (!wishlistQueryResult) {
      throw new Error('Wishlist query result is required for logged-in users. Use useGetWishlistQuery hook in your component.');
    }

    try {
      // If it's a refetch function, call it
      if (typeof wishlistQueryResult === 'function') {
        const result = await wishlistQueryResult();
        return { success: true, data: result.data, fromLocalStorage: false };
      }
      // If it's already the query result data
      if (wishlistQueryResult.data) {
        return { success: true, data: wishlistQueryResult.data, fromLocalStorage: false };
      }
      throw new Error('Invalid wishlist query result');
    } catch (error) {
      console.error('Error fetching wishlist from API:', error);
      throw error;
    }
  } else {
    // Guest user - get from localStorage
    const wishlistItems = getLocalWishlist();
    return { success: true, data: { items: wishlistItems }, fromLocalStorage: true };
  }
};

/**
 * Check if product is in wishlist
 */
export const isInWishlist = (productId, wishlistQueryResult = null) => {
  if (isLoggedIn()) {
    if (wishlistQueryResult && wishlistQueryResult.data && wishlistQueryResult.data.items) {
      return wishlistQueryResult.data.items.some(
        item => item.productId && item.productId.toString() === productId.toString()
      );
    }
    return false;
  } else {
    const wishlistItems = getLocalWishlist();
    return wishlistItems.some(item => item.productId === productId);
  }
};

/**
 * Sync localStorage wishlist to database after login
 * This should be called after successful login
 * @param {Function} syncWishlistMutation - The syncWishlist mutation hook from CustomerApi
 */
export const syncLocalWishlistToDatabase = async (syncWishlistMutation) => {
  if (!isLoggedIn()) {
    return { success: false, message: 'User is not logged in' };
  }

  const localWishlistItems = getLocalWishlist();
  
  if (!localWishlistItems || localWishlistItems.length === 0) {
    return { success: true, message: 'No items to sync', synced: 0 };
  }

  try {
    // Prepare items for sync (remove tempId and addedAt fields)
    const itemsToSync = localWishlistItems.map(item => ({
      productId: item.productId,
      product_id: item.product_id || '',
      selectedVariant: item.selectedVariant || {}
    }));

    // Use syncWishlist API endpoint for bulk sync
    const result = await syncWishlistMutation({ items: itemsToSync }).unwrap();
    
    // Clear localStorage wishlist after successful sync
    if (result.data && result.data.synced > 0) {
      clearLocalWishlist();
    }

    return { 
      success: true, 
      message: result.data?.synced ? `Synced ${result.data.synced} item(s) to database` : 'Wishlist synced',
      synced: result.data?.synced || 0,
      errors: result.data?.errors
    };
  } catch (error) {
    console.error('Error syncing wishlist to database:', error);
    return { success: false, message: error.data?.message || error.message || 'Failed to sync wishlist', synced: 0 };
  }
};

/**
 * Get wishlist item count
 */
export const getWishlistItemCount = async (wishlistQueryResult = null) => {
  try {
    const wishlist = await getWishlist(wishlistQueryResult);
    if (wishlist.success && wishlist.data && wishlist.data.items) {
      return wishlist.data.items.length;
    }
    return 0;
  } catch (error) {
    console.error('Error getting wishlist item count:', error);
    return 0;
  }
};

