import axios from "axios";

const handle = (promise: Promise<any>): Promise<any> => {
  return promise
    .then((response) => response.data)
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export default async function doApiRequest(
  url: string,
  data: object = {},
  method: string = "get"
) {
  const config = {
    headers: {
      "X-WP-Nonce": window._woopriceman.rest_api_admin_nonce,
    },
  };

  url =
    window._woopriceman.rest_api_url +
    window._woopriceman.rest_api_admin_namespace_v1 +
    url;

  switch (method) {
    case "post":
      return await handle(axios.post(url, data, config));
    case "put":
      return await handle(axios.put(url, data, config));
    case "get":
      return await handle(axios.get(url, config));
    case "delete":
      return await handle(axios.delete(url, config));
    case "patch":
      return await handle(axios.patch(url, data, config));
  }
}
