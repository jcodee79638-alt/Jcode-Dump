
function ZsH(e) {
  if (e.responses?.["400"] && roH(e.responses["400"]))
    e.responses["400"] = Irs("Bad request", "BadRequestError");
  if (e.responses?.["404"] && Mrs(e.responses["404"], "NotFound"))
    e.responses["404"] = Irs("Not found", "NotFoundError");
}