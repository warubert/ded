export const abilityScoresSchema = {
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
        full_name: {
            type: 'string',
            maxLength: 100
        },
        desc: {
            type: "array",
            items: {
                type: 'string',
                maxLength: 100
            }
        },
        skills: {
            type: "array",
            items: {
                type: 'string',
                maxLength: 100
            }
        },
        url: {
            type: 'string'
        }
    },
    required: ['index', 'name', 'full_name', 'desc', 'skills', 'url']
  }