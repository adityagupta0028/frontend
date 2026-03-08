/**
 * Shared filter URL parsing for hero menu and category pages.
 * Must match FilterSidebar array vs single filter keys and backend getProducts params.
 */
export const ARRAY_FILTER_KEYS = [
  'shankTreatments',
  'styles',
  'settingFeatures',
  'motifThemes',
  'ornamentDetails',
  'accentStoneShapes'
];

export const ALL_FILTER_KEYS = [
  'settingConfigurations',
  'shankConfigurations',
  'holdingMethods',
  'bandProfileShapes',
  'bandWidthCategories',
  'bandFits',
  ...ARRAY_FILTER_KEYS
];

/**
 * Parse URL search params into selectedFilters shape used by FilterSidebar and getProducts.
 * @param {URLSearchParams} searchParams
 * @returns {Object} selectedFilters e.g. { styles: ['id1'], bandFits: 'id2' }
 */
export function parseFiltersFromSearchParams(searchParams) {
  if (!searchParams || typeof searchParams.forEach !== 'function') return {};
  const filters = {};
  const set = new Set(ALL_FILTER_KEYS);
  searchParams.forEach((value, key) => {
    if (!set.has(key) || !value) return;
    if (ARRAY_FILTER_KEYS.includes(key)) {
      const arr = searchParams.getAll(key).filter(Boolean);
      if (arr.length) filters[key] = arr;
    } else {
      filters[key] = value;
    }
  });
  return filters;
}
