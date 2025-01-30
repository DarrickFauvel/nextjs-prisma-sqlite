import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type PostPageProps = {
    params: {
        postId: string
    }
}

const PostPage = async ({ params }: PostPageProps) => {
    const awaitedParams = await params
    const post = await prisma.post.findUnique({
        where: {
            id: awaitedParams.postId,
        },
    });

    if (!post) {
        return notFound();
    }

    return <h2>{post.name}</h2>;
};

export default PostPage