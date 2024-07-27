import { ApiError } from "./ApiError.js";

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) =>
      next(
        res
          .status(500)
          .json(new ApiError(500, "Internal server error " + err, err))
      )
    );
  };
};

export { asyncHandler };
