export function getDetailPageUrl(itemId) {
  if (window.location.pathname.includes("/cart/")) {
    return `../products/details.html?id=${itemId}`;
  }
  return `details.html?id=${itemId}`;
}
