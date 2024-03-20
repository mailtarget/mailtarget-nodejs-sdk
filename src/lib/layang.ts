import transmission, { AddressType, AttachmentType, HeaderType } from './http'

export class Layang {
  private apiKey: string
  private from: AddressType
  private errorMessage = undefined
  private optionsAttributes = {
    clickTracking: true,
    openTracking: true,
    transactional: true,
  }
  constructor(
    apiKey: string,
    sender: AddressType,
  ) {
    this.apiKey = apiKey
    this.from = sender
  }

  public replyTo: AddressType[] = []
  public cc: AddressType[] = []
  public bcc: AddressType[] = []
  public bodyText = ''
  public headers: HeaderType[] = []
  public attachment: AttachmentType[] = []
  public metadata = {}

  public setClickTracking = (active: boolean) => {
    this.optionsAttributes.clickTracking = active
  }
  public setOpenTracking = (active: boolean) => {
    this.optionsAttributes.openTracking = active
  }
  public setTransactional = (active: boolean) => {
    this.optionsAttributes.transactional = active
  }
  public getErrorMessage = () => this.errorMessage
  public sendMessage = async (
    subject: string,
    to: AddressType[],
    bodyHtml: string,
  ) => {
    try {
      const payload = {
        to,
        bodyHtml,
        subject,
        from: this.from,
        replyTo: this.replyTo,
        cc: this.cc,
        bcc: this.bcc,
        bodyText: this.bodyText,
        headers: this.headers,
        attachment: this.attachment,
        metadata: this.metadata,
        optionsAttributes: this.optionsAttributes,
      }
      const datum = await transmission(payload, this.apiKey)
      this.errorMessage = undefined
      return datum.transmissionId
    } catch (err: any) {
      this.errorMessage = err
      return undefined
    }
  }
  public sendMessageTemplate = async (
    subject: string,
    to: AddressType[],
    templateId: string,
    substitutionData = {},
  ) => {
    try {
      const payload = {
        subject,
        to,
        templateId,
        substitutionData,
        from: this.from,
        replyTo: this.replyTo,
        cc: this.cc,
        bcc: this.bcc,
        bodyText: this.bodyText,
        headers: this.headers,
        attachment: this.attachment,
        metadata: this.metadata,
        optionsAttributes: this.optionsAttributes,
      }
      const datum = await transmission(payload, this.apiKey)
      this.errorMessage = undefined
      return datum.transmissionId
    } catch (err: any) {
      this.errorMessage = err
      return undefined
    }
  }
}