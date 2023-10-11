import { SettingProps } from "../data/type/type";

export const isValidSetting = (option: SettingProps): boolean => {
  const { height, width, mines } = option;

  if (height < 8 || height > 100 || width < 8 || width > 100) {
    alert("가로와 세로는 8~100 사이의 값이어야 합니다.");
    return false;
  }

  if (mines < 1 || mines > (height * width) / 3) {
    alert("지뢰의 수는 전체 격자 칸의 1/3 이하이어야 합니다.");
    return false;
  }

  return true;
};
