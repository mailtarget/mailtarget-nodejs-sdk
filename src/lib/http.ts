import axios from 'axios'

export type AddressType = {
  email: string
  name: string
}
export type HeaderType = {
  name: string
  value: string
}
export type AttachmentType = {
  mimeType: string
  filename: string
  value: string
}
export type OptionsAttributesType = {
  clickTracking: boolean
  openTracking: boolean
  transactional: boolean
}
export type MessageType = {
  subject: string
  from: AddressType
  to: AddressType[]
  bodyText: string
  bodyHtml?: string
  replyTo?: AddressType[]
  cc?: AddressType[]
  bcc?: AddressType[]
  headers?: HeaderType[]
  attachment?: AttachmentType[]
  metadata?: object
  optionsAttributes?: OptionsAttributesType
  templateId?: string
  substitutionData?: object
}

export default async function transmission (payload: MessageType, apiKey: string) {
  try {
    const { data } = await axios.post('https://apiconfig.mailtarget.co/v1/layang/transmissions', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      }
    })
    return data
  } catch (err: any) {
    if (err.response) throw err.response.data
    throw err.message
  }
}