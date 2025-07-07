import type { Metadata } from "next";

const BASE_URL = "https://maliek-davis.com";

/**
 * Generates metadata with a canonical URL based on the provided pathname.
 *
 * @param pathname - The pathname of the current route (e.g., "/about", "/blog/posts/my-post").
 * @param customMetadata - Optional: Additional metadata to merge (e.g., title, description).
 * @returns Metadata object with canonical and metadataBase included.
 */
export function getMetadataWithCanonical(
    pathname: string,
    customMetadata: Partial<Metadata> = {}
): Metadata {
    const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, ""); // Remove trailing slash
    return {
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
        },
        ...customMetadata,
    };
}
