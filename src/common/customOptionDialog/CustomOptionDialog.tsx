import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { CustomOptionDialogProps } from "../../data/type/type";

export const CustomOptionDialog = ({
  open,
  onClose,
  onSubmit,
  onChange,
}: CustomOptionDialogProps) => {
  const fields = [
    { id: "width", label: "Game Width:" },
    { id: "height", label: "Game Height:" },
    { id: "mines", label: "Number of Bombs:" },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Custom Game Setup</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <div key={field.id}>
            <TextField
              id={field.id}
              label={field.label}
              variant="standard"
              type="number"
              onChange={onChange}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onSubmit}>
          Create
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
