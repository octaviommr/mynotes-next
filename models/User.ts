import mongoose from "mongoose"

// MongoDB raw document type
interface IUser {
  email: string
  name: string
  password: string
}

// https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
    match: [EMAIL_REGEX, "{VALUE} is not a valid email."],
  },
  name: { type: String, required: [true, "Name is required."] },
  password: { type: String, required: [true, "Password is required."] },
})

export default (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema)
