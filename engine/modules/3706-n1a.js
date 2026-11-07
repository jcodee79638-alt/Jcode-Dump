
var n1a = (e, t) => {
    let r;
    switch (e.code) {
      case qa.invalid_type:
        if (e.received === Xc.undefined) r = "Required";
        else r = `Expected ${e.expected}, received ${e.received}`;
        break;
      case qa.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(e.expected, km.jsonStringifyReplacer)}`;
        break;
      case qa.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${km.joinValues(e.keys, ", ")}`;
        break;
      case qa.invalid_union:
        r = "Invalid input";
        break;
      case qa.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${km.joinValues(e.options)}`;
        break;
      case qa.invalid_enum_value:
        r = `Invalid enum value. Expected ${km.joinValues(e.options)}, received '${e.received}'`;
        break;
      case qa.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case qa.invalid_return_type:
        r = "Invalid function return type";
        break;
      case qa.invalid_date:
        r = "Invalid date";
        break;
      case qa.invalid_string:
        if (typeof e.validation === "object")
          if ("includes" in e.validation) {
            if (
              ((r = `Invalid input: must include "${e.validation.includes}"`),
              typeof e.validation.position === "number")
            )
              r = `${r} at one or more positions greater than or equal to ${e.validation.position}`;
          } else if ("startsWith" in e.validation)
            r = `Invalid input: must start with "${e.validation.startsWith}"`;
          else if ("endsWith" in e.validation) r = `Invalid input: must end with "${e.validation.endsWith}"`;
          else km.assertNever(e.validation);
        else if (e.validation !== "regex") r = `Invalid ${e.validation}`;
        else r = "Invalid";
        break;
      case qa.too_small:
        if (e.type === "array")
          r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`;
        else if (e.type === "string")
          r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`;
        else if (e.type === "number")
          r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`;
        else if (e.type === "bigint")
          r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`;
        else if (e.type === "date")
          r = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`;
        else r = "Invalid input";
        break;
      case qa.too_big:
        if (e.type === "array")
          r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)`;
        else if (e.type === "string")
          r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)`;
        else if (e.type === "number")
          r = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`;
        else if (e.type === "bigint")
          r = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`;
        else if (e.type === "date")
          r = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}`;
        else r = "Invalid input";
        break;
      case qa.custom:
        r = "Invalid input";
        break;
      case qa.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case qa.not_multiple_of:
        r = `Number must be a multiple of ${e.multipleOf}`;
        break;
      case qa.not_finite:
        r = "Number must be finite";
        break;
      default:
        ((r = t.defaultError), km.assertNever(e));
    }
    return { message: r };
  },
  _He;