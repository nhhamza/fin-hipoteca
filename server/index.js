const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

console.log('SMTP CONFIG:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  secure: process.env.SMTP_SECURE,
})

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function sendMail(subject, html, replyTo) {
  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER

  const mailOptions = {
    from: `FinanciacionHipotecaria.com <${fromAddress}>`,
    to: process.env.EMAIL_TO,
    subject,
    html,
    replyTo,
  }

  return transporter.sendMail(mailOptions)
}

app.post('/api/contact', async (req, res) => {
  const {
    nombre,
    email,
    telefono,
    situacionLaboral,
    precioVivienda,
    ahorros,
    ciudad,
  } = req.body || {}

  if (!nombre || !email || !telefono) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' })
  }

  const html = `
    <h2>Nuevo lead de hipoteca</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
    <p><strong>Situación laboral:</strong> ${situacionLaboral || ''}</p>
    <p><strong>Precio vivienda:</strong> ${precioVivienda || ''}</p>
    <p><strong>Ahorros:</strong> ${ahorros || ''}</p>
    <p><strong>Ciudad:</strong> ${ciudad || ''}</p>
    <p>FinanciacionHipotecaria.com</p>
  `

  try {
    await sendMail('Nuevo lead de hipoteca', html, email)
    res.json({ message: 'OK' })
  } catch (err) {
    console.error('Error enviando email lead:', err)
    res.status(500).json({ message: 'Error enviando email.' })
  }
})

app.post('/api/partner', async (req, res) => {
  const { nombre, tipoNegocio, email, telefono } = req.body || {}

  if (!nombre || !email || !tipoNegocio) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' })
  }

  const html = `
    <h2>Nueva solicitud de partner</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Tipo de negocio:</strong> ${tipoNegocio}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${telefono || ''}</p>
    <p>FinanciacionHipotecaria.com</p>
  `

  try {
    await sendMail('Nueva solicitud de partner', html, email)
    res.json({ message: 'OK' })
  } catch (err) {
    console.error('Error enviando email partner:', err)
    res.status(500).json({ message: 'Error enviando email.' })
  }
})

app.get('/', (req, res) => {
  res.send('API FinanciacionHipotecaria.com funcionando')
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
