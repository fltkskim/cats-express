const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8001";

export default {
  cats: `${apiHost}/cats`,
};
