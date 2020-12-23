import fetch, { Response, RequestInit } from "node-fetch"
import { ApiError } from "./ApiError"
import { ApiRequest } from "./ApiRequest"

export class Api {

  readonly host: string
  token: string|null = null
  private onToken: Api.OnToken|undefined

  constructor(props: Api.Props) {
    this.host = props.host
    if (props.token) this.token = props.token
    this.onToken = props.onToken
  }

  updateToken(token: string|null) {
    this.token = token
    if (typeof this.onToken === "function") this.onToken(this.token)
    return this
  }

  private commonHeaders(props: Record<string, string> = {}) {
    const headers: Record<string, string> = {}
    if (this.token) headers.Authorization = `Bearer ${this.token}`
    return { ...headers, ...props }
  }

  private async responseHandler<T = any>(req: ApiRequest, res: Response) {
    const bearer = res.headers.get("Authorization")
    if (bearer) {
      const match = bearer.match(/^Bearer (.*)$/)
      if (match) this.updateToken(match[1])
    }
    let body: T = {} as any
    const contentType = res.headers.get("Content-Type")
    if (contentType && contentType.includes("application/json")) {
      body = await res.json()
    }
    if (res.status < 200 || res.status > 299) throw new ApiError(req, res, body)
    return body
  }

  async request<T>(req: ApiRequest, intercept: ApiRequest.InterceptCallback<T>|undefined) {
    const init: RequestInit = {
      method: req.method,
      headers: this.commonHeaders(req.getHeaders())
    }
    if (req.hasBody()) init.body = req.getBody()
    const res = await fetch(`${this.host}/api${req.getActualPath()}`, init)
    const body = await this.responseHandler<T>(req, res)
    if (typeof intercept !== "function") return body
    await intercept(res, body)
    return body
  }

  /** creates a GET request */
  get<T>() {
    return new ApiRequest<T>(this, "GET")
  }

  /** creates a POST request */
  post<T>() {
    return new ApiRequest<T>(this, "POST")
  }

  /** creates a DELETE request */
  delete<T>() {
    return new ApiRequest<T>(this, "DELETE")
  }

  /** creates a PATCH request */
  patch<T>() {
    return new ApiRequest<T>(this, "PATCH")
  }

}

export namespace Api {
  export interface Props {
    host: string
    token?: string
    onToken?: OnToken
  }

  export type OnToken = (token: string|null) => any
}