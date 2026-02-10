const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'harshita0518.be23@chitkara.edu.in';

const getHealth = (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
};

module.exports = {
  getHealth
};
