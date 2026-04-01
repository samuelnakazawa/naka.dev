const config = {
  plugins: [
    '@tailwindcss/postcss',
    ...(process.env.NODE_ENV === 'production'
      ? [
        [
          'cssnano',
          {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                minifyFontValues: { removeQuotes: false },
              },
            ],
          },
        ],
      ]
      : []),
  ],
};

export default config;
