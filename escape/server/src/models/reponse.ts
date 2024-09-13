export interface Response{
    success: Boolean,
    message?:String,
    data?: String,
    accessToken?:String
  }

  export interface ArtList{
    success: Boolean,
    message?:String,
    data?: [{url: String}],
  }