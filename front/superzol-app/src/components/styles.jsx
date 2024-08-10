import {css} from 'styled-components';

export const breakpoints = {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
};

export const media = {
    xs: (...args) => css`
        @media (max-width: ${breakpoints.sm}) {
            ${css(...args)};
        }
    `,
    sm: (...args) => css`
        @media (min-width: ${breakpoints.sm}) {
            ${css(...args)};
        }
    `,
    md: (...args) => css`
        @media (min-width: ${breakpoints.md}) {
            ${css(...args)};
        }
    `,
    lg: (...args) => css`
        @media (min-width: ${breakpoints.lg}) {
            ${css(...args)};
        }
    `,
    xl: (...args) => css`
        @media (min-width: ${breakpoints.xl}) {
            ${css(...args)};
        }
    `,
};