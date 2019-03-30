import users from '../models/users';
import validUser from '../middleware/validUser';

const User = {
  getUsers(req, res) {
    return res.status(200).json({
      status: 200,
      data: users,
    });
  },

  signUp(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;

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

    try {
      for (let i = 0; i < users.length; i += 1) {
        if (newUser.email === users[i].email) {
          return res.status(409).json({
            status: 409,
            message: 'user with that email already exists',
          });
        }
      }

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

  signIn(req, res) {
    const { email, password } = req.body;

    for (let i = 0; i < users.length; i += 1) {
      if (email === users[i].email) {
        if (validUser.comparePassword(
          password, users[i].password,
        ) || password === users[i].password) {
          return res.status(200).json({
            status: 200,
            data: users[i],
          });
        }
        return res.status(401).json({
          status: 401,
          error: 'incorrect password',
        });
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'user with that email does not exist',
    });
  },
};

export default User;
