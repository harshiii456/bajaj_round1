const { fibonacci, filterPrimes, calculateLCM, hcf } = require('../utils/mathUtils');
const { getAIResponse } = require('../utils/aiUtils');

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'harshita0518.be23@chitkara.edu.in';

const handleBFHL = async (req, res) => {
  try {
    const body = req.body || {};
    const keys = Object.keys(body);
    
    // Validate exactly one key
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: 'Request must contain exactly one key'
      });
    }
    
    const key = keys[0];
    const value = body[key];
    let result;
    
    switch (key) {
      case 'fibonacci':
        if (typeof value !== 'number') {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'Fibonacci input must be a number'
          });
        }
        result = fibonacci(value);
        break;
        
      case 'prime':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'Prime input must be an array'
          });
        }
        result = filterPrimes(value);
        break;
        
      case 'lcm':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'LCM input must be an array'
          });
        }
        result = calculateLCM(value);
        break;
        
      case 'hcf':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'HCF input must be an array'
          });
        }
        result = hcf(value);
        break;
        
      case 'AI':
        if (typeof value !== 'string') {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'AI input must be a string'
          });
        }
        result = await getAIResponse(value);
        break;
        
      default:
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          error: 'Invalid key. Must be one of: fibonacci, prime, lcm, hcf, AI'
        });
    }
    
    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: result
    });
    
  } catch (error) {
    console.error('BFHL Error:', error);
    res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: error.message || 'Internal server error'
    });
  }
};

module.exports = {
  handleBFHL
};
