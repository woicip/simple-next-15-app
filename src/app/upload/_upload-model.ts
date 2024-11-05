export interface IUploadProps {
  hash: string
  name: string
  url: string
  size: number
}

export interface IUpload {
  unmarshal(): IUploadProps
}

export class Upload implements IUpload {
  constructor(private _props: IUploadProps){}
  
  static create(props: IUploadProps){
    return new Upload(props)
  }

  unmarshal(): IUploadProps {
    return this._props
  }
}