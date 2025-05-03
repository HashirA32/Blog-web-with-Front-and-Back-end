export const RouteIndex = "/";
export const RouteSignUp = "/sign-up";
export const RouteSignIn = "/sign-in";
export const RouteProfile = "/profile";
export const RouteCategoryDetails = "/categories";
export const RouteAddCategory = "/categories/add";
export const RouteEditCategory = (category_id) => {
  if (category_id) {
    return `/categories/add/${category_id}`;
  } else {
    return "/categories/add/:category_id";
  }
};
