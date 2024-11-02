import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom"; // Ensure this import is correct

const initialState = {
  userName: '',
  email: '',
  password: ''
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);

  function onSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    // Handle form submission logic here
    console.log(formData); // For debugging: log form data
    // You might want to send the form data to an API here
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl mb-1 font-bold tracking-tight text-foreground">
          SignIn to your account
        </h1>
        <p>
          Don't have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
