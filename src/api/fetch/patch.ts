import { last } from 'lodash-es'

export type FetchRequestIntercept = (config: RequestInit) => RequestInit
export type FetchResponseIntercept = (config: Response) => Response

export function patchFetch(
  requestIntercept: (FetchRequestIntercept | FetchRequestIntercept[]) = [],
  responseIntercept: (FetchResponseIntercept | FetchResponseIntercept[]) = [],
  baseUrl?: string,
) {
  const { fetch: originFetch } = window

  return async (...args: Parameters<typeof window.fetch>) => {
    const [resource, config = {}] = args

    if (import.meta.env.DEV) {
      if (typeof resource === 'string' && resource.includes('hot-update')) {
        return originFetch(resource, config)
      }
    }

    const fetchUrl = baseUrl ? `${baseUrl}${resource}` : resource

    requestIntercept = Array.isArray(requestIntercept) ? requestIntercept : [requestIntercept]
    requestIntercept.forEach(req => req(config))

    let response = await originFetch(fetchUrl, config)
    responseIntercept = Array.isArray(responseIntercept) ? responseIntercept : [responseIntercept]

    try {
      if (responseIntercept.length) {
        response = last(responseIntercept.map(res => res(response)))!
      }
    }
    catch (error) {
      throw new Error(error as string)
    }

    const json = () =>
      response
        .clone()
        .json()
        .then(data => data)

    response.json = json
    return response
  }
}
