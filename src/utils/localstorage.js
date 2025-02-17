export const saveOrderToLocalStorage = (owner, repo, order) => {
  localStorage.setItem(`${owner}/${repo}-order`, JSON.stringify(order));
};

export const getOrderFromLocalStorage = (owner, repo) => {
  const savedOrder = localStorage.getItem(`${owner}/${repo}-order`);
  return savedOrder ? JSON.parse(savedOrder) : null;
};