import { ApolloError } from "@apollo/client";

export interface ParsedError {
  message: string;
  statusCode?: number;
  code?: string;
}

/**
 * Parses an ApolloError to extract a user-friendly message and status code.
 * It handles both standard GraphQL errors and network errors that contain GraphQL results.
 */
export function parseApolloError(error: ApolloError): ParsedError {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const gqlError = error.graphQLErrors[0];
    return {
      message: gqlError.message,
      code: gqlError.extensions?.code as string,
      statusCode: (gqlError.extensions?.http as { status?: number })?.status || 200,
    };
  }

  if (error.networkError) {
    const networkError = error.networkError as {
      result?: { errors?: { message: string; extensions?: { code: string } }[] };
      statusCode?: number;
      message?: string;
    };

    if (networkError.result?.errors && networkError.result.errors.length > 0) {
      const firstError = networkError.result.errors[0];
      return {
        message: firstError.message,
        statusCode: networkError.statusCode,
        code: firstError.extensions?.code,
      };
    }

    return {
      message: networkError.message || "A network error occurred.",
      statusCode: networkError.statusCode,
    };
  }

  return {
    message: error.message || "An unexpected error occurred.",
  };
}
