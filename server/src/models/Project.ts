import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  subtitle?: string;
  isDemo?: boolean; // <--- ADDED THIS FIELD
  script?: any;
  scenes: any[];
  characters?: any[];
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  isDemo: { type: Boolean, default: false }, // <--- ADDED THIS FIELD
  script: { type: Object },
  scenes: [
    {
      id: String,
      number: Number,
      title: String,
      text: String,
      image: String,
      isFilmed: Boolean,
      analysis: {
        camera: String,
        lighting: String,
        mood: String
      },
      music: {
        track: String,
        type: String,
        status: String
      },
      beats: Object
    }
  ],
  characters: [{ name: String, role: String, description: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProject>('Project', ProjectSchema);