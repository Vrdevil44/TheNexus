export const getBasePath = () => {
    // In production (GitHub Pages), we need the repo name prefix
    // We check for production NODE_ENV or if we are in a CI environment
    const isProd = process.env.NODE_ENV === 'production' || process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
    return isProd ? '/TheNexus' : '';
};

export const getAssetPath = (path: string) => {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${getBasePath()}${cleanPath}`;
};
