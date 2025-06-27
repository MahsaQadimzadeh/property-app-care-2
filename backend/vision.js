const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

exports.parseImage = async (fileUrl) => {
  const [result] = await client.textDetection(fileUrl);
  return result.textAnnotations[0]?.description || '';
};