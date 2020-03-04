import Amplify, { Auth } from 'aws-amplify';
import { config as AWSConfig } from 'aws-sdk';

import ClientError from '../ClientError';
import awsConfig from '../../awsconfig';

Amplify.configure(awsConfig);
AWSConfig.region = process.env.REACT_APP_COGNITO_REGION;

export const completeNewPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  try {
    const currentUser = await Auth.signIn(email, currentPassword);
    const { requiredAttributes } = currentUser.challengeParam;
    if (requiredAttributes.length) {
      // Here we should fill the possible challengeParams that may exist in the future
      throw new ClientError('Cannot change user password');
    }
    const result = await Auth.completeNewPassword(currentUser, newPassword, requiredAttributes);
    return result;
  } catch (err) {
    throw new ClientError(err.message, err.code);
  }
};

export const confirmSignUp = async (email: string, confirmationCode: string) => {
  try {
    const resultSignup = await Auth.confirmSignUp(email, confirmationCode);
    return resultSignup;
  } catch (err) {
    throw new ClientError(err.message, err.code, err.message, err);
  }
};

export const resendSignUp = async (email: string) => {
  try {
    const resultSignup = await Auth.resendSignUp(email);
    return resultSignup;
  } catch (err) {
    throw new ClientError('Cannot resend sign up');
  }
};

export const sendPasswordRecovery = async (email: string) => {
  try {
    const recoverResult = await Auth.forgotPassword(email);
    return recoverResult;
  } catch (err) {
    throw new ClientError(err.message);
  }
};

export const sendPasswordRecoveryConfirm = async (email: string, code: string, password: string) => {
  try {
    const recoverResult = await Auth.forgotPasswordSubmit(email, code, password);
    return recoverResult;
  } catch (err) {
    throw new ClientError(err.message);
  }
};

export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
): Promise<string> => {
  try {
    const currentUser = await Auth.signIn(email, currentPassword);
    const result = await Auth.changePassword(currentUser, currentPassword, newPassword);
    return result;
  } catch (err) {
    throw new ClientError(err.message, err.code);
  }
};
