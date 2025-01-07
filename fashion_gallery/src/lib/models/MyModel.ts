
import { Schema,model,models} from "mongoose";


const MyModelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    totalImages: [
      {
        src: {
          type: String,
          required: true,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MyModel =models.MyModel || model('MyModel', MyModelSchema);
export default MyModel;
