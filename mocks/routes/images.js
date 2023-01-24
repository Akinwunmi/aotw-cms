module.exports = [
  {
    id: 'public',
    url: '/api/images',
    variants: [
      {
        id: 'available',
        type: 'static',
        options: {
          path: 'mocks/public/images', // path of the folder to be served
          headers: { // response headers to send in every asset request
            'x-custom-header': 'foo-header-value',
          },
          options: { // options for the express.static method
            maxAge: 500
          }
        },
      }
    ]
  }
];