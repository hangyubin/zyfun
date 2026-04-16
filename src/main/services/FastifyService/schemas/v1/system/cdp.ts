import { Schema } from '@main/types/server';
import { Type } from '@sinclair/typebox';

import { ResponseSuccessSchema } from '../../base';

const API_PREFIX = 'system';

const SnifferMediaSchema = Type.Object({
  url: Type.String({ description: 'media url' }),
  headers: Type.Record(Type.String(), Type.Any(), { description: 'request headers' }),
});

const SnifferMediaResponseSchema = Type.Object(
  {
    ...Type.Omit(ResponseSuccessSchema, ['data']).properties,
    data: SnifferMediaSchema,
  },
  { description: 'Response schema for sniffed media' },
);

export const cdpSnifferMediaSchema = {
  tags: [API_PREFIX],
  summary: 'Sniffer media',
  description: 'Sniffer media',
  body: Type.Object({
    url: Type.String({ format: 'uri', description: 'media url' }),
    options: Type.Optional(
      Type.Partial(
        Type.Object({
          runScript: Type.String({ description: 'run script' }),
          initScript: Type.String({ description: 'init script' }),
          customRegex: Type.String({ description: 'match regex' }),
          snifferExclude: Type.String({ description: 'exclude regex' }),
          headers: Type.Record(Type.String(), Type.Any(), { description: 'request headers' }),
          timeout: Type.Integer({ format: 'int32', minimum: 0, description: 'timeout (ms)' }),
        }),
      ),
    ),
  }),
  response: {
    200: SnifferMediaResponseSchema,
    default: {
      description: 'Unexpected Error',
      $ref: Schema.ApiReponseError,
    },
  },
};
