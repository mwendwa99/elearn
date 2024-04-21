import axios from "axios";

export const sendEmail = async (email, subject, message) => {
  try {
    const response = await axios.post(
      "https://api.elasticemail.com/v2/email/send",
      {
        apikey: import.meta.env.VITE_react_api,
        to: import.meta.env.VITE_recepient_email,
        subject: subject,
        bodyHtml: { email, message },
        from: import.meta.env.VITE_smtp_username,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
