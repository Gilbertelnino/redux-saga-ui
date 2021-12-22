import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getUsers, userSelector } from "./../../features/slices/user/userSlice";
import { useAppDispatch } from "./../../app/hooks";
import { useEffect } from "react";
import DeleteUser from "../auth/DeleteUser";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },

  {
    field: "firstname",
    headerName: "First name",

    renderCell: (params) => {
      return <div className="rowitem">{params.row.name.firstname}</div>;
    },
  },
  {
    field: "lastname",
    headerName: "Last name",
    renderCell: (params) => {
      return <div className="rowitem">{params.row.name.lastname}</div>;
    },
  },
  {
    field: "edit",
    headerName: "Edit",
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/users/${params.row.id}`}>
            <EditIcon />
          </Link>
        </div>
      );
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    renderCell: (params) => <DeleteUser id={params.row.id} />,
  },
  {
    field: "cart",
    headerName: "View Cart",
    renderCell: () => {
      return <Link to="/cart/products">View Cart</Link>;
    },
  },
];

enum ButtonStyle {
  backgroundColor = "#008CBA",
  border = "none",
  color = "white",
  textalign = "center",
  textDecoration = "none",
  display = "inline-block",
  fontSize = "16px",
  margin = "4px 2px",
  cursor = "pointer",
  padding = "12px 28px",
}

const buttonStyle = {
  backgroundColor: ButtonStyle.backgroundColor,
  border: ButtonStyle.border,
  color: ButtonStyle.color,
  textalign: ButtonStyle.textalign,
  textDecoration: ButtonStyle.textDecoration,
  display: ButtonStyle.display,
  fontSize: ButtonStyle.fontSize,
  margin: ButtonStyle.margin,
  cursor: ButtonStyle.cursor,
  padding: ButtonStyle.padding,
};

const UserTable = () => {
  const { users } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className="usertable" style={{ marginTop: "3rem" }}>
      <div
        className="homebutton"
        style={{
          textAlign: "right",
          marginRight: "17.7rem",
          marginBottom: "1rem",
        }}
      >
        <Link to="/new-user" className="button" style={buttonStyle}>
          Add New User{" "}
        </Link>
      </div>
      <div
        style={{
          height: 400,
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};
export default UserTable;
