export const getPlaybackRestrictionMessage = (reason?: string): string => {
  switch (reason) {
    case 'market': {
      return 'この地域では再生できません';
    }
    case 'product': {
      return '現在のプランでは再生できません';
    }
    case 'explicit': {
      return 'コンテンツ設定により再生できません';
    }
    default: {
      return '現在このコンテンツは再生できません';
    }
  }
};
