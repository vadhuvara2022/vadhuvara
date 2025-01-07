
import { Schema, model, models, Document } from 'mongoose';

interface MyModel1Document extends Document {
  email: string;
  password: string;
}

const MyModelSchema1: Schema<MyModel1Document> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MyModel1 = models.MyModel1 || model<MyModel1Document>('MyModel1', MyModelSchema1);
export default MyModel1;
export type { MyModel1Document };