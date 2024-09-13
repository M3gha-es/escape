import mongoose from 'mongoose'

if (!process.env.MONGODB_URL) {
  throw new Error('MONGODB_URL is not defined in the environment variables.')
}
console.log('Connecting to MongoDB...')

mongoose.connect(process.env.MONGODB_URL).catch(error => {
    console.log('Cannot connect to DB cloud. Please check your credentials: '+error+" URL: "+process.env.MONGODB_URL);
    
    //error.log('Cannot connect to DB cloud. Please check your credentials');
});




