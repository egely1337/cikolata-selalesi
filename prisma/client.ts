import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

import { Session } from "next-auth";


type CreatePostType = {
    content: string,
    attachments?: string[]
    session: Session | null,
    channel: string
}

type LikePostType = {
    session: Session | null,
    post_id: string    
}

function getRandomElement<T>(list: T[]): T | undefined {
    if (list.length === 0) {
      return undefined;
    }
  
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

const AVATAR_PATHS = ["/avatars/1.png", "/avatars/2.png", "/avatars/3.png", "/avatars/4.png"]

const generateRandomAvatar = async () => {
    return getRandomElement(AVATAR_PATHS);
}

const prisma = new PrismaClient().$extends({
    model: {
        user: {
            async checkUserExists(username: string) {
                return (await prisma.user.findUnique({where: {username: username}})) ? true : false;
            },
            async register(username: string, password: string) {
                const hash = await bcrypt.hash(password, 10);
                
                if(username.length < 3) {
                    throw new Error("Your username should be greater than 3 characters.");
                } 

                if(password.length < 8) {
                    throw new Error("Your password should be greater than 8 characters.");
                }

                if(await this.checkUserExists(username)) {
                    throw new Error("Zaten böyle bir hesap var.");
                }
                
                return prisma.user.create({
                    data: {
                        username: username,
                        password: hash,
                        avatar_url: await generateRandomAvatar() ?? "/avatars/1.png"
                    },
                    select: {
                        username: true,
                        created_at: true,
                        password: false
                    }
                    
                }) 
            },
            async login(username: string, password: string) {
                const user = await prisma.user.findUnique({
                    where: {
                        username: username,
                    }
                })

                if(!await bcrypt.compare(password, user?.password!)) {
                    throw new Error("Username or password is incorrect.");
                }

                if(user) {
                    return user;
                }
            },
            async getUser(session: Session | null) {
                if(!session) {
                    throw new Error("Bunun için giriş yapmalısın.");
                }

                if(await this.checkUserExists(session.user?.name!)) {
                    return await prisma.user.findUnique({
                        where: {
                            username: session.user?.name!
                        },
                        select: {
                            username: true,
                            created_at: true,
                            password: false,
                            avatar_url: true
                        }
                    })
                }

                throw new Error("You should be login.");
            },
            async createPost(params: CreatePostType) {
                if(params.session == null) {
                    throw new Error("You should be login.");
                }

                const user = await this.getUser(params.session);

                return await prisma.post.create({
                    data: {
                        content: params.content,
                        author: {
                            connect: {
                                username: user?.username 
                            }
                        },
                        channel: params.channel
                    },
                    include: {
                        author: {
                            select: {
                                avatar_url: true,
                                username: true,
                                created_at: true
                            }
                        }
                    }
                })
            },
            async getChannelPosts(channel_id: string) {
                return JSON.parse(JSON.stringify(await prisma.post.findMany({
                    take: 50,
                    orderBy: {
                        created_at: 'desc'
                    },
                    where: {
                        channel: channel_id 
                    },
                    include: {
                        author: {
                            select: {
                                password: false,
                                username: true,
                                created_at: true,
                                avatar_url: true
                            }
                        },
                        _count: {
                            select: {
                                liked_by: true
                            }
                        }
                    },
                })))
            },
            async getUserLike(username: string, threadId: string) {
                return await prisma.like.findFirst({where: {authorId: username, postId: threadId}});
            },
            async userLikePost(params: LikePostType) {
                if(!params.session) {
                    throw new Error("You should be login.");
                }

                const user = await this.getUser(params.session);
                const user_like = await this.getUserLike(user?.username!, params.post_id);

                if(user_like) {
                    await prisma.like.delete({
                        where: {
                            id: user_like.id
                        }
                    })

                    return false;
                }

                if(user && !user_like) {
                    return await prisma.like.create({
                        data: {
                            author: {
                                connect: {
                                    username: user.username 
                                }
                            },
                            post: {
                                connect: {
                                    id: params.post_id
                                }
                            }
                        }
                    })
                }
            },
            async getUserByUsername(username: string) {
                return await prisma.user.findUnique({
                    where: {
                        username: username
                    },
                    select: {
                        username: true,
                        created_at: true,
                        password: false,
                        avatar_url: true
                    }
                }).catch(err => {
                    throw new Error("Something gone wrong.");
                });
            },
            async getThreadById(threadId: string) {
                return await prisma.post.findUnique({
                    where: {
                        id: threadId
                    },
                    include: {
                        author: {
                            select: {
                                username: true,
                                created_at: true,
                                avatar_url: true
                            }
                        },
                        _count: {
                            select: {
                                liked_by: true
                            }
                        }
                    },
                }).then(res => {
                    if(res == null) {
                        throw new Error("Nothing found.");
                    } 
                    
                    return res;
                })
            },
            async checkUserLikedThread(session: Session, thread_id: string) {
                const user = await this.getUser(session);

                if(!user) {
                    throw new Error("You should be logged in.");
                }

                const isLiked = await prisma.like.findFirst({
                    where: {
                        authorId: user.username,
                        postId: thread_id
                    }
                }) ? true : false;

                const likeCount = await prisma.post.findFirst({
                    where: {
                        id: thread_id
                    },
                    include: {
                        liked_by: true
                    }
                }).then(res => res?.liked_by.length);

                return {
                    like: isLiked,
                    count: likeCount
                }
            },
            async createComment(session: Session, postId: string, content: string) {
                if(!session) {
                    throw new Error("You should be login.");
                }

                const user = await this.getUser(session);
                
                return await prisma.comment.create({
                    data: {
                        author: {
                            connect: {
                                username: user?.username 
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        },
                        content: content
                    },
                    include: {
                        author: {
                            select: {
                                username: true,
                                created_at: true,
                                avatar_url: true
                            }
                        }
                    }
                })
            },
            async getCommentsPost(postId: string) {
                return JSON.parse(JSON.stringify(await prisma.comment.findMany({
                    take: 50,
                    where: {
                        postId: postId
                    },
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        author: {
                            select: {
                                username: true,
                                created_at: true,
                                avatar_url: true
                            }
                        }
                    }
                })))
            }
        }
    }
})

export default prisma;