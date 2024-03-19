import transmission, {AddressType, AttachmentType, HeaderType, OptionsAttributesType} from './lib/http'

export class Layang {
  private apiKey: string
  private from: AddressType
  private transmissionId = undefined
  private errorMessage = undefined
  private optionsAttributes = {
    clickTracking: true,
    openTracking: true,
    transactional: false,
  }
  constructor(
    apiKey: string,
    from: AddressType,
  ) {
    this.apiKey = apiKey
    this.from = from
  }

  public subject = ''
  public replyTo: AddressType[] = []
  public to: AddressType[] = []
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
  public sendMessage = async (html: string) => {
    try {
      const payload = {
        subject: this.subject,
        from: this.from,
        replyTo: this.replyTo,
        to: this.to,
        cc: this.cc,
        bcc: this.bcc,
        bodyText: this.bodyText,
        bodyHtml: html,
        headers: this.headers,
        attachment: this.attachment,
        metadata: this.metadata,
        optionsAttributes: this.optionsAttributes,
      }
      const datum = await transmission(payload, this.apiKey)
      this.transmissionId = datum.transmissionId
      return true
    } catch (err: any) {
      this.errorMessage = err
      return false
    }
  }
  public sendMessageTemplate = async (templateId: string, substitutionData = {}) => {
    try {
      const payload = {
        subject: this.subject,
        from: this.from,
        replyTo: this.replyTo,
        to: this.to,
        cc: this.cc,
        bcc: this.bcc,
        bodyText: this.bodyText,
        headers: this.headers,
        attachment: this.attachment,
        metadata: this.metadata,
        optionsAttributes: this.optionsAttributes,
        templateId,
        substitutionData,
      }
      const datum = await transmission(payload, this.apiKey)
      this.transmissionId = datum.transmissionId
      return true
    } catch (err: any) {
      this.errorMessage = err
      return false
    }
  }
}