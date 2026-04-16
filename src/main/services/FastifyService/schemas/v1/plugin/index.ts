import { Schema } from '@main/types/server';
import { Type } from '@sinclair/typebox';

import { PageQuery, ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'plugin';

const PluginSchema = Type.Object({
  id: Type.String({ description: 'id' }),
  type: Type.Integer({ format: 'int32', enum: [1, 2, 3], description: 'type' }),
  name: Type.String({ description: 'plugin name' }),
  pluginName: Type.String({ description: 'plugin readable name' }),
  author: Type.String({ description: 'author' }),
  description: Type.String({ description: 'description' }),
  readme: Type.String({ description: 'readme' }),
  base: Type.String({ description: 'work path' }),
  main: Type.String({ description: 'main' }),
  web: Type.String({ description: 'web' }),
  version: Type.String({ description: 'version' }),
  logo: Type.String({ description: 'logo' }),
  homepage: Type.String({ description: 'homepage' }),
  isActive: Type.Boolean({ description: 'run status' }),
  createdAt: Type.Integer({ format: 'int64', description: 'created timestamp' }),
  updatedAt: Type.Integer({ format: 'int64', description: 'updated timestamp' }),
});

const PluginResponse = Type.Omit(PluginSchema, []);

const PluginListResponse = Type.Object({
  list: Type.Array(PluginResponse),
  total: Type.Number({ description: 'Total count' }),
});

const PluginResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: PluginResponse,
  },
  { description: 'Response schema for setting detail' },
);

const PluginListResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: PluginListResponse,
  },
  { description: 'Response schema for plugin list' },
);

const PluginArrayResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: Type.Array(PluginResponse),
  },
  { description: 'Response schema for plugin array' },
);

export const pageSchema = {
  tags: [API_PREFIX],
  summary: 'Get list',
  description: 'Get list with pagination and filtering',
  querystring: Type.Partial(
    Type.Object({
      kw: Type.String({ description: 'search keyword' }),
      type: Type.Integer({ format: 'int32', enum: [1, 2, 3], description: 'search type' }),
      ...PageQuery,
    }),
  ),
  response: {
    200: PluginListResponseSchema,
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
    200: PluginResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const installSchema = {
  tags: [API_PREFIX],
  summary: 'Install plugin',
  description: 'Install plugin by project path',
  body: Type.Object({
    id: Type.Array(Type.String(), { description: 'path' }),
  }),
  response: {
    200: PluginArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const uninstallSchema = {
  tags: [API_PREFIX],
  summary: 'Uninstall plugin',
  description: 'Uninstall plugin by id',
  body: Type.Object({
    id: Type.Array(Type.String(), { description: 'id' }),
  }),
  response: {
    200: PluginArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const startSchema = {
  tags: [API_PREFIX],
  summary: 'Start plugin',
  description: 'Start plugin by id',
  body: Type.Object({
    id: Type.Array(Type.String(), { description: 'id' }),
  }),
  response: {
    200: PluginArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const stopSchema = {
  tags: [API_PREFIX],
  summary: 'Stop plugin',
  description: 'Stop plugin by id',
  body: Type.Object({
    id: Type.Array(Type.String(), { description: 'id' }),
  }),
  response: {
    200: PluginArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
