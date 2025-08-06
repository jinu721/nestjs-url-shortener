// import transporter from "src/modules/configs/mail.config";
// import { HttpResponse } from "../constants/responseMessage.constants";

// export const sendVerificationOTP = async (email: string, otp: string) => {
//   try {
//     const options = {
//       from: process.env.EMAIL_FROM || 'noreply@minify.com',
//       to: email,
//       subject: '🔐 Your Minify Verification Code',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Minify OTP Verification</title>
//         </head>
//         <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
//           <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
//             <tr>
//               <td align="center" style="padding: 40px 20px;">
//                 <table width="100%" max-width="500" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); overflow: hidden;">
                  
//                   <!-- Header -->
//                   <tr>
//                     <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
//                       <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
//                         <div style="font-size: 36px;">🔐</div>
//                       </div>
//                       <h1 style="color: white; font-size: 28px; margin: 0; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Minify</h1>
//                       <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Verification Required</p>
//                     </td>
//                   </tr>
                  
//                   <!-- Content -->
//                   <tr>
//                     <td style="padding: 40px 30px;">
//                       <h2 style="color: #333; font-size: 24px; margin: 0 0 20px; text-align: center; font-weight: 600;">Verify Your Email</h2>
//                       <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px; text-align: center;">
//                         We've sent you a verification code to confirm your email address. Enter the code below to continue:
//                       </p>
                      
//                       <!-- OTP Display -->
//                       <div style="text-align: center; margin: 30px 0;">
//                         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 32px; font-weight: 700; padding: 20px; border-radius: 15px; letter-spacing: 8px; display: inline-block; box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3); font-family: 'Courier New', monospace;">
//                           ${otp}
//                         </div>
//                       </div>
                      
//                       <div style="background: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
//                         <p style="color: #555; font-size: 14px; margin: 0; line-height: 1.5;">
//                           <strong>⚠️ Security Notice:</strong><br>
//                           • This code expires in 10 minutes<br>
//                           • Never share this code with anyone<br>
//                           • Minify will never ask for your code via phone or email
//                         </p>
//                       </div>
                      
//                       <p style="color: #999; font-size: 14px; line-height: 1.5; margin: 20px 0 0; text-align: center;">
//                         If you didn't request this verification, you can safely ignore this email. Your account remains secure.
//                       </p>
//                     </td>
//                   </tr>
                  
//                   <!-- Footer -->
//                   <tr>
//                     <td style="background: #f8f9ff; padding: 30px; text-align: center; border-top: 1px solid #eee;">
//                       <p style="color: #999; font-size: 12px; margin: 0 0 10px;">
//                         This is an automated message from Minify
//                       </p>
//                       <p style="color: #999; font-size: 12px; margin: 0;">
//                         © ${new Date().getFullYear()} Minify. All rights reserved.
//                       </p>
//                     </td>
//                   </tr>
                  
//                 </table>
//               </td>
//             </tr>
//           </table>
//         </body>
//         </html>
//       `,
//       text: `
//         Minify - Email Verification
        
//         Your verification code is: ${otp}
        
//         Use this code to verify your email address. This code will expire in 10 minutes.
        
//         Security Notice:
//         - Never share this code with anyone
//         - Minify will never ask for your code via phone or email
        
//         If you didn't request this verification, you can ignore this email.
        
//         --- Minify Team
//       `
//     };

//     await transporter.sendMail(options);
    
//     return {
//       success: true,
//       message: 'OTP sent successfully'
//     };
    
//   } catch (error) {
//     console.error('OTP sending failed:', error);
//     throw new Error(HttpResponse.ERROR_SENDING_OTP);
//   }
// };