import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object of: &#x20a6;{req.params.id}`);
  }
  next();
}

export default checkId;
