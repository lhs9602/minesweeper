import { SettingProps } from "../data/type/type";

// 사용자가 입력한 게임 설정이 유효한지 확인하는 함수
export const isValidSetting = (option: SettingProps): boolean => {
  const { height, width, mines } = option;

  // 게임 보드의 높이와 너비가 8~100 사이의 값인지 확인
  if (height < 8 || height > 100 || width < 8 || width > 100) {
    alert("가로와 세로는 8~100 사이의 값이어야 합니다.");
    return false;
  }

  // 지뢰의 수가 적절한 범위에 있는지 확인 (1 이상이며 전체 셀의 1/3 이하)
  if (mines < 1 || mines > (height * width) / 3) {
    alert("지뢰의 수는 전체 격자 칸의 1/3 이하이어야 합니다.");
    return false;
  }

  // 위의 조건들을 모두 통과하면 설정이 유효하다고 판단
  return true;
};
