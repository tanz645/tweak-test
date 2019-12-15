module.exports = {
  user: {
    salt: 10,
    jwt: {
      issuer: 'tweak-auth-service',
      expiresIn: '12h',
      algorithm: 'RS256',
    },
  },
  image: {
    allowedMimes: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
    maxFilePerRequest: 2,
    maxFileSize: 1024 * 1024,
  },

};
