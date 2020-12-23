import { Response } from "node-fetch"
import { Api } from "./Api"

export class ApiRequest<T = any> {
  readonly parent: Api
  method: ApiRequest.RequestMethod
  private _path: [string, Record<string,string|number>]|undefined
  private _body: any|undefined
  private _intercept: ApiRequest.InterceptCallback<T>|undefined

  constructor(parent: Api, method: ApiRequest.RequestMethod) {
    this.parent = parent
    this.method = method
  }

  /**
   * sets the path with his parameters
   * @param url url to call
   * @param parameter parameter to replace in the url
   */
  path(url: string, parameter: Record<string, string|number> = {}) {
    this._path = [url, parameter]
    return this
  }

  getActualPath() {
    if (!this._path) throw new Error("no path for this request set")
    let [path, params] = this._path
    path = path.replace(/\/:[\w\d]+(\/|$)/g, match => {
      const m = match.match(/:([\w\d]+)/)
      if (!m) return match
      const key = m[1]
      if (params[key] === undefined) return match
      return match.replace(/:([\w\d]+)/, String(params[key]))
    })
    return path
  }

  getHeaders() {
    const headers: Record<string, string> = {}
    if (this.hasBody()) headers["Content-Type"] = "application/json"
    return headers
  }

  /** sets the body */
  body(content: any) {
    this._body = content
    return this
  }

  hasBody() {
    return this._body !== "undefined"
  }

  getBody() {
    return JSON.stringify(this._body)
  }

  intercept(callback: ApiRequest.InterceptCallback<T>) {
    this._intercept = callback
    return this
  }

  send(): Promise<T> {
    return this.parent.request<T>(this, this._intercept)
  }
}

export namespace ApiRequest {
  export type RequestMethod = "GET"|"POST"|"PATCH"|"DELETE"
  export type InterceptCallback<T> = (res: Response, body: T) => any
}