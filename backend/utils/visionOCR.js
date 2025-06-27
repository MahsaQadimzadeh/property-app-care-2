// utils/visionOCR.js
const vision = require('@google-cloud/vision');

// If you're using ADC or WIF, you don't need to pass projectId here explicitly.
const client = new vision.ImageAnnotatorClient(); 

const detectTextFromImage = async (imagePath) => {
  const [result] = await client.textDetection(imagePath);
  const text = result.textAnnotations?.[0]?.description || '';
  return text;
};

module.exports = { detectTextFromImage };

/////////////////////////////
// const vision = require('@google-cloud/vision');

// // Assumes you’re using Workload Identity Federation or Application Default Credentials (ADC)
// const client = new vision.ImageAnnotatorClient({
//   projectId: 'your-project-id',
// });

// const detectTextFromImage = async (imagePath) => {
//   const [result] = await client.textDetection(imagePath);
//   const text = result.textAnnotations[0]?.description || '';
//   return text;
// };

// module.exports = { detectTextFromImage };

/////////////////////////////////////////

