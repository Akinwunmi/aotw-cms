// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

// archives data
const ARCHIVES = [
  {
    id: 1,
    name: 'Flags',
    reference: 'flags'
  },
  {
    id: 2,
    name: 'Football',
    reference: 'football'
  },
  {
    id: 3,
    name: 'Birds',
    reference: 'birds'
  },
  {
    id: 4,
    name: 'Basketball',
    reference: 'basketball'
  },
  {
    id: 5,
    name: 'License Plates',
    reference: 'license-plates'
  },
  {
    id: 6,
    name: 'Pokémon',
    reference: 'pokemon'
  },
  {
    id: 7,
    name: 'Coats of Arms',
    reference: 'coats-of-arms'
  },
  {
    id: 8,
    name: 'Pokémon TCG',
    reference: 'pokemon-tcg'
  },
  {
    id: 9,
    name: 'Countries',
    reference: 'countries'
  },
  {
    id: 10,
    name: 'Cars',
    reference: 'cars'
  },
  {
    id: 11,
    name: 'Books',
    reference: 'books'
  },
  {
    id: 12,
    name: 'Cats',
    reference: 'cats'
  },
  {
    id: 13,
    name: 'Music Artists',
    reference: 'music-artists'
  },
  {
    id: 14,
    name: 'Dogs',
    reference: 'dogs'
  }
];

module.exports = [
  {
    id: "get-archives", // route id
    url: "/api/archives", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ARCHIVES, // body to send
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-archive", // route id
    url: "/api/archives/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const archiveId = req.params.id;
            const archive = ARCHIVES.find((archiveData) => archiveData.id === Number(archiveId));
            if (archive) {
              res.status(200);
              res.send(archive);
            } else {
              res.status(404);
              res.send({
                message: "Archive not found",
              });
            }
          },
        },
      },
    ],
  },
];
