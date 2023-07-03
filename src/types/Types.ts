export type UserType = {
    name: string,
    id: string,
    email: string,
    blogs: BlogType[],
    comments: CommentType[],
};

export type BlogType = {
    id: string,
    title: string,
    content: string,
    date: Date,
    user: UserType,
    comment: CommentType[],
};

export type CommentType = {
  text: string,
    date: Date,
    blog: BlogType,
    user: UserType,
};
