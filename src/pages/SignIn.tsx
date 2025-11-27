import type React from "react"
import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../store/slices/authSlice"
import type { AppDispatch, RootState } from "../store/store"
import Logo from "../components/common/Logo"
import LoadingSpinner from "../components/common/LoadingSpinner"
import PageTransition from "../components/common/PageTransition"
import { Input, Button } from "../components/common"
import googleIcon from "../assets/google.png"
import bgOverlay from "../assets/overlay.png"
import bgImage from "../assets/ImageAuth.png"
import underLine from "../assets/underlineVector.png"

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!emailRegex.test(email)) return "Please enter a valid email"
    return ""
  }

  const validatePassword = (password: string) => {
    if (!password) return "Password is required"
    if (password.length < 6) return "Password must be at least 6 characters"
    return ""
  }

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        return validateEmail(value)
      case "password":
        return validatePassword(value)
      default:
        return ""
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)
    setTouched({ email: true, password: true })

    if (Object.keys(newErrors).length === 0) {
      const result = await dispatch(signIn(formData))
      if (signIn.fulfilled.match(result)) {
        navigate("/dashboard")
      }
    }
  }

  return (
    <PageTransition>
      <div className="flex h-screen overflow-hidden">
        {/* Left Side - Form */}
        <div className="flex w-full lg:w-1/2 flex-col px-8 lg:px-20 overflow-y-auto">
          <div className="w-full max-w-md mx-auto pt-8">
            <Logo />
          </div>

          {/* Form centered vertically */}
          <div className="mx-auto w-full max-w-md flex-1 flex flex-col justify-center py-8">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900">Sign In</h1>
              <p className="mt-2 text-[#78778B]">Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                error={errors.email && touched.email ? errors.email : undefined}
                placeholder="example@gmail.com"
                className="py-3 placeholder-gray-600"
              />

              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                error={errors.password && touched.password ? errors.password : undefined}
                placeholder="••••••••"
                className="py-3 placeholder-gray-600 placeholder:tracking-widest"
              />

              <div className="space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  variant="primary"
                  className="w-full py-3 text-base font-semibold"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <Button
                  type="button"
                  size="lg"
                  disabled={isLoading}
                  variant="outline"
                  icon={
                    <img src={googleIcon || "/placeholder.svg"} alt="google icon" className="h-5 w-5 bg-transparent" />
                  }
                  className="w-full py-3"
                >
                  Sign in with google
                </Button>
              </div>
            </form>

            <p className="mt-4 text-center text-base font-normal text-gray-300">
              {"Don't have an account?"}{" "}
              <Link to="/signup" className="relative inline-block font-medium text-gray-900 hover:text-gray-700">
                Sign up
                <img
                  src={underLine || "/placeholder.svg"}
                  alt="underline"
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-16 pointer-events-none"
                />
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-100 relative">
          {/* Background image */}
          <img src={bgImage || "/placeholder.svg"} alt="Financial illustration" className="h-full w-full object-fill" />
          {/* Overlay image */}
          <img
            src={bgOverlay || "/placeholder.svg"}
            alt="Overlay"
            className="absolute inset-0 h-full w-full object-fill pointer-events-none"
          />
        </div>
      </div>
    </PageTransition>
  )
}
