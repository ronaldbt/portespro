// backend/index.js
require('dotenv').config();
// 📦 Dependencias principales
const express = require('express');
const cors = require('cors');

const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { esConductor } = require('./utils/identificarTipoUsuario');
const authRoutes = require('./routes/authRoutes');
const path = require('path');



// 📄 Cargar variables de entorno
if (!process.env.FORCE_CLIENT_BOT) {
  process.env.FORCE_CLIENT_BOT = 'true'; // default temporal para pruebas
}

// 🚀 Inicializar servidor Express
const app = express();
app.use(cors({
  origin: ['https://app.fletespro.cl', 'https://portespro.es', 'http://localhost:3000'], // ✅ frontends permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // ✅ si usás cookies o auth headers
}));

app.options('*', cors()); // 🟢 responde a preflight OPTIONS
app.use(express.json());
// Aceptar también application/x-www-form-urlencoded por si el cliente envía formularios
app.use(express.urlencoded({ extended: true }));

// 🧠 Importaciones internas
const reservasRoutes = require('./routes/reservasRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const manejarMensajeCliente = require('./chatbots/clienteBot');
const { manejarRespuestaConductor } = require('./chatbots/conductorBot');

// 🤖 Inicializar cliente WhatsApp con sesión persistente
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, '.wwebjs_auth') }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  }
});

const fletesRoutes = require('./routes/fletesRoutes') // ⬅️ importar
app.use('/api/fletes', fletesRoutes) // ⬅️ usar la ruta
app.use('/api/payments', paymentsRoutes)

// 🛡 Middleware para inyectar el cliente WhatsApp en cada request
app.use((req, res, next) => {
  req.whatsapp = client;
  next();
});

// 🌐 Ruta base de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend FletesPro funcionando en Express');
});

// 📦 Rutas de la API
app.use('/api', reservasRoutes);
app.use('/api', authRoutes);

const adminFletesRoutes = require('./routes/adminFletesRoutes');
app.use('/api', adminFletesRoutes);

const adminConductoresRoutes = require('./routes/adminConductoresRoutes');
app.use('/api', adminConductoresRoutes);

const adminStatsRoutes = require('./routes/adminStatsRoutes');
app.use('/api', adminStatsRoutes);

const adminUsuariosRoutes = require('./routes/adminUsuariosRoutes');
app.use('/api', adminUsuariosRoutes);

// Rutas específicas para conductores
const conductorRoutes = require('./routes/conductorRoutes');
app.use('/api', conductorRoutes);

// 🔁 Conexión QR para iniciar sesión en WhatsApp
client.on('qr', (qr) => {
  console.log('📲 Escanea este QR con WhatsApp para vincular tu sesión:');
  qrcode.generate(qr, { small: true });
});

client.on('code', (code) => {
  console.log('🔢 Pairing code:', code);
});

client.on('loading_screen', (percent, message) => {
  console.log(`📱 Cargando WhatsApp: ${percent}% - ${message}`);
});

client.on('change_state', (state) => {
  console.log('🔄 Estado de WhatsApp:', state);
});

client.on('authenticated', async () => {
  console.log('🔐 Autenticado correctamente');
  try {
    const ver = await client.getWWebVersion();
    console.log('🧩 WWebVersion:', ver);
  } catch (_) {}
});

client.on('auth_failure', (msg) => {
  console.error('❌ Falla de autenticación:', msg);
});

client.on('disconnected', (reason) => {
  console.warn('⚠️ Desconectado de WhatsApp:', reason);
});

// ✅ Confirmación de conexión
let readyReceived = false;
client.on('ready', async () => {
  readyReceived = true;
  console.log('✅ WhatsApp conectado y listo');
  try {
    const state = await client.getState().catch(() => null);
    console.log('📟 Estado actual:', state);
    const info = client.info;
    if (info) {
      console.log('👤 Usuario:', info.pushname || '(sin nombre)');
      console.log('📞 Número:', info.wid && info.wid.user ? info.wid.user : '(desconocido)');
    }
    try {
      if (client.pupPage) {
        client.pupPage.on('pageerror', (err) => console.error('🪲 pageerror:', String(err)));
        client.pupPage.on('error', (err) => console.error('🪲 error:', String(err)));
      }
    } catch (_) {}
  } catch (_) {}
});

// ⏱️ Fallback: si no llega 'ready' en 20s, igual conectamos bots
setTimeout(() => {
  if (!readyReceived) {
    console.warn('⏰ TIMEOUT sin ready - forzando listeners de mensajes...');
  }
}, 20000);

// 📩 Escuchar mensajes entrantes de clientes y conductores
client.on('message', async (message) => {
  if (message.fromMe) return;

  try {
    const esCon = await esConductor(message.from);
    if (esCon) {
      return manejarRespuestaConductor(message, client);
    }
    return manejarMensajeCliente(message, client);
  } catch (e) {
    console.error('❌ Error en handler de mensaje:', e);
  }
});

client.on('message_ciphertext', (msg) => {
  console.log('🔐 message_ciphertext recibido (aún cifrado):', {
    from: msg.from,
    type: msg.type,
    ts: msg.timestamp
  });
});

// ▶️ Inicializar WhatsApp
client.initialize();

// 🚀 Iniciar servidor Express
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌐 Servidor Express activo en http://localhost:${PORT}`);
});