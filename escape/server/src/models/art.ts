import { Schema, model, Model, Document } from 'mongoose';

export interface ArtInterface extends Document {
  name: string,
  category: 'general'|'exclusive',
  role: 'guest'|'user',
  url: string
}

const artSchema = new Schema<ArtInterface>({
    name: String,
    category: String,
    role: String,
    url: String
  }, { collection: process.env.ART_OLLECTION});


  export const Art = model<ArtInterface>('Art', artSchema);
