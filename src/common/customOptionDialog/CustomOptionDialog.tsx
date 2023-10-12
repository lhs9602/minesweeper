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
  // 설정 필드의 id와 라벨을 정의합니다.
  const fields = [
    { id: "width", label: "Game Width:" },
    { id: "height", label: "Game Height:" },
    { id: "mines", label: "Number of Bombs:" },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Custom Game Setup</DialogTitle>
      <DialogContent>
        {/* 넓이,높이,지뢰의  TextField를 생성 */}
        {fields.map((field) => (
          <div key={field.id}>
            <TextField
              id={field.id}
              label={field.label}
              variant="standard"
              type="number" // 숫자만 입력 가능하도록 함
              onChange={onChange}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        {/* 게임 생성 및 취소 버튼 */}
        <Button color="secondary" onClick={onSubmit}>
          Create
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
