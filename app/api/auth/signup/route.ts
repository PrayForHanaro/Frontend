import { type NextRequest, NextResponse } from 'next/server';

import { GATEWAY_ENDPOINTS } from '@/lib/backend-endpoints';
import { readJsonSafely } from '@/lib/read-json-safely';

const GATEWAY_URL = process.env.GATEWAY_URL ?? 'http://api-gateway:8080';

type SignupRequestBody = {
  name: string;
  birth: string;
  phoneNumber: string;
  password: string;
};

type GatewayResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignupRequestBody;

    const response = await fetch(
      `${GATEWAY_URL}${GATEWAY_ENDPOINTS.user.signup}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: body.name,
          birth: body.birth,
          phoneNumber: body.phoneNumber.replaceAll('-', ''),
          password: body.password,
        }),
        cache: 'no-store',
      },
    );

    const result = await readJsonSafely<GatewayResponse>(response);

    if (!response.ok || !result?.success) {
      return NextResponse.json(
        {
          success: false,
          message: result?.message ?? '회원가입에 실패했습니다.',
          data: null,
        },
        {
          status: response.status || 400,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'success',
        data: {
          autoLoggedIn: false,
        },
      },
      {
        status: 201,
      },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: '회원가입 처리 중 오류가 발생했습니다.',
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
