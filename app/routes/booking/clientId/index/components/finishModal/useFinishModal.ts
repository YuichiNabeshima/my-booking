
export function useFinishModal() {
  /**
   * Convert the '\n' to <br>.
   */
  function convertToBr(text: string) {
    return text.replace('\n', '<br>') ?? '';
  }

  /**
   * Convert url in email body to in the anchor tag.
   */
  function convertToAnchor(text: string) {
    const link = text.match(/https?:\/\/.*\n/);
    const linkRemoveBr = link?.[0].replace(/\n$/, '');
    return text.replace(/https?:\/\/.*\n/, `<a href="${linkRemoveBr}" target="_blank">${linkRemoveBr}</a>\n`);
  }

  return {
    convertToBr,
    convertToAnchor,
  }
}