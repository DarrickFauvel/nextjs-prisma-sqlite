import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type PostPageProps = {
  params: {
    postId: string;
  };
};

const updatePost = async(formData: FormData) => {
    'use server'

    const id = formData.get('id') as string
    const name = formData.get('name') as string

    await prisma.post.update({
        where: {
            id
        },
        data: {
            name
        }
    })

    revalidatePath('/')
    redirect('/')
}

const PostPage = async ({ params }: PostPageProps) => {
  const awaitedParams = await params;
  const post = await prisma.post.findUnique({
    where: {
      id: awaitedParams.postId,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <form action={updatePost} className="flex flex-col gap-y-2">
      <input type="hidden" name="id" value={post.id} />
      <input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={post.name}
        className="text-black"
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default PostPage;
