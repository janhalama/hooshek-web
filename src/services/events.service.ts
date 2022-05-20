export const convertEventKeyToEventName = (eventKey: string): string => {
  const nameStartsAt = eventKey.indexOf(' ');
  let result = eventKey;
  if (nameStartsAt > 0) {
    const dateInISOFormat = eventKey.substring(0, nameStartsAt).trim();
    const name = eventKey.substring(nameStartsAt).trim();

    const date = Date.parse(dateInISOFormat);

    if (!isNaN(date)) {
      result = `${new Date(date).toLocaleDateString('cs')} ${name}`;
    }
  }

  return result;
};
