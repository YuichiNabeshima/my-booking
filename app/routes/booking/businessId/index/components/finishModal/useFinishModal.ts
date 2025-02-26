import { useActionData } from "react-router";
import { STATUS } from "../../constants/STATUS";
import type { ActionResultDTO } from "../../.server/dtos/ActionResultDTO";

export function useFinishModal() {
  const result = useActionData<ActionResultDTO>();

  const email = result && result.status === STATUS.FINISHED ? result.mail : undefined;

  /**
   * Convert url in email body to in the anchor tag.
   */
  function convertToAnchor(text: string) {
    const link = text.match(/https?:\/\/.*\n/);
    const linkRemoveBr = link?.[0].replace(/\n$/, '');
    return text.replace(/https?:\/\/.*\n/, `<a href="${linkRemoveBr}" target="_blank" class="dynamic-text-link">${linkRemoveBr}</a>\n`);
  }

  return {
    email,
    convertToAnchor,
  }
}