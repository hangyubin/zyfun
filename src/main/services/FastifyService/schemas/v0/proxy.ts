import { Schema } from '@main/types/server';
import { Type } from '@sinclair/typebox';

import { ResponseErrorSchema, ResponseSuccessSchema } from '../base';

const TAG = 'proxy';

export const getSchema = {
  tags: [TAG],
  summary: 'Get proxy cache',
  description: 'Get proxy cache content.',
  querystring: Type.Object({
    url: Type.String({ description: 'proxy cache key' }),
  }),
  response: {
    200: {
      content: {
        'text/html': {
          schema: Type.String({ description: 'Proxy cache content' }),
        },
      },
    },
    400: ResponseErrorSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const setSchema = {
  tags: [TAG],
  summary: 'Set proxy cache',
  description: 'Set proxy cache content.',
  body: Type.Object({
    url: Type.String({ description: 'proxy cache key' }),
    text: Type.Tuple(
      [
        Type.Integer({ format: 'int32', description: 'proxy cache code' }),
        Type.String({ description: 'proxy cache content type' }),
        Type.String({ description: 'proxy cache content' }),
      ],
      { description: 'proxy cache content' },
    ),
  }),
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.String({ description: 'proxy access url' }),
      },
      { description: 'Response schema for proxy cache set operation' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
