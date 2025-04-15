import { useActionData } from 'react-router';

import type { ActionResultDTO } from '../../.server/dtos/ActionResultDTO';

export function useConfirmModal() {
  const result = useActionData<ActionResultDTO>();

  return {
    result,
  };
}
