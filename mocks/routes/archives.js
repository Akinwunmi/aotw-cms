// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

// archives data
const ARCHIVES = [
  {
    id: 1,
    name: 'Basketball'
  },
  {
    id: 2,
    name: 'Birds'
  },
  {
    id: 3,
    name: 'Books'
  },
  {
    id: 4,
    name: 'Cats'
  },
  {
    id: 5,
    name: 'Coats of Arms'
  },
  {
    id: 6,
    name: 'Countries'
  },
  {
    id: 7,
    name: 'Dogs'
  },
  {
    id: 8,
    name: 'Flags'
  },
  {
    id: 9,
    name: 'Football'
  },
  {
    id: 10,
    name: 'License Plates'
  },
  {
    id: 11,
    name: 'Music Artists'
  },
  {
    id: 12,
    name: 'Pokémon'
  },
  {
    id: 13,
    name: 'Pokémon TCG'
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
