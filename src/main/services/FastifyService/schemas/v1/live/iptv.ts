import { Schema } from '@main/types/server';
import { iptvTypes } from '@shared/config/live';
import { Type } from '@sinclair/typebox';

import { PageQuery, ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'live';

const IptvSchema = Type.Object({
  id: Type.String({ description: 'id' }),
  key: Type.String({ description: 'key' }),
  name: Type.Union([Type.String(), Type.Null()], { description: 'name' }),
  api: Type.String({ description: 'api' }),
  type: Type.Integer({ format: 'int32', enum: iptvTypes, description: 'type' }),
  epg: Type.Union([Type.String(), Type.Null()], { description: 'epg' }),
  logo: Type.Union([Type.String(), Type.Null()], { description: 'logo' }),
  headers: Type.Union([Type.Record(Type.String(), Type.Any()), Type.Null()], { description: 'headers' }),
  isActive: Type.Boolean({ description: 'active status' }),
  createdAt: Type.Integer({ format: 'int64', description: 'created timestamp' }),
  updatedAt: Type.Integer({ format: 'int64', description: 'updated timestamp' }),
});

export const IptvResponse = Type.Omit(IptvSchema, []);

const IptvListResponse = Type.Object({
  list: Type.Array(IptvResponse),
  total: Type.Number({ description: 'Total count' }),
  default: Type.String({ description: 'Default id' }),
});

const IptvActiveListResponse = Type.Object({
  list: Type.Array(IptvResponse),
  default: Type.Union([IptvResponse, Type.Object({}, { additionalProperties: false })], {
    description: 'default data',
  }),
  extra: Type.Partial(
    Type.Object({
      epg: Type.String({ description: 'epg' }),
      logo: Type.String({ description: 'logo' }),
      ipMark: Type.Boolean({ description: 'ipMark' }),
      delay: Type.Boolean({ description: 'delay' }),
      thumbnail: Type.Boolean({ description: 'thumbnail' }),
    }),
  ),
});

const IptvResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: IptvResponse,
  },
  { description: 'Response schema for Iptv response' },
);

const IptvListResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: IptvListResponse,
  },
  { description: 'Response schema for Iptv list' },
);

const IptvActiveListResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: IptvActiveListResponse,
  },
  { description: 'Response schema for Iptv active list' },
);

const IptvArrayResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: Type.Array(IptvResponse),
  },
  { description: 'Response schema for Iptv array' },
);

export const addSchema = {
  tags: [API_PREFIX],
  summary: 'Add data',
  description: 'Add a new data',
  body: Type.Partial(Type.Omit(IptvSchema, ['id', 'createdAt', 'updatedAt'])),
  response: {
    200: IptvArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const deleteSchema = {
  tags: [API_PREFIX],
  summary: 'Delete data',
  description: 'Delete by id or type, if id and type is empty, delete all',
  body: Type.Object({
    id: Type.Optional(Type.Array(Type.String(), { description: 'id' })),
  }),
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Null({ description: 'delete success' }),
      },
      { description: 'Response schema for delete data' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const putSchema = {
  tags: [API_PREFIX],
  summary: 'Set data',
  description: 'Set data',
  body: Type.Object({
    id: Type.Array(Type.String(), { description: 'updated id' }),
    doc: Type.Partial(Type.Omit(IptvSchema, ['id', 'createdAt', 'updatedAt'])),
  }),
  response: {
    200: IptvArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const pageSchema = {
  tags: [API_PREFIX],
  summary: 'Get list',
  description: 'Get list with pagination and filtering',
  querystring: Type.Partial(
    Type.Object({
      kw: Type.String({ description: 'search keyword' }),
      ...PageQuery,
    }),
  ),
  response: {
    200: IptvListResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getActiveSchema = {
  tags: [API_PREFIX],
  summary: 'Get active',
  description: 'Get active data',
  response: {
    200: IptvActiveListResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getDetailSchema = {
  tags: [API_PREFIX],
  summary: 'Get detail',
  description: 'Get detail by id',
  params: Type.Object({
    id: Type.String({ description: 'id' }),
  }),
  response: {
    200: IptvResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getDetailByKeySchema = {
  tags: [API_PREFIX],
  summary: 'Get detail',
  description: 'Get detail by key',
  params: Type.Object({
    key: Type.String({ description: 'key' }),
  }),
  response: {
    200: IptvResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const setDefaultSchema = {
  tags: [API_PREFIX],
  summary: 'Set default',
  description: 'Set default by id',
  params: Type.Object({
    id: Type.String({ description: 'id' }),
  }),
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Null({ description: 'set default success' }),
      },
      { description: 'Response schema for set default data' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getCheckSchema = {
  tags: [API_PREFIX],
  summary: 'Check validity',
  description: 'Check validity',
  params: Type.Object({
    id: Type.String({ description: 'id' }),
  }),
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Null({ description: 'check validity success' }),
      },
      { description: 'Response schema for check validity' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
