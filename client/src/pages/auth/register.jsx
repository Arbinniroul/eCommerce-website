import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/authslice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
const initialState = {
  userName: '',
  email: '',
  password: ''
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast()
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData))
      .then((response) => {
        if (response?.payload?.success) {
          navigate('/auth/login');
          toast({
            title: "Registration successful",
            description: "Your account has been created!",
          });
          
        }
        toast({
          title: response?.payload?.message,

        });
        console.log(response); // Check the response data
      })
      .catch((error) => {
        console.error("Registration failed:", error); // Log any errors
        toast({
          title: "Registration failed",
          description: "Please check your details and try again.",
          status: "error",
        });
      });
      

  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p>
          Already have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
            Log in
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
