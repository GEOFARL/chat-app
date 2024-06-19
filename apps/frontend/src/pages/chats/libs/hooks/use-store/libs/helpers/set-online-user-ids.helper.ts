const setOnlineUserIds = (onlineUserIds: string[], userId: string) => {
  return !onlineUserIds.includes(userId)
    ? [...onlineUserIds, userId]
    : [...onlineUserIds];
};

export { setOnlineUserIds };
