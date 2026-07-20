/**
 * applyPageSEO — Injects SEO metadata into the document <head>.
 * Call this with the data object from /api/settings/seo_<page>
 * or from service.seo for individual service pages.
 *
 * @param {Object} data - SEO fields object
 */
export function applyPageSEO(data) {
  if (!data) return;

  const setMeta = (selector, attr, value) => {
    if (!value) return;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      const [attrName, attrVal] = attr.split("=");
      el.setAttribute(attrName, attrVal.replace(/"/g, ""));
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  };

  // Title
  if (data.metaTitle) document.title = data.metaTitle;

  // Standard meta
  setMeta('meta[name="description"]', 'name=description', data.metaDescription);
  setMeta('meta[name="keywords"]', 'name=keywords', data.metaKeywords);

  // OG tags
  setMeta('meta[property="og:title"]', 'property=og:title', data.ogTitle || data.metaTitle);
  setMeta('meta[property="og:description"]', 'property=og:description', data.ogDescription || data.metaDescription);
  setMeta('meta[property="og:image"]', 'property=og:image', data.ogImage);

  // Canonical
  if (data.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", data.canonicalUrl);
  }
}
