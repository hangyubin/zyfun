import { Schema } from '@main/types/server';
import { settingKeys, setupKeys } from '@shared/config/tblSetting';
import type { TLiteral } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

import { ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'setting';

const SettingSchema = Type.Object({
  id: Type.String({ description: 'id' }),
  key: Type.String({ description: 'key' }),
  value: Type.Any({ description: 'value' }),
  createdAt: Type.Integer({ format: 'int64', description: 'created timestamp' }),
  updatedAt: Type.Integer({ format: 'int64', description: 'updated timestamp' }),
});

const SettingResponse = Type.Omit(SettingSchema, []);

const SettingResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: SettingResponse,
  },
  { description: 'Response schema for setting detail' },
);

const SettingArrayResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: Type.Array(SettingResponse),
  },
  { description: 'Response schema for setting array' },
);

const SettingObjectResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: Type.Record(
      Type.Union(settingKeys.map((k) => Type.Literal(k)) as TLiteral<(typeof settingKeys)[number]>[]),
      Type.Any(),
    ),
  },
  { description: 'Response schema for setting object' },
);

const SetupObjectResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: Type.Record(
      Type.Union(setupKeys.map((k) => Type.Literal(k)) as TLiteral<(typeof setupKeys)[number]>[]),
      Type.Any(),
    ),
  },
  { description: 'Response schema for setting setup object' },
);

export const addSchema = {
  tags: [API_PREFIX],
  summary: 'Create data',
  description: 'Create a new data',
  body: Type.Object({
    key: Type.String({ enum: settingKeys, description: 'key' }),
    value: Type.Any({ description: 'value' }),
  }),
  response: {
    200: SettingArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const deleteSchema = {
  tags: [API_PREFIX],
  summary: 'Delete data',
  description: 'Delete data by keys, if keys is empty, delete all',
  body: Type.Object({
    keys: Type.Optional(Type.Array(Type.String(), { description: 'ids' })),
  }),
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Null({ description: 'delete success' }),
      },
      { description: 'Response schema for delete response' },
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
    key: Type.String({ enum: settingKeys, description: 'key' }),
    value: Type.Any({ description: 'value' }),
  }),
  response: {
    200: SettingArrayResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getSetupSchema = {
  tags: [API_PREFIX],
  summary: 'Get setup',
  description: 'Get setup',
  response: {
    200: SetupObjectResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getListSchema = {
  tags: [API_PREFIX],
  summary: 'Get list',
  description: 'Get list',
  response: {
    200: SettingObjectResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getDetailSchema = {
  tags: [API_PREFIX],
  summary: 'Get detail',
  description: 'Get detail by key',
  params: Type.Object({
    key: Type.String({ enum: settingKeys, description: 'key' }),
  }),
  response: {
    200: SettingResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const getDetailValueSchema = {
  tags: [API_PREFIX],
  summary: 'Get detail',
  description: 'Get detail by key',
  params: Type.Object({
    key: Type.String({ enum: settingKeys, description: 'key' }),
  }),
  response: {
    200: ResponseSuccessSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const putSourceSchema = {
  tags: [API_PREFIX],
  summary: 'Set all data',
  description: 'Set all data',
  body: Type.Partial(
    Type.Record(
      Type.Union(settingKeys.map((k) => Type.Literal(k)) as TLiteral<(typeof settingKeys)[number]>[]),
      Type.Any(),
    ),
    { description: 'Setting object body' },
  ),
  response: {
    200: SettingObjectResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
