import React from "react";
import { Formik, Form } from "formik";
import Button from "../Button";

const FormikWrapper = ({
  initialValues,
  validationSchema,
  validate,
  onSubmit,
  children,
  buttonProps = {
    isHide: false,
    children: "Submit",
    className: "",
    isDisabled: false,
  },
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <>
            {children}
            {!buttonProps?.isHide && (
              <Button
                type="submit"
                className={buttonProps.className}
                disabled={buttonProps.isDisabled}
              >
                {buttonProps?.children}
              </Button>
            )}
          </>
        </Form>
      )}
    </Formik>
  );
};

export default FormikWrapper;
