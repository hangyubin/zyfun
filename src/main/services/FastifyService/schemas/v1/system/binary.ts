import { Schema } from '@main/types/server';
import { Type } from '@sinclair/typebox';

import { ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'system';

const BinarySchema = Type.Object({
  name: Type.String({ description: 'name' }),
  path: Type.String({ description: 'path' }),
  exist: Type.Boolean({ description: 'exist' }),
});

const BinaryResponse = Type.Omit(BinarySchema, []);

const BinaryListResponse = Type.Object({
  list: Type.Array(BinaryResponse),
  total: Type.Number({ description: 'Total count' }),
});

const BinaryListResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: BinaryListResponse,
  },
  { description: 'Response schema for binary list' },
);

const BinaryArrayResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: Type.Array(BinaryResponse),
  },
  { description: 'Response schema for binary array' },
);

export const getBinaryListSchema = {
  tags: [API_PREFIX],
  summary: 'Get binary list',
  description: 'Get binary list',
  response: {
    200: BinaryListResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const installBinarySchema = {
  tags: [API_PREFIX],
  summary: 'Install binary',
  description: 'Install binary',
  body: Type.Object({
    id: Type.Array(Type.String(), { description: 'binary name' }),
  }),
  response: {
    200: BinaryArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
