export enum ErrorCodes {
  ValidationAuthRegister = 100,
  RegisterUserAlreadyExist = 101,
  RegisterUserCreateError = 102,
  LoginInvalidCredentials = 103,
  GetUserNotFound = 104,
  CreatePostError = 105,
  GetPostsError = 106,
  PostNotFound = 107,
  UpdatePostError = 108,
  UpdatePostNotYours = 109,
  ValidationAuthLogin = 110,
  ValidationGetPostsMe = 111,
  ValidationGetUsersPosts = 112,
  ValidationCreatePost = 113,
  ValidationGetPosts = 114,
  ValidationUpdatePost = 115,
}

const errorMessages = {
  100: {
    status: 400,
    message: {
      en: 'Username or password not correct , or JWT sign is wrong',
      cn: '用户名或密码不正确或者签发JWT失败。',
    },
  },
  101: {
    status: 404,
    message: {
      en: 'User already exists.',
      cn: '用戶已存在。',
    },
  },
  102: {
    status: 500,
    message: {
      en: 'Internal server error.',
      cn: '内部服务器错误。',
    },
  },
  103: {
    status: 400,
    message: {
      en: 'Invalid credentials.',
      cn: '用戶名和密码不一致。',
    },
  },
  104: {
    status: 400,
    message: {
      en: 'User not existed',
      cn: '用戶不存在。',
    },
  },
  105: {
    status: 500,
    message: {
      en: 'Internal server error.',
      cn: '内部服务器错误。',
    },
  },
  106: {
    status: 500,
    message: {
      en: 'Internal server error.',
      cn: '内部服务器错误。',
    },
  },
  107: {
    status: 400,
    message: {
      en: 'post is not found.',
      cn: '帖子不存在。',
    },
  },
  108: {
    status: 500,
    message: {
      en: 'Internal server error.',
      cn: '内部服务器错误。',
    },
  },
  109: {
    status: 500,
    message: {
      en: 'This post is not yours.',
      cn: '这帖子不属于您。',
    },
  },
  110: {
    status: 400,
    message: {
      en: 'Username or password not correct , or JWT sign is wrong',
      cn: '用户名或密码不正确或者签发JWT失败。',
    },
  },
  111: {
    status: 400,
    message: {
      en: 'Count and Page is invalid for geting my posts',
      cn: '获取我帖子的Count/page 无效。',
    },
  },
  112: {
    status: 400,
    message: {
      en: "Count and Page is invalid for geting user's posts",
      cn: '获取用户的帖子的Count/page 无效。',
    },
  },
  113: {
    status: 400,
    message: {
      en: 'Post parameters are wrong for creating post.',
      cn: '創造帖子的参数不正确。',
    },
  },
  114: {
    status: 400,
    message: {
      en: 'Count、Page are invalid for getting posts',
      cn: '获取帖子的count/page无效。',
    },
  },
  115: {
    status: 400,
    message: {
      en: 'Post parameters are invalid for updating post',
      cn: '更新帖子的参数不正确。',
    },
  },
};

export default errorMessages;
