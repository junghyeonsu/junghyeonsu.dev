// TODO: velopert님 다크모드 보고 JS를 CSS로 고치는 것 해보기
export interface Theme {
  color: {
    header: {
      text: string;
      background: string;
    };
  };
}

export const theme: Theme = {
  color: {
    header: {
      text: 'var(--header-text-primary)',
      background: 'var(--header-bg-primary)',
    },
  },
};
