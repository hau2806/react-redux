export function addProduct(value) {
  return {
    type: "ADD_PRODUCT",
    payload: value,
  };
}

export function deleteProduct(id) {
  return {
    type: "DELETE_PRODUCT",
    payload: id,
  };
}

export const updateCart = (newCart:object) => {
  return {
    type: "UPDATE_CART",
    payload: newCart,
  };
};
