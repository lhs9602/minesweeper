import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";

interface CustomOptionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomOptionDialog: React.FC<CustomOptionDialogProps> = ({
  open,
  onClose,
  onSubmit,
  onChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Custom Game Setup</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            id="width"
            label="Game Height:"
            variant="standard"
            type="number"
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            id="height"
            label="Game Width:"
            variant="standard"
            type="number"
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            id="mines"
            label="Number of Bombs:"
            variant="standard"
            type="number"
            onChange={onChange}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>Create</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
