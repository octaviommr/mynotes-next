import mongoose from "mongoose"
import UserModel from "./User"

// MongoDB raw document type
interface INote {
  title: string
  content?: string
  important?: boolean
  userId: mongoose.Schema.Types.ObjectId
}

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

// mongoose document type (ie. the backend model)
export type NoteDocument = mongoose.HydratedDocument<INote>

// frontend object type (ie. the frontend model)
export type Note = Omit<INote, "userId"> & { id: string }

/* 
  Helper that transforms mongoose documents into frontend objects.

  Frontend data models are usually different from backend ones because they have different concerns. A frontend model
  might include only some of props of the backend model, since the rest might not be needed in the frontend. On the other
  hand, a frontend model might contain some props that don't exist in the backend model due to only being relevant for
  UI logic.

  We should only pick the props we care about for the frontend, and then use those to build the actual frontend objects.
  Just as an example, here we're ignoring the "userId" prop of the documents used in the backend (since a user will only
  ever interact with their own notes), and we're also using the specific type of the "id" prop (since mongoose defines it as
  "any").
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
