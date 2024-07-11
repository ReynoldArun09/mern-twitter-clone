import { useState } from "react"
import XSvg from "../components/common/XSvg"
import Button from "../components/ui/Button"
import Label from '../components/ui/Label'
import Input from '../components/ui/Input'
import { MdPassword, MdOutlineMail } from "../utils/Icons"
import { LoginUserApi } from "../services/auth-api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "../helper"
import { toast } from "react-toastify"

export default function LoginForm() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { mutate: loginUser, isError, error } = useMutation({
		mutationKey: ["login-user"],
		mutationFn: LoginUserApi,
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["verify-user"] });
      toast.success(data.message)
      navigate("/");
		},
	});

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(formData)
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <XSvg className="w-24 lg:hidden fill-white" />
      <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
      <Label>
        <MdOutlineMail />
        <Input placeholder="username" className="grow" name="username" onChange={handleInputChange}
          value={formData.username} />
      </Label>
      <Label>
        <MdPassword />
        <Input placeholder="password" type="password" className="grow" name="password" onChange={handleInputChange}
          value={formData.password} />
      </Label>
      <Button text="Login" BtnType={"submit"} ariaLabel={"login button"}/>
      {isError && <p className="text-red-500">{getErrorMessage(error)}</p>}
    </form>
  )
}
