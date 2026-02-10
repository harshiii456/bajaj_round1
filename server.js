require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const healthRoutes = require('./routes/healthRoutes');
const bfhlRoutes = require('./routes/bfhlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || 'harshita0518.be23@chitkara.edu.in',
    error: 'Too many requests'
  }
});
app.use(limiter);

// Body parsing with size limit
app.use(express.json({ limit: '10kb' }));

// Prevent prototype pollution
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.setPrototypeOf(req.body, Object.prototype);
  }
  next();
});

// Routes
app.use('/health', healthRoutes);
app.use('/bfhl', bfhlRoutes);

// Handle 405 Method Not Allowed
app.use('/health', (req, res) => {
  res.status(405).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || 'harshita0518.be23@chitkara.edu.in',
    error: 'Method not allowed'
  });
});

app.use('/bfhl', (req, res) => {
  res.status(405).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || 'harshita0518.be23@chitkara.edu.in',
    error: 'Method not allowed'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || 'harshita0518.be23@chitkara.edu.in',
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || 'harshita0518.be23@chitkara.edu.in',
    error: 'Internal server error'
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
