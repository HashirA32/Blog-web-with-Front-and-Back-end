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

export const RouteBlog = "/blog";
export const RouteBlogAdd = "/blog/add";
export const RouteBlogEdit = (blogid) => {
  if (blogid) {
    return `/blog/edit/${blogid}`;
  } else {
    return "/blog/edit/:blogid";
  }
};

export const RouteBlogDetails = (category, blog) => {
  if (!category || !blog) {
    return "/blog/:category/:blog";
  } else {
    return `/blog/${category}/${blog}`;
  }
};
