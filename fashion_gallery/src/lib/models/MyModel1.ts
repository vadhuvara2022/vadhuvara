
import { Schema,model,models} from "mongoose";


const MyModelSchema1: Schema = new Schema(
  {
    
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    }
    
    
}
);

const MyModel1 =models.MyModel1 || model('MyModel1', MyModelSchema1);
export default MyModel1;