export function logError(e: unknown) {
  let error: Error;

  if (e instanceof Error) {
    error = e;
  } else if (typeof e === 'string') {
    error = new Error(e);
  } else {
    error = new Error('Unrecognized error');
  }

  console.error(error.message);
}
