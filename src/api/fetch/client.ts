import type { ZodTypeAny } from 'zod'

type RequestParams = Record<string, any>
type RequestBody = Record<string, any>

type FetchBodyMethod = 'post' | 'put'
type FetchParamsMethod = 'get' | 'delete'

export type FetchMethods = FetchBodyMethod & FetchParamsMethod

async function createParamsFetch<T>(
  url: string,
  params: (RequestParams | ZodTypeAny) = {},
  schema?: ZodTypeAny,
  method: FetchParamsMethod = 'get',
) {
  if (typeof params.safeParse === 'function') {
    schema = params as ZodTypeAny
    params = {}
  }

  const res = await fetch(
    Object.keys(params).length > 0
      ? `${url}?${Object.entries(params).map(([k, v]) => `${k}=${v}`).join(',')}`
      : url,
    {
      method,
    },
  )

  const response = await res.json() as T

  if (import.meta.env.DEV && schema && response) {
    const res = schema.safeParse(response)
    if (!res.success) {
      console.error('get action value error', res)
    }
  }

  return response
}

async function createBodyFetch<T>(
  url: string,
  body: RequestBody = {},
  schema?: ZodTypeAny,
  method: FetchBodyMethod = 'post',
) {
  const res = await fetch(url, {
    method,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const response = await res.json() as T

  if (import.meta.env.DEV && schema && response) {
    const res = schema.safeParse(response)
    if (!res.success) {
      throw new Error(`${method} action res value error${res.data}`)
    }
  }

  return response
}

export const fetchClient = {
  async get<T>(url: string, params: (RequestParams | ZodTypeAny) = {}, schema?: ZodTypeAny) {
    return createParamsFetch<T>(url, params, schema, 'get')
  },
  async post<T>(url: string, body: RequestBody = {}, schema?: ZodTypeAny) {
    return createBodyFetch<T>(url, body, schema, 'post')
  },
  async put<T>(url: string, body: RequestBody = {}, schema?: ZodTypeAny) {
    return createBodyFetch<T>(url, body, schema, 'put')
  },
  async delete<T>(url: string, params: (RequestParams | ZodTypeAny) = {}, schema?: ZodTypeAny) {
    return createParamsFetch<T>(url, params, schema, 'delete')
  },
}
