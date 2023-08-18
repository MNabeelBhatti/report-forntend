import * as yup from "yup";

export const clientColumns = [
  "created_at",
  "name",
  "address",
  "description",
  "contact_person",
  "total_workforce",
  "phone",
  "sites",
  "departments",
  "designations",
  "logo_url",
  "id",
];
export const clientColumnsString = clientColumns.join(",");

export const clientYupSchema = yup.object().shape({
  name: yup.string("Enter the Client's name").required("Name is required"),
  address: yup
    .string("Enter the Client's address")
    .required("Address is required"),
  description: yup
    .string("Enter the Client's description")
    .required("Description is required"),
  contact_person: yup
    .string("Enter the Client's contact person")
    .required("Contact person is required"),
  total_workforce: yup
    .number("Enter the Client's total workforce")
    .required("Total workforce is required")
    .min(1, "Total workforce must be greater than 0"),
  phone: yup.string("Enter the Client's phone").required("Phone is required"),
  sites: yup.array().of(yup.string()),
  departments: yup.array().of(yup.string()),
  designations: yup.array().of(yup.string()),
  // logo_url: yup.string(),
});

/**
 * YUP schema for the Category form.
 *
 * @return {Object} YUP schema for the Category form.
 */

export const ruleYupSchema = yup.object().shape({
  name: yup.string("Enter the Category's name").required("Name is required"),
  min: yup
    .number("Enter the Category's minimum percentage")
    .required("Minimum percentage is required")
    .min(0, "Percentage must be greater than or equal to 0")
    .max(100, "Percentage must be less than or equal to 100"),
  max: yup
    .number("Enter the Category's maximum percentage")
    .required("Maximum percentage is required")
    .min(0, "Percentage must be greater than or equal to 0")
    .max(100, "Percentage must be less than or equal to 100"),
  description: yup
    .string("Enter the Category's description")
    .required("Description is required"),
});

// Rule is an array of objects of the categoryYupSchema
/**
 * @function
 * @name categoryPostDataYupSchema
 * @description This schema is used to validate the data that is sent to the backend when a category is created.
 * @param {object} data - The object containing the data that will be validated.
 * @param {string} data.name - The name of the category.
 * @param {array} data.rule - The list of rules that will be applied to the category.
 * @returns {object} - Returns an object with the result of the validation.
 */
export const categoryPostDataYupSchema = yup.object().shape({
  name: yup.string("Enter the Category's name").required("Name is required"),
  rule_array: yup.object().shape({
    rules: yup
      .array()
      .of(ruleYupSchema)
      .min(1, "At least one rule is required")
      .required("At least one rule is required"),
  }),
});

/**
 * This function validates that the category data is valid. If it is not valid, it
 * returns an array of error messages.
 *
 * @param {Object} category The category data to validate.
 * @return {Array} An array of error messages.
 *
 */
export const validateCategoryPostData = async (categoryPostData) => {
  let errors = [];
  try {
    await categoryPostDataYupSchema.validate(categoryPostData, {
      abortEarly: false,
    });
  } catch (e) {
    errors = e.errors;
  }
  return errors;
};
