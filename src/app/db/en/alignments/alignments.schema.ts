export const alignmentsSchema = {
    version: 0,
    primaryKey: 'index',
    type: 'object',
    properties: {
        index: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string',
            maxLength: 100
        },
        abbreviation: {
            type: 'string',
            maxLength: 100
        },
        desc: {
            type: "array",
        },
        url: {
            type: 'string'
        }
    },
    required: ['index', 'name', 'abbreviation', 'desc', 'url']
  }