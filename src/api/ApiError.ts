import { Response } from "node-fetch"
import { ApiRequest } from "./ApiRequest"

export class ApiError extends Error {
  private res: Response
  private body: any

  constructor(req: ApiRequest, res: Response, body: any) {
    super(`api responded with code ${res.status} on ${req.method} ${res.url}`)
    this.res = res
    this.body = body
  }

  get content() {
    return this.body.message
  }

  get status() {
    return this.res.status
  }
}