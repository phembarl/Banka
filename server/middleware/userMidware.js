
/**
 * Validates user
 * @class User
 */
class UserValidator {
  /**
   * @static
   * @description this function checks if an email address already belongs to a user
   * @param {object} request the request body
   * @param {object} response the response body
   * @param {function} next passes the request to another function to be processed
   * @returns next
   * @memberof UserValidator
   */
  static isClientOrStaff(request, response, next) {
    const { type } = request.body;

    if (type !== 'client' && type !== 'staff') {
      return response.status(400).json({
        status: 400,
        error: 'you can either be a client or staff',
      });
    }
    return next();
  }
}

export default UserValidator;
