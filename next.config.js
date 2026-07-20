/** @type {import('next').NextConfig} */
const nextConfig = {
	// Export-only build (static HTML export)
	output: 'export',
	images: {
		unoptimized: true,
	},
	trailingSlash: true,
};

module.exports = nextConfig;
