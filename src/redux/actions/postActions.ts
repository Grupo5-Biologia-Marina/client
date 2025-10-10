import axios from "axios";

export const getPostsByCategory = (categorySlug: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`/api/posts?category=${categorySlug}`);
    dispatch({
      type: "GET_POSTS_BY_CATEGORY",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener los posts por categoría:", error);
  }
};
