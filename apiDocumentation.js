let html_200_response = {
    "200": {
        description: "Successful operation",
        content: {
            "text/html": {
                schema: {
                    type: "string",
                    format: "html"
                }
            }
        }
    }
}
let jwt_cookie = {
    name: "jwt",
    in: "cookie",
    description: "JWT",
    required: true
}

const ok = {
    type: "boolean",
    description: "true if the request was successful"
}

const message = {
    type: "string",
    description: "The message of the request"
}

const data = {
    type: "object",
    description: "The data of the request"
}

const dataLength = {
    type: "number",
    description: "The length of the data"
}

const error = {
    type: "object",
    description: "The error of the request"
}


const user_responses = {
    "200": {
        description: "Successful operation",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        ok,
                        data,
                        message
                    }
                }
            }
        }
    },
    "500": {
        description: "Internal server error",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        ok,
                        message,
                        error
                    }
                }
            }
        }
    }
}
const api_response = {
    "200": {
        description: "Successful operation",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        ok,
                        message,
                        data

                    }
                }
            }
        }
    },
    "500": {
        description: "Internal server error",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        ok,
                        message,
                        error
                    }
                }
            }
        }
    }
}
let swagger = {
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for the API of the urban gardenining project',
            contact: {
                name: "Jakob Danel",
                email: "jdanel@uni-muenster.de"
            }
        },
        openapi: "3.0.1",
        license: {
            name: "ISC",
            url: "https://opensource.org/licenses/ISC"
        },
        servers: [{
            url: "http://localhost:3000",
            description: "Localhost"
        }],
        tags: [],
        paths: {
            "/index": {
                get: {
                    tags: ["index", "garden_overview"],
                    summary: "Get the index page",
                    description: "Get the index page",
                    operationId: "getIndex",
                    parameters: [],
                    cookies: [jwt_cookie],
                    responses: html_200_response

                },
            },
            "/": {
                get: {
                    tags: ["garden_overview"],
                    summary: "Get the index page",
                    description: "Get the index page",
                    operationId: "getIndex",
                    parameters: [],
                    cookies: [jwt_cookie],
                    responses: html_200_response


                }
            },
            "/Taskscheduler": {
                get: {
                    tags: ["Taskscheduler"],
                    summary: "Get the Taskscheduler page",
                    description: "Get the Taskscheduler page",
                    operationId: "getTaskscheduler",
                    parameters: [],
                    cookies: [jwt_cookie],
                    responses: html_200_response
                }
            },
            "/task": {
                get: {
                    tags: ["task"],
                    summary: "Get the task page",
                    description: "Get the task page",
                    operationId: "getTask",
                    parameters: [],
                    cookies: [
                        jwt_cookie
                    ],
                    responses: html_200_response
                }
            },
            "/tools": {
                get: {
                    tags: ["tools"],
                    summary: "Get the tools page",
                    description: "Get the tools page",
                    operationId: "getTools",
                    parameters: [],
                    cookies: [jwt_cookie],
                    responses: html_200_response
                }
            },
            "/process": {
                get: {
                    tags: ["process"],
                    summary: "Get the process page",
                    description: "Get the process page",
                    operationId: "getProcess",
                    parameters: [],
                    cookies: [jwt_cookie],
                    responses: html_200_response
                }
            },
            "/plantcare": {
                get: {
                    tags: ["plantcare"],
                    summary: "Get the plantcare page",
                    description: "Get the plantcare page",
                    operationId: "getPlantcare",
                    parameters: [],
                    cookies: [jwt_cookie],
                    responses: html_200_response
                }
            },
            "/signin": {
                get: {
                    tags: ["signin"],
                    summary: "Get the signin page",
                    description: "Get the signin page",
                    operationId: "getSignin",
                    parameters: [],
                    responses: html_200_response
                }
            },
            "/email_popup": {
                get: {
                    tags: ["email_popup"],
                    summary: "Get the email_popup page",
                    description: "Get the email_popup page",
                    operationId: "getEmail_popup",
                    parameters: [],
                    responses: html_200_response
                },
                post: {
                    tags: ["email_popup"],
                    summary: "Send an email from the contact form",
                    description: "Send an email from the contact form",
                    operationId: "sendEmail_popup",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            description: "The prename of the sender"

                                        },
                                        commpany: {
                                            type: "string",
                                            description: "The last name of the sender"
                                        },
                                        email: {
                                            type: "string",
                                            description: "The email of the sender"
                                        },
                                        message: {
                                            type: "string",
                                            description: "The message of the sender"
                                        },
                                        phone: {
                                            type: "string",
                                            description: "The phone number of the sender"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: html_200_response
                }
            },
            "/Impressum": {
                get: {
                    tags: ["Impressum"],
                    summary: "Get the Impressum page",
                    description: "Get the Impressum page",
                    operationId: "getImpressum",
                    parameters: [],
                    responses: html_200_response
                }
            },
            "/about-not-logged-in": {
                get: {
                    tags: ["about-not-logged-in"],
                    summary: "Get the about-not-logged-in page",
                    description: "Get the about-not-logged-in page",
                    operationId: "getAbout-not-logged-in",
                    parameters: [],
                    responses: html_200_response
                }
            },
            "/users": {
                get: {
                    tags: ["users"],
                    summary: "Get all users",
                    description: "Get all users",
                    operationId: "getUsers",
                    parameters: [],
                    responses: {
                        "200": {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message,
                                            data,
                                            dataLength
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Internal server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message,
                                            error
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/users/{id}": {
                get: {
                    tags: ["users"],
                    summary: "Get a user by id",
                    description: "Get a user by id",
                    operationId: "getUserById",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the user",
                        required: true,
                    }],
                    responses: {
                        "200": {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message,
                                            data
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Internal server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message,
                                            error
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/users/name/{:id}": {
                get: {
                    tags: ["users"],
                    summary: "Get a user by name",
                    description: "Get a user by name",
                    operationId: "getUserByName",
                    parameters: [{
                        name: "name",
                        in: "path",
                        description: "The name of the user",
                        required: true,
                    }],
                    responses: user_responses
                }
            },
            "/users/create": {
                post: {
                    tags: ["users"],
                    summary: "Create a new user",
                    description: "Create a new user",
                    operationId: "createUser",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                            description: "The username of the user"
                                        },
                                        firstname: {
                                            type: "string",
                                            description: "The firstname of the user"

                                        },
                                        lastname: {
                                            type: "string",
                                            description: "The lastname of the user"
                                        },
                                        password: {
                                            type: "string",
                                            description: "The password of the user"
                                        },
                                        email: {
                                            type: "string",
                                            description: "The email of the user"
                                        },
                                        telefonNumber: {

                                            type: "string",
                                            description: "The telefon number of the user"
                                        }

                                    }
                                }
                            }
                        }
                    },
                    responses: user_responses
                }
            },
            "/users/modify": {
                post: {
                    tags: ["users"],
                    summary: "Modify a user",
                    description: "Modify a user",
                    operationId: "modifyUser",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: {
                                            type: "string",
                                            description: "The id of the user"
                                        },
                                        username: {
                                            type: "string",
                                            description: "The username of the user"
                                        },
                                        firstname: {
                                            type: "string",
                                            description: "The firstname of the user"

                                        },
                                        lastname: {
                                            type: "string",
                                            description: "The lastname of the user"
                                        },
                                        password: {
                                            type: "string",
                                            description: "The password of the user"
                                        },
                                        email: {
                                            type: "string",
                                            description: "The email of the user"
                                        },
                                        telefonNumber: {

                                            type: "string",
                                            description: "The telefon number of the user"
                                        }
                                    }
                                }
                            }
                        },

                    },
                    responses: user_responses
                }
            },
            "/users/delete/{:id}": {
                get: {
                    tags: ["users"],
                    summary: "Delete a user",
                    description: "Delete a user",
                    operationId: "deleteUser",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the user",
                        required: true,
                    }],
                    responses: user_responses
                }
            },
            "/taskManager": {
                get: {
                    tags: ["taskManager"],
                    summary: "Get all tasks",
                    description: "Get all tasks",
                    operationId: "getTasks",
                    parameters: [],
                    responses: {
                        "200": {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message,
                                            data,
                                            dataLength
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Internal server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message,
                                            error
                                        }
                                    }
                                }
                            }
                        },

                    }
                }
            },
            "/taskManager/{id}": {
                get: {
                    tags: ["taskManager"],
                    summary: "Get a task by id",
                    description: "Get a task by id",
                    operationId: "getTaskById",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the task",
                        required: true,
                    }],
                    responses: {
                        "200": {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message,
                                            data
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Internal server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message,
                                            error
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/taskManager/create": {
                post: {
                    tags: ["taskManager"],
                    summary: "Create a new task",
                    description: "Create a new task",
                    operationId: "createTask",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        taskName: {
                                            type: "string",
                                            description: "The name of the task"
                                        },
                                        taskType: {
                                            type: "string",
                                            description: "The type of the task"
                                        },
                                        taskElement: {
                                            type: "string",
                                            description: "The element of the task"
                                        },
                                        creator: {
                                            type: "string",
                                            description: "The creator of the task, as the id of the user"
                                        },
                                        assignedTo: {
                                            type: "string",
                                            description: "The assignedTo of the task, as the id of the user"
                                        },
                                        details: {
                                            type: "string",
                                            description: "The details of the task"
                                        },
                                        until: {
                                            type: "string",
                                            description: "The until date of the task"
                                        },
                                        assignedTo: {
                                            type: "string",
                                            description: "The assignedTo of the task, as the id of the user"
                                        }
                                    },
                                    required: ["taskName", "taskType", "taskElement", "creator", "details", "until", "assignedTo"]
                                },

                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        ok,
                                        message,
                                        data
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        ok,
                                        message,
                                        error
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/taskManager/modify": {
                post: {
                    tags: ["taskManager"],
                    summary: "Modify a task",
                    description: "Modify a task",
                    operationId: "modifyTask",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        taskName: {
                                            type: "string",
                                            description: "The name of the task"
                                        },
                                        taskType: {
                                            type: "string",
                                            description: "The type of the task"
                                        },
                                        taskElement: {
                                            type: "string",
                                            description: "The element of the task"
                                        },
                                        creator: {
                                            type: "string",
                                            description: "The creator of the task, as the id of the user"
                                        },
                                        assignedTo: {
                                            type: "string",
                                            description: "The assignedTo of the task, as the id of the user"
                                        },
                                        details: {
                                            type: "string",
                                            description: "The details of the task"
                                        },
                                        until: {
                                            type: "string",
                                            description: "The until date of the task"
                                        },
                                        assignedTo: {
                                            type: "string",
                                            description: "The assignedTo of the task, as the id of the user"
                                        },
                                        _id: {
                                            type: "string",
                                            description: "The id of the task"
                                        }
                                    },
                                    required: ["taskName", "taskType", "taskElement", "creator", "details", "until", "assignedTo"]
                                },
                            }
                        }

                    },
                    responses: api_response
                }
            },
            "/taskManager/delete/{id}": {
                get: {
                    tags: ["taskManager"],
                    summary: "Delete a task",
                    description: "Delete a task",
                    operationId: "deleteTask",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the task",
                        required: true,
                    }],
                    responses: api_response
                }
            },
            "/plantManager/": {
                get: {
                    tags: ["plantManager"],
                    summary: "Get all the plants",
                    description: "Get all the plants",
                    operationId: "getAllPlants",
                    responses: api_response
                }
            },
            "/plantManager/{id}": {
                get: {
                    tags: ["plantManager"],
                    summary: "Get a plant by id",
                    description: "Get a plant by id",
                    operationId: "getPlantById",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the plant",
                        required: true,
                    }],
                    responses: api_response
                }
            },
            "/plantManager/create": {
                post: {
                    tags: ["plantManager"],
                    summary: "Create a new plant",
                    description: "Create a new plant",
                    operationId: "createPlant",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        plantName: {
                                            type: "string",
                                            description: "The name of the plant"
                                        },
                                        plantSpecies: {
                                            type: "string",
                                            description: "The species of the plant"
                                        },
                                        details: {
                                            type: "string",
                                            description: "The details of the plant"
                                        },
                                        imageUrl: {
                                            type: "string",
                                            description: "The image url of the plant"
                                        },
                                        dataUrl: {
                                            type: "string",
                                            description: "The data url of the plant"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: api_response
                }
            },
            "/plantManager/modify": {
                post: {
                    tags: ["plantManager"],
                    summary: "Modify a plant",
                    description: "Modify a plant",
                    operationId: "modifyPlant",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        plantName: {
                                            type: "string",
                                            description: "The name of the plant"
                                        },
                                        plantSpecies: {
                                            type: "string",
                                            description: "The species of the plant"
                                        },
                                        details: {
                                            type: "string",
                                            description: "The details of the plant"
                                        },
                                        imageUrl: {
                                            type: "string",
                                            description: "The image url of the plant"
                                        },
                                        dataUrl: {
                                            type: "string",
                                            description: "The data url of the plant"
                                        },
                                        _id: {
                                            type: "string",
                                            description: "The id of the plant"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: api_response
                }
            },
            "/plantManager/delete/{id}": {
                get: {
                    tags: ["plantManager"],
                    summary: "Delete a plant",
                    description: "Delete a plant",
                    operationId: "deletePlant",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the plant",
                        required: true,
                    }],
                    responses: api_response
                }
            },
            "/processManager/": {
                get: {
                    tags: ["processManager"],
                    summary: "Get all the processes",
                    description: "Get all the processes",
                    operationId: "getAllProcesses",
                    responses: api_response
                },
            },
            "/processManager/{id}": {
                get: {
                    tags: ["processManager"],
                    summary: "Get a process by id",
                    description: "Get a process by id",
                    operationId: "getProcessById",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the process",
                        required: true,

                    }],
                    responses: api_response
                }
            },
            "/processManager/create": {
                post: {
                    tags: ["processManager"],
                    summary: "Create a new process",
                    description: "Create a new process",
                    operationId: "createProcess",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            description: "The name of the process"
                                        },
                                        description: {
                                            type: "string",
                                            description: "The description of the process"
                                        },
                                        imageUrl: {
                                            type: "string",
                                            description: "The image url of the process"
                                        },
                                        tutorialUrl: {
                                            type: "string",
                                            description: "The tutorial url of the process"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: api_response
                }
            },
            "/processManager/update/{id}": {
                post: {
                    tags: ["processManager"],
                    summary: "Modify a process",
                    description: "Modify a process",
                    operationId: "modifyProcess",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the process",
                        required: true,
                    }],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            description: "The name of the process"
                                        },
                                        description: {
                                            type: "string",
                                            description: "The description of the process"
                                        },
                                        imageUrl: {
                                            type: "string",
                                            description: "The image url of the process"
                                        },
                                        tutorialUrl: {
                                            type: "string",
                                            description: "The tutorial url of the process"
                                        },
                                    }
                                }
                            }
                        }
                    },
                    responses: api_response
                }
            },
            "/processManager/delete/{id}": {
                get: {
                    tags: ["processManager"],
                    summary: "Delete a process",
                    description: "Delete a process",
                    operationId: "deleteProcess",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the process",
                        required: true,
                    }],
                    responses: api_response
                }
            },
            "/objectManager/": {
                get: {
                    tags: ["objectManager"],
                    summary: "Get all the objects",
                    description: "Get all the objects",
                    operationId: "getAllObjects",
                    responses: api_response
                },

            },
            "/objectManager/{id}": {
                get: {
                    tags: ["objectManager"],
                    summary: "Get an object by id",
                    description: "Get an object by id",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the object",
                        required: true,
                    }],
                    responses: api_response
                }
            },
            "/objectManager/create": {
                post: {
                    tags: ["objectManager"],
                    summary: "Create a new object",
                    description: "Create a new object",
                    operationId: "createObject",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        objectName: {
                                            type: "string",
                                            description: "The name of the object"
                                        },
                                        description: {
                                            type: "string",
                                            description: "The description of the object"
                                        },
                                        imageUrl: {
                                            type: "string",
                                            description: "The image url of the object"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: api_response
                }
            },
            "/objectManager/modify": {
                post: {
                    tags: ["objectManager"],
                    summary: "Modify an object",
                    description: "Modify an object",
                    operationId: "modifyObject",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        objectName: {
                                            type: "string",
                                            description: "The name of the object"
                                        },
                                        description: {
                                            type: "string",
                                            description: "The description of the object"
                                        },
                                        imageUrl: {
                                            type: "string",
                                            description: "The image url of the object"
                                        },
                                        _id: {
                                            type: "string",
                                            description: "The id of the object"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: api_response
                }
            },
            "/objectManager/delete/{id}": {
                get: {
                    tags: ["objectManager"],
                    summary: "Delete an object",
                    description: "Delete an object",
                    operationId: "deleteObject",
                    parameters: [{
                        name: "id",
                        in: "path",
                        description: "The id of the object",
                        required: true,
                    }],
                    responses: api_response
                }
            },
            "/api/register": {
                post: {
                    tags: ["api"],
                    summary: "Register a new user",
                    description: "Register a new user",
                    operationId: "register",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                            description: "The username of the user"
                                        },
                                        password: {
                                            type: "string",
                                            description: "The password of the user"
                                        },
                                        firstName: {
                                            type: "string",
                                            description: "The first name of the user"
                                        },
                                        lastName: {
                                            type: "string",
                                            description: "The last name of the user"
                                        },
                                        email: {
                                            type: "string",
                                            description: "The email of the user"
                                        },
                                        telefonNumber: {
                                            type: "string",
                                            description: "The telefon number of the user"
                                        },
                                        garden: {
                                            type: "string",
                                            description: "The garden of the user"
                                        },
                                        tasks: {
                                            type: "array",
                                            description: "The tasks of the user"
                                        },
                                        pressenceTime: {
                                            type: "string",
                                            description: "The pressence time of the user"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Success",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request: Username already exists/Password is not strong enough",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Internal Server Error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/login": {
                post: {
                    tags: ["api"],
                    summary: "Login a user",
                    description: "Login a user",
                    operationId: "login",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                            description: "The username of the user"
                                        },
                                        password: {
                                            type: "string",
                                            description: "The password of the user"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Success",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            data: {
                                                type: "object",
                                                properties: {
                                                    token: {
                                                        type: "string",
                                                        description: "The token of the user"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request: Username or password is incorrect",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/verify": {
                get: {
                    tags: ["api"],
                    summary: "Verify a user",
                    description: "Verify a user. Verify the jwt token saved in the cookies and checking if it is a valid token",  
                    operationId: "verify",
                    responses: {
                        "200": {
                            description: "Success",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            data: {
                                                type: "object",
                                                description: "The decoded information of the token"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad Request: No token provided",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            description: "Unauthorized: Token is invalid",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            ok,
                                            message
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

        module.exports = swagger;