import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { setDifficulty } from "../../redux/reducer/reducer";
import { OptionButton } from "./Option.styled";
import { SettingProps } from "../../data/type/type";
import { isValidSetting } from "../../utill/isValidSetting";
import { CustomOptionDialog } from "../../common/customOptionDialog/CustomOptionDialog";

export const Option = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCustomOption, setOpenCustomOption] = useState(false);
  const [customOption, setCustomOption] = useState<SettingProps>({
    height: 0,
    width: 0,
    mines: 0,
  });

  const open = Boolean(anchorEl);
  const menuItems = ["Beginner", "Intermediate", "Expert", "Custom"];

  const dispatch = useDispatch();

  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handleCustomClose = () => {
    setOpenCustomOption(false);
  };

  const handleDifficulty = (item: string) => {
    if (item === "Custom") {
      setOpenCustomOption(true);
    } else {
      dispatch(setDifficulty({ difficulty: item }));
    }
    setAnchorEl(null);
  };

  const handleCustomSubmit = () => {
    if (isValidSetting(customOption)) {
      dispatch(
        setDifficulty({
          difficulty: "Custom",
          setting: customOption as SettingProps,
        })
      );
    }
  };

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomOption((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <OptionButton color="inherit" onClick={handleOptionClick}>
        Option
      </OptionButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleOptionClick}>
        {menuItems.map((item) => (
          <MenuItem key={item} onClick={() => handleDifficulty(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
      <CustomOptionDialog
        open={openCustomOption}
        onClose={handleCustomClose}
        onSubmit={handleCustomSubmit}
        onChange={handleCustomChange}
      />
    </div>
  );
};
