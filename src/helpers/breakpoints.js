// Mobile - 600px
// Tablet - 601px - 768px
// Mobile L - 425px
// Tablet - 768px
// Laptop - 1024px
// Laptop L - 1440px
// 4K - 2560px

const size = {
    mobile: "600px",
    tabletMin: "601px",
    tabletMax: "768px",
    laptopMin: "769px",
    laptopMax: "1099px",
    desktop: "1100px",
};

export const device = {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(min-width: ${size.tabletMin}) and (max-width: ${size.tabletMax})`,
    laptop: `(min-width: ${size.laptopMin}) and (max-width: ${size.laptopMax})`,
    desktop: `(min-width: ${size.desktop})`,
};
