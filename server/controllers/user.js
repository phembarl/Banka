import users from '../models/users';
import validUser from '../middleware/validUser';

const User = {
  createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;

    const id = users.length + 1;
    const token = validUser.generateToken(id);
    const newUser = {
      id,
      email,
      firstName,
      lastName,
      password: validUser.hashPassword(password),
      isAdmin: false,
    };

    for (let i = 0; i < users.length; i += 1) {
      if (newUser.email === users[i].email) {
        return res.status(409).json({
          status: 409,
          message: 'user with that email already exists',
        });
      }
    }

    try {
      users.push(newUser);
      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  },
};

export default User;
