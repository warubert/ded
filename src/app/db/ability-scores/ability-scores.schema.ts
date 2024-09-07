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
            type: "array",
            items: {
                type: "object",
                properties: {
                    "lang": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                }
            }
        },
        full_name: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    "lang": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                }
            }
        },
        desc: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    "lang": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                }
            }
        },
        skills: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    "name": {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                lang: {
                                    "type": "string"
                                },
                                value: {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    index: {
                        type: "string"
                    },
                    url: {
                        type: "string"
                    }
                }
            }
        },
        url: {
            type: 'string'
        }
    },
    required: ['index', 'name', 'full_name', 'desc', 'skills', 'url']
  }