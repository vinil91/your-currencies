const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = (req, res , next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  
  try {
    console.log('!maid')
    const token = req.headers.authorization.split(' ')[1];
    console.log('!msaid')
    if (!token) {
      console.log('!token')
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    console.log('secret ')
    const secret = config.get('jwtSecret');

    console.log('secret ', secret)
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded;
    next()
  } catch {
    console.log('skoree vsego verify')
    res.status(401).json({ message: 'Нет авторизации' });
  }
}