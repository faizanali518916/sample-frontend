/** @type {import('next').NextConfig} */

const nextConfig = {
  // Broad dev-origin allowance (covers most public hosts, subdomains, and localhost variants).
  allowedDevOrigins: ["**.*", "localhost", "*.localhost", "[::1]"],
};

export default nextConfig;
