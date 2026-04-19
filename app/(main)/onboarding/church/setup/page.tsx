import SetUpClient from './set-up-client';

type PageProps = {
  searchParams: Promise<{
    name?: string;
    location?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const name = typeof params.name === 'string' ? params.name : '';
  const location = typeof params.location === 'string' ? params.location : '';

  return <SetUpClient name={name} location={location} />;
}
