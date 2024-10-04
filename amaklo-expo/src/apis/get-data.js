/**
 * Extracts the response data from the AxiosResponse.
 *
 * @export
 * @template T The type of the data.
 * @param {AxiosResponse<T>} response The Axios response.
 * @returns {T} The data this response returned.
 */
export function getResponseData(response) {
  return response.data;
}
