/**
 * Created by jerryorta-dev on 8/9/15.
 */

module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "UIUXEngineering",
    "description": "UIUX Engineering Data Schema",
    "id": "UIUXDataObject",
    "type": "object",
    "definitions": {
        "urlsArray": {
            "type": "array",
            "description": "array of url titles and links.",
            "items": {
                "type": "object",
                "properties": {
                    "label": {"type": "string"},
                    "url": {"type": "string"}
                },
                "required": ["label", "url"]
            }
        },

        "stringArray": {
            "type": "array",
            "items": {"type": "string"}
        },
        "tutorials": {
            "type": "object",
            "properties": {
                "label": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                },
                "code": {
                    "description": "List of tutorials",
                    "$ref": "#/definitions/urlsArray"
                }
            },
            "required": ["label", "url"]
        }

    },
    "properties": {
        "title": {
            "type": "string",
            "description": "Term to be defined."
        },
        "description": {
            "type": "string",
            "description": "Definition of term."
        },
        "references": {"$ref": "#/definitions/urlsArray"}
    },
    "repo": {
        "type": "object",
        "description": "Code repository providing starter environment.",
        "properties": {
            "label": {"type": "string"},
            "server": {
                "type": "string",
                "description": "github, bitbucket, tfs"
            },
            "repotype": {
                "type": "string",
                "description": "git, svn"
            },
            "url": {"type": "string"}
        },
        "required": ["label", "server", "repoType", "url"]
    },
    "tags": {
        "description": "taxonomy words or phrases",
        "$ref": "#/definitions/stringArray"
    },
    "dataSet": {
        "type": "string",
        "description": "url to data json without the .json extension. For Example: angular2/angular2-articles"
    },
    "show": {"type": "boolean"},
    "tutorials": {
        "description": "List of tutorials with code samples",
        "$ref": "#/definitions/tutorials"},
    "required": ["title", "description", "references", "repo", "tags", "dataSet", "show"]
};