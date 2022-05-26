export const EventRaceResultsSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date',
    },
    name: {
      type: 'string',
    },
    races: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          athletes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                surname: {
                  type: 'string',
                },
                born: {
                  type: 'integer',
                },
                club: {
                  type: 'string',
                  nullable: true,
                },
                diff: {
                  type: 'string',
                  nullable: true,
                },
                finish: {
                  type: 'string',
                  nullable: true,
                },
                rank: {
                  type: ['integer', 'string'],
                  nullable: true,
                },
                rank_sokol: {
                  type: ['integer', 'string'],
                  nullable: true,
                },
                start: {
                  type: 'string',
                  nullable: true,
                },
                time: {
                  type: 'string',
                  nullable: true,
                },
              },
              required: ['born', 'name', 'surname'],
            },
          },
          desc: {
            type: 'string',
            nullable: true,
          },
          distance: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          sex: {
            type: 'string',
            enum: ['f', 'm'],
          },
        },
        required: ['athletes', 'distance', 'name'],
      },
    },
  },
  required: ['date', 'name', 'races'],
};
