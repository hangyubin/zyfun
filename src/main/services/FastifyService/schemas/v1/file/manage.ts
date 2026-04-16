import { Schema } from '@main/types/server';
import { Type } from '@sinclair/typebox';

import { ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'file';

export const addSchema = {
  tags: [API_PREFIX],
  summary: 'Add file',
  description: 'Add a new file, operating system files if the type is system, which is a dangerous operation',
  params: Type.Object({
    type: Type.String({ enum: ['file', 'system'], description: 'file type' }),
    '*': Type.String({ description: 'file path' }),
  }),
  body: Type.String({ description: 'file content' }),
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Boolean({ description: 'Indicates whether the add operation was successful' }),
      },
      { description: 'Response schema for add file' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const deleteSchema = {
  tags: [API_PREFIX],
  summary: 'Delete file',
  description: 'Delete a file by path, operating system files if the type is system, which is a dangerous operation',
  params: Type.Object({
    type: Type.String({ enum: ['file', 'system'], description: 'file type' }),
    '*': Type.String({ description: 'file path' }),
  }),
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Boolean({ description: 'Indicates whether the delete operation was successful' }),
      },
      { description: 'Response schema for delete file' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const putSchema = {
  tags: [API_PREFIX],
  summary: 'Update file content',
  description: 'Update a file by path, operating system files if the type is system, which is a dangerous operation',
  params: Type.Object({
    type: Type.String({ enum: ['file', 'system'], description: 'file type' }),
    '*': Type.String({ description: 'file path' }),
  }),
  body: Type.String({ description: 'file content' }),
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Boolean({ description: 'Indicates whether the update operation was successful' }),
      },
      { description: 'Response schema for update file content' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getSchema = {
  tags: [API_PREFIX],
  summary: 'Get file content',
  description:
    'Get a file content by path, operating system files if the type is system, which is a dangerous operation',
  params: Type.Object({
    type: Type.String({ enum: ['file', 'system'], description: 'file type' }),
    '*': Type.String({ description: 'file path' }),
  }),
  response: {
    200: Type.Any({ description: 'file content' }),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
