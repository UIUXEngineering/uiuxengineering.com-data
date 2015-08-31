/**
 * Created by jerryorta-dev on 8/9/15.
 */

module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "UIUXEngineering",
    "description": "UIUX Engineering Data Schema",
    "id": "UIUXDataObject",
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
            "description": "Term to be defined."
        },
        "description": {
            "type": "string",
            "description": "Definition of term."
        },
        "references": {
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
            "type": "array",
            "description": "taxonomy words or phrases",
            "items": {"type": "string"}
        },
        "dataSet": {
            "type": "string",
            "description": "url to data json without the .json extension. For Example: angular2/angular2-articles"
        },
        "show": {"type": "boolean"},
        "tutorials": {
            "type": "array",
            "description": "List of tutorials",
            "items": {
                "type": "object",
                "properties": {
                    "label": {"type": "string"},
                    "url": {"type": "string"},
                    "code": {
                        "type": "array",
                        "description": "List of tutorials",
                        "items": {
                            "type": "object",
                            "properties": {
                                "label": {"type": "string"},
                                "url": {"type": "string"}
                            },
                            "required": ["label", "url"]
                        }
                    }
                },
                "required": ["label", "url"]
            }
        }
    },
    "required": ["title", "description", "references", "repo", "tags", "dataSet", "show"]
};