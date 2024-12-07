"use client";

import { SessionProvider } from "next-auth/react";

/**
 * A wrapper component for the NextAuth.js SessionProvider.
 * This component provides session management and authentication state to its children components.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the SessionProvider.
 *
 * @returns {React.ReactElement} - The wrapped child components with session management.
 *
 * @example
 * ```jsx
 * import { SessionProviderWrapper } from './SessionProviderWrapper';
 *
 * function MyApp({ Component, pageProps }) {
 *   return (
 *     <SessionProviderWrapper>
 *       <Component {...pageProps} />
 *     </SessionProviderWrapper>
 *   );
 * }
 * ```
 */
export default function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
