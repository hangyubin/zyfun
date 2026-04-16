import { Schema } from '@main/types/server';
import { Type } from '@sinclair/typebox';

import { ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'parse';

const MediaDirectSchema = Type.Object({
  url: Type.String({ description: 'parsed url' }),
  headers: Type.Optional(Type.Record(Type.String(), Type.Any(), { description: 'parsed headers' })),
});

const MediaDirectResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: MediaDirectSchema,
  },
  { description: 'Response schema for media direct result' },
);

export const mediaDirectSchema = {
  tags: [API_PREFIX],
  summary: 'Get media direct',
  description: 'Get media direct url',
  querystring: Type.Object({
    id: Type.String({ description: 'Specified analyze id' }),
    url: Type.String({ description: 'parse url' }),
  }),
  response: {
    200: MediaDirectResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
