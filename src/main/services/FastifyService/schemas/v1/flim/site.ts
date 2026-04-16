import { Schema } from '@main/types/server';
import { siteTypes } from '@shared/config/film';
import { Type } from '@sinclair/typebox';

import { PageQuery, ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'film';

const SiteSchema = Type.Object({
  id: Type.String({ description: 'id' }),
  key: Type.String({ description: 'key' }),
  name: Type.Union([Type.String(), Type.Null()], { description: 'name' }),
  api: Type.String({ description: 'api' }),
  playUrl: Type.Union([Type.String(), Type.Null()], { description: 'play parse json url' }),
  search: Type.Boolean({ description: 'search' }),
  group: Type.Union([Type.String(), Type.Null()], { description: 'group' }),
  type: Type.Integer({ format: 'int32', enum: siteTypes, description: 'type' }),
  ext: Type.Union([Type.String(), Type.Record(Type.String(), Type.String()), Type.Null()], { description: 'ext' }),
  categories: Type.Union([Type.String(), Type.Null()], { description: 'categories' }),
  isActive: Type.Boolean({ description: 'active status' }),
  createdAt: Type.Integer({ format: 'int64', description: 'created timestamp' }),
  updatedAt: Type.Integer({ format: 'int64', description: 'updated timestamp' }),
});

export const SiteResponse = Type.Omit(SiteSchema, []);

const SiteListResponse = Type.Object({
  list: Type.Array(SiteResponse),
  total: Type.Number({ description: 'Total count' }),
  default: Type.String({ description: 'Default id' }),
  group: Type.Array(Type.Object({ label: Type.String(), value: Type.String() })),
});

const SiteActiveListResponse = Type.Object({
  list: Type.Array(SiteResponse),
  default: Type.Union([SiteResponse, Type.Object({}, { additionalProperties: false })], {
    description: 'default data',
  }),
  extra: Type.Partial(
    Type.Object({
      group: Type.Array(Type.Object({ label: Type.String(), value: Type.String() })),
      filter: Type.Boolean(),
      search: Type.String(),
    }),
  ),
});

const SiteResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: Type.Union([SiteResponse, Type.Object({}, { additionalProperties: false })], {
      description: 'Site data',
    }),
  },
  { description: 'Response schema for Site response' },
);

const SiteListResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: SiteListResponse,
  },
  { description: 'Response schema for Site list' },
);

const SiteActiveListResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: SiteActiveListResponse,
  },
  { description: 'Response schema for Site active list' },
);

const SiteArrayResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: Type.Array(SiteResponse),
  },
  { description: 'Response schema for Site array' },
);

export const addSchema = {
  tags: [API_PREFIX],
  summary: 'Add data',
  description: 'Add a new data',
  body: Type.Partial(Type.Omit(SiteSchema, ['id', 'createdAt', 'updatedAt'])),
  response: {
    200: SiteArrayResponseSchema,
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
      {
        description: 'Response schema for delete data',
      },
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
    doc: Type.Partial(Type.Omit(SiteSchema, ['id', 'createdAt', 'updatedAt'])),
  }),
  response: {
    200: SiteArrayResponseSchema,
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
    200: SiteListResponseSchema,
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
    200: SiteActiveListResponseSchema,
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
    200: SiteResponseSchema,
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
    200: SiteResponseSchema,
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
        data: Type.Boolean({ description: 'Indicates whether the set default operation was successful' }),
      },
      { description: 'Response schema for set default' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
