export const nodeTypes = [
    {
        "name": "BasicLLMNode",
        "config": {
            "$defs": {
                "ModelName": {
                    "enum": [
                        "gpt-4o-mini",
                        "gpt-4o",
                        "o1-preview",
                        "o1-mini",
                        "gpt-4-turbo"
                    ],
                    "title": "ModelName",
                    "type": "string"
                }
            },
            "properties": {
                "llm_name": {
                    "$ref": "#/$defs/ModelName"
                },
                "max_tokens": {
                    "title": "Max Tokens",
                    "type": "integer"
                },
                "temperature": {
                    "title": "Temperature",
                    "type": "number"
                },
                "json_mode": {
                    "title": "Json Mode",
                    "type": "boolean"
                },
                "system_prompt": {
                    "title": "System Prompt",
                    "type": "string"
                },
                "few_shot_examples": {
                    "anyOf": [
                        {
                            "items": {
                                "additionalProperties": {
                                    "type": "string"
                                },
                                "type": "object"
                            },
                            "type": "array"
                        },
                        {
                            "type": "null"
                        }
                    ],
                    "default": null,
                    "title": "Few Shot Examples"
                }
            },
            "required": [
                "llm_name",
                "max_tokens",
                "temperature",
                "json_mode",
                "system_prompt"
            ],
            "title": "BasicLLMNodeConfig",
            "type": "object"
        },
        "input": {
            "properties": {
                "user_message": {
                    "title": "User Message",
                    "type": "string"
                }
            },
            "required": [
                "user_message"
            ],
            "title": "BasicLLMNodeInput",
            "type": "object"
        },
        "output": {
            "properties": {
                "assistant_message": {
                    "title": "Assistant Message",
                    "type": "string"
                }
            },
            "required": [
                "assistant_message"
            ],
            "title": "BasicLLMNodeOutput",
            "type": "object"
        }
    },
    {
        "name": "StructuredOutputLLMNode",
        "config": {
            "$defs": {
                "ModelName": {
                    "enum": [
                        "gpt-4o-mini",
                        "gpt-4o",
                        "o1-preview",
                        "o1-mini",
                        "gpt-4-turbo"
                    ],
                    "title": "ModelName",
                    "type": "string"
                }
            },
            "properties": {
                "llm_name": {
                    "$ref": "#/$defs/ModelName"
                },
                "max_tokens": {
                    "title": "Max Tokens",
                    "type": "integer"
                },
                "temperature": {
                    "title": "Temperature",
                    "type": "number"
                },
                "system_prompt": {
                    "title": "System Prompt",
                    "type": "string"
                },
                "output_schema": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "title": "Output Schema",
                    "type": "object"
                },
                "few_shot_examples": {
                    "anyOf": [
                        {
                            "items": {
                                "additionalProperties": {
                                    "type": "string"
                                },
                                "type": "object"
                            },
                            "type": "array"
                        },
                        {
                            "type": "null"
                        }
                    ],
                    "default": null,
                    "title": "Few Shot Examples"
                }
            },
            "required": [
                "llm_name",
                "max_tokens",
                "temperature",
                "system_prompt",
                "output_schema"
            ],
            "title": "StructuredOutputLLMNodeConfig",
            "type": "object"
        },
        "input": {
            "properties": {
                "user_message": {
                    "title": "User Message",
                    "type": "string"
                }
            },
            "required": [
                "user_message"
            ],
            "title": "StructuredOutputLLMNodeInput",
            "type": "object"
        },
        "output": {
            "properties": {},
            "title": "StructuredOutputLLMNodeOutput",
            "type": "object"
        }
    },
    {
        "name": "PythonFuncNode",
        "config": {
            "properties": {
                "code": {
                    "title": "Code",
                    "type": "code"
                },
                "input_schema": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "title": "Input Schema",
                    "type": "object"
                },
                "output_schema": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "title": "Output Schema",
                    "type": "object"
                }
            },
            "required": [
                "code",
                "input_schema",
                "output_schema"
            ],
            "title": "PythonFuncNodeConfig",
            "type": "object"
        },
        "input": {
            "properties": {},
            "title": "PythonFuncNodeInput",
            "type": "object"
        },
        "output": {
            "properties": {},
            "title": "PythonFuncNodeOutput",
            "type": "object"
        }
    }
];