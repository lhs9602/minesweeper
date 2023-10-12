import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { setDifficulty } from "../../redux/reducer/reducer";
import { OptionButton } from "./Option.styled";
import { SettingProps } from "../../data/type/type";
import { isValidSetting } from "../../utill/isValidSetting";
import { CustomOptionDialog } from "../../common/customOptionDialog/CustomOptionDialog";

//게임 난이도를 관리하는 컴포넌트
export const Option = () => {
  // 메뉴의 표시 상태 및 선택된 옵션을 관리하는 상태
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // 사용자 정의 옵션 대화 상자의 표시 상태를 관리하는 상태
  const [openCustomOption, setOpenCustomOption] = useState(false);
  // 사용자 정의 게임 설정을 관리하는 상태
  const [customOption, setCustomOption] = useState<SettingProps>({
    height: 0,
    width: 0,
    mines: 0,
  });

  const open = Boolean(anchorEl);
  const menuItems = ["Beginner", "Intermediate", "Expert", "Custom"];

  const dispatch = useDispatch();

  // 옵션 메뉴를 여닫는 핸들러
  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  // CustomOptionDialog을 닫는 핸들러
  const handleCustomClose = () => {
    setOpenCustomOption(false);
  };

  // 난이도를 선택하거나 사용자 정의 옵션 선택
  const handleDifficulty = (item: string) => {
    if (item === "Custom") {
      setOpenCustomOption(true);
    } else {
      dispatch(setDifficulty({ difficulty: item }));
    }
    setAnchorEl(null);
  };

  // 사용자 정의 게임 설정
  const handleCustomSubmit = () => {
    if (isValidSetting(customOption)) {
      dispatch(
        setDifficulty({
          difficulty: "Custom",
          setting: customOption as SettingProps,
        })
      );
    }
    setOpenCustomOption(false);
  };

  // 사용자 정의 게임 설정을 변경하는 핸들러
  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomOption((prev) => ({ ...prev, [id]: value }));
  };
  return (
    <div>
      {/* 옵션 버튼 */}
      <OptionButton color="inherit" onClick={handleOptionClick}>
        Option
      </OptionButton>
      {/*게임 난이도를 선택할 수 있는 메뉴입니다. */}
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
