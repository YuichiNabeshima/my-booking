import { data } from 'react-router';

import type { Route } from './+types/route';

export async function action({ request }: Route.ActionArgs) {
  const authHeader = request.headers.get('Authorization');

  const CRON_SECRET = process.env.CRON_SECRET;

  if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
    return data({ error: 'Unauthorized' }, { status: 401 });
  }

  if (request.method !== 'POST') {
    return data({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { batchName, params } = await request.json();

    if (!batchName) {
      return data({ error: 'Batch name is required' }, { status: 400 });
    }

    const { runBatch } = await import('~/.server/batch/runBatch');
    await runBatch(batchName, params || []);
    return data({ success: true });
  } catch (error) {
    console.error('Batch execution failed:', error);
    return data({ error: 'Internal server error' }, { status: 500 });
  }
}
