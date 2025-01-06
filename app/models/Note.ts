import mongoose from "mongoose"
import UserModel from "./User"

// MongoDB raw document type
interface INote {
  title: string
  content?: string
  important?: boolean
  userId: mongoose.Schema.Types.ObjectId
}

// mongoose document type
export type NoteDocument = mongoose.HydratedDocument<INote>

// front-end object type
export type Note = Omit<INote, "userId"> & { id: string }

/* 
  Helper that transforms mongoose documents into front-end objects.

  Front-end data models are usually different from back-end ones because they have different concerns. A front-end model
  might include only some of props of the back-end model since the rest might not be needed in the front-end. On the other
  hand, a front-end model might contain some props that don't exist in the back-end model due to only being relevant for
  UI logic.

  We should only pick the props we care about for the front-end, and then use those to build the actual front-end objects.
  Just as an example, here we're ignoring the "userId" prop of the documents used in the back-end (since a user will only
  ever interact with their own notes), and we're also replacing the "_id" prop with the "id" prop which has a different
  name and type.
*/
export const makeNote = ({
  id,
  title,
  content,
  important,
}: NoteDocument): Note => ({
  id,
  title,
  content,
  important,
})

const noteSchema = new mongoose.Schema<INote>({
  title: { type: String, required: [true, "Title is required."] },
  content: { type: String },
  important: { type: Boolean },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],

    // foreign key validation
    validate: {
      validator: async function () {
        const user = await UserModel.findOne({ _id: this.userId })

        return !!user
      },
      message: () => "User not found.",
    },
  },
})

export default (mongoose.models.Note as mongoose.Model<INote>) ||
  mongoose.model<INote>("Note", noteSchema)
