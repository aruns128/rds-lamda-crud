import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const aws_region = process.env.AWSregion;

AWS.config.update({
  region: aws_region,
});

export const getSecret = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const secretsManager = new AWS.SecretsManager();
      const secretName = process.env.AWSsecretName; // Replace with the name of your secret in Secrets Manager
      const secret = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
      const secretString = secret.SecretString;
      const secretData = JSON.parse(secretString);
      console.log(secretData);
      resolve(secretData);
    } catch (error) {
      console.log("[getSecret]:error", error);
      reject(error);
    }
  });
};
