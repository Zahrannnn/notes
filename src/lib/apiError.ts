import axios from 'axios';

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
};

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      message: getSafeMessage(error.response?.data) ?? error.message ?? 'Request failed',
      status: error.response?.status,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'Unexpected error' };
}

function getSafeMessage(data: unknown) {
  if (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    return data.message;
  }

  return undefined;
}
