const STRAPI_BASE_URL = "https://useful-birthday-447da4b4ae.strapiapp.com";
const STRAPI_API_URL = `${STRAPI_BASE_URL}/api`;

const getStrapiMediaUrl = (mediaPath) => {

    
    if (!mediaPath || typeof mediaPath !== "string") return null;
    const cleanPath = mediaPath.trim();
    if (!cleanPath) return null;
    if (/^https?:\/\//i.test(cleanPath)) return cleanPath;
    if (cleanPath.startsWith("//")) return `https:${cleanPath}`;

    const normalizedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    return `${STRAPI_BASE_URL}${normalizedPath}`;
};

export { STRAPI_BASE_URL, STRAPI_API_URL, getStrapiMediaUrl };
