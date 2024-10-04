import axios from 'axios';

export const BASE_URL = axios.create({
  baseURL: 'https://amaklo-auth.herokuapp.com/amakloapi/_v1',
  headers: {
    "source": "app"
  }
});

export const AUTH_BASE_URL = axios.create({
  baseURL: 'http://164.92.136.51:17181/amakloapi/_v1/auth',
  headers: {
    "source": "app"
  }
});

export const BLOG_BASE_URL = axios.create({
  baseURL: 'http://164.92.136.51:17185/amakloapi/_v1/blogs',
  headers: {
    "source": "app"
  }
});

export const CATEGORY_BASE_URL = axios.create({
  baseURL: 'http://164.92.136.51:17185/amakloapi/_v1/categories',
  headers: {
    "source": "app"
  }
});

export const BUSINESS_BASE_URL = axios.create({
  baseURL: 'http://164.92.136.51:17185/amakloapi/_v1/businesses',
  headers: {
    "source": "app"
  }
});

export const USERS_BASE_URL = axios.create({
  baseURL: 'http://164.92.136.51:17182/amakloapi/_v1/users',
  headers: {
    "source": "app"
  }
});

export const COMMON_BASE_URL = axios.create({
  baseURL: 'http://164.92.136.51:17183/amakloapi/_v1/ownamaklo'
});
