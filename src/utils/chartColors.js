// Keep INCOME_COLOR / EXPENSE_COLOR in sync with the --income / --expense
// values in index.css — those drive text/bars, these drive chart fills.
export const INCOME_COLOR = { light: '#1f6f54', dark: '#58b696' };
export const EXPENSE_COLOR = { light: '#a23b3b', dark: '#e08a72' };

// A muted, distinct-hue palette for category donuts. Cycled by index, so
// it comfortably covers the fixed category lists in utils/categories.js.
export const CATEGORY_PALETTE = {
  light: ['#3d6a99', '#a2763d', '#6b4d99', '#3d9994', '#99593d', '#5f8f3d', '#993d6e', '#6b6b66'],
  dark: ['#7fa8d9', '#d9a97f', '#a98fd9', '#7fd9d3', '#d98f7f', '#9fd97f', '#d97fa8', '#a3a39c'],
};
