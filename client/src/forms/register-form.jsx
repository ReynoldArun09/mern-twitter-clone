import { useState } from "react";
import XSvg from "../components/common/XSvg";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import {
  FaUser,
  MdDriveFileRenameOutline,
  MdPassword,
  MdOutlineMail,
} from "../utils/Icons";
import { RegisterUserApi } from "../services/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../helper";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const {
    mutate: registerUser,
    isError,
    error,
  } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: RegisterUserApi,
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate("/login");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <XSvg className="w-24 lg:hidden fill-white" />
      <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
      <Label>
        <MdOutlineMail />
        <Input
          placeholder="email"
          className="grow"
          name="email"
          onChange={handleInputChange}
          value={formData.email}
        />
      </Label>
      <div className="flex gap-4 flex-wrap">
        <Label>
          <FaUser />
          <Input
            placeholder="username"
            className="grow"
            name="username"
            onChange={handleInputChange}
            value={formData.username}
          />
        </Label>
        <Label>
          <MdDriveFileRenameOutline />
          <Input
            placeholder="fullName"
            className="grow"
            name="fullName"
            onChange={handleInputChange}
            value={formData.fullName}
          />
        </Label>
      </div>
      <Label>
        <MdPassword />
        <Input
          placeholder="password"
          type="password"
          className="grow"
          name="password"
          onChange={handleInputChange}
          value={formData.password}
        />
      </Label>
      <Button
        text={"Register"}
        ariaLabel={"register button"}
        BtnType={"submit"}
      />
      {isError && <p className="text-red-500">{getErrorMessage(error)}</p>}
    </form>
  );
}
