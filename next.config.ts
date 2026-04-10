import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // 타입의 주소랑 뭐 이것저것 자동 캐칭(갈 수 있는, 쓸 수 있는것만 띄워줌)
  experimental: {
    typedEnv: true,
  },
  typedRoutes: true,
};

export default nextConfig;
