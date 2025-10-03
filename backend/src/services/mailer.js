import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE ?? "gmail",
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendMatchEmail({ score, lostItem, foundItem }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("Email credentials missing; skipping notification")
    return
  }

  const subject = `🎉 SLF Match Found (${Math.round(score)}% confidence)`
  const body = `
Hello!

Our Smart Lost & Found AI detected a high-confidence match (${Math.round(score)}%) between the following items:

Lost report:
- ${lostItem.title}
- ${lostItem.description}
- Location: ${lostItem.location}

Found report:
- ${foundItem.title}
- ${foundItem.description}
- Location: ${foundItem.location}

Please coordinate to confirm the match and arrange handover.

Thanks,
Smart Lost & Found Portal
  `.trim()

  const recipients = [lostItem.reporterEmail, foundItem.reporterEmail].filter(Boolean).join(",")
 // ✅ Add this console log
  console.log("Sending match email to:", recipients)


  await transporter.sendMail({
    from: `Smart Lost & Found <${process.env.EMAIL_USER}>`,
    to: recipients,
    subject,
    text: body,
  })
}
