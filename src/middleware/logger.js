export default function logger(req, res, next) {
    console.log(req.method, req.path);
    req.session.user && console.log(req.session.user);
    req.user && console.log(req.user);
    next();
  }