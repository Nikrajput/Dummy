import {
  BEFINSAVVY_ANKIT_EMAIL,
  BEFINSAVVY_EMAIL_API,
  BEFINSAVVY_FROM_EMAIL,
  BEFINSAVVY_MEDHA_EMAIL
} from './constants'

import { template as financialLiteracy } from './emailTemplates/financialLiteracy'
import { template as riskProfiling } from './emailTemplates/riskProfiling'

const templates = {
  0: financialLiteracy,
  1: riskProfiling
}

const templateData = (data) => {
  const { templateId, ...rest } = data;
  return templates[templateId](rest);
}

export const sendEmail = async (subject, htmlTemplate, to) => {
  const emailsTo = to
    ? {
        to,
      }
    : {
        to: BEFINSAVVY_ANKIT_EMAIL,
        to: BEFINSAVVY_MEDHA_EMAIL,
      };

  let template = typeof htmlTemplate === 'object' ? templateData(htmlTemplate) : htmlTemplate

  const data = {
    ...emailsTo,
    from: BEFINSAVVY_FROM_EMAIL,
    subject: subject ? subject : "BeFinSavvy Support Email",
    html: template,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    console.log(data)
    const req = await fetch(BEFINSAVVY_EMAIL_API, options);
    const response = await req.json();
    console.log(response);
  } catch (error) {
    console.log("Something happened wrong while sending the email...");
  }
};
