import { Schema } from '@main/types/server';
import { Type } from '@sinclair/typebox';

import { ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'data';

export const backupSchema = {
  tags: [API_PREFIX],
  summary: 'Data backup',
  description: 'Local data backup to cloud',
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Boolean({ description: 'Indicates whether the backup operation was successful' }),
      },
      { description: 'Response schema for backup' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};

export const resumeSchema = {
  tags: [API_PREFIX],
  summary: 'Data resume',
  description: 'Local data resume from cloud',
  response: {
    200: Type.Object(
      {
        ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
        data: Type.Boolean({ description: 'Indicates whether the resume operation was successful' }),
      },
      { description: 'Response schema for resume' },
    ),
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
