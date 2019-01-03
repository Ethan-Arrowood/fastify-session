/// <reference types="node" />
import * as fastify from 'fastify';
import * as fastifyCookie from 'fastify-cookie'
import {FastifyRequest, DefaultQuery, Plugin} from 'fastify';
import {IncomingMessage, ServerResponse} from 'http';
import {Http2ServerRequest, Http2ServerResponse} from 'http2';

type HttpRequest = IncomingMessage | Http2ServerRequest;
type HttpResponse = ServerResponse | Http2ServerResponse;


declare module 'fastify' {
  interface FastifyRequest<
    HttpRequest = HttpRequest,
    Query = fastify.DefaultQuery,
    Params = fastify.DefaultParams,
    Headers = fastify.DefaultHeaders,
    Body = any
  > {
    /**
     * Request session
     */
    session: fastifySession.Session,
    sessionStore: fastifySession.Store
  }
}

declare namespace fastifySession {
  export class Session {
    constructor(
      sessionId: string,
      encryptedSessionId: string,
      cookieOpts: fastifyCookie.FastifyCookieOptions,
      prevSession?: Session
    );
    touch(): void;
    addUserDataToSession(prevSession: Session): void;
  }
  export function Store(): {
    set(
      sessionId: string,
      session: Session,
      callback: () => {}
    ): void;

    get(
      sessionId: string,
      callback: (error: Error, session: Session) => {}
    ): void;

    destroy(
      sessionId: string,
      callback: () => {}
    ): void;
  }
}

export = fastifySession