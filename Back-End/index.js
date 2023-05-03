const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('<your MongoDB Atlas connection string>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: Object,
    required: true,
    default: {},
  },
});

const Document = mongoose.model('Document', documentSchema);

app.get('/api/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/documents', async (req, res) => {
  try {
    const { name, size, format, metadata } = req.body;
    const existingDocument = await Document.findOne({ name, size });
    if (existingDocument) {
      existingDocument.metadata = metadata;
      await existingDocument.save();
      res.json(existingDocument);
    } else {
      const newDocument = new Document({ name, size, format, metadata });
      await newDocument.save();
      res.json(newDocument);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
