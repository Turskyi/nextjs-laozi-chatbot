import { NextResponse } from 'next/server';

export async function GET() {
  const association = {
    applinks: {
      apps: [],
      details: [
        {
          appID: '26QZ8BPZFL.com.turskyi.laoziAi',
          paths: ['/manuscript/*', '/manuscript'],
          components: [
            { '/': '/manuscript/*' },
            { '/': '/manuscript' }
          ]
        }
      ]
    },
    webcredentials: {
      apps: ['26QZ8BPZFL.com.turskyi.laoziAi']
    }
  };

  return NextResponse.json(association);
}
