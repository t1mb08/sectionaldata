export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export function handleError(error: Error): { error: string; status: number } {
    if (error instanceof ApiError) {
        return { error: error.message, status: error.status };
    }
    return { error: 'Internal Server Error', status: 500 };
}

