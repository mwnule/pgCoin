function check_role(roles = []) {
  return (req, res, next) => {    
    if (!roles.includes(req.user.permission_type)) {
      res.sendStatus(403);
    } else next();
  };
}

export default check_role;