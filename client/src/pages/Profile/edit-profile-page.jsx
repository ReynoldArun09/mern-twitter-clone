import {
  Dialog,
  DialogContainer,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import EditProfileForm from "../../forms/edit-profile-form";

export default function EditProfilePage() {
  return (
    <Dialog>
      <DialogTrigger>Edit Profile</DialogTrigger>
      <DialogContainer>
        <DialogTitle>Update Profile</DialogTitle>
        <EditProfileForm />
      </DialogContainer>
    </Dialog>
  );
}
