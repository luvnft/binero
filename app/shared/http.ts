export function getErrorResponse(error: unknown): unknown {
  if (error instanceof Error && error.name === 'AssertionError') {
    return new Response(error.message, { status: 400 });
  }

  return error;
}
