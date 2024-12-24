import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/authslice";

const initialState = {
  email: '',
  password: ''
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        const successMessage = result.payload?.message || 'Login successful!';
        toast({ title: successMessage });
      } else {
        const errorMessage = result.payload?.message || 'Login failed!';
        toast({ title: errorMessage, variant: "destructive" });
      }
    }).catch((error) => {
      console.error("Error during login:", error);
      toast({ title: 'An unexpected error occurred.', variant: "destructive" });
    });
  }

  // Only navigate when `isAuthenticated` is `true` and `user` is defined
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.roll === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/shop/home', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl mb-1 font-bold tracking-tight text-foreground">
          Sign In to your account
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
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
