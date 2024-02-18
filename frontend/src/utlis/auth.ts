import getConfig from "next/config";

interface formData {
  username: string;
  email: string;
  password: string;
}

export const getUserAuth = (formData: formData): any => {
  const data = fetch(`${process.env.NEXT_PUBLIC_API_URL}user/auth`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
  return data;
};
export const registerUserAuth = (formData: formData): any => {
  console.log(formData);
  const data = fetch(`${process.env.NEXT_PUBLIC_API_URL}user/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
  return data;
};
