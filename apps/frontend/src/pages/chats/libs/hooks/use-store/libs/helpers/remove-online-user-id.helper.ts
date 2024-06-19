const removeOnlineUserId = (onlineUserIds: string[], userId: string) => {
  return onlineUserIds.filter((id) => id !== userId);
};

export { removeOnlineUserId };
