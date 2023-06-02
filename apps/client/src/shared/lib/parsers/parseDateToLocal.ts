export function parseDateToLocal(date:string) : string {
  if (!date) {
    console.warn('Invalid date')
    return "";
  }

  const parsedDate = Date.parse(date)

  return new Date(parsedDate).toLocaleString(
    'ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    }
  );
}
