import mongoose from 'mongoose';
import {app} from './app'

const PORT = process.env.PORT || 3000;
const DB =process.env.DBMONGO || 'mongodb://127.0.0.1:27017/test_project0'

mongoose.connect(DB,{}).then(e=>console.log('mongo db on'+DB))


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });