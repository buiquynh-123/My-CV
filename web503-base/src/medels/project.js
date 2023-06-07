import mongoose from "mongoose";
import mongooesPaginate from "mongoose-paginate-v2";
const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },

    images: {
      type: Array,
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    end_time: {
      type: Date,
    },
    member_number: {
      type: Number,
      require: true,
    },
    technology: {
      type: String,
      require: true,
    },
    link_git: {
      type: String,
      require: true,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
    },
  },
  { timestamps: true, versionkey: false }
);

projectSchema.plugin(mongooesPaginate);
const Project = mongoose.model("projects", projectSchema);
export default Project;
