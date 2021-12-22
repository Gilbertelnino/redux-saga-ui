import React from "react";
import { useAppDispatch } from "./../../app/hooks";
import { deleteUser } from "./../../features/slices/user/userSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const DeleteUser: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  // handle delete
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(deleteUser(id));
    toast.success("User deleted successfully");
  };

  return (
    <div className="delete-button">
      <button
        onClick={handleDelete}
        style={{
          background: "none",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default DeleteUser;
