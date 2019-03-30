import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import secret from '../../secret';

const ValidUser = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  generateToken(id) {
    const token = jwt.sign({ userId: id },
      process.env.SECRET || secret, { expiresIn: '30d' });
    return token;
  },
};

export default ValidUser;
