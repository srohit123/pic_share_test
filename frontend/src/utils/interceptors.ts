export const handleResponse = (response: any) => {
  response.message = response.data.message;
  response.data = response.data.data
  return response;
};

export const handleResponseError = (error: any) => {
  const { response } = error;
  const data = response && response.data;
  let err;
  if (data) {
    err = {
      errMsg: data.message || data.error,
      errCode: response.status,
    };
  }
  return Promise.reject(err);
};
