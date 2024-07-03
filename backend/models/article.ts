import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
  title: string;
  author: string;
  publishedDate: Date;
  description: string;
  source: string;
  link: string;
}

const articleSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  description: { type: String, required: true },
  source: { type: String, required: true },
  link: { type: String, required: true },
});

const Article = mongoose.model<IArticle>('Article', articleSchema);

export default Article;
