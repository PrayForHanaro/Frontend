import 'server-only';

const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 60 * 60;
const REFRESH_TOKEN_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;

export type UserRole = 'USER' | 'ADMIN' | 'CLERGY';

export type SessionUser = {
  userId: string;
  name: string;
  orgId: string;
  role: UserRole;
};

type TokenType = 'access' | 'refresh';

type JwtPayload = {
  sub: string;
  userId: string;
  name: string;
  org_id: string;
  roles: UserRole[];
  iss: string;
  aud: string[];
  type: TokenType;
  iat: number;
  exp: number;
};

const textEncoder = new TextEncoder();

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

async function getSigningKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    textEncoder.encode(getRequiredEnv('JWT_SECRET')),
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    false,
    ['sign', 'verify'],
  );
}

function encodeBase64UrlJson(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function decodeBase64UrlJson<T>(value: string): T {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf-8')) as T;
}

function decodeBase64UrlToArrayBuffer(value: string): ArrayBuffer {
  const buffer = Buffer.from(value, 'base64url');
  const bytes = new Uint8Array(buffer.length);

  bytes.set(buffer);

  return bytes.buffer;
}

async function createToken(
  sessionUser: SessionUser,
  type: TokenType,
  expiresInSeconds: number,
): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + expiresInSeconds;

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload: JwtPayload = {
    sub: sessionUser.userId,
    userId: sessionUser.userId,
    name: sessionUser.name,
    org_id: sessionUser.orgId,
    roles: [sessionUser.role],
    iss: getRequiredEnv('JWT_ISSUER'),
    aud: [getRequiredEnv('JWT_AUDIENCE')],
    type,
    iat: issuedAt,
    exp: expiresAt,
  };

  const encodedHeader = encodeBase64UrlJson(header);
  const encodedPayload = encodeBase64UrlJson(payload);
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    await getSigningKey(),
    textEncoder.encode(signingInput),
  );

  const encodedSignature = Buffer.from(signatureBuffer).toString('base64url');

  return `${signingInput}.${encodedSignature}`;
}

export async function createAccessToken(
  sessionUser: SessionUser,
): Promise<string> {
  return createToken(sessionUser, 'access', ACCESS_TOKEN_EXPIRES_IN_SECONDS);
}

export async function createRefreshToken(
  sessionUser: SessionUser,
): Promise<string> {
  return createToken(sessionUser, 'refresh', REFRESH_TOKEN_EXPIRES_IN_SECONDS);
}

export async function verifyToken(
  token: string,
  expectedType: TokenType,
): Promise<JwtPayload> {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid token format.');
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const isValidSignature = await crypto.subtle.verify(
    'HMAC',
    await getSigningKey(),
    decodeBase64UrlToArrayBuffer(encodedSignature),
    textEncoder.encode(signingInput),
  );

  if (!isValidSignature) {
    throw new Error('Invalid token signature.');
  }

  const payload = decodeBase64UrlJson<JwtPayload>(encodedPayload);
  const now = Math.floor(Date.now() / 1000);

  if (payload.iss !== getRequiredEnv('JWT_ISSUER')) {
    throw new Error('Invalid issuer.');
  }

  if (
    !Array.isArray(payload.aud) ||
    !payload.aud.includes(getRequiredEnv('JWT_AUDIENCE'))
  ) {
    throw new Error('Invalid audience.');
  }

  if (payload.type !== expectedType) {
    throw new Error('Invalid token type.');
  }

  if (payload.exp <= now) {
    throw new Error('Token expired.');
  }

  return payload;
}
